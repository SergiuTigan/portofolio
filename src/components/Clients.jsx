import { CASES, EARLIER, T } from '../data.js'
import { FLAVOR, DOMAIN } from '../lib/meta.js'
import { useLang } from '../lib/i18n.jsx'

const CLIENT_IDS = ['exadel', 'mtd', 'she', 'be', 'platform']

export default function Clients({ onOpen }) {
  const { L } = useLang()
  const rows = CLIENT_IDS.map(id => CASES.find(c => c.id === id)).filter(Boolean)
  return (
    <section id="clients" className="clients" aria-labelledby="clients-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="clients-h">{L(T('Client work', 'Proiecte pentru clienți'))}</h2>
          <p className="lead">{L(T(
            'Eight years of Angular for companies in regulated industries. Names are anonymised where a contract asks for it; every case study has a working demo of the interface instead of screenshots.',
            'Opt ani de Angular pentru companii din industrii reglementate. Numele sunt anonimizate acolo unde contractul o cere; fiecare studiu de caz are un demo funcțional al interfeței în loc de screenshoturi.'
          ))}</p>
        </div>
        <ol className="cl-list">
          {rows.map(c => (
            <li key={c.id} style={{ '--pc': FLAVOR[c.id] }}>
              <button className="cl-row" onClick={() => onOpen(c.id)}>
                <span className="cl-period">{L(c.period)}</span>
                <span className="cl-name">{c.client}</span>
                <span className="cl-one">{L(c.oneLiner)}</span>
                <span className="cl-domain">{L(DOMAIN[c.id])}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="earlier">
          <h3>{L(T('Before that', 'Înainte de asta'))}</h3>
          <ol>
            {EARLIER.map(e => (
              <li key={L(e.client)}>
                <span className="cl-period">{L(e.period)}</span>
                <b>{L(e.client)}</b>
                <span>{L(e.note)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
