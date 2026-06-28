import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

type Stat = {
  label: string
  value: string
}

type Card = {
  title: string
  body: string
  image?: string
  accent?: string
}

type Step = {
  title: string
  body: string
}

type Tier = {
  name: string
  price: string
  body: string
  cta: string
  href: string
  accent?: string
  featured?: boolean
  items: string[]
}

export function SiteHero({
  title,
  body,
  image,
  logo = '/lux-agent-website/lus.png',
  primary = { href: '/store', label: 'Get Lux Agent USB' },
  secondary,
  stats = [],
}: {
  title: string
  body: string
  image: string
  logo?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  stats?: Stat[]
}) {
  return (
    <section className="site-page-hero">
      <div className="site-page-hero-bg" style={{ backgroundImage: `url('${image}')` }} />
      <div className="site-page-hero-copy">
        <img src={logo} alt="Lux Agent" />
        <h1>{title}</h1>
        <p>{body}</p>
        <div className="site-page-actions">
          <Link href={primary.href}>{primary.label}</Link>
          {secondary && <Link href={secondary.href}>{secondary.label}</Link>}
        </div>
      </div>
      {stats.length > 0 && (
        <div className="site-page-stat-strip">
          {stats.map(stat => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export function SiteSplit({
  title,
  body,
  image,
  reverse,
  children,
}: {
  title: string
  body: string
  image: string
  reverse?: boolean
  children?: ReactNode
}) {
  return (
    <section className={`site-split${reverse ? ' reverse' : ''}`}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        {children}
      </div>
      <img src={image} alt={title} />
    </section>
  )
}

export function SiteCards({ title, body, cards }: { title: string; body: string; cards: Card[] }) {
  return (
    <section className="site-section">
      <div className="site-section-head">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="site-card-grid">
        {cards.map(card => (
          <article key={card.title} style={{ '--accent': card.accent || '#67e8f9' } as CSSProperties}>
            {card.image && <img src={card.image} alt={card.title} />}
            <div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SiteSteps({ title, body, steps }: { title: string; body: string; steps: Step[] }) {
  return (
    <section className="site-section">
      <div className="site-section-head">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="site-step-list">
        {steps.map((step, index) => (
          <article key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SitePricing({ tiers }: { tiers: Tier[] }) {
  return (
    <section className="site-section">
      <div className="site-pricing-grid">
        {tiers.map(tier => (
          <article
            key={tier.name}
            className={tier.featured ? 'featured' : ''}
            style={{ '--accent': tier.accent || '#8b5cf6' } as CSSProperties}
          >
            {tier.featured && <span>Recommended</span>}
            <h3>{tier.name}</h3>
            <strong>{tier.price}</strong>
            <p>{tier.body}</p>
            <ul>
              {tier.items.map(item => <li key={item}>{item}</li>)}
            </ul>
            <Link href={tier.href}>{tier.cta}</Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SiteCTA({ title, body, href = '/store', label = 'Get Lux Agent USB' }: { title: string; body: string; href?: string; label?: string }) {
  return (
    <section className="site-final-cta">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link href={href}>{label}</Link>
    </section>
  )
}
