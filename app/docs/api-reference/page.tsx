import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# API Reference

Use this page as an index for the three forensic binaries and shared model concepts.

## Product APIs

- [Bitex API](/docs/bitex/api)
- [Tracium API](/docs/tracium/api)
- [Evidex API](/docs/evidex/api)

## Shared Concepts

- Custody chain models in each repository under \`pkg/models/custody_chain.go\`
- CLI config parsing in \`internal/config\`
- Authenticated HTTP sender packages under \`internal/sender\`

## Choosing The Right API

| Need | Primary package |
|------|------------------|
| Disk metadata analysis with TSK | Bitex \`internal/tsk\` |
| Endpoint + timeline artifact collection | Tracium \`internal/acquisition\` + \`internal/forensics\` |
| File/package acquisition with metadata extractors | Evidex \`internal/acquisition\` + \`internal/metadata\` |

## Next Step

Start with one product API page above, then cross-reference shared patterns in [SDK](/docs/sdk).
`;

const components = mdxComponents;

export default async function APIReferencePage() {
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
