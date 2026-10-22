---
title: "Bases de datos relacionales: RDS y Aurora"
summary: "Compara bases de datos en EC2 con bases administradas, conoce los motores de Amazon RDS, Multi-AZ vs réplicas de lectura y los beneficios de Amazon Aurora."
domain: "technology-services"
order: 7
examTasks: ["3.4"]
services: ["Amazon RDS", "Amazon Aurora", "Amazon EC2", "Amazon Redshift"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html"
quiz:
  - prompt: "Una aseguradora de Guadalajara migra su base de datos MySQL a AWS y quiere que AWS se encargue de los parches, los respaldos, la detección de fallas y la recuperación, con la menor administración posible. ¿Qué opción debe elegir?"
    options:
      - label: "Instalar MySQL en una instancia Amazon EC2"
        explanation: "Con una base de datos en EC2 tú instalas, parchas, respaldas y escalas el sistema operativo y el motor; da control total, pero más trabajo."
      - label: "Amazon RDS for MySQL"
        explanation: "Amazon RDS es una base de datos relacional administrada que gestiona respaldos, parches, detección de fallas y recuperación, y es compatible con MySQL."
        correct: true
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift es un data warehouse para analizar grandes volúmenes de datos históricos; no es la opción para el sistema transaccional de pólizas."
      - label: "Amazon DynamoDB"
        explanation: "DynamoDB es una base de datos NoSQL; no ejecuta el motor MySQL relacional que la aseguradora ya usa."
  - prompt: "Un banco de Lima usa Amazon RDS y necesita alta disponibilidad: una instancia de reserva en otra Availability Zone, con replicación síncrona y conmutación por error si falla la principal. ¿Qué debe activar?"
    options:
      - label: "Réplicas de lectura"
        explanation: "Las réplicas de lectura usan replicación asíncrona y su objetivo principal es escalar lecturas, no la conmutación por error con una reserva síncrona."
      - label: "Snapshots manuales"
        explanation: "Los snapshots manuales sirven para restaurar la base de datos; no mantienen una instancia de reserva lista para la conmutación por error."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift es un data warehouse para análisis de datos históricos; no da alta disponibilidad a una instancia de RDS."
      - label: "Multi-AZ"
        explanation: "Multi-AZ replica de forma síncrona hacia una instancia de reserva en otra AZ y ofrece conmutación por error para alta disponibilidad."
        correct: true
  - prompt: "Una startup de Bogotá usa PostgreSQL y busca un motor relacional totalmente administrado y compatible, con mayor rendimiento que PostgreSQL estándar y datos copiados en tres Availability Zones. ¿Cuál debe elegir?"
    options:
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora es compatible con MySQL y PostgreSQL, ofrece hasta 6 veces el throughput de esos motores estándar y guarda copias en tres AZ."
        correct: true
      - label: "PostgreSQL instalado en Amazon EC2"
        explanation: "En EC2 tú administras el sistema operativo, el motor, los respaldos y el escalado; no es un motor totalmente administrado."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift es el data warehouse de AWS para consultas analíticas; no es un motor transaccional compatible con PostgreSQL como pide el escenario."
      - label: "Amazon DynamoDB"
        explanation: "DynamoDB es NoSQL y no admite JOIN; no es compatible con el código y las herramientas de PostgreSQL."
practice:
  - prompt: "Un e-commerce de Lima usa Amazon RDS y sus reportes saturan la instancia principal con consultas de solo lectura. Quiere escalar las lecturas sin cargar más la instancia principal. ¿Qué debe agregar?"
    options:
      - label: "Una instancia de reserva (standby) con Multi-AZ"
        explanation: "En una instancia Multi-AZ la reserva no atiende lecturas; su objetivo principal es la alta disponibilidad y la conmutación por error."
      - label: "Snapshots manuales"
        explanation: "Los snapshots manuales sirven para restaurar la base de datos; no atienden consultas de solo lectura para los reportes."
      - label: "Réplicas de lectura"
        explanation: "Las réplicas de lectura copian los datos de forma asíncrona desde la instancia principal y atienden consultas de solo lectura, como los reportes."
        correct: true
      - label: "Migrar la base de datos a una instancia de Amazon EC2"
        explanation: "Instalar la base en EC2 da control total, pero tú gestionas el escalado y el resto de tareas; no es la forma de escalar lecturas en RDS."
  - prompt: "Una cadena de restaurantes de Arequipa migró su base de datos a Amazon RDS y ahora sus consultas son lentas porque están mal escritas. En una base de datos administrada, ¿quién debe optimizarlas?"
    options:
      - label: "El cliente, porque optimizar la aplicación y las consultas sigue siendo su responsabilidad"
        explanation: "Con RDS, AWS gestiona tareas como parches y respaldos, pero diseñar el esquema y optimizar las consultas sigue siendo responsabilidad del cliente."
        correct: true
      - label: "AWS, porque RDS administra el motor de base de datos"
        explanation: "Que AWS administre el motor no lo hace responsable de tus consultas; optimizarlas sigue siendo tarea del cliente."
      - label: "AWS, como parte de los parches automáticos del software"
        explanation: "Los parches actualizan el software de base de datos; no reescriben ni optimizan las consultas de la aplicación."
      - label: "AWS, porque en RDS el escalado es responsabilidad de AWS"
        explanation: "En RDS AWS se encarga del escalado, pero eso no incluye optimizar consultas mal escritas, que sigue siendo tarea del cliente."
  - prompt: "Una empresa de Montevideo quiere llevar su base de datos Microsoft SQL Server a un servicio relacional administrado sin cambiar de motor, y un consultor propone Amazon Aurora. ¿Qué opción debe elegir?"
    options:
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora es compatible con MySQL y PostgreSQL; no ejecuta el motor Microsoft SQL Server que usa la empresa."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB es una base de datos NoSQL; no ejecuta el motor relacional Microsoft SQL Server."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift es un data warehouse para analizar datos históricos; no es un servicio para ejecutar SQL Server sin cambiar de motor."
      - label: "Amazon RDS for SQL Server"
        explanation: "Amazon RDS es compatible con Microsoft SQL Server, así que la empresa obtiene una base administrada sin cambiar de motor."
        correct: true
  - prompt: "Un banco de Ciudad de Panamá necesita una configuración y una versión del motor de base de datos que Amazon RDS no ofrece, y acepta encargarse del sistema operativo, los parches y los respaldos. ¿Qué opción encaja?"
    options:
      - label: "Amazon RDS"
        explanation: "Amazon RDS administra respaldos y parches, pero el escenario pide una configuración y versión que RDS no ofrece."
      - label: "Una base de datos instalada en Amazon EC2"
        explanation: "Una base de datos en EC2 da control total, por ejemplo para configuraciones o versiones que un servicio administrado no ofrece, a cambio de que tú la gestiones."
        correct: true
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora es un motor totalmente administrado que forma parte de RDS; no te da el control total sobre configuraciones fuera de lo que ofrece el servicio."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB es una base NoSQL serverless; no permite instalar la versión y configuración de motor relacional que necesita el banco."
  - prompt: "Una aerolínea de Bogotá quiere una copia de su base de datos de Amazon RDS en otra Región, que pueda promover a instancia independiente si la Región principal sufre un desastre. ¿Qué característica debe usar?"
    options:
      - label: "Una réplica de lectura en otra Región"
        explanation: "Las réplicas de lectura pueden estar en otra Región y pueden promoverse a instancia independiente para recuperación ante desastres."
        correct: true
      - label: "Multi-AZ"
        explanation: "Multi-AZ mantiene una reserva síncrona en otra AZ dentro de la misma Región; no crea una copia en otra Región."
      - label: "Las copias de Aurora en tres Availability Zones"
        explanation: "Aurora guarda copias en tres AZ de una misma Región; eso no deja una copia de la base de RDS en otra Región."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift es un data warehouse para analizar datos históricos; no es una copia promovible de la base de RDS."
  - prompt: "Un grupo minorista de Guayaquil registra sus ventas diarias en Amazon RDS y ahora quiere analizar diez años de ventas históricas con consultas complejas sobre grandes volúmenes de datos. ¿Qué servicio está pensado para ese análisis?"
    options:
      - label: "Activar Multi-AZ en RDS"
        explanation: "Multi-AZ da alta disponibilidad con una reserva síncrona; no convierte a RDS en un data warehouse para análisis histórico."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB es NoSQL de clave-valor y no admite JOIN; no es un data warehouse para consultas analíticas complejas."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift es el data warehouse de AWS, optimizado para analizar grandes volúmenes de datos históricos con consultas complejas."
        correct: true
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora es una base relacional optimizada para transacciones del día a día; para data warehousing la respuesta es Redshift."
---

## ¿Por qué importa?

Una aseguradora en Guadalajara corre su sistema de pólizas sobre una base de datos MySQL instalada en un servidor propio. Su único administrador de bases de datos pasa las noches aplicando parches, revisando respaldos y temiendo que el disco falle. La empresa quiere migrar a AWS y se pregunta: ¿instalamos MySQL en una instancia EC2 o usamos un servicio administrado?

Esa decisión, **base de datos en EC2 vs base de datos administrada**, es una de las preguntas favoritas del examen.

## ¿Qué es una base de datos relacional?

Una **base de datos relacional** guarda la información en **tablas** con filas y columnas, y relaciona las tablas mediante claves. Se consulta con **SQL** (*Structured Query Language*). Es ideal cuando los datos tienen una estructura fija y se necesitan transacciones consistentes, como en un sistema de facturación, pólizas o inventario.

## Base de datos en EC2 vs base de datos administrada

| Tarea | On-premises | Base de datos en Amazon EC2 | Amazon RDS (administrada) |
| --- | --- | --- | --- |
| Optimizar la aplicación y las consultas | Cliente | Cliente | Cliente |
| Escalado | Cliente | Cliente | AWS |
| Alta disponibilidad | Cliente | Cliente | AWS |
| Respaldos de la base de datos | Cliente | Cliente | AWS |
| Instalar y parchar el software de base de datos | Cliente | Cliente | AWS |
| Instalar y parchar el sistema operativo | Cliente | Cliente | AWS |
| Mantenimiento del servidor y ciclo de vida del hardware | Cliente | AWS | AWS |
| Energía, red y refrigeración | Cliente | AWS | AWS |

- **Base de datos en EC2:** AWS gestiona el hardware, pero tú instalas, parchas, respaldas y escalas el sistema operativo y el motor. Te da **control total** (por ejemplo, para configuraciones o versiones que un servicio administrado no ofrece), pero también más trabajo y más riesgo de errores humanos.
- **Base de datos administrada (AWS managed):** AWS se encarga de la mayoría de las tareas de administración. Tú sigues siendo responsable de diseñar el esquema y **optimizar las consultas**. AWS recomienda Amazon RDS como opción predeterminada para la mayoría de los despliegues relacionales.

## Amazon RDS

**Amazon Relational Database Service (Amazon RDS)** facilita **configurar, operar y escalar** una base de datos relacional en la nube.

- **Motores compatibles:** IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database y PostgreSQL, además de Amazon Aurora.
- **Administración:** RDS gestiona respaldos, parches de software, detección automática de fallas y recuperación.
- **Respaldos:** puedes activar respaldos automáticos o crear snapshots manuales para restaurar la base de datos.
- **Seguridad:** controlas el acceso con IAM y puedes proteger la base de datos dentro de una VPC.

### Multi-AZ vs réplicas de lectura

| | **Multi-AZ** | **Réplicas de lectura** (*read replicas*) |
| --- | --- | --- |
| Objetivo principal | **Alta disponibilidad** y conmutación por error (*failover*) | **Escalar lecturas** |
| Replicación | **Síncrona** hacia una instancia de reserva (*standby*) en otra AZ | **Asíncrona** desde la instancia principal |
| ¿Atiende lecturas? | En una instancia Multi-AZ, la reserva **no** atiende lecturas (en un clúster Multi-AZ, los lectores sí) | Sí, solo lectura |
| ¿Otra Región? | Dentro de la misma Región | Puede estar en la misma Región o en otra |
| Uso adicional | Reduce interrupciones por fallas o mantenimiento | Reportes, y puede **promoverse** a instancia independiente para recuperación ante desastres |

## Amazon Aurora

**Amazon Aurora** es un motor de base de datos relacional **totalmente administrado** y **compatible con MySQL y PostgreSQL**: puedes usar el mismo código, herramientas y aplicaciones que ya usas con esos motores. Forma parte de Amazon RDS.

Beneficios clave:

- **Alto rendimiento:** AWS indica que ofrece **hasta 6 veces** el rendimiento (throughput) de MySQL y de PostgreSQL estándar. El material antiguo menciona 5 y 3 veces; la cifra vigente es 6.
- **Almacenamiento distribuido y resiliente:** los datos se guardan en un volumen de clúster con **copias en tres Availability Zones** de una Región, lo que da alta durabilidad y disponibilidad durante un *failover*.
- **Almacenamiento que crece solo:** el volumen crece automáticamente a medida que aumentan los datos, y solo pagas el espacio que usas.
- **Clustering y replicación automatizados**, una de las tareas más complejas de administrar por cuenta propia.

## Relacional vs data warehouse

Una base de datos relacional como RDS o Aurora está optimizada para **transacciones** del día a día (registrar una venta, actualizar un cliente). Un **data warehouse** (almacén de datos) está optimizado para **analizar grandes volúmenes de datos históricos** con consultas complejas. En AWS, el data warehouse es **Amazon Redshift**, que se estudia en el tema de analítica.

## Trampas típicas del examen

- **Elegir EC2 cuando el escenario pide "menos administración".** La respuesta es un servicio administrado como **RDS** o **Aurora**.
- **Confundir Multi-AZ con réplicas de lectura.** Multi-AZ = disponibilidad (síncrona); réplicas de lectura = rendimiento de lectura (asíncrona).
- **Creer que con RDS AWS optimiza tus consultas.** La optimización de consultas sigue siendo tu responsabilidad.
- **Pensar que Aurora es compatible con cualquier motor.** Es compatible con **MySQL y PostgreSQL**.
- **Usar RDS para análisis masivo de datos históricos.** Para data warehousing, la respuesta es **Amazon Redshift**.

## Resumen para el examen

- Relacional = tablas, SQL y estructura fija.
- Base de datos en EC2 = control total, pero tú gestionas el SO, el motor, respaldos y escalado.
- RDS = relacional administrada; AWS gestiona parches, respaldos, detección de fallas y recuperación.
- Motores de RDS: Db2, MariaDB, SQL Server, MySQL, Oracle, PostgreSQL y Aurora.
- Multi-AZ = alta disponibilidad con réplica síncrona en otra AZ.
- Réplicas de lectura = escalar lecturas con replicación asíncrona; pueden estar en otra Región.
- Aurora = compatible con MySQL y PostgreSQL, alto rendimiento, datos copiados en tres AZ.
- Data warehouse = Amazon Redshift.
