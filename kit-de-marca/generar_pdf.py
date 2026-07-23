#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera `guia-kit-de-marca.pdf`: un PDF autónomo de 4 páginas (carta/vertical)
construido con HTML + CSS embebido y tipografía Poppins incrustada en base64.

Uso (un solo comando):
    python3 generar_pdf.py

Motor de PDF: usa headless Chromium (el mismo motor que Puppeteer). Si no se
encuentra Chromium pero WeasyPrint está instalado, lo usa como alternativa.
El PDF resultante no depende de fuentes del sistema ni de recursos externos.
"""

import base64
import glob
import os
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(HERE, "fonts")
HTML_OUT = os.path.join(HERE, "guia-kit-de-marca.html")
PDF_OUT = os.path.join(HERE, "guia-kit-de-marca.pdf")


# --------------------------------------------------------------------------- #
#  Fuentes: leer los woff2 y devolver reglas @font-face con data: URI base64   #
# --------------------------------------------------------------------------- #
def build_font_face_css() -> str:
    faces = [
        ("Poppins-Regular.woff2", 400),
        ("Poppins-SemiBold.woff2", 600),
    ]
    rules = []
    for filename, weight in faces:
        path = os.path.join(FONT_DIR, filename)
        with open(path, "rb") as fh:
            b64 = base64.b64encode(fh.read()).decode("ascii")
        rules.append(
            "@font-face{"
            "font-family:'Poppins';font-style:normal;"
            f"font-weight:{weight};font-display:block;"
            f"src:url(data:font/woff2;base64,{b64}) format('woff2');"
            "}"
        )
    return "\n".join(rules)


# --------------------------------------------------------------------------- #
#  Plantilla HTML (una sola página HTML, CSS 100% embebido)                    #
# --------------------------------------------------------------------------- #
def build_html() -> str:
    font_faces = build_font_face_css()
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Guía · Define tu Kit de Marca</title>
<style>
{font_faces}

/* ====== Reset / base ====== */
*{{margin:0;padding:0;box-sizing:border-box;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;}}
:root{{
  --orange:#D97757;
  --teal:#008080;
  --purple:#4910bc;
  --ink:#26262b;         /* gris oscuro: texto base */
  --ink-soft:#55555f;
  --paper:#ffffff;
  --pink:#fbe9ec;        /* rosa pálido para .box-result */
  --pink-line:#f2c9d1;
}}
@page{{size:letter;margin:0;}}
html,body{{background:#e9e9ee;}}
body{{font-family:'Poppins',sans-serif;font-weight:400;color:var(--ink);}}

.page{{
  position:relative;width:8.5in;height:11in;
  background:var(--paper);overflow:hidden;page-break-after:always;
}}
.page:last-child{{page-break-after:auto;}}
.pad{{padding:0.8in 0.75in 1in;height:100%;display:flex;flex-direction:column;}}

h1,h2,h3{{font-weight:600;line-height:1.05;letter-spacing:-.3px;}}
p{{line-height:1.6;font-size:11.5px;color:var(--ink-soft);}}

/* ====== Componente: .pill-tag ====== */
.pill-tag{{
  display:inline-block;background:var(--orange);color:#fff;
  font-weight:600;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;
  padding:7px 16px;border-radius:40px;
}}
.pill-tag.teal{{background:var(--teal);}}
.pill-tag.purple{{background:var(--purple);}}

/* ====== Componente: .box-formula (fondo negro) ====== */
.box-formula{{
  background:#1c1c22;color:#f3f3f5;border-radius:12px;padding:16px 18px;
}}
.box-formula .lbl{{
  color:var(--orange);font-weight:600;font-size:9px;letter-spacing:2px;
  text-transform:uppercase;margin-bottom:8px;
}}
.box-formula .formula{{font-size:12px;line-height:1.6;font-weight:600;color:#fff;}}
.box-formula .formula .op{{color:var(--orange);font-weight:600;}}

/* ====== Componente: .box-result (rosa pálido) ====== */
.box-result{{
  background:var(--pink);border:1px solid var(--pink-line);
  border-radius:12px;padding:14px 18px;
}}
.box-result .lbl{{
  color:var(--purple);font-weight:600;font-size:9px;letter-spacing:1.5px;
  text-transform:uppercase;margin-bottom:6px;
}}
.box-result p{{color:var(--ink);font-size:11px;line-height:1.55;}}

/* ====== Componente: .checkbox (cuadro CSS puro) ====== */
.check-list{{list-style:none;}}
.check-list li{{
  display:flex;align-items:flex-start;gap:10px;
  margin-bottom:11px;font-size:11px;line-height:1.4;color:var(--ink);
}}
.checkbox{{
  flex:0 0 15px;width:15px;height:15px;margin-top:1px;
  border:2px solid var(--teal);border-radius:3px;background:#fff;
}}

/* ====== Componente: .checkmark (✓ dibujado en CSS) ====== */
.checkmark{{
  flex:0 0 15px;width:15px;height:15px;margin-top:1px;position:relative;
}}
.checkmark::after{{
  content:"";position:absolute;left:3px;top:2px;
  width:6px;height:11px;
  border-right:2.6px solid var(--teal);border-bottom:2.6px solid var(--teal);
  transform:rotate(45deg);
}}

/* ====== Componente: .footer ====== */
.footer{{
  position:absolute;left:0.75in;right:0.75in;bottom:0.5in;
  display:flex;justify-content:space-between;align-items:center;
  font-size:9px;letter-spacing:.5px;color:#9a9aa6;
  border-top:1px solid #ececf0;padding-top:10px;
}}
.footer .pg{{font-weight:600;color:var(--orange);font-size:11px;letter-spacing:1px;}}
.footer .handle{{font-weight:600;color:var(--ink-soft);}}
.footer.on-dark{{border-top-color:rgba(255,255,255,.25);color:#cfeeeb;}}
.footer.on-dark .pg{{color:#ffd9cc;}}
.footer.on-dark .handle{{color:#eafffd;}}

/* ====== Componente: .two-col ====== */
.two-col{{display:flex;gap:28px;}}
.two-col > *{{flex:1 1 0;min-width:0;}}

/* ====== Utilidades de sección ====== */
.eyebrow{{font-weight:600;font-size:10px;letter-spacing:3px;text-transform:uppercase;
  color:var(--teal);margin-bottom:10px;}}
.step-card{{border:1px solid #ececf0;border-radius:14px;padding:20px;}}
.step-num{{font-weight:600;font-size:34px;color:var(--purple);line-height:1;
  margin-bottom:2px;}}
.h-title{{font-weight:600;font-size:17px;color:var(--ink);margin-bottom:8px;
  line-height:1.15;}}
.divider{{height:1px;background:#ececf0;margin:16px 0;}}

/* ====== PÁGINA 1 · PORTADA ====== */
.cover{{background:linear-gradient(155deg,var(--teal) 0%,#28407e 48%,var(--purple) 100%);
  color:#fff;}}
.cover .pad{{justify-content:center;}}
.cover .kicker{{font-weight:600;letter-spacing:6px;font-size:12px;text-transform:uppercase;
  color:#ffd9cc;margin-bottom:22px;}}
.cover .guia{{font-weight:600;font-size:22px;letter-spacing:8px;color:#d9f2f0;
  text-transform:uppercase;margin-bottom:6px;}}
.cover h1{{font-weight:600;font-size:62px;line-height:.98;letter-spacing:-1.5px;
  text-transform:uppercase;color:#fff;max-width:6.5in;}}
.cover .lead{{font-size:13px;line-height:1.7;color:#eef6ff;font-weight:400;
  max-width:4.6in;margin-top:26px;}}
.cover .pill-tag{{margin-bottom:34px;box-shadow:0 8px 22px rgba(217,119,87,.4);}}
</style>
</head>
<body>

<!-- ===================== PÁGINA 1 · PORTADA ===================== -->
<section class="page cover">
  <div class="pad">
    <span class="pill-tag">Branding</span>
    <div class="guia">Guía</div>
    <h1>Define tu<br>Kit de Marca</h1>
    <p class="lead">El sistema visual que hace que tu marca se vea coherente,
       profesional y reconocible en todo lo que publicas.</p>
  </div>
  <div class="footer on-dark">
    <span class="pg">01 / 04</span>
    <span class="handle">@lindamarmercado</span>
  </div>
</section>

<!-- ===================== PÁGINA 2 · ¿QUÉ ES? + PASO 1 ===================== -->
<section class="page">
  <div class="pad">
    <div class="eyebrow">Fundamentos</div>
    <h2 style="font-size:30px;">¿Qué es un kit de marca?</h2>
    <p style="margin-top:12px;max-width:6.2in;">
      Un kit de marca es el conjunto de elementos visuales —colores, tipografías
      y logo— que definen cómo se ve tu marca. Es tu <b>manual de estilo</b>:
      garantiza que cada post, historia o documento hable el mismo idioma visual
      y se sienta profesional, sin importar quién lo diseñe.
    </p>

    <div style="margin-top:22px;">
      <span class="pill-tag">3 pasos para crear tu kit de marca</span>
    </div>

    <div class="step-card" style="margin-top:20px;">
      <div class="two-col">
        <div>
          <div class="step-num">1</div>
          <div class="h-title">Definir los colores de tu marca</div>
          <p>
            El color es lo primero que percibe tu audiencia. Elige una paleta
            corta y con intención: transmite la personalidad de tu marca y te
            hace reconocible de un vistazo. Menos colores, más consistencia.
          </p>
        </div>
        <div>
          <ul class="check-list">
            <li><span class="checkbox"></span>
                <span>Investiga el <b>significado</b> de los colores y qué
                emoción quieres transmitir</span></li>
            <li><span class="checkbox"></span>
                <span>Limita tu paleta a <b>2–4 colores</b> (primario,
                secundario y neutro)</span></li>
            <li><span class="checkbox"></span>
                <span>Usa un <b>generador de paletas</b> para probar
                combinaciones y contraste</span></li>
          </ul>
          <div class="box-result" style="margin-top:14px;">
            <div class="lbl">Resultado esperado</div>
            <p>Una paleta de 2 a 4 colores con sus códigos HEX documentados,
               lista para aplicar en cualquier diseño.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span class="pg">02 / 04</span>
    <span class="handle">@lindamarmercado</span>
  </div>
</section>

<!-- ===================== PÁGINA 3 · PASO 2 y 3 ===================== -->
<section class="page">
  <div class="pad">
    <div class="eyebrow">Construye tu sistema</div>
    <h2 style="font-size:26px;">Tipografías y logo</h2>
    <div class="divider"></div>

    <div class="two-col" style="gap:24px;">
      <!-- PASO 2 -->
      <div class="step-card">
        <span class="pill-tag teal">Paso 2</span>
        <div class="h-title" style="margin-top:12px;">
          Seleccionar las tipografías correctas
        </div>
        <ul class="check-list">
          <li><span class="checkbox"></span>
              <span>Elige <b>1 fuente para títulos</b> con carácter</span></li>
          <li><span class="checkbox"></span>
              <span>Elige <b>1 fuente para el cuerpo</b>, legible y neutra</span></li>
          <li><span class="checkbox"></span>
              <span>Verifica que exista buen <b>contraste</b> entre ambas</span></li>
          <li><span class="checkbox"></span>
              <span>Máximo <b>2 tipografías</b> en todo el sistema</span></li>
        </ul>
        <div class="box-formula" style="margin-top:14px;">
          <div class="lbl">Mini-framework</div>
          <div class="formula">
            Titular <span class="op">+</span> Cuerpo <span class="op">=</span>
            jerarquía clara
          </div>
        </div>
      </div>

      <!-- PASO 3 -->
      <div class="step-card">
        <span class="pill-tag purple">Paso 3</span>
        <div class="h-title" style="margin-top:12px;">
          El logo de tu marca
        </div>
        <ul class="check-list">
          <li><span class="checkbox"></span>
              <span>Diseña una versión <b>principal</b> y una <b>secundaria</b></span></li>
          <li><span class="checkbox"></span>
              <span>Crea un <b>ícono / isotipo</b> para espacios pequeños</span></li>
          <li><span class="checkbox"></span>
              <span>Exporta en <b>PNG con fondo transparente</b></span></li>
          <li><span class="checkbox"></span>
              <span>Prueba que se lea bien en <b>claro y oscuro</b></span></li>
        </ul>
        <div class="box-formula" style="margin-top:14px;">
          <div class="lbl">Fórmula de paleta</div>
          <div class="formula">
            Primario <span class="op">+</span> Secundario
            <span class="op">+</span> Neutro <span class="op">=</span>
            paleta lista
          </div>
        </div>
      </div>
    </div>

    <div class="box-result" style="margin-top:20px;">
      <div class="lbl">Resultado esperado</div>
      <p>Con los pasos 1 a 3 completos tienes los tres pilares de tu kit:
         <b>color, tipografía y logo</b>, listos para combinarse en plantillas.</p>
    </div>
  </div>
  <div class="footer">
    <span class="pg">03 / 04</span>
    <span class="handle">@lindamarmercado</span>
  </div>
</section>

<!-- ===================== PÁGINA 4 · AFIANZA ===================== -->
<section class="page">
  <div class="pad">
    <div class="eyebrow">Cierre</div>
    <h2 style="font-size:52px;letter-spacing:-1px;">AFIANZA</h2>
    <p style="margin-top:14px;max-width:6.1in;">
      Tu kit de marca no sirve guardado: se afianza usándolo. Convierte estas
      decisiones en una <b>plantilla reutilizable</b> —con tus colores,
      tipografías y logo ya cargados— y diseña siempre a partir de ella.
      Cada pieza nueva refuerza tu identidad y ahorra tiempo.
    </p>

    <div class="box-formula" style="margin-top:22px;">
      <div class="lbl">Aplícalo así</div>
      <div class="formula">
        Kit de marca <span class="op">→</span> plantilla base
        <span class="op">→</span> contenido consistente
      </div>
    </div>

    <div style="margin-top:26px;">
      <span class="pill-tag teal">Checklist final</span>
    </div>

    <ul class="check-list" style="margin-top:18px;font-size:12px;">
      <li><span class="checkmark"></span>
          <span>Definí mi <b>paleta de color</b> (2–4 HEX documentados)</span></li>
      <li><span class="checkmark"></span>
          <span>Elegí mis <b>2 tipografías</b> (títulos + cuerpo)</span></li>
      <li><span class="checkmark"></span>
          <span>Tengo mi <b>logo</b> en versión principal, secundaria e ícono</span></li>
      <li><span class="checkmark"></span>
          <span>Creé una <b>plantilla base</b> con todo el kit cargado</span></li>
      <li><span class="checkmark"></span>
          <span>Aplico el kit de forma <b>consistente</b> en cada diseño</span></li>
    </ul>

    <div class="box-result" style="margin-top:22px;">
      <div class="lbl">Ya está</div>
      <p>Tienes un kit de marca completo y una forma de mantenerlo consistente.
         Ahora solo queda crear. — <b>@lindamarmercado</b></p>
    </div>
  </div>
  <div class="footer">
    <span class="pg">04 / 04</span>
    <span class="handle">@lindamarmercado</span>
  </div>
</section>

</body>
</html>"""


# --------------------------------------------------------------------------- #
#  Detección del motor de PDF                                                  #
# --------------------------------------------------------------------------- #
def find_chromium() -> str | None:
    for env in ("CHROME_BIN", "CHROMIUM_BIN", "PUPPETEER_EXECUTABLE_PATH"):
        p = os.environ.get(env)
        if p and os.path.exists(p):
            return p
    for name in ("chromium", "chromium-browser", "google-chrome",
                 "google-chrome-stable", "chrome"):
        p = shutil.which(name)
        if p:
            return p
    patterns = [
        "/opt/pw-browsers/chromium-*/chrome-linux/chrome",
        os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux/chrome"),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ]
    for pat in patterns:
        hits = sorted(glob.glob(pat))
        if hits:
            return hits[-1]
    return None


def render_with_chromium(chrome: str) -> None:
    cmd = [
        chrome, "--headless", "--no-sandbox", "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=20000",           # deja cargar las fuentes embebidas
        "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={PDF_OUT}",
        f"file://{HTML_OUT}",
    ]
    subprocess.run(cmd, check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def render_with_weasyprint() -> bool:
    try:
        from weasyprint import HTML  # type: ignore
    except Exception:
        return False
    HTML(filename=HTML_OUT).write_pdf(PDF_OUT)
    return True


# --------------------------------------------------------------------------- #
#  Main                                                                        #
# --------------------------------------------------------------------------- #
def main() -> int:
    html = build_html()
    with open(HTML_OUT, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"HTML generado: {HTML_OUT}")

    chrome = find_chromium()
    if chrome:
        print(f"Motor: headless Chromium -> {chrome}")
        render_with_chromium(chrome)
    elif render_with_weasyprint():
        print("Motor: WeasyPrint")
    else:
        sys.stderr.write(
            "ERROR: no se encontró Chromium ni WeasyPrint.\n"
            "Instala uno de los dos:\n"
            "  - Chromium: apt-get install chromium  (o define CHROME_BIN)\n"
            "  - WeasyPrint: pip install weasyprint\n"
        )
        return 1

    size = os.path.getsize(PDF_OUT)
    print(f"PDF generado: {PDF_OUT} ({size/1024:.0f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
