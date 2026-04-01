"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { navigation } from "@/lib/docs/navigation";
import { useRouter } from "next/navigation";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NavItem {
  title: string;
  href?: string;
  description?: string;
  children?: NavItem[];
}

interface FlatLink {
  title: string;
  href: string;
  category?: string;
}

function flattenNavigation(nav: NavItem[], category?: string): FlatLink[] {
  const links: FlatLink[] = [];
  nav.forEach((item) => {
    if (item.href) {
      links.push({ title: item.title, href: item.href, category });
    }
    if (item.children) {
      links.push(...flattenNavigation(item.children, item.title));
    }
  });
  return links;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const allLinks = useMemo(() => flattenNavigation(navigation), []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized === "") {
      return allLinks;
    }

    return allLinks.filter(
      (link) =>
        link.title.toLowerCase().includes(normalized) ||
        link.href.toLowerCase().includes(normalized) ||
        link.category?.toLowerCase().includes(normalized)
    );
  }, [allLinks, query]);

  const handleSelect = (href: string) => {
    router.push(href);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-1/4 translate-y-0 overflow-hidden rounded-xl p-0 gap-0 max-w-2xl w-[90vw]">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b p-4">
          <SearchIcon className="size-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus={open}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-sm opacity-70 hover:opacity-100 transition-opacity p-1 hover:bg-muted"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          ) : (
            <div className="space-y-1">
              {results.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleSelect(link.href!)}
                  className="w-full flex flex-col items-start gap-1 rounded-sm px-3 py-2 text-sm text-left transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="font-medium">{link.title}</span>
                  {link.category && (
                    <span className="text-xs text-muted-foreground">
                      {link.category}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t p-3 text-xs text-muted-foreground text-center">
          Press ESC to close
        </div>
      </DialogContent>
    </Dialog>
  );
}
