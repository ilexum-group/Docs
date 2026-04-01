"use client";

import { CodeBlock } from "@/components/code-block";
import { Callout } from "@/components/callout";
import { ReactNode, createElement } from "react";
import { Link as LinkIcon } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function nodeText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => nodeText(child)).join(" ");
  }

  if (children && typeof children === "object" && "props" in children) {
    return nodeText((children as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
}

function Heading({
  level,
  children,
}: {
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  const text = nodeText(children);
  const id = slugify(text);

  return createElement(
    `h${level}`,
    { id, className: "group scroll-mt-20" },
    createElement(
      "a",
      {
        href: `#${id}`,
        className:
          "inline-flex items-center gap-2 no-underline hover:no-underline",
      },
      children,
      createElement(LinkIcon, {
        className:
          "h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100",
        "aria-hidden": true,
      })
    )
  );
}

function extractCodeFromChildren(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractCodeFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractCodeFromChildren((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  // Extract language from className if present (e.g., "language-bash")
  const className = (props as { className?: string }).className || "";
  const match = className.match(/language-(\w+)/);
  const language = match ? match[1] : "plaintext";

  // Try to extract code from children
  let code = extractCodeFromChildren(children);

  // If no code extracted, check if children is a code element
  if (!code && children && typeof children === "object" && "props" in children) {
    const childProps = (children as { props: { className?: string; children?: ReactNode } }).props;
    const childClassName = childProps.className || "";
    const childMatch = childClassName.match(/language-(\w+)/);
    if (childMatch) {
      // We have language from child but no code - try getting code from child's children
      code = extractCodeFromChildren(childProps.children);
    }
  }

  if (code) {
    return (
      <CodeBlock code={code} language={language} />
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-[#0d1117] my-4">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 bg-[#161b22]">
        <span className="text-xs text-muted-foreground uppercase">
          {language}
        </span>
      </div>
      <div className="relative">
        <button
          onClick={() => navigator.clipboard.writeText(code || String(children))}
          className="absolute right-2 top-2 h-8 w-8 opacity-100 z-20 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center border border-gray-700"
          aria-label="Copy code"
        >
          <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <pre {...props} className="p-4 text-sm font-mono overflow-x-auto">
          {children}
        </pre>
      </div>
    </div>
  );
}

function Anchor({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className="text-primary hover:underline" {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
      {...props}
    >
      {children}
    </a>
  );
}

function Table({
  children,
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border/60">
      <table
        {...props}
        className={`min-w-[36rem] border-collapse ${className ?? ""}`.trim()}
      >
        {children}
      </table>
    </div>
  );
}

function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const {
    src,
    alt,
    width,
    height,
    className,
  } = props;

  if (!src || typeof src !== "string") {
    return null;
  }

  return (
    <NextImage
      src={src}
      alt={alt ?? ""}
      width={typeof width === "number" ? width : 1200}
      height={typeof height === "number" ? height : 675}
      unoptimized
      className={`h-auto max-w-full ${className ?? ""}`.trim()}
      style={{ width: "100%", height: "auto" }}
    />
  );
}

export const mdxComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <Heading level={1}>{children}</Heading>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <Heading level={2}>{children}</Heading>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <Heading level={3}>{children}</Heading>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <Heading level={4}>{children}</Heading>
  ),
  pre: Pre,
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement> & { children?: ReactNode }) => {
    // If it's inside a pre (code block), let Pre handle it
    // This is for inline code
    if (className?.startsWith("language-")) {
      const match = className.match(/language-(\w+)/);
      const language = match ? match[1] : "plaintext";
      const code = extractCodeFromChildren(children);
      if (code) {
        return <CodeBlock code={code} language={language} />;
      }
    }
    return <code className={className} {...props}>{children}</code>;
  },
  table: Table,
  img: MdxImage,
  a: Anchor,
  Callout,
  wrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
};
