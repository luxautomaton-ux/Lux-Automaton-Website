import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

const columns = [
  {
    title: "Products",
    links: [
      ["Lux Agent Desktop", "/products#lux-agent-desktop"],
      ["Lux Agent USB", "/products/lux-agent-usb"],
      ["Success Packs", "/products/success-packs"],
      ["Explore Ecosystem", "/products"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Workshops", "/workshops"],
      ["Lux TV", "/lux-tv"],
      ["Lux AI Kids", "/lux-ai-kids"],
      ["Blog", "/blog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Founders", "/founders"],
      ["Lux Foundation", "/foundation"],
      ["Partners", "/partners"],
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="lux26-footer">
      <div className="lux26-footer-top lux26-site-width">
        <div className="lux26-footer-brand">
          <Image
            src={prefixPath("/images/logo-horizontal.png")}
            alt="Lux Automaton"
            width={500}
            height={132}
          />
          <p>
            Connected AI systems for business, automation, learning, and real-world impact.
            Built to help people work smarter, move faster, and own more of their technology.
          </p>
          <span>Automate · Innovate · Accelerate</span>
        </div>

        {columns.map((column) => (
          <div className="lux26-footer-column" key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map(([label, href]) => (
              <Link key={href + label} href={href}>{label}</Link>
            ))}
          </div>
        ))}

        <div className="lux26-footer-cta">
          <span>AI for a brighter tomorrow</span>
          <h3>Ready to build what&apos;s next?</h3>
          <Link href="/start-here">Get Started <b>→</b></Link>
        </div>
      </div>

      <div className="lux26-footer-bottom lux26-site-width">
        <span>© {new Date().getFullYear()} Lux Automaton LLC. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Support</Link>
        </div>
      </div>
    </footer>
  );
}
