import { NextRequest, NextResponse } from 'next/server'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'luxagent@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // For now, log the submission and return success
    // In production, this would send an email via SendGrid, Resend, or similar
    console.log('=== NEW CUSTOM PACK REQUEST ===')
    console.log(`To: ${CONTACT_EMAIL}`)
    console.log(`From: ${data.name} <${data.email}>`)
    console.log(`Business: ${data.businessName} (${data.businessType})`)
    console.log(`Location: ${data.location}`)
    console.log(`Team Size: ${data.teamSize}`)
    console.log(`Services: ${data.services}`)
    console.log(`Ideal Customer: ${data.idealCustomer}`)
    console.log(`Current Tools: ${data.currentTools}`)
    console.log(`Top Challenges: ${data.topChallenges}`)
    console.log(`Goals: ${data.goals}`)
    console.log(`Budget: ${data.budget}`)
    console.log(`Timeline: ${data.timeline}`)
    console.log(`Notes: ${data.notes}`)
    console.log('================================')

    // Try sending via mailto link approach - store for now
    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Custom pack form error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
