---
title: "Economía de la nube: costos fijos, variables y ahorro"
summary: "Compara costos fijos y variables, los costos ocultos de un centro de datos propio, BYOL frente a licencias incluidas, el rightsizing y el ahorro de automatizar."
domain: "cloud-concepts"
order: 4
examTasks: ["1.4"]
services: ["AWS License Manager", "AWS Compute Optimizer", "Amazon RDS"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/life-sciences-lens/lsperf06-bp02.html"
  - "https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Oracle.Concepts.Licensing.html"
  - "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"
  - "https://aws.amazon.com/economics/"
---

## ¿Por qué importa?

Una cadena de supermercados de Bogotá debe renovar los servidores de su centro de datos. El proveedor pide un pago grande por adelantado, el contrato del local donde están los equipos sube cada año, y el área de sistemas necesita dos técnicos más para atender las fallas. Además, la empresa ya pagó licencias de base de datos que no quiere perder.

La gerencia financiera pregunta: ¿cuánto ahorraríamos en la nube y por qué? Para responder necesitas los conceptos de **economía de la nube** que evalúa el examen.

## Costos fijos frente a costos variables

- **Costo fijo:** se paga aunque no se use el recurso. Comprar servidores es el ejemplo clásico: es un **gasto de capital (CapEx)** que se hace antes de saber cuánto se usarán.
- **Costo variable:** sube o baja según el consumo real. Es un **gasto operativo (OpEx)**.

La primera de las seis ventajas de la nube según AWS es justamente **trade fixed expense for variable expense**: en lugar de invertir mucho en centros de datos y servidores antes de saber cómo los usarás, pagas solo cuando consumes recursos y solo por lo que consumes.

| | On-premises | Nube de AWS |
| --- | --- | --- |
| Tipo de gasto | Mayormente fijo (CapEx) | Mayormente variable (OpEx) |
| Capacidad | Se compra pensando en el pico de demanda | Se ajusta a la demanda real |
| Recursos ociosos | Se pagan igual | Se pueden apagar y dejar de pagar |

## Los costos de un entorno on-premises

Al comparar con la nube, no basta con mirar el precio del servidor. Un análisis de **costo total de propiedad** (*total cost of ownership*, **TCO**) suma todo lo que cuesta tener infraestructura propia durante su vida útil:

- **Hardware:** servidores, almacenamiento y red, y su reemplazo periódico.
- **Licencias de software.**
- **Energía** para alimentar los equipos.
- **Refrigeración** del centro de datos.
- **Espacio físico** (el local o la sala de servidores).
- **Personal** especializado para instalar, mantener y reparar.

AWS se encarga del trabajo pesado de operar centros de datos, como montar, cablear y alimentar servidores, para que tu equipo se concentre en tus clientes. Esto corresponde a la ventaja **stop spending money running and maintaining data centers** y al principio de costos "dejar de gastar en trabajo pesado indiferenciado".

## Economías de escala

Las **economías de escala** significan que el costo por unidad baja cuando el volumen sube. Como AWS agrupa el uso de cientos de miles de clientes, logra costos más bajos que se traducen en **precios de pago por uso más bajos**. Una empresa sola, comprando su propio hardware, no alcanza ese volumen. En el examen, "precios más bajos porque AWS opera a gran escala" = economías de escala.

## Estrategias de licenciamiento: BYOL frente a licencias incluidas

| | **License included** (licencia incluida) | **BYOL** (*Bring Your Own License*, trae tu propia licencia) |
| --- | --- | --- |
| ¿Quién tiene la licencia? | AWS; el costo va dentro del precio del servicio | Tú; reutilizas licencias que ya compraste |
| Cuándo conviene | No tienes licencias o quieres simplicidad | Ya pagaste licencias vigentes y quieres aprovecharlas |
| Ejemplo | Amazon RDS for Oracle Standard Edition 2 con licencia incluida | Amazon RDS for Oracle con tus licencias de Oracle |

Con BYOL debes cumplir las reglas de licenciamiento del fabricante. Por ejemplo, en un despliegue Multi-AZ de RDS for Oracle con BYOL necesitas licencia para la instancia principal y también para la de respaldo.

**AWS License Manager** ayuda a administrar licencias de fabricantes como Microsoft, SAP, Oracle e IBM entre cuentas y Regiones. Permite definir reglas con límites para evitar excesos de uso y el incumplimiento, ofrece paneles para auditorías y facilita aprovechar BYOL. También permite cambiar entre licencias provistas por AWS y BYOL sin volver a desplegar en los casos compatibles.

## Rightsizing

El **rightsizing** (dimensionamiento correcto) consiste en ajustar el tipo y tamaño de los recursos a lo que la carga de trabajo realmente necesita. Un servidor sobredimensionado desperdicia dinero; uno subdimensionado afecta el rendimiento. **AWS Compute Optimizer** analiza la configuración y las métricas de uso de tus recursos para dar recomendaciones de rightsizing e identificar recursos ociosos, con el objetivo de reducir costos y mejorar el rendimiento.

## Beneficios de la automatización

Automatizar tareas que antes se hacían a mano también ahorra dinero:

- Respuestas **consistentes** a los eventos, **menos errores humanos** y menos trabajo repetitivo para el equipo (principio de excelencia operativa).
- **Apagar recursos cuando no se usan.** AWS da un ejemplo: los entornos de desarrollo y prueba suelen usarse unas ocho horas al día de lunes a viernes; si se detienen fuera de ese horario, el ahorro potencial es del **75 %** (40 horas frente a 168).
- Escalar automáticamente según la demanda, sin pagar por capacidad ociosa.

## Cómo ahorra costos mudarse a la nube

Resumiendo: pagas solo lo que consumes, aprovechas precios bajos por escala, eliminas costos de instalaciones y hardware propio, dimensionas bien los recursos y automatizas. AWS también recuerda que el valor de la nube va más allá del TCO: incluye productividad del personal, resiliencia operativa y agilidad del negocio.

## Trampas típicas del examen

- **Pensar que un centro de datos propio solo cuesta el hardware.** Energía, refrigeración, espacio y personal también cuentan.
- **Confundir BYOL con licencia incluida.** Si la empresa ya tiene licencias y quiere reutilizarlas, es BYOL.
- **Confundir economías de escala con gasto variable.** "Precios bajos por el volumen de AWS" es escala; "pagar solo lo que uso" es gasto variable.
- **Creer que rightsizing es siempre agrandar recursos.** Normalmente significa reducir lo sobredimensionado.
- **Elegir AWS License Manager para estimar precios.** License Manager gestiona licencias, no calcula costos de la nube.

## Resumen para el examen

- Costo fijo = se paga aunque no se use; costo variable = según consumo.
- La nube cambia CapEx por OpEx variable.
- TCO on-premises: hardware, licencias, energía, refrigeración, espacio y personal.
- Economías de escala = precios más bajos por el volumen agregado de AWS.
- BYOL = reutilizar tus licencias; license included = la licencia va en el precio.
- AWS License Manager = gestionar licencias y evitar incumplimientos.
- Rightsizing = ajustar tipo y tamaño al uso real; apoyo de AWS Compute Optimizer.
- Automatizar reduce errores y permite apagar recursos ociosos.
