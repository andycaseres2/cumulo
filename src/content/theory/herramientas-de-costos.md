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
quiz:
  - prompt: "Una startup de Rosario financia su plataforma con un fondo fijo mensual. Quiere recibir un correo cuando el gasto pronosticado del mes vaya a superar el 80 % de ese monto. ¿Qué herramienta debe usar?"
    options:
      - label: "AWS Budgets"
        explanation: "AWS Budgets permite crear cost budgets con alertas basadas en el gasto real o pronosticado, enviadas por correo electrónico o a un tema de Amazon SNS."
        correct: true
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer muestra pronósticos y analiza el gasto, pero las alertas al superar un umbral las envía AWS Budgets."
      - label: "AWS Pricing Calculator"
        explanation: "Pricing Calculator crea estimaciones antes de construir; no vigila el gasto real ni envía alertas."
      - label: "AWS Price List API"
        explanation: "AWS Price List API consulta precios de forma programática; no da seguimiento a tu gasto ni envía notificaciones."
  - prompt: "Una ONG educativa de Quito aún no usa AWS y su directorio quiere saber cuánto costará al mes la plataforma de cursos antes de migrarla. ¿Qué herramienta debe usar?"
    options:
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer analiza costos y uso que ya ocurrieron; sin historial en AWS no sirve para estimar una arquitectura que aún no existe."
      - label: "AWS Budgets"
        explanation: "AWS Budgets da seguimiento al gasto y envía alertas sobre umbrales; no estima el costo de una solución antes de construirla."
      - label: "AWS Pricing Calculator"
        explanation: "AWS Pricing Calculator es una herramienta web gratuita para crear estimaciones de costos y modelar una solución antes de construirla."
        correct: true
      - label: "AWS Support Center"
        explanation: "AWS Support Center sirve para abrir casos, como dudas sobre un cargo de la factura; no genera estimaciones de costos."
  - prompt: "Una pyme de Asunción con Basic Support encuentra en su factura un cargo que no reconoce y quiere que AWS se lo explique. ¿Qué debe hacer?"
    options:
      - label: "Contratar un plan de soporte pagado para poder abrir un caso"
        explanation: "El soporte de cuenta y facturación es gratuito para todos los titulares de cuentas, incluso con Basic Support; solo el soporte técnico personalizado requiere un plan pagado."
      - label: "Crear un usage budget en AWS Budgets"
        explanation: "Un usage budget pone límites de uso y alertas, pero no explica un cargo que ya apareció en la factura."
      - label: "Revisar la estimación en AWS Pricing Calculator"
        explanation: "Pricing Calculator solo considera los datos que ingresas para estimar; no muestra ni explica los cargos reales de tu factura."
      - label: "Abrir un caso en AWS Support Center eligiendo Account and billing support"
        explanation: "Para dudas o reclamos de la factura se abre un caso de Account and billing support en AWS Support Center, un soporte gratuito incluso con Basic Support."
        correct: true
practice:
  - prompt: "Una cadena de cafeterías de Medellín ve que su factura de AWS subió el mes pasado. Quiere filtrar y agrupar su historial de costos por servicio y por cuenta para encontrar qué generó el aumento. ¿Qué herramienta debe usar?"
    options:
      - label: "AWS Pricing Calculator"
        explanation: "Pricing Calculator estima costos antes de construir con los datos que ingresas; no analiza la factura del mes pasado."
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer permite ver y analizar costos y uso de hasta los últimos 13 meses, filtrando y agrupando por servicio, cuenta o etiqueta."
        correct: true
      - label: "AWS Budgets"
        explanation: "AWS Budgets da seguimiento al gasto contra un umbral y envía alertas; no es la herramienta para filtrar y agrupar el historial de costos."
      - label: "AWS Price List API"
        explanation: "AWS Price List API consulta los precios publicados de los servicios; no muestra cuánto gastó tu cuenta ni en qué."
  - prompt: "Una empresa de videojuegos de Lima quiere que, cuando su gasto supere el presupuesto definido, se aplique automáticamente una política de IAM que impida crear más recursos. ¿Qué debe configurar?"
    options:
      - label: "El pronóstico de AWS Cost Explorer"
        explanation: "Cost Explorer muestra cuánto probablemente gastarás, pero no aplica políticas de IAM cuando se supera un presupuesto."
      - label: "Una estimación compartida de AWS Pricing Calculator"
        explanation: "Una estimación de Pricing Calculator planifica costos antes de construir; no vigila el gasto real ni ejecuta acciones."
      - label: "Una recomendación de Savings Plans en Cost Explorer"
        explanation: "Las recomendaciones de compra de Cost Explorer sugieren Reserved Instances o Savings Plans; no aplican restricciones al superar un presupuesto."
      - label: "Una budget action en AWS Budgets"
        explanation: "Las budget actions de AWS Budgets aplican una acción configurada, como una política de IAM que impida crear más recursos."
        correct: true
  - prompt: "Un estudio de diseño de Montevideo creó en AWS Budgets un cost budget con alerta por correo, sin configurar acciones, y cree que AWS apagará sus recursos al superar el umbral. ¿Qué ocurre realmente?"
    options:
      - label: "AWS Budgets envía la notificación configurada y los recursos siguen funcionando"
        explanation: "Por defecto Budgets solo notifica; detener o restringir recursos requiere acciones que tú configures."
        correct: true
      - label: "AWS Budgets detiene todas las instancias de la cuenta"
        explanation: "Es la trampa típica del examen: Budgets no corta el servicio por sí solo; sin budget actions configuradas solo envía alertas."
      - label: "AWS Cost Explorer bloquea la creación de recursos nuevos"
        explanation: "Cost Explorer analiza costos y muestra pronósticos; no bloquea la creación de recursos."
      - label: "AWS Pricing Calculator ajusta la estimación y limita el gasto"
        explanation: "Pricing Calculator solo crea estimaciones con los datos que ingresas; no controla ni limita el gasto real de la cuenta."
  - prompt: "Un desarrollador de una tienda online de Guayaquil quiere consultar los precios de los servicios de AWS de forma programática desde su propio sistema, por producto o descargando archivos JSON o CSV por servicio y Región. ¿Qué debe usar?"
    options:
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer analiza los costos y el uso de tu cuenta; no es la fuente programática de la lista de precios de AWS."
      - label: "AWS Budgets"
        explanation: "AWS Budgets da seguimiento a tu gasto y envía alertas; no publica precios de los servicios."
      - label: "AWS Price List API"
        explanation: "AWS Price List API ofrece la Query API por producto y la Bulk API con archivos JSON o CSV por servicio y Región."
        correct: true
      - label: "AWS Support Center"
        explanation: "AWS Support Center sirve para abrir casos, por ejemplo sobre la factura; no entrega precios de forma programática."
  - prompt: "Una consultora de Santo Domingo prepara para su cliente una estimación en AWS Pricing Calculator. ¿Qué debe advertirle sobre esa cifra?"
    options:
      - label: "Es el monto exacto que aparecerá en la factura, impuestos incluidos"
        explanation: "La cifra de Pricing Calculator es una estimación y no incluye impuestos, así que puede diferir de la factura real."
      - label: "Es una estimación que no incluye impuestos y solo considera los datos ingresados"
        explanation: "Pricing Calculator crea estimaciones sin impuestos basadas solo en los datos que ingresas, útiles para planificar antes de construir."
        correct: true
      - label: "Requiere tener al menos 13 meses de historial de uso en AWS"
        explanation: "Los 13 meses de historial corresponden a Cost Explorer; Pricing Calculator no requiere experiencia previa con AWS."
      - label: "Solo puede verse dentro de la cuenta que la creó"
        explanation: "La estimación se puede compartir guardando su enlace o exportarse en CSV o PDF para entregarla al cliente."
  - prompt: "Una empresa de transporte de Tegucigalpa lleva un año en AWS y quiere recibir recomendaciones de compra de Reserved Instances y Savings Plans basadas en su uso. ¿Qué herramienta se las da?"
    options:
      - label: "AWS Pricing Calculator"
        explanation: "Pricing Calculator solo considera los datos que ingresas para estimar; no analiza tu uso real para recomendar compras."
      - label: "AWS Budgets"
        explanation: "AWS Budgets permite presupuestos de utilización y cobertura de RI y Savings Plans, pero las recomendaciones de compra vienen de Cost Explorer."
      - label: "AWS Support Center"
        explanation: "AWS Support Center sirve para abrir casos de cuenta y facturación; no genera recomendaciones de compra."
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer, además de analizar costos y uso, ofrece recomendaciones de compra de Reserved Instances y Savings Plans."
        correct: true
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
