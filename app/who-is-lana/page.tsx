import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle2, FileText, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { prefixPath } from "@/lib/prefix";

const lanaPillars = [
  {
    icon: BrainCircuit,
    title: "Memory-aware guide",
    body: "LANA was shaped to understand the Lux Automaton ecosystem, remember the purpose of the work, and keep users from starting over every time they ask for help.",
  },
  {
    icon: Workflow,
    title: "Operator, not chatbot",
    body: "She is designed around next moves: planning workshops, organizing products, drafting follow-ups, preparing content, and connecting ideas to execution.",
  },
  {
    icon: ShieldCheck,
    title: "Human-approved AI",
    body: "LANA helps create structure and drafts, but the owner stays in control. Sensitive work, publishing, and final decisions belong to the human.",
  },
];

const buildStory = [
  "Asa needed an assistant that could understand more than one prompt at a time.",
  "Lux Automaton needed a voice that could connect products, workshops, newsletters, videos, and customer systems.",
  "LANA became the operating personality of that system: warm, direct, organized, and built to help people move.",
];

const capabilities = [
  "Turn a YouTube video, article, podcast, or uploaded video into a complete workshop draft.",
  "Create lesson paths, activities, deliverables, summaries, source notes, thumbnail briefs, and diagram prompts.",
  "Help founders plan offers, products, newsletters, sales pages, systems, and daily priorities.",
  "Guide kids and families through safe, creative AI projects with clear review steps.",
];

export default function WhoIsLanaPage() {
  return (
    <main className="who-lana-page">
      <section className="who-lana-hero">
        <Image
          src={prefixPath("/images/lana-banner.jpg")}
          alt="LANA inside the Lux Automaton command studio"
          fill
          priority
          className="who-lana-hero-image"
        />
        <div className="who-lana-hero-shade" />
        <div className="who-lana-hero-inner">
          <span className="section-label">Who Is LANA?</span>
          <h1>LANA is the Lux Automaton operator.</h1>
          <p>
            She is the guide, planner, curriculum builder, product navigator, and execution voice that helps turn Asa's ideas and the
            Lux ecosystem into working systems people can actually use.
          </p>
          <div className="who-lana-actions">
            <Link href="/ask-lana" className="primary-button">
              Ask LANA <ArrowRight size={16} />
            </Link>
            <Link href="/products/lana" className="secondary-button">
              LANA Product Page
            </Link>
          </div>
        </div>
      </section>

      <section className="who-lana-band">
        <div className="who-lana-grid">
          {lanaPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article key={pillar.title} className="who-lana-pillar">
                <Icon size={26} />
                <h2>{pillar.title}</h2>
                <p>{pillar.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="who-lana-story">
        <div className="who-lana-story-copy">
          <span className="section-label">Created for Lux Automaton</span>
          <h2>Why Asa created LANA</h2>
          <div className="who-lana-story-list">
            {buildStory.map((item) => (
              <p key={item}>
                <CheckCircle2 size={18} />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="who-lana-photo">
          <Image
            src={prefixPath("/images/lana-blazer.png")}
            alt="LANA as the Lux Automaton business strategist"
            width={1024}
            height={1024}
          />
        </div>
      </section>

      <section className="who-lana-capabilities">
        <div className="who-lana-capabilities-inner">
          <div>
            <span className="section-label">What LANA builds</span>
            <h2>Workshop drafts, product guidance, content systems, and daily execution.</h2>
          </div>
          <div className="who-lana-capability-list">
            {capabilities.map((capability) => (
              <p key={capability}>
                <Sparkles size={18} />
                {capability}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="who-lana-workflow">
        <article>
          <BookOpen size={24} />
          <h2>For workshops</h2>
          <p>LANA studies the source, builds modules and lessons, then prepares visual direction, activities, quizzes, and a publishing-ready draft.</p>
        </article>
        <article>
          <FileText size={24} />
          <h2>For content</h2>
          <p>LANA turns ideas into blogs, newsletters, TV episode briefs, launch copy, and community prompts that keep the Lux rhythm moving.</p>
        </article>
        <article>
          <Workflow size={24} />
          <h2>For products</h2>
          <p>LANA helps users understand which Lux tool fits the job and what next step should happen inside the broader operating system.</p>
        </article>
      </section>
    </main>
  );
}
