"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";

type Lab = {
  id: string;
  number: string;
  icon: string;
  title: string;
  ages: string;
  theme: string;
  color: string;
  story: string;
  badge: string;
  finalProject: string;
  image: string;
  missions: { title: string; activity: string }[];
  projects: string[];
  downloads: string[];
};

const LAB_INCLUDES = ["Story Mission", "Video Lesson", "Hands-on Workshop", "Workbook", "Parent Guide", "Teacher Guide", "AI Challenge", "Badge", "Certificate", "Final Showcase"];

const labs: Lab[] = [
  {
    id: "ai-explorer", number: "LAB 01", icon: "✦", title: "AI Explorer Lab", ages: "Ages 7–10", theme: "Meet AI. Become friends with technology. Learn to ask amazing questions.", color: "purple",
    story: "One morning, the lights inside Lux HQ begin blinking. LANA needs Junior AI Explorers to help train tiny AI helpers before they can assist people around the world.",
    badge: "Junior AI Explorer", finalProject: "My First AI Helper", image: "/images/lux-ai-kids-academy/ai-explorer-lab.png",
    missions: [
      { title: "What Is AI?", activity: "Meet LANA, spot examples, and complete a sticker activity." },
      { title: "AI Is Everywhere", activity: "Go on a treasure hunt for Alexa, Siri, Maps, Netflix, robots, and more." },
      { title: "Teach a Tiny AI", activity: "Sort animals, foods, shapes, and colors to see how patterns work." },
      { title: "Smart or Not?", activity: "Decide whether familiar tools use AI or not." },
      { title: "Amazing Questions", activity: "Learn how clear, kind prompts help you get useful answers." },
      { title: "Robot Helpers", activity: "Draw a helper for a job that matters to you." },
      { title: "AI Safety", activity: "Practice keeping names, addresses, and passwords private." },
      { title: "Healthy AI", activity: "Dr. Torrey leads breaks, movement, water, and sleep check-ins." },
      { title: "Create Your Own AI", activity: "Build a paper robot with a name, purpose, and powers." },
      { title: "Family Challenge", activity: "Interview a grown-up about helpful technology at home." },
      { title: "Explorer Challenge", activity: "Use your helper idea to solve one simple problem." },
      { title: "Graduation", activity: "Share your helper, earn your Explorer Badge, and celebrate." },
    ],
    projects: ["Paper robot", "Family tech interview", "My First AI Helper showcase"],
    downloads: ["Workbook", "Parent Guide", "Teacher Guide", "Flash Cards", "Mission Cards", "Coloring Book", "Certificate", "Slides"],
  },
  {
    id: "art-studio", number: "LAB 02", icon: "◉", title: "Art Studio", ages: "Ages 8–13", theme: "Imagination becomes reality.", color: "blue",
    story: "Ace discovers an empty art museum. Young creators have to fill every room with AI-powered creativity, one original idea at a time.",
    badge: "Creative AI Artist", finalProject: "Design an entire story universe", image: "/images/lux-ai-kids-academy/art-studio-lab.png",
    missions: [
      { title: "Drawing Characters", activity: "Turn a tiny sketch into a character with a story." },
      { title: "Character Expressions", activity: "Show feelings through faces, poses, and color." },
      { title: "Costumes", activity: "Design an outfit that tells us who a character is." },
      { title: "Fantasy Worlds", activity: "Build the rules, places, and surprises of a new world." },
      { title: "Backgrounds", activity: "Set the scene with places your characters can explore." },
      { title: "Vehicles", activity: "Invent a ride fit for your world." },
      { title: "Posters", activity: "Make a bold poster that invites someone into your idea." },
      { title: "Comic Covers", activity: "Create a cover that hints at a great adventure." },
      { title: "Storyboards", activity: "Plan a beginning, middle, and ending in pictures." },
      { title: "Animation Basics", activity: "Learn how small changes create motion." },
      { title: "Art Gallery", activity: "Curate your best pieces for the museum rooms." },
      { title: "Final Portfolio", activity: "Present the universe you built and the choices behind it." },
    ],
    projects: ["Movie poster", "Comic book", "Trading cards", "Stickers", "Book cover", "YouTube thumbnail", "Character sheet"],
    downloads: ["Brush Pack", "Prompt Cards", "Character Templates", "Gallery Book", "Workbook", "Certificate"],
  },
  {
    id: "storyteller", number: "LAB 03", icon: "▰", title: "Storyteller Lab", ages: "Ages 9–14", theme: "Stories change the world.", color: "pink",
    story: "A magical Story Engine has stopped working. Every completed story gives it power again, so young directors must bring characters, scenes, and voices to life.",
    badge: "Junior Story Director", finalProject: "My First AI Movie", image: "/images/lux-ai-kids-academy/storyteller-lab.png",
    missions: [
      { title: "Characters", activity: "Create a character with wants, strengths, and a memorable detail." },
      { title: "Heroes", activity: "Give your hero a brave choice to make." },
      { title: "Villains", activity: "Create a challenge, not a cruel stereotype." },
      { title: "Settings", activity: "Choose a place that changes what can happen." },
      { title: "Conflict", activity: "Find the problem that makes a story move." },
      { title: "Dialogue", activity: "Write words that sound like your characters." },
      { title: "Story Arcs", activity: "Map a beginning, turning point, and ending." },
      { title: "Scenes", activity: "Turn your outline into moments we can see." },
      { title: "Storyboards", activity: "Plan shots, action, and transitions." },
      { title: "Voice Acting", activity: "Practice expressive, respectful performance." },
      { title: "Video Production", activity: "Assemble your story with safe, guided tools." },
      { title: "Premiere Night", activity: "Share your finished story and thank your crew." },
    ],
    projects: ["Comic", "Book", "Movie trailer", "Animation", "Podcast", "Video"],
    downloads: ["Story Bible", "Storyboard", "Prompt Cards", "Script Pages", "Director Notes", "Workbook", "Certificate"],
  },
  {
    id: "robot-builders", number: "LAB 04", icon: "⌁", title: "Robot Builders", ages: "Ages 10–15", theme: "Invent robots that solve real problems.", color: "green",
    story: "The Lux Innovation Lab needs new inventors. Each mission makes life a little better for people, animals, schools, and neighborhoods.",
    badge: "Junior Robotics Engineer", finalProject: "My Helpful Robot", image: "/images/lux-ai-kids-academy/robot-builders-lab.png",
    missions: [
      { title: "Robot Parts", activity: "Choose the body, tools, and materials your robot needs." },
      { title: "Sensors", activity: "Explore how a robot notices its surroundings." },
      { title: "Thinking", activity: "Map the choices a helpful robot needs to make." },
      { title: "Movement", activity: "Plan how your invention gets safely where it needs to go." },
      { title: "Power", activity: "Consider energy, charging, and sensible limits." },
      { title: "Safety", activity: "Build human control, testing, and stop rules into your design." },
      { title: "Helping People", activity: "Design for a person who needs a little extra support." },
      { title: "Helping Animals", activity: "Invent a kind solution for animal care." },
      { title: "Helping Schools", activity: "Look for a classroom or campus problem worth solving." },
      { title: "Helping Hospitals", activity: "Imagine a careful helper for care teams and patients." },
      { title: "Prototype", activity: "Build a model, blueprint, or paper interface." },
      { title: "Demo Day", activity: "Present your invention, feedback, and next improvement." },
    ],
    projects: ["Hospital robot", "Garden robot", "Homework robot", "Pet robot", "Kitchen robot", "School robot", "Community robot"],
    downloads: ["Blueprint Pages", "Engineering Journal", "Robot Cards", "CAD Templates", "Workbook", "Safety Guide", "Certificate"],
  },
];

function subscribeToLabHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getLabFromHash() {
  const id = window.location.hash.replace(/^#/, "");
  return labs.some((lab) => lab.id === id) ? id : labs[0].id;
}

function getDefaultLab() {
  return labs[0].id;
}

export default function AcademyPage() {
  const linkedLabId = useSyncExternalStore(subscribeToLabHash, getLabFromHash, getDefaultLab);
  const [chosenLabId, setChosenLabId] = useState<string | null>(null);
  const [activeMission, setActiveMission] = useState(0);
  const activeLabId = chosenLabId ?? linkedLabId;
  const activeLab = labs.find((lab) => lab.id === activeLabId) ?? labs[0];

  const chooseLab = (id: string) => {
    setChosenLabId(id);
    setActiveMission(0);
  };

  return (
    <main className="kids-world academy-page">
      <section className="academy-hero">
        <Image className="academy-hero-image" src="/images/lux-ai-kids-academy/academy-hero-overlay.png" alt="Lux AI Kids guides in a bright AI learning lab" fill priority sizes="100vw" />
        <div className="academy-hero-overlay" aria-hidden="true" />
        <div>
          <p className="academy-eyebrow">LUX AI KIDS ACADEMY</p>
          <h1>Learn. Build. Create.<br /><span>Imagine. Share.</span></h1>
          <p>Not courses. Labs: story-led places young creators want to return to each week—where every mission turns curiosity into something real.</p>
          <div className="academy-hero-actions"><a href="#labs">Explore the four Labs</a><Link href="/lux-ai-kids/workshops">Browse workshops</Link></div>
        </div>
        <aside className="academy-includes" aria-label="Every Lab includes">
          <p>EVERY LAB INCLUDES</p>
          <div>{LAB_INCLUDES.map((item) => <span key={item}>✓ {item}</span>)}</div>
        </aside>
      </section>

      <section className="academy-lab-picker" id="labs" aria-label="Choose an Academy Lab">
        {labs.map((lab) => <a href={`#${lab.id}`} key={lab.id} onClick={() => chooseLab(lab.id)} className={`academy-lab-button ${lab.color} ${activeLab.id === lab.id ? "active" : ""}`}>
          <small>{lab.number}</small><b>{lab.icon}</b><strong>{lab.title}</strong><span>{lab.ages}</span>
        </a>)}
      </section>

      <section id={activeLab.id} className={`academy-lab-detail ${activeLab.color}`}>
        <header>
          <div><span>{activeLab.number} · {activeLab.ages}</span><h2>{activeLab.title}</h2><p className="academy-theme">{activeLab.theme}</p></div>
          <div className="academy-badge"><b>{activeLab.icon}</b><span>Earn the</span><strong>{activeLab.badge}</strong></div>
        </header>
        <div className="academy-lab-hero">
          <Image src={activeLab.image} alt={`${activeLab.title} creative learning world`} fill sizes="(max-width: 900px) 100vw, 1400px" />
          <div><span>{activeLab.number}</span><b>{activeLab.title}</b><p>{activeLab.theme}</p></div>
        </div>
        <div className="academy-story"><span>THE STORY MISSION</span><p>{activeLab.story}</p></div>
        <div className="academy-guides" aria-label="Your Lab guides">
          <div><Image src="/images/lux-ai-kids-academy/ace-profile.png" alt="Ace, the creative Lab buddy" width={96} height={96} /><span><b>ACE</b>Big ideas and brave questions.</span></div>
          <div><Image src="/images/lux-ai-kids-academy/lana-profile.png" alt="LANA, the AI mission guide" width={96} height={96} /><span><b>LANA</b>Clear plans and safe next steps.</span></div>
          <div><Image src="/images/lux-ai-kids-academy/dr-torrey-dooley-profile.png" alt="Dr. Torrey Dooley, the healthy habits guide" width={96} height={96} /><span><b>DR. TORREY</b>Healthy habits for growing creators.</span></div>
        </div>
        <div className="academy-content-grid">
          <div className="academy-mission-list"><p>12 MISSIONS</p>{activeLab.missions.map((mission, index) => <button key={mission.title} className={activeMission === index ? "active" : ""} onClick={() => setActiveMission(index)}><b>{String(index + 1).padStart(2, "0")}</b><span>{mission.title}</span></button>)}</div>
          <article className="academy-mission-card"><span>MISSION {String(activeMission + 1).padStart(2, "0")}</span><h3>{activeLab.missions[activeMission].title}</h3><p>{activeLab.missions[activeMission].activity}</p><div><b>ACE SAYS</b><span>{activeMission % 2 === 0 ? "Big ideas start with curiosity—let’s build it!" : "What do you think? Your answer is where the next idea begins."}</span></div><button onClick={() => setActiveMission((activeMission + 1) % activeLab.missions.length)}>Next mission →</button></article>
        </div>
        <div className="academy-project-strip"><div><span>FINAL SHOWCASE</span><h3>{activeLab.finalProject}</h3><p>Complete the Lab, share what you made with a grown-up, and receive your badge and certificate.</p></div><div><span>PROJECT IDEAS</span><p>{activeLab.projects.join(" · ")}</p></div></div>
        <div className="academy-resource-grid"><article><span>STUDENT MATERIALS</span><p>Workbook · Mission Cards · Achievement Journal · AI Dictionary · Glossary · Coloring Pages · Challenge Sheets · Notebook · Certificate · Stickers · Trading Cards</p></article><article><span>LAB DOWNLOADS</span><div>{activeLab.downloads.map((item) => <button key={item} type="button">{item} ↗</button>)}</div></article><article><span>GUIDE THE LAB</span><p>Lesson plans, slide deck, facilitator notes, assessment rubrics, attendance sheet, certificates, supply lists, family activities, conversation guides, safety guide, and home challenges.</p></article></div>
      </section>

      <section className="academy-roadmap"><p>THE LONG-TERM ACADEMY</p><h2>From exploration to entrepreneurship.</h2><div>{[["Foundation Labs", "Ages 7–10", "AI Explorer · Creative Thinking · Digital Safety · Smart Helpers"], ["Creator Labs", "Ages 8–13", "Art Studio · Storyteller · Music Studio · Game Studio"], ["Builder Labs", "Ages 10–15", "Robot Builders · App Builders · Website Builders · AI Science Lab"], ["Innovator & Career Labs", "Ages 13–18", "Business Creator · Startup Lab · Community Impact · AI careers"]].map(([name, ages, list]) => <article key={name}><span>{ages}</span><h3>{name}</h3><p>{list}</p></article>)}</div></section>
    </main>
  );
}
