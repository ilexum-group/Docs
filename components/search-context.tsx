"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType>({
  isSearchOpen: false,
  setSearchOpen: () => {},
});

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <SearchContext.Provider value={{ isSearchOpen, setSearchOpen }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
