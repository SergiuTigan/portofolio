// The mark: an S drawn as one continuous stroke, split into two segments —
// the upper one takes the edition's accent (currentColor), the lower one the
// ink. Two tokens, one shape: the same idea as the site. Scales to a 16px
// favicon without losing anything.

const TOP = 'M 48 19.5 C 46 10.5 20.5 8 17.5 22.5 C 15.5 32 28 33.5 32 34'
const BOTTOM = 'M 32 34 C 36 34.5 48.5 36 46.5 45.5 C 43.5 59 18 55.5 16 46.5'

export default function Logo({ size = 28, ink = 'var(--ink)', tile = false, style }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={style} role="img" aria-label="Sergiu Țigan">
      {tile && <rect width="64" height="64" rx="16" fill={ink} />}
      <path d={BOTTOM} fill="none" stroke={tile ? 'var(--bg, #0b0b0e)' : ink} strokeWidth="10" strokeLinecap="round" />
      <path d={TOP} fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
    </svg>
  )
}

export const LOGO_PATHS = { TOP, BOTTOM }
