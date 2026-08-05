# Bloques completos del Pasaporte — Fase 5

## Ayudantes usados desde otras vistas

```javascript
8582:   const phone = t.length <= 10 ? '57'+t : t;
8583:   const s = serv.toLowerCase();
8584:   let det;
8585:   if      (s.includes('descarga') && (s.includes('cuello') || s.includes('espalda'))) det = 'la sesión de descarga muscular en cuello y espalda';
8586:   else if (s.includes('descarga') && s.includes('pierna'))  det = 'la sesión de descarga muscular en piernas';
8587:   else if (s.includes('descarga')) det = 'la sesión de descarga muscular';
8588:   else if (s.includes('readapt'))  det = 'la sesión de readaptación funcional';
8589:   else if (s.includes('valorac'))  det = 'la sesión de valoración funcional';
8590:   else if (s.includes('gimnasio')) det = 'la sesión de gimnasio';
8591:   else if (s.includes('empresa'))  det = 'la sesión empresarial';
8592:   else det = 'la sesión de ' + serv.toLowerCase();
8593:   // Detectar nota de relación: si notaAdmin contiene [PARA: ...]
8594:   const paraMatch = notaAdmin && notaAdmin.match(/\[PARA:\s*([^\]]+)\]/i);
8595:   const paraQuien = paraMatch ? paraMatch[1].trim() : null;
8596:   const msg = paraQuien
8597:     ? 'Hola ' + waNombre(nombre) + '! \uD83D\uDC4B Espero que esten bien. ¿Como le fue a ' + paraQuien + ' con ' + det + '? Quedo atenta a cualquier duda o molestia. \uD83D\uDE4F\n\n— Cuidándote Fisioterapia'
8598:     : 'Hola ' + waNombre(nombre) + '! \uD83D\uDC4B Espero que estes bien. ¿Como te fue con ' + det + '? Quedo atenta a cualquier duda o molestia. \uD83D\uDE4F\n\n— Cuidándote Fisioterapia';
8599:   return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
8600: }
8601: 
8602: function waEncuesta(tel, nombre) {
8603:   const t = String(tel||'').replace(/\D/g,'');
8604:   if (!t || t.length < 7) return null;
8605:   const phone = t.length <= 10 ? '57'+t : t;
8606:   const primero = waNombre(nombre);
8607:   const msg = 'Hola ' + primero + '! \uD83D\uDE0A Tu opinion me importa mucho. ¿Me regalas 2 minutos para contarme como fue tu experiencia? \uD83D\uDE4F\n\nhttps://forms.gle/srX1enyKN59n8TfQA\n\n\u2B50 *Premio!* Cuando termines la encuesta, enviame un pantallazo y en tu proxima sesion te regalo *10 min de Botas de Compresion* \uD83D\uDCAA\n\nGracias por confiar en mi! — Cuidándote Fisioterapia';
8608:   return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
8609: }
8610: 
8611: function waBtn(tel, nombre, fecha, hora, serv, label, precio, modalidad) {
8612:   const url = waLink(tel, nombre, fecha, hora, serv, precio, modalidad);
8613:   if (!url) return '<span style="color:var(--muted);font-size:.75rem">Sin tel.</span>';
8614:   return '<a href="' + url + '" target="_blank" class="btn btn-wa' + (label==='WA'?' btn-sm':'') + '">' + (label||'WA') + '</a>';
8615: }
8616: 
8617: function pasaporteLink(nombre) {
8618:   return PASAPORTE_BASE;
8619: }
8620: 
8621: function pasaporteLinkAdmin(nombre) {
8622:   return PASAPORTE_BASE;
8623: }
8624: 
8625: function waBtnPasaporte(tel, nombre) {
8626:   const safeName = String(nombre || '').replace(/'/g, "\\'");
8627:   return '<button type="button" class="btn btn-passport btn-sm" onclick="openPassportModuleFor(\'' + safeName + '\')" title="Generar enlace seguro">Pasaporte</button>';
8628: }
8629: 
8630: function openPassportModuleFor(nombre) {
8631:   showView('pasaporte');
8632:   setTimeout(function() {
8633:     const input = document.getElementById('pasNombreInput');
8634:     if (!input) return;
8635:     input.value = nombre || '';
8636:     onPasInput(input.value);
8637:     toast('Selecciona el paciente en la lista para generar su enlace seguro.', 'info');
8638:   }, 80);
8639: }
8640: 
8641: function toast(msg, type='ok') {
8642:   const t = document.createElement('div');
8643:   t.className = 'toast-msg ' + type;
8644:   t.textContent = msg;
8645:   document.getElementById('toast').appendChild(t);
8646:   setTimeout(() => t.remove(), 3500);
8647: }
8648: 
8649: async function reload() {
8650:   try {
8651:     const r = await fetch(APPS_SCRIPT_URL + '?action=adminData&token=' + encodeURIComponent(TOKEN));
8652:     if (!r.ok) { toast('Error del servidor (' + r.status + '). Recarga la página.', 'err'); return; }
8653:     const d = await r.json();
8654:     if (d.ok) {
8655:       allData = d;
8656:       await loadTeamData();
8657:     }
8658:     else if (d.error === 'Sin permiso') { toast('Sesión expirada. Volviendo al login...', 'warn'); setTimeout(logout, 1500); }
8659:   } catch(e) {
8660:     toast('Sin conexión. Verifica tu internet.', 'err');
8661:   }
8662: }
```

## Estado, búsqueda, enlace, editor y administración

```javascript
18125:   } catch(e) { toast('Error de conexión', 'err'); }
18126: }
18127: 
18128: async function generarBono(codigoRef, referidoPor, telefonoRef) {
18129:   const bonosMes = _bonosReferidorMes(referidoPor);
18130:   if (bonosMes.length >= BONO_MAX_MES) {
18131:     toast(`${referidoPor || 'Este paciente'} ya tiene ${BONO_MAX_MES} bonos este mes — límite alcanzado`, 'err');
18132:     return;
18133:   }
18134:   if (!confirm(`¿Generar bono de $${BONO_VALOR.toLocaleString('es-CO')} para ${referidoPor || 'quien refirió'}?\nBonos este mes: ${bonosMes.length + 1}/${BONO_MAX_MES}\nSe descontará en su próxima sesión.`)) return;
18135:   try {
18136:     // Generar el número (mismo que el REF)
18137:     const numRef  = codigoRef.split('-').pop(); // ej: "001"
18138:     const mesRef  = codigoRef.split('-')[1];    // ej: "MAY"
18139:     const codBono = `BONO-${mesRef}-${numRef}`;
18140: 
18141:     const codData = {
18142:       codigo:      codBono,
18143:       tipo:        'BONO',
18144:       paciente:    referidoPor,
18145:       telefono:    telefonoRef,
18146:       referidoPor: '',
18147:       codigoRef:   codigoRef
18148:     };
18149:     const r = await fetch(`${APPS_SCRIPT_URL}?action=registrarCodigo&token=${encodeURIComponent(TOKEN)}&data=${encodeURIComponent(JSON.stringify(codData))}`);
18150:     const d = await r.json();
18151:     if (!d.ok) { toast('Error al generar bono', 'err'); return; }
18152:     toast(`Bono ${codBono} generado para ${referidoPor || 'el referidor'} ✓`);
18153:     await reload();
18154:     renderCodigos();
18155:   } catch(e) { toast('Error de conexión', 'err'); }
18156: }
18157: 
18158: 
18159: function resRow(label, val, style='') {
18160:   return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.85rem;padding:3px 0">
18161:     <span style="color:var(--muted)">${label}</span>
18162:     <span style="${style}">${val}</span>
18163:   </div>`;
18164: }
18165: 
18166: // ══════════════════════════════════════════════════════════════
18167: // ── EXPORTAR CSV ──
18168: // ══════════════════════════════════════════════════════════════
18169: function exportarCSV(modo) {
18170:   const now = new Date();
18171:   const m   = now.getMonth()+1;
18172:   const y   = now.getFullYear();
18173:   let citas = citasReales().filter(esCobrada);
18174: 
18175:   if (modo === 'mes') {
18176:     citas = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
18177:   }
18178: 
18179:   // Agregar eventos externos como filas adicionales
18180:   let evts = (allData.eventos || []);
18181:   if (modo === 'mes') {
18182:     evts = evts.filter(e => { const [cy,cm]=normDate(e.fecha).split('-'); return +cm===m && +cy===y; });
18183:   }
18184:   const filasEventos = evts.map(e => ({
18185:     fecha: normDate(e.fecha), hora: e.horaInicio||'', nombre: e.titulo||'',
18186:     telefono: '', email: '', servicio: e.tipo||'Evento externo',
18187:     modalidad: '—', precio: e.cobro||'', estado: '⚡ Evento'
18188:   }));
18189: 
18190:   citas.sort((a,b) => normDate(a.fecha).localeCompare(normDate(b.fecha)));
18191:   filasEventos.sort((a,b) => a.fecha.localeCompare(b.fecha));
18192: 
18193:   const header = ['Fecha','Hora','Paciente','Teléfono','Email','Servicio','Modalidad','Valor','Estado'];
18194:   const rows = [
18195:     ...citas.map(c => [
18196:       normDate(c.fecha), c.hora||'', c.nombre||'', c.telefono||'', c.email||'',
18197:       c.servicio||'', c.modalidad||'', c.precio||'', c.estado||''
18198:     ]),
18199:     ...filasEventos.map(e => [
18200:       e.fecha, e.hora, e.nombre, e.telefono, e.email,
18201:       e.servicio, e.modalidad, e.precio, e.estado
18202:     ])
18203:   ].sort((a,b) => a[0].localeCompare(b[0]));
18204: 
18205:   const csvContent = [header, ...rows]
18206:     .map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','))
18207:     .join('\n');
18208: 
18209:   const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
18210:   const url  = URL.createObjectURL(blob);
18211:   const a    = document.createElement('a');
18212:   const nombre = modo === 'mes'
18213:     ? `ingresos_${y}-${pad(m)}.csv`
18214:     : `ingresos_completo_${y}-${pad(m)}-${pad(now.getDate())}.csv`;
18215:   a.href = url; a.download = nombre; a.click();
18216:   URL.revokeObjectURL(url);
18217:   toast('CSV descargado: ' + nombre);
18218: }
18219: 
18220: // ── PASAPORTE DE MOVIMIENTO ────────────────────────────────────
18221: const PASAPORTE_BASE  = 'https://cuidandotefisioterapia.com/pasaporte.html';
18222: let _pasTelefono = '';
18223: let _pasConfirmado = false;  // true solo cuando se seleccionó desde la BD
18224: let _pasCurrent = null;
18225: 
18226: function _pasGetDB() {
18227:   const map = {};
18228:   allData.citas.filter(c => c.estado !== 'Registro').forEach(c => {
18229:     const key = (c.nombre || '').toLowerCase().trim();
18230:     if (key && !map[key]) map[key] = { nombre: c.nombre, telefono: c.telefono || '' };
18231:   });
18232:   (allData.pacientes || []).forEach(p => {
18233:     const key = (p.nombre || '').toLowerCase().trim();
18234:     if (key && !map[key]) map[key] = { nombre: p.nombre, telefono: p.telefono || '' };
18235:   });
18236:   return map;
18237: }
18238: 
18239: function onPasInput(q) {
18240:   // Cada vez que el usuario escribe manualmente, pierde la confirmación
18241:   _pasConfirmado = false;
18242:   _pasTelefono  = '';
18243:   _pasSetConfirmed(false);
18244:   searchPasPatient(q);
18245: }
18246: 
18247: function searchPasPatient(q) {
18248:   const dd = document.getElementById('pasDropdown');
18249:   if (!q || q.length < 2) { dd.style.display = 'none'; return; }
18250:   const map = _pasGetDB();
18251:   const term = q.toLowerCase();
18252:   const matches = Object.values(map)
18253:     .filter(p => (p.nombre || '').toLowerCase().includes(term))
18254:     .sort((a, b) => a.nombre.localeCompare(b.nombre))
18255:     .slice(0, 8);
18256:   if (!matches.length) { dd.style.display = 'none'; return; }
18257:   dd.innerHTML = matches.map(p => `
18258:     <div onmousedown="selectPasPatient(${JSON.stringify(p).replace(/"/g,'&quot;')})"
18259:       style="padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--s2)"
18260:       onmouseenter="this.style.background='var(--s2)'" onmouseleave="this.style.background=''">
18261:       <div style="font-weight:600;font-size:.88rem;color:var(--text)">${p.nombre}</div>
18262:       <div style="font-size:.76rem;color:var(--muted)">${p.telefono || 'Sin teléfono'}</div>
18263:     </div>`).join('');
18264:   dd.style.display = 'block';
18265: }
18266: 
18267: function selectPasPatient(p) {
18268:   document.getElementById('pasNombreInput').value = p.nombre;
18269:   document.getElementById('pasDropdown').style.display = 'none';
18270:   _pasTelefono  = (p.telefono || '').replace(/\D/g, '');
18271:   _pasConfirmado = true;
18272:   _pasSetConfirmed(true, p);
18273:   generarLinkPasaporte();
18274: }
18275: 
18276: function _pasSetConfirmed(ok, p) {
18277:   const btn     = document.getElementById('pasAbrirBtn');
18278:   const badge   = document.getElementById('pasConfirmBadge');
18279:   const phoneBadge = document.getElementById('pasPhoneBadge');
18280:   const warning = document.getElementById('pasWarning');
18281:   const card    = document.getElementById('pasLinkCard');
18282:   if (ok && p) {
18283:     btn.disabled = false;
18284:     btn.style.cssText = 'background:var(--primary);color:#0D0D0D;border:none;border-radius:8px;padding:11px 22px;font-weight:700;font-size:.9rem;cursor:pointer;white-space:nowrap;transition:var(--tr)';
18285:     badge.style.display = 'flex';
18286:     phoneBadge.textContent = p.telefono ? '📞 ' + p.telefono : '';
18287:     warning.style.display = 'none';
18288:   } else {
18289:     btn.disabled = true;
18290:     btn.style.cssText = 'background:var(--s3);color:var(--muted);border:none;border-radius:8px;padding:11px 22px;font-weight:700;font-size:.9rem;cursor:not-allowed;white-space:nowrap;transition:var(--tr)';
18291:     badge.style.display = 'none';
18292:     card.style.display  = 'none';
18293:     warning.style.display = 'none';
18294:   }
18295: }
18296: 
18297: function limpiarPasBusqueda() {
18298:   document.getElementById('pasNombreInput').value = '';
18299:   document.getElementById('pasDropdown').style.display = 'none';
18300:   _pasConfirmado = false;
18301:   _pasTelefono  = '';
18302:   _pasSetConfirmed(false);
18303: }
18304: 
18305: async function generarLinkPasaporte() {
18306:   if (!_pasConfirmado) return;
18307:   const nombre = document.getElementById('pasNombreInput').value.trim();
18308:   const card   = document.getElementById('pasLinkCard');
18309:   if (!nombre) { card.style.display = 'none'; return; }
18310: 
18311:   const url = APPS_SCRIPT_URL + '?action=passportEnsure&token=' + encodeURIComponent(TOKEN)
18312:     + '&nombre=' + encodeURIComponent(nombre)
18313:     + '&telefono=' + encodeURIComponent(_pasTelefono || '');
18314:   const data = await fetch(url).then(r => r.json());
18315:   if (!data.ok) { toast(data.error || 'No se pudo generar el pasaporte', 'error'); return; }
18316:   _pasCurrent = data.passport;
18317:   const link = _pasCurrent.link;
18318:   document.getElementById('pasLinkTexto').textContent = link;
18319:   card.style.display = 'block';
18320: 
18321:   const tel = _pasTelefono.length >= 7
18322:     ? 'https://wa.me/57' + _pasTelefono.slice(-10)
18323:     : 'https://wa.me/';
18324:   const msg = `Hola ${nombre.split(' ')[0]}! \uD83D\uDC4B\nTe dejo tu Pasaporte de Beneficios — ahi vas a ver tu progreso despues de cada sesion.\n${link}\n\n\u2B50 *Como ganar beneficios?*\nCada sesion sumas avances. Al llegar a:\n\n\u2705 *4 sesiones:* Descarga Localizada 10 min (zona de tu eleccion)\n\u2705 *8 sesiones:* Valoracion Funcional Express 10 min + PDF con resultados\n\u2705 *12 sesiones:* Movilidad Asistida 10 min + Botas de Compresion\n\u2705 *16 sesiones:* Kinesiotape + Tens 15 min (Readaptacion completa)\n\nGuardalo y nos vemos pronto! \uD83D\uDE0A`;
18325:   document.getElementById('pasWhatsApp').href = tel + '?text=' + encodeURIComponent(msg);
18326: 
18327:   renderPasaporteQR(link);
18328:   renderPasaporteAdminTools();
18329: }
18330: 
18331: function renderPasaporteQR(link) {
18332:   const canvas = document.getElementById('pasQR');
18333:   if (!canvas) return;
18334:   let box = document.getElementById('pasQRBox');
18335:   if (!box) {
18336:     box = document.createElement('div');
18337:     box.id = 'pasQRBox';
18338:     box.style.cssText = 'width:112px;height:112px;border-radius:10px;border:1px solid var(--border);overflow:hidden;background:#F7F8FA;display:grid;place-items:center;flex-shrink:0';
18339:     canvas.insertAdjacentElement('afterend', box);
18340:   }
18341:   box.innerHTML = '';
18342:   canvas.style.display = 'none';
18343:   if (typeof QRCode !== 'undefined') {
18344:     if (QRCode.toCanvas) {
18345:       canvas.style.display = 'block';
18346:       box.style.display = 'none';
18347:       QRCode.toCanvas(canvas, link, { width: 112, margin: 1, color: { dark: '#0A1A12', light: '#F7F8FA' } });
18348:     } else {
18349:       box.style.display = 'grid';
18350:       new QRCode(box, { text: link, width: 112, height: 112, colorDark: '#0A1A12', colorLight: '#F7F8FA', correctLevel: QRCode.CorrectLevel.M });
18351:     }
18352:   } else {
18353:     box.textContent = 'QR no disponible';
18354:     box.style.fontSize = '11px';
18355:     box.style.color = 'var(--muted)';
18356:   }
18357: }
18358: 
18359: function abrirPasaporte() {
18360:   if (!_pasConfirmado) { toast('Selecciona un paciente de la lista primero', 'warn'); return; }
18361:   const link = (_pasCurrent && _pasCurrent.link) || document.getElementById('pasLinkTexto').textContent;
18362:   if (!link) { toast('Genera primero el enlace seguro', 'warn'); return; }
18363:   window.open(link, '_blank');
18364: }
18365: 
18366: function copiarLinkPas() {
18367:   const link = document.getElementById('pasLinkTexto').textContent;
18368:   if (!link) return;
18369:   navigator.clipboard.writeText(link).then(() => {
18370:     const btn = document.getElementById('pasCopyBtn');
18371:     const orig = btn.textContent;
18372:     btn.textContent = '¡Copiado!';
18373:     setTimeout(() => btn.textContent = orig, 2000);
18374:   });
18375: }
18376: 
18377: function renderPasaporteAdminTools() {
18378:   const card = document.getElementById('pasLinkCard');
18379:   if (!card || !_pasCurrent) return;
18380:   let box = document.getElementById('pasAdminTools');
18381:   if (!box) {
18382:     card.insertAdjacentHTML('beforeend', `
18383:       <div id="pasAdminTools" style="margin-top:18px;padding-top:16px;border-top:1px solid var(--s2)">
18384:         <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
18385:           <button class="btn btn-sm" onclick="regenerarTokenPasaporte()">Regenerar token</button>
18386:           ${_pasCurrent.estado === 'INACTIVO'
18387:             ? '<button class="btn btn-sm btn-teal" onclick="reactivarPasaporte()">Reactivar pasaporte</button>'
18388:             : '<button class="btn btn-sm btn-danger" onclick="desactivarPasaporte()">Desactivar pasaporte</button>'}
18389:           <button class="btn btn-sm btn-teal" onclick="guardarProgresoPasaporte()">Guardar progreso</button>
18390:         </div>
18391:         <div id="pasProgressEditor"></div>
18392:       </div>`);
18393:     box = document.getElementById('pasAdminTools');
18394:   }
18395:   const passport = _pasCurrent.passport || {};
18396:   const descarga = _pasCurrent.descarga || {};
18397:   const stampSource = passport.stamps || passport.sellos || passport;
18398:   const descargaSource = descarga.stamps || descarga.sellos || descarga;
18399:   document.getElementById('pasProgressEditor').innerHTML = `
18400:     <div style="font-weight:700;margin-bottom:4px">Sellos del pasaporte</div>
18401:     <div style="font-size:.78rem;color:var(--muted);margin-bottom:8px">${Number(passport.autoStampCount || 0)} automáticos. Ajusta solo para correcciones excepcionales.</div>
18402:     <div style="display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;margin-bottom:14px">
18403:       ${Array.from({length:16}, (_, i) => {
18404:         const n = i + 1;
18405:         const checked = !!(stampSource[n] || stampSource['s' + n] || stampSource['stamp' + n] || stampSource[i]);
18406:         return `<label style="border:1px solid var(--s2);border-radius:10px;padding:8px;text-align:center"><input type="checkbox" class="pasStamp" data-n="${n}" ${checked ? 'checked' : ''}> ${n}</label>`;
18407:       }).join('')}
18408:     </div>
18409:     <div style="font-weight:700;margin-bottom:8px">Reto mensual descarga</div>
18410:     <div style="display:flex;gap:8px;flex-wrap:wrap">
18411:       ${[1,2].map(n => {
18412:         const checked = !!(descargaSource[n] || descargaSource['s' + n] || descargaSource['stamp' + n] || descargaSource[n - 1]);
18413:         return `<label style="border:1px solid var(--s2);border-radius:10px;padding:8px 12px"><input type="checkbox" class="pasDescarga" data-n="${n}" ${checked ? 'checked' : ''}> Sesión ${n}</label>`;
18414:       }).join('')}
18415:     </div>`;
18416: }
18417: 
18418: async function guardarProgresoPasaporte() {
18419:   if (!_pasCurrent || !_pasCurrent.id) {
18420:     toast('Genera primero el enlace seguro', 'warn');
18421:     return;
18422:   }
18423: 
18424:   const btn = document.querySelector('#pasAdminTools button[onclick="guardarProgresoPasaporte()"]');
18425:   let status = document.getElementById('pasSaveStatus');
18426:   if (!status) {
18427:     const editor = document.getElementById('pasProgressEditor');
18428:     if (editor) {
18429:       editor.insertAdjacentHTML('beforebegin', '<div id="pasSaveStatus" style="display:none;margin:0 0 12px;padding:10px 12px;border-radius:9px;font-size:.84rem;font-weight:600"></div>');
18430:       status = document.getElementById('pasSaveStatus');
18431:     }
18432:   }
18433: 
18434:   const setStatus = (message, type) => {
18435:     if (!status) return;
18436:     const styles = {
18437:       info: 'display:block;background:rgba(37,99,235,.09);border:1px solid rgba(37,99,235,.22);color:#1d4ed8',
18438:       ok: 'display:block;background:rgba(22,163,74,.09);border:1px solid rgba(22,163,74,.22);color:#15803d',
18439:       error: 'display:block;background:rgba(220,38,38,.09);border:1px solid rgba(220,38,38,.22);color:#b91c1c'
18440:     };
18441:     status.style.cssText = styles[type] || styles.info;
18442:     status.textContent = message;
18443:   };
18444: 
18445:   const passport = {stamps:{}};
18446:   document.querySelectorAll('.pasStamp').forEach(cb => passport.stamps[cb.dataset.n] = cb.checked);
18447:   const descarga = {stamps:{}};
18448:   document.querySelectorAll('.pasDescarga').forEach(cb => descarga.stamps[cb.dataset.n] = cb.checked);
18449:   const requestedCount = Object.values(passport.stamps).filter(Boolean).length;
18450: 
18451:   const originalText = btn ? btn.textContent : '';
18452:   if (btn) {
18453:     btn.disabled = true;
18454:     btn.textContent = 'Guardando…';
18455:   }
18456:   setStatus('Guardando ' + requestedCount + ' de 16 sellos…', 'info');
18457: 
18458:   try {
18459:     const url = APPS_SCRIPT_URL + '?action=passportSaveProgress&token=' + encodeURIComponent(TOKEN)
18460:       + '&id=' + encodeURIComponent(_pasCurrent.id)
18461:       + '&passport=' + encodeURIComponent(JSON.stringify(passport))
18462:       + '&descarga=' + encodeURIComponent(JSON.stringify(descarga))
18463:       + '&_ts=' + Date.now();
18464: 
18465:     const controller = new AbortController();
18466:     const timer = setTimeout(() => controller.abort(), 120000);
18467:     let response;
18468:     try {
18469:       response = await fetch(url, {cache:'no-store', signal:controller.signal});
18470:     } finally {
18471:       clearTimeout(timer);
18472:     }
18473: 
18474:     const raw = await response.text();
18475:     let data;
18476:     try {
18477:       data = JSON.parse(raw);
18478:     } catch (_) {
18479:       throw new Error('El servidor respondió en un formato inesperado.');
18480:     }
18481:     if (!response.ok || !data.ok) {
18482:       throw new Error(data.error || 'No se pudo guardar el progreso.');
18483:     }
18484: 
18485:     _pasCurrent = data.passport || _pasCurrent;
18486: 
18487:     // Volver a consultar el pasaporte desde el servidor para que el editor
18488:     // muestre exactamente la misma fuente de datos que la vista pública.
18489:     const nombre = document.getElementById('pasNombreInput').value.trim();
18490:     const verifyUrl = APPS_SCRIPT_URL + '?action=passportEnsure&token=' + encodeURIComponent(TOKEN)
18491:       + '&nombre=' + encodeURIComponent(nombre)
18492:       + '&telefono=' + encodeURIComponent(_pasTelefono || '')
18493:       + '&_ts=' + Date.now();
18494:     const verifyResponse = await fetch(verifyUrl, {cache:'no-store'});
18495:     const verifyRaw = await verifyResponse.text();
18496:     let verifyData = null;
18497:     try { verifyData = JSON.parse(verifyRaw); } catch (_) {}
18498:     if (verifyResponse.ok && verifyData && verifyData.ok && verifyData.passport) {
18499:       _pasCurrent = verifyData.passport;
18500:     }
18501: 
18502:     renderPasaporteAdminTools();
18503:     setStatus('Progreso guardado correctamente: ' + requestedCount + '/16.', 'ok');
18504:     toast('Progreso guardado: ' + requestedCount + '/16', 'success');
18505:   } catch (error) {
18506:     const message = error && error.name === 'AbortError'
18507:       ? 'El servidor tardó demasiado. Actualiza el pasaporte antes de volver a guardar.'
18508:       : (error && error.message ? error.message : 'No se pudo guardar el progreso.');
18509:     setStatus(message, 'error');
18510:     toast(message, 'error');
18511:   } finally {
18512:     if (btn) {
18513:       btn.disabled = false;
18514:       btn.textContent = originalText || 'Guardar progreso';
18515:     }
18516:   }
18517: }
18518: 
18519: async function regenerarTokenPasaporte() {
18520:   if (!_pasCurrent || !_pasCurrent.id) return;
18521:   if (!confirm('¿Regenerar el enlace? El anterior dejará de funcionar.')) return;
18522:   const data = await fetch(APPS_SCRIPT_URL + '?action=passportRegenerateToken&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
18523:   if (!data.ok) { toast(data.error || 'No se pudo regenerar', 'error'); return; }
18524:   _pasCurrent = data.passport;
18525:   generarLinkPasaporte();
18526:   toast('Token regenerado. El enlace anterior quedó inválido.', 'success');
18527: }
18528: 
18529: async function desactivarPasaporte() {
18530:   if (!_pasCurrent || !_pasCurrent.id) return;
18531:   if (!confirm('¿Desactivar este pasaporte?')) return;
18532:   const data = await fetch(APPS_SCRIPT_URL + '?action=passportDeactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
18533:   if (!data.ok) { toast(data.error || 'No se pudo desactivar', 'error'); return; }
18534:   _pasCurrent = data.passport || _pasCurrent;
18535:   renderPasaporteAdminTools();
18536:   toast('Pasaporte desactivado', 'success');
18537: }
18538: 
18539: async function reactivarPasaporte() {
18540:   if (!_pasCurrent || !_pasCurrent.id) return;
18541:   if (!confirm('¿Reactivar este pasaporte?')) return;
18542:   const data = await fetch(APPS_SCRIPT_URL + '?action=passportReactivate&token=' + encodeURIComponent(TOKEN) + '&id=' + encodeURIComponent(_pasCurrent.id)).then(r => r.json());
18543:   if (!data.ok) { toast(data.error || 'No se pudo reactivar', 'error'); return; }
18544:   _pasCurrent = data.passport || _pasCurrent;
18545:   renderPasaporteAdminTools();
18546:   toast('Pasaporte reactivado', 'success');
18547: }
18548: 
18549: // ── Interceptor WA en desktop: muestra modal para copiar en vez de abrir wa.me ──
18550: (function initWACopyInterceptor() {
18551:   const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
18552:   if (isMobile) return; // en celular, el link funciona directo con la app nativa
18553: 
18554:   document.addEventListener('click', function(e) {
18555:     const a = e.target.closest('a[href]');
18556:     if (!a) return;
18557:     const href = a.getAttribute('href') || '';
18558:     if (!href.includes('wa.me')) return;
18559:     if (a.dataset.noIntercept) return; // skip botones del propio modal
18560:     // Hay un link de WhatsApp: interceptar en desktop
18561:     e.preventDefault();
18562:     try {
18563:       const url    = new URL(href.startsWith('http') ? href : 'https:' + href);
18564:       const rawMsg = url.searchParams.get('text') || '';
18565:       const phone  = url.pathname.replace(/^\//, '');
18566:       // Mostrar texto decodificado (los \uXXXX ya son Unicode real, encodeURIComponent los codifica)
18567:       const msg    = decodeURIComponent(rawMsg);
18568:       // "Abrir WhatsApp Web" abre el chat directo sin text= para evitar la corrupcion de emojis en el redirect
18569:       const chatUrl = 'https://web.whatsapp.com/send?phone=' + phone;
18570:       document.getElementById('waCopyText').textContent = msg;
18571:       document.getElementById('waOpenLink').href        = chatUrl;
18572:     } catch(_) {
```
