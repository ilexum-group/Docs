import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Bitex

Bitex is a forensic disk analysis tool that uses The Sleuth Kit (TSK) to extract metadata from disk images and block devices in a forensically sound manner.

## Overview

Bitex performs comprehensive disk analysis by invoking TSK command-line tools and parsing their output into structured data. It operates in **read-only mode** to preserve evidence integrity.

<Callout type="info" title="Key Feature">
Bitex never modifies the source disk. All operations use read-only access, and every command executed is logged to the custody chain.
</Callout>

## What Bitex Collects

### Partition Analysis

- Partition table detection and parsing
- Partition boundaries (start/end sectors)
- Partition type descriptions
- filesystem metadata per partition

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

Bitex captures versions of all TSK tools used:
- \`mmls\` - Partition list
- \`fsstat\` - Filesystem statistics
- \`fls\` - File listing
- \`istat\` - Inode statistics

## Architecture

Bitex integrates with The Sleuth Kit through command execution:

![TSKAnalyzer](/diagrams/tskanalyzer-arch.svg)

## Key Structs

### TSKAnalysis

\`\`\`go
type TSKAnalysis struct {
    DiskPath        string
    Partitions      []PartitionAnalysis
    ToolVersions    map[string]string
    CaseID          string
    CustodyChain    *CustodyChainEntry
}
\`\`\`

### PartitionAnalysis

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

### TSKFileEntry

\`\`\`go
type TSKFileEntry struct {
    Path            string
    Inode           uint64
    Type            string      // reg, dir, symlink, etc.
    Size            int64
    ModifiedTime    int64
    AccessedTime    int64
    CreatedTime     int64
    DeletionTime    int64
    Permissions     string
    UID             int
    GID             int
    Deleted         bool
    PartitionNumber int
}
\`\`\`

## Supported Filesystems

Bitex supports any filesystem supported by The Sleuth Kit, including:

- **Windows**: NTFS, FAT, exFAT
- **Linux**: ext2, ext3, ext4, XFS, Btrfs
- **macOS**: HFS, HFS+, APFS
- **Unix**: UFS, FFS
- **Other**: ISO 9660, UDF, and more

## CLI Reference

See the [Bitex CLI Reference](/docs/bitex/cli) for detailed flag documentation.

## API Reference

See the [Bitex API Reference](/docs/bitex/api) for Go struct documentation.

## Examples

See the [Bitex Examples](/docs/bitex/examples) for usage patterns.
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
