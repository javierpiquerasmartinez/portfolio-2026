# javipiqueras.dev

Personal portfolio of Javier Piqueras, Software Engineer.

## Tech Stack

- [Astro](https://astro.build/) — main framework
- TypeScript
- CSS
- [Resend](https://resend.com/) — contact form email delivery
- [Vercel](https://vercel.com/) — deployment

## Features

- Single-page layout with anchor navigation
- Fixed navbar with glassmorphism on scroll, mobile hamburger menu
- Multilingual: English (default) and Spanish via Astro's native i18n
- Dark theme — minimalist, Vercel Ship-inspired
- Responsive design for all screen sizes
- Contact form with serverless API endpoint
- Dynamic content loaded from JSON files (`src/data/`)

## Sections

- **Hero**
- **About Me**
- **Technical Stack**
- **Experience**
- **Contact**

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

```env
RESEND_API_KEY=your_resend_api_key
```

## Project Structure

```
src/
├── components/     # Reusable Astro components
├── data/           # JSON content (cv, i18n translations)
│   └── i18n/
│       ├── en.json
│       └── es.json
├── i18n/           # i18n utilities (getLang, useTranslations)
├── layouts/        # Global layout
├── pages/          # Routes + API endpoints
└── styles/         # Global CSS
```

## Pending Tasks

- [ ] **OG image PNG**: Convert `public/og-image.svg` to `public/og-image.png` (1200×630px) for full Twitter/X compatibility. Once done, update the default in `src/components/SEO.astro`: `ogImage = '/og-image.png'`. Tools: Figma, Inkscape, or any online SVG→PNG converter.

## Deployment

Deployed on Vercel. Build command: `npm run build`. Output: `dist/`.

## Live

[javipiqueras.dev](https://javipiqueras.dev)
