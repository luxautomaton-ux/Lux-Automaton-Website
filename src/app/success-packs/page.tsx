import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SiteCTA, SiteHero } from '@/components/SitePageKit'
import { memoryBySlug, successPacks } from '@/lib/packData'

export const metadata = {
  title: 'Success Packs | Lux Agent USB',
  description: 'Browse 20 Lux Agent Success Pack examples and see which Memory Packs make LANA smarter for each profession.',
}

export default function SuccessPacksPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Success Packs teach LANA the profession."
        body="Choose the customer type, then LANA understands the language, workflows, daily needs, and best Memory Packs for that business."
        image="/lux-agent-website/generated-pages/success-packs-hero.png"
        primary={{ href: '/memory-packs', label: 'View Memory Packs' }}
        secondary={{ href: '/store', label: 'Get Lux Agent USB' }}
        stats={[
          { value: '20', label: 'Example packs' },
          { value: '4+', label: 'Memory matches' },
          { value: 'LANA', label: 'Profession guide' },
          { value: 'USB', label: 'Customer ready' },
        ]}
      />

      <section className="pack-library-section">
        <div className="site-section-head">
          <h2>20 Success Pack examples.</h2>
          <p>Each page explains what the pack does, who it helps, what workflows it unlocks, and which Memory Packs should be added first.</p>
        </div>
        <div className="pack-library-grid">
          {successPacks.map(pack => (
            <Link
              key={pack.slug}
              href={`/success-packs/${pack.slug}`}
              className="pack-library-card"
              style={{ '--accent': pack.accent } as CSSProperties}
            >
              <img src={pack.image} alt={pack.title} />
              <div>
                <span>{pack.category}</span>
                <h3>{pack.title}</h3>
                <p>{pack.summary}</p>
                <small>
                  Memory match: {pack.recommendedMemory?.slice(0, 2).map(slug => memoryBySlug.get(slug)?.title.replace(' Memory Pack', '').replace(' Pack', '')).join(' + ')}
                </small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteCTA
        title="Success Packs become stronger with the right Memory Packs."
        body="Start with the profession, then add memory for sales, money, marketing, operations, research, and delivery."
        href="/memory-packs"
        label="See Memory Packs"
      />
    </main>
  )
}
