import SolutionDetailPage from "../[slug]/page";

export const metadata = {
  title: "Small Business OS — Retail & Local Commerce Operations | Lux Automaton",
  description: "Small Business OS is an all-in-one operational system for retail stores, boutique services, local shops, and e-commerce brands.",
};

export default function SmallBusinessOSPage() {
  return <SolutionDetailPage params={Promise.resolve({ slug: "small-business-os" })} />;
}
