# Resume

White Chang's resume site: a scroll-driven WebGL page (Vue 3 + Vite + three.js) plus a
one-page, machine-readable PDF in English and Traditional Chinese.

Live: [https://ggwhite.github.io/resume/](https://ggwhite.github.io/resume/)

## Commands

```bash
npm install
npm run dev      # dev server
npm run build    # production build into docs/ (served by GitHub Pages at /resume/)
npm run preview  # serve the production build locally
npm run pdf      # regenerate both PDFs (see below)
```

## How it is built

| Path | What |
|---|---|
| `src/data/en.js`, `src/data/zh-tw.js` | All resume content, one file per language. Keep the two in sync. |
| `src/data/shared.js` | Contact details, programming skills, open-source repo links and star counts. |
| `src/views/Site.vue` | The interactive site (`/#/` English, `/#/zh-tw` Chinese). Renders data only. |
| `src/styles/site.css` | Site styles: tokens, layout, motion, reduced-motion and no-WebGL fallbacks. |
| `src/gl/field.js` | The three.js scene: one particle field that re-forms for each section as you scroll. |
| `src/gl/shapes.js` | The particle target shapes (spiral, server layers, helix, agent graph, constellation, lattice, rings) and their staging. |
| `src/gl/portrait.js` | The portrait as a WebGL plane (full-colour photo, slice-in reveal, pointer ripple). |
| `src/views/ResumePdf.vue` | Plain one-page layout for the PDF (`/#/pdf`, `/#/pdf/zh-tw`). |
| `scripts/generate-pdf.py` | Prints the PDF routes with Chromium and checks the result. |
| `scripts/pdf-text.swift` | Extracts a PDF's text with PDFKit (used by the check). |
| `public/portfolio/` | Static portfolio assets, copied to `docs/portfolio/` unchanged. |

### Motion and fallbacks

- three.js is loaded with a dynamic import after first paint; the text never waits for it.
- `prefers-reduced-motion`: no animation loop. The field is drawn as a still frame that
  snaps to the current section, the portrait is a plain `<img>`, and CSS animations are off.
- No WebGL: three.js is not downloaded; a CSS gradient background is used instead.
- Pixel ratio is capped (2 on desktop, 1.5 on phones) and lowered automatically if the
  frame rate drops below about 42 fps. Phones get 7,000 particles instead of 18,000.
- Rendering pauses while the tab is hidden; the portrait pauses when scrolled off screen.

## PDF

```bash
npm run pdf
```

Requires Python Playwright (`pip install playwright && playwright install chromium`).
The script starts its own dev server, writes
`public/WhiteChang-Resume.{en,zh-tw}.pdf`, and copies them to `docs/`. It fails when:

- a PDF is not exactly one page, or
- (macOS) the text extracted with PDFKit does not match the page text in the same
  order, or a Latin word comes out split.

The PDF layout is a single column in DOM order with system fonts, no letter-spacing and
no kerning, so ATS parsers read it cleanly. The Chinese PDF uses Heiti TC: with
PingFang TC, Chromium writes the text layer out of order.

To check a PDF by hand:

```bash
swift scripts/pdf-text.swift public/WhiteChang-Resume.en.pdf
```

## Deploy

GitHub Pages serves `docs/` from `master` at the base path `/resume/`.

```bash
npm run pdf      # only when resume content changed
npm run build
git add docs public && git commit
```
