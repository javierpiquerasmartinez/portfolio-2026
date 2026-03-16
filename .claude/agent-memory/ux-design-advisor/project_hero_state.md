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
- No subtitle, tagline, scroll cue, or navigation present yet

**Why:** Inspired by Vercel Ship typography — bold, centered, minimal typographic statement.

**Open design decisions (not yet confirmed):**
- Visual style theme (dark confirmed implicitly, style/palette undefined)
- Whether to add supporting text (title, tagline) to Hero
- Navigation type (fixed top / sidebar / hamburger)
- Whether a scroll cue is needed
- Color accent for the palette
- Typography for body/UI text
