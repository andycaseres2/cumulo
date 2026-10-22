---
title: "Recursos técnicos, AWS Partners y Marketplace"
summary: "Ubica la documentación y los recursos técnicos oficiales de AWS, entiende el rol de la AWS Partner Network y AWS Marketplace, y conoce Professional Services y los solutions architects."
domain: "billing-pricing-support"
order: 6
examTasks: ["4.3"]
services: ["AWS Marketplace", "AWS License Manager", "AWS Support"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html"
  - "https://aws.amazon.com/whitepapers/"
  - "https://aws.amazon.com/prescriptive-guidance/"
  - "https://aws.amazon.com/about-aws/whats-new/2023/03/aws-re-post-includes-knowledge-center-articles/"
  - "https://aws.amazon.com/partners/"
  - "https://aws.amazon.com/partners/training/"
  - "https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html"
  - "https://aws.amazon.com/marketplace/features/governance"
  - "https://aws.amazon.com/professional-services/"
  - "https://aws.amazon.com/blogs/training-and-certification/engaging-a-solutions-architect/"
quiz:
  - prompt: "Una empresa de Guayaquil desarrolla un software de facturación electrónica que se integra con AWS y lo vende a clientes en AWS Marketplace. Dentro de la AWS Partner Network, ¿qué tipo de socio es?"
    options:
      - label: "Independent Software Vendor (ISV)"
        explanation: "Un ISV crea software que funciona en AWS o se integra con AWS y puede venderlo, por ejemplo, en AWS Marketplace."
        correct: true
      - label: "System integrator (SI)"
        explanation: "Un system integrator diseña, migra, implementa o administra soluciones para sus clientes; no se define por crear y vender su propio software."
      - label: "AWS Professional Services"
        explanation: "AWS Professional Services es un equipo de AWS que ayuda a diseñar, construir y migrar cargas; no es un tipo de socio de la APN."
      - label: "AWS solutions architect"
        explanation: "Los solutions architects son asesores técnicos de AWS que ayudan a diseñar arquitecturas; no son un tipo de socio que vende software."
  - prompt: "El área de compras de una cadena de clínicas de Bogotá quiere que sus usuarios solo puedan comprar en AWS Marketplace los productos de software que ella aprobó. ¿Qué debe usar?"
    options:
      - label: "AWS Prescriptive Guidance"
        explanation: "AWS Prescriptive Guidance ofrece guías y patrones para migrar y modernizar; no controla qué software pueden comprar los usuarios."
      - label: "AWS Knowledge Center"
        explanation: "El Knowledge Center tiene artículos con respuestas a preguntas frecuentes; no limita el catálogo de compras."
      - label: "Private Marketplace"
        explanation: "Private Marketplace crea un catálogo personalizado de productos aprobados para que los usuarios de la organización solo compren lo autorizado."
        correct: true
      - label: "AWS Professional Services"
        explanation: "AWS Professional Services ejecuta proyectos como migraciones o modernización; no gobierna qué productos de Marketplace se pueden comprar."
  - prompt: "Un equipo de TI de La Paz va a planear la migración de su sistema de citas y busca recursos de expertos de AWS con guías de implementación y patrones que incluyan pasos, arquitecturas y código. ¿Qué recurso debe consultar?"
    options:
      - label: "AWS re:Post"
        explanation: "AWS re:Post es un servicio de preguntas y respuestas de la comunidad, útil para dudas puntuales, no un conjunto de guías y patrones de migración."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace es un catálogo para comprar software, datos y servicios de terceros; no publica guías ni patrones de migración."
      - label: "AWS Knowledge Center"
        explanation: "El Knowledge Center responde preguntas frecuentes sobre problemas comunes; no ofrece patrones con pasos, arquitecturas y código para migrar."
      - label: "AWS Prescriptive Guidance"
        explanation: "AWS Prescriptive Guidance reúne guías de planificación e implementación y patrones con pasos, arquitecturas y código para migraciones y modernizaciones."
        correct: true
---

## ¿Por qué importa?

Una cadena de clínicas de Bogotá quiere migrar su sistema de citas a AWS. El equipo interno tiene dudas técnicas puntuales, necesita un software de seguridad de terceros ya listo para usar y no tiene experiencia para planear una migración grande. Antes de pagar un plan de soporte más alto, conviene saber **qué recursos gratuitos existen** y **quién más puede ayudar**: socios de AWS, el catálogo de AWS Marketplace o los equipos de AWS.

El examen evalúa que sepas **dónde buscar** cada tipo de ayuda.

## Documentación y recursos técnicos oficiales

| Recurso | Qué ofrece | Cuándo usarlo |
| --- | --- | --- |
| **AWS Documentation** (docs.aws.amazon.com) | Guías de usuario, referencias de API y CLI de cada servicio | Saber cómo funciona y se configura un servicio |
| **AWS Whitepapers & Guides** (aws.amazon.com/whitepapers) | Whitepapers técnicos, guías de decisión, material de referencia y diagramas de arquitectura de referencia, escritos por AWS y la comunidad | Buenas prácticas, arquitectura, seguridad y cumplimiento |
| **AWS Blogs** (aws.amazon.com/blogs) | Anuncios, casos de uso y tutoriales por tema | Novedades y ejemplos prácticos |
| **AWS Prescriptive Guidance** | Recursos de expertos de AWS para acelerar la adopción y modernización: **guías** de planificación e implementación y **patrones** con pasos, arquitecturas y código | Planear o ejecutar migraciones y modernizaciones |
| **AWS re:Post** | Servicio de conocimiento en la nube con preguntas y respuestas de la comunidad | Resolver dudas técnicas con ayuda de la comunidad y expertos |
| **AWS Knowledge Center** | Artículos con respuestas autorizadas a las preguntas más frecuentes, producidos por un equipo de AWS con insignia *AWS Official*; hoy están dentro de AWS re:Post | Problemas comunes, por ejemplo de facturación o configuración |

En el caso de las clínicas, el equipo empieza con la documentación y AWS Prescriptive Guidance para planear la migración, y usa re:Post y el Knowledge Center para dudas puntuales.

## AWS Partner Network (APN)

La **AWS Partner Network (APN)** es una comunidad global de organizaciones que usan las tecnologías, programas, financiamiento y herramientas de AWS para construir soluciones para clientes. Hay dos grandes tipos de socios:

- **Independent Software Vendors (ISVs):** empresas que crean **software** que funciona en AWS o se integra con AWS, y que pueden venderlo, por ejemplo, en AWS Marketplace.
- **System integrators (SI) y socios de servicios o consultoría:** empresas que **diseñan, migran, implementan o administran** soluciones en AWS para sus clientes, y ofrecen servicios de capacitación, profesionales o administrados.

**Beneficios de ser AWS Partner** (la guía del examen menciona capacitación y certificación, eventos y descuentos por volumen):

- **Capacitación y certificación:** catálogo de entrenamiento digital exclusivo para partners, rutas de aprendizaje y recursos de preparación para certificaciones.
- **Eventos:** webinars, talleres virtuales y eventos presenciales para partners.
- **Descuentos y financiamiento:** programas de financiamiento y beneficios económicos; consulta las condiciones vigentes en AWS Partner Central.
- **Visibilidad comercial:** vender sus soluciones a clientes de AWS de todo el mundo, por ejemplo mediante AWS Marketplace.

## AWS Marketplace

**AWS Marketplace** es un **catálogo digital curado** donde puedes encontrar, comprar, implementar y administrar **software, datos y servicios de terceros**. Incluye miles de productos de categorías como seguridad, redes, almacenamiento, machine learning, bases de datos y DevOps, en formatos como **AMI**, **SaaS** y otros, además de productos de datos de AWS Data Exchange.

Servicios clave que ofrece a los compradores:

- **Gestión de costos:** opciones de precio flexibles (prueba gratuita, por hora, mensual, anual, plurianual o **BYOL**) y **facturación integrada**: los cargos aparecen en tu factura de AWS, junto al resto del gasto.
- **Gobernanza:** **Private Marketplace** permite crear un catálogo personalizado de productos **aprobados** para que los usuarios de la organización solo compren lo autorizado.
- **Gestión de derechos de uso (*entitlements*):** distribuir, activar y rastrear las licencias compradas en Marketplace mediante **AWS License Manager**, incluso entre cuentas de tu organización.
- **Ofertas privadas:** precios y términos personalizados negociados con el vendedor.

En el ejemplo, las clínicas compran el software de seguridad en AWS Marketplace y su área de compras limita el catálogo con Private Marketplace.

## Asistencia técnica de AWS

- **AWS Professional Services:** equipo de AWS que ayuda a **diseñar, construir, migrar y administrar** cargas en AWS, incluyendo migraciones a gran escala, modernización, datos e IA y seguridad. Trabaja junto con los AWS Partners.
- **AWS solutions architects:** asesores técnicos que ayudan a clientes y partners a **diseñar arquitecturas**, por ejemplo mediante revisiones **AWS Well-Architected** y sesiones de diseño. Si hace falta implementación práctica, pueden conectar al cliente con Professional Services o con la APN.
- **AWS Support:** soporte técnico según el plan contratado, desde Basic hasta Unified Operations.

## Trampas típicas del examen

- **Pensar que AWS Marketplace solo vende servicios de AWS.** Vende software, datos y servicios **de terceros**, facturados en tu cuenta de AWS.
- **Confundir ISV con system integrator.** El ISV crea **software**; el SI **implementa y administra** soluciones para el cliente.
- **Buscar respuestas frecuentes en un whitepaper.** Para problemas comunes y concretos, el recurso indicado es el **AWS Knowledge Center**.
- **Confundir AWS Professional Services con AWS Support.** Professional Services ejecuta **proyectos** (migraciones, modernización); Support atiende **casos** según el plan.
- **Olvidar Private Marketplace.** Es la respuesta cuando piden **controlar qué software** pueden comprar los usuarios.

## Resumen para el examen

- Documentación: guías y referencias de cada servicio; whitepapers: buenas prácticas y arquitectura; blogs: novedades y ejemplos.
- AWS Prescriptive Guidance: guías y patrones de expertos para migrar y modernizar.
- AWS re:Post: preguntas y respuestas de la comunidad; Knowledge Center: respuestas oficiales a preguntas frecuentes.
- APN: ISVs (software) y system integrators o socios de servicios (implementación).
- Beneficios de partners: capacitación y certificación, eventos, descuentos y financiamiento.
- AWS Marketplace: catálogo curado de terceros; facturación integrada; Private Marketplace para gobernanza; AWS License Manager para entitlements.
- AWS Professional Services y solutions architects: asistencia técnica para proyectos y diseño de arquitectura.
