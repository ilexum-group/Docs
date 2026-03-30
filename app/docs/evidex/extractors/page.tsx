import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";

const mdxContent = `
# Evidex Metadata Extractors

Detailed documentation on Evidex's polymorphic metadata extraction system.

## MetadataExtractor Interface

\`\`\`go
type MetadataExtractor interface {
    CanHandle(filePath string) bool
    Extract(filePath string, logger CommandLogger) interface{}
    GetType() string
}
\`\`\`

## Image Extractors

### JPEGExtractor

Extends \`ImageMetadata\`:

\`\`\`go
type ImageMetadata struct {
    Format    string // "JPEG"
    Width     int
    Height    int
    ColorSpace string
    BitDepth  int
    HasEXIF   bool
    EXIF      map[string]string
}
\`\`\`

### PNGExtractor / GIFExtractor

Similar structure with format-specific fields.

## Video Extractors

### MP4Extractor

\`\`\`go
type VideoMetadata struct {
    Format          string
    Duration       string
    DurationSeconds float64
    VideoCodec     string
    AudioCodec     string
    Width          int
    Height         int
    FrameRate      float64
    BitRate        int64
}
\`\`\`

## Adding Custom Extractors

\`\`\`go
type CustomExtractor struct {
    logger CommandLogger
}

func (e *CustomExtractor) CanHandle(filePath string) bool {
    ext := strings.ToLower(filepath.Ext(filePath))
    return ext == ".custom"
}

func (e *CustomExtractor) Extract(filePath string, logger CommandLogger) interface{} {
    return &CustomMetadata{...}
}

func (e *CustomExtractor) GetType() string {
    return "CustomType"
}

// Register it
registry.Register(&CustomExtractor{logger: logger})
\`\`\`
`;

const components = mdxComponents;

export default async function EvidexExtractorsPage() {
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
