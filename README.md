# Wong Xin Kai — Personal website

A portfolio built as a personal control surface rather than a conventional card grid. The first release presents three evidence-backed project instruments:

- **GenGuard** — a local-first browser extension for detecting and redacting PII before content reaches a GenAI platform.
- **Langfuse Menubar** — a native macOS observability dashboard with explicit privacy boundaries.
- **Secure Software Hardening** — a scoped audit, remediation, and retest case study.

Razer Viper Control and a safe ransomware behaviour lab appear as smaller experiments.

## Stack

React, Vite, and GSAP. The starter also retains the Three.js packages for future interactive scenes.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Cloudflare deployment

The production site is deployed from the `main` branch. Cloudflare settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
- Custom domain: `wxkai.ccwu.cc`

Every push to `main` triggers a new production build. Other branches can be used for preview deployments.

## Content structure

Identity and external links live in `src/data/siteContent.js`. Each primary case study has its own component in `src/components`, and the full responsive visual system is in `src/styles.css`.

The GenGuard bench uses clearly labeled fixture data. It demonstrates the product interaction without claiming that the project’s ONNX model is running inside the portfolio page.
