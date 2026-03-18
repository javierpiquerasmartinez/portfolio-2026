---
title: "Empezando con Astro: La perspectiva de un desarrollador"
date: 2026-03-18
excerpt: "Astro ha cambiado mi forma de pensar sobre la construcción de sitios estáticos. Esto es lo que aprendí al reconstruir mi portfolio desde cero."
tags: ["Astro", "Web Dev", "Performance"]
draft: false
---

Cuando decidí reconstruir mi portfolio, tenía las opciones habituales: Next.js, Nuxt, HTML puro. Elegí Astro, y fue la decisión correcta.

## ¿Por qué Astro?

Astro envía **cero JavaScript por defecto**. Para un sitio de contenido como un portfolio, ese es el punto de partida correcto. Cada kilobyte de JS que añades debe ganarse su lugar. Astro impone esa disciplina.

La arquitectura de islas permite incluir un componente de React o Svelte donde realmente necesitas interactividad —el formulario de contacto, un contador animado— y mantener todo lo demás como HTML puro. Obtienes la DX de un framework moderno sin pagar por ella de forma universal.

## Content Collections

La funcionalidad que más me impresionó son las Content Collections. Defines un esquema con Zod:

```ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
  }),
});
```

Y Astro valida el frontmatter de tus archivos Markdown en tiempo de compilación. No más typos silenciosos en fechas o campos obligatorios olvidados. La seguridad de tipos se extiende a tus plantillas — `post.data.title` es un string tipado, no `any`.

## i18n Sin Plugin

El enrutamiento i18n nativo de Astro es más sencillo de lo que esperaba. Declaras los idiomas en `astro.config.mjs`, colocas las páginas bajo `/es/` y usas `getLang(url)` para elegir el archivo de traducción correcto. Sin proveedores de contexto, sin sobrecarga en tiempo de ejecución.

El único punto áspero: tienes que ser deliberado con las etiquetas `hreflang` alternativas para SEO. Son unas pocas líneas en tu componente Layout, pero es manual.

## El Output de Compilación

Ejecutar `npm run build` en este portfolio produce páginas HTML pre-renderizadas limpias con CSS crítico incrustado. Las puntuaciones de Lighthouse son consistentemente 100 en todos los ámbitos — no porque las haya ajustado, sino porque los valores predeterminados son sensatos.

## ¿Lo Usaría de Nuevo?

Sí, para cualquier cosa principalmente basada en contenido. Si estás construyendo un dashboard o una SPA compleja, elige otra cosa. Pero para un portfolio, un blog, un sitio de marketing o documentación — Astro es la herramienta más afilada del kit ahora mismo.

El framework no te pelea. Eso es más raro de lo que debería ser.
