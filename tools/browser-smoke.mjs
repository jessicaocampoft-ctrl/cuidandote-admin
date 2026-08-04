import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';

const root = process.cwd();
const target = process.argv[2] || 'index.html';
const source = fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '');
const outputDir = path.join(root, 'audit-output');
fs.mkdirSync(outputDir, { recursive: true });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function findChrome() {
  const candidates = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'];
  for (const candidate of candidates) {
    const result = spawnSync(candidate, ['--version'], { encoding: 'utf8' });
    if (result.status === 0) return candidate;
  }
  return '';
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ({
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  })[ext] || 'application/octet-stream';
}

function startServer() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const relative = requestPath === '/' ? target : requestPath.replace(/^\/+/, '');
      const absolute = path.resolve(root, relative);
      if (!absolute.startsWith(root) || !fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) {
        res.writeHead(404); res.end('Not found'); return;
      }
      res.writeHead(200, { 'Content-Type': contentType(absolute), 'Cache-Control': 'no-store' });
      fs.createReadStream(absolute).pipe(res);
    });
    server.listen(4173, '127.0.0.1', () => resolve(server));
  });
}

async function waitForJson(url, attempts = 80) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch (_) {}
    await sleep(125);
  }
  throw new Error(`No respondió ${url}`);
}

class CDP {
  constructor(url) {
    this.url = url;
    this.id = 0;
    this.pending = new Map();
    this.events = [];
  }
  async connect() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result || {});
      } else {
        this.events.push(message);
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  close() {
    try { this.ws.close(); } catch (_) {}
  }
}

async function evaluate(cdp, expression) {
  const response = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  });
  if (response.exceptionDetails) {
    const description = response.exceptionDetails.exception?.description || response.exceptionDetails.text || 'Excepción de JavaScript';
    throw new Error(description);
  }
  return response.result?.value;
}

const chrome = findChrome();
if (!chrome) {
  console.error('No se encontró Chrome/Chromium en el runner.');
  process.exit(1);
}

const server = await startServer();
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cuidandote-chrome-'));
const chromeProcess = spawn(chrome, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--disable-extensions',
  '--remote-debugging-port=9222',
  `--user-data-dir=${profile}`,
  'about:blank'
], { stdio: 'ignore' });

let cdp;
const failures = [];
const passes = [];

try {
  await waitForJson('http://127.0.0.1:9222/json/version');
  const targetInfo = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
  cdp = new CDP(targetInfo.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Log.enable');

  const preload = String.raw`
    (() => {
      window.__smokeErrors = [];
      window.addEventListener('error', event => window.__smokeErrors.push('error: ' + (event.message || 'desconocido')));
      window.addEventListener('unhandledrejection', event => window.__smokeErrors.push('promise: ' + String(event.reason && (event.reason.stack || event.reason.message) || event.reason)));
      try {
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: { writeText: async text => { window.__smokeClipboard = String(text); } }
        });
      } catch (_) {}
      const originalFetch = window.fetch.bind(window);
      window.fetch = async (input, init = {}) => {
        const rawUrl = typeof input === 'string' ? input : input.url;
        const url = new URL(rawUrl, location.href);
        if (!url.hostname.includes('script.google.com')) return originalFetch(input, init);
        let action = url.searchParams.get('action') || '';
        try {
          if (!action && init.body) action = JSON.parse(init.body).action || '';
        } catch (_) {}
        const qaNow = new Date();
        const qaDate = [
          qaNow.getFullYear(),
          String(qaNow.getMonth() + 1).padStart(2, '0'),
          String(qaNow.getDate()).padStart(2, '0')
        ].join('-');
        const qaCita = {
          id: 'QA-CITA',
          ID: 'QA-CITA',
          CitaID: 'QA-CITA',
          nombre: 'QA Auditoría',
          Cliente: 'QA Auditoría',
          fecha: qaDate,
          Fecha: qaDate,
          hora: '10:00',
          Hora: '10:00',
          servicio: 'Descarga muscular completa',
          Servicio: 'Descarga muscular completa',
          estado: 'Pendiente de pago',
          Estado: 'Pendiente de pago',
          precio: '10000',
          Precio: '10000'
        };
        const common = {
          ok: true, citas: [qaCita], pacientes: [], bloqueos: [], eventos: [], codigos: [],
          profesionales: [], pagos: [], cuentas: [], paquetes: [], comisiones: [],
          waitlist: [], queue: [], items: [], data: {}, kv: {}, history: [],
          currentUser: { id: 'qa', nombre: 'QA Auditoría', rol: 'Superadministradora' }
        };
        const byAction = {
          adminLogin: { ...common, sessionToken: 'q'.repeat(48) },
          getAdminKV: { ok: true, data: {} },
          teamData: { ...common },
          operationsData: { ...common },
          dailyOpsData: { ...common },
          passportAdminList: { ok: true, passports: [] },
          getEncuestaStats: { ok: true, nps: 0, encuestas: 0, respuestas: [] },
          getKPIHistory: { ok: true, history: [] },
          getWaitlist: { ok: true, items: [] },
          automationStatus: { ok: true, config: {}, jobs: [] },
          automationQueue: { ok: true, queue: [] },
          availability: { ok: true, slots: [] },
          professionalAgenda: { ok: true, professional: { nombre: 'QA', rol: 'Fisioterapeuta' }, citas: [] }
        };
        const payload = byAction[action] || common;
        return new Response(JSON.stringify(payload), { status: 200, headers: { 'Content-Type': 'application/json' } });
      };
    })();
  `;
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: preload });
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:4173/${target}` });
  let panelReady = false;
  for (let intento = 0; intento < 100; intento++) {
    try {
      panelReady = await evaluate(cdp, `document.readyState === 'complete' && typeof showView === 'function' && !!document.getElementById('loginScreen') && !!document.getElementById('adminApp')`);
    } catch (_) {}
    if (panelReady) break;
    await sleep(100);
  }
  if (!panelReady) throw new Error('El panel no terminó de cargar en 10 segundos.');
  await sleep(200);

  const basic = await evaluate(cdp, `(() => ({
    title: document.title,
    login: !!document.getElementById('loginScreen'),
    app: !!document.getElementById('adminApp'),
    doctype: document.doctype && document.doctype.name,
    ready: document.readyState,
    errors: window.__smokeErrors || []
  }))()`);
  if (!basic.login || !basic.app || basic.doctype !== 'html') failures.push({ test: 'Carga básica', detail: JSON.stringify(basic) });
  else passes.push('Carga básica del HTML, login y aplicación');

  await evaluate(cdp, `(() => {
    try { TOKEN = 'q'.repeat(48); } catch (_) {}
    try {
      const now = new Date();
      const qaDate = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
      allData = {
        citas: [{ id:'QA-CITA', nombre:'QA Auditoría', fecha:qaDate, hora:'10:00', servicio:'Descarga muscular completa', estado:'Pendiente de pago', precio:'10000' }],
        pacientes: [], bloqueos: [], eventos: [], codigos: [], servicios: [],
        currentUser: {id:'qa',nombre:'QA Auditoría',rol:'Superadministradora'}
      };
    } catch (_) {}
    try { operationsData = { citas: [...allData.citas], pagos: [], cuentas: [], paquetes: [], comisiones: [], waitlist: [] }; } catch (_) {}
    const login = document.getElementById('loginScreen'); if (login) login.style.display = 'none';
    const app = document.getElementById('adminApp'); if (app) app.style.display = 'block';
    return true;
  })()`);

  const views = [...new Set([...source.matchAll(/showView\(\s*["']([^"']+)["']/g)].map(match => match[1]))];
  for (const view of views) {
    try {
      const result = await evaluate(cdp, `(async () => {
        if (typeof showView !== 'function') throw new Error('showView no existe');
        showView(${JSON.stringify(view)});
        await new Promise(r => setTimeout(r, 80));
        return { errors: window.__smokeErrors.splice(0), visible: [...document.querySelectorAll('[id^="view-"]')].filter(el => getComputedStyle(el).display !== 'none').map(el => el.id) };
      })()`);
      if (result.errors?.length) failures.push({ test: `Vista ${view}`, detail: result.errors.join(' | ') });
      else passes.push(`Vista: ${view}`);
    } catch (error) {
      failures.push({ test: `Vista ${view}`, detail: error.message });
    }
  }

  const localTests = [
    ['Dictado por voz', `(() => { const p=document.getElementById('voicePanel'); if(!p) throw new Error('voicePanel ausente'); const before=p.style.display; toggleVoicePanel(); const opened=p.style.display; toggleVoicePanel(); return before !== opened; })()`],
    ['Copiar resumen de gestión', `(async () => { if(typeof copyGestionTexto!=='function') throw new Error('copyGestionTexto ausente'); await copyGestionTexto('ejecutivo'); return !!window.__smokeClipboard; })()`],
    ['Abrir pago desde una cita', `(async () => {
      const s=document.getElementById('payCitaId');
      if(!s) throw new Error('payCitaId ausente');
      const now=new Date();
      const qaDate=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
      const qaCita={id:'QA-CITA',ID:'QA-CITA',CitaID:'QA-CITA',nombre:'QA Auditoría',Cliente:'QA Auditoría',fecha:qaDate,Fecha:qaDate,hora:'10:00',Hora:'10:00',servicio:'Descarga muscular completa',Servicio:'Descarga muscular completa',estado:'Pendiente de pago',Estado:'Pendiente de pago',precio:'10000',Precio:'10000'};
      allData.citas=[qaCita];
      operationsData.citas=[qaCita];
      openPago('QA-CITA');
      await new Promise(r=>setTimeout(r,300));
      const options=[...s.options].map(o=>({value:o.value,text:o.textContent}));
      const display=getComputedStyle(document.getElementById('vPagos')).display;
      if(s.value!=='QA-CITA' || display==='none') throw new Error(JSON.stringify({value:s.value,display,options,citas:allData.citas,operaciones:operationsData.citas}));
      return true;
    })()`],
      const s=document.getElementById('payCitaId');
      if(!s) throw new Error('payCitaId ausente');
      const now=new Date();
      const qaDate=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
      const qaCita={id:'QA-CITA',ID:'QA-CITA',CitaID:'QA-CITA',nombre:'QA Auditoría',Cliente:'QA Auditoría',fecha:qaDate,Fecha:qaDate,hora:'10:00',Hora:'10:00',servicio:'Descarga muscular completa',Servicio:'Descarga muscular completa',estado:'Pendiente de pago',Estado:'Pendiente de pago',precio:'10000',Precio:'10000'};
      allData.citas=[qaCita];
      operationsData.citas=[qaCita];
      openPago('QA-CITA');
      await new Promise(r=>setTimeout(r,300));
      const options=[...s.options].map(o=>({value:o.value,text:o.textContent}));
      const display=getComputedStyle(document.getElementById('vPagos')).display;
      if(s.value!=='QA-CITA' || display==='none') throw new Error(JSON.stringify({value:s.value,display,options,citas:allData.citas,operaciones:operationsData.citas}));
      return true;
    })()`],
    ['Búsqueda global', `(() => { if(typeof globalSearch!=='function') throw new Error('globalSearch ausente'); globalSearch('QA'); const f=document.getElementById('fSearch'); return !f || f.value==='QA'; })()`],
    ['Solicitud con timeout', `(async () => { if(typeof fetchJsonWithTimeout!=='function') throw new Error('fetchJsonWithTimeout ausente'); const d=await fetchJsonWithTimeout(APPS_SCRIPT_URL+'?action=ping',{},1000); return d && d.ok===true; })()`]
  ];

  for (const [name, expression] of localTests) {
    try {
      const ok = await evaluate(cdp, expression);
      const errors = await evaluate(cdp, `window.__smokeErrors.splice(0)`);
      if (!ok || errors.length) failures.push({ test: name, detail: errors.join(' | ') || 'Resultado falso' });
      else passes.push(name);
    } catch (error) {
      failures.push({ test: name, detail: error.message });
    }
  }

  const cdpErrors = cdp.events
    .filter(event => event.method === 'Runtime.exceptionThrown' || (event.method === 'Log.entryAdded' && event.params?.entry?.level === 'error'))
    .map(event => event.params?.exceptionDetails?.exception?.description || event.params?.exceptionDetails?.text || event.params?.entry?.text || event.method);
  const relevantCdpErrors = cdpErrors.filter(text => !/favicon|ERR_BLOCKED_BY_CLIENT|Failed to load resource|X-Frame-Options may only be set via an HTTP header/i.test(text));
  if (relevantCdpErrors.length) failures.push({ test: 'Errores del navegador', detail: relevantCdpErrors.join(' | ').slice(0, 5000) });

} finally {
  try { cdp?.close(); } catch (_) {}
  try { chromeProcess.kill('SIGKILL'); } catch (_) {}
  await new Promise(resolve => server.close(resolve));
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {}
}

const report = [
  '# Prueba funcional automática en navegador',
  '',
  `- Pruebas superadas: ${passes.length}`,
  `- Fallos: ${failures.length}`,
  '',
  '## Pruebas superadas',
  '',
  ...passes.map(item => `- ${item}`),
  '',
  '## Fallos',
  '',
  ...(failures.length ? failures.map(item => `- **${item.test}:** ${item.detail}`) : ['Ninguno.']),
  '',
  '## Alcance',
  '',
  'La prueba usa datos simulados y no modifica Google Sheets, Calendar, Apps Script ni información real. La publicación final todavía requiere una prueba breve con una sesión autorizada.'
].join('\n');

fs.writeFileSync(path.join(outputDir, 'browser-smoke.md'), report, 'utf8');
fs.writeFileSync(path.join(outputDir, 'browser-smoke.json'), JSON.stringify({ passes, failures }, null, 2), 'utf8');
console.log(report);
if (failures.length) process.exit(1);
