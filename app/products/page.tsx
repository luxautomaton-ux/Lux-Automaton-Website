import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Database, Monitor, ShieldCheck, Usb, Workflow } from "lucide-react";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Products — Lux Automaton",
  description: "Explore the Lux Agent workspace, portable USB companion, packs, automation, verification, training, and connected Lux systems.",
};

const catalog = [
  {
    name: "Lux Agent Desktop",
    line: "Your full AI workspace.",
    copy: "LANA, your AI team, files, workflows, tools, approvals, and business context in one command center.",
    image: "/images/product-exact/agent-desktop.webp",
    href: "/products/lux-agent",
    tags: ["AI Team", "Workflows", "Private Control"],
  },
  {
    name: "Lux Agent USB",
    line: "Your AI team on the go.",
    copy: "A portable travel companion for selected tools, files, agents, and business context on compatible computers.",
    image: "/images/product-exact/agent-usb.webp",
    href: "/products/lux-agent-usb",
    tags: ["Portable", "Private", "Travel Ready"],
  },
  {
    name: "Memory Packs",
    line: "Remember more. Do more.",
    copy: "Give Lux Agent structured context, preferences, operating knowledge, and continuity across the work.",
    image: "/images/product-exact/memory-packs.webp",
    href: "/products#memory-packs",
    tags: ["Context", "Knowledge", "Continuity"],
  },
  {
    name: "Success Packs",
    line: "Templates. Tools. Real results.",
    copy: "Role and industry playbooks, workflows, prompts, resources, and training that make the system useful faster.",
    image: "/images/product-exact/success-packs.webp",
    href: "/products/success-packs",
    tags: ["Playbooks", "Templates", "Training"],
  },
  {
    name: "Lux Flow",
    line: "Build. Connect. Automate.",
    copy: "Design visible workflows, approvals, handoffs, and run history across the work your business repeats.",
    image: "/images/product-exact/flow.webp",
    href: "/services#automation",
    tags: ["Workflows", "Approvals", "Automation"],
  },
  {
    name: "Lux Verify",
    line: "Audit. Verify. Trust.",
    copy: "Evidence-backed testing, readiness checks, QA, remediation loops, and clear proof before work is called done.",
    image: "/images/product-exact/verify.webp",
    href: "/services#verify",
    tags: ["QA", "Evidence", "Readiness"],
  },
  {
    name: "Lux WarmConnect",
    line: "Know the connection. Start the conversation.",
    copy: "Relationship intelligence and outreach support for finding the right people and managing meaningful follow-up.",
    image: "/images/product-exact/warmconnect.webp",
    href: "/products/lux-warmconnect",
    tags: ["Relationships", "Outreach", "Follow-Up"],
  },
  {
    name: "AI Toolkit Club",
    line: "Learn. Build. Launch.",
    copy: "Reusable tools, templates, guides, and practical resources for founders and teams building with AI.",
    image: "/images/product-exact/toolkit.webp",
    href: "/workshops",
    tags: ["Tools", "Templates", "Learning"],
  },
  {
    name: "Lux AI Kids",
    line: "Learn AI. Build tomorrow.",
    copy: "A creative AI learning environment for kids, parents, teachers, schools, and communities.",
    image: "/images/product-exact/ai-kids.webp",
    href: "/lux-ai-kids",
    tags: ["Learning", "Creativity", "Future Skills"],
  },
  {
    name: "Business Launch OS",
    line: "Start smart. Build right.",
    copy: "A guided operating system for company setup, governance, records, approvals, deadlines, and founder visibility.",
    image: "/images/product-exact/business-launch.webp",
    href: "/solutions/lux-business-launch-os",
    tags: ["Formation", "Governance", "Records"],
  },
];

const platform = [
  ["LANA", "The executive intelligence layer that helps coordinate the customer experience."],
  ["Agent Builder", "Create governed agents with purpose, skills, memory, permissions, and clear boundaries."],
  ["Lux Connect", "Connect people, systems, and collaboration around the same operating environment."],
  ["Lux Voice", "Voice-first assistance and communication experiences across the Lux ecosystem."],
  ["Lux Messages", "AI-assisted communication with owner control and structured follow-up."],
  ["Lux World", "Map, monitor, and operate travel, places, routes, and real-world business context."],
];

export default function ProductsPage() {
  return (
    <main className="lux26-products">
      <section className="lux26-products-hero lux26-products-hero-video" aria-label="Lux Automaton product ecosystem">
        <video
          className="lux26-products-banner-film"
          autoPlay
          muted
          loop
          playsInline
          poster={prefixPath("/images/lux-products-banner-poster.jpg")}
        >
          <source src={prefixPath("/videos/web/lux-products-banner.mp4")} type="video/mp4" />
        </video>
      </section>

      <section className="lux26-catalog-shell">
        <div className="lux26-site-width">
          <div className="lux26-filter-strip" aria-label="Product categories">
            {["All Products","AI Workspace","Automation","Memory","Training","Communication","Portable"].map((label,index)=>
              <span className={index===0?"active":""} key={label}>{label}</span>
            )}
          </div>

          <div className="lux26-catalog-grid">
            {catalog.map((item)=>(
              <Link href={item.href} className="lux26-catalog-card" key={item.name}>
                <div className="lux26-catalog-media">
                  <Image src={prefixPath(item.image)} alt={item.name + " product package"} width={900} height={1100} unoptimized />
                </div>
                <h2>{item.name}</h2>
                <strong>{item.line}</strong>
                <p>{item.copy}</p>
                <div className="lux26-tag-row">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
                <b>Learn More →</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lux26-product-platform">
        <div className="lux26-site-width">
          <header className="lux26-section-heading">
            <span>THE DEEPER PLATFORM</span>
            <h2>One front door.<br /><em>More capability behind it.</em></h2>
            <p>
              Not every capability needs to become a competing storefront. These systems strengthen the
              Lux Agent experience and are surfaced where they make sense.
            </p>
          </header>
          <div className="lux26-platform-grid">
            {platform.map(([name,copy],index)=>(
              <article key={name}>
                <span>{String(index+1).padStart(2,"0")}</span>
                <h3>{name}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lux26-benefit-bar">
        <div className="lux26-site-width">
          <div><Monitor size={34}/><span><strong>Desktop Home Base</strong><small>The full Lux Agent experience.</small></span></div>
          <div><Usb size={34}/><span><strong>Portable Companion</strong><small>Take the essentials with you.</small></span></div>
          <div><Workflow size={34}/><span><strong>Connected Workflows</strong><small>Automate with visibility.</small></span></div>
          <div><Database size={34}/><span><strong>Business Memory</strong><small>Keep context useful.</small></span></div>
          <div><ShieldCheck size={34}/><span><strong>Human Control</strong><small>Approvals stay visible.</small></span></div>
        </div>
      </section>
    </main>
  );
}
