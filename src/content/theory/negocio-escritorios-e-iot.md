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
quiz:
  - prompt: "Una aseguradora en Quito quiere enviar a escala confirmaciones de pago, recordatorios y boletines de marketing desde su propio dominio de correo. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 entrega aplicaciones de escritorio por streaming; no es una plataforma de correo electrónico."
      - label: "Amazon SES"
        explanation: "Amazon SES permite enviar y recibir correos con tus propias direcciones y dominios, tanto transaccionales como de marketing, a escala."
        correct: true
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces aprovisiona escritorios virtuales en la nube; no envía correos masivos desde tu dominio."
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core conecta dispositivos IoT con servicios de AWS; no sirve para campañas de correo."
  - prompt: "Una universidad de Córdoba quiere que sus estudiantes usen un programa de diseño exigente en GPU desde un navegador HTML5, sin instalarlo y sin entregarles un escritorio completo. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces entrega un escritorio virtual completo; el escenario pide solo la aplicación, sin escritorio completo."
      - label: "Amazon Connect"
        explanation: "Amazon Connect es un centro de contacto en la nube para atender clientes por voz, chat o SMS; no entrega aplicaciones de escritorio."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser da acceso seguro a sitios web internos y aplicaciones SaaS; el programa de diseño es una aplicación de escritorio."
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 hace streaming de aplicaciones de escritorio individuales, incluso a un navegador HTML5, y es útil para software exigente en GPU y programas de clase."
        correct: true
  - prompt: "Una empresa de transporte de Rosario instalará sensores en sus camiones que publicarán datos por MQTT, y quiere enviar esos datos a otros servicios de AWS mediante reglas. ¿Qué servicio debe usar?"
    options:
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core conecta dispositivos IoT con servicios de AWS, soporta MQTT con un message broker de publicación y suscripción, y enruta datos con reglas."
        correct: true
      - label: "Amazon Connect"
        explanation: "Amazon Connect conecta clientes con agentes de un centro de contacto; no recibe datos de sensores."
      - label: "Amazon SES"
        explanation: "Amazon SES envía y recibe correo electrónico; no es un servicio para conectar dispositivos por MQTT."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser es un navegador empresarial remoto para personas; no conecta sensores ni dispositivos IoT."
practice:
  - prompt: "Una aseguradora de Guayaquil necesita un centro de contacto en la nube para atender reclamos por voz, chat y SMS, con enrutamiento inteligente, sin pagos por adelantado ni infraestructura que administrar. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon SES"
        explanation: "Amazon SES es una plataforma de correo electrónico; no conecta a los clientes con agentes por voz, chat o SMS."
      - label: "Amazon Connect"
        explanation: "Amazon Connect es un centro de contacto omnicanal en la nube con enrutamiento inteligente y métricas en tiempo real, y se paga por uso."
        correct: true
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces aprovisiona escritorios virtuales; podría dar un escritorio al agente, pero no es la plataforma que atiende y enruta los contactos."
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core conecta dispositivos IoT con servicios de AWS; no atiende llamadas ni chats de clientes."
  - prompt: "Un estudio contable de Asunción quiere dar a cada empleado remoto un escritorio completo de Windows, persistente y asignado solo a él, sin comprar laptops corporativas. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 se centra en el streaming de aplicaciones desde flotas no persistentes; no asigna a cada empleado un escritorio persistente propio."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser da acceso a sitios web internos y aplicaciones SaaS desde el navegador, no un escritorio completo de Windows."
      - label: "Amazon Connect"
        explanation: "Amazon Connect es un centro de contacto en la nube; no aprovisiona escritorios para los empleados."
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces aprovisiona escritorios virtuales en la nube con Windows o Linux, y WorkSpaces Personal los hace persistentes y asignados a un usuario."
        correct: true
  - prompt: "Una consultora de Cartagena quiere que sus contratistas accedan solo a sus sitios web internos y a aplicaciones SaaS desde el navegador que ya tienen, sin que los datos sensibles lleguen a su dispositivo. ¿Qué servicio debe elegir?"
    options:
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser es un navegador empresarial remoto: la navegación ocurre en la nube y los datos sensibles no llegan al dispositivo del usuario."
        correct: true
      - label: "Amazon SES"
        explanation: "Amazon SES envía y recibe correo electrónico; no da acceso protegido a sitios web internos."
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core conecta dispositivos como sensores y medidores, no a personas que navegan sitios internos."
      - label: "Amazon Connect"
        explanation: "Amazon Connect conecta clientes con agentes de un centro de contacto; no ofrece navegación segura a aplicaciones SaaS."
  - prompt: "Una tienda en línea de Mendoza quiere recibir los correos que llegan a su dirección de soporte para crear tickets automáticamente con su propio dominio. ¿Qué servicio de AWS encaja?"
    options:
      - label: "Amazon SNS"
        explanation: "Amazon SNS sirve para notificaciones y pub/sub; para enviar y recibir correo con tu propio dominio la respuesta es otro servicio."
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 hace streaming de aplicaciones de escritorio; no recibe correos electrónicos."
      - label: "Amazon SES"
        explanation: "Amazon SES envía y recibe correos con tus propias direcciones y dominios, y la recepción sirve, por ejemplo, para crear tickets de soporte."
        correct: true
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core recibe mensajes de dispositivos IoT por protocolos como MQTT, no correos de clientes."
  - prompt: "Una empresa eléctrica de Barranquilla conecta medidores por LoRaWAN a AWS IoT Core y un gerente supone que IoT Core analizará los consumos por sí solo. ¿Qué afirmación es correcta?"
    options:
      - label: "IoT Core analiza los datos y genera reportes de consumo automáticamente"
        explanation: "IoT Core no analiza los datos por sí solo; conecta los dispositivos y enruta sus mensajes."
      - label: "IoT Core conecta y enruta los datos con reglas; el análisis se hace con otros servicios de AWS"
        explanation: "IoT Core conecta los dispositivos, su message broker maneja publicación y suscripción, y sus reglas envían los datos a otros servicios donde se analizan."
        correct: true
      - label: "IoT Core solo acepta MQTT, así que los medidores LoRaWAN no pueden conectarse"
        explanation: "IoT Core soporta MQTT, MQTT sobre WebSockets seguros, HTTPS y LoRaWAN, así que los medidores sí pueden conectarse."
      - label: "IoT Core requiere instalar Amazon WorkSpaces en cada medidor"
        explanation: "Los dispositivos se integran mediante los AWS IoT Device SDKs; WorkSpaces es un servicio de escritorios virtuales para personas."
  - prompt: "Un call center de Lima tiene turnos rotativos y quiere escritorios virtuales no persistentes sobre infraestructura efímera, en lugar de un escritorio fijo para cada agente. ¿Qué opción debe usar?"
    options:
      - label: "WorkSpaces Personal"
        explanation: "WorkSpaces Personal entrega escritorios persistentes asignados a un usuario, lo contrario de lo que pide el call center."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "WorkSpaces Secure Browser da acceso a sitios web y SaaS desde el navegador, no escritorios virtuales."
      - label: "Amazon AppStream 2.0"
        explanation: "AppStream 2.0 está orientado al streaming de aplicaciones; para escritorios virtuales completos no persistentes, la opción de WorkSpaces es Pools."
      - label: "WorkSpaces Pools"
        explanation: "WorkSpaces Pools ofrece escritorios no persistentes sobre infraestructura efímera, adecuados para turnos rotativos."
        correct: true
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
