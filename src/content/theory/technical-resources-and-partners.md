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
practice:
  - prompt: "Una consultora de Lima es socia de AWS y se dedica a migrar, implementar y administrar soluciones en AWS para sus clientes, sin vender software propio. ¿Qué tipo de socio de la AWS Partner Network es?"
    options:
      - label: "Independent Software Vendor (ISV)"
        explanation: "Un ISV se define por crear software que funciona en AWS o se integra con AWS; la consultora no vende software propio."
      - label: "System integrator (SI) o socio de servicios"
        explanation: "Los system integrators y socios de servicios diseñan, migran, implementan o administran soluciones en AWS para sus clientes."
        correct: true
      - label: "Private Marketplace"
        explanation: "Private Marketplace es una función de gobernanza de AWS Marketplace para limitar el catálogo; no es un tipo de socio."
      - label: "AWS License Manager"
        explanation: "AWS License Manager gestiona licencias y entitlements; no es una categoría de socio de la APN."
  - prompt: "Una empresa minera de Antofagasta compró licencias de un software en AWS Marketplace y quiere distribuirlas, activarlas y rastrearlas entre varias cuentas de su organización. ¿Qué servicio usa?"
    options:
      - label: "Private Marketplace"
        explanation: "Private Marketplace define qué productos aprobados pueden comprar los usuarios; no distribuye ni rastrea licencias ya compradas."
      - label: "AWS Prescriptive Guidance"
        explanation: "AWS Prescriptive Guidance ofrece guías y patrones para migrar y modernizar; no gestiona licencias."
      - label: "AWS re:Post"
        explanation: "AWS re:Post es un servicio de preguntas y respuestas de la comunidad; no administra derechos de uso de software."
      - label: "AWS License Manager"
        explanation: "AWS Marketplace gestiona los entitlements con AWS License Manager, que distribuye, activa y rastrea las licencias compradas, incluso entre cuentas de la organización."
        correct: true
  - prompt: "El área de compras de una cadena hotelera de Cancún quiere negociar con un vendedor de AWS Marketplace precios y términos personalizados para un contrato grande. ¿Qué opción de Marketplace corresponde?"
    options:
      - label: "Ofertas privadas"
        explanation: "Las ofertas privadas de AWS Marketplace permiten acordar precios y términos personalizados negociados con el vendedor."
        correct: true
      - label: "Private Marketplace"
        explanation: "Private Marketplace limita el catálogo a productos aprobados; no sirve para negociar precios con un vendedor."
      - label: "Trae tu propia licencia (BYOL)"
        explanation: "BYOL sirve para usar una licencia que ya tienes; no es un mecanismo para negociar precios y términos nuevos."
      - label: "AWS License Manager"
        explanation: "AWS License Manager distribuye y rastrea licencias compradas; no negocia precios con el vendedor."
  - prompt: "Una aerolínea de Bogotá quiere que un equipo de AWS ejecute con ella un proyecto de migración a gran escala y modernización de sus aplicaciones. ¿Qué debe contratar?"
    options:
      - label: "AWS Support, abriendo casos técnicos"
        explanation: "AWS Support atiende casos técnicos según el plan contratado; no ejecuta proyectos de migración, que es el rol de AWS Professional Services."
      - label: "AWS re:Post"
        explanation: "AWS re:Post ofrece preguntas y respuestas de la comunidad; no ejecuta proyectos de migración."
      - label: "AWS Professional Services"
        explanation: "AWS Professional Services es el equipo de AWS que ayuda a diseñar, construir, migrar y administrar cargas, incluidas migraciones a gran escala y modernización."
        correct: true
      - label: "AWS Whitepapers & Guides"
        explanation: "Los whitepapers ofrecen buenas prácticas y arquitecturas de referencia por escrito; no son un equipo que ejecute el proyecto."
  - prompt: "Una startup de salud de Montevideo quiere que un asesor técnico de AWS revise el diseño de su arquitectura con una revisión AWS Well-Architected. ¿Quién cumple ese rol?"
    options:
      - label: "AWS Knowledge Center"
        explanation: "El Knowledge Center contiene artículos con respuestas a preguntas frecuentes; no es un asesor que revise tu arquitectura."
      - label: "Un AWS solutions architect"
        explanation: "Los solutions architects son asesores técnicos que ayudan a diseñar arquitecturas, por ejemplo mediante revisiones AWS Well-Architected."
        correct: true
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace es un catálogo de software, datos y servicios de terceros; no ofrece revisiones de arquitectura con asesores de AWS."
      - label: "AWS License Manager"
        explanation: "AWS License Manager gestiona licencias de software; no participa en el diseño de arquitecturas."
  - prompt: "El arquitecto de una empresa de energía de Medellín busca material escrito por AWS y la comunidad con buenas prácticas de seguridad y cumplimiento, guías de decisión y diagramas de arquitectura de referencia. ¿Qué recurso consulta?"
    options:
      - label: "AWS re:Post"
        explanation: "AWS re:Post es para resolver dudas técnicas puntuales con preguntas y respuestas de la comunidad, no un repositorio de arquitecturas de referencia."
      - label: "AWS License Manager"
        explanation: "AWS License Manager gestiona licencias de software; no publica guías ni diagramas de arquitectura."
      - label: "AWS Whitepapers & Guides"
        explanation: "AWS Whitepapers & Guides reúne whitepapers técnicos, guías de decisión y diagramas de arquitectura de referencia sobre buenas prácticas, seguridad y cumplimiento."
        correct: true
      - label: "Private Marketplace"
        explanation: "Private Marketplace limita qué productos de Marketplace pueden comprar los usuarios; no ofrece material técnico."
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
