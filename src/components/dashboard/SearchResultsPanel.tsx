import { SearchResult } from "@/lib/smartSearch";
import { Metric, employerMetrics, candidateMetrics } from "@/data/aageData";
import { BarChart3, MessageSquareQuote, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResultsPanelProps {
  results: SearchResult[];
  onSelectMetric: (metric: Metric) => void;
  onClose: () => void;
}

export function SearchResultsPanel({ results, onSelectMetric, onClose }: SearchResultsPanelProps) {
  if (results.length === 0) return null;

  const metricResults = results.filter(r => r.type === "metric");
  const anecdoteResults = results.filter(r => r.type === "anecdote");

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full right-0 mt-2 w-[480px] max-h-[70vh] overflow-y-auto bg-popover border border-border rounded-lg shadow-lg z-50"
    >
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono-data">
          {metricResults.length} metrics · {anecdoteResults.length} anecdotes
        </span>
      </div>

      {metricResults.length > 0 && (
        <div className="p-2">
          <p className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Relevant Metrics
          </p>
          {metricResults.slice(0, 6).map((r) => (
            <button
              key={r.id}
              onClick={() => {
                if (r.metric) onSelectMetric(r.metric);
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-md hover:bg-muted/50 transition-snap group"
            >
              <div className="flex items-start gap-2.5">
                <BarChart3 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground group-hover:text-primary transition-snap truncate">
                    {r.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                    {r.snippet}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {r.matchedKeywords.slice(0, 4).map(kw => (
                      <span key={kw} className="px-1.5 py-0.5 text-[9px] font-mono-data bg-primary/10 text-primary rounded">
                        {kw}
                      </span>
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
          <p className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Supporting Anecdotes
          </p>
          {anecdoteResults.slice(0, 4).map((r) => (
            <button
              key={r.id}
              onClick={() => {
                // Find the first metric this anecdote maps to and navigate there
                if (r.anecdote?.metricIds[0]) {
                  const { employerMetrics, candidateMetrics } = require("@/data/aageData");
                  const allMetrics = [...employerMetrics, ...candidateMetrics];
                  const metric = allMetrics.find((m: Metric) => m.id === r.anecdote!.metricIds[0]);
                  if (metric) onSelectMetric(metric);
                }
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-md hover:bg-muted/50 transition-snap group"
            >
              <div className="flex items-start gap-2.5">
                <MessageSquareQuote className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground group-hover:text-accent transition-snap truncate">
                    {r.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 italic">
                    "{r.snippet}"
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {r.matchedKeywords.slice(0, 3).map(kw => (
                      <span key={kw} className="px-1.5 py-0.5 text-[9px] font-mono-data bg-accent/10 text-accent rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="px-4 py-2.5 border-t border-border bg-muted/30">
        <p className="text-[10px] text-muted-foreground text-center">
          💡 Try: "client asking about salary trends" or "candidates using AI to apply"
        </p>
      </div>
    </motion.div>
  );
}
