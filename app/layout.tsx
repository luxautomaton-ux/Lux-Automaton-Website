import type { Metadata } from "next";
import "./globals.css";
import "./lux-rebrand.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanaChatWidget from "@/components/LanaChatWidget";

import { prefixPath } from "@/lib/prefix";

const fallbackSiteUrl = "https://luxautomaton-ux.github.io/Lux-Automaton-Website/";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = `${configuredSiteUrl || fallbackSiteUrl}`.replace(/\/?$/, "/");
const socialImage = `${siteUrl}lux-automaton-social-20261002.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: "Lux Automaton — Automate | Innovate | Accelerate",
  description: "Lux Automaton builds connected AI systems for business, automation, verification, learning, and real-world impact — with Lux Agent as the customer-facing platform at the center.",
  applicationName: "Lux Automaton",
  keywords: [
    "Lux Automaton",
    "Lux Agent",
    "Lux Agent Desktop",
    "Lux Agent USB",
    "LANA AI",
    "Business Automation",
    "AI Agents",
    "Lux Flow",
    "Lux Verify",
    "AI Training",
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
    title: "Lux Automaton - Private AI Systems for Builders and Founders",
    description: "Lux Automaton is the AI Operating System company providing private, secure AI agents, coding environments, and automated business operating systems.",
    type: "website",
    url: siteUrl,
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Lux Automaton — Build the future with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux Automaton - Private AI Systems for Builders and Founders",
    description: "Private AI Operating Systems and secure agents for builders, founders, and small businesses.",
    images: [socialImage],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "var(--bg-base)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <LanaChatWidget />
      </body>
    </html>
  );
}
