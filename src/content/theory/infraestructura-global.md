---
title: "Infraestructura global: Regiones, Zonas de Disponibilidad y ubicaciones de borde"
summary: "Entiende cómo se relacionan Regiones, Availability Zones y ubicaciones de borde, cómo lograr alta disponibilidad y cuándo usar varias Regiones."
domain: "technology-services"
order: 2
examTasks: ["3.2"]
services: ["Amazon CloudFront", "AWS Local Zones", "Amazon S3", "AWS Global Accelerator"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"
  - "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
  - "https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html"
  - "https://aws.amazon.com/blogs/architecture/what-to-consider-when-selecting-a-region-for-your-workloads/"
quiz:
  - prompt: "Un banco de Bogotá quiere que su app móvil siga funcionando aunque un centro de datos se quede sin energía. ¿Cuál es el enfoque típico para lograr esta alta disponibilidad?"
    options:
      - label: "Ejecutar la app en ubicaciones de borde de CloudFront"
        explanation: "Las ubicaciones de borde se usan principalmente para entregar contenido en caché con CloudFront, no para ejecutar toda la aplicación."
      - label: "Elegir la Región más cercana a los usuarios"
        explanation: "La cercanía reduce la latencia, pero desplegar en una sola ubicación no protege contra la falla de un centro de datos."
      - label: "Desplegar la app en varias Availability Zones de la Región"
        explanation: "Las AZ no comparten puntos únicos de falla; si una AZ tiene un problema, las instancias de las otras siguen atendiendo."
        correct: true
      - label: "Usar instancias más grandes en una sola Availability Zone"
        explanation: "Una instancia más grande en una sola AZ sigue dependiendo de esa AZ; si falla, la app deja de funcionar."
  - prompt: "Una regulación exige a una aseguradora de Lima que los datos de sus clientes permanezcan en un país determinado. Al elegir la Región de AWS, ¿qué factor debe pesar más?"
    options:
      - label: "Cumplimiento y residencia de datos"
        explanation: "Cuando hay una regulación sobre dónde deben estar los datos, el cumplimiento y la residencia de datos pesan más que los demás factores."
        correct: true
      - label: "Precio de la Región"
        explanation: "Los precios varían entre Regiones, pero una Región más barata no sirve si incumple la regulación sobre la ubicación de los datos."
      - label: "Cercanía a los usuarios"
        explanation: "La cercanía mejora la latencia, pero no garantiza cumplir la exigencia legal sobre dónde se guardan los datos."
      - label: "Cantidad de servicios disponibles"
        explanation: "Los servicios disponibles importan, pero ante una regulación de residencia de datos el cumplimiento pesa más."
  - prompt: "¿Qué componente de la infraestructura global de AWS usa Amazon CloudFront para entregar contenido en caché a los usuarios con menor latencia?"
    options:
      - label: "Availability Zones"
        explanation: "Las Availability Zones son centros de datos dentro de una Región que aportan alta disponibilidad; no son los puntos de caché de CloudFront."
      - label: "AWS Local Zones"
        explanation: "Las Local Zones son extensiones de una Región que acercan cómputo y otros servicios a grandes ciudades; no son la red de caché de CloudFront."
      - label: "Regiones"
        explanation: "Una Región es un área geográfica con varias AZ; el contenido en caché de CloudFront se entrega desde otro tipo de ubicación."
      - label: "Ubicaciones de borde (edge locations)"
        explanation: "CloudFront dirige cada solicitud a la ubicación de borde con menor latencia y entrega desde ahí el contenido que ya está en caché."
        correct: true
---

## ¿Por qué importa?

Un banco en Bogotá quiere que su app móvil siga funcionando aunque un centro de datos se quede sin energía. Además, la regulación le exige saber exactamente en qué país se guardan los datos de sus clientes, su área de riesgo pide un plan por si toda una zona geográfica queda fuera de servicio, y marketing quiere que los videos promocionales carguen rápido en toda Latinoamérica.

Resiliencia, ubicación de los datos, continuidad del negocio y velocidad para el usuario: todo se resuelve con la forma en que AWS organiza su **infraestructura global**.

## Regiones

Una **Región de AWS** es una ubicación física en el mundo donde AWS agrupa centros de datos. Cada Región está formada por **varias Availability Zones independientes y físicamente separadas** dentro de un área geográfica; AWS indica que cada Región tiene **al menos tres**.

Las Regiones están **aisladas** entre sí: si un servicio falla en una Región, las demás siguen operando con normalidad. Además, **los recursos y datos que creas en una Región no existen en otra** a menos que tú los repliques o copies explícitamente con una función del servicio.

### Cómo elegir una Región

- **Cumplimiento y residencia de datos:** dónde exige la ley que estén los datos. Si hay una regulación, este factor pesa más que los demás.
- **Cercanía a los usuarios:** una Región más cercana suele dar menor **latencia** (el tiempo de demora en la comunicación).
- **Servicios disponibles:** no todos los servicios y funciones llegan a la vez a todas las Regiones.
- **Precio:** los precios pueden variar entre Regiones.

El número de Regiones crece con frecuencia; consulta la página oficial de infraestructura global para ver la cifra actual.

## Availability Zones y alta disponibilidad

Una **Availability Zone (AZ)** es **uno o más centros de datos discretos con energía, redes y conectividad redundantes** dentro de una Región. Cada AZ tiene su propia energía, refrigeración y seguridad física.

Puntos clave para el examen:

- Las AZ **no comparten puntos únicos de falla**: elementos como generadores y equipos de refrigeración no se comparten entre AZ, y se alimentan de subestaciones eléctricas distintas.
- Están separadas por una distancia significativa, de hasta unos 100 km (60 millas), para evitar fallas correlacionadas como inundaciones, incendios o cortes de energía.
- Están interconectadas con redes redundantes de alto ancho de banda y baja latencia, lo que permite replicación síncrona entre ellas.

La **alta disponibilidad** (*high availability*) es la capacidad de un sistema de seguir funcionando aunque falle alguno de sus componentes. En AWS se logra desplegando la aplicación en **varias AZ**: si una AZ tiene un problema, las instancias de las otras siguen atendiendo. Por ejemplo, Amazon S3 Standard guarda los objetos de forma redundante en un mínimo de tres AZ, y un balanceador de carga puede repartir el tráfico entre instancias en varias AZ.

## Cuándo usar varias Regiones

Varias AZ protegen contra la falla de un centro de datos. Usar **varias Regiones** tiene sentido cuando necesitas:

| Necesidad | Por qué varias Regiones |
| --- | --- |
| **Recuperación ante desastres** (*disaster recovery*) | Si tu definición de desastre incluye la pérdida de una Región completa, necesitas una copia en otra Región. |
| **Continuidad del negocio** | Mantener el servicio aunque una Región entera quede fuera de servicio, por ejemplo con una estrategia activo/activo en varias Regiones. |
| **Baja latencia para usuarios finales** | Atender a usuarios de distintos continentes desde la Región más cercana a cada uno. |
| **Soberanía de datos** (*data sovereignty*) | Cumplir leyes que exigen que ciertos datos permanezcan en un país o jurisdicción; por ejemplo, guardar los datos de clientes de un país en una Región de ese país. |

AWS describe estrategias de recuperación ante desastres de menor a mayor costo y complejidad: **backup and restore**, **pilot light**, **warm standby** y **multi-site active/active**. Para reconstruir la infraestructura en otra Región, AWS recomienda usar infraestructura como código.

## Ubicaciones de borde y Local Zones

- **Ubicaciones de borde** (*edge locations*): centros de datos distribuidos por el mundo, separados de las Regiones, que usa **Amazon CloudFront**, la red de entrega de contenido (CDN) de AWS. Cuando un usuario pide contenido, la solicitud se dirige a la ubicación de borde con **menor latencia**. Si el contenido ya está en **caché** (copia temporal) ahí, se entrega de inmediato; si no, CloudFront lo obtiene del **origen** (por ejemplo, un bucket de S3) y lo guarda en caché.
- **Beneficios de las ubicaciones de borde:** menor latencia para el usuario final, menos carga sobre el origen y entrada más rápida del tráfico a la red de AWS. **AWS Global Accelerator** también usa la red de borde de AWS para llevar el tráfico a la red troncal de AWS lo antes posible.
- **AWS Local Zones:** colocan cómputo, almacenamiento, bases de datos y otros servicios seleccionados **cerca de grandes centros de población e industria**, para ofrecer latencia muy baja. Cada Local Zone es una extensión de una Región.

| Componente | Qué es | Para qué sirve |
| --- | --- | --- |
| **Región** | Área geográfica con al menos tres AZ aisladas | Residencia de datos, cercanía, aislamiento de fallas |
| **Availability Zone** | Uno o más centros de datos con energía y red redundantes | Alta disponibilidad dentro de una Región |
| **Ubicación de borde** | Punto de presencia de la red de AWS (CloudFront) | Entregar contenido en caché con menor latencia |
| **Local Zone** | Extensión de una Región cerca de grandes ciudades | Aplicaciones que necesitan latencia muy baja |

## Trampas típicas del examen

- **Confundir AZ con Región.** Una Región *contiene* varias AZ; una AZ no es un país ni una ciudad.
- **Creer que una AZ es siempre un solo centro de datos.** Es **uno o más** centros de datos.
- **Pensar que los datos se replican solos entre Regiones.** No ocurre a menos que tú lo configures.
- **Elegir "varias Regiones" cuando basta con alta disponibilidad.** Para tolerar la falla de un centro de datos, la respuesta típica es **varias AZ**. Varias Regiones aplican a desastres regionales, soberanía de datos o usuarios globales.
- **Usar ubicaciones de borde para ejecutar toda la aplicación.** Su función principal en el examen es la entrega de contenido en caché con CloudFront.

## Resumen para el examen

- Región = área geográfica con al menos tres AZ aisladas; las Regiones están aisladas entre sí.
- Los datos no salen de una Región sin acción explícita.
- Elige Región por cumplimiento, cercanía, servicios disponibles y precio.
- AZ = uno o más centros de datos con energía, red y conectividad redundantes.
- Las AZ no comparten puntos únicos de falla → varias AZ = alta disponibilidad.
- Varias Regiones = recuperación ante desastres, continuidad del negocio, baja latencia global y soberanía de datos.
- Ubicaciones de borde = CloudFront, contenido en caché cerca del usuario.
- Local Zones = extensión de una Región para latencia muy baja.
