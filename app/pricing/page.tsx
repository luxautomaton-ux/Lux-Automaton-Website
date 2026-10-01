import Link from "next/link";
import type { Metadata } from "next";
import { Check, Laptop, PackageCheck, Settings2, Usb } from "lucide-react";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Pricing & Access — Lux Automaton",
  description: "Choose the Lux Automaton starting point that fits your business: Lux Agent, portable access, Success Packs, or a custom implementation.",
};

const paths = [
  {
    eyebrow:"START HERE",
    title:"Lux Agent",
    line:"Your AI team and workspace.",
    copy:"Begin with the Lux Agent experience and build the operating environment around the way you actually work.",
    icon:Laptop,
    items:["AI workspace","LANA + specialist agents","Workflows and tools","Human approvals"],
    cta:"Get Started",
    href:"/start-here",
  },
  {
    eyebrow:"OPTIONAL COMPANION",
    title:"Lux Agent USB",
    line:"Portable access for travel.",
    copy:"Extend your main Desktop experience with a lighter, portable companion for compatible computers and travel workflows.",
    icon:Usb,
    items:["Travel-ready companion","Selected tools and context","Portable workflows","Desktop sync model"],
    cta:"Explore USB",
    href:"/products/lux-agent-usb",
  },
  {
    eyebrow:"ADD-ON",
    title:"Success Packs",
    line:"Templates and playbooks for real work.",
    copy:"Add role- or industry-specific workflows, resources, prompts, templates, and training without rebuilding the platform.",
    icon:PackageCheck,
    items:["Business playbooks","Templates","Workflow recipes","Step-by-step training"],
    cta:"Explore Packs",
    href:"/products/success-packs",
  },
  {
    eyebrow:"CUSTOM",
    title:"Implementation Services",
    line:"Built around your business.",
    copy:"For teams that need deployment, automation, custom tools, verification, training, or a complete operating-system implementation.",
    icon:Settings2,
    items:["Setup & deployment","Workflow automation","Custom builds","Verification & training"],
    cta:"Talk With Us",
    href:"/contact",
  },
];

export default function PricingPage(){
  return (
    <main className="lux26-pricing">
      <section className="lux26-pricing-hero">
        <video className="lux26-hero-film" autoPlay muted loop playsInline poster={prefixPath("/images/lux-business-office.jpg")}>
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4"/>
        </video>
        <div className="lux26-hero-shade"/>
        <div className="lux26-site-width">
          <span className="lux26-eyebrow">PRICING + ACCESS</span>
          <h1>Start with what you need.<br/><em>Expand when it makes sense.</em></h1>
          <p>
            Lux Automaton is designed as a connected system, not a pile of subscriptions.
            Choose a starting point, then add portable access, packs, or implementation support as needed.
          </p>
          <div className="lux26-home-actions">
            <Link className="lux26-primary-cta" href="/start-here">Find Your Starting Point <b>→</b></Link>
            <Link className="lux26-secondary-cta" href="/contact">Talk With Lux Automaton</Link>
          </div>
        </div>
      </section>

      <section className="lux26-pricing-grid-wrap">
        <div className="lux26-site-width">
          <div className="lux26-pricing-grid">
            {paths.map(({eyebrow,title,line,copy,icon:Icon,items,cta,href})=>(
              <article className="lux26-pricing-card" key={title}>
                <span>{eyebrow}</span>
                <Icon size={40} strokeWidth={1.6}/>
                <h2>{title}</h2>
                <strong>{line}</strong>
                <p>{copy}</p>
                <ul>{items.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul>
                <Link href={href}>{cta} <b>→</b></Link>
              </article>
            ))}
          </div>
          <p className="lux26-pricing-note">
            Availability, release access, implementation scope, and pricing can vary by product and deployment.
            Lux Automaton confirms the current offer before purchase or implementation.
          </p>
        </div>
      </section>
    </main>
  );
}
