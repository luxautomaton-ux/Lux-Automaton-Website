import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(req: NextRequest) {
  try {
    const { category, topic, ratio, character } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      // High-quality fallback generator if no API key reaches runtime
      return NextResponse.json(fallbackGenerate(category, topic, ratio, character));
    }

    const prompt = `You are LANA, the AI Marketing Specialist for Lux Automaton.
Generate a high-converting, visually stunning marketing campaign card.
Target Category: ${category || "General Marketing"}
Topic / Theme: ${topic || "Private AI Operating System"}
Aspect Ratio: ${ratio || "16:9"}
Preferred Character: ${character || "Asa"}

Respond ONLY with valid JSON in this exact structure:
{
  "name": "Campaign Name",
  "headline": "Punchy 3-8 word bold headline",
  "description": "Engaging 1-2 sentence description explaining the value proposition.",
  "cta": "Call to Action text (2-4 words)",
  "tag": "Category Tag / Label",
  "layout": "campaign" | "quote" | "newsletter" | "workshop" | "photo" | "background",
  "accent": "#00d4ff" | "#7c4dff" | "#00ffa3" | "#ff56b6",
  "backdrop": "circuit" | "eclipse" | "prism" | "void",
  "suggestedPhoto": "asa-close" | "asa-office" | "asa-founder" | "asa-black" | "asa-white" | "asa-tie" | "lana-seated" | "lana-standing" | "lana-office" | "lana-bw" | "lana"
}`;

    const endpoint = process.env.OPENAI_API_KEY
      ? "https://api.openai.com/v1/chat/completions"
      : "https://openrouter.ai/api/v1/chat/completions";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_API_KEY ? "gpt-4o" : "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "You output strictly valid JSON for marketing campaign cards." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(fallbackGenerate(category, topic, ratio, character));
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(fallbackGenerate("General", "Private AI OS", "16:9", "Asa"));
  }
}

function fallbackGenerate(category: string, topic: string, ratio: string, character: string) {
  const isKids = category?.toLowerCase().includes("kids");
  const isWorkshop = category?.toLowerCase().includes("workshop");
  const isLana = character?.toLowerCase().includes("lana") || topic?.toLowerCase().includes("lana");

  if (isKids) {
    return {
      name: "Lux AI Kids — Workshop",
      headline: "Imagine. Draw. Play Your First AI Game!",
      description: "Hands-on paper prototyping and AI creation for young builders aged 6 to 8.",
      cta: "Join Kids Workshop",
      tag: "Lux AI Kids",
      layout: "workshop",
      accent: "#00d4ff",
      backdrop: "circuit",
      suggestedPhoto: "lana-seated",
    };
  }

  if (isWorkshop) {
    return {
      name: "Founder AI Workshop",
      headline: "Build Your Private AI Operating System",
      description: "Step-by-step masterclass on turning daily business workflows into automated AI agents.",
      cta: "Reserve Your Spot",
      tag: "Founder Workshop",
      layout: "workshop",
      accent: "#7c4dff",
      backdrop: "eclipse",
      suggestedPhoto: "asa-founder",
    };
  }

  if (isLana) {
    return {
      name: "LANA Executive Assistant",
      headline: "Your Autonomous Executive AI Partner",
      description: "LANA handles your calendar, content pipeline, and operational workflows with zero friction.",
      cta: "Meet LANA AI",
      tag: "LANA AI",
      layout: "quote",
      accent: "#00ffa3",
      backdrop: "circuit",
      suggestedPhoto: "lana-office",
    };
  }

  return {
    name: "Private AI Campaign",
    headline: "Private AI Systems for Builders and Founders",
    description: "Run your business operating system locally with 100% data privacy and zero cloud dependency.",
    cta: "Explore Lux OS",
    tag: "Lux Automaton",
    layout: "campaign",
    accent: "#00d4ff",
    backdrop: "circuit",
    suggestedPhoto: "asa-close",
  };
}
