---
title: "Conectividad: VPN, Direct Connect, Transit Gateway y PrivateLink"
summary: "Elige entre AWS Site-to-Site VPN, AWS Client VPN y AWS Direct Connect para conectar con AWS, y entiende Transit Gateway como hub y PrivateLink para acceso privado."
domain: "technology-services"
order: 10
examTasks: ["3.5"]
services: ["AWS Site-to-Site VPN", "AWS Client VPN", "AWS Direct Connect", "AWS Transit Gateway", "AWS PrivateLink", "Amazon VPC"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"
  - "https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html"
  - "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect.html"
  - "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html"
  - "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html"
quiz:
  - prompt: "Un grupo de supermercados de Lima necesita conectar hoy mismo su centro de datos con sus VPC, con tráfico cifrado por internet, mientras evalúa otras opciones a mediano plazo. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Direct Connect"
        explanation: "Direct Connect requiere trabajo físico en una ubicación de Direct Connect o con un socio, así que su puesta en marcha es más lenta y no sirve para conectar hoy mismo."
      - label: "AWS Site-to-Site VPN"
        explanation: "Site-to-Site VPN une la red on-premises con las VPC mediante túneles IPsec cifrados sobre internet y se configura rápido."
        correct: true
      - label: "AWS Client VPN"
        explanation: "Client VPN conecta a usuarios individuales desde sus dispositivos; no une la red completa de un centro de datos con las VPC."
      - label: "AWS PrivateLink"
        explanation: "PrivateLink da acceso privado desde tu VPC a servicios específicos mediante VPC endpoints; no conecta tu centro de datos con AWS."
  - prompt: "Una aseguradora de Santiago quiere mover grandes volúmenes de datos entre su centro de datos y AWS con un rendimiento constante y sin pasar por proveedores de internet. Puede esperar la instalación física. ¿Qué servicio debe elegir?"
    options:
      - label: "AWS Site-to-Site VPN"
        explanation: "Site-to-Site VPN viaja por internet público, así que su rendimiento depende de internet y no cumple el requisito de no pasar por proveedores de internet."
      - label: "AWS Client VPN"
        explanation: "Client VPN está pensado para que usuarios individuales se conecten desde cualquier lugar por internet, no para transferir grandes volúmenes entre redes."
      - label: "AWS PrivateLink"
        explanation: "PrivateLink conecta tu VPC con servicios como si estuvieran dentro de ella; no es un enlace entre tu centro de datos y AWS."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect une tu red interna con AWS mediante una conexión física dedicada, sin pasar por proveedores de internet, con mayor ancho de banda y una experiencia de red más consistente."
        correct: true
  - prompt: "Una empresa de retail de Guadalajara tiene decenas de VPC y varias redes on-premises, y conectarlas una por una se volvió inmanejable. Quiere que cada red se conecte una sola vez a un punto central. ¿Qué servicio cumple con esto?"
    options:
      - label: "AWS Transit Gateway"
        explanation: "Transit Gateway es un hub de tránsito de red que interconecta VPC y redes on-premises en un modelo hub-and-spoke, donde cada red se conecta una sola vez."
        correct: true
      - label: "AWS PrivateLink"
        explanation: "PrivateLink da acceso privado a servicios específicos mediante VPC endpoints; no interconecta redes completas como un hub central."
      - label: "AWS Client VPN"
        explanation: "Client VPN da acceso a usuarios remotos individuales; no funciona como punto central para interconectar muchas VPC y redes."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect ofrece una conexión física dedicada entre tu red y AWS, pero por sí solo no es un hub que interconecte muchas VPC entre sí."
---

## ¿Por qué importa?

Un grupo de supermercados en Lima tiene su centro de datos principal, cuarenta tiendas y cientos de empleados que trabajan desde casa. Ya usa varias VPC en AWS y quiere tres cosas: conectar rápido el centro de datos con AWS mientras evalúa opciones, darles a los empleados remotos acceso seguro a los sistemas internos y, a mediano plazo, mover grandes volúmenes de datos con un rendimiento constante y sin depender de internet.

Cada necesidad tiene un servicio distinto. El examen te pedirá elegir la **opción de conectividad** correcta.

## AWS VPN: conexiones cifradas por internet

Una **VPN** (*Virtual Private Network*) crea un **túnel cifrado** sobre una red pública como internet. AWS ofrece dos variantes:

- **AWS Site-to-Site VPN:** conecta **tu red on-premises** (centro de datos u oficina) con tus VPC mediante conexiones **IPsec**. Cada conexión incluye **dos túneles** que se pueden usar simultáneamente para alta disponibilidad. Del lado de AWS termina en un **virtual private gateway** (asociado a una VPC) o en un **transit gateway**; de tu lado, en un **customer gateway device** (un equipo físico o una aplicación de software).
- **AWS Client VPN:** servicio de VPN **administrado y basado en cliente** que permite a **usuarios individuales** acceder de forma segura a recursos en AWS y en la red on-premises **desde cualquier lugar**, usando un cliente VPN basado en OpenVPN. Escala según la cantidad de usuarios conectados.

Regla rápida: **Site-to-Site** une **redes**; **Client VPN** conecta **personas** (dispositivos individuales).

## AWS Direct Connect: conexión privada dedicada

**AWS Direct Connect** une tu red interna con una **ubicación de Direct Connect** mediante un cable de fibra óptica Ethernet estándar, **sin pasar por proveedores de internet** en la ruta de red.

- Puede **reducir costos de red**, **aumentar el ancho de banda** y ofrecer una **experiencia de red más consistente** que las conexiones por internet.
- Hay **conexiones dedicadas** (un puerto físico para un solo cliente) y **conexiones hospedadas** (provistas por un socio de AWS Direct Connect).
- Con **interfaces virtuales** accedes a tus VPC (privada), a servicios públicos de AWS como Amazon S3 (pública) o a transit gateways (de tránsito).
- **No está cifrado por defecto.** Para cifrar, puedes usar MACsec en ciertas conexiones dedicadas o crear túneles VPN sobre Direct Connect.
- Su configuración no es inmediata: requiere trabajo físico en una ubicación de Direct Connect o con un socio.

| | **AWS Site-to-Site VPN** | **AWS Client VPN** | **AWS Direct Connect** |
| --- | --- | --- | --- |
| Conecta | Red on-premises ↔ VPC | Usuarios individuales ↔ AWS y on-premises | Red on-premises ↔ AWS |
| Medio | Internet público | Internet público | Conexión física dedicada, sin internet |
| Cifrado | Sí (IPsec) | Sí (TLS) | No por defecto; MACsec o VPN encima |
| Rendimiento | Depende de internet | Depende de internet | Más consistente, mayor ancho de banda |
| Puesta en marcha | Rápida | Rápida | Más lenta (requiere instalación física) |
| Escenario típico | Conexión rápida o respaldo de Direct Connect | Teletrabajo | Grandes volúmenes de datos, latencia constante, híbrido estable |

## AWS Transit Gateway: un hub central

Cuando tienes muchas VPC y varias redes on-premises, conectar todas entre sí una por una se vuelve inmanejable. **AWS Transit Gateway** es un **hub de tránsito de red** que **interconecta VPC y redes on-premises** en un modelo de **hub-and-spoke** (centro y radios): cada red se conecta una sola vez al hub.

- Puedes adjuntar VPC, conexiones VPN, gateways de Direct Connect, endpoints de Client VPN y otros transit gateways.
- Con **peering entre Regiones**, conectas transit gateways de distintas Regiones usando la infraestructura global de AWS.

## AWS PrivateLink: acceso privado a servicios

**AWS PrivateLink** conecta **de forma privada** tu VPC con servicios y recursos **como si estuvieran dentro de tu VPC**. No necesitas internet gateway, NAT, IP pública, Direct Connect ni VPN para que tus subredes privadas se comuniquen con el servicio.

- Se usa mediante **VPC endpoints** de tipo interfaz.
- Sirve para acceder a **servicios de AWS**, a servicios de **otras cuentas de AWS** y a productos de **socios de AWS Marketplace**.
- Puedes crear tu propio servicio de endpoint y ofrecerlo a otros clientes de AWS.

## Trampas típicas del examen

- **Elegir Direct Connect para algo urgente.** Direct Connect requiere instalación física; para conectar **rápido**, la respuesta es **Site-to-Site VPN**.
- **Creer que Direct Connect está cifrado por defecto.** No lo está; se cifra con MACsec o una VPN encima.
- **Confundir Site-to-Site VPN con Client VPN.** Redes completas → Site-to-Site; usuarios remotos → Client VPN.
- **Elegir VPN cuando se pide rendimiento constante sin internet.** "Dedicada", "privada" o "sin pasar por internet" apuntan a **Direct Connect**.
- **Confundir Transit Gateway con PrivateLink.** Transit Gateway **interconecta redes**; PrivateLink da **acceso privado a servicios** específicos.

## Resumen para el examen

- Site-to-Site VPN = red on-premises ↔ VPC por internet, cifrada con IPsec, dos túneles.
- Client VPN = usuarios remotos con cliente OpenVPN, desde cualquier lugar.
- Direct Connect = conexión física dedicada, sin internet, rendimiento consistente.
- Direct Connect no está cifrado por defecto.
- VPN = rápida de configurar sobre internet; Direct Connect = más estable, tarda más en instalarse.
- Transit Gateway = hub central para interconectar muchas VPC y redes on-premises.
- PrivateLink = acceso privado a servicios mediante VPC endpoints, sin exponer tráfico a internet.
