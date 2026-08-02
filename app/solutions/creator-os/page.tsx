import SolutionDetailPage from "../[slug]/page";

export const metadata = {
  title: "Creator OS — AI Video & Studio Engine | Lux Automaton",
  description: "Creator OS is an AI video and content production operating system connecting story bibles, beat maps, visual continuity locks, and multi-platform publishing.",
};

export default function CreatorOSPage() {
  return <SolutionDetailPage params={Promise.resolve({ slug: "creator-os" })} />;
}
