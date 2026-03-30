import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import { CodeBlock } from "@/components/code-block";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Getting Started

This guide will help you install and configure the Ilexum forensic tools.

## Prerequisites

- **Go 1.25+**: All tools are written in Go and require the Go toolchain
- **The Sleuth Kit (TSK)**: Required for Bitex disk analysis
  - Ubuntu/Debian: \`sudo apt install sleuthkit\`
  - macOS: \`brew install sleuthkit\`
  - Windows: Download from [sleuthkit.org](https://www.sleuthkit.org/)

## Installation

### From Source

Clone each repository and build:

\`\`\`bash
# Bitex
git clone https://github.com/ilexum-group/Bitex.git
cd Bitex && go build -o bitex ./cmd/bitex

# Tracium
git clone https://github.com/ilexum-group/Tracium.git
cd Tracium && go build -o tracium ./cmd/tracium

# Evidex
git clone https://github.com/ilexum-group/Evidex.git
cd Evidex && go build -o evidex ./cmd/evidex
\`\`\`

### Pre-built Binaries

Download pre-built binaries from the GitHub releases page for your platform.

<Callout type="tip" title="Cross-Platform Builds">
Use the provided Makefiles to build for multiple platforms:
\`\`\`bash
make build-all   # Builds for all platforms
make build-linux # Linux only
\`\`\`
</Callout>

## Configuration

All three tools share common command-line flags:

| Flag | Description | Required |
|------|-------------|----------|
| \`--server\` | Remote server URL | Yes |
| \`--token\` | Authentication token | Yes |
| \`--case-id\` | Case identifier | Yes |

### Example Configuration

\`\`\`bash
# Bitex - Analyze a disk image
./bitex --disk /dev/sdb --case-id CASE-2024-001 \\
  --server https://forensics.example.com \\
  --token YOUR_AUTH_TOKEN

# Tracium - Collect system forensics
./tracium --case-id CASE-2024-001 \\
  --server https://forensics.example.com \\
  --token YOUR_AUTH_TOKEN

# Evidex - Acquire evidence files
./evidex --case-id CASE-2024-001 \\
  --server https://forensics.example.com \\
  --token YOUR_AUTH_TOKEN \\
  -r /evidence/*
\`\`\`

## Quick Start

### 1. Start with Bitex

Analyze a disk image to understand the partition structure:

\`\`\`bash
./bitex --disk disk-image.aff --case-id MYCASE-001 \\
  --server http://localhost:8080 --token mytoken
\`\`\`

### 2. Collect Files with Evidex

Acquire specific files of interest:

\`\`\`bash
./evidex --case-id MYCASE-001 \\
  --server http://localhost:8080 --token mytoken \\
  -r /mount/evidence/documents/
\`\`\`

### 3. Gather System Data with Tracium

Collect comprehensive system artifacts:

\`\`\`bash
./tracium --case-id MYCASE-001 \\
  --server http://localhost:8080 --token mytoken
\`\`\`

## Verifying Installation

Run the built-in validation:

\`\`\`bash
# Bitex validation
./bitex --version

# Tracium validation
./tracium --version

# Evidex validation
./evidex --version
\`\`\`

## Next Steps

- Read the [Architecture](/docs/architecture) documentation
- Explore each tool's detailed documentation
- Review [Examples](/docs/examples) for common workflows
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
