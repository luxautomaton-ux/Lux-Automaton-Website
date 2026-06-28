import { SiteCards, SiteCTA, SiteHero, SitePricing, SiteSplit } from '@/components/SitePageKit'

export const metadata = {
  title: 'Pricing | Lux Agent USB',
  description: 'Choose a Lux Agent USB package, software download, setup tier, or business add-on.',
}

const tiers = [
  {
    name: 'Digital Download',
    price: '$299',
    body: 'Best for DIY customers who want the Lux Agent OS files and can handle their own setup.',
    cta: 'Download Lux Agent OS',
    href: '/checkout?product_id=prod_download',
    accent: '#60A5FA',
    items: ['Lux Agent OS download', 'LANA basic', 'Business HQ', 'Vault starter', 'Training guide'],
  },
  {
    name: 'Preloaded USB',
    price: '$499',
    body: 'The clean starter package: premium USB, Lux Agent OS preloaded, and customer-ready launch files.',
    cta: 'Buy Preloaded USB',
    href: '/checkout?product_id=prod_usb_starter',
    accent: '#A275FF',
    featured: true,
    items: ['Premium USB drive', 'Preloaded Lux Agent OS', 'Start Here flow', 'Success Pack preview', 'Privacy-first folders'],
  },
  {
    name: 'Business Setup',
    price: '$999',
    body: 'For owners who want the USB plus help setting up Business HQ, one Success Pack, and first workflows.',
    cta: 'Book Business Setup',
    href: '/checkout?product_id=prod_usb_business',
    accent: '#2DD4BF',
    items: ['Everything in Preloaded USB', 'Business HQ setup', 'One Success Pack', 'CRM starter', 'Training walkthrough'],
  },
  {
    name: 'Pro Setup',
    price: '$1,999',
    body: 'A deeper done-with-you setup for the owner who wants a polished private AI business system.',
    cta: 'Book Pro Setup',
    href: '/checkout?product_id=prod_usb_pro',
    accent: '#FBBF24',
    items: ['Everything in Business Setup', 'Personalized Success Pack', 'Money Suite setup', 'Web Intelligence', '90-day plan'],
  },
  {
    name: 'Money Suite',
    price: '$79/mo',
    body: 'Monthly tools for budget tracking, money leaks, receipts, write-offs, and owner-ready reports.',
    cta: 'Unlock Money Suite',
    href: '/checkout?product_id=sub_money_suite',
    accent: '#34D399',
    items: ['Budgeter Pro', 'Money Leak Finder', 'WriteOff Pro', 'Receipt Tracker', 'CPA-ready exports'],
  },
  {
    name: 'Full Business OS',
    price: '$149/mo',
    body: 'Advanced monthly workflows for owners who want more research, reporting, packs, and business reviews.',
    cta: 'Unlock Full OS',
    href: '/checkout?product_id=sub_full_business',
    accent: '#8B5CF6',
    items: ['Money Suite included', 'Web Intelligence Pro', 'Advanced lead research', 'Agent reports', 'Monthly review workflows'],
  },
]

export default function StorePage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Choose the way you want Lux Agent."
        body="Start with the software, buy a preloaded USB, or add setup support so the customer receives a clean private AI business OS ready to understand."
        image="/lux-agent-website/generated-pages/pricing-hero.png"
        primary={{ href: '/checkout?product_id=prod_usb_starter', label: 'Buy Preloaded USB' }}
        secondary={{ href: '/custom-pack', label: 'Request custom pack' }}
        stats={[
          { value: '256GB', label: 'USB option' },
          { value: '1000+', label: 'Mbps class' },
          { value: 'USB-C', label: 'Dual port' },
          { value: 'Private', label: 'AI OS' },
        ]}
      />
      <SiteSplit
        title="Not just software. A customer-ready private AI product."
        body="The store makes the choice clear: download it, buy it preloaded, or let Lux Automaton help set up the business context, packs, folders, and first operating workflows."
        image="/lux-agent-website/banner-usb.jpg"
      />
      <SitePricing tiers={tiers} />
      <SiteCards
        title="Add the support your customer needs."
        body="These add-ons help turn the USB from a powerful product into a ready-to-sell business solution."
        cards={[
          { title: 'Custom Success Pack', body: 'A profession pack built around the customer’s offer, services, audience, and operating style.', accent: '#A275FF' },
          { title: 'Website Setup', body: 'Landing page copy, service page structure, offer framing, and lead capture guidance.', accent: '#22d3ee' },
          { title: 'AI Team Coaching', body: 'Monthly support to help the customer use LANA, agents, packs, memory, and reports.', accent: '#34D399' },
        ]}
      />
      <SiteCTA
        title="Ready to give a business owner a private AI team?"
        body="Lux Agent USB is packaged to feel premium, practical, and understandable from the first launch."
        href="/checkout?product_id=prod_usb_starter"
        label="Start with Preloaded USB"
      />
    </main>
  )
}
