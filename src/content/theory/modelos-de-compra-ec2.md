---
title: "Modelos de compra de EC2"
summary: "Elige entre On-Demand, Savings Plans, Reserved Instances, Spot y opciones dedicadas según la carga de trabajo y el compromiso que puedes asumir."
domain: "billing-pricing-support"
order: 1
services: ["Amazon EC2", "Savings Plans", "AWS Lambda", "AWS Fargate"]
readingMinutes: 5
sources:
  - "https://aws.amazon.com/ec2/pricing/"
  - "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html"
---

## ¿Por qué importa?

Una tienda en línea de Medellín usa servidores de **Amazon EC2** (servidores virtuales en la nube). Tiene un servidor web que funciona las 24 horas todo el año, un proceso nocturno que genera reportes y que puede repetirse si se interrumpe, y una campaña de Black Friday de tres días cuya demanda nadie puede predecir. Si paga todo con la misma modalidad, probablemente gasta de más.

AWS ofrece varias **opciones de compra** de EC2. Elegir bien según el tipo de carga es una de las habilidades más evaluadas en el dominio de facturación del examen.

## On-Demand: flexibilidad total

Con **On-Demand Instances** pagas por hora o por segundo de uso, **sin pago inicial ni compromiso a largo plazo**. Es la opción más flexible y el precio de referencia contra el que se comparan los descuentos.

Ideal para: cargas de corto plazo, impredecibles o que no pueden interrumpirse, como la campaña de Black Friday o una aplicación nueva cuyo uso aún no conoces.

## Savings Plans y Reserved Instances: descuento por compromiso

- **Savings Plans:** te comprometes a un **monto constante de uso, medido en USD por hora**, durante **1 o 3 años**. A cambio, AWS indica que puedes ahorrar **hasta un 72 %** frente a On-Demand. Los **Compute Savings Plans** aplican a EC2 sin importar familia, tamaño, sistema operativo, tenencia o Región, y también a **AWS Fargate** y **AWS Lambda**. Se paga con *All Upfront*, *Partial Upfront* o *No Upfront*.
- **Reserved Instances (RI):** no son instancias físicas, sino un **descuento de facturación** que se aplica a instancias que coinciden con ciertos atributos (tipo de instancia, Región, tenencia y plataforma). Se compran por **1 o 3 años**; el plazo de 3 años da más descuento, y pagar más por adelantado suele ahorrar más. Hay dos clases: **Standard** (mayor descuento, solo se puede modificar) y **Convertible** (menor descuento, pero se puede intercambiar por otra con atributos distintos). Una RI **no se puede cancelar**.

AWS **recomienda Savings Plans sobre Reserved Instances** porque ofrecen descuentos similares con más flexibilidad: con RI te comprometes a una configuración específica; con Savings Plans, a un monto de uso.

Ideal para: cargas estables y predecibles, como el servidor web que funciona todo el año.

## Spot Instances: capacidad sobrante con gran descuento

Las **Spot Instances** usan **capacidad sobrante de EC2** con un descuento de **hasta el 90 %** frente a On-Demand. A cambio, AWS puede **recuperar la instancia** cuando necesita esa capacidad. Antes de detener o terminar una instancia Spot, EC2 emite un **aviso de interrupción dos minutos antes**.

Ideal para: cargas **tolerantes a interrupciones** y flexibles en el tiempo, como el proceso nocturno de reportes, análisis por lotes o pruebas.

## Opciones dedicadas y de capacidad

- **Dedicated Hosts:** un **servidor físico completamente dedicado** a tu uso. Te da visibilidad de sockets y núcleos físicos, lo que permite usar **licencias de software existentes** ligadas al servidor (*Bring Your Own License*, BYOL). Útil por requisitos de licencias o cumplimiento.
- **Dedicated Instances:** instancias en hardware dedicado a una sola cuenta, pero **sin** la visibilidad ni el control de ubicación de un Dedicated Host.
- **On-Demand Capacity Reservations:** reservan capacidad de cómputo en una Availability Zone específica para eventos críticos. Garantizan capacidad, no un descuento.

## Comparación rápida

| Opción | Compromiso | Ahorro frente a On-Demand | ¿Puede interrumpirse? | Carga ideal |
| --- | --- | --- | --- | --- |
| **On-Demand** | Ninguno | Precio base | No | Corta, impredecible, nueva |
| **Savings Plans** | USD por hora, 1 o 3 años | Hasta 72 % | No | Uso constante con flexibilidad |
| **Reserved Instances** | Configuración específica, 1 o 3 años | Significativo (más con 3 años y pago por adelantado) | No | Uso estable de una configuración conocida |
| **Spot** | Ninguno | Hasta 90 % | Sí, con aviso de 2 minutos | Tolerante a fallos, flexible |
| **Dedicated Hosts** | Opcional | — | No | Licencias por socket o núcleo, cumplimiento |

## Trampas típicas del examen

- **Elegir Spot para una carga crítica que no puede detenerse.** Spot puede interrumpirse; usa On-Demand, Savings Plans o RI.
- **Pensar que una Reserved Instance es un servidor.** Es un descuento de facturación aplicado a instancias que coinciden.
- **Confundir Dedicated Hosts con Dedicated Instances.** La pista de "licencias por socket o núcleo" apunta a **Dedicated Hosts**.
- **Creer que Savings Plans solo aplica a EC2.** Los Compute Savings Plans también cubren Fargate y Lambda.
- **Pensar que una RI se renueva sola.** Al vencer, se paga la tarifa On-Demand.

## Resumen para el examen

- On-Demand: sin compromiso; corto plazo o impredecible.
- Savings Plans: compromiso en USD/hora por 1 o 3 años; hasta 72 % de ahorro; recomendado por AWS.
- Reserved Instances: descuento de facturación por 1 o 3 años; Standard vs. Convertible.
- Spot: hasta 90 % de ahorro; interrumpible con aviso de 2 minutos.
- Dedicated Hosts: servidor físico propio; BYOL por socket o núcleo.
- Capacity Reservations: garantizan capacidad en una AZ, no descuento.
- Une carga con modelo: estable → compromiso; interrumpible → Spot; incierta → On-Demand.
