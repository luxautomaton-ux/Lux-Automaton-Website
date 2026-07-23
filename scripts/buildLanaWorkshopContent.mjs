import fs from 'fs';

const jsonPath = '/Users/asaspade/Downloads/LANA_Content_Command_Center_Complete_Workshop_Package/05_Structured_Data/LANA_Content_Command_Center_Workshop.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const lessons = data.lessons.map((les, idx) => {
  const modIdx = Math.floor(idx / 2);
  const mod = data.modules[modIdx];
  const imageName = `0${idx + 2}_` + (
    idx === 0 ? 'lesson_01_choose_three_conversations.png' :
    idx === 1 ? 'lesson_02_evidence_rich_idea_bank.png' :
    idx === 2 ? 'lesson_03_every_day_has_a_job.png' :
    idx === 3 ? 'lesson_04_one_source_production_flow.png' :
    idx === 4 ? 'lesson_05_capture_the_voice.png' :
    idx === 5 ? 'lesson_06_signal_brief.png' :
    idx === 6 ? 'lesson_07_clear_review.png' :
    idx === 7 ? 'lesson_08_approval_lane.png' :
    idx === 8 ? 'lesson_09_translate_to_video.png' :
    'lesson_10_deepen_in_email.png'
  );

  return {
    title: les.title || les.lesson_title,
    duration: `${les.duration_minutes || 15} min`,
    moduleTitle: mod ? `Module ${mod.module_number || (modIdx + 1)}: ${mod.title || mod.module_title}` : `Module ${modIdx + 1}`,
    overview: les.overview || (les.teaching_section ? les.teaching_section.overview : "") || "",
    content: les.teaching_section ? les.teaching_section.content.join("\n\n") : (les.content || ""),
    objectives: les.objectives || [],
    activity: les.activity ? (typeof les.activity === 'string' ? les.activity : `${les.activity.title}: ${les.activity.instructions}`) : "",
    deliverable: les.activity && les.activity.deliverable ? les.activity.deliverable : (les.deliverable || ""),
    tips: les.tips || [],
    checkIn: les.check_in ? (typeof les.check_in === 'string' ? les.check_in : les.check_in.question) : "",
    image: `/images/workshops/lana-content-command-center/${imageName}`
  };
});

const fullProgram = {
  slug: "lana-content-command-center",
  audience: "Lux Automaton",
  title: "LANA Content Command Center",
  level: data.identity.level,
  ageBand: data.identity.audience,
  duration: `${data.identity.core_duration_minutes} minutes (90 min + 30 min Lab)`,
  image: "/images/workshops/lana-content-command-center/00_workshop_hero.png",
  thumbnail: "/images/workshops/lana-content-command-center/01_workshop_thumbnail.png",
  brandLogo: "/images/workshops/lana-content-command-center/Lux_Automaton_Authentic_Logo.png",
  workbookPdfUrl: "/workshops/lana-content-command-center/downloads/LANA_Content_Command_Center_Participant_Workbook.pdf",
  facilitatorDeckPdfUrl: "/workshops/lana-content-command-center/downloads/LANA_Content_Command_Center_Facilitator_Deck.pdf",
  fullGuidePdfUrl: "/workshops/lana-content-command-center/downloads/LANA_Content_Command_Center_Full_Workshop_Guide.pdf",
  description: data.identity.short_catalog_description,
  outcome: data.identity.final_learner_outcome,
  materials: data.materials,
  learningGoals: data.learning_goals,
  prerequisites: data.prerequisites,
  safetyNotes: data.safety_privacy ? data.safety_privacy.safety_rules : [],
  lessons: lessons
};

fs.writeFileSync('./scripts/generated_lana_workshop.json', JSON.stringify(fullProgram, null, 2));
console.log('Successfully generated scripts/generated_lana_workshop.json with', lessons.length, 'lessons!');
