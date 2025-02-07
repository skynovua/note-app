import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

import { OnlineToast } from "@/components/online-toast";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Notes App",
  title: "Notes App",
  description: "A simple notes app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            {children}
            <Toaster position="top-right" />
            <OnlineToast />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
