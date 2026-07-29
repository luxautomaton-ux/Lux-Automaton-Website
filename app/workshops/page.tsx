"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WORKSHOP_PROGRAMS, type Audience, type WorkshopProgram, type WorkshopLesson } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import { fetchWorkshops, workshopRowToProgram } from "@/lib/workshopDb";
import PdfPreviewDeckModal from "@/components/PdfPreviewDeckModal";
import ArticleVisualAssetsDeck, { type VisualAssetItem, type ResourceDownloadItem } from "@/components/ArticleVisualAssetsDeck";

const tabs: Array<"All" | Audience> = ["All", "Lux Automaton", "Lux AI Kids"];

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

function LessonCard({ lesson, index }: { lesson: string | WorkshopLesson; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const normalized: WorkshopLesson = typeof lesson === "string"
    ? {
        title: lesson,
        duration: "15-20 min",
        overview: `Key lesson module: ${lesson}.`,
        activity: "Guided practice and application.",
        deliverable: "Completed worksheet or working draft.",
        tips: ["Take your time to test each step", "Keep notes on what works best for your workflow"],
        checkIn: "Ready for the next lesson step.",
      }
    : lesson;

  return (
    <div className="academy-lesson-card">
      <button
        type="button"
        className="academy-lesson-header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="academy-lesson-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="academy-lesson-info">
          <h4>{normalized.title}</h4>
          <small>{normalized.duration}</small>
        </div>
        <span className="academy-lesson-toggle">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <div className="academy-lesson-body">
          {normalized.moduleTitle && <span className="academy-lesson-module">{normalized.moduleTitle}</span>}
          {normalized.video && <video className="academy-lesson-media" src={prefixPath(normalized.video)} controls playsInline poster={normalized.image ? prefixPath(normalized.image) : undefined} />}
          {!normalized.video && normalized.image && <Image className="academy-lesson-media" src={prefixPath(normalized.image)} alt={normalized.title} width={1200} height={675} />}
          {normalized.overview && <p className="academy-lesson-overview">{normalized.overview}</p>}

          {normalized.content && (
            <div className="academy-lesson-section academy-lesson-content">
              <h5>Full Lesson</h5>
              {normalized.content.split("\n").filter(Boolean).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            </div>
          )}

          {!!normalized.objectives?.length && (
            <div className="academy-lesson-section">
              <h5>Learning Objectives</h5>
              <ul>
                {normalized.objectives.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {normalized.activity && (
            <div className="academy-lesson-section">
              <h5>Activity</h5>
              <p>{normalized.activity}</p>
            </div>
          )}

          {normalized.deliverable && (
            <div className="academy-lesson-section">
              <h5>Deliverable</h5>
              <p className="academy-lesson-deliverable">{normalized.deliverable}</p>
            </div>
          )}

          {!!normalized.tips?.length && (
            <div className="academy-lesson-section">
              <h5>Tips</h5>
              <ul className="academy-lesson-tips">
                {normalized.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {normalized.checkIn && (
            <div className="academy-lesson-checkin">
              <strong>Check-in:</strong> {normalized.checkIn}
            </div>
          )}

          {!!normalized.resources?.length && (
            <div className="academy-lesson-section">
              <h5>Resources</h5>
              <div className="academy-lesson-resources">
                {normalized.resources.map((resource) => <a key={`${resource.title}-${resource.url}`} href={resource.url} target="_blank" rel="noreferrer">{resource.title || "Open resource"}</a>)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WorkshopsPage() {
  const [activeTab, setActiveTab] = useState<"All" | Audience>("All");
  const [selected, setSelected] = useState<WorkshopProgram>(WORKSHOP_PROGRAMS[0]);
  const [publishedWorkshops, setPublishedWorkshops] = useState<WorkshopProgram[]>([]);
  const [syncing, setSyncing] = useState(true);
  const [activeFullImage, setActiveFullImage] = useState<string | null>(null);

  const allWorkshops = useMemo(() => {
    const dynamicSlugs = new Set(publishedWorkshops.map((workshop) => workshop.slug));
    return [...publishedWorkshops, ...WORKSHOP_PROGRAMS.filter((workshop) => !dynamicSlugs.has(workshop.slug))];
  }, [publishedWorkshops]);

  useEffect(() => {
    const loadPublished = async () => {
      try {
        const programs = (await fetchWorkshops()).map(workshopRowToProgram);
        setPublishedWorkshops(programs);
        const requestedSlug = new URLSearchParams(window.location.search).get("workshop");
        const requested = programs.find((workshop) => workshop.slug === requestedSlug)
          || WORKSHOP_PROGRAMS.find((workshop) => workshop.slug === requestedSlug);
        if (requested) setSelected(requested);
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

  return (
    <main className="academy-world">
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
            <img
              src={prefixPath(activeFullImage)}
              alt="Full uncropped workshop poster"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

      <section className="academy-hero">
        <video
          className="world-hero-video"
          src={prefixPath("/videos/Lux_Workshop_promo_montage_202607220252.mp4")}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="world-hero-shade" />
        <div className="academy-hero-copy">
          <p>Lux Academy</p>
          <h1>Workshops that turn curiosity into working systems.</h1>
          <span>
            Complete learning programs for founders, small businesses, kids, teens, parents, teachers, and builders. Each one has a clear outcome, detailed lesson path, materials, and a Lux-branded visual identity.
          </span>
          <div>
            <Link href="/lux-tv">Watch Lux TV</Link>
            <Link href="/lux-tv-kids">Open Kids TV</Link>
          </div>
        </div>
      </section>

      <section className="academy-panel">
        <div className="academy-tabs" role="tablist" aria-label="Workshop audience">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                const next = tab === "All" ? allWorkshops[0] : allWorkshops.find((workshop) => workshop.audience === tab);
                if (next) setSelected(next);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {selected && (
          <>
            <div className="academy-feature">
              <div
                className="academy-player group cursor-pointer"
                onClick={() => !selected.video && setActiveFullImage(selected.image)}
                title="Click to view full uncropped poster"
              >
                {selected.video ? (
                  <video src={prefixPath(selected.video)} poster={prefixPath(selected.image)} controls playsInline />
                ) : (
                  <>
                    <Image src={prefixPath(selected.image)} alt={selected.title} fill sizes="(max-width: 980px) 100vw, 58vw" className="object-contain" />
                    <div className="absolute bottom-4 right-4 z-10 bg-slate-950/90 text-amber-300 text-xs font-bold px-3 py-2 rounded-lg border border-amber-500/40 shadow-xl flex items-center gap-1.5 backdrop-blur-md hover:bg-amber-400 hover:text-slate-950 transition">
                      🔍 View 100% Uncropped Poster
                    </div>
                  </>
                )}
                <div className="academy-player-shade" />
                {selected.brandLogo && (
                  <div className={`academy-brand-lockup ${selected.audience === "Lux AI Kids" ? "kids" : "automaton"}`}>
                    <Image src={prefixPath(selected.brandLogo)} alt={selected.audience} fill sizes="260px" />
                  </div>
                )}
                {!selected.video && (
                  <button
                    type="button"
                    aria-label={`View uncropped ${selected.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFullImage(selected.image);
                    }}
                  >
                    View
                  </button>
                )}
                <span>{selected.duration}</span>
              </div>
              <article className="academy-detail">
                <p>{selected.audience} / {selected.level}</p>
                <h2>{selected.title}</h2>
                <strong>{selected.ageBand}</strong>
                <span>{selected.description}</span>
                <div className="academy-outcome">
                  <b>Outcome</b>
                  <p>{selected.outcome}</p>
                </div>
                {(selected.workbookPdfUrl || selected.facilitatorDeckPdfUrl || selected.fullGuidePdfUrl) && (
                  <PdfPreviewDeckModal
                    heading="Workshop Resources & PDF Downloads"
                    subheading="Preview or download the official participant workbooks, facilitator decks, and full workshop guides."
                    resources={[
                      ...(selected.workbookPdfUrl ? [{
                        title: "Participant Workbook",
                        subtitle: "Interactive digital & printable PDF workbook",
                        pdfUrl: selected.workbookPdfUrl,
                        type: "Participant Workbook",
                        size: "PDF Document"
                      }] : []),
                      ...(selected.facilitatorDeckPdfUrl ? [{
                        title: "Facilitator Slide Deck",
                        subtitle: "Presentation deck for workshop leaders & educators",
                        pdfUrl: selected.facilitatorDeckPdfUrl,
                        type: "Facilitator Deck",
                        size: "PDF Presentation"
                      }] : []),
                      ...(selected.fullGuidePdfUrl ? [{
                        title: "Full Workshop Guide",
                        subtitle: "Complete lesson plans, outcomes & exercises",
                        pdfUrl: selected.fullGuidePdfUrl,
                        type: "Full Guide",
                        size: "PDF Master Guide"
                      }] : [])
                    ]}
                  />
                )}
                {!!selected.materials?.length && (
                  <div className="academy-materials">
                    {selected.materials.map((item) => <span key={item}>{item}</span>)}
                  </div>
                )}
              </article>
            </div>

            {/* ═══ VISUAL INFOGRAPHIC POSTERS & DOWNLOADABLE KITS GALLERY DECK ═══ */}
            <ArticleVisualAssetsDeck
              heading="Visual Infographic Posters, Lesson Maps & Downloadable Kits"
              subheading="Explore full-resolution workshop blueprints, 6-mission visual cards, concept diagrams, and printable packages."
              images={visualAssets.images}
              downloads={visualAssets.downloads}
            />

            <div className="academy-shelf">
              {syncing && <span className="academy-syncing">Syncing newly published workshops…</span>}
              {filtered.map((workshop) => (
                <button
                  key={workshop.slug}
                  type="button"
                  className={selected.slug === workshop.slug ? "active" : ""}
                  onClick={() => setSelected(workshop)}
                >
                  <span className="academy-thumb">
                    <Image src={prefixPath(workshop.thumbnail)} alt="" fill sizes="220px" />
                    {workshop.brandLogo && (
                      <div className={`academy-thumb-lockup ${workshop.audience === "Lux AI Kids" ? "kids" : "automaton"}`}>
                        <Image src={prefixPath(workshop.brandLogo)} alt={workshop.audience} fill sizes="145px" />
                      </div>
                    )}
                  </span>
                  <b>{workshop.title}</b>
                  <small>{workshop.level} / {workshop.duration}</small>
                </button>
              ))}
            </div>

            <div className="academy-curriculum">
              <div>
                <p>Full Curriculum</p>
                <h2>{selected.title}</h2>
              </div>
              {!!selected.lessons?.length && (
                <div className="academy-lessons">
                  {selected.lessons.map((lesson, i) => (
                    <LessonCard key={typeof lesson === "string" ? `${lesson}-${i}` : lesson.title} lesson={lesson} index={i} />
                  ))}
                </div>
              )}
            </div>

            <div className="academy-meta">
              {!!selected.learningGoals?.length && (
                <div className="academy-meta-section">
                  <h3>Learning Goals</h3>
                  <ul>
                    {selected.learningGoals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!!selected.prerequisites?.length && (
                <div className="academy-meta-section">
                  <h3>Prerequisites</h3>
                  <ul>
                    {selected.prerequisites.map((prereq) => (
                      <li key={prereq}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!!selected.safetyNotes?.length && (
                <div className="academy-meta-section">
                  <h3>Safety Notes</h3>
                  <ul>
                    {selected.safetyNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!!selected.extensionActivities?.length && (
                <div className="academy-meta-section">
                  <h3>Extension Activities</h3>
                  <ul>
                    {selected.extensionActivities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
