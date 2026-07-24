import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

export const metadata = {
  title: "Books by Asa Spade — Lux Automaton",
  description: "Explore the published works of Asa Spade, including 'AI Business Terms for Newbies', 'Find the Problem, Be the Solution', and 'Investing in Me'. Playbooks for business operations, problem-solving, and personal transformation.",
};

const BOOKS_DATA = [
  {
    id: "ai-business-terms",
    title: "AI Business Terms for Newbies",
    subtitle: "Understanding AI Terminology & Systems",
    coverImage: "/images/book-cover-business-terms.jpg",
    description: "The essential primer for founders, managers, and builders who need to speak the language of modern AI systems without getting lost in technical jargon. Demystifies machine learning, LLMs, agents, and automation infrastructure.",
    accentColor: "var(--world-cyan)",
    accentTag: "CYAN",
    gradient: "linear-gradient(135deg, rgba(67, 230, 255, 0.15) 0%, rgba(5, 7, 17, 0.95) 100%)",
    amazonUrl: "https://www.amazon.com/AI-Business-Terms-Newbies-Understanding-ebook/dp/B0FXFHPTY9?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.qjiQRGwzjsM4uZvsfw6RYBqVAOvIV6jEAFDqD_7dPULGjHj071QN20LucGBJIEps.EWW_Rv5o7fcVX4sGZreNX7S0rhCzfKkzioQJcWc_IR4&dib_tag=AUTHOR",
    bullets: [
      "Deconstructs complex AI terms into actionable business concepts",
      "Perfect for executive decision-makers and non-technical founders",
      "Covers agentic workflows, model types, tokenomics, and prompt design",
      "Includes real-world implementation playbooks"
    ]
  },
  {
    id: "find-the-problem",
    title: "Find the Problem, Be the Solution",
    subtitle: "Operational Frameworks for Builders",
    coverImage: "/images/book-cover-problem-solution.jpg",
    description: "A tactical guide to identifying system bottlenecks, operational inefficiencies, and workflow gaps in businesses. Learn how to design solutions, build automations, and establish repeatable playbooks that scale.",
    accentColor: "#ba9cff",
    accentTag: "VIOLET",
    gradient: "linear-gradient(135deg, rgba(138, 92, 255, 0.15) 0%, rgba(5, 7, 17, 0.95) 100%)",
    amazonUrl: "https://www.amazon.com/Find-Problem-Be-Solution-Solutions-ebook/dp/B0FXPC7MXB?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.qjiQRGwzjsM4uZvsfw6RYBqVAOvIV6jEAFDqD_7dPULGjHj071QN20LucGBJIEps.EWW_Rv5o7fcVX4sGZreNX7S0rhCzfKkzioQJcWc_IR4&dib_tag=AUTHOR",
    bullets: [
      "Root-cause analysis methodologies for modern operations",
      "How to convert chaos into structured system logic",
      "Frameworks for scoping, building, and launching automations",
      "Case studies of transformation in local contractor and service models"
    ]
  },
  {
    id: "investing-in-me",
    title: "Investing in Me",
    subtitle: "Your Transformation Ticket to Money & Freedom",
    coverImage: "/images/book-cover-invest-me.jpg",
    description: "A powerful perspective shift on personal development, capital allocation, and skill acquisition. Explores why investing in your own capabilities is the highest-leverage financial decision you can make.",
    accentColor: "var(--world-mint)",
    accentTag: "MINT",
    gradient: "linear-gradient(135deg, rgba(73, 240, 173, 0.15) 0%, rgba(5, 7, 17, 0.95) 100%)",
    amazonUrl: "https://www.amazon.com/Investing-Me-Transformation-Ticket-Money-ebook/dp/B0FSHXJL9F?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.qjiQRGwzjsM4uZvsfw6RYBqVAOvIV6jEAFDqD_7dPULGjHj071QN20LucGBJIEps.EWW_Rv5o7fcVX4sGZreNX7S0rhCzfKkzioQJcWc_IR4&dib_tag=AUTHOR",
    bullets: [
      "The compound interest of compounding personal skills",
      "How to build a high-income digital skill portfolio",
      "Strategies for escaping operational plateaus",
      "Wealth-building frameworks that prioritize leverage over hours"
    ]
  }
];

export default function BooksPage() {
  return (
    <div className="lux-world">
      {/* Hero Section matching Home Page Theme */}
      <section className="world-hero" style={{ minHeight: "75vh" }}>
        <video
          className="world-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={prefixPath("/images/book-cover-business-terms.jpg")}
          aria-label="Asa's hands holding Lux Slate video"
        >
          <source src={prefixPath("/videos/books-hero-bg.mp4")} type="video/mp4" />
        </video>
        <div className="world-hero-shade" />
        <div className="world-orbit orbit-a" />
        <div className="world-orbit orbit-b" />

        <div className="world-hero-content">
          <p className="world-kicker">
            <span /> Founder Writings & System Guides
          </p>
          <h1>
            Books by Asa Spade<br />
            <em>System & Business Playbooks.</em>
          </h1>
          <p className="world-lede">
            Explore three foundational texts mapping the mindset shifts, operational frameworks, and AI terminology required to build, automate, and excel in the digital era.
          </p>
          <div className="world-actions">
            <Link
              className="world-button primary"
              href="https://www.amazon.com/stores/Asa-Spade/author/B0FXSJZW8Z/allbooks?ccs_id=38f36404-7665-4be6-a20f-64ca320170d3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Amazon Author Store <b>↗</b>
            </Link>
            <Link className="world-button ghost" href="#catalog">
              Explore Books Catalog
            </Link>
          </div>
        </div>

        <div className="world-status">
          CATALOG <span>03 TITLES</span> <i />
        </div>
      </section>

      {/* Main Books Catalog Section */}
      <section id="catalog" className="world-section">
        <div className="world-section-head">
          <div>
            <p className="world-kicker"><span /> Required Reading</p>
            <h2>The Asa Spade <em>Collection.</em></h2>
          </div>
          <Link
            href="https://www.amazon.com/stores/Asa-Spade/author/B0FXSJZW8Z/allbooks"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Amazon Store ↗
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {BOOKS_DATA.map((book, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={book.id}
                style={{
                  background: "#0c101d",
                  border: "1px solid #202a40",
                  padding: "clamp(2rem, 5vw, 4rem)",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="book-section-card"
              >
                {/* Accent Background Glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20%",
                    right: isEven ? "-10%" : "auto",
                    left: isEven ? "auto" : "-10%",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${book.accentColor}18 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(2rem, 5vw, 4rem)",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                  className="book-section-grid"
                >
                  {/* 3D CSS Interactive Book Cover Column */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      order: isEven ? 1 : 2,
                      perspective: "1000px",
                      padding: "20px 0",
                    }}
                    className="book-cover-container"
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "220px",
                        height: "330px",
                        transformStyle: "preserve-3d",
                        transform: "rotateY(-15deg) rotateX(8deg)",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                        cursor: "pointer",
                      }}
                      className="book-3d"
                    >
                      {/* Front Cover */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          border: `1px solid ${book.accentColor}44`,
                          borderRadius: "2px 8px 8px 2px",
                          transform: "translateZ(12px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                          backfaceVisibility: "hidden",
                          zIndex: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={prefixPath(book.coverImage)}
                          alt={book.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="220px"
                        />
                      </div>

                      {/* Spine Panel */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: "-22px",
                          width: "22px",
                          background: "#080b15",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRight: "none",
                          transform: "rotateY(-90deg) translateZ(0px)",
                          transformOrigin: "right center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 1,
                        }}
                      >
                        <div
                          style={{
                            transform: "rotate(90deg)",
                            whiteSpace: "nowrap",
                            fontSize: "0.55rem",
                            fontWeight: 700,
                            color: "rgba(255, 255, 255, 0.6)",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {book.title} — ASA SPADE
                        </div>
                      </div>

                      {/* Page Thickness Effect */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          right: "-10px",
                          width: "20px",
                          background: "linear-gradient(90deg, #d2d2d2 0%, #f4f4f4 50%, #b5b5b5 100%)",
                          border: "1px solid rgba(0,0,0,0.1)",
                          transform: "rotateY(90deg) translateZ(0px)",
                          transformOrigin: "left center",
                          backgroundImage: "repeating-linear-gradient(0deg, #e5e5e5, #e5e5e5 2px, #f5f5f5 2px, #f5f5f5 4px)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Details Column */}
                  <div
                    style={{
                      order: isEven ? 2 : 1,
                    }}
                    className="book-details"
                  >
                    <div
                      style={{
                        font: "700 .68rem/1.2 'JetBrains Mono', monospace",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: book.accentColor,
                        marginBottom: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>BOOK 0{index + 1}</span>
                      <span style={{ opacity: 0.3 }}>|</span>
                      <span>SYSTEM PLAYBOOK</span>
                    </div>

                    <h3
                      style={{
                        font: "800 clamp(1.8rem, 3.5vw, 2.6rem)/1.02 'Montserrat', sans-serif",
                        letterSpacing: "-.05em",
                        color: "#ffffff",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                      }}
                    >
                      {book.title}
                    </h3>
                    <div
                      style={{
                        font: "600 1rem/1.4 'Inter', sans-serif",
                        color: book.accentColor,
                        marginBottom: "20px",
                      }}
                    >
                      {book.subtitle}
                    </div>

                    <p
                      style={{
                        color: "#99a8c1",
                        fontSize: "0.98rem",
                        lineHeight: 1.75,
                        marginBottom: "26px",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {book.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginBottom: "32px",
                      }}
                    >
                      {book.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <span style={{ color: book.accentColor, fontWeight: "bold", userSelect: "none" }}>◆</span>
                          <span
                            style={{
                              fontSize: "0.88rem",
                              color: "#bfcae0",
                              lineHeight: 1.5,
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <Link
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="world-button primary"
                        style={{
                          borderColor: book.accentColor,
                        }}
                      >
                        Buy on Amazon <b>↗</b>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Author Store Banner matching Home Page Command Deck / Newsletter styling */}
      <section className="world-newsletter" style={{ marginTop: "40px" }}>
        <div>
          <p className="world-kicker"><span /> Complete Works</p>
          <h2>Access the Entire <em>Catalog.</em></h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}>
          <p style={{ color: "#99a8c1", lineHeight: 1.75, margin: 0, fontSize: "1.05rem" }}>
            All paperback and digital formats are available directly on the Amazon Author Store. Equip your team, scale your infrastructure, and refine your operational systems.
          </p>
          <Link
            href="https://www.amazon.com/stores/Asa-Spade/author/B0FXSJZW8Z/allbooks?ccs_id=38f36404-7665-4be6-a20f-64ca320170d3"
            target="_blank"
            rel="noopener noreferrer"
            className="world-button primary"
          >
            Open Amazon Author Store <b>↗</b>
          </Link>
        </div>
      </section>

      {/* Embedded style overrides for 3D tilts and mobile responsive grid */}
      <style>{`
        .book-3d:hover {
          transform: rotateY(-32deg) rotateX(12deg) translateZ(12px) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9) !important;
        }
        @media (max-width: 900px) {
          .book-section-grid {
            grid-template-columns: 1fr !important;
          }
          .book-cover-container {
            order: 1 !important;
          }
          .book-details {
            order: 2 !important;
          }
        }
      `}</style>
    </div>
  );
}
