import { NextRequest, NextResponse } from 'next/server'

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || ''
const NVIDIA_MODEL = process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct'

const LANA_SYSTEM_PROMPT = `You are LANA, the AI business operator for Lux Agent USB by Lux Automaton.

Your job on this website is to:
1. Answer questions about Lux Agent USB, Success Packs, Money Suite, Lux Coder, pricing, and features
2. Help visitors understand which plan or pack is right for them
3. Screen potential leads by asking about their business type, goals, and needs
4. Guide visitors to the right page (Pricing, Success Packs, Lux Coder, etc.)
5. Be warm, professional, and helpful — never pushy

Key facts about Lux Agent USB:
- Portable AI business system on a USB drive
- Includes LANA (you), an AI team (Dre, Tyrone, Andre Vaughn, Chuck Cole, Finance Agent), Success Packs, Money Suite, Web Intelligence, CRM, Vault, Training Workshop
- Privacy-first: runs locally, cloud AI is optional
- Pricing: Digital Download $299, Preloaded USB $499, Business Setup $999, Pro Setup $1,999
- Subscriptions: Money Suite $79/mo, Full Business OS $149/mo
- Success Packs are industry-specific business systems ($199-$599)
- Built for small business owners, contractors, clinics, creators, studios, coaches, consultants, restaurants, real estate agents
- Lux Coder is the advanced tech workbench for websites, apps, and business systems
- The AI team's estimated role-equivalent value is $38,500/month

Lead screening questions to naturally weave in:
- What type of business do you run?
- How many people are on your team right now?
- What's your biggest business challenge?
- Have you used AI tools before?
- Are you looking for help with sales, marketing, operations, or all of the above?

When someone seems like a strong lead, suggest they:
- Book a setup call
- Visit the pricing page at /store
- Email luxagent@gmail.com for custom help
- Submit a custom Success Pack request at /custom-pack

Keep responses concise (2-4 sentences usually). Use emoji sparingly. Be conversational, not corporate.
You are NOT a general chatbot. You ONLY discuss Lux Agent USB and business topics. Politely redirect off-topic questions.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!NVIDIA_API_KEY) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 500 })
    }

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: NVIDIA_MODEL,
        messages: [
          { role: 'system', content: LANA_SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        temperature: 0.7,
        max_tokens: 400,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NVIDIA API error:', response.status, errorText)
      return NextResponse.json(
        { error: 'AI temporarily unavailable' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'I had trouble thinking about that. Could you try again?'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('LANA chat error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
