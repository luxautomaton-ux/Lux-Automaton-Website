import { memoryBySlug, successPacks } from './packData'

const pack = (slug: string) => {
  const found = successPacks.find(item => item.slug === slug)
  if (!found) throw new Error(`Missing success pack: ${slug}`)
  return found
}

const memory = (slugs: string[]) => slugs.map(slug => {
  const found = memoryBySlug.get(slug)
  if (!found) throw new Error(`Missing memory pack: ${slug}`)
  return found
})

export type UseCaseStory = {
  slug: string
  title: string
  audience: string
  hero: string
  problem: string
  dayOne: string
  value: string
  strength: number
  successSlug: string
  memorySlugs: string[]
  setup: string[]
  problemsSolved: string[]
  workflow: {
    title: string
    body: string
  }[]
}

export const useCaseStories: UseCaseStory[] = [
  {
    slug: 'real-estate-agent',
    title: 'Real Estate Agent',
    audience: 'Agents and small broker teams',
    hero: '/lux-agent-website/packs/success-official/001-real-estate.png',
    problem: 'Leads, listings, open houses, buyer questions, seller updates, and local content pile up faster than one agent can keep organized.',
    dayOne: 'The team is ready to write listing copy, plan open house follow-up, prep buyer messages, and keep deal communication moving.',
    value: 'Turns a blank USB into a real estate command center with sales memory, follow-up structure, proposal language, and local networking support.',
    strength: 94,
    successSlug: 'real-estate',
    memorySlugs: ['consultative-selling', 'follow-up-machine', 'proposal-writing', 'local-networking'],
    setup: ['Complete Business HQ with service area, ideal client, listing types, and tone.', 'Activate the Real Estate Success Pack.', 'Add the four recommended Memory Packs.', 'Ask LANA for a 7-day buyer, seller, and open-house action plan.'],
    problemsSolved: ['Weak follow-up after showings', 'Slow listing descriptions', 'No local content rhythm', 'Scattered buyer and seller notes', 'Unclear referral asks', 'Hard-to-repeat deal workflow'],
    workflow: [
      { title: 'Lead comes in', body: 'Dre qualifies the lead and LANA prepares the first warm response.' },
      { title: 'Listing or buyer need is identified', body: 'Roman drafts local content, Anna frames value, and Jasmine gathers neighborhood angles.' },
      { title: 'Follow-up gets handled', body: 'The Follow-Up Machine memory gives LANA timing, tone, and next-step structure.' },
      { title: 'The owner closes the loop', body: 'LANA turns the conversation into a checklist, saved note, and next action.' },
    ],
  },
  {
    slug: 'restaurant-owner',
    title: 'Restaurant Owner',
    audience: 'Restaurants, cafes, chefs, and food trucks',
    hero: '/lux-agent-website/packs/success-official/002-restaurant.png',
    problem: 'Owners need daily specials, reviews, local posts, event ideas, menu updates, and customer messages while still running service.',
    dayOne: 'The team is ready to create specials, social posts, review replies, local promotions, and a repeatable weekly marketing plan.',
    value: 'Adds restaurant language, local marketing rhythm, brand voice, and customer retention prompts so LANA can help fill seats.',
    strength: 91,
    successSlug: 'restaurant',
    memorySlugs: ['offer-design', 'public-speaking-and-pitching', 'referral-flywheel', 'local-networking'],
    setup: ['Enter menu style, neighborhood, hours, offers, and brand voice in Business HQ.', 'Activate the Restaurant Success Pack.', 'Add marketing and local networking Memory Packs.', 'Ask LANA to build a week of specials, posts, and review responses.'],
    problemsSolved: ['No content plan', 'Slow response to reviews', 'Weak local promotion', 'Menu ideas not turned into sales copy', 'Events not marketed early enough', 'Inconsistent brand voice'],
    workflow: [
      { title: 'Menu or offer is chosen', body: 'LANA turns it into customer-friendly copy and a local post angle.' },
      { title: 'Roman builds the campaign', body: 'Social memory supplies hooks, captions, and posting rhythm.' },
      { title: 'Dre supports sales', body: 'Promos become texts, emails, and partnership messages.' },
      { title: 'The week repeats', body: 'The owner gets a reusable calendar instead of starting from zero.' },
    ],
  },
  {
    slug: 'contractor-team',
    title: 'Contractor Team',
    audience: 'Electricians, HVAC, plumbing, roofing, and field service',
    hero: '/lux-agent-website/packs/success-official/004-electrical-contractor.png',
    problem: 'Quotes, emergency calls, service pages, estimates, scheduling, reviews, and follow-up all compete for the owner’s attention.',
    dayOne: 'The team is ready to write estimates, build service-page copy, follow up on quotes, and explain value without sounding pushy.',
    value: 'Gives the USB practical trades context, objection handling, pricing support, and follow-up systems for turning calls into jobs.',
    strength: 96,
    successSlug: 'electrical-contractor',
    memorySlugs: ['cold-outreach-that-feels-human', 'follow-up-machine', 'objection-handling', 'pricing-psychology'],
    setup: ['Add service list, service area, emergency policy, pricing style, and customer promise.', 'Activate the Electrical Contractor Success Pack.', 'Add sales and pricing Memory Packs.', 'Ask LANA for quote follow-up scripts and a local lead plan.'],
    problemsSolved: ['Quotes that go cold', 'Customers focused only on price', 'No review request workflow', 'Slow estimate wording', 'Inconsistent service-page copy', 'Missed maintenance plan upsells'],
    workflow: [
      { title: 'Customer requests a quote', body: 'Dre drafts discovery questions and a clear next step.' },
      { title: 'Estimate is prepared', body: 'Anna helps frame value, risk, warranty, and payment clarity.' },
      { title: 'Objection appears', body: 'LANA uses objection memory to respond without discounting too fast.' },
      { title: 'Job is won or nurtured', body: 'Follow-up memory keeps the lead alive with respectful timing.' },
    ],
  },
  {
    slug: 'creator-business',
    title: 'Creator Business',
    audience: 'Creators, coaches, podcasters, educators, and personal brands',
    hero: '/lux-agent-website/packs/success-official/005-creator.png',
    problem: 'Ideas, scripts, offers, captions, sponsorship pitches, launches, and audience follow-up become scattered across apps.',
    dayOne: 'The team is ready to turn ideas into scripts, posts, offers, content calendars, and audience engagement prompts.',
    value: 'Gives LANA brand memory, hook libraries, calendar rhythm, and local networking so the creator can publish and sell with consistency.',
    strength: 92,
    successSlug: 'creator',
    memorySlugs: ['offer-design', 'public-speaking-and-pitching', 'referral-flywheel', 'local-networking'],
    setup: ['Add niche, audience promise, tone, offers, platforms, and content pillars.', 'Activate the Creator Success Pack.', 'Add brand, hooks, calendar, and networking Memory Packs.', 'Ask LANA to build a 14-day content and offer plan.'],
    problemsSolved: ['Content inconsistency', 'Weak hooks', 'No launch rhythm', 'Unclear offer copy', 'Missed sponsorship outreach', 'Brand voice changing every post'],
    workflow: [
      { title: 'Idea is captured', body: 'LANA sorts it into content pillar, offer angle, or audience question.' },
      { title: 'Roman writes the post', body: 'Hook and brand memory keep the voice consistent.' },
      { title: 'Dre supports monetization', body: 'Offers, sponsorship pitches, and follow-up messages get drafted.' },
      { title: 'Calendar becomes repeatable', body: 'The system keeps publishing from becoming a blank-page problem.' },
    ],
  },
  {
    slug: 'clinic-office',
    title: 'Clinic Office',
    audience: 'Small clinics, wellness offices, and service practices',
    hero: '/lux-agent-website/packs/success-official/003-doctor-clinic.png',
    problem: 'Patient communication, reputation, follow-up, educational content, and admin summaries need care, clarity, and consistency.',
    dayOne: 'The team is ready to draft patient-friendly education, appointment reminders, follow-up templates, and review response ideas.',
    value: 'Combines clinic context with retention, consultative communication, follow-up, and local trust building.',
    strength: 90,
    successSlug: 'doctor-clinic',
    memorySlugs: ['client-retention', 'consultative-selling', 'follow-up-machine', 'local-networking'],
    setup: ['Add practice type, services, patient questions, tone, and local area.', 'Activate the Doctor / Clinic Success Pack.', 'Add retention, consultative, follow-up, and local Memory Packs.', 'Ask LANA for patient communication templates and a reputation plan.'],
    problemsSolved: ['Missed patient follow-up', 'Hard-to-explain services', 'Inconsistent review responses', 'No local trust content', 'Admin notes not turned into action', 'Weak reactivation campaigns'],
    workflow: [
      { title: 'Patient need is identified', body: 'LANA translates it into clear, friendly communication.' },
      { title: 'Follow-up is scheduled', body: 'Retention and follow-up memory keep the office consistent.' },
      { title: 'Content builds trust', body: 'Roman creates educational posts and FAQ-style answers.' },
      { title: 'The office stays organized', body: 'Andre turns repeated work into checklists and SOPs.' },
    ],
  },
  {
    slug: 'beauty-salon',
    title: 'Beauty Salon',
    audience: 'Salons, stylists, barbers, and beauty service teams',
    hero: '/lux-agent-website/packs/success-official/006-beauty-salon.png',
    problem: 'Bookings, reminders, social proof, client retention, service packages, and before/after marketing need a steady system.',
    dayOne: 'The team is ready to create booking prompts, service descriptions, client reminders, review asks, and social campaigns.',
    value: 'Turns the USB into a beauty business growth desk with brand voice, hooks, content rhythm, and local networking built in.',
    strength: 89,
    successSlug: 'beauty-salon',
    memorySlugs: ['offer-design', 'public-speaking-and-pitching', 'referral-flywheel', 'local-networking'],
    setup: ['Add services, style, customer types, policies, and brand voice.', 'Activate the Beauty / Salon Success Pack.', 'Add social and local Memory Packs.', 'Ask LANA for a booking, retention, and social proof plan.'],
    problemsSolved: ['Empty appointment gaps', 'No client reminder flow', 'Weak service descriptions', 'Inconsistent before/after posts', 'No review request system', 'No package promotion plan'],
    workflow: [
      { title: 'Client books or asks', body: 'LANA drafts friendly replies, prep notes, and next-step reminders.' },
      { title: 'Service is packaged', body: 'Anna and Dre help position service bundles and upsells.' },
      { title: 'Roman creates social proof', body: 'Brand and hook memory turn work into posts customers understand.' },
      { title: 'Retention repeats', body: 'LANA builds rebooking reminders and review asks.' },
    ],
  },
]

export const getUseCaseStory = (slug: string) => useCaseStories.find(story => story.slug === slug)

export const getUseCasePack = (story: UseCaseStory) => pack(story.successSlug)

export const getUseCaseMemory = (story: UseCaseStory) => memory(story.memorySlugs)
