import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Evidex API Reference

Main APIs and data contracts used by Evidex.

## Module

\`\`\`go
github.com/ilexum-group/evidex
\`\`\`

## acquisition Package

### NewAcquirer

\`\`\`go
func NewAcquirer(
    custodyChain *models.CustodyChainEntry,
  os osWrapper.OS,
    metadataMgr *metadata.MetadataManager,
) *Acquirer
\`\`\`

### AcquireFile

\`\`\`go
func (a *Acquirer) AcquireFile(filePath string) error
\`\`\`

### GetEvidencePackage

\`\`\`go
func (a *Acquirer) GetEvidencePackage() *models.EvidencePackage
\`\`\`

### Additional acquisition helpers

\`\`\`go
func (a *Acquirer) AcquireDirectory(dirPath string, recursive bool) error
func (a *Acquirer) AcquireMultiple(filePaths []string) error
\`\`\`

---

## metadata Package

### NewMetadataManager

\`\`\`go
func NewMetadataManager(commandLogger CommandLogger) *MetadataManager
\`\`\`

---

## config Package

\`\`\`go
type Config struct {
  FilePaths []string
  Recursive bool
  CaseID    string
  ServerURL string
  AuthToken string
}
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
  osWrapper "github.com/ilexum-group/evidex/internal/os"
    "github.com/ilexum-group/evidex/internal/sender"
    "github.com/ilexum-group/evidex/pkg/models"
)

func main() {
  cfg := config.ParseFlags()
  if err := config.ValidateConfig(cfg); err != nil {
    panic(err)
  }

  osImpl := osWrapper.New()
    custody := models.NewCustodyChainEntry("evidex", "1.0.4")

  metadataMgr := metadata.NewMetadataManager(custody.LogCommand)
    acquirer := acquisition.NewAcquirer(custody, osImpl, metadataMgr)

  if err := acquirer.AcquireMultiple(cfg.FilePaths); err != nil {
    panic(err)
  }
  fmt.Printf("Acquired files: %d\\n", acquirer.GetFileCount())

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
