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
quiz:
  - prompt: "Una app de videojuegos móviles de Bogotá guarda el progreso de millones de jugadores como datos clave-valor y necesita respuestas de milisegundos de un solo dígito aunque el tráfico se multiplique, sin administrar servidores. ¿Qué base de datos debe elegir?"
    options:
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune es una base de datos de grafos para datos altamente conectados; no es la opción para guardar progreso clave-valor a gran escala."
      - label: "Amazon RDS"
        explanation: "Amazon RDS es relacional, con tablas de esquema fijo; para datos clave-valor con millones de solicitudes, la respuesta típica es DynamoDB."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB es NoSQL serverless de clave-valor y documentos, con rendimiento de milisegundos de un solo dígito a cualquier escala."
        correct: true
      - label: "AWS Database Migration Service (AWS DMS)"
        explanation: "AWS DMS migra bases de datos hacia AWS o entre entornos; no es una base de datos para guardar el progreso de los jugadores."
  - prompt: "Una tienda en línea de Ciudad de México repite muchas consultas lentas a su base de datos principal. Quiere una capa de caché en memoria delante de ella, con motores como Valkey o Redis OSS. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache es un almacén en memoria o caché distribuida compatible con Valkey, Memcached y Redis OSS, ideal como capa de caché."
        correct: true
      - label: "Amazon DocumentDB"
        explanation: "Amazon DocumentDB es una base de datos de documentos compatible con MongoDB; no es una caché en memoria con Valkey o Redis OSS."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune es una base de datos de grafos para relaciones complejas; no sirve como capa de caché en memoria."
      - label: "AWS Schema Conversion Tool (AWS SCT)"
        explanation: "AWS SCT convierte el esquema de una base de datos a otro motor; no guarda datos en memoria ni actúa como caché."
  - prompt: "Una fintech de Santiago tiene una aplicación que usa MongoDB y quiere moverla a una base de datos de documentos totalmente administrada, usando el mismo código, controladores y herramientas. ¿Qué servicio debe elegir?"
    options:
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache es un almacén en memoria y caché; no es una base de datos de documentos compatible con MongoDB."
      - label: "Amazon DynamoDB"
        explanation: "DynamoDB admite documentos, pero no es compatible con MongoDB; la pista \"compatible con MongoDB\" apunta a DocumentDB."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune es una base de datos de grafos con Gremlin, openCypher y SPARQL; no es compatible con el código de MongoDB."
      - label: "Amazon DocumentDB (with MongoDB compatibility)"
        explanation: "Amazon DocumentDB es una base de datos de documentos totalmente administrada y compatible con MongoDB, así que permite usar el mismo código y herramientas."
        correct: true
practice:
  - prompt: "Una fintech de Lima quiere detectar fraude analizando las relaciones entre cuentas, dispositivos y transferencias, con miles de millones de relaciones consultadas en milisegundos. ¿Qué base de datos debe elegir?"
    options:
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB es NoSQL de clave-valor y documentos; para datos altamente conectados y detección de fraude, la pista apunta a una base de grafos."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune es una base de datos de grafos optimizada para miles de millones de relaciones con latencia de milisegundos; la detección de fraude es un caso típico."
        correct: true
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache es un almacén en memoria que se usa como caché; no es una base de datos de grafos para analizar relaciones."
      - label: "Amazon RDS"
        explanation: "Amazon RDS es relacional, con tablas de esquema fijo; las relaciones muy conectadas, como en la detección de fraude, apuntan a Neptune."
  - prompt: "Una aseguradora de Caracas migrará su base de datos de Oracle a PostgreSQL y primero necesita una herramienta descargable que convierta el esquema de origen al formato del nuevo motor. ¿Cuál debe usar?"
    options:
      - label: "Amazon DocumentDB"
        explanation: "Amazon DocumentDB es una base de datos de documentos compatible con MongoDB; no convierte esquemas de Oracle a PostgreSQL."
      - label: "DynamoDB Accelerator (DAX)"
        explanation: "DAX es una caché en memoria administrada específica para DynamoDB; no convierte esquemas entre motores."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune es una base de datos de grafos; no es una herramienta para convertir el esquema de una base relacional."
      - label: "AWS Schema Conversion Tool (AWS SCT)"
        explanation: "AWS SCT es una herramienta descargable que convierte el esquema de la base de origen al formato de un motor distinto, por ejemplo de Oracle a PostgreSQL."
        correct: true
  - prompt: "Una cadena hotelera de Cancún quiere migrar su base MySQL on-premises a MySQL en AWS y mantener origen y destino sincronizados, replicando los cambios en curso hasta el día del corte. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Database Migration Service (AWS DMS)"
        explanation: "AWS DMS migra bases de datos hacia AWS, entre el mismo motor o motores distintos, y puede replicar los cambios en curso para mantener origen y destino sincronizados."
        correct: true
      - label: "AWS Schema Conversion Tool (AWS SCT)"
        explanation: "AWS SCT convierte el esquema cuando cambias de motor; no mueve los datos ni replica los cambios en curso."
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache es un almacén en memoria para caché; no migra bases de datos ni replica cambios desde on-premises."
      - label: "DynamoDB global tables"
        explanation: "Las global tables replican tablas de DynamoDB entre Regiones; no migran una base MySQL on-premises hacia AWS."
  - prompt: "Un juego en línea de Santiago usa Amazon DynamoDB y ahora necesita replicación multi-Región y multi-activa para atender a jugadores en América y Europa. ¿Qué característica debe usar?"
    options:
      - label: "DynamoDB Accelerator (DAX)"
        explanation: "DAX es una caché en memoria administrada para DynamoDB; no replica las tablas entre Regiones."
      - label: "Modo bajo demanda (on-demand)"
        explanation: "El modo bajo demanda cobra por lecturas y escrituras y escala la tabla automáticamente; no replica los datos en otras Regiones."
      - label: "DynamoDB global tables"
        explanation: "Las global tables ofrecen replicación multi-Región y multi-activa para aplicaciones globales, justo lo que necesita el juego."
        correct: true
      - label: "Réplicas de lectura de Amazon RDS"
        explanation: "Las réplicas de lectura son una característica de Amazon RDS relacional; no replican tablas de DynamoDB."
  - prompt: "Un desarrollador de Ciudad de Guatemala diseña tablas en Amazon DynamoDB y planea combinar datos de dos tablas con JOIN, como hacía en SQL. ¿Qué debes recomendarle?"
    options:
      - label: "Usar JOIN con normalidad, porque DynamoDB es una base relacional"
        explanation: "DynamoDB es NoSQL de clave-valor y documentos, no relacional, y no admite JOIN."
      - label: "Diseñar los datos para responder cada consulta sin uniones, porque DynamoDB no admite JOIN"
        explanation: "DynamoDB no admite JOIN, así que se recomienda diseñar los datos para responder cada consulta sin uniones."
        correct: true
      - label: "Activar DynamoDB Accelerator (DAX) para habilitar JOIN"
        explanation: "DAX es una caché en memoria administrada, específica para DynamoDB; no agrega soporte para JOIN."
      - label: "Usar Amazon Neptune para ejecutar los JOIN en SQL"
        explanation: "Amazon Neptune es una base de datos de grafos que usa Gremlin, openCypher y SPARQL; no ejecuta JOIN de SQL sobre tablas de DynamoDB."
  - prompt: "Una startup de eventos de Medellín tiene tráfico muy irregular en Amazon DynamoDB y quiere pagar solo por las lecturas y escrituras que hace, con una tabla que escale automáticamente, incluso a cero. ¿Qué debe configurar?"
    options:
      - label: "DynamoDB global tables"
        explanation: "Las global tables replican datos entre Regiones; no definen el pago por lecturas y escrituras ni el escalado a cero."
      - label: "DynamoDB Accelerator (DAX)"
        explanation: "DAX agrega una caché en memoria delante de DynamoDB; no cambia el modelo de cobro de la tabla."
      - label: "Un clúster de Amazon ElastiCache basado en nodos"
        explanation: "Un clúster de ElastiCache basado en nodos es una caché en memoria con más control; no hace que la tabla de DynamoDB cobre por lectura y escritura."
      - label: "El modo bajo demanda (on-demand) de DynamoDB"
        explanation: "En modo bajo demanda pagas por las lecturas y escrituras que haces, y la tabla escala automáticamente, incluso a cero."
        correct: true
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
