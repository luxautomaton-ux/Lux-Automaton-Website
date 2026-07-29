export default function ChatCTA() {
  return (
    <div style={{ textAlign: "center", padding: "40px 16px" }}>
      <a href="/chat/" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "linear-gradient(135deg, var(--lux-cyan), var(--lux-mint))",
        color: "#0b0f19",
        padding: "14px 28px",
        borderRadius: "12px",
        fontWeight: 700,
        fontSize: "1rem",
        textDecoration: "none",
        boxShadow: "0 4px 20px rgba(0, 229, 255, 0.3)",
      }}>
        Chat with LANA →
      </a>
    </div>
  );
}
