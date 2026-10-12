// Editions — the site is itself white-labelled. Every edition is a token
// bundle; the component tree never changes. Same discipline as the platforms
// Sergiu builds for a living: a new brand is configuration, not code.

export const EDITIONS = [
  {
    id: 'ink',
    name: 'Ink',
    tagline: { en: 'Near-black, red mark, lime for action.', ro: 'Aproape negru, semn roșu, lime pentru acțiune.' },
    tokens: {
      '--bg': '#0b0b0e', '--bg-2': '#111218', '--card': '#15161c', '--card-2': '#1b1d25',
      '--ink': '#f3f3f5', '--soft': '#b4b8c3', '--muted': '#8b90a0',
      '--line': 'rgba(243,243,245,0.09)', '--line-2': 'rgba(243,243,245,0.2)',
      '--accent': '#ff4d5e', '--pop': '#c9f24e', '--pop-ink': '#0f1204',
      '--font-display': "'Bricolage Grotesque', system-ui, sans-serif",
      '--font-body': "'Instrument Sans', system-ui, sans-serif",
      '--font-mono': "'Space Mono', ui-monospace, monospace",
      '--radius': '16px', '--radius-sm': '8px', '--radius-pill': '999px',
      '--track': '-0.025em', '--grain': '0.05', '--scheme': 'dark', '--flavor-mix': '0%',
    },
  },
  {
    id: 'paper',
    name: 'Paper',
    tagline: { en: 'Warm white, black type, the same red.', ro: 'Alb cald, text negru, același roșu.' },
    tokens: {
      '--bg': '#f7f3ec', '--bg-2': '#f1ebe1', '--card': '#fffdf9', '--card-2': '#f4efe6',
      '--ink': '#17150f', '--soft': '#4d4a42', '--muted': '#6b665b',
      '--line': 'rgba(23,21,15,0.1)', '--line-2': 'rgba(23,21,15,0.22)',
      '--accent': '#c41f33', '--pop': '#17150f', '--pop-ink': '#fffdf9',
      '--font-display': "'Bricolage Grotesque', system-ui, sans-serif",
      '--font-body': "'Instrument Sans', system-ui, sans-serif",
      '--font-mono': "'Space Mono', ui-monospace, monospace",
      '--radius': '18px', '--radius-sm': '8px', '--radius-pill': '999px',
      '--track': '-0.03em', '--grain': '0.07', '--scheme': 'light', '--flavor-mix': '45%',
    },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    tagline: { en: 'Phosphor on black. Everything monospace.', ro: 'Fosfor pe negru. Totul monospace.' },
    tokens: {
      '--bg': '#050806', '--bg-2': '#080c09', '--card': '#0b110c', '--card-2': '#101710',
      '--ink': '#d9ffe3', '--soft': '#9fdcae', '--muted': '#6fae80',
      '--line': 'rgba(92,255,138,0.14)', '--line-2': 'rgba(92,255,138,0.32)',
      '--accent': '#5cff8a', '--pop': '#5cff8a', '--pop-ink': '#03120a',
      '--font-display': "'Space Mono', ui-monospace, monospace",
      '--font-body': "'Space Mono', ui-monospace, monospace",
      '--font-mono': "'Space Mono', ui-monospace, monospace",
      '--radius': '2px', '--radius-sm': '2px', '--radius-pill': '2px',
      '--track': '0', '--grain': '0.09', '--scheme': 'dark', '--flavor-mix': '0%',
    },
  },
  {
    id: 'atelier',
    name: 'Atelier',
    tagline: { en: 'Cream, burgundy, serif display.', ro: 'Crem, burgund, titluri cu serife.' },
    tokens: {
      '--bg': '#efe8dc', '--bg-2': '#e8e0d2', '--card': '#f6f1e8', '--card-2': '#ece5d8',
      '--ink': '#1f1512', '--soft': '#4b3b36', '--muted': '#6d5f58',
      '--line': 'rgba(31,21,18,0.12)', '--line-2': 'rgba(31,21,18,0.26)',
      '--accent': '#7a1f2b', '--pop': '#7a1f2b', '--pop-ink': '#f6f1e8',
      '--font-display': "'Instrument Serif', Georgia, serif",
      '--font-body': "'Instrument Sans', system-ui, sans-serif",
      '--font-mono': "'Space Mono', ui-monospace, monospace",
      '--radius': '4px', '--radius-sm': '2px', '--radius-pill': '4px',
      '--track': '-0.01em', '--grain': '0.08', '--scheme': 'light', '--flavor-mix': '45%',
    },
  },
]

export const DEFAULT_EDITION = 'ink'

const SYL = ['ve', 'lu', 'no', 'ra', 'ki', 'sol', 'mar', 'zen', 'ora', 'lyn', 'ta', 'mi', 'quo', 'bel', 'ar']
const DISPLAYS = [
  "'Bricolage Grotesque', system-ui, sans-serif",
  "'Instrument Serif', Georgia, serif",
  "'Space Mono', ui-monospace, monospace",
]

function hsl(h, s, l) { return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)` }

/** A brand nobody designed: random hue, radius and type pairing — still just tokens. */
export function generateEdition(seed = Math.random()) {
  const rnd = mulberry32(Math.floor(seed * 1e9))
  const hue = Math.floor(rnd() * 360)
  const dark = rnd() > 0.45
  const radius = [0, 4, 10, 18, 28][Math.floor(rnd() * 5)]
  const display = DISPLAYS[Math.floor(rnd() * DISPLAYS.length)]
  const name = (SYL[Math.floor(rnd() * SYL.length)] + SYL[Math.floor(rnd() * SYL.length)] + (rnd() > 0.5 ? SYL[Math.floor(rnd() * SYL.length)] : ''))
  const Name = name[0].toUpperCase() + name.slice(1)
  const accent = hsl(hue, 78, dark ? 64 : 44)
  const pop = hsl((hue + 150) % 360, 85, dark ? 66 : 38)
  return {
    id: 'gen-' + Math.floor(seed * 1e9).toString(36),
    name: Name,
    generated: true,
    seed,
    tagline: { en: 'Generated — a brand nobody designed.', ro: 'Generat — un brand pe care nu l-a desenat nimeni.' },
    tokens: dark ? {
      '--bg': hsl(hue, 22, 6), '--bg-2': hsl(hue, 20, 8), '--card': hsl(hue, 18, 10), '--card-2': hsl(hue, 16, 13),
      '--ink': hsl(hue, 30, 95), '--soft': hsl(hue, 18, 74), '--muted': hsl(hue, 12, 60),
      '--line': `hsl(${hue} 40% 90% / 0.1)`, '--line-2': `hsl(${hue} 40% 90% / 0.24)`,
      '--accent': accent, '--pop': pop, '--pop-ink': hsl(hue, 30, 6),
      '--font-display': display, '--font-body': "'Instrument Sans', system-ui, sans-serif",
      '--font-mono': "'Space Mono', ui-monospace, monospace",
      '--radius': radius + 'px', '--radius-sm': Math.min(radius, 8) + 'px', '--radius-pill': radius >= 18 ? '999px' : radius + 'px',
      '--track': '-0.02em', '--grain': '0.06', '--scheme': 'dark', '--flavor-mix': '0%',
    } : {
      '--bg': hsl(hue, 30, 95), '--bg-2': hsl(hue, 28, 92), '--card': hsl(hue, 35, 98.5), '--card-2': hsl(hue, 30, 94),
      '--ink': hsl(hue, 30, 9), '--soft': hsl(hue, 14, 32), '--muted': hsl(hue, 10, 42),
      '--line': `hsl(${hue} 30% 10% / 0.1)`, '--line-2': `hsl(${hue} 30% 10% / 0.24)`,
      '--accent': accent, '--pop': hsl(hue, 30, 9), '--pop-ink': hsl(hue, 30, 98),
      '--font-display': display, '--font-body': "'Instrument Sans', system-ui, sans-serif",
      '--font-mono': "'Space Mono', ui-monospace, monospace",
      '--radius': radius + 'px', '--radius-sm': Math.min(radius, 8) + 'px', '--radius-pill': radius >= 18 ? '999px' : radius + 'px',
      '--track': '-0.02em', '--grain': '0.07', '--scheme': 'light', '--flavor-mix': '45%',
    },
  }
}

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

const KEY = 'st.edition'

export function loadEdition() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const v = JSON.parse(raw)
    if (v && v.generated && typeof v.seed === 'number') return generateEdition(v.seed)
    const found = EDITIONS.find(e => e.id === v?.id)
    return found || null
  } catch { return null }
}

export function saveEdition(ed) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ed.generated ? { generated: true, seed: ed.seed } : { id: ed.id }))
    // resolved tokens for the pre-paint script in index.html — no flash on reload
    localStorage.setItem(KEY + '.tokens', JSON.stringify({ id: ed.generated ? 'generated' : ed.id, tokens: ed.tokens }))
  } catch { /* private mode */ }
}

/** Writes the token bundle onto <html>; animated with the View Transitions API where available. */
export function applyEdition(ed, { animate = true } = {}) {
  const root = document.documentElement
  const run = () => {
    for (const [k, v] of Object.entries(ed.tokens)) root.style.setProperty(k, v)
    root.dataset.edition = ed.generated ? 'generated' : ed.id
    root.style.colorScheme = ed.tokens['--scheme']
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', ed.tokens['--bg'])
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (animate && !reduced && typeof document.startViewTransition === 'function') {
    document.startViewTransition(run)
  } else run()
}
