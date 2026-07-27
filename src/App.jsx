// Atelier redesign — warm light theme, per-project flavor accents, recruiter-compact.
import { useEffect, useMemo, useState } from 'react'
import { T, CASES, EARLIER } from './data.js'
import Demo from './Demo.jsx'
import Logo from './Logo.jsx'
import HeroDemo from './HeroDemo.jsx'

// Every case study re-themes the page — the site is itself white-labelled,
// which is the thing Sergiu actually builds for a living.
const FLAVOR = {
  platform: '#8f7bff', exadel: '#35c7ae', mtd: '#5b96ff', she: '#ffb454',
  be: '#4fce7f', pulse: '#ff6fa5', dobby: '#ff8c4d', luppy: '#7ed957', horae: '#ff5d7e',
}

const DOMAIN = {
  platform: 'Regulated B2C', exadel: 'Compliance', mtd: 'Automotive', she: 'Banking & finance',
  be: 'Banking & finance', pulse: 'Fitness', dobby: 'Food & hospitality',
  luppy: 'Health', horae: 'Food & hospitality',
}

function caseFromHash() {
  const m = window.location.hash.match(/^#\/case\/([\w-]+)/)
  return m && CASES.some(c => c.id === m[1]) ? m[1] : null
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [caseId, setCaseId] = useState(() => caseFromHash())
  const [filter, setFilter] = useState(null)
  const [node, setNode] = useState(null)
  const [formState, setFormState] = useState('idle') // idle | sending | sent | error
  const [photoOk, setPhotoOk] = useState(true)

  const view = caseId ? 'case' : 'home'
  const L = o => (o && typeof o === 'object' && 'en' in o) ? o[lang] : o

  const openCase = id => {
    window.location.hash = '#/case/' + id
    setCaseId(id); setNode(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const goHome = () => {
    if (window.location.hash) history.pushState('', document.title, window.location.pathname)
    setCaseId(null); setNode(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const step = d => {
    const i = CASES.findIndex(c => c.id === caseId)
    openCase(CASES[(i + d + CASES.length) % CASES.length].id)
  }
  const jump = id => {
    const go = () => {
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' })
    }
    if (view !== 'home') { goHome(); setTimeout(go, 80) } else go()
  }

  useEffect(() => {
    const onKey = e => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      if (e.key === 'Escape' && caseId) goHome()
      if (!caseId) return
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const onHash = () => setCaseId(caseFromHash())
    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', onHash)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('hashchange', onHash) }
  })

  // set the page flavor from the open case
  const flavor = caseId ? FLAVOR[caseId] : 'var(--accent)'
  useEffect(() => {
    document.documentElement.style.setProperty('--flavor', caseId ? FLAVOR[caseId] : '#ff5d6e')
  }, [caseId])

  const t = useMemo(() => ({
    roleShort: L(T('Senior Frontend Engineer', 'Senior Frontend Engineer')),
    hire: L(T('Work with me', 'Hai să lucrăm')),
    cv: L(T('Download CV', 'Descarcă CV')),
    available: L(T('Available for contract · remote', 'Disponibil pentru contract · remote')),
    heroBody: L(T('8+ years shipping production Angular apps across regulated, high-stakes industries — automotive, banking, compliance, and high-traffic consumer platforms. I architect multi-brand and micro-frontend platforms, and run three SaaS products of my own.', '8+ ani de aplicații Angular în producție, în industrii reglementate cu miză mare — automotive, banking, conformitate și platforme de consum cu trafic intens. Proiectez platforme multi-brand și micro-frontend și operez trei produse SaaS proprii.')),
    ctaWork: L(T('See the work', 'Vezi proiectele')),
    workKicker: L(T('Case studies', 'Studii de caz')),
    workTitle: L(T('Nine projects, each in its own colors', 'Nouă proiecte, fiecare în culorile lui')),
    workBody: L(T('Tap any card — every project has a working demo of its interface, anonymised where NDAs apply.', 'Deschide orice card — fiecare proiect are un demo funcțional al interfeței, anonimizat unde există NDA.')),
    caseStudy: L(T('Open', 'Deschide')),
    all: L(T('All', 'Toate')),
    noResults: L(T('Nothing matches that filter.', 'Nimic nu corespunde filtrului.')),
    earlierTitle: L(T('Earlier', 'Mai devreme')),
    aboutTitle: L(T('How I work', 'Cum lucrez')),
    aboutBody: L(T('End-to-end ownership, direct with stakeholders. Sole frontend engineer on a Volkswagen Group tool for a year; ran the client meetings at SHE Group. Contracting through my own Romanian company — no payroll or visa overhead, CET with 4+ hours of US Eastern overlap.', 'Ownership cap-coadă, direct cu stakeholderii. Singurul inginer frontend pe un tool Volkswagen Group timp de un an; am condus întâlnirile cu clientul la SHE Group. Contract prin propria firmă din România — fără costuri de payroll sau viză, CET cu 4+ ore suprapunere cu US Eastern.')),
    skillsTitle: L(T('Stack', 'Stack')),
    eduTitle: L(T('Education', 'Studii')),
    langTitle: L(T('Languages', 'Limbi')),
    contactKicker: L(T('Contact', 'Contact')),
    contactTitle: L(T("Tell me what you're building", 'Spune-mi ce construiești')),
    contactBody: L(T('Contract work, a frontend that needs an owner, or a second opinion on an architecture. I answer within a day.', 'Contract, un frontend care are nevoie de un responsabil sau a doua opinie pe o arhitectură. Răspund într-o zi.')),
    contactLoc: L(T('Cluj-Napoca, Romania · CET', 'Cluj-Napoca, România · CET')),
    fName: L(T('Name', 'Nume')), phName: L(T('Your name', 'Numele tău')),
    fEmail: L(T('Email', 'Email')),
    fType: L(T('Engagement', 'Tip de colaborare')),
    fMsg: L(T("What's the project?", 'Despre ce e proiectul?')),
    phMsg: L(T('A few lines are enough.', 'Câteva rânduri sunt de ajuns.')),
    fSend: L(T('Send message', 'Trimite mesajul')),
    fSending: L(T('Sending…', 'Se trimite…')),
    fError: L(T('Could not send — email me directly at sergiu@tigan.dev', 'Nu s-a trimis — scrie-mi direct la sergiu@tigan.dev')),
    sentTitle: L(T('Message sent', 'Mesaj trimis')),
    sentBody: L(T('Thanks — it landed in my inbox. I answer within a day.', 'Mulțumesc — a ajuns în inboxul meu. Răspund într-o zi.')),
    sentAgain: L(T('Send another', 'Trimite altul')),
    backAll: L(T('All work', 'Toate proiectele')),
    prev: L(T('Previous', 'Anterior')), next: L(T('Next', 'Următor')),
    tryLive: L(T('Try it live', 'Încearcă live')),
    demoAccount: L(T('Demo account', 'Cont demo')),
    sandboxNote: L(T('Sandbox — data resets, nothing is real.', 'Sandbox — datele se resetează, nimic nu e real.')),
    demoTitle: L(T('Working demo', 'Demo funcțional')),
    impactTitle: L(T('Impact', 'Impact')),
    storyTitle: L(T('The story', 'Povestea')),
    archTitle: L(T('Architecture — tap a node', 'Arhitectura — apasă un nod')),
    builtTitle: L(T('Shipped', 'Livrat')),
    lessonsTitle: L(T('Lessons', 'Lecții')),
  }), [lang])

  const stats = [
    { value: '8+', label: L(T('years of Angular', 'ani de Angular')), color: '#6c4ce8' },
    { value: '10', label: L(T('brands, one codebase', 'branduri, un singur cod')), color: '#d93a63' },
    { value: '5', label: L(T('VW Group marques', 'mărci VW Group')), color: '#2f6de0' },
    { value: '3', label: L(T('own products live', 'produse proprii live')), color: '#e8641b' },
    { value: '−80%', label: L(T('review time, automated', 'timp de review, automatizat')), color: '#2e7d4f' },
  ]

  const skills = [
    { group: 'Core', items: 'Angular 8—18 · TypeScript · RxJS · NgRx' },
    { group: 'Also', items: 'React · Next.js · NestJS · Node' },
    { group: L(T('Scale', 'Scară')), items: 'Micro-frontends · Nx · Module Federation · white-label · design systems' },
    { group: 'UI', items: 'Material · Tailwind · Ag-Grid · Highcharts · WCAG · Storybook' },
    { group: L(T('Quality', 'Calitate')), items: 'Jest · Jasmine · Playwright · CI/CD' },
    { group: 'Data', items: 'REST · GraphQL · PostgreSQL · Firebase · Supabase' },
  ]

  const spoken = [
    { name: L(T('Romanian', 'Română')), level: L(T('Native', 'Nativ')) },
    { name: L(T('English', 'Engleză')), level: L(T('Professional', 'Profesional')) },
    { name: L(T('German', 'Germană')), level: L(T('Limited', 'Limitat')) },
  ]

  const engagementTypes = [
    L(T('Contract — full frontend ownership', 'Contract — deținerea frontendului')),
    L(T('Contract — feature team member', 'Contract — membru în echipă')),
    L(T('Architecture review / second opinion', 'Review de arhitectură / a doua opinie')),
    L(T('Something else', 'Altceva')),
  ]

  const domains = [...new Set(Object.values(DOMAIN))]
  const shown = filter ? CASES.filter(c => DOMAIN[c.id] === filter) : CASES

  const onSubmit = async e => {
    e.preventDefault()
    const f = e.target
    setFormState('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.elements.name.value,
          email: f.elements.email.value,
          engagement: f.elements.engagement.value,
          message: f.elements.message.value,
          website: f.elements.website.value,
        }),
      })
      if (!r.ok) throw new Error('send_failed')
      setFormState('sent')
    } catch {
      setFormState('error')
    }
  }

  let cv = null
  if (view === 'case') {
    const i = Math.max(0, CASES.findIndex(c => c.id === caseId))
    const c = CASES[i]
    const nodeKey = node || '0-0'
    const [li, ni] = nodeKey.split('-').map(Number)
    cv = {
      c, i,
      prev: CASES[(i - 1 + CASES.length) % CASES.length],
      next: CASES[(i + 1) % CASES.length],
      nodeKey,
      activeNode: (c.arch[li] && c.arch[li].nodes[ni]) || c.arch[0].nodes[0],
    }
  }

  const sectionPad = { maxWidth: 1120, margin: '0 auto', padding: '0 24px' }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── header ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(12px)', background: 'color-mix(in srgb, var(--bg) 82%, transparent)', borderBottom: '1px solid var(--line)' }}>
        <div className="header-inner" style={{ ...sectionPad, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={goHome} style={{ cursor: 'pointer', font: 'inherit', background: 'transparent', border: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink)' }}>
            <span aria-hidden style={{ color: flavor, transition: 'color 0.3s ease', display: 'flex' }}><Logo size={24} /></span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' }}>Sergiu Țigan</span>
          </button>
          <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            {[['work', L(T('Work', 'Proiecte'))], ['about', L(T('About', 'Despre'))], ['contact', L(T('Contact', 'Contact'))]].map(([id, label]) => (
              <button key={id} className="hnav-btn" onClick={() => jump(id)}>{label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: 3, border: '1.5px solid var(--line)', borderRadius: 999 }}>
            {['en', 'ro'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ cursor: 'pointer', font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 999, border: 0, background: lang === l ? 'var(--ink)' : 'transparent', color: lang === l ? 'var(--paper)' : 'var(--muted)' }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <a className="btn btn-pop" href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf" style={{ fontSize: 13, padding: '8px 15px' }}>{t.cv}</a>
        </div>
      </header>

      {view === 'home' && (
        <main style={{ ...sectionPad, padding: '30px 24px 60px' }}>
          <div className="bento">

            {/* intro */}
            <div className="tile s7 r2 rise" style={{ padding: 'clamp(24px, 3vw, 40px)', display: 'grid', alignContent: 'center', gap: 18, background: 'radial-gradient(120% 130% at 0% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 55%), var(--card)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--leaf)' }}></span>
                <span className="eyebrow" style={{ color: 'var(--soft)' }}>{t.available}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 4.2vw, 54px)', fontWeight: 800, maxWidth: '18ch' }}>
                Senior Frontend Engineer<span style={{ color: 'var(--pop)' }}>.</span>
                <span style={{ display: 'block', fontSize: '0.48em', fontWeight: 600, color: 'var(--soft)', marginTop: 10, letterSpacing: '-0.01em' }}>Angular · TypeScript · {lang === 'en' ? 'multi-brand platforms' : 'platforme multi-brand'}</span>
              </h1>
              <p style={{ maxWidth: '52ch', fontSize: 16.5, lineHeight: 1.6, color: 'var(--soft)', textWrap: 'pretty' }}>{t.heroBody}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                <button className="btn btn-pop" onClick={() => jump('work')}>{t.ctaWork}</button>
                <a className="btn btn-line" href="mailto:sergiu@tigan.dev">{t.hire}</a>
                <span style={{ display: 'flex', gap: 16, marginLeft: 6, fontSize: 13 }}>
                  <a href="https://github.com/SergiuTigan" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="https://linkedin.com/in/sergiu-tigan" target="_blank" rel="noreferrer">LinkedIn</a>
                </span>
              </div>
            </div>

            {/* photo */}
            <div className="tile s5 r2 rise rise-1" style={{ padding: 0, minHeight: 300 }}>
              {photoOk ? (
                <img src="/me.jpg" alt="Sergiu Țigan" onError={() => setPhotoOk(false)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%', display: 'block', filter: 'saturate(0.94) contrast(1.02)' }} />
              ) : (
                <div style={{ height: '100%', display: 'grid', placeItems: 'center', background: 'radial-gradient(120% 120% at 80% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 60%), var(--card)', color: 'var(--accent)' }}>
                  <Logo size={150} detailed ink="var(--ink)" />
                </div>
              )}
              <span style={{ position: 'absolute', left: 14, bottom: 12, padding: '4px 11px', borderRadius: 999, background: 'rgba(14, 15, 19, 0.72)', backdropFilter: 'blur(6px)', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)' }}>Cluj-Napoca · CET</span>
            </div>

            {/* stats */}
            {stats.map((st, n) => (
              <div key={st.label} className={'tile stat-tile rise rise-' + Math.min(n + 1, 4)} style={{ gridColumn: 'span 2', padding: '16px 18px', background: `radial-gradient(130% 140% at 20% -20%, color-mix(in srgb, ${st.color} 14%, transparent), transparent 60%), var(--card)` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', color: st.color }}>{st.value}</div>
                <div style={{ fontSize: 12, color: 'var(--soft)', lineHeight: 1.35 }}>{st.label}</div>
              </div>
            ))}
            {/* CV tile */}
            <a className="tile tile-btn rise rise-4" href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf" style={{ gridColumn: 'span 2', '--flavor': 'var(--pop)', display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 6, textDecoration: 'none', background: 'var(--pop)', color: 'var(--pop-ink)', border: 0 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>CV ↓</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>PDF</span>
            </a>

            {/* live demo tile */}
            <div id="work" className="tile s5 r2 rise rise-2" style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
              <span className="tile-label">{L(T('Live — what I build', 'Live — ce construiesc'))}</span>
              <div style={{ justifySelf: 'center' }}>
                <HeroDemo lang={lang} onOpenCase={() => openCase('platform')} />
              </div>
            </div>

            {/* flagship case: horae */}
            <button className="tile tile-btn tile-glow s7 r2 rise rise-2" onClick={() => openCase('horae')} style={{ '--flavor': FLAVOR.horae, padding: 'clamp(22px, 2.6vw, 34px)' }}>
              <span className="eyebrow">{L(CASES.find(c => c.id === 'horae').sector)}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.02em' }}>Horae</span>
              <span style={{ fontSize: 14.5, color: 'var(--soft)', lineHeight: 1.55, maxWidth: '52ch', textWrap: 'pretty' }}>{L(CASES.find(c => c.id === 'horae').oneLiner)}</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 4 }}>
                {CASES.find(c => c.id === 'horae').tags.slice(0, 5).map(tg => <span key={tg} className="tagette">{tg}</span>)}
              </span>
              <span style={{ display: 'flex', gap: 18, marginTop: 10, alignItems: 'baseline' }}>
                <span><b style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--flavor)' }}>4</b> <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{L(T('clients, one API', 'clienți, un API'))}</span></span>
                <span><b style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--flavor)' }}>~22</b> <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{L(T('org-scoped models', 'modele multi-tenant'))}</span></span>
                <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: 'var(--flavor)' }}>{t.caseStudy} →</span>
              </span>
            </button>

            {/* remaining case tiles */}
            {CASES.filter(c => c.id !== 'horae').map((c, n) => (
              <button key={c.id} className="tile tile-btn tile-glow s3" onClick={() => openCase(c.id)} style={{ '--flavor': FLAVOR[c.id] }}>
                <span className="eyebrow">{L(c.sector).split('·')[0].trim()}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.015em' }}>{c.client}</span>
                <span style={{ fontSize: 12.5, color: 'var(--soft)', lineHeight: 1.5, textWrap: 'pretty', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{L(c.oneLiner)}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--flavor)', marginTop: 2 }}>{t.caseStudy} →</span>
              </button>
            ))}

            {/* about */}
            <div id="about" className="tile s6" style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
              <span className="tile-label">{t.aboutTitle}</span>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--soft)', textWrap: 'pretty' }}>{t.aboutBody}</p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 4 }}>
                <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>B.Sc. Informatics · UPT Timișoara</span>
                {spoken.map(sp => <span key={sp.name} style={{ fontSize: 12.5, color: 'var(--muted)' }}>{sp.name} — {sp.level}</span>)}
              </div>
            </div>

            {/* skills */}
            <div className="tile s6" style={{ display: 'grid', gap: 9, alignContent: 'start' }}>
              <span className="tile-label">{t.skillsTitle}</span>
              {skills.map(sk => (
                <div key={sk.group} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 12, alignItems: 'baseline' }}>
                  <span className="mono" style={{ fontSize: 10.5, color: 'var(--accent)' }}>{sk.group}</span>
                  <span style={{ fontSize: 13, color: 'var(--soft)', lineHeight: 1.5 }}>{sk.items}</span>
                </div>
              ))}
            </div>

            {/* contact */}
            <div id="contact" className="tile s12 contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 30, padding: 'clamp(22px, 2.6vw, 34px)', background: 'radial-gradient(100% 160% at 100% 0%, color-mix(in srgb, var(--pop) 10%, transparent), transparent 55%), var(--card)' }}>
              <div style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
                <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>{t.contactTitle}</h2>
                <p style={{ color: 'var(--soft)', fontSize: 14.5, maxWidth: '46ch', textWrap: 'pretty' }}>{t.contactBody}</p>
                <div style={{ display: 'grid', gap: 5, marginTop: 8, fontSize: 13.5 }}>
                  <a href="mailto:sergiu@tigan.dev">sergiu@tigan.dev</a>
                  <span style={{ color: 'var(--muted)' }}>+40 740 014 666</span>
                  <span style={{ color: 'var(--muted)' }}>{t.contactLoc}</span>
                </div>
              </div>
              {formState !== 'sent' ? (
                <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <label style={{ display: 'grid', gap: 4, fontSize: 12, color: 'var(--soft)' }}>{t.fName}
                      <input className="input" name="name" required maxLength={120} placeholder={t.phName} />
                    </label>
                    <label style={{ display: 'grid', gap: 4, fontSize: 12, color: 'var(--soft)' }}>{t.fEmail}
                      <input className="input" name="email" type="email" required maxLength={200} placeholder="you@company.com" />
                    </label>
                  </div>
                  <label style={{ display: 'grid', gap: 4, fontSize: 12, color: 'var(--soft)' }}>{t.fType}
                    <select className="input" name="engagement">
                      {engagementTypes.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <label style={{ display: 'grid', gap: 4, fontSize: 12, color: 'var(--soft)' }}>{t.fMsg}
                    <textarea className="input" name="message" rows="3" required maxLength={4000} placeholder={t.phMsg}></textarea>
                  </label>
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button className="btn btn-pop" type="submit" disabled={formState === 'sending'}>
                      {formState === 'sending' ? t.fSending : t.fSend}
                    </button>
                    {formState === 'error' && (
                      <span style={{ fontSize: 12.5, color: 'var(--accent)' }}>{t.fError}</span>
                    )}
                  </div>
                </form>
              ) : (
                <div style={{ display: 'grid', alignContent: 'center', justifyItems: 'start', gap: 8, borderRadius: 'var(--r-sm)', padding: 24, background: 'color-mix(in srgb, var(--pop) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--pop) 30%, transparent)' }}>
                  <span style={{ fontSize: 22, color: 'var(--pop)' }}>✓</span>
                  <h4>{t.sentTitle}</h4>
                  <p style={{ fontSize: 13.5, color: 'var(--soft)' }}>{t.sentBody}</p>
                  <button className="btn btn-ghost" onClick={() => setFormState('idle')} style={{ fontSize: 12.5 }}>{t.sentAgain}</button>
                </div>
              )}
            </div>

          </div>
        </main>
      )}

      {view === 'case' && cv && (
        <main className="rise" style={{ '--flavor': FLAVOR[cv.c.id] }}>
          {/* ── case header ── */}
          <section style={{ background: `color-mix(in srgb, ${FLAVOR[cv.c.id]} 8%, var(--paper))`, borderBottom: '1.5px solid var(--line)' }}>
            <div style={{ ...sectionPad, padding: '28px 24px 30px' }}>
              <button className="back-btn" onClick={goHome}>← {t.backAll}</button>
              <div className="case-head" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'end', marginTop: 18 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span className="eyebrow">{L(cv.c.sector)}</span>
                    <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{L(cv.c.period)}</span>
                  </div>
                  <h1 style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800, marginBottom: 12 }}>{cv.c.client}</h1>
                  <p style={{ maxWidth: '56ch', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-soft)', textWrap: 'pretty' }}>{L(cv.c.oneLiner)}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 14 }}>
                    {cv.c.stack.slice(0, 8).map(s => <span key={s} className="tagette" style={{ background: 'var(--card)' }}>{s}</span>)}
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {cv.c.metrics.slice(0, 3).map(m => (
                    <div key={L(m.label)} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', background: 'var(--card)', border: '1.5px solid var(--line)', borderRadius: 'var(--r-md)', padding: '10px 14px' }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{L(m.label)}</span>
                      <span style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'line-through' }}>{L(m.before)}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--flavor)' }}>{L(m.after)}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {cv.c.live && (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginTop: 18, padding: '12px 16px', background: 'var(--card)', border: `1.5px solid ${FLAVOR[cv.c.id]}`, borderRadius: 'var(--r-md)' }}>
                  <a className="btn btn-solid" href={cv.c.live.url} target="_blank" rel="noreferrer" style={{ fontSize: 13, padding: '7px 14px' }}>{t.tryLive} ↗</a>
                  <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                    {t.demoAccount}: <code className="mono" style={{ color: 'var(--flavor)', fontSize: 12 }}>{cv.c.live.user}</code> · <code className="mono" style={{ color: 'var(--flavor)', fontSize: 12 }}>{cv.c.live.pass}</code>
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{t.sandboxNote}</span>
                </div>
              )}
            </div>
          </section>

          {/* ── demo first ── */}
          <section style={{ ...sectionPad, padding: '34px 24px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: 22 }}>{t.demoTitle}</h3>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{L(cv.c.demoNote)}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <Demo kind={cv.c.demo} lang={lang} chrome={cv.c.client.toLowerCase().split(' ')[0] + ' — demo'} />
            </div>
          </section>

          {/* ── impact grid ── */}
          <section style={{ ...sectionPad, padding: '30px 24px 6px' }}>
            <h3 style={{ fontSize: 22, marginBottom: 14 }}>{t.impactTitle}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {cv.c.metrics.map(m => (
                <div key={L(m.label)} style={{ background: 'var(--card)', border: '1.5px solid var(--line)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
                  <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 8 }}>{L(m.label)}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap' }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{L(m.before)}</span>
                    <span aria-hidden style={{ color: 'var(--flavor)' }}>→</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--flavor)' }}>{L(m.after)}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.45, textWrap: 'pretty' }}>{L(m.note)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── details accordions ── */}
          <section style={{ ...sectionPad, padding: '30px 24px 10px' }}>
            <details className="acc" open>
              <summary>{t.builtTitle}</summary>
              <div className="acc-body" style={{ display: 'grid', gap: 8 }}>
                {cv.c.built.map((b, n) => (
                  <div key={n} style={{ display: 'grid', gridTemplateColumns: '10px 1fr', gap: 12, alignItems: 'start' }}>
                    <span aria-hidden style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--flavor)', marginTop: 7, transform: 'rotate(45deg)' }}></span>
                    <span style={{ fontSize: 14, lineHeight: 1.55 }}>
                      <b style={{ fontWeight: 600 }}>{L(b.title)}.</b>{' '}
                      <span style={{ color: 'var(--ink-soft)' }}>{L(b.body)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </details>

            <details className="acc" open>
              <summary>{t.storyTitle}</summary>
              <div className="acc-body">
                {[...cv.c.context, ...cv.c.challenge].map((p, i) => (
                  <p key={i} style={{ maxWidth: '68ch', fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', textWrap: 'pretty', marginBottom: 10 }}>{L(p)}</p>
                ))}
              </div>
            </details>

            <details className="acc" open>
              <summary>{t.archTitle}</summary>
              <div className="acc-body">
                <div style={{ display: 'grid', gap: 10 }}>
                  {cv.c.arch.map((layer, li) => (
                    <div key={li} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 12, alignItems: 'center' }}>
                      <span className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', textAlign: 'right' }}>{L(layer.title)}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                        {layer.nodes.map((n, ni) => {
                          const key = li + '-' + ni, on = key === cv.nodeKey
                          return (
                            <button key={key} onClick={() => setNode(key)} className={'chip' + (on ? ' on' : '')}>{L(n.label)}</button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, padding: '13px 16px', borderLeft: '3px solid var(--flavor)', background: 'color-mix(in srgb, var(--flavor) 6%, var(--paper))', borderRadius: '0 var(--r-md) var(--r-md) 0' }}>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>{L(cv.activeNode.label)}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '70ch', textWrap: 'pretty' }}>{L(cv.activeNode.note)}</div>
                </div>
              </div>
            </details>

            <details className="acc" open>
              <summary>{t.lessonsTitle}</summary>
              <div className="acc-body" style={{ display: 'grid', gap: 12 }}>
                {cv.c.lessons.map(l => (
                  <div key={L(l.title)} style={{ borderLeft: '3px solid var(--line-strong)', paddingLeft: 14 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>{L(l.title)}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '66ch', textWrap: 'pretty' }}>{L(l.body)}</div>
                  </div>
                ))}
              </div>
            </details>
          </section>

          {/* ── prev / next ── */}
          <section style={{ ...sectionPad, padding: '28px 24px 70px' }}>
            <div className="pn-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button className="pn-card" onClick={() => step(-1)} style={{ textAlign: 'left', '--flavor': FLAVOR[cv.prev.id] }}>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>← {t.prev}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: FLAVOR[cv.prev.id] }}>{cv.prev.client}</span>
              </button>
              <button className="pn-card" onClick={() => step(1)} style={{ textAlign: 'right', '--flavor': FLAVOR[cv.next.id] }}>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{t.next} →</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: FLAVOR[cv.next.id] }}>{cv.next.client}</span>
              </button>
            </div>
          </section>
        </main>
      )}

      <footer style={{ borderTop: '1.5px solid var(--line)' }}>
        <div style={{ ...sectionPad, padding: '20px 24px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', fontSize: 12, color: 'var(--muted)' }}>
          <span aria-hidden style={{ color: flavor, display: 'flex' }}><Logo size={18} ink="var(--muted)" /></span>
          <span>© 2026 Sergiu-Marian Țigan · Next Level Tech SRL</span>
        </div>
      </footer>
    </div>
  )
}
