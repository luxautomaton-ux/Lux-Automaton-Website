import Link from "next/link";
import "./globals.css";
import LanaChat from "@/components/LanaChat";

export const metadata = {
  title: "Lux Agent | Offline AI Command Center",
  description: "The world's first 100% offline, plug-and-play AI orchestration environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="nav-logo">
            <span style={{ 
              background: 'linear-gradient(to right, #A275FF, #fff)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>Lux Agent</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/how-it-works" className="nav-link">How It Works</Link>
            <Link href="/features" className="nav-link">Features</Link>
            <Link href="/lux-agent" className="nav-link">Use Cases</Link>
            <Link href="/lux-coder" className="nav-link" style={{ color: '#2DD4BF' }}>Lux Coder</Link>
            <Link href="/store" className="nav-link">Pricing</Link>
          </div>
          <div>
            <Link href="/#buy" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
              Order Now
            </Link>
          </div>
        </nav>
        {children}

        {/* Global Footer */}
        <footer className="global-footer">
          <div className="container" style={{ padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 40 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8, background: 'linear-gradient(to right, #A275FF, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Lux Agent
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>Your Private AI Business Team on a USB.</p>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              <Link href="/about" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>About Us</Link>
              <Link href="/store" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>Pricing</Link>
              <Link href="/custom-pack" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>Custom Pack</Link>
              <Link href="/privacy" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>Terms of Service</Link>
              <Link href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>Contact</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: 12 }}>
            © {new Date().getFullYear()} Lux Automaton. All rights reserved.
          </div>
        </footer>

        <LanaChat />
      </body>
    </html>
  );
}
