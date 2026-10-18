import { useEffect, useState } from 'react'
import Logo from '../Logo.jsx'
import { useLang } from '../lib/i18n.jsx'
import { T } from '../data.js'

export default function Header({ onHome, onJump }) {
  const { L, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={'hdr' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap hdr-in">
        <button className="brand" onClick={onHome} aria-label={L(T('Sergiu Țigan, home', 'Sergiu Țigan, acasă'))}>
          <Logo size={26} />
          <span>Sergiu Țigan</span>
        </button>
        <nav className="hnav" aria-label="Primary">
          <button onClick={() => onJump('products')}>{L(T('Products', 'Produse'))}</button>
          <button onClick={() => onJump('clients')}>{L(T('Client work', 'Proiecte client'))}</button>
          <button onClick={() => onJump('about')}>{L(T('About', 'Despre'))}</button>
          <button onClick={() => onJump('contact')}>{L(T('Contact', 'Contact'))}</button>
        </nav>
        <div className="hdr-right">
          <div className="seg" role="group" aria-label="Language">
            {['en', 'ro'].map(l => <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>{l.toUpperCase()}</button>)}
          </div>
          <a className="btn btn-ink btn-sm" href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf">{L(T('Download CV', 'Descarcă CV'))}</a>
        </div>
      </div>
    </header>
  )
}
