---
title: "Agentes de IA en el desarrollo: construye tu equipo de IA"
date: 2026-03-18
excerpt: "Los agentes no son chatbots más rápidos. Son una forma de trabajar fundamentalmente distinta — más parecida a delegar en un compañero de equipo que a hacer una pregunta. Así es como usarlos bien."
tags: ["IA", "Agentes", "Productividad", "Herramientas"]
draft: false
---

En un [artículo anterior](/blog/ai-driven-development) establecimos el panorama: modelos, editores, herramientas y la mentalidad del desarrollador como copiloto. Ese post trataba sobre *qué existe*. Este trata sobre qué ocurre cuando empujas ese paradigma más lejos — cuando la IA deja de ser un motor de sugerencias y se convierte en algo más parecido a un colaborador.

Ese cambio tiene nombre: agentes.

## Qué es un agente

La palabra se usa de forma laxa. Seamos precisos.

Una **interacción estándar con IA** es un único viaje de ida y vuelta: envías un mensaje con algo de contexto, el modelo responde, el intercambio termina. El modelo no tiene memoria de la conversación más allá de lo que has incluido, no tiene capacidad de tomar acciones, y no hay forma de verificar si su respuesta era correcta. Es un autocompletado muy sofisticado.

Un **agente** es un bucle. Recibe un objetivo, razona sobre qué pasos son necesarios para alcanzarlo, ejecuta esos pasos usando herramientas disponibles, observa los resultados y decide qué hacer a continuación — repitiendo hasta que el objetivo se cumple o determina que no puede continuar. La palabra clave es *bucle*: el agente actúa, observa y se adapta.

Concretamente, un agente tiene cuatro componentes:

- **Un modelo** — el motor de razonamiento que decide qué hacer en cada paso
- **Herramientas** — capacidades que puede invocar: leer un archivo, escribir un archivo, ejecutar un comando en terminal, buscar en la web, llamar a una API
- **Memoria** — el contexto acumulado de lo que ha hecho y observado hasta ahora en la tarea actual
- **Una condición de terminación** — el objetivo se cumple, el agente llega a un punto muerto, o un humano interviene

El agente no solo responde a la pregunta "¿cómo corrijo este bug?" — lee el test fallido, encuentra el código relevante, escribe el fix, ejecuta el test, comprueba si pasa, e itera si no. Eso es algo cualitativamente distinto.

## La diferencia real con el chat

La distinción no es solo de potencia. Es de la forma del trabajo.

Cuando usas un chat o herramienta inline, **tú eres la capa de ejecución**. La IA piensa, tú actúas. Copias la sugerencia, la pegas, ejecutas el comando, observas el resultado, pegas el resultado de vuelta, haces una pregunta de seguimiento. Cada paso requiere tu atención y tus manos. El output de la IA siempre es consultivo.

Cuando usas un agente, **el agente es la capa de ejecución**. Tú defines el objetivo, el agente actúa. Escribe los archivos, ejecuta los comandos, lee el output, decide qué hacer a continuación. Tu rol pasa de operador a supervisor: defines la tarea, revisas el plan, apruebas o rediriges, y evalúas el resultado.

Esto tiene implicaciones profundas para el tipo de trabajo que delegas:

| | Chat / Inline | Agente |
|---|---|---|
| Input | Pregunta o prompt corto | Objetivo o descripción de tarea |
| Output | Una sugerencia que tú aplicas | Cambios ya aplicados |
| Iteración | Tú diriges cada paso | El agente dirige, tú revisas |
| Alcance | Un archivo, una función | Multi-archivo, multi-paso |
| Mejor para | Cambios rápidos y aislados | Tareas complejas y secuenciales |

La consecuencia práctica: los agentes no son una versión mejorada del chat. Son una herramienta distinta para un trabajo distinto. Usar un agente para generar una línea de código es un desperdicio. Usar el chat para refactorizar un módulo en doce archivos es un suplicio. Ajusta la herramienta a la tarea.

## Dónde viven y dónde actúan los agentes

Esto es menos obvio de lo que parece, y entenderlo cambia cómo piensas sobre lo que un agente puede hacer.

**Los agentes se ejecutan en la máquina que corre la herramienta — pero razonan en remoto.** Claude Code se ejecuta en tu terminal, en tu máquina, con acceso a tu sistema de archivos, tus variables de entorno, tu historial de git local, y cualquier comando que tu shell pueda ejecutar. La ejecución es local. El razonamiento no.

Cada vez que el agente decide qué hacer a continuación, envía el contexto acumulado — archivos que ha leído, output del terminal, historial de la tarea — a los servidores del proveedor del modelo. El modelo procesa ese contexto y devuelve la siguiente acción. Luego la herramienta ejecuta esa acción localmente, observa el resultado, y lo envía todo de vuelta. Es un bucle constante: ejecución local → razonamiento remoto → ejecución local.

Esto tiene implicaciones prácticas que conviene tener presentes:
- **Necesitas conexión a internet** para que el agente funcione — el modelo nunca se ejecuta en tu máquina.
- **Tu código sale de tu máquina** en cada paso de razonamiento. El contenido de los archivos que el agente lee se envía a los servidores del proveedor. Para equipos con codebases sensibles o requisitos estrictos de residencia de datos, esto importa — revisa las políticas de tratamiento de datos de tu proveedor.
- **La latencia se acumula.** Cada paso del bucle incluye un viaje de ida y vuelta por red al modelo. Las tareas agénticas largas pueden tardar significativamente más tiempo real del que su complejidad sugeriría.

Esto significa que un agente local puede:
- Leer y escribir cualquier archivo de tu proyecto
- Ejecutar comandos de shell (ejecutar tests, compilar, arrancar servidores, llamar a CLIs)
- Interactuar con tu sistema de control de versiones
- Acceder a variables de entorno y credenciales locales
- Llamar a APIs externas a las que tu máquina tiene acceso

Los agentes en la nube (como Copilot Workspace o los agentes cloud de Antigravity) funcionan de forma distinta: normalmente trabajan sobre un clon remoto de tu repositorio, tienen acceso a automatización de navegador, y pueden ejecutarse en entornos aislados. Más aislados, pero más escalables — útiles para tareas que quieres ejecutar de forma asíncrona sin bloquear tu máquina.

La diferencia práctica: **los agentes locales actúan directamente sobre tu estado de trabajo**; **los agentes en la nube actúan sobre una copia y proponen cambios para que tú revises y fusiones**.

## Quién orquesta: ¿el modelo o la herramienta?

Una pregunta que merece una respuesta clara, porque afecta a cómo entiendes el comportamiento de los agentes.

En la mayoría de sistemas agénticos, **el modelo hace el razonamiento y la herramienta proporciona el entorno de ejecución**. El modelo decide qué hacer en cada paso — qué archivo leer, qué comando ejecutar, cómo interpretar el output. La herramienta (Claude Code, Cursor, Antigravity) proporciona la infraestructura: el acceso al sistema de archivos, el terminal, el navegador, la capa de permisos.

Pero la orquestación — la decisión de *qué paso viene a continuación* — reside principalmente en el modelo. Cuando Claude Code decide ejecutar el test fallido antes de intentar el fix, es el modelo razonando sobre estrategia, no la herramienta prescribiendo un flujo de trabajo.

Algunas herramientas añaden una capa de orquestación explícita encima:

- **El Agent Manager de Antigravity** te permite definir múltiples agentes con tareas y modelos separados, y gestiona su ejecución en paralelo, dependencias y entrega de artefactos. La *herramienta* coordina; cada *modelo* individual razona dentro de su alcance asignado.
- **Los frameworks multi-agente** (como las funcionalidades multi-agente de la API de Claude) permiten que una instancia de modelo lance y dirija otras instancias de modelo, creando jerarquías donde un agente "manager" descompone un objetivo y delega subtareas.

El matiz: en sistemas de un solo agente, el modelo se orquesta a sí mismo. En sistemas multi-agente, o la herramienta o un modelo orquestador designado coordina al resto. Saber cuál es cuál ayuda a depurar comportamiento inesperado — si un agente toma decisiones estratégicas pobres, ajustas el prompt o el modelo; si la coordinación entre agentes falla, miras la capa de orquestación.

## Las herramientas que habilitan agentes

No toda herramienta de IA es agéntica. Aquí es donde viven realmente los agentes:

**Claude Code** es el ejemplo más puro de herramienta agéntica local. Opera a nivel de repositorio, tiene acceso completo al sistema de archivos y al terminal, y está diseñado explícitamente para tareas autónomas multi-paso. Le das un objetivo; trabaja hasta terminar o bloquearse.

**GitHub Copilot Agent Mode** (disponible en VS Code) extiende Copilot desde sugerencias inline hasta ejecución autónoma de tareas. Puede leer múltiples archivos, ejecutar comandos de terminal e iterar sobre su output. Menos autónomo que Claude Code por defecto, pero profundamente integrado en el flujo de trabajo de VS Code.

**Cursor Composer** es el modo agente multi-archivo de Cursor. Indexa tu codebase y puede hacer cambios coordinados en muchos archivos en una sola operación. Más acotado que Claude Code — no ejecuta comandos de shell arbitrarios por defecto — pero la conciencia del codebase es excelente.

**Antigravity Agent Manager** es la interfaz multi-agente más explícita disponible en un editor. Lanzas agentes con nombre, les asignas modelos y tareas, trabajan en paralelo, y producen artefactos revisables en cada paso. Diseñado explícitamente para delegación a escala.

**Agentes personalizados via API** — Anthropic, OpenAI y Google exponen APIs que te permiten construir agentes programáticamente: defines las herramientas, el system prompt, la lógica del bucle. Aquí es donde los equipos construyen agentes específicos de dominio adaptados a su stack, convenciones y flujos de trabajo.

## Agentes como equipo de desarrollo

Aquí es donde la metodología importa.

El instinto al usar un agente por primera vez es darle todo y pedirle todo. "Refactoriza todo este codebase para usar la nueva API." Ese instinto está equivocado — no porque los agentes no puedan manejar tareas grandes, sino porque *tú no puedes revisar outputs grandes de forma efectiva*, y los agentes cometen errores que se multiplican sin supervisión.

El modelo mental correcto: **trata a los agentes como tratarías a junior developers en un equipo**. No le darías a un junior una tarea vaga de diez días y desaparecerías. Lo dividirías, asignarías piezas específicas, revisarías en puntos de control, y corregirías el rumbo pronto.

Aplica la misma disciplina:

**Descompón antes de delegar.** Antes de lanzar un agente, dedica cinco minutos a dividir la tarea en pasos discretos y verificables. "Migrar el módulo de autenticación al nuevo formato de token" se convierte en: (1) identificar todos los puntos de uso del formato antiguo, (2) actualizar la lógica de generación de tokens, (3) actualizar la lógica de validación, (4) actualizar los tests. Cuatro tareas de agente enfocadas, cada una revisable, en lugar de una opaca.

**Un agente, una responsabilidad.** Un agente al que también se le pide refactorizar la capa de base de datos mientras actualiza la API mientras corrige los tests tomará decisiones transversales que no autorizaste. Mantén el alcance acotado. Si necesitas trabajo en paralelo en partes independientes del codebase, usa múltiples agentes — no un agente con un brief disperso.

**Define "terminado".** Dile al agente cómo es el éxito: "los tests deben pasar", "el compilador de TypeScript debe producir cero errores", "el endpoint debe devolver X dado el input Y". Los agentes con una condición de aceptación concreta saben cuándo parar; los agentes sin ella tienden a sobreingeniería o a bucles indefinidos.

## Cómo darles contexto y acotar su trabajo

Un agente es tan bueno como el contexto que le das. Aquí es donde la mayoría de personas invierte poco.

**Archivos de contexto a nivel de proyecto.** Herramientas como Claude Code leen un archivo `CLAUDE.md` en la raíz de tu repositorio. Pon ahí tu resumen de arquitectura, convenciones de nombres, patrones de test y áreas prohibidas. El agente lo lee antes de cada sesión. El sistema `/rules` de Cursor funciona igual. Esto es el equivalente al handbook de ingeniería de tu equipo — escríbelo una vez, cada sesión de agente se beneficia.

**Acceso a archivos acotado.** No dejes que un agente deambule libremente si la tarea no lo requiere. Especifica qué directorios o archivos están en scope. "Solo modifica archivos bajo `src/auth/`" evita que el agente haga cambios bien intencionados en otros lugares que rompan cosas no relacionadas.

**Restricciones explícitas.** Dile al agente qué *no* hacer. "No cambies la superficie de la API pública", "no instales nuevas dependencias", "no modifiques archivos de migración". Los agentes son entusiastas — sin restricciones, a menudo harán más de lo que pediste, y más no siempre es mejor.

**MCP (Model Context Protocol).** Un estándar creciente que permite a los agentes conectarse a fuentes de datos externas — el esquema de tu base de datos, la documentación de tu API, tu wiki interna, tu gestor de incidencias. En lugar de pegar contexto en el prompt, configuras un servidor MCP y el agente extrae información relevante bajo demanda. Claude Code, Cursor y Antigravity soportan MCP. Para equipos, esta es la inversión de mayor impacto en calidad de agentes: contexto estructurado y siempre actualizado en lugar de preámbulos de prompt mantenidos manualmente.

## Interacción entre agentes

Los agentes individuales son potentes. Los sistemas multi-agente son donde las cosas se vuelven genuinamente interesantes — y genuinamente complejos.

El patrón básico es **orquestador + trabajadores**: un agente recibe el objetivo de alto nivel, lo descompone en subtareas y delega cada subtarea a un agente trabajador especializado. El orquestador recoge resultados, comprueba conflictos y ensambla el output final.

Algunos patrones que aparecen repetidamente en la práctica:

**Pipeline secuencial.** El Agente A produce un output; el Agente B toma ese output como input. Ejemplo: un agente investigador lee documentación y produce un resumen estructurado, luego un agente programador usa ese resumen para implementar la integración. Sin ejecución en paralelo, pero con entregas claras.

**Especialización en paralelo.** Múltiples agentes trabajan simultáneamente en partes independientes de la misma tarea. Ejemplo: tres agentes abordan cada uno un módulo diferente en una refactorización del codebase, luego un agente revisor comprueba la consistencia entre sus outputs antes de que nada se fusione.

**Patrón crítico.** Un agente produce un output; un segundo agente tiene la tarea específica de encontrar problemas en él. El output del crítico vuelve al primer agente para revisión. Esto es un bucle de revisión de código programable — útil para detectar problemas antes de que lleguen a un revisor humano.

**Roles especializados.** En lugar de un agente que lo hace todo, mantienes un equipo: un agente "investigador" con acceso al navegador y sin permisos de escritura, un agente "programador" con acceso de escritura a archivos pero sin navegador, un agente "tester" que solo ejecuta comandos y lee output. Cada agente tiene un system prompt y un conjunto de herramientas adaptados a su rol. Enrutas las tareas al especialista correcto.

El modo de fallo en sistemas multi-agente son los errores en cascada: el Agente A produce un error sutil, el Agente B construye sobre él, el Agente C construye sobre el output del Agente B, y cuando revisas, el error está profundamente embebido. La mitigación son **artefactos revisables en cada entrega** — no dejes que los agentes se pasen outputs brutos entre sí sin un punto de control humano en los límites significativos.

## Ejemplos prácticos

**Ejemplo 1: Corrección autónoma de un bug.**
Tienes un pipeline de CI fallando. Abres Claude Code y dices: "El test `auth.spec.ts:47` está fallando. Encuentra la causa raíz, corrígela, confirma que el test pasa y verifica que no hayan roto otros tests." El agente lee el test, traza el fallo hasta una condición de carrera en la lógica de refresco de tokens, escribe el fix, ejecuta la suite de tests, confirma el fix y reporta. Tú revisas el diff. Tiempo humano total: leer el output y aprobar.

**Ejemplo 2: Integración de API con pipeline.**
Necesitas integrar una API de pagos de terceros. Configuras dos agentes en Antigravity: Agente 1 (investigador, Gemini 2.5 Pro, acceso al navegador) lee la documentación de la API y produce una especificación de integración estructurada. Agente 2 (programador, Claude Sonnet, acceso de escritura a archivos) toma la especificación e implementa el cliente, el manejo de errores y los tests. Revisas la especificación del Agente 1 antes de que el Agente 2 empiece — detectando malentendidos pronto, antes de que se conviertan en código.

**Ejemplo 3: Refactorización de todo el codebase.**
Estás migrando de una librería interna deprecada a su reemplazo. Ejecutas Claude Code con: "Encuentra cada importación de `@internal/old-lib`, entiende cómo funciona cada uso y reemplázala con el equivalente de `@internal/new-lib`. No cambies el comportamiento, solo la superficie de importación. Ejecuta los tests después de cada archivo para confirmar." El agente trabaja archivo por archivo, ejecutando tests entre cada cambio. Obtienes un commit por archivo, cada uno revisable de forma independiente.

**Ejemplo 4: Documentación viva.**
Configuras un agente de documentación que se ejecuta de forma programada (o disparado por CI): lee el codebase actual, lo compara con la documentación existente, identifica lagunas o secciones desactualizadas, y abre una PR con actualizaciones propuestas. Ningún humano escribe el borrador de la documentación — un humano revisa y aprueba. El agente tiene alcance de solo lectura; no puede modificar el código fuente.

**Ejemplo 5: Revisor de código especializado.**
Antes de abrir una PR, ejecutas un agente revisor: "Lee el diff en la rama actual contra main. Identifica posibles bugs, casos borde ausentes y violaciones de los patrones definidos en CLAUDE.md. No sugieras cambios de estilo — enfócate solo en corrección y consistencia." El agente produce una revisión estructurada. Abordas sus hallazgos antes de que el código llegue a un revisor humano. La calidad de tu PR sube; el tiempo de revisión de tus compañeros baja.

## El cambio de mentalidad

Trabajar de forma efectiva con agentes requiere desaprender algunos hábitos de la era del chat.

Dejas de pensar en prompts y empiezas a pensar en tareas. Dejas de esperar output inmediato y empiezas a esperar resultados asíncronos que revisas. Dejas de ser la capa de ejecución y empiezas a ser la capa de arquitectura — el que decide qué se construye, en qué orden, con qué restricciones, y si el resultado es aceptable.

La disciplina está en el scope. Los agentes son suficientemente potentes como para que una tarea mal definida cause daño real — archivos sobreescritos, lógica cambiada de formas que no pretendías, dependencias añadidas sin revisión. Los desarrolladores que sacan más partido de los agentes son los que invierten en el brief: objetivos claros, restricciones explícitas, criterios de aceptación definidos y puntos de control revisables.

No es una habilidad distinta a la buena ingeniería. Es la misma habilidad, aplicada un nivel más arriba.
