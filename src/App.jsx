// Shell: language, edition (theme tokens), router, ⌘K. Pages are below.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CASES } from './data.js'
import { LangContext, loadLang, saveLang } from './lib/i18n.jsx'
import { EDITIONS, DEFAULT_EDITION, loadEdition, saveEdition, applyEdition, generateEdition } from './lib/themes.js'
import { useRoute } from './lib/router.js'
import { FLAVOR, ORDER } from './lib/meta.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Palette from './components/Palette.jsx'
import Home from './pages/Home.jsx'
import Case from './pages/Case.jsx'

export default function App() {
  const [lang, setLangState] = useState(loadLang)
  const [edition, setEdition] = useState(() => loadEdition() || EDITIONS.find(e => e.id === DEFAULT_EDITION))
  const [route, navigate] = useRoute()
  const [palette, setPalette] = useState(false)
  const first = useRef(true)

  const setLang = l => { setLangState(l); saveLang(l) }

  // tokens → <html>
  useEffect(() => {
    applyEdition(edition, { animate: !first.current })
    first.current = false
    saveEdition(edition)
  }, [edition])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  // page colour follows the open case
  useEffect(() => {
    document.documentElement.style.setProperty('--flavor', route.view === 'case' && FLAVOR[route.id] ? FLAVOR[route.id] : 'var(--accent)')
  }, [route])

  // title + canonical per route
  useEffect(() => {
    const c = route.view === 'case' && CASES.find(x => x.id === route.id)
    document.title = c ? `${c.client} — Sergiu Țigan` : 'Sergiu Țigan — Senior Frontend Engineer · Angular, multi-brand platforms'
    const canon = document.querySelector('link[rel="canonical"]')
    if (canon) canon.setAttribute('href', 'https://sergiu.tigan.dev' + (c ? '/work/' + c.id : '/'))
  }, [route])

  // unknown /work/<id> → home, replacing the bad entry
  useEffect(() => {
    if (route.view === 'case' && !CASES.some(c => c.id === route.id)) navigate('/', { replace: true })
  }, [route, navigate])

  const openCase = useCallback(id => {
    if (!CASES.some(c => c.id === id)) return
    navigate('/work/' + id)
    window.scrollTo(0, 0)
  }, [navigate])

  const goHome = useCallback(() => { navigate('/'); window.scrollTo({ top: 0 }) }, [navigate])

  const jump = useCallback(id => {
    const go = () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    if (route.view !== 'home') { navigate('/'); setTimeout(go, 60) } else go()
  }, [route.view, navigate])

  const pickEdition = useCallback(e => setEdition(e), [])
  const generate = useCallback(() => setEdition(generateEdition(Math.random())), [])
  const copyEmail = useCallback(() => { navigator.clipboard?.writeText('sergiu@tigan.dev').catch(() => {}) }, [])
  const toggleLang = useCallback(() => setLang(lang === 'en' ? 'ro' : 'en'), [lang])

  // keyboard: ⌘K palette, Esc back, ←/→ between cases
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(p => !p); return }
      if (e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || palette) return
      if (route.view !== 'case') return
      const i = ORDER.indexOf(route.id)
      if (e.key === 'Escape') goHome()
      if (e.key === 'ArrowRight') openCase(ORDER[(i + 1) % ORDER.length])
      if (e.key === 'ArrowLeft') openCase(ORDER[(i - 1 + ORDER.length) % ORDER.length])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [route, palette, goHome, openCase])

  const actions = useMemo(() => ({ openCase, pickEdition, generate, jump, toggleLang, copyEmail }), [openCase, pickEdition, generate, jump, toggleLang, copyEmail])
  const openEditions = () => { document.querySelector('.ed-btn')?.click() }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <a className="skip" href="#main">Skip to content</a>
      <Header edition={edition} onPickEdition={pickEdition} onGenerate={generate} onHome={goHome} onJump={jump} onPalette={() => setPalette(true)} />
      {route.view === 'home'
        ? <Home edition={edition} onOpen={openCase} onJump={jump} onGenerate={generate} onOpenEditions={openEditions} />
        : <Case key={route.id} id={route.id} onOpen={openCase} onHome={goHome} />}
      <Footer edition={edition} />
      <Palette open={palette} onClose={() => setPalette(false)} actions={actions} />
    </LangContext.Provider>
  )
}
