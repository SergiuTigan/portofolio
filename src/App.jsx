// Portfolio — converted 1:1 from Portfolio.dc.html (Claude Design), with hash routing added.
import { useEffect, useMemo, useRef, useState } from 'react'
import { T, CASES, EARLIER } from './data.js'
import Demo from './Demo.jsx'

const pill = active => active
  ? { background: 'color-mix(in srgb, var(--color-accent) 24%, transparent)', color: 'var(--color-accent-200)' }
  : { background: 'transparent', color: 'var(--color-neutral-500)' }

const chip = active => active
  ? { background: 'color-mix(in srgb, var(--color-accent) 20%, transparent)', borderColor: 'var(--color-accent-500)', color: 'var(--color-accent-200)' }
  : { background: 'transparent', borderColor: 'var(--color-neutral-800)', color: 'var(--color-neutral-400)' }

const pillBtn = { cursor: 'pointer', font: 'inherit', fontSize: 11, padding: '4px 11px', borderRadius: 999, border: 0 }

const DOMAIN = {
  devhub: 'iGaming', exadel: 'Compliance', mtd: 'Automotive', she: 'Banking & finance',
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
  const [homeLayout, setHomeLayout] = useState('index')
  const [caseLayout, setCaseLayout] = useState('narrative')
  const [tab, setTab] = useState(0)
  const [node, setNode] = useState(null)
  const [metricMode, setMetricMode] = useState('after')
  const [sent, setSent] = useState(false)
  const glowRef = useRef(null)

  const view = caseId ? 'case' : 'home'
  const L = o => (o && typeof o === 'object' && 'en' in o) ? o[lang] : o

  const openCase = id => {
    window.location.hash = '#/case/' + id
    setCaseId(id); setNode(null); setTab(0); setMetricMode('after')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const goHome = () => {
    if (window.location.hash) history.pushState('', document.title, window.location.pathname)
    setCaseId(null); setNode(null); setTab(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const step = d => {
    const i = CASES.findIndex(c => c.id === caseId)
    openCase(CASES[(i + d + CASES.length) % CASES.length].id)
  }
  const jump = id => {
    const go = () => {
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.offsetTop - 66, behavior: 'smooth' })
    }
    if (view !== 'home') { goHome(); setTimeout(go, 80) } else go()
  }

  useEffect(() => {
    const onMove = e => {
      const g = glowRef.current
      if (!g) return
      g.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`
      g.style.opacity = '1'
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const onKey = e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
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

  const t = useMemo(() => ({
    roleShort: L(T('Senior Frontend Engineer — Angular', 'Senior Frontend Engineer — Angular')),
    hire: L(T('Work with me', 'Hai să lucrăm')),
    available: L(T('Available for contract · remote · 4+ hrs US Eastern overlap', 'Disponibil pentru contract · remote · 4+ ore suprapunere US Eastern')),
    heroTitle: L(T('Angular, in places where a mistake is expensive.', 'Angular, în locuri unde o greșeală costă mult.')),
    heroBody: L(T("I'm Sergiu — a frontend engineer, eight years deep in Angular. Casino platforms, vehicle software updates, bank reporting, regulatory compliance: systems where the interface is the last thing between a person and a decision that matters.", 'Sunt Sergiu — inginer frontend, cu opt ani petrecuți în Angular. Platforme de casino, update-uri software pentru vehicule, raportare bancară, conformitate reglementară: sisteme în care interfața e ultimul lucru dintre un om și o decizie care contează.')),
    heroBody2: L(T("I work as an independent contractor through my own Romanian company — usually as the person who owns the frontend end-to-end. Alongside that I've designed, built and shipped three of my own products, and I still run them.", 'Lucrez ca contractor independent, prin propria companie din România — de obicei ca persoana care deține frontendul cap-coadă. În paralel am proiectat, construit și lansat trei produse proprii, pe care le operez și acum.')),
    ctaWork: L(T('See the case studies', 'Vezi studiile de caz')),
    ctaTalk: L(T('Start a conversation', 'Hai să vorbim')),
    cv: L(T('Download CV', 'Descarcă CV')),
    workKicker: L(T('Selected work', 'Lucrări selectate')),
    workTitle: L(T('Nine projects, taken apart', 'Nouă proiecte, desfăcute')),
    workBody: L(T('Every one of these has a full case study: the problem, the architecture decision, what I built, and an interactive demo that recreates the interface — anonymised, since most of this work sits under NDA.', 'Fiecare are un studiu de caz complet: problema, decizia de arhitectură, ce am construit și un demo interactiv care recreează interfața — anonimizat, pentru că majoritatea muncii e sub NDA.')),
    layoutLabel: L(T('Layout', 'Layout')),
    caseStudy: L(T('Case study', 'Studiu de caz')),
    noResults: L(T('Nothing matches that filter yet.', 'Nimic nu corespunde acestui filtru.')),
    earlierTitle: L(T('Earlier experience', 'Experiență anterioară')),
    aboutKicker: L(T('About', 'Despre')),
    aboutTitle: L(T('How I actually work', 'Cum lucrez, de fapt')),
    aboutBody: L(T("I'm comfortable owning a feature end-to-end or being the sole frontend engineer on a mission-critical app, working directly with stakeholders instead of through a layer of translation. On MTD I was the only frontend engineer for over a year; at SHE Group I ran the client meetings myself.", 'Sunt confortabil să dețin un feature cap-coadă sau să fiu singurul inginer frontend pe o aplicație critică, lucrând direct cu stakeholderii, nu printr-un strat de traducere. La MTD am fost singurul frontend mai bine de un an; la SHE Group am condus personal întâlnirile cu clientul.')),
    aboutBody2: L(T('Engaging through my own Romanian company means no payroll, benefits or visa overhead on your side. I work in Agile teams, in CET, with 4+ hours of daily overlap with US Eastern.', 'Colaborarea prin propria companie din România înseamnă zero costuri de payroll, beneficii sau viză de partea ta. Lucrez în echipe Agile, în CET, cu peste 4 ore de suprapunere zilnică cu US Eastern.')),
    skillsTitle: L(T('Technical skills', 'Competențe tehnice')),
    eduTitle: L(T('Education', 'Studii')),
    langTitle: L(T('Languages', 'Limbi')),
    contactKicker: L(T('Contact', 'Contact')),
    contactTitle: L(T("Tell me what you're building", 'Spune-mi ce construiești')),
    contactBody: L(T('Contract work, a frontend that needs an owner, or a second opinion on an architecture decision — all fine. I answer within a day.', 'Muncă pe contract, un frontend care are nevoie de un responsabil sau o a doua opinie pe o decizie de arhitectură — toate sunt în regulă. Răspund într-o zi.')),
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
    viewLabel: L(T('Reading view', 'Mod de citire')),
    prev: L(T('Previous', 'Anterior')), next: L(T('Next', 'Următor')),
  }), [lang])

  const navItems = [
    { label: L(T('Work', 'Proiecte')), id: 'work' },
    { label: L(T('Earlier', 'Anterior')), id: 'earlier' },
    { label: L(T('About', 'Despre')), id: 'about' },
    { label: L(T('Contact', 'Contact')), id: 'contact' },
  ]

  const stats = [
    { value: '8+', label: L(T('years specialised in Angular', 'ani specializat în Angular')) },
    { value: '10', label: L(T('casino & sportsbook brands on one codebase', 'branduri de casino și pariuri pe un singur cod')) },
    { value: '5', label: L(T('Volkswagen Group marques served', 'mărci Volkswagen Group deservite')) },
    { value: '3', label: L(T('own SaaS products shipped and operated', 'produse SaaS proprii lansate și operate')) },
    { value: '−80%', label: L(T('code-review turnaround, automated', 'timp de review, automatizat')) },
  ]

  const skills = [
    { group: L(T('Languages', 'Limbaje')), items: 'TypeScript · JavaScript (ES2023) · HTML5 · CSS3 · SCSS' },
    { group: L(T('Frameworks', 'Framework-uri')), items: 'Angular (8—18) · React · Next.js · Node.js · NestJS' },
    { group: L(T('Architecture', 'Arhitectură')), items: 'NgRx · RxJS · micro-frontends · Module Federation · Nx · white-label · design systems · Web Components · SSR' },
    { group: L(T('UI & styling', 'UI și stilizare')), items: 'Angular Material · Tailwind · Bootstrap · Ag-Grid · Highcharts · Figma · accessibility (WCAG) · Storybook · PWA · i18n' },
    { group: L(T('Testing', 'Testare')), items: 'Jasmine · Karma · Jest · Playwright · unit, integration & e2e' },
    { group: L(T('Tooling', 'Tooling')), items: 'Git · CI/CD · GitHub CLI · Azure DevOps · Agile/Scrum · performance' },
    { group: L(T('Backend & data', 'Backend și date')), items: 'REST · GraphQL · Firebase · Supabase · PostgreSQL' },
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

  const groups = [
    { label: L(T('Domain', 'Domeniu')), kind: 'domain', items: ['iGaming', 'Automotive', 'Banking & finance', 'Compliance', 'Food & hospitality', 'Health', 'Fitness'] },
    { label: L(T('Stack', 'Stack')), kind: 'tech', items: ['Angular', 'NgRx', 'React', 'Next.js', 'NestJS', 'Node', 'PostgreSQL'] },
  ]
  const hay = c => c.tags.concat(c.stack).join(' · ').toLowerCase()
  let shown = CASES
  if (filter) {
    const kind = filter.slice(0, filter.indexOf(':')), value = filter.slice(filter.indexOf(':') + 1)
    shown = kind === 'domain'
      ? CASES.filter(c => DOMAIN[c.id] === value)
      : CASES.filter(c => hay(c).includes(value.toLowerCase()))
  }

  const onSubmit = e => {
    e.preventDefault()
    const f = e.target
    const subject = encodeURIComponent('Portfolio contact — ' + (f.elements.name.value || 'someone'))
    const body = encodeURIComponent(
      `${f.elements.name.value} <${f.elements.email.value}>\n${f.elements.engagement.value}\n\n${f.elements.message.value}`
    )
    window.location.href = `mailto:sergiu@tigan.dev?subject=${subject}&body=${body}`
    setSent(true)
  }

  /* ── case view data ── */
  let caseView = null
  if (view === 'case') {
    const i = Math.max(0, CASES.findIndex(c => c.id === caseId))
    const c = CASES[i]
    const prev = CASES[(i - 1 + CASES.length) % CASES.length]
    const next = CASES[(i + 1) % CASES.length]
    const sections = [
      { key: 'context', kind: 'prose', kicker: L(T('01 · Role & context', '01 · Rol și context')), hint: L(T('What the product is and what I owned.', 'Ce e produsul și ce am deținut.')), title: L(T('The engagement', 'Colaborarea')), paras: c.context.map(L) },
      { key: 'challenge', kind: 'prose', kicker: L(T('02 · The challenge', '02 · Provocarea')), hint: L(T('The technical problem underneath the request.', 'Problema tehnică din spatele cerinței.')), title: L(T('What made it hard', 'Ce a făcut-o grea')), paras: c.challenge.map(L) },
      { key: 'arch', kind: 'arch', kicker: L(T('03 · Architecture', '03 · Arhitectură')), hint: L(T('Click any node to read the decision behind it.', 'Apasă orice nod ca să citești decizia din spate.')), title: L(T('How it was put together', 'Cum a fost pus cap la cap')), note: L(T('The layers below are the real shape of the system. Every node is a decision, not just a box.', 'Straturile de mai jos sunt forma reală a sistemului. Fiecare nod e o decizie, nu doar o casetă.')) },
      { key: 'built', kind: 'features', kicker: L(T('04 · What I built', '04 · Ce am construit')), hint: L(T('The features that shipped.', 'Funcționalitățile livrate.')), title: L(T('Shipped', 'Livrat')), items: c.built.map((b, n) => ({ n: String(n + 1).padStart(2, '0'), title: L(b.title), body: L(b.body) })) },
      { key: 'demo', kind: 'demo', kicker: L(T('05 · Interactive demo', '05 · Demo interactiv')), hint: L(T('Anonymised recreation — real interaction, invented data.', 'Recreare anonimizată — interacțiune reală, date inventate.')), title: L(T('Try the interface', 'Încearcă interfața')), note: L(c.demoNote) },
      { key: 'metrics', kind: 'metrics', kicker: L(T('06 · Impact', '06 · Impact')), hint: L(T('Toggle between before and after.', 'Comută între înainte și după.')), title: L(T('What changed', 'Ce s-a schimbat')) },
      { key: 'lessons', kind: 'lessons', kicker: L(T('07 · Lessons', '07 · Lecții')), hint: L(T('What I would tell the next team.', 'Ce i-aș spune următoarei echipe.')), title: L(T('What I took from it', 'Ce am luat de aici')), items: c.lessons.map(l => ({ title: L(l.title), body: L(l.body) })) },
    ]
    const nodeKey = node || '0-0'
    const [li, ni] = nodeKey.split('-').map(Number)
    const activeNode = (c.arch[li] && c.arch[li].nodes[ni]) || c.arch[0].nodes[0]
    caseView = { c, prev, next, sections, nodeKey, activeNode }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#161826', color: 'var(--color-text)', fontFamily: 'var(--font-body)', position: 'relative', overflowX: 'hidden' }}>
      <div ref={glowRef} style={{ position: 'fixed', top: 0, left: 0, width: 520, height: 520, margin: '-260px 0 0 -260px', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 13%, transparent), transparent 62%)', opacity: 0, transition: 'opacity 0.6s ease', willChange: 'transform' }}></div>

      <header style={{ position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(14px)', background: 'color-mix(in srgb, #161826 86%, transparent)', borderBottom: '1px solid var(--color-neutral-900)' }}>
        <div className="header-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
          <button onClick={goHome} style={{ cursor: 'pointer', font: 'inherit', background: 'transparent', border: 0, padding: 0, display: 'flex', alignItems: 'baseline', gap: 8, color: 'var(--color-text)' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '-0.02em', fontSize: 15 }}>Sergiu Țigan</span>
            <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{t.roleShort}</span>
          </button>
          <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            {navItems.map(n => (
              <button key={n.id} className="hnav-btn" onClick={() => jump(n.id)}>{n.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: 3, border: '1px solid var(--color-neutral-800)', borderRadius: 999 }}>
            {['en', 'ro'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ ...pillBtn, letterSpacing: '0.06em', padding: '4px 9px', ...pill(lang === l) }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <a className="btn btn-primary" href="#contact" onClick={e => { e.preventDefault(); jump('contact') }} style={{ fontSize: 12, padding: '7px 14px' }}>{t.hire}</a>
        </div>
      </header>

      {view === 'home' && (
        <main style={{ position: 'relative', zIndex: 1 }}>
          <section style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 28px 48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-300)', border: '1px solid var(--color-accent-800)', borderRadius: 999, padding: '5px 12px', marginBottom: 26 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--color-accent-400)' }}></span>{t.available}
            </div>
            <h1 style={{ fontSize: 'clamp(38px, 5.6vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: '15ch', margin: '0 0 22px' }}>{t.heroTitle}</h1>
            <p style={{ maxWidth: '62ch', fontSize: 17, lineHeight: 1.65, color: 'var(--color-neutral-300)', textWrap: 'pretty', margin: '0 0 14px' }}>{t.heroBody}</p>
            <p style={{ maxWidth: '62ch', fontSize: 15, lineHeight: 1.65, color: 'var(--color-neutral-500)', textWrap: 'pretty', margin: '0 0 30px' }}>{t.heroBody2}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={() => jump('work')}>{t.ctaWork}</button>
              <button className="btn btn-ghost" onClick={() => jump('contact')}>{t.ctaTalk}</button>
              <a className="btn btn-secondary" href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf" style={{ fontSize: 13 }}>{t.cv} ↓</a>
              <span style={{ display: 'flex', gap: 14, marginLeft: 8, fontSize: 12, color: 'var(--color-neutral-500)' }}>
                <a href="mailto:sergiu@tigan.dev">sergiu@tigan.dev</a>
                <a href="https://github.com/SergiuTigan" target="_blank" rel="noreferrer">github.com/SergiuTigan</a>
                <a href="https://linkedin.com/in/sergiu-tigan" target="_blank" rel="noreferrer">linkedin</a>
              </span>
            </div>
          </section>

          <section style={{ background: 'linear-gradient(180deg, var(--color-section), color-mix(in srgb, var(--color-section) 74%, #161826))', borderTop: '1px solid var(--color-section-ghost)', borderBottom: '1px solid var(--color-section-ghost)' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', padding: '30px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 22 }}>
              {stats.map(s => (
                <div key={s.label} style={{ display: 'grid', gap: 3 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 30, letterSpacing: '-0.02em', color: 'var(--color-neutral-100)' }}>{s.value}</span>
                  <span style={{ fontSize: 11, lineHeight: 1.4, color: 'color-mix(in srgb, #e9e9ed 68%, transparent)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="work" style={{ maxWidth: 1180, margin: '0 auto', padding: '58px 28px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 8 }}>
              <div>
                <h6 style={{ color: 'var(--color-accent-300)', margin: '0 0 8px' }}>{t.workKicker}</h6>
                <h2 style={{ margin: 0, letterSpacing: '-0.025em' }}>{t.workTitle}</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>{t.layoutLabel}</span>
                <div style={{ display: 'flex', gap: 3, padding: 3, border: '1px solid var(--color-neutral-800)', borderRadius: 999 }}>
                  {[['index', L(T('Index', 'Index'))], ['cards', L(T('Cards', 'Carduri'))]].map(([k, label]) => (
                    <button key={k} onClick={() => setHomeLayout(k)} style={{ ...pillBtn, ...pill(homeLayout === k) }}>{label}</button>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ maxWidth: '66ch', color: 'var(--color-neutral-500)', fontSize: 14, margin: '0 0 22px' }}>{t.workBody}</p>

            <div style={{ display: 'grid', gap: 9, marginBottom: 28, padding: '15px 17px', border: '1px solid var(--color-neutral-900)', borderRadius: 'var(--radius-md)', background: 'color-mix(in srgb, #e9e9ed 2%, transparent)' }}>
              {groups.map(g => (
                <div key={g.kind} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 14, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)', textAlign: 'right' }}>{g.label}</span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {g.items.map(item => {
                      const key = g.kind + ':' + item
                      return (
                        <button key={key} onClick={() => setFilter(filter === key ? null : key)} style={{ cursor: 'pointer', font: 'inherit', fontSize: 12, padding: '3px 10px', borderRadius: 999, borderWidth: 1, borderStyle: 'solid', ...chip(filter === key) }}>{item}</button>
                      )
                    })}
                  </span>
                </div>
              ))}
            </div>

            {homeLayout === 'index' && (
              <div style={{ borderTop: '1px solid var(--color-neutral-900)' }}>
                {shown.map(c => (
                  <button key={c.id} className="case-row" onClick={() => openCase(c.id)}>
                    <span style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--color-neutral-600)', fontVariantNumeric: 'tabular-nums' }}>{L(c.period)}</span>
                    <span style={{ display: 'grid', gap: 3 }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 19, letterSpacing: '-0.015em' }}>{c.client}</span>
                      <span style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>{L(c.sector)}</span>
                    </span>
                    <span style={{ display: 'grid', gap: 6 }}>
                      <span style={{ fontSize: 13, color: 'var(--color-neutral-300)', textWrap: 'pretty' }}>{L(c.oneLiner)}</span>
                      <span style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {c.tags.map(tag => (
                          <span key={tag} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'var(--color-neutral-900)', color: 'var(--color-neutral-400)' }}>{tag}</span>
                        ))}
                      </span>
                    </span>
                    <span className="row-arrow" style={{ fontSize: 12, color: 'var(--color-accent-400)', whiteSpace: 'nowrap' }}>{t.caseStudy} →</span>
                  </button>
                ))}
              </div>
            )}

            {homeLayout === 'cards' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
                {shown.map(c => (
                  <button key={c.id} className="card elev-sm case-card" onClick={() => openCase(c.id)}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                      <span className="card-kicker" style={{ color: 'var(--color-accent-300)' }}>{L(c.sector)}</span>
                      <span style={{ fontSize: 10, color: 'var(--color-neutral-600)', fontVariantNumeric: 'tabular-nums' }}>{L(c.period)}</span>
                    </span>
                    <span className="card-title" style={{ fontSize: 20 }}>{c.client}</span>
                    <span style={{ fontSize: 13, color: 'var(--color-neutral-400)', lineHeight: 1.55, textWrap: 'pretty' }}>{L(c.oneLiner)}</span>
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
                      {c.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'var(--color-neutral-900)', color: 'var(--color-neutral-400)' }}>{tag}</span>
                      ))}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--color-accent-400)', marginTop: 4 }}>{t.caseStudy} →</span>
                  </button>
                ))}
              </div>
            )}

            {shown.length === 0 && (
              <p style={{ padding: '30px 0', color: 'var(--color-neutral-500)', fontSize: 14 }}>{t.noResults}</p>
            )}
          </section>

          <section id="earlier" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 28px' }}>
            <h6 style={{ color: 'var(--color-neutral-500)', marginBottom: 14 }}>{t.earlierTitle}</h6>
            <div style={{ display: 'grid', gap: 0 }}>
              {EARLIER.map(e => (
                <div key={L(e.client)} style={{ display: 'grid', gridTemplateColumns: '118px 1fr 2fr', gap: 22, padding: '13px 8px', borderBottom: '1px solid var(--color-neutral-900)', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-neutral-600)', fontVariantNumeric: 'tabular-nums' }}>{L(e.period)}</span>
                  <span style={{ fontSize: 14 }}>{L(e.client)}</span>
                  <span style={{ fontSize: 13, color: 'var(--color-neutral-500)', textWrap: 'pretty' }}>{L(e.note)}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="about" className="about-grid" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 28px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 44 }}>
            <div>
              <h6 style={{ color: 'var(--color-accent-300)', marginBottom: 12 }}>{t.aboutKicker}</h6>
              <h2 style={{ letterSpacing: '-0.025em', marginBottom: 16 }}>{t.aboutTitle}</h2>
              <p style={{ maxWidth: '60ch', color: 'var(--color-neutral-300)', lineHeight: 1.7, textWrap: 'pretty' }}>{t.aboutBody}</p>
              <p style={{ maxWidth: '60ch', color: 'var(--color-neutral-500)', lineHeight: 1.7, textWrap: 'pretty' }}>{t.aboutBody2}</p>
            </div>
            <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
              <div>
                <h6 style={{ color: 'var(--color-neutral-500)', marginBottom: 10 }}>{t.skillsTitle}</h6>
                <div style={{ display: 'grid', gap: 9 }}>
                  {skills.map(s => (
                    <div key={s.group} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 12, alignItems: 'baseline' }}>
                      <span style={{ fontSize: 11, color: 'var(--color-accent-300)' }}>{s.group}</span>
                      <span style={{ fontSize: 12, color: 'var(--color-neutral-400)', lineHeight: 1.5 }}>{s.items}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <div>
                  <h6 style={{ color: 'var(--color-neutral-500)', marginBottom: 8 }}>{t.eduTitle}</h6>
                  <div style={{ fontSize: 13 }}>B.Sc. Informatics</div>
                  <div style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>UPT Timișoara · 2011—2014</div>
                </div>
                <div>
                  <h6 style={{ color: 'var(--color-neutral-500)', marginBottom: 8 }}>{t.langTitle}</h6>
                  {spoken.map(s => (
                    <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--color-neutral-400)' }}><span>{s.name}</span><span style={{ color: 'var(--color-neutral-600)' }}>{s.level}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="contact" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 28px 90px' }}>
            <div className="contact-grid" style={{ border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-lg)', background: 'radial-gradient(120% 120% at 0% 0%, #22243a, #161826)', padding: 34, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
              <div>
                <h6 style={{ color: 'var(--color-accent-300)', marginBottom: 12 }}>{t.contactKicker}</h6>
                <h2 style={{ letterSpacing: '-0.025em', marginBottom: 14 }}>{t.contactTitle}</h2>
                <p style={{ color: 'var(--color-neutral-400)', maxWidth: '42ch', lineHeight: 1.7, textWrap: 'pretty' }}>{t.contactBody}</p>
                <div style={{ display: 'grid', gap: 6, marginTop: 20, fontSize: 13 }}>
                  <a href="mailto:sergiu@tigan.dev">sergiu@tigan.dev</a>
                  <span style={{ color: 'var(--color-neutral-500)' }}>+40 740 014 666</span>
                  <span style={{ color: 'var(--color-neutral-500)' }}>{t.contactLoc}</span>
                  <a href="/Sergiu_Tigan_CV.pdf" download="Sergiu_Tigan_CV.pdf">{t.cv} (PDF)</a>
                </div>
              </div>
              {!sent ? (
                <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
                  <label className="field" style={{ display: 'grid', gap: 4, fontSize: 11, color: 'var(--color-neutral-400)' }}>{t.fName}
                    <input className="input" name="name" required placeholder={t.phName} />
                  </label>
                  <label className="field" style={{ display: 'grid', gap: 4, fontSize: 11, color: 'var(--color-neutral-400)' }}>{t.fEmail}
                    <input className="input" name="email" type="email" required placeholder="you@company.com" />
                  </label>
                  <label className="field" style={{ display: 'grid', gap: 4, fontSize: 11, color: 'var(--color-neutral-400)' }}>{t.fType}
                    <select className="input" name="engagement">
                      {engagementTypes.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className="field" style={{ display: 'grid', gap: 4, fontSize: 11, color: 'var(--color-neutral-400)' }}>{t.fMsg}
                    <textarea className="input" name="message" rows="4" placeholder={t.phMsg}></textarea>
                  </label>
                  <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>{t.fSend}</button>
                </form>
              ) : (
                <div style={{ display: 'grid', alignContent: 'center', gap: 10, border: '1px solid var(--color-accent-800)', borderRadius: 'var(--radius-md)', padding: 26, background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)', animation: 'fadeUp 0.3s ease' }}>
                  <span style={{ fontSize: 24, color: 'var(--color-accent-300)' }}>✓</span>
                  <h4 style={{ margin: 0 }}>{t.sentTitle}</h4>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-400)' }}>{t.sentBody}</p>
                  <button className="btn btn-ghost" onClick={() => setSent(false)} style={{ justifySelf: 'start', fontSize: 12 }}>{t.sentAgain}</button>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {view === 'case' && caseView && (
        <main style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.3s ease' }}>
          <section style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 28px 0' }}>
            <button className="back-btn" onClick={goHome}>← {t.backAll}</button>
            <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 30, alignItems: 'end', marginTop: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-300)', marginBottom: 12 }}>
                  <span>{L(caseView.c.sector)}</span>
                  <span style={{ width: 26, height: 1, background: 'var(--color-accent-700)' }}></span>
                  <span style={{ color: 'var(--color-neutral-500)' }}>{L(caseView.c.period)}</span>
                </div>
                <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 54px)', letterSpacing: '-0.03em', margin: '0 0 14px', maxWidth: '22ch' }}>{caseView.c.client}</h1>
                <p style={{ maxWidth: '64ch', fontSize: 17, lineHeight: 1.6, color: 'var(--color-neutral-300)', textWrap: 'pretty', margin: 0 }}>{L(caseView.c.oneLiner)}</p>
              </div>
              <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{t.viewLabel}</span>
                <div style={{ display: 'flex', gap: 3, padding: 3, border: '1px solid var(--color-neutral-800)', borderRadius: 999 }}>
                  {[['narrative', L(T('Narrative', 'Narativ'))], ['tabs', L(T('Tabs', 'Taburi'))]].map(([k, label]) => (
                    <button key={k} onClick={() => setCaseLayout(k)} style={{ ...pillBtn, ...pill(caseLayout === k) }}>{label}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, margin: '22px 0 6px' }}>
              {caseView.c.stack.map(s => (
                <span key={s} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, border: '1px solid var(--color-neutral-800)', color: 'var(--color-neutral-400)' }}>{s}</span>
              ))}
            </div>
            {caseView.c.live && (
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, margin: '14px 0 6px', padding: '12px 15px', border: '1px solid var(--color-accent-800)', borderRadius: 'var(--radius-md)', background: 'color-mix(in srgb, var(--color-accent) 7%, transparent)' }}>
                <a className="btn btn-primary" href={caseView.c.live.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, padding: '6px 13px' }}>
                  {L(T('Try it live', 'Încearcă live'))} ↗
                </a>
                <span style={{ fontSize: 12, color: 'var(--color-neutral-400)' }}>
                  {L(T('Demo account: ', 'Cont demo: '))}
                  <code style={{ color: 'var(--color-accent-300)', fontSize: 12 }}>{caseView.c.live.user}</code>
                  {' · '}
                  <code style={{ color: 'var(--color-accent-300)', fontSize: 12 }}>{caseView.c.live.pass}</code>
                </span>
                <span style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>
                  {L(T('Sandbox environment — data resets, nothing here is real.', 'Mediu sandbox — datele se resetează, nimic de aici nu e real.'))}
                </span>
              </div>
            )}
            <hr className="hr" />
          </section>

          {caseLayout === 'tabs' && (
            <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px 10px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, borderBottom: '1px solid var(--color-neutral-900)' }}>
                {caseView.sections.map((sec, n) => (
                  <button key={sec.key} onClick={() => setTab(n)} style={{ cursor: 'pointer', font: 'inherit', fontSize: 12, padding: '9px 13px', background: 'transparent', border: 0, borderBottom: `2px solid ${n === tab ? 'var(--color-accent-400)' : 'transparent'}`, color: n === tab ? 'var(--color-text)' : 'var(--color-neutral-500)' }}>{sec.title}</button>
                ))}
              </div>
            </section>
          )}

          <section style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 28px 20px', display: 'grid', gap: 52 }}>
            {(caseLayout === 'tabs' ? [caseView.sections[Math.min(tab, caseView.sections.length - 1)]] : caseView.sections).map(sec => (
              <div key={sec.key} className="case-section" style={{ display: 'grid', gridTemplateColumns: '172px 1fr', gap: 30, alignItems: 'start' }}>
                <div className="case-side" style={{ position: 'sticky', top: 74 }}>
                  <h6 style={{ color: 'var(--color-accent-300)', margin: '0 0 6px' }}>{sec.kicker}</h6>
                  <div style={{ fontSize: 11, color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>{sec.hint}</div>
                </div>
                <div>
                  {sec.kind === 'prose' && (
                    <div>
                      <h3 style={{ letterSpacing: '-0.02em', marginBottom: 12, maxWidth: '26ch' }}>{sec.title}</h3>
                      {sec.paras.map((p, i) => (
                        <p key={i} style={{ maxWidth: '70ch', lineHeight: 1.75, color: 'var(--color-neutral-300)', textWrap: 'pretty' }}>{p}</p>
                      ))}
                    </div>
                  )}

                  {sec.kind === 'features' && (
                    <div>
                      <h3 style={{ letterSpacing: '-0.02em', marginBottom: 16 }}>{sec.title}</h3>
                      <div style={{ display: 'grid', gap: 10 }}>
                        {sec.items.map(f => (
                          <div key={f.n} style={{ display: 'grid', gridTemplateColumns: '26px 1fr', gap: 12, padding: '13px 15px', border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-md)', background: 'color-mix(in srgb, #e9e9ed 3%, transparent)' }}>
                            <span style={{ fontSize: 11, color: 'var(--color-accent-400)', fontVariantNumeric: 'tabular-nums', paddingTop: 2 }}>{f.n}</span>
                            <span style={{ display: 'grid', gap: 4 }}>
                              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 15 }}>{f.title}</span>
                              <span style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-neutral-400)', textWrap: 'pretty' }}>{f.body}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sec.kind === 'arch' && (
                    <div>
                      <h3 style={{ letterSpacing: '-0.02em', marginBottom: 8 }}>{sec.title}</h3>
                      <p style={{ maxWidth: '68ch', fontSize: 13, color: 'var(--color-neutral-500)', marginBottom: 18 }}>{sec.note}</p>
                      <div style={{ display: 'grid', gap: 10 }}>
                        {caseView.c.arch.map((layer, li) => (
                          <div key={li} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 14, alignItems: 'center' }}>
                            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)', textAlign: 'right' }}>{L(layer.title)}</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                              {layer.nodes.map((n, ni) => {
                                const key = li + '-' + ni, on = key === caseView.nodeKey
                                return (
                                  <button key={key} onClick={() => setNode(key)} style={{ cursor: 'pointer', font: 'inherit', fontSize: 12, padding: '9px 13px', borderRadius: 'var(--radius-md)', border: `1px solid ${on ? 'var(--color-accent-500)' : 'var(--color-neutral-800)'}`, background: on ? 'color-mix(in srgb, var(--color-accent) 18%, transparent)' : 'color-mix(in srgb, #e9e9ed 4%, transparent)', color: on ? 'var(--color-accent-100)' : 'var(--color-neutral-300)', transition: 'all 0.2s ease' }}>{L(n.label)}</button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 16, padding: '15px 17px', borderLeft: '2px solid var(--color-accent-500)', background: 'color-mix(in srgb, var(--color-accent) 7%, transparent)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-300)', marginBottom: 5 }}>{L(caseView.activeNode.label)}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--color-neutral-300)', maxWidth: '70ch', textWrap: 'pretty' }}>{L(caseView.activeNode.note)}</div>
                      </div>
                    </div>
                  )}

                  {sec.kind === 'demo' && (
                    <div>
                      <h3 style={{ letterSpacing: '-0.02em', marginBottom: 8 }}>{sec.title}</h3>
                      <p style={{ maxWidth: '68ch', fontSize: 13, color: 'var(--color-neutral-500)', marginBottom: 18 }}>{sec.note}</p>
                      <Demo kind={caseView.c.demo} lang={lang} chrome={caseView.c.client.toLowerCase().split(' ')[0] + ' — demo'} />
                    </div>
                  )}

                  {sec.kind === 'metrics' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
                        <h3 style={{ letterSpacing: '-0.02em', margin: 0 }}>{sec.title}</h3>
                        <div style={{ display: 'flex', gap: 3, padding: 3, border: '1px solid var(--color-neutral-800)', borderRadius: 999 }}>
                          {[['before', L(T('Before', 'Înainte'))], ['after', L(T('After', 'După'))]].map(([k, label]) => (
                            <button key={k} onClick={() => setMetricMode(k)} style={{ ...pillBtn, ...pill(metricMode === k) }}>{label}</button>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12 }}>
                        {caseView.c.metrics.map(m => {
                          const after = metricMode === 'after'
                          return (
                            <div key={L(m.label)} style={{ border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-md)', padding: 15, background: after ? 'color-mix(in srgb, var(--color-accent) 8%, transparent)' : 'transparent', transition: 'background 0.3s ease' }}>
                              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)', marginBottom: 8 }}>{L(m.label)}</div>
                              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, letterSpacing: '-0.02em', color: after ? 'var(--color-accent-300)' : 'var(--color-neutral-500)' }}>{L(after ? m.after : m.before)}</div>
                              <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--color-neutral-500)', marginTop: 6, textWrap: 'pretty' }}>{L(m.note)}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {sec.kind === 'lessons' && (
                    <div>
                      <h3 style={{ letterSpacing: '-0.02em', marginBottom: 16 }}>{sec.title}</h3>
                      <div style={{ display: 'grid', gap: 12 }}>
                        {sec.items.map(l => (
                          <div key={l.title} style={{ borderLeft: '1px solid var(--color-neutral-800)', paddingLeft: 16 }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 15, marginBottom: 4 }}>{l.title}</div>
                            <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--color-neutral-400)', maxWidth: '68ch', textWrap: 'pretty' }}>{l.body}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 28px 90px' }}>
            <hr className="hr" />
            <div className="pn-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
              <button className="pn-card" onClick={() => step(-1)} style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>← {t.prev}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 17 }}>{caseView.prev.client}</span>
                <span style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>{L(caseView.prev.sector)}</span>
              </button>
              <button className="pn-card" onClick={() => step(1)} style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>{t.next} →</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 17 }}>{caseView.next.client}</span>
                <span style={{ fontSize: 12, color: 'var(--color-neutral-500)' }}>{L(caseView.next.sector)}</span>
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>
              <button className="btn btn-primary" onClick={() => jump('contact')}>{t.ctaTalk}</button>
            </div>
          </section>
        </main>
      )}

      <footer style={{ borderTop: '1px solid var(--color-neutral-900)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '22px 28px', display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11, color: 'var(--color-neutral-600)' }}>
          <span>© 2026 Sergiu-Marian Țigan · Next Level Tech SRL</span>
        </div>
      </footer>
    </div>
  )
}
