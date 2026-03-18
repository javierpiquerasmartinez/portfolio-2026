---
title: "Getting Started with Astro: A Developer's Perspective"
date: 2026-03-18
excerpt: "Astro has changed how I think about building static sites. Here's what I learned after rebuilding my portfolio from scratch."
tags: ["Astro", "Web Dev", "Performance"]
draft: false
---

When I decided to rebuild my portfolio, I had the usual options: Next.js, Nuxt, plain HTML. I picked Astro, and it was the right call.

## Why Astro?

Astro ships **zero JavaScript by default**. For a content site like a portfolio, that's the correct baseline. Every kilobyte of JS you add should earn its place. Astro forces that discipline.

The island architecture means you can drop in a React or Svelte component where you genuinely need interactivity — the contact form, an animated counter — and keep everything else as pure HTML. You get the DX of a modern framework without paying for it universally.

## Content Collections

The feature that impressed me most is Content Collections. You define a schema with Zod:

```ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
  }),
});
```

And Astro validates your Markdown frontmatter at build time. No more silent typos in dates or forgotten required fields. The type-safety extends into your templates — `post.data.title` is a typed string, not `any`.

## i18n Without a Plugin

Astro's built-in i18n routing is simpler than I expected. You declare your locales in `astro.config.mjs`, place pages under `/es/`, and use `getLang(url)` to pick the right translation file. No context providers, no runtime overhead.

The only rough edge: you have to be deliberate about alternating `hreflang` tags for SEO. That's a few lines in your Layout component, but it's manual.

## The Build Output

Running `npm run build` on this portfolio produces clean, pre-rendered HTML pages with inlined critical CSS. Lighthouse scores are consistently 100 across the board — not because I tuned for it, but because the defaults are sensible.

## Would I Use It Again?

Yes, for anything primarily content-driven. If you're building a dashboard or a complex SPA, reach for something else. But for a portfolio, a blog, a marketing site, or documentation — Astro is the sharpest tool in the box right now.

The framework doesn't fight you. That's rarer than it should be.
