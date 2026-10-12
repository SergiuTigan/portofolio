import { useEffect, useRef, useState } from 'react'
import { T } from '../data.js'
import { useLang } from '../lib/i18n.jsx'

const FONT_LABEL = v => (v || '').split(',')[0].replace(/'/g, '')

export default function Hero({ edition, onJump, onGenerate, onOpenEditions }) {
  const { L, lang } = useLang()
  const glow = useRef(null)
  const [photoOk, setPhotoOk] = useState(true)

  // cursor-follow glow; cheap, disabled with reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = glow.current
    const on = e => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%')
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%')
    }
    const sec = el.parentElement
    sec.addEventListener('pointermove', on)
    return () => sec.removeEventListener('pointermove', on)
  }, [])

  const t = edition.tokens
  const stats = [
    ['8+', T('years of Angular', 'ani de Angular')],
    ['10', T('brands, one codebase', 'branduri, un singur cod')],
    ['5', T('VW Group marques', 'mărci VW Group')],
    ['5', T('own products live', 'produse proprii live')],
    ['−80%', T('review time, automated', 'timp de review, automatizat')],
  ]

  return (
    <section className="hero" aria-labelledby="hero-h">
      <div ref={glow} className="hero-glow" aria-hidden />
      <div className="wrap hero-grid">
        <div className="rise">
          <span className="avail"><span className="dot" aria-hidden />{L(T('Available for contract · remote', 'Disponibil pentru contract · remote'))}</span>
          <h1 id="hero-h">
            {lang === 'ro'
              ? <>Un brand nou e <em>configurație</em>, nu cod.</>
              : <>A new brand is <em>configuration</em>, not code.</>}
          </h1>
          <p className="lead">{L(T(
            'I’m Sergiu Țigan, Senior Frontend Engineer — 8+ years of Angular in automotive, banking and compliance. I build multi-brand platforms where theming is tokens, and I run my own SaaS products solo.',
            'Sunt Sergiu Țigan, Senior Frontend Engineer — 8+ ani de Angular în automotive, banking și conformitate. Construiesc platforme multi-brand în care themingul înseamnă tokenuri și operez singur propriile produse SaaS.'
          ))}</p>
          <div className="hero-cta">
            <button className="btn btn-pop" onClick={() => onJump('work')}>{L(T('See the work', 'Vezi proiectele'))} <span className="arrow">→</span></button>
            <button className="btn btn-line" onClick={() => onJump('contact')}>{L(T('Work with me', 'Hai să lucrăm'))}</button>
            <span className="hero-links">
              <a href="https://github.com/SergiuTigan" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/sergiu-tigan" target="_blank" rel="noreferrer">LinkedIn</a>
            </span>
          </div>
          <div className="stats" role="list">
            {stats.map(([v, l]) => <div className="stat" role="listitem" key={v}><b>{v}</b><span>{L(l)}</span></div>)}
          </div>
        </div>

        {/* portrait + the page's own tokens — live proof of the headline */}
        <div className="hero-side rise d2">
          <figure className="portrait">
            {photoOk ? <img src="/me.jpg" alt="Sergiu Țigan" width="1200" height="1200" fetchPriority="high" onError={() => setPhotoOk(false)} /> : <div className="portrait-fallback" />}
            <figcaption><b>Sergiu Țigan</b><span>Cluj-Napoca · CET · {L(T('4h overlap with US Eastern', '4h suprapunere cu US Eastern'))}</span></figcaption>
          </figure>
          <aside className="spec" style={{ '--tilt': '-1.2deg' }} aria-label={L(T('Current edition tokens', 'Tokenurile ediției curente'))}>
            <div className="spec-top">
              <span className="swatch" aria-hidden />
              <span className="name" style={{ fontFamily: t['--font-display'] }}>{edition.name}</span>
              <span className="live"><span className="dot" style={{ width: 6, height: 6 }} aria-hidden />{L(T('live tokens', 'tokenuri live'))}</span>
            </div>
            <div className="spec-rows">
              <div className="spec-row"><span className="k">accent</span><span className="v">{t['--accent']}</span><span className="sw" style={{ background: t['--accent'] }} /></div>
              <div className="spec-row"><span className="k">action</span><span className="v">{t['--pop']}</span><span className="sw" style={{ background: t['--pop'] }} /></div>
              <div className="spec-row"><span className="k">surface</span><span className="v">{t['--bg']}</span><span className="sw" style={{ background: t['--bg'] }} /></div>
              <div className="spec-row"><span className="k">display</span><span className="v" style={{ fontFamily: t['--font-display'] }}>{FONT_LABEL(t['--font-display'])}</span><span style={{ fontFamily: t['--font-display'], fontSize: 16, lineHeight: 1 }}>Aa</span></div>
              <div className="spec-row"><span className="k">radius</span><span className="v">{t['--radius']}</span><span className="shape" /></div>
            </div>
            <p className="spec-caption">
              {L(T('This page is configuration. ', 'Pagina asta e configurație. '))}
              <button onClick={onOpenEditions}>{L(T('Pick an edition', 'Alege o ediție'))}</button>
              {L(T(' or ', ' sau '))}
              <button onClick={onGenerate}>{L(T('generate a brand', 'generează un brand'))}</button>
              {L(T(' — same markup, different tokens.', ' — același markup, alte tokenuri.'))}
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
