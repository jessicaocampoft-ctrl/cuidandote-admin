from pathlib import Path

p = Path('index.html')
t = p.read_text(encoding='utf-8-sig')

tag = '<script src="public-schedule-admin.js?v=20260807-1"></script>'
if tag not in t:
    if '</body>' not in t:
        raise SystemExit('index.html no contiene </body>')
    t = t.replace('</body>', tag + '\n</body>', 1)

required = [
    "const APPS_SCRIPT_URL",
    "action:'adminLogin'",
    "TOKEN = d.sessionToken",
    "passportSaveProgress",
    "saveManualPayment",
    "function showView(v)",
    "id=\"sb-bloquear\"",
    tag
]
for token in required:
    if token not in t:
        raise SystemExit('Falta integración crítica: ' + token)

p.write_text('\ufeff' + t, encoding='utf-8')
print('Módulo Horarios públicos conectado al administrador.')
