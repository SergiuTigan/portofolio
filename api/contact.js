// Contact form endpoint — Vercel serverless. Sends via Resend (key in env).
// Abuse guards: honeypot, field length caps, naive per-IP rate limit.

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3
const hits = new Map() // per-instance; resets on cold start, good enough

function rateLimited(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS)
  if (arr.length >= MAX_PER_WINDOW) return true
  arr.push(now)
  hits.set(ip, arr)
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' })

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return res.status(429).json({ error: 'rate_limited' })

  const { name, email, engagement, message, website } = req.body || {}

  // honeypot — bots fill it; pretend success
  if (website) return res.status(200).json({ ok: true })

  if (!name || !email || !message) return res.status(400).json({ error: 'missing_fields' })
  if (String(name).length > 120 || String(email).length > 200 ||
      String(engagement || '').length > 120 || String(message).length > 4000) {
    return res.status(400).json({ error: 'too_long' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
    return res.status(400).json({ error: 'bad_email' })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(500).json({ error: 'not_configured' })

  const esc = s => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio <contact@horae.ca>',
      to: ['sergiu@tigan.dev'],
      reply_to: String(email),
      subject: `Portfolio contact — ${String(name).slice(0, 80)}`,
      html: `
        <p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p>
        <p><i>${esc(engagement || '—')}</i></p>
        <hr>
        <p style="white-space: pre-wrap">${esc(message)}</p>
        <hr>
        <p style="color:#888;font-size:12px">sergiu.tigan.dev · IP ${esc(ip)}</p>`,
    }),
  })

  if (!r.ok) {
    const detail = await r.text().catch(() => '')
    console.error('resend_failed', r.status, detail)
    return res.status(502).json({ error: 'send_failed' })
  }
  return res.status(200).json({ ok: true })
}
