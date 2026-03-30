"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

interface CalloutProps {
  type?: "note" | "tip" | "warning" | "danger" | "info";
  title?: string;
  children: ReactNode;
  className?: string;
}

const calloutConfig = {
  note: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-500/10",
    iconClassName: "text-blue-500",
  },
  tip: {
    icon: Lightbulb,
    className: "border-green-500/50 bg-green-500/10",
    iconClassName: "text-green-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-500/10",
    iconClassName: "text-yellow-500",
  },
  danger: {
    icon: AlertCircle,
    className: "border-red-500/50 bg-red-500/10",
    iconClassName: "text-red-500",
  },
  info: {
    icon: CheckCircle2,
    className: "border-cyan-500/50 bg-cyan-500/10",
    iconClassName: "text-cyan-500",
  },
};

export function Callout({
  type = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-4 rounded-lg border p-4",
        config.className,
        className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClassName)} />
        <div className="flex-1 space-y-2">
          {title && (
            <p className="text-sm font-semibold">{title}</p>
          )}
          <div className="text-sm text-muted-foreground [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
