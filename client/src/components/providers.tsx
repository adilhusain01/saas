'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from "next-themes";


function ThemeLogger({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Keep console logs for debugging - this shows what next-themes reports
    console.log('Theme changed to:', theme, 'resolved:', resolvedTheme);

    // Sync Tailwind dark mode class with next-themes' resolved theme value.
    // next-themes is configured with attribute="data-theme" to support DaisyUI.
    // However Tailwind's `dark:` variants require a `dark` class on the root.
    // Add or remove the `dark` class when theme/resolvedTheme is dark so both
    // DaisyUI (data-theme) and Tailwind dark variant styles update together.
    if (typeof document !== 'undefined') {
      const isDark = resolvedTheme === 'dark' || theme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [theme, resolvedTheme]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeLogger>
            {children}
          </ThemeLogger>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}