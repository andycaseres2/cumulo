---
title: "Integración de aplicaciones: SQS, SNS, EventBridge y Step Functions"
summary: "Cómo desacoplar aplicaciones con colas (SQS), pub/sub (SNS), buses de eventos (EventBridge) y flujos de trabajo (Step Functions), y cuál elegir para mensajes y alertas."
domain: "technology-services"
order: 17
examTasks: ["3.8"]
services: ["Amazon SQS", "Amazon SNS", "Amazon EventBridge", "AWS Step Functions", "AWS Lambda"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/application-integration.html"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html"
  - "https://docs.aws.amazon.com/decision-guides/latest/sns-or-sqs-or-eventbridge/sns-or-sqs-or-eventbridge.html"
  - "https://docs.aws.amazon.com/ses/latest/dg/Welcome.html"
---

## ¿Por qué importa?

Una plataforma de delivery en Ciudad de México recibe miles de pedidos por minuto en hora pico. Cuando entra un pedido, hay que cobrarlo, avisar al restaurante, notificar al cliente por SMS y actualizar el inventario. Si todo ocurre dentro de un solo programa y el servicio de pagos se cae, se pierden pedidos.

La solución es **desacoplar**: separar la aplicación en componentes que se comunican mediante mensajes, para que si uno falla o se satura, los demás sigan funcionando. AWS ofrece varios servicios de **integración de aplicaciones** para lograrlo, y el examen te pedirá elegir el adecuado para **entregar mensajes** y **enviar alertas y notificaciones**.

## Desacoplar: la idea central

En una arquitectura **acoplada** (*tightly coupled*), los componentes se llaman directamente y dependen unos de otros: si uno falla, la falla se propaga. En una arquitectura **desacoplada** (*loosely coupled*), un componente deja un mensaje y otro lo procesa cuando puede. Así cada parte escala y se actualiza de forma independiente. Esta es una buena práctica del diseño en la nube.

## Amazon SQS: colas de mensajes

**Amazon Simple Queue Service (Amazon SQS)** es un servicio **totalmente administrado de colas de mensajes**. Un productor envía mensajes a una **cola** (*queue*), donde se guardan hasta que un consumidor los recibe y procesa. Permite enviar, almacenar y recibir mensajes entre componentes a cualquier volumen, **sin perder mensajes** y sin que el otro servicio tenga que estar disponible en ese momento.

Dos tipos de cola:

- **Standard**: máximo rendimiento, orden de *mejor esfuerzo* y entrega **al menos una vez** (un mensaje podría llegar duplicado).
- **FIFO** (*first in, first out*): garantiza que los mensajes se procesen **exactamente una vez** y **en el orden exacto** en que se enviaron.

Patrón típico: un **consumidor saca (pull) los mensajes** de la cola. Ejemplo: los pedidos entran a una cola y un grupo de servidores los procesa a su ritmo.

## Amazon SNS: publicación y suscripción

**Amazon Simple Notification Service (Amazon SNS)** es un servicio administrado de mensajería **pub/sub** (publicación/suscripción). Un publicador envía un mensaje a un **tema** (*topic*) y SNS lo **empuja (push)** a todos los suscriptores: comunicación **de muchos a muchos**.

- Hacia otros sistemas: colas de Amazon SQS, funciones de AWS Lambda o *webhooks* HTTP/S.
- Hacia personas: **notificaciones push móviles, SMS y correo electrónico**.

Al hecho de enviar el mismo mensaje a muchos destinos se le llama **fan-out**. Ejemplo: un pedido nuevo se publica en un tema; SNS lo envía a la cola de cobros, a la cola de inventario y como SMS al cliente.

## Amazon EventBridge: bus de eventos

Un **evento** es un registro de que algo ocurrió (por ejemplo, "se creó un pedido" o "una instancia EC2 cambió de estado"). **Amazon EventBridge** es un **bus de eventos serverless** para construir aplicaciones **orientadas a eventos** a escala, con eventos que vienen de tus aplicaciones, de **servicios de AWS** y de aplicaciones **SaaS** integradas (como Zendesk o Shopify).

Defines **reglas de enrutamiento** que filtran los eventos y los envían a destinos como AWS Lambda. Publicador y consumidor quedan completamente desacoplados. EventBridge también sirve para programar tareas automatizadas y para compartir eventos entre cuentas. Antes se llamaba CloudWatch Events.

## AWS Step Functions: flujos de trabajo

**AWS Step Functions** es un servicio totalmente administrado para **coordinar los componentes** de aplicaciones distribuidas y microservicios mediante **flujos de trabajo visuales**. Organizas la aplicación como una serie de **pasos**; Step Functions inicia y sigue cada paso, **reintenta** cuando hay errores y registra el estado de cada uno para diagnosticar problemas.

Ejemplo: cobrar → si el pago es aprobado, asignar repartidor → si no, notificar al cliente. El orden y las decisiones viven en el flujo, no en el código de cada servicio.

## ¿Cuál elijo?

| Necesito… | Servicio | Modelo |
| --- | --- | --- |
| Guardar mensajes hasta que un componente los procese, absorber picos de carga | **Amazon SQS** | Cola (el consumidor saca los mensajes) |
| Enviar el mismo mensaje a muchos suscriptores o alertar a personas por SMS, correo o push | **Amazon SNS** | Pub/sub (push a suscriptores) |
| Reaccionar a eventos de servicios de AWS, de mis aplicaciones o de SaaS, con reglas de filtrado | **Amazon EventBridge** | Bus de eventos |
| Coordinar varios pasos en orden, con decisiones y reintentos | **AWS Step Functions** | Flujo de trabajo (orquestación) |

Distinción útil: para **alertas y notificaciones** a personas, la respuesta es SNS. Para correos de negocio con tu propio dominio (confirmaciones de compra, boletines de marketing), el servicio es **Amazon SES**, que se ve en el tema de aplicaciones de negocio.

## Trampas típicas del examen

- **Confundir SQS con SNS.** SQS guarda mensajes para que **un** consumidor los saque; SNS **empuja** un mensaje a **muchos** suscriptores.
- **Pensar que SQS Standard garantiza orden.** Solo las colas **FIFO** garantizan orden exacto y procesamiento exactamente una vez.
- **Elegir SQS para avisar a un administrador por correo.** Las notificaciones a personas son de **SNS**.
- **Elegir SNS para coordinar pasos con lógica condicional.** Para orquestar un proceso de varios pasos, la respuesta es **Step Functions**.
- **Olvidar EventBridge cuando el origen es un servicio de AWS o una aplicación SaaS.** Reaccionar a eventos con reglas es su función principal.

## Resumen para el examen

- Desacoplar = componentes independientes que se comunican por mensajes; mejora la resiliencia y la escalabilidad.
- SQS = cola de mensajes; Standard (alto rendimiento, al menos una vez) o FIFO (orden exacto, exactamente una vez).
- SNS = pub/sub con fan-out; también notifica a personas por SMS, correo y push.
- EventBridge = bus de eventos serverless con reglas; recibe eventos de AWS, de tus aplicaciones y de SaaS.
- Step Functions = flujos de trabajo visuales con pasos, decisiones y reintentos.
- Palabras clave: "cola" → SQS; "notificación" o "fan-out" → SNS; "evento" → EventBridge; "flujo de trabajo" → Step Functions.
