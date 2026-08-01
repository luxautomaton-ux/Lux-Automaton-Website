import { WORKSHOP_PROGRAMS } from "@/lib/luxContent";
import WorkshopRouteRedirect from "@/components/WorkshopRouteRedirect";

export function generateStaticParams() {
  return WORKSHOP_PROGRAMS
    .filter((workshop) => workshop.audience === "Lux Automaton")
    .map((workshop) => ({ slug: workshop.slug }));
}

export default async function WorkshopRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WorkshopRouteRedirect slug={slug} />;
}
