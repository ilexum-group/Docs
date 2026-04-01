"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const collectHeadings = () => {
      const article = document.querySelector("main article");
      if (!article) {
        setHeadings([]);
        return;
      }

      const headingElements = article.querySelectorAll<HTMLElement>("h1, h2, h3, h4");
      const usedIds = new Set<string>();

      const headingData = Array.from(headingElements)
        .map((el) => {
          const text = (el.textContent || "").trim();
          if (!text) {
            return null;
          }

          let id = (el.id || "").trim();
          if (!id) {
            id = slugify(text);
          }

          if (!id) {
            return null;
          }

          let uniqueId = id;
          let suffix = 1;
          while (usedIds.has(uniqueId)) {
            uniqueId = `${id}-${suffix}`;
            suffix += 1;
          }

          usedIds.add(uniqueId);
          if (el.id !== uniqueId) {
            el.id = uniqueId;
          }

          return {
            id: uniqueId,
            text,
            level: Number.parseInt(el.tagName.charAt(1), 10),
          };
        })
        .filter((heading): heading is Heading => heading !== null);

      setHeadings(headingData);
      if (headingData.length > 0) {
        setActiveId(headingData[0].id);
      }
    };

    collectHeadings();
    const observer = new MutationObserver(collectHeadings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return (
      <div className="px-4 py-6">
        <h4 className="mb-4 text-sm font-semibold text-foreground">
          On this page
        </h4>
        <p className="text-sm text-muted-foreground">No headings</p>
      </div>
    );
  }

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="px-4 py-6">
        <h4 className="mb-4 text-sm font-semibold text-foreground">
          On this page
        </h4>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block py-1 text-sm leading-6 transition-colors",
                heading.level === 1 && "font-medium",
                heading.level === 2 && "pl-0",
                heading.level === 3 && "pl-3",
                heading.level === 4 && "pl-6",
                activeId === heading.id
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </ScrollArea>
  );
}
