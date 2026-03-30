import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Bitex API Reference

Go API documentation for Bitex packages.

## Module

\`\`\`go
github.com/ilexum-group/bitex
\`\`\`

## Packages

| Package | Purpose |
|---------|---------|
| \`config\` | CLI flag parsing and validation |
| \`logger\` | RFC 5424 compliant logging |
| \`internal/os\` | OS abstraction layer |
| \`tsk\` | The Sleuth Kit integration |
| \`acquisition\` | Disk acquisition orchestration |
| \`sender\` | HTTP transmission |
| \`pkg/models\` | Data structures |

---

## config Package

### ParseFlags

\`\`\`go
func ParseFlags() *Config
\`\`\`

Parses command-line flags and returns a Config struct.

### ValidateConfig

\`\`\`go
func ValidateConfig(cfg *Config) error
\`\`\`

Validates that all required configuration fields are present. Returns an error if validation fails.

### Config Struct

\`\`\`go
type Config struct {
    DiskPath   string
    CaseID     string
    ServerURL  string
    AuthToken  string
}
\`\`\`

---

## tsk Package

### NewTSKAnalyzer

\`\`\`go
func NewTSKAnalyzer(custody *models.CustodyChainEntry, osImpl *os.OS) *TSKAnalyzer
\`\`\`

Creates a new TSK analyzer with custody chain and OS implementation.

### AnalyzeDisk

\`\`\`go
func (a *TSKAnalyzer) AnalyzeDisk(diskPath string) (*models.TSKAnalysis, error)
\`\`\`

Performs complete disk analysis.

---

## acquisition Package

### NewAcquirer

\`\`\`go
func NewAcquirer(
    osImpl *os.OS,
    diskPath string,
    custody *models.CustodyChainEntry,
    tskAnalyzer *tsk.TSKAnalyzer,
) *Acquirer
\`\`\`

### AcquireDisk

\`\`\`go
func (a *Acquirer) AcquireDisk() (*models.TSKAnalysis, error)
\`\`\`

### GetAnalysisWithCustody

\`\`\`go
func (a *Acquirer) GetAnalysisWithCustody(
    analysis *models.TSKAnalysis,
) (*models.TSKAnalysis, error)
\`\`\`

---

## Usage Example

\`\`\`go
package main

import (
    "fmt"
    "github.com/ilexum-group/bitex/internal/acquisition"
    "github.com/ilexum-group/bitex/internal/config"
    "github.com/ilexum-group/bitex/internal/logger"
    "github.com/ilexum-group/bitex/internal/os"
    "github.com/ilexum-group/bitex/internal/sender"
    "github.com/ilexum-group/bitex/pkg/models"
)

func main() {
    cfg := config.ParseFlags()
    if err := config.ValidateConfig(cfg); err != nil {
        panic(err)
    }

    hostname, _ := os.New().Hostname()
    logger.InitDefaultLogger("bitex", hostname, os.New().GetProcessID())

    custody := models.NewCustodyChainEntry("bitex", "1.0.3")
    custody.SetAgentHostname(hostname)
    custody.SetAgentUser(os.New().GetCurrentUser())

    osImpl := os.New()
    tskAnalyzer := tsk.NewTSKAnalyzer(custody, osImpl)
    acquirer := acquisition.NewAcquirer(osImpl, cfg.DiskPath, custody, tskAnalyzer)

    analysis, err := acquirer.AcquireDisk()
    if err != nil {
        panic(err)
    }

    analysisWithCustody, err := acquirer.GetAnalysisWithCustody(analysis)
    if err != nil {
        panic(err)
    }

    sender := sender.NewSender(cfg.ServerURL, cfg.AuthToken)
    if err := sender.SendAnalysis(analysisWithCustody); err != nil {
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
