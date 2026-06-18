"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { prefixPath } from "@/lib/prefix";

const PRODUCTS_ITEMS = [
  { href: "/products/lux-agent-usb", name: "Lux Agent USB", icon: "💾", desc: "Portable AI Business OS" },
  { href: "/products/lux-coder", name: "Lux Coder", icon: "</> ", desc: "Premium AI Coding Suite" },
  { href: "/products/lux-agent", name: "Lux Agent", icon: "🤖", desc: "Your Personal AI Assistant" },
  { href: "/products/lana", name: "LANA", icon: "💜", desc: "The AI Operator & Soul" },
  { href: "/products/luxwriteoff", name: "Lux WriteOff", icon: "💰", desc: "AI Expense Intelligence" },
  { href: "/products/lux-budgeter", name: "Lux Budgeter", icon: "📊", desc: "Smart Business Budgeting" },
  { href: "/products/success-packs", name: "Success Packs", icon: "📦", desc: "DFY Playbooks & Systems" },
];

const SOLUTIONS_ITEMS = [
  { href: "/solutions/lux-care-os", name: "Lux Care OS", icon: "🏥", desc: "Healthcare & Care Operations" },
  { href: "/solutions/epic-electric", name: "Epic Electric", icon: "⚡", desc: "Contractor & Field Service" },
  { href: "/solutions/inland-circle-program-o", name: "Inland Circle Program OS", icon: "🌐", desc: "Community & Nonprofit Ops" },
  { href: "/solutions", name: "All Solutions", icon: "⚙️", desc: "Custom AI Operating Systems" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"products" | "solutions" | null>(null);
  
  // Mobile accordion states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setMobileSolutionsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(6, 11, 20, 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0, 229, 255, 0.1)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src={prefixPath("/images/logo.png")}
            alt="Lux Automaton Logo"
            width={44}
            height={44}
            style={{
              borderRadius: "10px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px rgba(0, 229, 255, 0.3))",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                color: "var(--text-primary)",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              Lux <span style={{ color: "var(--cyan)" }}>Automaton</span>
            </div>
            <div
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              Automate · Innovate · Accelerate
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Home */}
          <Link
            href="/"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              border: pathname === "/" ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveDropdown("products")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: pathname.startsWith("/products") ? "var(--cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/products") ? "rgba(0, 229, 255, 0.08)" : "transparent",
                border: pathname.startsWith("/products") ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Products
              <span style={{ fontSize: "0.6rem", transition: "transform 0.2s", transform: activeDropdown === "products" ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === "products" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: "12px",
                  width: "320px",
                  animation: "fadeIn 0.2s ease-out",
                }}
              >
                <div
                  style={{
                    background: "rgba(6, 11, 20, 0.96)",
                    border: "1px solid rgba(0, 229, 255, 0.15)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {PRODUCTS_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                      className="nav-dropdown-item"
                    >
                      <span style={{ fontSize: "1.2rem", width: "24px", textAlign: "center" }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }} className="nav-dropdown-item-title">
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", marginTop: "6px", paddingTop: "8px" }}>
                    <Link
                      href="/products"
                      style={{
                        display: "block",
                        textAlign: "center",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--cyan)",
                        textDecoration: "none",
                        padding: "6px 0",
                      }}
                    >
                      Explore All Products →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: pathname.startsWith("/solutions") ? "var(--cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/solutions") ? "rgba(0, 229, 255, 0.08)" : "transparent",
                border: pathname.startsWith("/solutions") ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Solutions
              <span style={{ fontSize: "0.6rem", transition: "transform 0.2s", transform: activeDropdown === "solutions" ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === "solutions" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: "12px",
                  width: "320px",
                  animation: "fadeIn 0.2s ease-out",
                }}
              >
                <div
                  style={{
                    background: "rgba(6, 11, 20, 0.96)",
                    border: "1px solid rgba(0, 229, 255, 0.15)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {SOLUTIONS_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                      className="nav-dropdown-item"
                    >
                      <span style={{ fontSize: "1.2rem", width: "24px", textAlign: "center" }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }} className="nav-dropdown-item-title">
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px" }}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Partners */}
          <Link
            href="/partners"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/partners" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/partners" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              border: pathname === "/partners" ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Partners
          </Link>

          {/* Books */}
          <Link
            href="/books"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/books" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/books" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              border: pathname === "/books" ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Books
          </Link>

          {/* Founders */}
          <Link
            href="/founders"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/founders" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/founders" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              border: pathname === "/founders" ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Founders
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/contact" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/contact" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              border: pathname === "/contact" ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Contact
          </Link>

          <Link
            href="/contact"
            className="btn-primary"
            style={{ marginLeft: "8px", padding: "10px 22px", fontSize: "0.8rem" }}
          >
            Get Started →
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          style={{
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: mobileOpen && i === 1 ? "transparent" : "var(--cyan)",
                borderRadius: "1px",
                transition: "all 0.2s ease",
                transform:
                  mobileOpen && i === 0
                    ? "rotate(45deg) translate(4px, 4px)"
                    : mobileOpen && i === 2
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(6, 11, 20, 0.97)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            maxHeight: "calc(100vh - 72px)",
            overflowY: "auto",
          }}
        >
          {/* Home */}
          <Link
            href="/"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              display: "block",
            }}
          >
            Home
          </Link>

          {/* Products Mobile Accordion */}
          <div>
            <button
              onClick={() => setMobileProductsOpen((prev) => !prev)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                color: pathname.startsWith("/products") ? "var(--cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/products") ? "rgba(0, 229, 255, 0.08)" : "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span>Products</span>
              <span style={{ fontSize: "0.8rem", transition: "transform 0.2s", transform: mobileProductsOpen ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {mobileProductsOpen && (
              <div style={{ paddingLeft: "16px", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                <Link
                  href="/products"
                  style={{
                    padding: "10px 16px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--cyan)",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  Explore All Products →
                </Link>
                {PRODUCTS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: pathname === item.href ? "var(--cyan)" : "var(--text-secondary)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Mobile Accordion */}
          <div>
            <button
              onClick={() => setMobileSolutionsOpen((prev) => !prev)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                color: pathname.startsWith("/solutions") ? "var(--cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/solutions") ? "rgba(0, 229, 255, 0.08)" : "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span>Solutions</span>
              <span style={{ fontSize: "0.8rem", transition: "transform 0.2s", transform: mobileSolutionsOpen ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {mobileSolutionsOpen && (
              <div style={{ paddingLeft: "16px", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                {SOLUTIONS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: pathname === item.href ? "var(--cyan)" : "var(--text-secondary)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>


          {/* Partners */}
          <Link
            href="/partners"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/partners" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/partners" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              display: "block",
            }}
          >
            Partners
          </Link>

          {/* Books */}
          <Link
            href="/books"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/books" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/books" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              display: "block",
            }}
          >
            Books
          </Link>

          {/* Founders */}
          <Link
            href="/founders"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/founders" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/founders" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              display: "block",
            }}
          >
            Founders
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/contact" ? "var(--cyan)" : "var(--text-secondary)",
              background: pathname === "/contact" ? "rgba(0, 229, 255, 0.08)" : "transparent",
              display: "block",
            }}
          >
            Contact
          </Link>

          <Link href="/contact" className="btn-primary" style={{ marginTop: "12px", justifyContent: "center" }}>
            Get Started →
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 4px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .nav-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.04) !important;
        }
        .nav-dropdown-item:hover .nav-dropdown-item-title {
          color: var(--cyan) !important;
        }
      `}</style>
    </header>
  );
}
