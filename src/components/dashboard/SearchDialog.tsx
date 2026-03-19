import { useRef, useEffect } from "react";
import { useSearch } from "@/context/SearchContext";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { Metric, ReportType } from "@/data/aageData";
import { MessageSquareText, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectMetric: (metric: Metric, reportType?: ReportType) => void;
}

export function SearchDialog({ open, onClose, onSelectMetric }: SearchDialogProps) {
  const { query, setQuery, results } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-4xl mx-4 max-h-[70vh] bg-popover border border-border rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            {/* Search input - always at top */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border shrink-0">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about trends, e.g. &quot;client asking about AI&quot;…"
                className="flex-1 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-[10px] font-mono-data text-muted-foreground px-1.5 py-0.5 rounded border border-border"
              >
                ESC
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden">
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about trends, e.g. &quot;client asking about AI&quot;…"
                className="flex-1 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-[10px] font-mono-data text-muted-foreground px-1.5 py-0.5 rounded border border-border"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            {query.length >= 3 && results.length > 0 ? (
              <div className="max-h-[50vh] overflow-y-auto">
                <SearchResultsInline
                  results={results}
                  onSelectMetric={(m, rt) => { onSelectMetric(m, rt); onClose(); }}
                />
              </div>
            ) : query.length >= 3 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-muted-foreground">No results found</p>
                <p className="text-[11px] text-muted-foreground mt-1">Try different keywords or a broader search</p>
              </div>
            ) : (
              <div className="px-5 py-8 text-center">
                <MessageSquareText className="w-6 h-6 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Describe what your client needs</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  We'll surface relevant metrics &amp; anecdotes across all 4 surveys
                </p>
              </div>
            )}

            <div className="px-5 py-2.5 border-t border-border bg-muted/30">
              <p className="text-[10px] text-muted-foreground text-center">
                🔍 Searching across Employer, Candidate, Graduate &amp; Intern surveys
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Inline results list (reuses same data as SearchResultsPanel but rendered inline) */
import { SearchResult } from "@/lib/smartSearch";
import { employerMetrics, candidateMetrics, graduateMetrics, internMetrics } from "@/data/aageData";
import { BarChart3, MessageSquareQuote, Sparkles } from "lucide-react";

const REPORT_LABELS: Record<ReportType, string> = {
  employer: "Employer", candidate: "Candidate", graduate: "Graduate", intern: "Intern",
};
const REPORT_COLORS: Record<ReportType, string> = {
  employer: "bg-employer/15 text-employer",
  candidate: "bg-candidate/15 text-candidate",
  graduate: "bg-graduate/15 text-graduate",
  intern: "bg-accent/15 text-accent",
};

function SearchResultsInline({ results, onSelectMetric }: { results: SearchResult[]; onSelectMetric: (m: Metric, rt: ReportType) => void }) {
  const metricResults = results.filter(r => r.type === "metric");
  const anecdoteResults = results.filter(r => r.type === "anecdote");
  const allMetrics = [...employerMetrics, ...candidateMetrics, ...graduateMetrics, ...internMetrics];

  return (
    <div>
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono-data">
          {metricResults.length} metrics · {anecdoteResults.length} anecdotes
        </span>
      </div>

      {metricResults.length > 0 && (
        <div className="p-2">
          <p className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Relevant Metrics</p>
          {metricResults.slice(0, 8).map((r) => (
            <button
              key={`${r.reportType}-${r.id}`}
              onClick={() => { if (r.metric && r.reportType) onSelectMetric(r.metric, r.reportType); }}
              className="w-full text-left px-3 py-2.5 rounded-md hover:bg-muted/50 transition-snap group"
            >
              <div className="flex items-start gap-2.5">
                <BarChart3 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-foreground group-hover:text-primary transition-snap truncate">{r.title}</p>
                    {r.reportType && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-mono-data rounded shrink-0 ${REPORT_COLORS[r.reportType]}`}>
                        {REPORT_LABELS[r.reportType]}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{r.snippet}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {r.matchedKeywords.slice(0, 4).map(kw => (
                      <span key={kw} className="px-1.5 py-0.5 text-[9px] font-mono-data bg-primary/10 text-primary rounded">{kw}</span>
                    ))}
                  </div>
                </div>
                <span className="text-[9px] font-mono-data text-muted-foreground shrink-0">
                  {Math.round((r.score / results[0].score) * 100)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {anecdoteResults.length > 0 && (
        <div className="p-2 border-t border-border">
          <p className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Supporting Anecdotes</p>
          {anecdoteResults.slice(0, 4).map((r) => (
            <button
              key={r.id}
              onClick={() => {
                if (r.anecdote?.metricIds[0]) {
                  const metric = allMetrics.find((m) => m.id === r.anecdote!.metricIds[0]);
                  if (metric && r.reportType) onSelectMetric(metric, r.reportType);
                }
              }}
              className="w-full text-left px-3 py-2.5 rounded-md hover:bg-muted/50 transition-snap group"
            >
              <div className="flex items-start gap-2.5">
                <MessageSquareQuote className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-foreground group-hover:text-accent transition-snap truncate">{r.title}</p>
                    {r.reportType && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-mono-data rounded shrink-0 ${REPORT_COLORS[r.reportType]}`}>
                        {REPORT_LABELS[r.reportType]}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 italic">"{r.snippet}"</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
