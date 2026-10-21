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
