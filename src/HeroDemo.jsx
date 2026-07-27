// The hero proof-of-work: a miniature white-label storefront that re-brands
// itself every few seconds — the thing Sergiu builds, demonstrated before the
// first scroll. Click a dot to take over; auto-cycle resumes after idle.
import { useEffect, useRef, useState } from 'react'
import { T } from './data.js'

const BRANDS = [
  { name: 'Aurelis', accent: '#8b7ae8', bar: '#211f3a', ground: '#191831', ink: '#eceafb', radius: 10, tracking: '-0.01em', wordmark: 'AURELIS' },
  { name: 'Goldline', accent: '#e8a34d', bar: '#2a1f0f', ground: '#211a10', ink: '#f6ecd9', radius: 2, tracking: '0.16em', wordmark: 'GOLDLINE' },
  { name: 'Tidalwave', accent: '#43bda1', bar: '#0e2a25', ground: '#0d211d', ink: '#dcf2ea', radius: 16, tracking: '-0.02em', wordmark: 'tidalwave' },
  { name: 'Rosa', accent: '#e06a8d', bar: '#301523', ground: '#27121c', ink: '#f8e4ec', radius: 999, tracking: '0.05em', wordmark: 'ROSA&CO' },
]

const TILES = [
  [T('Featured', 'Recomandat'), 'Neon Nights'],
  [T('Live', 'Live'), 'Arena Finals'],
  [T('Series', 'Seriale'), 'Deep Water'],
  [T('Originals', 'Originale'), 'Golden Hour'],
]

export default function HeroDemo({ lang, onOpenCase }) {
  const L = o => (o && typeof o === 'object' && 'en' in o) ? o[lang === 'ro' ? 'ro' : 'en'] : o
  const [i, setI] = useState(0)
  const idleRef = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const t = setInterval(() => {
      if (Date.now() - idleRef.current > 5500) setI(x => (x + 1) % BRANDS.length)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const b = BRANDS[i]
  const pick = n => { idleRef.current = Date.now(); setI(n) }

  return (
    <div style={{ display: 'grid', gap: 10, width: 340 }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: '#14161f', boxShadow: '0 24px 60px -20px rgba(24, 20, 14, 0.45), 0 0 0 1px rgba(24,20,14,0.08)' }}>
        {/* window chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 13px', background: '#14161f' }}>
          <span style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(d => <span key={d} style={{ width: 7, height: 7, borderRadius: 99, background: d ? '#33363f' : '#4a4e5a' }}></span>)}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#75798c' }}>
            {L(T('one codebase — ten brands', 'un singur cod — zece branduri'))}
          </span>
          <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 99, background: b.accent, transition: 'background 0.4s ease' }}></span>
        </div>
        {/* branded surface */}
        <div style={{ background: b.ground, transition: 'background 0.5s ease', padding: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: b.bar, borderRadius: b.radius, transition: 'background 0.5s ease, border-radius 0.4s ease', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: b.tracking, color: b.ink, fontSize: 13, transition: 'color 0.5s ease' }}>{b.wordmark}</span>
            <span style={{ padding: '3px 9px', borderRadius: b.radius, background: b.accent, color: '#14161f', fontSize: 9.5, fontWeight: 700, transition: 'background 0.5s ease, border-radius 0.4s ease' }}>{L(T('Top up', 'Alimentează'))}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {TILES.map(([kind, name]) => (
              <div key={name} style={{ padding: '8px 10px', background: 'rgba(233, 233, 237, 0.05)', border: '1px solid rgba(233, 233, 237, 0.09)', borderRadius: Math.min(b.radius, 12), transition: 'border-radius 0.4s ease', display: 'grid', gap: 2 }}>
                <span style={{ fontSize: 8.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: b.accent, transition: 'color 0.5s ease' }}>{L(kind)}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: b.ink, transition: 'color 0.5s ease' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* brand dots + caption */}
      <div style={{ display: 'grid', gap: 7, justifyItems: 'start' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          {BRANDS.map((br, n) => (
            <button key={br.name} onClick={() => pick(n)} aria-label={br.name} style={{ cursor: 'pointer', width: 14, height: 14, borderRadius: 99, border: 0, padding: 0, background: br.accent, opacity: n === i ? 1 : 0.35, transform: n === i ? 'scale(1.25)' : 'none', transition: 'all 0.25s ease' }}></button>
          ))}
        </span>
        <button onClick={onOpenCase} style={{ cursor: 'pointer', font: 'inherit', border: 0, background: 'transparent', fontSize: 12.5, fontWeight: 600, color: 'var(--accent)', padding: 0 }}>
          {L(T('Runtime white-label theming — the case study →', 'White-label la runtime — studiul de caz →'))}
        </button>
      </div>
    </div>
  )
}
