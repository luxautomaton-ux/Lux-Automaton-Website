import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'
import { PackInteractionMap } from '@/components/PackInteractionMap'
import { SiteCTA } from '@/components/SitePageKit'
import { getUseCaseMemory, getUseCasePack, getUseCaseStory, useCaseStories } from '@/lib/useCaseData'

export function generateStaticParams() {
  return useCaseStories.map(story => ({ slug: story.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = getUseCaseStory(slug)
  if (!story) return {}

  return {
    title: `${story.title} | Lux Agent USB Use Case`,
    description: story.value,
  }
}

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = getUseCaseStory(slug)
  if (!story) notFound()

  const successPack = getUseCasePack(story)
  const memoryPacks = getUseCaseMemory(story)

  return (
    <main className="site-page use-case-detail-page">
      <section className="use-case-hero">
        <div className="use-case-hero-copy">
          <Link href="/lux-agent">Use Cases</Link>
          <h1>{story.title}: from blank USB to ready AI team.</h1>
          <p>{story.value}</p>
          <div className="use-case-readiness">
            <span>Team readiness</span>
            <strong>{story.strength}%</strong>
            <div><i style={{ width: `${story.strength}%` }} /></div>
          </div>
        </div>
        <div className="use-case-hero-art">
          <img src={story.hero} alt={successPack.title} />
          <div>
            <span>Success Pack</span>
            <strong>{successPack.title}</strong>
          </div>
        </div>
      </section>

      <section className="use-case-problem-section">
        <article>
          <span>Problem</span>
          <h2>What this customer is fighting.</h2>
          <p>{story.problem}</p>
        </article>
        <article>
          <span>Day 1</span>
          <h2>The team is ready.</h2>
          <p>{story.dayOne}</p>
        </article>
      </section>

      <section className="use-case-pack-stack">
        <div className="site-section-head">
          <h2>Packs used in this setup.</h2>
          <p>The Success Pack gives LANA the profession. The Memory Packs give the team deeper operating judgment.</p>
        </div>
        <div className="use-case-pack-grid">
          <Link
            href={`/success-packs/${successPack.slug}`}
            className="use-case-pack-card featured"
            style={{ '--accent': successPack.accent } as CSSProperties}
          >
            <img src={successPack.image} alt={successPack.title} />
            <div>
              <span>Success Pack</span>
              <h3>{successPack.title}</h3>
              <p>{successPack.summary}</p>
            </div>
          </Link>
          {memoryPacks.map(pack => (
            <Link
              href={`/memory-packs/${pack.slug}`}
              className="use-case-pack-card"
              key={pack.slug}
              style={{ '--accent': pack.accent } as CSSProperties}
            >
              <img src={pack.image} alt={pack.title} />
              <div>
                <span>Memory Pack</span>
                <h3>{pack.title}</h3>
                <p>{pack.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="use-case-flow-section">
        <div>
          <h2>Start-to-end customer workflow.</h2>
          <p>Show the buyer exactly how Lux Agent USB turns a business problem into a trained team, useful prompts, and repeatable action.</p>
        </div>
        <div className="use-case-flow">
          {story.workflow.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="use-case-two-column">
        <div>
          <h2>Setup path.</h2>
          <ol>
            {story.setup.map(item => <li key={item}>{item}</li>)}
          </ol>
        </div>
        <div>
          <h2>Problems solved.</h2>
          <ul>
            {story.problemsSolved.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <PackInteractionMap stories={useCaseStories.filter(item => item.slug === story.slug)} />

      <SiteCTA
        title="This is why the pack matters."
        body="The customer is not buying a blank drive. They are buying a ready business team with the right training, memory, and launch path."
        href="/store"
        label="View pricing"
      />
    </main>
  )
}
