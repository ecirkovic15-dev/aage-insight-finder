// Client-side "smart search" — extracts keywords from natural language prompts
// and scores metrics + anecdotes by relevance. No backend required.

import { Metric, employerMetrics, candidateMetrics, graduateMetrics, internMetrics, ReportType } from "@/data/aageData";
import { Anecdote, anecdotes } from "@/data/anecdotes";

// ── Synonyms & concept mapping ──────────────────────────────────────────────
// Maps common conversational terms to the actual keywords in our dataset
const CONCEPT_MAP: Record<string, string[]> = {
  ai:        ["ai", "artificial intelligence", "auto-apply", "chatgpt", "automation", "agents"],
  salary:    ["salary", "salaries", "pay", "compensation", "remuneration", "wage", "starting salary"],
  reneg:     ["reneg", "reneging", "renege", "reneged", "withdraw", "withdrawal", "back out", "backed out"],
  application: ["application", "applications", "apply", "applying", "applied", "volume", "volumes"],
   intern:    ["intern", "internship", "internships", "placement", "placements", "work experience", "vacation work", "clerkship"],
   conversion:["conversion", "convert", "converting", "retained", "retention", "intern to grad", "pipeline", "intern to graduate"],
  offer:     ["offer", "offers", "acceptance", "accepted", "decline", "declined", "multiple offers"],
  cost:      ["cost", "costs", "spend", "spending", "budget", "marketing cost", "selection cost", "cost per hire"],
  career:    ["career", "career progression", "career development", "progression", "growth", "advancement"],
  diversity: ["diversity", "dei", "indigenous", "disability", "inclusion", "equity"],
  virtual:   ["virtual", "online", "remote", "hybrid", "digital", "video"],
   assessment:["assessment", "assessments", "testing", "psychometric", "screening", "selection"],
   rotation:  ["rotation", "rotations", "rotate", "rotating", "rotational"],
   nps:       ["nps", "net promoter", "promoter score", "recommend", "recommendation"],
   engagement:["engagement", "engaged", "nes", "net engagement", "engagement score"],
   wellbeing: ["wellbeing", "well-being", "wellness", "mental health", "authentic self", "psychological safety"],
   flexibility:["flexibility", "flexible", "remote", "hybrid", "wfh", "work from home", "compressed week"],
  trend:     ["trend", "trends", "growing", "increasing", "declining", "changing", "shifting", "surge"],
  challenge: ["challenge", "challenges", "problem", "problems", "pain point", "issue", "struggle"],
  candidate: ["candidate", "candidates", "student", "students", "graduate", "graduates", "applicant"],
  employer:  ["employer", "employers", "company", "companies", "organisation", "organization", "hiring"],
};

// Stop words to ignore
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
]);

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

/** Extract meaningful keywords from a natural language prompt */
function extractKeywords(input: string): string[] {
  const normalized = input.toLowerCase().replace(/[^\w\s'-]/g, " ");
  const words = normalized.split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
  
  // Expand through concept map
  const expanded = new Set<string>();
  for (const word of words) {
    expanded.add(word);
    // Check if this word appears in any concept group
    for (const [_concept, synonyms] of Object.entries(CONCEPT_MAP)) {
      if (synonyms.some(s => s.includes(word) || word.includes(s))) {
        synonyms.forEach(s => expanded.add(s));
      }
    }
  }
  
  // Also check multi-word phrases from input
  for (const [_concept, synonyms] of Object.entries(CONCEPT_MAP)) {
    for (const syn of synonyms) {
      if (syn.includes(" ") && normalized.includes(syn)) {
        synonyms.forEach(s => expanded.add(s));
      }
    }
  }
  
  return Array.from(expanded);
}

/** Score how well a text matches a set of keywords */
function scoreText(text: string, keywords: string[]): { score: number; matched: string[] } {
  const lower = text.toLowerCase();
  let score = 0;
  const matched: string[] = [];
  
  for (const kw of keywords) {
    if (lower.includes(kw)) {
      // Longer keyword matches are worth more
      score += kw.length >= 5 ? 3 : kw.length >= 3 ? 2 : 1;
      if (!matched.includes(kw)) matched.push(kw);
    }
  }
  return { score, matched };
}

/** Create a short snippet from the best-matching text */
function makeSnippet(texts: string[], keywords: string[], maxLen = 120): string {
  let bestText = texts[0] || "";
  let bestScore = 0;
  
  for (const t of texts) {
    const { score } = scoreText(t, keywords);
    if (score > bestScore) {
      bestScore = score;
      bestText = t;
    }
  }
  
  // Find first keyword occurrence and extract surrounding context
  const lower = bestText.toLowerCase();
  for (const kw of keywords) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      const start = Math.max(0, idx - 40);
      const end = Math.min(bestText.length, idx + kw.length + 80);
      const snippet = (start > 0 ? "…" : "") + bestText.slice(start, end).trim() + (end < bestText.length ? "…" : "");
      return snippet;
    }
  }
  
  return bestText.slice(0, maxLen) + (bestText.length > maxLen ? "…" : "");
}

/** Run smart search across all metrics and anecdotes */
export function smartSearch(prompt: string, reportType: ReportType): SearchResult[] {
  if (!prompt || prompt.trim().length < 3) return [];
  
  const keywords = extractKeywords(prompt);
  if (keywords.length === 0) return [];
  
  const results: SearchResult[] = [];
  const metricsMap: Record<ReportType, Metric[]> = {
    employer: employerMetrics,
    candidate: candidateMetrics,
    graduate: graduateMetrics,
    intern: internMetrics,
  };
  const metrics = metricsMap[reportType];
  
  // Score each metric
  for (const m of metrics) {
    const textsToSearch = [
      m.label,
      m.description,
      m.category,
      m.consistencyNote ?? "",
      ...m.dataPoints.map(d => d.source),
      ...m.dataPoints.map(d => d.questionNote ?? ""),
    ];
    
    let totalScore = 0;
    const allMatched: string[] = [];
    
    for (const t of textsToSearch) {
      const { score, matched } = scoreText(t, keywords);
      totalScore += score;
      matched.forEach(m => { if (!allMatched.includes(m)) allMatched.push(m); });
    }
    
    // Boost label matches (most important)
    const { score: labelScore } = scoreText(m.label, keywords);
    totalScore += labelScore * 2;
    
    if (totalScore > 0) {
      results.push({
        type: "metric",
        id: m.id,
        title: m.label,
        snippet: makeSnippet([m.description, ...textsToSearch], keywords),
        score: totalScore,
        metric: m,
        matchedKeywords: allMatched,
      });
    }
  }
  
  // Score anecdotes
  const relevantAnecdotes = anecdotes.filter(
    a => a.category === reportType || a.category === "both"
  );
  
  for (const a of relevantAnecdotes) {
    const textsToSearch = [a.title, a.quote, a.context, a.relevance, a.source.meeting];
    
    let totalScore = 0;
    const allMatched: string[] = [];
    
    for (const t of textsToSearch) {
      const { score, matched } = scoreText(t, keywords);
      totalScore += score;
      matched.forEach(m => { if (!allMatched.includes(m)) allMatched.push(m); });
    }
    
    // Boost featured anecdotes slightly
    if (a.featured) totalScore *= 1.2;
    
    if (totalScore > 0) {
      results.push({
        type: "anecdote",
        id: a.id,
        title: a.title,
        snippet: makeSnippet([a.quote, a.context, a.relevance], keywords),
        score: totalScore,
        anecdote: a,
        matchedKeywords: allMatched,
      });
    }
  }
  
  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  
  return results;
}
