"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {isClient ? (
        <NextThemesProvider {...props}>
          {children}
        </NextThemesProvider>
      ) : (
        <div style={{ visibility: "hidden" }}>
          {children}
        </div>
      )}
    </div>
  );
}
