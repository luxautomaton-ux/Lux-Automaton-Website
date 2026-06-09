'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function LanaChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hey! 👋 I\'m LANA, your AI business partner. I can help you understand Lux Agent USB, find the right Success Pack, or answer questions about pricing and features. What can I help you with?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) {
      setHasNewMessage(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/lana-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })

      const data = await res.json()
      const reply = data.reply || data.error || 'I had a moment — could you try that again?'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      if (!open) setHasNewMessage(true)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m having trouble connecting right now. Try again in a moment, or email luxagent@gmail.com for help!' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div id="lana-chat-root" style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 99999 }}>
      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 90, right: 20, width: 380, height: 520,
          background: '#0D0D0F', border: '1px solid rgba(162,117,255,0.3)',
          borderRadius: 20, display: 'flex', flexDirection: 'column',
          zIndex: 99999, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(162,117,255,0.1)',
          animation: 'chatSlideUp 0.3s ease-out',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(135deg, rgba(162,117,255,0.1), rgba(96,165,250,0.05))',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #A275FF, #60A5FA)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 700,
            }}>L</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>LANA</div>
              <div style={{ fontSize: 11, color: '#2DD4BF' }}>● Online — Lux Agent AI</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                fontSize: 20, cursor: 'pointer', padding: 4, lineHeight: 1,
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 14, fontSize: 14, lineHeight: 1.55,
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #A275FF, #8B5CF6)'
                    : 'rgba(255,255,255,0.06)',
                  color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                  borderBottomRightRadius: msg.role === 'user' ? 4 : 14,
                  borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 14,
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                <div style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontSize: 14, borderBottomLeftRadius: 4 }}>
                  <span style={{ animation: 'pulseDots 1.5s infinite' }}>●●●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 14px 8px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['What is Lux Agent?', 'Show me pricing', 'Which pack is for me?'].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    const userMsg: Message = { role: 'user', content: q }
                    const updated = [...messages, userMsg]
                    setMessages(updated)
                    setLoading(true)
                    fetch('/api/lana-chat', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ messages: updated }),
                    })
                      .then(r => r.json())
                      .then(data => {
                        setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Try again!' }])
                      })
                      .catch(() => {
                        setMessages(prev => [...prev, { role: 'assistant', content: 'Connection issue — email luxagent@gmail.com!' }])
                      })
                      .finally(() => setLoading(false))
                  }}
                  style={{
                    padding: '6px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
                    background: 'rgba(162,117,255,0.08)', border: '1px solid rgba(162,117,255,0.2)',
                    color: 'rgba(255,255,255,0.7)', fontWeight: 500,
                  }}
                >{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask LANA anything..."
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 12,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              style={{
                padding: '10px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: input.trim() ? 'linear-gradient(135deg, #A275FF, #8B5CF6)' : 'rgba(255,255,255,0.05)',
                color: '#fff', fontSize: 16, fontWeight: 700,
                opacity: input.trim() ? 1 : 0.4, transition: 'all 0.2s',
              }}
            >↑</button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Chat with LANA"
        style={{
          position: 'fixed', bottom: 20, right: 20, width: 60, height: 60,
          borderRadius: '50%', border: '2px solid rgba(162,117,255,0.4)',
          background: 'linear-gradient(135deg, #A275FF, #7C3AED)',
          boxShadow: '0 8px 30px rgba(162,117,255,0.4), 0 0 15px rgba(162,117,255,0.2)',
          cursor: 'pointer', zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: open ? 20 : 24, color: '#fff', fontWeight: 700,
          transition: 'all 0.3s ease', transform: open ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        {open ? '✕' : '💬'}
        {hasNewMessage && !open && (
          <span style={{
            position: 'absolute', top: -2, right: -2, width: 14, height: 14,
            background: '#2DD4BF', borderRadius: '50%', border: '2px solid #0D0D0F',
          }} />
        )}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseDots {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

