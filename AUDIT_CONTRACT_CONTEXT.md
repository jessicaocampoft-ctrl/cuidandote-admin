# Contexto de acciones sin ruta aparente

## agenda

### Coincidencia 1 — línea 7699

```html
7691:     <textarea class="kpi-note" id="kpiNote" placeholder="Qué ocurrió, qué decisión tomaste y qué revisarás después..."></textarea>
7692:     <div class="kpi-explorer-actions"><button class="btn btn-teal" id="kpiActionBtn">Tomar acción</button><button class="btn btn-ghost" id="kpiExplainBtn">Ver explicación completa</button><button class="btn btn-ghost" id="kpiSaveNote" onclick="saveKPINote()">Guardar nota</button></div>
7693:   </div>`;
7694:   document.body.appendChild(modal);
7695:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
```

### Coincidencia 2 — línea 7707

```html
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
7713:   const citas = citasReales();
7714:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7715:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
```

## basedatos

### Coincidencia 1 — línea 7706

```html
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
7713:   const citas = citasReales();
7714:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
```

## finanzas

### Coincidencia 1 — línea 7700

```html
7692:     <div class="kpi-explorer-actions"><button class="btn btn-teal" id="kpiActionBtn">Tomar acción</button><button class="btn btn-ghost" id="kpiExplainBtn">Ver explicación completa</button><button class="btn btn-ghost" id="kpiSaveNote" onclick="saveKPINote()">Guardar nota</button></div>
7693:   </div>`;
7694:   document.body.appendChild(modal);
7695:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
```

### Coincidencia 2 — línea 7701

```html
7693:   </div>`;
7694:   document.body.appendChild(modal);
7695:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
```

### Coincidencia 3 — línea 7702

```html
7694:   document.body.appendChild(modal);
7695:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
```

### Coincidencia 4 — línea 7703

```html
7695:   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeKPIExplorer(); });
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
```

### Coincidencia 5 — línea 7704

```html
7696: }
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
```

### Coincidencia 6 — línea 7705

```html
7697: 
7698: const KPI_INTERACTIVE = {
7699:   gkKpi1:{label:'Sesiones realizadas',action:'agenda',actionLabel:'Revisar agenda',type:'number'},
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
7713:   const citas = citasReales();
```

## recuperacion

### Coincidencia 1 — línea 7708

```html
7700:   gkKpi2:{label:'Mix de servicios Full',action:'finanzas',actionLabel:'Revisar servicios',type:'pct'},
7701:   gkKpi3:{label:'Leads generados',action:'finanzas',actionLabel:'Registrar leads',type:'number'},
7702:   gkKpi4:{label:'Tasa de conversión',action:'finanzas',actionLabel:'Revisar conversión',type:'pct'},
7703:   gkKpi5:{label:'Ventas brutas',action:'finanzas',actionLabel:'Abrir finanzas',type:'money'},
7704:   gkKpi6:{label:'Encuestas realizadas',action:'finanzas',actionLabel:'Cargar encuestas',type:'pct'},
7705:   gkKpi7:{label:'NPS',action:'finanzas',actionLabel:'Revisar encuestas',type:'number'},
7706:   gkKpi8:{label:'Base de datos actualizada',action:'basedatos',actionLabel:'Completar fichas',type:'pct'},
7707:   gkKpi4b:{label:'Tasa de cancelación',action:'agenda',actionLabel:'Revisar cancelaciones',type:'pct'},
7708:   gkKpi9:{label:'Retención a 60 días',action:'recuperacion',actionLabel:'Recuperar pacientes',type:'pct'}
7709: };
7710: let _activeKPIExplorer = null;
7711: 
7712: function _kpiSnapshot(m,y) {
7713:   const citas = citasReales();
7714:   const mes = citas.filter(c => { const [cy,cm]=normDate(c.fecha).split('-'); return +cm===m && +cy===y; });
7715:   const mixFull = mes.filter(c => esSesionFull(c.servicio)).length;
7716:   const leads = getLeadsMes(m,y);
```
