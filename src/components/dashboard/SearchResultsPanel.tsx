import { SearchResult } from "@/lib/smartSearch";
import { Metric, ReportType, employerMetrics, candidateMetrics, graduateMetrics, internMetrics } from "@/data/aageData";
import { BarChart3, MessageSquareQuote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const REPORT_LABELS: Record<ReportType, string> = {
  employer: "Employer",
  candidate: "Candidate",
  graduate: "Graduate",
  intern: "Intern",
};

const REPORT_COLORS: Record<ReportType, string> = {
  employer: "bg-employer/15 text-employer",
  candidate: "bg-candidate/15 text-candidate",
  graduate: "bg-graduate/15 text-graduate",
  intern: "bg-accent/15 text-accent",
};

interface SearchResultsPanelProps {
  results: SearchResult[];
  onSelectMetric: (metric: Metric, reportType: ReportType) => void;
  onClose: () => void;
}

export function SearchResultsPanel({ results, onSelectMetric, onClose }: SearchResultsPanelProps) {
  if (results.length === 0) return null;

  const metricResults = results.filter(r => r.type === "metric");
  const anecdoteResults = results.filter(r => r.type === "anecdote");

  const allMetrics = [...employerMetrics, ...candidateMetrics, ...graduateMetrics, ...internMetrics];

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
            {results.length} result{results.length !== 1 ? "s" : ""} across all surveys
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
          {metricResults.slice(0, 8).map((r) => (
            <button
              key={`${r.reportType}-${r.id}`}
              onClick={() => {
                if (r.metric && r.reportType) onSelectMetric(r.metric, r.reportType);
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-md hover:bg-muted/50 transition-snap group"
            >
              <div className="flex items-start gap-2.5">
                <BarChart3 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-foreground group-hover:text-primary transition-snap truncate">
                      {r.title}
                    </p>
                    {r.reportType && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-mono-data rounded shrink-0 ${REPORT_COLORS[r.reportType]}`}>
                        {REPORT_LABELS[r.reportType]}
                      </span>
                    )}
                  </div>
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
                if (r.anecdote?.metricIds[0]) {
                  const metric = allMetrics.find((m) => m.id === r.anecdote!.metricIds[0]);
                  if (metric && r.reportType) onSelectMetric(metric, r.reportType);
                }
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-md hover:bg-muted/50 transition-snap group"
            >
              <div className="flex items-start gap-2.5">
                <MessageSquareQuote className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-foreground group-hover:text-accent transition-snap truncate">
                      {r.title}
                    </p>
                    {r.reportType && (
                      <span className={`px-1.5 py-0.5 text-[9px] font-mono-data rounded shrink-0 ${REPORT_COLORS[r.reportType]}`}>
                        {REPORT_LABELS[r.reportType]}
                      </span>
                    )}
                  </div>
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
          🔍 Searching across all 4 surveys — Employer, Candidate, Graduate &amp; Intern
        </p>
      </div>
    </motion.div>
  );
}
