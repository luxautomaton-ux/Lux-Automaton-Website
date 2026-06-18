import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanaChatWidget from "@/components/LanaChatWidget";

import { prefixPath } from "@/lib/prefix";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lux Automaton - Build Faster. Automate Smarter. Own Your Stack.",
  description: "Build Faster. Automate Smarter. Own Your Stack.",
  keywords: [
    "AI automation",
    "private AI",
    "business automation",
    "AI ecosystem",
    "founders",
    "small business AI",
  ],
  icons: {
    icon: [
      { url: prefixPath("/images/logo-icon.svg"), type: "image/svg+xml" },
    ],
    apple: [
      { url: prefixPath("/images/logo.png") },
    ]
  },
  openGraph: {
    title: "Lux Automaton - Build Faster. Automate Smarter. Own Your Stack.",
    description: "Build Faster. Automate Smarter. Own Your Stack.",
    type: "website",
    url: "https://luxautomaton-ux.github.io/Lux-Automaton-Website/",
    images: [
      {
        url: "https://luxautomaton-ux.github.io/Lux-Automaton-Website/images/lux-automaton-saas.png",
        width: 1200,
        height: 630,
        alt: "Lux Automaton AI Ecosystem",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux Automaton - Build Faster. Automate Smarter. Own Your Stack.",
    description: "Build Faster. Automate Smarter. Own Your Stack.",
    images: ["https://luxautomaton-ux.github.io/Lux-Automaton-Website/images/lux-automaton-saas.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "var(--bg-base)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <LanaChatWidget />
      </body>
    </html>
  );
}
