"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { navigation, NavItem } from "@/lib/docs/navigation";

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void;
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.href && pathname === item.href) {
    return true;
  }

  if (!item.children) {
    return false;
  }

  return item.children.some((child) => isItemActive(child, pathname));
}

function NavItemComponent({
  item,
  pathname,
  onLinkClick,
}: {
  item: NavItem;
  pathname: string;
  onLinkClick?: () => void;
}) {
  const active = isItemActive(item, pathname);
  const [isOpen, setIsOpen] = useState(active);

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        onClick={onLinkClick}
        className={cn(
          "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
          active
            ? "bg-accent text-accent-foreground font-semibold"
            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        )}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
          active
            ? "bg-accent text-accent-foreground font-semibold"
            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        )}
      >
        <span>{item.title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="ml-4 space-y-1 border-l border-border/50 pl-4">
          {item.children.map((child) => (
            <NavItemComponent
              key={child.href}
              item={child}
              pathname={pathname}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ className, onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const items = useMemo(() => navigation, []);

  return (
    <ScrollArea className={cn("h-full px-4 py-6", className)}>
      <nav className="space-y-1.5">
        {items.map((item) => (
          <NavItemComponent
            key={`${pathname}-${item.href || item.title}`}
            item={item}
            pathname={pathname}
            onLinkClick={onLinkClick}
          />
        ))}
      </nav>
    </ScrollArea>
  );
}
