import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react";
import { employerMetrics, candidateMetrics, ReportType } from "@/data/aageData";
import { anecdotes } from "@/data/anecdotes";

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  matchCount: number;
  reportType: ReportType;
}

const SearchContext = createContext<SearchContextValue>({
  query: "",
  setQuery: () => {},
  matchCount: 0,
  reportType: "employer",
});

export const useSearch = () => useContext(SearchContext);

function countMatches(text: string, query: string): number {
  if (!query || query.length < 2) return 0;
  const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return (text.match(regex) || []).length;
}

export function SearchProvider({ children, reportType }: { children: ReactNode; reportType: ReportType }) {
  const [query, setQuery] = useState("");

  const matchCount = useMemo(() => {
    if (!query || query.length < 2) return 0;
    const metrics = reportType === "employer" ? employerMetrics : candidateMetrics;
    let count = 0;

    for (const m of metrics) {
      count += countMatches(m.label, query);
      count += countMatches(m.description, query);
      count += countMatches(m.category, query);
      count += countMatches(m.consistencyNote ?? "", query);
      for (const dp of m.dataPoints) {
        count += countMatches(dp.source, query);
        count += countMatches(dp.questionNote ?? "", query);
        count += countMatches(dp.pageRef ?? "", query);
      }
    }

    const relevantAnecdotes = anecdotes.filter(
      (a) => a.category === reportType || a.category === "both"
    );
    for (const a of relevantAnecdotes) {
      count += countMatches(a.title, query);
      count += countMatches(a.quote, query);
      count += countMatches(a.context, query);
      count += countMatches(a.relevance, query);
      count += countMatches(a.source.meeting, query);
    }

    return count;
  }, [query, reportType]);

  const value = useMemo(
    () => ({ query, setQuery, matchCount, reportType }),
    [query, matchCount, reportType]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
