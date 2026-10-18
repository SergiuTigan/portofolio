// Shell: language, router, keyboard. Pages are below.
import { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { CASES } from './data.js'
import { LangContext, loadLang, saveLang } from './lib/i18n.jsx'
import { useRoute } from './lib/router.js'
import { FLAVOR, ORDER } from './lib/meta.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Case from './pages/Case.jsx'

const HOME_TITLE = 'Sergiu Țigan — Senior Frontend Engineer, builds whole products'

export default function App() {
  const [lang, setLangState] = useState(loadLang)
  const [route, navigate] = useRoute()

  const setLang = l => { setLangState(l); saveLang(l) }

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  // page colour follows the open case
  useEffect(() => {
    const c = route.view === 'case' && FLAVOR[route.id]
    document.documentElement.style.setProperty('--flavor', c || 'var(--signal)')
  }, [route])

  // title + canonical per route
  useEffect(() => {
    const c = route.view === 'case' && CASES.find(x => x.id === route.id)
    document.title = c ? `${c.client} — Sergiu Țigan` : HOME_TITLE
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
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (route.view !== 'home') { navigate('/'); setTimeout(go, 60) } else go()
  }, [route.view, navigate])

  // keyboard on case pages: Esc back, ←/→ between cases
  useEffect(() => {
    const onKey = e => {
      if (e.defaultPrevented || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || document.querySelector('dialog[open]')) return
      if (route.view !== 'case') return
      const i = ORDER.indexOf(route.id)
      if (e.key === 'Escape') goHome()
      if (e.key === 'ArrowRight') openCase(ORDER[(i + 1) % ORDER.length])
      if (e.key === 'ArrowLeft') openCase(ORDER[(i - 1 + ORDER.length) % ORDER.length])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [route, goHome, openCase])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <a className="skip" href="#main">Skip to content</a>
      <Header onHome={goHome} onJump={jump} />
      {route.view === 'home'
        ? <Home onOpen={openCase} onJump={jump} />
        : <Case key={route.id} id={route.id} onOpen={openCase} onHome={goHome} />}
      <Footer />
    </LangContext.Provider>
  )
}
