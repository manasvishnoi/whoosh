import type { Metadata } from "next";
import "./globals.css";
import SahayakWidget from "@/components/SahayakWidget";

export const metadata: Metadata = {
  title: "Whoosh — और वो आ गया!",
  description:
    "India's hyperlocal agentic commerce platform. Free delivery, every time. Your neighbourhood kirana, digitally empowered.",
  keywords: "kirana, hyperlocal, free delivery, WhatsApp commerce, India, Lucknow",
  openGraph: {
    title: "Whoosh — और वो आ गया!",
    description: "Free delivery from your local kirana. Powered by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <SahayakWidget />
      </body>
    </html>
  );
}
