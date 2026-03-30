import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";

const mdxContent = `
# Evidex Examples

Practical examples for using Evidex in forensic investigations.

## Basic File Acquisition

\`\`\`bash
evidex --server https://forensics.example.com \\
  --token my_token \\
  --case-id CASE-001 \\
  /evidence/suspicious.pdf
\`\`\`

## Directory Acquisition

\`\`\`bash
evidex -s https://forensics.example.com \\
  -t my_token \\
  -c CASE-001 \\
  -r /evidence/documents/
\`\`\`

## Go Program

\`\`\`go
package main

import (
    "fmt"
    "github.com/ilexum-group/evidex/internal/acquisition"
    "github.com/ilexum-group/evidex/internal/config"
    "github.com/ilexum-group/evidex/internal/metadata"
    "github.com/ilexum-group/evidex/internal/os"
    "github.com/ilexum-group/evidex/internal/sender"
    "github.com/ilexum-group/evidex/pkg/models"
)

func main() {
    cfg, filePaths := config.ParseFlags()

    osImpl := os.New()
    custody := models.NewCustodyChainEntry("evidex", "1.0.4")

    metadataMgr := metadata.NewMetadataManager(nil)
    acquirer := acquisition.NewAcquirer(custody, osImpl, metadataMgr)

    for _, path := range filePaths {
        file, _ := acquirer.AcquireFile(path)
        fmt.Printf("Acquired: %s (SHA256: %s)\\n",
            file.Filename, file.Hashes.SHA256)
    }

    pkg := acquirer.GetEvidencePackage()
    s := sender.NewSender(cfg.ServerURL, cfg.AuthToken)
    s.SendEvidencePackage(pkg)
}
\`\`\`

<Callout type="warning" title="Chain of Custody">
The custody chain provides cryptographic proof of evidence integrity.
</Callout>
`;

const components = { ...mdxComponents, Callout };

export default async function EvidexExamplesPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-4xl">
      <MDXRemote source={mdxContent} components={components} />
    </div>
  );
}
