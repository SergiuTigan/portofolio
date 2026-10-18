// Converts raw PNG captures into web-sized WebP under public/shots/<product>/
// and writes src/shots.json (src, size, frame kind, caption) for the UI.
// Usage: SHOTS_SRC=/path/to/raw node scripts/shots.mjs
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SRC = process.env.SHOTS_SRC
if (!SRC) throw new Error('SHOTS_SRC not set')
const config = JSON.parse(readFileSync(new URL('./shots.config.json', import.meta.url)))
const WIDTH = { web: 2000, phone: 780, panel: 860 }
const out = {}

for (const [product, list] of Object.entries(config)) {
  const dir = join('public/shots', product)
  mkdirSync(dir, { recursive: true })
  out[product] = []
  for (const s of list) {
    const from = join(SRC, product, s.file)
    if (!existsSync(from)) { console.warn('missing', from); continue }
    const name = s.file.replace(/\.png$/, '.webp')
    const to = join(dir, name)
    execFileSync('magick', [from, ...(s.crop ? ['-crop', s.crop, '+repage'] : []), '-resize', `${WIDTH[s.kind]}x>`, '-strip', '-quality', '80', to])
    const [w, h] = execFileSync('magick', ['identify', '-format', '%w %h', to]).toString().split(' ').map(Number)
    out[product].push({ src: `/shots/${product}/${name}`, w, h, kind: s.kind, ...(s.hero && { hero: s.hero }), ...(s.host && { host: s.host }), cap: s.cap })
  }
}
writeFileSync('src/shots.json', JSON.stringify(out, null, 1) + '\n')
console.log(Object.entries(out).map(([k, v]) => `${k}: ${v.length}`).join(', '))
