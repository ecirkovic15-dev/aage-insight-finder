import { ReportType } from "@/data/aageData";
import { useSearch } from "@/context/SearchContext";
import { Search, X } from "lucide-react";
import { useRef } from "react";

interface HeaderProps {
  reportType: ReportType;
  onReportTypeChange: (type: ReportType) => void;
}

export function Header({ reportType, onReportTypeChange }: HeaderProps) {
  const { query, setQuery, matchCount } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const types: { key: ReportType; label: string }[] = [
    { key: "employer", label: "Employer" },
    { key: "candidate", label: "Candidate" },
  ];

  return (
    <header className="h-14 bg-midnight flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold tracking-tight text-primary-foreground">
          AAGE Longitudinal Intelligence
        </h1>
        <span className="font-mono-data text-xs text-primary-foreground/60">2023–2026</span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-primary-foreground/40 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search metrics, anecdotes…"
            className="h-8 w-56 pl-8 pr-8 rounded-md bg-sidebar-accent text-xs text-primary-foreground placeholder:text-primary-foreground/40 border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-primary transition-snap"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-2 text-primary-foreground/50 hover:text-primary-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {query.length >= 2 && (
            <span className="absolute -right-14 text-[10px] font-mono-data text-primary-foreground/60 whitespace-nowrap">
              {matchCount} hit{matchCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-sidebar-accent rounded-lg p-1 ml-10">
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
