"use client";

import { useState, useEffect, useRef } from "react";

let msgCounter = 0;
function createMessage(role: "user" | "lana", text: string) {
  msgCounter++;
  return { id: `msg-${Date.now()}-${msgCounter}`, role, text, timestamp: new Date() };
}

function getInitialMessages() {
  return [createMessage("lana", "Hey! I'm Lana, your AI business partner at Lux Automaton. What are you working on?")];
}

function renderMessageText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    let tempIndex = 0;
    const itemRegex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
    let lineMatch;
    while ((lineMatch = itemRegex.exec(line)) !== null) {
      const matchStart = lineMatch.index;
      if (matchStart > tempIndex) parts.push(line.substring(tempIndex, matchStart));
      if (lineMatch[0].startsWith("**")) {
        parts.push(<strong key={`b-${lineIdx}-${matchStart}`} style={{ color: "var(--text-primary)", fontWeight: 700 }}>{lineMatch[2]}</strong>);
      } else {
        const href = lineMatch[4];
        const isExternal = href.startsWith("http");
        parts.push(<a key={`a-${lineIdx}-${matchStart}`} href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} style={{ color: "var(--cyan)", textDecoration: "underline" }}>{lineMatch[3]}</a>);
      }
      tempIndex = matchStart + lineMatch[0].length;
    }
    if (tempIndex < line.length) parts.push(line.substring(tempIndex));
    if (parts.length === 0) parts.push(line);
    return <span key={lineIdx}>{parts}{lineIdx < lines.length - 1 && <br />}</span>;
  });
}

export default function ChatPage() {
  const [isOpen] = useState(true);
  const [messages, setMessages] = useState(getInitialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => () => { abortRef.current?.abort(); }, []);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;
    const userMessage = createMessage("user", textToSend);
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const history = messages.slice(-20).map((m) => ({
      role: m.role === "lana" ? ("assistant" as const) : ("user" as const),
      content: m.text,
    }));
    history.push({ role: "user", content: textToSend });

    try {
      abortRef.current = new AbortController();
      const resp = await fetch("/api/chat/stream/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history }),
        signal: abortRef.current.signal,
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No stream reader");
      const decoder = new TextDecoder();
      let fullText = "";
      const lanaId = `msg-${Date.now()}-${++msgCounter}`;
      setMessages((prev) => [...prev, { id: lanaId, role: "lana" as const, text: "", timestamp: new Date() }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                fullText += data.text;
                setMessages((prev) => prev.map((m) => m.id === lanaId ? { ...m, text: fullText } : m));
              }
            } catch {}
          }
        }
      }
      if (!fullText) setMessages((prev) => prev.map((m) => m.id === lanaId ? { ...m, text: "Hmm, I didn't catch that. Can you try again?" } : m));
    } catch (err: any) {
      if (err.name === "AbortError") return;
      setMessages((prev) => [...prev, createMessage("lana", "Connection issue — try again in a sec.")]);
    } finally {
      setIsTyping(false);
      abortRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(inputValue); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 16px 24px" }}>
      <div style={{ width: "100%", maxWidth: "680px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(0, 229, 255, 0.4)" }}>
              <img src="/images/lana.png" alt="Lana" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>
              Chat with <span style={{ color: "var(--cyan)" }}>LANA</span>
            </h1>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>Your AI business partner — strategy, systems, and next moves.</p>
        </div>

        <div style={{ background: "rgba(6, 11, 20, 0.95)", border: "1px solid rgba(0, 229, 255, 0.15)", borderRadius: "8px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0, 0, 0, 0.5)" }}>
          <div style={{ height: "480px", overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "12px 16px", borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  fontSize: "0.85rem", lineHeight: 1.6, color: "var(--text-primary)",
                  background: msg.role === "user" ? "rgba(0, 229, 255, 0.12)" : "rgba(255, 255, 255, 0.05)",
                  border: msg.role === "user" ? "1px solid rgba(0, 229, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.08)",
                }}>
                  {msg.role === "lana" && !msg.text && isTyping ? (
                    <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Thinking...</span>
                  ) : (
                    renderMessageText(msg.text)
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(0, 229, 255, 0.12)", display: "flex", gap: "10px", background: "rgba(6, 11, 20, 0.98)" }}>
            <input
              type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask Lana anything..."
              disabled={isTyping}
              style={{ flex: 1, background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "8px", padding: "12px 14px", fontSize: "0.85rem", color: "var(--text-primary)", outline: "none", fontFamily: "inherit" }}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isTyping || !inputValue.trim()}
              style={{ background: "linear-gradient(135deg, var(--lux-cyan) 0%, var(--lux-mint) 100%)", border: "none", borderRadius: "8px", padding: "12px 20px", fontSize: "0.85rem", fontWeight: 700, color: "#0b0f19", cursor: isTyping ? "not-allowed" : "pointer", opacity: isTyping || !inputValue.trim() ? 0.5 : 1, fontFamily: "inherit" }}
            >
              Send
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <a href="/ask-lana/" style={{ fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "none" }}>
            Back to Ask LANA
          </a>
        </div>
      </div>
    </div>
  );
}
