"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Channel = "Website" | "Instagram" | "Facebook" | "Newsletter";
type PostStatus = "scheduled" | "draft" | "published";
type StudioPost = { id: string; title: string; copy: string; channel: Channel; scheduledFor: string; status: PostStatus };

const storageKey = "lux-ai-kids-post-studio";
const seedPosts: StudioPost[] = [
  { id: "welcome", title: "Welcome to the Lux AI Kids Lab", copy: "A new home for young creators, guided questions, and joyful AI projects.", channel: "Website", scheduledFor: "", status: "draft" },
  { id: "garden", title: "Community Garden AI challenge", copy: "What would you teach a tiny garden helper to notice?", channel: "Instagram", scheduledFor: "2026-08-03T10:00", status: "scheduled" },
];

function formatDate(value: string) {
  if (!value) return "No date selected";
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function PostStudioPage() {
  const [posts, setPosts] = useState<StudioPost[]>(seedPosts);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setPosts(JSON.parse(saved) as StudioPost[]);
    } catch { window.localStorage.removeItem(storageKey); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(posts));
  }, [posts, ready]);

  const counts = useMemo(() => ({
    scheduled: posts.filter((post) => post.status === "scheduled").length,
    drafts: posts.filter((post) => post.status === "draft").length,
    published: posts.filter((post) => post.status === "published").length,
  }), [posts]);

  function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const scheduledFor = String(form.get("scheduledFor") || "");
    const post: StudioPost = {
      id: crypto.randomUUID(),
      title: String(form.get("title") || "Untitled post"),
      copy: String(form.get("copy") || ""),
      channel: String(form.get("channel") || "Website") as Channel,
      scheduledFor,
      status: scheduledFor ? "scheduled" : "draft",
    };
    setPosts((current) => [post, ...current]);
    setNotice(post.status === "scheduled" ? `Scheduled for ${formatDate(scheduledFor)}.` : "Saved as a draft.");
    event.currentTarget.reset();
  }

  function updatePost(id: string, action: "publish" | "delete") {
    if (action === "delete") {
      setPosts((current) => current.filter((post) => post.id !== id));
      setNotice("Post removed.");
      return;
    }
    setPosts((current) => current.map((post) => post.id === id ? { ...post, status: "published", scheduledFor: "" } : post));
    setNotice("Marked as published. Connect a delivery service before using this as a live publishing action.");
  }

  return (
    <div className="kids-world post-studio-page">
      <section className="post-studio-hero">
        <div>
          <p className="post-studio-eyebrow">LUX AI KIDS · CONTENT DESK</p>
          <h1>Make a post.<br /><span>Pick its moment.</span></h1>
          <p>Create website and social copy, select a delivery date, and keep your content calendar in one calm place.</p>
        </div>
        <aside className="post-studio-status-card">
          <p>YOUR CONTENT QUEUE</p>
          <div><b>{counts.scheduled}</b><span>scheduled</span></div>
          <div><b>{counts.drafts}</b><span>drafts</span></div>
          <div><b>{counts.published}</b><span>published</span></div>
        </aside>
      </section>

      <section className="post-studio-disclosure">
        <span>ℹ</span><p><b>Saved in this browser.</b> This studio keeps your schedule on this device. It does not automatically deliver to your website, newsletter, or social accounts until those services are connected.</p>
      </section>

      <main className="post-studio-main">
        <section className="post-composer">
          <div className="post-section-heading"><p>NEW POST</p><h2>Write it once. Plan it clearly.</h2></div>
          <form onSubmit={createPost}>
            <label>Post title<input required name="title" placeholder="Example: Saturday’s Robot Builders Lab" /></label>
            <label>Where is this for?<select name="channel" defaultValue="Website"><option>Website</option><option>Instagram</option><option>Facebook</option><option>Newsletter</option></select></label>
            <label className="post-copy-label">Post copy<textarea required name="copy" rows={6} placeholder="Write the message families, educators, or young creators should see…" /></label>
            <label>Schedule for (optional)<input name="scheduledFor" type="datetime-local" /></label>
            <button type="submit">Save to content calendar →</button>
          </form>
          {notice && <p className="post-notice" role="status">{notice}</p>}
        </section>

        <section className="post-queue" aria-live="polite">
          <div className="post-section-heading"><p>CONTENT CALENDAR</p><h2>Your upcoming work</h2></div>
          <div className="post-queue-list">
            {posts.map((post) => (
              <article className={`post-queue-item ${post.status}`} key={post.id}>
                <div className="post-queue-meta"><span className="post-channel">{post.channel}</span><span className="post-status">{post.status}</span></div>
                <h3>{post.title}</h3><p>{post.copy}</p>
                <footer><span>{post.status === "scheduled" ? formatDate(post.scheduledFor) : post.status === "published" ? "Published" : "Draft — choose a date when ready"}</span>
                <div>{post.status !== "published" && <button type="button" onClick={() => updatePost(post.id, "publish")}>Mark published</button>}<button type="button" onClick={() => updatePost(post.id, "delete")}>Remove</button></div></footer>
              </article>
            ))}
          </div>
          <Link className="post-back-link" href="/lux-ai-kids">← Back to Lux AI Kids</Link>
        </section>
      </main>
    </div>
  );
}
