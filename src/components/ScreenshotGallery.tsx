'use client'

import React, { useState } from 'react'

const IMAGES = [
  '/lux-agent-website/screenshots/build.png',
  '/lux-agent-website/screenshots/chat.png',
  '/lux-agent-website/screenshots/vitals.png',
  '/lux-agent-website/screenshots/braini.png',
  '/lux-agent-website/screenshots/file.png',
  '/lux-agent-website/screenshots/Screen Shot 2026-05-29 at 4.36.27 PM.png',
  '/lux-agent-website/screenshots/Screen Shot 2026-05-29 at 4.37.56 PM.png',
  '/lux-agent-website/screenshots/Screen Shot 2026-05-29 at 4.38.08 PM.png',
  '/lux-agent-website/screenshots/Screen Shot 2026-05-29 at 4.38.15 PM.png',
  '/lux-agent-website/screenshots/Screen Shot 2026-05-29 at 4.38.24 PM.png',
  '/lux-agent-website/screenshots/Screen Shot 2026-05-29 at 4.38.36 PM.png',
  '/lux-agent-website/screenshots/Screen Shot 2026-05-29 at 4.39.01 PM.png'
]

export default function ScreenshotGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex(prev => (prev !== null ? (prev + 1) % IMAGES.length : null))
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex(prev => (prev !== null ? (prev - 1 + IMAGES.length) % IMAGES.length : null))
  }

  return (
    <>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 24 
      }}>
        {IMAGES.map((src, i) => (
          <div key={i} onClick={() => openLightbox(i)} style={{ 
            borderRadius: 16, 
            overflow: 'hidden', 
            border: '1px solid var(--border)', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            background: 'var(--bg-elevated)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src={src} 
              alt={`Lux Agent Interface ${i+1}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {selectedIndex !== null && (
        <div onClick={closeLightbox} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.9)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {/* Close button */}
          <button onClick={closeLightbox} style={{
            position: 'absolute', top: 20, right: 20, background: 'none', border: 'none',
            color: '#fff', fontSize: 40, cursor: 'pointer', padding: 20
          }}>
            &times;
          </button>

          {/* Prev button */}
          <button onClick={prevImage} style={{
            position: 'absolute', left: 20, background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', fontSize: 40, cursor: 'pointer', padding: '20px 30px', borderRadius: '50%'
          }}>
            &#10094;
          </button>

          {/* Image */}
          <img 
            src={IMAGES[selectedIndex]} 
            alt="Fullscreen Interface"
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 12, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
            onClick={e => e.stopPropagation()} // prevent closing when clicking the image
          />

          {/* Next button */}
          <button onClick={nextImage} style={{
            position: 'absolute', right: 20, background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', fontSize: 40, cursor: 'pointer', padding: '20px 30px', borderRadius: '50%'
          }}>
            &#10095;
          </button>
        </div>
      )}
    </>
  )
}
