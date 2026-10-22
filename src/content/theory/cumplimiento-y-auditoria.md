---
title: "Cumplimiento, auditoría y registros de seguridad"
summary: "Dónde encontrar informes de cumplimiento con AWS Artifact y cómo monitorear, auditar y reportar con CloudWatch, CloudTrail, Config y los informes de acceso de IAM."
domain: "security-compliance"
order: 5
examTasks: ["2.2"]
services: ["AWS Artifact", "AWS CloudTrail", "AWS Config", "Amazon CloudWatch", "AWS IAM", "Amazon S3"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html"
  - "https://aws.amazon.com/compliance/services-in-scope/"
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
  - "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
  - "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
  - "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_last-accessed.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
quiz:
  - prompt: "El área de cumplimiento de un banco digital de Ciudad de México pide descargar los informes SOC y el informe de cumplimiento PCI de AWS para su auditoría. ¿Dónde los obtiene?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail registra las llamadas a la API de tu cuenta; no contiene los informes de cumplimiento de AWS."
      - label: "AWS Config"
        explanation: "AWS Config registra la configuración de tus recursos y evalúa reglas; no publica informes SOC ni PCI de AWS."
      - label: "AWS Artifact"
        explanation: "AWS Artifact es el portal de autoservicio para descargar bajo demanda y sin costo informes como SOC, PCI e ISO."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitorea métricas, logs y alarmas de tus recursos; no ofrece documentos de cumplimiento de AWS."
  - prompt: "Un auditor pregunta a una aseguradora de Bogotá qué usuario eliminó una tabla de Amazon DynamoDB el martes y desde dónde lo hizo. ¿Qué servicio responde a esa pregunta?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail registra como eventos las llamadas a la API de usuarios, roles y servicios, y responde quién hizo qué, cuándo y desde dónde."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch reúne métricas, logs y alarmas para saber cómo está funcionando algo; la auditoría de quién hizo cada llamada a la API es de CloudTrail."
      - label: "AWS Config"
        explanation: "AWS Config muestra cómo estaba configurado un recurso y cómo cambió; quién hizo el cambio lo responde CloudTrail."
      - label: "AWS Artifact"
        explanation: "AWS Artifact entrega informes y acuerdos de cumplimiento de AWS; no registra la actividad de tu cuenta."
  - prompt: "Un auditor pide a una cooperativa de Asunción un archivo CSV con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA. ¿Qué debe generar?"
    options:
      - label: "La información de último acceso de IAM"
        explanation: "La información de último acceso muestra qué servicios y acciones usó cada identidad para recortar permisos; no es el CSV con el estado de credenciales."
      - label: "Un informe de AWS Artifact"
        explanation: "AWS Artifact entrega informes de cumplimiento de AWS, como SOC o ISO; no lista a los usuarios de tu cuenta."
      - label: "Una regla de AWS Config"
        explanation: "Una regla de AWS Config evalúa si los recursos cumplen una configuración; no produce el CSV con contraseñas, access keys y MFA de cada usuario."
      - label: "El credential report de IAM"
        explanation: "El credential report es un archivo CSV con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA, listo para entregar a un auditor."
        correct: true
practice:
  - prompt: "Una empresa de salud de Montevideo quiere evaluar de forma continua si todos sus volúmenes están cifrados y que se marquen automáticamente los recursos no conformes. ¿Qué servicio debe usar?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail registra quién hizo cada llamada a la API y cuándo; no evalúa si la configuración de los recursos cumple una regla."
      - label: "AWS Config"
        explanation: "Con las reglas de AWS Config se evalúa de forma continua si cada recurso cumple lo definido, como volúmenes cifrados, y se marcan los no conformes."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitorea métricas, logs y alarmas para saber cómo está funcionando algo; no evalúa la conformidad de la configuración."
      - label: "AWS Artifact"
        explanation: "AWS Artifact entrega informes y acuerdos de cumplimiento de AWS; no revisa la configuración de tus recursos."
  - prompt: "Un e-commerce de Lima ya usa varias reglas de AWS Config y ahora quiere desplegar juntas, como un solo paquete, todas las reglas que exige su marco de cumplimiento. ¿Qué debe usar?"
    options:
      - label: "Un trail de AWS CloudTrail"
        explanation: "Un trail de CloudTrail guarda el registro de las llamadas a la API; no agrupa ni despliega reglas de configuración."
      - label: "El credential report de IAM"
        explanation: "El credential report de IAM lista los usuarios y el estado de sus credenciales; no evalúa la configuración de los recursos."
      - label: "AWS Artifact"
        explanation: "AWS Artifact entrega los informes y acuerdos de cumplimiento de AWS; no despliega reglas sobre tus recursos."
      - label: "Un conformance pack de AWS Config"
        explanation: "Los conformance packs agrupan reglas de AWS Config para desplegarlas juntas y evaluar de forma continua si los recursos cumplen; también se puede configurar remediación."
        correct: true
  - prompt: "Una fintech de Bogotá quiere aplicar el mínimo privilegio: necesita saber qué servicios y acciones usó realmente cada identidad para retirar los permisos sobrantes. ¿Qué herramienta de IAM debe consultar?"
    options:
      - label: "La información de último acceso de IAM"
        explanation: "La información de último acceso muestra qué servicios (y, en algunos, qué acciones) usó realmente cada identidad, para retirar permisos sobrantes y aplicar el mínimo privilegio."
        correct: true
      - label: "El credential report de IAM"
        explanation: "El credential report es un CSV con el estado de contraseñas, access keys y MFA de los usuarios; no detalla qué servicios y acciones usó cada identidad."
      - label: "Un informe SOC de AWS Artifact"
        explanation: "Los informes SOC de AWS Artifact son evidencia de auditoría de la parte de AWS; no analizan los permisos de tus identidades."
      - label: "Un conformance pack de AWS Config"
        explanation: "Un conformance pack agrupa reglas de Config para evaluar la configuración de los recursos; no muestra qué acciones usó cada identidad."
  - prompt: "Una pasarela de pagos de Santiago va a migrar a AWS y su gerente afirma: \"Como AWS tiene certificación PCI DSS, nuestra aplicación ya cumple PCI DSS\". ¿Qué es lo correcto?"
    options:
      - label: "Es cierto, porque la certificación de AWS cubre automáticamente las aplicaciones de sus clientes"
        explanation: "Que AWS esté certificado no certifica automáticamente tu aplicación; esta es una trampa típica del examen."
      - label: "Es cierto, siempre que descargue el informe PCI desde AWS Artifact"
        explanation: "El informe PCI de AWS Artifact es evidencia de auditoría de la parte de AWS; descargarlo no demuestra el cumplimiento de la aplicación del cliente."
      - label: "Es falso: la empresa sigue siendo responsable de demostrar el cumplimiento de su propia aplicación y cargas de trabajo"
        explanation: "Según el modelo de responsabilidad compartida, el cliente sigue siendo responsable de demostrar el cumplimiento de su empresa y sus cargas de trabajo."
        correct: true
      - label: "Es cierto, siempre que active AWS CloudTrail en todas las Regiones"
        explanation: "CloudTrail registra la actividad de la API, pero activarlo no convierte a la aplicación en conforme con PCI DSS."
  - prompt: "Una empresa de software médico de Medellín que atiende hospitales de EE. UU. diseñará una solución sujeta a HIPAA y quiere confirmar antes que cada servicio de AWS elegido esté cubierto por ese programa. ¿Qué debe consultar?"
    options:
      - label: "El historial de eventos de AWS CloudTrail"
        explanation: "El historial de eventos de CloudTrail muestra la actividad reciente de la API en la cuenta; no indica qué servicios cubre un programa de cumplimiento."
      - label: "La página AWS Services in Scope by Compliance Program"
        explanation: "La página Services in Scope muestra, para cada programa de cumplimiento, qué servicios están cubiertos por los informes vigentes."
        correct: true
      - label: "Un dashboard de Amazon CloudWatch"
        explanation: "Los dashboards de CloudWatch muestran métricas y logs de tus recursos; no informan el alcance de los programas de cumplimiento."
      - label: "El credential report de IAM"
        explanation: "El credential report lista el estado de las credenciales de los usuarios; no dice qué servicios están en el alcance de HIPAA."
  - prompt: "Una distribuidora de energía de Quito debe conservar durante varios años el registro de quién hizo cada llamada a la API en su cuenta, más allá de lo que muestra el historial de eventos de CloudTrail. ¿Qué debe configurar?"
    options:
      - label: "Nada, porque el historial de eventos conserva los eventos indefinidamente"
        explanation: "El historial de eventos de CloudTrail muestra solo los últimos 90 días de eventos de administración por Región."
      - label: "VPC Flow Logs hacia Amazon S3"
        explanation: "VPC Flow Logs registra el tráfico IP de las interfaces de red de la VPC; no registra quién hizo cada llamada a la API."
      - label: "Una regla de AWS Config"
        explanation: "Una regla de AWS Config evalúa si los recursos cumplen una configuración; no conserva el registro de llamadas a la API."
      - label: "Un trail de CloudTrail que entregue los eventos a un bucket de Amazon S3"
        explanation: "Para guardar los eventos más allá del historial de 90 días se crea un trail que los entrega a un bucket de Amazon S3."
        correct: true
---

## ¿Por qué importa?

Un banco digital en Ciudad de México quiere migrar a AWS. Antes, su área de cumplimiento pregunta tres cosas: "¿AWS tiene certificaciones como ISO 27001 o PCI DSS?", "¿qué servicios podemos usar para procesar tarjetas?" y "si un auditor pregunta quién borró una tabla de Amazon DynamoDB el martes, ¿cómo lo demostramos?". Responder bien exige saber **dónde está la documentación de cumplimiento** y **qué servicio registra cada tipo de evidencia**.

## Dónde encontrar información de cumplimiento

### AWS Artifact

**AWS Artifact** es el portal de autoservicio para **descargar bajo demanda** documentos de seguridad y cumplimiento de AWS, **sin costo**:

- **Informes** (*reports*): por ejemplo, informes **SOC** (*System and Organization Controls*), informes de cumplimiento **PCI** (pagos con tarjeta) y certificaciones **ISO**. También incluye documentos de algunos vendedores independientes de AWS Marketplace.
- **Acuerdos** (*agreements*): revisar, aceptar y hacer seguimiento de acuerdos con AWS, para una cuenta o para toda la organización.

Estos documentos sirven como **evidencia de auditoría** de la parte de AWS. Ojo: según el modelo de responsabilidad compartida, **el cliente sigue siendo responsable de demostrar el cumplimiento de su propia empresa y de sus cargas de trabajo**. Que AWS esté certificado no certifica automáticamente tu aplicación.

### Los requisitos varían según geografía, industria y servicio

- **Geografía**: hay programas nacionales o regionales. La página oficial *AWS Services in Scope by Compliance Program* incluye, entre muchos otros, C5 (Alemania), ENS High (España), IRAP (Australia) e ISMAP (Japón).
- **Industria**: el sector salud en EE. UU. se rige por **HIPAA**; quien procesa tarjetas, por **PCI DSS**; los proveedores del gobierno de EE. UU., por **FedRAMP**.
- **Servicio**: **no todos los servicios están en el alcance de todos los programas**. La página *Services in Scope* muestra, para cada programa, qué servicios están cubiertos por los informes vigentes. Por eso, antes de diseñar una solución regulada, se verifica que cada servicio elegido esté en el alcance.

## Registros de seguridad: qué se captura y dónde

Un **registro** (*log*) es un historial con fecha y hora de lo que ocurrió. Los principales para el examen:

| Registro | Qué responde | Dónde se consulta o almacena |
| --- | --- | --- |
| **AWS CloudTrail** | ¿Quién hizo qué llamada a la API, cuándo y desde dónde? | Historial de eventos en la consola; *trails* hacia un bucket de **Amazon S3** y, opcionalmente, CloudWatch Logs; CloudTrail Lake |
| **Amazon CloudWatch Logs** | ¿Qué escribieron mis aplicaciones, sistemas y servicios? | Grupos de logs en CloudWatch |
| **AWS Config** | ¿Cómo estaba configurado este recurso y cómo cambió? | Historial de configuración y snapshots en un bucket de S3 |
| **VPC Flow Logs** | ¿Qué tráfico IP entra y sale de las interfaces de red de mi VPC? | CloudWatch Logs, Amazon S3 o Amazon Data Firehose |

## Servicios de gobernanza: monitorear, auditar y reportar

### Monitorear: Amazon CloudWatch

**Amazon CloudWatch** monitorea recursos y aplicaciones en tiempo real. Recoge **métricas** (por ejemplo, uso de CPU), centraliza **logs**, ofrece **dashboards** y permite crear **alarmas** que avisan o ejecutan acciones cuando se cruza un umbral. Pregunta clave: "¿cómo está funcionando?".

### Auditar actividad: AWS CloudTrail

**AWS CloudTrail** registra como **eventos** las acciones de usuarios, roles y servicios hechas desde la consola, la CLI, los SDK y las API.

- El **historial de eventos** (*Event history*) muestra los **últimos 90 días** de eventos de administración por Región, sin costo y sin configurar nada.
- Para guardar más tiempo, se crea un **trail** que entrega los eventos a un bucket de **Amazon S3**. Con AWS Organizations se puede crear un trail para toda la organización que las cuentas miembro no pueden desactivar ni modificar.
- **CloudTrail Lake** es un data lake administrado para almacenar y consultar eventos durante años.

Pregunta clave: "¿quién hizo qué y cuándo?".

### Auditar configuración: AWS Config

**AWS Config** mantiene un **inventario** de tus recursos, su **historial de configuración** y sus relaciones. Con las **reglas de Config** evalúa de forma continua si cada recurso cumple lo que defines (por ejemplo, "los volúmenes deben estar cifrados") y marca los **no conformes** (*noncompliant*). Los **conformance packs** agrupan reglas para desplegarlas juntas, y se puede configurar **remediación**. Pregunta clave: "¿cómo está configurado y cumple la norma?".

### Reportar: informes de acceso de IAM

- **Credential report** (informe de credenciales): un archivo **CSV** con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA (por ejemplo, cuándo se rotó o usó por última vez cada clave). Se puede generar como máximo cada cuatro horas y entregarse a un auditor.
- **Información de último acceso** (*last accessed information*): muestra qué servicios (y, en algunos, qué acciones) usó realmente cada identidad, para retirar permisos sobrantes y aplicar el mínimo privilegio.

## Trampas típicas del examen

- **Buscar informes SOC o ISO de AWS en CloudTrail o Config.** Los informes de cumplimiento se descargan en **AWS Artifact**.
- **Confundir CloudTrail con CloudWatch.** CloudTrail = **actividad de API** (auditoría); CloudWatch = **métricas, logs y alarmas** (rendimiento).
- **Confundir CloudTrail con Config.** CloudTrail dice **quién** cambió algo; Config dice **cómo quedó** la configuración y si cumple las reglas.
- **"Si AWS tiene PCI DSS, mi aplicación ya cumple PCI DSS."** Falso: tu parte del cumplimiento sigue siendo tuya.
- **Asumir que todo servicio está en el alcance de todo programa.** Hay que consultar *Services in Scope*.

## Resumen para el examen

- AWS Artifact: informes (SOC, PCI, ISO) y acuerdos con AWS, bajo demanda y sin costo.
- El cumplimiento varía por geografía, industria y servicio; consulta *Services in Scope*.
- CloudWatch = monitorear (métricas, logs, alarmas).
- CloudTrail = auditar llamadas a la API; 90 días en el historial; trails a S3 para conservar más.
- Config = inventario, historial de configuración y reglas de cumplimiento.
- Credential report = estado de contraseñas, access keys y MFA en CSV.
- Último acceso = recortar permisos no usados.
