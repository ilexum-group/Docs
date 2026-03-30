"use client";

import { useEffect } from "react";
import { DocsLayout } from "@/components/layout/docs-layout";
import { SearchCommand } from "@/components/search-command";
import { SearchProvider, useSearch } from "@/components/search-context";
import { CodeCopyButtons } from "@/components/code-copy-button";

function SearchHandler({ children }: { children: React.ReactNode }) {
  const { setSearchOpen } = useSearch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setSearchOpen]);

  return <>{children}</>;
}

function SearchDialogWrapper() {
  const { isSearchOpen, setSearchOpen } = useSearch();
  return (
    <SearchCommand open={isSearchOpen} onOpenChange={setSearchOpen} />
  );
}

export function DocsLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <SearchHandler>
        <DocsLayout>{children}</DocsLayout>
        <SearchDialogWrapper />
        <CodeCopyButtons />
      </SearchHandler>
    </SearchProvider>
  );
}
