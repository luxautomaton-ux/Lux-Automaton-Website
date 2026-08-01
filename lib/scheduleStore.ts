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
  workshopId?: number;
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

let posts: ScheduledPost[] = buildRealPosts();
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => fn([...posts]));
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  fn([...posts]);
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

// ── Parse "Month DD, YYYY" → "YYYY-MM-DD" ────────────────────────────────────
function parseDate(human: string): string {
  const MONTH_MAP: Record<string, string> = {
    January: "01", February: "02", March: "03", April: "04",
    May: "05", June: "06", July: "07", August: "08",
    September: "09", October: "10", November: "11", December: "12",
  };
  const m = human.match(/(\w+)\s+(\d+),\s+(\d{4})/);
  if (!m) return "2026-07-01";
  const month = MONTH_MAP[m[1]] ?? "07";
  const day = m[2].padStart(2, "0");
  return `${m[3]}-${month}-${day}`;
}

// ── All Real Content ──────────────────────────────────────────────────────────
function buildRealPosts(): ScheduledPost[] {
  const raw: Array<{
    id: string;
    title: string;
    type: PostType;
    status: PostStatus;
    date: string;
    time: string;
    channel: string;
    tags: string[];
    slug?: string;
    seoScore: number;
  }> = [
    // ── App Reviews ──────────────────────────────────────────────────────────
    {
      id: "ar-five-github-apps-july-29",
      slug: "five-github-apps-worth-watching-july-29-2026",
      title: "Five GitHub Apps Worth Watching: Open Science, AgentENV, PGSimCity, GodotHub, Claude of Duty",
      type: "app-review",
      status: "published",
      date: parseDate("July 29, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["App Review", "GitHub", "Open Source"],
      seoScore: 91,
    },
    {
      id: "ar-top-5-github-july-24",
      slug: "top-5-github-apps-to-watch-this-week",
      title: "Top 5 GitHub Apps to Watch This Week — Hermes, OpenCut, OmniRoute, DeepTutor, OfficeCLI",
      type: "app-review",
      status: "published",
      date: parseDate("July 24, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["App Review", "GitHub", "AI Tools"],
      seoScore: 92,
    },

    // ── Lux Automaton Blog Posts ─────────────────────────────────────────────
    {
      id: "blog-asa-ep3",
      slug: "asa-lana-ep3-asa-must-stay-asa",
      title: "Asa + LANA EP3: Asa Must Stay Asa",
      type: "blog",
      status: "published",
      date: parseDate("July 27, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Cinematic AI", "Continuity", "Series"],
      seoScore: 88,
    },
    {
      id: "blog-laguna-s2-1",
      slug: "laguna-s2-1-long-horizon-coding-model",
      title: "Laguna S 2.1: What a Long-Horizon Coding Model Can Actually Build",
      type: "blog",
      status: "published",
      date: parseDate("July 25, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["AI Models", "Open Source", "Coding"],
      seoScore: 85,
    },
    {
      id: "blog-codex-explainer-factory",
      slug: "how-codex-can-direct-an-ai-explainer-video-factory",
      title: "How Codex Can Direct an AI Explainer Video Factory",
      type: "blog",
      status: "published",
      date: parseDate("July 25, 2026"),
      time: "12:00",
      channel: "Lux Automaton",
      tags: ["AI Production", "Video", "Codex"],
      seoScore: 87,
    },
    {
      id: "blog-10-chatgpt-power-words",
      slug: "10-chatgpt-power-words-better-answers-better-lenses",
      title: "10 ChatGPT Power Words: Better Answers Come From Better Lenses",
      type: "blog",
      status: "published",
      date: parseDate("July 24, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Prompt Engineering", "ChatGPT", "AI Strategy"],
      seoScore: 90,
    },
    {
      id: "blog-asa-ep2",
      slug: "asa-lana-ep2-give-the-story-a-memory",
      title: "Asa + LANA EP2: Give the Story a Memory",
      type: "blog",
      status: "published",
      date: parseDate("July 24, 2026"),
      time: "12:00",
      channel: "Lux Automaton",
      tags: ["Cinematic AI", "Story Memory", "Series"],
      seoScore: 86,
    },
    {
      id: "blog-ollama-update",
      slug: "new-ollama-update-local-ai-moves-from-models-to-real-work",
      title: "The New Ollama Update: Local AI Moves From Models to Real Work",
      type: "blog",
      status: "published",
      date: parseDate("July 24, 2026"),
      time: "17:00",
      channel: "Lux Automaton",
      tags: ["Local AI", "Ollama", "Open Source"],
      seoScore: 84,
    },
    {
      id: "blog-adhd-ai",
      slug: "adhd-friendly-ai-put-the-next-action-first",
      title: "ADHD-Friendly AI: Put the Next Action First",
      type: "blog",
      status: "published",
      date: parseDate("July 24, 2026"),
      time: "18:00",
      channel: "Lux Automaton",
      tags: ["AI Productivity", "ADHD", "Accessibility"],
      seoScore: 89,
    },
    {
      id: "blog-lux-agent-usb",
      slug: "lux-agent-usb-your-ai-assistant-anywhere",
      title: "Lux Agent USB: Your AI Assistant Anywhere",
      type: "blog",
      status: "published",
      date: parseDate("July 23, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Local AI", "Privacy", "USB"],
      seoScore: 83,
    },
    {
      id: "blog-gemini-small-biz",
      slug: "google-gemini-updates-small-business-actually-use",
      title: "Google's New Gemini Stack: What Small Businesses Should Actually Use",
      type: "blog",
      status: "published",
      date: parseDate("July 23, 2026"),
      time: "12:00",
      channel: "Lux Automaton",
      tags: ["Gemini", "Google", "Small Business"],
      seoScore: 87,
    },
    {
      id: "blog-asa-ep1",
      slug: "asa-lana-the-story-remembers-ep1",
      title: "ASA + LANA: The Story Remembers — Episode 1",
      type: "blog",
      status: "published",
      date: parseDate("July 22, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Cinematic AI", "Series", "AI Production"],
      seoScore: 88,
    },
    {
      id: "blog-private-ai-os",
      slug: "private-ai-business-os",
      title: "What a Private AI Business OS Actually Does",
      type: "blog",
      status: "published",
      date: parseDate("July 21, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Private AI", "Business OS", "Strategy"],
      seoScore: 85,
    },
    {
      id: "blog-lana-weekly",
      slug: "the-lana-weekly-turning-ideas-into-a-community-rhythm",
      title: "The LANA Weekly: Turning Ideas Into a Community Rhythm",
      type: "blog",
      status: "published",
      date: parseDate("July 20, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Newsletter", "Community", "Content Strategy"],
      seoScore: 82,
    },
    {
      id: "blog-first-automation-map",
      slug: "the-first-automation-map-every-small-business-should-draw",
      title: "The First Automation Map Every Small Business Should Draw",
      type: "blog",
      status: "published",
      date: parseDate("July 18, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Automation", "Small Business", "AI Strategy"],
      seoScore: 91,
    },
    {
      id: "blog-offline-ai",
      slug: "why-offline-ready-ai-still-matters",
      title: "Why Offline-Ready AI Still Matters",
      type: "blog",
      status: "published",
      date: parseDate("July 17, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Offline AI", "Privacy", "Local Models"],
      seoScore: 80,
    },
    {
      id: "blog-success-packs",
      slug: "success-packs-productized-services",
      title: "Success Packs Turn Services Into Repeatable Products",
      type: "blog",
      status: "published",
      date: parseDate("July 15, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Productization", "Services", "Business"],
      seoScore: 83,
    },
    {
      id: "blog-founder-build-loop",
      slug: "lux-coder-founder-build-loop",
      title: "The Founder Build Loop: Idea, Page, Test, Improve",
      type: "blog",
      status: "published",
      date: parseDate("July 14, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Founder", "Build", "MVP"],
      seoScore: 84,
    },
    {
      id: "blog-community-first",
      slug: "community-first-ai-company",
      title: "A Community-First AI Company Needs More Than a Product Page",
      type: "blog",
      status: "published",
      date: parseDate("July 12, 2026"),
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Community", "Brand", "AI Company"],
      seoScore: 82,
    },

    // ── Lux AI Kids Blog Posts ───────────────────────────────────────────────
    {
      id: "blog-kids-dr-dooley-ep2",
      slug: "dr-dooleys-smart-health-lab-episode-2",
      title: "Dr. Dooley's Smart Health Lab: How AI Helps Us Understand the Body",
      type: "blog",
      status: "published",
      date: parseDate("July 24, 2026"),
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Kids", "Health", "AI Science"],
      seoScore: 85,
    },
    {
      id: "blog-kids-dr-dooley-ep1",
      slug: "dr-dooleys-smart-health-adventure",
      title: "Dr. Dooley's Smart Health Adventure: Three AI Healthcare Lessons for Kids",
      type: "blog",
      status: "published",
      date: parseDate("July 23, 2026"),
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Kids", "Health", "AI Learning"],
      seoScore: 84,
    },
    {
      id: "blog-kids-safe-ai",
      slug: "safe-ai-learning-starts-with-better-questions",
      title: "Safe AI Learning Starts With Better Questions",
      type: "blog",
      status: "published",
      date: parseDate("July 19, 2026"),
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Kids", "AI Safety", "Learning"],
      seoScore: 87,
    },
    {
      id: "blog-kids-ai-video-projects",
      slug: "five-ai-video-projects-kids-can-make-this-month",
      title: "Five AI Video Projects Kids Can Make This Month",
      type: "blog",
      status: "published",
      date: parseDate("July 16, 2026"),
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Kids", "Video", "Projects"],
      seoScore: 88,
    },
    {
      id: "blog-kids-ai-careers",
      slug: "the-coolest-ai-careers-may-not-have-names-yet",
      title: "The Coolest AI Careers May Not Have Names Yet",
      type: "blog",
      status: "published",
      date: parseDate("July 13, 2026"),
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Kids", "Careers", "AI Future"],
      seoScore: 86,
    },

    // ── Workshops ────────────────────────────────────────────────────────────
    {
      id: "ws-your-first-video-game",
      slug: "your-first-video-game",
      title: "Your First Video Game: Imagine It. Draw It. Play It!",
      type: "workshop",
      status: "published",
      date: "2026-07-12",
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Workshop", "Kids", "Game Design", "Beginner"],
      seoScore: 90,
    },
    {
      id: "ws-ai-foundations-for-founders",
      slug: "ai-foundations-for-founders",
      title: "AI Foundations for Founders",
      type: "workshop",
      status: "published",
      date: "2026-07-10",
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Workshop", "Founders", "AI Strategy", "Beginner"],
      seoScore: 88,
    },
    {
      id: "ws-lana-content-command-center",
      slug: "lana-content-command-center",
      title: "LANA Content Command Center",
      type: "workshop",
      status: "published",
      date: "2026-07-08",
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Workshop", "Content Strategy", "LANA"],
      seoScore: 86,
    },
    {
      id: "ws-build-your-first-ai-business",
      slug: "build-your-first-ai-business",
      title: "Build Your First AI Business",
      type: "workshop",
      status: "published",
      date: "2026-07-05",
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Workshop", "Business", "AI Strategy"],
      seoScore: 89,
    },
    // Upcoming / Scheduled workshops
    {
      id: "ws-success-pack-studio",
      slug: "success-pack-studio",
      title: "Success Pack Studio",
      type: "workshop",
      status: "scheduled",
      date: "2026-08-05",
      time: "09:00",
      channel: "Lux Automaton",
      tags: ["Workshop", "Products", "Services"],
      seoScore: 84,
    },
    {
      id: "ws-ai-explorer-kids",
      slug: "ai-explorer-kids",
      title: "AI Explorer — Kids",
      type: "workshop",
      status: "scheduled",
      date: "2026-08-10",
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Workshop", "Kids", "AI Basics"],
      seoScore: 83,
    },
    {
      id: "ws-storyteller-lab-kids",
      slug: "storyteller-lab-kids",
      title: "Storyteller Lab",
      type: "workshop",
      status: "scheduled",
      date: "2026-08-17",
      time: "10:00",
      channel: "Lux AI Kids",
      tags: ["Workshop", "Kids", "Storytelling"],
      seoScore: 82,
    },
  ];

  return raw.map((item) => ({
    ...item,
    bestTime: isBestTime(item.date, item.time),
  }));
}
