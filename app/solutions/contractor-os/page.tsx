import SolutionDetailPage from "../[slug]/page";

export const metadata = {
  title: "Contractor OS — Field Trades & Operations System | Lux Automaton",
  description: "Contractor OS is an AI-powered field operations system designed for electricians, plumbers, HVAC technicians, roofers, and general contractors.",
};

export default function ContractorOSPage() {
  return <SolutionDetailPage params={Promise.resolve({ slug: "contractor-os" })} />;
}
