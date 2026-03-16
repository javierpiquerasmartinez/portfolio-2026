---
name: Hero Section — Current Implementation State
description: Design decisions confirmed and open questions for the Hero section
type: project
---

Current Hero implementation (as of 2026-03-16):
- Full viewport height (100vh), background: #0a0a0a
- Single word "JAVI" centered, font: Geist 800, clamp(5rem, 22vw, 22rem)
- Vertical gradient on text: white (#ffffff) at top fading to rgba(255,255,255,0.35) at bottom
- Letter gap: 0.01em via flex gap
- Staggered entrance animation: alternating slide-from-top / slide-from-bottom per letter
- Stagger: 80ms, duration: 0.8s, easing: cubic-bezier(0.16, 1, 0.3, 1)
- Scroll indicator: 2px vertical line, animated dot, bottom center

**Confirmed copy structure (three-element hierarchy):**
- Element 1: "JAVI" — typographic statement
- Element 2 (subtitle): domain-agnostic senior positioning — see copy below
- Element 3 (availability + CTA): availability signal + "Get in touch" typographic link (href="#contact" placeholder)

**Confirmed subtitle copy (domain-agnostic, senior positioning):**
- EN: "Senior Software Engineer · Building Products That Scale"
- ES: "Ingeniero de Software Senior · Creando Productos que Escalan"
(pending user confirmation of final copy)

**Confirmed layout adjustments:**
- Gap between name and subtitle: ~1rem (existing)
- Gap between subtitle and availability line: ~0.4rem (tighter, to pair them visually)
- Availability line + CTA on same row, centered, with separator between them
- Availability line uses accent color (not yet confirmed)
- CTA is typographic (not a button) — inline link style

**Open design decisions:**
- Accent color (shortlist being presented, not yet chosen)
- Navigation type (fixed top / sidebar / hamburger)
- Typography for body/UI text
- Whether subtitle copy is finalized (awaiting user confirmation)

**Positioning constraint confirmed:**
- Do NOT position Javier as fintech-only. He is a senior engineer capable of any domain/industry.
