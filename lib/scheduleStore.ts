/**
 * scheduleStore — shared singleton for scheduled posts.
 * WorkshopStudio writes to it; LanaScheduler reads from it.
 * No external deps — just a module-level array + listener set.
 */

export type PostType = "blog" | "workshop" | "app-review";
export type PostStatus = "scheduled" | "published" | "draft";

export interface ScheduledPost {
  id: string;
  title: string;
  type: PostType;
  status: PostStatus;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  seoScore: number;
  bestTime: boolean;
  channel: string;
  tags: string[];
  workshopId?: number; // link back to Supabase workshop row
  slug?: string;
}

// ── Best posting times per weekday (0=Sun) ────────────────────────────────────
export const BEST_HOURS: Record<number, number[]> = {
  0: [10, 15, 20],
  1: [9, 12, 18],
  2: [9, 12, 17],
  3: [9, 12, 17],
  4: [9, 12, 18],
  5: [10, 14, 20],
  6: [11, 15, 21],
};

/** Returns the nearest best-time hour for a given date string */
export function suggestBestTime(dateStr: string): string {
  const day = new Date(dateStr).getDay();
  const best = BEST_HOURS[day]?.[0] ?? 9;
  return `${String(best).padStart(2, "0")}:00`;
}

/** Returns true if the given HH:MM is one of the best hours for that date */
export function isBestTime(dateStr: string, timeStr: string): boolean {
  const day = new Date(dateStr).getDay();
  const hour = parseInt(timeStr.split(":")[0], 10);
  return (BEST_HOURS[day] ?? []).includes(hour);
}

// ── Store ─────────────────────────────────────────────────────────────────────

type Listener = (posts: ScheduledPost[]) => void;

let posts: ScheduledPost[] = buildSeedPosts();
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => fn([...posts]));
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  fn([...posts]); // immediate snapshot
  return () => listeners.delete(fn);
}

export function getPosts(): ScheduledPost[] {
  return [...posts];
}

export function addPost(post: ScheduledPost): void {
  posts = [post, ...posts.filter((p) => p.id !== post.id)];
  notify();
}

export function updatePost(id: string, patch: Partial<ScheduledPost>): void {
  posts = posts.map((p) => (p.id === id ? { ...p, ...patch } : p));
  notify();
}

export function removePost(id: string): void {
  posts = posts.filter((p) => p.id !== id);
  notify();
}

/** Upsert a workshop-type post (called from WorkshopStudio when scheduling) */
export function scheduleWorkshop(opts: {
  workshopId: number;
  title: string;
  slug: string;
  channel: string;
  date: string;
  time: string;
  tags?: string[];
}): ScheduledPost {
  const id = `workshop-${opts.workshopId}`;
  const post: ScheduledPost = {
    id,
    title: opts.title,
    type: "workshop",
    status: "scheduled",
    date: opts.date,
    time: opts.time,
    seoScore: 82,
    bestTime: isBestTime(opts.date, opts.time),
    channel: opts.channel,
    tags: opts.tags ?? ["Workshop"],
    workshopId: opts.workshopId,
    slug: opts.slug,
  };
  addPost(post);
  return post;
}

// ── Seed data (mirrors LanaScheduler seed, avoids duplication) ────────────────
function buildSeedPosts(): ScheduledPost[] {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");

  return [
    {
      id: "seed-1",
      title: "10 ChatGPT Power Words for Better Answers",
      type: "blog",
      status: "published",
      date: `${y}-${m}-07`,
      time: "09:00",
      seoScore: 88,
      bestTime: true,
      channel: "Lux Automaton",
      tags: ["AI", "ChatGPT", "SEO"],
    },
    {
      id: "seed-2",
      title: "Lux App Review: Top 5 GitHub Apps",
      type: "app-review",
      status: "published",
      date: `${y}-${m}-15`,
      time: "12:00",
      seoScore: 91,
      bestTime: true,
      channel: "Lux Automaton",
      tags: ["GitHub", "Apps", "Review"],
    },
    {
      id: "seed-3",
      title: "Your First Video Game Workshop",
      type: "workshop",
      status: "scheduled",
      date: `${y}-${m}-22`,
      time: "10:00",
      seoScore: 85,
      bestTime: true,
      channel: "Lux AI Kids",
      tags: ["Workshop", "Kids", "Game Design"],
    },
    {
      id: "seed-4",
      title: "Building Habits With AI Lenses",
      type: "blog",
      status: "scheduled",
      date: `${y}-${m}-25`,
      time: "09:00",
      seoScore: 79,
      bestTime: false,
      channel: "Lux Automaton",
      tags: ["AI", "Habits", "Productivity"],
    },
    {
      id: "seed-5",
      title: "Lux App Review: Top AI Research Tools",
      type: "app-review",
      status: "draft",
      date: `${y}-${m}-28`,
      time: "18:00",
      seoScore: 72,
      bestTime: false,
      channel: "Lux Automaton",
      tags: ["Research", "AI", "Apps"],
    },
  ];
}
