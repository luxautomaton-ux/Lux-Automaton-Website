import Link from 'next/link'
import type { CSSProperties } from 'react'
import { PackInteractionMap } from '@/components/PackInteractionMap'
import { SiteCTA, SiteHero, SiteSplit, SiteSteps } from '@/components/SitePageKit'
import { getUseCaseMemory, getUseCasePack, useCaseStories } from '@/lib/useCaseData'

export const metadata = {
  title: 'Use Cases | Lux Agent USB',
  description: 'See how different businesses use Lux Agent USB, LANA, Success Packs, and specialist AI agents.',
}

export default function UseCasesPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="One USB OS. Many business types."
        body="Lux Agent USB becomes more useful when the customer chooses a Success Pack. LANA learns the profession, then routes the work to sales, marketing, finance, operations, tech, and research agents."
        image="/lux-agent-website/generated-pages/use-cases-hero.png"
        primary={{ href: '/store', label: 'Choose a package' }}
        secondary={{ href: '/features', label: 'Explore features' }}
        stats={[
          { value: 'Clinics', label: 'Admin help' },
          { value: 'Trades', label: 'Lead flow' },
          { value: 'Creators', label: 'Content systems' },
          { value: 'Local', label: 'Service teams' },
        ]}
      />
      <section className="site-section">
        <div className="site-section-head">
          <h2>Customer stories built from real packs.</h2>
          <p>Each use case opens into a full page with the problem, the setup, the Success Pack, the Memory Packs, and the start-to-finish workflow.</p>
        </div>
        <div className="use-case-grid">
          {useCaseStories.map(story => {
            const successPack = getUseCasePack(story)
            const memoryPacks = getUseCaseMemory(story)
            return (
              <Link
                href={`/lux-agent/${story.slug}`}
                className="use-case-card"
                key={story.slug}
                style={{ '--accent': successPack.accent } as CSSProperties}
              >
                <img src={story.hero} alt={story.title} />
                <div>
                  <span>{story.audience}</span>
                  <h3>{story.title}</h3>
                  <p>{story.problem}</p>
                  <small>{successPack.title} + {memoryPacks.length} Memory Packs</small>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      <PackInteractionMap />
      <SiteSplit
        title="Success Packs change the way LANA thinks."
        body="When the owner picks a profession, LANA can recommend the right Memory Packs: sales for lead-heavy businesses, finance for money-sensitive work, marketing for visibility, operations for repeatable service, and research for competitive strategy."
        image="/lux-agent-website/pack-aiconsultant.png"
        reverse
      />
      <SiteSteps
        title="What each use case gets."
        body="The customer should feel guided from industry choice to daily execution."
        steps={[
          { title: 'Profession language', body: 'LANA adapts her questions, examples, and output to the customer type.' },
          { title: 'Recommended Memory Packs', body: 'The page points the customer toward the memory needed for that profession.' },
          { title: 'Agent routing', body: 'Sales, marketing, finance, admin, tech, and research tasks go to the right AI role.' },
          { title: 'Ready-to-use outputs', body: 'The owner receives scripts, checklists, emails, reports, calendars, and plans.' },
          { title: 'Saved business memory', body: 'Useful answers and decisions can become reusable context for the business.' },
        ]}
      />
      <SiteCTA
        title="Start with the profession, then let LANA guide the work."
        body="Lux Agent USB is strongest when the Success Pack and Memory Packs match the customer’s real business."
        href="/store"
        label="Pick a package"
      />
    </main>
  )
}
