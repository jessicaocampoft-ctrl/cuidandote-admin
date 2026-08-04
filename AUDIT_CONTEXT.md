# Contexto técnico para correcciones del panel

Archivo revisado: `index.html`
Total de líneas: 20212

## ID duplicado: copyGestionStatus

### Coincidencia 1 — línea 3951

```html
3946:               <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
3947:               <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
3948:                 Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
3949:               </p>
3950:             </div>
3951:             <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
3952:           </div>
3953:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
```

### Coincidencia 2 — línea 4014

```html
4009:             <div class="card-title" style="margin-bottom:4px">Copiar y compartir información</div>
4010:             <p style="font-size:.84rem;color:var(--muted);margin:0;line-height:1.5">
4011:               Exporta el análisis como texto limpio para WhatsApp, documentos o asesoría externa. No copia código ni datos clínicos sensibles.
4012:             </p>
4013:           </div>
4014:           <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
4015:         </div>
4016:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
```

## ID duplicado: emCk_ventas_sem_1

### Coincidencia 1 — línea 4703

```html
4698:               <div class="em-symptom">💡 <strong>Semana financieramente débil.</strong> Aún hay tiempo de corregir antes de que cierre el mes — actuar esta semana evita que el problema se acumule. Primero verifica que no sea un error de registro (citas atendidas sin precio ingresado) antes de asumir que las ventas realmente bajaron.</div>
4699:               <div class="em-prog-meta" id="emPM_ventas_sem">0 de 5 pasos completados</div>
4700:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_sem" style="width:0%"></div></div>
4701:               <div class="em-steps">
4702:                 <label class="em-step" id="emS_ventas_sem_0" onclick="handleEmStep(event,'ventas_sem',0)"><input type="checkbox" id="emCk_ventas_sem_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Verificar integridad del registro:</strong> abrir Finanzas y revisar que todas las citas atendidas esta semana tienen precio registrado. A veces las ventas están "perdidas" simplemente porque la cita no tiene valor ingresado — eso es un problema de registro, no de ventas.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4703:                 <label class="em-step" id="emS_ventas_sem_1" onclick="handleEmStep(event,'ventas_sem',1)"><input type="checkbox" id="emCk_ventas_sem_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Calcular el gap exacto:</strong> ¿cuánto falta para llegar a la meta semanal? ¿Cuántas citas adicionales necesitas a precio promedio para cerrar ese gap? Ese es el número concreto que persigues hoy.</span></label>
4704:                 <label class="em-step" id="emS_ventas_sem_2" onclick="handleEmStep(event,'ventas_sem',2)"><input type="checkbox" id="emCk_ventas_sem_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Ofrecer paquete a pacientes en sesión suelta:</strong> cuando un paciente viene a una cita individual, la auxiliar debe siempre mencionar el paquete equivalente: <em>"¿Sabías que si agendas 3 sesiones juntas ahorras $27.000? ¿Te lo separo con el mismo horario?"</em> El upgrade en el momento de la cita tiene 40–60% de cierre.</span></label>
4705:                 <label class="em-step" id="emS_ventas_sem_3" onclick="handleEmStep(event,'ventas_sem',3)"><input type="checkbox" id="emCk_ventas_sem_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Reactivar pacientes inactivos con WhatsApp personalizado:</strong> desde Recordatorios, contactar 3–5 pacientes que no han vuelto en 30–60 días. Un paciente que ya confió en ti convierte 5× más fácil que uno nuevo.</span><button class="em-goto" onclick="event.stopPropagation();showView('recordatorios')">Recordatorios →</button></label>
4706:                 <label class="em-step" id="emS_ventas_sem_4" onclick="handleEmStep(event,'ventas_sem',4)"><input type="checkbox" id="emCk_ventas_sem_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Historia de urgencia en redes:</strong> publicar disponibilidad real para esta semana con CTA directo. No una oferta de descuento — solo mostrar los horarios disponibles genera urgencia genuina sin devaluar el servicio.</span></label>
4707:               </div>
4708:               <div class="em-card-footer">
```

### Coincidencia 2 — línea 4730

```html
4725:               <div class="em-symptom">💡 <strong>El mes está comprometido.</strong> Por debajo del 80% de la meta ya no alcanza con citas normales — se necesita una acción extraordinaria. La clave es calcular primero cuánto falta y cuántos días quedan, para saber si el gap es recuperable con citas extra, paquetes, o si hay que activar un plan de contingencia.</div>
4726:               <div class="em-prog-meta" id="emPM_ventas_mes">0 de 6 pasos completados</div>
4727:               <div class="em-prog-wrap"><div class="em-prog-fill" id="emPF_ventas_mes" style="width:0%"></div></div>
4728:               <div class="em-steps">
4729:                 <label class="em-step" id="emS_ventas_mes_0" onclick="handleEmStep(event,'ventas_mes',0)"><input type="checkbox" id="emCk_ventas_mes_0" onclick="event.stopPropagation()"><span class="em-step-n">01</span><span class="em-step-text"><strong>Calcular el gap real:</strong> abrir Finanzas, ver cuánto se ha facturado y cuánto falta. Dividirlo entre los días hábiles restantes del mes — ese es el ingreso diario necesario. Si son más de $600k/día extra, el plan de citas no es suficiente solo.</span><button class="em-goto" onclick="event.stopPropagation();showView('finanzas')">Ver Finanzas →</button></label>
4730:                 <label class="em-step" id="emS_ventas_mes_1" onclick="handleEmStep(event,'ventas_mes',1)"><input type="checkbox" id="emCk_ventas_sem_1" onclick="event.stopPropagation()"><span class="em-step-n">02</span><span class="em-step-text"><strong>Campaña de paquetes con fecha límite:</strong> ofrecer a pacientes activos paquetes pre-pagados con vigencia de 60 días. El pago adelantado ingresa al mes actual aunque las citas se usen después — es la palanca más rápida para cerrar el gap.</span></label>
4731:                 <label class="em-step" id="emS_ventas_mes_2" onclick="handleEmStep(event,'ventas_mes',2)"><input type="checkbox" id="emCk_ventas_mes_2" onclick="event.stopPropagation()"><span class="em-step-n">03</span><span class="em-step-text"><strong>Evento corporativo o grupal de emergencia:</strong> si hay contactos en empresas, gimnasios o equipos deportivos de la zona, ofrecer una jornada de valoraciones express (20–30 min c/u). 10 valoraciones a $80k = $800k en un día, sin costo de adquisición.</span></label>
4732:                 <label class="em-step" id="emS_ventas_mes_3" onclick="handleEmStep(event,'ventas_mes',3)"><input type="checkbox" id="emCk_ventas_mes_3" onclick="event.stopPropagation()"><span class="em-step-n">04</span><span class="em-step-text"><strong>Campaña de referidos urgente:</strong> contactar a los 10 mejores pacientes del mes y pedirles que refieran a alguien. Ofrecer la primera sesión del referido con descuento — el ingreso parcial es mejor que el espacio vacío.</span></label>
4733:                 <label class="em-step" id="emS_ventas_mes_4" onclick="handleEmStep(event,'ventas_mes',4)"><input type="checkbox" id="emCk_ventas_mes_4" onclick="event.stopPropagation()"><span class="em-step-n">05</span><span class="em-step-text"><strong>Pauta de cierre de mes:</strong> publicar un anuncio de 3–5 días con los horarios disponibles del mes y CTA urgente. El mensaje de escasez real ("quedan X espacios este mes") convierte mejor que cualquier descuento.</span></label>
4734:                 <label class="em-step" id="emS_ventas_mes_5" onclick="handleEmStep(event,'ventas_mes',5)"><input type="checkbox" id="emCk_ventas_mes_5" onclick="event.stopPropagation()"><span class="em-step-n">06</span><span class="em-step-text"><strong>Revisar si hay membresías o paquetes vencidos:</strong> pacientes con paquetes expirados son los más fáciles de reconvertir. Guión: <em>"[Nombre], veo que tu paquete venció — ¿quieres renovarlo? Puedo guardarte el mismo horario que tenías."</em></span></label>
4735:               </div>
```

## Declaraciones de globalSearch

### Coincidencia 1 — línea 8715

```html
8710:     clearNuevaCita();
8711:   }
8712: }
8713: 
8714: // ── BÚSQUEDA GLOBAL ──
8715: function globalSearch(val) {
8716:   showView('agenda');
8717:   const fSearch = document.getElementById('fSearch');
8718:   if (fSearch) { fSearch.value = val; renderAgenda(); }
8719: }
8720: 
```

### Coincidencia 2 — línea 9505

```html
9500:   document.getElementById('reporteMesBody').innerHTML = html;
9501:   document.getElementById('modalReporteMes').style.display = 'flex';
9502: }
9503: 
9504: // ── BÚSQUEDA GLOBAL EXPANDIDA ──
9505: function globalSearch(val) {
9506:   if (!val || !val.trim()) return;
9507:   const q = val.trim().toLowerCase();
9508: 
9509:   // ¿Es un paciente?
9510:   const esPaciente = (allData.citas || []).some(c =>
```

## Referencias a copyGestionTexto

### Coincidencia 1 — línea 3954

```html
3949:               </p>
3950:             </div>
3951:             <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
3952:           </div>
3953:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3957:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
3958:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
3959:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
```

### Coincidencia 2 — línea 3955

```html
3950:             </div>
3951:             <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
3952:           </div>
3953:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3957:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
3958:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
3959:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
3960:             <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
```

### Coincidencia 3 — línea 3956

```html
3951:             <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
3952:           </div>
3953:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3957:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
3958:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
3959:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
3960:             <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
3961:             <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
```

### Coincidencia 4 — línea 3957

```html
3952:           </div>
3953:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3957:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
3958:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
3959:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
3960:             <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
3961:             <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
3962:             <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
```

### Coincidencia 5 — línea 3958

```html
3953:           <div style="display:flex;gap:8px;flex-wrap:wrap">
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3957:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
3958:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
3959:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
3960:             <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
3961:             <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
3962:             <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
3963:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('asesor')">Copiar información para el asesor</button>
```

### Coincidencia 6 — línea 3959

```html
3954:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
3955:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
3956:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
3957:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
3958:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
3959:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
3960:             <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
3961:             <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
3962:             <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
3963:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('asesor')">Copiar información para el asesor</button>
3964:           </div>
```

### Coincidencia 7 — línea 3963

```html
3958:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
3959:             <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
3960:             <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
3961:             <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
3962:             <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
3963:             <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('asesor')">Copiar información para el asesor</button>
3964:           </div>
3965:         </div>
3966: 
3967:         <!-- Dashboard KPIs calculados -->
3968:         <div id="kpiTableroResult"></div>
```

### Coincidencia 8 — línea 4017

```html
4012:             </p>
4013:           </div>
4014:           <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
4015:         </div>
4016:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4020:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
4021:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
4022:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
```

### Coincidencia 9 — línea 4018

```html
4013:           </div>
4014:           <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
4015:         </div>
4016:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4020:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
4021:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
4022:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
4023:           <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
```

### Coincidencia 10 — línea 4019

```html
4014:           <span id="copyGestionStatus" style="display:none;padding:7px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#047857;font-size:.78rem;font-weight:700">Información copiada correctamente</span>
4015:         </div>
4016:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4020:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
4021:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
4022:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
4023:           <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
4024:           <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
```

### Coincidencia 11 — línea 4020

```html
4015:         </div>
4016:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4020:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
4021:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
4022:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
4023:           <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
4024:           <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
4025:           <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
```

### Coincidencia 12 — línea 4021

```html
4016:         <div style="display:flex;gap:8px;flex-wrap:wrap">
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4020:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
4021:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
4022:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
4023:           <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
4024:           <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
4025:           <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
4026:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('asesor')">Copiar información para el asesor</button>
```

### Coincidencia 13 — línea 4022

```html
4017:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('completo')">Copiar resumen completo</button>
4018:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('ejecutivo')">Copiar resumen ejecutivo</button>
4019:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('indicadores')">Copiar indicadores</button>
4020:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('diagnostico')">Copiar diagnóstico</button>
4021:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
4022:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
4023:           <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
4024:           <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
4025:           <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
4026:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('asesor')">Copiar información para el asesor</button>
4027:         </div>
```

### Coincidencia 14 — línea 4026

```html
4021:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('estrategias')">Copiar estrategias recomendadas</button>
4022:           <button class="btn btn-ghost btn-sm" onclick="copyGestionTexto('plan')">Copiar plan de acción</button>
4023:           <button class="btn btn-ghost btn-sm" onclick="abrirCopiarListaGestion()">Copiar lista seleccionada</button>
4024:           <button class="btn btn-ghost btn-sm" onclick="copiarInfoPersonaGestion()">Copiar información de una persona</button>
4025:           <button class="btn btn-ghost btn-sm" onclick="abrirMensajeWAGestion()">Copiar mensaje para WhatsApp</button>
4026:           <button class="btn btn-teal btn-sm" onclick="copyGestionTexto('asesor')">Copiar información para el asesor</button>
4027:         </div>
4028:       </div>
4029: 
4030:       <!-- ══ ESTRUCTURA FINANCIERA ══ -->
4031:       <div style="margin-top:20px;margin-bottom:20px">
```

## Referencias a openPago

### Coincidencia 1 — línea 17118

```html
17113:     const wa  = tel.length >= 7 ? `https://wa.me/57${tel.slice(-10)}?text=${encodeURIComponent(msg)}` : null;
17114:     return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:.82rem;padding:7px 12px;background:rgba(255,255,255,.6);border-radius:7px;gap:10px;flex-wrap:wrap">
17115:       <span><strong>${c.nombre || '—'}</strong> · ${fmtDate(normDate(c.fecha))} · <span style="color:#92400e;font-weight:600">${c.precio}</span></span>
17116:       <div style="display:flex;gap:6px">
17117:         ${wa ? `<a href="${wa}" target="_blank" class="btn btn-sm" style="background:#d97706;color:#fff;border:none;text-decoration:none">💬 Cobrar WA</a>` : ''}
17118:         <button class="btn btn-ghost btn-sm" onclick="openPago('${c.id}')">💳 Registrar pago</button>
17119:       </div>
17120:     </div>`;
17121:   }).join('');
17122: }
17123: 
```

## Solicitudes de inicio de sesión

No se encontraron coincidencias.

## AbortController del inicio de sesión

No se encontraron coincidencias.

## Temporizadores del inicio de sesión

No se encontraron coincidencias.

## Estados de pago canónicos

### Coincidencia 1 — línea 6908

```html
6903:     body:JSON.stringify({action:'savePayment', token:TOKEN, data:payload})
6904:   }).then(r => r.json());
6905:   if (d.ok) {
6906:     if (mode === 'approve') {
6907:       const obs = payload.observaciones || 'Pago confirmado desde registro de comprobante';
6908:       const v = await fetch(`${APPS_SCRIPT_URL}?action=verifyPayment&token=${encodeURIComponent(TOKEN)}&id=${encodeURIComponent(d.id)}&estado=PAGO_APROBADO&observaciones=${encodeURIComponent(obs)}`).then(r => r.json());
6909:       if (!v.ok) return toast(v.error || 'El comprobante se subió, pero no se pudo aprobar', 'err');
6910:       toast('Pago confirmado y cita autorizada');
6911:     } else {
6912:       toast('Comprobante subido para revisión');
6913:     }
```

### Coincidencia 2 — línea 6962

```html
6957:     if (seenPayments.has(key)) return;
6958:     seenPayments.add(key);
6959:     pagosUnicos.push(p);
6960:   });
6961:   const cuentas = operationsData.cuentas || [];
6962:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6963:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6964:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6965:   document.getElementById('pagosStats').innerHTML = [
6966:     ['Por verificar', porVerificar],
6967:     ['Aprobados', aprobados],
```

### Coincidencia 3 — línea 6963

```html
6958:     seenPayments.add(key);
6959:     pagosUnicos.push(p);
6960:   });
6961:   const cuentas = operationsData.cuentas || [];
6962:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6963:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6964:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6965:   document.getElementById('pagosStats').innerHTML = [
6966:     ['Por verificar', porVerificar],
6967:     ['Aprobados', aprobados],
6968:     ['Rechazados', rechazados],
```

### Coincidencia 4 — línea 6964

```html
6959:     pagosUnicos.push(p);
6960:   });
6961:   const cuentas = operationsData.cuentas || [];
6962:   const porVerificar = pagos.filter(p => ['Por verificar','COMPROBANTE_RECIBIDO'].includes(p.EstadoPago || '')).length;
6963:   const aprobados = pagos.filter(p => ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '')).length;
6964:   const rechazados = pagos.filter(p => ['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '')).length;
6965:   document.getElementById('pagosStats').innerHTML = [
6966:     ['Por verificar', porVerificar],
6967:     ['Aprobados', aprobados],
6968:     ['Rechazados', rechazados],
6969:     ['Cuentas activas', cuentas.filter(c => (c.Estado || '') === 'Activa').length]
```

### Coincidencia 5 — línea 6980

```html
6975:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6976:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6977:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6978: 
6979:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6980:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6981:     return `<div class="team-card">
6982:       <div class="team-card-head">
6983:         <div>
6984:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6985:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
```

### Coincidencia 6 — línea 6980

```html
6975:       <div class="team-card-head"><div><h3>${esc(a.Medio)}</h3><div class="team-muted">${esc(a.Tipo)} · ${esc(a.Numero)}</div></div><span class="team-pill ok">${esc(a.Estado || 'Activa')}</span></div>
6976:       <div class="team-muted" style="margin-top:8px"><strong>Titular:</strong> ${esc(a.Titular)}</div>
6977:     </div>`).join('') : '<div class="empty"><p>No hay cuentas configuradas.</p></div>';
6978: 
6979:   document.getElementById('paymentsList').innerHTML = pagosUnicos.length ? pagosUnicos.slice(0, 40).map(p => {
6980:     const tone = ['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? 'ok' : (['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? 'warn' : 'info');
6981:     return `<div class="team-card">
6982:       <div class="team-card-head">
6983:         <div>
6984:           <h3>${esc(p.Cliente || 'Cliente')}</h3>
6985:           <div class="team-muted">${esc(p.CodigoReserva)} · ${esc(p.ServicioPlan)} · ${formatPrecio(parsePrecio(p.ValorRecibido || 0))}</div>
```

### Coincidencia 7 — línea 6993

```html
6988:       </div>
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
```

### Coincidencia 8 — línea 6993

```html
6988:       </div>
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
```

### Coincidencia 9 — línea 6994

```html
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
```

### Coincidencia 10 — línea 6994

```html
6989:       <div class="team-muted" style="margin-top:8px">Medio: ${esc(p.MedioPago || '')} · Cuenta: ${esc(paymentAccountLabel(p.CuentaReceptora))}</div>
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
```

### Coincidencia 11 — línea 6995

```html
6990:       ${p.Comprobante ? `<div class="team-muted">Comprobante/ref: ${String(p.Comprobante).startsWith('http') ? `<a href="${esc(p.Comprobante)}" target="_blank" rel="noopener">Ver comprobante</a>` : esc(p.Comprobante)}</div>` : ''}
6991:       ${p.Observaciones ? `<div class="team-muted">Obs: ${esc(p.Observaciones)}</div>` : ''}
6992:       <div class="team-card-actions">
6993:         ${!['Aprobado','PAGO_APROBADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-teal btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_APROBADO')">Aprobar</button>` : ''}
6994:         ${!['Rechazado','PAGO_RECHAZADO'].includes(p.EstadoPago || '') ? `<button class="btn btn-danger btn-sm" onclick="verifyPayment('${esc(p.ID)}','PAGO_RECHAZADO')">Rechazar</button>` : ''}
6995:         <button class="btn btn-ghost btn-sm" onclick="verifyPayment('${esc(p.ID)}','COMPROBANTE_RECIBIDO')">Pedir revisión</button>
6996:       </div>
6997:     </div>`;
6998:   }).join('') : '<div class="empty"><p>No hay pagos registrados aún.</p></div>';
6999: 
7000:   const planTemplates = operationsData.plantillasPlanes || [];
```
