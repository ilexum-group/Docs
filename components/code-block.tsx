"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

function CopyIcon({ className }: { className?: string }) {
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
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function CodeBlock({
  code,
  language = "plaintext",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki");
        const html = await codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        });
        setHighlightedCode(html);
      } catch {
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      }
    }
    highlight();
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-codeblock="true"
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50 bg-[#0d1117]",
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 bg-[#161b22]">
          <span className="text-xs text-muted-foreground font-mono">
            {filename}
          </span>
          <span className="text-xs text-muted-foreground uppercase">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 h-8 w-8 opacity-100 transition-opacity z-20 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center border border-gray-700"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : (
            <CopyIcon className="h-4 w-4 text-gray-300" />
          )}
          <span className="sr-only">Copy code</span>
        </button>
        {highlightedCode ? (
          <div
            className="overflow-x-auto p-4 text-sm [&_pre]:bg-transparent [&_pre]:p-0 [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <pre className="p-4 text-sm font-mono overflow-x-auto">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
