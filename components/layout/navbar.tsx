"use client";

import Link from "next/link";
import { ExternalLink, Search, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSearch } from "@/components/search-context";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchOpen } = useSearch();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center px-4 md:px-6">
        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden mr-2 inline-flex items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <div className="flex h-14 items-center border-b border-border/50 px-4">
              <Link
                href="/docs/introduction"
                className="flex items-center gap-2 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg font-bold tracking-tight">Ilexum Group Docs</span>
              </Link>
            </div>
            <Sidebar onLinkClick={() => setIsOpen(false)} className="border-0" />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          href="https://ilexumgroup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 mr-8"
        >
          <span className="text-xl font-bold tracking-tight">Ilexum Group</span>
          <span className="text-xs text-muted-foreground font-medium">
            Developer Docs
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link
            href="/docs/introduction"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Docs
          </Link>
          <Link
            href="/docs/api-reference"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            API Overview
          </Link>
          <Link
            href="/docs/examples"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Examples
          </Link>
          <Link
            href="https://github.com/ilexum-group"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            GitHub
          </Link>
        </nav>

        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 md:w-auto md:px-3 md:gap-2"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <ThemeToggle />

          <Link
            href="https://github.com/ilexum-group"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground h-9 w-9"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
