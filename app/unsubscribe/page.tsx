"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type State = "idle" | "working" | "success" | "error";

export default function UnsubscribePage() {
  const [token, setToken] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("Use the unsubscribe link included in a Lux Automaton newsletter email.");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") ?? "");
  }, []);

  const unsubscribe = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!token) {
      setState("error");
      setMessage("This page needs the private manage token from your newsletter link.");
      return;
    }
    if (!supabaseUrl || !supabaseAnonKey) {
      setState("error");
      setMessage("Preference management is not connected in this preview.");
      return;
    }

    setState("working");
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/newsletter-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({ action: "unsubscribe", token }),
      });
      if (!response.ok) throw new Error("unsubscribe failed");
      setState("success");
      setMessage("You have been unsubscribed from Lux Automaton newsletter delivery.");
    } catch {
      setState("error");
      setMessage("We could not update that preference. Please use the latest manage link and try again.");
    }
  };

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px 100px", color: "#eef2ff" }}>
      <p style={{ color: "#43e6ff", fontWeight: 800, letterSpacing: "0.12em", fontSize: 12 }}>LUX AUTOMATON</p>
      <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", margin: "8px 0 18px" }}>Newsletter preferences</h1>
      <p style={{ color: state === "error" ? "#fca5a5" : "#9ca3af", lineHeight: 1.7 }}>{message}</p>
      {state !== "success" && (
        <button
          type="button"
          disabled={state === "working"}
          onClick={unsubscribe}
          style={{
            marginTop: 22, padding: "12px 18px", border: "1px solid #43e6ff55", borderRadius: 6,
            background: "#07111f", color: "#dffaff", cursor: "pointer", fontWeight: 700,
          }}
        >
          {state === "working" ? "Updating…" : "Unsubscribe"}
        </button>
      )}
      <div style={{ marginTop: 30 }}>
        <Link href="/" style={{ color: "#8befff" }}>← Back to Lux Automaton</Link>
      </div>
    </main>
  );
}
