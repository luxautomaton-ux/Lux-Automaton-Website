"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { WORKSHOP_PROGRAMS, type Audience, type WorkshopProgram, type WorkshopLesson } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import { fetchWorkshops, workshopRowToProgram } from "@/lib/workshopDb";
import PdfPreviewDeckModal from "@/components/PdfPreviewDeckModal";
import ArticleVisualAssetsDeck, { type VisualAssetItem, type ResourceDownloadItem } from "@/components/ArticleVisualAssetsDeck";
import SocialShare from "@/components/SocialShare";

const tabs: Array<"All" | Audience> = ["All", "Lux Automaton"];

function getWorkshopVisualAssets(workshop: WorkshopProgram) {
  const images: VisualAssetItem[] = [];
  const downloads: ResourceDownloadItem[] = [];

  if (workshop.slug === "your-first-video-game") {
    downloads.push(
      {
        title: "Printable Kid Workbook (PDF)",
        subtitle: "Official printable 6-mission workshop workbook for ages 6–8",
        url: "/documents/Lux_AI_Kids_Your_First_Video_Game_Kid_Workbook.pdf",
        type: "Printable Kid Workbook"
      },
      {
        title: "Facilitator Presentation Deck (PDF)",
        subtitle: "Slide deck for educators, parents, and workshop leaders",
        url: "/documents/Lux_AI_Kids_Your_First_Video_Game_Facilitator_Deck.pdf",
        type: "Facilitator Slide Deck"
      },
      {
        title: "Master Facilitator Guide (PDF)",
        subtitle: "Complete 120-minute lesson plans, safety notes & check-ins",
        url: "/documents/Lux_AI_Kids_Your_First_Video_Game_Facilitator_Guide.pdf",
        type: "Master Guide PDF"
      },
      {
        title: "Printable Workshop Overview (HTML)",
        subtitle: "Standalone printable HTML overview sheet with all 6 missions & game recipe",
        url: "/documents/Lux_AI_Kids_Your_First_Video_Game_Printable_Overview.html",
        type: "Printable HTML Overview"
      },
      {
        title: "Editable Word Facilitator Guide (DOCX)",
        subtitle: "Fully editable Word document for classroom customization",
        url: "/documents/Lux_AI_Kids_Your_First_Video_Game_Facilitator_Guide.docx",
        type: "Editable DOCX Guide"
      },
      {
        title: "Workshop Curriculum JSON Data",
        subtitle: "Importable structured JSON data with lessons, rules & AI prompts",
        url: "/documents/Lux_AI_Kids_Your_First_Video_Game_Workshop.json",
        type: "Curriculum JSON Data"
      },
      {
        title: "Complete Workshop Package (ZIP)",
        subtitle: "Download all PDFs, PPTX, DOCX, JSON data, printable HTML & 14 visual assets",
        url: "/documents/Lux_AI_Kids_Your_First_Video_Game_Ages_6_8_Workshop_Package.zip",
        type: "Complete ZIP Package"
      }
    );

    images.push(
      {
        title: "Printable Workshop Overview Poster",
        subtitle: "Full 6-mission workshop blueprint with materials, outcome checklist, Ace's tip & Lana's AI power",
        imageUrl: "/images/printable_workshop_overview_your_first_video_game.png",
        type: "Printable Overview Poster"
      },
      {
        title: "16:9 Workshop Hero Poster",
        subtitle: "High-resolution workshop poster featuring Ace, LANA, and full 6-mission roadmap",
        imageUrl: "/images/01_workshop_hero_your_first_video_game.png",
        type: "16:9 Widescreen Poster"
      },
      {
        title: "Widescreen Workshop Overview Poster",
        subtitle: "Comprehensive infographic overview poster showing outcomes, materials & 6 missions",
        imageUrl: "/images/00_workshop_thumbnail_your_first_video_game.png",
        type: "Infographic Blueprint"
      },
      {
        title: "Classroom & Social Promo Poster",
        subtitle: "Square promo poster featuring Ace & LANA: Dream it. Draw it. Play it.",
        imageUrl: "/images/social_square_promo_your_first_video_game.png",
        type: "Promo Poster"
      },
      {
        title: "Diagram 01 — Game Recipe",
        subtitle: "Character, Goal, Challenge & Rules core game design formula",
        imageUrl: "/images/diagram_01_game_recipe.png",
        type: "Concept Diagram"
      },
      {
        title: "Diagram 02 — Level Path Map",
        subtitle: "Start space, obstacles, coins & goal map layout",
        imageUrl: "/images/diagram_02_level_path.png",
        type: "Level Layout Diagram"
      },
      {
        title: "Diagram 03 — Playtest Loop",
        subtitle: "Play game, gather feedback & refine rules iteration loop",
        imageUrl: "/images/diagram_03_playtest_loop.png",
        type: "Playtest Loop Diagram"
      },
      {
        title: "Diagram 04 — Safe AI Prompt Recipe",
        subtitle: "Grown-up guided AI art prompt structure for game art ideas",
        imageUrl: "/images/diagram_04_ai_prompt_recipe.png",
        type: "AI Prompt Diagram"
      },
      {
        title: "Mission 01 Visual Poster — What Makes a Game a Game?",
        subtitle: "Discover the four parts of a game and how they work together",
        imageUrl: "/images/lesson_01_visual_game_recipe.png",
        type: "Mission 01 Visual"
      },
      {
        title: "Mission 02 Visual Poster — Pick Your Theme",
        subtitle: "Choose your game world and the big adventure inside it",
        imageUrl: "/images/lesson_02_visual_pick_theme.png",
        type: "Mission 02 Visual"
      },
      {
        title: "Mission 03 Visual Poster — Design Your Character",
        subtitle: "Create your hero card on an index card with powers and story",
        imageUrl: "/images/lesson_03_visual_design_character.png",
        type: "Mission 03 Visual"
      },
      {
        title: "Mission 04 Visual Poster — Draw the Board",
        subtitle: "Design your level map with start, path, obstacles, and goal",
        imageUrl: "/images/lesson_04_visual_draw_board.png",
        type: "Mission 04 Visual"
      },
      {
        title: "Mission 05 Visual Poster — Make the Rules",
        subtitle: "Write your 4 simple game rules so everyone knows how to play",
        imageUrl: "/images/lesson_05_visual_make_rules.png",
        type: "Mission 05 Visual"
      },
      {
        title: "Mission 06 Visual Poster — Playtest Time!",
        subtitle: "Test your game, get feedback, and make it even better",
        imageUrl: "/images/lesson_06_visual_playtest.png",
        type: "Mission 06 Visual"
      }
    );
  }

  return { images, downloads };
}

function normalizeLesson(lesson: string | WorkshopLesson): WorkshopLesson {
  if (typeof lesson !== "string") return lesson;
  return {
    title: lesson,
    duration: "15–20 min",
    overview: `In this lesson, you will work on ${lesson.toLowerCase()} one small step at a time.`,
    content: "You do not need to be a tech expert. Pick one real example from your work. Keep it small and clear. When you finish, you should have something you can use, not just an idea.",
    activity: "Use one real example. Write your answer down. Then look at it once more and make it easier for the next person to understand.",
    deliverable: "One clear page or short plan you can use this week.",
    tips: ["Start small", "Use plain words", "Ask one person to look at your work before you use it"],
    checkIn: "Can you tell someone what you made, what it is for, and what you will do next?",
  };
}

type LessonFile = { label: string; title: string; url: string; instruction: string };

const workbookPageMap: Record<string, number[]> = {
  "ai-foundations-for-founders": [7, 8, 9, 10, 11, 12, 13, 15, 16, 21],
  "lana-content-command-center": [3, 5, 7, 8, 9, 11, 12, 13, 14, 15],
};

function getLessonFiles(workshop: WorkshopProgram, lessonIndex: number, lesson: WorkshopLesson): LessonFile[] {
  const page = workbookPageMap[workshop.slug]?.[lessonIndex];
  const pageHint = page ? `Go to page ${page}.` : `Find the section called “${lesson.title}.”`;
  const files: LessonFile[] = [];

  if (workshop.workbookPdfUrl) {
    files.push({
      label: "Do this now",
      title: "Open the participant workbook",
      url: `${workshop.workbookPdfUrl}${page ? `#page=${page}` : ""}`,
      instruction: `${pageHint} Fill in one box at a time. Use a real example from your work, but never add private information.`,
    });
  }
  if (workshop.fullGuidePdfUrl) {
    files.push({
      label: "Need more help?",
      title: "Open the step-by-step guide",
      url: workshop.fullGuidePdfUrl,
      instruction: `Use this if a word or step feels confusing. Read the part with the same lesson name, then come back here.`,
    });
  }
  if (workshop.facilitatorDeckPdfUrl) {
    files.push({
      label: "For a group leader",
      title: "Open the lesson slides",
      url: workshop.facilitatorDeckPdfUrl,
      instruction: "Use these slides if you are teaching a group. Pause after each question so people can write their own answer.",
    });
  }
  return files;
}

function getSimpleSteps(lesson: WorkshopLesson, hasWorkbook: boolean): string[] {
  return [
    hasWorkbook ? "Open the workbook card below. Start on the page shown." : "Get a blank page, note, or simple document ready.",
    `Pick one real example from your work that fits “${lesson.title}.”`,
    "Write a short answer. Do not try to make it perfect.",
    "Read it once. If it is hard to understand, make the words simpler.",
    "Save it. You will use it again in the next lesson.",
  ];
}

export default function WorkshopsPage() {
  const [activeTab, setActiveTab] = useState<"All" | Audience>("All");
  const [selected, setSelected] = useState<WorkshopProgram>(() => WORKSHOP_PROGRAMS.find((workshop) => workshop.audience === "Lux Automaton") || WORKSHOP_PROGRAMS[0]);
  const [publishedWorkshops, setPublishedWorkshops] = useState<WorkshopProgram[]>([]);
  const [syncing, setSyncing] = useState(true);
  const [activeFullImage, setActiveFullImage] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeLessonFile, setActiveLessonFile] = useState(0);

  const allWorkshops = useMemo(() => {
    const dynamicSlugs = new Set(publishedWorkshops.map((workshop) => workshop.slug));
    return [...publishedWorkshops, ...WORKSHOP_PROGRAMS.filter((workshop) => !dynamicSlugs.has(workshop.slug))]
      .filter((workshop) => workshop.audience !== "Lux AI Kids");
  }, [publishedWorkshops]);

  useEffect(() => {
    const loadPublished = async () => {
      try {
        const programs = (await fetchWorkshops()).map(workshopRowToProgram);
        setPublishedWorkshops(programs);
        const requestedSlug = new URLSearchParams(window.location.search).get("workshop");
        const requested = programs.find((workshop) => workshop.slug === requestedSlug)
          || WORKSHOP_PROGRAMS.find((workshop) => workshop.slug === requestedSlug);
        if (requested && requested.audience !== "Lux AI Kids") setSelected(requested);
      } catch (error) {
        console.error("Unable to sync published workshops", error);
      } finally {
        setSyncing(false);
      }
    };
    loadPublished();
  }, []);

  const filtered = useMemo(
    () => activeTab === "All" ? allWorkshops : allWorkshops.filter((workshop) => workshop.audience === activeTab),
    [activeTab, allWorkshops],
  );

  const visualAssets = useMemo(
    () => (selected ? getWorkshopVisualAssets(selected) : { images: [], downloads: [] }),
    [selected],
  );

  const lessons = useMemo(() => selected.lessons.map(normalizeLesson), [selected]);
  const lesson = lessons[activeLesson] || lessons[0];
  const lessonFiles = lesson ? getLessonFiles(selected, activeLesson, lesson) : [];
  const simpleSteps = lesson ? getSimpleSteps(lesson, lessonFiles.some((file) => file.label === "Do this now")) : [];
  const completedPercent = lessons.length ? Math.round((completedLessons.length / lessons.length) * 100) : 0;

  function selectWorkshop(workshop: WorkshopProgram) {
    setSelected(workshop);
    setActiveLesson(0);
    setCompletedLessons([]);
    setActiveLessonFile(0);
  }

  function markLessonComplete(index: number) {
    setCompletedLessons((current) => current.includes(index) ? current : [...current, index]);
  }

  return (
    <main className="automaton-classroom">
      {/* ═══ FULL-RESOLUTION UNCROPPED IMAGE MODAL ═══ */}
      {activeFullImage && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveFullImage(null)}
        >
          <div className="absolute top-4 right-6 flex items-center gap-3 z-10" onClick={(e) => e.stopPropagation()}>
            <a
              href={prefixPath(activeFullImage)}
              download
              className="bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm hover:bg-amber-300 transition shadow-lg flex items-center gap-2"
            >
              ⬇️ Download Full-Res Poster
            </a>
            <button
              type="button"
              className="text-white text-3xl font-bold hover:text-amber-400 px-3 py-1 bg-white/10 rounded-xl transition"
              onClick={() => setActiveFullImage(null)}
              aria-label="Close image modal"
            >
              ✕
            </button>
          </div>
          <div className="relative w-full h-full max-w-7xl max-h-[92vh] flex items-center justify-center">
            <Image
              src={prefixPath(activeFullImage)}
              alt="Full uncropped workshop poster"
              fill
              sizes="100vw"
              className="object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

      <section className="automaton-workshop-splash" aria-labelledby="workshop-splash-title">
        <video className="automaton-splash-video" src={prefixPath("/videos/Lux_Workshop_promo_montage_202607220252.mp4")} autoPlay muted loop playsInline />
        <div className="automaton-splash-shade" />
        <div className="automaton-splash-grid" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="automaton-splash-copy">
          <p className="automaton-kicker">Lux Academy · Learn by building</p>
          <h1 id="workshop-splash-title">Turn a hard problem into a clear next step.</h1>
          <p>Our workshops help you take one real problem from your work, break it into small pieces, and leave with a plan you can use. You do not need to be a tech expert.</p>
          <div className="automaton-splash-actions"><a href="#choose-workshop">Choose a workshop <span>↓</span></a><a href="#workshop-path">Continue your lesson</a></div>
          <div className="automaton-splash-promises"><span><b>1.</b> Pick one real problem</span><span><b>2.</b> Follow simple steps</span><span><b>3.</b> Leave with a plan</span></div>
        </div>
        <aside className="automaton-splash-proof"><p>Why this works</p><div><span>Clear lessons</span><small>One small job at a time</small></div><div><span>Real papers</span><small>Workbooks, guides, and examples</small></div><div><span>Human help</span><small>LANA explains the next move</small></div></aside>
      </section>

      <section className="automaton-splash-workshops" id="choose-workshop" aria-label="All Lux Automaton workshops">
        <div><p className="automaton-kicker">Choose your path</p><h2>Every workshop is built to help you solve something real.</h2></div>
        <div className="automaton-splash-workshop-grid">{allWorkshops.map((workshop, index) => <button key={workshop.slug} type="button" className={selected.slug === workshop.slug ? "active" : ""} onClick={() => selectWorkshop(workshop)}><span className="automaton-splash-card-number">0{index + 1}</span><Image src={prefixPath(workshop.thumbnail)} alt="" fill sizes="(max-width: 760px) 100vw, 20vw" /><i /><strong>{workshop.title}</strong><small>{workshop.duration} · {workshop.level}</small><em>Open workshop →</em></button>)}</div>
      </section>

      <section className="automaton-course-hero">
        <div className="automaton-course-hero-copy">
          <p className="automaton-kicker">Lux Academy · Workshop Studio</p>
          <h1>{selected.title}</h1>
          <p className="automaton-course-deck">{selected.description}</p>
          <div className="automaton-course-facts" aria-label="Workshop details">
            <span>{selected.level}</span><span>{selected.duration}</span><span>{selected.ageBand}</span>
          </div>
          <a className="automaton-hero-action" href="#workshop-path">Start this workshop <span>↓</span></a>
        </div>
        <div className="automaton-course-hero-art">
          {selected.video ? (
            <video src={prefixPath(selected.video)} poster={prefixPath(selected.image)} controls playsInline />
          ) : (
            <Image src={prefixPath(selected.image)} alt={selected.title} fill priority sizes="(max-width: 900px) 100vw, 56vw" />
          )}
          <button type="button" className="automaton-view-art" onClick={() => setActiveFullImage(selected.image)}>View full visual ↗</button>
        </div>
      </section>

      <section className="automaton-course-library" aria-label="Choose a Lux Automaton workshop">
        <div className="academy-tabs" role="tablist" aria-label="Workshop audience">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                const next = tab === "All" ? allWorkshops[0] : allWorkshops.find((workshop) => workshop.audience === tab);
                if (next) selectWorkshop(next);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="automaton-course-switcher">
          {syncing && <span className="academy-syncing">Syncing newly published workshops…</span>}
          {filtered.map((workshop) => (
            <button key={workshop.slug} type="button" className={selected.slug === workshop.slug ? "active" : ""} onClick={() => selectWorkshop(workshop)}>
              <span><Image src={prefixPath(workshop.thumbnail)} alt="" fill sizes="160px" /></span>
              <b>{workshop.title}</b><small>{workshop.level} · {workshop.duration}</small>
            </button>
          ))}
        </div>
      </section>

      {lesson && <section className="automaton-workspace" id="workshop-path">
        <aside className="automaton-runway">
          <p className="automaton-kicker">Your workshop path</p>
          <div className="automaton-progress-row"><strong>{completedPercent}% complete</strong><span>{completedLessons.length}/{lessons.length}</span></div>
          <div className="automaton-progress"><span style={{ width: `${completedPercent}%` }} /></div>
          <ol>
            {lessons.map((item, index) => <li key={`${item.title}-${index}`} className={activeLesson === index ? "active" : completedLessons.includes(index) ? "complete" : ""}>
              <button type="button" onClick={() => { setActiveLesson(index); setActiveLessonFile(0); }}><span>{completedLessons.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</span><div><b>{item.title}</b><small>{item.duration}</small></div></button>
            </li>)}
          </ol>
        </aside>

        <article className="automaton-lesson-workspace">
          <p className="automaton-kicker">Lesson {String(activeLesson + 1).padStart(2, "0")} of {String(lessons.length).padStart(2, "0")}{lesson.moduleTitle ? ` · ${lesson.moduleTitle}` : ""}</p>
          <h2>{lesson.title}</h2>
          {lesson.overview && <p className="automaton-lesson-overview">{lesson.overview}</p>}
          {lesson.video && <video className="automaton-lesson-media" src={prefixPath(lesson.video)} poster={lesson.image ? prefixPath(lesson.image) : undefined} controls playsInline />}
          {!lesson.video && lesson.image && <Image className="automaton-lesson-image" src={prefixPath(lesson.image)} alt={lesson.title} width={1280} height={720} />}
          <section className="automaton-simple-steps"><p className="automaton-kicker">Simple lesson plan</p><h3>Do these five things</h3><ol>{simpleSteps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></section>
          {lesson.content && <div className="automaton-lesson-copy"><h3>More about this lesson</h3>{lesson.content.split("\n").filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
          <section className="automaton-do-card"><span>Make this real</span><p>{lesson.activity}</p>{lesson.deliverable && <small><b>Leave with:</b> {lesson.deliverable}</small>}</section>
          {!!lesson.objectives?.length && <section className="automaton-objectives"><h3>In this lesson</h3><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></section>}
          <details className="automaton-lana-coach">
            <summary><span className="automaton-lana-avatar">L</span><span><b>LANA’s operator coach</b><small>Guidance for applying this lesson in a live business</small></span><em>+</em></summary>
            <div><p><b>The outcome:</b> {lesson.adultGuide?.goal || lesson.deliverable || "Turn this lesson into one concrete workflow improvement."}</p><p>{lesson.adultGuide?.explain || lesson.lanaGuide || "Use the smallest realistic example from your work. The objective is not to perfect the system today—it is to make the next action clearer and repeatable."}</p><p><b>Ask yourself:</b> {lesson.adultGuide?.ask || "Where does this show up in your business this week, and who needs the result?"}</p><p><b>If you get stuck:</b> {lesson.adultGuide?.stuck || "Reduce the scope to one customer, task, or decision. Make a useful first version, then test it."}</p></div>
          </details>
          {!!lesson.tips?.length && <section className="automaton-tips"><h3>Build notes</h3><ul>{lesson.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></section>}
          {!!lesson.resources?.length && <div className="automaton-lesson-resources">{lesson.resources.map((resource) => <a key={`${resource.title}-${resource.url}`} href={resource.url} target="_blank" rel="noreferrer">Open {resource.title || "resource"} ↗</a>)}</div>}
          <footer className="automaton-checkin"><div><small>Lesson check-in</small><p>{lesson.checkIn}</p></div><button type="button" disabled={completedLessons.includes(activeLesson)} onClick={() => markLessonComplete(activeLesson)}>{completedLessons.includes(activeLesson) ? "Lesson complete ✓" : "Mark lesson complete"}</button></footer>
          {!!lessonFiles.length && <section className="automaton-document-preview"><div className="automaton-document-preview-heading"><div><p className="automaton-kicker">Lesson paper preview</p><h3>{lessonFiles[activeLessonFile]?.title}</h3><p>{lessonFiles[activeLessonFile]?.instruction}</p></div><a href={prefixPath(lessonFiles[activeLessonFile]?.url || "")} target="_blank" rel="noreferrer">Open full screen ↗</a></div><div className="automaton-document-tabs" role="tablist" aria-label="Lesson documents">{lessonFiles.map((file, index) => <button key={file.title} type="button" role="tab" aria-selected={activeLessonFile === index} className={activeLessonFile === index ? "active" : ""} onClick={() => setActiveLessonFile(index)}>{file.label}: {file.title}</button>)}</div><iframe key={lessonFiles[activeLessonFile]?.url} title={`${lessonFiles[activeLessonFile]?.title} preview`} src={prefixPath(lessonFiles[activeLessonFile]?.url || "")} /></section>}
        </article>

        <aside className="automaton-resource-kit">
          <p className="automaton-kicker">Your toolkit</p><h3>What you’ll build</h3><p>{selected.outcome}</p>
          {!!selected.materials?.length && <section><h4>Bring to the workshop</h4><ul>{selected.materials.map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {!!selected.learningGoals?.length && <section><h4>You’ll learn</h4><ul>{selected.learningGoals.map((goal) => <li key={goal}>{goal}</li>)}</ul></section>}
          {(selected.workbookPdfUrl || selected.facilitatorDeckPdfUrl || selected.fullGuidePdfUrl) && <PdfPreviewDeckModal heading="Workshop downloads" subheading="Download the full materials here. The lesson preview is at the bottom of each lesson." showPreview={false} resources={[
            ...(selected.workbookPdfUrl ? [{ title: "Participant workbook", subtitle: "Interactive digital and printable PDF", pdfUrl: selected.workbookPdfUrl, type: "Workbook", size: "PDF" }] : []),
            ...(selected.facilitatorDeckPdfUrl ? [{ title: "Facilitator deck", subtitle: "Workshop presentation materials", pdfUrl: selected.facilitatorDeckPdfUrl, type: "Deck", size: "PDF" }] : []),
            ...(selected.fullGuidePdfUrl ? [{ title: "Full workshop guide", subtitle: "Lesson plans and exercises", pdfUrl: selected.fullGuidePdfUrl, type: "Guide", size: "PDF" }] : [])
          ]} />}
          {!!selected.downloadFiles?.length && <section><h4>Files</h4><div className="automaton-file-list">{selected.downloadFiles.map((file) => <a key={file.url} href={prefixPath(file.url)} download>{file.title} <span>↓</span></a>)}</div></section>}
          <SocialShare className="automaton-share" title={selected.title} text={selected.description} />
        </aside>
      </section>}

      {(visualAssets.images.length > 0 || visualAssets.downloads.length > 0) && <ArticleVisualAssetsDeck heading="Visual workshop resources" subheading="Open the full visual and downloadable reference materials for this workshop." images={visualAssets.images} downloads={visualAssets.downloads} />}

      <section className="automaton-workshop-notes">
        {!!selected.prerequisites?.length && <div><h3>Before you start</h3><ul>{selected.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>}
        {!!selected.safetyNotes?.length && <div><h3>Safe practice</h3><ul>{selected.safetyNotes.map((item) => <li key={item}>{item}</li>)}</ul></div>}
        {!!selected.extensionActivities?.length && <div><h3>Keep building</h3><ul>{selected.extensionActivities.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      </section>
    </main>
  );
}
