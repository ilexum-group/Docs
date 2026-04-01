import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Bitex

Bitex is the disk-analysis component of the Ilexum Group stack. It wraps The Sleuth Kit (TSK) to extract metadata from disk images and block devices in a forensically defensible way.

## Overview

Bitex runs metadata-oriented TSK commands (\`mmls\`, \`fsstat\`, \`fls\`, \`istat\`) and stores the parsed output in strongly typed Go models.

<Callout type="info" title="Key Feature">
Bitex does not write to the source disk and records command execution details in custody-chain entries.
</Callout>

## Main Output Model

\`\`\`go
type TSKAnalysis struct {
  DiskPath        string
  Partitions      []PartitionAnalysis
  FilesystemStats *TSKFilesystemStats // deprecated compatibility field
  FileListing     []TSKFileEntry      // deprecated compatibility field
  ToolVersions    map[string]string
  CaseID          string
  CustodyChain    *CustodyChainEntry
}
\`\`\`

\`\`\`go
type PartitionAnalysis struct {
  PartitionNumber int
  StartSector     uint64
  EndSector       uint64
  Length          uint64
  Description     string
  FilesystemStats *TSKFilesystemStats
  FileListing     []TSKFileEntry
}
\`\`\`

## Collection Scope

### Partition Analysis

- Partition table detection and parsing
- Partition boundaries (start/end sectors)
- Partition type descriptions
- Filesystem metadata per partition

### Filesystem Metadata

- Filesystem type detection (NTFS, ext4, HFS+, etc.)
- Block size and block counts
- Inode information
- Mount timestamps

### File Listings

- All files including deleted files
- File metadata: inode, size, timestamps
- Permissions (UID/GID)
- File type classification
- Deletion status tracking

### Tool Versions

Bitex records tool versions in \`TSKAnalysis.ToolVersions\`:
- \`mmls\` - Partition list
- \`fsstat\` - Filesystem statistics
- \`fls\` - File listing
- \`istat\` - Inode statistics

## Core Components

- \`internal/tsk\`: \`Analyzer\` and \`AnalyzeDisk(diskPath string)\`
- \`internal/acquisition\`: \`Acquirer\`, \`AcquireDisk()\`, \`GetAnalysisWithCustody(...)\`
- \`internal/config\`: \`ParseFlags()\`, \`ValidateConfig(...)\`
- \`pkg/models\`: TSK and custody chain models

## Typical CLI Flow

\`\`\`bash
./build/bitex --disk /dev/sda --case-id CASE-2026-001 \
  --server https://forensics.example/api/analysis \
  --token YOUR_TOKEN
\`\`\`

## Supported Filesystems

Bitex supports filesystems exposed by your installed TSK build, including:

- **Windows**: NTFS, FAT, exFAT
- **Linux**: ext2, ext3, ext4, XFS, Btrfs
- **macOS**: HFS, HFS+, APFS
- **Unix**: UFS, FFS
- **Other**: ISO 9660, UDF, and more

## CLI Reference

See the [Bitex CLI Reference](/docs/bitex/cli) for detailed flag documentation.

## API Reference

See the [Bitex API Reference](/docs/bitex/api) for package-level signatures and model examples.

## Examples

See the [Bitex Examples](/docs/bitex/examples) for operational scenarios.
`;

const components = { ...mdxComponents, Callout };

export default async function BitexPage() {
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
