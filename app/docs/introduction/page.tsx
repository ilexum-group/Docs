import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `# Introduction

Ilexum Group is an open-source forensic toolkit for incident response and digital investigations. It is composed of three focused binaries:

- **Bitex** for disk metadata analysis through The Sleuth Kit (TSK)
- **Tracium** for live or image-based system artifact collection
- **Evidex** for read-only evidence acquisition and metadata extraction

## Why This Stack

Most forensic pipelines need all three layers:

1. Storage-level visibility
2. Host-level activity artifacts
3. File-level evidence packages

Ilexum Group keeps these concerns separated, but aligned through a shared custody model and compatible payload design.

## Product Map

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| **Bitex** | Metadata-first disk analysis with TSK | Disk images and block devices | Partition analysis, fs stats, file listings |
| **Tracium** | Host and artifact acquisition | Live systems or mounted forensic images | \`SystemData\` + \`ForensicsData\` |
| **Evidex** | Evidence package acquisition | Files/directories | \`EvidencePackage\` with hashes and metadata |

<Callout type="info" title="Shared Architecture">
All three tools use a shared custody-chain approach, RFC 5424 logging style, and authenticated HTTP transmission to remote analysis backends.
</Callout>

## Core Forensic Guarantees

- **Read-only collection paths** across acquisition flows
- **Cryptographic integrity checks** embedded in evidence/custody metadata
- **End-to-end execution traceability** for commands and operations
- **Cross-platform coverage** including Linux, Windows, macOS, FreeBSD, and OpenBSD
- **Composable architecture** with explicit model contracts in each repository

## Repository Modules

\`\`\`go
github.com/ilexum-group/bitex
github.com/ilexum-group/tracium
github.com/ilexum-group/evidex
\`\`\`

## Typical Workflow

\`\`\`text
Bitex (disk metadata baseline)
  -> Tracium (host timeline + artifacts)
  -> Evidex (targeted file acquisition package)
\`\`\`

Use this sequence when you need both breadth (system context) and depth (high-value files) with complete custody traceability.

## Standards Alignment

The Ilexum Group tools are designed to meet established digital forensics standards:

- **ISO 27037**: Guidelines for identification, collection, acquisition, and preservation of digital evidence
- **NIST SP 800-86**: Guide to computer and network forensics
- **Daubert Standard**: Admissibility requirements for scientific evidence

## Navigation

- [Getting Started](/docs/getting-started)
- [Bitex](/docs/bitex)
- [Tracium](/docs/tracium)
- [Evidex](/docs/evidex)
- [API Reference Hub](/docs/api-reference)
`;

const components = { ...mdxComponents, Callout };

export default async function IntroductionPage() {
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
