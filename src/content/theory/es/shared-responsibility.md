---
title: "Modelo de responsabilidad compartida"
summary: "Aprende qué protege AWS (seguridad de la nube), qué proteges tú (seguridad en la nube) y cómo cambia la línea entre Amazon EC2, Amazon RDS y AWS Lambda."
domain: "security-compliance"
order: 1
examTasks: ["2.1"]
services: ["Amazon EC2", "Amazon RDS", "AWS Lambda", "Amazon S3", "Amazon DynamoDB", "AWS IAM"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html"
  - "https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/security-overview-aws-lambda/the-shared-responsibility-model.html"
quiz:
  - prompt: "Una fintech de Santiago de Chile ejecuta su app de pagos en instancias de Amazon EC2. Según el modelo de responsabilidad compartida, ¿qué tarea le corresponde a la fintech?"
    options:
      - label: "La seguridad física de los centros de datos"
        explanation: "La seguridad física de los centros de datos es parte de la seguridad DE la nube, que es responsabilidad de AWS."
      - label: "El sistema operativo del host y la capa de virtualización"
        explanation: "El sistema operativo del host y la virtualización los protege y parcha AWS; no son tarea de la fintech."
      - label: "Parchar el sistema operativo invitado de las instancias"
        explanation: "En Amazon EC2 el cliente instala, configura y parcha el sistema operativo invitado; es el modelo donde más le toca al cliente."
        correct: true
      - label: "La infraestructura de red global de AWS"
        explanation: "El hardware y la infraestructura de red global son responsabilidad de AWS como parte de la seguridad DE la nube."
  - prompt: "Una aseguradora de Bogotá migra su base de datos a Amazon RDS. ¿Qué tarea pasa a ser responsabilidad de AWS?"
    options:
      - label: "Parchar el sistema operativo y el motor de base de datos"
        explanation: "En Amazon RDS, AWS opera el sistema operativo y el motor de base de datos y aplica sus parches durante la ventana de mantenimiento."
        correct: true
      - label: "Elegir la ventana de mantenimiento"
        explanation: "En RDS el cliente decide la ventana de mantenimiento; AWS realiza el mantenimiento dentro de ella."
      - label: "Configurar los security groups que controlan quién se conecta"
        explanation: "Los security groups que controlan las conexiones a la base de datos siguen siendo responsabilidad del cliente en RDS."
      - label: "Gestionar los usuarios de la base de datos"
        explanation: "Los usuarios de la base de datos los gestiona el cliente, junto con el cifrado y los permisos de IAM."
  - prompt: "El equipo de cumplimiento de una minera de Antofagasta clasifica sus controles de TI en AWS. ¿Cuál de estos es un ejemplo de control heredado?"
    options:
      - label: "Parchar el sistema operativo invitado y las aplicaciones"
        explanation: "La gestión de parches es un control compartido: AWS corrige su infraestructura y el cliente parcha su sistema operativo invitado y aplicaciones."
      - label: "Capacitar en seguridad a los empleados"
        explanation: "La concientización y capacitación es un control compartido: AWS capacita a sus empleados y el cliente a los suyos."
      - label: "Decidir en qué entornos de seguridad se enrutan o separan ciertos datos"
        explanation: "Esta decisión depende solo del cliente y de su aplicación, por eso es un control específico del cliente."
      - label: "Los controles físicos y ambientales de los centros de datos"
        explanation: "Los controles físicos y ambientales de los centros de datos son el ejemplo de control heredado: el cliente los hereda por completo de AWS."
        correct: true
practice:
  - prompt: "Una startup de delivery de Lima procesa pedidos con funciones de AWS Lambda. Según el modelo de responsabilidad compartida, ¿qué le corresponde a la startup?"
    options:
      - label: "Parchar el sistema operativo donde corren las funciones"
        explanation: "En Lambda, AWS administra la infraestructura, el sistema operativo y la plataforma, incluido el parcheo."
      - label: "Parchar el runtime de las funciones"
        explanation: "En Lambda, el software principal o runtime lo parcha AWS, no el cliente."
      - label: "La seguridad física de los servidores"
        explanation: "La seguridad física y el hardware son seguridad DE la nube, responsabilidad de AWS en todos los servicios."
      - label: "Las dependencias que incluye en el código de sus funciones"
        explanation: "En Lambda, el cliente es responsable de su código, de las dependencias que incluye, de los permisos de IAM de la función y de sus datos."
        correct: true
  - prompt: "Una agencia de viajes de Cartagena descubre que unos archivos con datos de clientes en Amazon S3 quedaron accesibles para cualquiera. Según el modelo de responsabilidad compartida, ¿quién debía configurar ese acceso?"
    options:
      - label: "AWS, porque administra la infraestructura de Amazon S3"
        explanation: "AWS gestiona la infraestructura y la plataforma de S3, pero no decide quién puede ver tus archivos."
      - label: "La agencia, porque los permisos de acceso a sus datos son responsabilidad del cliente"
        explanation: "En S3 el cliente se encarga de sus datos: opciones de cifrado, clasificación y permisos de acceso mediante IAM."
        correct: true
      - label: "AWS, porque S3 es un servicio muy abstraído"
        explanation: "Más abstracción reduce las tareas operativas del cliente, pero los datos y los permisos de acceso siguen siendo suyos."
      - label: "AWS, porque es un control heredado"
        explanation: "El ejemplo de control heredado son los controles físicos y ambientales de los centros de datos, no los permisos de los datos del cliente."
  - prompt: "En una cadena de restaurantes de Monterrey, AWS configura sus dispositivos de infraestructura y el equipo de TI configura sus sistemas operativos, bases de datos y aplicaciones. ¿Qué tipo de control describe esta situación?"
    options:
      - label: "Un control heredado"
        explanation: "Un control heredado lo hereda el cliente por completo de AWS, como los controles físicos; aquí ambos hacen su parte."
      - label: "Un control específico del cliente"
        explanation: "Un control específico del cliente depende solo del cliente y su aplicación; aquí AWS también configura su infraestructura."
      - label: "Un control compartido"
        explanation: "La gestión de configuración es un control compartido: AWS configura su infraestructura y el cliente sus sistemas operativos, bases de datos y aplicaciones."
        correct: true
      - label: "Seguridad DE la nube, solo a cargo de AWS"
        explanation: "La seguridad DE la nube cubre la infraestructura de AWS; configurar los sistemas del cliente es parte de la seguridad EN la nube."
  - prompt: "Una empresa de videojuegos de Santiago usa las Regiones, Availability Zones y ubicaciones de borde de AWS. ¿Quién es responsable de la seguridad de esa infraestructura?"
    options:
      - label: "AWS, como parte de la seguridad DE la nube"
        explanation: "AWS protege la infraestructura que ejecuta sus servicios, incluidas las Regiones, las Availability Zones y las ubicaciones de borde."
        correct: true
      - label: "La empresa, porque elige en qué Regiones desplegar"
        explanation: "Elegir Regiones no traslada la seguridad de esa infraestructura al cliente; protegerla es seguridad DE la nube."
      - label: "Ambos, como control compartido"
        explanation: "Los controles compartidos son parches, configuración y capacitación; la seguridad de Regiones y AZ es solo de AWS."
      - label: "La empresa, como control específico del cliente"
        explanation: "Los controles específicos del cliente dependen de su aplicación, como separar ciertos datos; no incluyen la infraestructura de AWS."
  - prompt: "Una empresa de logística de Quito compara servicios de AWS para su nueva aplicación. ¿En cuál de estos le tocan más tareas de seguridad, incluido parchar el sistema operativo?"
    options:
      - label: "AWS Lambda"
        explanation: "En Lambda, AWS administra servidores, sistema operativo y runtime; el cliente se encarga de su código, dependencias, permisos y datos."
      - label: "Amazon EC2"
        explanation: "Amazon EC2 es IaaS: el cliente instala, configura y parcha el sistema operativo invitado, el software y las reglas de red; es donde más le toca."
        correct: true
      - label: "Amazon RDS"
        explanation: "En Amazon RDS, AWS parcha el sistema operativo y el motor de base de datos dentro de la ventana de mantenimiento."
      - label: "Amazon DynamoDB"
        explanation: "En DynamoDB, AWS gestiona la infraestructura, el sistema operativo y la plataforma; el cliente se enfoca en sus datos."
  - prompt: "Un hospital de Guadalajara guarda datos de pacientes en Amazon DynamoDB. ¿Quién es responsable de cumplir las leyes y normas que aplican a esos datos?"
    options:
      - label: "AWS, porque DynamoDB es un servicio administrado"
        explanation: "Que el servicio sea administrado reduce tareas operativas, pero no traslada a AWS el cumplimiento de las normas sobre los datos del cliente."
      - label: "AWS, porque gestiona el sistema operativo y la plataforma"
        explanation: "AWS gestiona el sistema operativo y la plataforma de DynamoDB, pero eso no lo hace responsable de las normas que aplican a los datos del hospital."
      - label: "AWS, como control heredado de los centros de datos"
        explanation: "Los controles heredados son los físicos y ambientales de los centros de datos; no cubren el cumplimiento sobre los datos del cliente."
      - label: "El hospital, porque sigue siendo responsable de las normas que aplican a sus datos"
        explanation: "Aunque el servicio sea muy administrado, el cliente sigue siendo responsable de cumplir las leyes y normas que aplican a sus datos."
        correct: true
---

## ¿Por qué importa?

Una fintech en Santiago de Chile lanza su app de pagos sobre AWS. Un día descubre que unos archivos con datos de clientes quedaron accesibles para cualquiera. El gerente pregunta: "¿No se suponía que AWS era seguro?". AWS sí protegía sus centros de datos y su hardware, pero **la configuración de acceso a esos archivos era responsabilidad de la fintech**.

Este malentendido es tan común que AWS lo formaliza en el **modelo de responsabilidad compartida** (*Shared Responsibility Model*), uno de los temas más preguntados del examen.

## Seguridad "de" la nube vs. seguridad "en" la nube

La idea central se resume en dos frases:

- **AWS es responsable de la seguridad DE la nube** (*security OF the cloud*): protege la infraestructura que ejecuta todos sus servicios, es decir, el hardware, el software, las redes y las instalaciones, incluidas las Regiones, las Availability Zones (Zonas de Disponibilidad) y las ubicaciones de borde.
- **El cliente es responsable de la seguridad EN la nube** (*security IN the cloud*): protege lo que construye y almacena en AWS. Cuánto trabajo le toca **depende de los servicios que elija**.

El **sistema operativo invitado** (*guest OS*) es el sistema operativo que corre dentro de tu servidor virtual. El **cifrado** es transformar los datos para que solo quien tenga la clave pueda leerlos.

| Responsabilidad de AWS (de la nube) | Responsabilidad del cliente (en la nube) |
| --- | --- |
| Seguridad física de los centros de datos | Datos del cliente y su clasificación |
| Hardware e infraestructura de red global | Cifrado de datos (elegir y configurar) |
| Sistema operativo del host y capa de virtualización | Sistema operativo invitado de EC2 y sus parches |
| Regiones, Availability Zones y ubicaciones de borde | Aplicaciones y código que despliega |
| | Reglas de los security groups (firewall virtual) |
| | Permisos de IAM (quién puede hacer qué) |

## Los componentes del modelo: tres tipos de controles

AWS clasifica los **controles de TI** (medidas de seguridad) en tres grupos:

- **Controles heredados** (*inherited controls*): el cliente los hereda por completo de AWS. Ejemplo: los controles físicos y ambientales de los centros de datos.
- **Controles compartidos** (*shared controls*): aplican tanto a la infraestructura como a lo que hace el cliente, cada uno en su contexto:
  - **Gestión de parches**: AWS corrige su infraestructura; el cliente parcha su sistema operativo invitado y sus aplicaciones.
  - **Gestión de configuración**: AWS configura sus dispositivos de infraestructura; el cliente configura sus sistemas operativos, bases de datos y aplicaciones.
  - **Concientización y capacitación**: AWS capacita a sus empleados; el cliente capacita a los suyos.
- **Controles específicos del cliente** (*customer-specific controls*): dependen solo del cliente y de su aplicación. Ejemplo: decidir en qué entornos de seguridad se enrutan o separan ciertos datos.

## La responsabilidad cambia según el servicio

La línea divisoria no es fija: se mueve según cuánto administra AWS.

- **Amazon EC2 (IaaS, infraestructura como servicio):** recibes servidores virtuales. Tú instalas, configuras y **parchas el sistema operativo invitado**, el software y las reglas de red. Es el modelo donde más le toca al cliente.
- **Amazon RDS (base de datos administrada):** AWS opera el hardware, el **sistema operativo** y el **motor de base de datos**, y realiza su mantenimiento (incluidos parches de seguridad) durante una **ventana de mantenimiento**. El cliente no administra el sistema operativo, pero sí decide la ventana, cuándo aplicar actualizaciones opcionales, los security groups que controlan quién se conecta, los usuarios de la base de datos, el cifrado y los permisos de IAM.
- **AWS Lambda (serverless, sin servidores que administrar):** AWS administra la infraestructura, el sistema operativo y la plataforma donde corren las funciones, incluido el parcheo. El cliente es responsable de **su código**, de las **dependencias** que incluye, de los **permisos de IAM** de la función y de sus datos.

| Tarea | Amazon EC2 | Amazon RDS | AWS Lambda |
| --- | --- | --- | --- |
| Seguridad física y hardware | AWS | AWS | AWS |
| Parchar el sistema operativo | **Cliente** | AWS | AWS |
| Parchar el software principal (motor o runtime) | Cliente | AWS (el cliente elige la ventana) | AWS |
| Código de la aplicación | Cliente | Cliente (consultas y esquema) | **Cliente** |
| Reglas de red (security groups) | Cliente | Cliente | Cliente (si la función se conecta a una VPC) |
| Permisos de IAM | Cliente | Cliente | Cliente |
| Cifrado y clasificación de datos | Cliente | Cliente | Cliente |

En servicios aún más abstraídos, como **Amazon S3** o **Amazon DynamoDB**, AWS gestiona la infraestructura, el sistema operativo y la plataforma; el cliente se enfoca en sus datos: opciones de cifrado, clasificación y permisos de acceso mediante IAM.

Observa el patrón: **cuanto más administrado es el servicio, menos tareas operativas tienes, pero los datos, el cifrado y los permisos de acceso siempre son tuyos**. Además, el cliente sigue siendo responsable de cumplir las leyes y normas que aplican a sus datos.

## Trampas típicas del examen

- **"AWS parcha el sistema operativo de mis instancias EC2."** Falso: en EC2 el sistema operativo invitado lo parcha el cliente. AWS parcha el host y la virtualización.
- **"En Amazon RDS yo parcho el sistema operativo de la base de datos."** Falso: AWS lo hace; tú eliges la ventana de mantenimiento.
- **"Con AWS Lambda no tengo ninguna responsabilidad de seguridad."** Falso: tu código, sus dependencias y los permisos de IAM de la función son tuyos.
- **"Si uso S3, AWS decide quién puede ver mis archivos."** Falso: los permisos y el cifrado de los datos siempre son responsabilidad del cliente.
- **Confundir "de" y "en".** AWS = seguridad **de** la nube (infraestructura). Cliente = seguridad **en** la nube (lo que pone dentro).
- **Olvidar los controles compartidos.** Parches, configuración y capacitación aparecen como respuesta cuando la pregunta pide algo que hacen "ambos".

## Resumen para el examen

- AWS: seguridad DE la nube (hardware, instalaciones, red, virtualización).
- Cliente: seguridad EN la nube (datos, cifrado, aplicaciones, IAM y, según el servicio, sistema operativo y red).
- Controles heredados (físicos), compartidos (parches, configuración, capacitación) y específicos del cliente.
- EC2: el cliente parcha el sistema operativo invitado.
- RDS: AWS parcha sistema operativo y motor; el cliente gestiona acceso, usuarios, cifrado y la ventana de mantenimiento.
- Lambda: AWS gestiona servidores y runtime; el cliente gestiona código, dependencias y permisos.
- Más abstracción = menos tareas para el cliente, pero los datos y permisos siempre son suyos.
