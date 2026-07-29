"use client";

import { useState } from "react";
import Link from "next/link";

const focusAreas = [
  ["✦", "AI education scholarships", "Help young creators take their first step into AI learning."],
  ["⌁", "Technology access", "Connect learners with tools, devices, and welcoming places to create."],
  ["▣", "Community workshops", "Bring guided, hands-on AI experiences to schools and neighborhoods."],
  ["⚡", "Mentorship & futures", "Introduce learners to people, projects, certifications, and careers."],
];

export default function FoundationPage() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="kids-world foundation-page">
      <section className="foundation-hero">
        <div className="foundation-orbit foundation-orbit-one" aria-hidden="true">✦</div>
        <div className="foundation-orbit foundation-orbit-two" aria-hidden="true">⌁</div>
        <p className="foundation-eyebrow">Upcoming nonprofit initiative</p>
        <h1>Building opportunities.<br /><span>Inspiring futures.</span></h1>
        <p className="foundation-lede">The Lux AI Kids Foundation is being planned to help every child access high-quality, human-guided artificial intelligence education—regardless of financial circumstances.</p>
        <div className="foundation-actions">
          <a href="#interest">Join the interest list</a>
          <Link href="/lux-ai-kids">Explore Lux AI Kids</Link>
        </div>
        <p className="foundation-note">Launching soon · Lux AI Kids Foundation is not yet an active nonprofit.</p>
      </section>

      <section className="foundation-focus">
        <div className="foundation-section-heading">
          <p>OUR FUTURE FOCUS</p>
          <h2>Access changes what a child can imagine.</h2>
        </div>
        <div className="foundation-focus-grid">
          {focusAreas.map(([icon, title, copy]) => (
            <article key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="foundation-path">
        <div>
          <p>THE LONG VIEW</p>
          <h2>A pathway from curiosity to contribution.</h2>
        </div>
        <ol>
          <li><b>01</b><span>Discover AI through books, games, and guided questions.</span></li>
          <li><b>02</b><span>Build confidence in workshops, family projects, and community challenges.</span></li>
          <li><b>03</b><span>Grow toward certifications, internships, entrepreneurship, and meaningful work.</span></li>
        </ol>
      </section>

      <section id="interest" className="foundation-interest">
        <div>
          <p>JOIN THE EARLY CIRCLE</p>
          <h2>Want to help shape what comes next?</h2>
          <span>Parents, educators, libraries, youth groups, volunteers, and future partners are welcome.</span>
        </div>
        {joined ? (
          <div className="foundation-success" role="status">You&apos;re on the early-interest list. We&apos;ll share the next milestone soon.</div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setJoined(true); }}>
            <label>
              Email address
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label>
              I&apos;m interested as a
              <select defaultValue="parent"><option value="parent">Parent or caregiver</option><option value="educator">Educator or school</option><option value="community">Community organization</option><option value="partner">Potential partner or sponsor</option><option value="volunteer">Volunteer</option></select>
            </label>
            <button type="submit">Join the interest list →</button>
          </form>
        )}
      </section>
    </div>
  );
}
