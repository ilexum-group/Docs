import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

const mdxContent = `
# SDK Reference

Common models and shared components across all Ilexum tools.

## Shared Module

All three tools share the \`pkg/models\` package:

\`\`\`go
github.com/ilexum-group/{bitex,tracium,evidex}/pkg/models
\`\`\`

---

## CustodyChainEntry

\`\`\`go
type CustodyChainEntry struct {
    ID               string    // UUID v4
    AgentType        string   // "bitex", "tracium", "evidex"
    AgentVersion     string
    AgentHostname    string
    AgentUser        string
    StartTimestamp   time.Time
    EndTimestamp     time.Time
    Duration         string
    MD5Hash          string
    SHA1Hash          string
    SHA256Hash        string
    TotalSizeBytes   int64
    ItemCount        int
    LogEntries       []LogEntry
    CommandHistory   []CommandExecution
}
\`\`\`

### Constructor

\`\`\`go
func NewCustodyChainEntry(agentType, version string) *CustodyChainEntry
\`\`\`

### Methods

\`\`\`go
func (c *CustodyChainEntry) SetAgentHostname(hostname string)
func (c *CustodyChainEntry) SetAgentUser(username string)
func (c *CustodyChainEntry) LogCommand(...)
func (c *CustodyChainEntry) LogError(operation, message string, err error)
func (c *CustodyChainEntry) LogInfo(operation, message string)
\`\`\`

---

## CommandLogger

\`\`\`go
type CommandLogger func(
    id, command string,
    args []string,
    startTime, endTime time.Time,
    exitCode int,
    err error,
    workingDir, targetResource string,
)
\`\`\`

---

## HTTP Sender

\`\`\`go
type Sender struct {
    serverURL string
    authToken string
    httpClient *http.Client
}

func NewSender(serverURL, authToken string) *Sender
func (s *Sender) Send(payload interface{}) error
\`\`\`
`;

const components = mdxComponents;

export default async function SDKPage() {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-4xl">
      <MDXRemote source={mdxContent} components={components} />
    </div>
  );
}
