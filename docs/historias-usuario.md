# Historias de usuario – Canal digital bancario

**Proyecto:** Mantenimiento de Software Bancario  
**Tipo:** Prototipo académico. Las operaciones son simuladas y no se conectan a una entidad financiera.

| Código | Historia de usuario | Criterio de aceptación |
|---|---|---|
| HU-01 | Como usuario, quiero ingresar con un nombre y una clave de demostración para acceder al prototipo. | El formulario permite ingresar datos ficticios y muestra el panel principal. |
| HU-02 | Como usuario, quiero consultar mi saldo simulado para conocer el dinero disponible en el entorno de prueba. | El panel muestra el saldo y actualiza el valor cuando se registran operaciones simuladas. |
| HU-03 | Como usuario, quiero registrar una transferencia ficticia para probar el flujo de envío de dinero. | Se solicitan destinatario, cuenta ficticia y valor; se valida que el saldo sea suficiente y se registra el movimiento. |
| HU-04 | Como usuario, quiero simular el pago de un servicio para probar el formulario de pagos. | Se selecciona un servicio, se ingresa referencia ficticia y valor; el sistema valida el saldo y registra el pago. |
| HU-05 | Como usuario, quiero consultar el historial para revisar las operaciones de la sesión. | Se muestran los movimientos con descripción, fecha y valor. |

## Alcance y restricciones
- No se recopilan credenciales reales ni datos financieros personales.
- No existe conexión con BBVA Colombia ni con otro banco.
- Los datos se mantienen temporalmente en memoria y se reinician al recargar la página.
- No se ejecutan transferencias ni pagos reales.
