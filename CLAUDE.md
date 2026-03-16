# Descripción del proyecto
Portfolio de Javier Piqueras, Ingeniero de Software.

# Propósito del proyecto
El objetivo es crear un portfolio web actualizado con el último y mejor estilo visual relacionado con el mundo de la programación. Clientes pueden entrar y ver mi sitio web.

# Apartados esenciales del sitio web
- Hero: Debe ser un Hero que destaque, simple y que llame la atención del cliente
- About Me: Lugar en que hablo un poco de mi, mis gustos y mi vida.
- Technical Stack: Aquí incluiré algunos "badges" de las principales tecnologías que manejo
- Experience: Mi experiencia profesional previa, descrita de la etapa más reciente a la más antigua.
- Contact: Formulario de contacto.

# Características técnicas
- Astro como framework principal
- TypeScript
- CSS
- NPM
- Vercel

# Metodología de trabajo
Se irá construyendo de forma incremental, paso a paso, para tratar de cometer el mínimo número de errores. Las especificaciones se irán proporcionando poco a poco. No se deben dar más pasos de los indicados.

# Guía de Buenas Prácticas
El nivel de componetización debe ser óptimo. Cualquier recurso que pueda ser reusable deberá ser componetizado y parametrizado para su posterior uso.

# Consideraciones adicionales
- Cualquier contenido no estático (que pueda variar a lo largo del tiempo) estará alojando en archivos json que serán leidos por astro.
- Los archivos JSON residirán en `src/data/`.
- Debe ser multiplataforma y ajustarse completamente el diseño en función del dispositivo.
- Además, el portfolio solamente tendrá una sola página con todas las secciones, accesibles scrolleando o haciendo click en su respectivo anchor.

# Idioma
Será multiidioma, en inglés por defecto pero el usuario podrá cambiar a Español.

## Implementación i18n
- Motor: i18n nativo de Astro (`astro.config.mjs`)
- Locale por defecto: `en` (sin prefijo en la URL → `/`)
- Locale secundario: `es` (con prefijo → `/es/`)
- Archivos de traducción: `src/data/i18n/en.json` y `src/data/i18n/es.json`
- Utilidades: `src/i18n/utils.ts` — expone `getLang(url)` y `useTranslations(lang)`
- Las páginas cargan las traducciones y las pasan a los componentes mediante la prop `t`
- Los componentes no tienen texto hardcodeado; todo texto visible se define en los JSON
- Al añadir una nueva sección: añadir las claves en ambos JSON y pasar `t` al componente

# Estilo visual
- Tema: Dark
- Estilo de referencia: Minimalista — inspirado en Vercel Ship (tipografía grande, dark, espaciado generoso)
- Paleta de colores:
  - Fondo global: `#0a0a0a` (`--color-bg`)
  - Acento principal: `#E8FF47` Electric Lime (`--color-accent`) — usado en CTAs, highlights e interactivos; nunca como fondo de bloques grandes
- Tipografías: **Geist** (cargada desde Google Fonts en el Layout global)

# Secciones opcionales
<!-- Indica si quieres incluir alguna de estas secciones adicionales -->
- [ ] Projects: proyectos destacados con descripción, tecnologías y enlace
- [ ] Blog / Artículos
- [ ] Testimonials / Recomendaciones

# Navegación
- Tipo: Fija en la parte superior (`position: fixed`), glassmorphism al hacer scroll (blur + fondo semitransparente)
- Desktop: links horizontales (Experience · Stack · About · Contact) + selector de idioma a la derecha
- Móvil (≤640px): hamburger button — el menú se despliega a pantalla completa con slide desde la derecha
- Brand: logotipo "JP" a la izquierda, enlaza a `#hero`
- Sección activa resaltada con color acento (`--color-accent`) + underline animado

# Formulario de contacto
<!-- Indica el servicio que usarás para gestionar el envío del formulario -->
- Servicio: <!-- Resend, Formspree, EmailJS, Netlify Forms, etc. -->
- Variables de entorno necesarias: <!-- p.ej. RESEND_API_KEY -->

# Despliegue
- URL: <!-- dominio personalizado o subdominio de Vercel -->
