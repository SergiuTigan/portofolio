// ⌘K — jump anywhere: projects, editions, sections, language, contact.
// Combobox pattern: the input owns focus, options are announced via
// aria-activedescendant, Tab is trapped, focus returns to the opener on close.
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
  const opener = useRef(null)

  const items = useMemo(() => {
    const out = []
    const grp = (g, arr) => arr.forEach(x => out.push({ ...x, grp: g }))
    grp(L(T('Projects', 'Proiecte')), CASES.map(c => ({ id: 'case-' + c.id, ico: '→', label: c.client, hint: L(c.sector).split('·')[0].trim(), color: FLAVOR[c.id], run: () => actions.openCase(c.id) })))
    grp(L(T('Editions', 'Ediții')), [
      ...EDITIONS.map(e => ({ id: 'ed-' + e.id, ico: '◐', label: e.name, hint: L(e.tagline), color: e.tokens['--accent'], run: () => actions.pickEdition(e) })),
      { id: 'ed-gen', ico: '✦', label: L(T('Generate a brand', 'Generează un brand')), hint: L(T('random tokens', 'tokenuri aleatorii')), run: actions.generate },
    ])
    grp(L(T('Go to', 'Mergi la')), [
      { id: 'go-work', ico: '#', label: L(T('Work', 'Proiecte')), run: () => actions.jump('work') },
      { id: 'go-about', ico: '#', label: L(T('How I work', 'Cum lucrez')), run: () => actions.jump('about') },
      { id: 'go-contact', ico: '#', label: L(T('Contact', 'Contact')), run: () => actions.jump('contact') },
    ])
    grp(L(T('Actions', 'Acțiuni')), [
      { id: 'a-lang', ico: 'Aa', label: lang === 'en' ? 'Comută în română' : 'Switch to English', run: actions.toggleLang },
      { id: 'a-mail', ico: '@', label: L(T('Copy email', 'Copiază emailul')), hint: 'sergiu@tigan.dev', run: actions.copyEmail },
      { id: 'a-cv', ico: '↓', label: L(T('Download CV', 'Descarcă CV')), hint: 'PDF', run: () => { window.location.href = '/Sergiu_Tigan_CV.pdf' } },
      { id: 'a-gh', ico: '↗', label: 'GitHub', hint: 'SergiuTigan', run: () => window.open('https://github.com/SergiuTigan', '_blank', 'noreferrer') },
      { id: 'a-li', ico: '↗', label: 'LinkedIn', hint: 'sergiu-tigan', run: () => window.open('https://linkedin.com/in/sergiu-tigan', '_blank', 'noreferrer') },
    ])
    return out
  }, [L, lang, actions])

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(x => (x.label + ' ' + (x.hint || '') + ' ' + x.grp).toLowerCase().includes(s))
  }, [q, items])

  useEffect(() => {
    if (open) {
      opener.current = document.activeElement
      setQ(''); setI(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    } else if (opener.current && typeof opener.current.focus === 'function') {
      opener.current.focus(); opener.current = null
    }
  }, [open])
  useEffect(() => { setI(0) }, [q])
  useEffect(() => { listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }) }, [i])

  if (!open) return null

  const run = item => { onClose(); setTimeout(item.run, 0) }
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setI(x => Math.min(x + 1, shown.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI(x => Math.max(x - 1, 0)) }
    else if (e.key === 'Enter' && shown[i]) { e.preventDefault(); run(shown[i]) }
    else if (e.key === 'Escape') { e.preventDefault(); onClose() }
    else if (e.key === 'Tab') { e.preventDefault(); inputRef.current?.focus() }
  }
  const activeId = shown[i] ? 'pal-opt-' + shown[i].id : undefined

  let lastGrp = null
  return (
    <div className="pal-bg" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="pal" role="dialog" aria-modal="true" aria-label={L(T('Command palette', 'Paletă de comenzi'))} onKeyDown={onKey}>
        <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder={L(T('Jump to a project, edition or section…', 'Mergi la un proiect, o ediție sau o secțiune…'))}
          role="combobox" aria-expanded="true" aria-controls="pal-list" aria-activedescendant={activeId} aria-autocomplete="list" aria-label={L(T('Search commands', 'Caută comenzi'))} autoComplete="off" spellCheck="false" />
        {shown.length === 0 ? (
          <div className="empty" id="pal-list" role="listbox" aria-label={L(T('Results', 'Rezultate'))}>{L(T('Nothing matches', 'Niciun rezultat pentru'))} “{q}”. {L(T('Try a project name, or an edition like “Ink” or “Paper”.', 'Încearcă numele unui proiect sau o ediție, de exemplu „Ink” sau „Paper”.'))}</div>
        ) : (
          <ul ref={listRef} id="pal-list" role="listbox" aria-label={L(T('Results', 'Rezultate'))}>
            {shown.map((item, n) => {
              const head = item.grp !== lastGrp ? <li className="grp" key={'g' + item.grp} role="presentation">{item.grp}</li> : null
              lastGrp = item.grp
              return [head, (
                <li key={item.id} id={'pal-opt-' + item.id} className={n === i ? 'on' : ''} role="option" aria-selected={n === i} onMouseEnter={() => setI(n)} onMouseDown={e => e.preventDefault()} onClick={() => run(item)}>
                  <div className="opt">
                    <span className="ico" style={item.color ? { color: item.color } : undefined} aria-hidden>{item.ico}</span>
                    <span>{item.label}</span>
                    {item.hint && <span className="hint">{item.hint}</span>}
                  </div>
                </li>
              )]
            })}
          </ul>
        )}
        <div className="foot" aria-hidden><span><span className="kbd">↑↓</span> {L(T('move', 'navighează'))}</span><span><span className="kbd">↵</span> {L(T('open', 'deschide'))}</span><span><span className="kbd">esc</span> {L(T('close', 'închide'))}</span></div>
      </div>
    </div>
  )
}
