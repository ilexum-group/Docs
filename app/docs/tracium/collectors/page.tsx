import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Tracium Forensics Collectors

Detailed documentation on Tracium's 16 forensic artifact collectors.

## Collector Interface

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
    GetDiskInfo() []DiskInfo
    GetInterfaces() []InterfaceInfo
    GetProcesses() []ProcessInfo
    GetServices() []ServiceInfo
    CollectBrowserArtifacts(errors *[]string) BrowserArtifacts
    CollectCommunicationArtifacts(errors *[]string) CommunicationArtifacts
    CollectRecentFiles(errors *[]string) []RecentFileEntry
    CollectCommandHistory(errors *[]string) []CommandEntry
    // ... 12+ more methods
}
\`\`\`

## Browser Artifacts

Collects history, downloads, cookies, and bookmarks from Chrome, Firefox, Safari, and Edge.

## Command History

Collects shell command history from bash, zsh, fish, PowerShell, and cmd.exe.

<Callout type="warning" title="Privacy">
Command history may contain sensitive information. Handle appropriately.
</Callout>

## USB History

Collects USB device connection history including VendorID, ProductID, Serial, and timestamps.

## Network History

Collects ARP cache, DNS cache, and network connections.
`;

const components = { ...mdxComponents, Callout };

export default async function TraciumCollectorsPage() {
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
