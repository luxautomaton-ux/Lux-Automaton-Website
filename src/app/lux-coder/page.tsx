import { SiteCards, SiteCTA, SiteHero, SiteSplit, SiteSteps } from '@/components/SitePageKit'

export const metadata = {
  title: 'Lux Coder | Lux Agent USB',
  description: 'Lux Coder gives the Lux Agent system technical hands for websites, apps, automations, and customer workflows.',
}

export default function LuxCoderPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Give LANA technical hands."
        body="Lux Coder helps turn business ideas into websites, pages, workflows, scripts, and app plans with LANA guiding the business logic and Chuck Cole supporting the technical lane."
        image="/lux-agent-website/generated-pages/lux-coder-hero.png"
        primary={{ href: '/store', label: 'Get Lux Agent USB' }}
        secondary={{ href: '/lux-coder-suite', label: 'View Coder Suite' }}
        stats={[
          { value: 'Web', label: 'Pages' },
          { value: 'Apps', label: 'Ideas' },
          { value: 'Flows', label: 'Automation' },
          { value: 'Local', label: 'Workspace' },
        ]}
      />
      <SiteSplit
        title="Lux Coder turns plain-English requests into buildable work."
        body="A customer can ask for a quote page, intake form, automation plan, app idea, or support script. LANA clarifies the business goal, then Lux Coder organizes the technical pieces into steps that can be reviewed and built."
        image="/lux-agent-website/screenshots/build.png"
      />
      <SiteCards
        title="What Lux Coder helps create."
        body="The feature is designed for owners who know what they want the business to do, but need help turning the idea into digital structure."
        cards={[
          { title: 'Website pages', body: 'Offer pages, service pages, about pages, checkout flows, lead capture pages, and customer-ready copy.', image: '/lux-agent-website/screenshots/build.png', accent: '#22d3ee' },
          { title: 'Business tools', body: 'Simple dashboards, forms, reports, calculators, customer workflows, and internal operating screens.', image: '/lux-agent-website/screenshots/file.png', accent: '#A275FF' },
          { title: 'AI workflows', body: 'Prompt systems, tool plans, agent handoffs, training content, and repeatable task automations.', image: '/lux-agent-website/screenshots/chat.png', accent: '#34D399' },
        ]}
      />
      <SiteSteps
        title="The build flow."
        body="Lux Coder keeps the technical process understandable and reviewable."
        steps={[
          { title: 'Describe the goal', body: 'The owner tells LANA the business outcome, customer, offer, and problem.' },
          { title: 'Clarify the workflow', body: 'LANA asks for the missing details before work becomes technical.' },
          { title: 'Structure the build', body: 'Lux Coder maps screens, content, components, files, or automation steps.' },
          { title: 'Review before action', body: 'Publishing, sending, deleting, installing, or changing important files should require approval.' },
          { title: 'Save the pattern', body: 'Finished workflows can become repeatable knowledge for future customer work.' },
        ]}
      />
      <SiteCTA
        title="Build the tool your business keeps needing."
        body="Lux Coder belongs inside the private AI OS so the business plan and the technical build stay connected."
        href="/store"
        label="Add Lux Coder"
      />
    </main>
  )
}
