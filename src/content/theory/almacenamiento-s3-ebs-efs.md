---
title: "Almacenamiento: S3, EBS y EFS"
summary: "Compara el almacenamiento de objetos (S3), de bloques (EBS) y de archivos (EFS) para elegir el correcto en cada escenario del examen."
domain: "technology-services"
order: 2
services: ["Amazon S3", "Amazon EBS", "Amazon EFS", "Amazon EC2"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html"
  - "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html"
  - "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"
---

## ¿Por qué importa?

Una startup de streaming en Buenos Aires tiene tres necesidades. Primero, guardar miles de videos y miniaturas que los usuarios descargarán desde la web. Segundo, darle a su base de datos un "disco duro" rápido conectado al servidor. Tercero, que varios servidores lean y escriban en la misma carpeta compartida de configuraciones.

Son tres problemas distintos de almacenamiento, y AWS tiene un servicio para cada uno: **Amazon S3**, **Amazon EBS** y **Amazon EFS**. El examen te pedirá elegir el correcto según el escenario.

## Amazon S3: almacenamiento de objetos

**Amazon Simple Storage Service (Amazon S3)** es un servicio de **almacenamiento de objetos**. Un **objeto** es un archivo junto con los metadatos que lo describen, y un **bucket** es el contenedor de esos objetos. Cada objeto se identifica dentro del bucket por su **key** (clave o nombre).

Características clave:

- Se accede por internet mediante una API y URLs; no se "monta" como disco de un servidor.
- Está diseñado para una durabilidad del **99.999999999 %** (once nueves) y una disponibilidad del **99.99 %** de los objetos en un año (S3 Standard).
- S3 Standard y otras clases guardan los objetos de forma redundante en **un mínimo de tres Availability Zones** de una Región.
- Por defecto, los buckets y sus objetos son **privados**.
- Ofrece **clases de almacenamiento** para distintos patrones de acceso: S3 Standard (acceso frecuente), S3 Standard-IA y S3 One Zone-IA (acceso poco frecuente), S3 Intelligent-Tiering (patrones cambiantes o desconocidos) y las clases S3 Glacier para archivo a bajo costo.
- Se paga solo por lo que se usa, sin reservar capacidad.

Casos típicos: sitios web estáticos, respaldos, archivos multimedia, data lakes.

## Amazon EBS: almacenamiento en bloques

**Amazon Elastic Block Store (Amazon EBS)** ofrece **volúmenes de almacenamiento en bloques** que se adjuntan a instancias de **Amazon EC2** (servidores virtuales). Una vez adjunto, se usa como un **disco duro físico**. El almacenamiento en **bloques** divide los datos en bloques de tamaño fijo, lo que permite modificaciones rápidas, ideal para sistemas operativos y bases de datos.

Características clave:

- El volumen y la instancia deben estar en la **misma Availability Zone**.
- Los volúmenes **persisten independientemente** de la vida de la instancia EC2.
- Una instancia puede tener varios volúmenes EBS. Por lo general, un volumen se adjunta a una sola instancia; solo algunos tipos de volumen e instancia admiten **Multi-Attach** para conectarse a varias a la vez.
- Hay tipos SSD y HDD para equilibrar rendimiento y precio.

Casos típicos: disco del sistema operativo de una instancia, almacenamiento de una base de datos.

## Amazon EFS: almacenamiento de archivos compartido

**Amazon Elastic File System (Amazon EFS)** proporciona **almacenamiento de archivos** sin servidor (*serverless*) y totalmente elástico: **crece y se reduce automáticamente** al agregar o eliminar archivos, sin aprovisionar capacidad.

Características clave:

- Usa el protocolo **NFS** (*Network File System*), con carpetas y archivos como un disco de red.
- Permite **acceso paralelo masivo** desde muchas instancias y servicios de cómputo a la vez (EC2, ECS, EKS, Lambda, Fargate).
- Los sistemas de archivos **Regional** guardan los datos de forma redundante en **varias AZ**; también existe la opción **One Zone**.
- No es compatible con instancias EC2 basadas en Windows.

Casos típicos: carpetas compartidas, gestores de contenido, directorios de usuarios.

## Comparación rápida

| | Amazon S3 | Amazon EBS | Amazon EFS |
| --- | --- | --- | --- |
| Tipo | Objetos | Bloques | Archivos (NFS) |
| ¿Cómo se accede? | API / URL por internet | Disco adjunto a una instancia EC2 | Sistema de archivos montado por muchas instancias |
| Alcance | Regional (varias AZ en la mayoría de clases) | Una sola AZ | Regional (varias AZ) u One Zone |
| Compartido entre instancias | Sí, vía API | Normalmente no (Multi-Attach limitado) | Sí, de forma nativa |
| Capacidad | Pago por uso, sin aprovisionar | Tamaño del volumen definido por ti | Elástica, crece y se reduce sola |
| Ejemplo | Videos y respaldos | Disco de una base de datos | Carpeta compartida de configuraciones |

## Trampas típicas del examen

- **Elegir EBS para compartir archivos entre muchas instancias.** La respuesta es **EFS**.
- **Olvidar que EBS vive en una sola AZ.** No puedes adjuntar un volumen a una instancia en otra AZ.
- **Pensar que S3 se monta como disco del sistema operativo.** S3 es almacenamiento de objetos accesible por API.
- **Confundir durabilidad con disponibilidad.** Durabilidad = no perder los datos (once nueves en S3); disponibilidad = poder acceder a ellos cuando los necesitas.
- **Elegir EFS para servidores Windows.** EFS no es compatible con instancias EC2 Windows.

## Resumen para el examen

- S3 = objetos en buckets; once nueves de durabilidad; ideal para archivos, web estática y respaldos.
- S3 es privado por defecto y tiene clases de almacenamiento según el patrón de acceso.
- EBS = bloques; disco de una instancia EC2 en la misma AZ.
- Los volúmenes EBS persisten aunque la instancia se detenga o termine.
- EFS = archivos compartidos por NFS; elástico y accesible por muchas instancias.
- EFS Regional guarda datos en varias AZ.
- Palabra clave "compartido" → EFS; "disco de la instancia" → EBS; "objetos o internet" → S3.
