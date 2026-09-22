import type { Metadata } from "next";
import VisibilityLanding from "./VisibilityLanding";
import "./visibility.css";

export const metadata: Metadata = {
  title: "Lux AI Visibility — Get Found by AI | Lux Automaton",
  description:
    "See how ready your business is for AI discovery, uncover visibility gaps, and turn recommendations into verified action with LANA and Lux Verify.",
};

export default function LuxAIVisibilityPage() {
  return <VisibilityLanding />;
}
