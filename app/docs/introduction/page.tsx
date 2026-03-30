import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `# Introduction

Ilexum is an open-source suite of forensic tools designed for digital investigations and incident response. The suite consists of three complementary tools: **Bitex**, **Tracium**, and **Evidex**.

## The Ecosystem

Each tool serves a specific purpose in the forensic workflow:

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| **Bitex** | Disk analysis via The Sleuth Kit | Disk images/devices | Partition tables, filesystem metadata, file listings |
| **Tracium** | System forensics collector | Live systems or forensic images | 16 categories of forensic artifacts |
| **Evidex** | Evidence acquisition | Files and directories | Metadata-rich evidence packages |

<Callout type="info" title="Shared Architecture">
All three tools share common design patterns: RFC 5424 compliant logging, chain of custody tracking, and HTTP transmission to remote analysis servers.
</Callout>

## Key Features

- **Read-Only Operations**: All tools operate in strict read-only mode to preserve evidence integrity
- **Chain of Custody**: Cryptographic hash verification (MD5, SHA1, SHA256) with complete audit trails
- **Cross-Platform**: Linux, Windows, macOS, FreeBSD, and OpenBSD support
- **Standards Compliant**: ISO 27037, NIST SP 800-86, and Daubert Standard compliant
- **Dependency Injection**: Clean architecture with well-separated concerns
- **Platform Abstraction**: Consistent interfaces with platform-specific implementations

## Forensic Standards

The Ilexum tools are designed to meet established digital forensics standards:

- **ISO 27037**: Guidelines for identification, collection, acquisition, and preservation of digital evidence
- **NIST SP 800-86**: Guide to computer and network forensics
- **Daubert Standard**: Admissibility requirements for scientific evidence

## Tool Relationships

The three tools are designed to work together in a forensic workflow:

![Tool Relationships](/diagrams/tool-relationships.svg)

Each agent collects evidence and transmits it to a central Processor for analysis and correlation.

## Go Module Structure

\`\`\`go
github.com/ilexum-group/bitex     // Disk analysis
github.com/ilexum-group/tracium     // System forensics
github.com/ilexum-group/evidex    // Evidence acquisition
\`\`\`

## Quick Navigation

- [Getting Started](/docs/getting-started) - Install and configure the tools
- [Architecture](/docs/architecture) - Deep dive into system design
- [Bitex](/docs/bitex) - Disk analysis with The Sleuth Kit
- [Tracium](/docs/tracium) - Comprehensive system forensics
- [Evidex](/docs/evidex) - File evidence acquisition
- [SDK Reference](/docs/sdk) - Common models and utilities
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
