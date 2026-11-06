# shjlin.github.io

Personal homepage of Shing Ho J. Lin — a bespoke "geometric editorial" one-pager.
No framework, no build step: plain HTML + CSS + vanilla JS.

## Local preview

Run a tiny static server in this folder:

```bash
cd shjlin.github.io
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Press `Ctrl+C` to stop.

(Double-clicking `index.html` also works for a quick look, but serving via
HTTP is the more faithful preview of how GitHub Pages will render it.)

## Editing

- `index.html` — page structure; **English content lives directly in the HTML**
- `assets/i18n.js` — the `zh-HK`（港式繁體）and `zh-CN`（简体）translations,
  keyed by the `data-i18n` / `data-i18n-html` attributes in the HTML
- `assets/style.css` — design tokens (colors, fonts) at the top; dark theme
  overrides under `html[data-theme="dark"]`
- `assets/main.js` — theme toggle, language switcher, scroll animations
- `images/` — portrait and paper figures

Paper titles, author lists and abstracts intentionally stay in English in all
languages (academic convention). Professor names in Chinese pages:
周傑 / 魯繼文 / 向世明 / 魏憲 (zh-HK), 周杰 / 鲁继文 / 向世明 / 魏宪 (zh-CN).

## Old site

The previous academicpages (Jekyll) site is backed up outside this repo.
