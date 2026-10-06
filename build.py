"""Build the gallery: inline tokens.css + matrix.css into src/gallery.html.

Writes:
  index.html            full HTML document, served by GitHub Pages
Run:  python3 build.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent
tokens = (ROOT / "tokens/tokens.css").read_text()
tokens = re.sub(r"^@import .*$\n?", "", tokens, flags=re.M)  # fonts are linked in the page head
matrix = (ROOT / "css/matrix.css").read_text()
body = (ROOT / "src/gallery.html").read_text()
body = body.replace("/*__TOKENS__*/", tokens).replace("/*__MATRIX__*/", matrix)

head_end = body.index("</style>") + len("</style>")
head, rest = body[:head_end], body[head_end:]

doc = (
    "<!doctype html>\n<html lang=\"en\">\n<head>\n"
    "<meta charset=\"utf-8\">\n"
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
    + head
    + "\n</head>\n<body>\n"
    + rest
    + "\n</body>\n</html>\n"
)
(ROOT / "index.html").write_text(doc)
print("index.html", len(doc), "bytes")

# Optional: python3 build.py <path>  also writes the bare fragment (no html/head/body wrapper)
import sys
if len(sys.argv) > 1:
    Path(sys.argv[1]).write_text(body)
    print(sys.argv[1], len(body), "bytes")
