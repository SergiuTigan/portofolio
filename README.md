# sergiu.tigan.dev

Personal portfolio of Sergiu Țigan — senior frontend engineer who also builds and runs whole products.

The home page is organised around six products (Horae, Alfred, Job Check, Dobby, Scheduled Pickup,
Iron Pulse), each shown through real screenshots of the running apps filled with invented data,
followed by the client work, how I work, and a contact form.

- `src/products.js` — the product chapters (bilingual EN/RO)
- `src/data.js` — case studies behind `/work/:id`, plus earlier roles
- `src/shots.json` — generated screenshot manifest; images in `public/shots/<product>/`
- `scripts/shots.mjs` + `scripts/shots.config.json` — turn raw PNG captures into WebP and the manifest
  (`SHOTS_SRC=/path/to/raw node scripts/shots.mjs`)
- `src/Demo.jsx` — interactive mini-apps for the client case studies (NDA-safe, no screenshots)
- `src/styles.css` — the only stylesheet; tokens on `:root`, light + dark via `prefers-color-scheme`
- `api/contact.js` — Vercel function behind the contact form (Resend; `RESEND_API_KEY` in env)

```bash
npm install
npm run dev      # Vite dev server
npm run build    # → dist/
```

Deploys with `vercel deploy --prod --yes` (the Vercel project is not git-connected).
