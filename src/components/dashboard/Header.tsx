import { ReportType, Metric } from "@/data/aageData";
import { useSearch } from "@/context/SearchContext";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { X, MessageSquareText } from "lucide-react";
import { useRef, useState, useEffect, RefObject } from "react";
import { AnimatePresence } from "framer-motion";

interface HeaderProps {
  reportType: ReportType;
  onReportTypeChange: (type: ReportType) => void;
  onSelectMetric: (metric: Metric, reportType?: ReportType) => void;
  searchInputRef?: RefObject<HTMLInputElement>;
}

export function Header({ reportType, onReportTypeChange, onSelectMetric, searchInputRef }: HeaderProps) {
  const { query, setQuery, results } = useSearch();
  const fallbackRef = useRef<HTMLInputElement>(null);
  const inputRef = searchInputRef || fallbackRef;
  const containerRef = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);

  // Show results when query changes and has results
  useEffect(() => {
    setShowResults(query.length >= 3 && results.length > 0);
  }, [query, results]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const types: { key: ReportType; label: string }[] = [
    { key: "employer", label: "Employer" },
    { key: "candidate", label: "Candidate" },
    { key: "graduate", label: "Graduate" },
    { key: "intern", label: "Intern" },
  ];

  return (
    <header className="h-14 bg-midnight flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold tracking-tight text-primary-foreground">
          AAGE Longitudinal Intelligence
        </h1>
        <span className="font-mono-data text-xs text-primary-foreground/60">2023–2026</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Conversational prompt input */}
        <div ref={containerRef} className="relative flex items-center">
          <MessageSquareText className="absolute left-2.5 w-3.5 h-3.5 text-primary-foreground/40 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (query.length >= 3 && results.length > 0) setShowResults(true); }}
            placeholder="Ask about trends, e.g. &quot;client asking about AI&quot;…"
            className="h-8 w-80 pl-8 pr-8 rounded-md bg-sidebar-accent text-xs text-primary-foreground placeholder:text-primary-foreground/40 border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-accent transition-snap"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setShowResults(false); inputRef.current?.focus(); }}
              className="absolute right-2 text-primary-foreground/50 hover:text-primary-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {query.length >= 3 && (
            <span className="absolute -right-16 text-[10px] font-mono-data text-primary-foreground/60 whitespace-nowrap">
              {results.length} match{results.length !== 1 ? "es" : ""}
            </span>
          )}

          <AnimatePresence>
            {showResults && (
              <SearchResultsPanel
                results={results}
                onSelectMetric={(metric, rt) => onSelectMetric(metric, rt)}
                onClose={() => setShowResults(false)}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1 bg-sidebar-accent rounded-lg p-1 ml-14">
          {types.map((t) => (
            <button
              key={t.key}
              onClick={() => onReportTypeChange(t.key)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-snap ${
                reportType === t.key
                  ? "bg-primary text-primary-foreground shadow-tight"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
