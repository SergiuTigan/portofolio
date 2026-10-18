import Logo from '../Logo.jsx'
import { T } from '../data.js'
import { useLang } from '../lib/i18n.jsx'

export default function Footer() {
  const { L } = useLang()
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <Logo size={20} />
        <span>© 2026 Sergiu-Marian Țigan, Next Level Tech SRL</span>
        <span className="muted">{L(T('Screenshots use invented data. React and Vite, no CSS framework.', 'Screenshoturile folosesc date inventate. React și Vite, fără framework CSS.'))}</span>
        <span className="right">
          <a href="https://github.com/SergiuTigan" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/sergiu-tigan" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:sergiu@tigan.dev">sergiu@tigan.dev</a>
        </span>
      </div>
    </footer>
  )
}
