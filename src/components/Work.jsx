import { useState } from 'react'
import { CASES, T } from '../data.js'
import { FLAVOR, DOMAIN, ORDER } from '../lib/meta.js'
import { useLang } from '../lib/i18n.jsx'
import HeroDemo from '../HeroDemo.jsx'
import Reveal from './Reveal.jsx'

export default function Work({ onOpen }) {
  const { L, lang } = useLang()
  const byId = Object.fromEntries(CASES.map(c => [c.id, c]))
  const horae = byId.horae
  const rest = ORDER.filter(id => id !== 'horae').map(id => byId[id])
  const [hover, setHover] = useState(rest[0].id)
  const pv = byId[hover]

  return (
    <section id="work" className="section" aria-labelledby="work-h">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="index">01</span>
          <h2 id="work-h">{L(T('Nine projects, each in its own colors', 'Nouă proiecte, fiecare în culorile lui'))}</h2>
          <p className="sub lead">{L(T('Every one has a working demo of its interface, anonymised where an NDA applies. The page re-tints itself to the project you open.', 'Fiecare are un demo funcțional al interfeței, anonimizat acolo unde există NDA. Pagina se colorează după proiectul pe care îl deschizi.'))}</p>
        </Reveal>

        <Reveal>
          <button className="feature" onClick={() => onOpen('horae')} style={{ '--flavor': FLAVOR.horae }}>
            <span className="txt">
              <span className="eyebrow">{L(horae.sector)} · {L(T('flagship', 'produs principal'))}</span>
              <h3>Horae</h3>
              <span className="one">{L(horae.oneLiner)}</span>
              <span className="tags">{horae.tags.slice(0, 6).map(tg => <span key={tg} className="tag">{tg}</span>)}</span>
              <span className="metrics">
                <span><b>4</b><span>{L(T('clients, one API', 'clienți, un API'))}</span></span>
                <span><b>~22</b><span>{L(T('org-scoped models', 'modele multi-tenant'))}</span></span>
                <span><b>1</b><span>{L(T('person, end to end', 'om, cap-coadă'))}</span></span>
              </span>
            </span>
            <span className="vis">
              <HoraeGlyph />
              <span className="open">{L(T('Open the case study', 'Deschide studiul de caz'))} →</span>
            </span>
          </button>
        </Reveal>

        <div className="work-grid">
          <div className="worklist" role="list">
            {rest.map((c, n) => (
              <div role="listitem" key={c.id} style={{ display: 'contents' }}>
              <button className={'row' + (hover === c.id ? ' on' : '')} style={{ '--flavor': FLAVOR[c.id] }} onClick={() => onOpen(c.id)} onMouseEnter={() => setHover(c.id)} onFocus={() => setHover(c.id)}>
                <span className="n">{String(n + 2).padStart(2, '0')}</span>
                <span><span className="client">{c.client}</span><span className="sector">{L(DOMAIN[c.id])}{c.own ? ' · ' + L(T('own product', 'produs propriu')) : ''}</span></span>
                <span className="one">{L(c.oneLiner)}</span>
                <span className="when">{L(c.period)}</span>
                <span className="go" aria-hidden>→</span>
              </button>
              </div>
            ))}
          </div>
          <aside className="preview" aria-hidden inert>
            <div className="pv" key={pv.id} style={{ '--flavor': FLAVOR[pv.id] }}>
              <div className="domain"><span className="eyebrow">{L(DOMAIN[pv.id])}</span><span className="mono muted" style={{ fontSize: 11 }}>{L(pv.period)}</span></div>
              <h4>{pv.client}</h4>
              {pv.id === 'platform' ? (
                <HeroDemo lang={lang} onOpenCase={() => onOpen('platform')} />
              ) : (
                <>
                  <p style={{ fontSize: 13.5, color: 'var(--soft)', lineHeight: 1.55 }}>{L(pv.oneLiner)}</p>
                  <div className="metric"><b>{L(pv.metrics[0].after)}</b><span>{L(pv.metrics[0].label)}</span></div>
                </>
              )}
              <div className="stack">{pv.stack.slice(0, 5).map(s => <span key={s} className="tag">{s}</span>)}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* an abstract "recipe → task → stock" glyph for the Horae feature tile */
function HoraeGlyph() {
  return (
    <svg viewBox="0 0 320 200" width="100%" style={{ maxWidth: 360 }} aria-hidden>
      <defs><linearGradient id="hg" x1="0" x2="1"><stop offset="0" stopColor="var(--flavor)" stopOpacity="0.9" /><stop offset="1" stopColor="var(--flavor)" stopOpacity="0.3" /></linearGradient></defs>
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${18 + i * 100} 0)`}>
          <rect x="0" y={34 + i * 18} width="84" height="110" rx="10" fill="var(--card)" stroke="var(--line-2)" />
          <rect x="12" y={48 + i * 18} width="40" height="8" rx="4" fill="var(--flavor)" opacity={0.9 - i * 0.25} />
          <rect x="12" y={64 + i * 18} width="60" height="6" rx="3" fill="var(--line-2)" />
          <rect x="12" y={76 + i * 18} width="48" height="6" rx="3" fill="var(--line-2)" />
          <rect x="12" y={100 + i * 18} width="60" height="24" rx="6" fill="url(#hg)" opacity="0.7" />
        </g>
      ))}
      <path d="M102 90 C 112 90, 112 108, 118 108 M202 108 C 212 108, 212 126, 218 126" stroke="var(--flavor)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <text x="18" y="22" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">REȚETĂ</text>
      <text x="118" y="22" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">TASK</text>
      <text x="218" y="22" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">STOC FIFO</text>
    </svg>
  )
}
