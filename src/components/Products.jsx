import { T } from '../data.js'
import { PRODUCTS, SIDE } from '../products.js'
import { useLang } from '../lib/i18n.jsx'
import { Gallery } from './Shots.jsx'

const HOST = { horae: 'patiseria.horae.ca', alfred: 'alfred.app', jobcheck: 'jobs.example', dobby: 'dobby', pickup: 'cofetaria.example', ironpulse: 'ironpulse.app' }

export default function Products({ onOpen }) {
  const { L } = useLang()
  return (
    <section id="products" className="products" aria-labelledby="products-h">
      <div className="wrap sec-head">
        <h2 id="products-h">{L(T('Things I build and run myself', 'Lucruri pe care le construiesc și le operez singur'))}</h2>
        <p className="lead">{L(T(
          'Six products, each designed, coded, shipped and operated by me. The screenshots are the real apps, filled with invented data.',
          'Șase produse, fiecare proiectat, scris, lansat și operat de mine. Screenshoturile sunt aplicațiile reale, umplute cu date inventate.'
        ))}</p>
      </div>

      {PRODUCTS.map(p => (
        <article key={p.id} id={'p-' + p.id} className="chapter" style={{ '--pc': p.color }} aria-labelledby={'p-' + p.id + '-h'}>
          <div className="wrap">
            <header className="ch-head">
              <h3 id={'p-' + p.id + '-h'} className="ch-name">{p.name}</h3>
              <div className="ch-meta">
                <span className="ch-kind">{L(p.kind)}</span>
                <span className="ch-status"><span className="dot" aria-hidden />{L(p.status)}</span>
              </div>
            </header>
            <div className="ch-body">
              <p className="ch-pitch">{L(p.pitch)}</p>
              <dl className="ch-facts">
                {p.facts.map(([k, v]) => <div key={L(k)}><dt>{L(k)}</dt><dd>{L(v)}</dd></div>)}
              </dl>
            </div>
            <ul className="ch-figures">
              {p.figures.map(([v, l]) => <li key={L(l)}><b>{v}</b><span>{L(l)}</span></li>)}
            </ul>
          </div>
          <div className="wrap-wide"><Gallery id={p.id} host={HOST[p.id]} /></div>
          {(p.caseId || p.url) && (
            <div className="wrap ch-links">
              {p.caseId && <button className="btn btn-pc" onClick={() => onOpen(p.caseId)}>{L(T('Read the case study', 'Citește studiul de caz'))}</button>}
              {p.url && <a className="btn btn-line" href={p.url} target="_blank" rel="noreferrer">{p.url.replace('https://', '')}</a>}
            </div>
          )}
        </article>
      ))}

      <div className="wrap side">
        <h3>{L(T('Smaller things', 'Lucruri mai mici'))}</h3>
        <ul>
          {SIDE.map(s => (
            <li key={L(s.name)}>
              <b>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{L(s.name)}</a> : L(s.name)}</b>
              <span>{L(s.note)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
