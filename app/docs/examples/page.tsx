import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

const mdxContent = `
# Examples

Complete forensic workflows using the Ilexum Group tools.

## Evidence Collection Pipeline

### 1. Disk Image Analysis (Bitex)

\`\`\`bash
./bitex --disk /evidence/suspect-workstation.raw \\
  --case-id INVESTIGATION-2024-042 \\
  --server https://forensics.example.com \\
  --token $AUTH_TOKEN
\`\`\`

### 2. File Acquisition (Evidex)

\`\`\`bash
./evidex \\
  --case-id INVESTIGATION-2024-042 \\
  --server https://forensics.example.com \\
  --token $AUTH_TOKEN \\
  -r /mnt/evidence/Users/*/Documents/
\`\`\`

### 3. System Forensics (Tracium)

\`\`\`bash
./tracium \\
  --case-id INVESTIGATION-2024-042 \\
  --server https://forensics.example.com \\
  --token $AUTH_TOKEN
\`\`\`

---

## Incident Response Workflow

\`\`\`bash
#!/bin/bash
CASE_ID="IR-\$(date +%Y%m%d-%H%M%S)"
SERVER="https://forensics.example.com"
TOKEN="\$1"

echo "Starting incident response: $CASE_ID"

# Quick Tracium collection
./tracium --case-id "$CASE_ID" --server "$SERVER" --token "$TOKEN"

# Acquire potential malware samples
./evidex --case-id "$CASE_ID" --server "$SERVER" --token "$TOKEN" \\
    -r ~/Downloads/

echo "Incident response collection complete: $CASE_ID"
\`\`\`

---

## Go Pipeline Program

\`\`\`go
package main

import (
    "context"
    "fmt"
    "github.com/ilexum-group/bitex/internal/config"
    "github.com/ilexum-group/evidex/internal/config"
    "github.com/ilexum-group/tracium/internal/config"
)

func main() {
    caseID := "AUTO-2024-001"
    server := "https://forensics.example.com"
    token := "AUTH_TOKEN"

    // 1. Bitex - Disk analysis
    fmt.Println("Starting Bitex disk analysis...")
    runBitex(server, token, caseID, "/dev/sdb")

    // 2. Evidex - File acquisition
    fmt.Println("Starting Evidex file acquisition...")
    runEvidex(server, token, caseID, []string{"/evidence/files"})

    // 3. Tracium - System forensics
    fmt.Println("Starting Tracium system collection...")
    runTracium(server, token, caseID)
}
\`\`\`
`;

const components = mdxComponents;

export default async function ExamplesPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-4xl">
      <MDXRemote source={mdxContent} components={components} />
    </div>
  );
}
