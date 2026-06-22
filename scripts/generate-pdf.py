#!/usr/bin/env python3
"""Generate resume PDFs using Playwright.

Usage:
    python scripts/generate-pdf.py          # needs dev server running
    python scripts/generate-pdf.py --port 5173
"""
import argparse
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

LOCALES = {
    "en": {"route": "/#/pdf", "filename": "WhiteChang-Resume.en.pdf"},
    "zh-tw": {"route": "/#/pdf/zh-tw", "filename": "WhiteChang-Resume.zh-tw.pdf"},
}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8203)
    args = parser.parse_args()

    base = f"http://localhost:{args.port}"
    out_dir = Path(__file__).resolve().parent.parent / "public"

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 800, "height": 600})

        for locale, cfg in LOCALES.items():
            url = f"{base}{cfg['route']}"
            out_path = out_dir / cfg["filename"]

            print(f"  {locale}: {url} -> {out_path.name} ... ", end="", flush=True)

            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(1000)
            page.evaluate('document.querySelector("nav").style.display = "none"')
            page.wait_for_timeout(200)

            page.pdf(
                path=str(out_path),
                format="A4",
                margin={"top": "8mm", "bottom": "8mm", "left": "10mm", "right": "10mm"},
                print_background=True,
            )

            with open(out_path, "rb") as f:
                content = f.read()
                pages = content.count(b"/Type /Page") - content.count(b"/Type /Pages")

            size_kb = out_path.stat().st_size / 1024
            print(f"{pages} page, {size_kb:.0f} KB")

            if pages > 1:
                print(f"  WARNING: {locale} PDF is {pages} pages, expected 1", file=sys.stderr)

        browser.close()
        print("done")

if __name__ == "__main__":
    main()
