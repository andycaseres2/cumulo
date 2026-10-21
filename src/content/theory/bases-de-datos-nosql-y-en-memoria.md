---
title: "NoSQL y bases en memoria: DynamoDB, ElastiCache, DocumentDB y Neptune"
summary: "Diferencia bases relacionales y NoSQL, y elige entre DynamoDB, ElastiCache, DocumentDB y Neptune; incluye AWS DMS y AWS SCT para migrar bases de datos."
domain: "technology-services"
order: 8
examTasks: ["3.4"]
services: ["Amazon DynamoDB", "Amazon ElastiCache", "Amazon DocumentDB", "Amazon Neptune", "AWS Database Migration Service", "AWS Schema Conversion Tool"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"
  - "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html"
  - "https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html"
  - "https://docs.aws.amazon.com/neptune/latest/userguide/intro.html"
  - "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"
---

## ¿Por qué importa?

Una app de videojuegos móviles en Bogotá tiene millones de jugadores. Necesita guardar el progreso de cada jugador con respuestas en milisegundos aunque el tráfico se multiplique en un torneo, mostrar la tabla de posiciones al instante, guardar perfiles con campos que cambian en cada actualización del juego y recomendar amigos según quién juega con quién.

Una sola base de datos relacional no es la mejor herramienta para todo eso. AWS ofrece **bases de datos de propósito específico**, y el examen te pedirá reconocer cuál corresponde a cada necesidad.

## Relacional vs NoSQL

| | Relacional (RDS, Aurora) | NoSQL (DynamoDB, DocumentDB, Neptune) |
| --- | --- | --- |
| Modelo de datos | Tablas con esquema fijo | Clave-valor, documentos, grafos y otros modelos flexibles |
| Lenguaje | SQL, con uniones (JOIN) entre tablas | APIs o lenguajes propios de cada modelo |
| Escalado típico | Instancias más grandes y réplicas de lectura | Diseñadas para escalar horizontalmente |
| Casos típicos | Facturación, ERP, sistemas transaccionales con estructura estable | Alto tráfico, baja latencia, datos semiestructurados o muy conectados |

**NoSQL** (*not only SQL*) agrupa bases de datos que no usan el modelo de tablas relacionales. Por ejemplo, DynamoDB **no admite JOIN**: se recomienda diseñar los datos para responder cada consulta sin uniones.

## Amazon DynamoDB

**Amazon DynamoDB** es una base de datos **NoSQL serverless, totalmente administrada y distribuida**, con **rendimiento de milisegundos de un solo dígito a cualquier escala**.

- **Modelos de datos:** clave-valor y documentos.
- **Serverless:** no aprovisionas servidores ni aplicas parches; no hay versiones ni ventanas de mantenimiento.
- **Modo bajo demanda** (*on-demand*): pagas por las lecturas y escrituras que haces, y la tabla escala automáticamente, incluso a cero.
- **Resiliencia:** replica los datos automáticamente en **tres Availability Zones**.
- **Global tables:** replicación multi-Región y multi-activa para aplicaciones globales.
- **DynamoDB Accelerator (DAX):** caché en memoria administrada, específica para DynamoDB.

Casos típicos: carritos de compra, estado de juegos, perfiles de usuario y aplicaciones serverless.

## Amazon ElastiCache: base de datos en memoria

Una **base de datos en memoria** guarda los datos en la memoria RAM en lugar del disco, lo que permite respuestas mucho más rápidas. Se usa mucho como **caché**: una copia temporal de datos consultados con frecuencia para no repetir consultas lentas a la base de datos principal.

**Amazon ElastiCache** facilita configurar, administrar y escalar un **almacén de datos en memoria o caché distribuida** en la nube.

- Funciona con los motores **Valkey, Memcached y Redis OSS**.
- Ofrece una opción **serverless**, que escala sola sin planificar capacidad, o clústeres basados en nodos para mayor control.
- AWS gestiona el aprovisionamiento de hardware, el monitoreo, el reemplazo de nodos y los parches.

Casos típicos: caché de consultas, sesiones de usuario y tablas de posiciones.

## Amazon DocumentDB y Amazon Neptune

- **Amazon DocumentDB (with MongoDB compatibility):** base de datos de **documentos** totalmente administrada y **compatible con MongoDB**. Puedes usar el mismo código de aplicación, controladores y herramientas que usas con MongoDB. Un **documento** es un registro con estructura flexible, normalmente en formato JSON.
- **Amazon Neptune:** base de datos de **grafos** totalmente administrada para datos **altamente conectados**. Un **grafo** representa entidades (nodos) y sus relaciones. Neptune está optimizada para almacenar miles de millones de relaciones y consultarlas con latencia de milisegundos, y admite los lenguajes Gremlin, openCypher y SPARQL. Casos típicos: motores de recomendación, detección de fraude, grafos de conocimiento y seguridad de redes.

| Necesidad | Servicio |
| --- | --- |
| Clave-valor a gran escala, serverless, milisegundos | **Amazon DynamoDB** |
| Caché o datos en memoria con latencia mínima | **Amazon ElastiCache** |
| Documentos JSON, compatibilidad con MongoDB | **Amazon DocumentDB** |
| Relaciones complejas: redes sociales, fraude, recomendaciones | **Amazon Neptune** |

## Migración de bases de datos: AWS DMS y AWS SCT

- **AWS Database Migration Service (AWS DMS):** migra bases de datos relacionales, data warehouses, bases NoSQL y otros almacenes de datos **hacia AWS** o entre entornos en la nube y on-premises. Permite migraciones **únicas** o **replicar los cambios en curso** para mantener origen y destino sincronizados. Admite migraciones entre el **mismo motor** o entre **motores distintos**.
- **AWS Schema Conversion Tool (AWS SCT):** herramienta descargable que **convierte el esquema** de la base de origen al formato de un motor distinto (por ejemplo, de Oracle a PostgreSQL). AWS DMS también ofrece **DMS Schema Conversion** como alternativa administrada.

Regla práctica: si cambias de motor, primero **conviertes el esquema** (SCT o DMS Schema Conversion) y luego **migras los datos** (DMS). La migración se trata con más detalle en el tema de migración.

## Trampas típicas del examen

- **Elegir RDS para millones de solicitudes por segundo con datos clave-valor.** La respuesta típica es **DynamoDB**.
- **Pensar que ElastiCache reemplaza a la base de datos principal.** Normalmente es una **capa de caché** delante de ella.
- **Confundir DocumentDB con DynamoDB.** La pista "compatible con MongoDB" apunta a **DocumentDB**.
- **No reconocer los grafos.** "Relaciones", "redes sociales" o "detección de fraude" apuntan a **Neptune**.
- **Creer que DMS convierte esquemas entre motores distintos por sí solo.** Para convertir el esquema se usa **AWS SCT** o **DMS Schema Conversion**; DMS mueve los datos.

## Resumen para el examen

- NoSQL = modelos flexibles (clave-valor, documentos, grafos), diseñados para escalar.
- DynamoDB = NoSQL serverless, milisegundos de un dígito a cualquier escala.
- DynamoDB replica en tres AZ; global tables para varias Regiones.
- ElastiCache = en memoria y caché; motores Valkey, Memcached y Redis OSS.
- DocumentDB = documentos, compatible con MongoDB.
- Neptune = grafos para datos muy conectados.
- AWS DMS = migrar datos, con replicación continua opcional.
- AWS SCT = convertir esquemas entre motores distintos.
