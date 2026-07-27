// Atelier redesign — warm light theme, per-project flavor accents, recruiter-compact.
import { useEffect, useMemo, useState } from 'react'
import { T, CASES, EARLIER } from './data.js'
import Demo from './Demo.jsx'
import Logo from './Logo.jsx'

// Every case study re-themes the page — the site is itself white-labelled,
// which is the thing Sergiu actually builds for a living.
const FLAVOR = {
  platform: '#6c4ce8', exadel: '#0e8a7b', mtd: '#2f6de0', she: '#d98a16',
  be: '#2e7d4f', pulse: '#d6367e', dobby: '#e8641b', luppy: '#4ca84c', horae: '#d93a63',
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
  const [sent, setSent] = useState(false)

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
    document.documentElement.style.setProperty('--flavor', caseId ? FLAVOR[caseId] : '#d6303f')
  }, [caseId])

  const t = useMemo(() => ({
    roleShort: L(T('Senior Frontend Engineer', 'Senior Frontend Engineer')),
    hire: L(T('Work with me', 'Hai să lucrăm')),
    cv: L(T('Download CV', 'Descarcă CV')),
    available: L(T('Available for contract · remote', 'Disponibil pentru contract · remote')),
    heroBody: L(T('Eight years of frontend for regulated consumer platforms, car makers, banks and compliance teams — plus three products of my own, designed, shipped and still running.', 'Opt ani de frontend pentru platforme de consum reglementate, producători auto, bănci și echipe de conformitate — plus trei produse proprii, proiectate, lansate și încă în funcțiune.')),
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
    fSend: L(T('Send', 'Trimite')),
    sentTitle: L(T('Message sent', 'Mesaj trimis')),
    sentBody: L(T('Thanks — your message opened in your email client. If it did not, write to sergiu@tigan.dev directly.', 'Mulțumesc — mesajul s-a deschis în clientul tău de email. Dacă nu, scrie direct la sergiu@tigan.dev.')),
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

  const onSubmit = e => {
    e.preventDefault()
    const f = e.target
    const subject = encodeURIComponent('Portfolio contact — ' + (f.elements.name.value || 'someone'))
    const body = encodeURIComponent(`${f.elements.name.value} <${f.elements.email.value}>\n${f.elements.engagement.value}\n\n${f.elements.message.value}`)
    window.location.href = `mailto:sergiu@tigan.dev?subject=${subject}&body=${body}`
    setSent(true)
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
      <header style={{ position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(12px)', background: 'color-mix(in srgb, var(--paper) 88%, transparent)', borderBottom: '1.5px solid var(--line)' }}>
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
          <a className="btn btn-solid" href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf" style={{ fontSize: 13, padding: '8px 15px', '--flavor': 'var(--accent)' }}>{t.cv}</a>
        </div>
      </header>

      {view === 'home' && (
        <main>
          {/* ── hero ── */}
          <section className="hero-grid" style={{ ...sectionPad, padding: '64px 24px 36px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 30, alignItems: 'center' }}>
            <div>
            <div className="rise" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--leaf)' }}></span>
              <span className="eyebrow" style={{ color: 'var(--ink-soft)' }}>{t.available}</span>
            </div>
            <h1 className="rise rise-1" style={{ fontSize: 'clamp(40px, 6.4vw, 76px)', fontWeight: 800, maxWidth: '16ch', marginBottom: 18 }}>
              {lang === 'en'
                ? <>Angular, where a mistake is <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>expensive</em>.</>
                : <>Angular, unde o greșeală <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>costă mult</em>.</>}
            </h1>
            <p className="rise rise-2" style={{ maxWidth: '52ch', fontSize: 17.5, lineHeight: 1.55, color: 'var(--ink-soft)', textWrap: 'pretty', marginBottom: 26 }}>{t.heroBody}</p>
            <div className="rise rise-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <button className="btn btn-solid" onClick={() => jump('work')} style={{ '--flavor': 'var(--accent)' }}>{t.ctaWork}</button>
              <button className="btn btn-line" onClick={() => jump('contact')}>{t.hire}</button>
              <span style={{ display: 'flex', gap: 16, marginLeft: 6, fontSize: 13 }}>
                <a href="mailto:sergiu@tigan.dev">sergiu@tigan.dev</a>
                <a href="https://github.com/SergiuTigan" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/sergiu-tigan" target="_blank" rel="noreferrer">LinkedIn</a>
              </span>
            </div>
            </div>
            <div className="rise rise-2 hero-logo" style={{ color: 'var(--accent)', paddingRight: 18 }}>
              <Logo size={190} detailed />
            </div>
          </section>

          {/* ── stats strip ── */}
          <section style={{ ...sectionPad, paddingBottom: 56 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', border: '1.5px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--card)' }}>
              {stats.map(s => (
                <div key={s.label} style={{ padding: '18px 20px', borderLeft: '1.5px solid var(--line)', marginLeft: -1.5 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.35 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── work ── */}
          <section id="work" style={{ background: 'var(--paper-deep)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)' }}>
            <div style={{ ...sectionPad, padding: '52px 24px 60px' }}>
              <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--accent)' }}>{t.workKicker}</div>
              <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 38px)', maxWidth: '24ch', marginBottom: 6 }}>{t.workTitle}</h2>
              <p style={{ maxWidth: '58ch', color: 'var(--ink-soft)', fontSize: 15, marginBottom: 22 }}>{t.workBody}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
                <button className={'chip' + (filter === null ? ' on' : '')} onClick={() => setFilter(null)} style={{ '--flavor': 'var(--ink)' }}>{t.all}</button>
                {domains.map(d => (
                  <button key={d} className={'chip' + (filter === d ? ' on' : '')} onClick={() => setFilter(filter === d ? null : d)} style={{ '--flavor': 'var(--ink)' }}>{d}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {shown.map(c => (
                  <button key={c.id} className="case-card" onClick={() => openCase(c.id)} style={{ '--flavor': FLAVOR[c.id] }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                      <span className="eyebrow">{L(c.sector).split('·')[0].trim()}</span>
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{L(c.period)}</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>{c.client}</span>
                    <span style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, textWrap: 'pretty' }}>{L(c.oneLiner)}</span>
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
                      {c.tags.slice(0, 4).map(tag => <span key={tag} className="tagette">{tag}</span>)}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--flavor)', marginTop: 4 }}>{t.caseStudy} →</span>
                  </button>
                ))}
              </div>
              {shown.length === 0 && <p style={{ padding: '26px 0', color: 'var(--muted)' }}>{t.noResults}</p>}
            </div>
          </section>

          {/* ── earlier ── */}
          <section style={{ ...sectionPad, padding: '48px 24px' }}>
            <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--muted)' }}>{t.earlierTitle}</div>
            <div>
              {EARLIER.map(e => (
                <div key={L(e.client)} className="earlier-row" style={{ display: 'grid', gridTemplateColumns: '150px 200px 1fr', gap: 18, padding: '11px 0', borderBottom: '1.5px solid var(--line)', alignItems: 'baseline' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{L(e.period)}</span>
                  <span style={{ fontWeight: 600, fontSize: 14.5 }}>{L(e.client)}</span>
                  <span style={{ fontSize: 13.5, color: 'var(--ink-soft)', textWrap: 'pretty' }}>{L(e.note)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── about ── */}
          <section id="about" className="about-grid" style={{ ...sectionPad, padding: '24px 24px 56px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: 14 }}>{t.aboutTitle}</h2>
              <p style={{ maxWidth: '58ch', color: 'var(--ink-soft)', lineHeight: 1.65, textWrap: 'pretty' }}>{t.aboutBody}</p>
              <div style={{ display: 'flex', gap: 26, marginTop: 22, flexWrap: 'wrap' }}>
                <div>
                  <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 6 }}>{t.eduTitle}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>B.Sc. Informatics</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>UPT Timișoara · 2011—2014</div>
                </div>
                <div>
                  <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 6 }}>{t.langTitle}</div>
                  {spoken.map(s => (
                    <div key={s.name} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-soft)' }}>
                      <span style={{ fontWeight: 600 }}>{s.name}</span><span style={{ color: 'var(--muted)' }}>{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 12 }}>{t.skillsTitle}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {skills.map(s => (
                  <div key={s.group} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 12, alignItems: 'baseline' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{s.group}</span>
                    <span style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{s.items}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── contact ── */}
          <section id="contact" style={{ ...sectionPad, paddingBottom: 80 }}>
            <div className="contact-grid" style={{ borderRadius: 'var(--r-lg)', background: 'var(--ink)', color: '#f4efe6', padding: 'clamp(26px, 4vw, 44px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 38 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--sun)', marginBottom: 10 }}>{t.contactKicker}</div>
                <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 36px)', marginBottom: 12, color: '#fffdf9' }}>{t.contactTitle}</h2>
                <p style={{ color: '#c9c2b2', maxWidth: '40ch', lineHeight: 1.65, textWrap: 'pretty' }}>{t.contactBody}</p>
                <div style={{ display: 'grid', gap: 6, marginTop: 20, fontSize: 14 }}>
                  <a href="mailto:sergiu@tigan.dev" style={{ color: 'var(--sun)' }}>sergiu@tigan.dev</a>
                  <span style={{ color: '#9a937f' }}>+40 740 014 666</span>
                  <span style={{ color: '#9a937f' }}>{t.contactLoc}</span>
                  <a href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf" style={{ color: 'var(--sun)' }}>{t.cv} (PDF)</a>
                </div>
              </div>
              {!sent ? (
                <form onSubmit={onSubmit} style={{ display: 'grid', gap: 11, alignContent: 'start' }}>
                  {[['name', t.fName, t.phName, 'text'], ['email', t.fEmail, 'you@company.com', 'email']].map(([name, label, ph, type]) => (
                    <label key={name} style={{ display: 'grid', gap: 4, fontSize: 12, color: '#c9c2b2' }}>{label}
                      <input className="input" name={name} type={type} required placeholder={ph} style={{ background: '#2f2b24', borderColor: '#453f33', color: '#f4efe6' }} />
                    </label>
                  ))}
                  <label style={{ display: 'grid', gap: 4, fontSize: 12, color: '#c9c2b2' }}>{t.fType}
                    <select className="input" name="engagement" style={{ background: '#2f2b24', borderColor: '#453f33', color: '#f4efe6' }}>
                      {engagementTypes.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <label style={{ display: 'grid', gap: 4, fontSize: 12, color: '#c9c2b2' }}>{t.fMsg}
                    <textarea className="input" name="message" rows="3" placeholder={t.phMsg} style={{ background: '#2f2b24', borderColor: '#453f33', color: '#f4efe6' }}></textarea>
                  </label>
                  <button className="btn btn-solid" type="submit" style={{ justifySelf: 'start', '--flavor': 'var(--sun)', color: '#221f1a' }}>{t.fSend}</button>
                </form>
              ) : (
                <div style={{ display: 'grid', alignContent: 'center', gap: 8, borderRadius: 'var(--r-md)', padding: 26, background: '#2f2b24', animation: 'rise 0.3s ease' }}>
                  <span style={{ fontSize: 22, color: 'var(--sun)' }}>✓</span>
                  <h4 style={{ color: '#fffdf9' }}>{t.sentTitle}</h4>
                  <p style={{ fontSize: 13, color: '#c9c2b2' }}>{t.sentBody}</p>
                  <button className="btn btn-ghost" onClick={() => setSent(false)} style={{ justifySelf: 'start', fontSize: 12, '--flavor': 'var(--sun)' }}>{t.sentAgain}</button>
                </div>
              )}
            </div>
          </section>
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

            <details className="acc">
              <summary>{t.storyTitle}</summary>
              <div className="acc-body">
                {[...cv.c.context, ...cv.c.challenge].map((p, i) => (
                  <p key={i} style={{ maxWidth: '68ch', fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink-soft)', textWrap: 'pretty', marginBottom: 10 }}>{L(p)}</p>
                ))}
              </div>
            </details>

            <details className="acc">
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

            <details className="acc">
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
