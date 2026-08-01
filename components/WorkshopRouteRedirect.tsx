"use client";

import { useEffect } from "react";
import { prefixPath } from "@/lib/prefix";

export default function WorkshopRouteRedirect({ slug }: { slug: string }) {
  useEffect(() => {
    window.location.replace(`${prefixPath("/workshops/")}?workshop=${encodeURIComponent(slug)}&mode=lesson`);
  }, [slug]);

  return <main className="automaton-route-loading"><p>Opening your workshop…</p></main>;
}
