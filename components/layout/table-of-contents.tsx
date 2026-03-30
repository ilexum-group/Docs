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

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    setHeadings([]);
    const timer = setTimeout(() => {
      // Only look at headings inside the article element
      const article = document.querySelector("article");
      if (!article) return;

      const headingElements = article.querySelectorAll("h1, h2, h3, h4");

      const headingData: Heading[] = [];
      const usedIds = new Set<string>();

      headingElements.forEach((el) => {
        let id = el.id;
        if (!id || id === "") {
          const text = el.textContent || "";
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
        }

        // Ensure unique ID
        let uniqueId = id;
        let counter = 1;
        while (usedIds.has(uniqueId)) {
          uniqueId = `${id}-${counter}`;
          counter++;
        }
        usedIds.add(uniqueId);

        // Update DOM element if we changed the ID
        if (id !== uniqueId) {
          el.id = uniqueId;
        }

        headingData.push({
          id: uniqueId,
          text: el.textContent || "",
          level: parseInt(el.tagName.charAt(1)),
        });
      });

      setHeadings(headingData);
    }, 300);

    return () => clearTimeout(timer);
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
        <h4 className="text-sm font-semibold mb-4 text-foreground">
          On this page
        </h4>
        <p className="text-sm text-muted-foreground">No headings</p>
      </div>
    );
  }

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="px-4 py-6">
        <h4 className="text-sm font-semibold mb-4 text-foreground">
          On this page
        </h4>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block text-sm transition-colors py-1",
                heading.level === 1 && "font-medium",
                heading.level === 2 && "pl-0",
                heading.level === 3 && "pl-3",
                heading.level === 4 && "pl-6",
                activeId === heading.id
                  ? "text-foreground font-medium"
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
