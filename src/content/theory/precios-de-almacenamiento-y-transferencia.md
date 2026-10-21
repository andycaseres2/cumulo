---
title: "Precios de almacenamiento y transferencia de datos"
summary: "Entiende cómo cobra AWS: pago por uso, transferencia de datos de entrada y salida, dimensiones de precio de S3 y EBS, y cómo funciona hoy la capa gratuita."
domain: "billing-pricing-support"
order: 2
examTasks: ["4.1"]
services: ["Amazon S3", "Amazon EBS", "Amazon EC2", "Amazon CloudFront"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/pricing/"
  - "https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/key-principles.html"
  - "https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/"
  - "https://aws.amazon.com/ec2/pricing/on-demand/"
  - "https://aws.amazon.com/s3/pricing/"
  - "https://aws.amazon.com/ebs/pricing/"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html"
  - "https://aws.amazon.com/free/"
  - "https://aws.amazon.com/free/free-tier-faqs/"
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

- **Free account plan (plan gratuito):** para experimentar y hacer pruebas de concepto **sin costo** durante **hasta seis meses**. Recibes **créditos** de AWS (puedes ganar más completando actividades) y acceso a servicios seleccionados. Termina a los seis meses o cuando se agotan los créditos, lo que ocurra primero; para seguir, debes pasar al plan pagado.
- **Paid account plan (plan pagado):** para cargas de producción; los créditos aplican primero y luego pagas con precios estándar de pago por uso.

Además existen ofertas **Always Free** (asignaciones mensuales permanentes en algunos servicios) y **pruebas de corto plazo** en servicios seleccionados. Los montos de créditos y límites cambian, así que consúltalos en la página oficial de AWS Free Tier.

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
