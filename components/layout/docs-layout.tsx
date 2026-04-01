"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, PenSquare } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { TableOfContents } from "@/components/layout/table-of-contents";
import { getBreadcrumbs } from "@/lib/docs/navigation";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const docSourcePath = `app${pathname.replace(/^\/docs/, "/docs")}/page.tsx`;
  const editUrl = `https://github.com/ilexum-group/Docs/blob/main/docs-site/${docSourcePath}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1600px]">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-[240px] lg:w-[280px] shrink-0 border-r border-border/50">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-6 lg:py-10">
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <nav
                className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
                aria-label="Breadcrumb"
              >
                <Link
                  href="/docs/introduction"
                  className="rounded px-2 py-1 hover:bg-accent hover:text-foreground"
                >
                  Docs
                </Link>
                {breadcrumbs.map((crumb, index) => (
                  <div key={`${crumb.title}-${index}`} className="flex items-center gap-1">
                    <ChevronRight className="h-3.5 w-3.5" />
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="rounded px-2 py-1 hover:bg-accent hover:text-foreground"
                      >
                        {crumb.title}
                      </Link>
                    ) : (
                      <span className="px-2 py-1 text-foreground">{crumb.title}</span>
                    )}
                  </div>
                ))}
              </nav>

              <Link
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <PenSquare className="h-3.5 w-3.5" />
                Edit on GitHub
              </Link>
            </div>

            <article className="max-w-3xl xl:max-w-4xl">
              {children}
            </article>
          </div>
        </main>

        {/* Right TOC */}
        <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0 border-l border-border/50">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  );
}