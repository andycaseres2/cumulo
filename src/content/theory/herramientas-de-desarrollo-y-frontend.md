---
title: "Herramientas para desarrolladores y frontend"
summary: "Herramientas para desarrollar, desplegar y diagnosticar aplicaciones (CodeBuild, CodePipeline, X-Ray, AWS CLI y SDKs) y AWS Amplify para apps web y móviles."
domain: "technology-services"
order: 18
examTasks: ["3.8"]
services: ["AWS CodeBuild", "AWS CodePipeline", "AWS X-Ray", "AWS Amplify", "AWS CLI"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/developer-tools.html"
  - "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"
  - "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html"
  - "https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html"
  - "https://aws.amazon.com/amplify/"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-out-of-scope-services.html"
quiz:
  - prompt: "Una fintech de São Paulo quiere que su código se compile, se ejecuten las pruebas y se produzcan paquetes listos para desplegar, sin aprovisionar ni administrar servidores de compilación. ¿Qué servicio debe usar?"
    options:
      - label: "AWS CodePipeline"
        explanation: "CodePipeline orquesta el flujo completo de entrega; la etapa que compila y prueba dentro de ese flujo es CodeBuild."
      - label: "AWS CodeBuild"
        explanation: "CodeBuild es un servicio de compilación totalmente administrado que compila el código fuente, ejecuta pruebas y produce paquetes listos para desplegar."
        correct: true
      - label: "AWS X-Ray"
        explanation: "X-Ray rastrea solicitudes para encontrar cuellos de botella y errores; no compila ni prueba código."
      - label: "AWS Amplify"
        explanation: "Amplify sirve para crear y desplegar aplicaciones web y móviles; no es el servicio de compilación y pruebas que pide el escenario."
  - prompt: "La app de una empresa de Buenos Aires se vuelve lenta en horas pico. El equipo quiere seguir cada solicitud a través de sus microservicios, bases de datos y APIs, y ver un mapa de trazas para encontrar el cuello de botella. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon CloudWatch"
        explanation: "CloudWatch monitorea métricas, logs y alarmas, pero el servicio de rastreo distribuido que sigue cada solicitud y genera el mapa de trazas es X-Ray."
      - label: "AWS CloudTrail"
        explanation: "CloudTrail audita quién hizo qué llamada a la API; no mide el rendimiento de las solicitudes de la aplicación."
      - label: "AWS CodePipeline"
        explanation: "CodePipeline automatiza la entrega continua del software; no diagnostica la latencia de las solicitudes."
      - label: "AWS X-Ray"
        explanation: "X-Ray hace rastreo distribuido y genera un mapa de trazas con el cliente, el servicio frontal y los servicios de backend para encontrar cuellos de botella."
        correct: true
  - prompt: "El equipo frontend de una startup de Montevideo quiere publicar su app web en React conectando su repositorio de GitHub, para que cada cambio se despliegue automáticamente en la CDN global de AWS sin administrar infraestructura. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Amplify"
        explanation: "Amplify Hosting ofrece un flujo basado en Git con despliegue continuo: cada cambio del repositorio se publica en la CDN global de AWS."
        correct: true
      - label: "Amazon EC2"
        explanation: "Con EC2 el equipo tendría que administrar servidores; para un frontend con despliegue continuo desde Git la respuesta es Amplify."
      - label: "AWS CodeBuild"
        explanation: "CodeBuild compila y prueba código, pero no aloja ni publica la app web en la CDN global."
      - label: "AWS X-Ray"
        explanation: "X-Ray diagnostica el rendimiento de las solicitudes; no aloja ni despliega aplicaciones web."
---

## ¿Por qué importa?

Una fintech de São Paulo con equipos en Argentina y Uruguay publica cambios en su aplicación varias veces al día. Antes, un desarrollador compilaba el código en su laptop, ejecutaba pruebas a mano y subía los archivos al servidor. Los errores eran frecuentes y nadie sabía por qué la app se volvía lenta en horas pico.

AWS ofrece herramientas para **automatizar la compilación y la entrega** del software, para **encontrar la causa de los problemas de rendimiento** y para **publicar aplicaciones web y móviles** sin administrar servidores. El examen te pedirá identificar cuál usar en cada caso.

## CI/CD: el concepto

- **Integración continua (CI)**: cada vez que alguien sube código al repositorio, se **compila y se prueba automáticamente**. Los errores se detectan pronto.
- **Entrega o despliegue continuo (CD)**: los cambios que pasan las pruebas avanzan **automáticamente** hacia los entornos de prueba y producción.

Un **pipeline** (canalización) es la secuencia automatizada de etapas: código fuente → compilación → pruebas → despliegue.

## AWS CodeBuild: compilar y probar

**AWS CodeBuild** es un servicio de compilación **totalmente administrado** que **compila el código fuente, ejecuta pruebas y produce paquetes** listos para desplegar. No necesitas aprovisionar ni administrar servidores de compilación: escala de forma continua y procesa varias compilaciones al mismo tiempo, así que no quedan esperando en cola. Puedes usar entornos de compilación preconfigurados o personalizados.

## AWS CodePipeline: orquestar la entrega

**AWS CodePipeline** es un servicio de **entrega continua** totalmente administrado que **automatiza tus pipelines de publicación**. Cada vez que hay un cambio en el código, ejecuta las fases de **compilación, prueba y despliegue** según el modelo que definas. Se integra con servicios de terceros como GitHub y, por supuesto, con CodeBuild. Pagas solo por lo que usas.

Relación clave: **CodePipeline orquesta** todo el flujo; **CodeBuild** es la etapa que compila y prueba dentro de ese flujo.

## AWS X-Ray: diagnosticar aplicaciones distribuidas

**AWS X-Ray** recopila datos sobre las **solicitudes** que atiende tu aplicación y te da herramientas para analizarlas. Para cada solicitud rastreada muestra el detalle de la petición y de las llamadas que hace la aplicación a otros recursos: microservicios, bases de datos, APIs web y servicios de AWS.

Esto se llama **rastreo distribuido** (*distributed tracing*). Con los datos de las trazas, X-Ray genera un **mapa de trazas** (*trace map*) que muestra el cliente, el servicio frontal y los servicios de backend. Sirve para encontrar **cuellos de botella**, picos de latencia y errores, tanto en desarrollo como en producción.

**X-Ray vs. CloudWatch vs. CloudTrail:** X-Ray sigue el recorrido de una solicitud a través de los servicios; CloudWatch monitorea métricas, logs y alarmas; CloudTrail audita quién hizo qué llamada a la API.

## AWS CLI y SDKs: acceso programático

- **AWS CLI** (*Command Line Interface*): herramienta de código abierto para interactuar con los servicios de AWS mediante **comandos en la terminal** (Linux, macOS o Windows). Permite hacer desde la línea de comandos lo mismo que en la consola web y **automatizar tareas con scripts**.
- **AWS SDKs** (*Software Development Kits*): bibliotecas para lenguajes como Java, Python, Ruby o .NET que permiten llamar a los servicios de AWS **desde el código** de tu aplicación.

Ambos son formas de **acceso programático** a las APIs de AWS, a diferencia del uso manual de la AWS Management Console.

## AWS Amplify: frontend web y móvil

El **frontend** es la parte de la aplicación que ve y usa el usuario (la página web o la app del teléfono). **AWS Amplify** reúne lo necesario para **crear y desplegar aplicaciones web y móviles**.

- **Amplify Hosting**: flujo de trabajo **basado en Git** para alojar aplicaciones web *full-stack* serverless con **despliegue continuo**. Conectas tu repositorio (GitHub, Bitbucket, GitLab o AWS CodeCommit) y cada cambio se publica automáticamente en la **CDN global de AWS**.
- Compatible con frameworks populares como React, Angular, Vue.js, Next.js y generadores de sitios estáticos.
- Ofrece ramas por entorno (producción, pruebas), dominios personalizados y vistas previas de *pull requests*.
- Permite definir el **backend** de la aplicación (por ejemplo, autenticación y datos) con un enfoque basado en código.

Si el escenario dice "un equipo frontend quiere publicar su app web o móvil rápido, sin administrar infraestructura", la respuesta es **Amplify**.

## Lo que está fuera de alcance

La lista oficial de servicios **fuera de alcance** del CLF-C02 incluye, entre las herramientas para desarrolladores, a AWS CodeDeploy, AWS CodeArtifact, Amazon CodeGuru, AWS CloudShell, AWS Device Farm y AWS Application Composer. Basta con reconocer sus nombres; el examen se concentra en CodeBuild, CodePipeline, X-Ray, AWS CLI y Amplify.

## Trampas típicas del examen

- **Confundir CodeBuild con CodePipeline.** CodeBuild compila y prueba; CodePipeline automatiza el flujo completo de entrega.
- **Elegir CloudWatch para seguir una solicitud entre microservicios.** Para rastreo distribuido y mapa de servicios, la respuesta es **X-Ray**.
- **Elegir CloudTrail para diagnosticar latencia.** CloudTrail registra llamadas a la API para auditoría, no el rendimiento de las solicitudes.
- **Elegir EC2 para hospedar un frontend simple.** Para apps web y móviles con despliegue continuo desde Git, la respuesta es **Amplify**.

## Resumen para el examen

- CI = compilar y probar automáticamente; CD = entregar automáticamente lo que pasa las pruebas.
- CodeBuild = compilación y pruebas administradas, sin servidores propios.
- CodePipeline = entrega continua que orquesta fuente → compilación → prueba → despliegue.
- X-Ray = rastreo distribuido y mapa de trazas para encontrar cuellos de botella y errores.
- AWS CLI = comandos en la terminal; SDKs = acceso desde el código.
- Amplify = crear y desplegar apps web y móviles con despliegue continuo desde Git.
