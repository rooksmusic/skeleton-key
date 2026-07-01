#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / "src/ui/index.html").read_text()
css = (ROOT / "src/ui/styles.css").read_text()
panel = html.replace("</head>", f"<style>{css}</style></head>")
(ROOT / "preview-panel.html").write_text(panel)
(ROOT / "preview-standalone.html").write_text("""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Skeleton Key — Preview</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: #111;
      font-family: system-ui, sans-serif;
    }
    h1 { font-size: 13px; font-weight: 500; color: #aaa; margin: 0; }
    iframe {
      width: 390px;
      height: 580px;
      border: 1px solid #1a3a1a;
      background: #000;
      resize: both;
      overflow: auto;
      min-width: 320px;
      min-height: 480px;
    }
  </style>
</head>
<body>
  <h1>Skeleton Key v1.4.3 — preview · drag outer frame corner to test larger window</h1>
  <iframe src="preview-panel.html" title="Skeleton Key UI"></iframe>
</body>
</html>
""")
print("Preview built: preview-standalone.html")
