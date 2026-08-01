"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  KIDS_WORKSHOPS,
  WORKSHOP_PROGRAMS,
  type WorkshopCategory,
} from "@/lib/luxContent";

const CATEGORIES: { key: WorkshopCategory | "all"; label: string; icon: string }[] = [
  { key: "all", label: "All Workshops", icon: "✦" },
  { key: "video-games", label: "Video Games", icon: "🎮" },
  { key: "robots", label: "Robots", icon: "🤖" },
  { key: "cartoons", label: "Cartoons", icon: "🎬" },
  { key: "school-projects", label: "School Projects", icon: "📚" },
  { key: "family-projects", label: "Family Projects", icon: "🏠" },
  { key: "creative-lab", label: "Creative Lab", icon: "🎨" },
];

const LEVEL_COLORS: Record<string, string> = {
  Starter: "var(--kid-green)",
  Builder: "var(--kid-blue)",
  Pro: "var(--kid-pink)",
};

const LAB_PROGRAM_SLUGS = new Set([
  "ai-explorer-kids",
  "ai-art-studio-kids",
  "storyteller-lab-kids",
  "robot-builders-kids",
]);

const WORKSHOP_CATEGORY_IMAGES: Record<WorkshopCategory, string> = {
  "video-games": "/images/workshops/your-first-video-game/package/00_workshop_thumbnail_16x9.png",
  robots: "/images/lux-ai-kids-academy/robot-builders-lab.png",
  cartoons: "/images/lux-ai-kids-academy/storyteller-lab.png",
  "school-projects": "/images/lux-ai-kids-academy/ai-explorer-lab.png",
  "family-projects": "/images/lux-ai-kids-academy/ace-learning-hero.jpg",
  "creative-lab": "/images/lux-ai-kids-academy/art-studio-lab.png",
};

export default function KidsWorkshopsPage() {
  const [activeCategory, setActiveCategory] = useState<WorkshopCategory | "all">("all");
  const [showCount, setShowCount] = useState(10);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? KIDS_WORKSHOPS
        : KIDS_WORKSHOPS.filter((w) => w.category === activeCategory),
    [activeCategory],
  );

  const visible = filtered.slice(0, showCount);
  const kidsPrograms = WORKSHOP_PROGRAMS.filter((program) => program.audience === "Lux AI Kids");
  const labPrograms = kidsPrograms.filter((program) => LAB_PROGRAM_SLUGS.has(program.slug));
  const completeWorkshopPrograms = kidsPrograms.filter((program) => !LAB_PROGRAM_SLUGS.has(program.slug));

  return (
    <div className="kids-world kw-page">
      {/* ═══ HERO ═══ */}
      <section className="kw-hero">
        <div className="kw-hero-inner">
          <div className="kw-hero-badge">
            <span className="kw-badge-icon">✦</span>
            <span>Lux AI Kids Workshop</span>
          </div>
          <h1>
            Learn AI. <span>Build anything.</span>
            <br />
            Change the world.
          </h1>
          <p className="kw-hero-sub">
            Ace and Lana are your guides. Pick a workshop, follow the steps, and
            come out with something real you can show, share, or improve.
          </p>
          <div className="kw-hero-teachers">
            <div className="kw-teacher-card kw-ace">
              <div className="kw-teacher-avatar">⚡</div>
              <div>
                <h3>Ace</h3>
                <p>Your creative co-builder. Wild ideas, bold moves, and nonstop energy.</p>
              </div>
            </div>
            <div className="kw-teacher-card kw-lana">
              <div className="kw-teacher-avatar">🔮</div>
              <div>
                <h3>Lana</h3>
                <p>Your smart guide. Plans, safety, and making sure every project works right.</p>
              </div>
            </div>
          </div>
          <div className="kw-hero-trust">
            <span>✓ Age-appropriate</span>
            <span>✓ Project-based</span>
            <span>✓ Safety-first</span>
            <span>✓ Human-guided</span>
          </div>
        </div>
        <div className="kw-hero-art">
          <Image src="/images/lux-ai-kids-academy/ace-learning-hero.jpg" alt="Ace welcoming young creators to Lux AI Kids workshops" fill priority sizes="(max-width: 950px) 100vw, 42vw" />
          <span className="kw-hero-art-label">ACE&apos;S KIDS WORKSHOP STUDIO</span>
        </div>
      </section>

      <section className="kw-grid-section kids-academy-programs" id="learning-labs">
        <div className="kw-grid-header">
          <p>LUX AI KIDS LEARNING LABS</p>
          <h2>Four learning worlds. <span>Built for curious minds.</span></h2>
          <span className="kw-grid-count">{labPrograms.length} Labs</span>
        </div>
        <div className="kids-learning-dashboard" aria-label="Lab learning path">
          <span><b>01</b> Choose a learning world</span><span><b>02</b> Complete its missions</span><span><b>03</b> Earn and share your build</span>
        </div>
        <div className="kw-grid">
          {labPrograms.map((program) => (
            <Link key={program.slug} href={`/lux-ai-kids/workshops/${program.slug}`} className="kw-grid-card kids-academy-program-card">
              <div className="kids-program-thumbnail"><Image src={program.thumbnail} alt={`${program.title} Lab`} fill sizes="(max-width: 700px) 100vw, 25vw" /></div>
              <div className="kw-grid-card-top"><div className="kw-grid-icon">✦</div><span className="kw-shelf-level" style={{ background: "var(--kid-pink)" }}>Lab</span></div>
              <div className="kw-grid-card-body"><b>{program.title}</b><p>{program.description}</p></div>
              <div className="kw-grid-card-foot"><span>{program.ageBand}</span><span>{program.duration}</span><strong>Enter Lab →</strong></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="kids-ticker">
        <span>LEARN</span><b>✦</b>
        <span>BUILD</span><b>✦</b>
        <span>CREATE</span><b>✦</b>
        <span>SHARE</span><b>✦</b>
        <span>REPEAT</span>
      </div>

      <section className="kw-grid-section kids-workshop-programs" id="kids-workshops">
        <div className="kw-grid-header">
          <p>COMPLETE KIDS WORKSHOPS</p>
          <h2>Pick a project. <span>Build something real.</span></h2>
          <span className="kw-grid-count">{completeWorkshopPrograms.length} complete workshops</span>
        </div>
        <div className="kids-learning-dashboard" aria-label="Workshop learning path">
          <span><b>01</b> Pick your project</span><span><b>02</b> Follow the lesson path</span><span><b>03</b> Make and share it</span>
        </div>
        <div className="kw-grid">
          {completeWorkshopPrograms.map((program) => (
            <Link key={program.slug} href={`/lux-ai-kids/workshops/${program.slug}`} className="kw-grid-card kids-academy-program-card">
              <div className="kids-program-thumbnail kids-workshop-thumbnail"><Image src={program.thumbnail} alt={`${program.title} workshop thumbnail`} fill sizes="(max-width: 700px) 100vw, 42vw" /></div>
              <div className="kw-grid-card-top"><div className="kw-grid-icon">★</div><span className="kw-shelf-level" style={{ background: "var(--kid-blue)", color: "var(--kid-navy)" }}>Workshop</span></div>
              <div className="kw-grid-card-body"><b>{program.title}</b><p>{program.description}</p></div>
              <div className="kw-grid-card-foot"><span>{program.ageBand}</span><span>{program.duration}</span><strong>Open workshop →</strong></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORY FILTER ═══ */}
      <section className="kw-categories">
        <div className="kw-cat-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`kw-cat-btn ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat.key);
                setShowCount(10);
              }}
            >
              <span className="kw-cat-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══ WORKSHOP GRID ═══ */}
      <section className="kw-grid-section">
        <div className="kw-grid-header">
          <p>{activeCategory === "all" ? "MORE KIDS WORKSHOPS" : CATEGORIES.find((c) => c.key === activeCategory)?.label?.toUpperCase()}</p>
          <h2>
            Pick a workshop. <span>Build something real.</span>
          </h2>
          <span className="kw-grid-count">{filtered.length} workshop{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="kw-grid">
          {visible.map((w) => (
            <Link
              key={w.slug}
              className="kw-grid-card"
              href={`/lux-ai-kids/workshops/${w.slug}`}
            >
              <div className="kids-program-thumbnail">
                <Image src={WORKSHOP_CATEGORY_IMAGES[w.category]} alt={`${w.title} workshop`} fill sizes="(max-width: 700px) 100vw, 25vw" />
              </div>
              <div className="kw-grid-card-top">
                <div className="kw-grid-icon">{w.icon}</div>
                <span
                  className="kw-shelf-level"
                  style={{ background: LEVEL_COLORS[w.level] }}
                >
                  {w.level}
                </span>
              </div>
              <div className="kw-grid-card-body">
                <b>{w.title}</b>
                <p>{w.tagline}</p>
              </div>
              <div className="kw-grid-card-foot">
                <span>{w.ageRange}</span>
                <span>{w.duration}</span>
              </div>
            </Link>
          ))}
        </div>
        {showCount < filtered.length && (
          <div className="kw-grid-more">
            <button onClick={() => setShowCount((c) => c + 10)}>
              Show more ({filtered.length - showCount} remaining)
            </button>
          </div>
        )}
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="kw-how">
        <div className="kw-how-inner">
          <p>HOW IT WORKS</p>
          <h2>
            Three steps. <span>One real project.</span>
          </h2>
          <div className="kw-how-grid">
            <div className="kw-how-card">
              <div className="kw-how-num">01</div>
              <div className="kw-how-icon">🎯</div>
              <h3>Pick a Workshop</h3>
              <p>
                Choose what excites you most — games, robots, cartoons, school
                projects, or creative experiments. Every workshop has a clear goal.
              </p>
            </div>
            <div className="kw-how-card">
              <div className="kw-how-num">02</div>
              <div className="kw-how-icon">🔧</div>
              <h3>Follow the Steps</h3>
              <p>
                Ace brings the energy and ideas. Lana brings the plan and safety
                checks. You bring the creativity. Together, you build something real.
              </p>
            </div>
            <div className="kw-how-card">
              <div className="kw-how-num">03</div>
              <div className="kw-how-icon">🚀</div>
              <h3>Show What You Made</h3>
              <p>
                Every workshop ends with something you can share, present, or
                improve. Your project, your name, your achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACE & LANA TEACHER SPOTLIGHT ═══ */}
      <section className="kw-teachers">
        <div className="kw-teachers-inner">
          <div className="kw-teachers-header">
            <p>YOUR TEACHERS</p>
            <h2>
              Meet Ace <span>&</span> Lana
            </h2>
            <p className="kw-teachers-sub">
              Two guides who make learning AI fun, safe, and real. Ace is the
              co-builder with big ideas. Lana is the AI operator who keeps
              everything on track.
            </p>
          </div>
          <div className="kw-teachers-grid">
            <div className="kw-teacher-spotlight kw-spot-ace">
              <div className="kw-spot-avatar">⚡</div>
              <h3>Ace</h3>
              <span className="kw-spot-role">Creative Co-Builder</span>
              <ul>
                <li>Brings wild ideas and energy to every project</li>
                <li>Helps you brainstorm characters, stories, and designs</li>
                <li>Makes learning feel like an adventure</li>
                <li>Asks the questions nobody else thinks of</li>
                <li>Cheers you on when things get tricky</li>
              </ul>
            </div>
            <div className="kw-teacher-spotlight kw-spot-lana">
              <div className="kw-spot-avatar">🔮</div>
              <h3>Lana</h3>
              <span className="kw-spot-role">AI Operator & Guide</span>
              <ul>
                <li>Turns big ideas into clear, step-by-step plans</li>
                <li>Teaches responsible AI use and online safety</li>
                <li>Helps organize projects so they actually work</li>
                <li>Reviews safety rules and fairness in every build</li>
                <li>Makes sure your project is ready to share</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARENTS SECTION ═══ */}
      <section className="kids-grownups">
        <div>
          <p>GROWN-UPS&apos; CORNER</p>
          <h2>
            Creative confidence,
            <br />
            with guardrails.
          </h2>
        </div>
        <div>
          <p>
            Lux AI Kids workshops are designed for guided, age-appropriate
            learning. Every project emphasizes critical thinking, privacy,
            consent, source-checking, and using AI to help people — not replace
            human judgment.
          </p>
          <ul>
            <li>Clear age bands and learning goals for every workshop</li>
            <li>No unsupervised public publishing</li>
            <li>Printable activity and conversation guides</li>
            <li>School, library, and community workshop options</li>
            <li>Every project reviewed by Ace and Lana for safety</li>
          </ul>
          <Link href="/contact">Bring Lux AI Kids to your community →</Link>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="kids-letter">
        <div>
          <p>THE LUX LAB LETTER</p>
          <h2>
            Projects for curious kids,
            <br />
            notes for caring grown-ups.
          </h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input required type="email" placeholder="grownup@email.com" />
          <button>Join free →</button>
          <small>One thoughtful email each week. Unsubscribe anytime.</small>
        </form>
      </section>
    </div>
  );
}
