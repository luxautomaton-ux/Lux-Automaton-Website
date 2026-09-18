import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  BrainCircuit,
  CircleHelp,
  Database,
  Eye,
  KeyRound,
  Mic2,
  RefreshCcw,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import LuxAgentDNAMap from "@/components/LuxAgentDNAMap";

export const metadata: Metadata = {
  title: "Lux Agent DNA™ — Reliable, Voice-Ready AI Agents | Lux Automaton",
  description:
    "Meet Lux Agent DNA™: the identity, persona, voice, skills, memory, permissions, unknown-state handling, recovery, human approvals, and verification structure behind business-ready Lux agents.",
};

const customerLayers = [
  {
    label: "Lux Agent Pack™",
    title: "WHO works for you",
    copy: "A recognizable AI team with named roles, mission, persona, responsibilities, and clear non-roles.",
    accent: "#4de6ff",
  },
  {
    label: "Lux Success Pack™",
    title: "HOW the team works",
    copy: "Repeatable methods, inputs, outputs, quality requirements, stop conditions, and measurable definitions of success.",
    accent: "#9b68ff",
  },
  {
    label: "Lux Memory Pack™",
    title: "WHAT the team knows",
    copy: "Approved business context with source labels, freshness, sensitivity, conflict handling, and review rules.",
    accent: "#4fcfff",
  },
  {
    label: "Lux Voice Pack™",
    title: "HOW the team sounds",
    copy: "Voice identity, provider mapping, pronunciation, cadence, interruption behavior, confirmation rules, and explicit fallback.",
    accent: "#d061ff",
  },
];

const dnaLayers = [
  {
    icon: UserRound,
    title: "Identity + Persona",
    copy: "Name, role, purpose, personality, public/internal modes, explicit non-role, and persona-regression expectations.",
  },
  {
    icon: Mic2,
    title: "Voice + Conversation",
    copy: "Approved voice identity, pronunciations, barge-in, low-confidence confirmations, channel behavior, and safe fallback.",
  },
  {
    icon: BrainCircuit,
    title: "Skills + Mission",
    copy: "5W + H, accepted inputs, repeatable steps, required outputs, quality bar, tests, and stop conditions.",
  },
  {
    icon: Wrench,
    title: "Tools + Runtime",
    copy: "When to use a tool, when not to, permissions, retries, errors, cost limits, provider fallback, and degraded mode.",
  },
  {
    icon: Database,
    title: "Memory + Learning",
    copy: "Authorized sources, freshness, sensitivity, conflicts, retention, candidate lessons, and human-reviewed promotion.",
  },
  {
    icon: KeyRound,
    title: "Authority + Approval",
    copy: "Read, draft, update, send, spend, publish, delete, and protected-resource boundaries with exact-action approvals.",
  },
  {
    icon: CircleHelp,
    title: "Unknowns + Escalation",
    copy: "If the playbook ends, the agent must ask, research, hand off, escalate, fall back, or block — never invent authority.",
  },
  {
    icon: RefreshCcw,
    title: "Recovery + Lifecycle",
    copy: "Retry ceilings, circuit breakers, duplicate prevention, restart checkpoints, rollback, degraded states, and retirement.",
  },
  {
    icon: Eye,
    title: "Observability + Receipts",
    copy: "Mission state, models, tools, retries, errors, latency, approvals, evidence, and receipts remain visible.",
  },
  {
    icon: ShieldCheck,
    title: "Lux Verify™ + Guardrails",
    copy: "Normal tests, adversarial tests, edge cases, prompt-injection handling, least privilege, and independent proof.",
  },
];

const edgeCases = [
  ["Missing information", "Ask for the missing fact instead of guessing."],
  ["Conflicting memory", "Surface the conflict and block the affected action until it is resolved."],
  ["Tool unavailable", "Use an approved fallback or stop — never pretend the action succeeded."],
  ["Customer asks for a human", "Hand off with the request, facts, attempts, blocker, urgency, and next action."],
  ["Voice hears a name, date, price, or address poorly", "Repeat it back and confirm before using it."],
  ["Approval changes after the content, amount, or recipient changes", "Invalidate the old approval and ask again."],
  ["Network or provider failure", "Checkpoint the mission, retry only inside policy, then return RETRY or BLOCKED."],
  ["Agent says “done”", "Require a real receipt or evidence before the connected action can be marked complete."],
];

const buildSteps = [
  ["01", "Discover", "Define the business, owner, team, problems, outcomes, tools, voice, memory, and authority."],
  ["02", "Compile DNA", "Turn that discovery into identities, personas, Voice Packs, Skills, Success Packs, Memory Packs, and permissions."],
  ["03", "Run the happy path", "Prove the normal workflows create the expected outputs without unnecessary supervision."],
  ["04", "Break it on purpose", "Test missing facts, stale data, conflicts, tool failures, duplicate actions, context loss, prompt injection, and handoffs."],
  ["05", "Audition the voice", "The owner approves the voice identity, pronunciation, cadence, fallback, and interruption behavior."],
  ["06", "Prove the tools", "Connect only approved tools, least privilege first, and require receipts for consequential writes."],
  ["07", "Lux Verify™", "Independent evidence earns PASS, RETRY, or BLOCKED. A confident answer is not proof."],
  ["08", "Activate + learn", "Measure real outcomes, promote only reviewed lessons, and retest whenever models, tools, or permissions change."],
];

const safeMoves = ["ASK", "RESEARCH", "HANDOFF", "ESCALATE", "FALLBACK", "BLOCK"];

export default function LuxAgentDNAPage() {
  return (
    <main style={{ paddingTop: "72px", background: "#020711", color: "#edf7ff" }}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "96px 24px 74px",
          borderBottom: "1px solid rgba(78,216,255,.12)",
          background:
            "radial-gradient(circle at 70% 35%, rgba(111,60,255,.16), transparent 30%), radial-gradient(circle at 35% 35%, rgba(26,193,255,.12), transparent 31%), linear-gradient(180deg,#020713,#051126)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.24,
            backgroundImage:
              "linear-gradient(rgba(72,192,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(72,192,255,.07) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              gap: "9px",
              alignItems: "center",
              marginBottom: "22px",
              color: "#55e4ff",
              fontSize: ".68rem",
              fontWeight: 800,
              letterSpacing: ".2em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: "34px", height: "1px", background: "#55e4ff" }} />
            Introducing Lux Agent DNA™
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(320px,.9fr)", gap: "56px", alignItems: "end" }} className="dna-hero-grid">
            <div>
              <h1 style={{ margin: 0, maxWidth: "900px", fontSize: "clamp(3.1rem,7vw,6.8rem)", lineHeight: .88, letterSpacing: "-.075em", fontWeight: 950 }}>
                Build an agent that
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg,#38e8ff,#4a7cff 45%,#b05cff 76%,#ec6cff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  holds up in the real world.
                </span>
              </h1>
              <p style={{ maxWidth: "760px", margin: "28px 0 0", color: "#a6bdd1", fontSize: "clamp(1rem,1.7vw,1.28rem)", lineHeight: 1.65 }}>
                Lux Agent DNA™ is the operating structure behind reliable, voice-ready, business-ready AI agents.
                Identity, persona, voice, skills, memory, tools, safeguards, approvals, recovery, and verification are
                designed together — so the agent does not fall apart the first time the happy path ends.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
                <Link href="#dna-map" className="btn-primary">Explore the DNA</Link>
                <Link href="/contact" className="btn-outline">Build my Lux team</Link>
              </div>
            </div>

            <aside style={{ padding: "24px", border: "1px solid rgba(111,86,255,.34)", borderRadius: "22px", background: "rgba(7,15,37,.8)", boxShadow: "0 24px 70px rgba(0,0,0,.35),0 0 55px rgba(104,73,255,.09)" }}>
              <span style={{ color: "#c777ff", fontSize: ".62rem", fontWeight: 850, letterSpacing: ".17em" }}>THE SIMPLE CUSTOMER VIEW</span>
              <div style={{ display: "grid", gap: "13px", marginTop: "17px" }}>
                {[
                  ["Agent Pack™", "WHO is on your team"],
                  ["Success Pack™", "HOW your team works"],
                  ["Memory Pack™", "WHAT your team knows"],
                  ["Voice Pack™", "HOW your team sounds"],
                ].map(([a,b]) => (
                  <div key={a} style={{ display: "grid", gridTemplateColumns: "118px 1fr", gap: "14px", padding: "13px 14px", border: "1px solid rgba(255,255,255,.08)", borderRadius: "12px", background: "rgba(255,255,255,.025)" }}>
                    <b style={{ color: "#fff", fontSize: ".78rem" }}>{a}</b>
                    <span style={{ color: "#8da8c0", fontSize: ".78rem" }}>{b}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: "18px 0 0", color: "#6f8ca8", fontSize: ".74rem", lineHeight: 1.55 }}>
                Underneath that simple experience, Lux DNA quietly manages permissions, unknowns, recovery, evidence, model changes, and human control.
              </p>
            </aside>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "54px" }}>
            {["VOICE-READY", "UNKNOWN-SAFE", "APPROVAL-AWARE", "EVIDENCE-FIRST", "HUMAN-CONTROLLED"].map((label) => (
              <span key={label} style={{ padding: "8px 11px", border: "1px solid rgba(82,214,255,.18)", borderRadius: "999px", color: "#75cfe4", fontSize: ".59rem", fontWeight: 800, letterSpacing: ".12em", background: "rgba(36,152,197,.06)" }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="dna-map" style={{ padding: "88px 24px 72px", background: "#020711" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <header style={{ maxWidth: "900px", marginBottom: "34px" }}>
            <span style={{ color: "#5be1ff", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".18em" }}>THE LUX MIND MAP</span>
            <h2 style={{ margin: "10px 0 14px", fontSize: "clamp(2.2rem,4.5vw,4.4rem)", lineHeight: .96, letterSpacing: "-.055em" }}>
              See the DNA behind the agent.
            </h2>
            <p style={{ margin: 0, color: "#8ea7bd", fontSize: "1rem", lineHeight: 1.7 }}>
              Inspired by the 3D knowledge galaxy inside Lux Codex, this interactive map shows the four systems working
              around every Lux agent. Tap any contract to see what it controls and what failure it is designed to prevent.
            </p>
          </header>
          <LuxAgentDNAMap />
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "linear-gradient(180deg,#041020,#020711)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <header style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto 48px" }}>
            <span style={{ color: "#c66cff", fontSize: ".64rem", fontWeight: 850, letterSpacing: ".18em" }}>FOUR PRODUCTS. ONE OPERATING DNA.</span>
            <h2 style={{ margin: "11px 0 15px", fontSize: "clamp(2rem,4vw,3.8rem)", letterSpacing: "-.05em" }}>Simple on the surface. Serious underneath.</h2>
            <p style={{ margin: 0, color: "#8ca8bf", lineHeight: 1.7 }}>
              Customers should not have to become AI engineers. Lux packages the complexity into clear products while
              preserving the reliability contracts underneath.
            </p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "14px" }} className="dna-layer-grid">
            {customerLayers.map((item) => (
              <article key={item.label} style={{ minHeight: "245px", padding: "26px", border: `1px solid ${item.accent}44`, borderRadius: "18px", background: "rgba(8,18,38,.76)", boxShadow: `0 0 40px ${item.accent}0e` }}>
                <span style={{ color: item.accent, fontSize: ".64rem", fontWeight: 850, letterSpacing: ".12em" }}>{item.label}</span>
                <h3 style={{ margin: "22px 0 12px", color: "#fff", fontSize: "1.35rem", lineHeight: 1.1 }}>{item.title}</h3>
                <p style={{ margin: 0, color: "#8ea8bf", fontSize: ".87rem", lineHeight: 1.65 }}>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "#020711" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <header style={{ display: "grid", gridTemplateColumns: ".75fr 1.25fr", gap: "36px", marginBottom: "45px" }} className="dna-two-col">
            <div>
              <span style={{ color: "#57e5ff", fontSize: ".64rem", fontWeight: 850, letterSpacing: ".18em" }}>LUX DNA™ UNDER THE HOOD</span>
              <h2 style={{ margin: "10px 0 0", fontSize: "clamp(2.2rem,4vw,3.8rem)", lineHeight: .96, letterSpacing: "-.055em" }}>What makes the worker dependable?</h2>
            </div>
            <p style={{ margin: 0, alignSelf: "end", color: "#8ea8be", fontSize: "1rem", lineHeight: 1.75 }}>
              A strong persona alone is not enough. Real operations need identity truth, tool behavior, memory rules,
              bounded authority, unknown-state handling, recovery, observability, verification, and a human escape hatch.
            </p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "13px" }} className="dna-contract-grid">
            {dnaLayers.map(({ icon: Icon, title, copy }, index) => (
              <article key={title} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "15px", padding: "20px", border: "1px solid rgba(84,192,255,.12)", borderRadius: "15px", background: index % 2 ? "rgba(33,14,70,.28)" : "rgba(6,26,48,.56)" }}>
                <span style={{ display: "grid", placeItems: "center", width: "46px", height: "46px", borderRadius: "13px", color: index % 2 ? "#d274ff" : "#59e4ff", border: `1px solid ${index % 2 ? "rgba(210,116,255,.28)" : "rgba(89,228,255,.28)"}`, background: "rgba(255,255,255,.025)" }}>
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 style={{ margin: "1px 0 7px", color: "#f0f7ff", fontSize: "1rem" }}>{title}</h3>
                  <p style={{ margin: 0, color: "#829db5", fontSize: ".83rem", lineHeight: 1.6 }}>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "linear-gradient(145deg,#041426,#090520)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: ".85fr 1.15fr", gap: "54px", alignItems: "start" }} className="dna-two-col">
          <div style={{ position: "sticky", top: "100px" }} className="dna-sticky">
            <span style={{ color: "#dd6dff", fontSize: ".64rem", fontWeight: 850, letterSpacing: ".18em" }}>WHEN THE HAPPY PATH ENDS</span>
            <h2 style={{ margin: "12px 0 18px", fontSize: "clamp(2.4rem,4.8vw,4.7rem)", lineHeight: .9, letterSpacing: "-.06em" }}>
              It does not
              <br />
              <span style={{ color: "#5be4ff" }}>go renegade.</span>
            </h2>
            <p style={{ maxWidth: "520px", margin: 0, color: "#91aabf", lineHeight: 1.75 }}>
              If the situation was never anticipated, a Lux agent has only six legal moves. None of them are
              “make up a new company policy” or “find a way around the permission.”
            </p>
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginTop: "25px" }}>
              {safeMoves.map((move) => <span key={move} style={{ padding: "8px 10px", border: "1px solid rgba(196,91,255,.32)", borderRadius: "8px", color: "#dda2ff", background: "rgba(113,38,151,.12)", fontSize: ".62rem", fontWeight: 850, letterSpacing: ".08em" }}>{move}</span>)}
            </div>
          </div>

          <div style={{ display: "grid", gap: "10px" }}>
            {edgeCases.map(([problem, response], index) => (
              <article key={problem} style={{ display: "grid", gridTemplateColumns: "42px 1fr", gap: "15px", alignItems: "start", padding: "19px 21px", border: "1px solid rgba(255,255,255,.09)", borderRadius: "14px", background: "rgba(4,12,29,.7)" }}>
                <span style={{ display: "grid", placeItems: "center", width: "40px", height: "40px", border: "1px solid rgba(85,225,255,.25)", borderRadius: "12px", color: "#5ee4ff", fontWeight: 900, fontSize: ".68rem" }}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <b style={{ color: "#fff", fontSize: ".92rem" }}>{problem}</b>
                  <p style={{ margin: "5px 0 0", color: "#809bb3", fontSize: ".82rem", lineHeight: 1.55 }}>{response}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "#020711" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <header style={{ maxWidth: "850px", marginBottom: "42px" }}>
            <span style={{ color: "#55e4ff", fontSize: ".64rem", fontWeight: 850, letterSpacing: ".18em" }}>FROM IDEA TO VERIFIED WORKER</span>
            <h2 style={{ margin: "12px 0 15px", fontSize: "clamp(2.2rem,4.3vw,4rem)", lineHeight: .96, letterSpacing: "-.055em" }}>An agent earns trust. It does not announce it.</h2>
            <p style={{ margin: 0, color: "#8da7bd", lineHeight: 1.7 }}>
              Lux separates configuration, testing, verification, activation, and ongoing learning so a polished demo is not mistaken for a production-ready employee.
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "12px" }} className="dna-steps-grid">
            {buildSteps.map(([num,title,copy]) => (
              <article key={num} style={{ minHeight: "215px", padding: "22px", border: "1px solid rgba(72,190,255,.13)", borderRadius: "16px", background: "linear-gradient(145deg,rgba(6,26,49,.76),rgba(17,9,40,.76))" }}>
                <span style={{ color: "#53dfff", font: "800 .58rem/1 var(--font-mono)", letterSpacing: ".15em" }}>{num}</span>
                <h3 style={{ margin: "27px 0 10px", color: "#fff", fontSize: "1.05rem" }}>{title}</h3>
                <p style={{ margin: 0, color: "#819bb2", fontSize: ".8rem", lineHeight: 1.6 }}>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px 110px", background: "radial-gradient(circle at 50% 25%,rgba(83,92,255,.15),transparent 35%),#020711" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "58px 32px", textAlign: "center", border: "1px solid rgba(84,220,255,.22)", borderRadius: "28px", background: "rgba(5,18,39,.86)", boxShadow: "0 30px 90px rgba(0,0,0,.4),0 0 80px rgba(94,89,255,.08)" }}>
          <BadgeCheck size={38} color="#55e4ff" strokeWidth={1.6} />
          <h2 style={{ margin: "16px auto 15px", maxWidth: "800px", fontSize: "clamp(2rem,4.5vw,4rem)", lineHeight: .98, letterSpacing: "-.055em" }}>
            Your business should not have to discover agent reliability the hard way.
          </h2>
          <p style={{ maxWidth: "720px", margin: "0 auto", color: "#8ea8bf", lineHeight: 1.7 }}>
            Start with a team whose identity, voice, memory, skills, authority, safeguards, handoffs, recovery, and proof are designed before the first real problem arrives.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginTop: "30px" }}>
            <Link href="/contact" className="btn-primary">Build my Lux Agent Pack</Link>
            <Link href="/products/success-packs" className="btn-outline">Explore Success Packs</Link>
          </div>
          <p style={{ margin: "28px auto 0", maxWidth: "760px", color: "#607c96", fontSize: ".7rem", lineHeight: 1.55 }}>
            Lux Automaton™, Lux Agent™, Lux Agent Pack™, Lux Success Pack™, Lux Memory Pack™, Lux Voice Pack™, Lux DNA™, Lux Verify™, and 5W + H = Success™ are Lux Automaton brand/process identifiers. ™ indicates claimed trademark usage and is not a statement of federal registration.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .dna-hero-grid, .dna-two-col { grid-template-columns: 1fr !important; }
          .dna-layer-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
          .dna-steps-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
          .dna-sticky { position: static !important; }
        }
        @media (max-width: 620px) {
          .dna-layer-grid, .dna-contract-grid, .dna-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
