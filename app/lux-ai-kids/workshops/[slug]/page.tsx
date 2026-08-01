"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { KIDS_WORKSHOPS, WORKSHOP_PROGRAMS } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import SocialShare from "@/components/SocialShare";

const LAB_IMAGES: Record<string, string> = {
  "ai-explorer-kids": "/images/lux-ai-kids-academy/ai-explorer-lab.png",
  "ai-art-studio-kids": "/images/lux-ai-kids-academy/art-studio-lab.png",
  "storyteller-lab-kids": "/images/lux-ai-kids-academy/storyteller-lab.png",
  "robot-builders-kids": "/images/lux-ai-kids-academy/robot-builders-lab.png",
};

type LessonImage = { title: string; image: string };
type AdultGuide = { goal: string; explain: string; ask: string; stuck: string };
type ClassroomLesson = { title: string; duration: string; activity: string; ace: string; lana: string; tips: string[]; checkIn: string; images: LessonImage[]; adultGuide: AdultGuide };

const DEFAULT_ADULT_GUIDE: AdultGuide = {
  goal: "Help the child understand the lesson goal and make one idea they can proudly explain.",
  explain: "Invite the child to show you what they are making. Use short questions, give them time to think, and let their choices lead the project.",
  ask: "What are you making, why did you choose it, and what would you like to try next?",
  stuck: "Break the activity into one tiny next step. Offer two choices, model one example, and praise the child's effort instead of taking over the project.",
};

export default function KidsWorkshopClassroomPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const course = useMemo(() => {
    const program = WORKSHOP_PROGRAMS.find((item) => item.audience === "Lux AI Kids" && item.slug === slug);
    if (program) {
      const lessons: ClassroomLesson[] = program.lessons.map((lesson) => {
        if (typeof lesson === "string") {
          return {
            title: lesson,
            duration: "Guided activity",
            activity: "Build, test, and share your idea.",
            ace: "Try one brave idea first. You can always improve it after you see what happens!",
            lana: "Work one step at a time, and ask a trusted grown-up before using an AI tool.",
            tips: [],
            checkIn: "Save one thing you made and describe what you would improve next.",
            images: [],
            adultGuide: DEFAULT_ADULT_GUIDE,
          };
        }
        return {
          title: lesson.title,
          duration: lesson.duration || "Guided activity",
          activity: lesson.activity || lesson.overview || "Build, test, and share your idea.",
          ace: lesson.aceIntro || "Try one brave idea first. You can always improve it after you see what happens!",
          lana: lesson.lanaGuide || "Work one step at a time, and ask a trusted grown-up before using an AI tool.",
          tips: lesson.tips || [],
          checkIn: lesson.deliverable || "Save one thing you made and describe what you would improve next.",
          images: [
            ...(lesson.image ? [{ title: lesson.title, image: lesson.image }] : []),
            ...(lesson.images || []),
          ],
          adultGuide: lesson.adultGuide || DEFAULT_ADULT_GUIDE,
        };
      });
      return {
        slug: program.slug, title: program.title, subtitle: program.description, age: program.ageBand,
        duration: program.duration, level: program.level, image: LAB_IMAGES[program.slug] || program.image,
        showFullImage: !LAB_IMAGES[program.slug],
        outcome: program.outcome, materials: program.materials || [], goals: program.learningGoals || [],
        safety: program.safetyNotes || [], lessons,
        downloads: program.downloadFiles?.map((item) => [item.title, item.url] as [string, string]) || [
          ["Kid workbook", program.workbookPdfUrl], ["Facilitator deck", program.facilitatorDeckPdfUrl], ["Full guide", program.fullGuidePdfUrl],
        ].filter((item): item is [string, string] => Boolean(item[1])),
      };
    }
    const workshop = KIDS_WORKSHOPS.find((item) => item.slug === slug);
    if (!workshop) return null;
    return {
      slug: workshop.slug, title: workshop.title, subtitle: workshop.description, age: workshop.ageRange,
      duration: workshop.duration, level: workshop.level, image: "/images/lux-ai-kids-academy/ace-learning-hero.jpg",
      showFullImage: false,
      outcome: workshop.whatYouMake.join(" · "), materials: workshop.materials, goals: workshop.learningGoals,
      safety: workshop.safetyNotes,
      lessons: workshop.lessons.map((lesson) => ({ title: lesson.title, duration: lesson.duration, activity: lesson.activity, ace: lesson.aceIntro, lana: lesson.lanaGuide, tips: lesson.tips, checkIn: lesson.checkIn, images: [] as LessonImage[], adultGuide: DEFAULT_ADULT_GUIDE })),
      downloads: [] as [string, string][],
    };
  }, [slug]);

  if (!course) return <main className="kids-classroom-empty"><h1>Workshop not found</h1><Link href="/lux-ai-kids/workshops">Back to workshops</Link></main>;

  const lesson = course.lessons[activeLesson];
  const progress = Math.round((completed.length / course.lessons.length) * 100);
  const completeLesson = () => setCompleted((current) => current.includes(activeLesson) ? current : [...current, activeLesson]);

  return <main className="kids-classroom">
    <section className="kids-classroom-hero">
      <div className="kids-classroom-hero-copy">
        <Link className="kids-classroom-back" href="/lux-ai-kids/workshops">← All workshops</Link>
        <p>ACE &amp; LANA&apos;S LEARNING LAB</p>
        <h1>{course.title}</h1>
        <span>{course.subtitle}</span>
        <div className="kids-classroom-facts"><b>{course.age}</b><b>{course.duration}</b><b>{course.level}</b></div>
      </div>
      <div className={`kids-classroom-hero-media ${course.showFullImage ? "show-full-art" : ""}`}><Image src={prefixPath(course.image)} alt={`${course.title} workshop hero`} fill priority sizes="(max-width: 800px) 100vw, 44vw" /></div>
    </section>

    <section className="kids-classroom-shell">
      <aside className="kids-classroom-path">
        <div className="kids-classroom-progress"><span>Your path</span><b>{progress}% complete</b><i><em style={{ width: `${progress}%` }} /></i></div>
        <ol>{course.lessons.map((item, index) => <li key={item.title}><button type="button" onClick={() => setActiveLesson(index)} className={activeLesson === index ? "active" : ""}><span>{completed.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.duration}</small></button></li>)}</ol>
      </aside>

      <article className="kids-classroom-lesson">
        <p>LESSON {String(activeLesson + 1).padStart(2, "0")} OF {String(course.lessons.length).padStart(2, "0")}</p>
        <h2>{lesson.title}</h2>
        {lesson.images.length > 0 && <div className={`kids-classroom-lesson-visuals ${lesson.images.length > 1 ? "is-grid" : ""}`}>
          {lesson.images.map((item) => <figure key={item.image} className="kids-classroom-lesson-image"><Image src={prefixPath(item.image)} alt={item.title} fill sizes="(max-width: 760px) 100vw, 60vw" /><figcaption>{item.title}</figcaption><button type="button" onClick={() => setPreviewImage(item.image)}>Preview full image</button></figure>)}
        </div>}
        <div className="kids-classroom-activity"><span>Today&apos;s make</span><p>{lesson.activity}</p></div>
        <div className="kids-classroom-guides">
          <div><Image src={prefixPath("/images/lux-ai-kids-academy/ace-profile.png")} alt="Ace" width={62} height={62} /><p><b>Ace says</b>{lesson.ace}</p></div>
          <div><Image src={prefixPath("/images/lux-ai-kids-academy/lana-profile.png")} alt="Lana" width={62} height={62} /><p><b>Lana&apos;s guide</b>{lesson.lana}</p></div>
        </div>
        <details className="kids-adult-coach">
          <summary><Image src={prefixPath("/images/lux-ai-kids-academy/lana-profile.png")} alt="LANA" width={58} height={58} /><span><small>PARENT &amp; TEACHER COACH</small><b>Need help teaching this lesson? Ask LANA.</b></span><i aria-hidden="true">+</i></summary>
          <div className="kids-adult-coach-body">
            <article><span>01</span><div><b>What they&apos;re learning</b><p>{lesson.adultGuide.goal}</p></div></article>
            <article><span>02</span><div><b>Explain it simply</b><p>{lesson.adultGuide.explain}</p></div></article>
            <article><span>03</span><div><b>Ask your young builder</b><p>{lesson.adultGuide.ask}</p></div></article>
            <article><span>04</span><div><b>If they get stuck</b><p>{lesson.adultGuide.stuck}</p></div></article>
            <footer><strong>LANA&apos;S REMINDER</strong><p>Guide the process without taking over. The child stays the creator; the adult keeps the experience safe, calm, and encouraging.</p></footer>
          </div>
        </details>
        {lesson.tips.length > 0 && <div className="kids-classroom-tips"><b>Build tips</b><ul>{lesson.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>}
        <div className="kids-classroom-checkin"><b>Before you move on</b><p>{lesson.checkIn}</p><button type="button" onClick={completeLesson}>{completed.includes(activeLesson) ? "Lesson complete ✓" : "Mark lesson complete"}</button></div>
      </article>

      <aside className="kids-classroom-kit">
        <div><p>YOUR PROJECT</p><h2>What you&apos;ll make</h2><span>{course.outcome}</span></div>
        <div><p>GET READY</p><ul>{course.materials.map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
        <div><p>YOU&apos;LL LEARN</p><ul>{course.goals.map((item) => <li key={item}>✦ {item}</li>)}</ul></div>
        {course.downloads.length > 0 && <div className="kids-classroom-downloads"><p>COMPLETE WORKSHOP PACK</p>{course.downloads.map(([label, href]) => <span key={href}><b>{label}</b><a href={prefixPath(href)} target="_blank" rel="noreferrer">Preview ↗</a><a href={prefixPath(href)} download>Download ↓</a></span>)}</div>}
        <SocialShare title={course.title} text={`I am building with Lux AI Kids: ${course.title}`} />
      </aside>
    </section>
    {course.safety.length > 0 && <section className="kids-classroom-safety"><Image src={prefixPath("/images/lux-ai-kids-academy/dr-torrey-dooley-profile.png")} alt="Dr. Torrey Dooley" width={82} height={82}/><div><p>DR. DOOLEY&apos;S SMART &amp; SAFE CHECK</p><ul>{course.safety.map((note) => <li key={note}>{note}</li>)}</ul></div></section>}
    {previewImage && <div className="kids-workshop-preview" role="dialog" aria-modal="true" aria-label="Workshop image preview" onClick={() => setPreviewImage(null)}>
      <button type="button" onClick={() => setPreviewImage(null)} aria-label="Close preview">Close ×</button>
      <div onClick={(event) => event.stopPropagation()}><Image src={prefixPath(previewImage)} alt="Full-size workshop preview" fill priority sizes="95vw" /></div>
    </div>}
  </main>;
}
