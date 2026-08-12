# WXK — Personal website

An experimental portfolio demo built with React, Vite, GSAP, and Three.js.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deploy on Cloudflare

Create a Cloudflare Pages project from this GitHub repository and use:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

After the first deployment, add `wxkai.ccwu.cc` under **Custom domains** in the Cloudflare project.

## Customize

Editable biography, project, contact, and social content lives in `src/data/siteContent.js`. Page components live in `src/components`, and global styling is in `src/styles.css`.

The three included projects are explicitly labeled demo experiments. Replace them with real work when it is ready without changing the page layout.
