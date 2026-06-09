import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Pricing | Lux Agent',
  description: 'Choose how you want Lux Agent OS — digital download or preloaded MoveSpeed USB. Plans from $299.'
}

const USB_TIERS = [
  {
    id: 'prod_download',
    name: 'Digital Download',
    price: 299,
    tag: 'Best for DIY users with their own drive or computer.',
    accent: '#60A5FA',
    icon: '💻',
    badge: null,
    features: [
      'Lux Agent OS digital download',
      'LANA basic',
      'Business HQ',
      'CRM basic',
      'Lux Vault basic',
      'Training Workshop',
      'Start Here Guide',
      'Success Pack preview',
      'Local/private mode',
      'Setup instructions included',
    ],
    note: 'You provide your own USB drive or computer storage.',
    cta: 'Download Lux Agent OS',
  },
  {
    id: 'prod_usb_starter',
    name: 'Preloaded USB',
    price: 499,
    tag: 'Best for beginners who want plug-and-launch convenience.',
    accent: '#A275FF',
    icon: '💾',
    badge: '⭐ Recommended',
    features: [
      'Premium MoveSpeed USB drive included',
      'Lux Agent OS pre-installed',
      'LANA basic',
      'Business HQ',
      'CRM basic',
      'Lux Vault basic',
      'Success Pack preview',
      'Training Workshop',
      'Start Here Guide',
      'Privacy-first setup',
      'Ready-to-launch folder structure',
    ],
    note: null,
    cta: 'Buy Preloaded USB',
  },
  {
    id: 'prod_usb_business',
    name: 'Business Setup',
    price: 999,
    tag: 'Best for business owners who want the USB plus setup help.',
    accent: '#2DD4BF',
    icon: '💼',
    badge: null,
    features: [
      'Everything in Preloaded USB',
      'Custom Business HQ setup',
      'One full Success Pack',
      'CRM starter setup',
      'Website starter setup',
      'First 30-day business plan',
      'Training walkthrough',
      'Privacy settings walkthrough',
    ],
    note: null,
    cta: 'Book Business Setup',
  },
  {
    id: 'prod_usb_pro',
    name: 'Pro Setup',
    price: 1999,
    tag: 'Full done-with-you business system — built around your goals.',
    accent: '#FBBF24',
    icon: '🏆',
    badge: null,
    features: [
      'Everything in Business Setup',
      'Personalized Success Pack',
      'Money Suite setup',
      'Web Intelligence setup',
      'Website & lead system setup',
      '90-day business plan',
      'AI Team setup',
      'Lux Budgeter setup',
      'Lux WriteOff setup',
      'Training session',
      'Launch checklist',
    ],
    note: null,
    cta: 'Book Pro Setup',
  },
]

const SUBSCRIPTIONS = [
  {
    id: 'sub_money_suite',
    name: 'Money Suite',
    price: 79,
    tag: 'Control and protect the money.',
    accent: '#34D399',
    icon: '💰',
    badge: null,
    features: [
      'Lux Budgeter Pro',
      'Money Leak Finder',
      'Lux WriteOff Pro',
      'Receipt Tracker',
      'Business License Coach',
      'Money Reports',
      'Tax & Money Vault',
      'CPA-ready export packet',
    ],
    cta: 'Unlock Money Suite',
  },
  {
    id: 'sub_full_business',
    name: 'Full Business OS',
    price: 149,
    tag: 'The complete AI-powered business operating system.',
    accent: '#A275FF',
    icon: '⚡',
    badge: 'Best Value',
    features: [
      'Everything in Money Suite',
      'Web Intelligence Pro',
      'Advanced lead research',
      'Competitor reports',
      'Vendor/tool savings reports',
      'Success Pack advanced execution',
      'AI Team advanced reports',
      'Monthly business review workflows',
    ],
    cta: 'Unlock Full Business OS',
  },
]

const ADDONS = [
  { name: 'Business License Setup Pack', price: '$499', desc: 'Guided checklist and setup support for business license organization, EIN checklist, local compliance, and business setup planning.' },
  { name: 'Custom Success Pack', price: '$499–$1,500', desc: 'A personalized Success Pack built around your industry, goals, services, offers, and daily workflow.' },
  { name: 'Website Setup', price: '$499–$2,500', desc: 'Website starter setup, landing page copy, offer structure, lead capture, and LANA-guided website planning.' },
  { name: 'AI Team Coaching', price: '$149/mo+', desc: 'Monthly support to help you use LANA, the AI team, Success Packs, Money Suite, and Web Intelligence.' },
]

export default function StorePage() {
  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* Decorative glow */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(162,117,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <section className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(162,117,255,0.08)', border: '1px solid rgba(162,117,255,0.3)', borderRadius: 100, color: 'var(--primary)', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
            Two Ways to Start
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>Choose How You Want <span style={{ color: 'var(--primary)' }}>Lux Agent OS</span></h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 760, margin: '0 auto', lineHeight: 1.6 }}>
            Download the software and set it up yourself, or buy a preloaded MoveSpeed USB from Lux Automaton with the system already installed and ready to launch.
          </p>
        </div>

        {/* ONE-TIME PURCHASE TIERS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 100 }}>
          {USB_TIERS.map(tier => (
            <div key={tier.id} className="card" style={{
              position: 'relative',
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              border: tier.badge ? `2px solid ${tier.accent}` : '1px solid rgba(255,255,255,0.08)',
              background: tier.badge
                ? `linear-gradient(to bottom, ${tier.accent}08, rgba(26,26,30,0.8))`
                : 'rgba(26,26,30,0.6)',
            }}>
              {tier.badge && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: tier.accent, color: '#000', fontSize: 11, fontWeight: 'bold', padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap' }}>
                  {tier.badge}
                </div>
              )}
              <div style={{ fontSize: 36, marginBottom: 12 }}>{tier.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{tier.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', minHeight: 40, marginBottom: 20, lineHeight: 1.5 }}>{tier.tag}</p>

              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 40, fontWeight: 800 }}>${tier.price.toLocaleString()}</span>
                <span style={{ fontSize: 14, color: 'var(--text-dim)', marginLeft: 4 }}>one-time</span>
              </div>

              <ul style={{ padding: 0, margin: '0 0 24px', listStyle: 'none', flexGrow: 1 }}>
                {tier.features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.4 }}>
                    <span style={{ color: tier.accent, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {tier.note && (
                <p style={{ fontSize: 12, color: 'var(--text-dim)', opacity: 0.7, marginBottom: 16, lineHeight: 1.5, fontStyle: 'italic' }}>
                  ℹ️ {tier.note}
                </p>
              )}

              <Link
                href={`/checkout?product_id=${tier.id}`}
                className={`btn ${tier.badge ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', textAlign: 'center', padding: 12 }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* MONTHLY SUBSCRIPTIONS */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.3)', borderRadius: 100, color: '#2DD4BF', fontWeight: 700, fontSize: 13, letterSpacing: 1.5, marginBottom: 16, textTransform: 'uppercase' }}>MONTHLY SUBSCRIPTIONS</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Unlock Advanced Features</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 600, margin: '0 auto' }}>
              Add powerful financial tools and business intelligence to your Lux Agent setup.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: 24, maxWidth: 800, margin: '0 auto' }}>
            {SUBSCRIPTIONS.map(sub => (
              <div key={sub.id} className="card" style={{
                position: 'relative',
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                border: sub.badge ? `2px solid ${sub.accent}` : '1px solid rgba(255,255,255,0.08)',
                background: sub.badge
                  ? `linear-gradient(to bottom, ${sub.accent}08, rgba(26,26,30,0.8))`
                  : 'rgba(26,26,30,0.6)',
              }}>
                {sub.badge && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: sub.accent, color: '#000', fontSize: 11, fontWeight: 'bold', padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {sub.badge}
                  </div>
                )}
                <div style={{ fontSize: 36, marginBottom: 12 }}>{sub.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{sub.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 20, lineHeight: 1.5 }}>{sub.tag}</p>

                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 40, fontWeight: 800 }}>${sub.price}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-dim)', marginLeft: 4 }}>/month</span>
                </div>

                <ul style={{ padding: 0, margin: '0 0 24px', listStyle: 'none', flexGrow: 1 }}>
                  {sub.features.map(f => (
                    <li key={f} style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.4 }}>
                      <span style={{ color: sub.accent, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/checkout?product_id=${sub.id}`}
                  className={`btn ${sub.badge ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', textAlign: 'center', padding: 12 }}
                >
                  {sub.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ADD-ONS */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Add-Ons</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)' }}>Need extra help? These can be added to any plan.</p>
          </div>
          <div className="grid grid-2" style={{ gap: 20, maxWidth: 800, margin: '0 auto' }}>
            {ADDONS.map(addon => (
              <div key={addon.name} className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700 }}>{addon.name}</h3>
                  <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)', whiteSpace: 'nowrap', marginLeft: 12 }}>{addon.price}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRICING NOTE */}
        <div style={{ textAlign: 'center', padding: '48px 28px', borderRadius: 24, border: '1px solid var(--border)', background: 'rgba(162,117,255,0.03)', maxWidth: 700, margin: '0 auto' }}>
          <h3 style={{ fontSize: 22, marginBottom: 12 }}>Not Sure Which Plan?</h3>
          <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 8 }}>
            The preloaded USB includes a premium MoveSpeed drive with the entire Lux Agent OS system, LANA, Success Packs, training, and privacy-first setup — ready to launch.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 24 }}>
            Prefer to save? The digital download gives you the same software at a lower price — you just set it up yourself.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-dim)', opacity: 0.6 }}>
            Questions? Email <strong style={{ color: 'var(--text)' }}>hello@luxautomaton.com</strong>
          </p>
        </div>

      </section>
    </main>
  )
}
