'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { getUseCaseMemory, getUseCasePack, type UseCaseStory, useCaseStories } from '@/lib/useCaseData'

export function PackInteractionMap({ stories = useCaseStories }: { stories?: UseCaseStory[] }) {
  const [activeSlug, setActiveSlug] = useState(stories[0]?.slug || '')
  const active = useMemo(() => stories.find(story => story.slug === activeSlug) || stories[0], [activeSlug, stories])
  const successPack = getUseCasePack(active)
  const memoryPacks = getUseCaseMemory(active)

  return (
    <section className="pack-map-highlight">
      <div className="pack-map-copy">
        <h2>Build the USB with the right intelligence.</h2>
        <p>
          A blank USB starts empty. A Lux Agent USB with the right Success Pack and Memory Packs starts with a trained team,
          a profession, a plan, and day-one workflows the customer can understand.
        </p>
        <div className="pack-map-score">
          <span>Team readiness</span>
          <strong>{active.strength}%</strong>
          <div><i style={{ width: `${active.strength}%` }} /></div>
        </div>
        <p className="pack-map-ready">Day 1: the team is ready.</p>
      </div>

      <div className="pack-map-stage" aria-label={`${active.title} pack interaction map`}>
        <div className="pack-map-tabs">
          {stories.map(story => (
            <button
              key={story.slug}
              type="button"
              className={story.slug === active.slug ? 'active' : ''}
              onClick={() => setActiveSlug(story.slug)}
            >
              {story.title}
            </button>
          ))}
        </div>

        <div className="pack-orbit-board">
          <div className="pack-orbit-glow" />
          <div className="pack-node pack-node-success">
            <img src={successPack.image} alt={successPack.title} />
            <span>Success Pack</span>
            <strong>{successPack.title}</strong>
          </div>

          <div className="pack-node pack-node-core">
            <img src="/lux-agent-website/lux-agent-icon.png" alt="Lux Agent USB" />
            <span>Lux Agent USB</span>
            <strong>{active.title}</strong>
          </div>

          {memoryPacks.map((pack, index) => (
            <Link
              key={pack.slug}
              href={`/memory-packs/${pack.slug}`}
              className={`pack-node pack-node-memory memory-${index + 1}`}
              style={{ '--accent': pack.accent } as CSSProperties}
            >
              <img src={pack.image} alt={pack.title} />
              <span>Memory Pack</span>
              <strong>{pack.title.replace(' Memory Pack', '')}</strong>
            </Link>
          ))}

          <div className="team-ready-card">
            <span>{active.audience}</span>
            <strong>{active.dayOne}</strong>
            <Link href={`/lux-agent/${active.slug}`}>See full customer story</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
