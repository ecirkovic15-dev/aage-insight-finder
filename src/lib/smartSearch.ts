// Client-side "smart search" — extracts keywords from natural language prompts
// and scores metrics + anecdotes by relevance. No backend required.

import { Metric, employerMetrics, candidateMetrics, graduateMetrics, internMetrics, ReportType } from "@/data/aageData";
import { Anecdote, anecdotes } from "@/data/anecdotes";

// ── Constants ────────────────────────────────────────────────────────────────

/** Maximum prompt length accepted. Prevents main-thread blocking on large inputs. */
const MAX_PROMPT_LENGTH = 500;

/**
 * Maps common conversational terms to the actual keywords in our dataset.
 * Add new concept groups here to extend search coverage.
 */
const CONCEPT_MAP: Record<string, string[]> = {
  ai:          ["ai", "artificial intelligence", "auto-apply", "chatgpt", "automation", "agents"],
  salary:      ["salary", "salaries", "pay", "compensation", "remuneration", "wage", "starting salary"],
  reneg:       ["reneg", "reneging", "renege", "reneged", "withdraw", "withdrawal", "back out", "backed out"],
  application: ["application", "applications", "apply", "applying", "applied", "volume", "volumes"],
  intern:      ["intern", "internship", "internships", "placement", "placements", "work experience", "vacation work", "clerkship"],
  conversion:  ["conversion", "convert", "converting", "retained", "retention", "intern to grad", "pipeline", "intern to graduate"],
  offer:       ["offer", "offers", "acceptance", "accepted", "decline", "declined", "multiple offers"],
  cost:        ["cost", "costs", "spend", "spending", "budget", "marketing cost", "selection cost", "cost per hire"],
  career:      ["career", "career progression", "career development", "progression", "growth", "advancement"],
  diversity:   ["diversity", "dei", "indigenous", "disability", "inclusion", "equity"],
  virtual:     ["virtual", "online", "remote", "hybrid", "digital", "video"],
  assessment:  ["assessment", "assessments", "testing", "psychometric", "screening", "selection"],
  rotation:    ["rotation", "rotations", "rotate", "rotating", "rotational"],
  nps:         ["nps", "net promoter", "promoter score", "recommend", "recommendation"],
  engagement:  ["engagement", "engaged", "nes", "net engagement", "engagement score"],
  wellbeing:   ["wellbeing", "well-being", "wellness", "mental health", "authentic self", "psychological safety"],
  flexibility: ["flexibility", "flexible", "remote", "hybrid", "wfh", "work from home", "compressed week"],
  trend:       ["trend", "trends", "growing", "increasing", "declining", "changing", "shifting", "surge"],
  challenge:   ["challenge", "challenges", "problem", "problems", "pain point", "issue", "struggle"],
  candidate:   ["candidate", "candidates", "student", "students", "graduate", "graduates", "applicant"],
  employer:    ["employer", "employers", "company", "companies", "organisation", "organization", "hiring"],
};

/** Words that carry no search signal and are skipped during keyword extraction. */
const STOP_WORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","have","has","had",
  "do","does","did","will","would","shall","should","may","might","can","could",
  "i","me","my","we","our","you","your","he","she","it","they","them","their",
  "this","that","these","those","what","which","who","whom","how","when","where",
  "why","if","then","so","but","and","or","not","no","nor","for","with","about",
  "from","into","to","of","on","in","at","by","up","out","as","just","also",
  "than","very","too","any","each","all","both","few","more","most","some",
  "such","only","own","same","other","new","old","like","want","wants","need",
  "needs","tell","telling","told","ask","asking","asked","know","knows","talk",
  "talking","client","clients","rep","reps","sales","customer","customers",
  "per","its","get","got","many","much","well","way",
]);

/**
 * Type-safe mapping from anecdote category strings to ReportType.
 * If a new category is added to anecdotes without a matching entry here,
 * the fallback will apply and TypeScript will surface the gap at the call site.
 */
const CATEGORY_TO_REPORT: Record<string, ReportType> = {
  employer:  "employer",
  candidate: "candidate",
  graduate:  "graduate",
  intern:    "intern",
};

/**
 * Static report-type registry. Defined at module scope so it is allocated
 * once rather than rebuilt on every smartSearch() call.
 */
const ALL_REPORT_TYPES: { type: ReportType; metrics: Metric[] }[] = [
  { type: "employer",  metrics: employerMetrics },
  { type: "candidate", metrics: candidateMetrics },
  { type: "graduate",  metrics: graduateMetrics },
  { type: "intern",    metrics: internMetrics },
];

// ── Scoring weights ──────────────────────────────────────────────────────────
// Centralised so they are easy to tune without hunting through the scoring logic.

/** Extra multiplier applied to a keyword's base score when the match is in the label field. */
const LABEL_SCORE_MULTIPLIER = 3;

/** Bonus applied when the entire normalised query phrase appears verbatim in the label. */
const EXACT_PHRASE_BONUS = 25;

/** Bonus applied when every individual query word appears in the label (but not as a contiguous phrase). */
const ALL_WORDS_IN_LABEL_BONUS = 15;

/** Flat bonus applied to featured anecdotes to nudge them up in results. */
const FEATURED_ANECDOTE_BONUS = 10;

/** Base score awarded for a keyword match of 5+ characters. */
const SCORE_LONG_KEYWORD = 3;

/** Base score awarded for a keyword match of 3–4 characters. */
const SCORE_MID_KEYWORD = 2;

/** Base score awarded for a keyword match of 1–2 characters. */
const SCORE_SHORT_KEYWORD = 1;

// ── Types ────────────────────────────────────────────────────────────────────

export interface SearchResult {
  type: "metric" | "anecdote";
  id: string;
  title: string;
  snippet: string;
  score: number;
  metric?: Metric;
  anecdote?: Anecdote;
  matchedKeywords: string[];
  reportType?: ReportType;
}

// ── Module-level memoisation cache ───────────────────────────────────────────
// Avoids re-running the full O(n × f × k) scan when the same prompt is
// submitted twice (e.g. on a React re-render).

let _cachedPrompt = "";
let _cachedResults: SearchResult[] = [];

// ── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Normalises a raw prompt into a lowercase string with consistent single spaces
 * and no special characters (except word-internal hyphens and apostrophes).
 */
function normaliseInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts meaningful keywords from a natural-language prompt and expands them
 * via the concept synonym map.
 *
 * @param input - Already-normalised (lowercase, single-spaced) prompt string.
 * @returns Deduplicated array of keywords and their concept-group synonyms.
 */
function extractKeywords(input: string): string[] {
  const words = input.split(" ").filter(w => w.length > 1 && !STOP_WORDS.has(w));

  const expanded = new Set<string>();

  for (const word of words) {
    expanded.add(word);

    // Match this word against each concept group and expand the whole group.
    // Break early once a group is matched — one word maps to one group.
    for (const synonyms of Object.values(CONCEPT_MAP)) {
      if (synonyms.some(s => s.includes(word) || word.includes(s))) {
        synonyms.forEach(s => expanded.add(s));
        break;
      }
    }
  }

  // Also check whether any multi-word synonym phrase appears verbatim in the input.
  for (const synonyms of Object.values(CONCEPT_MAP)) {
    for (const syn of synonyms) {
      if (syn.includes(" ") && input.includes(syn)) {
        synonyms.forEach(s => expanded.add(s));
        break; // matched this group; no need to check remaining synonyms
      }
    }
  }

  return Array.from(expanded);
}

/**
 * Scores how well a pre-lowercased text string matches the given keyword set.
 *
 * Longer keyword matches are weighted higher to favour specific terms over
 * short/common ones.
 *
 * @param lowerText - Text to search, already lowercased by the caller.
 * @param keywords  - Keyword set produced by extractKeywords().
 */
function scoreText(
  lowerText: string,
  keywords: string[],
): { score: number; matched: string[] } {
  let score = 0;
  const matched: string[] = [];

  for (const kw of keywords) {
    if (lowerText.includes(kw)) {
      score +=
        kw.length >= 5 ? SCORE_LONG_KEYWORD :
        kw.length >= 3 ? SCORE_MID_KEYWORD  :
                         SCORE_SHORT_KEYWORD;
      matched.push(kw);
    }
  }

  return { score, matched };
}

/**
 * Builds a short contextual snippet from the text that scores highest against
 * the keyword set, centred on the first keyword occurrence.
 *
 * @param texts    - Candidate text strings in priority order.
 * @param keywords - Keyword set used to pick the best text and find the anchor.
 * @param maxLen   - Fallback truncation length when no keyword is found (default 120).
 */
function makeSnippet(texts: string[], keywords: string[], maxLen = 120): string {
  let bestText = texts[0] || "";
  let bestScore = 0;

  for (const t of texts) {
    if (!t) continue;
    const { score } = scoreText(t.toLowerCase(), keywords);
    if (score > bestScore) {
      bestScore = score;
      bestText = t;
    }
  }

  const lower = bestText.toLowerCase();

  for (const kw of keywords) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      const start = Math.max(0, idx - 40);
      const end   = Math.min(bestText.length, idx + kw.length + 80);
      return (
        (start > 0 ? "…" : "") +
        bestText.slice(start, end).trim() +
        (end < bestText.length ? "…" : "")
      );
    }
  }

  return bestText.slice(0, maxLen) + (bestText.length > maxLen ? "…" : "");
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Runs smart search across all report types and anecdotes.
 *
 * Scoring summary:
 *  - Each field of a metric/anecdote is scored against the expanded keyword set.
 *  - Label field receives a ×3 multiplier (LABEL_SCORE_MULTIPLIER).
 *  - +25 if the exact normalised query phrase appears verbatim in the label (EXACT_PHRASE_BONUS).
 *  - +15 if every individual query word appears in the label (ALL_WORDS_IN_LABEL_BONUS).
 *  - +10 flat bonus for featured anecdotes (FEATURED_ANECDOTE_BONUS).
 *
 * Results are sorted descending by score. The same prompt string returns the
 * cached result set without re-running the scan.
 *
 * @param prompt - Raw user input string. Capped at MAX_PROMPT_LENGTH characters.
 * @returns Sorted array of SearchResult objects (metrics and anecdotes interleaved).
 */
export function smartSearch(prompt: string): SearchResult[] {
  if (!prompt || prompt.trim().length < 3) return [];

  // Normalise and cap input length to prevent main-thread blocking.
  const normalised = normaliseInput(prompt.slice(0, MAX_PROMPT_LENGTH));

  // Return cached result for identical prompt (e.g. on React re-render).
  if (normalised === _cachedPrompt) return _cachedResults;

  const keywords = extractKeywords(normalised);
  if (keywords.length === 0) return [];

  // Pre-compute individual query words once for the all-words-in-label check.
  const queryWords = normalised
    .split(" ")
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));

  const results: SearchResult[] = [];

  // ── Score metrics across all report types ──────────────────────────────────
  for (const { type, metrics } of ALL_REPORT_TYPES) {
    for (const metric of metrics) {
      // Pre-lowercase the label once; reused for all label-specific checks.
      const labelLower = metric.label.toLowerCase();

      // Score non-label fields.
      const otherFields = [
        metric.description,
        metric.category,
        metric.consistencyNote ?? "",
        ...metric.dataPoints.map(d => d.source),
        ...metric.dataPoints.map(d => d.questionNote ?? ""),
      ];

      let totalScore = 0;
      const allMatchedSet = new Set<string>();

      for (const field of otherFields) {
        if (!field) continue;
        const { score, matched } = scoreText(field.toLowerCase(), keywords);
        totalScore += score;
        matched.forEach(kw => allMatchedSet.add(kw));
      }

      // Label scoring — single pass, boosted by LABEL_SCORE_MULTIPLIER.
      const { score: labelScore, matched: labelMatched } = scoreText(labelLower, keywords);
      totalScore += labelScore * LABEL_SCORE_MULTIPLIER;
      labelMatched.forEach(kw => allMatchedSet.add(kw));

      // Exact query phrase bonus.
      if (normalised.length >= 3 && labelLower.includes(normalised)) {
        totalScore += EXACT_PHRASE_BONUS;
      }

      // All individual query words present in label bonus (requires 2+ words).
      if (queryWords.length >= 2 && queryWords.every(w => labelLower.includes(w))) {
        totalScore += ALL_WORDS_IN_LABEL_BONUS;
      }

      if (totalScore > 0) {
        const textsForSnippet = [metric.description, ...otherFields];
        results.push({
          type: "metric",
          id: metric.id,
          title: metric.label,
          snippet: makeSnippet(textsForSnippet, keywords),
          score: totalScore,
          metric,
          matchedKeywords: Array.from(allMatchedSet),
          reportType: type,
        });
      }
    }
  }

  // ── Score all anecdotes ────────────────────────────────────────────────────
  for (const anecdote of anecdotes) {
    const fields = [
      anecdote.title,
      anecdote.quote,
      anecdote.context,
      anecdote.relevance,
      anecdote.source.meeting,
    ];

    let totalScore = 0;
    const allMatchedSet = new Set<string>();

    for (const field of fields) {
      if (!field) continue;
      const { score, matched } = scoreText(field.toLowerCase(), keywords);
      totalScore += score;
      matched.forEach(kw => allMatchedSet.add(kw));
    }

    // Flat bonus for featured anecdotes — easier to reason about than a multiplier.
    if (anecdote.featured) totalScore += FEATURED_ANECDOTE_BONUS;

    if (totalScore > 0) {
      results.push({
        type: "anecdote",
        id: anecdote.id,
        title: anecdote.title,
        snippet: makeSnippet([anecdote.quote, anecdote.context, anecdote.relevance], keywords),
        score: totalScore,
        anecdote,
        matchedKeywords: Array.from(allMatchedSet),
        reportType: CATEGORY_TO_REPORT[anecdote.category] ?? "employer",
      });
    }
  }

  results.sort((a, b) => b.score - a.score);

  // Update memoisation cache.
  _cachedPrompt = normalised;
  _cachedResults = results;

  return results;
}
