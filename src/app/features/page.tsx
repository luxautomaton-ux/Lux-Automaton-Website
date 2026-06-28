import { SiteCards, SiteCTA, SiteHero, SiteSplit, SiteSteps } from '@/components/SitePageKit'

export const metadata = {
  title: 'Features | Lux Agent USB',
  description: 'Explore Lux Agent USB features: LANA, AI team, Business HQ, Success Packs, Money Suite, Web Intelligence, and private local workflows.',
}

export default function FeaturesPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="A complete private AI business OS."
        body="Lux Agent USB combines the operator, agents, packs, memory, money tools, website help, lead support, research, and training into one customer-ready system."
        image="/lux-agent-website/generated-pages/features-hero.png"
        secondary={{ href: '/lux-agent', label: 'See use cases' }}
        stats={[
          { value: 'LANA', label: 'Operator' },
          { value: 'Agents', label: 'Specialists' },
          { value: 'Packs', label: 'Professions' },
          { value: 'Vault', label: 'Memory' },
        ]}
      />
      <SiteCards
        title="Core modules."
        body="The features are organized around business outcomes, not random AI tricks."
        cards={[
          { title: 'Business HQ', body: 'Teaches LANA the company, offer, customer, voice, goals, pricing, and operating context.', image: '/lux-agent-website/screenshots/braini.png', accent: '#A275FF' },
          { title: 'Ask LANA', body: 'A guided chat experience for planning, drafts, reports, decisions, and daily business help.', image: '/lux-agent-website/screenshots/chat.png', accent: '#22d3ee' },
          { title: 'Lux Vault', body: 'Stores useful outputs, business memory, files, and customer knowledge for repeatable work.', image: '/lux-agent-website/screenshots/file.png', accent: '#34D399' },
          { title: 'System Vitals', body: 'Shows health, readiness, local status, and the confidence of the USB setup.', image: '/lux-agent-website/screenshots/vitals.png', accent: '#FBBF24' },
          { title: 'USB Builder', body: 'Prepares a clean customer-ready build with packs, branding, launch files, and support flow.', image: '/lux-agent-website/screenshots/build.png', accent: '#60A5FA' },
          { title: 'Success Packs', body: 'Profession-ready operating playbooks for clinics, contractors, creators, restaurants, real estate, and more.', image: '/lux-agent-website/pack-aiconsultant.png', accent: '#F472B6' },
        ]}
      />
      <SiteSplit
        title="The agents make LANA more useful."
        body="Sales, marketing, finance, admin, tech, and research agents turn one conversation into specialized business work: outreach, content, reports, checklists, budgets, and support."
        image="/lux-agent-website/Bots.png"
      />
      <SiteSteps
        title="What the customer can do."
        body="The page should make it obvious that this is a working business system."
        steps={[
          { title: 'Plan the day', body: 'Ask LANA for priorities, actions, and a clean owner-ready schedule.' },
          { title: 'Follow up with leads', body: 'Create scripts, emails, offers, and pipeline actions.' },
          { title: 'Run money checks', body: 'Track budgets, write-offs, reports, and money leaks.' },
          { title: 'Build content', body: 'Generate campaigns, captions, posts, pages, and launch messages.' },
          { title: 'Research opportunities', body: 'Study competitors, vendors, local markets, and public leads.' },
        ]}
      />
      <SiteCTA title="Features that feel like a team." body="The value is not one tool. It is the way the tools work together around LANA." />
    </main>
  )
}
