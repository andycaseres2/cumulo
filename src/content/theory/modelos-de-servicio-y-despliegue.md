---
title: "Modelos de servicio y de despliegue"
summary: "Distingue IaaS, PaaS y SaaS, y los despliegues en la nube, híbrido y on-premises, según cuánto controla y gestiona cada parte."
domain: "cloud-concepts"
order: 2
examTasks: ["1.1", "3.1"]
services: ["Amazon EC2", "AWS Elastic Beanstalk", "AWS Outposts"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/types-of-cloud-computing/"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html"
  - "https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html"
quiz:
  - prompt: "El equipo de una cadena de farmacias de Guadalajara renta servidores virtuales en Amazon EC2 y se encarga de instalar y parchar el sistema operativo. ¿Qué modelo de servicio está usando?"
    options:
      - label: "SaaS (Software as a Service)"
        explanation: "En SaaS el proveedor ejecuta y administra una aplicación completa y tú solo la usas; aquí el equipo administra el sistema operativo."
      - label: "PaaS (Platform as a Service)"
        explanation: "En PaaS el proveedor administra el hardware y el sistema operativo; si el equipo parcha el sistema operativo, no es PaaS."
      - label: "IaaS (Infrastructure as a Service)"
        explanation: "IaaS entrega los bloques básicos (cómputo, red, almacenamiento) con el mayor control; en Amazon EC2 tú instalas y actualizas el sistema operativo."
        correct: true
      - label: "Modelo de despliegue híbrido"
        explanation: "Híbrido es un modelo de despliegue (dónde vive la aplicación), no un modelo de servicio; la pregunta es cuánto administra el equipo."
  - prompt: "Una startup de Medellín quiere subir el código de su app de pedidos y que AWS aprovisione las instancias EC2, configure el balanceo de carga, el monitoreo de salud y el escalado. ¿Qué servicio de AWS le conviene?"
    options:
      - label: "Amazon EC2, administrando las instancias por su cuenta"
        explanation: "Con Amazon EC2 directo la startup tendría que administrar los servidores y el sistema operativo por su cuenta; quiere solo subir su código."
      - label: "AWS Elastic Beanstalk"
        explanation: "Con AWS Elastic Beanstalk construyes y subes tu aplicación, y el servicio aprovisiona EC2, configura balanceo de carga, monitoreo de salud y escalado (enfoque PaaS)."
        correct: true
      - label: "AWS Outposts"
        explanation: "AWS Outposts lleva infraestructura de AWS a las instalaciones del cliente para escenarios híbridos; no es una plataforma para solo subir código."
      - label: "Un despliegue on-premises con virtualización"
        explanation: "On-premises significa operar recursos en tu propio centro de datos; la startup quiere que AWS se encargue de la infraestructura."
  - prompt: "Por regulación, un hospital de Monterrey debe mantener parte de sus datos en su propio centro de datos, conectado a sus aplicaciones en AWS, con baja latencia hacia sus sistemas locales. ¿Qué modelo de despliegue y qué servicio de AWS encajan?"
    options:
      - label: "Despliegue en la nube, con todo ejecutándose en AWS"
        explanation: "En el modelo de nube todas las partes de la aplicación se ejecutan en la nube; el hospital debe mantener datos en sus instalaciones."
      - label: "On-premises (nube privada), sin conexión con la nube"
        explanation: "On-premises deja todo en el centro de datos propio; el hospital necesita conectar sus recursos locales con la nube."
      - label: "PaaS con AWS Elastic Beanstalk"
        explanation: "PaaS describe cuánto administras, no dónde viven los datos; Elastic Beanstalk no lleva capacidad de AWS a las instalaciones del hospital."
      - label: "Despliegue híbrido con AWS Outposts"
        explanation: "Híbrido conecta la nube con infraestructura on-premises, y AWS Outposts lleva infraestructura de AWS a tus instalaciones para baja latencia o procesamiento local de datos."
        correct: true
---

## ¿Por qué importa?

Una cadena de farmacias en Guadalajara quiere modernizar su tecnología. El equipo de sistemas discute tres ideas: rentar servidores virtuales y administrarlos como siempre, usar una plataforma donde solo suban el código de su app de pedidos, o simplemente contratar un software de correo y facturación listo para usar. Además, por regulación, parte de sus datos debe seguir en su propio centro de datos por un tiempo.

Cada idea corresponde a un **modelo de servicio** distinto, y la situación con datos "dentro y fuera" de la empresa corresponde a un **modelo de despliegue**. El examen te pedirá reconocerlos a partir de escenarios como este.

## Modelos de servicio: IaaS, PaaS y SaaS

Un **modelo de servicio** describe qué parte de la tecnología administra el proveedor y qué parte administras tú. Cuanto más "arriba" vas, menos administras y menos control tienes.

- **IaaS (Infrastructure as a Service, infraestructura como servicio):** según AWS, contiene los bloques básicos de la TI en la nube: redes, cómputo y almacenamiento. Te da **la mayor flexibilidad y control** sobre tus recursos. Ejemplo típico en AWS: **Amazon EC2**, donde rentas servidores virtuales y tú instalas y actualizas el sistema operativo.
- **PaaS (Platform as a Service, plataforma como servicio):** el proveedor elimina la necesidad de que administres la infraestructura subyacente (hardware y sistemas operativos). Tú te concentras en **desplegar y administrar tu aplicación**. En AWS, **AWS Elastic Beanstalk** funciona con este enfoque: tú construyes y subes tu aplicación, y el servicio aprovisiona las instancias EC2, configura el balanceo de carga, el monitoreo de salud y el escalado. No tiene costo adicional; pagas los recursos que usa tu aplicación.
- **SaaS (Software as a Service, software como servicio):** el proveedor te entrega una aplicación completa que él mismo ejecuta y administra. Solo piensas en **cómo usas el software**. AWS da como ejemplo común el correo electrónico basado en web.

| | IaaS | PaaS | SaaS |
| --- | --- | --- | --- |
| ¿Qué recibes? | Bloques básicos: cómputo, red, almacenamiento | Una plataforma para desplegar tu app | Una aplicación terminada |
| ¿Quién gestiona el sistema operativo? | Tú | El proveedor | El proveedor |
| ¿Quién gestiona la aplicación? | Tú | Tú | El proveedor |
| Nivel de control | Máximo | Medio | Mínimo |
| Ejemplo | Servidores virtuales (Amazon EC2) | Subir tu código a AWS Elastic Beanstalk | Correo web |

Regla práctica: si en el escenario alguien **parcha el sistema operativo**, es IaaS. Si solo **sube código**, es PaaS. Si solo **usa** el producto, es SaaS.

## Modelos de despliegue: nube, híbrido y on-premises

Un **modelo de despliegue** describe **dónde** viven tus aplicaciones. AWS define tres:

- **Nube (cloud):** la aplicación está completamente desplegada en la nube; todas sus partes se ejecutan ahí. Puede haber sido creada en la nube o migrada desde infraestructura existente.
- **Híbrido (hybrid):** conecta infraestructura y aplicaciones entre recursos en la nube y recursos que **no** están en la nube. El caso más común es unir la nube con la infraestructura **on-premises** existente para extenderla.
- **On-premises (nube privada):** desplegar recursos en tus propias instalaciones usando virtualización y herramientas de gestión. AWS señala que a veces se le llama *private cloud*, que **no ofrece muchos de los beneficios** de la nube, pero que algunas empresas lo buscan porque proporciona recursos dedicados.

**On-premises** significa literalmente "en las instalaciones": los servidores están en un centro de datos propiedad de la empresa.

Para escenarios híbridos, **AWS Outposts** es un servicio totalmente administrado que lleva infraestructura, servicios, APIs y herramientas de AWS a las instalaciones del cliente. AWS opera y administra esa capacidad como parte de una Región. Se usa cuando una aplicación necesita **baja latencia** hacia sistemas locales o **procesamiento local de datos**, pero quieres trabajar con las mismas APIs que en la nube.

| Modelo | ¿Dónde se ejecuta? | Caso típico |
| --- | --- | --- |
| Nube | Todo en la nube | Startup que nace en AWS |
| Híbrido | Parte en la nube y parte on-premises, conectadas | Empresa que migra por etapas o tiene datos que deben quedarse en casa |
| On-premises | Todo en el centro de datos propio | Organización que necesita recursos dedicados en sus instalaciones |

## ¿Cuándo conviene cada modelo de despliegue?

- **Nube:** aplicaciones nuevas o que pueden moverse por completo; quieres aprovechar al máximo el pago por uso, la elasticidad y el alcance global, sin mantener hardware.
- **Híbrido:** migración por etapas, sistemas heredados que todavía no pueden moverse, datos que deben quedarse en las instalaciones por regulación, o cargas que necesitan baja latencia con equipos locales (por ejemplo, con AWS Outposts).
- **On-premises:** la organización necesita recursos dedicados en sus propias instalaciones y acepta renunciar a muchos beneficios de la nube (pago por uso, escala global, menos mantenimiento).

## Cómo se combinan

Los dos conceptos son independientes. La farmacia de Guadalajara podría usar **IaaS** (servidores virtuales en AWS) dentro de un despliegue **híbrido** (porque mantiene parte de sus datos en su centro de datos). Primero identifica **cuánto administra el cliente** (servicio) y después **dónde está todo** (despliegue).

## Trampas típicas del examen

- **Creer que "nube privada" es un servicio de AWS.** En el lenguaje de AWS, el despliegue on-premises con virtualización es lo que a veces se llama nube privada.
- **Confundir híbrido con "usar varios servicios de AWS".** Híbrido significa conectar la nube con recursos **fuera** de la nube, normalmente on-premises.
- **Pensar que IaaS da menos control que PaaS.** Es al revés: IaaS ofrece el mayor control y flexibilidad.
- **Elegir PaaS cuando el usuario solo consume una aplicación lista.** Si no hay código propio que desplegar, es SaaS.
- **Pensar que AWS Outposts es un despliegue 100 % en la nube.** Outposts lleva capacidad de AWS a tus instalaciones: es una pieza típica de un escenario híbrido.

## Resumen para el examen

- IaaS: bloques básicos (cómputo, red, almacenamiento); máximo control.
- PaaS: el proveedor gestiona infraestructura y sistema operativo; tú gestionas tu app.
- SaaS: aplicación completa administrada por el proveedor; tú solo la usas.
- Nube: todo se ejecuta en la nube.
- Híbrido: nube conectada con infraestructura que no está en la nube.
- On-premises: centro de datos propio; a veces llamado nube privada.
- AWS Elastic Beanstalk: subes el código y AWS aprovisiona, balancea y escala (enfoque PaaS).
- AWS Outposts: infraestructura de AWS en tus instalaciones, para baja latencia o procesamiento local.
- Servicio y despliegue son ejes distintos y se combinan.
