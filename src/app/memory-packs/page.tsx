import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SiteCTA, SiteHero } from '@/components/SitePageKit'
import { memoryPacks } from '@/lib/packData'

export const metadata = {
  title: 'Memory Packs | Lux Agent USB',
  description: 'Browse 20 Lux Agent Memory Pack examples that deepen LANA across sales, money, marketing, operations, research, creative, and AI team workflows.',
}

export default function MemoryPacksPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Memory Packs make LANA smarter."
        body="Memory Packs give LANA durable business knowledge: how the owner sells, markets, follows up, organizes files, delivers client work, manages money, and routes tasks."
        image="/lux-agent-website/generated-pages/memory-packs-hero.png"
        primary={{ href: '/success-packs', label: 'View Success Packs' }}
        secondary={{ href: '/store', label: 'Get Lux Agent USB' }}
        stats={[
          { value: '20', label: 'Memory examples' },
          { value: 'Core', label: 'Business brain' },
          { value: 'Agent', label: 'Routing help' },
          { value: 'Local', label: 'Saved context' },
        ]}
      />

      <section className="pack-library-section">
        <div className="site-section-head">
          <h2>20 Memory Pack examples.</h2>
          <p>Each Memory Pack explains what it stores, which workflows it supports, and which Success Packs it pairs with best.</p>
        </div>
        <div className="pack-library-grid">
          {memoryPacks.map(pack => (
            <Link
              key={pack.slug}
              href={`/memory-packs/${pack.slug}`}
              className="pack-library-card"
              style={{ '--accent': pack.accent } as CSSProperties}
            >
              <img src={pack.image} alt={pack.title} />
              <div>
                <span>{pack.category}</span>
                <h3>{pack.title}</h3>
                <p>{pack.summary}</p>
                <small>Pairs with: {pack.pairsWith?.slice(0, 3).join(', ')}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteCTA
        title="Memory turns one chat into a business brain."
        body="The right memory helps LANA remember the customer’s voice, workflows, files, offers, and daily operating patterns."
        href="/success-packs"
        label="Match to Success Packs"
      />
    </main>
  )
}
