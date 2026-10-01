import type { Metadata } from "next";
import VisibilityDashboard from "./VisibilityDashboard";
import "../visibility.css";

export const metadata: Metadata = {
  title: "AI Visibility Dashboard — Lux Automaton",
  description: "Run a free-first Lux AI Visibility preview and review prioritized recommendations.",
};

export default function VisibilityDashboardPage() {
  return <VisibilityDashboard />;
}
