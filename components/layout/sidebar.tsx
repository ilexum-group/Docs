"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { navigation, NavItem } from "@/lib/docs/navigation";

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void;
}

function NavItemComponent({
  item,
  isActive,
  onLinkClick,
}: {
  item: NavItem;
  isActive: boolean;
  onLinkClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(isActive);

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        onClick={onLinkClick}
        className={cn(
          "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
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
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
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
              isActive={false}
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

  return (
    <ScrollArea className={cn("h-full py-6 px-4", className)}>
      <nav className="space-y-1">
        {navigation.map((item) => (
          <NavItemComponent
            key={item.href || item.title}
            item={item}
            isActive={pathname === item.href}
            onLinkClick={onLinkClick}
          />
        ))}
      </nav>
    </ScrollArea>
  );
}
