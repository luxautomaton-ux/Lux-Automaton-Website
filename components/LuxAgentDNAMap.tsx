"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  BadgeCheck,
  BrainCircuit,
  CircleHelp,
  Database,
  Eye,
  Gauge,
  GitBranch,
  KeyRound,
  LifeBuoy,
  Mic2,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Wrench,
} from "lucide-react";
import styles from "./LuxAgentDNAMap.module.css";

type NodeKey =
  | "identity" | "persona" | "voice" | "mission"
  | "skills" | "tools" | "memory" | "learning" | "runtime" | "lifecycle"
  | "authority" | "approvals" | "unknowns" | "escalation"
  | "recovery" | "observability" | "verify" | "guardrails";

type DnaNode = {
  key: NodeKey;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  copy: string;
  prevents: string;
};

const NODES: Record<NodeKey, DnaNode> = {
  identity: { key: "identity", label: "Identity", icon: UserRound, copy: "Name, displayed role, purpose, department, owner, and the explicit job this agent does not own.", prevents: "Role confusion and accidental authority creep." },
  persona: { key: "persona", label: "Persona", icon: Sparkles, copy: "Warmth, confidence, humor, vocabulary, public/internal modes, disagreement style, examples, and anti-examples.", prevents: "Persona drift and agents that feel different every session." },
  voice: { key: "voice", label: "Voice Pack", icon: Mic2, copy: "Approved voice identity, provider mapping, pronunciation, cadence, barge-in, low-confidence confirmation, and explicit fallback.", prevents: "Wrong names, talking over people, and silent voice substitution." },
  mission: { key: "mission", label: "Mission", icon: Target, copy: "5W + H, required output, quality bar, definition of done, measurable result, and stop conditions.", prevents: "Agents starting work before the assignment is actually clear." },
  skills: { key: "skills", label: "Skills", icon: BrainCircuit, copy: "Repeatable steps with accepted inputs, output format, failure handling, tests, and rules for when not to use the skill.", prevents: "Prompt-only behavior that breaks when the workflow changes." },
  tools: { key: "tools", label: "Tool Contracts", icon: Wrench, copy: "What a tool does, when to use it, when not to, required permissions, error states, retry rules, cost, and receipt requirements.", prevents: "Random tool calls, infinite retries, and fake completion." },
  memory: { key: "memory", label: "Memory Pack", icon: Database, copy: "Authorized sources, namespace, freshness, sensitivity, conflict state, retention, deletion, and export policy.", prevents: "Stale facts, memory collisions, and private data leaking across jobs." },
  learning: { key: "learning", label: "Learning", icon: GitBranch, copy: "New lessons enter as candidates. Evidence, review, and human approval determine what becomes durable operating knowledge.", prevents: "One bad interaction silently rewriting the agent's behavior." },
  runtime: { key: "runtime", label: "Runtime", icon: Gauge, copy: "Approved models/providers, fallback order, degraded-mode behavior, compatibility, spend/step budgets, and update retesting.", prevents: "Provider changes quietly changing capability, cost, or behavior." },
  lifecycle: { key: "lifecycle", label: "Lifecycle", icon: RefreshCcw, copy: "Draft → configured → tested → verified → activated → degraded / blocked → retired.", prevents: "Unverified agents being treated like production workers forever." },
  authority: { key: "authority", label: "Authority", icon: KeyRound, copy: "Explicit read, draft, update, send, spend, publish, delete, and protected-resource boundaries.", prevents: "Excessive agency and agents improvising permissions." },
  approvals: { key: "approvals", label: "Approvals", icon: BadgeCheck, copy: "Approval binds the exact actor, action, resource, parameters, destination, scope, expiration, and single-use intent.", prevents: "A vague “go ahead” becoming unlimited permission." },
  unknowns: { key: "unknowns", label: "Unknowns", icon: CircleHelp, copy: "When the playbook ends, the only legal moves are ASK, RESEARCH, HANDOFF, ESCALATE, FALLBACK, or BLOCK.", prevents: "The agent going renegade because nobody anticipated the situation." },
  escalation: { key: "escalation", label: "Escalation", icon: LifeBuoy, copy: "Human handoff carries the request, intent, facts collected, sources, actions attempted, blocker, urgency, and recommended next action.", prevents: "Dead-end handoffs that make a person reconstruct the whole conversation." },
  recovery: { key: "recovery", label: "Recovery", icon: RefreshCcw, copy: "Retry ceilings, timeouts, circuit breakers, idempotency, restart checkpoints, duplicate-action detection, and rollback rules.", prevents: "Runaway loops, duplicate sends, and broken restart behavior." },
  observability: { key: "observability", label: "Observability", icon: Eye, copy: "Mission IDs, models, tools, retries, latency, cost, approvals, state, receipts, errors, and evidence are visible.", prevents: "Black-box agents that fail without anyone knowing why." },
  verify: { key: "verify", label: "Lux Verify", icon: ShieldCheck, copy: "Normal tests, adversarial tests, edge cases, independent review, actual receipts, and PASS / RETRY / BLOCKED evidence.", prevents: "Self-certified agents that say they worked because the prompt said so." },
  guardrails: { key: "guardrails", label: "Guardrails", icon: ShieldCheck, copy: "Prompt-injection handling, sensitive-data boundaries, least privilege, stop conditions, protected resources, and human escape hatches.", prevents: "Unsafe shortcuts when the real world gets messy." },
};

const GROUPS: Array<{ title: string; subtitle: string; tone: "cyan" | "violet"; keys: NodeKey[] }> = [
  { title: "WHO IT IS", subtitle: "Purpose gives it direction", tone: "cyan", keys: ["identity", "persona", "voice", "mission"] },
  { title: "HOW IT THINKS", subtitle: "Intelligence turns context into action", tone: "violet", keys: ["skills", "tools", "memory", "learning", "runtime", "lifecycle"] },
  { title: "HOW IT ACTS", subtitle: "Action with judgment", tone: "cyan", keys: ["authority", "approvals", "unknowns", "escalation"] },
  { title: "HOW IT STAYS SAFE", subtitle: "Safety builds trust", tone: "violet", keys: ["recovery", "observability", "verify", "guardrails"] },
];

const FLOW = ["Input", "Context", "Decide", "Approve", "Execute", "Verify", "Learn"];
const SAFE_MOVES = ["ASK", "RESEARCH", "HANDOFF", "ESCALATE", "FALLBACK", "BLOCK"];

export default function LuxAgentDNAMap({ compact = false }: { compact?: boolean }) {
  const [selectedKey, setSelectedKey] = useState<NodeKey>("unknowns");
  const selected = useMemo(() => NODES[selectedKey], [selectedKey]);
  const SelectedIcon = selected.icon;

  return (
    <section className={`${styles.shell} ${compact ? styles.compact : ""}`}>
      <div className={styles.skyGlow} aria-hidden="true" />
      <div className={styles.map}>
        <div className={`${styles.group} ${styles.who}`}>
          <Group group={GROUPS[0]} selected={selectedKey} onSelect={setSelectedKey} />
        </div>
        <div className={`${styles.group} ${styles.thinks}`}>
          <Group group={GROUPS[1]} selected={selectedKey} onSelect={setSelectedKey} />
        </div>

        <div className={styles.brainStage} aria-label="Lux Agent DNA interactive brain map">
          <div className={styles.orbitA} /><div className={styles.orbitB} /><div className={styles.orbitC} />
          <svg className={styles.brain} viewBox="0 0 520 420" role="img" aria-label="Glowing Lux Agent DNA brain">
            <defs>
              <linearGradient id="luxBrain" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#29e6ff" /><stop offset="45%" stopColor="#2f7cff" />
                <stop offset="72%" stopColor="#7449ff" /><stop offset="100%" stopColor="#e24dff" />
              </linearGradient>
              <filter id="luxGlow"><feGaussianBlur stdDeviation="8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <path className={styles.brainHalo} d="M260 70C170 35 82 100 89 202c-33 66 12 141 84 145 27 39 92 33 103 4 22 28 82 34 112-4 71-5 113-81 82-146 8-98-82-165-170-131-13-12-27-13-40 0Z" />
            <path className={styles.brainLeft} d="M255 90c-42-34-111-25-137 24-36 9-49 55-25 82-19 38 2 82 38 92 5 42 51 65 85 42 13 20 30 24 39 15Z" />
            <path className={styles.brainRight} d="M265 90c42-34 111-25 137 24 36 9 49 55 25 82 19 38-2 82-38 92-5 42-51 65-85 42-13 20-30 24-39 15Z" />
            {[[157,139],[206,112],[244,166],[139,215],[215,236],[179,297],[310,119],[362,145],[293,180],[388,216],[317,248],[352,303],[260,211]].map(([cx,cy],i)=>
              <circle key={i} cx={cx} cy={cy} r={i===12?8:5} fill={i%2?"#c55cff":"#57eaff"} filter="url(#luxGlow)" />
            )}
            <g className={styles.neuralLines} stroke="url(#luxBrain)" strokeWidth="2" fill="none" opacity=".72">
              <path d="M157 139 206 112 244 166 260 211 215 236 139 215 157 139" />
              <path d="M179 297 215 236 260 211 317 248 352 303" />
              <path d="M310 119 293 180 260 211 388 216 362 145 310 119" />
              <path d="M244 166 293 180 317 248" />
            </g>
          </svg>
          <div className={styles.pedestal}>
            <b>LUX AGENT DNA™</b>
            <span>IDENTITY + JUDGMENT + PROOF</span>
          </div>
        </div>

        <div className={`${styles.group} ${styles.acts}`}>
          <Group group={GROUPS[2]} selected={selectedKey} onSelect={setSelectedKey} />
        </div>
        <div className={`${styles.group} ${styles.safe}`}>
          <Group group={GROUPS[3]} selected={selectedKey} onSelect={setSelectedKey} />
        </div>
      </div>

      {!compact && (
        <>
          <div className={styles.inspector}>
            <div className={styles.inspectorIcon}><SelectedIcon size={24} strokeWidth={1.9} /></div>
            <div>
              <span>SELECTED DNA CONTRACT</span>
              <h3>{selected.label}</h3>
              <p>{selected.copy}</p>
              <small><b>Designed to prevent:</b> {selected.prevents}</small>
            </div>
          </div>

          <div className={styles.unknownBar}>
            <div><span>WHEN THE HAPPY PATH ENDS</span><b>The agent does not improvise authority.</b></div>
            <div>{SAFE_MOVES.map((move) => <span key={move}>{move}</span>)}</div>
          </div>

          <div className={styles.flow}>
            <b>THE LUX FLOW</b>
            <div>{FLOW.map((step, index) => <span key={step}>{step}{index < FLOW.length - 1 && <i>→</i>}</span>)}</div>
          </div>
        </>
      )}
    </section>
  );
}

function Group({ group, selected, onSelect }: { group: (typeof GROUPS)[number]; selected: NodeKey; onSelect: (key: NodeKey) => void }) {
  return (
    <>
      <header><span>{group.title}</span><small>{group.subtitle}</small></header>
      <div className={styles.nodeGrid}>
        {group.keys.map((key) => {
          const node = NODES[key];
          const Icon = node.icon;
          return (
            <button key={key} onClick={() => onSelect(key)} className={selected === key ? styles.activeNode : ""} aria-pressed={selected === key}>
              <Icon size={17} strokeWidth={2} /><span>{node.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
