// The logo — the letter S, small red horns, red tail. Nothing else.
// From Logo.dc.html in the Claude Design project. Red parts inherit
// `currentColor`, so the header logo re-themes with the case flavor.

export default function Logo({ size = 28, detailed = false, ink = 'var(--ink)', style }) {
  const h = Math.round(size * 74 / 64)
  if (!detailed) {
    return (
      <svg viewBox="0 0 64 74" width={size} height={h} style={style} role="img" aria-label="Sergiu Țigan logo">
        <path d="M 21 37 C 18 31 16.5 25 16.5 17 C 20 23.5 25 30.5 29 34.5 Z" fill="currentColor" />
        <path d="M 43 37 C 46 31 47.5 25 47.5 17 C 44 23.5 39 30.5 35 34.5 Z" fill="currentColor" />
        <path d="M 42.5 57.5 C 50 63 57 62 57 53" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" />
        <text x="31" y="64" textAnchor="middle" style={{ fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 600, letterSpacing: '-0.02em' }} fill={ink}>S</text>
        <path d="M 57 47 L 60.5 53 L 57 59 L 53.5 53 Z" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 74" width={size} height={h} style={{ overflow: 'visible', ...style }} role="img" aria-label="Sergiu Țigan logo">
      <g>
        <path d="M 21 38.4 C 18 32.4 16.5 26.4 16.5 18.4 C 20 24.9 25 31.9 29 35.9 Z" fill="#8e1f31" opacity="0.5" />
        <path d="M 43 38.4 C 46 32.4 47.5 26.4 47.5 18.4 C 44 24.9 39 31.9 35 35.9 Z" fill="#8e1f31" opacity="0.5" />
        <path d="M 21 37 C 18 31 16.5 25 16.5 17 C 20 23.5 25 30.5 29 34.5 Z" fill="currentColor" />
        <path d="M 43 37 C 46 31 47.5 25 47.5 17 C 44 23.5 39 30.5 35 34.5 Z" fill="currentColor" />
        <path d="M 16.5 17 C 20 23.5 25 30.5 29 34.5 L 26.4 33.4 C 22 28 18.4 22.4 16.5 17 Z" fill="#8e1f31" opacity="0.55" />
        <path d="M 47.5 17 C 44 23.5 39 30.5 35 34.5 L 37.6 33.4 C 42 28 45.6 22.4 47.5 17 Z" fill="#8e1f31" opacity="0.55" />
        <path d="M 21 37 C 18 31 16.5 25 16.5 17 C 17.7 23 19.5 30 22.5 35.4 Z" fill="#f79aa9" opacity="0.4" />
        <path d="M 43 37 C 46 31 47.5 25 47.5 17 C 46.3 23 44.5 30 41.5 35.4 Z" fill="#f79aa9" opacity="0.4" />
      </g>
      <path d="M 42.5 58.8 C 50 64.3 57 63.3 57 54.3" fill="none" stroke="#8e1f31" opacity="0.5" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M 42.5 57.5 C 50 63 57 62 57 53" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <text x="31" y="64" textAnchor="middle" style={{ fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 600, letterSpacing: '-0.02em' }} fill={ink}>S</text>
      <path d="M 57 47 L 60.5 53 L 57 59 L 53.5 53 Z" fill="currentColor" />
      <path d="M 57 47 L 60.5 53 L 57 59 Z" fill="#8e1f31" opacity="0.6" />
    </svg>
  )
}
