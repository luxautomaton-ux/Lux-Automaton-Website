import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

const groups = [
  {
    title: "Products",
    links: [
      ["Lux Agent Desktop", "/products#lux-agent-desktop"],
      ["Lux Agent USB", "/products/lux-agent-usb"],
      ["Lux Agent", "/products/lux-agent"],
      ["Success Packs", "/products/success-packs"],
    ],
  },
  {
    title: "Services",
    links: [
      ["AI Setup & Deployment", "/services#deployment"],
      ["Workflow Automation", "/services#automation"],
      ["Build It For Me", "/services#build"],
      ["Training", "/services#training"],
    ],
  },
  {
    title: "Learn & Impact",
    links: [
      ["Workshops", "/workshops"],
      ["Lux TV", "/lux-tv"],
      ["Lux AI Kids", "/lux-ai-kids"],
      ["Lux Foundation", "/foundation"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Founders", "/founders"],
      ["Blog", "/blog"],
      ["Ask LANA", "/ask-lana"],
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="luxa-footer">
      <div className="luxa-container">
        <div className="luxa-footer-grid">
          <div className="luxa-footer-brand">
            <Image
              src={prefixPath("/images/lux-automaton-brand/lux-automaton-logo.png")}
              alt="Lux Automaton"
              width={72}
              height={72}
            />
            <p>
              Lux Automaton builds private AI systems, portable agent experiences, practical automation,
              education, and media for people creating what comes next.
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map(([label, href]) => (
                <Link key={href + label} href={href}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="luxa-footer-bottom">
          <span>© {new Date().getFullYear()} Lux Automaton LLC. All rights reserved.</span>
          <span>Automate · Innovate · Accelerate</span>
        </div>
      </div>
    </footer>
  );
}
