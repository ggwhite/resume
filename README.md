# Resume

White Chang's resume site: a scroll-driven page where a WebGL stage acts out each story
as you read it (Vue 3 + Vite + three.js), plus a one-page, machine-readable PDF in
English and Traditional Chinese.

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
| `src/data/en.js`, `src/data/zh-tw.js` | All content, one file per language. `site` holds the site's voice (headlines, story steps, scene labels and captions); the rest is the plain record the PDF prints. Keep the two files in sync. |
| `src/data/shared.js` | Contact details, programming skills, open-source repo links and star counts. |
| `src/views/Site.vue` | The interactive site (`/#/` English, `/#/zh-tw` Chinese). Renders data only. |
| `src/components/RepoDemo.vue` | Live demos in the open-source cards: typed terminal, HUD sketch, masking toggle, role loop. |
| `src/styles/site.css` | Site styles: tokens, layout, motion, reduced-motion and no-WebGL fallbacks. |
| `src/gl/scenes.js` | The story scenes: each is a small diagram (nodes + edges) and a looping script that plays the story in the order the text tells it (situation, what went wrong, fix). The hero scene spells the stack in particles. |
| `src/gl/field.js` | The three.js engine: a particle field draws the active scene's diagram and re-forms on every step; packets, projected DOM labels and captions; fits the scene into its DOM slot. |
| `src/gl/portrait.js` | The portrait as a WebGL plane (full-colour photo, slice-in reveal, pointer ripple). |
| `src/views/ResumePdf.vue` | Plain one-page layout for the PDF (`/#/pdf`, `/#/pdf/zh-tw`). |
| `scripts/generate-pdf.py` | Prints the PDF routes with Chromium and checks the result. |
| `scripts/pdf-text.swift` | Extracts a PDF's text with PDFKit (used by the check). |
| `public/portfolio/` | Static portfolio assets, copied to `docs/portfolio/` unchanged. |

### How a story step is wired

```html
<div class="story" data-stage-root data-scene="race">
  <ol class="steps">
    <li class="step" data-scene="race">…text…</li>
  </ol>
  <div class="stage-col"><div class="stage-slot"></div></div>
</div>
```

The engine finds the last `[data-scene]` element above the reading line, switches to
that scene, and fits it into the `.stage-slot` of the nearest `[data-stage-root]`.
To add a story: write the scene in `scenes.js`, add its labels and captions to
`site.scenes.<key>` in both data files, and add a step with `data-scene="<key>"`.

### Motion and fallbacks

- three.js is loaded with a dynamic import after first paint; the text never waits for it.
- `prefers-reduced-motion`: no animation loop. Each scene is drawn once at its final
  state, the portrait is a plain `<img>`, demos show their end state, CSS animation is off.
- No WebGL: three.js is not downloaded and the stage column is hidden; every story is
  complete in text.
- Pixel ratio is capped (2 on desktop, 1.5 on phones) and lowered automatically if the
  frame rate drops below about 42 fps. Phones get 6,000 particles instead of 16,000.
- On narrow screens the stage pins to the top of the viewport and the canvas is
  clipped to it, so particles never run behind body text.
- Rendering pauses while the tab is hidden; demos and the portrait pause off screen.

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
