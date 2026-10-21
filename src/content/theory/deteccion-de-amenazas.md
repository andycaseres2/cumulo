---
title: "Detección de amenazas y vulnerabilidades"
summary: "Diferencia GuardDuty, Inspector, Security Hub, Detective y los checks de seguridad de Trusted Advisor para detectar, priorizar e investigar problemas de seguridad."
domain: "security-compliance"
order: 9
examTasks: ["2.2", "2.4"]
services: ["Amazon GuardDuty", "Amazon Inspector", "AWS Security Hub", "Amazon Detective", "AWS Trusted Advisor", "Amazon Macie", "AWS Config"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"
  - "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"
  - "https://docs.aws.amazon.com/securityhub/latest/userguide/what-are-securityhub-services.html"
  - "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"
  - "https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html"
---

## ¿Por qué importa?

Una empresa de logística en Guadalajara recibe una alerta un sábado: una de sus instancias EC2 se comunica con una dirección IP asociada a **minería de criptomonedas**. El equipo necesita responder cuatro preguntas: ¿qué está pasando?, ¿qué software vulnerable permitió el ataque?, ¿cuál es la visión general de nuestra seguridad? y ¿qué más tocó el atacante?

AWS tiene un servicio especializado para cada pregunta. El examen evalúa que sepas **cuál elegir**.

## Amazon GuardDuty: detección de amenazas

**Amazon GuardDuty** es un servicio de **detección de amenazas** que **monitorea de forma continua** la actividad de tu cuenta. Usa **inteligencia de amenazas** (listas de IP y dominios maliciosos) y **machine learning** para encontrar comportamiento sospechoso.

- Al activarlo, analiza automáticamente sus **fuentes de datos base**: eventos de administración de **AWS CloudTrail**, **VPC Flow Logs** y **logs de DNS**. No hay que instalar agentes para esto.
- Ofrece **planes de protección** opcionales, por ejemplo para Amazon S3, Amazon EKS, Amazon RDS, AWS Lambda, malware en EC2 y S3, y monitoreo en tiempo de ejecución.
- Detecta, por ejemplo, **credenciales comprometidas**, minería de criptomonedas no autorizada, malware y posible exfiltración de datos.
- Genera **hallazgos** (*findings*) que puedes enviar a Amazon EventBridge para automatizar respuestas.

Pregunta clave: **"¿alguien está atacando o usando mal mi cuenta ahora?"**

## Amazon Inspector: gestión de vulnerabilidades

**Amazon Inspector** **descubre automáticamente** tus cargas de trabajo y las **escanea de forma continua** en busca de **vulnerabilidades de software** (CVE, vulnerabilidades públicas conocidas) y **exposición de red no intencionada**.

- Escanea **instancias de Amazon EC2**, **imágenes de contenedores en Amazon ECR** y **funciones de AWS Lambda**.
- Vuelve a escanear cuando cambia algo, por ejemplo al instalar un paquete o al publicarse una nueva CVE.
- Asigna un **puntaje de riesgo** ajustado a tu entorno y cierra el hallazgo cuando detecta que lo corregiste.

Pregunta clave: **"¿qué software tengo sin parchar o expuesto?"**

## AWS Security Hub: visión centralizada

Hoy AWS ofrece dos servicios complementarios con este nombre:

- **AWS Security Hub CSPM** (*Cloud Security Posture Management*, antes llamado simplemente Security Hub): ejecuta **verificaciones automáticas** contra buenas prácticas y estándares (como AWS Foundational Security Best Practices, CIS, PCI DSS y NIST), calcula **puntajes de seguridad** y **agrega hallazgos** de GuardDuty, Inspector, Macie y productos de socios en un solo lugar. Usa AWS Config para la mayoría de sus controles.
- **AWS Security Hub**: experiencia unificada que **correlaciona** los hallazgos de Security Hub CSPM, Inspector, GuardDuty y Macie para identificar las **exposiciones** más críticas y ayudar a priorizar y responder.

Pregunta clave: **"¿cuál es mi postura de seguridad general y qué atiendo primero?"**

## Amazon Detective: investigación

**Amazon Detective** ayuda a **analizar e investigar la causa raíz** de hallazgos o actividad sospechosa. Recoge automáticamente datos de CloudTrail, VPC Flow Logs y hallazgos de GuardDuty, y usa machine learning, análisis estadístico y teoría de grafos para construir un **grafo de comportamiento** (*behavior graph*) con visualizaciones. Permite revisar hasta un año de datos históricos de eventos.

Pregunta clave: **"¿qué pasó exactamente y qué recursos se vieron afectados?"**

## AWS Trusted Advisor: checks de seguridad

**AWS Trusted Advisor** inspecciona tu entorno y recomienda mejoras en costo, rendimiento, tolerancia a fallos, límites de servicio y **seguridad**. Ejemplos de checks de seguridad:

- **MFA on root account** (MFA en la cuenta raíz) y **Root User Access Key**.
- **Security Groups – Specific Ports Unrestricted** (puertos abiertos a todo internet).
- **Amazon S3 Bucket Permissions** (buckets con acceso abierto).
- **Exposed Access Keys**, **IAM Password Policy** e **IAM Access Key Rotation**.

Con el plan **Basic Support** tienes acceso a **checks seleccionados** de seguridad y tolerancia a fallos, y a todos los de límites de servicio. El conjunto completo de checks requiere **AWS Business Support+**, **AWS Enterprise Support** o **AWS Unified Operations**.

## ¿Qué servicio uso?

| Si la pregunta dice… | Servicio |
| --- | --- |
| "Detectar actividad maliciosa, credenciales comprometidas o minería de criptomonedas" | **Amazon GuardDuty** |
| "Escanear vulnerabilidades (CVE) en EC2, imágenes de contenedores o Lambda" | **Amazon Inspector** |
| "Vista central de hallazgos y verificación contra estándares" | **AWS Security Hub CSPM** / **AWS Security Hub** |
| "Investigar la causa raíz de un hallazgo" | **Amazon Detective** |
| "Recomendaciones de buenas prácticas, como MFA en raíz o puertos abiertos" | **AWS Trusted Advisor** |
| "Encontrar datos sensibles (PII) en S3" | **Amazon Macie** |
| "Saber si un recurso cumple una regla de configuración" | **AWS Config** |

## Trampas típicas del examen

- **Confundir GuardDuty con Inspector.** GuardDuty = **amenazas activas** (comportamiento); Inspector = **vulnerabilidades** del software.
- **Confundir GuardDuty con Detective.** GuardDuty **detecta**; Detective **investiga** lo detectado.
- **Pensar que Security Hub reemplaza a GuardDuty o Inspector.** Los **agrega y correlaciona**; no los sustituye.
- **Elegir Inspector para datos sensibles.** Eso es **Macie**.
- **Creer que Trusted Advisor completo es gratuito.** Con Basic Support solo hay checks seleccionados.

## Resumen para el examen

- GuardDuty: detección continua de amenazas con CloudTrail, VPC Flow Logs y DNS; ML e inteligencia de amenazas.
- Inspector: escaneo automático y continuo de vulnerabilidades en EC2, ECR y Lambda.
- Security Hub CSPM: postura de seguridad, estándares y hallazgos agregados; Security Hub: correlación y priorización.
- Detective: investigación de causa raíz con grafos de comportamiento.
- Trusted Advisor: checks de seguridad como MFA en raíz, puertos abiertos y permisos de S3.
- Detectar = GuardDuty; vulnerabilidades = Inspector; centralizar = Security Hub; investigar = Detective.
