---
title: "Taller: Corrige un Issue de GitHub con un Agente Remoto — Sin Abrir el Editor"
date: 2026-03-18
excerpt: "Una guía práctica para asignar un issue de GitHub a un agente de IA remoto, dejar que planifique y escriba la corrección, y fusionar la pull request resultante — todo desde el navegador."
tags: ["AI", "Agentes", "GitHub", "Flujo de Trabajo", "Tutorial", "GH Actions"]
draft: false
---

En el [artículo anterior](/blog/ai-agents-in-development) hablamos sobre qué son realmente los agentes, en qué se diferencian del chat y dónde viven. Ahora es momento de ponernos manos a la obra.

Este es un taller. Al final habrás asignado un issue real de GitHub a un agente de IA remoto, habrás visto cómo planifica y escribe la corrección, y habrás revisado la pull request que abrió — sin tocar el terminal ni el editor ni una sola vez.

---

## Qué Vamos a Construir

Un flujo de trabajo que se parece a esto:

1. Detectas un bug o abres un issue en GitHub.
2. Lo asignas a un agente de IA desde el navegador.
3. El agente lee el repositorio, entiende el problema y escribe la corrección.
4. Aparece una pull request. Tú la revisas y fusionas.

Eso es todo. Sin `git clone`. Sin entorno local. Sin editor abierto.

---

## 1. ¿Qué Son los Agentes Remotos?

Cuando la gente habla de agentes de IA generalmente imagina algo que corre en su máquina — el plugin del IDE que sugiere código, la herramienta de línea de comandos que ejecuta instrucciones en tu terminal. Estos son **agentes locales**: viven en tu entorno de desarrollo y actúan en tu nombre desde ahí.

Los **agentes remotos** son distintos. Corren en un entorno alojado y gestionado por el proveedor de IA. En lugar de tu máquina, trabajan dentro de un entorno cloud en sandbox que tiene acceso a tu repositorio (y a las demás herramientas que le concedas). Interactúas con ellos a través de una interfaz web, una API o — como veremos — asignando un issue de GitHub.

La distinción importa por varias razones:

| | Agente local | Agente remoto |
|---|---|---|
| Dónde corre | Tu máquina | Cloud del proveedor |
| Necesita tu portátil encendido | Sí | No |
| Acceso a archivos/entorno local | Sí | Solo lo que le concedas |
| Ideal para | Codificación interactiva, refactorización, exploración compleja | Tareas asíncronas, corrección de bugs, PRs mientras estás fuera |
| Ejemplos | Claude Code, Cursor, Copilot | Claude.ai (Projects + integración GitHub) |

Los agentes remotos no son un reemplazo de los locales — son un complemento. Para tareas discretas y bien delimitadas como corregir un bug descrito en un issue, brillan: delegas, te vas, y vuelves con una PR.

---

## 2. Requisitos Previos

Antes de empezar, asegúrate de tener:

**Una API key de Anthropic.** El GitHub Action llama a Claude directamente a través de la API. Puedes obtener una en [console.anthropic.com](https://console.anthropic.com). El uso de la API se factura de forma independiente a cualquier suscripción de Claude.ai.

**Una cuenta de GitHub con un repositorio.** Necesitas ser el **propietario o admin** del repo — vas a instalar una GitHub App y añadir secrets al repositorio.

**Un issue de GitHub para corregir.** Puede ser un bug existente o uno que crees específicamente para este ejercicio. En la sección 4 cubriremos qué hace una buena descripción de issue.

Eso es todo. No se requiere ninguna herramienta local durante la corrección en sí — aunque necesitaremos Claude Code brevemente para la configuración inicial.

---

## 3. Configurar la Integración con GitHub

Esta configuración se hace una sola vez por repositorio. Una vez lista, puedes lanzar a Claude sobre cualquier issue con un simple comentario.

### Paso 3.1 — Instala la GitHub App de Claude

Ve a [github.com/apps/claude](https://github.com/apps/claude) e instala la app en tu repositorio. La app solicita tres permisos:

- **Contents**: lectura y escritura (para editar archivos y hacer commits)
- **Issues**: lectura y escritura (para leer descripciones de issues y publicar comentarios)
- **Pull requests**: lectura y escritura (para abrir PRs)

<!-- CAPTURA: página de instalación de la GitHub App de Claude -->

Selecciona el repositorio concreto que quieras usar — no hace falta conceder acceso a todos tus repos.

### Paso 3.2 — Añade tu API key a los secrets del repositorio

En tu repositorio, ve a **Settings → Secrets and variables → Actions** y crea un nuevo secret:

- **Nombre**: `ANTHROPIC_API_KEY`
- **Valor**: tu API key de [console.anthropic.com](https://console.anthropic.com)

<!-- CAPTURA: pantalla de secrets en GitHub con ANTHROPIC_API_KEY añadida -->

### Paso 3.3 — Añade el archivo de workflow

Crea el archivo `.github/workflows/claude.yml` en tu repositorio con este contenido:

```yaml
name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]

permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write

jobs:
  claude:
    if: github.event.comment.user.type != 'Bot'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Este workflow se activa en tres situaciones: cuando alguien comenta en un issue o PR, y cuando un issue se abre o asigna. Claude solo actúa cuando detecta una mención `@claude` — así que añadir este archivo no disparará nada hasta que se lo pidas.

Haz commit del archivo directamente a tu rama principal. La configuración está lista.

---

## 4. Crear un Buen Issue y Asignar el Agente

Un agente remoto lee tu issue igual que lo haría un nuevo miembro del equipo: en frío, sin contexto previo. La calidad del issue determina directamente la calidad de la corrección.

### Qué hace un buen issue para un agente

Un issue útil para un agente remoto tiene tres cosas:

**1. Una descripción clara del problema** — no solo "el botón no funciona" sino qué pasa, cuándo pasa y qué se esperaba en cambio.

**2. Pasos para reproducir** (si es un bug) — el agente no puede ejecutar la app de forma interactiva, pero tener los pasos de reproducción escritos le ayuda a trazar el flujo de código.

**3. Criterios de aceptación** — una o dos líneas describiendo cómo luce la corrección. Esto le da al agente un objetivo contra el que validar.

Ejemplo de un issue bien escrito:

```
Título: El enlace de la navbar a #contact se desplaza más allá de la sección en móvil

**Qué ocurre:**
En pantallas de menos de 640px, al hacer clic en el enlace "Contact" de la navbar
la página se desplaza pero aterriza unos 80px por encima del encabezado de la sección.

**Lo esperado:**
El encabezado de la sección debería quedar visible en la parte superior del viewport
tras el desplazamiento.

**Causa probable:**
La altura de la navbar fija no se tiene en cuenta en el offset de scroll en móvil.
La versión de escritorio funciona correctamente.

**Criterios de aceptación:**
- Al hacer clic en el enlace de Contact en móvil (≤640px) el encabezado de la sección
  queda correctamente posicionado bajo la navbar.
- El comportamiento en escritorio no cambia.
```

### Lanzar el agente desde GitHub

Con el workflow en su sitio, lanzar a Claude es tan sencillo como dejar un comentario en el issue. Menciona `@claude` y describe lo que quieres:

> `@claude fix this issue`

O sé más específico:

> `@claude el offset de scroll en móvil no tiene en cuenta la altura de la navbar fija. Corrígelo y asegúrate de que el comportamiento en escritorio no cambie.`

![Issue de GitHub con comentario @claude fix this issue](/blog/remote-agents-github-workshop/step-05-claude-reaction.png)

GitHub Actions lo detectará de inmediato y el agente comenzará a trabajar. Verás un nuevo workflow ejecutándose en la pestaña **Actions** de tu repositorio — primero en cola, luego en progreso.

![Workflow de GitHub Actions ejecutado con éxito](/blog/remote-agents-github-workshop/step-06-actions-success.png)

Cuanto más contexto incluyas en el comentario `@claude`, mejor — especialmente si la descripción del issue es escueta.

---

## 5. El Agente en Acción

Una vez lanzado, el agente sigue un ciclo predecible: **entender → planificar → actuar → hacer commit**.

### Qué ocurre internamente

1. **Lee el issue** — título, descripción y todos los comentarios.
2. **Explora el repositorio** — navega por el árbol de archivos, lee los archivos relevantes y construye un modelo mental del código.
3. **Planifica la corrección** — razona sobre el enfoque antes de escribir ningún código.
4. **Escribe el código** — realiza ediciones dirigidas en los archivos identificados en el plan.
5. **Hace commit en una rama nueva** — la rama se nombra automáticamente (p. ej. `claude/issue-2-20260318-1250`).

Cuando termina, Claude publica un comentario resumen en el issue con los pasos que siguió, qué cambió y un enlace **Create PR**.

![Comentario resumen de Claude en el issue tras completar la corrección](/blog/remote-agents-github-workshop/step-07-claude-comment.png)

En este caso Claude identificó que `.hero__title` se renderizaba como elemento de bloque sin alineación de texto explícita, haciendo que el texto cayera al valor por defecto del navegador (izquierda) en móvil. Añadió una única declaración `text-align: center`. Limpio y delimitado.

### Una nota sobre el paso Create PR

En la configuración por defecto, Claude prepara la rama y el commit pero deja la creación final de la PR en tus manos. Es intencional — tú mantienes el control sobre qué se propone para revisión. Haz clic en **Create PR →** en el comentario y GitHub rellena el título y la descripción automáticamente.

---

## 6. Revisar la Pull Request

Una vez creada, la PR tiene el mismo aspecto que cualquier otra en tu repositorio.

![Lista de pull requests mostrando la corrección abierta por Claude](/blog/remote-agents-github-workshop/step-08-pr-created.png)

### Qué buscar

**La descripción** — Claude escribe una descripción clara: cuál era el problema, qué cambió y por qué. Si la descripción es vaga, mira el diff con más cuidado.

**El diff** — ¿está el cambio limitado al problema? Aquí es una línea en un archivo — exactamente lo que se pidió.

![Diff de la PR mostrando text-align: center añadido a .hero__title](/blog/remote-agents-github-workshop/step-09-pr-diff.png)

**Tests** — si tu proyecto tiene tests, comprueba si el agente los añadió o actualizó. Si no lo hizo, considera añadirlos antes de fusionar.

### Antes de fusionar

Repasa esta lista rápida:

- [ ] La descripción de la PR coincide con lo que se pedía en el issue
- [ ] El diff está limitado — no hay cambios no relacionados
- [ ] La corrección parece correcta con una lectura rápida
- [ ] La CI pasa (si la tienes configurada)
- [ ] Estás contento de poner tu nombre en ella

Si todo parece bien, fusiona. Si quieres cambios, deja un comentario de revisión en la PR — el agente puede recoger el feedback y hacer un nuevo commit.

![Pull request fusionada y cerrada con éxito](/blog/remote-agents-github-workshop/step-10-merged.png)

---

## 7. Conclusión

¿Qué hemos hecho?

Hemos pasado de un issue de GitHub a una corrección fusionada sin abrir el editor, sin clonar el repo y sin ejecutar un solo comando localmente. El agente leyó el código, entendió el problema, escribió una corrección delimitada y nos la entregó para revisión.

Esto no es magia. El agente hizo los mismos movimientos que haría un desarrollador — solo que más rápido y sin necesitar un entorno local. Tu trabajo cambió de *escribir la corrección* a *revisar la corrección*. Es un cambio significativo.

### ¿Cuándo tiene sentido este enfoque?

Los agentes remotos funcionan mejor para tareas que son:

- **Bien delimitadas** — un solo bug, una pequeña refactorización, una funcionalidad concreta con criterios de aceptación claros
- **Autocontenidas** — la corrección no requiere entender meses de contexto que no está escrito en ningún sitio
- **Revisables** — tienes el conocimiento para evaluar el resultado

Son menos adecuados para trabajo exploratorio ("mejora el rendimiento"), tareas que requieren interacción en vivo con la app en ejecución, o cualquier cosa en la que los requisitos aún se están definiendo.

Para eso, los agentes locales — o simplemente escribir el código tú mismo — siguen siendo la herramienta correcta.

---

*Este es el tercer artículo de una serie sobre trabajo con agentes de IA. Puedes leer las entradas anteriores: [Desarrollo Impulsado por IA](/blog/ai-driven-development) y [Agentes de IA en el Desarrollo](/blog/ai-agents-in-development).*
