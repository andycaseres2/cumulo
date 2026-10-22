---
title: "Almacenamiento: S3, EBS y EFS"
summary: "Compara el almacenamiento de objetos (S3), de bloques (EBS e instance store) y de archivos (EFS) para elegir el correcto en cada escenario del examen."
domain: "technology-services"
order: 12
examTasks: ["3.6"]
services: ["Amazon S3", "Amazon EBS", "Amazon EFS", "Amazon EC2"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html"
  - "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html"
  - "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html"
quiz:
  - prompt: "Una startup de streaming de Buenos Aires necesita que varias instancias EC2 Linux monten por NFS la misma carpeta compartida de configuraciones y lean y escriban en ella a la vez, sin aprovisionar capacidad. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon EBS"
        explanation: "Un volumen EBS por lo general se adjunta a una sola instancia y solo algunos tipos admiten Multi-Attach; no es la opción para una carpeta compartida por NFS."
      - label: "Instance store"
        explanation: "El instance store es almacenamiento temporal en el disco físico del host de una instancia; no se comparte entre instancias."
      - label: "Amazon EFS"
        explanation: "Amazon EFS ofrece archivos por NFS con acceso paralelo desde muchas instancias y crece y se reduce automáticamente, justo lo que pide la carpeta compartida."
        correct: true
      - label: "Amazon S3"
        explanation: "Amazon S3 es almacenamiento de objetos al que se accede por API y URLs; no se monta como sistema de archivos NFS en las instancias."
  - prompt: "Una empresa de logística de Quito guarda datos de trabajo en el instance store de una instancia EC2. ¿Qué pasa con esos datos si detiene la instancia?"
    options:
      - label: "Se pierden, porque el instance store es almacenamiento temporal"
        explanation: "Los datos del instance store sobreviven a un reinicio, pero se pierden si la instancia se detiene, hiberna o termina."
        correct: true
      - label: "Se conservan, igual que en un volumen EBS"
        explanation: "La persistencia independiente de la instancia es una característica de EBS; el instance store solo dura mientras vive la instancia."
      - label: "Se copian automáticamente a Amazon S3"
        explanation: "AWS no copia automáticamente el instance store a S3; por eso los datos valiosos deben guardarse en EBS, S3 o EFS."
      - label: "Se mueven a otra instancia en la misma Availability Zone"
        explanation: "El instance store es un disco físico del host y no se puede mover a otra instancia; separar y adjuntar es algo propio de EBS."
  - prompt: "Amazon S3 está diseñado para una durabilidad del 99.999999999 % (once nueves). ¿Qué describe esa cifra?"
    options:
      - label: "El tiempo que tarda S3 en entregar un objeto"
        explanation: "La durabilidad no mide la velocidad de respuesta; las clases de S3 se diferencian por tiempos de recuperación, que es otro concepto."
      - label: "La protección contra la pérdida de los objetos guardados"
        explanation: "Durabilidad significa no perder los datos; S3 la logra guardando copias redundantes de los objetos en varios dispositivos y, en la mayoría de sus clases, en varias Availability Zones."
        correct: true
      - label: "La posibilidad de acceder a los objetos cuando los necesitas"
        explanation: "Poder acceder a los datos cuando los necesitas es la disponibilidad, que en S3 Standard es del 99.99 %, no la durabilidad."
      - label: "El porcentaje de objetos que son públicos por defecto"
        explanation: "Por defecto, los buckets y sus objetos de S3 son privados; la cifra de once nueves no tiene relación con el acceso público."
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

Casos típicos de **almacenamiento de objetos**:

- **Sitios web estáticos** (HTML, CSS, imágenes) servidos directamente desde un bucket.
- **Respaldos y archivo** de largo plazo, combinando clases de almacenamiento más baratas.
- **Archivos multimedia** (videos, fotos, documentos) que se descargan por internet.
- **Data lakes**: un repositorio central de datos crudos que luego se analizan con servicios como Amazon Athena.
- **Datos de aplicaciones**, como logs o archivos subidos por usuarios.

## Amazon EBS: almacenamiento en bloques

**Amazon Elastic Block Store (Amazon EBS)** ofrece **volúmenes de almacenamiento en bloques** que se adjuntan a instancias de **Amazon EC2** (servidores virtuales). Una vez adjunto, se usa como un **disco duro físico**. El almacenamiento en **bloques** divide los datos en bloques de tamaño fijo, lo que permite modificaciones rápidas, ideal para sistemas operativos y bases de datos.

Características clave:

- El volumen y la instancia deben estar en la **misma Availability Zone**.
- Los volúmenes **persisten independientemente** de la vida de la instancia EC2.
- Una instancia puede tener varios volúmenes EBS. Por lo general, un volumen se adjunta a una sola instancia; solo algunos tipos de volumen e instancia admiten **Multi-Attach** para conectarse a varias a la vez.
- Hay tipos SSD y HDD para equilibrar rendimiento y precio.

Casos típicos: disco del sistema operativo de una instancia, almacenamiento de una base de datos.

## Instance store: bloques temporales

El **instance store** (almacén de instancia) también es almacenamiento en **bloques**, pero **temporal** (efímero). Lo proporcionan discos **conectados físicamente al servidor host** donde corre la instancia EC2.

Características clave:

- Los datos **sobreviven a un reinicio** (*reboot*) de la instancia.
- Los datos **se pierden** si la instancia se **detiene**, **hiberna** o **termina**, o si falla el disco subyacente.
- No todos los tipos de instancia lo incluyen; el tamaño depende del tipo y tamaño de instancia.

Casos típicos: búferes, cachés, datos temporales de trabajo (*scratch data*) y datos que ya están replicados en una flota de servidores. Para datos valiosos de largo plazo, usa EBS, S3 o EFS.

| | Amazon EBS | Instance store |
| --- | --- | --- |
| Persistencia | Persiste independientemente de la vida de la instancia | Solo dura mientras vive la instancia; se pierde al detenerla o terminarla |
| Ubicación | Volumen de red en la misma AZ | Disco físico del host |
| Se puede mover a otra instancia | Sí, se separa y se adjunta | No |
| Costo | Se paga aparte según lo aprovisionado | Incluido en el precio de la instancia |
| Uso ideal | Sistema operativo, bases de datos | Cachés, búferes, datos temporales |

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
| Tipo | Objetos | Bloques (persistentes) | Archivos (NFS) |
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
- **Elegir EFS para servidores Windows.** EFS no es compatible con instancias EC2 Windows (para eso existe Amazon FSx for Windows File Server).
- **Guardar datos importantes en instance store.** Se pierden al detener o terminar la instancia; usa EBS para datos persistentes.

## Resumen para el examen

- S3 = objetos en buckets; once nueves de durabilidad; ideal para archivos, web estática y respaldos.
- S3 es privado por defecto y tiene clases de almacenamiento según el patrón de acceso.
- EBS = bloques persistentes; disco de una instancia EC2 en la misma AZ.
- Instance store = bloques temporales en el host; ideal para cachés; los datos se pierden al detener o terminar la instancia.
- Los volúmenes EBS persisten aunque la instancia se detenga o termine.
- EFS = archivos compartidos por NFS; elástico y accesible por muchas instancias.
- EFS Regional guarda datos en varias AZ.
- Palabra clave "compartido" → EFS; "disco de la instancia" → EBS; "temporal o caché en el host" → instance store; "objetos o internet" → S3.
