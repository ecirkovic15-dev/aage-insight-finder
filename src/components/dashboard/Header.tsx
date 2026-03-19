import { ReportType, Metric } from "@/data/aageData";
import { useSearch } from "@/context/SearchContext";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { X, Search } from "lucide-react";
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

  useEffect(() => {
    setShowResults(query.length >= 3 && results.length > 0);
  }, [query, results]);

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
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          AAGE Longitudinal Intelligence
        </h1>
        <span className="font-mono-data text-xs text-muted-foreground">2023–2026</span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: "hsl(0, 53%, 88%)", color: "hsl(0, 40%, 45%)" }}>
          Internal Only
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div ref={containerRef} className="relative flex items-center">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (query.length >= 3 && results.length > 0) setShowResults(true); }}
            placeholder="Ask about trends, e.g. &quot;client asking about AI&quot;…"
            className="h-9 w-80 pl-8 pr-8 rounded-lg bg-background text-xs text-foreground placeholder:text-muted-foreground/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-snap"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setShowResults(false); inputRef.current?.focus(); }}
              className="absolute right-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {query.length >= 3 && (
            <span className="absolute -right-16 text-[10px] font-mono-data text-muted-foreground whitespace-nowrap">
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

        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 ml-14">
          {types.map((t) => (
            <button
              key={t.key}
              onClick={() => onReportTypeChange(t.key)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-snap ${
                reportType === t.key
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
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
