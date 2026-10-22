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
practice:
  - prompt: "Una agencia de turismo de Cusco quiere publicar un sitio web estático con HTML, CSS e imágenes, junto con videos que los visitantes descarguen por internet, pagando solo por lo que usa. ¿Qué servicio de almacenamiento debe elegir?"
    options:
      - label: "Amazon EBS"
        explanation: "Amazon EBS ofrece volúmenes de bloques que se adjuntan a una instancia EC2 como disco; no sirve archivos directamente por internet mediante URLs."
      - label: "Amazon EFS"
        explanation: "Amazon EFS es un sistema de archivos NFS que montan instancias y servicios de cómputo; no está pensado para servir un sitio estático directamente por internet."
      - label: "Instance store"
        explanation: "El instance store es almacenamiento temporal en el disco físico del host; sus datos se pierden al detener o terminar la instancia."
      - label: "Amazon S3"
        explanation: "Amazon S3 guarda objetos accesibles por API y URLs, puede servir sitios web estáticos directamente desde un bucket y cobra solo por lo que usas."
        correct: true
  - prompt: "Un equipo de Cali creó un volumen de Amazon EBS en una Availability Zone y quiere adjuntarlo a una instancia EC2 que está en otra AZ de la misma Región. ¿Qué debe tener en cuenta?"
    options:
      - label: "EBS replica automáticamente el volumen en todas las AZ de la Región"
        explanation: "Un volumen EBS tiene alcance de una sola AZ; no se replica a las demás AZ para adjuntarse desde cualquiera de ellas."
      - label: "El volumen y la instancia deben estar en la misma Availability Zone"
        explanation: "Un volumen EBS solo se puede adjuntar a una instancia de su misma AZ, así que no puede conectarse a la instancia de la otra AZ."
        correct: true
      - label: "Debe convertir el volumen EBS en instance store"
        explanation: "El instance store es un disco físico del host incluido con la instancia; no es una forma de mover un volumen EBS a otra AZ."
      - label: "Puede adjuntarlo sin cambios porque EBS es un servicio regional como S3"
        explanation: "S3 y EFS Regional trabajan a nivel de Región, pero EBS vive en una sola AZ; por eso el volumen no se adjunta a una instancia de otra AZ."
  - prompt: "Una empresa de analítica de Rosario necesita en una instancia EC2 un espacio para búferes y datos de trabajo temporales que ya están replicados en otra parte, y prefiere que ese almacenamiento venga incluido en el precio de la instancia. ¿Qué opción encaja mejor?"
    options:
      - label: "Instance store"
        explanation: "El instance store está incluido en el precio de la instancia y es ideal para búferes, cachés y datos temporales de trabajo que no importa perder."
        correct: true
      - label: "Amazon EBS"
        explanation: "Amazon EBS se paga aparte según lo aprovisionado y puede persistir independientemente de la instancia; el escenario pide almacenamiento temporal incluido en la instancia."
      - label: "Amazon EFS"
        explanation: "Amazon EFS es un sistema de archivos compartido y elástico para carpetas compartidas; no es almacenamiento temporal incluido en el precio de la instancia."
      - label: "Amazon S3 Glacier"
        explanation: "Las clases S3 Glacier sirven para archivo de largo plazo a bajo costo; no funcionan como espacio temporal de trabajo de una instancia."
  - prompt: "Una firma contable de San José tiene instancias EC2 Windows que necesitan una carpeta compartida de archivos, y un colega propone Amazon EFS. ¿Qué debes responderle?"
    options:
      - label: "EFS funciona igual en Windows y en Linux porque usa NFS"
        explanation: "Aunque EFS usa NFS, no es compatible con instancias EC2 basadas en Windows, así que no sirve para estas instancias."
      - label: "Conviene adjuntar un solo volumen EBS a todas las instancias Windows"
        explanation: "Por lo general un volumen EBS se adjunta a una sola instancia y solo algunos tipos admiten Multi-Attach; no es la solución para una carpeta compartida."
      - label: "EFS no es compatible con instancias EC2 Windows; para eso existe Amazon FSx for Windows File Server"
        explanation: "EFS no es compatible con instancias EC2 Windows, y para archivos compartidos en Windows existe Amazon FSx for Windows File Server."
        correct: true
      - label: "Conviene compartir el instance store entre las instancias"
        explanation: "El instance store es un disco físico del host de una instancia y no se comparte entre instancias."
  - prompt: "Una plataforma educativa de La Paz guarda en Amazon S3 materiales cuyo patrón de acceso es desconocido y cambia con el tiempo. ¿Qué clase de almacenamiento está pensada para ese patrón?"
    options:
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA está pensada para datos de acceso poco frecuente; no es la clase para patrones de acceso cambiantes o desconocidos."
      - label: "S3 Intelligent-Tiering"
        explanation: "S3 Intelligent-Tiering es la clase pensada para patrones de acceso cambiantes o desconocidos, como el de estos materiales."
        correct: true
      - label: "S3 Standard"
        explanation: "S3 Standard está pensada para datos de acceso frecuente; el escenario describe un patrón desconocido y cambiante."
      - label: "S3 Glacier"
        explanation: "Las clases S3 Glacier están pensadas para archivo a bajo costo, no para materiales con un patrón de acceso cambiante o desconocido."
  - prompt: "Un desarrollador de Tegucigalpa sube fotos a un bucket nuevo de Amazon S3 sin cambiar ninguna configuración de acceso. ¿Qué ocurre con el acceso a esas fotos?"
    options:
      - label: "Cualquier persona con la URL puede verlas, porque S3 publica los objetos por defecto"
        explanation: "S3 no publica los objetos por defecto; los buckets y sus objetos empiezan siendo privados."
      - label: "Solo las instancias EC2 de la misma AZ pueden verlas, porque S3 vive en una AZ"
        explanation: "S3 Standard guarda los objetos en un mínimo de tres Availability Zones de una Región; su acceso no se define por la AZ de una instancia."
      - label: "Cualquier instancia puede verlas montando el bucket por NFS"
        explanation: "S3 es almacenamiento de objetos al que se accede por API y URLs; no se monta por NFS como un sistema de archivos."
      - label: "Son privadas, porque los buckets y sus objetos de S3 son privados por defecto"
        explanation: "Por defecto, los buckets y los objetos de S3 son privados, así que las fotos no quedan públicas al subirlas."
        correct: true
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
- Los volúmenes **persisten independientemente** de la vida de la instancia EC2. Excepción: el volumen raíz se borra por defecto al terminar la instancia (atributo DeleteOnTermination), y puedes cambiarlo.
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
- Los volúmenes EBS persisten aunque la instancia se detenga; al terminarla, los volúmenes adicionales siguen y el raíz se borra por defecto.
- EFS = archivos compartidos por NFS; elástico y accesible por muchas instancias.
- EFS Regional guarda datos en varias AZ.
- Palabra clave "compartido" → EFS; "disco de la instancia" → EBS; "temporal o caché en el host" → instance store; "objetos o internet" → S3.
