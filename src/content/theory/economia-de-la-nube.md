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
quiz:
  - prompt: "Una cadena de supermercados de Bogotá compra servidores por adelantado pensando en su pico de demanda y los paga aunque estén ociosos. Quiere pagar solo cuando consume recursos y solo por lo que consume. ¿Qué ventaja de la nube describe ese cambio?"
    options:
      - label: "Benefit from massive economies of scale"
        explanation: "Las economías de escala explican por qué AWS ofrece precios más bajos gracias al volumen agregado de sus clientes, no el paso de pagar por adelantado a pagar por consumo."
      - label: "Trade fixed expense for variable expense"
        explanation: "Cambiar el gasto fijo (CapEx en servidores comprados antes de saber cómo se usarán) por gasto variable significa pagar solo cuando consumes y solo por lo que consumes."
        correct: true
      - label: "Stop spending money running and maintaining data centers"
        explanation: "Esta ventaja se refiere a dejar el trabajo pesado de montar, cablear y alimentar servidores a AWS, no a pasar de un pago fijo por adelantado a uno según el consumo."
      - label: "Rightsizing con AWS Compute Optimizer"
        explanation: "El rightsizing ajusta el tipo y tamaño de los recursos al uso real, pero no es la ventaja que describe cambiar un pago fijo por uno según el consumo."
  - prompt: "Una empresa de Lima ya pagó licencias vigentes de Oracle y quiere aprovecharlas al usar Amazon RDS for Oracle en lugar de pagar licencias nuevas. ¿Qué estrategia de licenciamiento debe elegir?"
    options:
      - label: "License included (licencia incluida)"
        explanation: "Con licencia incluida la licencia es de AWS y su costo va dentro del precio del servicio; conviene cuando no tienes licencias, no cuando quieres reutilizar las que ya pagaste."
      - label: "Usar AWS License Manager para estimar el costo de la nube"
        explanation: "AWS License Manager gestiona licencias y ayuda a evitar incumplimientos, pero no calcula ni estima costos de la nube."
      - label: "BYOL (Bring Your Own License)"
        explanation: "Con BYOL reutilizas las licencias que ya compraste, siempre cumpliendo las reglas de licenciamiento del fabricante."
        correct: true
      - label: "Rightsizing de la instancia de base de datos"
        explanation: "El rightsizing ajusta el tipo y tamaño de los recursos al uso real; no decide quién aporta la licencia de Oracle."
  - prompt: "Una startup de Santiago sospecha que varias de sus instancias están sobredimensionadas y que otras están ociosas. Quiere recomendaciones basadas en la configuración y las métricas de uso para ajustar su tipo y tamaño. ¿Qué servicio de AWS debe usar?"
    options:
      - label: "AWS License Manager"
        explanation: "AWS License Manager administra licencias de fabricantes como Microsoft u Oracle entre cuentas y Regiones; no da recomendaciones de tamaño de recursos."
      - label: "Amazon RDS con licencia incluida"
        explanation: "Es una opción de base de datos administrada con la licencia dentro del precio; no analiza el uso de tus recursos para recomendar ajustes de tamaño."
      - label: "BYOL (Bring Your Own License)"
        explanation: "BYOL es una estrategia para reutilizar licencias que ya tienes; no identifica recursos sobredimensionados ni ociosos."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer analiza la configuración y las métricas de uso para dar recomendaciones de rightsizing e identificar recursos ociosos, reduciendo costos."
        correct: true
practice:
  - prompt: "Una empresa de transporte de Córdoba pregunta por qué AWS puede cobrar precios de pago por uso más bajos que lo que le costaría comprar su propio hardware. La respuesta es que AWS agrupa el uso de cientos de miles de clientes. ¿Qué ventaja de la nube describe esto?"
    options:
      - label: "Trade fixed expense for variable expense"
        explanation: "Esta ventaja trata de pagar solo por lo que consumes en lugar de invertir por adelantado; no explica por qué el precio por unidad es más bajo."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "Esta ventaja se refiere a dejar a AWS el trabajo de montar, cablear y alimentar servidores, no al volumen agregado de clientes."
      - label: "Benefit from massive economies of scale"
        explanation: "Las economías de escala bajan el costo por unidad cuando el volumen sube; el uso agregado de muchos clientes se traduce en precios de pago por uso más bajos."
        correct: true
      - label: "Rightsizing de los recursos"
        explanation: "El rightsizing ajusta el tipo y tamaño de tus recursos al uso real; no explica por qué AWS ofrece precios más bajos."
  - prompt: "El director financiero de una aseguradora de Panamá compara la nube con su centro de datos mirando solo el precio de los servidores. Para un análisis de costo total de propiedad (TCO), ¿qué otros costos debe sumar?"
    options:
      - label: "Energía, refrigeración, espacio físico y personal especializado"
        explanation: "El TCO de un entorno propio incluye, además del hardware y las licencias, la energía, la refrigeración, el espacio físico y el personal que instala y repara."
        correct: true
      - label: "Solo las licencias de software, porque el hardware ya está en el precio"
        explanation: "Las licencias son parte del TCO, pero dejan fuera la energía, la refrigeración, el espacio y el personal."
      - label: "Únicamente el reemplazo periódico del hardware"
        explanation: "El reemplazo del hardware es solo una parte; el TCO también suma energía, refrigeración, espacio físico y personal."
      - label: "Los descuentos por volumen que ofrece AWS"
        explanation: "Los descuentos por volumen son un beneficio de la nube, no un costo de operar un centro de datos propio."
  - prompt: "Una startup de Medellín necesita una base de datos Amazon RDS for Oracle, no tiene licencias de Oracle y quiere la opción más simple, con el costo de la licencia dentro del precio del servicio. ¿Qué modelo de licenciamiento debe elegir?"
    options:
      - label: "BYOL (Bring Your Own License)"
        explanation: "BYOL sirve para reutilizar licencias que ya compraste; la startup no tiene licencias de Oracle."
      - label: "AWS License Manager"
        explanation: "AWS License Manager administra licencias y ayuda a evitar incumplimientos; no es un modelo de licenciamiento que incluya la licencia en el precio."
      - label: "Rightsizing de la instancia"
        explanation: "El rightsizing ajusta el tipo y tamaño del recurso; no resuelve quién aporta la licencia de Oracle."
      - label: "License included (licencia incluida)"
        explanation: "Con licencia incluida la licencia es de AWS y su costo va dentro del precio del servicio, ideal cuando no tienes licencias y quieres simplicidad."
        correct: true
  - prompt: "Un grupo industrial de São Paulo usa licencias de Microsoft y Oracle en varias cuentas y Regiones de AWS. Quiere definir reglas con límites para evitar excesos de uso y tener paneles para auditorías. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer da recomendaciones de rightsizing a partir de métricas de uso; no controla límites de licencias."
      - label: "AWS License Manager"
        explanation: "AWS License Manager administra licencias de fabricantes como Microsoft y Oracle entre cuentas y Regiones, con reglas de límites y paneles para auditorías."
        correct: true
      - label: "Amazon RDS con licencia incluida"
        explanation: "Es una opción de base de datos con la licencia dentro del precio; no permite definir reglas para controlar el uso de licencias en varias cuentas."
      - label: "Rightsizing de las instancias"
        explanation: "El rightsizing ajusta tipo y tamaño de los recursos; no evita el incumplimiento de las reglas de licenciamiento."
  - prompt: "Los entornos de desarrollo y prueba de una software factory de Montevideo se usan unas ocho horas al día de lunes a viernes, pero quedan encendidos las 168 horas de la semana. ¿Qué práctica ataca directamente ese gasto?"
    options:
      - label: "Automatizar el apagado de los entornos fuera del horario de uso"
        explanation: "Detener los entornos fuera de las 40 horas de uso semanal permite un ahorro potencial cercano al 75 %, según el ejemplo de AWS."
        correct: true
      - label: "Dimensionar los entornos para el pico de demanda y dejarlos encendidos"
        explanation: "Dimensionar para el pico y dejarlo encendido es justamente pagar por capacidad ociosa, lo contrario de lo que se busca."
      - label: "Moverlos a un centro de datos propio para convertir el gasto en CapEx"
        explanation: "Comprar infraestructura propia convierte el gasto en fijo, que se paga aunque los entornos no se usen."
      - label: "Usar AWS License Manager para controlar el horario de los entornos"
        explanation: "AWS License Manager gestiona licencias y su cumplimiento; no apaga entornos fuera del horario de uso."
  - prompt: "Una cadena de restaurantes de Lima quiere que su equipo de sistemas deje de montar, cablear y alimentar servidores, y se concentre en mejorar la experiencia de sus clientes. ¿Qué ventaja de la nube describe ese objetivo?"
    options:
      - label: "Trade fixed expense for variable expense"
        explanation: "Esta ventaja trata de cambiar pagos por adelantado por pagos según el consumo, no de liberar al equipo del trabajo físico del centro de datos."
      - label: "Benefit from massive economies of scale"
        explanation: "Las economías de escala explican precios más bajos por el volumen de AWS, no que el equipo deje de operar servidores."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "AWS se encarga del trabajo pesado de operar centros de datos, como montar, cablear y alimentar servidores, para que tu equipo se concentre en tus clientes."
        correct: true
      - label: "BYOL (Bring Your Own License)"
        explanation: "BYOL es una estrategia para reutilizar licencias existentes; no libera al equipo del trabajo de operar servidores."
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
