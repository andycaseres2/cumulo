---
title: "Formas de acceder y aprovisionar: consola, CLI, SDK e IaC"
summary: "Compara la consola, la CLI, los SDK, las APIs y la infraestructura como código (CloudFormation) para decidir cómo operar en AWS en cada escenario."
domain: "technology-services"
order: 1
examTasks: ["3.1"]
services: ["AWS Management Console", "AWS CLI", "AWS CloudFormation", "AWS CDK"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html"
  - "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html"
  - "https://docs.aws.amazon.com/sdkref/latest/guide/overview.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"
---

## ¿Por qué importa?

Una fintech en Lima empieza con un solo desarrollador que crea su primer servidor haciendo clics en el navegador. Un año después tiene tres ambientes (desarrollo, pruebas y producción) que deben ser idénticos, un equipo que automatiza tareas con scripts y una app que necesita subir archivos a AWS desde su propio código. Además, el regulador le pide poder reconstruir toda su infraestructura en otra Región si ocurre un desastre.

Cada una de esas necesidades se resuelve con una forma distinta de acceder a AWS. El examen te pedirá elegir la adecuada según el escenario.

## Todo en AWS es una API

Una **API** (*Application Programming Interface*) es un conjunto de operaciones que un programa puede invocar. En AWS, **toda acción** (crear una instancia, borrar un bucket, leer una tabla) termina siendo una llamada a la API pública del servicio, hecha por HTTPS y firmada con credenciales. Las demás herramientas son formas más cómodas de hacer esas llamadas:

- **AWS Management Console:** la interfaz web en el navegador. Es visual, no requiere programar y es ideal para aprender, explorar servicios o hacer tareas puntuales.
- **AWS CLI** (*Command Line Interface*): herramienta de código abierto para interactuar con los servicios mediante **comandos** en la terminal (bash, zsh, PowerShell o el símbolo del sistema de Windows). Da acceso directo a las APIs públicas y permite escribir **scripts** para automatizar tareas. AWS indica que las funciones de administración de IaaS disponibles en la consola también están disponibles en la API y en la CLI.
- **AWS SDKs** (*Software Development Kits*): librerías para lenguajes como Python (Boto3), Java, JavaScript, .NET, Go, PHP, Ruby y otros. Se usan **dentro del código de tu aplicación** y se encargan de detalles como firmar las solicitudes, reintentar y manejar errores.
- **Query API / API directa:** llamadas HTTPS de bajo nivel. Es el acceso más directo, pero tu aplicación debe encargarse de firmar las solicitudes y manejar errores, por eso normalmente se prefiere un SDK.

A la CLI, los SDK y las APIs se les llama en conjunto **acceso programático**.

## Infraestructura como código (IaC) con AWS CloudFormation

La **infraestructura como código** (*Infrastructure as Code*, IaC) consiste en describir tus recursos en archivos de texto y dejar que una herramienta los cree por ti, en lugar de crearlos a mano.

**AWS CloudFormation** es el servicio de IaC de AWS:

- Escribes una **plantilla** (*template*) en formato **JSON o YAML** que describe todos los recursos y sus propiedades (por ejemplo, instancias de Amazon EC2, un balanceador de carga y una base de datos de Amazon RDS).
- Al usar la plantilla, CloudFormation crea un **stack** (pila): el conjunto de recursos que se gestiona **como una sola unidad**. CloudFormation resuelve las dependencias y aprovisiona todo en el orden correcto. Si eliminas el stack, se eliminan sus recursos.
- Puedes **reutilizar** la misma plantilla para crear los mismos recursos una y otra vez, en la misma Región o en varias Regiones y cuentas, de forma **consistente y repetible**.
- Como las plantillas son archivos de texto, puedes guardarlas en un sistema de control de versiones y saber qué cambió, quién lo cambió y cuándo, y volver a una versión anterior si algo falla.

**AWS CDK** (*Cloud Development Kit*) permite definir la infraestructura con lenguajes de programación conocidos; el CDK la aprovisiona a través de CloudFormation.

## Operaciones únicas vs procesos repetibles

El examen evalúa si sabes cuándo basta con una acción manual y cuándo conviene automatizar.

| Situación | Enfoque recomendado | Herramienta típica |
| --- | --- | --- |
| Explorar un servicio nuevo o hacer una prueba rápida | Operación única, manual | AWS Management Console |
| Tarea administrativa que se repite (por ejemplo, listar o detener recursos cada noche) | Script automatizado | AWS CLI |
| Una aplicación que debe usar servicios de AWS desde su código | Integración programática | AWS SDKs |
| Ambientes idénticos (desarrollo, pruebas, producción) o despliegue en varias Regiones | Proceso repetible y versionado | AWS CloudFormation (IaC) |
| Reconstruir la infraestructura tras un desastre | Proceso repetible | AWS CloudFormation (IaC) |

La idea clave: la consola es cómoda para tareas **puntuales**, pero los clics no se pueden repetir de forma exacta ni auditar fácilmente. Cuando un proceso debe ser **repetible, consistente y sin errores humanos**, la respuesta es la **automatización**: scripts con la CLI o, para infraestructura completa, **IaC**. AWS recomienda desplegar con IaC para poder reconstruir rápidamente una carga de trabajo en una Región de recuperación ante desastres.

## Modelos de despliegue: nube, híbrido y on-premises

Esta tarea del examen también incluye identificar el **modelo de despliegue**:

- **Nube (*cloud*):** toda la aplicación se ejecuta en la nube.
- **Híbrido:** conecta recursos en la nube con infraestructura existente fuera de ella, normalmente un centro de datos propio.
- **On-premises (nube privada):** recursos desplegados en instalaciones propias con herramientas de virtualización; no ofrece muchos de los beneficios de la nube.

Este tema se trata con más detalle en el tema de modelos de servicio y despliegue.

## Trampas típicas del examen

- **Elegir la consola para algo que debe repetirse muchas veces.** Si el escenario dice "repetible", "consistente" o "varios ambientes", piensa en **CloudFormation**.
- **Confundir CLI con SDK.** La CLI se usa desde la **terminal**; el SDK se usa **dentro del código** de una aplicación.
- **Creer que CloudFormation es un servicio de monitoreo o de despliegue de código.** Es para **aprovisionar infraestructura** a partir de plantillas.
- **Pensar que la consola es la única forma de acceso.** Todo se puede hacer por API, y la CLI y los SDK usan esas mismas APIs.
- **Olvidar el stack.** Los recursos de una plantilla se gestionan juntos como un **stack**: se crean, actualizan y eliminan como unidad.

## Resumen para el examen

- Toda acción en AWS es una llamada a una API.
- Consola = interfaz web; ideal para aprender y para tareas puntuales.
- CLI = comandos en la terminal; ideal para scripts y automatización.
- SDK = librerías por lenguaje para usar AWS desde el código de una aplicación.
- IaC = describir la infraestructura en archivos de texto.
- CloudFormation: plantillas JSON/YAML → stacks gestionados como una unidad.
- Plantillas reutilizables en varias Regiones y cuentas; versionables como código.
- Operación única → consola; proceso repetible → CLI o IaC.
- Modelos de despliegue: nube, híbrido y on-premises.
