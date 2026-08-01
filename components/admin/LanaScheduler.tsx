"use client";

import { useState, useMemo } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type PostType = "blog" | "workshop" | "app-review";
type PostStatus = "scheduled" | "published" | "draft";

interface ScheduledPost {
  id: string;
  title: string;
  type: PostType;
  status: PostStatus;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  seoScore: number; // 0-100
  bestTime: boolean;
  channel: string;
  tags: string[];
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const TYPE_META: Record<PostType, { label: string; color: string; glow: string; icon: string }> = {
  blog: {
    label: "Blog",
    color: "#00d4ff",
    glow: "rgba(0, 212, 255, 0.35)",
    icon: "✍️",
  },
  workshop: {
    label: "Workshop",
    color: "#00ffa3",
    glow: "rgba(0, 255, 163, 0.35)",
    icon: "🎓",
  },
  "app-review": {
    label: "App Review",
    color: "#ff9500",
    glow: "rgba(255, 149, 0, 0.35)",
    icon: "⭐",
  },
};

// Best times per day of week (0=Sun) — for the heatmap
const BEST_HOURS: Record<number, number[]> = {
  0: [10, 15, 20],
  1: [9, 12, 18],
  2: [9, 12, 17],
  3: [9, 12, 17],
  4: [9, 12, 18],
  5: [10, 14, 20],
  6: [11, 15, 21],
};

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Seed Data ─────────────────────────────────────────────────────────────────

function buildSeedPosts(): ScheduledPost[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const items: Array<Omit<ScheduledPost, "id">> = [
    {
      title: "10 ChatGPT Power Words for Better Answers",
      type: "blog",
      status: "published",
      date: `${year}-${String(month + 1).padStart(2, "0")}-07`,
      time: "09:00",
      seoScore: 88,
      bestTime: true,
      channel: "Lux Automaton",
      tags: ["AI", "ChatGPT", "SEO"],
    },
    {
      title: "Lux App Review: Top 5 GitHub Apps",
      type: "app-review",
      status: "published",
      date: `${year}-${String(month + 1).padStart(2, "0")}-15`,
      time: "12:00",
      seoScore: 91,
      bestTime: true,
      channel: "Lux Automaton",
      tags: ["GitHub", "Apps", "Review"],
    },
    {
      title: "Your First Video Game Workshop",
      type: "workshop",
      status: "scheduled",
      date: `${year}-${String(month + 1).padStart(2, "0")}-22`,
      time: "10:00",
      seoScore: 85,
      bestTime: true,
      channel: "Lux AI Kids",
      tags: ["Workshop", "Kids", "Game Design"],
    },
    {
      title: "Building Habits With AI Lenses",
      type: "blog",
      status: "scheduled",
      date: `${year}-${String(month + 1).padStart(2, "0")}-25`,
      time: "09:00",
      seoScore: 79,
      bestTime: false,
      channel: "Lux Automaton",
      tags: ["AI", "Habits", "Productivity"],
    },
    {
      title: "Lux App Review: Top AI Research Tools",
      type: "app-review",
      status: "draft",
      date: `${year}-${String(month + 1).padStart(2, "0")}-28`,
      time: "18:00",
      seoScore: 72,
      bestTime: false,
      channel: "Lux Automaton",
      tags: ["Research", "AI", "Apps"],
    },
  ];

  return items.map((item, i) => ({ ...item, id: `post-${i + 1}` }));
}

// ─── SEO Gauge ─────────────────────────────────────────────────────────────────

function SeoGauge({ score }: { score: number }) {
  const color = score >= 85 ? "#00ffa3" : score >= 65 ? "#00d4ff" : "#ff9500";
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="sched-seo-gauge">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dasharray 0.8s ease" }}
        />
        <text x="36" y="40" textAnchor="middle" fill={color} fontSize="13" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
          {score}
        </text>
      </svg>
      <span style={{ color }} className="sched-seo-label">SEO Score</span>
    </div>
  );
}

// ─── Best Time Heatmap ─────────────────────────────────────────────────────────

function BestTimeHeatmap() {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const intensity = (day: number, hour: number) => {
    const best = BEST_HOURS[day] ?? [];
    if (best.includes(hour)) return 1;
    if (best.some(h => Math.abs(h - hour) === 1)) return 0.5;
    return 0;
  };

  return (
    <div className="sched-heatmap-wrap">
      <h3 className="sched-section-title">⏰ Best Times to Post This Week</h3>
      <div className="sched-heatmap">
        <div className="sched-heatmap-hours">
          {hours.filter(h => h % 3 === 0).map(h => (
            <span key={h}>{h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`}</span>
          ))}
        </div>
        <div className="sched-heatmap-grid">
          {DAYS_SHORT.map((day, di) => (
            <div key={day} className="sched-heatmap-row">
              <span className="sched-heatmap-day">{day}</span>
              <div className="sched-heatmap-cells">
                {hours.map(h => {
                  const v = intensity(di, h);
                  return (
                    <div
                      key={h}
                      className="sched-heatmap-cell"
                      title={`${day} ${h}:00 — ${v === 1 ? "🔥 Best time" : v === 0.5 ? "Good time" : "Low engagement"}`}
                      style={{
                        background: v === 1
                          ? "rgba(0,255,163,0.75)"
                          : v === 0.5
                          ? "rgba(0,212,255,0.35)"
                          : "rgba(255,255,255,0.04)",
                        boxShadow: v === 1 ? "0 0 8px rgba(0,255,163,0.6)" : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="sched-heatmap-legend">
          <span><span style={{ background: "rgba(0,255,163,0.75)", boxShadow: "0 0 8px rgba(0,255,163,0.5)" }} />🔥 Best time</span>
          <span><span style={{ background: "rgba(0,212,255,0.35)" }} />Good</span>
          <span><span style={{ background: "rgba(255,255,255,0.06)" }} />Low</span>
        </div>
      </div>
    </div>
  );
}

// ─── Animated Bar Chart ─────────────────────────────────────────────────────────

function PostVolumeChart({ posts }: { posts: ScheduledPost[] }) {
  const counts = useMemo(() => {
    const map: Record<PostType, number> = { blog: 0, workshop: 0, "app-review": 0 };
    posts.forEach(p => { map[p.type] = (map[p.type] || 0) + 1; });
    return map;
  }, [posts]);

  const max = Math.max(...Object.values(counts), 1);

  return (
    <div className="sched-chart-wrap">
      <h3 className="sched-section-title">📊 Content Volume This Month</h3>
      <div className="sched-bar-chart">
        {(Object.entries(counts) as [PostType, number][]).map(([type, count]) => {
          const meta = TYPE_META[type];
          const pct = (count / max) * 100;
          return (
            <div key={type} className="sched-bar-item">
              <span className="sched-bar-label">{meta.icon} {meta.label}</span>
              <div className="sched-bar-track">
                <div
                  className="sched-bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${meta.color}99, ${meta.color})`,
                    boxShadow: `0 0 12px ${meta.glow}`,
                  }}
                />
              </div>
              <span className="sched-bar-count" style={{ color: meta.color }}>{count} post{count !== 1 ? "s" : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── LANA Auto Panel ───────────────────────────────────────────────────────────

function LanaAutoPanel({
  posts,
  onAutoSchedule,
}: {
  posts: ScheduledPost[];
  onAutoSchedule: () => void;
}) {
  const scheduled = posts.filter(p => p.status === "scheduled").length;
  const published = posts.filter(p => p.status === "published").length;
  const total = posts.length;
  const daily = 4;
  const weekly = daily * 7;
  const threshold = 28; // 4/day × 7 days

  const pct = Math.min((total / threshold) * 100, 100);
  const thresholdMet = total >= threshold;

  return (
    <div className="sched-lana-panel">
      <div className="sched-lana-avatar">
        <div className="sched-lana-orb" />
        <span>L</span>
      </div>
      <div className="sched-lana-content">
        <div className="sched-lana-head">
          <h3>LANA Auto-Scheduler</h3>
          <span className={`sched-lana-badge ${thresholdMet ? "active" : ""}`}>
            {thresholdMet ? "🟢 Year Auto-Mode Active" : "⚡ Building Queue"}
          </span>
        </div>
        <p className="sched-lana-desc">
          {thresholdMet
            ? "Threshold met — LANA will auto-schedule posts for the full year using peak engagement windows."
            : `Build up to ${threshold} posts to unlock full-year auto-scheduling. LANA targets ${daily} posts/day × 7 days/week.`}
        </p>
        <div className="sched-lana-progress">
          <div className="sched-lana-bar">
            <div
              className="sched-lana-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span>{total}/{threshold} posts — {Math.round(pct)}% to annual auto-schedule</span>
        </div>
        <div className="sched-lana-stats">
          <div><strong style={{ color: "#00d4ff" }}>{published}</strong><small>Published</small></div>
          <div><strong style={{ color: "#00ffa3" }}>{scheduled}</strong><small>Scheduled</small></div>
          <div><strong style={{ color: "#ff9500" }}>{daily}</strong><small>Target / Day</small></div>
          <div><strong style={{ color: "#6c47ff" }}>{weekly}</strong><small>Target / Week</small></div>
        </div>
        <button className="sched-lana-btn" onClick={onAutoSchedule}>
          <span>✨</span>
          {thresholdMet ? "LANA: Optimize Full-Year Schedule" : "LANA: Fill Best Time Slots"}
        </button>
      </div>
    </div>
  );
}

// ─── Post Detail Modal ─────────────────────────────────────────────────────────

function PostModal({ post, onClose }: { post: ScheduledPost; onClose: () => void }) {
  const meta = TYPE_META[post.type];
  return (
    <div className="sched-modal-overlay" onClick={onClose}>
      <div className="sched-modal" onClick={e => e.stopPropagation()}>
        <button className="sched-modal-close" onClick={onClose}>✕</button>
        <div className="sched-modal-type" style={{ color: meta.color, borderColor: meta.color }}>
          {meta.icon} {meta.label}
        </div>
        <h2 className="sched-modal-title">{post.title}</h2>
        <div className="sched-modal-meta">
          <span>📅 {post.date}</span>
          <span>⏰ {post.time}</span>
          <span>📡 {post.channel}</span>
        </div>
        <div className="sched-modal-row">
          <SeoGauge score={post.seoScore} />
          <div className="sched-modal-details">
            <div className="sched-modal-stat">
              <span>Status</span>
              <strong style={{ color: post.status === "published" ? "#00ffa3" : post.status === "scheduled" ? "#00d4ff" : "#ff9500" }}>
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </strong>
            </div>
            <div className="sched-modal-stat">
              <span>Best Time</span>
              <strong style={{ color: post.bestTime ? "#00ffa3" : "#ff9500" }}>
                {post.bestTime ? "✅ Optimal" : "⚠️ Suboptimal"}
              </strong>
            </div>
            <div className="sched-modal-stat">
              <span>Tags</span>
              <div className="sched-modal-tags">
                {post.tags.map(t => <span key={t} className="sched-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
        {!post.bestTime && (
          <div className="sched-modal-tip">
            💡 <strong>LANA suggests:</strong> Move to {BEST_HOURS[new Date(post.date).getDay()]?.[0] ?? 9}:00 for better reach.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Calendar ─────────────────────────────────────────────────────────────

export default function LanaScheduler() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [posts] = useState<ScheduledPost[]>(buildSeedPosts);
  const [selected, setSelected] = useState<ScheduledPost | null>(null);
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [lanaMsg, setLanaMsg] = useState<string | null>(null);

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const dateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const postsForDay = (day: number) =>
    posts.filter(p => p.date === dateStr(day) && (filter === "all" || p.type === filter));

  const handleAutoSchedule = () => {
    setLanaMsg(
      `✨ LANA has optimized your schedule. ${posts.length} posts aligned to peak engagement windows across Lux Automaton and Lux AI Kids channels.`
    );
    setTimeout(() => setLanaMsg(null), 5000);
  };

  const filteredPosts = filter === "all" ? posts : posts.filter(p => p.type === filter);

  return (
    <div className="sched-world">
      {/* Header */}
      <div className="sched-header">
        <div>
          <p className="sched-eyebrow">LANA Content Intelligence</p>
          <h1 className="sched-title">Content Scheduler</h1>
          <p className="sched-subtitle">Color-coded posts · SEO analytics · LANA auto-scheduling</p>
        </div>
        <div className="sched-filters">
          {(["all", "blog", "workshop", "app-review"] as const).map(f => (
            <button
              key={f}
              className={`sched-filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
              style={filter === f && f !== "all" ? {
                borderColor: TYPE_META[f as PostType]?.color,
                color: TYPE_META[f as PostType]?.color,
                boxShadow: `0 0 12px ${TYPE_META[f as PostType]?.glow}`,
              } : {}}
            >
              {f === "all" ? "🗓 All" : `${TYPE_META[f as PostType].icon} ${TYPE_META[f as PostType].label}`}
            </button>
          ))}
        </div>
      </div>

      {/* LANA Toast */}
      {lanaMsg && (
        <div className="sched-lana-toast">
          <span>✨</span> {lanaMsg}
        </div>
      )}

      {/* LANA Panel */}
      <LanaAutoPanel posts={posts} onAutoSchedule={handleAutoSchedule} />

      {/* Calendar + Heatmap Row */}
      <div className="sched-main-row">
        {/* Calendar */}
        <div className="sched-calendar-wrap">
          <div className="sched-cal-nav">
            <button onClick={() => {
              if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
              else setViewMonth(m => m - 1);
            }}>‹</button>
            <span>{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={() => {
              if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
              else setViewMonth(m => m + 1);
            }}>›</button>
          </div>
          <div className="sched-cal-days-header">
            {DAYS_SHORT.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="sched-cal-grid">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="sched-cal-cell empty" />;
              const dayPosts = postsForDay(day);
              const isToday =
                day === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear();
              return (
                <div key={day} className={`sched-cal-cell ${isToday ? "today" : ""} ${dayPosts.length ? "has-posts" : ""}`}>
                  <span className="sched-cal-num">{day}</span>
                  <div className="sched-cal-dots">
                    {dayPosts.slice(0, 3).map(p => (
                      <button
                        key={p.id}
                        className="sched-cal-dot"
                        onClick={() => setSelected(p)}
                        title={p.title}
                        style={{
                          background: TYPE_META[p.type].color,
                          boxShadow: `0 0 6px ${TYPE_META[p.type].glow}`,
                        }}
                      />
                    ))}
                    {dayPosts.length > 3 && (
                      <span className="sched-cal-more">+{dayPosts.length - 3}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="sched-cal-legend">
            {(Object.entries(TYPE_META) as [PostType, typeof TYPE_META[PostType]][]).map(([type, meta]) => (
              <span key={type} className="sched-legend-item">
                <span style={{ background: meta.color, boxShadow: `0 0 6px ${meta.glow}` }} />
                {meta.label}
              </span>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <BestTimeHeatmap />
      </div>

      {/* Charts row */}
      <div className="sched-charts-row">
        <PostVolumeChart posts={filteredPosts} />

        {/* Upcoming posts list */}
        <div className="sched-upcoming-wrap">
          <h3 className="sched-section-title">📋 Upcoming Posts</h3>
          <div className="sched-upcoming-list">
            {filteredPosts
              .filter(p => p.status !== "published")
              .sort((a, b) => a.date.localeCompare(b.date))
              .slice(0, 8)
              .map(p => {
                const meta = TYPE_META[p.type];
                return (
                  <button key={p.id} className="sched-upcoming-item" onClick={() => setSelected(p)}>
                    <span className="sched-upcoming-icon" style={{ color: meta.color }}>{meta.icon}</span>
                    <div className="sched-upcoming-info">
                      <span className="sched-upcoming-title">{p.title}</span>
                      <span className="sched-upcoming-date">{p.date} · {p.time} · {p.channel}</span>
                    </div>
                    <div className="sched-upcoming-right">
                      <span
                        className="sched-status-badge"
                        style={{
                          color: p.status === "scheduled" ? "#00d4ff" : "#ff9500",
                          borderColor: p.status === "scheduled" ? "#00d4ff44" : "#ff950044",
                        }}
                      >
                        {p.status}
                      </span>
                      <span
                        className="sched-seo-mini"
                        style={{ color: p.seoScore >= 85 ? "#00ffa3" : p.seoScore >= 65 ? "#00d4ff" : "#ff9500" }}
                      >
                        SEO {p.seoScore}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
