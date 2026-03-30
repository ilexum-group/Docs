import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Tracium API Reference

Go API documentation for Tracium packages.

## Module

\`\`\`go
github.com/ilexum-group/tracium
\`\`\`

## Packages

| Package | Purpose |
|---------|---------|
| \`config\` | CLI flag parsing |
| \`acquisition\` | System data collection |
| \`forensics\` | Forensic artifact collection |
| \`sender\` | HTTP transmission |
| \`pkg/models\` | Data structures |

---

## acquisition Package

### New

\`\`\`go
func New(collector *os.Collector, custody *models.CustodyChainEntry) *Acquisition
\`\`\`

### Acquire

\`\`\`go
func (a *Acquisition) Acquire() (*models.SystemData, error)
\`\`\`

---

## forensics Package

### New

\`\`\`go
func New(collector *os.Collector, custody *models.CustodyChainEntry) *Forensics
\`\`\`

### Collect

\`\`\`go
func (f *Forensics) Collect() (*models.ForensicsData, error)
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
    "github.com/ilexum-group/tracium/internal/os"
    "github.com/ilexum-group/tracium/internal/sender"
    "github.com/ilexum-group/tracium/pkg/models"
)

func main() {
    cfg := config.ParseFlags()

    collector := os.New()
    custody := models.NewCustodyChainEntry("tracium", "1.0.0")

    acq := acquisition.New(collector, custody)
    systemData, _ := acq.Acquire()

    f := forensics.New(collector, custody)
    forensicsData, _ := f.Collect()
    systemData.Forensics = *forensicsData

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
