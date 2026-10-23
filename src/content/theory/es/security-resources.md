---
title: "Recursos y documentación de seguridad"
summary: "Dónde encontrar documentación y ayuda de seguridad de AWS (Security Center, Knowledge Center, Security Blog), productos de terceros en AWS Marketplace y cómo reportar abusos."
domain: "security-compliance"
order: 10
examTasks: ["2.4"]
services: ["AWS Marketplace", "AWS WAF", "AWS Artifact"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/security/"
  - "https://aws.amazon.com/security/"
  - "https://aws.amazon.com/blogs/security/"
  - "https://repost.aws/knowledge-center"
  - "https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html"
  - "https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html"
  - "https://aws.amazon.com/security/vulnerability-reporting/"
  - "https://aws.amazon.com/about-aws/whats-new/2024/10/aws-trust-safety-center-re-post/"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html"
quiz:
  - prompt: "Una cooperativa de ahorro de Asunción ya usa en su centro de datos un firewall de próxima generación de un fabricante conocido y quiere desplegar el mismo producto en AWS, con el cargo en su factura de AWS. ¿Dónde debe buscarlo?"
    options:
      - label: "AWS Artifact"
        explanation: "AWS Artifact sirve para descargar informes de cumplimiento de AWS como SOC, ISO o PCI; no vende software de terceros."
      - label: "AWS Knowledge Center"
        explanation: "El Knowledge Center en re:Post ofrece soluciones paso a paso a preguntas frecuentes; no permite comprar ni desplegar productos."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace es un catálogo curado de software de terceros, incluidos productos de seguridad, y sus cargos aparecen en tu factura de AWS."
        correct: true
      - label: "AWS Security Blog"
        explanation: "El Security Blog publica novedades y buenas prácticas; no es un lugar para comprar ni desplegar un firewall de un fabricante."
  - prompt: "Una empresa de medios de San José detecta que una instancia EC2 con una IP de AWS envía tráfico malicioso a su red. ¿A quién debe reportarlo?"
    options:
      - label: "A AWS Trust & Safety, con el formulario de abuso de AWS"
        explanation: "Cuando un recurso de AWS se usa con fines abusivos, como una instancia EC2 que envía tráfico malicioso, el canal es AWS Trust & Safety mediante el formulario de abuso."
        correct: true
      - label: "Abriendo un caso de soporte técnico en AWS Support"
        explanation: "AWS Support gestiona problemas de tu propia cuenta; abrir un caso técnico para reportar abuso desde una IP de AWS es una trampa típica del examen."
      - label: "Al programa de divulgación de vulnerabilidades de AWS"
        explanation: "Ese programa es para reportar vulnerabilidades en los servicios de AWS, no el uso abusivo de un recurso de AWS por parte de otra persona."
      - label: "Descargando un informe en AWS Artifact"
        explanation: "AWS Artifact entrega informes de cumplimiento de AWS; no sirve para reportar actividad abusiva."
  - prompt: "Un desarrollador de una startup de Medellín configuró una bucket policy de Amazon S3 que bloquea todo el acceso y necesita una solución paso a paso a este problema frecuente. ¿Qué recurso le conviene consultar?"
    options:
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace vende software, datos y servicios de terceros; no ofrece artículos con soluciones a problemas frecuentes."
      - label: "AWS Artifact"
        explanation: "AWS Artifact da acceso a informes de cumplimiento de AWS como SOC o ISO; no explica cómo corregir una bucket policy."
      - label: "AWS Trust & Safety Center"
        explanation: "El Trust & Safety Center explica cómo reportar abusos y los usos prohibidos de los servicios; no trata la configuración de bucket policies."
      - label: "AWS Knowledge Center (en AWS re:Post)"
        explanation: "El Knowledge Center reúne preguntas frecuentes de los clientes con soluciones paso a paso, por ejemplo cómo corregir una bucket policy de S3 que bloquea todo el acceso."
        correct: true
practice:
  - prompt: "El auditor externo de una aseguradora de Quito pide el informe SOC de AWS para revisar los controles del proveedor de nube. ¿Dónde lo descarga la empresa?"
    options:
      - label: "En el AWS Security Blog"
        explanation: "El Security Blog publica guías técnicas, novedades y buenas prácticas; los informes SOC no se descargan ahí."
      - label: "En AWS Artifact"
        explanation: "AWS Artifact da acceso a los informes de cumplimiento de AWS, como SOC, ISO o PCI."
        correct: true
      - label: "En el AWS Trust & Safety Center"
        explanation: "El Trust & Safety Center explica cómo reportar abusos y los usos prohibidos; no entrega informes de cumplimiento."
      - label: "En AWS Marketplace"
        explanation: "AWS Marketplace vende software, datos y servicios de terceros; no es donde AWS publica sus informes de cumplimiento."
  - prompt: "Un desarrollador de una empresa de pagos de Lima necesita saber cómo configurar el cifrado, el control de acceso y el registro de Amazon S3. ¿Qué recurso le conviene consultar?"
    options:
      - label: "AWS Artifact"
        explanation: "AWS Artifact entrega informes de cumplimiento de AWS; no explica cómo configurar la seguridad de un servicio."
      - label: "El AWS Trust & Safety Center"
        explanation: "El Trust & Safety Center trata reportes de abuso y usos prohibidos; no documenta la configuración de seguridad de S3."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace sirve para comprar y desplegar productos de terceros; no es la guía de configuración de S3."
      - label: "El capítulo de seguridad de Amazon S3 en la AWS Security Documentation"
        explanation: "La documentación de seguridad tiene un capítulo por servicio; el de S3 explica cifrado, control de acceso y registro."
        correct: true
  - prompt: "Un investigador de seguridad de Ciudad de México encuentra una posible vulnerabilidad en un servicio de AWS. ¿Por qué canal debe reportarla?"
    options:
      - label: "Por el programa de divulgación de vulnerabilidades de AWS"
        explanation: "Las vulnerabilidades en servicios de AWS se reportan mediante el programa de divulgación de vulnerabilidades."
        correct: true
      - label: "Por el formulario de abuso de AWS Trust & Safety"
        explanation: "Trust & Safety recibe reportes de recursos de AWS usados con fines abusivos, no de vulnerabilidades en los servicios."
      - label: "Descargando un informe en AWS Artifact"
        explanation: "AWS Artifact entrega informes de cumplimiento; no es un canal para reportar vulnerabilidades."
      - label: "Comprando un producto de seguridad en AWS Marketplace"
        explanation: "AWS Marketplace vende software de terceros; comprar un producto no reporta la vulnerabilidad a AWS."
  - prompt: "La jefa de seguridad de una cadena de supermercados de Santiago quiere enterarse de novedades y leer ejemplos prácticos escritos por especialistas de AWS sobre detección de amenazas y criptografía. ¿Qué recurso debe seguir?"
    options:
      - label: "AWS Artifact"
        explanation: "AWS Artifact sirve para descargar informes de cumplimiento como SOC o ISO; no publica novedades ni ejemplos prácticos."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace es un catálogo de software y servicios de terceros; no es una fuente de artículos de especialistas de AWS."
      - label: "AWS Security Blog"
        explanation: "El Security Blog publica novedades, guías técnicas y ejemplos prácticos de especialistas de AWS sobre identidades, detección de amenazas y criptografía."
        correct: true
      - label: "El formulario de abuso de AWS"
        explanation: "El formulario de abuso sirve para reportar recursos de AWS usados con fines abusivos; no ofrece contenido de aprendizaje."
  - prompt: "Una universidad de Bogotá ya pagó la licencia de un producto de seguridad de terceros y quiere desplegarlo en AWS desde AWS Marketplace usando esa misma licencia. ¿Qué modelo de precio de Marketplace le corresponde?"
    options:
      - label: "Prueba gratuita"
        explanation: "La prueba gratuita permite evaluar un producto por un tiempo; no consiste en reutilizar una licencia ya pagada."
      - label: "Por hora"
        explanation: "El modelo por hora cobra según el tiempo de uso; la universidad pagaría de nuevo en lugar de usar su licencia."
      - label: "Anual"
        explanation: "El modelo anual es una suscripción nueva por un año; no aprovecha la licencia que la universidad ya tiene."
      - label: "Trae tu propia licencia (BYOL)"
        explanation: "BYOL es el modelo de AWS Marketplace para usar una licencia que ya tienes con el producto desplegado en AWS."
        correct: true
  - prompt: "Antes de comprar un producto de seguridad en AWS Marketplace, el área de compras de un banco de Panamá quiere revisar documentos de seguridad y cumplimiento del vendedor. ¿Qué función de Marketplace le ayuda?"
    options:
      - label: "AWS Security Blog"
        explanation: "El Security Blog publica artículos de AWS sobre buenas prácticas; no reúne documentos de cumplimiento de vendedores de Marketplace."
      - label: "AWS Trust & Safety Center"
        explanation: "El Trust & Safety Center explica cómo reportar abusos; no muestra documentos de seguridad de vendedores."
      - label: "AWS Marketplace Vendor Insights"
        explanation: "Vendor Insights permite revisar documentos de seguridad y cumplimiento de algunos vendedores de AWS Marketplace."
        correct: true
      - label: "El formulario de abuso de AWS"
        explanation: "El formulario de abuso sirve para reportar recursos de AWS usados con fines abusivos, no para evaluar a un vendedor."
---

## ¿Por qué importa?

Un equipo pequeño de una cooperativa de ahorro en Asunción acaba de migrar a AWS. No tiene un especialista en seguridad a tiempo completo y se hace preguntas muy concretas: ¿cómo configuro el cifrado de este servicio?, ¿dónde leo buenas prácticas actualizadas?, ¿puedo comprar un firewall de un fabricante que ya conozco? y, si veo tráfico extraño que viene de una IP de AWS, ¿a quién aviso?

AWS publica mucha información de seguridad, y el examen pide saber **qué recurso usar para cada necesidad**.

## Documentación de seguridad que ofrece AWS

### AWS Security Documentation

En **docs.aws.amazon.com/security** está el índice de la **documentación de seguridad de AWS**. Reúne:

- Enlaces al **modelo de responsabilidad compartida**, a las **buenas prácticas de seguridad** del AWS Architecture Center y a recursos de **aprendizaje de seguridad** (entradas de blog, whitepapers, tutoriales y capacitación).
- Enlaces a recursos de **cumplimiento**, como AWS Artifact y la lista de servicios elegibles para HIPAA.
- Un **capítulo de seguridad para cada servicio**, organizado por categoría (cómputo, almacenamiento, bases de datos, redes, etc.). Por ejemplo, el capítulo de Amazon S3 explica cifrado, control de acceso y registro para S3.

Cuando la pregunta es "¿cómo configuro de forma segura el servicio X?", la respuesta suele ser **la sección de seguridad de la documentación de ese servicio**.

### AWS Security Center

El **AWS Security Center** (la página **aws.amazon.com/security**, "Cloud Security") es el punto de entrada general sobre seguridad en AWS. Desde ahí se accede a:

- Los **servicios de seguridad**, casos de uso, **cumplimiento** y protección de datos.
- **Soluciones de socios** y ofertas de seguridad en AWS Marketplace.
- Recursos de **aprendizaje**, como la capacitación AWS Security Fundamentals y la AWS Security Reference Architecture.
- Cómo **reportar vulnerabilidades** y actividad sospechosa. AWS también publica avisos públicos como **Security Bulletins** (boletines de seguridad).

### AWS Knowledge Center

El **AWS Knowledge Center** hoy vive en **AWS re:Post** (repost.aws/knowledge-center). Contiene artículos con las **preguntas más frecuentes** de los clientes y sus soluciones paso a paso, por ejemplo cómo corregir una bucket policy de S3 que bloquea todo el acceso o cómo revisar y responder a un aviso de abuso. Es ideal para resolver un problema concreto rápidamente.

### AWS Security Blog

El **AWS Security Blog** (aws.amazon.com/blogs/security) publica **guías técnicas y buenas prácticas** sobre gestión de identidades y accesos, detección de amenazas, criptografía y otros temas. Es la fuente para enterarse de **novedades** y ver **ejemplos prácticos** escritos por especialistas de AWS.

| Necesidad | Recurso |
| --- | --- |
| Configurar la seguridad de un servicio concreto | Documentación de seguridad del servicio (AWS Security Documentation) |
| Visión general, servicios y cumplimiento | AWS Security Center |
| Solución paso a paso a un problema frecuente | AWS Knowledge Center (en re:Post) |
| Novedades, artículos y buenas prácticas | AWS Security Blog |
| Informes de cumplimiento de AWS (SOC, ISO, PCI) | AWS Artifact |

## Productos de seguridad de terceros: AWS Marketplace

**AWS Marketplace** es un **catálogo digital curado** donde puedes **encontrar, comprar, desplegar y administrar software, datos y servicios de terceros**. Incluye miles de productos de categorías como **seguridad**, redes y almacenamiento.

- Formatos de despliegue: por ejemplo, **Amazon Machine Images (AMI)**, **software como servicio (SaaS)** o plantillas de CloudFormation. Incluso hay **conjuntos de reglas para AWS WAF** de vendedores especializados, que también pueden usarse con AWS Firewall Manager.
- Modelos de precio flexibles: prueba gratuita, por hora, mensual, anual, multianual o **trae tu propia licencia** (*BYOL*).
- **Los cargos aparecen en tu factura de AWS**, lo que simplifica las compras.
- Todos los productos pasan por un proceso de **curación**.
- Con **AWS Marketplace Vendor Insights**, puedes revisar documentos de seguridad y cumplimiento de algunos vendedores, accesibles también desde AWS Artifact.

Escenario típico: "la empresa ya usa un firewall de próxima generación de un fabricante conocido y quiere el mismo en AWS" → **AWS Marketplace**.

## Reportar abusos: AWS Trust & Safety

Si detectas que **un recurso de AWS se usa con fines abusivos** (por ejemplo, una instancia EC2 que envía tráfico malicioso a tu red o un bucket de S3 que aloja contenido fraudulento), debes avisar al equipo **AWS Trust & Safety**:

- Completa el **formulario de abuso de AWS** (*AWS abuse form*) o escribe a la dirección de correo de Trust & Safety indicada en la página oficial.
- El **AWS Trust & Safety Center**, disponible en AWS re:Post, explica cómo enviar un reporte, los **usos prohibidos** de los servicios de AWS y cómo responder si **tú** recibes un aviso de abuso.

No confundas este canal con otros: las **vulnerabilidades en servicios de AWS** se reportan por el programa de divulgación de vulnerabilidades, y los problemas con tu propia cuenta se gestionan con AWS Support.

## Trampas típicas del examen

- **Buscar informes SOC o ISO en el Security Blog o en el Knowledge Center.** Se descargan en **AWS Artifact**.
- **Abrir un caso de soporte técnico para reportar abuso desde IP de AWS.** El canal es **AWS Trust & Safety** (formulario de abuso).
- **Pensar que AWS Marketplace solo vende productos de AWS.** Vende software de **terceros**, facturado en tu cuenta de AWS.
- **Confundir el Knowledge Center con el Security Blog.** Knowledge Center = respuestas a preguntas frecuentes; Blog = artículos y novedades.

## Resumen para el examen

- AWS Security Documentation: capítulo de seguridad por servicio y guías generales.
- AWS Security Center: punto de entrada a servicios, cumplimiento, aprendizaje y reportes.
- AWS Knowledge Center (re:Post): soluciones a preguntas frecuentes.
- AWS Security Blog: novedades y buenas prácticas.
- AWS Marketplace: productos de seguridad de terceros, cobrados en la factura de AWS.
- Abuso con recursos de AWS → AWS Trust & Safety (formulario de abuso).
