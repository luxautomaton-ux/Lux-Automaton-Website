"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";
import { BLOG_ARTICLES } from "@/lib/luxContent";

const labs = [
  { icon:"✦", title:"AI Explorer Lab", age:"Ages 7–10", copy:"Meet friendly AI, learn what it can do, and train your first tiny helper.", color:"pink", href:"/lux-ai-kids/academy#ai-explorer" },
  { icon:"◉", title:"Art Studio", age:"Ages 8–13", copy:"Turn big imagination into characters, posters, worlds, and visual stories.", color:"blue", href:"/lux-ai-kids/academy#art-studio" },
  { icon:"▰", title:"Storyteller Lab", age:"Ages 9–14", copy:"Write a hero, direct a scene, and bring an original story to life with video.", color:"purple", href:"/lux-ai-kids/academy#storyteller" },
  { icon:"⌁", title:"Robot Builders", age:"Ages 10–15", copy:"Design a helpful robot and solve a problem in your home or community.", color:"green", href:"/lux-ai-kids/academy#robot-builders" },
];

const characterCards = [
  {
    id: "asa",
    name: "ASA PRITCHARD",
    role: "Founder & Chief Builder ✦",
    tagline: "The Big-Idea Builder",
    badge: "LUX FOUNDER",
    color: "pink",
    image: "/images/asa-portrait.jpg",
    personality: "Curious, practical, encouraging, and always ready to turn a big question into a real project.",
    bio: "Hi, I’m Asa. I started Lux to help people use AI with imagination, care, and real purpose. I’m here to remind every young builder that your questions matter, your ideas can help people, and you do not have to know everything before you begin.",
    catchphrases: [
      "“Start with the question.” 💡",
      "“Let’s build it together.” 🛠️",
      "“Make something that helps.” 🤝",
      "“Keep learning out loud.” ✨"
    ],
    rules: [
      "Big ideas get better when you ask for help and listen to feedback.",
      "Use technology to help people—not to trick, hurt, or leave anyone out.",
      "You can begin with a sketch, a question, or a tiny first try."
    ],
    appearance: "Lux founder and builder in the studio, helping young creators turn curiosity into useful projects."
  },
  {
    id: "lana",
    name: "LANA",
    role: "AI Mentor & Mission Guide ✦",
    tagline: "The Calm Creative Guide",
    badge: "AI MISSION MENTOR",
    color: "purple",
    image: "/images/lux-ai-kids-academy/lana-profile.png",
    personality: "Warm, thoughtful, organized, and encouraging. LANA helps young creators turn big questions into safe, clear next steps.",
    bio: "Hi, creator! I’m LANA. I help you plan your ideas, ask smart questions, and make sure your projects are ready to share with a grown-up. You bring the imagination—I’ll help you build the path.",
    catchphrases: ["“Let’s make a plan.” ✦", "“Your idea matters.” 💜", "“Check, learn, improve.” 🔎", "“Create with care.” 🌈"],
    rules: ["Keep personal information private.", "Ask a trusted grown-up when a tool or answer feels confusing.", "Use AI to learn, create, and help people."],
    appearance: "Warm AI mentor with long dark wavy hair, violet educator styling, and a calm, reassuring smile."
  },
  {
    id: "dr-dooley",
    name: "DR. TORREY DOOLEY",
    role: "Healthcare Educator & Future Medicine Guide 🩺",
    tagline: "“The Hood Nurse” & AI Health Explorer",
    badge: "AI HEALTH DOCTOR",
    color: "blue",
    image: "/images/lux-ai-kids-academy/dr-torrey-dooley-profile.png",
    personality: "Energetic, charismatic, compassionate, authentic, funny, and confident. Connects through real conversations and keeps science fun!",
    bio: "What’s up fam! I’m Dr. Torrey Dooley, also known as 'The Hood Nurse.' I’m here to show you how cool healthcare, medical technology, and AI can be! From how your heart pumps to how smart sensors help doctors save lives, I break down big science using everyday examples, laughter, and zero boring lectures.",
    catchphrases: [
      "“Alright fam, let's keep it real!” 🔥",
      "“Health is wealth!” 💚",
      "“Take care of yourself first.” 🌟",
      "“AI is your assistant, not your replacement!” 🤖",
      "“We're building healthier communities together.” 🏥"
    ],
    rules: [
      "Always ask questions and learn how your body works!",
      "AI is a helper tool for real doctors and nurses—never a replacement for human care.",
      "Eat good, move daily, and look out for your family and neighbors."
    ],
    appearance: "Modern Lux Care lab coat, blue scrubs, stethoscope, and Lux badge in a futuristic health lab."
  }
];

const kidsJournalStorySlugs = [
  "safe-ai-learning-starts-with-better-questions",
  "dr-dooleys-smart-health-lab-episode-2",
  "the-coolest-ai-careers-may-not-have-names-yet",
];

export default function LuxAiKidsPage(){
  const [email,setEmail]=useState(""); 
  const [joined,setJoined]=useState(false);
  const kidsStories = kidsJournalStorySlugs
    .map((slug) => BLOG_ARTICLES.find((article) => article.slug === slug))
    .filter((article): article is (typeof BLOG_ARTICLES)[number] => Boolean(article));

  return <div className="kids-world">
    <section className="kids-hero" style={{ position: "relative", overflow: "hidden" }}>
      <video
        className="kids-hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster={prefixPath("/images/lux-ai-kids-academy/ace-learning-hero.jpg")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0.35, pointerEvents: "none" }}
      >
        <source src={prefixPath("/videos/lux-ai-kids-hero-bg.mp4")} type="video/mp4" />
      </video>
      <div className="kids-cloud cloud-1"/><div className="kids-cloud cloud-2"/>
      <div className="kids-hero-copy">
        <p className="kids-pill">A safe place for bold young minds</p>
        <h1>Learn AI.<br/><span>Build tomorrow.</span><br/>Change the world.</h1>
        <p>Creative workshops, joyful videos, smart stories, and real-world challenges for the next generation of builders.</p>
        <div className="kids-actions">
          <a href="#characters">Meet your guides ✦</a>
          <Link href="/lux-ai-kids/academy">Explore the Labs</Link>
        </div>
        <div className="kids-trust">
          <span>✓ Project-based</span>
          <span>✓ Human-guided</span>
          <span>✓ Safety-first</span>
        </div>
      </div>
      <div className="kids-hero-art">
        <Image src={prefixPath("/images/lux-ai-kids-academy/ace-learning-hero.jpg")} alt="Ace introducing young creators to Lux AI Kids" fill priority sizes="(max-width: 900px) 100vw, 55vw"/>
      </div>
    </section>

    <section className="kids-ticker">
      <span>CREATE</span><b>✦</b><span>QUESTION</span><b>✦</b><span>BUILD</span><b>✦</b><span>SHARE</span><b>✦</b><span>HELP</span>
    </section>

    <nav className="kids-route-ribbon" aria-label="Lux AI Kids sections">
      <Link href="/lux-ai-kids/academy"><span>01</span> Learning Labs</Link>
      <Link href="/lux-ai-kids/workshops"><span>02</span> Workshops</Link>
      <Link href="/lux-ai-kids/foundation"><span>03</span> Foundation</Link>
      <Link href="/lux-ai-kids/post-studio"><span>04</span> Post Studio</Link>
    </nav>

    {/* CHARACTER CARDS SECTION */}
    <section id="characters" className="kids-section kids-squad-section">
      <header>
        <p>MEET THE LUX AI KIDS SQUAD</p>
        <h2>Your Guides in the Lab</h2>
        <span>Learn who’s helping you code, create, ask big questions, and stay healthy!</span>
      </header>

      <div className="character-cards-grid">
        {characterCards.map(character => (
          <article className={`character-card-item ${character.color}`} key={character.id}>
            <div className="character-card-media">
              <Image
                src={prefixPath(character.image)}
                alt={`${character.name} - ${character.role}`}
                fill
                sizes="(max-width: 720px) 100vw, (max-width: 1120px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <span className="character-badge-pill">{character.badge}</span>
            </div>

            <div className="character-card-content">
              <span className="character-tagline">{character.tagline}</span>
              <h3>{character.name}</h3>
              <strong className="character-role-title">{character.role}</strong>

              <p className="character-bio">{character.bio}</p>

              <div className="character-block">
                <h4>Catchphrases You&apos;ll Hear in the Lab:</h4>
                <div className="catchphrase-list">
                  {character.catchphrases.map(phrase => (
                    <span key={phrase} className="catchphrase-chip">{phrase}</span>
                  ))}
                </div>
              </div>

              <div className="character-block">
                <h4>{character.name}&apos;s Golden Rules:</h4>
                <ul className="character-rules-list">
                  {character.rules.map(rule => (
                    <li key={rule}>✦ {rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* MISSIONS SECTION */}
    <section id="missions" className="kids-section">
      <header>
        <p>LUX AI KIDS LEARNING LABS</p>
        <h2>Pick your Lab. Start a mission.</h2>
        <span>Labs are story-led learning worlds with videos, hands-on makes, family resources, badges, certificates, and a final showcase.</span>
      </header>
      <div className="mission-grid">
        {labs.map((m,i)=> (
          <Link className={`mission-card ${m.color}`} key={m.title} href={m.href}>
            <div className="mission-number">0{i+1}</div>
            <div className="mission-icon">{m.icon}</div>
            <small>{m.age}</small>
            <h3>{m.title}</h3>
            <p>{m.copy}</p>
            <strong>Open Lab →</strong>
          </Link>
        ))}
      </div>
    </section>

    <section className="kids-video-zone">
      <div>
        <p>WATCH · TRY · CREATE</p>
        <h2>Lux Kids TV</h2>
        <p>Short videos that turn “How does that work?” into “Look what I made!” New experiments, creative challenges, and studio visits every week with Ace and Dr. Dooley.</p>
        <Link href="/lux-tv-kids">Open Lux TV Kids ▶</Link>
      </div>
      <div className="kids-screen">
        <video controls playsInline poster={prefixPath("/images/lux-kids-poster.png")} aria-label="Lux AI Kids promotional video">
          <source src={prefixPath("/videos/lux-ai-kids-promo.mp4")} type="video/mp4" />
        </video>
        <span>PLAY FILM</span>
      </div>
    </section>

    <section className="kids-section kids-journal" style={{ position: "relative", overflow: "hidden", isolation: "isolate" }}>
      <video
        className="kids-journal-bg-video"
        autoPlay
        muted
        loop
        playsInline
        poster={prefixPath("/images/lux-kids-poster.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
          opacity: 0.65,
          pointerEvents: "none"
        }}
      >
        <source src={prefixPath("/videos/ace-curiosity-journal-bg.mp4")} type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, zIndex: -1, background: "linear-gradient(180deg, rgba(255, 248, 236, 0.35) 0%, rgba(255, 248, 236, 0.5) 100%)", pointerEvents: "none" }} />
      <header style={{ position: "relative", zIndex: 1 }}>
        <p>THE CURIOSITY JOURNAL</p>
        <h2>Big questions. Bright ideas.</h2>
        <span>Choose a story to open its own full-page reading experience.</span>
      </header>
      <div className="kids-story-grid">
        {kidsStories.map((story) => (
          <Link key={story.slug} href={`/blog/${story.slug}`} className="kids-story-card">
            <span className="kids-story-thumb">
              <Image src={prefixPath(story.image)} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              {story.video && <i aria-hidden="true">▶</i>}
            </span>
            <span className="kids-story-category">{story.category}</span>
            <h3>{story.title}</h3>
            <p>{story.deck}</p>
            <b>Open story →</b>
          </Link>
        ))}
      </div>
    </section>

    <section className="kids-grownups">
      <div>
        <p>GROWN-UPS’ CORNER</p>
        <h2>Creative confidence,<br/>with guardrails.</h2>
      </div>
      <div>
        <p>Lux AI Kids is designed for guided, age-appropriate learning. Workshops emphasize critical thinking, privacy, consent, source-checking, and using AI to help people—not replace human judgment.</p>
        <ul>
          <li>Clear age bands and learning goals</li>
          <li>No unsupervised public publishing</li>
          <li>Printable activity and conversation guides</li>
          <li>School, library, and community workshop options</li>
        </ul>
        <Link href="/contact">Bring Lux AI Kids to your community →</Link>
        <div className="kids-grownups-links">
          <Link href="/lux-ai-kids/foundation">Explore the upcoming Foundation →</Link>
          <Link href="/lux-ai-kids/post-studio">Open Post Studio →</Link>
        </div>
      </div>
    </section>

    <section className="kids-section kids-community-projects">
      <header>
        <p>MAKE A DIFFERENCE</p>
        <h2>Small projects. <span>Real help.</span></h2>
        <span>Use creativity and technology to make life brighter where you live.</span>
      </header>
      <div className="kids-project-grid">
        {[
          ["🌱", "Community Garden AI", "Design a plant-care helper that makes the garden easier for everyone."],
          ["🏥", "Healthy Habits Challenge", "Build a kind reminder system for movement, water, rest, and care."],
          ["♻", "Recycling Detective", "Create a sorting guide that turns everyday trash into a learning mission."],
          ["🐶", "Animal Shelter Helpers", "Imagine a friendly adoption story and a better way to introduce each pet."],
          ["📖", "Reading Buddy AI", "Make a prompt-powered reading companion with thoughtful questions."],
          ["🤖", "Robotics Club", "Invent a helpful robot for a job your school or neighborhood needs."],
        ].map(([icon, title, copy]) => (
          <article key={title}>
            <span>{icon}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="kids-learning-paths">
      <div className="kids-paths-intro">
        <p>GROW WITH THE LAB</p>
        <h2>One curious question can become a whole future.</h2>
        <span>Choose the starting point that feels right today. Each path grows from wonder to real-world confidence.</span>
      </div>
      <div className="kids-paths-track">
        {[
          ["07–09", "Discover AI", "Curiosity · Creativity · Safety", "Ask big questions, spot patterns, and learn how to use helpful tools wisely."],
          ["10–12", "Build with AI", "Problem solving · Communication · Projects", "Turn an idea into a game, story, experiment, or family challenge."],
          ["13–15", "Create with AI", "Coding · Automation · Entrepreneurship", "Make useful systems, tell stronger stories, and build a portfolio of projects."],
          ["16–18", "Launch your future", "Business · Career skills · Certifications", "Explore pathways to credentials, internships, and work that helps people."],
        ].map(([age, title, skills, copy], index) => (
          <article className={`kids-path-card path-${index + 1}`} key={title}>
            <span className="kids-path-age">AGES {age}</span>
            <b>0{index + 1}</b>
            <h3>{title}</h3>
            <strong>{skills}</strong>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="kids-resource-library">
      <div>
        <p>FOR PARENTS, TEACHERS &amp; COMMUNITY LEADERS</p>
        <h2>Everything a guided learning day needs.</h2>
        <span>Use these starting points for a family night, classroom project, library club, youth group, or after-school lab.</span>
        <Link href="/lux-ai-kids/workshops">Browse ready-to-run workshops →</Link>
      </div>
      <div className="kids-resource-list">
        {["Lesson plans", "Discussion guides", "Printable activities", "Certificates", "Family projects", "Workshop facilitator guides"].map((item, index) => (
          <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span><i>→</i></div>
        ))}
      </div>
    </section>

    <section className="kids-future-programs">
      <header>
        <p>COMING SOON</p>
        <h2>More ways to make, meet, and grow.</h2>
        <span>Programs we&apos;re designing for young innovators and the grown-ups who cheer them on.</span>
      </header>
      <div className="kids-programs-grid">
        {["AI Discovery Camp", "Weekend Innovation Academy", "AI Explorers Club", "Family AI Nights", "AI Reading Club", "Coding Saturdays", "Robotics Lab", "Young Entrepreneur Academy"].map((program, index) => (
          <article key={program}><span>{["✦", "⌁", "◉", "▰"][index % 4]}</span><h3>{program}</h3><p>In development</p></article>
        ))}
      </div>
    </section>

    <section className="kids-sponsor-section">
      <div className="kids-sponsor-copy">
        <p>SPONSOR A FUTURE INNOVATOR</p>
        <h2>Show what a gift makes possible.</h2>
        <span>We&apos;re preparing clear, meaningful ways for families, neighbors, and future partners to expand access when the Foundation launches.</span>
        <Link href="/lux-ai-kids/foundation">Follow the Foundation journey →</Link>
      </div>
      <div className="kids-impact-ladder">
        {[["$25", "Provides a student workbook"], ["$50", "Supports a workshop seat"], ["$100", "Provides learning materials"], ["$250", "Sponsors an AI Camp experience"], ["$500", "Funds multiple student projects"]].map(([amount, impact]) => (
          <div key={amount}><b>{amount}</b><span>{impact}</span></div>
        ))}
      </div>
    </section>

    <section className="kids-vision-roadmap">
      <div className="kids-vision-copy">
        <p>VISION 2035</p>
        <h2>A decade of learning can change the way a child sees the world.</h2>
        <p>Imagine a child who begins learning AI at age seven. Over the next decade, they complete books, workshops, community projects, certifications, internships, and eventually launch a career or business that helps people. That&apos;s the future we&apos;re building.</p>
      </div>
      <div className="kids-roadmap-grid">
        <article><span>NOW</span><h3>Build the spark</h3><p>Books · Videos · Workshops · Community</p></article>
        <article><span>NEXT</span><h3>Open the door</h3><p>Nonprofit launch · Scholarships · School partnerships · Events</p></article>
        <article><span>FUTURE</span><h3>Grow the runway</h3><p>Lux AI Academy · Labs · Camps · Internships · Career programs</p></article>
      </div>
    </section>

    <section className="kids-letter">
      <div>
        <p>THE LUX LAB LETTER</p>
        <h2>Projects for curious kids,<br/>notes for caring grown-ups.</h2>
      </div>
      <form onSubmit={e=>{e.preventDefault();if(email)setJoined(true)}}>
        {joined? (
          <strong>Welcome to the lab! Your first mission is on its way.</strong>
        ) : (
          <>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="grownup@email.com"/>
            <button type="submit">Join free →</button>
            <small>One thoughtful email each week. Unsubscribe anytime.</small>
          </>
        )}
      </form>
    </section>
  </div>
}
