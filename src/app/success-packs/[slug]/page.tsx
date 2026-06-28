import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'
import { memoryBySlug, successPacks, getSuccessPack } from '@/lib/packData'

export function generateStaticParams() {
  return successPacks.map(pack => ({ slug: pack.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getSuccessPack(slug)
  if (!pack) return {}
  return {
    title: `${pack.title} | Lux Agent USB`,
    description: pack.summary,
  }
}

export default async function SuccessPackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getSuccessPack(slug)
  if (!pack) notFound()
  const recommendations = pack.recommendedMemory?.map(slug => memoryBySlug.get(slug)).filter(Boolean) || []

  return (
    <main className="site-page pack-detail-page">
      <section className="pack-detail-hero" style={{ '--accent': pack.accent } as CSSProperties}>
        <div>
          <Link href="/success-packs">Success Packs</Link>
          <h1>{pack.title}</h1>
          <p>{pack.summary}</p>
          <div className="pack-detail-actions">
            <Link href="/store">Add to Lux Agent USB</Link>
            <Link href="/memory-packs">Browse Memory Packs</Link>
          </div>
        </div>
        <img src={pack.image} alt={pack.title} />
      </section>

      <section className="pack-detail-grid">
        <article>
          <span>Best For</span>
          <p>{pack.bestFor}</p>
        </article>
        <article>
          <span>Category</span>
          <p>{pack.category}</p>
        </article>
        <article>
          <span>Main Job</span>
          <p>Teach LANA how this profession works so she can create useful business outputs faster.</p>
        </article>
      </section>

      <section className="pack-detail-columns">
        <div>
          <h2>What it does.</h2>
          <ul>{pack.outcomes.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h2>Workflows inside the pack.</h2>
          <ul>{pack.workflows.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="pack-match-section">
        <div className="site-section-head">
          <h2>Memory Packs LANA should add.</h2>
          <p>These Memory Packs make this Success Pack smarter because they store the business context LANA needs most often.</p>
        </div>
        <div className="pack-library-grid compact">
          {recommendations.map(memory => memory && (
            <Link
              key={memory.slug}
              href={`/memory-packs/${memory.slug}`}
              className="pack-library-card"
              style={{ '--accent': memory.accent } as CSSProperties}
            >
              <img src={memory.image} alt={memory.title} />
              <div>
                <span>{memory.category}</span>
                <h3>{memory.title}</h3>
                <p>{memory.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
