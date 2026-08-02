import SolutionDetailPage from "../[slug]/page";

export const metadata = {
  title: "Inland Circle Program OS — Community Operations | Lux Automaton",
  description: "Inland Circle Program OS is a custom program operations system built with Lux Automaton. Organize participants, outreach, events, resources, volunteer coordination, and reporting.",
};

export default function InlandCirclePage() {
  return <SolutionDetailPage params={Promise.resolve({ slug: "inland-circle" })} />;
}
