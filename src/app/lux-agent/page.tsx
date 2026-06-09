import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Use Cases | Lux Agent',
  description: 'See how real professionals use Lux Agent Success Packs to automate their business, grow revenue, and reclaim their time.'
}

const USE_CASES = [
  {
    title: 'The Doctor Who Never Misses a Follow-Up',
    subtitle: 'Dr. Torrey Dooley · Medical Practice',
    img: '/pack-doctor.png',
    accent: '#2DD4BF',
    glyph: '⚕️',
    story: 'Before Lux Agent, patient follow-ups fell through the cracks. Now LANA sends automated recall reminders, compiles daily patient summaries, and drafts referral letters — all offline, all HIPAA-safe.',
    bullets: [
      'Auto-generated daily patient briefings',
      'Appointment follow-up sequences that never forget',
      'Referral letter drafting in seconds, not hours',
    ],
    packId: 'pack_doctor',
    price: 499,
    reverse: false,
  },
  {
    title: 'The Label That Runs Like a Major',
    subtitle: 'Henry Taylor · No Sleep Entertainment',
    img: '/pack-music.png',
    accent: '#A275FF',
    glyph: '🎵',
    story: 'Henry used to juggle artists, releases, and marketing across 6 different apps. Now his entire label operates from one USB drive — LANA handles release calendars, social media drafts, and royalty tracking.',
    bullets: [
      'Release calendar with automated marketing sequences',
      'Artist roster management & contract tracking',
      'Social content generation for every platform',
    ],
    packId: 'pack_music',
    price: 499,
    reverse: true,
  },
  {
    title: 'More Leads. More Estimates. More Jobs.',
    subtitle: 'Isaiah Holt · Epic Electric',
    img: '/pack-electric.png',
    accent: '#FBBF24',
    glyph: '⚡',
    story: 'Isaiah was leaving money on the table — missed estimates, forgotten follow-ups, no marketing. Now LANA generates estimates from job photos, sends follow-up sequences, and runs local SEO content on autopilot.',
    bullets: [
      'AI-powered estimate generation from job details',
      'Automated 3-touch follow-up on every lead',
      'Local SEO blog posts drafted weekly',
    ],
    packId: 'pack_electric',
    price: 499,
    reverse: false,
  },
  {
    title: 'Fill Tables. Build Regulars. Own the Block.',
    subtitle: 'Restaurant & Food Truck Pack',
    img: '/pack-restaurant.png',
    accent: '#FB7185',
    glyph: '🍽️',
    story: 'No more paying $300/month for reservation software. LANA manages your bookings locally, drafts daily specials for social media, and tracks your top customers — all from a USB you can carry between locations.',
    bullets: [
      'Offline booking & reservation management',
      'Daily social media content for specials & events',
      'Customer loyalty tracking without a subscription',
    ],
    packId: 'pack_restaurant',
    price: 399,
    reverse: true,
  },
  {
    title: 'Close More Deals. Work Fewer Hours.',
    subtitle: 'Real Estate Success Pack',
    img: '/pack-realestate.png',
    accent: '#38BDF8',
    glyph: '🏠',
    story: 'Your CRM costs $200/month and you still forget to follow up. LANA builds comparative market analyses, drafts listing descriptions, and runs a drip campaign to your buyer list — all offline, all private.',
    bullets: [
      'Listing descriptions generated from property details',
      'Automated buyer follow-up sequences',
      'Market analysis reports compiled weekly',
    ],
    packId: 'pack_realestate',
    price: 399,
    reverse: false,
  },
  {
    title: 'Turn Attention Into a Repeatable Business',
    subtitle: 'Content Creator Pack',
    img: '/pack-creator.png',
    accent: '#F472B6',
    glyph: '🎨',
    story: 'Stop winging it. LANA plans your content calendar, writes hooks and captions, structures your brand deals pipeline, and even drafts sponsorship pitch decks — so you can focus on creating.',
    bullets: [
      '30-day content calendar generated from your niche',
      'Hook & caption writing for every platform',
      'Brand deal pipeline & sponsorship outreach',
    ],
    packId: 'pack_creator',
    price: 299,
    reverse: true,
  },
]

export default function LuxAgentPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <section className="container">

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(162,117,255,0.1)', border: '1px solid var(--primary)', borderRadius: 100, color: 'var(--primary)', fontWeight: 700, fontSize: 13, letterSpacing: 1.5, marginBottom: 20, textTransform: 'uppercase' }}>
            Real Results · Real People
          </div>
          <h1 className="section-title" style={{ marginBottom: 16 }}>
            See What <span style={{ color: 'var(--primary)' }}>Success</span> Looks Like
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 760, margin: '0 auto', lineHeight: 1.6 }}>
            Every Success Pack installs a complete business system into Lux Agent. Here's how real professionals use them to grow revenue, save time, and run on autopilot.
          </p>
        </div>

        {/* Use Cases */}
        {USE_CASES.map((uc, i) => (
          <div key={i} className="grid grid-2" style={{ alignItems: 'center', gap: 60, marginBottom: 100 }}>
            {/* Image */}
            <div style={{ order: uc.reverse ? 2 : 1 }}>
              <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 80px ${uc.accent}15` }}>
                <img
                  src={uc.img}
                  alt={uc.title}
                  style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px 20px', background: 'linear-gradient(to top, rgba(10,10,12,0.95), transparent)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{uc.glyph}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: uc.accent, letterSpacing: 0.5 }}>{uc.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ order: uc.reverse ? 1 : 2 }}>
              <h2 style={{ fontSize: 30, marginBottom: 14, lineHeight: 1.2 }}>{uc.title}</h2>
              <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 24 }}>
                {uc.story}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                {uc.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: uc.accent, fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ color: 'var(--text-dim)', lineHeight: 1.5 }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Link
                  href={`/checkout?product_id=${uc.packId}`}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px', fontSize: 15, background: uc.accent, color: '#0A0A0C' }}
                >
                  Get This Pack — ${uc.price}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', padding: '60px 28px', borderRadius: 28, border: '1px solid var(--border)', background: 'radial-gradient(600px 250px at 50% 0, rgba(162,117,255,0.15), transparent 70%)', marginBottom: 60 }}>
          <h2 style={{ fontSize: 36, marginBottom: 12 }}>Your industry. Your rules. Your AI team.</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 18, maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Don't see your industry? Every Lux Agent comes with LANA — she can be trained on any business, any workflow, any niche.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/checkout?product_id=prod_usb_pro" className="btn btn-primary">Order Lux Agent USB — $997</Link>
            <Link href="/store" className="btn btn-secondary">Browse All Packs</Link>
          </div>
        </div>

      </section>
    </main>
  )
}
