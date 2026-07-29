"use client";

import { useEffect, useState } from "react";

type Draft = {
  id: string;
  type: "blog" | "workshop" | "general";
  title: string;
  summary: string;
  status: "READY_FOR_REVIEW";
  source: string;
  created_at: string;
  content_preview: string;
};

export default function ContentBridgeInbox() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "needs_setup">("loading");

  useEffect(() => {
    fetch("/api/chat?contentBridge=1", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("bridge unavailable");
        const data = await response.json() as { drafts?: Draft[] };
        setDrafts(data.drafts || []);
        setState("ready");
      })
      .catch(() => setState("needs_setup"));
  }, []);

  return (
    <section className="admin-analytics">
      <header>
        <p>ChatGPT → Lux Automaton</p>
        <h1>Content review inbox</h1>
        <span>Blogs, workshops, and general content arrive here as private drafts. Nothing publishes automatically.</span>
      </header>
      <div className="admin-activity-panel">
        <div><b>Bridge status</b><span>{state === "ready" ? "Connected" : state === "loading" ? "Checking…" : "Needs Setup"}</span></div>
        <div><b>Publishing</b><span>Disabled · Asa approval required</span></div>
        {drafts.map((draft) => (
          <div key={draft.id}>
            <b>{draft.title}</b>
            <span>{draft.type.toUpperCase()} · {draft.status} · {new Date(draft.created_at).toLocaleString()}</span>
          </div>
        ))}
        {state === "ready" && drafts.length === 0 && <div><b>No drafts yet</b><span>Ask ChatGPT to create a Lux Automaton draft after the remote MCP app is connected.</span></div>}
      </div>
    </section>
  );
}
