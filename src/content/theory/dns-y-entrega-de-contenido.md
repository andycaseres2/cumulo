---
title: "DNS y entrega de contenido: Route 53, CloudFront, Global Accelerator y API Gateway"
summary: "Cómo Route 53 resuelve nombres y enruta tráfico, cómo CloudFront y Global Accelerator usan las edge locations, y por qué API Gateway es la puerta de entrada de tus APIs."
domain: "technology-services"
order: 11
examTasks: ["3.5", "3.2"]
services: ["Amazon Route 53", "Amazon CloudFront", "AWS Global Accelerator", "Amazon API Gateway", "AWS Lambda", "AWS Shield"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"
  - "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html"
  - "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
  - "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"
  - "https://aws.amazon.com/global-accelerator/faqs/"
  - "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
quiz:
  - prompt: "Un estudio de videojuegos de Bogotá lanza un juego en línea que usa conexiones UDP y necesita direcciones IP estáticas como punto de entrada fijo, con baja latencia para jugadores de varios países. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon CloudFront"
        explanation: "CloudFront es una CDN que cachea contenido HTTP/HTTPS; no acelera tráfico UDP de un juego en línea por la red global de AWS."
      - label: "Amazon API Gateway"
        explanation: "API Gateway administra APIs REST, HTTP y WebSocket; no acelera tráfico UDP ni entrega direcciones IP estáticas anycast."
      - label: "Amazon Route 53"
        explanation: "Route 53 resuelve nombres de dominio y enruta por DNS, pero no reenvía los paquetes del juego por la red global de AWS desde IP estáticas."
      - label: "AWS Global Accelerator"
        explanation: "Global Accelerator entrega direcciones IP estáticas anycast y acelera tráfico TCP/UDP por la red global de AWS, ideal para juegos."
        correct: true
  - prompt: "Una tienda en línea de Bogotá vende en Colombia, México y Chile y quiere que Amazon Route 53 muestre a cada usuario la versión del sitio de su país, según desde dónde se conecta. ¿Qué routing policy debe usar?"
    options:
      - label: "Latency"
        explanation: "Latency envía al usuario a la Región con menor latencia, no decide según el país del usuario."
      - label: "Geolocation"
        explanation: "Geolocation enruta según la ubicación del usuario, lo que permite servir contenido distinto por país."
        correct: true
      - label: "Weighted"
        explanation: "Weighted reparte el tráfico en proporciones, por ejemplo 90 % / 10 %, sin tener en cuenta el país del usuario."
      - label: "Failover"
        explanation: "Failover arma un esquema activo-pasivo que envía tráfico al respaldo si el principal falla; no elige por país."
  - prompt: "Las imágenes y videos de un e-commerce de Santiago están en un bucket de Amazon S3 en una sola Región, y cargan lento para clientes de otros países. Quiere guardar copias en caché cerca de los usuarios y reducir la carga en el origen. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon CloudFront"
        explanation: "CloudFront es la CDN de AWS: cachea el contenido en edge locations cercanas al usuario y lo obtiene del origen, como un bucket de S3, solo cuando no está en caché."
        correct: true
      - label: "AWS Global Accelerator"
        explanation: "Global Accelerator acelera tráfico TCP/UDP desde el borde, pero no cachea contenido, que es lo que pide el escenario."
      - label: "Amazon API Gateway"
        explanation: "API Gateway es la puerta de entrada para APIs hacia backends como Lambda; no es una CDN para cachear imágenes y videos."
      - label: "Amazon Route 53"
        explanation: "Route 53 traduce nombres de dominio y enruta tráfico, pero no guarda copias del contenido cerca de los usuarios."
---

## ¿Por qué importa?

Una tienda en línea de Bogotá vende en Colombia, México y Chile. Sus clientes escriben `tienda.com.co` en el navegador y esperan que la página cargue rápido, aunque las imágenes estén guardadas en una sola Región de AWS. Además, la app móvil consulta precios a través de una API, y un videojuego promocional necesita conexiones UDP con baja latencia.

Cuatro necesidades, cuatro servicios: **Amazon Route 53** traduce el nombre del dominio y decide a dónde enviar al usuario, **Amazon CloudFront** acerca el contenido, **AWS Global Accelerator** acelera el tráfico de red por la red global de AWS y **Amazon API Gateway** recibe y protege las llamadas a la API.

## Amazon Route 53: el DNS de AWS

El **DNS** (*Domain Name System*) es el "directorio telefónico" de internet: convierte un nombre como `example.com` en la dirección IP del servidor. **Amazon Route 53** es un servicio DNS altamente disponible y escalable que cumple tres funciones, que puedes usar en cualquier combinación:

1. **Registro de dominios**: compras y administras nombres de dominio.
2. **Enrutamiento DNS**: cuando alguien escribe tu dominio, Route 53 conecta su navegador con tu sitio o aplicación.
3. **Health checks** (verificaciones de estado): envía solicitudes automáticas a un recurso, por ejemplo un servidor web, para comprobar que responde. Puede avisarte cuando falla y **desviar el tráfico** lejos de los recursos no saludables.

Al crear un registro eliges una **routing policy** (política de enrutamiento), que define cómo responde Route 53:

| Política | Úsala cuando… |
| --- | --- |
| Simple | Hay un solo recurso que atiende el dominio |
| Failover | Quieres un esquema activo-pasivo: si el principal falla, va al de respaldo |
| Geolocation | Quieres enrutar según la ubicación del **usuario** (por ejemplo, contenido por país) |
| Geoproximity | Quieres enrutar según la ubicación de tus **recursos** y desplazar tráfico entre ellos |
| Latency | Tienes recursos en varias Regiones y quieres enviar al usuario a la de menor latencia |
| IP-based | Conoces los rangos de IP de origen de tus usuarios |
| Multivalue answer | Quieres responder con varios registros saludables elegidos al azar |
| Weighted | Quieres repartir el tráfico en proporciones (por ejemplo, 90 % / 10 % para probar una versión nueva) |

## Amazon CloudFront: la CDN de AWS

Una **CDN** (*Content Delivery Network*, red de entrega de contenido) guarda copias del contenido cerca de los usuarios. **Amazon CloudFront** acelera la distribución de contenido estático y dinámico (HTML, CSS, JavaScript, imágenes, video) a través de una red mundial de centros de datos llamados **edge locations** (ubicaciones de borde), también llamados *points of presence*.

Cómo funciona:

- Defines un **origin** (origen), que guarda la versión definitiva del contenido: un bucket de Amazon S3, un servidor HTTP o una instancia EC2, por ejemplo.
- Creas una **distribution** (distribución) que indica de qué origen obtener los archivos.
- Cuando un usuario pide un archivo, la solicitud va a la edge location con **menor latencia**. Si el archivo ya está en **caché** allí, se entrega de inmediato; si no, CloudFront lo trae del origen y lo guarda en caché.
- Las solicitudes viajan por la red troncal (*backbone*) de AWS, lo que reduce los saltos por internet.

Beneficios de las edge locations: menor latencia, mayor velocidad de transferencia y más disponibilidad, porque hay copias en muchos lugares del mundo. La cantidad de edge locations cambia con frecuencia; consulta la página oficial de infraestructura global.

## AWS Global Accelerator vs. CloudFront

**AWS Global Accelerator** mejora el rendimiento y la disponibilidad de aplicaciones para usuarios globales. Te entrega **direcciones IP estáticas** (anycast) que funcionan como punto de entrada fijo; el tráfico entra a la red de AWS por la edge location más cercana y viaja por la red global de AWS hasta el endpoint saludable más adecuado (Application Load Balancer, Network Load Balancer, instancias EC2 o Elastic IP) en una o varias Regiones.

Ambos servicios usan la red global y las edge locations de AWS, y ambos se integran con AWS Shield para protección DDoS, pero resuelven problemas distintos:

| | Amazon CloudFront | AWS Global Accelerator |
| --- | --- | --- |
| Idea principal | CDN: **caché** de contenido cerca del usuario | Acelera tráfico TCP/UDP reenviando paquetes desde el borde |
| Tráfico típico | HTTP/HTTPS: sitios web, imágenes, video, APIs | Juegos (UDP), IoT (MQTT), voz sobre IP, o HTTP que necesita IP fijas |
| Punto de entrada | Nombre de dominio de la distribución | Direcciones IP estáticas |
| Ventaja clave | Contenido en caché, menos carga en el origen | Failover regional rápido y determinístico |

## Amazon API Gateway: la puerta de entrada de tus APIs

Una **API** (*Application Programming Interface*) permite que una aplicación pida datos o acciones a otra. **Amazon API Gateway** es un servicio administrado para crear, publicar, mantener, monitorear y proteger **APIs REST, HTTP y WebSocket** a cualquier escala. AWS lo describe como la **"puerta de entrada"** (*front door*) para que las aplicaciones accedan a datos y lógica en tus backends, como funciones de **AWS Lambda** o cargas en EC2.

API Gateway se encarga de la gestión del tráfico, la autorización y el control de acceso (por ejemplo, con IAM o Amazon Cognito), el monitoreo con CloudWatch y el versionado de la API. Junto con Lambda forma la parte visible de las aplicaciones *serverless*.

## Trampas típicas del examen

- **Pensar que Route 53 solo es DNS.** También registra dominios y hace health checks para desviar tráfico.
- **Confundir Geolocation con Latency.** Geolocation decide por la ubicación del usuario; Latency, por la Región con mejor tiempo de respuesta.
- **Elegir CloudFront para un juego UDP o cuando piden IP estáticas.** La respuesta es **Global Accelerator**.
- **Creer que Global Accelerator cachea contenido.** No; la caché es de CloudFront.
- **Confundir API Gateway con un balanceador de carga.** API Gateway administra APIs (autorización, control de tráfico, versiones); un load balancer reparte tráfico entre instancias.

## Resumen para el examen

- Route 53 = DNS + registro de dominios + health checks.
- Las routing policies deciden la respuesta: simple, failover, geolocation, geoproximity, latency, IP-based, multivalue y weighted.
- CloudFront = CDN que cachea contenido en edge locations; el origen puede ser S3 o un servidor HTTP.
- Las edge locations reducen la latencia para los usuarios finales.
- Global Accelerator = IP estáticas anycast + red global de AWS para TCP/UDP, sin caché.
- Palabras clave: "caché" o "contenido estático" → CloudFront; "IP estáticas" o "UDP" → Global Accelerator.
- API Gateway = puerta de entrada administrada para APIs REST, HTTP y WebSocket, muy usada con Lambda.
