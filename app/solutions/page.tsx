import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BarChart3, Bot, CheckCircle2, MessageSquareText, ShieldCheck, Workflow } from "lucide-react";
import { SOLUTIONS } from "@/lib/solutions";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Solutions — Lux Automaton",
  description: "Real solutions for founders, teams, consultants, agencies, growing businesses, and custom operating environments.",
};

const useCases = [
  {
    eyebrow:"FOR FOUNDERS",
    title:"AI Team Operations",
    copy:"Go from idea to execution with LANA, agents, workflows, approvals, and a visible command center.",
    icon:Bot,
    href:"/services#agents",
  },
  {
    eyebrow:"FOR TEAMS",
    title:"Sales & Follow-Up",
    copy:"Organize outreach, communication, follow-up rhythms, and handoffs without losing owner control.",
    icon:MessageSquareText,
    href:"/services#automation",
  },
  {
    eyebrow:"FOR CONSULTANTS",
    title:"Knowledge & Documents",
    copy:"Bring files, operating knowledge, research, and client deliverables into a more useful AI workflow.",
    icon:ShieldCheck,
    href:"/services#deployment",
  },
  {
    eyebrow:"FOR AGENCIES",
    title:"Messaging & Outreach",
    copy:"Use WarmConnect, Messages, and governed agents to support relationships and repeatable outreach.",
    icon:MessageSquareText,
    href:"/services#automation",
  },
  {
    eyebrow:"FOR GROWING BUSINESSES",
    title:"Workflow Automation",
    copy:"Map repetitive work into Lux Flow with visible steps, approvals, evidence, and run history.",
    icon:Workflow,
    href:"/services#automation",
  },
  {
    eyebrow:"FOR EVERYWHERE",
    title:"Desktop + Travel",
    copy:"Use Lux Agent Desktop as the home base and Lux Agent USB as the optional portable companion.",
    icon:BarChart3,
    href:"/products/lux-agent-usb",
  },
];

export default function SolutionsPage(){
  return (
    <main className="lux26-solutions">
      <section className="lux26-solutions-hero">
        <video className="lux26-hero-film" autoPlay muted loop playsInline poster={prefixPath("/images/lux-business-office.jpg")}>
          <source src={prefixPath("/videos/lux-business-launch-os-launch-film.mp4")} type="video/mp4"/>
        </video>
        <div className="lux26-hero-shade"/>
        <div className="lux26-site-width lux26-solutions-hero-grid">
          <div>
            <span className="lux26-eyebrow">SOLUTIONS</span>
            <h1>Real Solutions<br/>for Real <em>Progress.</em></h1>
            <p>
              Lux Automaton helps founders, teams, consultants, agencies, and growing businesses
              turn AI into visible systems for real work.
            </p>
            <div className="lux26-home-actions">
              <Link href="/products" className="lux26-primary-cta">See All Products <b>→</b></Link>
              <Link href="/contact" className="lux26-secondary-cta">Talk With Us</Link>
            </div>
          </div>

          <div className="lux26-solution-assistant">
            <Image src={prefixPath("/images/lana-executive-office.jpg")} alt="LANA" width={1000} height={900} priority/>
            <div className="lux26-solution-panel">
              <span>Hi, I&apos;m LANA.</span>
              <strong>I&apos;ll help you find the right Lux solution for your goals.</strong>
              {["Grow my business","Automate my work","Improve follow-ups","Build a custom system"].map(x=><small key={x}>{x}</small>)}
            </div>
          </div>
        </div>
      </section>

      <section className="lux26-usecases">
        <div className="lux26-site-width">
          <header className="lux26-section-heading compact">
            <span>USE CASES</span>
            <h2>Built for How <em>You Work.</em></h2>
            <p>Different goals. Same connected Lux system.</p>
          </header>
          <div className="lux26-usecase-grid">
            {useCases.map(({eyebrow,title,copy,icon:Icon,href})=>(
              <Link href={href} className="lux26-usecase-card" key={title}>
                <span>{eyebrow}</span>
                <Icon size={38} strokeWidth={1.6}/>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ul>
                  <li><CheckCircle2 size={14}/> Visible workflows</li>
                  <li><CheckCircle2 size={14}/> Human approvals</li>
                  <li><CheckCircle2 size={14}/> Real operating context</li>
                </ul>
                <b>Learn More →</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lux26-built-systems">
        <div className="lux26-site-width">
          <header className="lux26-section-heading">
            <span>BUILT WITH LUX AUTOMATON</span>
            <h2>Custom operating systems.<br/><em>Real-world environments.</em></h2>
            <p>
              These are examples of how the Lux stack can be configured around a specific business,
              program, or operating model.
            </p>
          </header>
          <div className="lux26-system-grid">
            {SOLUTIONS.map(solution=>(
              <Link href={"/solutions/"+solution.slug} className="lux26-system-card" key={solution.slug}>
                {solution.bgImage ? <Image src={prefixPath(solution.bgImage)} alt="" width={1000} height={700}/> : null}
                <div>
                  <span>{solution.category}</span>
                  <h3>{solution.name}</h3>
                  <p>{solution.tagline}</p>
                  <b>Explore System →</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lux26-benefit-bar">
        <div className="lux26-site-width">
          <div><Bot size={34}/><span><strong>Built for People</strong><small>AI supports the work.</small></span></div>
          <div><Workflow size={34}/><span><strong>Real Workflows</strong><small>Visible steps and handoffs.</small></span></div>
          <div><BarChart3 size={34}/><span><strong>Real Results</strong><small>Measure what changed.</small></span></div>
          <div><ShieldCheck size={34}/><span><strong>Private & Secure</strong><small>Your data. Your control.</small></span></div>
          <div><Link href="/contact" className="lux26-mini-cta">Find Your Solution →</Link></div>
        </div>
      </section>
    </main>
  );
}
