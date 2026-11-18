# Agente IA — Redes Sociales

## Estado de esta entrega

El panel incorpora un módulo de preparación y pruebas. La publicación real está bloqueada: no se han conectado cuentas de Meta ni se han almacenado secretos en el navegador.

## Arquitectura detectada

- **Frontend:** `cuidandote-admin/index.html`, JavaScript sin framework y módulos bajo `js/`.
- **Backend y datos:** Google Apps Script y Google Sheets; el panel sincroniza configuración no sensible mediante `AdminKV`.
- **Autenticación:** sesiones administrativas y profesionales en Apps Script.
- **Comercial:** CRM local sincronizado en `commercial-sales.js`; una interacción social será una oportunidad potencial, sin asignar captación a Michelle automáticamente.
- **Canales existentes:** herramientas de WhatsApp, agenda, pagos y seguimiento.

## Lo que falta para activar Meta (intervención de la administradora)

1. Crear una aplicación de Meta Business y asociar la página de Facebook y la cuenta de Instagram profesional.
2. Configurar un gateway HTTPS propio (Cloud Run, Cloud Functions o equivalente) como callback. No usar Apps Script directamente: debe verificar `X-Hub-Signature-256` antes de aceptar el cuerpo del webhook.
3. Guardar en un gestor de secretos, nunca en el panel: `META_APP_SECRET`, token de página, token de Instagram, token de verificación del webhook y `OPENAI_API_KEY`.
4. Solicitar y obtener acceso adecuado. Para Facebook Pages se requieren, como mínimo según el caso, `pages_show_list`, `pages_read_engagement`, `pages_read_user_content` y `pages_manage_metadata`; para Instagram comentarios, `instagram_manage_comments`, `pages_manage_metadata` y `pages_read_engagement` o `pages_show_list`. Meta exige acceso avanzado/revisión y, para notificaciones en vivo de Instagram, los requisitos de cuenta empresarial/verificación aplicables.
5. Registrar el callback HTTPS, suscribirse a `feed` (Facebook) y `comments` (Instagram), e instalar la app en la página mediante la suscripción oficial.
6. Probar con cuentas que tengan rol en la app mientras esté en modo desarrollo. Solo pasar a producción tras la prueba de los casos del panel y autorización explícita.

## Flujo de producción previsto

`Meta webhook → gateway con firma validada → cola/idempotencia por comment_id → clasificación y políticas → búsqueda de conocimiento confirmado → OpenAI → filtro de seguridad → respuesta Graph API → historial/auditoría y oportunidad comercial`

Reglas obligatorias: ignorar eventos del propio negocio, no seguir instrucciones recibidas dentro del comentario, no diagnosticar ni prometer resultados, no publicar ante riesgo clínico/reclamo/datos insuficientes, y reintentos con límite para errores recuperables.

## Fuentes oficiales verificadas (18 nov. 2026)

- [Webhooks para Pages](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-pages/)
- [Webhooks para Instagram](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-instagram/)
- [Referencia de comentarios Graph API](https://developers.facebook.com/docs/graph-api/reference/object/comments/)
- [OpenAI API quickstart](https://developers.openai.com/api/docs/quickstart)
