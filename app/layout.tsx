import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanaChatWidget from "@/components/LanaChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lux Automaton — Private AI Systems for Builders & Founders",
  description:
    "Automate | Innovate | Accelerate. Build faster, automate smarter, and run your business from one connected AI ecosystem. Private AI systems for builders, founders, and small businesses.",
  keywords: [
    "AI automation",
    "private AI",
    "business automation",
    "AI ecosystem",
    "founders",
    "small business AI",
  ],
  openGraph: {
    title: "Lux Automaton — Private AI Systems",
    description: "Build faster. Automate smarter. Run your business from one AI ecosystem.",
    type: "website",
  },
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
