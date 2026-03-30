import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Tracium CLI Reference

Complete command-line interface documentation for Tracium.

## Synopsis

\`\`\`bash
tracium [flags]
\`\`\`

## Flags

| Flag | Short | Type | Required | Description |
|------|-------|------|----------|-------------|
| \`--server\` | \`-s\` | string | Yes | Remote server URL |
| \`--token\` | \`-t\` | string | Yes | Authentication token |
| \`--case-id\` | \`-c\` | string | Yes | Case identifier |
| \`--image\` | \`-i\` | string | No | Path to forensic image |
| \`--help\` | \`-h\` | | | Show help |
| \`--version\` | \`-v\` | | | Show version |

<Callout type="info" title="Offline Mode">
The \`--image\` flag enables offline analysis of forensic images.
</Callout>

## Examples

### Live System Collection

\`\`\`bash
tracium \\
  --server https://forensics.example.com \\
  --token my_auth_token \\
  --case-id CASE-2024-001
\`\`\`

### Forensic Image Analysis

\`\`\`bash
tracium \\
  --server https://forensics.example.com \\
  --token my_auth_token \\
  --case-id CASE-2024-042 \\
  --image /evidence/memory-image.mem
\`\`\`
`;

const components = { ...mdxComponents, Callout };

export default async function TraciumCLIPage() {
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
