'use client'

import React, { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  { img: '/usb-slide-1.jpg', alt: 'Premium USB drive with smart LCD display' },
  { img: '/usb-slide-2.jpg', alt: 'USB drive showing data transfer speeds' },
  { img: '/usb-slide-3.jpg', alt: 'USB drive dual interface Type-A and Type-C' },
  { img: '/usb-slide-4.jpg', alt: 'USB drive intelligent temperature management' },
  { img: '/usb-slide-5.jpg', alt: 'USB drive premium zinc alloy construction' },
  { img: '/usb-slide-6.jpg', alt: 'USB drive high speed data transfer' },
  { img: '/usb-slide-7.jpg', alt: 'Premium USB drive product overview' },
]

const FEATURES = [
  { icon: '📺', title: 'Smart LCD Display', desc: 'See storage capacity, read/write speeds, transfer progress, and drive temperature at a glance.' },
  { icon: '🧊', title: 'AI Temperature Control', desc: 'Built-in AI balances speed and heat — no overheating during long transfers.' },
  { icon: '⚡', title: '1090 MB/s Speed', desc: 'USB 3.2 Gen 2 — transfer 1GB files in about one second.' },
  { icon: '🔒', title: 'LDPC Error Correction', desc: 'Auto-detects and repairs data errors, protecting your business files.' },
  { icon: '🔌', title: 'Dual USB-A + USB-C', desc: 'Works with laptops, desktops, phones, tablets, TVs, and car systems.' },
  { icon: '💎', title: 'Premium TLC Memory', desc: 'Higher density, better durability, and stable performance over time.' },
]

export default function UsbSlideshow() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <div style={{ marginBottom: 80 }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 100, color: '#FBBF24', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
          💾 Premium Hardware Included
        </div>
        <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 12 }}>Built on a <span style={{ color: '#FBBF24' }}>Professional-Grade</span> USB Drive</h2>
        <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
          Every preloaded Lux Agent USB ships on a premium solid-state drive with a built-in smart display, AI temperature management, and 1090 MB/s transfer speeds. This is not a basic thumb drive.
        </p>
      </div>

      {/* Slideshow */}
      <div
        style={{ position: 'relative', maxWidth: 800, margin: '0 auto 32px', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(251,191,36,0.2)', background: '#111' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{ position: 'relative', aspectRatio: '1464/600', overflow: 'hidden' }}>
          {SLIDES.map((slide, i) => (
            <img
              key={slide.img}
              src={slide.img}
              alt={slide.alt}
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
              }}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          style={{
            position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)',
            width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 18,
            backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >‹</button>
        <button
          onClick={next}
          style={{
            position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)',
            width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 18,
            backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >›</button>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 8, height: 8, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: i === current ? '#FBBF24' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 800, margin: '0 auto' }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{ padding: '16px 18px', background: 'var(--bg-elevated)', borderRadius: 14, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
