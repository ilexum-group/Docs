import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Tracium Examples

Practical examples for using Tracium in forensic investigations.

## Live System Collection

\`\`\`bash
tracium \\
  --server https://forensics.example.com \\
  --token your_auth_token \\
  --case-id INCIDENT-RESPONSE-2024-001
\`\`\`

## Incident Response Workflow

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
    systemData, err := acq.Acquire()
    if err != nil {
        panic(err)
    }

    f := forensics.New(collector, custody)
    forensicsData, err := f.Collect()
    if err != nil {
        panic(err)
    }
    systemData.Forensics = *forensicsData

    s := sender.New(cfg.ServerURL, cfg.AgentToken)
    if err := s.SendData(systemData); err != nil {
        panic(err)
    }

    fmt.Println("Collection complete.")
}
\`\`\`
`;

const components = mdxComponents;

export default async function TraciumExamplesPage() {
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
