import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Evidex API Reference

Go API documentation for Evidex packages.

## Module

\`\`\`go
github.com/ilexum-group/evidex
\`\`\`

## acquisition Package

### NewAcquirer

\`\`\`go
func NewAcquirer(
    custodyChain *models.CustodyChainEntry,
    osImpl *os.OS,
    metadataMgr *metadata.MetadataManager,
) *Acquirer
\`\`\`

### AcquireFile

\`\`\`go
func (a *Acquirer) AcquireFile(filePath string) (*models.FileEvidence, error)
\`\`\`

### GetEvidencePackage

\`\`\`go
func (a *Acquirer) GetEvidencePackage() (*models.EvidencePackage, error)
\`\`\`

---

## metadata Package

### NewMetadataManager

\`\`\`go
func NewMetadataManager(commandLogger CommandLogger) *MetadataManager
\`\`\`

---

## Usage Example

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

    file, _ := acquirer.AcquireFile(filePaths[0])
    fmt.Printf("Acquired: %s\\n", file.Filename)

    pkg := acquirer.GetEvidencePackage()
    s := sender.NewSender(cfg.ServerURL, cfg.AuthToken)
    s.SendEvidencePackage(pkg)
}
\`\`\`
`;

const components = mdxComponents;

export default async function EvidexAPIPage() {
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
