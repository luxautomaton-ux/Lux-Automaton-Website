/* eslint-disable */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_UID = "08225005-1556-42d9-8c9e-691185769300";
const MUAPI_BASE = "https://api.muapi.ai/api/v1";

type SourceRequest = {
  youtubeUrl?: string;
  articleUrl?: string;
  articleText?: string;
  mediaUrl?: string;
  mediaKind?: "video" | "podcast" | "audio";
  titleHint?: string;
  audience?: "Lux Automaton" | "Lux AI Kids";
  level?: "Beginner" | "Intermediate" | "Advanced";
  generateImages?: boolean;
};

const jsonResponse = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function safeUrl(value?: string) {
  if (!value) return null;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only HTTP or HTTPS source links are supported.");
  const host = url.hostname.toLowerCase();
  const blocked = host === "localhost"
    || host === "0.0.0.0"
    || host === "::1"
    || host.endsWith(".local")
    || /^127\./.test(host)
    || /^10\./.test(host)
    || /^192\.168\./.test(host)
    || /^169\.254\./.test(host)
    || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
  if (blocked) throw new Error("Private network source links are not supported.");
  return url.toString();
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function firstOutput(result: any): any {
  if (!result) return null;
  if (result.output !== undefined) return result.output;
  if (result.text !== undefined) return result.text;
  if (result.response !== undefined) return result.response;
  if (Array.isArray(result.outputs) && result.outputs.length) return result.outputs[0];
  if (result.data?.[0]?.url) return result.data[0].url;
  if (result.data !== undefined) return result.data;
  return result;
}

async function muRequest(path: string, body: unknown, apiKey: string, openAiCompatible = false) {
  const response = await fetch(openAiCompatible ? `https://api.muapi.ai${path}` : `${MUAPI_BASE}/${path}`, {
    method: "POST",
    headers: openAiCompatible
      ? { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" }
      : { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.detail || data?.message || data?.error || `MuAPI request failed (${response.status})`);
  return data;
}

async function muSubmitAndPoll(path: string, body: unknown, apiKey: string, maxWaitMs = 150_000) {
  const submitted = await muRequest(path, body, apiKey);
  if (!submitted.request_id) return firstOutput(submitted);

  const started = Date.now();
  while (Date.now() - started < maxWaitMs) {
    await sleep(1800);
    const response = await fetch(`${MUAPI_BASE}/predictions/${submitted.request_id}/result`, {
      headers: { "x-api-key": apiKey },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result?.message || result?.error || "Unable to read generation result.");
    if (result.status === "completed") return firstOutput(result);
    if (["failed", "cancelled"].includes(result.status)) throw new Error(result.error || `Generation ${result.status}.`);
  }
  throw new Error("Generation timed out. Please try again with a shorter source.");
}

function outputUrl(value: any): string {
  if (typeof value === "string" && /^https?:\/\//.test(value)) return value;
  if (Array.isArray(value)) {
    const match = value.find((item) => typeof item === "string" && /^https?:\/\//.test(item));
    if (match) return match;
  }
  if (value?.url) return value.url;
  if (value?.audio_url) return value.audio_url;
  if (value?.download_url) return value.download_url;
  throw new Error("The media service did not return a usable file URL.");
}

function outputText(value: any): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(outputText).join("\n");
  if (value?.text) return value.text;
  if (value?.content) return typeof value.content === "string" ? value.content : JSON.stringify(value.content);
  return JSON.stringify(value);
}

function parseWorkshop(value: any) {
  if (typeof value === "object" && value && !Array.isArray(value)) return value;
  const text = outputText(value).replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("LANA did not return a valid workshop draft.");
  return JSON.parse(text.slice(start, end + 1));
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String).map((item) => item.trim()).filter(Boolean) : [];
}

function completeLessonContent(lesson: any): string {
  const section = (title: string, value: unknown) => {
    if (!value) return "";
    if (Array.isArray(value)) return value.length ? `${title}\n${value.map((item, index) => `${index + 1}. ${String(item)}`).join("\n")}` : "";
    if (typeof value === "object") {
      const question = (value as any).question ? `Question: ${(value as any).question}` : "";
      const answer = (value as any).answer ? `Answer: ${(value as any).answer}` : "";
      return question || answer ? `${title}\n${[question, answer].filter(Boolean).join("\n")}` : `${title}\n${JSON.stringify(value)}`;
    }
    return `${title}\n${String(value)}`;
  };
  return [
    lesson.teaching || lesson.content,
    section("CASE STUDY", lesson.caseStudy),
    section("STEP-BY-STEP", lesson.steps),
    section("COMMON MISTAKE", lesson.commonMistake),
    section("KNOWLEDGE CHECK", lesson.knowledgeCheck),
    section("FACILITATOR GUIDANCE", lesson.facilitatorGuidance),
    section("ACCESSIBLE ALT TEXT", lesson.altText),
  ].filter(Boolean).join("\n\n");
}

async function persistImage(supabaseAdmin: any, sourceUrl: string, path: string) {
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error("Unable to preserve generated artwork.");
  const bytes = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "image/png";
  const extension = contentType.includes("jpeg") ? "jpg" : contentType.includes("webp") ? "webp" : "png";
  const objectPath = `${path}.${extension}`;
  const { error } = await supabaseAdmin.storage.from("workshop-media").upload(objectPath, bytes, {
    contentType,
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) throw error;
  return supabaseAdmin.storage.from("workshop-media").getPublicUrl(objectPath).data.publicUrl;
}

async function generateImage(supabaseAdmin: any, apiKey: string, prompt: string, size: "1792x1024" | "1024x1024", path: string) {
  const result = await muRequest("/v1/images/generations", {
    model: "flux-schnell",
    prompt,
    n: 1,
    size,
    response_format: "url",
  }, apiKey, true);
  const remoteUrl = outputUrl(result?.data || result);
  return persistImage(supabaseAdmin, remoteUrl, path);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const muApiKey = Deno.env.get("MUAPI_API_KEY");
    if (!muApiKey) return jsonResponse({ error: "LANA media generation is not configured." }, 503);

    const authorization = request.headers.get("Authorization") || "";
    const token = authorization.replace(/^Bearer\s+/i, "");
    if (!token) return jsonResponse({ error: "Sign in to use LANA Auto-Build." }, 401);

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || authData.user?.id !== ADMIN_UID) return jsonResponse({ error: "Administrator access required." }, 403);

    const input = await request.json() as SourceRequest;
    const youtubeUrl = safeUrl(input.youtubeUrl);
    const articleUrl = safeUrl(input.articleUrl);
    const mediaUrl = safeUrl(input.mediaUrl);
    const articleText = (input.articleText || "").trim();
    if (!youtubeUrl && !articleUrl && !mediaUrl && !articleText) {
      return jsonResponse({ error: "Add a YouTube link, article, video, or podcast source." }, 400);
    }

    const sourceParts: string[] = [];
    const sourceUrls = [youtubeUrl, articleUrl, mediaUrl].filter(Boolean) as string[];
    let sourceType = "article-text";

    if (articleUrl) {
      sourceType = "article";
      const articleResponse = await fetch(articleUrl, { headers: { "User-Agent": "Lux-LANA-Workshop-Builder/1.0" } });
      if (!articleResponse.ok) throw new Error(`Unable to read the article (${articleResponse.status}).`);
      const html = (await articleResponse.text()).slice(0, 2_000_000);
      sourceParts.push(`ARTICLE SOURCE:\n${stripHtml(html).slice(0, 40_000)}`);
    }

    if (articleText) sourceParts.push(`ARTICLE OR NOTES PROVIDED BY ADMIN:\n${articleText.slice(0, 40_000)}`);

    let transcript = "";
    if (youtubeUrl) {
      sourceType = articleUrl || articleText ? "youtube-and-article" : "youtube";
      const downloaded = await muSubmitAndPoll("youtube-download", { video_url: youtubeUrl, format: "mp3" }, muApiKey);
      const audioUrl = outputUrl(downloaded);
      const transcription = await muSubmitAndPoll("openai-whisper", {
        audio_url: audioUrl,
        response_format: "text",
        temperature: 0,
      }, muApiKey);
      transcript = outputText(transcription).slice(0, 55_000);
      sourceParts.push(`YOUTUBE TRANSCRIPT:\n${transcript}`);
    }

    if (mediaUrl) {
      sourceType = input.mediaKind || "uploaded-media";
      const transcription = await muSubmitAndPoll("openai-whisper", {
        audio_url: mediaUrl,
        response_format: "text",
        temperature: 0,
      }, muApiKey);
      transcript = outputText(transcription).slice(0, 55_000);
      sourceParts.push(`${(input.mediaKind || "MEDIA").toUpperCase()} TRANSCRIPT:\n${transcript}`);
    }

    const sourceMaterial = sourceParts.join("\n\n").slice(0, 85_000);
    const audience = input.audience || "Lux Automaton";
    const level = input.level || "Beginner";
    const kidsVisualDirection = audience === "Lux AI Kids" ? `
Lux AI Kids brand direction:
- Deep navy/black technology classroom or creative studio with luminous cyan and electric-violet lighting.
- Friendly, bold, clear, kid-first composition with rainbow learning accents: blue, orange, green, and pink.
- Visual pillars: Learn, Create, Solve, Grow. Energy should feel warm, inclusive, safe, curious, and future-ready.
- When people or mentors are useful, portray a warm Black woman AI educator in a lavender shirt and an expressive orange felt youth learning mascot with black curls, rectangular glasses, freckles, a black Lux-style cap and hoodie. Keep them supportive, joyful, and age-appropriate.
- Leave a clean safe area for the real Lux AI Kids logo overlay; do not invent or misspell logos or render text inside generated art.
- Diagrams should use large, simple shapes, accurate objects, limited steps, and color-coded visual hierarchy for ages 8-17.` : `
Lux Automaton brand direction:
- Premium cinematic executive technology studio at night: dark navy and black, glass walls, subtle city lights, cyan and electric-violet architectural light.
- Founder-focused visual storytelling led by a confident Black male founder/operator in a tailored black suit and rectangular glasses, alongside a warm Black woman AI strategist/educator in a black blazer with a lavender blouse. Keep their appearance professional, consistent, credible, and collaborative.
- Show diverse small-business owners and teams in working sessions where appropriate. People should be actively reviewing, deciding, teaching, or building—not posing generically.
- Visualize business systems as accurate translucent glass interfaces: connected customer files, SOPs, budgets, projects, tasks, approvals, permissions, timelines, and next actions. Use clean cyan/violet outlines with restrained turquoise accents.
- Diagrams use numbered stages, strong spacing, simple icons, clear connections, owner-control cues, and executive presentation-board polish. Avoid dense fake dashboards and illegible microtext.
- Thumbnail composition: bold editorial hierarchy, subject on the right or center-right, usable negative space on the left for real headline and logo overlays, sophisticated high-contrast lighting.
- Brand feeling: owner-controlled, intelligent, private, guided, operational, trustworthy. AI supports the human owner; it does not replace human judgment.
- Leave a clean safe area for the real Lux Automaton logo overlay; do not invent or misspell logos or render text inside generated art.`;
    const systemPrompt = `You are LANA, Lux Automaton's senior curriculum architect, facilitator, and visual director. Transform source material into a complete, original, publication-ready workshop package at the quality level of AI Foundations for Founders: rigorous source analysis, five outcome-led modules, ten substantial lessons, facilitator-ready teaching, participant activities, concrete deliverables, knowledge checks, a cumulative final project, and a coherent original visual system. Preserve factual accuracy, never copy long passages, clearly label invented teaching examples, and return ONLY valid JSON with no markdown fences.`;
    const prompt = `Create a premium ${audience} workshop at ${level} level from the source below.

Requirements:
- Exactly 5 outcome-led modules and exactly 10 substantial lessons total unless the source clearly requires more.
- Every module needs a description and measurable module outcome.
- Each lesson must contain an overview, 3 learning objectives, 500-900 words of facilitator-ready teaching, an original fictional case study, 4-6 numbered steps, a hands-on activity, a concrete workbook deliverable, 4 useful tips, one common mistake, a check-in question, a knowledge-check question and answer, facilitator guidance, resources, image description, image prompt, and accessible alt text.
- Every lesson deliverable must become part of one cumulative final project. Include the final project brief, required steps, expected deliverables, completion checklist, evaluation rubric, reflection questions, and advanced challenge.
- Include delivery formats, participant materials, facilitator materials, safety/privacy controls, extension activities, and a short publishing package.
- Include practical examples and age-appropriate safety guidance.
- Create a cinematic hero/thumbnail prompt and a distinct original educational photograph or diagram prompt for every lesson. At least 4 lesson visuals must be clean educational diagrams and the rest should be original cinematic teaching photographs. Follow the exact brand direction below. Use no generated logos, no watermarks, and no text inside the artwork so the authentic brand lockup can be overlaid by the site.
- If the audience is Lux AI Kids, use encouraging language, avoid unsafe personal-data collection, and include parent/teacher guidance.

${kidsVisualDirection}

Return this exact JSON shape:
{
  "title": "",
  "slug": "",
  "ageBand": "",
  "duration": "",
  "description": "",
  "outcome": "",
  "materials": [""],
  "learningGoals": [""],
  "prerequisites": [""],
  "safetyNotes": [""],
  "extensionActivities": [""],
  "sourceSummary": "",
  "thumbnailPrompt": "",
  "deliveryFormats": [""],
  "facilitatorMaterials": [""],
  "finalProject": {
    "title": "",
    "brief": "",
    "requiredSteps": [""],
    "expectedDeliverables": [""],
    "completionChecklist": [""],
    "rubric": [""],
    "reflectionQuestions": [""],
    "advancedChallenge": ""
  },
  "publishingPackage": {
    "seoTitle": "",
    "metaDescription": "",
    "catalogExcerpt": "",
    "socialHooks": [""]
  },
  "modules": [
    {
      "title": "",
      "description": "",
      "outcome": "",
      "lessons": [
        {
          "title": "",
          "duration": "",
          "overview": "",
          "objectives": [""],
          "activity": "",
          "deliverable": "",
          "tips": [""],
          "checkIn": "",
          "teaching": "",
          "caseStudy": "",
          "steps": [""],
          "commonMistake": "",
          "knowledgeCheck": { "question": "", "answer": "" },
          "facilitatorGuidance": "",
          "resources": [{ "title": "", "url": "", "type": "" }],
          "imageDescription": "",
          "imagePrompt": "",
          "altText": ""
        }
      ]
    }
  ]
}

Preferred title or topic: ${input.titleHint || "Choose the strongest accurate title from the source."}

SOURCE MATERIAL:
${sourceMaterial}`;

    const generated = await muSubmitAndPoll("any-llm-models", {
      prompt,
      system_prompt: systemPrompt,
      model: "google/gemini-2.5-flash",
      reasoning: false,
      priority: "throughput",
      temperature: 0.55,
      max_tokens: 14000,
    }, muApiKey, 210_000);

    const workshop = parseWorkshop(generated);
    if (!workshop.title || !Array.isArray(workshop.modules) || workshop.modules.length === 0) {
      throw new Error("LANA created an incomplete draft. Please try again with a clearer source.");
    }

    const generationId = crypto.randomUUID();
    let thumbnailUrl: string | null = null;
    const generationVisualDirection = audience === "Lux AI Kids"
      ? "Lux AI Kids visual system: deep navy creative technology classroom, luminous cyan and violet, joyful rainbow blue orange green pink accents, clear kid-friendly hierarchy, warm inclusive educational energy, authentic cinematic lighting, leave clear logo-safe space"
      : "Lux Automaton executive visual system: premium midnight business technology studio with glass walls and subtle city lights, dark navy and black, luminous cyan and electric violet, confident Black male founder/operator in tailored black clothing and rectangular glasses working beside a warm Black woman AI strategist in a black blazer and lavender blouse, diverse owners where appropriate, accurate translucent glass workflow interfaces and clean connected operating-system diagrams, owner control and human approval, sophisticated editorial composition, leave clear negative space for the authentic Lux Automaton logo and headline overlay";
    const lessonPrompts = workshop.modules.flatMap((module: any, moduleIndex: number) =>
      (module.lessons || []).map((lesson: any, lessonIndex: number) => ({ moduleIndex, lessonIndex, prompt: lesson.imagePrompt || `${lesson.title}, educational cinematic diagram` })),
    ).slice(0, 12);

    if (input.generateImages !== false) {
      try {
        thumbnailUrl = await generateImage(
          supabaseAdmin,
          muApiKey,
          `${workshop.thumbnailPrompt || workshop.title}. ${generationVisualDirection}, polished 16:9 educational workshop cover, no generated logo, no watermark, no text.`,
          "1792x1024",
          `lana-generated/${generationId}/thumbnail`,
        );
      } catch (error) {
        console.error("Thumbnail generation failed", error);
      }

      const imageResults = await Promise.allSettled(lessonPrompts.map((item, imageIndex) => generateImage(
        supabaseAdmin,
        muApiKey,
        `${item.prompt}. Educational visual for ${workshop.title}. ${generationVisualDirection}, accurate objects, no generated logo, no watermark, no text.`,
        "1792x1024",
        `lana-generated/${generationId}/lesson-${imageIndex + 1}`,
      )));
      imageResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const item = lessonPrompts[index];
          workshop.modules[item.moduleIndex].lessons[item.lessonIndex].imageUrl = result.value;
        }
      });
    }

    const { data: workshopRow, error: workshopError } = await supabaseAdmin.from("workshops").insert({
      title: String(workshop.title),
      slug: slugify(String(workshop.slug || workshop.title)) + `-${Date.now().toString().slice(-5)}`,
      audience,
      level,
      age_band: String(workshop.ageBand || ""),
      duration: String(workshop.duration || ""),
      description: String(workshop.description || ""),
      outcome: String(workshop.outcome || ""),
      image_url: thumbnailUrl,
      thumbnail_url: thumbnailUrl,
      materials: stringArray(workshop.materials),
      learning_goals: stringArray(workshop.learningGoals),
      prerequisites: stringArray(workshop.prerequisites),
      safety_notes: stringArray(workshop.safetyNotes),
      extension_activities: [
        ...stringArray(workshop.extensionActivities),
        ...(workshop.finalProject?.title ? [`FINAL PROJECT — ${String(workshop.finalProject.title)}: ${String(workshop.finalProject.brief || "")}`] : []),
        ...stringArray(workshop.finalProject?.completionChecklist).map((item) => `FINAL PROJECT CHECK — ${item}`),
      ],
      status: "draft",
      created_by: authData.user.id,
      source_type: sourceType,
      source_urls: sourceUrls,
      source_summary: String(workshop.sourceSummary || "").slice(0, 5000),
      generated_by: "LANA · MuAPI · Gemini 2.5 Flash",
    }).select("id, slug, title").single();
    if (workshopError) throw workshopError;

    for (let moduleIndex = 0; moduleIndex < workshop.modules.length; moduleIndex += 1) {
      const module = workshop.modules[moduleIndex];
      const { data: moduleRow, error: moduleError } = await supabaseAdmin.from("workshop_modules").insert({
        workshop_id: workshopRow.id,
        title: String(module.title || `Module ${moduleIndex + 1}`),
        description: String(module.description || ""),
        order_index: moduleIndex,
      }).select("id").single();
      if (moduleError) throw moduleError;

      const lessons = Array.isArray(module.lessons) ? module.lessons : [];
      if (lessons.length) {
        const { error: lessonError } = await supabaseAdmin.from("workshop_lessons").insert(lessons.map((lesson: any, lessonIndex: number) => ({
          module_id: moduleRow.id,
          title: String(lesson.title || `Lesson ${lessonIndex + 1}`),
          duration: String(lesson.duration || ""),
          overview: String(lesson.overview || ""),
          objectives: stringArray(lesson.objectives),
          activity: String(lesson.activity || ""),
          deliverable: String(lesson.deliverable || ""),
          tips: stringArray(lesson.tips),
          check_in: String(lesson.checkIn || ""),
          content: completeLessonContent(lesson),
          image_url: lesson.imageUrl || null,
          resources: Array.isArray(lesson.resources) ? lesson.resources : [],
          order_index: lessonIndex,
        })));
        if (lessonError) throw lessonError;
      }
    }

    return jsonResponse({
      success: true,
      workshopId: workshopRow.id,
      slug: workshopRow.slug,
      title: workshopRow.title,
      modules: workshop.modules.length,
      lessons: workshop.modules.reduce((total: number, module: any) => total + (module.lessons?.length || 0), 0),
      thumbnailGenerated: Boolean(thumbnailUrl),
      lessonImagesGenerated: lessonPrompts.filter((item) => workshop.modules[item.moduleIndex].lessons[item.lessonIndex].imageUrl).length,
      status: "draft",
    });
  } catch (error) {
    console.error("LANA workshop generation failed", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Workshop generation failed." }, 500);
  }
});
