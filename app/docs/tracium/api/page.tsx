import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Tracium API Reference

Main package-level references for Tracium based on the current repository.

## Module

\`\`\`go
github.com/ilexum-group/tracium
\`\`\`

## Packages

| Package | Purpose |
|---------|---------|
| \`internal/config\` | CLI flag parsing and validation |
| \`internal/acquisition\` | System/hardware/network/security collection |
| \`internal/forensics\` | Artifact collection orchestration |
| \`internal/os\` | Collector interface and OS-specific implementations |
| \`internal/sender\` | HTTP transmission |
| \`pkg/models\` | Data structures |

---

## internal/acquisition

### New

\`\`\`go
func New(collector osinfo.Collector, custodyChain *models.CustodyChainEntry, forensicsCollector *forensics.Forensics) *Acquisition
\`\`\`

### Acquire

\`\`\`go
func (a *Acquisition) Acquire() models.SystemData
\`\`\`

---

## internal/forensics

### New

\`\`\`go
func New(collector osinfo.Collector, custodyChain *models.CustodyChainEntry) *Forensics
\`\`\`

### Collect

\`\`\`go
func (f *Forensics) Collect() models.ForensicsData
\`\`\`

---

## internal/config

### Config Struct

\`\`\`go
type Config struct {
  ServerURL  string
  AgentToken string
  CaseID     string
  ImagePath  string
}
\`\`\`

---

## Usage Example

\`\`\`go
package main

import (
    "fmt"
    "github.com/ilexum-group/tracium/internal/acquisition"
    "github.com/ilexum-group/tracium/internal/config"
    "github.com/ilexum-group/tracium/internal/forensics"
  osinfo "github.com/ilexum-group/tracium/internal/os"
    "github.com/ilexum-group/tracium/internal/sender"
    "github.com/ilexum-group/tracium/pkg/models"
)

func main() {
    cfg := config.ParseFlags()

  collector := osinfo.New()
    custody := models.NewCustodyChainEntry("tracium", "1.0.0")
  f := forensics.New(collector, custody)

  acq := acquisition.New(collector, custody, f)
  systemData := acq.Acquire()
  systemData.CaseID = cfg.CaseID

    s := sender.New(cfg.ServerURL, cfg.AgentToken)
    s.SendData(systemData)

    fmt.Printf("Collection complete\\n")
}
\`\`\`
`;

const components = mdxComponents;

export default async function TraciumAPIPage() {
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
