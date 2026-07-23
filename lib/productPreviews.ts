import type { Product } from "@/lib/products";

export type ProductPreview = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

const previewImages: Record<string, string[]> = {
  "lux-codex": [
    "/images/lux-automaton-brand/diagram-reference.png",
    "/images/lux-automaton-brand/owner-control-reference.png",
    "/images/lux-automaton-brand/guided-systems-reference.png",
  ],
  "lux-business": [
    "/images/02-photo-unify-scattered-business-context.png",
    "/images/03-photo-private-files-owner-control.png",
    "/images/04-photo-guided-business-systems.png",
  ],
  "lux-agent-usb": ["/images/lux-agent-usb.jpeg", "/images/admin-lux-office.png", "/images/lux-agent-hero.png"],
  "lux-coder": ["/images/lux-coder-hero.png", "/images/lux-coder-card.png", "/images/lux-coder-banner.png"],
  "lux-agent": ["/images/lux-agent-hero.png", "/images/admin-lux-office.png", "/images/product-image-7.png"],
  lana: ["/images/lana.png", "/images/lana-blazer.png", "/images/lana-bubbles.jpg"],
  "lux-ai-kids": ["/images/lux-kids-world.png", "/images/lux-ai-kids-brand/lana-and-ace-classroom.png", "/images/lux-ai-kids-brand/marketing-style-board.png"],
  "lux-tv": ["/images/lux-world-hero.png", "/images/story-remembers-thumbnail.png", "/images/04_YouTube_Thumbnail_16x9.png"],
  "lux-marketing-studio": ["/images/lana-banner.jpg", "/images/lana-foodtruck.jpg", "/images/product-image-7.png"],
  luxwriteoff: ["/images/lux-write-off.jpg", "/images/luxwriteoff-logo.png", "/images/05-private-ai-business-os-overview.png"],
  "lux-budgeter": ["/images/lux-budgeter-hero.jpg", "/images/04-photo-guided-business-systems.png", "/images/05-private-ai-business-os-overview.png"],
  "success-packs": ["/images/restaurant-success-pack.png", "/images/success-packs-hero.jpg", "/images/pack-ai-marketing.jpg"],
};

const previewTitles = [
  { eyebrow: "Command center", title: "One clear operating view", description: "See the product's primary workspace, signals, and next actions in one focused environment." },
  { eyebrow: "Workflow", title: "From intent to execution", description: "Follow the real workflow from context and decisions through review, approval, and completed work." },
  { eyebrow: "System detail", title: "Built for everyday operation", description: "Explore the supporting tools, memory, controls, and connected systems behind the experience." },
];

export function getProductPreviews(product: Product): ProductPreview[] {
  const fallback = [product.bgImage, product.heroImage, product.logoImage].filter(Boolean) as string[];
  const images = previewImages[product.slug] || fallback;
  const filled = Array.from({ length: 3 }, (_, index) => images[index] || images[0] || "/images/lux-world-hero.png");
  return filled.map((image, index) => ({ image, ...previewTitles[index] }));
}
