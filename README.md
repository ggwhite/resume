# Resume

White Chang's web resume, built with Vue 3 + Vite + Tailwind CSS.

Live: [https://ggwhite.github.io/resume/](https://ggwhite.github.io/resume/)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build    # output to docs/
```

## Generate PDF

Requires [Playwright](https://playwright.dev/python/) (Python).

```bash
npm run dev &                                    # start dev server
python scripts/generate-pdf.py --port <port>     # generate PDFs to public/
```

## Deploy

GitHub Pages serves from `master` branch `/docs` directory.

```bash
npm run build
git add docs/
git commit && git push
```

## Tech Stack

- Vue 3 + Vite
- Tailwind CSS v3
- vue-router 4 (hash mode)
- @lucide/vue (icons)
- Playwright (PDF generation)
