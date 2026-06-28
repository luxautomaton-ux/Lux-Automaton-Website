import { SiteCards, SiteCTA, SiteHero, SiteSplit, SiteSteps } from '@/components/SitePageKit'
import { PackInteractionMap } from '@/components/PackInteractionMap'

export const metadata = {
  title: 'About | Lux Agent USB',
  description: 'The story behind Lux Automaton and Lux Agent USB, a private AI business OS for owners who need leverage.',
}

export default function AboutPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Built for owners who need leverage."
        body="Lux Agent USB was created to give small business owners a private AI team they can own, launch, carry, train, and use without being trapped inside a cloud subscription."
        image="/lux-agent-website/generated-pages/about-hero.png"
        secondary={{ href: '/how-it-works', label: 'See how it works' }}
        stats={[
          { value: '100%', label: 'Private first' },
          { value: '8+', label: 'Agent roles' },
          { value: 'USB', label: 'Portable OS' },
          { value: 'Local', label: 'Business memory' },
        ]}
      />
      <SiteSplit
        title="Lux Automaton turns AI into practical business systems."
        body="The mission is simple: make powerful AI feel useful to the contractor, clinic owner, creator, restaurant, consultant, and local business owner who needs sales, marketing, admin, money, research, and tech help right now."
        image="/lux-agent-website/brand-banner.png"
      />
      <section className="founder-section">
        <div className="founder-photo-frame">
          <img src="/lux-agent-website/asa.png" alt="Asa Pritchard, founder of Lux Automaton" />
        </div>
        <div className="founder-copy">
          <span>Founder</span>
          <h2>Asa Pritchard built Lux Automaton to turn AI into a real business operating system.</h2>
          <p>
            Asa Pritchard is the founder of Lux Automaton and the builder behind Lux Agent USB Creator.
            The vision is simple and bold: give everyday businesses a private AI team they can actually own,
            carry, launch, brand, and sell without being trapped inside cloud subscriptions.
          </p>
          <p>
            Lux Agent USB Creator is cutting edge because it combines portable local AI, Success Packs,
            Memory Packs, branded customer builds, launch workflows, website support, and sales-ready
            packaging into one original product system. It was designed and built from scratch for this
            mission, not copied from a template or generic dashboard.
          </p>
        </div>
      </section>
      <PackInteractionMap />
      <SiteCards
        title="Not a template. Not another chatbot."
        body="Lux Agent USB is designed as a complete operating system experience around LANA, the AI team, Success Packs, Memory Packs, local files, customer launch support, and daily execution."
        cards={[
          { title: 'Original System', body: 'A custom product vision built around private business ownership, local AI, and USB portability.', accent: '#A275FF' },
          { title: 'Plain-Language Help', body: 'LANA speaks like an operator: what to do next, what to send, what to fix, what to track.', accent: '#22d3ee' },
          { title: 'Business Owner First', body: 'The product is shaped around people doing real work, not around AI demos or abstract dashboards.', accent: '#34D399' },
        ]}
      />
      <SiteSteps
        title="The Lux Agent promise."
        body="Every part of the system is built to help the owner move from scattered work to guided execution."
        steps={[
          { title: 'Own the system', body: 'The business memory, files, and launch experience live with the customer.' },
          { title: 'Train LANA', body: 'Business HQ, Success Packs, and Memory Packs teach LANA what the business does.' },
          { title: 'Route the work', body: 'Sales, marketing, finance, operations, tech, and research agents handle specific lanes.' },
          { title: 'Act with confidence', body: 'The owner gets daily plans, drafts, reports, checklists, and next steps.' },
        ]}
      />
      <SiteCTA title="Give small business owners powerful AI too." body="Lux Agent USB makes a private AI team feel understandable, portable, and ready to use." />
    </main>
  )
}
