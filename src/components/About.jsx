import { EARLIER, T } from '../data.js'
import { useLang } from '../lib/i18n.jsx'
import Reveal from './Reveal.jsx'

const PRINCIPLES = [
  { t: T('No “just one exception”', 'Fără „doar o excepție”'), p: T('One exception per brand and the system starts dying. Say no in a way that still solves the problem.', 'O excepție pe brand și sistemul începe să moară. Spune nu într-un fel care totuși rezolvă problema.') },
  { t: T('Rules live in the data', 'Regulile stau în date'), p: T('Isolation and permissions belong to the system, not to developer habit. What a role can’t see, it never receives.', 'Izolarea și permisiunile țin de sistem, nu de obiceiul dezvoltatorului. Ce nu are voie să vadă un rol, nici nu primește.') },
  { t: T('Override before automation', 'Suprascrierea înaintea automatizării'), p: T('Generated output earns trust only when a human can overrule it in one click.', 'Rezultatul generat câștigă încredere doar când omul îl poate suprascrie într-un click.') },
  { t: T('Automate the boring half', 'Automatizează jumătatea plictisitoare'), p: T('Let a tool catch the anti-patterns first, so people review decisions instead of formatting.', 'Lasă un tool să prindă primul anti-pattern-urile, ca oamenii să revizuiască decizii, nu formatare.') },
]

const SKILLS = [
  ['Core', 'Angular 8—18 · TypeScript · RxJS · NgRx'],
  ['Also', 'React · Next.js · NestJS · Node · Swift / SwiftUI · Kotlin / Compose'],
  [T('Scale', 'Scară'), 'Micro-frontends · Nx · Module Federation · white-label · design systems · multi-tenant'],
  ['UI', 'Material · Tailwind · Ag-Grid · Highcharts · WCAG · Storybook'],
  [T('Quality', 'Calitate'), 'Jest · Jasmine · Playwright · CI/CD · Claude Code review pipelines'],
  ['Data', 'REST · GraphQL · PostgreSQL · Prisma · Firebase · Supabase'],
]

export default function About() {
  const { L } = useLang()
  return (
    <section id="about" className="section" aria-labelledby="about-h" style={{ background: 'var(--bg-2)', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <Reveal className="section-head">
          <span className="index">02</span>
          <h2 id="about-h">{L(T('How I work', 'Cum lucrez'))}</h2>
          <p className="sub lead">{L(T(
            'I own the work end to end and talk to stakeholders directly: sole frontend engineer on a Volkswagen Group tool for a year, ran the client meetings at SHE Group. I contract through my own Romanian company — no payroll or visa overhead — from Cluj-Napoca on CET, with 4+ hours of overlap with US Eastern.',
            'Țin lucrul în mână de la cap la coadă și vorbesc direct cu stakeholderii: singurul inginer frontend pe un tool Volkswagen Group timp de un an, am condus întâlnirile cu clientul la SHE Group. Lucrez prin propria firmă din România — fără costuri de payroll sau viză — din Cluj-Napoca, pe CET, cu 4+ ore de suprapunere cu US Eastern.'
          ))}</p>
        </Reveal>

        <div className="about">
          <Reveal>
            <span className="kicker">{L(T('Principles — each one earned on a project below', 'Principii — fiecare câștigat pe un proiect de mai jos'))}</span>
            <div className="principles" style={{ marginTop: 14 }}>
              {PRINCIPLES.map((p, i) => (
                <div className="principle" key={i}>
                  <span className="n">0{i + 1}</span>
                  <div><b>{L(p.t)}</b><p>{L(p.p)}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <span className="kicker">{L(T('Stack & facts', 'Stack & date'))}</span>
            <div className="facts" style={{ marginTop: 14 }}>
              {SKILLS.map(([k, v]) => <div className="fact" key={L(k)}><span className="k">{L(k)}</span><span className="v">{v}</span></div>)}
              <div className="fact"><span className="k">{L(T('Education', 'Studii'))}</span><span className="v"><b>B.Sc. Informatics</b> · UPT Timișoara</span></div>
              <div className="fact"><span className="k">{L(T('Languages', 'Limbi'))}</span><span className="v">{L(T('Romanian — native · English — professional · German — limited', 'Română — nativ · Engleză — profesional · Germană — limitat'))}</span></div>
              <div className="fact"><span className="k">{L(T('Engagement', 'Colaborare'))}</span><span className="v">{L(T('Contract via Next Level Tech SRL (RO) · remote · B2B invoice', 'Contract prin Next Level Tech SRL (RO) · remote · factură B2B'))}</span></div>
            </div>
          </Reveal>
        </div>

        <Reveal style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
          <span className="kicker">{L(T('Earlier — five roles, from SAP ABAP intern in 2015 to frontend lead in 2023', 'Înainte — cinci roluri, de la intern SAP ABAP în 2015 la frontend lead în 2023'))}</span>
          <div className="timeline">
            {EARLIER.map((e, i) => (
              <div className="tl" key={i}>
                <span className="when">{L(e.period)}</span>
                <div><b>{L(e.client)}</b><p>{L(e.note)}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
