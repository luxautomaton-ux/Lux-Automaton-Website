"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { prefixPath } from "@/lib/prefix";

const direct = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Download", href: "/download" },
];

const resources = [
  { label: "Workshops", href: "/workshops", note: "Hands-on AI learning" },
  { label: "Lux TV", href: "/lux-tv", note: "Shows, demos & founder media" },
  { label: "Lux AI Kids", href: "/lux-ai-kids", note: "Creative AI learning for kids" },
  { label: "Blog", href: "/blog", note: "Build notes & intelligence" },
  { label: "Community", href: "/community", note: "Learn and build together" },
  { label: "Books", href: "/books", note: "Guides and field notes" },
];

const company = [
  { label: "Founders", href: "/founders", note: "Asa + Torrey" },
  { label: "Lux Foundation", href: "/foundation", note: "Access, education & opportunity" },
  { label: "Partners", href: "/partners", note: "Build with Lux Automaton" },
  { label: "Ask LANA", href: "/ask-lana", note: "Meet the intelligence layer" },
  { label: "Contact", href: "/contact", note: "Talk with the team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="lux26-nav">
      <div className="lux26-nav-inner">
        <Link className="lux26-brand" href="/" aria-label="Lux Automaton home">
          <Image
            src={prefixPath("/images/logo-horizontal.png")}
            alt="Lux Automaton — Automate, Innovate, Accelerate"
            width={500}
            height={132}
            priority
          />
        </Link>

        <nav className="lux26-nav-links" data-open={open ? "true" : "false"} aria-label="Main navigation">
          {direct.map((item) => (
            <Link key={item.href} href={item.href} data-active={active(item.href) ? "true" : "false"}>
              {item.label}
            </Link>
          ))}

          <div className="lux26-drop">
            <button type="button" data-active={resources.some((item) => active(item.href)) ? "true" : "false"}>
              Resources <ChevronDown size={14} strokeWidth={2} />
            </button>
            <div className="lux26-drop-panel">
              {resources.map((item) => (
                <Link key={item.href} href={item.href}>
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lux26-drop">
            <button type="button" data-active={company.some((item) => active(item.href)) ? "true" : "false"}>
              Company <ChevronDown size={14} strokeWidth={2} />
            </button>
            <div className="lux26-drop-panel lux26-drop-panel-right">
              {company.map((item) => (
                <Link key={item.href} href={item.href}>
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="lux26-nav-actions">
          <Link className="lux26-search" href="/library" aria-label="Search Lux Automaton">
            <Search size={20} />
          </Link>
          <Link className="lux26-get-started" href="/start-here">Get Started <span>→</span></Link>
          <button
            className="lux26-mobile-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
