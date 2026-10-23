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
quiz:
  - prompt: "Una fintech de Bogotá desacopla su sistema de pagos con una cola. Cada transacción debe procesarse exactamente una vez y en el orden exacto en que se envió. ¿Qué debe usar?"
    options:
      - label: "Una cola Standard de Amazon SQS"
        explanation: "La cola Standard ofrece orden de mejor esfuerzo y entrega al menos una vez, así que un mensaje podría llegar duplicado o fuera de orden."
      - label: "Un tema de Amazon SNS"
        explanation: "Amazon SNS empuja un mensaje a muchos suscriptores con pub/sub; no es una cola que garantice procesamiento exactamente una vez en orden."
      - label: "Una cola FIFO de Amazon SQS"
        explanation: "Las colas FIFO garantizan que los mensajes se procesen exactamente una vez y en el orden exacto en que se enviaron."
        correct: true
      - label: "AWS Step Functions"
        explanation: "AWS Step Functions coordina pasos de un flujo de trabajo con decisiones y reintentos; no es una cola de mensajes entre componentes."
  - prompt: "Una cadena de tiendas en Lima publica cada pedido nuevo una sola vez, y ese mismo mensaje debe llegar a la cola de cobros, a la cola de inventario y como SMS al cliente. ¿Qué servicio resuelve este fan-out?"
    options:
      - label: "Amazon SNS"
        explanation: "Amazon SNS es pub/sub: el pedido se publica en un tema y SNS lo empuja a colas de SQS y a personas por SMS, lo que se conoce como fan-out."
        correct: true
      - label: "Amazon SQS"
        explanation: "Amazon SQS guarda mensajes en una cola para que un consumidor los saque; por sí solo no envía el mismo mensaje a varios destinos ni manda SMS."
      - label: "AWS Step Functions"
        explanation: "AWS Step Functions orquesta pasos en orden con decisiones y reintentos; el escenario pide distribuir un mismo mensaje a muchos suscriptores."
      - label: "Amazon SES"
        explanation: "Amazon SES es para correos de negocio con tu propio dominio, como confirmaciones o boletines; no entrega mensajes a colas ni envía SMS."
  - prompt: "Una app de delivery en Ciudad de México quiere coordinar su proceso: cobrar, luego asignar repartidor si el pago se aprueba o avisar al cliente si se rechaza, con reintentos ante errores y registro del estado de cada paso. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon SQS"
        explanation: "Amazon SQS almacena mensajes hasta que un consumidor los procesa, pero no define el orden de los pasos ni las decisiones del proceso."
      - label: "Amazon SNS"
        explanation: "Amazon SNS envía un mensaje a muchos suscriptores; elegirlo para coordinar pasos con lógica condicional es una trampa típica del examen."
      - label: "Amazon EventBridge"
        explanation: "Amazon EventBridge filtra y enruta eventos con reglas hacia destinos; no organiza un proceso de varios pasos con decisiones y reintentos."
      - label: "AWS Step Functions"
        explanation: "AWS Step Functions coordina componentes con flujos de trabajo visuales: inicia y sigue cada paso, reintenta ante errores y registra el estado."
        correct: true
practice:
  - prompt: "Una empresa de logística de Monterrey quiere ejecutar una función de AWS Lambda cada vez que una de sus instancias de EC2 cambie de estado, filtrando con reglas solo los eventos que le interesan. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon EventBridge"
        explanation: "EventBridge es un bus de eventos serverless que recibe eventos de servicios de AWS y los filtra con reglas para enviarlos a destinos como Lambda."
        correct: true
      - label: "Amazon SQS"
        explanation: "Amazon SQS guarda mensajes en una cola para que un consumidor los saque; no filtra eventos de servicios de AWS con reglas."
      - label: "AWS Step Functions"
        explanation: "Step Functions coordina pasos de un flujo de trabajo; reaccionar a eventos con reglas de filtrado es la función de EventBridge."
      - label: "Amazon SES"
        explanation: "Amazon SES envía correos de negocio con tu propio dominio; no reacciona a cambios de estado de instancias."
  - prompt: "Una plataforma de venta de entradas de Buenos Aires recibe picos enormes al abrir cada venta. Quiere guardar las solicitudes hasta que sus servidores las procesen a su ritmo, sin perder mensajes y con máximo rendimiento; el orden no importa. ¿Qué debe usar?"
    options:
      - label: "Un tema de Amazon SNS"
        explanation: "SNS empuja cada mensaje a sus suscriptores en el momento; no guarda los mensajes para que un consumidor los saque a su ritmo."
      - label: "AWS Step Functions"
        explanation: "Step Functions orquesta pasos con decisiones y reintentos; no es una cola que absorba picos de carga."
      - label: "Una cola Standard de Amazon SQS"
        explanation: "La cola Standard de SQS guarda los mensajes sin perderlos hasta que un consumidor los procesa y ofrece el máximo rendimiento."
        correct: true
      - label: "Amazon EventBridge"
        explanation: "EventBridge enruta eventos con reglas hacia destinos; el escenario pide guardar solicitudes para que los servidores las saquen a su ritmo."
  - prompt: "El equipo de TI de una clínica de Rosario quiere que, cuando falle un proceso crítico, se envíe una alerta por SMS y por correo electrónico a los administradores de turno. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon SQS"
        explanation: "Elegir SQS para avisar a personas es una trampa típica: SQS guarda mensajes para que un consumidor los saque, no envía SMS ni correos."
      - label: "Amazon SNS"
        explanation: "Amazon SNS notifica a personas por SMS, correo electrónico y push móvil, lo que lo hace la opción para alertas a administradores."
        correct: true
      - label: "AWS Step Functions"
        explanation: "Step Functions coordina los pasos de un proceso; no es el servicio que entrega alertas por SMS y correo."
      - label: "Amazon EventBridge"
        explanation: "EventBridge filtra y enruta eventos con reglas hacia destinos; no envía por sí mismo SMS ni correos a personas."
  - prompt: "En una app de delivery de Ciudad de México, todos los componentes se llaman directamente entre sí. Cuando el servicio de pagos falla, se pierden pedidos. ¿Qué principio de diseño resuelve este problema?"
    options:
      - label: "Mantener una arquitectura acoplada (tightly coupled)"
        explanation: "En una arquitectura acoplada la falla de un componente se propaga a los demás, que es justo el problema actual."
      - label: "Concentrar toda la lógica en un solo programa"
        explanation: "Un solo programa hace que la caída del servicio de pagos afecte a todo el proceso de pedidos."
      - label: "Hacer que cada componente escale junto con los demás"
        explanation: "Si todos dependen unos de otros, siguen compartiendo las fallas; la idea es que cada parte escale de forma independiente."
      - label: "Desacoplar los componentes para que se comuniquen mediante mensajes"
        explanation: "Al desacoplar, un componente deja un mensaje y otro lo procesa cuando puede, así una falla no se propaga y no se pierden pedidos."
        correct: true
  - prompt: "Una tienda online de Guayaquil quiere enviar confirmaciones de compra y boletines de marketing por correo electrónico desde su propio dominio. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon SES"
        explanation: "Amazon SES es el servicio para correos de negocio con tu propio dominio, como confirmaciones de compra y boletines."
        correct: true
      - label: "Amazon SQS"
        explanation: "Amazon SQS es una cola de mensajes entre componentes; no envía correos a clientes."
      - label: "AWS Step Functions"
        explanation: "Step Functions coordina pasos de un flujo de trabajo; no es un servicio de envío de correo."
      - label: "Amazon EventBridge"
        explanation: "EventBridge enruta eventos entre aplicaciones y servicios; no envía correos de negocio desde tu dominio."
  - prompt: "¿Cuál es la diferencia de modelo entre Amazon SQS y Amazon SNS?"
    options:
      - label: "SQS empuja mensajes a muchos suscriptores y SNS los guarda en una cola"
        explanation: "Está al revés: SQS es la cola de la que el consumidor saca mensajes y SNS empuja a los suscriptores."
      - label: "SQS es un bus de eventos con reglas y SNS un flujo de trabajo visual"
        explanation: "El bus de eventos con reglas es EventBridge y los flujos de trabajo visuales son de Step Functions."
      - label: "En SQS el consumidor saca (pull) los mensajes; SNS empuja (push) cada mensaje a todos los suscriptores"
        explanation: "SQS guarda mensajes para que un consumidor los saque, mientras SNS es pub/sub y empuja el mensaje a muchos suscriptores."
        correct: true
      - label: "SQS solo envía SMS y SNS solo conecta microservicios"
        explanation: "Los SMS a personas los envía SNS, y SQS es una cola de mensajes entre componentes."
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
