---
title: "Herramientas de costos: Pricing Calculator, Cost Explorer y Budgets"
summary: "Aprende a estimar costos antes de construir, analizar lo que ya gastaste y recibir alertas antes de pasarte del presupuesto en AWS."
domain: "billing-pricing-support"
order: 2
services: ["AWS Pricing Calculator", "AWS Cost Explorer", "AWS Budgets", "Amazon SNS"]
readingMinutes: 4
sources:
  - "https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html"
  - "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html"
  - "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"
---

## ¿Por qué importa?

Una ONG educativa en Quito recibe una donación para llevar su plataforma de cursos a AWS. Antes de migrar, el directorio quiere saber **cuánto costará** al mes. Tres meses después, la factura sube y nadie entiende **por qué**. Y como el dinero viene de una donación con monto fijo, necesitan **una alerta antes de pasarse** del presupuesto.

Cada una de esas preguntas tiene su propia herramienta en AWS: **AWS Pricing Calculator**, **AWS Cost Explorer** y **AWS Budgets**. El examen suele describir la necesidad y pedirte la herramienta correcta.

## AWS Pricing Calculator: estimar antes de construir

**AWS Pricing Calculator** es una herramienta web **gratuita** para **crear estimaciones de costos** de servicios de AWS. Sirve para:

- Modelar una solución **antes de construirla**.
- Explorar precios de los servicios y ver los cálculos detrás de cada estimación.
- Agrupar estimaciones según tu arquitectura.
- Guardar el enlace de la estimación para compartirla, o exportarla en CSV o PDF.

No necesitas experiencia previa con AWS para usarla. Ten en cuenta que es una **estimación**: no incluye impuestos y solo considera los datos que ingresas.

En el caso de la ONG, Pricing Calculator responde "¿cuánto costará?".

## AWS Cost Explorer: analizar lo que ya gastaste

**AWS Cost Explorer** permite **ver y analizar tus costos y uso**. Puedes:

- Revisar datos de **hasta los últimos 13 meses**.
- Obtener un **pronóstico** de cuánto probablemente gastarás en los **próximos 18 meses**.
- Filtrar y agrupar para identificar qué servicios o cuentas generan el gasto y ver tendencias.
- Recibir recomendaciones de compra de Reserved Instances y Savings Plans.

Usar la interfaz de Cost Explorer no tiene costo (el acceso por API sí tiene un cargo por solicitud). Después de activarlo, la información tarda un tiempo en prepararse.

En el caso de la ONG, Cost Explorer responde "¿por qué subió la factura?".

## AWS Budgets: alertas y acciones sobre el gasto

**AWS Budgets** sirve para **dar seguimiento y actuar** sobre tus costos y uso. Tipos de presupuesto:

- **Cost budgets:** límites de gasto con alertas al acercarte o superar el umbral.
- **Usage budgets:** límites de uso de uno o más servicios.
- **Presupuestos de utilización y cobertura** de Reserved Instances y Savings Plans.

Las alertas pueden basarse en el gasto **real** (ya ocurrido) o **pronosticado** (antes de que ocurra) y se envían por **correo electrónico**, a un tema de **Amazon SNS** (servicio de notificaciones) o a ambos. Además, las **budget actions** permiten aplicar una acción, por ejemplo una política de IAM que impida crear más recursos.

Ojo: la información de Budgets se actualiza varias veces al día, así que puede haber un retraso entre el gasto y la alerta.

En el caso de la ONG, Budgets responde "avísame antes de pasarme".

## Comparación rápida

| Herramienta | Pregunta que responde | Momento | Ejemplo |
| --- | --- | --- | --- |
| **AWS Pricing Calculator** | ¿Cuánto costará? | Antes de usar AWS | Estimar la migración de la plataforma |
| **AWS Cost Explorer** | ¿En qué gasté y cuánto gastaré? | Después, con datos históricos y pronóstico | Descubrir qué servicio subió la factura |
| **AWS Budgets** | ¿Me avisas si me paso? | De forma continua | Alerta al llegar al 80 % del presupuesto |

## Trampas típicas del examen

- **Elegir Cost Explorer para estimar una arquitectura que aún no existe.** Para eso está **Pricing Calculator**.
- **Elegir Pricing Calculator para analizar la factura del mes pasado.** Eso es **Cost Explorer**.
- **Confundir pronóstico con alerta.** Cost Explorer muestra pronósticos; **Budgets** envía alertas cuando se supera (o se pronostica superar) un umbral.
- **Creer que Budgets corta el servicio automáticamente por sí solo.** Envía alertas y puede ejecutar **acciones que tú configures**; por defecto solo notifica.

## Resumen para el examen

- Pricing Calculator: estimaciones gratuitas antes de construir.
- Las estimaciones no incluyen impuestos y dependen de lo que ingresas.
- Cost Explorer: analiza hasta 13 meses de historial y pronostica 18 meses.
- Cost Explorer también recomienda Reserved Instances y Savings Plans.
- Budgets: presupuestos de costo, uso, RI y Savings Plans.
- Budgets alerta por correo o Amazon SNS, sobre gasto real o pronosticado.
- Las budget actions aplican acciones configuradas, como una política de IAM.
