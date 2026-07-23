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

# Enlace a la plantilla de Canva para armar el kit de marca.
CANVA_TEMPLATE_URL = "https://canva.link/irjtxfu8xkdlqca"


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
  --ink-soft:#4f4f59;
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
.pad{{padding:0.62in 0.72in 0.85in;height:100%;display:flex;flex-direction:column;}}

h1,h2,h3{{font-weight:600;line-height:1.1;letter-spacing:-.3px;}}
p{{line-height:1.68;font-size:12.5px;color:var(--ink-soft);}}
b,strong{{font-weight:600;color:var(--ink);}}

/* ====== Componente: .pill-tag ====== */
.pill-tag{{
  display:inline-block;background:var(--orange);color:#fff;
  font-weight:600;font-size:9.5px;letter-spacing:1.4px;text-transform:uppercase;
  padding:7px 15px;border-radius:40px;
}}
.pill-tag.teal{{background:var(--teal);}}
.pill-tag.purple{{background:var(--purple);}}

/* ====== Componente: .box-formula (fondo negro) ====== */
.box-formula{{
  background:#1c1c22;color:#f3f3f5;border-radius:11px;padding:12px 16px;
}}
.box-formula .lbl{{
  color:var(--orange);font-weight:600;font-size:8.5px;letter-spacing:2px;
  text-transform:uppercase;margin-bottom:6px;
}}
.box-formula .formula{{font-size:11.5px;line-height:1.5;font-weight:600;color:#fff;}}
.box-formula .formula .op{{color:var(--orange);font-weight:600;}}

/* ====== Componente: .box-result (rosa pálido) ====== */
.box-result{{
  background:var(--pink);border:1px solid var(--pink-line);
  border-radius:11px;padding:12px 16px;
}}
.box-result .lbl{{
  color:var(--purple);font-weight:600;font-size:8.5px;letter-spacing:1.5px;
  text-transform:uppercase;margin-bottom:5px;
}}
.box-result p{{color:var(--ink);font-size:10.5px;line-height:1.5;}}

/* ====== Listas densas de contenido ====== */
.bullet-list{{list-style:none;margin-top:12px;}}
.bullet-list > li{{
  position:relative;padding-left:18px;margin-bottom:13px;
  font-size:12.5px;line-height:1.62;color:var(--ink-soft);
}}
.bullet-list > li::before{{
  content:"";position:absolute;left:0;top:8px;width:7px;height:7px;
  border-radius:50%;background:var(--orange);
}}
.sub-list{{list-style:none;margin-top:7px;}}
.sub-list li{{
  position:relative;padding-left:17px;margin-bottom:5px;
  font-size:11.8px;line-height:1.5;color:var(--ink-soft);
}}
.sub-list li::before{{
  content:"";position:absolute;left:0;top:7px;width:6px;height:6px;
  border-radius:50%;border:1.6px solid var(--teal);
}}

/* ====== Componente: .checkbox (cuadro CSS puro) ====== */
.check-list{{list-style:none;}}
.check-list li{{
  display:flex;align-items:flex-start;gap:10px;
  margin-bottom:12px;font-size:12px;line-height:1.45;color:var(--ink);
}}
.checkbox{{
  flex:0 0 15px;width:15px;height:15px;margin-top:1px;
  border:2px solid var(--teal);border-radius:3px;background:#fff;
}}
/* ====== Componente: .checkmark (✓ dibujado en CSS) ====== */
.checkmark{{flex:0 0 15px;width:15px;height:15px;margin-top:1px;position:relative;}}
.checkmark::after{{
  content:"";position:absolute;left:3px;top:2px;width:6px;height:11px;
  border-right:2.6px solid var(--teal);border-bottom:2.6px solid var(--teal);
  transform:rotate(45deg);
}}

/* ====== Componente: .footer ====== */
.footer{{
  position:absolute;left:0.72in;right:0.72in;bottom:0.42in;
  display:flex;justify-content:space-between;align-items:center;
  font-size:9px;letter-spacing:.5px;color:#9a9aa6;
  border-top:1px solid #ececf0;padding-top:9px;
}}
.footer .pg{{font-weight:600;color:var(--orange);font-size:11px;letter-spacing:1px;}}
.footer .handle{{font-weight:600;color:var(--ink-soft);}}
.footer.on-dark{{border-top-color:rgba(255,255,255,.25);color:#cfeeeb;}}
.footer.on-dark .pg{{color:#ffd9cc;}}
.footer.on-dark .handle{{color:#eafffd;}}

/* ====== Componente: .two-col ====== */
.two-col{{display:flex;gap:24px;}}
.two-col > *{{flex:1 1 0;min-width:0;}}

/* ====== Utilidades de sección ====== */
.eyebrow{{font-weight:600;font-size:10px;letter-spacing:3px;text-transform:uppercase;
  color:var(--teal);margin-bottom:8px;}}
.step-block{{margin-top:20px;}}
.step-head{{display:flex;align-items:center;gap:11px;margin-bottom:8px;}}
.step-title{{font-weight:600;font-size:17px;color:var(--ink);line-height:1.12;}}
.lead-p{{font-size:12.5px;line-height:1.68;color:var(--ink-soft);}}
.divider{{height:1px;background:#ececf0;margin:14px 0;}}
.mini-lbl{{font-weight:600;font-size:9px;letter-spacing:2px;text-transform:uppercase;
  color:var(--purple);margin-bottom:9px;}}
.pair{{display:flex;gap:14px;}}
.pair .pcard{{flex:1;border:1px solid #ececf0;border-radius:10px;padding:12px 14px;}}
.pair .pt-role{{font-size:8.5px;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--teal);font-weight:600;margin-bottom:4px;}}
.pair .pt-aa{{font-weight:600;font-size:22px;color:var(--ink);line-height:1;}}
.pair .pt-desc{{font-size:9.5px;color:var(--ink-soft);margin-top:4px;line-height:1.4;}}

/* ====== PÁGINA 1 · PORTADA ====== */
.cover{{background:linear-gradient(155deg,var(--teal) 0%,#28407e 48%,var(--purple) 100%);
  color:#fff;}}
.cover .pad{{justify-content:center;}}
.cover .guia{{font-weight:600;font-size:74px;letter-spacing:-2px;line-height:.9;
  text-transform:uppercase;color:#fff;}}
.cover h1{{font-weight:600;font-size:37px;line-height:1.02;letter-spacing:-1px;
  text-transform:uppercase;color:#ffd9cc;margin-top:6px;}}
.cover .by{{font-size:12px;line-height:1.7;color:#eef6ff;font-weight:400;
  margin-top:22px;font-style:italic;}}
.cover .pill-tag{{margin-bottom:30px;box-shadow:0 8px 22px rgba(217,119,87,.4);}}

/* ====== PÁGINA 4 · kit preview + CTA ====== */
.kit-card{{border:1px solid #e6e6ea;border-radius:12px;overflow:hidden;background:#fff;}}
.kit-row{{padding:12px 14px;border-bottom:1px solid #f0f0f3;}}
.kit-row:last-child{{border-bottom:none;}}
.kit-lbl{{font-size:7.5px;letter-spacing:1.5px;text-transform:uppercase;
  color:#9a9aa6;text-align:center;margin-bottom:8px;font-weight:600;}}
.logo-mono{{width:46px;height:46px;border-radius:11px;margin:0 auto;
  background:var(--ink);color:#fff;font-weight:600;font-size:20px;
  display:flex;align-items:center;justify-content:center;letter-spacing:-1px;}}
.logo-name{{text-align:center;font-weight:600;font-size:11px;color:var(--ink);
  margin-top:6px;letter-spacing:1px;}}
.swatches{{display:flex;gap:9px;justify-content:center;}}
.swatch{{width:38px;text-align:center;}}
.swatch .chip{{height:36px;border-radius:8px;}}
.swatch .hex{{font-size:6.5px;color:var(--ink-soft);margin-top:4px;letter-spacing:.3px;}}
.type-sample{{display:flex;align-items:baseline;gap:10px;justify-content:center;}}
.type-sample .aa{{font-weight:600;font-size:26px;color:var(--ink);}}
.type-sample .meta{{font-size:9px;color:var(--ink-soft);line-height:1.35;}}
.img-grid{{display:flex;gap:6px;}}
.img-grid div{{flex:1;height:34px;border-radius:6px;}}
.cta-btn{{
  display:block;text-decoration:none;text-align:center;
  background:linear-gradient(90deg,var(--ink),var(--teal));
  color:#fff;font-weight:600;font-size:13px;letter-spacing:1.5px;
  text-transform:uppercase;padding:14px 20px;border-radius:40px;
  box-shadow:0 8px 20px rgba(0,128,128,.28);
}}
.cta-url{{text-align:center;font-size:9px;color:var(--ink-soft);margin-top:7px;
  letter-spacing:.4px;word-break:break-all;}}
</style>
</head>
<body>

<!-- ===================== PÁGINA 1 · PORTADA ===================== -->
<section class="page cover">
  <div class="pad">
    <span class="pill-tag">Branding</span>
    <div class="guia">Guía</div>
    <h1>Define tu Kit<br>de Marca</h1>
    <p class="by">Crea un sistema visual coherente, profesional y reconocible
       para todo lo que publicas.</p>
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
    <h2 style="font-size:27px;">¿Qué es un kit de marca?</h2>
    <p class="lead-p" style="margin-top:10px;">
      Un kit de marca es el conjunto de elementos visuales —colores, tipografías
      y logo— que representan la identidad de tu negocio. Hace que tu marca sea
      <b>reconocible y coherente</b> en todo lo que publicas y te ahorra tiempo:
      cada diseño parte de las mismas reglas. Tenerlo definido garantiza que todo
      lo que crees, sin importar quién lo diseñe, hable el mismo idioma visual.
    </p>

    <div style="margin-top:16px;">
      <span class="pill-tag">3 pasos para crear tu kit de marca</span>
    </div>

    <div class="step-block">
      <div class="step-head">
        <span class="pill-tag purple">Paso 1</span>
        <span class="step-title">Definir los colores de tu marca</span>
      </div>
      <p class="lead-p">
        Los colores transmiten emociones y hacen que tu marca se recuerde. Define
        una paleta corta y con intención siguiendo estos pasos:
      </p>
      <ul class="bullet-list">
        <li><b>Investiga el significado de los colores.</b> Elige tonos que
          comuniquen el mensaje correcto según la emoción que quieres transmitir:
          <ul class="sub-list">
            <li><b>Teal:</b> confianza y profesionalismo</li>
            <li><b>Naranja:</b> energía, cercanía y acción</li>
            <li><b>Púrpura:</b> creatividad y ambición</li>
          </ul>
        </li>
        <li><b>Limita tu paleta a 2–4 colores.</b> Un color primario que destaque,
          uno secundario que complemente y uno o dos neutros (gris o blanco) para
          equilibrar el conjunto.</li>
        <li><b>Usa un generador de paletas.</b> Sube una imagen o parte de un color
          base para obtener combinaciones con buen contraste y guárdalas en tu kit.</li>
      </ul>

      <div style="margin-top:16px;border:1px solid #ececf0;border-radius:11px;padding:15px 18px;">
        <div class="mini-lbl">Ejemplo de paleta</div>
        <div class="swatches" style="justify-content:flex-start;gap:16px;">
          <div class="swatch" style="width:52px;"><div class="chip" style="height:44px;background:#008080;"></div><div class="hex">Primario<br>#008080</div></div>
          <div class="swatch" style="width:52px;"><div class="chip" style="height:44px;background:#D97757;"></div><div class="hex">Secundario<br>#D97757</div></div>
          <div class="swatch" style="width:52px;"><div class="chip" style="height:44px;background:#4910bc;"></div><div class="hex">Acento<br>#4910BC</div></div>
          <div class="swatch" style="width:52px;"><div class="chip" style="height:44px;background:#26262b;"></div><div class="hex">Neutro<br>#26262B</div></div>
        </div>
      </div>

      <div class="box-result" style="margin-top:16px;">
        <div class="lbl">Resultado esperado</div>
        <p>Una paleta de 2 a 4 colores con sus códigos HEX documentados, lista
           para aplicar de forma consistente en cualquier diseño.</p>
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
    <h2 style="font-size:27px;">Tipografías y logo</h2>
    <div class="divider"></div>

    <!-- PASO 2 -->
    <div class="step-block" style="margin-top:4px;">
      <div class="step-head">
        <span class="pill-tag teal">Paso 2</span>
        <span class="step-title">Seleccionar las tipografías correctas</span>
      </div>
      <p class="lead-p">
        Las tipografías definen la personalidad de tu marca. Elige con estos
        criterios para lograr un diseño limpio y legible:
      </p>
      <ul class="bullet-list">
        <li><b>Estilo y legibilidad.</b> Escoge una fuente principal legible que
          refleje tu tono (moderna, clásica o divertida). Por ejemplo, una sans
          serif para un look moderno o una serif para uno más clásico.</li>
        <li><b>Combinación de fuentes.</b> Usa una para los títulos y otra para el
          cuerpo; asegúrate de que se complementen sin competir entre sí.</li>
        <li><b>Límite de fuentes.</b> No uses más de 2 tipografías para mantener el
          sistema coherente y ordenado.</li>
      </ul>
      <div class="pair" style="margin-top:13px;">
        <div class="pcard">
          <div class="pt-role">Títulos</div>
          <div class="pt-aa">Poppins SemiBold</div>
          <div class="pt-desc">Con carácter, para encabezados que destaquen.</div>
        </div>
        <div class="pcard">
          <div class="pt-role">Cuerpo</div>
          <div class="pt-aa" style="font-weight:400;">Poppins Regular</div>
          <div class="pt-desc">Legible y neutra, para textos largos.</div>
        </div>
      </div>
      <div class="box-formula" style="margin-top:13px;">
        <div class="lbl">Mini-framework</div>
        <div class="formula">
          Titular <span class="op">+</span> Cuerpo <span class="op">=</span>
          jerarquía clara
        </div>
      </div>
    </div>

    <!-- PASO 3 -->
    <div class="step-block" style="margin-top:18px;">
      <div class="step-head">
        <span class="pill-tag purple">Paso 3</span>
        <span class="step-title">El logo de tu marca</span>
      </div>
      <p class="lead-p">
        Tu logo es el rostro visual del negocio y el elemento más importante del
        kit. Al diseñarlo, considera:
      </p>
      <ul class="bullet-list">
        <li><b>Simplicidad.</b> Un buen logo es simple y memorable; no lo
          sobrecargues con demasiados detalles.</li>
        <li><b>Versatilidad.</b> Debe funcionar en distintos tamaños y fondos,
          tanto claros como oscuros.</li>
        <li><b>Diséñalo en Canva.</b> Créalo desde cero con plantillas o sube el
          tuyo y guárdalo dentro de tu kit de marca.</li>
        <li><b>Formatos.</b> Exporta en PNG para conservar la transparencia y en
          SVG cuando necesites escalarlo para impresión.</li>
      </ul>
      <div class="box-formula" style="margin-top:11px;">
        <div class="lbl">Fórmula de paleta</div>
        <div class="formula">
          Primario <span class="op">+</span> Secundario <span class="op">+</span>
          Neutro <span class="op">=</span> paleta lista
        </div>
      </div>
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
    <h2 style="font-size:46px;letter-spacing:-1px;">AFIANZA</h2>

    <div class="two-col" style="margin-top:16px;gap:26px;align-items:flex-start;">
      <!-- Kit preview (100% CSS, sin imágenes externas) -->
      <div class="kit-card">
        <div class="kit-row">
          <div class="logo-mono">TM</div>
          <div class="logo-name">TU MARCA</div>
        </div>
        <div class="kit-row">
          <div class="kit-lbl">Paleta de color</div>
          <div class="swatches">
            <div class="swatch"><div class="chip" style="background:#008080;"></div><div class="hex">#008080</div></div>
            <div class="swatch"><div class="chip" style="background:#D97757;"></div><div class="hex">#D97757</div></div>
            <div class="swatch"><div class="chip" style="background:#4910bc;"></div><div class="hex">#4910BC</div></div>
            <div class="swatch"><div class="chip" style="background:#26262b;"></div><div class="hex">#26262B</div></div>
          </div>
        </div>
        <div class="kit-row">
          <div class="kit-lbl">Tipografía</div>
          <div class="type-sample">
            <span class="aa">Aa</span>
            <span class="meta"><b>Poppins</b><br>Títulos y cuerpo de texto</span>
          </div>
        </div>
        <div class="kit-row">
          <div class="kit-lbl">Estilo de imágenes</div>
          <div class="img-grid">
            <div style="background:linear-gradient(135deg,#008080,#2aa9a0);"></div>
            <div style="background:linear-gradient(135deg,#D97757,#e79b83);"></div>
            <div style="background:linear-gradient(135deg,#4910bc,#7a4bd6);"></div>
            <div style="background:linear-gradient(135deg,#26262b,#55555f);"></div>
          </div>
        </div>
      </div>

      <!-- Texto explicativo -->
      <div>
        <p class="lead-p" style="font-size:11.5px;">
          Así debería lucir tu kit reunido: <b>paleta de color, tipografías y
          logo</b> en un solo lugar, con ejemplos de cómo se aplican en tus
          fondos e imágenes. Úsalo como referencia visual y mantén estas mismas
          reglas en cada pieza que diseñes.
        </p>
        <p class="lead-p" style="margin-top:10px;font-size:11.5px;">
          Convierte estas decisiones en una <b>plantilla reutilizable</b> y diseña
          siempre a partir de ella. Cada diseño nuevo reforzará tu identidad y te
          ahorrará tiempo.
        </p>
        <div class="box-formula" style="margin-top:14px;">
          <div class="lbl">Aplícalo así</div>
          <div class="formula">
            Kit de marca <span class="op">&rarr;</span> plantilla base
            <span class="op">&rarr;</span> contenido consistente
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top:20px;">
      <span class="pill-tag teal">Checklist final</span>
    </div>
    <div class="two-col" style="margin-top:14px;gap:26px;">
      <ul class="check-list">
        <li><span class="checkmark"></span><span>Definí mi <b>paleta</b> (2–4 HEX documentados)</span></li>
        <li><span class="checkmark"></span><span>Elegí mis <b>2 tipografías</b> (títulos + cuerpo)</span></li>
        <li><span class="checkmark"></span><span>Tengo mi <b>logo</b> en principal, secundaria e ícono</span></li>
      </ul>
      <ul class="check-list">
        <li><span class="checkmark"></span><span>Creé una <b>plantilla base</b> con el kit cargado</span></li>
        <li><span class="checkmark"></span><span>Aplico el kit de forma <b>consistente</b></span></li>
        <li><span class="checkmark"></span><span>Guardé todo en <b>Canva</b> para reutilizarlo</span></li>
      </ul>
    </div>

    <div style="margin-top:18px;">
      <p class="lead-p" style="text-align:center;margin-bottom:10px;">
        Haz este ejercicio con la <b>plantilla gratuita</b> que te dejo en Canva:
      </p>
      <a class="cta-btn" href="{CANVA_TEMPLATE_URL}">Usar la plantilla</a>
      <div class="cta-url">{CANVA_TEMPLATE_URL}</div>
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
def find_chromium():
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


def render_with_chromium(chrome):
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


def render_with_weasyprint():
    try:
        from weasyprint import HTML  # type: ignore
    except Exception:
        return False
    HTML(filename=HTML_OUT).write_pdf(PDF_OUT)
    return True


# --------------------------------------------------------------------------- #
#  Main                                                                        #
# --------------------------------------------------------------------------- #
def main():
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
