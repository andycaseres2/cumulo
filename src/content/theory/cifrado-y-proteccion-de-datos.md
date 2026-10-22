---
title: "Cifrado y protección de datos"
summary: "Cifrado en tránsito y en reposo, AWS KMS frente a AWS CloudHSM, certificados TLS con AWS Certificate Manager y descubrimiento de datos sensibles con Amazon Macie."
domain: "security-compliance"
order: 7
examTasks: ["2.2"]
services: ["AWS KMS", "AWS CloudHSM", "AWS Certificate Manager", "Amazon Macie", "Amazon S3", "Amazon RDS"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"
  - "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html"
  - "https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html"
  - "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"
  - "https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html"
  - "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html"
quiz:
  - prompt: "Una clínica de Quito debe cumplir un requisito regulatorio: sus claves de cifrado tienen que estar en un HSM dedicado de un solo inquilino, y la clínica debe controlar por completo las claves y los usuarios del HSM. ¿Qué servicio debe elegir?"
    options:
      - label: "AWS KMS"
        explanation: "AWS KMS es un servicio administrado multiinquilino donde el control de las claves es compartido; no ofrece un HSM dedicado a un solo cliente."
      - label: "AWS Certificate Manager"
        explanation: "AWS Certificate Manager crea y renueva certificados SSL/TLS; no proporciona un HSM dedicado para guardar claves."
      - label: "AWS CloudHSM"
        explanation: "AWS CloudHSM da HSM dedicados de un solo inquilino en los que el cliente controla por completo las claves y los usuarios del HSM, justo lo que exige el requisito."
        correct: true
      - label: "Amazon Macie"
        explanation: "Amazon Macie descubre datos sensibles en Amazon S3; no guarda ni administra claves de cifrado."
  - prompt: "Una cadena de tiendas de Lima guarda miles de archivos en Amazon S3 y necesita descubrir en cuáles hay información de identificación personal (PII) de sus clientes. ¿Qué servicio de AWS debe usar?"
    options:
      - label: "Amazon Macie"
        explanation: "Amazon Macie descubre datos sensibles en Amazon S3, como PII, usando machine learning y coincidencia de patrones."
        correct: true
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty detecta amenazas y actividad maliciosa en la cuenta; no clasifica el contenido de los objetos de S3 en busca de PII."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector busca vulnerabilidades de software en cargas de trabajo; no identifica datos personales guardados en S3."
      - label: "AWS KMS"
        explanation: "AWS KMS crea y controla claves para cifrar datos; cifrar los archivos no te dice en cuáles hay PII."
  - prompt: "Una startup de Santiago publica su portal detrás de Elastic Load Balancing y quiere servirlo por HTTPS con un certificado que se renueve automáticamente, sin pagar extra por el certificado. ¿Qué debe hacer?"
    options:
      - label: "Importar en ACM un certificado comprado a otra autoridad"
        explanation: "ACM no renueva automáticamente los certificados importados; el equipo tendría que renovarlo e importarlo de nuevo por su cuenta."
      - label: "Guardar la clave del sitio en AWS CloudHSM"
        explanation: "AWS CloudHSM da un HSM dedicado para controlar claves, pero no emite ni renueva certificados SSL/TLS para el sitio."
      - label: "Dejar el cifrado SSE-S3 por defecto en los buckets"
        explanation: "SSE-S3 cifra los objetos en reposo dentro de S3; no protege el tráfico en tránsito del portal ni habilita HTTPS."
      - label: "Solicitar un certificado público en ACM con validación por DNS"
        explanation: "ACM no cobra por los certificados públicos que usas con servicios integrados, como Elastic Load Balancing, y renueva automáticamente los que emitió con validación por DNS, como los asociados a Elastic Load Balancing."
        correct: true
---

## ¿Por qué importa?

Una clínica en Quito guarda historias clínicas y radiografías en Amazon S3, y su portal web permite a los pacientes descargar resultados. La regulación le exige que los datos estén **cifrados**, que nadie pueda interceptarlos en el camino y saber exactamente **dónde hay datos personales**. Además, el auditor pregunta: "¿quién controla las claves?".

Uno de los beneficios de la seguridad en la nube es que AWS ofrece **cifrado integrado y servicios administrados de claves**, de modo que proteger los datos no exige comprar ni operar hardware criptográfico propio.

## Cifrado en tránsito vs. en reposo

El **cifrado** transforma los datos con una **clave** para que solo quien tenga la clave correcta pueda leerlos.

| | En tránsito (*in transit*) | En reposo (*at rest*) |
| --- | --- | --- |
| Qué protege | Datos que viajan por la red | Datos guardados en discos, bases de datos o buckets |
| Amenaza típica | Alguien intercepta la comunicación | Alguien accede al almacenamiento o a una copia |
| Cómo se logra | **TLS** (*Transport Layer Security*), es decir, HTTPS | Cifrado del lado del servidor o del cliente con claves (por ejemplo, de AWS KMS) |
| Ejemplos en AWS | Conexiones HTTPS a sitios y a las API de AWS; conexiones SSL/TLS a Amazon RDS | Amazon S3 cifra automáticamente cada objeto nuevo; volúmenes y bases de datos cifrados |

Datos clave verificados:

- Desde el **5 de enero de 2023**, **Amazon S3 cifra automáticamente todos los objetos nuevos** con SSE-S3 (claves administradas por S3), sin costo adicional. Puedes elegir en su lugar claves de AWS KMS.
- **Amazon RDS** permite cifrar instancias y snapshots en reposo (con AES-256) y usar conexiones SSL/TLS.
- Las API de AWS se consumen con TLS; por ejemplo, Amazon VPC exige TLS 1.2 y recomienda TLS 1.3.

## AWS KMS: claves administradas

**AWS Key Management Service (AWS KMS)** es un servicio administrado para **crear y controlar las claves** con las que cifras y firmas datos.

- Las claves de KMS están protegidas por **módulos de seguridad de hardware** (**HSM**, *hardware security modules*) validados **FIPS 140-3 nivel 3**, y **nunca salen de KMS sin cifrar**.
- Se integra con muchos servicios (S3, EBS, RDS, entre otros), y las **políticas de claves** definen quién puede usarlas. Su uso puede auditarse en **AWS CloudTrail**.
- Tipos de claves:
  - **Administradas por el cliente** (*customer managed*): tú las creas y controlas su política, rotación y eliminación. Tienen cargo mensual y por uso.
  - **Administradas por AWS** (*AWS managed*): un servicio las crea en tu cuenta; puedes verlas, pero no administrarlas. Rotan cada año.
  - **Propiedad de AWS** (*AWS owned*): el servicio las usa por ti para cifrar por defecto; no las ves y no tienen costo para ti.

## AWS CloudHSM: tu propio HSM dedicado

**AWS CloudHSM** te da **HSM dedicados de un solo inquilino** (*single-tenant*) en la nube. AWS automatiza la gestión del hardware (aprovisionamiento, copias de seguridad, mantenimiento), pero **tú controlas por completo las claves y los usuarios** del HSM, fuera de IAM.

| | AWS KMS | AWS CloudHSM |
| --- | --- | --- |
| Modelo | Servicio administrado, multiinquilino | HSM dedicado a un solo cliente |
| Control de claves | Compartido: AWS opera el servicio y tú defines políticas | **Total del cliente**, incluida la gestión de usuarios del HSM |
| Integración | Nativa con muchos servicios de AWS | Mediante interfaces estándar (PKCS #11, JCE, CNG/KSP) |
| Esfuerzo operativo | Bajo | Mayor: más responsabilidad para el cliente |
| Cuándo elegirlo | Casi siempre | Requisito de HSM dedicado o control exclusivo de las claves |

## AWS Certificate Manager: certificados TLS

Un **certificado SSL/TLS** demuestra la identidad de un sitio y permite el HTTPS. **AWS Certificate Manager (ACM)** crea, guarda y **renueva** certificados públicos y privados.

- **No hay cargo adicional por los certificados públicos que usas con servicios integrados de ACM** (por ejemplo, Elastic Load Balancing o Amazon CloudFront); pagas los recursos que usas. Los certificados públicos exportables y los privados de AWS Private CA sí tienen costo.
- **Renovación administrada**: ACM renueva automáticamente los certificados que emitió (con validación por DNS), por ejemplo los asociados a Elastic Load Balancing o Amazon CloudFront. Los **certificados importados no se renuevan** automáticamente.
- Los certificados son regionales; para usarlos con CloudFront deben estar en la Región US East (N. Virginia).

## Amazon Macie: dónde están los datos sensibles

**Amazon Macie** es un servicio de seguridad de datos que **descubre datos sensibles en Amazon S3** usando **machine learning y coincidencia de patrones**: información de identificación personal (**PII**), datos financieros o credenciales. También mantiene un **inventario de tus buckets** y genera hallazgos si, por ejemplo, un bucket se vuelve **público**. Sus hallazgos pueden enviarse a Amazon EventBridge y a AWS Security Hub CSPM.

## Trampas típicas del examen

- **Confundir KMS con CloudHSM.** "Hardware dedicado" o "control exclusivo del HSM" → **CloudHSM**; "claves administradas e integradas con servicios" → **KMS**.
- **Usar Macie para detectar amenazas o vulnerabilidades.** Macie busca **datos sensibles en S3**; amenazas = GuardDuty; vulnerabilidades = Inspector.
- **Pensar que ACM renueva cualquier certificado.** Los **importados** no se renuevan solos.
- **Confundir TLS (en tránsito) con cifrado de disco (en reposo).**
- **Creer que en S3 hay que activar el cifrado para los objetos nuevos.** Ya se cifran por defecto.

## Resumen para el examen

- En tránsito = TLS/HTTPS; en reposo = cifrado de almacenamiento con claves.
- S3 cifra automáticamente los objetos nuevos (SSE-S3) desde 2023.
- KMS = claves administradas en HSM FIPS 140-3 nivel 3, integradas con los servicios y auditables en CloudTrail.
- Claves de KMS: administradas por el cliente, administradas por AWS y propiedad de AWS.
- CloudHSM = HSM dedicado de un solo inquilino; el cliente controla las claves.
- ACM = certificados SSL/TLS sin cargo adicional y con renovación automática de los emitidos por ACM.
- Macie = descubrir datos sensibles (PII) en S3.
