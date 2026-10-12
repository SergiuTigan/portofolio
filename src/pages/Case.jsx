import { useEffect, useState } from 'react'
import { CASES, T } from '../data.js'
import { FLAVOR, ORDER } from '../lib/meta.js'
import { useLang } from '../lib/i18n.jsx'
import Demo from '../Demo.jsx'

const SECTIONS = ['demo', 'impact', 'built', 'story', 'arch', 'lessons']

export default function Case({ id, onOpen, onHome }) {
  const { L, lang } = useLang()
  const c = CASES.find(x => x.id === id)
  const [nodeKey, setNodeKey] = useState('0-0')
  const [active, setActive] = useState('demo')

  const idx = ORDER.indexOf(id)
  const prev = CASES.find(x => x.id === ORDER[(idx - 1 + ORDER.length) % ORDER.length])
  const next = CASES.find(x => x.id === ORDER[(idx + 1) % ORDER.length])

  useEffect(() => { setNodeKey('0-0'); setActive('demo') }, [id])

  // rail highlight follows scroll
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const els = SECTIONS.map(s => document.getElementById('s-' + s)).filter(Boolean)
    const io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (vis[0]) setActive(vis[0].target.id.slice(2))
    }, { rootMargin: '-20% 0px -65% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [id])

  if (!c) return null
  const [li, ni] = nodeKey.split('-').map(Number)
  const node = (c.arch[li] && c.arch[li].nodes[ni]) || c.arch[0].nodes[0]
  const titles = {
    demo: T('Working demo', 'Demo funcțional'), impact: T('Impact', 'Impact'), built: T('Shipped', 'Livrat'),
    story: T('The story', 'Povestea'), arch: T('Architecture', 'Arhitectura'), lessons: T('Lessons', 'Lecții'),
  }
  const go = s => { document.getElementById('s-' + s)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return (
    <main id="main" className="rise" style={{ '--flavor': FLAVOR[c.id] }}>
      <section className="case-hero">
        <div className="wrap">
          <button className="back" onClick={onHome}>← {L(T('All work', 'Toate proiectele'))}</button>
          <div className="case-head">
            <div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="eyebrow">{L(c.sector)}</span>
                <span className="mono muted" style={{ fontSize: 11 }}>{L(c.period)}</span>
              </div>
              <h1>{c.client}</h1>
              <p className="lead">{L(c.oneLiner)}</p>
              <div className="stack">{c.stack.slice(0, 9).map(s => <span key={s} className="tag">{s}</span>)}</div>
            </div>
            <div className="mstrip">
              {c.metrics.slice(0, 3).map(m => (
                <div className="m" key={L(m.label)}><span className="l">{L(m.label)}</span><span><span className="b">{L(m.before)}</span><span className="a">{L(m.after)}</span></span></div>
              ))}
            </div>
          </div>
          {c.live && (
            <div className="case-live">
              <a className="btn btn-accent btn-sm" href={c.live.url} target="_blank" rel="noreferrer">{L(T('Try it live', 'Încearcă live'))} ↗</a>
              <span>{L(T('Demo account', 'Cont demo'))}: <code>{c.live.user}</code> · <code>{c.live.pass}</code></span>
              <span className="muted" style={{ fontSize: 12.5 }}>{L(T('Sandbox — data resets, nothing is real.', 'Sandbox — datele se resetează, nimic nu e real.'))}</span>
            </div>
          )}
        </div>
      </section>

      <div className="wrap case-body">
        <nav className="rail" aria-label={L(T('On this page', 'Pe această pagină'))}>
          {SECTIONS.map(s => <a key={s} href={'#s-' + s} className={active === s ? 'on' : ''} onClick={e => { e.preventDefault(); go(s) }}>{L(titles[s])}</a>)}
          <div className="pn">
            <button onClick={() => onOpen(prev.id)}><small>← {L(T('Previous', 'Anterior'))}</small>{prev.client}</button>
            <button onClick={() => onOpen(next.id)}><small>{L(T('Next', 'Următor'))} →</small>{next.client}</button>
          </div>
        </nav>

        <div className="cs">
          <section id="s-demo">
            <h2><span className="n">01</span>{L(titles.demo)}</h2>
            <p className="note">{L(c.demoNote)}</p>
            <Demo kind={c.demo} lang={lang} chrome={c.client.toLowerCase().split(' ')[0] + ' — demo'} />
          </section>

          <section id="s-impact">
            <h2><span className="n">02</span>{L(titles.impact)}</h2>
            <div className="impact">
              {c.metrics.map(m => (
                <div className="imp" key={L(m.label)}>
                  <div className="l">{L(m.label)}</div>
                  <div className="v"><span className="b">{L(m.before)}</span><span style={{ color: 'var(--flavor)' }} aria-hidden>→</span><span className="a">{L(m.after)}</span></div>
                  <p>{L(m.note)}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="s-built">
            <h2><span className="n">03</span>{L(titles.built)}</h2>
            <ul className="built" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {c.built.map((b, n) => <li key={n}><div><b>{L(b.title)}.</b> <span>{L(b.body)}</span></div></li>)}
            </ul>
          </section>

          <section id="s-story" className="story">
            <h2><span className="n">04</span>{L(titles.story)}</h2>
            {[...c.context, ...c.challenge].map((p, i) => <p key={i}>{L(p)}</p>)}
          </section>

          <section id="s-arch">
            <h2><span className="n">05</span>{L(titles.arch)} <span className="muted" style={{ fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: 0 }}>— {L(T('tap a node', 'apasă un nod'))}</span></h2>
            <div className="arch">
              {c.arch.map((layer, l) => (
                <div className="arch-layer" key={l}>
                  <span className="t">{L(layer.title)}</span>
                  <div className="nodes">
                    {layer.nodes.map((n, k) => {
                      const key = l + '-' + k
                      return <button key={key} className={'chip' + (key === nodeKey ? ' on' : '')} onClick={() => setNodeKey(key)} aria-pressed={key === nodeKey}>{L(n.label)}</button>
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="arch-note" aria-live="polite">
              <div className="eyebrow" style={{ marginBottom: 4 }}>{L(node.label)}</div>
              <p>{L(node.note)}</p>
            </div>
          </section>

          <section id="s-lessons">
            <h2><span className="n">06</span>{L(titles.lessons)}</h2>
            <div className="lessons">
              {c.lessons.map(l => <div className="lesson" key={L(l.title)}><b>{L(l.title)}</b><p>{L(l.body)}</p></div>)}
            </div>
          </section>

          <div className="pn-grid">
            <button className="pn-card" onClick={() => onOpen(prev.id)} style={{ '--flavor': FLAVOR[prev.id] }}><small>← {L(T('Previous', 'Anterior'))}</small><b>{prev.client}</b></button>
            <button className="pn-card r" onClick={() => onOpen(next.id)} style={{ '--flavor': FLAVOR[next.id] }}><small>{L(T('Next', 'Următor'))} →</small><b>{next.client}</b></button>
          </div>
        </div>
      </div>
    </main>
  )
}
