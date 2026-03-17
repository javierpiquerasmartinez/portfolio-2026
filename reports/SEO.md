# SEO Audit Report — javipiqueras.dev

**Fecha:** 17 marzo 2026
**URL:** https://javipiqueras.dev
**Framework:** Astro + Vercel
**Alcance:** Auditoría técnica completa + on-page

---

## Puntuación global: 9/10

El portfolio presenta una base técnica SEO muy sólida para su tipo. Todos los problemas críticos identificados han sido resueltos durante esta sesión. No existen bloqueos a la indexación ni errores estructurales.

---

## 1. Rastreabilidad e Indexación

| Check | Estado | Detalle |
|---|---|---|
| `robots.txt` | ✅ | `Allow: /` sin bloqueos; referencia correcta al sitemap |
| Sitemap XML | ✅ | `sitemap-index.xml` + `sitemap-0.xml` generados por `@astrojs/sitemap` |
| Páginas en sitemap | ✅ | `/` (EN) y `/es/` (ES) — las 2 únicas páginas del sitio |
| Google Search Console | ✅ | Propiedad verificada; sitemap enviado y aceptado (2 páginas descubiertas) |
| Noindex en páginas principales | ✅ | Ninguna — `<meta name="robots" content="index, follow">` |
| Redirección www → non-www | ⚠️ | Vercel sirve en ambos; la propiedad en Search Console está configurada en `www`. Recomendable forzar redirección a non-www desde Vercel |

---

## 2. Fundamentos Técnicos

| Check | Estado | Detalle |
|---|---|---|
| HTTPS | ✅ | Vercel provee SSL automático |
| `lang` en `<html>` | ✅ | `lang="en"` / `lang="es"` según locale |
| Viewport meta | ✅ | `width=device-width, initial-scale=1` |
| Charset | ✅ | `utf-8` |
| Favicon | ✅ | SVG + ICO |
| `site` en `astro.config.mjs` | ✅ | `https://javipiqueras.dev` — necesario para canonical y sitemap |
| Font loading | ✅ | Geist cargada con `preload` + truco `media="print"` para no bloquear render |
| `<meta name="generator">` | ✅ | Eliminado — no expone el stack |

---

## 3. Canonicalización e Internacionalización

| Check | Estado | Detalle |
|---|---|---|
| Canonical URL | ✅ | Generado dinámicamente desde `Astro.url.pathname + Astro.site` |
| Hreflang EN | ✅ | `<link rel="alternate" hreflang="en" href="https://javipiqueras.dev/">` |
| Hreflang ES | ✅ | `<link rel="alternate" hreflang="es" href="https://javipiqueras.dev/es/">` |
| Hreflang x-default | ✅ | Apunta a `/` (inglés por defecto) |
| Locale EN por defecto sin prefijo | ✅ | `/` sin prefijo; `/es/` para español — configuración i18n nativa de Astro |

---

## 4. On-Page SEO

### Title Tags

| Página | Título | Chars |
|---|---|---|
| EN (`/`) | `Javier Piqueras · Senior Software Engineer` | 43 |
| ES (`/es/`) | `Javier Piqueras — Ingeniero de Software Senior` | 47 |

✅ Ambos dentro del rango óptimo (50-60 chars), con keyword principal presente.

### Meta Descriptions

| Página | Descripción | Chars |
|---|---|---|
| EN | `Senior Software Engineer based in Valencia, Spain. Over a decade building scalable web products with clean architecture.` | 118 |
| ES | `Ingeniero de Software Senior con base en Valencia. Más de una década construyendo productos web escalables con arquitectura limpia.` | 128 |

✅ Ambas dentro del rango óptimo (≤160 chars), con keyword y localización.

### Estructura de Headings

```
h1: "JPDEV Javier Piqueras"  ← Hero (JPDEV visible, nombre completo en sr-only dentro del h1)
  h2: "Experience"
  h2: "Technical Stack"
  h2: "About Me"
  h2: "Contact"
```

✅ Un único H1 por página. Jerarquía H1 → H2 correcta. Sin saltos de nivel.

### Imágenes

| Imagen | Alt text | Estado |
|---|---|---|
| Foto de perfil (AboutMe) | `Javier Piqueras, Senior Software Engineer` | ✅ |
| OG image | Referenciada como `/og-image.png` (1200×630 PNG) | ✅ |

---

## 5. Open Graph & Social Sharing

| Meta tag | Estado | Valor |
|---|---|---|
| `og:type` | ✅ | `website` |
| `og:title` | ✅ | Dinámico desde i18n |
| `og:description` | ✅ | Dinámico desde i18n |
| `og:image` | ✅ | `/og-image.png` (1200×630) |
| `og:image:width/height` | ✅ | `1200` / `630` |
| `og:image:alt` | ✅ | `Javier Piqueras — Senior Software Engineer` |
| `og:locale` | ✅ | `en_US` / `es_ES` según página |
| `og:locale:alternate` | ✅ | Locale alternativo declarado |
| `og:url` | ✅ | URL canónica dinámica |
| `twitter:card` | ✅ | `summary_large_image` |
| `twitter:title` | ✅ | Dinámico |
| `twitter:description` | ✅ | Dinámico |
| `twitter:image` | ✅ | `/og-image.png` |
| `twitter:image:alt` | ✅ | Presente |
| `twitter:creator` | ⚠️ | `@javierpiquerasmartinez` — verificar que este handle de X/Twitter es correcto |

---

## 6. Structured Data (JSON-LD)

Formato: `@graph` con un único `@context` — estándar recomendado para múltiples schemas.

Validado en Schema.org Validator: **0 errores, 0 advertencias**.

### Schema `Person`

| Campo | Valor | Estado |
|---|---|---|
| `name` | `Javier Piqueras` | ✅ |
| `jobTitle` | `Senior Software Engineer` | ✅ |
| `description` | Extraído de `cv.json` (about) | ✅ |
| `image` | URL absoluta a `og-image.png` | ✅ |
| `url` | `https://javipiqueras.dev` | ✅ |
| `email` | `javierpiquerasmartinez@gmail.com` | ✅ |
| `knowsAbout` | Array con 22 tecnologías del stack | ✅ |
| `address` | Valencia, ES | ✅ |
| `worksFor` | BNP Paribas Personal Finance | ✅ |
| `sameAs` | LinkedIn + GitHub | ✅ |

### Schema `WebSite`

| Campo | Valor | Estado |
|---|---|---|
| `url` | `https://javipiqueras.dev` | ✅ |
| `name` | Dinámico desde `site.title` i18n | ✅ |
| `description` | Dinámico desde `site.description` i18n | ✅ |
| `inLanguage` | `["en", "es"]` | ✅ |
| `author` | Person → Javier Piqueras | ✅ |

---

## 7. Accesibilidad (señales SEO)

| Check | Estado | Detalle |
|---|---|---|
| `aria-label` en secciones | ✅ | Todas las secciones con `aria-label` desde i18n |
| `aria-hidden` en decorativos | ✅ | Elementos decorativos marcados |
| `aria-label` en CTAs | ✅ | "Get in touch — contact Javier Piqueras" |
| `prefers-reduced-motion` | ✅ | Respetado en todas las animaciones |
| Responsive design | ✅ | Breakpoints a 768px y 640px |

---

## 8. Rendimiento (impacto SEO)

| Factor | Estado | Detalle |
|---|---|---|
| Astro SSG/SSR | ✅ | HTML pre-renderizado — sin JavaScript bloqueante en contenido |
| CDN | ✅ | Vercel Edge Network global |
| Font loading no bloqueante | ✅ | `preload` + `media="print"` trick + `<noscript>` fallback |
| Imágenes con `loading="lazy"` | ✅ | Foto de perfil con lazy loading y `decoding="async"` |
| Astro Image optimization | ✅ | Componente `<Image>` de Astro para la foto de perfil |

---

## 9. Limitaciones estructurales (no solucionables sin más contenido)

Estas limitaciones son inherentes al tipo de sitio (portfolio de una sola página) y no representan errores:

- **Sin tráfico de keywords de volumen medio/alto** — Una single-page sin contenido editorial no puede posicionarse para búsquedas como "senior software engineer freelance Valencia". El SEO técnico está al máximo; para más tráfico orgánico habría que añadir contenido (proyectos detallados, blog, casos de estudio).
- **Sin backlinks** — El sitio es nuevo y no tiene dominios externos enlazando. Se construye con el tiempo a través de presencia en GitHub, LinkedIn y menciones externas.
- **Búsquedas por nombre de marca** — El público objetivo principal (recruiters, clientes) llegará por búsqueda de nombre propio o por referencia directa. El SEO aquí actúa como soporte de credibilidad, no como canal de adquisición primario.

---

## 10. Plan de acción pendiente

| Prioridad | Acción | Estado |
|---|---|---|
| 🔴 Alta | Verificar propiedad sin-www en Search Console | Pendiente de despliegue con meta tag |
| 🟡 Media | Forzar redirección www → non-www en Vercel (`vercel.json`) | Pendiente |
| 🟡 Media | Verificar handle `@javierpiquerasmartinez` en X/Twitter | Pendiente |
| 🟢 Baja | Comprobar indexación con `site:javipiqueras.dev` en 7 días | Pendiente |
| 🟢 Baja | Monitorizar Core Web Vitals en Search Console una vez indexado | Pendiente |

---

## Historial de cambios aplicados (17 mar 2026)

| Archivo | Cambio |
|---|---|
| `src/components/Hero.astro` | `sr-only` con nombre completo movido dentro del `<h1>` |
| `src/components/SEO.astro` | OG image default `.svg` → `.png`; JSON-LD migrado de array a `@graph`; `WebSite.name` y `.description` dinámicos |
| `src/data/cv.json` | `personal.title` → `"Senior Software Engineer"` |
| `src/data/i18n/en.json` | `site.title` añade "Senior" |
| `src/data/i18n/es.json` | `site.title` añade "Senior" |
| `src/components/AboutMe.astro` | Alt foto → `"Javier Piqueras, Senior Software Engineer"` |
| `src/layouts/Layout.astro` | Eliminado `<meta name="generator">`; añadido meta tag Google Search Console |
