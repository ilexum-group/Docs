import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Getting Started

This guide gets Bitex, Tracium, and Evidex running with real command patterns used by each project.

## Prerequisites

- **Go 1.25+**
- **Make** (recommended)
- **The Sleuth Kit (TSK)** for Bitex
  - Ubuntu/Debian: \`sudo apt install sleuthkit\`
  - macOS: \`brew install sleuthkit\`
  - Windows: Download from [sleuthkit.org](https://www.sleuthkit.org/)

## Clone And Build

Build each project from source:

\`\`\`bash
# Bitex
git clone https://github.com/ilexum-group/Bitex.git
cd Bitex
make build

# Tracium
git clone https://github.com/ilexum-group/Tracium.git
cd Tracium
make build

# Evidex
git clone https://github.com/ilexum-group/Evidex.git
cd Evidex
make build
\`\`\`

Expected output binaries:

- Bitex: \`build/bitex\` or \`build\\bitex.exe\`
- Tracium: \`build/tracium\` or \`build\\tracium.exe\`
- Evidex: \`build/evidex\` or \`build\\evidex.exe\`

## Shared Required Flags

All tools require these forensic correlation flags:

- \`--server\` endpoint
- \`--token\` authentication token
- \`--case-id\` case correlation ID

Tool-specific required flags:

- Bitex: \`--disk\`
- Evidex: at least one file or directory path (plus optional \`-r\`)
- Tracium: optional \`--image\` for post-mortem image mode

## First Run Commands

### Bitex

\`\`\`bash
./build/bitex --disk /dev/sda --case-id CASE-2026-001 \
  --server https://forensics.example/api/analysis \
  --token YOUR_TOKEN
\`\`\`

### Tracium (live collection)

\`\`\`bash
./build/tracium --server https://forensics.example/api/v1/tracium/data \
  --token YOUR_TOKEN --case-id CASE-2026-001
\`\`\`

### Tracium (image mode)

\`\`\`bash
./build/tracium --server https://forensics.example/api/v1/tracium/data \
  --token YOUR_TOKEN --case-id CASE-2026-001 \
  --image /mnt/images/disk.dd
\`\`\`

### Evidex

\`\`\`bash
./build/evidex --server https://forensics.example/api/evidence \
  --token YOUR_TOKEN --case-id CASE-2026-001 \
  -r /mnt/evidence
\`\`\`

## Verify Binaries

\`\`\`bash
./build/bitex --version
./build/tracium -v
./build/evidex --version
\`\`\`

### Pre-built Binaries

Download pre-built binaries from the GitHub releases page for your platform.

<Callout type="tip" title="Cross-Platform Builds">
Use the provided Makefiles to build for multiple platforms:
\`\`\`bash
make build-all
make build-linux
make build-windows
\`\`\`
</Callout>

## Next Steps

- Read [Architecture](/docs/architecture)
- Continue with [Bitex](/docs/bitex), [Tracium](/docs/tracium), and [Evidex](/docs/evidex)
- Review [Examples](/docs/examples) for workflow-oriented usage
`;

const components = { ...mdxComponents, Callout };

export default async function GettingStartedPage() {
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
