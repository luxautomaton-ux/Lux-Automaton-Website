"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

const missions = [
  { icon:"✦", title:"AI Explorer", age:"Ages 7–10", copy:"Meet friendly AI, learn what it can do, and train your first tiny helper.", color:"pink" },
  { icon:"◉", title:"Art Studio", age:"Ages 8–13", copy:"Turn big imagination into characters, posters, worlds, and visual stories.", color:"blue" },
  { icon:"▰", title:"Storyteller Lab", age:"Ages 9–14", copy:"Write a hero, direct a scene, and bring an original story to life with video.", color:"purple" },
  { icon:"⌁", title:"Robot Builders", age:"Ages 10–15", copy:"Design a helpful robot and solve a problem in your home or community.", color:"green" },
];

const characterCards = [
  {
    id: "ace",
    name: "ACE",
    role: "LUX AI Kids Mascot & Chief Learning Buddy 🚀",
    tagline: "The Curiosity Co-Pilot",
    badge: "AI LAB BUDDY",
    color: "pink",
    image: "/images/ace-character-card.jpg",
    personality: "Funny, curious, energetic, positive, playful, loves asking questions and celebrating discoveries. Thinks mistakes are opportunities to learn!",
    bio: "Hey there, future builder! I’m Ace! Think of me as your AI co-pilot, best friend in the lab, and number-one cheerleader. Whenever you’re wondering 'How does a robot think?' or 'Can I build a video game with AI?', I’m right by your side ready to explore!",
    catchphrases: [
      "“Let's build it!” 🛠️",
      "“What do you think?” 🧠",
      "“Big ideas start with curiosity!” 💡",
      "“Code. Create. Change.” ⚡"
    ],
    rules: [
      "Mistakes are just clues to the right answer!",
      "AI is a team sport—always work together and share your discoveries.",
      "Use technology to help people and make your community awesome!"
    ],
    appearance: "Friendly educational puppet with glasses, freckles, expressive eyebrows, black Lux AI Kids hoodie, and Lux cap."
  },
  {
    id: "dr-dooley",
    name: "DR. TORREY DOOLEY",
    role: "Healthcare Educator & Future Medicine Guide 🩺",
    tagline: "“The Hood Nurse” & AI Health Explorer",
    badge: "AI HEALTH DOCTOR",
    color: "blue",
    image: "/images/dr-dooley-character-card.jpg",
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

export default function LuxAiKidsPage(){
  const [email,setEmail]=useState(""); 
  const [joined,setJoined]=useState(false);
  const [activeTab, setActiveTab] = useState<string>("ace");

  return <div className="kids-world">
    <section className="kids-hero">
      <div className="kids-cloud cloud-1"/><div className="kids-cloud cloud-2"/>
      <div className="kids-hero-copy">
        <p className="kids-pill">A safe place for bold young minds</p>
        <h1>Learn AI.<br/><span>Build tomorrow.</span><br/>Change the world.</h1>
        <p>Creative workshops, joyful videos, smart stories, and real-world challenges for the next generation of builders.</p>
        <div className="kids-actions">
          <a href="#characters">Meet your guides ✦</a>
          <a href="#missions">Pick a mission</a>
        </div>
        <div className="kids-trust">
          <span>✓ Project-based</span>
          <span>✓ Human-guided</span>
          <span>✓ Safety-first</span>
        </div>
      </div>
      <div className="kids-hero-art">
        <Image src={prefixPath("/images/lux-kids-world.png")} alt="Lux AI Kids guide welcoming young creators to an AI lab" fill priority sizes="(max-width: 900px) 100vw, 55vw"/>
      </div>
    </section>

    <section className="kids-ticker">
      <span>CREATE</span><b>✦</b><span>QUESTION</span><b>✦</b><span>BUILD</span><b>✦</b><span>SHARE</span><b>✦</b><span>HELP</span>
    </section>

    {/* CHARACTER CARDS SECTION */}
    <section id="characters" className="kids-section kids-squad-section">
      <header>
        <p>MEET THE LUX AI KIDS SQUAD</p>
        <h2>Your Guides in the Lab</h2>
        <span>Learn who’s helping you code, create, ask big questions, and stay healthy!</span>
      </header>

      <div className="character-tab-buttons">
        {characterCards.map(c => (
          <button
            key={c.id}
            type="button"
            className={`character-tab-btn ${activeTab === c.id ? "active " + c.color : ""}`}
            onClick={() => setActiveTab(c.id)}
          >
            {c.name} {c.id === "ace" ? "🚀" : "🩺"}
          </button>
        ))}
      </div>

      <div className="character-cards-grid">
        {characterCards.filter(c => c.id === activeTab || true).map(character => (
          <article className={`character-card-item ${character.color}`} key={character.id}>
            <div className="character-card-media">
              <Image
                src={prefixPath(character.image)}
                alt={`${character.name} - ${character.role}`}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
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
        <p>CHOOSE YOUR ADVENTURE</p>
        <h2>What will you make first?</h2>
        <span>Every workshop ends with something real you can show, share, or improve.</span>
      </header>
      <div className="mission-grid">
        {missions.map((m,i)=> (
          <article className={`mission-card ${m.color}`} key={m.title}>
            <div className="mission-number">0{i+1}</div>
            <div className="mission-icon">{m.icon}</div>
            <small>{m.age}</small>
            <h3>{m.title}</h3>
            <p>{m.copy}</p>
            <button type="button">Open mission →</button>
          </article>
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

    <section className="kids-section kids-journal">
      <header>
        <p>THE CURIOSITY JOURNAL</p>
        <h2>Big questions. Bright ideas.</h2>
      </header>
      <div className="kids-story-grid">
        <article>
          <span>AI 101</span>
          <h3>Can a computer have an imagination?</h3>
          <p>Ace breaks down patterns, prompts, and where brand-new ideas really begin.</p>
          <b>Read together →</b>
        </article>
        <article>
          <span>HEALTH &amp; TECH</span>
          <h3>Dr. Dooley: How AI helps doctors listen to your heart</h3>
          <p>Learn how smart sensors and friendly tools help nurses and doctors keep families healthy.</p>
          <b>Start the challenge →</b>
        </article>
        <article>
          <span>FUTURE JOBS</span>
          <h3>Meet the robot coach, prompt director, and AI safety detective</h3>
          <p>Tomorrow’s coolest jobs might not have names yet. You could help invent them.</p>
          <b>Explore careers →</b>
        </article>
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

