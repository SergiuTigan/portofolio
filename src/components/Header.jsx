import { useEffect, useState } from 'react'
import Logo from '../Logo.jsx'
import { useLang } from '../lib/i18n.jsx'
import { T } from '../data.js'

export default function Header({ onHome, onJump }) {
  const { L, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // the phone/tablet menu closes on Esc or a tap outside
  useEffect(() => {
    if (!menu) return
    const key = e => { if (e.key === 'Escape') setMenu(false) }
    const tap = e => { if (!e.target.closest('.menu-sheet, .menu-btn')) setMenu(false) }
    window.addEventListener('keydown', key)
    window.addEventListener('pointerdown', tap)
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('pointerdown', tap) }
  }, [menu])

  const links = [
    ['products', T('Products', 'Produse')],
    ['clients', T('Client work', 'Proiecte client')],
    ['about', T('About', 'Despre')],
    ['contact', T('Contact', 'Contact')],
  ]
  const go = id => { setMenu(false); onJump(id) }

  return (
    <header className={'hdr' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap hdr-in">
        <button className="brand" onClick={onHome} aria-label={L(T('Sergiu Țigan, home', 'Sergiu Țigan, acasă'))}>
          <Logo size={26} />
          <span>Sergiu Țigan</span>
        </button>
        <nav className="hnav" aria-label="Primary">
          {links.map(([id, label]) => <button key={id} onClick={() => go(id)}>{L(label)}</button>)}
        </nav>
        <div className="hdr-right">
          <div className="seg" role="group" aria-label="Language">
            {['en', 'ro'].map(l => <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>{l.toUpperCase()}</button>)}
          </div>
          <button className="menu-btn" onClick={() => setMenu(m => !m)} aria-expanded={menu} aria-controls="menu-sheet"><i aria-hidden />{L(T('Menu', 'Meniu'))}</button>
          <a className="btn btn-ink btn-sm" href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf">{L(T('Download CV', 'Descarcă CV'))}</a>
        </div>
        {menu && (
          <nav id="menu-sheet" className="menu-sheet" aria-label={L(T('Menu', 'Meniu'))}>
            {links.map(([id, label]) => <button key={id} onClick={() => go(id)}>{L(label)}</button>)}
            <a href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf" onClick={() => setMenu(false)}>{L(T('Download CV', 'Descarcă CV'))}</a>
          </nav>
        )}
      </div>
    </header>
  )
}
