---
name: About Me Section — Design Recommendation
description: Layout, photo treatment, text structure, animation, and mobile behavior decisions for the About Me section
type: project
---

Recommended design direction for the About Me section (pending user confirmation):

**Layout:** Two-column — text left (60%), photo right (40%). Left-aligns with the rest of the section reading direction. Photo bleeds into the right edge at desktop.

**Photo treatment:** Natural bleed (no border, no glow). Max-height ~500px, object-fit: cover, anchored to top. The grayscale/outline effect already provides visual separation.

**Text structure (three-element):**
1. SectionHeading component (label + number, consistent with Experience/Stack)
2. Humanized bio — NOT the cv.json "about" field verbatim. The CV copy is a LinkedIn/job-board summary. The About section needs warmer, first-person prose written around: passion for craft, where he's been, what he cares about beyond credentials.
3. A 3-item "quick facts" row using accent color for labels: languages spoken, location, education level — scannable metadata that rounds out the person.

**Copy direction:** Needs a new, warmer bio written separately from cv.json. Suggest storing it in a dedicated `about.bio` key in the i18n JSON files (not in cv.json) so EN and ES versions can diverge naturally.

**Animation:** Same IntersectionObserver fade-up pattern as Experience entries. Photo animates with a slight horizontal slide-in from the right (translateX(1.5rem)) rather than vertical, to feel distinct from text.

**Mobile:** Stack vertically — photo moves to top, text below. Photo on mobile: full width, constrained to ~280px height, object-position: top to keep face visible.

**Why:** About Me is placed last before Contact, functioning as an emotional closer. The visitor has already seen credentials. The section should humanize, not repeat the resume. The photo's grayscale treatment already matches the aesthetic; the two-column layout gives it editorial weight without competing with the text.

**How to apply:** When implementing, do not use cv.json `about` as the bio text. Create `about.bio` key in both i18n JSON files with warmer copy. Section number will be 04 (Hero=01, Experience=02, Stack=03, About=04).
