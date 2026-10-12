import Logo from '../Logo.jsx'
import { T } from '../data.js'
import { useLang } from '../lib/i18n.jsx'

export default function Footer({ edition }) {
  const { L } = useLang()
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <span style={{ color: 'var(--accent)', display: 'flex' }} aria-hidden><Logo size={18} ink="var(--muted)" /></span>
        <span>© 2026 Sergiu-Marian Țigan · Next Level Tech SRL</span>
        <span>{L(T('Built with React and Vite. Theming is tokens only — no CSS framework.', 'Făcut cu React și Vite. Themingul se face doar prin tokenuri — fără framework CSS.'))} {L(T('Edition', 'Ediție'))}: <b style={{ color: 'var(--soft)' }}>{edition.name}</b></span>
        <span className="right">
          <a href="https://github.com/SergiuTigan/portofolio" target="_blank" rel="noreferrer">{L(T('Source', 'Sursa'))} ↗</a>
          <a href="https://github.com/SergiuTigan" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/sergiu-tigan" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:sergiu@tigan.dev">Email</a>
        </span>
      </div>
    </footer>
  )
}
