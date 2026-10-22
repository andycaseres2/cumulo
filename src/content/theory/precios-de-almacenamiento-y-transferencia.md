---
title: "Precios de almacenamiento y transferencia de datos"
summary: "Entiende cómo cobra AWS: pago por uso, transferencia de datos de entrada y salida, dimensiones de precio de S3 y EBS, y cómo funciona hoy la capa gratuita."
domain: "billing-pricing-support"
order: 2
examTasks: ["4.1"]
services: ["Amazon S3", "Amazon EBS", "Amazon EC2", "Amazon CloudFront"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html"
  - "https://aws.amazon.com/pricing/"
  - "https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/key-principles.html"
  - "https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/"
  - "https://aws.amazon.com/ec2/pricing/on-demand/"
  - "https://aws.amazon.com/s3/pricing/"
  - "https://aws.amazon.com/ebs/pricing/"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html"
  - "https://aws.amazon.com/free/"
  - "https://aws.amazon.com/free/free-tier-faqs/"
quiz:
  - prompt: "Una plataforma de cursos de Lima revisa su factura de AWS. ¿Cuál de estos movimientos de datos en general no genera cargo por transferencia?"
    options:
      - label: "Los estudiantes descargan los videos desde internet"
        explanation: "La salida de datos de AWS hacia internet se cobra por GB, con tarifas según la Región de origen."
      - label: "El equipo sube los videos desde internet a Amazon S3"
        explanation: "La entrada de datos desde internet hacia AWS en general no se cobra; en S3, la entrada desde internet es gratis."
        correct: true
      - label: "Los videos se replican a un bucket en otra Región"
        explanation: "La transferencia entre Regiones distintas típicamente se cobra, por ejemplo al replicar un bucket a otra Región."
      - label: "Una instancia envía datos a otra en una Availability Zone distinta de la misma Región"
        explanation: "La transferencia entre Availability Zones de la misma Región típicamente se cobra; lo gratis en general es el tráfico dentro de la misma AZ."
  - prompt: "Una agencia de diseño de Cali tiene reportes en Amazon S3 que muchos usuarios leen todos los días. Quiere evitar cargos por recuperación de datos. ¿Qué clase de almacenamiento debe usar?"
    options:
      - label: "S3 Glacier Deep Archive"
        explanation: "Deep Archive tiene el costo de almacenamiento más bajo, pero cobra restauraciones y exige una duración mínima de 180 días; no sirve para datos que se leen a diario."
      - label: "S3 Standard-IA"
        explanation: "Standard-IA cuesta menos por almacenamiento, pero cobra por recuperación, así que leer los reportes a diario generaría esos cargos."
      - label: "S3 Glacier Instant Retrieval"
        explanation: "Glacier Instant Retrieval tiene cargo por recuperación y duración mínima de 90 días; no evita los cargos de acceso diario."
      - label: "S3 Standard"
        explanation: "S3 Standard cuesta más por almacenamiento que estas otras clases, pero no cobra por recuperación, lo que encaja con datos que se leen todos los días."
        correct: true
  - prompt: "Un equipo de Quito crea un volumen de Amazon EBS de 500 GB para una instancia EC2, pero solo escribe 50 GB de datos. ¿Cómo se cobra el almacenamiento del volumen?"
    options:
      - label: "Por los 50 GB escritos, en GB-mes"
        explanation: "EBS no cobra solo lo que realmente escribes; cobra el tamaño que reservas."
      - label: "Por los 500 GB aprovisionados, en GB-mes, hasta liberar el volumen"
        explanation: "EBS cobra el almacenamiento aprovisionado en GB-mes: pagas el tamaño que reservas, no lo que escribes, hasta que liberas el volumen."
        correct: true
      - label: "Solo por las solicitudes de lectura y escritura"
        explanation: "El cobro por tipo de solicitud (PUT, GET, LIST) es una dimensión de precio de Amazon S3; en EBS se paga el almacenamiento aprovisionado."
      - label: "Solo por los snapshots que se creen del volumen"
        explanation: "Los snapshots se cobran aparte por el espacio que ocupan; el volumen en sí se cobra por su tamaño aprovisionado."
practice:
  - prompt: "Una empresa de streaming de música de Buenos Aires nota que, a medida que crece su almacenamiento en Amazon S3, el precio que paga por cada GB baja. ¿Qué principio de precios de AWS explica esto?"
    options:
      - label: "Paga menos por unidad al usar más"
        explanation: "S3 tiene precios escalonados (tiered pricing): cuanto más almacenas, menos pagas por GB, que es justo lo que observa la empresa."
        correct: true
      - label: "Pago por uso (pay-as-you-go)"
        explanation: "El pago por uso significa pagar solo lo que consumes sin contratos largos; no explica por qué baja el precio por GB al crecer."
      - label: "Ahorra cuando te comprometes"
        explanation: "Este principio baja el precio a cambio de un compromiso de 1 o 3 años, como Savings Plans; la empresa no firmó ningún compromiso."
      - label: "Ofertas Always Free"
        explanation: "Always Free son asignaciones mensuales permanentes en algunos servicios; no explican una baja del precio por GB a mayor volumen."
  - prompt: "El gerente financiero de una cadena de farmacias de Asunción quiere saber en qué conceptos se concentra el costo en AWS. ¿Cuál de estos es uno de los tres impulsores fundamentales del costo que identifica AWS?"
    options:
      - label: "La transferencia de datos de entrada desde internet"
        explanation: "La entrada de datos desde internet en general no se cobra, así que no es un impulsor fundamental del costo."
      - label: "La transferencia de datos de salida"
        explanation: "AWS identifica tres impulsores fundamentales del costo: cómputo, almacenamiento y transferencia de datos de salida."
        correct: true
      - label: "El número de usuarios de IAM de la cuenta"
        explanation: "Los usuarios de IAM no están entre los impulsores fundamentales; los tres son cómputo, almacenamiento y transferencia de salida."
      - label: "Los impuestos incluidos en los precios publicados"
        explanation: "Los precios publicados de AWS no incluyen impuestos, y los impuestos no son uno de los tres impulsores del costo."
  - prompt: "Una startup de Bogotá crea su cuenta de AWS con el Free account plan para una prueba de concepto. ¿Cuándo termina ese plan?"
    options:
      - label: "A los 12 meses de crear la cuenta"
        explanation: "Esa duración corresponde a la descripción antigua de la capa gratuita; el plan gratuito actual dura hasta seis meses."
      - label: "Solo cuando se agotan los créditos, sin importar el tiempo"
        explanation: "El agotamiento de créditos es solo una de las dos condiciones; el plan también termina al cumplir seis meses."
      - label: "Cuando la startup usa por primera vez un servicio con prueba de corto plazo"
        explanation: "Las pruebas de corto plazo aplican a cuentas con el plan pagado; usarlas no es la regla que hace terminar el plan gratuito."
      - label: "A los seis meses o cuando se agotan los créditos, lo que ocurra primero"
        explanation: "El Free account plan termina a los seis meses o al agotar los créditos, lo que ocurra primero; para seguir, hay que pasar al plan pagado."
        correct: true
  - prompt: "Un laboratorio clínico de Montevideo guarda resultados en Amazon S3, pero no sabe con qué frecuencia se consultarán. Quiere que S3 mueva los objetos entre niveles de acceso automáticamente. ¿Qué clase de almacenamiento debe elegir?"
    options:
      - label: "S3 One Zone-IA"
        explanation: "One Zone-IA tiene menor costo de almacenamiento con cargo por recuperación y mínimo de 30 días; no mueve objetos entre niveles por sí sola."
      - label: "S3 Glacier Deep Archive"
        explanation: "Deep Archive es para archivo con el costo de almacenamiento más bajo y mínimo de 180 días; no reubica objetos según su uso."
      - label: "S3 Intelligent-Tiering"
        explanation: "Intelligent-Tiering mueve objetos entre niveles de acceso automáticamente, a cambio de un cargo de monitoreo por objeto."
        correct: true
      - label: "Snapshots de Amazon EBS"
        explanation: "Los snapshots son copias incrementales de volúmenes EBS que se cobran por espacio; no son una clase de S3 ni mueven objetos entre niveles."
  - prompt: "Un diario digital de Santiago guarda sus imágenes en Amazon S3. ¿Cuál de estos movimientos de datos de S3 genera un cargo por transferencia?"
    options:
      - label: "Enviar las imágenes desde S3 hacia Amazon CloudFront"
        explanation: "En Amazon S3, la transferencia hacia Amazon CloudFront es gratis."
      - label: "Copiar imágenes entre dos buckets de la misma Región"
        explanation: "En S3, la transferencia entre buckets de la misma Región es gratis."
      - label: "Leer las imágenes desde una instancia EC2 de la misma Región"
        explanation: "En S3, la transferencia hacia otros servicios de AWS en la misma Región es gratis."
      - label: "Servir las imágenes desde S3 directamente a los lectores por internet"
        explanation: "La salida de datos de S3 hacia internet es una dimensión de precio de S3 y se cobra por GB."
        correct: true
  - prompt: "Una aseguradora de Guadalajara guarda un archivo en S3 Standard-IA y lo borra a los 10 días. ¿Cómo se cobra el almacenamiento de ese objeto?"
    options:
      - label: "Solo por los 10 días que estuvo almacenado"
        explanation: "Standard-IA tiene una duración mínima de 30 días; borrar antes no limita el cobro a los días reales."
      - label: "Se cobra el resto hasta la duración mínima de 30 días, de forma prorrateada"
        explanation: "Si borras o mueves un objeto antes de su duración mínima, se cobra el resto prorrateado; en Standard-IA el mínimo es de 30 días."
        correct: true
      - label: "Se cobra hasta completar 180 días"
        explanation: "La duración mínima de 180 días corresponde a S3 Glacier Deep Archive, no a Standard-IA."
      - label: "Solo se cobra un cargo de monitoreo por objeto"
        explanation: "El cargo de monitoreo por objeto es propio de S3 Intelligent-Tiering, no de Standard-IA."
---

## ¿Por qué importa?

Una plataforma de cursos en línea de Lima guarda sus videos en AWS. El primer mes, la factura de almacenamiento es baja, pero aparece un cargo inesperado por **transferencia de datos**: miles de estudiantes descargaron los videos desde internet. Además, el equipo de TI replicó todo a otra Región "por si acaso" y movió respaldos antiguos a una clase de archivo que cobra por recuperar datos.

Para evitar sorpresas, hay que entender **qué cobra AWS y cómo**. El examen evalúa estos conceptos de forma cualitativa: no te pedirá precios exactos, sino reconocer qué genera costo y qué es gratis.

## Fundamentos del modelo de precios de AWS

AWS resume su enfoque de precios en tres ideas:

- **Pago por uso (*pay-as-you-go*):** para la gran mayoría de servicios pagas solo lo que consumes, sin contratos a largo plazo.
- **Ahorra cuando te comprometes:** modelos como **Savings Plans** o Reserved Instances bajan el precio a cambio de un compromiso de 1 o 3 años.
- **Paga menos por unidad al usar más:** algunos servicios tienen **precios escalonados** (*tiered pricing*); por ejemplo, en Amazon S3 y en la transferencia de datos de salida de EC2, cuanto más usas, menos pagas por GB.

AWS identifica tres **impulsores fundamentales del costo**: **cómputo**, **almacenamiento** y **transferencia de datos de salida**. En cómputo pagas por hora o segundo mientras el recurso funciona; en almacenamiento y transferencia, normalmente por GB. Los precios publicados **no incluyen impuestos**.

## Transferencia de datos: entrada, salida y entre ubicaciones

La **transferencia de datos** es el movimiento de bytes hacia, desde o dentro de AWS. La regla general:

| Tipo de tráfico | ¿Se cobra? |
| --- | --- |
| **Entrada** desde internet hacia AWS | En general **no** |
| **Salida** de AWS hacia internet | **Sí**, por GB y con tarifas según la Región de origen |
| Entre **Regiones** distintas | **Sí**, típicamente |
| Entre **Availability Zones** de la misma Región | **Sí**, típicamente |
| Dentro de la **misma Availability Zone** | Gratis en general |
| Entre servicios de AWS en la **misma Región** (por ejemplo, de S3 a otro servicio) | En la mayoría de los casos, **no** |

Algunos puntos clave:

- La salida a internet se **agrega entre servicios** y aparece en la factura como *AWS Data Transfer Out*. AWS incluye una cantidad mensual de salida a internet sin costo; consulta la página oficial para el monto vigente.
- En Amazon S3, la entrada desde internet es gratis, igual que la transferencia entre buckets o hacia otros servicios en la misma Región y hacia **Amazon CloudFront**.
- Hay excepciones por servicio, así que AWS recomienda **verificar las tarifas** de cada servicio antes de diseñar.

En el caso de la plataforma de Lima, el cargo vino de la **salida a internet** y de la **réplica entre Regiones**; la carga original de los videos no costó transferencia.

## Precios de almacenamiento: S3 y EBS

Cada servicio de almacenamiento tiene sus propias **dimensiones de precio**, es decir, los conceptos por los que cobra.

**Amazon S3** (almacenamiento de objetos) cobra por:

- **Almacenamiento:** según el tamaño de los objetos, el tiempo almacenados y la **clase de almacenamiento**.
- **Solicitudes y recuperaciones:** según el tipo de solicitud (PUT, GET, LIST, etc.) y las **recuperaciones** de clases de acceso poco frecuente o de archivo.
- **Transferencia de datos** de salida a internet y entre Regiones.
- **Gestión, análisis y replicación**, entre otras funciones opcionales.

| Clase de S3 | Costo de almacenamiento | Costo de acceso |
| --- | --- | --- |
| **S3 Standard** | Más alto | Sin cargo por recuperación |
| **S3 Standard-IA / One Zone-IA** | Menor | Cargo por recuperación; duración mínima de 30 días |
| **S3 Glacier Instant Retrieval** | Aún menor | Cargo por recuperación; mínimo 90 días |
| **S3 Glacier Flexible Retrieval / Deep Archive** | El más bajo | Cargos de restauración según la opción elegida; mínimo de 90 y 180 días |
| **S3 Intelligent-Tiering** | Variable, con cargo de monitoreo por objeto | Mueve objetos entre niveles de acceso automáticamente |

Si borras o mueves un objeto antes de su duración mínima, se cobra el resto de forma prorrateada.

**Amazon EBS** (volúmenes de bloques para EC2) cobra por:

- **Almacenamiento aprovisionado** en GB-mes: pagas el **tamaño que reservas**, no lo que realmente escribes, hasta que liberas el volumen.
- **IOPS y rendimiento aprovisionados** en ciertos tipos de volumen.
- **Snapshots**, que se cobran por el espacio que ocupan los datos (son incrementales).

## La capa gratuita de AWS hoy

La **AWS Free Tier** cambió: el material de estudio antiguo describe un modelo anterior. Hoy, al crear una cuenta eliges entre:

- **Free account plan (plan gratuito):** para experimentar y hacer pruebas de concepto **sin costo** durante **hasta seis meses**. Recibes **USD 100 en créditos** de AWS y puedes ganar hasta USD 100 más completando actividades, y acceso a servicios seleccionados. Termina a los seis meses o cuando se agotan los créditos, lo que ocurra primero; para seguir, debes pasar al plan pagado.
- **Paid account plan (plan pagado):** para cargas de producción; los créditos aplican primero y luego pagas con precios estándar de pago por uso.

En el plan gratuito solo están activas las ofertas **Always Free** (asignaciones mensuales permanentes en algunos servicios); las **pruebas de corto plazo** de servicios seleccionados aplican a cuentas con el plan pagado. Los montos de créditos y límites cambian, así que consúltalos en la página oficial de AWS Free Tier.

## Trampas típicas del examen

- **Creer que subir datos a AWS cuesta.** La **entrada** de datos desde internet en general es gratis; lo que se cobra es la **salida**.
- **Olvidar el tráfico entre AZ o entre Regiones.** Ambos suelen generar cargos; dentro de la misma AZ en general no.
- **Elegir S3 Glacier para datos que se leen a diario.** Es barato almacenar, pero cobra por recuperar y tiene duración mínima.
- **Pensar que EBS cobra solo lo usado.** EBS cobra el tamaño **aprovisionado**.
- **Usar la descripción antigua de la capa gratuita.** El modelo actual usa un **plan gratuito de hasta seis meses con créditos**, más ofertas Always Free.

## Resumen para el examen

- Principios: pago por uso, ahorro por compromiso y menor precio por unidad a mayor uso.
- Impulsores de costo: cómputo, almacenamiento y transferencia de datos de salida.
- Entrada de datos: generalmente gratis; salida a internet: se cobra por GB.
- Entre Regiones y entre AZ: normalmente se cobra; dentro de la misma AZ: gratis en general.
- S3 cobra por almacenamiento, solicitudes y recuperaciones, transferencia y funciones de gestión.
- Clases frías de S3 = menor costo de almacenamiento, pero cargos de recuperación y duraciones mínimas.
- EBS cobra el almacenamiento aprovisionado, IOPS y rendimiento aprovisionados y snapshots.
- Free Tier actual: plan gratuito (hasta seis meses o hasta agotar créditos) o plan pagado con créditos, más ofertas Always Free.
