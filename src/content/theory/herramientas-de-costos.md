---
title: "Herramientas de costos: Pricing Calculator, Cost Explorer y Budgets"
summary: "Aprende a estimar costos antes de construir, analizar lo que ya gastaste, recibir alertas a tiempo y dónde encontrar precios y soporte de facturación."
domain: "billing-pricing-support"
order: 3
examTasks: ["4.2"]
services: ["AWS Pricing Calculator", "AWS Cost Explorer", "AWS Budgets", "Amazon SNS", "AWS Support"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html"
  - "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html"
  - "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-get-answers.html"
  - "https://aws.amazon.com/pricing/"
---

## ¿Por qué importa?

Una ONG educativa en Quito recibe una donación para llevar su plataforma de cursos a AWS. Antes de migrar, el directorio quiere saber **cuánto costará** al mes. Tres meses después, la factura sube y nadie entiende **por qué**. Como el dinero viene de una donación con monto fijo, necesitan **una alerta antes de pasarse** del presupuesto. Y cuando aparece un cargo que no reconocen, quieren saber **a quién preguntar**.

Cada una de esas preguntas tiene su herramienta o recurso en AWS: **AWS Pricing Calculator**, **AWS Cost Explorer**, **AWS Budgets** y el soporte de facturación. El examen suele describir la necesidad y pedirte la herramienta correcta.

## AWS Pricing Calculator: estimar antes de construir

**AWS Pricing Calculator** es una herramienta web **gratuita** para **crear estimaciones de costos** de servicios de AWS. Sirve para:

- Modelar una solución **antes de construirla** y planificar el gasto.
- Explorar precios de los servicios y ver los cálculos detrás de cada estimación.
- Agrupar estimaciones según tu arquitectura.
- Guardar el enlace de la estimación para compartirla, o exportarla en CSV o PDF.

No necesitas experiencia previa con AWS para usarla. Es una **estimación**: no incluye impuestos y solo considera los datos que ingresas.

En el caso de la ONG, Pricing Calculator responde "¿cuánto costará?".

## AWS Cost Explorer: analizar lo que ya gastaste

**AWS Cost Explorer** permite **ver y analizar tus costos y uso**. Puedes:

- Revisar datos de **hasta los últimos 13 meses** y el mes en curso.
- Obtener un **pronóstico** de cuánto probablemente gastarás en los **próximos 18 meses**.
- Filtrar y agrupar (por servicio, cuenta, etiqueta, etc.) para identificar qué genera el gasto y ver tendencias.
- Recibir recomendaciones de compra de Reserved Instances y Savings Plans.
- Hacer preguntas sobre tus costos en lenguaje natural con **Amazon Q Developer**.

Usar la interfaz de Cost Explorer no tiene costo; el acceso por API tiene un cargo por solicitud. Después de activarlo, los datos del mes en curso tardan unas 24 horas en estar listos.

En el caso de la ONG, Cost Explorer responde "¿por qué subió la factura?".

## AWS Budgets: alertas y acciones sobre el gasto

**AWS Budgets** sirve para **dar seguimiento y actuar** sobre tus costos y uso. Tipos de presupuesto:

- **Cost budgets:** límites de gasto con alertas al acercarte o superar el umbral.
- **Usage budgets:** límites de uso de uno o más servicios.
- **Presupuestos de utilización y cobertura** de Reserved Instances y Savings Plans.

Las alertas pueden basarse en el gasto **real** (ya ocurrido) o **pronosticado** (antes de que ocurra) y se envían por **correo electrónico**, a un tema de **Amazon SNS** (servicio de notificaciones) o a ambos. Además, las **budget actions** permiten aplicar una acción, por ejemplo una política de IAM que impida crear más recursos.

Ojo: la información de Budgets se actualiza hasta tres veces al día, así que puede haber un retraso entre el gasto y la alerta.

En el caso de la ONG, Budgets responde "avísame antes de pasarme".

## Dónde encontrar precios y ayuda con la facturación

**Información de precios:**

- Cada servicio tiene su **página oficial de precios** en aws.amazon.com/pricing; si hay diferencias con otra fuente, AWS cobra el precio de esa página.
- **AWS Price List API** permite consultar precios de forma programática (Query API por producto y Bulk API con archivos JSON o CSV por servicio y Región). Pricing Calculator obtiene sus precios de ahí.

**Soporte de facturación:**

- **Todos los titulares de cuentas** tienen acceso **gratuito** a soporte de cuenta y facturación, incluso con Basic Support. Solo el **soporte técnico personalizado** requiere un plan pagado.
- Para dudas o reclamos de la factura, abres un caso en el **AWS Support Center** eligiendo *Account and billing support*. Puedes pedir respuesta por web (correo) o por teléfono.
- El **AWS Knowledge Center** (en AWS re:Post) tiene artículos con respuestas a preguntas frecuentes de facturación.
- La página **Bills** de la consola de Billing and Cost Management muestra el detalle de tus cargos mensuales.

## Comparación rápida

| Herramienta | Pregunta que responde | Momento | Ejemplo |
| --- | --- | --- | --- |
| **AWS Pricing Calculator** | ¿Cuánto costará? | Antes de usar AWS | Estimar la migración de la plataforma |
| **AWS Cost Explorer** | ¿En qué gasté y cuánto gastaré? | Después, con historial y pronóstico | Descubrir qué servicio subió la factura |
| **AWS Budgets** | ¿Me avisas si me paso? | De forma continua | Alerta al llegar al 80 % del presupuesto |
| **AWS Support Center** | ¿Por qué me cobraron esto? | Cuando tienes una duda de facturación | Caso de *Account and billing support* |

## Trampas típicas del examen

- **Elegir Cost Explorer para estimar una arquitectura que aún no existe.** Para eso está **Pricing Calculator**.
- **Elegir Pricing Calculator para analizar la factura del mes pasado.** Eso es **Cost Explorer**.
- **Confundir pronóstico con alerta.** Cost Explorer muestra pronósticos; **Budgets** envía alertas cuando se supera (o se pronostica superar) un umbral.
- **Creer que Budgets corta el servicio por sí solo.** Envía alertas y puede ejecutar **acciones que tú configures**; por defecto solo notifica.
- **Pensar que necesitas un plan de soporte pagado para preguntas de facturación.** El soporte de cuenta y facturación es gratuito para todos.

## Resumen para el examen

- Pricing Calculator: estimaciones gratuitas antes de construir; sin impuestos.
- Cost Explorer: hasta 13 meses de historial y pronóstico de 18 meses; recomienda RI y Savings Plans.
- Budgets: presupuestos de costo, uso, RI y Savings Plans; alertas por correo o Amazon SNS sobre gasto real o pronosticado.
- Las budget actions aplican acciones configuradas, como una política de IAM.
- Precios oficiales: páginas de precios de cada servicio y AWS Price List API.
- Soporte de facturación: gratuito para todos, mediante un caso en AWS Support Center.
