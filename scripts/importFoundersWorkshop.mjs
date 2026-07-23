import fs from "node:fs";

const PROJECT_REF = "khyzmyvrfjwwnbvwfhhk";
const ADMIN_UID = "08225005-1556-42d9-8c9e-691185769300";
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
const sourcePath = "/Users/asaspade/Downloads/AI_Foundations_for_Founders_Complete_Workshop_Package/05_Structured_Data/AI_Foundations_for_Founders_Workshop.json";
const publicRoot = "/workshops/ai-foundations-for-founders";

if (!accessToken) throw new Error("SUPABASE_ACCESS_TOKEN is required.");

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const lessonByNumber = new Map(source.lessons.map((lesson) => [lesson.lesson_number, lesson]));
const sharedResources = [
  { title: "Complete Workshop Guide", url: `${publicRoot}/downloads/workshop-guide.pdf`, type: "PDF" },
  { title: "Participant Workbook", url: `${publicRoot}/downloads/participant-workbook.pdf`, type: "PDF" },
  { title: "Facilitator Deck", url: `${publicRoot}/downloads/facilitator-deck.pdf`, type: "PDF" },
];

function section(title, body) {
  if (!body || (Array.isArray(body) && !body.length)) return "";
  const value = Array.isArray(body) ? body.map((item, index) => `${index + 1}. ${item}`).join("\n") : body;
  return `${title}\n${value}`;
}

const workshop = {
  slug: source.identity.slug,
  audience: "Lux Automaton",
  title: source.identity.title,
  level: source.identity.level,
  ageBand: source.identity.age_range,
  duration: `${source.identity.core_duration_minutes} minutes + optional ${source.identity.optional_clinic_minutes}-minute clinic`,
  description: source.identity.detailed_overview,
  outcome: source.identity.final_learner_outcome,
  imageUrl: `${publicRoot}/visuals/00_workshop_hero.png`,
  thumbnailUrl: `${publicRoot}/visuals/01_workshop_thumbnail.png`,
  materials: source.materials,
  learningGoals: source.learning_goals,
  prerequisites: source.prerequisites,
  safetyNotes: source.safety_privacy,
  extensionActivities: [
    ...source.extension_activities,
    `FINAL PROJECT — ${source.final_project.title}: ${source.final_project.brief}`,
    `COMPLETION STANDARD — ${source.final_project.scoring}`,
  ],
  sourceType: "complete-workshop-package",
  sourceUrls: [],
  sourceSummary: source.source_analysis.supplied_source_summary,
  generatedBy: "LANA quality benchmark · complete founder workshop package",
  modules: source.modules.map((module) => ({
    title: module.title,
    description: `${module.description}\n\nMODULE OUTCOME\n${module.outcome}`,
    lessons: module.lessons.map((lessonNumber) => {
      const lesson = lessonByNumber.get(lessonNumber);
      const knowledge = lesson.knowledge_check
        ? `Question: ${lesson.knowledge_check.question}\nAnswer: ${lesson.knowledge_check.answer}`
        : "";
      const content = [
        lesson.teaching,
        section("CASE STUDY", lesson.case_study),
        section("STEP-BY-STEP", lesson.steps),
        section("COMMON MISTAKE", lesson.common_mistake),
        section("KNOWLEDGE CHECK", knowledge),
        section("FACILITATOR GUIDANCE", lesson.facilitator_guidance),
        section("VISUAL DESCRIPTION", lesson.image_description),
        section("ACCESSIBLE ALT TEXT", lesson.alt_text),
      ].filter(Boolean).join("\n\n");

      return {
        title: lesson.title,
        duration: `${lesson.duration_minutes} min`,
        overview: lesson.overview,
        objectives: lesson.objectives,
        activity: lesson.activity,
        deliverable: lesson.deliverable,
        tips: lesson.tips,
        checkIn: lesson.check_in,
        content,
        imageUrl: `${publicRoot}/visuals/${lesson.visual_asset}`,
        resources: sharedResources,
      };
    }),
  })),
};

const json = JSON.stringify(workshop);
if (json.includes("$founders$")) throw new Error("Unexpected SQL delimiter in workshop data.");

const sql = `
do $block$
declare
  w jsonb := $founders$${json}$founders$::jsonb;
  m jsonb;
  l jsonb;
  workshop_id_value bigint;
  module_id_value bigint;
  module_index integer := 0;
  lesson_index integer;
begin
  insert into public.workshops (
    slug, audience, title, level, age_band, duration, description, outcome,
    image_url, thumbnail_url, materials, learning_goals, prerequisites,
    safety_notes, extension_activities, status, created_by, published_at,
    source_type, source_urls, source_summary, generated_by
  ) values (
    w->>'slug', w->>'audience', w->>'title', w->>'level', w->>'ageBand', w->>'duration',
    w->>'description', w->>'outcome', w->>'imageUrl', w->>'thumbnailUrl',
    array(select jsonb_array_elements_text(w->'materials')),
    array(select jsonb_array_elements_text(w->'learningGoals')),
    array(select jsonb_array_elements_text(w->'prerequisites')),
    array(select jsonb_array_elements_text(w->'safetyNotes')),
    array(select jsonb_array_elements_text(w->'extensionActivities')),
    'published', '${ADMIN_UID}'::uuid, now(), w->>'sourceType',
    array(select jsonb_array_elements_text(w->'sourceUrls')), w->>'sourceSummary', w->>'generatedBy'
  )
  on conflict (slug) do update set
    audience = excluded.audience, title = excluded.title, level = excluded.level,
    age_band = excluded.age_band, duration = excluded.duration, description = excluded.description,
    outcome = excluded.outcome, image_url = excluded.image_url, thumbnail_url = excluded.thumbnail_url,
    materials = excluded.materials, learning_goals = excluded.learning_goals,
    prerequisites = excluded.prerequisites, safety_notes = excluded.safety_notes,
    extension_activities = excluded.extension_activities, status = 'published',
    published_at = now(), source_type = excluded.source_type, source_urls = excluded.source_urls,
    source_summary = excluded.source_summary, generated_by = excluded.generated_by
  returning id into workshop_id_value;

  delete from public.workshop_modules where workshop_id = workshop_id_value;
  for m in select value from jsonb_array_elements(w->'modules')
  loop
    insert into public.workshop_modules (workshop_id, title, description, order_index)
    values (workshop_id_value, m->>'title', m->>'description', module_index)
    returning id into module_id_value;
    lesson_index := 0;
    for l in select value from jsonb_array_elements(m->'lessons')
    loop
      insert into public.workshop_lessons (
        module_id, title, duration, overview, objectives, activity, deliverable,
        tips, check_in, content, image_url, resources, order_index
      ) values (
        module_id_value, l->>'title', l->>'duration', l->>'overview',
        array(select jsonb_array_elements_text(l->'objectives')), l->>'activity', l->>'deliverable',
        array(select jsonb_array_elements_text(l->'tips')), l->>'checkIn', l->>'content',
        l->>'imageUrl', l->'resources', lesson_index
      );
      lesson_index := lesson_index + 1;
    end loop;
    module_index := module_index + 1;
  end loop;
end
$block$;
`;

const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
  method: "POST",
  headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: sql }),
});

const result = await response.json().catch(() => ({}));
if (!response.ok) throw new Error(result.message || result.error || `Workshop import failed (${response.status})`);

console.log(JSON.stringify({ imported: workshop.slug, modules: workshop.modules.length, lessons: source.lessons.length, resources: sharedResources.length }));
