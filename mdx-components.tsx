import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./components/code-block";
import { Callout } from "./components/callout";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 id={String(children).toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-20">
        <a href={`#${String(children).toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
          {children}
        </a>
      </h1>
    ),
    h2: ({ children }) => (
      <h2 id={String(children).toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-20">
        <a href={`#${String(children).toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
          {children}
        </a>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={String(children).toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-20">
        <a href={`#${String(children).toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
          {children}
        </a>
      </h3>
    ),
    pre: ({ children }) => <pre className="my-4">{children}</pre>,
    a: ({ href, children }) => {
      if (href?.startsWith("/")) {
        return <Link href={href} className="text-primary hover:underline">{children}</Link>;
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>;
    },
    Callout,
    ...components,
  };
}
