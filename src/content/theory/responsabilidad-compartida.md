---
title: "Modelo de responsabilidad compartida"
summary: "Aprende qué protege AWS (seguridad de la nube), qué proteges tú (seguridad en la nube) y cómo cambia según el tipo de servicio."
domain: "security-compliance"
order: 1
services: ["Amazon EC2", "Amazon S3", "Amazon DynamoDB", "AWS IAM"]
readingMinutes: 4
sources:
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
---

## ¿Por qué importa?

Una fintech en Santiago de Chile lanza su app de pagos sobre AWS. Un día descubre que unos archivos con datos de clientes quedaron accesibles para cualquiera. El gerente pregunta: "¿No se suponía que AWS era seguro?". AWS sí protegía sus centros de datos y su hardware, pero **la configuración de acceso a esos archivos era responsabilidad de la fintech**.

Este malentendido es tan común que AWS lo formaliza en el **modelo de responsabilidad compartida** (*Shared Responsibility Model*), uno de los temas más preguntados del examen.

## Seguridad "de" la nube vs. seguridad "en" la nube

La idea central se resume en dos frases:

- **AWS es responsable de la seguridad DE la nube** (*security OF the cloud*): protege la infraestructura que ejecuta todos sus servicios, es decir, el hardware, el software, las redes y las instalaciones, incluidas las Regiones, las Availability Zones (Zonas de Disponibilidad) y las ubicaciones de borde.
- **El cliente es responsable de la seguridad EN la nube** (*security IN the cloud*): protege lo que construye y almacena en AWS, como sus datos, sus opciones de cifrado, el sistema operativo invitado, sus aplicaciones y la configuración de firewall.

El **sistema operativo invitado** (*guest OS*) es el sistema operativo que corre dentro de tu servidor virtual. El **cifrado** es transformar los datos para que solo quien tenga la clave pueda leerlos.

| Responsabilidad de AWS (de la nube) | Responsabilidad del cliente (en la nube) |
| --- | --- |
| Seguridad física de los centros de datos | Datos del cliente y su clasificación |
| Hardware e infraestructura de red global | Cifrado de datos (elegir y configurar) |
| Sistema operativo del host y capa de virtualización | Sistema operativo invitado de EC2 y sus parches |
| Regiones, Availability Zones y ubicaciones de borde | Aplicaciones que instala |
| | Reglas de los security groups (firewall virtual) |
| | Permisos de IAM (quién puede hacer qué) |

## Controles compartidos

Algunos controles los operan **ambas partes**, cada una en su propio contexto. AWS menciona tres:

- **Gestión de parches** (*patch management*): AWS corrige fallos en su infraestructura; el cliente parcha su sistema operativo invitado y sus aplicaciones.
- **Gestión de configuración** (*configuration management*): AWS configura sus dispositivos de infraestructura; el cliente configura sus sistemas operativos, bases de datos y aplicaciones.
- **Concientización y capacitación** (*awareness and training*): AWS capacita a sus empleados; el cliente capacita a los suyos.

## La responsabilidad cambia según el servicio

La línea divisoria no es fija: se mueve según cuánto administra AWS en cada servicio.

- **Amazon EC2 (IaaS):** el cliente asume casi toda la configuración y gestión de seguridad, incluidos el sistema operativo invitado, el software instalado y los security groups.
- **Servicios abstraídos, como Amazon S3 o Amazon DynamoDB:** AWS administra la infraestructura, el sistema operativo y la plataforma. El cliente se enfoca en sus datos: opciones de cifrado, clasificación de activos y permisos de acceso mediante IAM.

| Tarea | Amazon EC2 | Amazon S3 / DynamoDB |
| --- | --- | --- |
| Parchar el sistema operativo | Cliente | AWS |
| Proteger el hardware físico | AWS | AWS |
| Configurar quién accede a los datos | Cliente | Cliente |
| Decidir si se cifran los datos | Cliente | Cliente |

Observa el patrón: **los datos y los permisos de acceso siempre son del cliente**, sin importar el servicio.

## Trampas típicas del examen

- **"AWS parcha el sistema operativo de mis instancias EC2."** Falso: en EC2 el sistema operativo invitado lo parcha el cliente. AWS parcha el host y la virtualización.
- **"Si uso S3, AWS decide quién puede ver mis archivos."** Falso: los permisos y el cifrado de los datos siempre son responsabilidad del cliente.
- **Confundir "de" y "en".** AWS = seguridad **de** la nube (infraestructura). Cliente = seguridad **en** la nube (lo que pone dentro).
- **Olvidar los controles compartidos.** Parches, configuración y capacitación aparecen como respuesta cuando la pregunta pide algo que hacen "ambos".

## Resumen para el examen

- AWS: seguridad DE la nube (hardware, instalaciones, red, virtualización).
- Cliente: seguridad EN la nube (datos, cifrado, sistema operativo invitado, aplicaciones, security groups, IAM).
- Controles compartidos: gestión de parches, gestión de configuración, capacitación.
- En EC2 el cliente gestiona mucho más que en S3 o DynamoDB.
- En servicios abstraídos, AWS gestiona sistema operativo y plataforma.
- Los datos y los permisos siempre son del cliente.
