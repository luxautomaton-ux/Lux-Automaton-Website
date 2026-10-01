"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { prefixPath } from "@/lib/prefix";

const nav = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Workshops", href: "/workshops" },
  { label: "Lux TV", href: "/lux-tv" },
  { label: "Lux Kids", href: "/lux-ai-kids" },
  { label: "Foundation", href: "/foundation" },
  { label: "Company", href: "/founders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="luxa-nav">
      <div className="luxa-nav-inner">
        <Link className="luxa-nav-brand" href="/">
          <Image
            src={prefixPath("/images/lux-automaton-brand/lux-automaton-logo.png")}
            alt="Lux Automaton"
            width={48}
            height={48}
            priority
          />
          <div>
            <strong>Lux Automaton</strong>
            <small>AI systems for real work</small>
          </div>
        </Link>

        <nav className="luxa-nav-links" data-open={open ? "true" : "false"} aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname === item.href || pathname.startsWith(item.href + "/") ? "true" : "false"}
            >
              {item.label}
            </Link>
          ))}
          <Link className="luxa-nav-cta" href="/products#lux-agent">
            Explore Lux Agent
          </Link>
        </nav>

        <button
          className="luxa-mobile-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "×" : "☰"}
        </button>
      </div>
    </header>
  );
}
