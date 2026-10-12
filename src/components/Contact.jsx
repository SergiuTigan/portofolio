import { useState } from 'react'
import { T } from '../data.js'
import { useLang } from '../lib/i18n.jsx'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const { L } = useLang()
  const [state, setState] = useState('idle') // idle | sending | sent | error

  const types = [
    T('Contract — full frontend ownership', 'Contract — deținerea frontendului'),
    T('Contract — feature team member', 'Contract — membru în echipă'),
    T('Architecture review / second opinion', 'Review de arhitectură / a doua opinie'),
    T('Something else', 'Altceva'),
  ]

  const onSubmit = async e => {
    e.preventDefault()
    const f = e.target
    setState('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.elements.name.value, email: f.elements.email.value, engagement: f.elements.engagement.value, message: f.elements.message.value, website: f.elements.website.value }),
      })
      if (!r.ok) throw new Error('send_failed')
      setState('sent')
    } catch { setState('error') }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-h">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="index">03</span>
          <h2 id="contact-h">{L(T('Got a frontend that needs an owner?', 'Ai un frontend care are nevoie de un responsabil?'))}</h2>
        </Reveal>
        <Reveal className="contact">
          <div>
            <p className="lead">{L(T('A multi-brand platform, a data-heavy tool, or an architecture you want a second pair of eyes on. Write a few lines. I answer within a day.', 'O platformă multi-brand, un tool dens în date sau o arhitectură la care vrei o a doua privire. Scrie câteva rânduri. Răspund într-o zi.'))}</p>
            <div className="meta">
              <a href="mailto:sergiu@tigan.dev">sergiu@tigan.dev</a>
              <span className="soft">+40 740 014 666</span>
              <span className="muted">{L(T('Cluj-Napoca, Romania · CET', 'Cluj-Napoca, România · CET'))}</span>
            </div>
          </div>
          {state !== 'sent' ? (
            <form className="form" onSubmit={onSubmit}>
              <div className="two">
                <label className="field">{L(T('Name', 'Nume'))}<input className="input" name="name" required maxLength={120} placeholder={L(T('Your name', 'Numele tău'))} autoComplete="name" /></label>
                <label className="field">Email<input className="input" name="email" type="email" required maxLength={200} placeholder="you@company.com" autoComplete="email" /></label>
              </div>
              <label className="field">{L(T('Engagement', 'Tip de colaborare'))}
                <select className="input" name="engagement">{types.map(o => <option key={L(o)}>{L(o)}</option>)}</select>
              </label>
              <label className="field">{L(T("What's the project?", 'Despre ce e proiectul?'))}
                <textarea className="input" name="message" rows="4" required maxLength={4000} placeholder={L(T('A few lines are enough.', 'Câteva rânduri sunt de ajuns.'))} />
              </label>
              <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-pop" type="submit" disabled={state === 'sending'}>{state === 'sending' ? L(T('Sending…', 'Se trimite…')) : L(T('Send message', 'Trimite mesajul'))}</button>
                {state === 'error' && <span style={{ fontSize: 13, color: 'var(--accent)' }}>{L(T('Could not send — email me directly at sergiu@tigan.dev', 'Nu s-a trimis — scrie-mi direct la sergiu@tigan.dev'))}</span>}
              </div>
            </form>
          ) : (
            <div className="sent" role="status">
              <span style={{ fontSize: 24, color: 'var(--accent)' }}>✓</span>
              <h4>{L(T('Message sent', 'Mesaj trimis'))}</h4>
              <p className="soft" style={{ fontSize: 14 }}>{L(T('Thanks — it landed in my inbox. I answer within a day.', 'Mulțumesc — a ajuns în inboxul meu. Răspund într-o zi.'))}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => setState('idle')}>{L(T('Send another', 'Trimite altul'))}</button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
