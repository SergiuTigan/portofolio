# sergiu.tigan.dev

Personal portfolio of Sergiu Țigan — Senior Frontend Engineer.

The site is itself white-labelled: every colour, font and radius is a token written onto `<html>`
by `src/lib/themes.js`, and the header "Edition" switcher (Ink, Paper, Terminal, Atelier, or a
generated brand) re-themes the whole page without touching a component. Same discipline as the
multi-brand platforms in the case studies.

- `src/data.js` — nine bilingual (EN/RO) case studies, the single source of content
- `src/Demo.jsx` — one interactive mini-app per case study
- `src/lib/` — themes (token bundles), tiny history router, i18n context
- `src/components/`, `src/pages/` — the UI; styles in `src/theme.css` (no CSS framework)
- `api/contact.js` — Vercel function behind the contact form (Resend; `RESEND_API_KEY` in env)

```bash
npm install
npm run dev      # Vite dev server
npm run build    # → dist/
```

Deploys on Vercel from `main`. `⌘K` opens the command palette.
