import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Architecture

This document describes the architectural patterns and data flows shared across all Ilexum Group forensic tools.

## Shared Design Principles

All three tools follow consistent architectural patterns:

1. **Dependency Injection**: Components receive their dependencies through constructors
2. **Interface Abstraction**: Platform-specific implementations behind clean interfaces
3. **Command Logging**: All OS operations logged to custody chain
4. **RFC 5424 Compliance**: Structured logging in syslog format

## Component Architecture

### Common Layers

![Architecture CLI Flow](/diagrams/architecture-cli-flow.svg)

## Custody Chain Model

The custody chain is the backbone of evidence integrity:

\`\`\`go
type CustodyChainEntry struct {
    ID               string           // UUID v4
    AgentType        string           // "bitex", "tracium", "evidex"
    AgentVersion     string
    AgentHostname    string
    AgentUser        string
    StartTimestamp   time.Time
    EndTimestamp     time.Time
    Duration         string
    MD5Hash          string
    SHA1Hash          string
    SHA256Hash        string
    TotalSizeBytes   int64
    ItemCount        int
    LogEntries       []LogEntry       // Command execution log
    CommandHistory   []CommandExecution
}
\`\`\`

<Callout type="info" title="Evidence Integrity">
The custody chain calculates MD5, SHA1, and SHA256 hashes over all collected evidence. Any tampering with the evidence would result in hash mismatches detectable during verification.
</Callout>

## Data Flow

### Evidence Collection Flow

![Architecture CLI Flow](/diagrams/architecture-cli-flow.svg)

### Bitex Data Flow

![Bitex Data Flow](/diagrams/bitex-flow.svg)

### Tracium Data Flow

![Tracium Data Flow](/diagrams/tracium-flow.svg)

### Evidex Data Flow

![Evidex Data Flow](/diagrams/evidex-flow.svg)

## HTTP Transmission

All tools use the same transmission pattern:

\`\`\`go
type Sender struct {
    serverURL string
    authToken string
    httpClient *http.Client
}

func (s *Sender) SendEvidencePackage(pkg *EvidencePackage) error {
    jsonData, err := json.Marshal(pkg)
    if err != nil {
        return err
    }

    req, err := http.NewRequest("POST", s.serverURL, bytes.NewBuffer(jsonData))
    if err != nil {
        return err
    }

    req.Header.Set("Authorization", "Bearer "+s.authToken)
    req.Header.Set("Content-Type", "application/json")

    resp, err := s.httpClient.Do(req)
    // ...
}
\`\`\`

<Callout type="warning" title="Security">
Always use HTTPS in production environments. The Bearer token is transmitted in plain text over HTTP.
</Callout>

## Platform Abstraction

Tools use Go build tags for platform-specific implementations:

\`\`\`
internal/os/
├── os.go           # Interface definition
├── default.go      # Default implementation
├── windows.go      # Windows-specific (GOOS=windows)
├── linux.go        # Linux-specific (GOOS=linux)
├── darwin.go       # macOS-specific (GOOS=darwin)
└── bsd.go          # BSD-specific (GOOS=freebsd, openbsd)
\`\`\`

## Evidence Lifecycle

![Evidence Lifecycle](/diagrams/evidence-lifecycle.svg)
`;

const components = { ...mdxComponents, Callout };

export default async function ArchitecturePage() {
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
