# Ejecutar hotfix de ingreso administrativo

Aumentar únicamente la espera de `adminLogin` de 45 a 120 segundos.

Restricciones:
- partir exactamente de `main` en `4dad69fb9e39b34e4dbc6fe28ba802497e6cb8bf`;
- no modificar Apps Script;
- no modificar Agenda, Pagos, Pasaporte ni módulos de segmentación;
- conservar credenciales, acción y token de sesión;
- detenerse ante cualquier cambio funcional adicional.
