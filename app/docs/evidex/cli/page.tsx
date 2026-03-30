import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Evidex CLI Reference

Complete command-line interface documentation for Evidex.

## Synopsis

\`\`\`bash
evidex [flags] filePaths...
\`\`\`

## Flags

| Flag | Short | Type | Required | Description |
|------|-------|------|----------|-------------|
| \`--server\` | \`-s\` | string | Yes | Remote server URL |
| \`--token\` | \`-t\` | string | Yes | Authentication token |
| \`--case-id\` | \`-c\` | string | Yes | Case identifier |
| \`--recursive\` | \`-r\` | bool | No | Recursively process directories |

## Examples

### Single File

\`\`\`bash
evidex --server https://forensics.example.com \\
  --token my_token \\
  --case-id CASE-001 \\
  /evidence/suspicious.pdf
\`\`\`

### Recursive Directory

\`\`\`bash
evidex -s https://forensics.example.com \\
  -t my_token \\
  -c CASE-001 \\
  -r /evidence/documents/
\`\`\`

<Callout type="info" title="Recursive Mode">
When \`-r\` is specified, Evidex recursively processes all files in directories.
</Callout>
`;

const components = { ...mdxComponents, Callout };

export default async function EvidexCLIPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-4xl">
      <MDXRemote
        source={mdxContent}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
