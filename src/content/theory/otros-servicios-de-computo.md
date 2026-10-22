---
title: "Otros servicios de cómputo: Elastic Beanstalk, Lightsail, Batch y Outposts"
summary: "Para qué sirven AWS Elastic Beanstalk, Amazon Lightsail, AWS Batch y AWS Outposts, a quién se dirigen y cómo distinguirlos en el examen."
domain: "technology-services"
order: 6
examTasks: ["3.3"]
services: ["AWS Elastic Beanstalk", "Amazon Lightsail", "AWS Batch", "AWS Outposts"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html"
  - "https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html"
  - "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html"
  - "https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html"
quiz:
  - prompt: "Una diseñadora independiente en Montevideo quiere publicar el sitio WordPress de su estudio de la forma más sencilla y con un precio mensual bajo y predecible. ¿Qué servicio debe elegir?"
    options:
      - label: "AWS Batch"
        explanation: "AWS Batch ejecuta trabajos por lotes que esperan en cola; no está pensado para publicar un sitio web pequeño."
      - label: "AWS Outposts"
        explanation: "AWS Outposts instala infraestructura de AWS en las instalaciones del cliente; es excesivo para un sitio WordPress pequeño."
      - label: "Amazon Lightsail"
        explanation: "Amazon Lightsail es la forma más fácil de empezar, con imágenes listas como WordPress y un precio mensual bajo y predecible."
        correct: true
      - label: "AWS Elastic Beanstalk"
        explanation: "Elastic Beanstalk despliega apps web sin gestionar infraestructura, pero pagas por los recursos que crea; la pista de precio mensual predecible apunta a otro servicio."
  - prompt: "Un laboratorio genómico en São Paulo necesita ejecutar miles de análisis que pueden esperar en cola, sin instalar software de procesamiento por lotes y con aprovisionamiento automático de cómputo. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Batch"
        explanation: "AWS Batch ejecuta cargas de cómputo por lotes de cualquier escala y aprovisiona automáticamente los recursos según los trabajos enviados."
        correct: true
      - label: "Amazon Lightsail"
        explanation: "Amazon Lightsail ofrece servidores y sitios sencillos con precio predecible; no gestiona colas de trabajos por lotes."
      - label: "AWS Outposts"
        explanation: "AWS Outposts lleva infraestructura de AWS a tu sitio para baja latencia local; el escenario no pide procesar en sus instalaciones."
      - label: "AWS Elastic Beanstalk"
        explanation: "Elastic Beanstalk sirve para desplegar aplicaciones web; no administra colas de miles de trabajos por lotes."
  - prompt: "Una minera en Antofagasta debe procesar datos en su propia planta con muy baja latencia, usando las mismas APIs de AWS y sin operar ella misma el hardware. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Local Zones"
        explanation: "Las Local Zones están en ubicaciones de AWS cerca de grandes ciudades, no dentro de la planta del cliente."
      - label: "Amazon Lightsail"
        explanation: "Amazon Lightsail se ejecuta en la nube de AWS para proyectos sencillos; no instala capacidad en las instalaciones del cliente."
      - label: "AWS Batch"
        explanation: "AWS Batch gestiona trabajos por lotes en la nube; no lleva infraestructura de AWS a la planta de la minera."
      - label: "AWS Outposts"
        explanation: "AWS Outposts extiende la infraestructura y las APIs de AWS a tus instalaciones, y AWS lo opera y administra; sirve para baja latencia y procesamiento local."
        correct: true
---

## ¿Por qué importa?

Cuatro organizaciones de Latinoamérica llegan a AWS con necesidades muy distintas:

- Un equipo de desarrollo en Quito quiere subir su aplicación web en Java y olvidarse de configurar balanceadores y escalado.
- Una diseñadora independiente en Montevideo quiere publicar el sitio WordPress de su estudio con un precio mensual bajo y predecible.
- Un laboratorio genómico en São Paulo necesita ejecutar miles de análisis que pueden esperar en cola.
- Una minera en Antofagasta necesita procesar datos en su propia planta con muy baja latencia, usando las mismas APIs de AWS.

Amazon EC2 podría servir para todo, pero AWS ofrece servicios más simples o más especializados. El examen te dará el escenario y tendrás que elegir.

## AWS Elastic Beanstalk

**AWS Elastic Beanstalk** permite **desplegar aplicaciones web** en la nube de AWS sin tener que armar la infraestructura a mano. Tú construyes y subes tu aplicación; Elastic Beanstalk **aprovisiona las instancias EC2 (o clústeres de EKS), configura el balanceo de carga, establece el monitoreo de salud y escala el entorno** dinámicamente.

- Admite aplicaciones en Go, Java, .NET, Node.js, PHP, Python y Ruby, además de contenedores Docker.
- Tienes dos modos: **Standard**, que ejecuta las aplicaciones directamente en Amazon EC2, y **Cluster**, que las ejecuta en Amazon EKS.
- **No tiene cargo adicional:** pagas solo los recursos de AWS que consume tu aplicación.

Funciona como una **PaaS** (plataforma como servicio): tú te concentras en el código y AWS se encarga del entorno.

## Amazon Lightsail

**Amazon Lightsail** es, según AWS, la forma más fácil de empezar en AWS para quien necesita **sitios web o aplicaciones web**. Incluye todo lo necesario para lanzar un proyecto rápido por un **precio mensual bajo y predecible**:

- Servidores privados virtuales (instancias) con imágenes listas, como WordPress, LAMP o Nginx.
- Servicios de contenedores, bases de datos administradas (MySQL o PostgreSQL), balanceadores de carga, almacenamiento en bloques y de objetos, distribuciones CDN, IP estáticas, DNS y snapshots.

Está pensado para desarrolladores individuales, aficionados, pequeños proyectos y quien quiere aprender. Si el proyecto crece, puede conectarse con otros servicios de AWS mediante VPC peering.

## AWS Batch

**AWS Batch** ejecuta **cargas de trabajo de cómputo por lotes** (*batch computing*) de cualquier escala. Un **trabajo por lotes** es una tarea que se envía a una cola y se procesa cuando hay recursos, sin interacción del usuario: simulaciones, análisis de datos o entrenamiento de modelos.

- Es **totalmente administrado**: aprovisiona automáticamente los recursos de cómputo según la cantidad y escala de los trabajos enviados.
- No necesitas instalar ni administrar software de procesamiento por lotes.
- Se ejecuta sobre Amazon ECS y Amazon EKS, y usa instancias EC2 (On-Demand o Spot), AWS Fargate o Amazon ECS Managed Instances.

## AWS Outposts

**AWS Outposts** es un servicio totalmente administrado que **extiende la infraestructura, los servicios, las APIs y las herramientas de AWS a las instalaciones del cliente** (*on-premises*).

- Un **Outpost** es un conjunto de capacidad de cómputo y almacenamiento de AWS instalado en tu sitio. **AWS lo opera, monitorea y administra** como parte de una Región.
- Se ofrece como **racks** de 42U o como **servidores** de 1U o 2U para sitios con poco espacio.
- Puedes ejecutar localmente recursos como instancias EC2, volúmenes EBS, clústeres de ECS e instancias de RDS (la disponibilidad depende del formato).
- Es útil cuando necesitas **baja latencia** hacia sistemas locales o **procesar datos localmente**, usando las mismas APIs que en una Región.

Es un ejemplo de **despliegue híbrido**.

## Comparación rápida

| Servicio | Qué resuelve | Para quién | Palabra clave en el examen |
| --- | --- | --- | --- |
| **AWS Elastic Beanstalk** | Desplegar apps web sin gestionar infraestructura | Desarrolladores que quieren enfocarse en el código | "Subir el código y que AWS gestione capacidad, balanceo y escalado" |
| **Amazon Lightsail** | Servidores, sitios y apps sencillos con precio mensual predecible | Principiantes, pequeños proyectos, sitios como WordPress | "Simple", "precio predecible", "sitio web pequeño" |
| **AWS Batch** | Ejecutar trabajos por lotes a cualquier escala | Científicos, ingenieros, equipos de datos | "Trabajos por lotes", "colas de trabajos", "cómputo intensivo" |
| **AWS Outposts** | Ejecutar servicios de AWS en tu propio centro de datos | Empresas con requisitos de latencia o procesamiento local | "On-premises con las mismas APIs de AWS", "híbrido" |

## Trampas típicas del examen

- **Elegir Elastic Beanstalk para un sitio pequeño con precio fijo mensual.** La pista "precio predecible y simple" apunta a **Lightsail**.
- **Pensar que Elastic Beanstalk tiene costo propio.** No tiene cargo adicional; pagas los recursos que crea.
- **Confundir AWS Batch con AWS Lambda.** Batch gestiona colas de trabajos por lotes; Lambda ejecuta funciones cortas basadas en eventos.
- **Creer que Outposts es un centro de datos que administras tú.** El equipo lo instala, opera y mantiene **AWS** en tu sitio.
- **Confundir Outposts con Local Zones.** Las Local Zones están en ubicaciones de AWS cerca de grandes ciudades; Outposts se instala en **tus instalaciones**.

## Resumen para el examen

- Elastic Beanstalk = PaaS: subes el código y AWS gestiona capacidad, balanceo, escalado y salud.
- Elastic Beanstalk no tiene costo adicional; pagas los recursos subyacentes.
- Lightsail = la forma más fácil de empezar, con precio mensual bajo y predecible.
- Lightsail incluye instancias, contenedores, bases de datos, balanceadores y CDN.
- AWS Batch = trabajos por lotes a cualquier escala, con aprovisionamiento automático.
- AWS Outposts = infraestructura y APIs de AWS en tus instalaciones, administrada por AWS.
- Outposts sirve para baja latencia y procesamiento local de datos (híbrido).
