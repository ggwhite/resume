#!/usr/bin/env python3
"""Regenerate the one-page resume PDFs.

    npm run pdf

Starts its own Vite dev server, prints /#/pdf and /#/pdf/zh-tw with Chromium
(Playwright), writes public/WhiteChang-Resume.{en,zh-tw}.pdf and mirrors them to
docs/. Fails if a PDF is not exactly one page, or (macOS, via PDFKit and
scripts/pdf-text.swift) if the extracted text differs from the page text, is out
of reading order, or has a split word.

Requires: pip install playwright && playwright install chromium
"""
import re
import shutil
import socket
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
LOCALES = {
    "en": {"route": "/#/pdf", "filename": "WhiteChang-Resume.en.pdf"},
    "zh-tw": {"route": "/#/pdf/zh-tw", "filename": "WhiteChang-Resume.zh-tw.pdf"},
}


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def wait_for(url, timeout=30):
    end = time.time() + timeout
    while time.time() < end:
        try:
            urllib.request.urlopen(url, timeout=1)
            return
        except Exception:
            time.sleep(0.3)
    raise RuntimeError(f"dev server did not start at {url}")


def page_count(path):
    data = path.read_bytes()
    return len(re.findall(rb"/Type\s*/Page[^s]", data))


def main():
    port = free_port()
    base = f"http://127.0.0.1:{port}"
    server = subprocess.Popen(
        ["npx", "vite", "--port", str(port), "--strictPort", "--host", "127.0.0.1"],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    ok = True
    dom_text = {}
    try:
        wait_for(base)
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={"width": 800, "height": 1100})
            for locale, cfg in LOCALES.items():
                out = ROOT / "public" / cfg["filename"]
                page.goto(base + cfg["route"], wait_until="networkidle")
                page.wait_for_selector(".pdf")
                page.evaluate("document.fonts.ready")
                page.wait_for_timeout(300)
                dom_text[locale] = page.inner_text(".pdf")
                page.pdf(path=str(out), format="A4", print_background=True, prefer_css_page_size=True)
                pages = page_count(out)
                print(f"{locale}: {out.relative_to(ROOT)} - {pages} page(s), {out.stat().st_size / 1024:.0f} KB")
                if pages != 1:
                    ok = False
                    print(f"ERROR: {locale} PDF has {pages} pages, expected 1", file=sys.stderr)
                if (ROOT / "docs").is_dir():
                    shutil.copy2(out, ROOT / "docs" / cfg["filename"])
            browser.close()
    finally:
        server.terminate()
        server.wait(timeout=10)

    # Text-layer check (macOS: PDFKit via swift). The extracted text must equal the
    # page's own text once whitespace is removed (same characters, same order), and no
    # Latin word may be split by a space or line break.
    swift = shutil.which("swift")
    if swift:
        squash = lambda t: re.sub(r"\s+", "", t)
        for locale, cfg in LOCALES.items():
            r = subprocess.run([swift, str(ROOT / "scripts" / "pdf-text.swift"), str(ROOT / "public" / cfg["filename"])],
                               capture_output=True, text=True)
            if r.returncode != 0:
                print(f"text check skipped for {locale}: {r.stderr.strip()[:200]}")
                continue
            text = r.stdout.split("\n", 1)[1]
            same_order = squash(text) == squash(dom_text[locale])
            tokens = set(text.split())
            split_words = [w for w in set(dom_text[locale].split()) if w.isascii() and w not in tokens]
            verdict = "OK" if same_order and not split_words else "FAILED"
            print(f"--- text layer {cfg['filename']}: {verdict} (reading order {'ok' if same_order else 'BROKEN'}, split words: {split_words[:8] or 'none'}) ---")
            print(text[:500].rstrip())
            ok = ok and verdict == "OK"
    else:
        print("swift not found: text-layer check skipped")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
