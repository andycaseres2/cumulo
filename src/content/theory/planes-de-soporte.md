---
title: "Planes de AWS Support"
summary: "Compara Basic Support, AWS Business Support+, AWS Enterprise Support y AWS Unified Operations, y conoce Trusted Advisor, AWS Health y el equipo de Trust & Safety."
domain: "billing-pricing-support"
order: 5
examTasks: ["4.3"]
services: ["AWS Support", "AWS Trusted Advisor", "AWS Health Dashboard", "Amazon EventBridge"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/premiumsupport/plans/"
  - "https://aws.amazon.com/premiumsupport/plans/business-plus/"
  - "https://aws.amazon.com/premiumsupport/plans/enterprise/"
  - "https://aws.amazon.com/premiumsupport/plans/unified-operations/"
  - "https://docs.aws.amazon.com/awssupport/latest/user/support-plans-eos.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html"
  - "https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-get-answers.html"
  - "https://aws.amazon.com/about-aws/whats-new/2024/10/aws-trust-safety-center-re-post/"
quiz:
  - prompt: "Una fintech de Ciudad de México pasa su app de pagos a producción. Necesita el plan mínimo recomendado para producción, con soporte técnico 24/7 y respuesta en menos de 30 minutos cuando hay una caída crítica del negocio. ¿Qué plan debe contratar?"
    options:
      - label: "Basic Support"
        explanation: "Basic Support está incluido para todos, pero solo cubre cuenta y facturación; no incluye casos de soporte técnico."
      - label: "AWS Enterprise Support"
        explanation: "Enterprise Support apunta a cargas críticas para el negocio con TAM designado; cumple, pero no es el plan mínimo recomendado para producción."
      - label: "AWS Business Support+"
        explanation: "Business Support+ es el mínimo recomendado para producción, con soporte técnico 24/7 y respuesta en menos de 30 minutos en caídas críticas del negocio."
        correct: true
      - label: "AWS Unified Operations"
        explanation: "Unified Operations está pensado para cargas de misión crítica con respuesta en menos de 5 minutos; excede el mínimo que se pide."
  - prompt: "El directorio de una aerolínea de Santiago quiere, para sus cargas críticas, un asesor técnico de AWS designado que conozca su cuenta y lidere revisiones Well-Architected. Entre los planes de la guía vigente, ¿cuál es el primero que lo incluye?"
    options:
      - label: "AWS Enterprise Support"
        explanation: "El Technical Account Manager (TAM) designado, que conoce tu cuenta y lidera revisiones Well-Architected, aparece desde Enterprise Support."
        correct: true
      - label: "AWS Business Support+"
        explanation: "Business Support+ ofrece asistencia con IA y acceso 24/7 a expertos, pero no incluye un TAM designado."
      - label: "Basic Support"
        explanation: "Basic Support no incluye soporte técnico ni contacto designado; da acceso a servicio al cliente, documentación y AWS re:Post."
      - label: "Developer Support"
        explanation: "Developer Support se discontinúa el 1 de enero de 2027 y no forma parte de los cuatro planes de la guía vigente del examen."
  - prompt: "Una empresa de Montevideo detecta escaneos de puertos que vienen de recursos alojados en AWS que no son suyos. ¿A quién debe reportarlo?"
    options:
      - label: "A AWS Support, abriendo un caso técnico en AWS Support Center"
        explanation: "AWS Support Center gestiona casos de soporte de tu cuenta, pero AWS Support no gestiona los reportes de abuso."
      - label: "Al AWS Health Dashboard"
        explanation: "El AWS Health Dashboard informa sobre eventos que afectan a tus recursos y a los servicios de AWS; no recibe reportes de abuso."
      - label: "A AWS Trusted Advisor"
        explanation: "Trusted Advisor inspecciona tu propio entorno y recomienda mejoras; no sirve para reportar actividad abusiva de recursos de otros."
      - label: "Al equipo de AWS Trust & Safety, mediante el formulario de reporte de abuso"
        explanation: "El abuso de recursos de AWS, como escaneo de puertos, se reporta a AWS Trust & Safety con su formulario, incluso sin tener una cuenta de AWS."
        correct: true
---

## ¿Por qué importa?

Una fintech de Ciudad de México lanza su app de pagos en AWS. Mientras está en pruebas, le basta con la documentación y los foros. Pero cuando pasa a producción, una caída de la base de datos un sábado en la noche puede costarle clientes: necesita hablar con un ingeniero de AWS **en minutos**, no en días. Y su directorio quiere a alguien de AWS que conozca su arquitectura y la ayude a prevenir problemas.

**AWS Support** ofrece distintos **planes de soporte** según la criticidad de tus cargas. El examen te pedirá elegir el plan correcto según el escenario.

## Los planes actuales

La guía vigente del examen nombra cuatro planes: **Basic Support**, **AWS Business Support+**, **AWS Enterprise Support** y **AWS Unified Operations**.

| | **Basic** | **Business Support+** | **Enterprise Support** | **Unified Operations** |
| --- | --- | --- | --- | --- |
| Costo | Incluido para todos | Pago mensual | Pago mensual | Pago mensual |
| Para qué | Aprender y experimentar | Mínimo recomendado para **producción** | Cargas **críticas para el negocio** | Cargas **de misión crítica** |
| Soporte técnico | No (solo cuenta y facturación) | 24/7 por teléfono, web, chat y correo | 24/7 por teléfono, web, chat y correo | 24/7 por teléfono, web, chat y correo |
| Respuesta en caída crítica del negocio | — | Menos de 30 minutos | Menos de 15 minutos | Menos de 5 minutos (Incident Management Engineer) |
| Trusted Advisor | Checks básicos | Todos los checks | Todos + Trusted Advisor Priority | Todos + Trusted Advisor Priority |
| Contacto designado | No | No | **Technical Account Manager (TAM)** designado | TAM e ingenieros especialistas designados |

Detalles de cada plan:

- **Basic Support:** incluido en todas las cuentas. Da acceso 24/7 a **servicio al cliente** (cuenta y facturación), documentación, whitepapers y **AWS re:Post**, además del AWS Health Dashboard y los checks básicos de Trusted Advisor. No incluye casos de soporte técnico.
- **AWS Business Support+:** agrega **asistencia con IA** que entiende el contexto de tu entorno, acceso 24/7 a expertos de AWS, todos los checks de Trusted Advisor, la **AWS Support API** y la **AWS Health API**.
- **AWS Enterprise Support:** suma un **TAM designado** (asesor técnico que conoce tu cuenta y lidera revisiones Well-Architected), acceso 24/7 a ingenieros de **AWS Security Incident Response**, servicios proactivos, talleres y AWS GameDays.
- **AWS Unified Operations:** pensado para operaciones empresariales de misión crítica. Agrega **Incident Management Engineers** que responden en minutos, **ingenieros especialistas** designados con modelo *follow-the-sun* y **monitoreo 24/7** de seguridad y rendimiento.

Los tiempos de respuesta son **objetivos**: AWS indica que hará todo esfuerzo razonable por cumplirlos. Consulta los precios vigentes en la página oficial de planes.

### ¿Y Developer, Business y Enterprise On-Ramp?

El material de estudio antiguo menciona **Developer Support**, **Business Support** y **Enterprise On-Ramp**. Según AWS, los tres se **discontinúan el 1 de enero de 2027**: los clientes de Developer y Business pueden pasar a **Business Support+**, y los de Enterprise On-Ramp se migran automáticamente a **Enterprise Support** durante 2026. Siguen disponibles en la Región AWS GovCloud (US). Para el examen, estudia los cuatro planes actuales.

## AWS Support Center y otros canales

- **AWS Support Center:** la consola donde **creas y administras casos** de soporte, eliges la **severidad** del caso y puedes usar resolución de problemas asistida por IA. Para abrir un caso necesitas ser el usuario raíz o tener permisos de IAM.
- **Servicio al cliente:** el soporte de **cuenta y facturación** es gratuito para todos los planes.
- **Comunidades:** **AWS re:Post** es el servicio de preguntas y respuestas de la comunidad, con respuestas revisadas por expertos.

## Trusted Advisor y AWS Health para monitorear tu entorno

**AWS Trusted Advisor** inspecciona tu entorno y recomienda mejoras según buenas prácticas en seis categorías: **Cost optimization**, **Performance**, **Security**, **Fault tolerance**, **Service limits** y **Operational Excellence**. Por ejemplo, detecta recursos inactivos o subutilizados que generan gasto innecesario.

- Con **Basic Support**, accedes a todos los checks de **Service limits** y a algunos de **Security** y **Fault tolerance** (por ejemplo, MFA en el usuario raíz o permisos de buckets de S3).
- Con Business Support+, Enterprise Support o Unified Operations, accedes a **todos los checks** y a la API de Trusted Advisor.

**AWS Health** informa sobre eventos que afectan a tus recursos y a los servicios de AWS, como incidentes o mantenimientos programados:

- **AWS Health Dashboard:** gratuito y sin configuración para **todos** los clientes; muestra la salud de los servicios y los eventos que afectan **a tu cuenta**.
- **AWS Health API:** permite integrar esos eventos con sistemas propios o de terceros; requiere Business Support+, Enterprise Support o Unified Operations.
- Todos los clientes pueden recibir eventos de AWS Health mediante **Amazon EventBridge** sin costo adicional.

## AWS Trust & Safety: reportar abuso

Si sospechas que **recursos de AWS se usan para actividades abusivas** (spam, contenido objetable, escaneo de puertos, ataques DDoS, intentos de intrusión), repórtalo al equipo de **AWS Trust & Safety** mediante el formulario de reporte de abuso. El **AWS Trust & Safety Center**, en AWS re:Post, explica cómo reportar y cómo responder a los avisos que envía este equipo. **No necesitas tener una cuenta de AWS** para reportar. AWS Support no gestiona estos reportes.

## Trampas típicas del examen

- **Elegir Basic Support para un caso técnico urgente.** Basic no incluye soporte técnico; el mínimo para producción es **Business Support+**.
- **Buscar un TAM designado en Business Support+.** El TAM designado aparece desde **Enterprise Support**.
- **Elegir Enterprise Support cuando piden respuesta en 5 minutos y monitoreo 24/7 de misión crítica.** Eso describe **Unified Operations**.
- **Pensar que el AWS Health Dashboard es de pago.** Es gratuito; la **AWS Health API** sí requiere un plan pagado.
- **Reportar abuso a AWS Support.** Se reporta a **AWS Trust & Safety**.
- **Responder con Developer Support o Enterprise On-Ramp.** Están en proceso de retiro y no forman parte de la guía vigente.

## Resumen para el examen

- Planes vigentes: Basic, AWS Business Support+, AWS Enterprise Support y AWS Unified Operations.
- Basic: gratis; servicio al cliente, documentación, re:Post, Health Dashboard y checks básicos de Trusted Advisor.
- Business Support+: mínimo para producción; asistencia con IA; respuesta en menos de 30 minutos en caídas críticas.
- Enterprise Support: TAM designado; respuesta en menos de 15 minutos; Security Incident Response.
- Unified Operations: misión crítica; respuesta en menos de 5 minutos; monitoreo 24/7.
- AWS Support Center: crear y administrar casos; el soporte de facturación es gratuito.
- Trusted Advisor: seis categorías; todos los checks desde Business Support+.
- AWS Health Dashboard gratis; AWS Health API desde Business Support+.
- Abuso de recursos de AWS: equipo de AWS Trust & Safety.
