"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/components/Toast";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>{children}</ToastProvider>
    </LanguageProvider>
  );
}
