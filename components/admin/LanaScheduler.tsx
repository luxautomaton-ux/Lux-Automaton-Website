"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BEST_HOURS,
  getPosts,
  publishPostNow,
  removePost,
  scheduleWorkshop,
  subscribe,
  suggestBestTime,
  type PostType,
  type ScheduledPost,
} from "@/lib/scheduleStore";
import { fetchWorkshops, type WorkshopRow } from "@/lib/workshopDb";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getPostCountdown(dateStr: string, timeStr: string, status: string) {
  if (status === "published") return { type: "published", label: "🚀 Published Live" };
  const target = new Date(`${dateStr}T${timeStr}:00`);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours}h`);
    parts.push(`${mins}m`);
    parts.push(`${secs}s`);
    return { type: "future", label: `⏳ Launches in ${parts.join(" ")}` };
  } else {
    const pastDiff = Math.abs(diff);
    const hours = Math.floor(pastDiff / (1000 * 60 * 60));
    const mins = Math.floor((pastDiff % (1000 * 60 * 60)) / (1000 * 60));
    return {
      type: "overdue",
      label: `⚠️ Scheduled for ${timeStr} (Overdue by ${hours > 0 ? `${hours}h ` : ""}${mins}m — Ready to Publish)`,
    };
  }
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const TYPE_META: Record<PostType, { label: string; color: string; glow: string; icon: string }> = {
  blog:         { label: "Blog",       color: "#00d4ff", glow: "rgba(0,212,255,0.35)",  icon: "✍️" },
  workshop:     { label: "Workshop",   color: "#00ffa3", glow: "rgba(0,255,163,0.35)",  icon: "🎓" },
  "app-review": { label: "App Review", color: "#ff9500", glow: "rgba(255,149,0,0.35)", icon: "⭐" },
};

const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── SEO Gauge ─────────────────────────────────────────────────────────────────

function SeoGauge({ score }: { score: number }) {
  const color = score >= 85 ? "#00ffa3" : score >= 65 ? "#00d4ff" : "#ff9500";
  const r = 28, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  return (
    <div className="sched-seo-gauge">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dasharray 0.8s ease" }} />
        <text x="36" y="40" textAnchor="middle" fill={color} fontSize="13" fontWeight="700" fontFamily="'JetBrains Mono',monospace">{score}</text>
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
            <span key={h}>{h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h-12}p`}</span>
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
                    <div key={h} className="sched-heatmap-cell"
                      title={`${day} ${h}:00 — ${v===1?"🔥 Best time":v===0.5?"Good time":"Low engagement"}`}
                      style={{
                        background: v===1?"rgba(0,255,163,0.75)":v===0.5?"rgba(0,212,255,0.35)":"rgba(255,255,255,0.04)",
                        boxShadow: v===1?"0 0 8px rgba(0,255,163,0.6)":"none",
                      }} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="sched-heatmap-legend">
          <span><span style={{background:"rgba(0,255,163,0.75)",boxShadow:"0 0 8px rgba(0,255,163,0.5)"}} />🔥 Best time</span>
          <span><span style={{background:"rgba(0,212,255,0.35)"}} />Good</span>
          <span><span style={{background:"rgba(255,255,255,0.06)"}} />Low</span>
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
                <div className="sched-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${meta.color}99,${meta.color})`, boxShadow: `0 0 12px ${meta.glow}` }} />
              </div>
              <span className="sched-bar-count" style={{ color: meta.color }}>{count} post{count !== 1 ? "s" : ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Schedule Workshop Quick-Panel ─────────────────────────────────────────────

function ScheduleWorkshopPanel({ onScheduled }: { onScheduled: () => void }) {
  const [workshops, setWorkshops] = useState<WorkshopRow[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [date, setDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });
  const [time, setTime] = useState(() => suggestBestTime(new Date(Date.now() + 3*86400000).toISOString().slice(0,10)));
  const [channel, setChannel] = useState<"Lux Automaton" | "Lux AI Kids">("Lux Automaton");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops(false)
      .then(data => { setWorkshops(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Auto-suggest best time when date changes
  useEffect(() => { setTime(suggestBestTime(date)); }, [date]);

  const selected = workshops.find(w => w.id === selectedId);

  const handleSchedule = () => {
    if (!selectedId || !selected) { setMsg("Pick a workshop first."); return; }
    if (!date) { setMsg("Choose a publish date."); return; }
    scheduleWorkshop({
      workshopId: selected.id,
      title: selected.title,
      slug: selected.slug,
      channel,
      date,
      time,
      tags: ["Workshop", selected.audience, selected.level],
    });
    setMsg(`✅ "${selected.title}" scheduled for ${date} at ${time}.`);
    onScheduled();
  };

  return (
    <div className="sched-workshop-panel">
      <h3 className="sched-section-title">🎓 Schedule a Workshop Post</h3>
      {loading ? (
        <p className="sched-empty">Loading workshops from Supabase…</p>
      ) : workshops.length === 0 ? (
        <p className="sched-empty">No workshops found. Create one in Workshop Studio first.</p>
      ) : (
        <div className="sched-ws-form">
          <div className="sched-ws-row">
            <label className="sched-ws-label">
              Workshop
              <select
                value={selectedId}
                onChange={e => setSelectedId(Number(e.target.value) || "")}
                className="sched-ws-select"
              >
                <option value="">— Choose a workshop —</option>
                {workshops.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.title} · {w.status} · {w.audience}
                  </option>
                ))}
              </select>
            </label>
            <label className="sched-ws-label">
              Channel
              <select
                value={channel}
                onChange={e => setChannel(e.target.value as typeof channel)}
                className="sched-ws-select"
              >
                <option>Lux Automaton</option>
                <option>Lux AI Kids</option>
              </select>
            </label>
          </div>
          <div className="sched-ws-row">
            <label className="sched-ws-label">
              Publish Date
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="sched-ws-input" />
            </label>
            <label className="sched-ws-label">
              Publish Time
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="sched-ws-input" />
              <small className="sched-ws-hint">
                {time === suggestBestTime(date) ? "🔥 LANA best time" : `💡 LANA suggests ${suggestBestTime(date)}`}
              </small>
            </label>
          </div>
          {selected && (
            <div className="sched-ws-preview">
              <span className="sched-ws-preview-type">🎓 Workshop</span>
              <strong>{selected.title}</strong>
              <span>{selected.audience} · {selected.level} · {selected.duration}</span>
            </div>
          )}
          <div className="sched-ws-actions">
            <button className="sched-lana-btn" onClick={handleSchedule}>
              <span>📅</span> Schedule Post
            </button>
            {msg && <span className={`sched-ws-msg ${msg.startsWith("✅") ? "ok" : "err"}`}>{msg}</span>}
          </div>
        </div>
      )}
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
  const daily = 4, weekly = daily * 7, threshold = 28;
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
          <div className="sched-lana-bar"><div className="sched-lana-fill" style={{ width: `${pct}%` }} /></div>
          <span>{total}/{threshold} posts — {Math.round(pct)}% to annual auto-schedule</span>
        </div>
        <div className="sched-lana-stats">
          <div><strong style={{color:"#00d4ff"}}>{published}</strong><small>Published</small></div>
          <div><strong style={{color:"#00ffa3"}}>{scheduled}</strong><small>Scheduled</small></div>
          <div><strong style={{color:"#ff9500"}}>{daily}</strong><small>Target / Day</small></div>
          <div><strong style={{color:"#6c47ff"}}>{weekly}</strong><small>Target / Week</small></div>
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

function PostModal({
  post,
  onClose,
  onDelete,
  onPublishNow,
}: {
  post: ScheduledPost;
  onClose: () => void;
  onDelete: (id: string) => void;
  onPublishNow: (id: string, title: string) => void;
}) {
  const meta = TYPE_META[post.type];
  const countdown = getPostCountdown(post.date, post.time, post.status);

  return (
    <div className="sched-modal-overlay" onClick={onClose}>
      <div className="sched-modal" onClick={e => e.stopPropagation()}>
        <button className="sched-modal-close" onClick={onClose}>✕</button>
        <div className="sched-modal-type" style={{ color: meta.color, borderColor: meta.color }}>{meta.icon} {meta.label}</div>
        <h2 className="sched-modal-title">{post.title}</h2>
        <div className="sched-modal-meta">
          <span>📅 {post.date}</span>
          <span>⏰ {post.time}</span>
          <span>📡 {post.channel}</span>
          {post.slug && <span>🔗 /{post.slug}</span>}
        </div>

        {/* Live Countdown Badge */}
        <div style={{
          padding: "10px 16px",
          borderRadius: "8px",
          background: countdown.type === "published" ? "rgba(0,255,163,0.12)" : countdown.type === "overdue" ? "rgba(255,149,0,0.15)" : "rgba(0,212,255,0.12)",
          border: `1px solid ${countdown.type === "published" ? "rgba(0,255,163,0.3)" : countdown.type === "overdue" ? "rgba(255,149,0,0.4)" : "rgba(0,212,255,0.3)"}`,
          color: countdown.type === "published" ? "#00ffa3" : countdown.type === "overdue" ? "#ff9500" : "#00d4ff",
          fontWeight: 700,
          fontSize: "0.85rem",
          margin: "12px 0 20px"
        }}>
          {countdown.label}
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
        {post.type === "workshop" && post.slug && (
          <div className="sched-modal-tip" style={{ borderColor: "rgba(0,255,163,0.25)", background: "rgba(0,255,163,0.06)", color: "#00ffa3" }}>
            🔗 Live at <strong>/workshops?workshop={post.slug}</strong>
          </div>
        )}
        
        <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
          {post.status !== "published" && (
            <button
              onClick={() => {
                onPublishNow(post.id, post.title);
                onClose();
              }}
              style={{
                flex: 1,
                padding: "12px 20px",
                background: "#00ffa3",
                color: "#000000",
                fontWeight: 800,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 0 16px rgba(0, 255, 163, 0.4)",
              }}
            >
              🚀 Post Now (Publish Live)
            </button>
          )}

          {post.status !== "published" && (
            <button
              className="sched-modal-delete"
              onClick={() => { onDelete(post.id); onClose(); }}
              style={{ margin: 0 }}
            >
              🗑 Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Calendar ─────────────────────────────────────────────────────────────

export default function LanaScheduler() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [posts, setPosts] = useState<ScheduledPost[]>(getPosts);
  const [selected, setSelected] = useState<ScheduledPost | null>(null);
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [lanaMsg, setLanaMsg] = useState<string | null>(null);
  const [showSchedulePanel, setShowSchedulePanel] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Subscribe to shared store
  useEffect(() => subscribe(setPosts), []);

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const dateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const postsForDay = (day: number) =>
    posts.filter(p => p.date === dateStr(day) && (filter === "all" || p.type === filter));

  const filteredPosts = filter === "all" ? posts : posts.filter(p => p.type === filter);

  const handleAutoSchedule = () => {
    setLanaMsg(`✨ LANA optimized your schedule — ${posts.length} posts aligned to peak engagement windows.`);
    setTimeout(() => setLanaMsg(null), 5000);
  };

  const handleDelete = (id: string) => removePost(id);

  const handlePublishNow = (id: string, title: string) => {
    publishPostNow(id);
    setLanaMsg(`🚀 "${title}" has been published live!`);
    setTimeout(() => setLanaMsg(null), 5000);
  };

  return (
    <div className="sched-world">
      {/* Header */}
      <div className="sched-header">
        <div>
          <p className="sched-eyebrow">LANA Content Intelligence</p>
          <h1 className="sched-title">Content Scheduler</h1>
          <p className="sched-subtitle">Color-coded posts · SEO analytics · LANA auto-scheduling · Workshop integration</p>
        </div>
        <div className="sched-filters">
          {(["all","blog","workshop","app-review"] as const).map(f => (
            <button key={f}
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
          <button
            className={`sched-filter-btn ${showSchedulePanel ? "active" : ""}`}
            style={showSchedulePanel ? { borderColor: "#00ffa3", color: "#00ffa3", boxShadow: "0 0 12px rgba(0,255,163,0.35)" } : {}}
            onClick={() => setShowSchedulePanel(v => !v)}
          >
            📅 Schedule Workshop
          </button>
        </div>
      </div>

      {/* PST System Time & Launch Clock Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0, 212, 255, 0.07)",
          border: "1px solid rgba(0, 212, 255, 0.25)",
          borderRadius: "12px",
          padding: "16px 24px",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "1.6rem" }}>🕒</span>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00d4ff" }}>
              PST System Time &amp; Launch Engine
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffffff", fontFamily: "'JetBrains Mono', monospace" }}>
              {now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" })} PST
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500, marginLeft: "12px" }}>
                {now.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles", weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Auto-publishing Queue</div>
            <strong style={{ color: "#00ffa3", fontSize: "0.95rem" }}>
              {posts.filter((p) => p.status === "scheduled").length} Scheduled Posts
            </strong>
          </div>
        </div>
      </div>

      {/* LANA Toast */}
      {lanaMsg && (
        <div className="sched-lana-toast"><span>✨</span> {lanaMsg}</div>
      )}

      {/* Schedule Workshop Panel */}
      {showSchedulePanel && (
        <ScheduleWorkshopPanel onScheduled={() => setShowSchedulePanel(false)} />
      )}

      {/* LANA Panel */}
      <LanaAutoPanel posts={posts} onAutoSchedule={handleAutoSchedule} />

      {/* Calendar + Heatmap */}
      <div className="sched-main-row">
        <div className="sched-calendar-wrap">
          <div className="sched-cal-nav">
            <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); } else setViewMonth(m => m-1); }}>‹</button>
            <span>{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1); } else setViewMonth(m => m+1); }}>›</button>
          </div>
          <div className="sched-cal-days-header">
            {DAYS_SHORT.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="sched-cal-grid">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="sched-cal-cell empty" />;
              const dayPosts = postsForDay(day);
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              return (
                <div key={day} className={`sched-cal-cell ${isToday ? "today" : ""} ${dayPosts.length ? "has-posts" : ""}`}>
                  <span className="sched-cal-num">{day}</span>
                  <div className="sched-cal-dots">
                    {dayPosts.slice(0, 3).map(p => (
                      <button key={p.id} className="sched-cal-dot" onClick={() => setSelected(p)} title={p.title}
                        style={{ background: TYPE_META[p.type].color, boxShadow: `0 0 6px ${TYPE_META[p.type].glow}` }} />
                    ))}
                    {dayPosts.length > 3 && <span className="sched-cal-more">+{dayPosts.length - 3}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sched-cal-legend">
            {(Object.entries(TYPE_META) as [PostType, typeof TYPE_META[PostType]][]).map(([type, meta]) => (
              <span key={type} className="sched-legend-item">
                <span style={{ background: meta.color, boxShadow: `0 0 6px ${meta.glow}` }} />
                {meta.label}
              </span>
            ))}
          </div>
        </div>
        <BestTimeHeatmap />
      </div>

      {/* Charts */}
      <div className="sched-charts-row">
        <PostVolumeChart posts={filteredPosts} />
        <div className="sched-upcoming-wrap">
          <h3 className="sched-section-title">📋 Upcoming Posts</h3>
          <div className="sched-upcoming-list">
            {filteredPosts
              .filter(p => p.status !== "published")
              .sort((a, b) => a.date.localeCompare(b.date))
              .slice(0, 8)
              .map(p => {
                const meta = TYPE_META[p.type];
                const countdown = getPostCountdown(p.date, p.time, p.status);
                return (
                  <div
                    key={p.id}
                    className="sched-upcoming-item"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", width: "100%", padding: "12px 16px" }}
                  >
                    <div
                      onClick={() => setSelected(p)}
                      style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, cursor: "pointer", overflow: "hidden" }}
                    >
                      <span className="sched-upcoming-icon" style={{ color: meta.color, flexShrink: 0 }}>{meta.icon}</span>
                      <div className="sched-upcoming-info" style={{ overflow: "hidden" }}>
                        <span className="sched-upcoming-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{p.title}</span>
                        <span className="sched-upcoming-date" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          {p.date} · {p.time} · {p.channel}
                        </span>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: countdown.type === "overdue" ? "#ff9500" : "#00d4ff", marginTop: "2px" }}>
                          {countdown.label}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePublishNow(p.id, p.title);
                        }}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "6px",
                          background: "#00ffa3",
                          color: "#000000",
                          fontWeight: 800,
                          fontSize: "0.75rem",
                          border: "none",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          boxShadow: "0 0 10px rgba(0,255,163,0.3)",
                        }}
                      >
                        🚀 Post Now
                      </button>
                      <button
                        onClick={() => setSelected(p)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.06)",
                          color: "var(--text-secondary)",
                          fontSize: "0.75rem",
                          border: "1px solid var(--border-subtle)",
                          cursor: "pointer",
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            {filteredPosts.filter(p => p.status !== "published").length === 0 && (
              <p className="sched-empty">No upcoming posts. Schedule a workshop or add content.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <PostModal
          post={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
          onPublishNow={handlePublishNow}
        />
      )}
    </div>
  );
}
