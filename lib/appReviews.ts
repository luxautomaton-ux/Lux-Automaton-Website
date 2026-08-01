/**
 * APP_REVIEWS — auto-published app reviews.
 *
 * This module is maintained by the Lux Marketing Auto-Engine (Lux Codex →
 * lux-site-publisher). ChatGPT app-review drafts are appended to the
 * APP_REVIEWS array below; the App Review page merges them with the curated
 * weekly TOP_5_APPS. Do not hand-edit the array entries — they are idempotent
 * per slug and regenerated from the Lux Codex content bridge.
 */
export interface AppReviewItem {
  rank: number;
  name: string;
  owner: string;
  repo: string;
  url: string;
  website: string;
  category: string;
  tags: string[];
  description: string;
  stars: string;
  forks: string;
  language: string;
  license: string;
  score: number;
  grade: string;
  verdict: string;
  confidence: string;
  weeklyStars: number;
  scores: { usefulness: number; health: number; momentum: number; ease: number; trust: number; quality: number; innovation: number };
  bestFor: string;
  solves: string;
  standout: string[];
  risks: string[];
}

export const APP_REVIEWS: AppReviewItem[] = [
{
  rank: 1,
  name: "Lovable",
  owner: "lovable",
  repo: "lovable",
  url: "https://github.com/lovable/lovable",
  website: "https://lovable.dev",
  category: "AI App Builder",
  tags: [
    "AI",
    "Web",
    "No-Code"
  ],
  description: "AI-first app builder that turns prompts into production apps.",
  stars: "18400",
  forks: "—",
  language: "TypeScript",
  license: "—",
  score: 92,
  grade: "A",
  verdict: "Excellent Choice",
  confidence: "High",
  weeklyStars: 0,
  scores: {
    usefulness: 15,
    health: 12,
    momentum: 12,
    ease: 12,
    trust: 12,
    quality: 8,
    innovation: 8,
  },
  bestFor: "Non-developers shipping real products fast.",
  solves: "Lovable lets anyone build full-stack web apps by describing them in plain language.",
  standout: [
    "Prompt-to-app in minutes",
    "Deploys to production"
  ],
  risks: [
    "Cost scales with usage"
  ],
}

];
