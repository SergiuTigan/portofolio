import { createContext, useContext } from 'react'

export const LangContext = createContext({ lang: 'en', setLang: () => {} })

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  const L = o => (o && typeof o === 'object' && 'en' in o) ? (o[lang] ?? o.en) : o
  return { lang, setLang, L }
}

export function loadLang() {
  try {
    const v = localStorage.getItem('st.lang')
    if (v === 'en' || v === 'ro') return v
  } catch { /* ignore */ }
  return (navigator.language || '').toLowerCase().startsWith('ro') ? 'ro' : 'en'
}

export function saveLang(l) {
  try { localStorage.setItem('st.lang', l) } catch { /* ignore */ }
}
