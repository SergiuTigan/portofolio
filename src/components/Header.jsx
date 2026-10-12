import { useEffect, useState } from 'react'
import Logo from '../Logo.jsx'
import EditionMenu from './EditionMenu.jsx'
import { useLang } from '../lib/i18n.jsx'
import { T } from '../data.js'

export default function Header({ edition, onPickEdition, onGenerate, onHome, onJump, onPalette }) {
  const { L, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <header className={'hdr' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap hdr-in">
        <button className="brand" onClick={onHome} aria-label="Sergiu Țigan — home">
          <span className="mark"><Logo size={24} /></span>
          <span className="name">Sergiu Țigan</span>
        </button>
        <nav className="hnav" aria-label="Primary">
          <button onClick={() => onJump('work')}>{L(T('Work', 'Proiecte'))}</button>
          <button onClick={() => onJump('about')}>{L(T('About', 'Despre'))}</button>
          <button onClick={() => onJump('contact')}>{L(T('Contact', 'Contact'))}</button>
          <button className="pal-btn" onClick={onPalette} title={L(T('Command palette', 'Paletă de comenzi'))} aria-label={L(T('Open menu and command palette', 'Deschide meniul și paleta de comenzi'))}>
            <span className="pal-lbl">{L(T('Menu', 'Meniu'))}</span>
            <span className="kbd" aria-hidden>{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }} className="hdr-right">
          <EditionMenu edition={edition} onPick={onPickEdition} onGenerate={onGenerate} />
          <div className="seg" role="group" aria-label="Language">
            {['en', 'ro'].map(l => <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>{l.toUpperCase()}</button>)}
          </div>
          <a className="btn btn-pop btn-sm cv-link" href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf">{L(T('CV', 'CV'))} ↓</a>
        </div>
      </div>
    </header>
  )
}
