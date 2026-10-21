---
title: "Protección de red y aplicaciones: WAF, Shield y Firewall Manager"
summary: "Protege aplicaciones web en la capa 7 con AWS WAF, mitiga ataques DDoS con AWS Shield Standard y Advanced, y centraliza reglas con AWS Firewall Manager."
domain: "security-compliance"
order: 8
examTasks: ["2.2", "2.4"]
services: ["AWS WAF", "AWS Shield", "AWS Firewall Manager", "Amazon CloudFront", "Amazon Route 53", "Amazon VPC", "AWS Organizations"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-standard-summary.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-protected-resources.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html"
---

## ¿Por qué importa?

Una tienda de electrónica en Buenos Aires prepara su campaña de descuentos. La semana anterior sufrió dos problemas: un bot intentó **inyectar código SQL** en el buscador del sitio, y un **ataque DDoS** inundó la web con tráfico falso hasta dejarla lenta. Además, la empresa tiene 15 cuentas de AWS y cada equipo configura sus reglas de firewall a su manera.

AWS ofrece tres servicios complementarios para estos problemas: **AWS WAF**, **AWS Shield** y **AWS Firewall Manager**.

## Capas de red en pocas palabras

Las redes se describen en **capas** (modelo OSI). Para el examen basta con dos ideas:

- **Capas 3 y 4 (red y transporte)**: direcciones IP, puertos y protocolos como TCP y UDP. Aquí ocurren los ataques que intentan **saturar la red**.
- **Capa 7 (aplicación)**: el contenido de las solicitudes web **HTTP(S)**, como URLs, encabezados o formularios. Aquí ocurren la inyección SQL, el *cross-site scripting* y las inundaciones de solicitudes web.

## AWS WAF: firewall de aplicaciones web (capa 7)

**AWS WAF** (*web application firewall*) monitorea y filtra las **solicitudes HTTP(S)** que llegan a tus aplicaciones. Se asocia a recursos como **Amazon CloudFront**, **Application Load Balancer**, **Amazon API Gateway**, **AWS AppSync**, **Amazon Cognito**, **AWS App Runner**, **AWS Amplify** y **AWS Verified Access**. No se instala en una instancia EC2 directamente.

Conceptos clave:

- **Web ACL** (*web access control list*), que la consola actual llama **protection pack (web ACL)**: el conjunto de reglas que asocias a tus recursos, con una **acción predeterminada** para lo que no coincida con ninguna regla.
- **Reglas** (*rules*): condiciones y una acción. Pueden filtrar por **dirección IP**, **país de origen**, coincidencia de texto o expresiones regulares, tamaño de partes de la solicitud y detección de **inyección SQL** o **scripting malicioso**. Las **reglas basadas en tasa** bloquean o cuentan IP que superan cierto número de solicitudes.
- **Acciones**: permitir (*Allow*), bloquear (*Block*, responde con HTTP 403 o una respuesta personalizada), contar (*Count*, para probar) y desafíos como **CAPTCHA**.
- **Grupos de reglas** (*rule groups*): reglas reutilizables, propias, **administradas por AWS** o compradas a vendedores en **AWS Marketplace**.

## AWS Shield: protección contra DDoS

Un ataque **DDoS** (*Distributed Denial of Service*, denegación de servicio distribuida) usa muchos sistemas comprometidos para inundar un objetivo con tráfico y dejarlo fuera de servicio.

| | AWS Shield Standard | AWS Shield Advanced |
| --- | --- | --- |
| Activación | **Automática** para todos los clientes | Suscripción de pago; eliges qué recursos proteger |
| Costo | **Sin cargo adicional** | Tarifa de suscripción (ver la página de precios) |
| Protección | Ataques más comunes de **capas 3 y 4** | Protección ampliada en capas 3, 4 y **7**, con mitigación automática en capa 7 junto a AWS WAF |
| Recursos destacados | Beneficio especial en Amazon Route 53, Amazon CloudFront y AWS Global Accelerator | CloudFront, Route 53, Global Accelerator, Elastic IP de EC2 y balanceadores de carga |
| Extras | — | Acceso al **Shield Response Team (SRT)**, métricas e informes detallados, **protección de costos** ante picos causados por un ataque y uso estándar de AWS WAF incluido para los recursos protegidos |

Para trabajar con el SRT, además de Shield Advanced se requiere un plan de AWS Support de pago de nivel Business o superior; consulta la documentación de Shield para los planes vigentes.

## AWS Firewall Manager: reglas centralizadas

**AWS Firewall Manager** permite **definir políticas de protección una sola vez** y aplicarlas automáticamente en **todas las cuentas y recursos** de tu organización de **AWS Organizations**, **incluso en las cuentas y recursos nuevos**. Administra:

- Reglas de **AWS WAF**.
- Protecciones de **AWS Shield Advanced**.
- **Security groups** y **network ACLs** de Amazon VPC.
- **AWS Network Firewall** y **Amazon Route 53 Resolver DNS Firewall**.

Requiere AWS Organizations. Sus cargos corresponden en gran parte a los servicios subyacentes, como AWS WAF y AWS Config.

## Contraste: security groups y network ACLs

WAF y Shield no reemplazan los controles de red de la VPC:

| | Security group | Network ACL |
| --- | --- | --- |
| Nivel | Instancia (interfaz de red) | Subred |
| Reglas | Solo **permitir** | **Permitir y denegar** |
| Estado | **Con estado** (*stateful*): la respuesta se permite sola | **Sin estado** (*stateless*): la respuesta debe permitirse explícitamente |
| Evaluación | Todas las reglas antes de decidir | En orden numérico hasta la primera coincidencia |
| Capa | 3 y 4 (IP y puertos) | 3 y 4 (IP y puertos) |

Regla mental: **puertos e IP → security groups y network ACLs**; **contenido web (SQL, XSS, bots) → WAF**; **DDoS → Shield**; **muchas cuentas → Firewall Manager**.

## Trampas típicas del examen

- **Usar un security group para bloquear inyección SQL.** Los security groups no inspeccionan contenido HTTP; la respuesta es **AWS WAF**.
- **Pensar que hay que pagar o activar Shield Standard.** Es **automático y sin cargo adicional**.
- **Elegir Shield Standard cuando la pregunta pide equipo de respuesta 24/7 o protección de costos.** Eso es **Shield Advanced**.
- **Elegir WAF cuando la pregunta pide aplicar reglas en todas las cuentas de la organización.** Eso es **Firewall Manager**.
- **Bloquear una IP con un security group.** Solo admite reglas de permitir; para denegar una IP se usa una **network ACL** (o WAF, si es tráfico web).

## Resumen para el examen

- WAF = capa 7: filtra solicitudes HTTP(S) con web ACLs (protection packs), reglas y grupos de reglas.
- WAF se asocia a CloudFront, ALB, API Gateway, AppSync, Cognito, App Runner, Amplify y Verified Access.
- Shield Standard = DDoS capas 3 y 4, automático y sin cargo adicional.
- Shield Advanced = protección ampliada, SRT, métricas y protección de costos.
- Firewall Manager = políticas centralizadas en toda la organización, también en recursos nuevos.
- Security groups (instancia, con estado, solo permitir) vs. network ACLs (subred, sin estado, permitir y denegar).
