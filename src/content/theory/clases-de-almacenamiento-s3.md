---
title: "Clases de almacenamiento de S3 y políticas de ciclo de vida"
summary: "Elige la clase de S3 según la frecuencia de acceso y la velocidad de recuperación, y automatiza el movimiento de objetos con S3 Lifecycle para bajar costos."
domain: "technology-services"
order: 13
examTasks: ["3.6", "4.1"]
services: ["Amazon S3 Glacier", "Amazon S3"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html"
  - "https://aws.amazon.com/s3/pricing/"
quiz:
  - prompt: "Una clínica de Lima debe conservar durante años las radiografías de sus pacientes. Se consultan más o menos una vez por trimestre, pero cuando un médico las abre deben cargar en milisegundos. No se pueden recrear. ¿Qué clase de S3 conviene?"
    options:
      - label: "S3 Glacier Flexible Retrieval"
        explanation: "S3 Glacier Flexible Retrieval requiere restaurar los objetos y tarda de minutos a horas; no cumple el acceso en milisegundos."
      - label: "S3 Glacier Deep Archive"
        explanation: "S3 Glacier Deep Archive es la opción más barata, pero la recuperación tarda horas; no sirve si los médicos necesitan milisegundos."
      - label: "S3 Glacier Instant Retrieval"
        explanation: "S3 Glacier Instant Retrieval es para archivo consultado cerca de una vez por trimestre, con acceso en milisegundos y en varias AZ."
        correct: true
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA guarda los datos en una sola AZ y AWS lo recomienda para datos que se pueden recrear; las radiografías no se pueden recrear."
  - prompt: "Una plataforma educativa de Quito no sabe con qué frecuencia se consultarán sus videos y quiere que S3 los mueva solo entre niveles de acceso, sin cargos por recuperación. ¿Qué clase debe usar?"
    options:
      - label: "S3 Intelligent-Tiering"
        explanation: "S3 Intelligent-Tiering es para patrones desconocidos o cambiantes: mueve cada objeto entre niveles y no cobra recuperación, solo un cargo de monitoreo por objeto."
        correct: true
      - label: "S3 Standard-IA"
        explanation: "S3 Standard-IA es para acceso poco frecuente conocido, cobra por GB recuperado y no mueve los objetos entre niveles por sí misma."
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA guarda los datos en una sola AZ, cobra por GB recuperado y no mueve los objetos automáticamente según su uso."
      - label: "S3 Glacier Deep Archive"
        explanation: "S3 Glacier Deep Archive es para datos consultados menos de una vez al año, con recuperación de horas; no se adapta a un patrón desconocido."
  - prompt: "Una fintech de Buenos Aires guarda logs en S3: los consulta a diario el primer mes, luego casi nunca, y debe borrarlos al cumplir un año. Quiere que esto ocurra de forma automática. ¿Qué debe configurar?"
    options:
      - label: "Guardar todos los logs en S3 Glacier Deep Archive desde el primer día"
        explanation: "Deep Archive tarda horas en recuperar y tiene una duración mínima de 180 días; no sirve para logs consultados a diario ni los borra solo."
      - label: "Guardar todos los logs en S3 Express One Zone"
        explanation: "S3 Express One Zone es para aplicaciones muy sensibles a la latencia en una sola AZ; no mueve los objetos a clases más baratas ni los elimina."
      - label: "Pedir restauraciones Expedited de S3 Glacier Flexible Retrieval"
        explanation: "Una restauración Expedited crea una copia temporal de un objeto archivado; no mueve los logs entre clases ni los elimina al vencer."
      - label: "Una S3 Lifecycle configuration con acciones de transición y expiración"
        explanation: "Las transition actions mueven los logs a una clase más barata tras cierto tiempo y las expiration actions los eliminan al cumplir el año."
        correct: true
---

## ¿Por qué importa?

Una clínica en Lima guarda en Amazon S3 las radiografías de sus pacientes. Durante el primer mes los médicos las consultan a diario; después, casi nunca. Por regulación, deben conservarlas varios años. Pagar el precio de acceso frecuente por archivos que nadie abre es desperdiciar dinero.

S3 ofrece **clases de almacenamiento** con distintos costos y velocidades, y **S3 Lifecycle** para mover los objetos automáticamente de una clase a otra. El examen pregunta con frecuencia cuál clase conviene según el patrón de acceso.

## Las clases de almacenamiento

Cada objeto de S3 tiene una **clase de almacenamiento**. Si no indicas ninguna, se usa **S3 Standard**. Todas las clases están diseñadas para la misma durabilidad de **once nueves (99.999999999 %)**; lo que cambia es la disponibilidad, la cantidad de Availability Zones (AZ), los mínimos y los cargos por recuperación.

| Clase | Patrón de acceso | AZ | Duración mínima | Tamaño mínimo facturable | Recuperación |
| --- | --- | --- | --- | --- | --- |
| S3 Standard | Frecuente (más de una vez al mes) | 3 o más | Ninguna | Ninguno | Milisegundos, sin cargo por recuperación |
| S3 Intelligent-Tiering | Desconocido o cambiante | 3 o más | Ninguna | Ninguno (objetos < 128 KB no se monitorean) | Milisegundos en sus niveles de acceso; sin cargo por recuperación, pero con cargo de monitoreo por objeto |
| S3 Standard-IA | Poco frecuente (≈ una vez al mes) | 3 o más | 30 días | 128 KB | Milisegundos, con cargo por GB recuperado |
| S3 One Zone-IA | Poco frecuente y **datos que puedes recrear** | 1 | 30 días | 128 KB | Milisegundos, con cargo por GB recuperado |
| S3 Express One Zone | Aplicaciones muy sensibles a la latencia | 1 (la eliges tú) | Ninguna | Ninguno | Un solo dígito de milisegundos |
| S3 Glacier Instant Retrieval | Archivo consultado ≈ una vez por trimestre | 3 o más | 90 días | 128 KB | Milisegundos, con cargo por recuperación |
| S3 Glacier Flexible Retrieval | Archivo consultado ≈ una o dos veces al año | 3 o más | 90 días | — | De minutos a horas (requiere restaurar) |
| S3 Glacier Deep Archive | Archivo consultado menos de una vez al año | 3 o más | 180 días | — | De horas (requiere restaurar) |

Puntos clave:

- **IA** significa *Infrequent Access* (acceso poco frecuente). Son más baratas para guardar, pero cobran por recuperar.
- **S3 One Zone-IA** y **S3 Express One Zone** guardan los datos en **una sola AZ**: no resisten la pérdida física de esa AZ. AWS recomienda One Zone-IA solo para datos que se pueden volver a generar o para réplicas.
- **S3 Intelligent-Tiering** mueve cada objeto automáticamente entre niveles: si no se accede durante 30 días consecutivos pasa a Infrequent Access, y a los 90 días a Archive Instant Access. Opcionalmente puedes activar niveles de archivo asíncronos (Archive Access y Deep Archive Access).
- **Duración mínima**: si borras o mueves un objeto antes de ese plazo, igual pagas el resto del período.

## Las clases S3 Glacier

**Amazon S3 Glacier** es la familia de clases de archivo de bajo costo dentro de S3. Los objetos siguen en buckets de S3 y se administran con las APIs de S3.

- **S3 Glacier Instant Retrieval**: acceso en milisegundos, como Standard-IA, pero con almacenamiento más barato y acceso más caro. Ejemplo: imágenes médicas consultadas en citas ocasionales.
- **S3 Glacier Flexible Retrieval**: los objetos están **archivados** y no se leen en tiempo real; primero se pide una **restauración** que crea una copia temporal. Opciones de recuperación: **Expedited** (normalmente 1–5 minutos), **Standard** (normalmente 3–5 horas) y **Bulk** (normalmente 5–12 horas, sin cargo). Ideal para respaldos y recuperación ante desastres.
- **S3 Glacier Deep Archive**: la opción de almacenamiento **de menor costo de AWS**. Recuperación **Standard** normalmente dentro de 12 horas y **Bulk** normalmente dentro de 48 horas. Ideal para retener datos durante años por cumplimiento normativo.

## Políticas de ciclo de vida (S3 Lifecycle)

Una **S3 Lifecycle configuration** es un conjunto de reglas que S3 aplica automáticamente a un grupo de objetos. Hay dos tipos de acciones:

- **Transition actions** (transición): mueven objetos a otra clase después de cierto tiempo. Ejemplo: pasar a S3 Standard-IA a los 30 días y a S3 Glacier Flexible Retrieval al año.
- **Expiration actions** (expiración): eliminan los objetos cuando vencen, por ejemplo al terminar un período de retención regulatorio.

Casos de uso típicos según la documentación de AWS:

- **Logs** que se necesitan una semana o un mes y luego se pueden borrar.
- **Documentos** muy consultados al principio, poco consultados después y que deben archivarse por regulación.
- **Datos de archivo**: registros financieros o de salud, respaldos de bases de datos de largo plazo, datos que se deben conservar por cumplimiento.

Las reglas se aplican a objetos existentes y nuevos. Las solicitudes de transición tienen un costo, y expirar objetos antes de la duración mínima de su clase genera el cargo correspondiente.

## Dimensiones de precio de S3

El costo de S3 no es solo "GB guardados". Las dimensiones principales son:

1. **Almacenamiento**: según el tamaño de los objetos, el tiempo que se guardan y la clase.
2. **Solicitudes y recuperaciones**: cargos por tipo de solicitud (PUT, COPY, GET, LIST, transiciones de lifecycle) y cargos por recuperación en las clases IA y Glacier.
3. **Transferencia de datos**: se cobra la salida de datos; la **entrada desde internet no tiene costo**.
4. **Gestión y analítica**, **replicación** y otras funciones opcionales.

Regla general: cuanto más barato es guardar, más caro (o más lento) es recuperar. Los precios exactos están en la página oficial de precios de S3.

## Trampas típicas del examen

- **Elegir One Zone-IA para la única copia de datos críticos.** Vive en una sola AZ; para datos que no se pueden recrear, usa Standard-IA.
- **Elegir Glacier Flexible Retrieval o Deep Archive cuando piden acceso inmediato.** Para archivo con acceso en milisegundos, la respuesta es **Glacier Instant Retrieval**.
- **Olvidar la duración mínima.** Borrar un objeto de Deep Archive a los 30 días igual cobra 180 días.
- **Pensar que Intelligent-Tiering cobra por recuperación.** No lo hace; cobra un pequeño cargo de monitoreo por objeto.
- **Mover objetos a mano.** Si el patrón de acceso es predecible, la respuesta es una **política de ciclo de vida**.

## Resumen para el examen

- S3 Standard = acceso frecuente; es la clase por defecto.
- Intelligent-Tiering = patrón desconocido o cambiante; mueve objetos solo.
- Standard-IA = poco frecuente y en varias AZ; One Zone-IA = poco frecuente, una AZ, datos recreables.
- Express One Zone = latencia de un solo dígito de milisegundos en una AZ.
- Glacier Instant Retrieval (milisegundos), Flexible Retrieval (minutos a horas) y Deep Archive (horas, el más barato).
- Lifecycle = transiciones automáticas entre clases + expiración de objetos.
- Precio de S3 = almacenamiento + solicitudes y recuperaciones + transferencia de salida.
