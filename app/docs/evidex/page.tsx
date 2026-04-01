import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Evidex

Evidex is the evidence acquisition binary for targeted file collection with metadata enrichment and custody-chain tracking.

## Overview

Evidex acquires files in read-only mode, computes hashes, extracts format-specific metadata, and builds an \`EvidencePackage\` for transmission.

<Callout type="danger" title="Read-Only Guarantee">
Source files are never modified. Acquisition paths rely on read-only access and explicit custody logging.
</Callout>

## Core Package Model

\`\`\`go
type EvidencePackage struct {
  CaseID       string
  Files        []*FileEvidence
  CustodyChain *CustodyChainEntry
}
\`\`\`

\`\`\`go
type FileEvidence struct {
  SourcePath      string
  RelativePath    string
  Filename        string
  FileSize        int64
  FileMode        uint32
  AccessedTime    time.Time
  ModifiedTime    time.Time
  CreatedTime     time.Time
  ChangeTime      time.Time
  Owner           string
  Group           string
  FileType        string
  Hashes          *FileHashes
  ImageMetadata   *ImageMetadata
  VideoMetadata   *VideoMetadata
  GenericMetadata map[string]string
}
\`\`\`

## What Evidex Collects

### File Metadata
- Source path and filename
- File size and mode
- Timestamps (created, modified, accessed)
- Ownership information (UID/GID)

### Cryptographic Hashes
- MD5, SHA1, SHA256, SHA512

### Format-Specific Metadata
Based on extractor registration and MIME/file-type detection:
- **Images** (JPEG, PNG, GIF) - Dimensions, EXIF data
- **Video** (MP4, MOV, AVI, MKV) - Duration, codecs, frame rate
- **Documents** (PDF) - Page count, author, title
- **Archives** (ZIP, TAR, GZIP) - File count, compression
- **Executables** (PE, ELF, Mach-O) - Architecture, entry point

## Extractor Architecture

Evidex implements a metadata extraction layer with interfaces and registries:

- \`MetadataExtractor\`
- \`ImageExtractor\`
- \`VideoExtractor\`
- \`DocumentExtractor\`
- \`ExtractorRegistry\`

## Typical CLI Commands

\`\`\`bash
# Single file
./build/evidex --server https://forensics.example/api/evidence \
  --token YOUR_TOKEN --case-id CASE-2026-001 image.jpg

# Recursive acquisition
./build/evidex --server https://forensics.example/api/evidence \
  --token YOUR_TOKEN --case-id CASE-2026-001 -r /evidence
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
