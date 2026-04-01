import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Tracium

Tracium is the endpoint and artifact collector in the Ilexum Group ecosystem. It gathers system telemetry plus forensic artifacts from live systems or mounted forensic images.

## Overview

Tracium is organized around an OS-specific \`Collector\` interface and a shared \`SystemData\` model, enabling consistent payloads across Linux, Windows, macOS, FreeBSD, and OpenBSD.

<Callout type="info" title="Scope">
Designed for incident response, triage, and post-mortem evidence collection workflows.
</Callout>

## Core Data Model

\`\`\`go
type SystemData struct {
  CaseID       string
  System       SystemInfo
  Hardware     HardwareInfo
  Network      NetworkInfo
  Security     SecurityInfo
  Forensics    ForensicsData
  Tree         FilesystemTree
  CustodyChain *CustodyChainEntry
}
\`\`\`

## Collector Interface (Real Excerpt)

\`\`\`go
type Collector interface {
  OSName() string
  Architecture() string
  Hostname() (string, error)
  GetCurrentUser() (string, error)
  GetProcessID() int

  GetUptime() int64
  GetUsers() []string
  GetCPUInfo() models.CPUInfo
  GetMemoryInfo() models.MemoryInfo
  GetDiskInfo() []models.DiskInfo

  CollectBrowserArtifacts(errors *[]string) models.BrowserArtifacts
  CollectCommandHistory(errors *[]string) []models.CommandEntry
  CollectSystemLogs(errors *[]string) []models.LogFile
  CollectFilesystemTree() models.FilesystemTree
}
\`\`\`

## What Tracium Collects

### System Information
- CPU information and specifications
- Memory configuration and usage
- Disk hardware information
- Network interfaces and configurations

### Forensic Artifacts (16 Categories)
1. **Browser Artifacts** - Chrome, Firefox, Safari, Edge history
2. **Communication Artifacts** - Email clients, messaging applications
3. **Recent Files** - Recent documents and downloads
4. **Command History** - bash, zsh, PowerShell, cmd history
5. **Network History** - ARP cache, DNS cache, connections
6. **System Logs** - System event logs, authentication logs
7. **Scheduled Tasks** - Windows Task Scheduler, cron jobs
8. **USB History** - Device connection history
9. **Prefetch Files** (Windows) - Application execution history
10. **Recycle Bin** - Deleted files metadata
11. **Clipboard** - Current clipboard contents
12. **SSH Keys** - Authorized keys and known hosts
13. **Installed Software** - Installed packages and versions
14. **Environment Variables** - System and user variables
15. **Download History** - Browser downloads
16. **Active Connections** - Established connections, listening ports

## Typical CLI Commands

\`\`\`bash
# Live collection
./build/tracium --server https://forensics.example/api/v1/tracium/data \
  --token YOUR_TOKEN --case-id CASE-2026-001

# Image-based post-mortem mode
./build/tracium --server https://forensics.example/api/v1/tracium/data \
  --token YOUR_TOKEN --case-id CASE-2026-001 \
  --image /mnt/images/disk.dd
\`\`\`
`;

const components = { ...mdxComponents, Callout };

export default async function TraciumPage() {
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
