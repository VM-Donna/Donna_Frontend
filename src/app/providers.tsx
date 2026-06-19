"use client";

import { ReactNode, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { createQueryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/theme/ThemeProvider";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <FloatingNav />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
