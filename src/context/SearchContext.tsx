import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react";
import { ReportType } from "@/data/aageData";
import { smartSearch, SearchResult } from "@/lib/smartSearch";

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  reportType: ReportType;
}

const SearchContext = createContext<SearchContextValue>({
  query: "",
  setQuery: () => {},
  results: [],
  reportType: "employer",
});

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children, reportType }: { children: ReactNode; reportType: ReportType }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return smartSearch(query, reportType);
  }, [query, reportType]);

  const value = useMemo(
    () => ({ query, setQuery, results, reportType }),
    [query, results, reportType]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
