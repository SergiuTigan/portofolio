import { useEffect, useRef, useState } from 'react'
import { T } from '../data.js'
import { PRODUCTS } from '../products.js'
import { useLang } from '../lib/i18n.jsx'
import { Frame, shotsFor } from './Shots.jsx'

const DWELL = 6000

// The stage shows each product as it really looks; the dock underneath picks
// one. It advances by itself until someone touches it.
export default function Hero({ onJump }) {
  const { L, lang } = useLang()
  const staged = PRODUCTS.map(p => {
    const shots = shotsFor(p.id)
    const main = shots.find(s => s.hero === 'main') || shots.find(s => s.kind !== 'phone') || shots[0]
    // phone-only products stand three handsets side by side
    const trio = main?.kind === 'phone' ? shots.filter(s => s.kind === 'phone' && s.hero).slice(0, 3) : null
    return { ...p, main, trio, side: shots.find(s => s.hero === 'side') }
  }).filter(p => p.main)

  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hold, setHold] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false)
  }, [])

  useEffect(() => {
    if (!auto || hold || staged.length < 2) return
    const t = setTimeout(() => setI(n => (n + 1) % staged.length), DWELL)
    return () => clearTimeout(t)
  }, [i, auto, hold, staged.length])

  const pick = n => { setI(n); setAuto(false) }
  const p = staged[i]

  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap">
        <p className="hero-who">
          <img src="/me.jpg" alt="" width="48" height="48" />
          <span>{L(T('Sergiu Țigan, senior frontend engineer in Cluj-Napoca. Available for remote contracts.', 'Sergiu Țigan, senior frontend engineer în Cluj-Napoca. Disponibil pentru contracte remote.'))}</span>
        </p>
        <h1 id="hero-h" className="hero-h">
          {lang === 'ro'
            ? <><span>Frontend de meserie.</span> <span>Produse întregi din obișnuință.</span></>
            : <><span>Frontend by trade.</span> <span>Whole products by habit.</span></>}
        </h1>
        <div className="hero-row">
          <p className="lead">{L(T(
            'Eight years of Angular for automotive, banking and compliance teams. Alongside that I design, build and operate my own products — backend, web, iOS, Android, plugins, extensions — and keep them running for real users.',
            'Opt ani de Angular pentru echipe din automotive, banking și conformitate. În paralel proiectez, construiesc și operez propriile produse — backend, web, iOS, Android, pluginuri, extensii — și le țin în funcțiune pentru utilizatori reali.'
          ))}</p>
          <div className="hero-cta">
            <button className="btn btn-signal" onClick={() => onJump('products')}>{L(T('Look at the products', 'Vezi produsele'))}</button>
            <button className="btn btn-line" onClick={() => onJump('contact')}>{L(T('Hire me for a contract', 'Angajează-mă pe contract'))}</button>
          </div>
        </div>

        {p && (
          <div className="stage-wrap" ref={root} onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
            <div className="stage" style={{ '--pc': p.color }}>
              {staged.map((s, n) => (
                <div key={s.id} className={'stage-scene' + (n === i ? ' on' : '')} aria-hidden={n !== i}>
                  {s.trio
                    ? <div className="stage-trio">{s.trio.map(t => <Frame key={t.src} shot={t} eager={n === 0} />)}</div>
                    : <>
                        <div className={'stage-main stage-' + s.main.kind}><Frame shot={s.main} eager={n === 0} /></div>
                        {s.side && <div className={'stage-side stage-' + s.side.kind}><Frame shot={s.side} eager={n === 0} /></div>}
                      </>}
                </div>
              ))}
            </div>
            <div className="dock" role="tablist" aria-label={L(T('Products', 'Produse'))}>
              {staged.map((s, n) => (
                <button key={s.id} role="tab" aria-selected={n === i} className={'dock-item' + (n === i ? ' on' : '')} style={{ '--pc': s.color }} onClick={() => pick(n)}>
                  <span className="dock-name">{s.name}</span>
                  <span className="dock-kind">{L(s.kind)}</span>
                  {n === i && auto && !hold && <span className="dock-timer" style={{ animationDuration: DWELL + 'ms' }} aria-hidden />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
