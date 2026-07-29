import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

const capabilities = [
  ["01", "Understand the work", "Jarvis gathers the right context from your goals, files, systems, and previous decisions before recommending a next move."],
  ["02", "Turn intent into a plan", "Convert a rough idea into clear steps, owners, checkpoints, and a practical workflow your team can actually follow."],
  ["03", "Keep people in control", "Jarvis prepares, drafts, organizes, and monitors. Important publishing, spending, credentials, and outbound actions stay behind human approval."],
  ["04", "Make progress visible", "Bring priorities, open questions, tasks, and outcomes into one calm operating view so work does not disappear inside chat threads."],
];

export default function LuxJarvisPage() {
  return <main className="jarvis-page">
    <section className="jarvis-hero">
      <video autoPlay muted loop playsInline className="jarvis-hero-video" src={prefixPath("/videos/lux-jarvis-introduction.mp4")} />
      <div className="jarvis-hero-shade" />
      <div className="jarvis-shell jarvis-hero-content">
        <div>
          <p className="jarvis-kicker">LUX JARVIS · YOUR AI OPERATIONS PARTNER</p>
          <Image src={prefixPath("/images/lux-jarvis/lux-jarvis-logo.png")} alt="Lux Jarvis" width={640} height={280} priority className="jarvis-logo" />
          <h1>Keep the vision.<br /><span>Lose the chaos.</span></h1>
          <p className="jarvis-lede">Lux Jarvis is a calm, capable AI partner for builders who need to move from ideas to organized action—without handing over the steering wheel.</p>
          <div className="jarvis-actions"><Link href="/contact">Talk to the Lux team →</Link><a href="#how-it-works">See how Jarvis works</a></div>
          <div className="jarvis-proof"><span>Human-approved actions</span><span>Private-first workflows</span><span>Built for real operators</span></div>
        </div>
        <div className="jarvis-portrait-wrap"><Image src={prefixPath("/images/lux-jarvis/lux-jarvis-icon.png")} alt="Lux Jarvis assistant" width={640} height={640} className="jarvis-portrait" /></div>
      </div>
    </section>

    <section className="jarvis-intro jarvis-shell"><p className="jarvis-kicker">WHAT JARVIS IS</p><h2>An operating partner for the work behind the work.</h2><p>Jarvis helps founders, creators, and small teams clarify priorities, prepare communication, organize systems, and keep important work moving. It is designed to work alongside people—not to quietly act on their behalf.</p></section>

    <section id="how-it-works" className="jarvis-capabilities"><div className="jarvis-shell"><header><p className="jarvis-kicker">THE JARVIS LOOP</p><h2>From a loose thought to a dependable next step.</h2></header><div className="jarvis-cap-grid">{capabilities.map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="jarvis-usecases jarvis-shell"><div><p className="jarvis-kicker">BUILT FOR DAILY MOMENTUM</p><h2>One partner. Many kinds of progress.</h2><ul><li>Plan the week without losing your long-term direction</li><li>Turn meeting notes into decisions, owners, and follow-ups</li><li>Prepare campaigns, posts, launch checklists, and client communication</li><li>Organize knowledge, recurring workflows, and operating procedures</li><li>Surface risks, missing information, and approval moments before they become problems</li></ul></div><div className="jarvis-gallery">{["gallery-01.jpg", "gallery-02.jpg", "gallery-03.jpg"].map((image, index) => <div key={image} className={`jarvis-gallery-item item-${index + 1}`}><Image src={prefixPath(`/images/lux-jarvis/${image}`)} alt="Lux Jarvis in action" fill sizes="(max-width: 800px) 100vw, 33vw" /></div>)}</div></section>

    <section className="jarvis-guardrails"><div className="jarvis-shell"><p className="jarvis-kicker">TRUST IS A FEATURE</p><h2>Helpful does not mean unchecked.</h2><div className="jarvis-guardrail-grid"><article><span>✓</span><h3>Approval before action</h3><p>Jarvis can prepare work and ask for a clear go-ahead before consequential external actions.</p></article><article><span>✓</span><h3>Context with boundaries</h3><p>Bring in the information needed for the task, keep sensitive data scoped, and retain a clear record of what informed a decision.</p></article><article><span>✓</span><h3>Private by design</h3><p>Lux products are built around the principle that your systems, client information, and operating knowledge deserve intentional control.</p></article></div></div></section>

    <section className="jarvis-cta"><div className="jarvis-shell"><Image src={prefixPath("/images/lux-jarvis/lux-jarvis-icon.png")} alt="Lux Jarvis" width={130} height={130} /><div><p className="jarvis-kicker">READY WHEN YOU ARE</p><h2>Build with a clearer operating rhythm.</h2><p>Start a conversation about bringing Lux Jarvis into your workflow.</p></div><Link href="/contact">Explore Lux Jarvis →</Link></div></section>
  </main>;
}
