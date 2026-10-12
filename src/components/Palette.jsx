// ⌘K — jump anywhere: projects, editions, sections, language, contact.
import { useEffect, useMemo, useRef, useState } from 'react'
import { CASES, T } from '../data.js'
import { EDITIONS } from '../lib/themes.js'
import { useLang } from '../lib/i18n.jsx'
import { FLAVOR } from '../lib/meta.js'

export default function Palette({ open, onClose, actions }) {
  const { L, lang } = useLang()
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const items = useMemo(() => {
    const out = []
    const grp = (g, arr) => arr.forEach(x => out.push({ ...x, grp: g }))
    grp(L(T('Projects', 'Proiecte')), CASES.map(c => ({ id: 'case:' + c.id, ico: '→', label: c.client, hint: L(c.sector).split('·')[0].trim(), color: FLAVOR[c.id], run: () => actions.openCase(c.id) })))
    grp(L(T('Editions', 'Ediții')), [
      ...EDITIONS.map(e => ({ id: 'ed:' + e.id, ico: '◐', label: e.name, hint: L(e.tagline), color: e.tokens['--accent'], run: () => actions.pickEdition(e) })),
      { id: 'ed:gen', ico: '✦', label: L(T('Generate a brand', 'Generează un brand')), hint: L(T('random tokens', 'tokenuri aleatorii')), run: actions.generate },
    ])
    grp(L(T('Go to', 'Mergi la')), [
      { id: 'go:work', ico: '#', label: L(T('Work', 'Proiecte')), run: () => actions.jump('work') },
      { id: 'go:about', ico: '#', label: L(T('How I work', 'Cum lucrez')), run: () => actions.jump('about') },
      { id: 'go:contact', ico: '#', label: L(T('Contact', 'Contact')), run: () => actions.jump('contact') },
    ])
    grp(L(T('Actions', 'Acțiuni')), [
      { id: 'a:lang', ico: 'Aa', label: lang === 'en' ? 'Comută în română' : 'Switch to English', run: actions.toggleLang },
      { id: 'a:mail', ico: '@', label: L(T('Copy email', 'Copiază emailul')), hint: 'sergiu@tigan.dev', run: actions.copyEmail },
      { id: 'a:cv', ico: '↓', label: L(T('Download CV', 'Descarcă CV')), hint: 'PDF', run: () => { window.location.href = '/Sergiu_Tigan_CV.pdf' } },
      { id: 'a:gh', ico: '↗', label: 'GitHub', hint: 'SergiuTigan', run: () => window.open('https://github.com/SergiuTigan', '_blank', 'noreferrer') },
      { id: 'a:li', ico: '↗', label: 'LinkedIn', hint: 'sergiu-tigan', run: () => window.open('https://linkedin.com/in/sergiu-tigan', '_blank', 'noreferrer') },
    ])
    return out
  }, [L, lang, actions])

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(x => (x.label + ' ' + (x.hint || '') + ' ' + x.grp).toLowerCase().includes(s))
  }, [q, items])

  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => inputRef.current?.focus(), 10) } }, [open])
  useEffect(() => { setI(0) }, [q])
  useEffect(() => {
    const el = listRef.current?.querySelector('li.on')
    el?.scrollIntoView({ block: 'nearest' })
  }, [i])

  if (!open) return null

  const run = item => { onClose(); setTimeout(item.run, 0) }
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setI(x => Math.min(x + 1, shown.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setI(x => Math.max(x - 1, 0)) }
    if (e.key === 'Enter' && shown[i]) { e.preventDefault(); run(shown[i]) }
    if (e.key === 'Escape') onClose()
  }

  let lastGrp = null
  return (
    <div className="pal-bg" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette">
        <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey} placeholder={L(T('Jump to a project, edition or section…', 'Mergi la un proiect, o ediție sau o secțiune…'))} aria-label="Search" />
        {shown.length === 0 ? (
          <div className="empty">{L(T('Nothing matches', 'Niciun rezultat pentru'))} “{q}”. {L(T('Try a project name, or an edition like “Ink” or “Paper”.', 'Încearcă numele unui proiect sau o ediție, de exemplu „Ink” sau „Paper”.'))}</div>
        ) : (
          <ul ref={listRef} role="listbox">
            {shown.map((item, n) => {
              const head = item.grp !== lastGrp ? <li className="grp" key={'g' + item.grp} role="presentation">{item.grp}</li> : null
              lastGrp = item.grp
              return [head, (
                <li key={item.id} className={n === i ? 'on' : ''} role="option" aria-selected={n === i} onMouseEnter={() => setI(n)}>
                  <button onClick={() => run(item)}>
                    <span className="ico" style={item.color ? { color: item.color } : undefined}>{item.ico}</span>
                    <span>{item.label}</span>
                    {item.hint && <span className="hint">{item.hint}</span>}
                  </button>
                </li>
              )]
            })}
          </ul>
        )}
        <div className="foot"><span><span className="kbd">↑↓</span> {L(T('move', 'navighează'))}</span><span><span className="kbd">↵</span> {L(T('open', 'deschide'))}</span><span><span className="kbd">esc</span> {L(T('close', 'închide'))}</span></div>
      </div>
    </div>
  )
}
