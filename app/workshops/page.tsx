"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WORKSHOP_PROGRAMS, type Audience, type WorkshopProgram, type WorkshopLesson } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import { fetchWorkshops, workshopRowToProgram } from "@/lib/workshopDb";

const tabs: Array<"All" | Audience> = ["All", "Lux Automaton", "Lux AI Kids"];

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

  return (
    <main className="academy-world">
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
              <div className="academy-player">
                {selected.video ? (
                  <video src={prefixPath(selected.video)} poster={prefixPath(selected.image)} controls playsInline />
                ) : (
                  <Image src={prefixPath(selected.image)} alt={selected.title} fill sizes="(max-width: 980px) 100vw, 58vw" />
                )}
                <div className="academy-player-shade" />
                {selected.brandLogo && (
                  <div className={`academy-brand-lockup ${selected.audience === "Lux AI Kids" ? "kids" : "automaton"}`}>
                    <Image src={prefixPath(selected.brandLogo)} alt={selected.audience} fill sizes="260px" />
                  </div>
                )}
                {!selected.video && <button type="button" aria-label={`Preview ${selected.title}`}>Play</button>}
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
                {!!selected.materials?.length && (
                  <div className="academy-materials">
                    {selected.materials.map((item) => <span key={item}>{item}</span>)}
                  </div>
                )}
              </article>
            </div>

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
