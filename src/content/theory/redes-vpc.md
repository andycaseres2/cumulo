---
title: "Redes en AWS: Amazon VPC"
summary: "Componentes de una Amazon VPC (subredes, gateways, tablas de rutas) y su seguridad: security groups vs network ACLs, más Amazon Inspector."
domain: "technology-services"
order: 9
examTasks: ["3.5"]
services: ["Amazon VPC", "Amazon Inspector", "Amazon EC2"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html"
  - "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"
quiz:
  - prompt: "Una clínica en Asunción detecta tráfico malicioso desde un rango específico de direcciones IP y quiere denegarlo para toda una subred de su VPC. ¿Qué debe usar?"
    options:
      - label: "Un security group"
        explanation: "Un security group solo tiene reglas de permitir y actúa a nivel de instancia; no puede denegar un rango de IP específico."
      - label: "Una network ACL"
        explanation: "Una network ACL controla el tráfico de toda una subred y admite reglas de permitir y de denegar, ideal para bloquear un rango de IP."
        correct: true
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector escanea vulnerabilidades y exposición de red; detecta debilidades pero no bloquea tráfico."
      - label: "Un NAT gateway"
        explanation: "Un NAT gateway da salida a internet a subredes privadas; no sirve para denegar tráfico de direcciones IP específicas."
  - prompt: "La base de datos de un portal de pacientes está en una subred privada y necesita descargar parches desde internet, sin que nadie desde afuera pueda iniciar una conexión hacia ella. ¿Qué componente debe usar?"
    options:
      - label: "Una ruta directa a un internet gateway"
        explanation: "Una ruta directa a un internet gateway convertiría la subred en pública, y las bases de datos deben quedar en subredes privadas."
      - label: "VPC peering"
        explanation: "VPC peering conecta dos VPC para enrutar tráfico entre ellas; no da salida a internet para descargar parches."
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs registran información del tráfico IP de las interfaces de red; no permiten salir a internet."
      - label: "Un NAT gateway"
        explanation: "Un NAT gateway permite que instancias de una subred privada se conecten fuera de la VPC, por ejemplo para parches, sin aceptar conexiones iniciadas desde afuera."
        correct: true
  - prompt: "El área de cumplimiento de un banco en La Paz quiere escanear de forma continua sus instancias EC2 y funciones Lambda en busca de vulnerabilidades de software y exposición de red no intencionada. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector descubre cargas de trabajo y las escanea de forma continua en busca de vulnerabilidades de software y exposición de red, generando hallazgos con recomendaciones."
        correct: true
      - label: "Un security group"
        explanation: "Un security group es un firewall virtual que controla el tráfico de las instancias; no escanea vulnerabilidades de software."
      - label: "Una network ACL"
        explanation: "Una network ACL permite o deniega tráfico a nivel de subred; controla tráfico pero no detecta vulnerabilidades."
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs registran el tráfico IP de las interfaces de red; no analizan vulnerabilidades de software en EC2 ni Lambda."
practice:
  - prompt: "Una tienda en línea de Lima quiere que sus servidores web sigan disponibles aunque falle una Availability Zone. ¿Cómo debe diseñar las subredes de su VPC?"
    options:
      - label: "Una sola subred que abarque varias Availability Zones"
        explanation: "Cada subred vive en una sola Availability Zone; una subred no puede abarcar varias AZ."
      - label: "Subredes en varias Availability Zones"
        explanation: "Como cada subred vive en una sola AZ, para alta disponibilidad se crean subredes en varias AZ y se reparten los servidores."
        correct: true
      - label: "Una VPC predeterminada distinta en cada Availability Zone"
        explanation: "La VPC predeterminada existe una por Región, no por AZ; la alta disponibilidad se logra con subredes en varias AZ."
      - label: "Una conexión VPC peering entre dos subredes"
        explanation: "VPC peering conecta dos VPC para enrutar tráfico entre ellas; no reparte servidores entre Availability Zones."
  - prompt: "Una fintech de Bogotá quiere que sus instancias en subredes privadas accedan a servicios de AWS de forma privada, sin pasar por un internet gateway ni por un NAT gateway. ¿Qué componente debe usar?"
    options:
      - label: "Un internet gateway"
        explanation: "Un internet gateway conecta la VPC con internet, justo lo que la fintech quiere evitar."
      - label: "VPC peering"
        explanation: "VPC peering conecta dos VPC entre sí; no conecta la VPC de forma privada con servicios de AWS."
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs registran información del tráfico IP; no crean ninguna conexión hacia servicios de AWS."
      - label: "Un VPC endpoint"
        explanation: "Un VPC endpoint conecta la VPC a servicios de AWS de forma privada, sin internet gateway ni NAT."
        correct: true
  - prompt: "El equipo de redes de una distribuidora de Guatemala quiere registrar información del tráfico IP que entra y sale de las interfaces de red de su VPC para analizar un problema de conectividad. ¿Qué debe activar?"
    options:
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs registran información del tráfico IP que entra y sale de las interfaces de red de la VPC."
        correct: true
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector escanea vulnerabilidades de software y exposición de red; no registra el tráfico IP de las interfaces."
      - label: "Una tabla de rutas"
        explanation: "Una tabla de rutas define a dónde se dirige el tráfico de una subred; no guarda registros del tráfico."
      - label: "Una network ACL"
        explanation: "Una network ACL permite o deniega tráfico a nivel de subred; controla el tráfico, pero no lo registra."
  - prompt: "Una aseguradora de Caracas tiene un sistema interno que solo debe ser accesible desde su red corporativa mediante una conexión Site-to-Site VPN, y que no necesita internet. ¿Qué ruta debe tener la tabla de rutas de su subred?"
    options:
      - label: "Una ruta directa a un internet gateway"
        explanation: "Una ruta directa a un internet gateway convierte la subred en pública, lo contrario de lo que se pide."
      - label: "Una ruta a un VPC endpoint"
        explanation: "Un VPC endpoint conecta la VPC con servicios de AWS de forma privada; no conecta con la red corporativa."
      - label: "Una ruta a la conexión Site-to-Site VPN, sin internet gateway"
        explanation: "Una subred solo VPN tiene ruta a una conexión Site-to-Site VPN y no tiene internet gateway, para sistemas accesibles solo desde la red corporativa."
        correct: true
      - label: "Una ruta a una conexión VPC peering"
        explanation: "VPC peering enruta tráfico entre dos VPC; no conecta la subred con la red corporativa."
  - prompt: "En una empresa de transporte de Arequipa, la network ACL de una subred tiene la regla 100, que permite HTTPS desde cualquier IP, y la regla 200, que deniega HTTPS desde una IP sospechosa. ¿Qué pasa con una solicitud HTTPS desde esa IP?"
    options:
      - label: "Se deniega, porque las reglas de denegar siempre tienen prioridad"
        explanation: "En una network ACL no gana el tipo de regla, sino el orden: se evalúan en orden numérico hasta la primera coincidencia."
      - label: "Se deniega, porque se evalúan todas las reglas antes de decidir"
        explanation: "Evaluar todas las reglas antes de decidir es el comportamiento de los security groups, no de las network ACLs."
      - label: "Se deniega, porque las network ACLs son stateful"
        explanation: "Las network ACLs son stateless; además, el estado no decide qué regla se aplica primero."
      - label: "Se permite, porque la regla 100 coincide primero"
        explanation: "La network ACL evalúa las reglas en orden numérico hasta encontrar una coincidencia; la regla 100 coincide antes que la 200."
        correct: true
  - prompt: "Un equipo de TI de Tegucigalpa crea una VPC y no modifica su network ACL predeterminada. ¿Qué tráfico permite esa network ACL?"
    options:
      - label: "Todo el tráfico de entrada y salida"
        explanation: "La network ACL predeterminada de una VPC permite todo el tráfico de entrada y salida."
        correct: true
      - label: "Ningún tráfico hasta que se agreguen reglas"
        explanation: "La network ACL predeterminada no bloquea todo; permite todo el tráfico de entrada y salida."
      - label: "Solo el tráfico de salida"
        explanation: "La network ACL predeterminada permite tanto la entrada como la salida, no solo la salida."
      - label: "Solo el tráfico de respuesta a solicitudes permitidas"
        explanation: "Permitir la respuesta automáticamente es propio de los security groups (stateful); la network ACL predeterminada permite todo."
---

## ¿Por qué importa?

Una clínica en Asunción migra a AWS su portal de pacientes. El sitio web debe ser accesible desde internet, pero la base de datos con historias clínicas **nunca** debe quedar expuesta. Además, los servidores de la base de datos necesitan descargar parches de seguridad, y el área de cumplimiento quiere saber si algún servidor tiene vulnerabilidades conocidas o puertos abiertos sin necesidad.

Todo eso se diseña con **Amazon VPC** y sus controles de seguridad, un tema que aparece en muchas preguntas del examen.

## ¿Qué es Amazon VPC?

**Amazon Virtual Private Cloud (Amazon VPC)** te permite lanzar recursos de AWS en una **red virtual lógicamente aislada** que tú defines. Se parece mucho a una red tradicional de un centro de datos, pero con la infraestructura escalable de AWS. Tu cuenta incluye una **VPC predeterminada** en cada Región para empezar rápido, y puedes crear otras. Crear una VPC no tiene costo; algunos componentes, como los NAT gateways, sí tienen cargo.

## Componentes de una VPC

- **Subred** (*subnet*): un rango de direcciones IP dentro de la VPC. **Cada subred vive en una sola Availability Zone**; por eso, para alta disponibilidad, se crean subredes en varias AZ.
- **Tabla de rutas** (*route table*): define a dónde se dirige el tráfico que sale de una subred. Cada subred está asociada a una tabla de rutas.
- **Internet gateway:** conecta la VPC con internet.
- **NAT gateway:** servicio de traducción de direcciones de red (NAT) que permite que las instancias de una subred **privada** se conecten a servicios fuera de la VPC (por ejemplo, para descargar parches), **sin que nadie desde afuera pueda iniciar una conexión** hacia ellas. Un NAT gateway público se crea en una subred pública.
- **VPC endpoint:** conecta la VPC a servicios de AWS de forma privada, sin internet gateway ni NAT.
- **VPC peering:** conecta dos VPC para enrutar tráfico entre ellas.
- **VPC Flow Logs:** registran información del tráfico IP que entra y sale de las interfaces de red de la VPC.

### Subredes públicas y privadas

El tipo de subred depende de su **ruta**:

| Tipo de subred | Ruta | Uso típico |
| --- | --- | --- |
| **Pública** | Tiene una ruta directa a un **internet gateway** | Servidores web, balanceadores de carga públicos |
| **Privada** | **No** tiene ruta directa a un internet gateway; usa un **NAT** para salir a internet | Bases de datos, servidores de aplicación |
| **Solo VPN** | Tiene ruta a una conexión Site-to-Site VPN, sin internet gateway | Sistemas accesibles solo desde la red corporativa |

En el ejemplo de la clínica: el balanceador y los servidores web van en subredes públicas; la base de datos va en subredes privadas, y sale a internet para parches a través de un NAT gateway.

## Seguridad en una VPC

### Security groups vs network ACLs

- **Security group:** un **firewall virtual** que controla el tráfico que entra y sale de **recursos** como instancias EC2. AWS lo recomienda como el **mecanismo principal** de control de acceso de red.
- **Network ACL** (lista de control de acceso de red): controla el tráfico que entra y sale de una **subred** completa. Es útil como **capa adicional de defensa**, por ejemplo para **denegar** un rango específico de direcciones IP.

| Característica | Security group | Network ACL |
| --- | --- | --- |
| Nivel | **Instancia** (recurso) | **Subred** |
| Alcance | Instancias asociadas al security group | Todas las instancias de las subredes asociadas |
| Tipo de reglas | **Solo permitir** (*allow*) | **Permitir y denegar** (*allow* y *deny*) |
| Evaluación | Evalúa todas las reglas antes de decidir | Evalúa las reglas en **orden numérico** hasta encontrar coincidencia |
| Tráfico de respuesta | Permitido automáticamente (**stateful**) | Debe permitirse explícitamente (**stateless**) |

**Stateful** (con estado) significa que si permites una solicitud de entrada, la respuesta sale automáticamente. **Stateless** (sin estado) significa que la respuesta se evalúa por separado y necesita su propia regla. La network ACL predeterminada de una VPC permite todo el tráfico de entrada y salida.

### Amazon Inspector

**Amazon Inspector** es un servicio de **gestión de vulnerabilidades** que descubre automáticamente cargas de trabajo y las **escanea de forma continua** en busca de **vulnerabilidades de software** y **exposición de red no intencionada** (por ejemplo, rutas de red abiertas). Analiza **instancias de Amazon EC2, imágenes de contenedor en Amazon ECR y funciones de AWS Lambda**. Cuando detecta un problema, genera un **hallazgo** (*finding*) con detalles y recomendaciones de corrección.

Inspector complementa a los security groups y network ACLs: ellos **controlan** el tráfico; Inspector **detecta** debilidades.

## Trampas típicas del examen

- **Pensar que un security group puede denegar tráfico.** Solo tiene reglas de **permitir**; para denegar una IP específica, usa una **network ACL**.
- **Confundir stateful con stateless.** Security group = stateful; network ACL = stateless.
- **Creer que una subred puede abarcar varias AZ.** Cada subred vive en **una sola** AZ.
- **Poner la base de datos en una subred pública.** Las bases de datos van en subredes **privadas**.
- **Usar un NAT gateway para recibir tráfico desde internet.** El NAT solo permite conexiones **iniciadas desde dentro** de la VPC.
- **Confundir Amazon Inspector con un firewall.** Inspector **escanea vulnerabilidades**; no bloquea tráfico.

## Resumen para el examen

- VPC = red virtual lógicamente aislada en AWS.
- Subred = rango de IP dentro de una sola AZ.
- Pública = ruta a un internet gateway; privada = sin ruta directa, sale por NAT.
- Tablas de rutas = a dónde va el tráfico de cada subred.
- NAT gateway = salida a internet para subredes privadas, sin conexiones entrantes no solicitadas.
- Security group = instancia, solo *allow*, stateful.
- Network ACL = subred, *allow* y *deny*, stateless, reglas en orden.
- Amazon Inspector = escaneo continuo de vulnerabilidades y exposición de red en EC2, ECR y Lambda.
