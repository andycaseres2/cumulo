---
title: "Aplicaciones de negocio, escritorios virtuales e IoT"
summary: "Amazon Connect para centros de contacto, SES para correo, WorkSpaces, AppStream 2.0 y Secure Browser para escritorios y apps, y AWS IoT Core para dispositivos."
domain: "technology-services"
order: 19
examTasks: ["3.8"]
services: ["Amazon Connect", "Amazon SES", "Amazon WorkSpaces", "Amazon AppStream 2.0", "Amazon WorkSpaces Secure Browser", "AWS IoT Core"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/business-applications.html"
  - "https://docs.aws.amazon.com/ses/latest/dg/Welcome.html"
  - "https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html"
  - "https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/end-user-computing.html"
  - "https://aws.amazon.com/workspaces/secure-browser/"
  - "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html"
---

## ¿Por qué importa?

Una aseguradora en Quito necesita un centro de llamadas para atender reclamos, enviar por correo las pólizas y los recordatorios de pago, dar a sus agentes remotos un escritorio de trabajo seguro sin entregarles laptops corporativas y, en un proyecto nuevo, recibir datos de sensores instalados en los vehículos asegurados.

Son cuatro necesidades muy distintas, y AWS tiene un servicio administrado para cada una. El examen te pedirá elegir el servicio adecuado para **necesidades de aplicaciones de negocio**, para **presentar escritorios o aplicaciones en los equipos de los usuarios** y para **administrar dispositivos IoT**.

## Aplicaciones de negocio

**Amazon Connect** es un servicio de **centro de contacto en la nube**, omnicanal y de autoservicio: conecta a los clientes con agentes por voz, chat, SMS y otros canales, con enrutamiento inteligente y métricas en tiempo real. Su interfaz gráfica permite a usuarios no técnicos diseñar los flujos de contacto y administrar agentes. No hay pagos por adelantado ni infraestructura que administrar: pagas por uso.

Dato de actualidad: AWS hoy llama **Amazon Connect Customer** al producto de centro de contacto que antes se llamaba Amazon Connect; "Amazon Connect" pasó a ser una familia de soluciones de IA agéntica. La guía del examen usa el nombre **Amazon Connect**.

**Amazon Simple Email Service (Amazon SES)** es una plataforma de **correo electrónico** para **enviar y recibir correos** usando tus propias direcciones y dominios, de forma económica y a escala. Casos típicos:

- Correos **transaccionales**: confirmaciones de compra, restablecimiento de contraseña.
- Correos de **marketing**: ofertas especiales y boletines.
- Recepción de correo para crear, por ejemplo, tickets de soporte o respuestas automáticas.

Pagas según el volumen de correos enviados y recibidos.

## Escritorios y aplicaciones en el equipo del usuario

En estos servicios, el escritorio o la aplicación se ejecuta en AWS y el usuario solo ve la **salida** en su dispositivo. Los datos no quedan guardados en el equipo del usuario, lo que mejora la seguridad.

**Amazon WorkSpaces** te permite aprovisionar **escritorios virtuales en la nube** (llamados *WorkSpaces*) con Microsoft Windows o distribuciones Linux como Ubuntu, Rocky Linux o Red Hat Enterprise Linux. Elimina la compra de hardware. Opciones:

- **WorkSpaces Personal**: escritorios **persistentes** asignados a un usuario, como su computadora propia.
- **WorkSpaces Pools**: escritorios **no persistentes** sobre infraestructura efímera.

Se puede pagar por mes o por hora.

**Amazon AppStream 2.0** es un servicio totalmente administrado de **streaming de aplicaciones**: en lugar de un escritorio completo, entrega **aplicaciones de escritorio** individuales a cualquier equipo, incluso desde un navegador compatible con HTML5. Mantienes una sola versión de cada aplicación. Es útil para software exigente en GPU, para que estudiantes usen programas de clase o para que proveedores ofrezcan demos sin instalación. Dato de actualidad: AWS hoy lo llama **Amazon WorkSpaces Applications**; la guía del examen usa el nombre **Amazon AppStream 2.0**.

**Amazon WorkSpaces Secure Browser** ofrece un **navegador empresarial remoto** totalmente administrado para acceder de forma protegida a **sitios web internos y aplicaciones SaaS** desde el navegador que el usuario ya tiene. La navegación ocurre en una sesión en la nube y los datos sensibles no llegan al dispositivo del usuario. Dato de actualidad: según la página oficial, dejará de estar abierto a nuevos clientes a partir del 29 de octubre de 2026; sigue figurando en la guía del examen.

| Necesito entregar… | Servicio |
| --- | --- |
| Un **escritorio completo** de Windows o Linux para cada empleado | **Amazon WorkSpaces** |
| **Aplicaciones de escritorio** específicas por streaming, sin escritorio completo | **Amazon AppStream 2.0** |
| Acceso seguro a **sitios web internos y SaaS** desde el navegador | **Amazon WorkSpaces Secure Browser** |

## AWS IoT Core: conectar dispositivos

El **Internet de las cosas (IoT)** son dispositivos físicos (sensores, medidores, vehículos, electrodomésticos) que envían y reciben datos por internet.

**AWS IoT Core** proporciona los servicios en la nube que **conectan tus dispositivos IoT** con otros dispositivos y con los servicios de AWS. Puntos clave:

- Soporta los protocolos **MQTT**, MQTT sobre WebSockets seguros, **HTTPS** y **LoRaWAN** (redes inalámbricas de largo alcance y bajo consumo).
- Su **message broker** permite a los dispositivos **publicar y suscribirse** a mensajes.
- Con **reglas** puedes enviar los datos de los dispositivos a otros servicios de AWS.
- Los dispositivos se integran mediante los **AWS IoT Device SDKs**, y se administran desde la consola, la API o la AWS CLI.

Otros servicios IoT, como AWS IoT Greengrass y AWS IoT Device Defender, están en la lista oficial de servicios fuera de alcance del CLF-C02.

## Trampas típicas del examen

- **Confundir Amazon Connect con Amazon SES.** Connect es un centro de contacto (llamadas, chat); SES es correo electrónico.
- **Elegir SNS para campañas de correo con tu dominio.** Para correo transaccional y de marketing a escala, la respuesta es **SES**; SNS es para notificaciones y pub/sub.
- **Confundir WorkSpaces con AppStream 2.0.** WorkSpaces entrega un **escritorio completo**; AppStream 2.0 entrega **aplicaciones** por streaming.
- **Elegir WorkSpaces para acceder solo a aplicaciones web.** Si basta con el navegador, la respuesta es **WorkSpaces Secure Browser**.
- **Pensar que IoT Core analiza los datos por sí solo.** IoT Core conecta y enruta; el análisis se hace con otros servicios.

## Resumen para el examen

- Amazon Connect = centro de contacto omnicanal en la nube, pago por uso.
- Amazon SES = enviar y recibir correo con tu dominio: transaccional y marketing.
- WorkSpaces = escritorios virtuales Windows o Linux (persistentes o en pools).
- AppStream 2.0 = streaming de aplicaciones de escritorio; hoy se llama WorkSpaces Applications.
- WorkSpaces Secure Browser = acceso seguro a sitios internos y SaaS desde el navegador.
- AWS IoT Core = conectar y administrar la comunicación de dispositivos IoT con MQTT, HTTPS y LoRaWAN.
