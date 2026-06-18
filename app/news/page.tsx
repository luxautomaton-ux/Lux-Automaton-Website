"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_STORIES } from "@/lib/news";
import { prefixPath } from "@/lib/prefix";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "News", "Insights", "Product Launch", "Case Study"];
  const sources = ["All", "Founder Insight", "Company Update"];

  // Filter logic
  const filteredStories = NEWS_STORIES.filter((story) => {
    const matchesCategory =
      selectedCategory === "All" || story.category === selectedCategory;
    const matchesSource =
      selectedSource === "All" || story.source === selectedSource;
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSource && matchesSearch;
  });

  // Featured story
  const featuredStory = NEWS_STORIES.find((story) => story.featured);

  // Filtered stories excluding the featured one if it matches filters
  const gridStories = filteredStories.filter((story) => story.slug !== featuredStory?.slug);

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh", background: "var(--bg-void)" }} className="circuit-grid">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: "60px", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--cyan)",
                boxShadow: "0 0 6px var(--cyan)",
              }}
            />
            LUX DISPATCH // THE FRONTIER
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.05,
              marginBottom: "20px",
            }}
          >
            News &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--green) 0%, var(--cyan) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Insights
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.20rem)",
              color: "var(--text-secondary)",
              maxWidth: "680px",
              lineHeight: 1.6,
            }}
          >
            Real updates from our private AI deployments. Follow technical case studies, product launches, and strategic insights from our builders.
          </p>
        </div>

        {/* Featured Story - Asymmetric Split Hero */}
        {featuredStory && selectedCategory === "All" && selectedSource === "All" && searchQuery === "" && (
          <div
            style={{
              boxShadow: "0 0 30px rgba(0, 229, 255, 0.05)",
            }}
            className="glass-card grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 mb-20 p-8 relative z-10"
          >
            {/* Featured Image */}
            <div style={{ position: "relative", minHeight: "350px", borderRadius: "12px", overflow: "hidden" }} className="w-full">
              <Image
                src={prefixPath(featuredStory.image)}
                alt={featuredStory.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  background: "var(--green)",
                  color: "#000",
                  fontWeight: 900,
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  padding: "5px 14px",
                  borderRadius: "4px",
                  boxShadow: "0 0 10px rgba(0,255,136,0.3)",
                }}
              >
                FEATURED
              </div>
            </div>

            {/* Featured Content */}
            <div className="flex flex-col justify-center">
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--cyan)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {featuredStory.category}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{featuredStory.date}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: "rgba(0, 229, 255, 0.1)",
                    color: "var(--cyan)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 229, 255, 0.2)",
                  }}
                >
                  {featuredStory.source}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  marginBottom: "16px",
                }}
              >
                <Link href={`/news/${featuredStory.slug}`} className="hover:text-[var(--cyan)] transition-colors">
                  {featuredStory.title}
                </Link>
              </h2>

              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  fontSize: "1.05rem",
                  marginBottom: "28px",
                }}
              >
                {featuredStory.summary}
              </p>

              {/* Author & Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-5">
                {/* Author Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ position: "relative", width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                    <Image
                      src={prefixPath(featuredStory.author.image)}
                      alt={featuredStory.author.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>{featuredStory.author.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{featuredStory.author.role}</div>
                  </div>
                </div>

                {/* Social engagement */}
                <div className="flex items-center gap-4 text-[0.85rem] text-[var(--text-secondary)]">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    👍 {featuredStory.likes}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    💬 {featuredStory.comments}
                  </span>
                  <Link
                    href={`/news/${featuredStory.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(0, 229, 255, 0.1)",
                      border: "1px solid var(--cyan)",
                      color: "var(--text-primary)",
                      padding: "8px 20px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    className="hover:bg-[var(--cyan)] hover:text-black"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Layout - Asymmetric 70/30 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.1fr_1fr] gap-10 relative z-10">
          
          {/* Left Panel: Filter & Main Grid */}
          <div>
            
            {/* Filter Bar Controls */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginBottom: "40px",
                padding: "20px",
              }}
              className="glass-card"
            >
              {/* Search */}
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  placeholder="Search articles, stories, insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(2,4,8,0.6)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                  className="focus:border-[var(--cyan)] focus:shadow-[0_0_15px_var(--cyan-glow)] transition-all"
                />
              </div>

              {/* Categories */}
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "8px", textTransform: "uppercase" }}>Category</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        background: selectedCategory === cat ? "var(--cyan)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${selectedCategory === cat ? "var(--cyan)" : "var(--border-subtle)"}`,
                        color: selectedCategory === cat ? "#000" : "var(--text-secondary)",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      className={selectedCategory !== cat ? "hover:border-[var(--cyan)] hover:text-white" : ""}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "8px", textTransform: "uppercase" }}>Feed Source</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {sources.map((src) => (
                    <button
                      key={src}
                      onClick={() => setSelectedSource(src)}
                      style={{
                        background: selectedSource === src ? "var(--cyan)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${selectedSource === src ? "var(--cyan)" : "var(--border-subtle)"}`,
                        color: selectedSource === src ? "#000" : "var(--text-secondary)",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      className={selectedSource !== src ? "hover:border-[var(--cyan)] hover:text-white" : ""}
                    >
                      {src === "All" ? "ALL SOURCES" : src.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            {gridStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {gridStories.map((story) => (
                  <article
                    key={story.slug}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                    className="glass-card"
                  >
                    {/* Card Image */}
                    <div style={{ position: "relative", height: "200px", width: "100%" }}>
                      <Image
                        src={prefixPath(story.image)}
                        alt={story.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "rgba(2,4,8,0.85)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-secondary)",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {story.date}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "var(--cyan)",
                            textTransform: "uppercase",
                          }}
                        >
                          {story.category}
                        </span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            background: "rgba(0, 229, 255, 0.08)",
                            color: "var(--text-secondary)",
                            padding: "1px 6px",
                            borderRadius: "4px",
                            border: "1px solid rgba(0, 229, 255, 0.15)",
                          }}
                        >
                          {story.source}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: 800,
                          color: "var(--text-primary)",
                          lineHeight: 1.3,
                          marginBottom: "12px",
                        }}
                      >
                        <Link href={`/news/${story.slug}`} className="hover:text-[var(--cyan)] transition-colors">
                          {story.title}
                        </Link>
                      </h3>

                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.92rem",
                          lineHeight: 1.6,
                          marginBottom: "20px",
                          flex: 1,
                        }}
                      >
                        {story.summary}
                      </p>

                      {/* Footer Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "16px",
                          borderTop: "1px solid rgba(255,255,255,0.05)",
                          fontSize: "0.8rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ position: "relative", width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden" }}>
                            <Image
                              src={prefixPath(story.author.image)}
                              alt={story.author.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{story.author.name}</span>
                        </div>

                        {/* Social engagement */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-muted)" }}>
                          <span>👍 {story.likes}</span>
                          <span>💬 {story.comments}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: "60px",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                }}
                className="glass-card"
              >
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🔍</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>No Articles Found</h3>
                <p>We couldn&apos;t find any posts matching your active search or filters. Try adjusting your selections.</p>
              </div>
            )}
          </div>

          {/* Right Panel: Social feed stream & Bio */}
          <div className="w-full">
            {/* Social Stream widget */}
            <div
              style={{
                padding: "24px",
                marginBottom: "30px",
              }}
              className="glass-card lg:sticky lg:top-[100px]"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.15em", color: "var(--text-primary)", textTransform: "uppercase" }}>
                  🏢 COMPANY DISPATCH
                </h3>
                <a
                  href="https://www.linkedin.com/company/lux-automaton-saas/posts/?feedView=all&viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--cyan)",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                  className="hover:underline"
                >
                  Follow ↗
                </a>
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "20px" }}>
                Real-time updates from our official LinkedIn company channel. Stay updated on enterprise deployments.
              </p>

              {/* Small updates stream */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {NEWS_STORIES.filter((s) => s.source === "Company Update").slice(0, 3).map((item) => (
                  <div
                    key={item.slug}
                    style={{
                      padding: "16px",
                      background: "rgba(2,4,8,0.4)",
                      borderRadius: "8px",
                      borderLeft: "2px solid var(--cyan)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "8px" }}>
                      <span>{item.date}</span>
                      <span>👍 {item.likes}</span>
                    </div>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px", lineHeight: 1.3 }}>
                      <Link href={`/news/${item.slug}`} className="hover:underline">
                        {item.title}
                      </Link>
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4, margin: 0 }}>
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Founder connection */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "24px", paddingTop: "20px" }}>
                <h4 style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                  CONNECT WITH FOUNDERS
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <a
                    href="https://www.linkedin.com/in/asapritchard/recent-activity/all/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border-subtle)",
                      fontSize: "0.85rem",
                      color: "var(--text-primary)",
                      transition: "all 0.2s ease",
                    }}
                    className="hover:border-[var(--cyan)] hover:bg-[rgba(0,229,255,0.02)]"
                  >
                    <div style={{ position: "relative", width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden" }}>
                      <Image
                        src={prefixPath("/images/founder-asa.png")}
                        alt="Asa Spade"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>Asa Spade</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Founder activity ↗</div>
                    </div>
                  </a>
                  
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border-subtle)",
                      fontSize: "0.85rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div style={{ position: "relative", width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden" }}>
                      <Image
                        src={prefixPath("/images/partner-torrey.png")}
                        alt="Dr. Torrey Dooley"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>Dr. Torrey Dooley</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>System Partner</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
