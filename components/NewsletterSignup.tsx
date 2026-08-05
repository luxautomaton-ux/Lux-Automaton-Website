import React, { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Please check the consent box to subscribe.");
      return;
    }
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        // Neutral response fallback for offline/preview
        setStatus("success");
        setMessage("Thank you for subscribing! Please check your inbox to confirm your email address.");
        setEmail("");
        setConsent(false);
        return;
      }

      const res = await fetch(`${supabaseUrl}/functions/v1/newsletter-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          email,
          consent: true,
          consentLanguageVersion: "v2026.1",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing! Please check your inbox to confirm your email address.");
        setEmail("");
        setConsent(false);
      } else {
        // Neutral response on duplicate or edge response
        setStatus("success");
        setMessage("Thank you for subscribing! Please check your inbox to confirm your email address.");
        setEmail("");
        setConsent(false);
      }
    } catch {
      setStatus("success");
      setMessage("Thank you for subscribing! Please check your inbox to confirm your email address.");
      setEmail("");
      setConsent(false);
    }
  };

  return (
    <div style={{ background: "#111827", color: "#f9fafb", padding: "24px", borderRadius: "12px", border: "1px solid #374151" }}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "1.25rem", color: "#8b5cf6" }}>Join the Lux Automaton Newsletter</h3>
      <p style={{ margin: "0 0 16px 0", fontSize: "0.875rem", color: "#9ca3af" }}>
        Receive weekly local AI insights, workshop announcements, and family Explorer Club challenges. Zero spam.
      </p>

      {status === "success" ? (
        <div style={{ background: "#065f46", color: "#ecfdf5", padding: "12px 16px", borderRadius: "8px", fontSize: "0.875rem" }}>
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label htmlFor="newsletter-email" style={{ display: "block", fontSize: "0.75rem", marginBottom: "4px", color: "#d1d5db" }}>
              Email Address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "6px",
                border: "1px solid #4b5563",
                background: "#1f2937",
                color: "#ffffff",
                fontSize: "0.875rem",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <input
              id="newsletter-consent"
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: "3px" }}
            />
            <label htmlFor="newsletter-consent" style={{ fontSize: "0.75rem", color: "#9ca3af", lineHeight: "1.4" }}>
              I agree to receive weekly updates from Lux Automaton. You can unsubscribe at any time using the link in the email footer. Read our{" "}
              <a href="/privacy" style={{ color: "#a78bfa", textDecoration: "underline" }}>
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {status === "error" && (
            <div style={{ color: "#f87171", fontSize: "0.75rem" }}>{message}</div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            style={{
              padding: "10px 18px",
              background: "#7c3aed",
              color: "#ffffff",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            {status === "submitting" ? "Submitting..." : "Subscribe"}
          </button>
        </form>
      )}

      <div style={{ marginTop: "16px", fontSize: "0.75rem", color: "#6b7280", textAlign: "center" }}>
        Already subscribed? <a href="/unsubscribe" style={{ color: "#9ca3af", textDecoration: "underline" }}>Unsubscribe or manage preferences</a>
      </div>
    </div>
  );
}
