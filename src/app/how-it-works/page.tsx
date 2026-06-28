import { SiteCards, SiteCTA, SiteHero, SiteSplit, SiteSteps } from '@/components/SitePageKit'

export const metadata = {
  title: 'How It Works | Lux Agent USB',
  description: 'How Lux Agent USB launches LANA, loads business context, and routes work through AI agents.',
}

export default function HowItWorksPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Plug in. Launch LANA. Run the business."
        body="Lux Agent USB starts with the drive, then turns your computer into a private AI business command center with LANA, Success Packs, Memory Packs, and specialist agents."
        image="/lux-agent-website/generated-pages/how-it-works-hero.png"
        primary={{ href: '/store', label: 'Choose a USB package' }}
        secondary={{ href: '/features', label: 'Explore features' }}
        stats={[
          { value: '01', label: 'Plug in' },
          { value: '02', label: 'Load Business HQ' },
          { value: '03', label: 'Pick packs' },
          { value: '04', label: 'Ask LANA' },
        ]}
      />
      <SiteSteps
        title="The launch workflow."
        body="A customer should understand the process in minutes: connect the drive, open the app, teach LANA the business, then start working."
        steps={[
          { title: 'Connect the USB', body: 'The drive carries the Lux Agent OS, launch files, business folders, and support experience.' },
          { title: 'Open Lux Agent', body: 'LANA loads the private workspace, customer profile, tools, and training guidance.' },
          { title: 'Fill Business HQ', body: 'The owner adds services, customers, pricing, goals, voice, locations, and daily needs.' },
          { title: 'Choose Success Pack', body: 'The profession pack gives LANA industry-specific workflows and prompts.' },
          { title: 'Add Memory Packs', body: 'Memory Packs deepen skills like sales, money, operations, marketing, research, and support.' },
          { title: 'Execute with agents', body: 'LANA routes tasks to the right agent and brings back usable drafts, reports, and plans.' },
        ]}
      />
      <SiteSplit
        title="LANA stays in the middle."
        body="The system is not a pile of disconnected tools. LANA coordinates context, priorities, and agent outputs so the owner gets one clear operating flow."
        image="/lux-agent-website/squad_of_bots.png"
        reverse
      />
      <SiteCards
        title="Private by design."
        body="The customer controls when LANA can use local data, connected tools, or cloud AI."
        cards={[
          { title: 'Local-first files', body: 'Business folders, saved outputs, and launch materials stay with the USB workflow.', accent: '#34D399' },
          { title: 'Approval gates', body: 'Sending, publishing, purchasing, deleting, installing, or sharing sensitive data should require approval.', accent: '#FBBF24' },
          { title: 'Offline-ready training', body: 'Guides, support content, and core workflows are designed to remain understandable without a cloud login.', accent: '#22d3ee' },
        ]}
      />
      <SiteCTA title="A business OS customers can actually follow." body="The experience explains what is happening, why it matters, and what the owner should do next." />
    </main>
  )
}
