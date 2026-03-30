import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";

const mdxContent = `
# Bitex Examples

Practical examples for using Bitex in forensic investigations.

## Basic Disk Analysis

Analyze a USB drive connected as \`/dev/sdb\`:

\`\`\`bash
./bitex --disk /dev/sdb \\
  --case-id USB-2024-001 \\
  --server https://forensics.example.com \\
  --token your_auth_token
\`\`\`

## Analyzing a Disk Image

When working with a forensic image file (EWF, AFF, raw):

\`\`\`bash
# Raw image
./bitex --disk evidence/USB-disk-image.raw \\
  --case-id EVIDENCE-2024-042 \\
  --server https://forensics.example.com \\
  --token your_auth_token
\`\`\`

## Go Program

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
        fmt.Printf("Configuration error: %v\\n", err)
        return
    }

    osImpl := os.New()
    hostname, _ := osImpl.Hostname()
    logger.InitDefaultLogger("bitex", hostname, osImpl.GetProcessID())

    custody := models.NewCustodyChainEntry("bitex", "1.0.3")
    custody.SetAgentHostname(hostname)

    acquirer := acquisition.NewAcquirer(osImpl, cfg.DiskPath, custody, nil)
    analysis, err := acquirer.AcquireDisk()
    if err != nil {
        logger.LogError("Acquisition failed", map[string]string{"error": err.Error()})
        return
    }

    analysisWithCustody, _ := acquirer.GetAnalysisWithCustody(analysis)
    s := sender.NewSender(cfg.ServerURL, cfg.AuthToken)
    if err := s.SendAnalysis(analysisWithCustody); err != nil {
        logger.LogError("Transmission failed", map[string]string{"error": err.Error()})
        return
    }

    fmt.Printf("Analysis complete: %d partitions\\n", len(analysis.Partitions))
}
\`\`\`

<Callout type="info" title="Output Structure">
Bitex outputs JSON to the remote server containing the complete TSKAnalysis structure.
</Callout>
`;

const components = { ...mdxComponents, Callout };

export default async function BitexExamplesPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-4xl">
      <MDXRemote source={mdxContent} components={components} />
    </div>
  );
}
