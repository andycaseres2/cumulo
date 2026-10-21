---
title: "Modelos de servicio y de despliegue"
summary: "Distingue IaaS, PaaS y SaaS, y los despliegues en la nube, híbrido y on-premises, según cuánto controla y gestiona cada parte."
domain: "cloud-concepts"
order: 2
services: ["Amazon EC2"]
readingMinutes: 5
sources:
  - "https://aws.amazon.com/types-of-cloud-computing/"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
---

## ¿Por qué importa?

Una cadena de farmacias en Guadalajara quiere modernizar su tecnología. El equipo de sistemas discute tres ideas: rentar servidores virtuales y administrarlos como siempre, usar una plataforma donde solo suban el código de su app de pedidos, o simplemente contratar un software de correo y facturación listo para usar. Además, por regulación, parte de sus datos debe seguir en su propio centro de datos por un tiempo.

Cada idea corresponde a un **modelo de servicio** distinto, y la situación con datos "dentro y fuera" de la empresa corresponde a un **modelo de despliegue**. El examen te pedirá reconocerlos a partir de escenarios como este.

## Modelos de servicio: IaaS, PaaS y SaaS

Un **modelo de servicio** describe qué parte de la tecnología administra el proveedor y qué parte administras tú. Cuanto más "arriba" vas, menos administras y menos control tienes.

- **IaaS (Infrastructure as a Service, infraestructura como servicio):** según AWS, contiene los bloques básicos de la TI en la nube: redes, cómputo y almacenamiento. Te da **la mayor flexibilidad y control** sobre tus recursos. Ejemplo típico en AWS: **Amazon EC2**, donde rentas servidores virtuales y tú instalas y actualizas el sistema operativo.
- **PaaS (Platform as a Service, plataforma como servicio):** el proveedor elimina la necesidad de que administres la infraestructura subyacente (hardware y sistemas operativos). Tú te concentras en **desplegar y administrar tu aplicación**.
- **SaaS (Software as a Service, software como servicio):** el proveedor te entrega una aplicación completa que él mismo ejecuta y administra. Solo piensas en **cómo usas el software**. AWS da como ejemplo común el correo electrónico basado en web.

| | IaaS | PaaS | SaaS |
| --- | --- | --- | --- |
| ¿Qué recibes? | Bloques básicos: cómputo, red, almacenamiento | Una plataforma para desplegar tu app | Una aplicación terminada |
| ¿Quién gestiona el sistema operativo? | Tú | El proveedor | El proveedor |
| ¿Quién gestiona la aplicación? | Tú | Tú | El proveedor |
| Nivel de control | Máximo | Medio | Mínimo |
| Ejemplo | Servidores virtuales (Amazon EC2) | Subir tu código y que la plataforma lo ejecute | Correo web |

Regla práctica: si en el escenario alguien **parcha el sistema operativo**, es IaaS. Si solo **sube código**, es PaaS. Si solo **usa** el producto, es SaaS.

## Modelos de despliegue: nube, híbrido y on-premises

Un **modelo de despliegue** describe **dónde** viven tus aplicaciones. AWS define tres:

- **Nube (cloud):** la aplicación está completamente desplegada en la nube; todas sus partes se ejecutan ahí. Puede haber sido creada en la nube o migrada desde infraestructura existente.
- **Híbrido (hybrid):** conecta infraestructura y aplicaciones entre recursos en la nube y recursos que **no** están en la nube. El caso más común es unir la nube con la infraestructura **on-premises** existente para extenderla.
- **On-premises (nube privada):** desplegar recursos en tus propias instalaciones usando virtualización y herramientas de gestión. AWS señala que a veces se le llama *private cloud*, que **no ofrece muchos de los beneficios** de la nube, pero que algunas empresas lo buscan porque proporciona recursos dedicados.

**On-premises** significa literalmente "en las instalaciones": los servidores están en un centro de datos propiedad de la empresa.

| Modelo | ¿Dónde se ejecuta? | Caso típico |
| --- | --- | --- |
| Nube | Todo en la nube | Startup que nace en AWS |
| Híbrido | Parte en la nube y parte on-premises, conectadas | Empresa que migra por etapas o tiene datos que deben quedarse en casa |
| On-premises | Todo en el centro de datos propio | Organización que necesita recursos dedicados en sus instalaciones |

## Cómo se combinan

Los dos conceptos son independientes. La farmacia de Guadalajara podría usar **IaaS** (servidores virtuales en AWS) dentro de un despliegue **híbrido** (porque mantiene parte de sus datos en su centro de datos). Primero identifica **cuánto administra el cliente** (servicio) y después **dónde está todo** (despliegue).

## Trampas típicas del examen

- **Creer que "nube privada" es un servicio de AWS.** En el lenguaje de AWS, el despliegue on-premises con virtualización es lo que a veces se llama nube privada.
- **Confundir híbrido con "usar varios servicios de AWS".** Híbrido significa conectar la nube con recursos **fuera** de la nube, normalmente on-premises.
- **Pensar que IaaS da menos control que PaaS.** Es al revés: IaaS ofrece el mayor control y flexibilidad.
- **Elegir PaaS cuando el usuario solo consume una aplicación lista.** Si no hay código propio que desplegar, es SaaS.

## Resumen para el examen

- IaaS: bloques básicos (cómputo, red, almacenamiento); máximo control.
- PaaS: el proveedor gestiona infraestructura y sistema operativo; tú gestionas tu app.
- SaaS: aplicación completa administrada por el proveedor; tú solo la usas.
- Nube: todo se ejecuta en la nube.
- Híbrido: nube conectada con infraestructura que no está en la nube.
- On-premises: centro de datos propio; a veces llamado nube privada.
- Servicio y despliegue son ejes distintos y se combinan.
