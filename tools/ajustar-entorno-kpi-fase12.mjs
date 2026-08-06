import fs from 'node:fs';

const path='tools/validar-kpi-fase12.mjs';
let source=fs.readFileSync(path,'utf8');
const from="  console,Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,parseInt,parseFloat,isNaN,NumberFormat:Intl.NumberFormat,";
const to="  console,Date:class BrowserDate extends Date { toLocalDateStr(){ return `${this.getFullYear()}-${String(this.getMonth()+1).padStart(2,'0')}-${String(this.getDate()).padStart(2,'0')}`; } },Math,JSON,Object,Array,String,Number,Boolean,RegExp,parseInt,parseFloat,isNaN,NumberFormat:Intl.NumberFormat,";
if(!source.includes(from))throw new Error('No se encontró el punto exacto del entorno Date QA.');
source=source.replace(from,to);
fs.writeFileSync(path,source,'utf8');
console.log('Entorno QA actualizado con Date.toLocalDateStr().');
