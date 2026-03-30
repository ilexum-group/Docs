import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Tracium

Tracium is a comprehensive system forensics tool that collects 16 categories of forensic artifacts from live systems or forensic images.

## Overview

Tracium gathers extensive system and user activity data through platform-specific collectors. It captures browser history, command shells, USB devices, network activity, and much more.

<Callout type="info" title="Scope">
Tracium is designed for incident response and digital investigations.
</Callout>

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

## Key Structs

### SystemData

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

### Collector Interface

\`\`\`go
type Collector interface {
    OSName() string
    Architecture() string
    Hostname() (string, error)
    GetCurrentUser() (string, error)
    GetProcessID() int
    GetUptime() int64
    GetCPUInfo() CPUInfo
    GetMemoryInfo() MemoryInfo
    // ... 30+ more methods
}
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
