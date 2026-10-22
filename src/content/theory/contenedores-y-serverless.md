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
quiz:
  - prompt: "Una plataforma de delivery de Medellín quiere ejecutar una función corta que genere una miniatura cada vez que un cliente sube la foto de un recibo a Amazon S3, pagando por solicitud y tiempo de ejecución, sin administrar servidores. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon ECR"
        explanation: "Amazon ECR solo guarda imágenes de contenedor; no ejecuta código cuando ocurre un evento."
      - label: "Amazon EC2"
        explanation: "Amazon EC2 te da control total del servidor, pero tú lo administras y pagas por tenerlo encendido aunque no haya eventos."
      - label: "AWS Lambda"
        explanation: "Lambda ejecuta funciones basadas en eventos, como una subida a S3, sin aprovisionar servidores y con pago por solicitud y tiempo de ejecución."
        correct: true
      - label: "Amazon ECS"
        explanation: "Amazon ECS orquesta contenedores; no es un servicio de funciones que se dispare directamente con cada subida a S3."
  - prompt: "El equipo de una fintech de Quito ya usa Kubernetes on-premises y quiere llevar sus aplicaciones a AWS sin reescribirlas, usando las herramientas de la comunidad, con un plano de control administrado por AWS. ¿Qué servicio debe elegir?"
    options:
      - label: "Amazon EKS"
        explanation: "Amazon EKS es Kubernetes administrado: AWS gestiona el plano de control y, al ser compatible con Kubernetes, puedes usar herramientas y aplicaciones de la comunidad sin reescribirlas."
        correct: true
      - label: "Amazon ECS"
        explanation: "Amazon ECS usa el orquestador propio de AWS, no Kubernetes; el escenario menciona Kubernetes, lo que apunta a EKS."
      - label: "Amazon ECR"
        explanation: "Amazon ECR es un registro de imágenes de contenedor; guarda las imágenes, pero no orquesta ni ejecuta los contenedores."
      - label: "AWS Lambda"
        explanation: "Lambda ejecuta funciones basadas en eventos; no es un orquestador de Kubernetes para aplicaciones en contenedores."
  - prompt: "Una startup de Asunción orquesta sus contenedores con Amazon ECS y quiere dejar de aprovisionar, configurar y escalar instancias EC2 para ejecutarlos; solo quiere indicar CPU y memoria por tarea. ¿Qué debe usar?"
    options:
      - label: "Amazon ECR"
        explanation: "Amazon ECR guarda imágenes de contenedor; no aporta la capacidad de cómputo donde se ejecutan las tareas."
      - label: "Instancias Amazon EC2 más grandes"
        explanation: "Cambiar a instancias EC2 más grandes sigue obligando a la startup a elegirlas y administrarlas, justo lo que quiere evitar."
      - label: "AWS Lambda"
        explanation: "Lambda ejecuta funciones basadas en eventos; no es la opción de capacidad sobre la que corren las tareas de Amazon ECS."
      - label: "AWS Fargate"
        explanation: "Fargate es un motor de cómputo serverless para contenedores de ECS y EKS: indicas CPU y memoria y no aprovisionas ni escalas máquinas virtuales."
        correct: true
practice:
  - prompt: "Una empresa de software de Rosario necesita un lugar administrado para guardar, gestionar y compartir sus imágenes de contenedor en repositorios privados, y que además las escanee en busca de vulnerabilidades. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon ECS"
        explanation: "Amazon ECS ejecuta y orquesta contenedores; no es el registro donde se guardan y escanean las imágenes."
      - label: "Amazon ECR"
        explanation: "Amazon ECR es un registro administrado de imágenes de contenedor con repositorios privados o públicos, y puede escanear las imágenes en busca de vulnerabilidades."
        correct: true
      - label: "AWS Fargate"
        explanation: "AWS Fargate es el motor de cómputo serverless donde corren los contenedores; no guarda ni comparte imágenes."
      - label: "AWS Lambda"
        explanation: "AWS Lambda ejecuta funciones basadas en eventos; no es un repositorio de imágenes de contenedor."
  - prompt: "Una cadena de cines de San Salvador quiere orquestar sus contenedores en AWS. Su equipo no usa Kubernetes y busca la forma más simple e integrada, con un orquestador propio de AWS y sin gestionar un plano de control. ¿Qué servicio conviene?"
    options:
      - label: "Amazon ECR"
        explanation: "Amazon ECR solo guarda imágenes de contenedor; no decide dónde se ejecutan los contenedores ni los reinicia."
      - label: "AWS Fargate"
        explanation: "AWS Fargate es un motor de cómputo serverless para contenedores, no un orquestador; necesita trabajar junto con ECS o EKS."
      - label: "Amazon ECS"
        explanation: "Amazon ECS es el servicio de orquestación de contenedores totalmente administrado y propio de AWS, la opción más simple e integrada, sin plano de control que gestionar."
        correct: true
      - label: "AWS Lambda"
        explanation: "AWS Lambda ejecuta funciones basadas en eventos; no es un orquestador de contenedores."
  - prompt: "Un laboratorio de genómica de Lima quiere ejecutar con AWS Lambda un proceso de análisis que tarda unas tres horas en cada ejecución. ¿Por qué Lambda no es la opción adecuada para esta tarea?"
    options:
      - label: "Porque Lambda no escala automáticamente según el tráfico"
        explanation: "Lambda sí escala automáticamente, creando y destruyendo entornos de ejecución según el tráfico; ese no es el problema aquí."
      - label: "Porque Lambda obliga a aprovisionar y parchar servidores"
        explanation: "Lambda ejecuta código sin aprovisionar ni administrar servidores; AWS se encarga del aprovisionamiento y los parches."
      - label: "Porque Lambda solo se puede disparar con subidas a Amazon S3"
        explanation: "Lambda acepta varios disparadores, como Amazon SQS, Amazon EventBridge o Amazon API Gateway, además de Amazon S3."
      - label: "Porque una invocación de una función de eventos puede durar como máximo 15 minutos"
        explanation: "Una invocación de una función de eventos de Lambda dura como máximo 15 minutos (900 segundos); para procesos de horas conviene usar contenedores o AWS Batch."
        correct: true
  - prompt: "El gerente de una empresa de transporte de Santa Cruz de la Sierra cree que \"serverless\" significa que la aplicación corre sin ningún servidor físico. ¿Qué significa realmente serverless?"
    options:
      - label: "Que los servidores existen, pero AWS se encarga de aprovisionarlos, escalarlos, parcharlos y mantenerlos"
        explanation: "Serverless no elimina los servidores: AWS los administra y tú pagas solo por lo que usas, enfocándote en el código."
        correct: true
      - label: "Que la aplicación se ejecuta sin servidores físicos en ninguna parte"
        explanation: "Creer que serverless significa \"sin servidores físicos\" es una trampa típica; los servidores existen, pero no los administras tú."
      - label: "Que tú administras el sistema operativo, pero AWS paga el hardware"
        explanation: "Administrar el sistema operativo corresponde a un modelo como Amazon EC2; en serverless no gestionas los servidores."
      - label: "Que pagas una tarifa fija mensual sin importar el uso"
        explanation: "En serverless pagas por uso, por ejemplo por solicitud y tiempo de ejecución en Lambda, no una tarifa fija."
  - prompt: "Los desarrolladores de una agencia de viajes de Cusco sufren el problema de \"en mi máquina funciona\": en producción fallan las versiones de librerías. ¿Qué concepto empaqueta el código junto con sus dependencias para que la aplicación se ejecute igual de un entorno a otro?"
    options:
      - label: "Un orquestador"
        explanation: "Un orquestador decide dónde se ejecutan los contenedores, los reinicia si fallan y los escala; no empaqueta el código con sus dependencias."
      - label: "Un contenedor"
        explanation: "Un contenedor es una unidad estándar de software que empaqueta el código y sus dependencias para ejecutarse de forma rápida y confiable entre entornos."
        correct: true
      - label: "Un plano de control"
        explanation: "El plano de control es la parte que gestiona el orquestador, como el de Kubernetes en EKS; no empaqueta aplicaciones."
      - label: "Un disparador (trigger) de Lambda"
        explanation: "Un disparador conecta un evento, como una subida a S3, con una función de Lambda; no resuelve las diferencias de librerías entre entornos."
  - prompt: "En una reunión de arquitectura de una aseguradora de Valparaíso, alguien propone \"reemplazar Amazon EKS por AWS Fargate como orquestador\". ¿Qué rol cumple realmente Fargate?"
    options:
      - label: "Es un registro de imágenes de contenedor, como Amazon ECR"
        explanation: "El registro de imágenes es Amazon ECR; Fargate aporta la capacidad de cómputo donde corren los contenedores."
      - label: "Es un servicio de funciones basadas en eventos, como AWS Lambda"
        explanation: "Lambda es el servicio de funciones basadas en eventos; Fargate ejecuta contenedores de ECS y EKS."
      - label: "Es el motor de cómputo serverless donde corren los contenedores; el orquestador sigue siendo ECS o EKS"
        explanation: "Fargate es un motor de cómputo serverless para contenedores que funciona con ECS y EKS; pensar que es un orquestador es una trampa típica."
        correct: true
      - label: "Es un orquestador de Kubernetes que reemplaza el plano de control de EKS"
        explanation: "Fargate no es un orquestador; en EKS, AWS administra el plano de control de Kubernetes y Fargate solo aporta el cómputo."
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
