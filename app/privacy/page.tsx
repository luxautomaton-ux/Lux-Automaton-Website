import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px 100px", color: "#eef2ff" }}>
      <p style={{ color: "#43e6ff", fontWeight: 800, letterSpacing: "0.12em", fontSize: 12 }}>LUX AUTOMATON</p>
      <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", margin: "8px 0 24px" }}>Privacy</h1>
      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        Lux Automaton uses only the information needed to operate requested website features. Newsletter signup stores the email
        address you provide, the consent-language version, signup source, subscription status, and timestamps. Newsletter records
        are stored in the private Lux Supabase backend and are not exposed through the public browser database role.
      </p>
      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        We do not sell subscriber information. Payment information, when live checkout is activated, is processed by the payment
        provider rather than stored as raw card data by Lux Automaton. Internal infrastructure records, billing configuration,
        and founder cost data are restricted from anonymous website access.
      </p>
      <p style={{ color: "#9ca3af", lineHeight: 1.8 }}>
        You can unsubscribe using the manage link included with newsletter delivery once email delivery is enabled. Until then,
        joining the list only records your subscription preference; it does not activate a paid service.
      </p>
      <p style={{ color: "#6b7280", marginTop: 32, fontSize: 14 }}>Last updated: October 2, 2026.</p>
      <Link href="/" style={{ display: "inline-block", marginTop: 28, color: "#8befff" }}>← Back to Lux Automaton</Link>
    </main>
  );
}
