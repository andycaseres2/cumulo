---
title: "Contenedores y serverless: ECS, EKS, Fargate y Lambda"
summary: "Qué es un contenedor, cuándo usar Amazon ECS o Amazon EKS, para qué sirve Amazon ECR y cómo AWS Fargate y AWS Lambda eliminan la gestión de servidores."
domain: "technology-services"
order: 5
examTasks: ["3.3"]
services: ["Amazon ECS", "Amazon EKS", "Amazon ECR", "AWS Fargate", "AWS Lambda"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
  - "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"
  - "https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html"
  - "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"
  - "https://docs.aws.amazon.com/eks/latest/userguide/fargate.html"
  - "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
  - "https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html"
---

## ¿Por qué importa?

Una plataforma de delivery en Medellín tiene una app dividida en pequeños servicios: pedidos, pagos y seguimiento de repartidores. En la laptop de los desarrolladores todo funciona, pero en producción fallan las versiones de librerías. Además, cada vez que un cliente sube la foto de un recibo, hay que generar una miniatura, y esa tarea ocurre solo unas cuantas veces por minuto.

Los **contenedores** resuelven el problema de "en mi máquina funciona", y el modelo **serverless** permite ejecutar código solo cuando ocurre un evento, sin mantener servidores encendidos. El examen te pedirá elegir entre ECS, EKS, Fargate y Lambda.

## ¿Qué es un contenedor?

Un **contenedor** es una unidad estándar de software que **empaqueta el código y sus dependencias** para que la aplicación se ejecute de forma rápida y confiable de un entorno a otro. A partir de una **imagen de contenedor** (la plantilla con el código y sus dependencias) se ejecutan los contenedores. Las imágenes Docker y OCI (*Open Container Initiative*) son formatos habituales.

Los contenedores son livianos y portables, pero cuando tienes decenas o cientos necesitas un **orquestador**: un servicio que decide dónde se ejecutan, los reinicia si fallan y los escala.

## Amazon ECS, Amazon EKS y Amazon ECR

- **Amazon Elastic Container Service (Amazon ECS):** servicio de **orquestación de contenedores totalmente administrado**, propio de AWS. Trae integradas las mejores prácticas de configuración y operación de AWS y se integra con herramientas como Amazon ECR y Docker. No tienes que gestionar un plano de control (*control plane*).
- **Amazon Elastic Kubernetes Service (Amazon EKS):** servicio de **Kubernetes administrado**. **Kubernetes** es un orquestador de contenedores de código abierto muy usado en la industria. En EKS, AWS administra el plano de control de Kubernetes; con **EKS Auto Mode**, AWS también administra los nodos donde corren las cargas. EKS está certificado como compatible con Kubernetes, así que puedes usar herramientas y aplicaciones de la comunidad sin reescribirlas.
- **Amazon Elastic Container Registry (Amazon ECR):** **registro de imágenes de contenedor** administrado. Guardas, gestionas y compartes tus imágenes en repositorios privados (o públicos) y los usas desde ECS o EKS. Puede escanear imágenes en busca de vulnerabilidades.

| Pregunta | Amazon ECS | Amazon EKS |
| --- | --- | --- |
| ¿Qué orquestador usa? | El de AWS | Kubernetes (código abierto) |
| ¿Cuándo elegirlo? | Quieres la forma más simple e integrada de ejecutar contenedores en AWS | Ya usas Kubernetes, quieres portabilidad o herramientas de su ecosistema |
| ¿Dónde se ejecutan los contenedores? | Instancias EC2, AWS Fargate u otras opciones de capacidad | Instancias EC2, AWS Fargate u otras opciones de capacidad |

ECR no ejecuta contenedores: **solo guarda las imágenes**.

## AWS Fargate: contenedores sin servidores

Los contenedores de ECS o EKS necesitan capacidad de cómputo. Puedes usar **instancias EC2** que tú eliges y administras, o usar **AWS Fargate**.

**AWS Fargate** es un motor de cómputo **serverless** y de pago por uso para contenedores. Con Fargate:

- No aprovisionas, configuras ni escalas máquinas virtuales.
- No eliges tipos de servidor ni decides cuándo escalar el clúster.
- Empaquetas tu aplicación en contenedores, indicas CPU y memoria, defines la red y los permisos, y la lanzas.
- Cada tarea (en ECS) o Pod (en EKS) tiene su propio límite de aislamiento y no comparte kernel, CPU ni memoria con otras.

Fargate funciona con **Amazon ECS y Amazon EKS**.

## AWS Lambda: funciones serverless

**Serverless** (sin servidor) no significa que no haya servidores, sino que **tú no los administras**: AWS se encarga del aprovisionamiento, el escalado, los parches y el mantenimiento, y pagas solo por lo que usas.

**AWS Lambda** es un servicio de cómputo serverless que **ejecuta código sin aprovisionar ni administrar servidores**:

- **Basado en eventos:** escribes una función y la conectas a un disparador (*trigger*), por ejemplo una subida a Amazon S3, un mensaje de Amazon SQS, una regla de Amazon EventBridge o una solicitud de Amazon API Gateway. Lambda la ejecuta cuando ocurre el evento.
- **Escala automáticamente:** crea y destruye entornos de ejecución según el tráfico.
- **Pago por uso:** sin compromisos por adelantado; en las funciones de eventos pagas por solicitud y por el tiempo de ejecución.
- **Duración limitada:** una invocación de una función de eventos puede durar **como máximo 15 minutos (900 segundos)**. Para procesos muy largos, considera otras opciones como contenedores o AWS Batch.

En el ejemplo inicial, generar la miniatura cuando se sube un recibo a S3 es un caso típico de Lambda.

## ¿Cuál elijo?

| Escenario | Opción |
| --- | --- |
| Ejecutar código corto en respuesta a eventos, sin servidores | **AWS Lambda** |
| Ejecutar contenedores sin administrar servidores | **AWS Fargate** (con ECS o EKS) |
| Orquestar contenedores con la herramienta nativa de AWS | **Amazon ECS** |
| Orquestar contenedores con Kubernetes | **Amazon EKS** |
| Guardar imágenes de contenedor | **Amazon ECR** |
| Control total del sistema operativo del servidor | **Amazon EC2** |

## Trampas típicas del examen

- **Pensar que Fargate es un orquestador.** Fargate es el **motor de cómputo serverless**; el orquestador es ECS o EKS.
- **Confundir ECR con ECS.** ECR **guarda** imágenes; ECS **ejecuta y orquesta** contenedores.
- **Elegir ECS cuando el escenario menciona Kubernetes.** "Kubernetes" apunta a **EKS**.
- **Usar Lambda para procesos de varias horas.** Una invocación de una función de eventos puede durar como máximo 15 minutos.
- **Creer que serverless significa "sin servidores físicos".** Los servidores existen, pero AWS los administra.

## Resumen para el examen

- Contenedor = código + dependencias empaquetados; portable entre entornos.
- ECS = orquestador de contenedores administrado, propio de AWS.
- EKS = Kubernetes administrado; AWS gestiona el plano de control.
- ECR = registro de imágenes de contenedor.
- Fargate = cómputo serverless para contenedores de ECS y EKS.
- Lambda = funciones serverless basadas en eventos, con pago por uso.
- Una invocación de Lambda (función de eventos) puede durar como máximo 15 minutos.
- Serverless = AWS administra servidores, escalado y parches; tú te enfocas en el código.
