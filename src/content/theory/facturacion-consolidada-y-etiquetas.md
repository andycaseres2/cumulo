---
title: "Facturación consolidada, etiquetas de costos y CUR"
summary: "Usa AWS Organizations para recibir una sola factura y compartir descuentos, y etiquetas de asignación de costos con el Cost and Usage Report para saber quién gasta qué."
domain: "billing-pricing-support"
order: 4
examTasks: ["4.2"]
services: ["AWS Organizations", "AWS Cost and Usage Reports", "AWS Cost Explorer", "Amazon S3", "Amazon Athena"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-effective.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-behavior.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html"
  - "https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"
  - "https://docs.aws.amazon.com/cur/latest/userguide/what-is-data-exports.html"
quiz:
  - prompt: "Una cadena de farmacias de Guadalajara tiene cinco cuentas de AWS y cada mes recibe cinco facturas distintas. Quiere una sola factura y que el uso de todas las cuentas se sume para compartir descuentos por volumen, sin pagar más. ¿Qué debe usar?"
    options:
      - label: "AWS Budgets"
        explanation: "AWS Budgets da seguimiento al gasto y envía alertas; no une las facturas de varias cuentas ni combina su uso para compartir descuentos."
      - label: "Facturación consolidada de AWS Organizations"
        explanation: "La facturación consolidada entrega una sola factura pagada por la cuenta de administración, suma el uso de todas las cuentas para compartir descuentos por volumen y es gratuita."
        correct: true
      - label: "AWS Cost Explorer"
        explanation: "AWS Cost Explorer sirve para visualizar y analizar costos en la consola; no convierte varias facturas en una ni combina el uso entre cuentas."
      - label: "Etiquetas de asignación de costos"
        explanation: "Las etiquetas organizan los costos por proyecto o centro de costo, pero no unen las facturas ni hacen que el uso de las cuentas se sume."
  - prompt: "El equipo de finanzas de una empresa de Santiago etiquetó sus recursos con la clave Proyecto, pero la etiqueta no aparece en AWS Cost Explorer. La empresa usa AWS Organizations. ¿Qué debe hacer?"
    options:
      - label: "Pedir a cada cuenta miembro que active la etiqueta en su propia consola"
        explanation: "En una organización, solo la cuenta de administración accede al administrador de etiquetas de asignación de costos, así que las cuentas miembro no pueden activarla."
      - label: "Cambiar el nombre de la clave para que use el prefijo aws:"
        explanation: "El prefijo aws: corresponde a etiquetas generadas por AWS; las etiquetas que tú creas son user-defined y de todos modos deben activarse."
      - label: "Crear una exportación CUR 2.0 en AWS Data Exports"
        explanation: "El CUR desglosa costos por las etiquetas que activaste; crear la exportación no activa la etiqueta ni la hace aparecer en Cost Explorer."
      - label: "Activarla como etiqueta de asignación de costos desde la cuenta de administración"
        explanation: "Las etiquetas deben activarse en la consola de Billing and Cost Management antes de aparecer en Cost Explorer, y en una organización eso lo hace la cuenta de administración."
        correct: true
  - prompt: "Una empresa de retail de Bogotá necesita el conjunto más completo de datos de costo y uso, desglosado por hora y por etiquetas, entregado en un bucket de Amazon S3 para consultarlo con Amazon Athena. ¿Qué debe configurar?"
    options:
      - label: "Una exportación de AWS Cost and Usage Report (CUR 2.0) en AWS Data Exports"
        explanation: "El CUR contiene el conjunto más completo de datos de costo y uso, se entrega en S3, desglosa por hora y por etiquetas activadas y se consulta con Athena; CUR 2.0 en Data Exports es la forma recomendada."
        correct: true
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer sirve para visualizar y analizar costos en la consola; el detalle más granular como archivos en S3 lo entrega el CUR."
      - label: "La facturación consolidada de AWS Organizations"
        explanation: "La facturación consolidada une las facturas y comparte descuentos, pero no entrega por sí sola archivos detallados por hora y etiqueta en S3."
      - label: "Las facturas de las cuentas miembro"
        explanation: "En una organización, las facturas de las cuentas miembro son solo informativas; no son el conjunto de datos detallado que se entrega en S3 para consultar con Athena."
---

## ¿Por qué importa?

Un grupo de retail de Santiago de Chile tiene una cuenta de AWS para cada área: e-commerce, logística y analítica, además de cuentas separadas para desarrollo y producción. A fin de mes, finanzas recibe varias facturas, no puede aprovechar los descuentos por volumen y tampoco sabe cuánto gasta realmente cada proyecto.

La solución combina tres piezas que el examen evalúa: la **facturación consolidada** de **AWS Organizations**, las **etiquetas de asignación de costos** y el **AWS Cost and Usage Report (CUR)**.

## Facturación consolidada con AWS Organizations

**AWS Organizations** permite agrupar varias cuentas de AWS en una **organización** administrada de forma central. Toda organización tiene una **cuenta de administración** (*management account*, la que paga) que **paga los cargos de todas las cuentas miembro** (*member accounts*).

Beneficios de la **facturación consolidada** (*consolidated billing*):

- **Una sola factura** para varias cuentas.
- **Seguimiento sencillo:** puedes ver los cargos de todas las cuentas y descargar los datos combinados de costo y uso.
- **Uso combinado:** el uso de todas las cuentas se suma, lo que permite compartir **descuentos por volumen**, descuentos de **Reserved Instances** y **Savings Plans**. El resultado puede ser un cargo menor que con cuentas independientes.
- **Sin costo adicional:** la facturación consolidada es gratuita.

Ejemplo: servicios como la transferencia de datos y Amazon S3 tienen **niveles de precio por volumen**. AWS suma el uso de todas las cuentas para decidir qué nivel aplicar, así la organización llega antes a los precios más bajos por GB y luego AWS reparte el descuento entre las cuentas según su uso. La capa gratuita también se aplica al uso total de la organización, no a cada cuenta. Ojo: si una cuenta con el plan gratuito (Free account plan) se une a AWS Organizations, pasa automáticamente al plan pagado y pierde sus créditos de la capa gratuita.

## Asignación de costos entre cuentas

Para la facturación, la organización se trata **como si fuera una sola cuenta**. Por eso, el beneficio de una Reserved Instance comprada en la cuenta de logística puede aplicarse a instancias que coincidan en la cuenta de e-commerce. La cuenta de administración puede **desactivar el uso compartido** de descuentos de RI y Savings Plans en la página *Preferences* de la consola de Billing and Cost Management.

Cómo se reparten los costos:

- La cuenta de administración ve una **vista combinada** de todos los cargos y puede obtener un **reporte de costos por cada cuenta miembro**.
- Las facturas de las cuentas miembro son **solo informativas**; la cuenta de administración puede **reasignar** los descuentos por volumen, de RI o de Savings Plans que recibe cada cuenta.
- Separar áreas o ambientes en **cuentas distintas** ya es una forma simple de asignar costos.

## Etiquetas de asignación de costos

Una **etiqueta** (*tag*) es un par **clave-valor** que tú o AWS asignan a un recurso, por ejemplo `Proyecto = checkout`. Las **etiquetas de asignación de costos** (*cost allocation tags*) son etiquetas que **activas** para que AWS organice tus costos según ellas.

| Tipo | ¿Quién la crea? | Prefijo | Ejemplo |
| --- | --- | --- | --- |
| **AWS-generated** | AWS (o un vendedor ISV de AWS Marketplace) | `aws:` | `aws:createdBy`, que indica quién creó el recurso |
| **User-defined** | Tú | `user:` en los reportes | `user:CentroDeCosto`, `user:Proyecto` |

Reglas importantes:

- **Ambos tipos deben activarse por separado** en la consola de Billing and Cost Management antes de aparecer en **AWS Cost Explorer** o en los reportes de costos.
- En una organización, **solo la cuenta de administración** (o una cuenta independiente) accede al administrador de etiquetas de asignación de costos.
- Las etiquetas pueden tardar **hasta 24 horas** en aparecer en la consola.
- Una vez activas, puedes **filtrar y agrupar** en Cost Explorer por etiqueta y obtener reportes de asignación de costos que incluyen recursos etiquetados y no etiquetados, y que cuadran con el total de la factura.
- Buena práctica: **no** incluyas información sensible en las etiquetas.

## AWS Cost and Usage Report y Data Exports

El **AWS Cost and Usage Report (AWS CUR)** contiene el **conjunto más completo de datos de costo y uso** disponible. Sus características:

- Se entrega en un **bucket de Amazon S3** que tú eliges.
- Desglosa los costos **por hora, día o mes**, por producto o recurso y por las **etiquetas** de asignación de costos que activaste.
- Se actualiza al menos una vez al día durante el mes y se puede consultar con **Amazon Athena**, cargar en Amazon Redshift o visualizar con Amazon Quick Sight.

Hoy, la forma recomendada de recibir estos datos es **AWS Data Exports**, en la consola de Billing and Cost Management. Desde ahí creas exportaciones como **Cost and Usage Report 2.0 (CUR 2.0)**, el formato nuevo y recomendado, además de otras tablas (por ejemplo, recomendaciones de optimización de costos o el formato estándar FOCUS). El CUR anterior sigue disponible como **exportación heredada** (*legacy*).

En el ejemplo de Santiago, finanzas activa la etiqueta `Proyecto`, crea una exportación CUR 2.0 hacia S3 y consulta con Athena cuánto gastó cada proyecto en cada cuenta.

## Trampas típicas del examen

- **Pensar que la facturación consolidada tiene costo.** Es gratuita.
- **Creer que los descuentos de RI solo benefician a la cuenta que compró.** En una organización se comparten por defecto; la cuenta de administración puede desactivarlo.
- **Esperar ver una etiqueta en Cost Explorer apenas la creas.** Primero hay que **activarla** como etiqueta de asignación de costos.
- **Confundir CUR con Cost Explorer.** Cost Explorer es para **visualizar y analizar** en la consola; el CUR entrega el **detalle más granular** como archivos en S3.
- **Pensar que cada cuenta miembro paga su propia factura.** Paga la **cuenta de administración**.

## Resumen para el examen

- AWS Organizations + facturación consolidada = una factura, pagada por la cuenta de administración.
- El uso combinado comparte descuentos por volumen, de RI y de Savings Plans; sin costo extra.
- La cuenta de administración puede ver costos por cuenta, reasignar descuentos y desactivar el uso compartido.
- Etiquetas de asignación de costos: AWS-generated (`aws:`) y user-defined (`user:`); ambas se activan por separado.
- Solo la cuenta de administración gestiona las etiquetas de asignación de costos en una organización.
- CUR = datos de costo y uso más detallados, entregados en S3, con etiquetas; consultables con Athena.
- AWS Data Exports con CUR 2.0 es la forma recomendada actual; el CUR anterior queda como exportación heredada.
