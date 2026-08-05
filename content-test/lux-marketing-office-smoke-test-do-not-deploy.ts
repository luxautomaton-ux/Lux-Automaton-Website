/**
 * SMOKE-TEST ARTIFACT — DO NOT DEPLOY, DO NOT SYNC TO PRODUCTION.
 *
 * Isolated website test path for the Lux Marketing Office End-to-End Smoke Test.
 * Classification: synthetic-verification
 * Slug: lux-marketing-office-smoke-test-do-not-deploy
 *
 * This file is intentionally NOT imported by lib/luxContent.ts and does NOT
 * participate in the real BLOG_ARTICLES export. It exists only to prove the
 * repository-write → build-verified → preview-ready → deployment-pending path.
 * Remove this file after verification unless the audit requires retaining it.
 */

export interface SmokeTestArticle {
  slug: string;
  title: string;
  deck: string;
  date: string;
  readTime: string;
  category: string;
  status: "draft" | "scheduled" | "published";
  syntheticVerification: true;
}

export const SMOKE_TEST_ARTICLES: SmokeTestArticle[] = [
  {
    slug: "lux-marketing-office-smoke-test-do-not-deploy",
    title: "Lux Marketing Office End-to-End Smoke Test",
    deck: "Synthetic verification of the governed Marketing Office pipeline (draft → review → approve → schedule → repository write → build → preview).",
    date: "2026-08-05",
    readTime: "2 min",
    category: "Synthetic Verification",
    status: "draft",
    syntheticVerification: true,
  },
];
