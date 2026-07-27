// Interactive per-project mini-apps — converted 1:1 from Demo.dc.html (Claude Design).
import { useEffect, useRef, useState } from 'react'
import { T } from './data.js'

const chip = (active, color) => active
  ? { background: `color-mix(in srgb, ${color} 20%, transparent)`, borderColor: color, color: color === '#9184d9' ? 'var(--color-accent-200)' : color }
  : { background: 'transparent', borderColor: 'var(--color-neutral-800)', color: 'var(--color-neutral-400)' }

const chipBtn = {
  cursor: 'pointer', font: 'inherit', fontSize: 12, padding: '5px 11px',
  borderRadius: 999, borderWidth: 1, borderStyle: 'solid',
}

function stamp() {
  const d = new Date()
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
}

/* ── platform — white-label brand configurator ──────────────────────── */
function PlatformDemo({ L }) {
  const BASE = [
    { name: 'Aurelis', hue: 252, radius: 10, tracking: '-0.01em', wordmark: 'AURELIS', caps: false },
    { name: 'Goldline', hue: 38, radius: 2, tracking: '0.16em', wordmark: 'GOLDLINE', caps: true },
    { name: 'Tidalwave', hue: 168, radius: 16, tracking: '-0.02em', wordmark: 'tidalwave', caps: false },
    { name: 'Rosa', hue: 340, radius: 22, tracking: '0.05em', wordmark: 'ROSA&CO', caps: true },
  ]
  const [brands, setBrands] = useState(BASE)
  const [bi, setBi] = useState(0)
  const [mods, setMods] = useState({ live: true, rewards: true, referral: false })
  const [market, setMarket] = useState('EN')

  const b = brands[bi]
  const accent = `hsl(${b.hue} 75% 64%)`
  const accentDim = `hsl(${b.hue} 45% 22%)`
  const bar = `hsl(${b.hue} 30% 13%)`
  const ground = `hsl(${b.hue} 24% 9%)`
  const inkOn = `hsl(${b.hue} 30% 92%)`
  const r = x => Math.min(b.radius, x)

  const generate = () => {
    const syll = ['ve', 'lu', 'no', 'ra', 'ki', 'sol', 'mar', 'zen', 'ora', 'lyn']
    const name = (syll[Math.floor(Math.random() * 10)] + syll[Math.floor(Math.random() * 10)] + syll[Math.floor(Math.random() * 10)])
    const caps = Math.random() > 0.5
    const nb = {
      name: name[0].toUpperCase() + name.slice(1),
      hue: Math.floor(Math.random() * 360),
      radius: [2, 8, 14, 22][Math.floor(Math.random() * 4)],
      tracking: ['-0.02em', '0', '0.1em', '0.16em'][Math.floor(Math.random() * 4)],
      wordmark: caps ? name.toUpperCase() : name,
      caps,
      generated: true,
    }
    setBrands(bs => [...bs.filter(x => !x.generated), nb])
    setBi(brands.filter(x => !x.generated).length)
  }

  const MARKETS = { EN: 'en-GB', RO: 'ro-RO', DE: 'de-DE' }
  const COPY = {
    EN: { promoKicker: 'Season finale', promo: 'Double rewards weekend', cta: 'Explore', nav: ['Home', 'Live', 'Rewards', 'Referral'], reg: 'Regulated service — terms apply · v4.12.1', tiles: [['Featured', 'Neon Nights'], ['Live', 'Arena Finals'], ['Series', 'Deep Water'], ['Originals', 'Golden Hour']], missions: [['Weekly streak', 4, 7], ['Referral tier', 2, 5]], wallet: 'Wallet', topup: 'Top up' },
    RO: { promoKicker: 'Finalul sezonului', promo: 'Weekend cu recompense duble', cta: 'Explorează', nav: ['Acasă', 'Live', 'Recompense', 'Recomandă'], reg: 'Serviciu reglementat — se aplică termenii · v4.12.1', tiles: [['Recomandat', 'Neon Nights'], ['Live', 'Arena Finals'], ['Seriale', 'Deep Water'], ['Originale', 'Golden Hour']], missions: [['Serie săptămânală', 4, 7], ['Nivel recomandări', 2, 5]], wallet: 'Portofel', topup: 'Alimentează' },
    DE: { promoKicker: 'Saisonfinale', promo: 'Wochenende mit doppelten Prämien', cta: 'Entdecken', nav: ['Start', 'Live', 'Prämien', 'Empfehlen'], reg: 'Regulierter Dienst — es gelten AGB · v4.12.1', tiles: [['Empfohlen', 'Neon Nights'], ['Live', 'Arena Finals'], ['Serien', 'Deep Water'], ['Originale', 'Golden Hour']], missions: [['Wochenserie', 4, 7], ['Empfehlungsstufe', 2, 5]], wallet: 'Konto', topup: 'Aufladen' },
  }
  const c = COPY[market]
  const navItems = [c.nav[0], mods.live && c.nav[1], mods.rewards && c.nav[2], mods.referral && c.nav[3]].filter(Boolean)

  const toggleRow = (key, label) => (
    <button key={key} onClick={() => setMods(m => ({ ...m, [key]: !m[key] }))} style={{ cursor: 'pointer', font: 'inherit', display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 0, padding: '3px 0', color: mods[key] ? 'var(--color-text)' : 'var(--color-neutral-600)', fontSize: 11.5 }}>
      <span style={{ width: 26, height: 15, borderRadius: 99, background: mods[key] ? accent : 'var(--color-neutral-800)', position: 'relative', transition: 'background 0.25s ease', flex: 'none' }}>
        <span style={{ position: 'absolute', top: 2, left: mods[key] ? 13 : 2, width: 11, height: 11, borderRadius: 99, background: '#fff', transition: 'left 0.25s ease' }}></span>
      </span>
      {label}
    </button>
  )

  return (
    <div style={{ padding: 16 }}>
      {/* brand row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)', marginRight: 2 }}>{L(T('Brand', 'Brand'))}</span>
        {brands.map((br, n) => (
          <button key={br.name} onClick={() => setBi(n)} style={{ cursor: 'pointer', font: 'inherit', fontSize: 11.5, padding: '4px 11px', borderRadius: 999, borderWidth: 1, borderStyle: 'solid', display: 'inline-flex', alignItems: 'center', gap: 6, background: n === bi ? `hsl(${br.hue} 60% 60% / 0.18)` : 'transparent', borderColor: n === bi ? `hsl(${br.hue} 70% 62%)` : 'var(--color-neutral-800)', color: n === bi ? `hsl(${br.hue} 80% 74%)` : 'var(--color-neutral-400)' }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: `hsl(${br.hue} 75% 62%)` }}></span>
            {br.name}
          </button>
        ))}
        <button onClick={generate} style={{ cursor: 'pointer', font: 'inherit', fontSize: 11.5, padding: '4px 11px', borderRadius: 999, border: '1px dashed var(--color-neutral-600)', background: 'transparent', color: 'var(--color-accent-300)' }}>
          ✦ {L(T('Generate a brand', 'Generează un brand'))}
        </button>
      </div>

      <div className="demo-sidebar" style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 12 }}>
        {/* config panel */}
        <div style={{ border: '1px solid var(--color-neutral-800)', borderRadius: 10, background: '#12141c', padding: 12, display: 'grid', gap: 11, alignContent: 'start', fontFamily: 'var(--font-mono, monospace)' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 5 }}>{L(T('tokens', 'tokenuri'))}</div>
            <div style={{ display: 'grid', gap: 3, fontSize: 10.5, color: 'var(--color-neutral-400)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>accent <span style={{ marginLeft: 'auto', width: 12, height: 12, borderRadius: 3, background: accent, transition: 'background 0.4s ease' }}></span></span>
              <span style={{ display: 'flex' }}>radius <b style={{ marginLeft: 'auto', color: 'var(--color-text)' }}>{b.radius}px</b></span>
              <span style={{ display: 'flex' }}>tracking <b style={{ marginLeft: 'auto', color: 'var(--color-text)' }}>{b.tracking}</b></span>
              <span style={{ display: 'flex' }}>case <b style={{ marginLeft: 'auto', color: 'var(--color-text)' }}>{b.caps ? 'upper' : 'mixed'}</b></span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 5 }}>{L(T('modules', 'module'))}</div>
            <div style={{ display: 'grid', gap: 2 }}>
              {toggleRow('live', 'Live')}
              {toggleRow('rewards', L(T('Rewards', 'Recompense')))}
              {toggleRow('referral', L(T('Referral', 'Recomandări')))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 5 }}>{L(T('market', 'piață'))}</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {Object.keys(MARKETS).map(m => (
                <button key={m} onClick={() => setMarket(m)} style={{ cursor: 'pointer', font: 'inherit', fontSize: 10.5, padding: '3px 9px', borderRadius: 6, border: '1px solid', borderColor: market === m ? accent : 'var(--color-neutral-800)', background: market === m ? accentDim : 'transparent', color: market === m ? 'var(--color-text)' : 'var(--color-neutral-500)', transition: 'all 0.25s ease' }}>{m}</button>
              ))}
            </div>
            <div style={{ fontSize: 9.5, color: 'var(--color-neutral-600)', marginTop: 5 }}>{MARKETS[market]}</div>
          </div>
        </div>

        {/* rendered product */}
        <div style={{ borderRadius: r(14), overflow: 'hidden', border: '1px solid var(--color-neutral-800)', background: ground, transition: 'background 0.5s ease, border-radius 0.4s ease' }}>
          {/* nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 13px', background: bar, transition: 'background 0.5s ease' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: b.tracking, color: inkOn, fontSize: 13, transition: 'color 0.5s ease' }}>{b.wordmark}</span>
            <span style={{ display: 'flex', gap: 9, marginLeft: 4 }}>
              {navItems.map((n, idx) => (
                <span key={n} style={{ fontSize: 10, color: idx === 0 ? accent : `${inkOn}99`, borderBottom: idx === 0 ? `2px solid ${accent}` : '2px solid transparent', paddingBottom: 1, transition: 'color 0.4s ease', animation: 'demoRise 0.3s ease' }}>{n}</span>
              ))}
            </span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, color: inkOn }}>
              <span style={{ opacity: 0.65 }}>{c.wallet}</span>
              <b style={{ fontVariantNumeric: 'tabular-nums' }}>1,240 ¤</b>
              <span style={{ padding: '3px 9px', borderRadius: r(999), background: accent, color: '#101210', fontSize: 9.5, fontWeight: 700, transition: 'background 0.5s ease' }}>{c.topup}</span>
            </span>
          </div>
          {/* promo banner */}
          <div style={{ margin: 9, marginBottom: 0, padding: '11px 14px', borderRadius: r(12), background: `linear-gradient(100deg, ${accentDim}, transparent 75%)`, border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.5s ease' }}>
            <div style={{ display: 'grid', gap: 1 }}>
              <span style={{ fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>{c.promoKicker}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: inkOn }}>{c.promo}</span>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, padding: '4px 11px', borderRadius: r(999), border: `1px solid ${accent}`, color: accent }}>{c.cta}</span>
          </div>
          {/* content + rewards */}
          <div style={{ display: 'grid', gridTemplateColumns: mods.rewards ? '1.5fr 1fr' : '1fr', gap: 9, padding: 9 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {c.tiles.map(([kind, name]) => (
                <div key={name} style={{ padding: '8px 10px', background: `${inkOn}0d`, border: `1px solid ${inkOn}14`, borderRadius: r(10), display: 'grid', gap: 2, transition: 'border-radius 0.4s ease' }}>
                  <span style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, transition: 'color 0.4s ease' }}>{kind}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: inkOn }}>{name}</span>
                </div>
              ))}
            </div>
            {mods.rewards && (
              <div style={{ border: `1px solid ${inkOn}14`, borderRadius: r(10), padding: '9px 11px', display: 'grid', gap: 8, alignContent: 'start', animation: 'demoRise 0.3s ease' }}>
                <span style={{ fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: `${inkOn}88` }}>{c.nav[2]}</span>
                {c.missions.map(([mLabel, done, total]) => (
                  <div key={mLabel} style={{ display: 'grid', gap: 3 }}>
                    <span style={{ display: 'flex', fontSize: 9.5, color: inkOn }}>{mLabel}<b style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{done}/{total}</b></span>
                    <span style={{ height: 4, borderRadius: 99, background: `${inkOn}18`, overflow: 'hidden' }}>
                      <span style={{ display: 'block', height: 4, width: (done / total * 100) + '%', background: accent, transition: 'background 0.5s ease, width 0.5s ease' }}></span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* regulatory footer */}
          <div style={{ padding: '6px 13px 9px', fontSize: 8.5, color: `${inkOn}66`, borderTop: `1px solid ${inkOn}11` }}>{c.reg}</div>
        </div>
      </div>

      <p style={{ marginTop: 11, fontSize: 11, color: 'var(--color-neutral-500)' }}>
        {L(T('Everything on the right is driven by the config on the left — tokens, entitled modules, market copy. A new brand is a config file, not a fork.', 'Tot ce e în dreapta e condus de configurarea din stânga — tokenuri, module activate, texte pe piață. Un brand nou e un fișier de configurare, nu un fork.'))}
      </p>
    </div>
  )
}

/* ── exadel ─────────────────────────────────────────────────────────── */
function ExadelDemo({ L }) {
  const [step, setStep] = useState(1)
  const [campaignName, setCampaignName] = useState('Q3 GDPR refresher')
  const [regulation, setRegulation] = useState('GDPR')
  const [groups, setGroups] = useState([0, 2])
  const [deadline, setDeadline] = useState('2026-09-30')
  const [reminders, setReminders] = useState(true)
  const [launched, setLaunched] = useState(false)
  const gd = [
    { label: L(T('Finance', 'Financiar')), count: 212 },
    { label: L(T('Engineering', 'Inginerie')), count: 468 },
    { label: L(T('Sales EU', 'Vânzări UE')), count: 154 },
    { label: L(T('Contractors', 'Colaboratori')), count: 89 },
    { label: L(T('Leadership', 'Management')), count: 27 },
    { label: L(T('New joiners', 'Nou-veniți')), count: 63 },
  ]
  const total = groups.reduce((a, i) => a + gd[i].count, 0)
  const labels = [T('Campaign', 'Campanie'), T('Audience', 'Audiență'), T('Schedule', 'Program'), T('Review', 'Verificare')]
  const pct = launched ? 68 : 0
  const review = [
    { k: L(T('Campaign', 'Campanie')), v: campaignName },
    { k: L(T('Regulation', 'Reglementare')), v: regulation },
    { k: L(T('Recipients', 'Destinatari')), v: String(total) },
    { k: L(T('Deadline', 'Termen')), v: deadline },
    { k: L(T('Reminders', 'Notificări')), v: reminders ? L(T('weekly', 'săptămânal')) : L(T('off', 'oprite')) },
  ]
  const labelStyle = { display: 'grid', gap: 4, fontSize: 11, color: 'var(--color-neutral-400)' }
  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {labels.map((l, i) => {
          const n = i + 1, active = n === step, done = n < step
          return (
            <button key={n} onClick={() => setStep(n)} style={{ cursor: 'pointer', font: 'inherit', flex: 1, textAlign: 'left', padding: '8px 10px', border: 0, borderTop: `2px solid ${active ? 'var(--color-accent-400)' : done ? 'var(--color-accent-800)' : 'var(--color-neutral-800)'}`, background: active ? 'color-mix(in srgb, var(--color-accent) 12%, transparent)' : 'transparent', color: active ? 'var(--color-text)' : 'var(--color-neutral-500)', display: 'grid', gap: 2 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.1em' }}>0{n}</span>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{L(l)}</span>
            </button>
          )
        })}
      </div>
      <div style={{ minHeight: 190 }}>
        {step === 1 && (
          <div style={{ display: 'grid', gap: 10, maxWidth: 420, animation: 'demoRise 0.25s ease' }}>
            <label style={labelStyle}>{L(T('Campaign name', 'Nume campanie'))}
              <input className="input" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
            </label>
            <label style={labelStyle}>{L(T('Regulation', 'Reglementare'))}
              <select className="input" value={regulation} onChange={e => setRegulation(e.target.value)}>
                <option value="GDPR">GDPR — data handling</option>
                <option value="AML">AML / KYC</option>
                <option value="MiFID II">MiFID II</option>
              </select>
            </label>
          </div>
        )}
        {step === 2 && (
          <div style={{ animation: 'demoRise 0.25s ease' }}>
            <p style={{ fontSize: 11, color: 'var(--color-neutral-400)' }}>{L(T('Target employee groups — the recipient manager resolves overlaps.', 'Alege grupurile de angajați — managerul de destinatari rezolvă suprapunerile.'))}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {gd.map((g, i) => {
                const on = groups.includes(i)
                return <button key={g.label} onClick={() => setGroups(on ? groups.filter(x => x !== i) : [...groups, i])} style={{ ...chipBtn, ...chip(on, '#9184d9') }}>{g.label} · {g.count}</button>
              })}
            </div>
            <p style={{ marginTop: 12, fontSize: 12, color: 'var(--color-accent-300)' }}>
              {total} {L(T('recipients selected across', 'destinatari selectați din'))} {groups.length} {L(T('groups', 'grupuri'))}
            </p>
          </div>
        )}
        {step === 3 && (
          <div style={{ display: 'grid', gap: 10, maxWidth: 420, animation: 'demoRise 0.25s ease' }}>
            <label style={labelStyle}>{L(T('Completion deadline', 'Termen de finalizare'))}
              <input className="input" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-neutral-300)' }}>
              <input type="checkbox" checked={reminders} onChange={e => setReminders(e.target.checked)} /> {L(T('Weekly reminders until complete', 'Notificări săptămânale până la finalizare'))}
            </label>
          </div>
        )}
        {step === 4 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center', animation: 'demoRise 0.25s ease' }}>
            <div style={{ display: 'grid', gap: 6, fontSize: 12 }}>
              {review.map(r => (
                <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid var(--color-neutral-900)', paddingBottom: 5 }}>
                  <span style={{ color: 'var(--color-neutral-500)' }}>{r.k}</span>
                  <span>{r.v}</span>
                </div>
              ))}
              <button className="btn btn-primary" onClick={() => setLaunched(true)} style={{ marginTop: 8, justifySelf: 'start' }}>
                {launched ? L(T('Campaign live', 'Campanie activă')) : L(T('Launch campaign', 'Lansează campania'))}
              </button>
            </div>
            <div style={{ display: 'grid', placeItems: 'center', gap: 6 }}>
              <div style={{ width: 118, height: 118, borderRadius: 999, background: `conic-gradient(var(--color-accent-400) ${pct * 3.6}deg, var(--color-neutral-900) 0)`, display: 'grid', placeItems: 'center', transition: 'background 0.6s ease' }}>
                <div style={{ width: 88, height: 88, borderRadius: 999, background: '#161826', display: 'grid', placeItems: 'center', fontSize: 20 }}>{pct}%</div>
              </div>
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-500)' }}>{L(T('Completion', 'Finalizare'))}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── mtd ────────────────────────────────────────────────────────────── */
function MtdDemo({ L }) {
  const [marque, setMarque] = useState('all')
  const [sortKey, setSortKey] = useState('model')
  const [sortDir, setSortDir] = useState(1)
  const [rollout, setRollout] = useState(0)
  const all = [
    { model: 'Model V-8', marque: 'Marque I', version: '4.12.1', st: 'live', pct: 100, fleet: '82 410' },
    { model: 'Model S-3', marque: 'Marque II', version: '4.12.0', st: 'rolling', pct: 64, fleet: '41 200' },
    { model: 'Model P-9', marque: 'Marque III', version: '4.11.7', st: 'staged', pct: 22, fleet: '12 880' },
    { model: 'Model C-4', marque: 'Marque IV', version: '4.12.1', st: 'rolling', pct: 78, fleet: '27 640' },
    { model: 'Model B-1', marque: 'Marque V', version: '4.10.9', st: 'held', pct: 8, fleet: '6 130' },
    { model: 'Model V-2', marque: 'Marque I', version: '4.12.1', st: 'live', pct: 100, fleet: '55 900' },
    { model: 'Model S-7', marque: 'Marque II', version: '4.11.7', st: 'staged', pct: 34, fleet: '18 470' },
  ]
  const meta = {
    live: { color: '#4fb8a0', label: L(T('Live', 'Live')) },
    rolling: { color: '#9184d9', label: L(T('Rolling out', 'În lansare')) },
    staged: { color: '#e0a54d', label: L(T('Staged', 'Pregătit')) },
    held: { color: '#d96a8a', label: L(T('On hold', 'Blocat')) },
  }
  const marques = ['all', ...Array.from(new Set(all.map(r => r.marque)))]
  const cols = [
    { key: 'model', label: L(T('Model', 'Model')) }, { key: 'marque', label: L(T('Marque', 'Marcă')) },
    { key: 'version', label: L(T('Version', 'Versiune')) }, { key: 'st', label: L(T('Status', 'Status')) },
    { key: 'pct', label: L(T('Rollout', 'Lansare')) }, { key: 'fleet', label: L(T('Fleet', 'Flotă')) },
  ]
  let rows = marque === 'all' ? all : all.filter(r => r.marque === marque)
  rows = [...rows].sort((a, b) => {
    const x = a[sortKey], y = b[sortKey]
    return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y))) * sortDir
  })
  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {marques.map(m => (
          <button key={m} onClick={() => setMarque(m)} style={{ cursor: 'pointer', font: 'inherit', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 'var(--radius-sm)', borderWidth: 1, borderStyle: 'solid', ...chip(marque === m, '#9184d9') }}>
            {m === 'all' ? L(T('All marques', 'Toate mărcile')) : m}
          </button>
        ))}
      </div>
      <div style={{ overflow: 'hidden', border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-md)' }}>
        <table className="table" style={{ width: '100%', fontSize: 12 }}>
          <thead>
            <tr>
              {cols.map(c => (
                <th key={c.key} onClick={() => { setSortDir(sortKey === c.key ? -sortDir : 1); setSortKey(c.key) }} style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 10, letterSpacing: '0.08em', color: sortKey === c.key ? 'var(--color-accent-300)' : 'var(--color-neutral-500)' }}>
                  {c.label}{sortKey === c.key ? (sortDir > 0 ? ' ↑' : ' ↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const m = meta[r.st]
              const pct = Math.min(100, r.pct + rollout)
              return (
                <tr key={r.model} style={{ background: i % 2 ? 'color-mix(in srgb, #e9e9ed 2%, transparent)' : 'transparent' }}>
                  <td style={{ fontWeight: 500 }}>{r.model}</td>
                  <td style={{ color: 'var(--color-neutral-400)' }}>{r.marque}</td>
                  <td style={{ fontVariantNumeric: 'tabular-nums' }}>{r.version}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: m.color }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: m.color }}></span>{m.label}
                    </span>
                  </td>
                  <td style={{ width: 130 }}>
                    <span style={{ display: 'block', height: 5, borderRadius: 999, background: 'var(--color-neutral-900)', overflow: 'hidden' }}>
                      <span style={{ display: 'block', height: 5, width: pct + '%', background: m.color, transition: 'width 0.5s ease' }}></span>
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--color-neutral-400)' }}>{r.fleet}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, color: 'var(--color-neutral-500)' }}>
        <span>{L(T('Sortable, filterable data grid — the shape of the real tool, anonymised.', 'Grid de date sortabil și filtrabil — forma uneltei reale, anonimizată.'))}</span>
        <button className="btn btn-ghost" onClick={() => setRollout(r => r + 10)} style={{ marginLeft: 'auto', fontSize: 11, padding: '4px 10px' }}>{L(T('Advance rollout +10%', 'Avansează lansarea +10%'))}</button>
      </div>
    </div>
  )
}

/* ── she ────────────────────────────────────────────────────────────── */
function SheDemo({ L }) {
  const seedReports = app => {
    const sets = [
      [{ title: L(T('VAT return — Q2', 'Declarație TVA — T2')), period: '2026-Q2', st: 'filed' },
       { title: L(T('Intrastat dispatch', 'Intrastat expediere')), period: '2026-06', st: 'review' }],
      [{ title: L(T('Payroll levy summary', 'Sumar contribuții salariale')), period: '2026-06', st: 'filed' }],
      [{ title: L(T('Withholding tax ledger', 'Registru impozit reținut')), period: '2026-Q2', st: 'draft' }],
    ]
    return sets[app].map((r, i) => ({ ...r, id: `${app}-${i}` }))
  }
  const [app, setApp] = useState(0)
  const [reports, setReports] = useState(() => seedReports(0))
  const apps = [
    { name: L(T('Tax reporting', 'Raportare fiscală')), sub: L(T('client-facing', 'pentru client')) },
    { name: L(T('Payroll ops', 'Operațiuni salarizare')), sub: L(T('internal', 'intern')) },
    { name: L(T('Codegen studio', 'Studio codegen')), sub: L(T('tooling', 'tooling')) },
  ]
  const stMeta = {
    filed: { label: L(T('Filed', 'Depus')), bg: 'color-mix(in srgb, #4fb8a0 18%, transparent)', color: '#4fb8a0' },
    review: { label: L(T('In review', 'În verificare')), bg: 'color-mix(in srgb, #e0a54d 18%, transparent)', color: '#e0a54d' },
    draft: { label: L(T('Draft', 'Draft')), bg: 'var(--color-neutral-900)', color: 'var(--color-neutral-400)' },
  }
  return (
    <div className="demo-sidebar" style={{ display: 'grid', gridTemplateColumns: '168px 1fr' }}>
      <div style={{ borderRight: '1px solid var(--color-neutral-900)', padding: 14, background: '#14161f' }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Nx monorepo', 'Monorepo Nx'))}</span>
        <div style={{ display: 'grid', gap: 4, marginTop: 10 }}>
          {apps.map((a, i) => (
            <button key={a.name} onClick={() => { setApp(i); setReports(seedReports(i)) }} style={{ cursor: 'pointer', font: 'inherit', textAlign: 'left', fontSize: 12, padding: '7px 9px', borderRadius: 'var(--radius-sm)', borderWidth: 1, borderStyle: 'solid', display: 'grid', gap: 2, ...chip(i === app, '#9184d9') }}>
              <span style={{ fontWeight: 500 }}>{a.name}</span>
              <span style={{ fontSize: 10, opacity: 0.65 }}>{a.sub}</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 10, lineHeight: 1.5, color: 'var(--color-neutral-600)' }}>
          {L(T('Shared libs: ui-kit, forms, api-client, i18n. One dependency graph, three deployables.', 'Librării comune: ui-kit, forms, api-client, i18n. Un graf de dependențe, trei aplicații.'))}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
          <h4 style={{ margin: 0, fontSize: 16 }}>{apps[app].name}</h4>
          <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{apps[app].sub}</span>
          <button className="btn btn-primary" onClick={() => setReports(r => [{ id: 'n' + Date.now(), title: L(T('Draft report', 'Raport draft')) + ' ' + (r.length + 1), period: '2026-07', st: 'draft' }, ...r])} style={{ marginLeft: 'auto', fontSize: 11, padding: '5px 11px' }}>
            {L(T('Generate report', 'Generează raport'))}
          </button>
        </div>
        <div style={{ display: 'grid', gap: 6 }}>
          {reports.map(r => {
            const m = stMeta[r.st]
            return (
              <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12, alignItems: 'center', padding: '9px 11px', border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-sm)', background: '#1b1d2c', animation: 'demoRise 0.3s ease' }}>
                <span style={{ fontSize: 12 }}>{r.title}</span>
                <span style={{ fontSize: 11, color: 'var(--color-neutral-500)', fontVariantNumeric: 'tabular-nums' }}>{r.period}</span>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 8px', borderRadius: 999, background: m.bg, color: m.color }}>{m.label}</span>
              </div>
            )
          })}
        </div>
        <p style={{ marginTop: 12, fontSize: 11, color: 'var(--color-neutral-500)' }}>
          {L(T('Reusable Angular Material + SCSS components fed a code-generation tool — new screens scaffolded, not hand-written.', 'Componente reutilizabile Angular Material + SCSS alimentau un tool de generare de cod — ecranele noi erau schelete generate, nu scrise de mână.'))}
        </p>
      </div>
    </div>
  )
}

/* ── be ─────────────────────────────────────────────────────────────── */
function BeDemo({ L }) {
  const blocks = [
    { k: 'cover', label: L(T('Cover page', 'Copertă')) },
    { k: 'holdings', label: L(T('Holdings table', 'Tabel dețineri')) },
    { k: 'projection', label: L(T('Projection chart', 'Grafic proiecție')) },
    { k: 'risk', label: L(T('Risk profile', 'Profil de risc')) },
    { k: 'fees', label: L(T('Fee breakdown', 'Detaliere comisioane')) },
    { k: 'notes', label: L(T('Advisor notes', 'Note consultant')) },
  ]
  const [report, setReport] = useState([{ id: 1, k: 'cover' }, { id: 2, k: 'holdings' }])
  const nameOf = k => (blocks.find(b => b.k === k) || {}).label || k
  const move = (i, d) => {
    setReport(r => {
      const copy = [...r]; const j = i + d
      if (j < 0 || j >= copy.length) return r
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })
  }
  const iconBtn = { cursor: 'pointer', font: 'inherit', fontSize: 11, width: 20, height: 20, borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-neutral-800)', background: 'transparent', color: 'var(--color-neutral-400)' }
  return (
    <div className="demo-sidebar" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 0 }}>
      <div style={{ borderRight: '1px solid var(--color-neutral-900)', padding: 14, background: '#14161f' }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Blocks', 'Blocuri'))}</span>
        <div style={{ display: 'grid', gap: 5, marginTop: 10 }}>
          {blocks.map(b => (
            <button key={b.k} className="palette-btn" onClick={() => setReport(r => [...r, { id: Date.now() + Math.random(), k: b.k }])}>
              <span>{b.label}</span><span style={{ color: 'var(--color-accent-400)' }}>+</span>
            </button>
          ))}
        </div>
      </div>
      <div className="demo-2col" style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Report layout', 'Structura raportului'))}</span>
          <div style={{ display: 'grid', gap: 5, marginTop: 10, minHeight: 150, alignContent: 'start' }}>
            {report.map((b, i) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px', border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-sm)', background: '#1b1d2c', fontSize: 12, animation: 'demoRise 0.25s ease' }}>
                <span style={{ color: 'var(--color-neutral-600)', fontSize: 10, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{nameOf(b.k)}</span>
                <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                  <button onClick={() => move(i, -1)} style={iconBtn}>↑</button>
                  <button onClick={() => move(i, 1)} style={iconBtn}>↓</button>
                  <button onClick={() => setReport(r => r.filter(x => x.id !== b.id))} style={iconBtn}>×</button>
                </span>
              </div>
            ))}
            {report.length === 0 && (
              <div style={{ border: '1px dashed var(--color-neutral-800)', borderRadius: 'var(--radius-md)', padding: 24, textAlign: 'center', fontSize: 11, color: 'var(--color-neutral-600)' }}>
                {L(T('Add blocks to build the report', 'Adaugă blocuri pentru a construi raportul'))}
              </div>
            )}
          </div>
        </div>
        <div>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('PDF preview', 'Previzualizare PDF'))}</span>
          <div style={{ marginTop: 10, background: 'var(--color-neutral-200)', borderRadius: 2, padding: 14, minHeight: 150, boxShadow: 'var(--shadow-md)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 600, color: '#14161f', borderBottom: '1px solid #b2b6ca', paddingBottom: 5, marginBottom: 8 }}>
              {L(T('Financial plan — client copy', 'Plan financiar — copie client'))}
            </div>
            {report.map((b, i) => (
              <div key={b.id} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#595d6c' }}>{nameOf(b.k)}</div>
                <div style={{ display: 'grid', gap: 3, marginTop: 3 }}>
                  <span style={{ height: 4, background: '#cfd3e5', borderRadius: 999, width: (92 - (i % 3) * 12) + '%' }}></span>
                  <span style={{ height: 4, background: '#cfd3e5', borderRadius: 999, width: (64 + (i % 4) * 8) + '%' }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── pulse ──────────────────────────────────────────────────────────── */
function PulseDemo({ L }) {
  const buildPlan = (goal, minutes) => {
    const pools = [
      [['Front squat', '4 × 5', 'legs'], ['Romanian deadlift', '3 × 8', 'posterior'], ['Bulgarian split squat', '3 × 10', 'legs'], ['Weighted plank', '3 × 45s', 'core'], ['Hip thrust', '3 × 12', 'glutes']],
      [['Incline press', '4 × 6', 'chest'], ['Pull-up', '4 × 8', 'back'], ['Overhead press', '3 × 8', 'shoulders'], ['Barbell row', '3 × 10', 'back'], ['Cable fly', '3 × 12', 'chest'], ['Face pull', '3 × 15', 'rear delt']],
      [['Row intervals', '6 × 250m', 'cardio'], ['Kettlebell swing', '5 × 20', 'posterior'], ['Burpee ladder', '10→1', 'full body'], ['Sled push', '6 × 20m', 'legs'], ['Assault bike', '4 × 60s', 'cardio']],
    ]
    const n = Math.max(3, Math.min(6, Math.round(minutes / 12)))
    return pools[goal].slice(0, n).map((e, i) => ({ n: i + 1, name: e[0], sets: e[1], muscle: e[2] }))
  }
  const [goal, setGoal] = useState(1)
  const [minutes, setMinutes] = useState(45)
  const [tenant, setTenant] = useState(0)
  const [plan, setPlan] = useState(() => buildPlan(1, 45))
  const goals = [T('Lower body strength', 'Forță picioare'), T('Upper body hypertrophy', 'Hipertrofie sus'), T('Conditioning', 'Condiție fizică')]
  const tenants = [
    { name: 'Pulse', color: '#9184d9' },
    { name: 'IronClub', color: '#e0a54d' },
    { name: 'Studio 9', color: '#4fb8a0' },
  ]
  const tenantColor = tenants[tenant].color
  return (
    <div className="demo-sidebar" style={{ padding: 18, display: 'grid', gridTemplateColumns: '210px 1fr', gap: 20 }}>
      <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
        <div>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Goal', 'Obiectiv'))}</span>
          <div style={{ display: 'grid', gap: 4, marginTop: 8 }}>
            {goals.map((g, i) => (
              <button key={i} onClick={() => { setGoal(i); setPlan(buildPlan(i, minutes)) }} style={{ cursor: 'pointer', font: 'inherit', textAlign: 'left', fontSize: 12, padding: '7px 10px', borderRadius: 'var(--radius-sm)', borderWidth: 1, borderStyle: 'solid', ...chip(i === goal, '#9184d9') }}>{L(g)}</button>
            ))}
          </div>
        </div>
        <div>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Session length', 'Durata sesiunii'))} · {minutes}′</span>
          <input type="range" min="20" max="75" step="5" value={minutes} onChange={e => { const m = +e.target.value; setMinutes(m); setPlan(buildPlan(goal, m)) }} style={{ width: '100%', marginTop: 8, accentColor: 'var(--color-accent-500)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setPlan(buildPlan(goal, minutes))}>{L(T('Generate workout', 'Generează antrenamentul'))}</button>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', borderTop: '1px solid var(--color-neutral-900)', paddingTop: 10 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)', width: '100%' }}>{L(T('White-label tenant', 'Brand white-label'))}</span>
          {tenants.map((t, i) => (
            <button key={t.name} onClick={() => setTenant(i)} style={{ cursor: 'pointer', font: 'inherit', fontSize: 11, padding: '4px 9px', borderRadius: 999, borderWidth: 1, borderStyle: 'solid', ...chip(i === tenant, t.color) }}>{t.name}</button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
          <h4 style={{ margin: 0, fontSize: 16, color: tenantColor }}>{L(goals[goal])}</h4>
          <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{minutes}′ · {plan.length} {L(T('exercises', 'exerciții'))} · {tenants[tenant].name}</span>
        </div>
        <div style={{ display: 'grid', gap: 5 }}>
          {plan.map(e => (
            <div key={e.n} style={{ display: 'grid', gridTemplateColumns: '22px 1fr auto auto', gap: 10, alignItems: 'center', padding: '8px 10px', border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-sm)', background: '#1b1d2c', fontSize: 12, animation: 'demoRise 0.3s ease' }}>
              <span style={{ fontSize: 10, color: tenantColor, fontVariantNumeric: 'tabular-nums' }}>{e.n}</span>
              <span>{e.name}</span>
              <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{e.sets}</span>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'var(--color-neutral-900)', color: 'var(--color-neutral-400)' }}>{e.muscle}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 11, color: 'var(--color-neutral-500)' }}>
          {L(T('Generated from a 70+ exercise library; trainers override any block before it reaches the client.', 'Generat din peste 70 de exerciții; antrenorul poate modifica orice bloc înainte să ajungă la client.'))}
        </p>
      </div>
    </div>
  )
}

/* ── dobby ──────────────────────────────────────────────────────────── */
function DobbyDemo({ L }) {
  const [orders, setOrders] = useState([
    { id: 1, code: '#4821', items: '2× ramen, gyoza', total: '124 lei', lane: 0, age: 0 },
    { id: 2, code: '#4820', items: 'poke bowl', total: '58 lei', lane: 1, age: 3 },
    { id: 3, code: '#4819', items: '3× pizza, cola', total: '187 lei', lane: 2, age: 7 },
  ])
  useEffect(() => {
    const t = setInterval(() => setOrders(o => o.map(x => ({ ...x, age: x.age + 1 }))), 3000)
    return () => clearInterval(t)
  }, [])
  const lanes = [
    { label: L(T('Received', 'Primite')), color: '#9184d9' },
    { label: L(T('Cooking', 'În preparare')), color: '#e0a54d' },
    { label: L(T('Ready', 'Gata')), color: '#4fb8a0' },
  ]
  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => setOrders(o => [{ id: Date.now(), code: '#' + (4822 + o.length), items: 'katsu curry, miso', total: (60 + o.length * 13) + ' lei', lane: 0, age: 0 }, ...o])} style={{ fontSize: 12, padding: '6px 12px' }}>
          {L(T('Place order', 'Plasează comandă'))}
        </button>
        <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{L(T('Board updates live — tap an order to move it forward.', 'Panoul se actualizează live — apasă o comandă ca să o avansezi.'))}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-accent-300)' }}>~250 {L(T('daily active users', 'utilizatori activi zilnic'))}</span>
      </div>
      <div className="demo-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {lanes.map((l, i) => {
          const laneOrders = orders.filter(o => o.lane === i)
          return (
            <div key={l.label} style={{ border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-md)', background: '#14161f', padding: 10, minHeight: 190 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: l.color }}>{l.label}</span>
                <span style={{ fontSize: 10, color: 'var(--color-neutral-600)', fontVariantNumeric: 'tabular-nums' }}>{laneOrders.length}</span>
              </div>
              <div style={{ display: 'grid', gap: 5 }}>
                {laneOrders.map(o => (
                  <button key={o.id} onClick={() => setOrders(os => os.map(x => x.id === o.id ? { ...x, lane: Math.min(2, x.lane + 1), age: 0 } : x))} style={{ cursor: 'pointer', font: 'inherit', textAlign: 'left', padding: '8px 9px', border: '1px solid var(--color-neutral-800)', borderLeft: `2px solid ${l.color}`, borderRadius: 'var(--radius-sm)', background: '#1b1d2c', display: 'grid', gap: 3, animation: 'demoRise 0.3s ease', color: 'var(--color-text)' }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}><b style={{ fontWeight: 500 }}>{o.code}</b><span style={{ color: 'var(--color-neutral-500)', fontVariantNumeric: 'tabular-nums' }}>{o.total}</span></span>
                    <span style={{ fontSize: 10, color: 'var(--color-neutral-500)' }}>{o.items}</span>
                    <span style={{ fontSize: 10, color: l.color }}>{o.age} {L(T('min ago', 'min în urmă'))}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <p style={{ marginTop: 12, fontSize: 11, color: 'var(--color-neutral-500)' }}>
        {L(T('Migrated SQLite → PostgreSQL to carry this load; order state pushes to kitchen and customer at once.', 'Migrat SQLite → PostgreSQL pentru a susține încărcarea; starea comenzii ajunge simultan la bucătărie și client.'))}
      </p>
    </div>
  )
}

/* ── luppy ──────────────────────────────────────────────────────────── */
function LuppyDemo({ L }) {
  const [role, setRole] = useState(0)
  const [log, setLog] = useState([])
  const roles = [T('Owner', 'Proprietar'), T('Vet', 'Veterinar'), T('Clinic admin', 'Admin clinică')]
  const recs = [
    { label: L(T('Rabies vaccine', 'Vaccin antirabic')), detail: L(T('valid to 03 / 2027', 'valabil până 03 / 2027')), tag: L(T('shared', 'partajat')), roles: [0, 1, 2] },
    { label: L(T('Deworming', 'Deparazitare')), detail: L(T('last: 12 May 2026', 'ultima: 12 mai 2026')), tag: L(T('shared', 'partajat')), roles: [0, 1, 2] },
    { label: L(T('Clinical notes', 'Note clinice')), detail: L(T('dermatitis follow-up', 'control dermatită')), tag: L(T('vet only', 'doar veterinar')), roles: [1, 2] },
    { label: L(T('Prescription history', 'Istoric rețete')), detail: L(T('3 active items', '3 elemente active')), tag: L(T('vet only', 'doar veterinar')), roles: [1] },
    { label: L(T('Billing & consent', 'Facturare și consimțământ')), detail: L(T('2 documents on file', '2 documente la dosar')), tag: L(T('clinic', 'clinică')), roles: [2] },
  ]
  return (
    <div className="demo-2col" style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
      <div>
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          {roles.map((r, i) => (
            <button key={i} onClick={() => setRole(i)} style={{ cursor: 'pointer', font: 'inherit', flex: 1, fontSize: 11, padding: '6px 8px', borderRadius: 'var(--radius-sm)', borderWidth: 1, borderStyle: 'solid', ...chip(i === role, '#9184d9') }}>{L(r)}</button>
          ))}
        </div>
        <div style={{ border: '1px solid var(--color-accent-800)', borderRadius: 'var(--radius-lg)', background: 'radial-gradient(120% 90% at 20% 0%, #2b2741, #14161f)', padding: 16, boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent-400)' }}>{L(T('Digital pet passport', 'Pașaport digital'))}</div>
              <h4 style={{ margin: '4px 0 0', fontSize: 20 }}>Mika</h4>
              <div style={{ fontSize: 11, color: 'var(--color-neutral-400)' }}>{L(T('Shorthair · 4 y · chip 941…0072', 'Europeană · 4 ani · chip 941…0072'))}</div>
            </div>
            <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-800)', display: 'grid', placeItems: 'center', fontSize: 9, color: 'var(--color-neutral-500)', textAlign: 'center', lineHeight: 1.2 }}>NFC / QR</div>
          </div>
          <div style={{ display: 'grid', gap: 5, marginTop: 14 }}>
            {recs.map(r => {
              const on = r.roles.includes(role)
              return (
                <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center', padding: '7px 9px', borderRadius: 'var(--radius-sm)', background: on ? 'color-mix(in srgb, #e9e9ed 4%, transparent)' : 'transparent', border: `1px solid ${on ? 'var(--color-neutral-800)' : 'transparent'}`, fontSize: 11 }}>
                  <span style={{ display: 'grid', gap: 1 }}>
                    <span>{r.label}</span>
                    <span style={{ fontSize: 10, color: 'var(--color-neutral-500)' }}>{on ? r.detail : L(T('hidden for this role', 'ascuns pentru acest rol'))}</span>
                  </span>
                  <span style={{ fontSize: 10, color: on ? 'var(--color-accent-400)' : 'var(--color-neutral-700)' }}>{r.tag}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => setLog(l => [{ t: stamp(), msg: L(T('Tag read · record opened as ', 'Tag citit · dosar deschis ca ')) + L(roles[role]) }, ...l].slice(0, 5))} style={{ width: '100%' }}>
          {L(T('Simulate NFC tap', 'Simulează atingere NFC'))}
        </button>
        <div style={{ marginTop: 12, display: 'grid', gap: 6 }}>
          {log.map((l, i) => (
            <div key={i} style={{ fontSize: 11, display: 'flex', gap: 8, color: 'var(--color-neutral-400)', animation: 'demoRise 0.25s ease' }}>
              <span style={{ color: 'var(--color-accent-400)', fontVariantNumeric: 'tabular-nums' }}>{l.t}</span>
              <span>{l.msg}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 11, color: 'var(--color-neutral-500)' }}>
          {L(T('One record, three role-based views — the same NFC tag resolves to what that role is allowed to see.', 'Un singur dosar, trei vederi pe rol — același tag NFC arată doar ce are dreptul să vadă rolul respectiv.'))}
        </p>
      </div>
    </div>
  )
}

/* ── horae ──────────────────────────────────────────────────────────── */
function HoraeDemo({ L }) {
  const [hOrg, setHOrg] = useState(0)
  const [tasks, setTasks] = useState([
    { id: 1, recipe: 'Tartă cu fructe', qty: 24, unit: T('pcs', 'buc'), status: 1, material: 'Făină 000', need: 3.2, needUnit: 'kg' },
    { id: 2, recipe: 'Cremă vanilie', qty: 10, unit: T('l', 'l'), status: 0, material: 'Lapte 3,5%', need: 4, needUnit: 'l' },
    { id: 3, recipe: 'Éclair ciocolată', qty: 36, unit: T('pcs', 'buc'), status: 0, material: 'Ciocolată 55%', need: 2.5, needUnit: 'kg' },
  ])
  const [lots, setLots] = useState([
    { code: 'F-2411', material: 'Făină 000', qty: 6, start: 6, unit: 'kg', expiry: '12.09' },
    { code: 'F-2503', material: 'Făină 000', qty: 20, start: 20, unit: 'kg', expiry: '04.11' },
    { code: 'L-0712', material: 'Lapte 3,5%', qty: 5, start: 5, unit: 'l', expiry: '02.08' },
    { code: 'L-0715', material: 'Lapte 3,5%', qty: 12, start: 12, unit: 'l', expiry: '09.08' },
    { code: 'C-1104', material: 'Ciocolată 55%', qty: 1.8, start: 1.8, unit: 'kg', expiry: '20.10' },
    { code: 'C-1230', material: 'Ciocolată 55%', qty: 10, start: 10, unit: 'kg', expiry: '15.02' },
  ])
  const [trace, setTrace] = useState([])
  const orgs = [
    { name: 'Acadeea', slug: 'acadeea', accent: '#D4527B' },
    { name: 'Dulce Ana', slug: 'dulce-ana', accent: '#673AB7' },
    { name: 'Mille Feuille', slug: 'millefeuille', accent: '#009688' },
  ]
  const org = orgs[hOrg]
  const statuses = [
    { label: 'DE FACUT', color: '#6f8ed9' },
    { label: 'IN LUCRU', color: '#e0a54d' },
    { label: 'FINALIZAT', color: '#4fb8a0' },
  ]
  const advanceTask = id => {
    const task = tasks.find(t => t.id === id)
    if (!task || task.status === 2) return
    if (task.status === 0) { setTasks(ts => ts.map(t => t.id === id ? { ...t, status: 1 } : t)); return }
    let remaining = task.need
    const next = lots.map(l => ({ ...l }))
    const drawn = []
    for (const lot of next) {
      if (remaining <= 0.001) break
      if (lot.material !== task.material || lot.qty <= 0) continue
      const take = Math.min(lot.qty, remaining)
      lot.qty -= take
      remaining -= take
      drawn.push(lot.code + ' → ' + (Math.round(take * 100) / 100) + ' ' + lot.unit)
    }
    setTasks(ts => ts.map(t => t.id === id ? { ...t, status: 2 } : t))
    setLots(next)
    setTrace(tr => [{ t: stamp(), msg: task.recipe + ' · ' + drawn.join(' · ') }, ...tr].slice(0, 5))
  }
  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 15 }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)', marginRight: 2 }}>{L(T('Organisation', 'Organizație'))}</span>
        {orgs.map((o, i) => (
          <button key={o.slug} onClick={() => setHOrg(i)} style={{ ...chipBtn, ...chip(i === hOrg, o.accent) }}>{o.name}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-neutral-500)' }}>{org.slug}.horae.ca</span>
      </div>
      <div className="demo-2col" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16 }}>
        <div>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Production tasks', 'Taskuri de producție'))}</span>
          <div style={{ display: 'grid', gap: 6, marginTop: 9 }}>
            {tasks.map(task => {
              const st = statuses[task.status]
              return (
                <div key={task.id} style={{ border: '1px solid var(--color-neutral-800)', borderLeft: `2px solid ${st.color}`, borderRadius: 'var(--radius-sm)', background: '#1b1d2c', padding: '10px 12px', display: 'grid', gap: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{task.recipe}</span>
                    <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>×{task.qty} {L(task.unit)}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 9, letterSpacing: '0.08em', padding: '2px 8px', borderRadius: 999, background: `color-mix(in srgb, ${st.color} 18%, transparent)`, color: st.color }}>{st.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--color-neutral-500)' }}>{task.need} {task.needUnit} {task.material}</span>
                    <button onClick={() => advanceTask(task.id)} style={{ cursor: 'pointer', font: 'inherit', marginLeft: 'auto', fontSize: 11, padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: `1px solid ${task.status === 2 ? 'var(--color-neutral-800)' : org.accent}`, background: 'transparent', color: task.status === 2 ? 'var(--color-neutral-600)' : org.accent }}>
                      {task.status === 0 ? L(T('Start', 'Începe')) : task.status === 1 ? L(T('Finalise', 'Finalizează')) : L(T('Done', 'Gata'))}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <p style={{ marginTop: 11, fontSize: 11, lineHeight: 1.5, color: 'var(--color-neutral-500)' }}>
            {L(T('Recipe → task → stock: finishing a task draws its raw materials down FIFO and records which lot went into which batch.', 'Rețetă → task → stoc: finalizarea unui task consumă materia primă FIFO și înregistrează ce lot a intrat în ce șarjă.'))}
          </p>
        </div>
        <div>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Stock lots · FIFO', 'Loturi de stoc · FIFO'))}</span>
          <div style={{ display: 'grid', gap: 4, marginTop: 9 }}>
            {lots.map(lot => (
              <div key={lot.code} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center', padding: '7px 10px', border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-sm)', background: lot.qty <= 0 ? 'transparent' : 'color-mix(in srgb, #e9e9ed 3%, transparent)' }}>
                <span style={{ display: 'grid', gap: 1 }}>
                  <span style={{ fontSize: 12 }}>{lot.material}</span>
                  <span style={{ fontSize: 10, color: 'var(--color-neutral-500)' }}>{lot.code} · {L(T('exp ', 'exp '))}{lot.expiry}</span>
                </span>
                <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: lot.qty <= 0 ? 'var(--color-neutral-700)' : lot.qty < lot.start * 0.4 ? '#e0a54d' : 'var(--color-neutral-300)' }}>
                  {Math.round(lot.qty * 100) / 100} {lot.unit}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'grid', gap: 4 }}>
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-neutral-600)' }}>{L(T('Lot traceability', 'Trasabilitate loturi'))}</span>
            {trace.map((l, i) => (
              <div key={i} style={{ fontSize: 11, display: 'flex', gap: 8, color: 'var(--color-neutral-400)', animation: 'demoRise 0.25s ease' }}>
                <span style={{ color: org.accent, fontVariantNumeric: 'tabular-nums' }}>{l.t}</span>
                <span>{l.msg}</span>
              </div>
            ))}
            {trace.length === 0 && (
              <span style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>{L(T('Finish a task to attribute lots.', 'Finalizează un task pentru atribuirea loturilor.'))}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── frame ──────────────────────────────────────────────────────────── */
const KINDS = {
  platform: PlatformDemo, exadel: ExadelDemo, mtd: MtdDemo, she: SheDemo,
  be: BeDemo, pulse: PulseDemo, dobby: DobbyDemo, luppy: LuppyDemo, horae: HoraeDemo,
}

export default function Demo({ kind, lang, chrome }) {
  const L = o => (o && typeof o === 'object' && 'en' in o) ? o[lang === 'ro' ? 'ro' : 'en'] : o
  const Body = KINDS[kind] || PlatformDemo
  return (
    <div className="demo-scope" style={{ border: '1px solid var(--color-neutral-800)', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(180deg, #1b1d2c, #161826)', overflow: 'hidden', boxShadow: '0 18px 44px -18px rgba(24, 20, 14, 0.45)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--color-neutral-900)', background: '#14161f' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--color-neutral-700)' }}></span>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--color-neutral-800)' }}></span>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--color-neutral-800)' }}></span>
        </div>
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-neutral-500)' }}>{chrome || 'prototype'}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--color-accent-400)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--color-accent-400)', animation: 'demoPulse 2s ease-in-out infinite' }}></span>
          {L(T('interactive', 'interactiv'))}
        </span>
      </div>
      <Body L={L} />
    </div>
  )
}
