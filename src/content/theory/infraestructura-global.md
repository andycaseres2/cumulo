---
title: "Infraestructura global: Regiones, Zonas de Disponibilidad y ubicaciones de borde"
summary: "Entiende cómo se organiza la infraestructura de AWS en Regiones, Availability Zones, ubicaciones de borde y Local Zones, y para qué sirve cada una."
domain: "technology-services"
order: 1
services: ["Amazon CloudFront", "AWS Local Zones", "Amazon S3"]
readingMinutes: 4
sources:
  - "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html"
  - "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
  - "https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html"
---

## ¿Por qué importa?

Un banco en Bogotá quiere que su app móvil siga funcionando aunque un centro de datos se quede sin energía. Además, la regulación le exige saber exactamente en qué país se guardan los datos de sus clientes, y su área de marketing quiere que los videos promocionales carguen rápido en toda Latinoamérica.

Las tres necesidades (resiliencia, ubicación de los datos y velocidad para el usuario) se resuelven con la forma en que AWS organiza su **infraestructura global**. Conocer sus piezas es fundamental para el examen.

## Regiones

Una **Región de AWS** es una ubicación física en el mundo donde AWS agrupa centros de datos. Cada Región está formada por **varias Availability Zones independientes y físicamente separadas** dentro de un área geográfica; AWS indica que cada Región tiene **al menos tres**.

Las Regiones están **aisladas** entre sí: si un servicio falla en una Región, las demás siguen operando con normalidad. Además, **los datos que creas en una Región no existen en otra** a menos que tú los repliques o copies explícitamente. Por eso la elección de Región importa para cumplir regulaciones de residencia de datos.

Al elegir una Región conviene considerar:

- **Cumplimiento y residencia de datos:** dónde exige la ley que estén los datos.
- **Cercanía a los usuarios:** una Región más cercana suele dar menor latencia (el tiempo de demora en la comunicación).
- **Servicios disponibles:** no todos los servicios llegan a la vez a todas las Regiones; hay que verificarlo.
- **Precio:** los precios pueden variar entre Regiones.

El número exacto de Regiones crece con frecuencia; consulta la página oficial de infraestructura global para ver la cifra actual.

## Availability Zones (Zonas de Disponibilidad)

Una **Availability Zone (AZ)** es **uno o más centros de datos discretos con energía, redes y conectividad redundantes** dentro de una Región. Cada AZ tiene su propia energía, refrigeración y seguridad física. Las AZ están separadas por una distancia significativa, de muchos kilómetros, pero todas se encuentran a menos de 100 km (60 millas) entre sí.

La idea clave: si despliegas tu aplicación en **varias AZ**, un problema en una de ellas no tumba todo tu sistema. Eso es **alta disponibilidad**. Por ejemplo, Amazon S3 Standard guarda los objetos de forma redundante en un mínimo de tres AZ.

## Ubicaciones de borde y Local Zones

- **Ubicaciones de borde** (*edge locations*): centros de datos distribuidos por el mundo que usa **Amazon CloudFront**, la red de entrega de contenido (CDN) de AWS. Cuando un usuario pide contenido, la solicitud se dirige a la ubicación de borde con **menor latencia**. Si el contenido ya está en caché ahí, se entrega de inmediato; si no, CloudFront lo obtiene del **origen** (por ejemplo, un bucket de S3) y lo guarda en caché.
- **AWS Local Zones:** colocan cómputo, almacenamiento, bases de datos y otros servicios seleccionados **cerca de grandes centros de población e industria**, para ofrecer muy baja latencia. Cada Local Zone es una extensión de una Región.

| Componente | Qué es | Para qué sirve |
| --- | --- | --- |
| **Región** | Área geográfica con varias AZ aisladas | Residencia de datos, cercanía, aislamiento de fallas |
| **Availability Zone** | Uno o más centros de datos con energía y red redundantes | Alta disponibilidad dentro de una Región |
| **Ubicación de borde** | Punto de presencia de CloudFront | Entregar contenido en caché con menor latencia |
| **Local Zone** | Extensión de una Región cerca de grandes ciudades | Aplicaciones que necesitan latencia muy baja |

## Trampas típicas del examen

- **Confundir AZ con Región.** Una Región *contiene* varias AZ; una AZ no es un país ni una ciudad.
- **Creer que una AZ es siempre un solo centro de datos.** Es **uno o más** centros de datos.
- **Pensar que los datos se replican solos entre Regiones.** No ocurre a menos que tú lo configures.
- **Elegir "desplegar en varias Regiones" cuando basta con alta disponibilidad.** Para tolerar la falla de un centro de datos, la respuesta típica es usar **varias AZ**.
- **Usar ubicaciones de borde para ejecutar toda la aplicación.** Su función principal en el examen es la entrega de contenido en caché con CloudFront.

## Resumen para el examen

- Región = ubicación geográfica con al menos tres AZ aisladas.
- Las Regiones están aisladas; los datos no salen de una Región sin acción explícita.
- Elige Región por cumplimiento, cercanía, servicios disponibles y precio.
- AZ = uno o más centros de datos con energía, red y conectividad redundantes.
- Varias AZ = alta disponibilidad.
- Ubicaciones de borde = CloudFront, contenido en caché cerca del usuario.
- Local Zones = extensión de una Región para latencia muy baja.
