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
