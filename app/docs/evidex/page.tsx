import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Evidex

Evidex is a forensic evidence acquisition tool that collects files and their metadata in a forensically sound manner.

## Overview

Evidex operates in **strict read-only mode** to preserve evidence integrity. It calculates cryptographic hashes, extracts metadata based on file type, and assembles evidence packages.

<Callout type="danger" title="Read-Only Guarantee">
Evidex never modifies source files. All file access uses O_RDONLY.
</Callout>

## What Evidex Collects

### File Metadata
- Source path and filename
- File size and mode
- Timestamps (created, modified, accessed)
- Ownership information (UID/GID)

### Cryptographic Hashes
- MD5, SHA1, SHA256, SHA512

### Format-Specific Metadata
Based on file type:
- **Images** (JPEG, PNG, GIF) - Dimensions, EXIF data
- **Video** (MP4, MOV, AVI, MKV) - Duration, codecs, frame rate
- **Documents** (PDF) - Page count, author, title
- **Archives** (ZIP, TAR, GZIP) - File count, compression
- **Executables** (PE, ELF, Mach-O) - Architecture, entry point

## Key Structs

### EvidencePackage

\`\`\`go
type EvidencePackage struct {
    CaseID       string
    Files        []FileEvidence
    CustodyChain *CustodyChainEntry
}
\`\`\`

### FileEvidence

\`\`\`go
type FileEvidence struct {
    SourcePath     string
    Filename      string
    FileSize      int64
    FileMode      string
    Hashes        *FileHashes
    ImageMetadata *ImageMetadata
    VideoMetadata *VideoMetadata
    // ...
}
\`\`\`
`;

const components = { ...mdxComponents, Callout };

export default async function EvidexPage() {
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
