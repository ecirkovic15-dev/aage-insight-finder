import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { ReportType } from "@/data/aageData";
import { smartSearch, SearchResult } from "@/lib/smartSearch";

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
}

const SearchContext = createContext<SearchContextValue>({
  query: "",
  setQuery: () => {},
  results: [],
});

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => smartSearch(query), [query]);

  const value = useMemo(
    () => ({ query, setQuery, results }),
    [query, results]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
