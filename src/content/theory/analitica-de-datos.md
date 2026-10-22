---
title: "Analítica de datos"
summary: "Para qué sirve cada servicio de analítica de AWS: Athena, Kinesis, Glue, Quick Sight, Redshift, EMR y OpenSearch Service, con una tabla para elegir según la necesidad."
domain: "technology-services"
order: 16
examTasks: ["3.7"]
services: ["Amazon Athena", "Amazon Kinesis", "AWS Glue", "Amazon Quick Sight", "Amazon Redshift", "Amazon EMR", "Amazon OpenSearch Service", "Amazon Data Firehose"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/analytics.html"
  - "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-in-scope-services.html"
quiz:
  - prompt: "Una aerolínea de Medellín tiene archivos históricos de ventas en Amazon S3 y quiere consultarlos con SQL estándar sin administrar servidores, pagando solo por las consultas que ejecuta. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon Kinesis"
        explanation: "Amazon Kinesis recopila y procesa datos en streaming en tiempo real; no es para consultar con SQL archivos históricos ya guardados en S3."
      - label: "Amazon Athena"
        explanation: "Amazon Athena es un servicio serverless de consultas interactivas con SQL estándar sobre datos en S3, y pagas solo por las consultas que ejecutas."
        correct: true
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight crea tableros y visualizaciones de BI; no es el servicio que ejecuta consultas SQL directamente sobre los archivos en S3."
      - label: "AWS Glue"
        explanation: "AWS Glue prepara datos con ETL y guarda sus metadatos en el Glue Data Catalog; no es el servicio de consultas SQL interactivas."
  - prompt: "El área comercial de una aerolínea de Bogotá quiere capturar los clics de su sitio web a medida que llegan para detectar en tiempo real cuándo se dispara la demanda de una ruta. ¿Qué servicio de AWS corresponde?"
    options:
      - label: "Amazon Athena"
        explanation: "Amazon Athena consulta con SQL datos que ya están en S3; no captura flujos de clics a medida que llegan."
      - label: "AWS Glue"
        explanation: "AWS Glue es ETL administrado para preparar y catalogar datos; no está pensado para capturar datos en streaming en tiempo real."
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight muestra tableros de BI; no recopila ni procesa los clics a medida que llegan."
      - label: "Amazon Kinesis"
        explanation: "Amazon Kinesis sirve para recopilar, procesar y analizar datos en streaming en tiempo real, como los clics de un sitio web."
        correct: true
  - prompt: "Una cadena de supermercados de Lima necesita un servicio ETL totalmente administrado que descubra sus datos en S3 y guarde la definición de tablas y esquemas para que Athena sepa cómo leerlos. ¿Cuál debe elegir?"
    options:
      - label: "AWS Glue"
        explanation: "AWS Glue es ETL totalmente administrado y guarda los metadatos de tablas y esquemas en el AWS Glue Data Catalog, que Athena usa para leer los datos."
        correct: true
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight crea tableros interactivos de BI; no hace ETL ni mantiene un catálogo de metadatos."
      - label: "Amazon OpenSearch Service"
        explanation: "Amazon OpenSearch Service se usa para búsqueda de texto completo y análisis de logs; no es el catálogo de metadatos que usa Athena."
      - label: "Amazon Kinesis Video Streams"
        explanation: "Kinesis Video Streams captura video desde dispositivos conectados; no descubre datos en S3 ni guarda esquemas de tablas."
---

## ¿Por qué importa?

Una aerolínea de bajo costo en Medellín genera datos todo el tiempo: clics en su sitio web, ventas de boletos, registros (*logs*) de sus aplicaciones y archivos históricos guardados en Amazon S3. La gerencia quiere tableros con las ventas del día, el equipo de TI quiere buscar errores en los logs y el área comercial quiere detectar en tiempo real cuándo se dispara la demanda de una ruta.

Cada necesidad tiene un servicio de analítica distinto. El examen no pide configurarlos, sino reconocer **para qué sirve cada uno**.

## Conceptos básicos

- **ETL** (*extract, transform, load*): extraer datos de una fuente, transformarlos (limpiar, unir, cambiar formato) y cargarlos en un destino para analizarlos.
- **Data lake** (lago de datos): repositorio central, normalmente en Amazon S3, donde se guardan datos en su formato original.
- **Data warehouse** (almacén de datos): base de datos optimizada para consultas analíticas complejas sobre grandes volúmenes de datos estructurados.
- **Streaming**: datos que llegan de forma continua y se procesan a medida que llegan, no por lotes.
- **BI** (*business intelligence*): tableros y reportes para tomar decisiones de negocio.

## Los servicios de analítica

**Amazon Athena**: servicio **interactivo de consultas** para analizar datos en **Amazon S3 usando SQL estándar**. Es **serverless**: no hay infraestructura que administrar y pagas solo por las consultas que ejecutas. Apuntas a tus datos en S3, defines el esquema y empiezas a consultar.

**Amazon Kinesis**: sirve para **recopilar, procesar y analizar datos en streaming en tiempo real**, como clics de un sitio web, logs de aplicaciones, telemetría de IoT, video o audio. Incluye **Kinesis Data Streams** (captura flujos de datos en tiempo real), **Kinesis Video Streams** (video desde dispositivos conectados), **Amazon Data Firehose** (carga datos en streaming en destinos como S3, Redshift u OpenSearch Service) y **Amazon Managed Service for Apache Flink** (análisis de streams).

**AWS Glue**: servicio **ETL totalmente administrado** para preparar y cargar datos para analítica. Descubre tus datos y guarda sus metadatos (definición de tablas y esquema) en el **AWS Glue Data Catalog**, que otros servicios como Athena usan para saber cómo leer los datos.

**Amazon Quick Sight**: servicio de **inteligencia de negocio (BI)** para crear **tableros interactivos** y visualizaciones que se ven desde el navegador o el móvil, y que se pueden insertar en aplicaciones. Dato de actualidad: Amazon QuickSight evolucionó a **Amazon Quick**, un servicio con IA para automatizar tareas y analizar datos; **Amazon Quick Sight** continúa como la capacidad de BI dentro de Quick.

**Amazon Redshift**: **data warehouse** en la nube para analizar grandes volúmenes de datos estructurados y semiestructurados con **SQL estándar** y tus herramientas de BI existentes. Usa almacenamiento columnar y ejecución masivamente paralela. También existe **Amazon Redshift Serverless**, que aprovisiona y escala la capacidad automáticamente.

**Amazon EMR**: plataforma de **big data** para procesar grandes cantidades de datos con herramientas de código abierto como **Apache Spark, Apache Hive, Apache HBase, Apache Flink, Apache Hudi y Presto**. Automatiza tareas como aprovisionar capacidad y ajustar clústeres.

**Amazon OpenSearch Service**: facilita desplegar, operar y escalar **OpenSearch** para **buscar, analizar y visualizar datos en tiempo real**. Casos típicos: **análisis de logs**, **búsqueda de texto completo**, monitoreo de aplicaciones y análisis de clics. Incluye OpenSearch Dashboards para visualizar.

## ¿Qué servicio uso?

| Necesito… | Servicio |
| --- | --- |
| Consultar con **SQL** archivos que ya están en **S3**, sin servidores | **Amazon Athena** |
| Capturar y procesar **datos en streaming en tiempo real** | **Amazon Kinesis** |
| Hacer **ETL** o tener un **catálogo de metadatos** de mis datos | **AWS Glue** |
| Crear **tableros y reportes de BI** para la gerencia | **Amazon Quick Sight** |
| Un **data warehouse** para consultas analíticas complejas a gran escala | **Amazon Redshift** |
| Ejecutar **Spark, Hadoop, Hive** u otros frameworks de big data | **Amazon EMR** |
| **Buscar** texto o **analizar logs** casi en tiempo real | **Amazon OpenSearch Service** |

Un flujo típico combina varios: Kinesis captura los clics, Firehose los guarda en S3, Glue cataloga y transforma los datos, Athena o Redshift los consultan y Quick Sight muestra los tableros.

## Trampas típicas del examen

- **Confundir Athena con Redshift.** Athena consulta archivos directamente en S3 sin cargar datos ni administrar nada; Redshift es un data warehouse para análisis complejos y recurrentes a gran escala.
- **Elegir Glue para tableros.** Glue prepara y cataloga los datos; los tableros son de **Quick Sight**.
- **Elegir Kinesis para análisis histórico por lotes.** Kinesis es para datos **en tiempo real**.
- **Confundir EMR con Glue.** Ambos procesan datos, pero EMR es la opción para ejecutar frameworks de big data como Spark o Hadoop en clústeres; Glue es ETL administrado.
- **Pensar que OpenSearch Service es solo una base de datos.** Su fuerte es la búsqueda y el análisis de logs.

## Resumen para el examen

- Athena = SQL serverless sobre datos en S3; pagas por consulta.
- Kinesis = datos en streaming en tiempo real (Data Streams, Video Streams, Data Firehose).
- Glue = ETL administrado + Glue Data Catalog.
- Quick Sight = tableros de BI; hoy es parte de Amazon Quick.
- Redshift = data warehouse con SQL.
- EMR = big data con Spark, Hive, HBase y otros frameworks de código abierto.
- OpenSearch Service = búsqueda y análisis de logs en tiempo real.
