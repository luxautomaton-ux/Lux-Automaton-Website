import type { ReactNode } from "react";
import { KIDS_WORKSHOPS, WORKSHOP_PROGRAMS } from "@/lib/luxContent";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = [
    ...KIDS_WORKSHOPS.map((workshop) => workshop.slug),
    ...WORKSHOP_PROGRAMS.filter((program) => program.audience === "Lux AI Kids").map(
      (program) => program.slug,
    ),
  ];

  return [...new Set(slugs)].map((slug) => ({ slug }));
}

export default function KidsWorkshopLayout({ children }: { children: ReactNode }) {
  return children;
}
