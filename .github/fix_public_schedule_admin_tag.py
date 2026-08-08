from pathlib import Path

p = Path('index.html')
t = p.read_text(encoding='utf-8-sig')
tag = '<script src="public-schedule-admin.js?v=20260807-1"></script>'

# Quitar cualquier inserción previa, incluida una que haya caído dentro de una plantilla de impresión.
t = t.replace(tag + '\n', '').replace(tag, '')

body_pos = t.rfind('</body>')
if body_pos < 0:
    raise SystemExit('No se encontró el cierre real </body>')

t = t[:body_pos] + '  ' + tag + '\n' + t[body_pos:]

if t.count(tag) != 1:
    raise SystemExit('El módulo debe cargarse exactamente una vez')
after_tag = t[t.rfind(tag) + len(tag):].strip()
if not after_tag.startswith('</body>'):
    raise SystemExit('El módulo no quedó inmediatamente antes del cierre real </body>')
if t.rfind(tag) < len(t) - 500:
    raise SystemExit('El módulo no quedó al final real del documento')
if 'Reporte automático de indicadores de gestión' not in t or 'w.document.close();' not in t:
    raise SystemExit('Se alteró la plantilla de reporte')

p.write_text('\ufeff' + t, encoding='utf-8')
print('Carga de public-schedule-admin.js corregida al cierre real del documento.')
