import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ilexumgroup.com"),
  title: {
    default: "Ilexum Group - Forensic Tools Documentation",
    template: "%s | Ilexum Group",
  },
  description:
    "Documentation for Bitex, Tracium, and Evidex - open-source forensic tools for disk analysis, system forensics, and evidence acquisition.",
  keywords: [
    "forensics",
    "digital forensics",
    "disk analysis",
    "evidence acquisition",
    "chain of custody",
    "Bitex",
    "Tracium",
    "Evidex",
  ],
  authors: [{ name: "Ilexum Group", url: "https://ilexumgroup.com" }],
  creator: "Ilexum Group",
  publisher: "Ilexum Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ilexumgroup.com/docs",
    siteName: "Ilexum Group",
    title: "Ilexum Group - Forensic Tools Documentation",
    description:
      "Documentation for Bitex, Tracium, and Evidex - open-source forensic tools for disk analysis, system forensics, and evidence acquisition.",
    images: [
      {
        url: "/ilexum-emblem-circular-colors.png",
        width: 120,
        height: 120,
        alt: "Ilexum Group Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilexum Group - Forensic Tools Documentation",
    description:
      "Documentation for Bitex, Tracium, and Evidex - open-source forensic tools for disk analysis, system forensics, and evidence acquisition.",
    images: ["/ilexum-emblem-circular-colors.png"],
    creator: "@ilexumgroup",
  },
  alternates: {
    canonical: "/docs",
    languages: {
      "en-US": "/docs",
      "es-ES": "/es/docs",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
