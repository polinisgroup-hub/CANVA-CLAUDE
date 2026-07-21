import re, base64, urllib.request, ssl

css = open("build/fonts/gf.css").read()
blocks = re.findall(r'@font-face\s*\{[^}]*\}', css)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
ctx = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt")

out = []
seen = set()
for b in blocks:
    fam = re.search(r'font-family:\s*[\'"]([^\'"]+)[\'"]', b).group(1)
    weight = re.search(r'font-weight:\s*([^;]+);', b).group(1).strip()
    style = re.search(r'font-style:\s*([^;]+);', b)
    style = style.group(1).strip() if style else "normal"
    urange = re.search(r'unicode-range:\s*([^;]+);', b)
    urange = urange.group(1).strip() if urange else ""
    url = re.search(r'url\((https://[^)]+\.woff2)\)', b).group(1)
    # keep only latin basic subset (contains U+0000-00FF)
    if "U+0000-00FF" not in urange:
        continue
    key = (fam, weight, style)
    if key in seen:
        continue
    seen.add(key)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    data = urllib.request.urlopen(req, context=ctx, timeout=60).read()
    b64 = base64.b64encode(data).decode()
    out.append(f"""@font-face{{font-family:'{fam}';font-style:{style};font-weight:{weight};src:url(data:font/woff2;base64,{b64}) format('woff2');}}""")
    print(f"embedded {fam} {weight} {style} ({len(data)} bytes)")

open("build/fonts/fonts-embedded.css","w").write("\n".join(out))
print("TOTAL blocks:", len(out))
