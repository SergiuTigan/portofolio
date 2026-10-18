// Screenshots: a framed image (browser, phone or bare panel), a scrolling
// gallery of them, and a lightbox that pages through the same list.
import { useCallback, useEffect, useRef, useState } from 'react'
import SHOTS from '../shots.json'
import { T } from '../data.js'
import { useLang } from '../lib/i18n.jsx'

export const shotsFor = id => SHOTS[id] || []

export function Frame({ shot, eager = false, host }) {
  const { L } = useLang()
  const img = <img src={shot.src} width={shot.w} height={shot.h} alt={L(shot.cap)} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  if (shot.kind === 'phone') return <span className="frame frame-phone">{img}</span>
  if (shot.kind === 'panel') return <span className="frame frame-panel">{img}</span>
  return (
    <span className="frame frame-web">
      <span className="frame-bar" aria-hidden><span className="frame-url">{shot.host || host}</span></span>
      {img}
    </span>
  )
}

export function Gallery({ id, host }) {
  const { L } = useLang()
  const shots = shotsFor(id)
  const [open, setOpen] = useState(-1)
  const strip = useRef(null)
  if (!shots.length) return null

  const nudge = dir => {
    const el = strip.current
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="gallery">
      <div className="gallery-strip" ref={strip}>
        {shots.map((s, i) => (
          <figure key={s.src} className={'g-item g-' + s.kind}>
            <button className="g-btn" onClick={() => setOpen(i)} aria-label={L(T('Enlarge: ', 'Mărește: ')) + L(s.cap)}>
              <Frame shot={s} host={host} />
            </button>
            <figcaption>{L(s.cap)}</figcaption>
          </figure>
        ))}
      </div>
      {shots.length > 2 && (
        <div className="gallery-nav">
          <button className="round" onClick={() => nudge(-1)} aria-label={L(T('Scroll back', 'Înapoi'))}>‹</button>
          <button className="round" onClick={() => nudge(1)} aria-label={L(T('Scroll forward', 'Înainte'))}>›</button>
          <span className="muted">{shots.length} {L(T('screens, invented data', 'ecrane, date inventate'))}</span>
        </div>
      )}
      <Lightbox shots={shots} index={open} onIndex={setOpen} host={host} />
    </div>
  )
}

export function Lightbox({ shots, index, onIndex, host }) {
  const { L } = useLang()
  const ref = useRef(null)
  const isOpen = index >= 0

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (isOpen && !d.open) d.showModal()
    if (!isOpen && d.open) d.close()
  }, [isOpen])

  const step = useCallback(n => onIndex((index + n + shots.length) % shots.length), [index, shots.length, onIndex])

  useEffect(() => {
    if (!isOpen) return
    const k = e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [isOpen, step])

  const s = shots[index]
  return (
    <dialog ref={ref} className="lightbox" onClose={() => onIndex(-1)} onClick={e => { if (e.target === ref.current) onIndex(-1) }}>
      {s && (
        <div className="lb-in">
          <div className={'lb-img lb-' + s.kind}><Frame shot={s} host={host} eager /></div>
          <div className="lb-bar">
            <span>{L(s.cap)}</span>
            <span className="muted num">{index + 1} / {shots.length}</span>
            <button className="round" onClick={() => step(-1)} aria-label={L(T('Previous screen', 'Ecranul anterior'))}>‹</button>
            <button className="round" onClick={() => step(1)} aria-label={L(T('Next screen', 'Ecranul următor'))}>›</button>
            <button className="btn btn-line btn-sm" onClick={() => onIndex(-1)}>{L(T('Close', 'Închide'))}</button>
          </div>
        </div>
      )}
    </dialog>
  )
}
