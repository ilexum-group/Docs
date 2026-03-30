import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Callout } from "@/components/callout";

const mdxContent = `
# Contributing

Thank you for your interest in contributing to the Ilexum forensic tools!

## Getting Started

### Prerequisites

- Go 1.25 or later
- Git
- The Sleuth Kit (TSK) - for Bitex development

### Repository Structure

\`\`\`
ilexum-group/
├── Bitex/         # Disk analysis tool
├── Tracium/       # System forensics tool
├── Evidex/        # Evidence acquisition tool
└── Docs/          # Documentation site
\`\`\`

### Setting Up

\`\`\`bash
git clone https://github.com/ilexum-group/Bitex.git
git clone https://github.com/ilexum-group/Tracium.git
git clone https://github.com/ilexum-group/Evidex.git

cd Bitex && go mod download
\`\`\`

### Running Tests

\`\`\`bash
go test ./... -v
\`\`\`

---

## Development Guidelines

### Code Style

- Follow Go conventions (run \`gofmt\` before committing)
- Add comments for complex logic
- Keep functions small and focused

<Callout type="info" title="Linting">
All projects use golangci-lint. Run \`golangci-lint run\` before committing.
</Callout>

---

## Adding New Extractors (Evidex)

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

registry.Register(&CustomExtractor{logger: logger})
\`\`\`

---

## Security Considerations

<Callout type="danger" title="Forensic Tools">
These tools handle sensitive evidence:
- Never modify source evidence
- Protect authentication tokens
- Use secure transmission (HTTPS)
</Callout>

## Questions?

- GitHub Issues: For bugs and feature requests
- Discussions: For questions and community support
`;

const components = { ...mdxComponents, Callout };

export default async function ContributingPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-4xl">
      <MDXRemote source={mdxContent} components={components} />
    </div>
  );
}
