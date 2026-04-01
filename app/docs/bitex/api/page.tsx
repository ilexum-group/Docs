import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Bitex API Reference

This page summarizes the main packages and signatures from the current Bitex codebase.

## Module

\`\`\`go
github.com/ilexum-group/bitex
\`\`\`

## Packages

| Package | Purpose |
|---------|---------|
| \`internal/config\` | CLI parsing and validation |
| \`internal/os\` | OS abstraction layer |
| \`internal/tsk\` | TSK orchestration and parsing |
| \`internal/acquisition\` | End-to-end disk acquisition workflow |
| \`internal/sender\` | HTTP transmission |
| \`pkg/models\` | Data structures |

---

## internal/config

### ParseFlags

\`\`\`go
func ParseFlags() *Config
\`\`\`

### ValidateConfig

\`\`\`go
func ValidateConfig(cfg *Config) error
\`\`\`

### Config Struct

\`\`\`go
type Config struct {
    DiskPath  string
    CaseID    string
    ServerURL string
    AuthToken string
}
\`\`\`

---

## internal/tsk

### NewTSKAnalyzer

\`\`\`go
func NewTSKAnalyzer(custodyChainEntry *models.CustodyChainEntry, osImpl *internalos.OS) *Analyzer
\`\`\`

### AnalyzeDisk

\`\`\`go
func (t *Analyzer) AnalyzeDisk(diskPath string) (*models.TSKAnalysis, error)
\`\`\`

Performs metadata-focused partition/filesystem/file-listing analysis using TSK commands.

---

## internal/acquisition

### NewAcquirer

\`\`\`go
func NewAcquirer(
    osImpl internalos.OS,
    diskPath string,
    custodyChainEntry *models.CustodyChainEntry,
    tskAnalyzer *tsk.Analyzer,
) *Acquirer
\`\`\`

### AcquireDisk

\`\`\`go
func (a *Acquirer) AcquireDisk() (*models.TSKAnalysis, error)
\`\`\`

### GetAnalysisWithCustody

\`\`\`go
func (a *Acquirer) GetAnalysisWithCustody(analysis *models.TSKAnalysis) *models.TSKAnalysis
\`\`\`

---

## Usage Example

\`\`\`go
package main

import (
    "fmt"
    "github.com/ilexum-group/bitex/internal/acquisition"
    "github.com/ilexum-group/bitex/internal/config"
    internalos "github.com/ilexum-group/bitex/internal/os"
    "github.com/ilexum-group/bitex/internal/sender"
    "github.com/ilexum-group/bitex/internal/tsk"
    "github.com/ilexum-group/bitex/pkg/models"
)

func main() {
    cfg := config.ParseFlags()
    if err := config.ValidateConfig(cfg); err != nil {
        panic(err)
    }

    osImpl := internalos.New()
    custody := models.NewCustodyChainEntry("bitex", "1.0.0")
    tskAnalyzer := tsk.NewTSKAnalyzer(custody, &osImpl)
    acquirer := acquisition.NewAcquirer(osImpl, cfg.DiskPath, custody, tskAnalyzer)

    analysis, err := acquirer.AcquireDisk()
    if err != nil {
        panic(err)
    }

    analysisWithCustody := acquirer.GetAnalysisWithCustody(analysis)

    senderClient := sender.NewSender(cfg.ServerURL, cfg.AuthToken)
    if err := senderClient.SendAnalysis(analysisWithCustody); err != nil {
        panic(err)
    }

    fmt.Printf("Analysis complete: %d partitions found\\n", len(analysis.Partitions))
}
\`\`\`
`;

const components = mdxComponents;

export default async function BitexAPIPage() {
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
