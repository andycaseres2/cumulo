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
practice:
  - prompt: "Una consultora contable de Córdoba tiene cientos de empleados que trabajan desde sus casas y necesitan acceder de forma segura, desde sus laptops, a sistemas internos en AWS y en la red on-premises. ¿Qué servicio conviene?"
    options:
      - label: "AWS Site-to-Site VPN"
        explanation: "Site-to-Site VPN une redes completas, como un centro de datos u oficina, con las VPC; no conecta laptops individuales desde cualquier lugar."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect es una conexión física dedicada entre una red interna y AWS; no sirve para que cada empleado se conecte desde su casa."
      - label: "AWS Client VPN"
        explanation: "Client VPN es una VPN administrada y basada en cliente que permite a usuarios individuales acceder de forma segura a AWS y a la red on-premises desde cualquier lugar."
        correct: true
      - label: "AWS Transit Gateway"
        explanation: "Transit Gateway es un hub para interconectar VPC y redes; no es el servicio que usan las personas para conectarse desde sus dispositivos."
  - prompt: "Una aseguradora de Panamá tiene aplicaciones en subredes privadas de su VPC que deben consumir un producto de un socio de AWS Marketplace, sin usar internet gateway, NAT ni IP públicas. ¿Qué servicio debe usar?"
    options:
      - label: "AWS PrivateLink"
        explanation: "PrivateLink conecta de forma privada tu VPC con servicios de AWS, de otras cuentas o de socios de AWS Marketplace mediante VPC endpoints, sin internet gateway, NAT ni IP pública."
        correct: true
      - label: "AWS Transit Gateway"
        explanation: "Transit Gateway interconecta VPC y redes on-premises como un hub; no da acceso privado a un servicio específico de un socio."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect une una red interna con AWS mediante una conexión física; no resuelve el acceso privado desde la VPC a un servicio de un socio."
      - label: "AWS Client VPN"
        explanation: "Client VPN conecta a usuarios individuales desde sus dispositivos; no conecta aplicaciones de subredes privadas con un servicio."
  - prompt: "Un banco de Bogotá ya usa AWS Direct Connect y su área de cumplimiento exige que el tráfico entre su centro de datos y AWS viaje cifrado. ¿Qué debe hacer?"
    options:
      - label: "Nada, porque Direct Connect cifra el tráfico por defecto"
        explanation: "Direct Connect no está cifrado por defecto; es una trampa típica del examen asumir que sí."
      - label: "Crear túneles VPN sobre la conexión de Direct Connect"
        explanation: "Para cifrar el tráfico de Direct Connect puedes crear túneles VPN sobre la conexión, o usar MACsec en ciertas conexiones dedicadas."
        correct: true
      - label: "Reemplazar Direct Connect por AWS Transit Gateway"
        explanation: "Transit Gateway es un hub que interconecta redes; no es una forma de cifrar el tráfico de Direct Connect."
      - label: "Agregar un VPC endpoint de AWS PrivateLink"
        explanation: "PrivateLink da acceso privado a servicios específicos desde la VPC; no cifra el enlace entre el centro de datos y AWS."
  - prompt: "Una empresa minera de Arequipa configura AWS Site-to-Site VPN entre su oficina y una VPC. ¿Cómo se llama el componente donde termina la conexión del lado de la oficina?"
    options:
      - label: "Virtual private gateway"
        explanation: "El virtual private gateway es el extremo del lado de AWS, asociado a una VPC; no está en la oficina de la empresa."
      - label: "VPC endpoint de interfaz"
        explanation: "Un VPC endpoint de interfaz es la forma de usar AWS PrivateLink para acceder a servicios; no es parte de una conexión Site-to-Site VPN."
      - label: "Ubicación de Direct Connect"
        explanation: "Una ubicación de Direct Connect es donde se conecta físicamente la red interna para usar Direct Connect; no participa en Site-to-Site VPN."
      - label: "Customer gateway device"
        explanation: "Del lado on-premises, la conexión Site-to-Site VPN termina en un customer gateway device, que puede ser un equipo físico o una aplicación de software."
        correct: true
  - prompt: "Una cadena hotelera de Cancún usa AWS Transit Gateway en dos Regiones distintas y quiere conectar ambos transit gateways usando la infraestructura global de AWS. ¿Qué función debe usar?"
    options:
      - label: "Peering entre Regiones de Transit Gateway"
        explanation: "Con el peering entre Regiones conectas transit gateways de distintas Regiones usando la infraestructura global de AWS."
        correct: true
      - label: "AWS PrivateLink"
        explanation: "PrivateLink da acceso privado a servicios específicos mediante VPC endpoints; no conecta transit gateways entre sí."
      - label: "AWS Client VPN"
        explanation: "Client VPN conecta a usuarios individuales desde sus dispositivos; no une transit gateways de distintas Regiones."
      - label: "Una interfaz virtual pública de Direct Connect"
        explanation: "La interfaz virtual pública de Direct Connect da acceso a servicios públicos de AWS como Amazon S3; no conecta transit gateways entre Regiones."
  - prompt: "Una cooperativa agrícola de Uruguay quiere AWS Direct Connect, pero no necesita un puerto físico propio y prefiere que la conexión se la provea un socio de AWS Direct Connect. ¿Qué tipo de conexión debe pedir?"
    options:
      - label: "Una conexión dedicada"
        explanation: "La conexión dedicada es un puerto físico para un solo cliente; la cooperativa justamente no quiere un puerto propio."
      - label: "Una conexión de AWS Client VPN"
        explanation: "Client VPN es para usuarios individuales que se conectan por internet; no es un tipo de conexión de Direct Connect."
      - label: "Una conexión hospedada"
        explanation: "Las conexiones hospedadas de Direct Connect las provee un socio de AWS Direct Connect, sin que el cliente tenga un puerto físico propio."
        correct: true
      - label: "Un VPC endpoint de interfaz"
        explanation: "Un VPC endpoint de interfaz se usa con PrivateLink para acceder a servicios desde la VPC; no es una forma de contratar Direct Connect."
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
