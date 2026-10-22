---
title: "Estrategias y servicios de migración"
summary: "Domina los 7 Rs de migración, los recursos de apoyo de AWS y los servicios para descubrir, migrar servidores, replicar bases de datos y convertir esquemas."
domain: "cloud-concepts"
order: 6
examTasks: ["1.3", "3.4"]
services: ["AWS Migration Hub", "AWS Application Discovery Service", "AWS Application Migration Service", "Migration Evaluator", "AWS DMS", "AWS SCT", "AWS Transform"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html"
  - "https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html"
  - "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html"
  - "https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html"
  - "https://aws.amazon.com/migration-evaluator/"
  - "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"
  - "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html"
  - "https://aws.amazon.com/migration-acceleration-program/"
  - "https://aws.amazon.com/prescriptive-guidance/"
  - "https://aws.amazon.com/professional-services/"
quiz:
  - prompt: "Un grupo hotelero de Cancún prepara su migración a AWS y encuentra una aplicación interna sin conexiones entrantes en los últimos 90 días, que ya no aporta valor. ¿Qué estrategia de los 7 Rs debe aplicar?"
    options:
      - label: "Retain"
        explanation: "Retain mantiene la aplicación en el entorno de origen por ahora, por ejemplo por residencia de datos o dependencias pendientes; no aplica a una aplicación que ya no aporta valor."
      - label: "Rehost"
        explanation: "Rehost mueve la aplicación a AWS sin cambios; migrar algo que nadie usa sería gastar esfuerzo en una carga sin valor."
      - label: "Repurchase"
        explanation: "Repurchase reemplaza la aplicación por otro producto, normalmente SaaS; no tiene sentido comprar un reemplazo para algo que nadie usa."
      - label: "Retire"
        explanation: "Retire consiste en apagar o archivar aplicaciones que ya no aportan valor, como una sin conexiones entrantes en los últimos 90 días."
        correct: true
  - prompt: "Una fintech de Buenos Aires migrará su base de datos de Oracle a Aurora PostgreSQL. Antes de mover los datos, necesita una herramienta que se descarga en su equipo y convierte tablas, vistas y código de base de datos al nuevo motor. ¿Cuál debe usar?"
    options:
      - label: "AWS SCT (AWS Schema Conversion Tool)"
        explanation: "AWS SCT se descarga en tu equipo y convierte el esquema de una base de datos de un motor a otro, como de Oracle a Aurora PostgreSQL."
        correct: true
      - label: "AWS Migration Hub"
        explanation: "AWS Migration Hub da seguimiento al estado de cada migración desde un lugar único; no convierte esquemas de base de datos."
      - label: "AWS Application Migration Service"
        explanation: "AWS Application Migration Service automatiza el rehost de servidores con replicación a nivel de bloque; no convierte el esquema de un motor de base de datos a otro."
      - label: "AWS Application Discovery Service"
        explanation: "AWS Application Discovery Service descubre servidores y bases de datos on-premises y sus dependencias; no convierte esquemas."
  - prompt: "Una empresa de logística de Monterrey quiere mover rápido decenas de servidores físicos y virtuales a AWS sin cambios, con replicación continua a nivel de bloque y ventanas de corte de minutos. ¿Qué servicio de AWS debe usar?"
    options:
      - label: "Migration Evaluator"
        explanation: "Migration Evaluator construye un caso de negocio basado en datos y compara costos; no replica ni mueve servidores."
      - label: "AWS Migration Hub"
        explanation: "AWS Migration Hub da seguimiento al estado de las migraciones, pero no ejecuta el rehost de los servidores."
      - label: "AWS Application Migration Service"
        explanation: "AWS Application Migration Service automatiza el rehost: replica servidores físicos, virtuales o de otras nubes con replicación continua a nivel de bloque y cortes de minutos."
        correct: true
      - label: "AWS SCT (AWS Schema Conversion Tool)"
        explanation: "AWS SCT convierte esquemas de bases de datos entre motores; no migra servidores completos a AWS."
---

## ¿Por qué importa?

Un grupo hotelero de Cancún tiene 200 servidores en su centro de datos: un sistema de reservas antiguo, una base de datos Oracle, un correo interno y varias aplicaciones que nadie usa desde hace meses. La dirección quiere migrar a AWS, pero no todo debe moverse igual: algunas aplicaciones se copian tal cual, otras se mejoran en el camino y otras se apagan.

El examen te dará escenarios así y te pedirá elegir la **estrategia de migración** y el **servicio de AWS** adecuados.

## Los 7 Rs: estrategias de migración

Una **estrategia de migración** es el enfoque para mover una carga de trabajo a la nube. AWS documenta siete, conocidas como los **7 Rs**:

| Estrategia | Qué significa | Ejemplo típico |
| --- | --- | --- |
| **Retire** (retirar) | Apagar o archivar aplicaciones que ya no aportan valor. | Una aplicación sin conexiones entrantes en los últimos 90 días. |
| **Retain** (retener) | Mantener la aplicación en el entorno de origen por ahora. | Requisitos de residencia de datos, dependencias pendientes o una actualización reciente. |
| **Rehost** (*lift and shift*) | Mover la aplicación a AWS **sin cambios**. | Migrar muchos servidores rápido a instancias EC2. |
| **Relocate** (reubicar) | Transferir muchos servidores de una plataforma on-premises a la versión en la nube de esa plataforma, o mover recursos a otra VPC, Región o cuenta. | Mover una instancia de Amazon RDS a otra cuenta de AWS. |
| **Repurchase** (*drop and shop*) | Reemplazar la aplicación por otro producto o versión, normalmente SaaS. | Pasar de un CRM con licencia tradicional a un CRM SaaS. |
| **Replatform** (*lift, tinker and shift*) | Mover la aplicación con **algunas optimizaciones**, sin cambiar su arquitectura central. | Pasar una base de datos Microsoft SQL Server a Amazon RDS for SQL Server. |
| **Refactor / re-architect** | Rediseñar la aplicación para aprovechar funciones **nativas de la nube**. | Dividir un monolito en microservicios para escalar más rápido. |

Puntos clave según AWS:

- **Refactor** es la estrategia **más compleja y costosa**. Para migraciones grandes, AWS recomienda rehost, relocate o replatform primero y **modernizar después**.
- **Relocate** es la forma más rápida de migrar y operar en la nube porque no cambia la arquitectura de la aplicación.
- Con **rehost** y **relocate**, la aplicación sigue atendiendo usuarios mientras se migra, lo que minimiza interrupciones.

## Servicios de AWS para migrar

| Servicio | Para qué sirve |
| --- | --- |
| **Migration Evaluator** | Construir un **caso de negocio** basado en datos: inventaría el entorno on-premises, detecta servidores sobredimensionados y compara costos, incluido reutilizar licencias frente a licencias incluidas. |
| **AWS Application Discovery Service** | **Descubrir** servidores y bases de datos on-premises: recopila configuración, uso y dependencias de red, con agente o sin agente (*Agentless Collector* para VMware vCenter). |
| **AWS Migration Hub** | Un lugar único para descubrir servidores, planificar y **dar seguimiento** al estado de cada migración, sin importar la herramienta usada. |
| **AWS Application Migration Service** | **Rehost** automatizado: replica servidores físicos, virtuales o de otras nubes a AWS con replicación continua a nivel de bloque y ventanas de corte de minutos. Hoy su documentación lo llama **AWS Transform MGN**. |
| **AWS DMS** (*AWS Database Migration Service*) | Migrar bases de datos, data warehouses y otros almacenes de datos, con migraciones **únicas** o **replicación continua** de cambios. |
| **AWS SCT** (*AWS Schema Conversion Tool*) | Convertir el **esquema** de una base de datos de un motor a otro (por ejemplo, de Oracle a Aurora PostgreSQL). |

**Novedades que conviene conocer:** AWS Migration Hub **ya no acepta nuevos clientes** desde el 7 de noviembre de 2025, y AWS Application Discovery Service tampoco está abierto a nuevos clientes. Para capacidades similares, AWS recomienda **AWS Transform**. El examen CLF-C02 todavía puede nombrar estos servicios, así que debes saber para qué sirven.

## Migración de bases de datos: AWS DMS y AWS SCT

Una **migración homogénea** usa el mismo motor en origen y destino (Oracle → Oracle). Una **migración heterogénea** cambia de motor (Oracle → PostgreSQL).

- **AWS DMS** es un servidor en la nube que ejecuta software de **replicación**. Puedes hacer una migración única o **replicar los cambios continuos** para mantener sincronizados origen y destino hasta el momento del corte. AWS administra la infraestructura de la migración y se paga por uso. Admite migraciones homogéneas y heterogéneas.
- **AWS SCT** se descarga en tu equipo y convierte esquemas (tablas, vistas, código de base de datos e incluso SQL dentro del código de aplicaciones) cuando cambias de motor. Si algo no se puede convertir automáticamente, da guía para crearlo a mano.
- **DMS Schema Conversion** es la opción dentro de AWS DMS que evalúa y convierte esquemas sin descargar herramientas.

Regla práctica: **cambias de motor → primero conviertes el esquema (SCT o DMS Schema Conversion), luego mueves los datos con DMS**. Mismo motor → basta con DMS.

## Recursos de apoyo en el viaje de migración

- **AWS Prescriptive Guidance:** guías y patrones de expertos de AWS para migrar, optimizar y modernizar.
- **AWS Professional Services:** equipo global de expertos de AWS que ayuda a diseñar, construir y migrar cargas de trabajo.
- **AWS Partners:** socios de la AWS Partner Network, como los **AWS Migration Competency Partners**.
- **AWS Migration Acceleration Program (MAP):** programa con metodología en tres fases (**Assess, Mobilize, Migrate & Modernize**), herramientas, capacitación, socios e inversión financiera para compensar costos iniciales de migración.

## Trampas típicas del examen

- **Elegir refactor para una migración rápida.** Lo más rápido es rehost o relocate; refactor es lo más complejo.
- **Confundir AWS DMS con AWS SCT.** DMS mueve y replica **datos**; SCT convierte el **esquema**.
- **Usar SCT en una migración homogénea.** Si el motor no cambia, no hace falta convertir el esquema.
- **Confundir Migration Hub con Application Migration Service.** Migration Hub da **seguimiento**; Application Migration Service **ejecuta** el rehost.
- **Confundir repurchase con replatform.** Repurchase cambia de producto (por ejemplo, a SaaS); replatform conserva la aplicación con optimizaciones.

## Resumen para el examen

- 7 Rs: retire, retain, rehost, relocate, repurchase, replatform y refactor.
- Rehost = *lift and shift*; replatform = *lift, tinker and shift*; repurchase = *drop and shop*.
- Refactor = más complejo y costoso; aprovecha funciones nativas de la nube.
- Migration Evaluator = caso de negocio; Application Discovery Service = inventario y dependencias.
- Migration Hub = seguimiento; Application Migration Service (AWS Transform MGN) = rehost.
- AWS DMS = migrar y replicar datos de forma continua; AWS SCT = convertir esquemas entre motores.
- Apoyo: AWS Prescriptive Guidance, AWS Professional Services, AWS Partners y MAP.
