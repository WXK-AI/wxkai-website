# WXK — Personal website

An experimental portfolio built with React, Vite, GSAP, and Three.js.

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

The main page content is in `src/App.jsx`; global styling is in `src/styles.css`. Replace the sample projects, email address, and social links before launch.
