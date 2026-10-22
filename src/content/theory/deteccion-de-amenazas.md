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
quiz:
  - prompt: "Una empresa de logística de Guadalajara quiere que AWS le avise de forma continua si alguna instancia EC2 se comunica con IP asociadas a minería de criptomonedas o si hay credenciales comprometidas, sin instalar agentes. ¿Qué servicio debe activar?"
    options:
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector escanea vulnerabilidades de software y exposición de red; no detecta comportamiento malicioso como la comunicación con IP de minería."
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty monitorea de forma continua CloudTrail, VPC Flow Logs y logs de DNS con inteligencia de amenazas y machine learning, y detecta minería de criptomonedas y credenciales comprometidas."
        correct: true
      - label: "Amazon Macie"
        explanation: "Amazon Macie descubre datos sensibles en Amazon S3; no vigila la actividad de red de las instancias EC2."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor recomienda buenas prácticas, como MFA en raíz o puertos abiertos; no detecta amenazas activas en la cuenta."
  - prompt: "Una fintech de Santiago necesita escanear de forma continua sus instancias EC2 y sus imágenes de contenedores en Amazon ECR en busca de vulnerabilidades conocidas (CVE). ¿Qué servicio debe usar?"
    options:
      - label: "Amazon Detective"
        explanation: "Amazon Detective investiga la causa raíz de hallazgos con un grafo de comportamiento; no escanea software en busca de CVE."
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty detecta amenazas activas por comportamiento; el escaneo de vulnerabilidades de software corresponde a Inspector."
      - label: "Amazon Macie"
        explanation: "Amazon Macie busca datos sensibles en Amazon S3; no revisa imágenes de contenedores ni instancias en busca de CVE."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector descubre automáticamente instancias EC2, imágenes en ECR y funciones Lambda, y las escanea de forma continua en busca de CVE."
        correct: true
  - prompt: "Tras recibir un hallazgo de GuardDuty, el equipo de seguridad de una aerolínea de Lima quiere analizar la causa raíz y ver qué recursos se vieron afectados, con visualizaciones de un grafo de comportamiento. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon Detective"
        explanation: "Amazon Detective usa datos de CloudTrail, VPC Flow Logs y hallazgos de GuardDuty para construir un grafo de comportamiento e investigar la causa raíz."
        correct: true
      - label: "AWS Security Hub CSPM"
        explanation: "AWS Security Hub CSPM agrega hallazgos y verifica estándares con puntajes de seguridad; no construye un grafo de comportamiento para investigar la causa raíz."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector busca vulnerabilidades de software; no investiga lo que hizo un atacante a partir de un hallazgo de GuardDuty."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor ejecuta checks de buenas prácticas; no analiza la actividad relacionada con un hallazgo de seguridad."
practice:
  - prompt: "Una red de clínicas de Quito guarda miles de documentos de pacientes en buckets de Amazon S3 y necesita descubrir cuáles contienen datos personales sensibles (PII). ¿Qué servicio debe usar?"
    options:
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector busca vulnerabilidades de software en EC2, ECR y Lambda; no revisa el contenido de los objetos de S3 en busca de datos personales."
      - label: "AWS Config"
        explanation: "AWS Config indica si un recurso cumple una regla de configuración; no analiza el contenido de los documentos para encontrar PII."
      - label: "Amazon Macie"
        explanation: "Amazon Macie descubre datos sensibles, como PII, en Amazon S3, que es justo lo que necesitan las clínicas."
        correct: true
      - label: "Amazon Detective"
        explanation: "Amazon Detective investiga la causa raíz de hallazgos con un grafo de comportamiento; no clasifica el contenido de los buckets."
  - prompt: "Un banco de Bogotá quiere un solo lugar donde ver los hallazgos de GuardDuty, Inspector y Macie, verificar sus cuentas contra estándares como CIS y PCI DSS y obtener un puntaje de seguridad. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Security Hub CSPM"
        explanation: "AWS Security Hub CSPM ejecuta verificaciones contra estándares como CIS y PCI DSS, calcula puntajes de seguridad y agrega hallazgos de GuardDuty, Inspector y Macie."
        correct: true
      - label: "Amazon Detective"
        explanation: "Amazon Detective investiga lo ocurrido tras un hallazgo; no verifica las cuentas contra estándares ni calcula un puntaje de seguridad."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector produce sus propios hallazgos de vulnerabilidades; no agrega los de GuardDuty y Macie ni evalúa estándares como PCI DSS."
      - label: "Amazon Macie"
        explanation: "Amazon Macie encuentra datos sensibles en S3; es una de las fuentes de hallazgos, no la vista central que pide el banco."
  - prompt: "Una agencia de viajes de Cusco quiere recomendaciones de buenas prácticas que le avisen si su cuenta raíz no tiene MFA y si algún security group deja puertos abiertos a todo internet. ¿Qué servicio debe consultar?"
    options:
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty detecta amenazas activas por comportamiento, como credenciales comprometidas; no es una lista de checks de buenas prácticas de configuración."
      - label: "Amazon Detective"
        explanation: "Amazon Detective investiga la causa raíz de hallazgos existentes; no recomienda activar MFA ni cerrar puertos."
      - label: "Amazon Macie"
        explanation: "Amazon Macie busca datos sensibles en Amazon S3; no revisa la configuración de la cuenta raíz ni de los security groups."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor incluye checks de seguridad como MFA on root account y Security Groups – Specific Ports Unrestricted."
        correct: true
  - prompt: "Una startup de Asunción tiene el plan Basic Support y quiere saber qué checks de AWS Trusted Advisor puede usar. ¿Qué afirmación es correcta?"
    options:
      - label: "Tiene acceso al conjunto completo de checks de Trusted Advisor"
        explanation: "El conjunto completo de checks requiere AWS Business Support+, AWS Enterprise Support o AWS Unified Operations, no Basic Support."
      - label: "Tiene checks seleccionados de seguridad y tolerancia a fallos, y todos los de límites de servicio"
        explanation: "Con Basic Support se accede a checks seleccionados de seguridad y tolerancia a fallos, y a todos los checks de límites de servicio."
        correct: true
      - label: "Trusted Advisor solo está disponible con AWS Enterprise Support"
        explanation: "Basic Support ya incluye checks seleccionados; Enterprise Support es uno de los planes que dan el conjunto completo, no el único con acceso."
      - label: "Solo tiene checks de optimización de costos"
        explanation: "Con Basic Support los checks disponibles son de seguridad, tolerancia a fallos y límites de servicio, no solo de costos."
  - prompt: "El gerente de TI de una minera de Antofagasta propone desactivar GuardDuty e Inspector porque la empresa acaba de activar AWS Security Hub. ¿Qué afirmación describe correctamente la relación entre estos servicios?"
    options:
      - label: "Security Hub reemplaza a GuardDuty e Inspector, así que pueden desactivarse"
        explanation: "Security Hub no detecta amenazas ni escanea CVE por sí mismo; depende de los hallazgos que generan GuardDuty e Inspector."
      - label: "Security Hub escanea CVE por su cuenta, así que solo Inspector sobra"
        explanation: "El escaneo continuo de CVE en EC2, ECR y Lambda lo hace Amazon Inspector, no Security Hub."
      - label: "Security Hub agrega y correlaciona los hallazgos de GuardDuty e Inspector, sin sustituirlos"
        explanation: "Security Hub centraliza, correlaciona y ayuda a priorizar los hallazgos de otros servicios; si se desactivan GuardDuty e Inspector, se pierden esas detecciones."
        correct: true
      - label: "GuardDuty e Inspector envían sus hallazgos solo a Amazon Detective"
        explanation: "Security Hub CSPM agrega hallazgos de GuardDuty, Inspector y Macie, así que no dependen únicamente de Detective para centralizarse."
  - prompt: "Una cooperativa de ahorro de Montevideo quiere que cada hallazgo de Amazon GuardDuty dispare automáticamente una respuesta, como aislar la instancia afectada. ¿A qué servicio debe enviar los hallazgos?"
    options:
      - label: "Amazon Detective"
        explanation: "Amazon Detective sirve para investigar la causa raíz de un hallazgo; no está pensado para disparar respuestas automáticas."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector escanea vulnerabilidades de software; no recibe hallazgos de GuardDuty para automatizar respuestas."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor recomienda buenas prácticas; no reacciona a hallazgos de GuardDuty con acciones automáticas."
      - label: "Amazon EventBridge"
        explanation: "GuardDuty puede enviar sus hallazgos a Amazon EventBridge, que permite automatizar la respuesta a cada uno."
        correct: true
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
