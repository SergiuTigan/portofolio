import { useEffect, useRef, useState } from 'react'
import { EDITIONS } from '../lib/themes.js'
import { useLang } from '../lib/i18n.jsx'
import { T } from '../data.js'

export default function EditionMenu({ edition, onPick, onGenerate }) {
  const { L } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className="ed-btn" onClick={() => setOpen(o => !o)} aria-haspopup="menu" aria-expanded={open} title={L(T('Edition — re-theme the site', 'Ediție — schimbă tema site-ului'))}>
        <span className="swatch" aria-hidden />
        <span className="lbl">{edition.name}</span>
        <span aria-hidden style={{ fontSize: 10, color: 'var(--muted)' }}>▾</span>
      </button>
      {open && (
        <div className="ed-pop" role="menu">
          <div className="title">
            <span className="kicker">{L(T('Edition', 'Ediție'))}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{L(T('same markup, other tokens', 'același markup, alte tokenuri'))}</span>
          </div>
          {EDITIONS.map(e => (
            <button key={e.id} role="menuitemradio" aria-checked={edition.id === e.id} className={'ed-row' + (edition.id === e.id ? ' on' : '')} onClick={() => { onPick(e); setOpen(false) }}>
              <span className="prev" style={{ background: e.tokens['--bg'] }} aria-hidden>
                <i style={{ background: e.tokens['--accent'] }} />
                <i style={{ background: e.tokens['--pop'] }} />
              </span>
              <span><b style={{ fontFamily: e.tokens['--font-display'] }}>{e.name}</b><small>{L(e.tagline)}</small></span>
              <span className="check">{edition.id === e.id ? '●' : ''}</span>
            </button>
          ))}
          {edition.generated && (
            <div className="ed-row on" aria-current="true">
              <span className="prev" style={{ background: edition.tokens['--bg'] }} aria-hidden>
                <i style={{ background: edition.tokens['--accent'] }} />
                <i style={{ background: edition.tokens['--pop'] }} />
              </span>
              <span><b style={{ fontFamily: edition.tokens['--font-display'] }}>{edition.name}</b><small>{L(edition.tagline)}</small></span>
              <span className="check">●</span>
            </div>
          )}
          <div className="ed-foot">
            <button className="btn btn-pop btn-sm" onClick={() => { onGenerate(); }}>{L(T('Generate a brand', 'Generează un brand'))}</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { onPick(EDITIONS[0]); setOpen(false) }}>{L(T('Reset', 'Resetează'))}</button>
          </div>
        </div>
      )}
    </div>
  )
}
