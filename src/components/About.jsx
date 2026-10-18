import { T } from '../data.js'
import { useLang } from '../lib/i18n.jsx'

export default function About() {
  const { L } = useLang()
  const how = [
    [T('I own the whole surface', 'Răspund de toată suprafața'), T('Data model, API contract, web, native apps, deploy, the changelog. When something breaks at 7 a.m. in a pastry kitchen, it is my phone that rings.', 'Model de date, contract de API, web, aplicații native, deploy, changelog. Când ceva se strică la 7 dimineața într-un laborator de cofetărie, telefonul meu sună.')],
    [T('Boring where it counts', 'Plictisitor acolo unde contează'), T('Migrations instead of destructive pushes, release branches, separate test and production environments, tests against a real database. Products I run alone still get a release process.', 'Migrări în loc de push-uri distructive, branch-uri de release, medii separate de test și producție, teste pe o bază de date reală. Și produsele pe care le operez singur au un proces de release.')],
    [T('AI where it reads, not where it guesses', 'AI unde citește, nu unde ghicește'), T('Alfred’s agent and Job Check work through typed tools and real sources. I also run automated code review before a human opens a diff — it cut review time by 80% on my team.', 'Agentul din Alfred și Job Check lucrează prin tool-uri tipizate și surse reale. Rulez și review automat înainte ca un om să deschidă diff-ul — a redus timpul de review cu 80% în echipa mea.')],
  ]
  return (
    <section id="about" className="about" aria-labelledby="about-h">
      <div className="wrap about-grid">
        <figure className="about-photo">
          <img src="/me.jpg" alt="Sergiu Țigan" width="1200" height="1200" loading="lazy" />
        </figure>
        <div>
          <h2 id="about-h">{L(T('How I work', 'Cum lucrez'))}</h2>
          <p className="lead">{L(T(
            'Senior frontend engineer with 8+ years of Angular in automotive, banking and compliance — and a habit of building complete products on the side. Based in Cluj-Napoca, four hours of overlap with US Eastern.',
            'Senior frontend engineer cu peste 8 ani de Angular în automotive, banking și conformitate — și cu obiceiul de a construi produse complete în paralel. Din Cluj-Napoca, cu patru ore de suprapunere cu US Eastern.'
          ))}</p>
          <dl className="how">
            {how.map(([k, v]) => <div key={L(k)}><dt>{L(k)}</dt><dd>{L(v)}</dd></div>)}
          </dl>
          <p className="stack-line">
            <b>{L(T('Daily tools', 'Unelte zilnice'))}</b>
            Angular, NgRx, RxJS, TypeScript, React, Next.js, NestJS, Express, Prisma, PostgreSQL, SwiftUI, Kotlin/Compose, PHP/WordPress, Docker, Claude API
          </p>
        </div>
      </div>
    </section>
  )
}
