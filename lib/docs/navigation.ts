export interface NavItem {
  title: string;
  href?: string;
  description?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "Introduction",
    href: "/docs/introduction",
  },
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
  },
  {
    title: "Bitex",
    children: [
      {
        title: "Overview",
        href: "/docs/bitex",
        description: "Disk analysis via The Sleuth Kit",
      },
      {
        title: "CLI Reference",
        href: "/docs/bitex/cli",
        description: "Command-line interface",
      },
      {
        title: "API Reference",
        href: "/docs/bitex/api",
        description: "Go structs and functions",
      },
      {
        title: "Examples",
        href: "/docs/bitex/examples",
        description: "Usage examples",
      },
    ],
  },
  {
    title: "Tracium",
    children: [
      {
        title: "Overview",
        href: "/docs/tracium",
        description: "System forensics and artifact collection",
      },
      {
        title: "CLI Reference",
        href: "/docs/tracium/cli",
        description: "Command-line interface",
      },
      {
        title: "Forensics Collectors",
        href: "/docs/tracium/collectors",
        description: "Artifact collection methods",
      },
      {
        title: "API Reference",
        href: "/docs/tracium/api",
        description: "Go structs and functions",
      },
      {
        title: "Examples",
        href: "/docs/tracium/examples",
        description: "Usage examples",
      },
    ],
  },
  {
    title: "Evidex",
    children: [
      {
        title: "Overview",
        href: "/docs/evidex",
        description: "Forensic evidence acquisition",
      },
      {
        title: "CLI Reference",
        href: "/docs/evidex/cli",
        description: "Command-line interface",
      },
      {
        title: "Metadata Extractors",
        href: "/docs/evidex/extractors",
        description: "File format extractors",
      },
      {
        title: "API Reference",
        href: "/docs/evidex/api",
        description: "Go structs and functions",
      },
      {
        title: "Examples",
        href: "/docs/evidex/examples",
        description: "Usage examples",
      },
    ],
  },
  {
    title: "SDK Reference",
    href: "/docs/sdk",
    description: "Go SDK and shared models",
  },
  {
    title: "Examples",
    href: "/docs/examples",
    description: "Complete workflows",
  },
  {
    title: "Contributing",
    href: "/docs/contributing",
  },
];

export function getNavItemByHref(href: string): NavItem | undefined {
  for (const item of navigation) {
    if (item.href === href) return item;
    if (item.children) {
      for (const child of item.children) {
        if (child.href === href) return child;
      }
    }
  }
  return undefined;
}

export function getBreadcrumbs(href: string): { title: string; href?: string }[] {
  const breadcrumbs: { title: string; href?: string }[] = [];

  for (const item of navigation) {
    if (item.href === href) {
      breadcrumbs.push({ title: item.title, href: item.href });
      return breadcrumbs;
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.href === href) {
          breadcrumbs.push({ title: item.title });
          breadcrumbs.push({ title: child.title, href: child.href });
          return breadcrumbs;
        }
      }
    }
  }

  return breadcrumbs;
}
