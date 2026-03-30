"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { TableOfContents } from "@/components/layout/table-of-contents";
import { cn } from "@/lib/utils";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        {/* Left Sidebar */}
        <div className="hidden md:block w-[220px] lg:w-[260px] shrink-0 border-r border-border/50">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-6 lg:py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <article className="max-w-3xl">
              {children}
            </article>
          </div>
        </main>

        {/* Right TOC */}
        <div className="hidden xl:block w-[240px] shrink-0 border-l border-border/50">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  );
}