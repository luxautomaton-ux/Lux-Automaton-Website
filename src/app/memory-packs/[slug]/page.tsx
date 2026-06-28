import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'
import { getMemoryPack, memoryPacks } from '@/lib/packData'

export function generateStaticParams() {
  return memoryPacks.map(pack => ({ slug: pack.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getMemoryPack(slug)
  if (!pack) return {}
  return {
    title: `${pack.title} | Lux Agent USB`,
    description: pack.summary,
  }
}

export default async function MemoryPackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getMemoryPack(slug)
  if (!pack) notFound()

  return (
    <main className="site-page pack-detail-page">
      <section className="pack-detail-hero" style={{ '--accent': pack.accent } as CSSProperties}>
        <div>
          <Link href="/memory-packs">Memory Packs</Link>
          <h1>{pack.title}</h1>
          <p>{pack.summary}</p>
          <div className="pack-detail-actions">
            <Link href="/success-packs">Match with Success Packs</Link>
            <Link href="/store">Add to Lux Agent USB</Link>
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
          <p>Give LANA durable context she can reuse when helping the customer work faster.</p>
        </article>
      </section>

      <section className="pack-detail-columns">
        <div>
          <h2>What it improves.</h2>
          <ul>{pack.outcomes.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h2>Workflows it remembers.</h2>
          <ul>{pack.workflows.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="pack-match-section">
        <div className="site-section-head">
          <h2>Best Success Pack matches.</h2>
          <p>Use this memory when the customer’s business needs these kinds of outputs from LANA.</p>
        </div>
        <div className="memory-pair-list">
          {pack.pairsWith?.map(item => <span key={item}>{item}</span>)}
        </div>
      </section>
    </main>
  )
}
