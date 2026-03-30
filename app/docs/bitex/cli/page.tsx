import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Bitex CLI Reference

Complete command-line interface documentation for Bitex.

## Synopsis

\`\`\`bash
bitex [flags]
\`\`\`

## Flags

| Flag | Short | Type | Required | Description |
|------|-------|------|----------|-------------|
| \`--disk\` | \`-d\` | string | Yes | Path to disk image or block device |
| \`--case-id\` | \`-c\` | string | Yes | Case identifier for this analysis |
| \`--server\` | \`-s\` | string | Yes | Remote server URL for transmission |
| \`--token\` | \`-t\` | string | Yes | Authentication token for server |
| \`--help\` | \`-h\` | | | Show help message |
| \`--version\` | \`-v\` | | | Show version information |

<Callout type="danger" title="Required Flags">
All flags except \`--version\` are required. Bitex will exit with an error if any required flag is missing.
</Callout>

## Examples

### Basic Disk Analysis

\`\`\`bash
bitex --disk /dev/sdb \\
  --case-id CASE-2024-001 \\
  --server https://forensics.example.com \\
  --token my_auth_token
\`\`\`

### Analyzing a Disk Image File

\`\`\`bash
bitex --disk evidence/disk-image.aff \\
  --case-id INVESTIGATION-2024-042 \\
  --server https://forensics.example.com \\
  --token BearerToken123
\`\`\`

### Using Short Flags

\`\`\`bash
bitex -d /dev/sda -c CASE-001 -s https://forensics.example.com -t token
\`\`\`

## Exit Codes

| Code | Description |
|------|-------------|
| 0 | Success - analysis completed and transmitted |
| 1 | General error |
| 2 | Configuration error (missing required flags) |
| 3 | Disk access error |
| 4 | TSK tool execution error |
| 5 | Server transmission error |

## Output

Bitex outputs structured logs to stderr in RFC 5424 format:

\`\`\`
<PRI>1 2024-01-15T10:30:00Z hostname bitex 1234 - [meta@1 k="v"] Starting disk analysis
<PRI>1 2024-01-15T10:30:01Z hostname bitex 1234 - [meta@1 k="v"] Running mmls
<PRI>1 2024-01-15T10:30:02Z hostname bitex 1234 - [meta@1 k="v"] Found 4 partitions
\`\`\`

<Callout type="tip" title="Verbose Output">
For debugging, check the log output. Each TSK command execution is logged with its output size and duration.
</Callout>

## Environment Variables

Bitex does not use environment variables for configuration. All settings must be provided via flags.

## Authentication

The \`--token\` flag value is transmitted as a Bearer token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Network Configuration

### HTTPS

Always use HTTPS in production:

\`\`\`bash
--server https://forensics.example.com
\`\`\`

### HTTP (Development Only)

HTTP is supported for local testing:

\`\`\`bash
--server http://localhost:8080
\`\`\`

## Version

Display version information:

\`\`\`bash
bitex --version
\`\`\`

Output:
\`\`\`
Bitex version 1.0.3
Go version: go1.25.0
\`\`\`
`;

const components = { ...mdxComponents, Callout };

export default async function BitexCLIPage() {
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
