---
title: "Beneficios de la nube de AWS"
summary: "Entiende la propuesta de valor de AWS, sus seis ventajas oficiales y los beneficios de la infraestructura global: alta disponibilidad, elasticidad y agilidad."
domain: "cloud-concepts"
order: 1
examTasks: ["1.1"]
services: []
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/global-infrastructure.html"
  - "https://aws.amazon.com/about-aws/global-infrastructure/"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-dp.html"
---

## ¿Por qué importa?

Imagina una panadería en Lima que vende panetones por internet. Durante once meses del año su tienda en línea recibe pocas visitas, pero en diciembre las visitas se multiplican y el sitio se cae justo cuando más clientes quieren comprar. Para evitarlo, la dueña tendría dos caminos tradicionales: comprar servidores grandes que pasarán casi todo el año sin usarse, o arriesgarse a perder ventas en Navidad.

La computación en la nube ofrece un tercer camino: usar recursos de tecnología **cuando se necesitan y pagar solo por lo que se usa**. Ese cambio de mentalidad es la base de todo el examen AWS Certified Cloud Practitioner, y AWS lo resume en seis ventajas que conviene conocer por su nombre.

## La propuesta de valor de la nube de AWS

La **computación en la nube** (*cloud computing*) es la entrega de recursos de tecnología, como servidores, almacenamiento, bases de datos y redes, a través de internet y con un modelo de **pago por uso** (*pay-as-you-go*).

La **propuesta de valor** es la respuesta a "¿por qué una empresa elegiría la nube de AWS?". En resumen: pagar solo por lo que consume, obtener precios más bajos gracias a la escala de AWS, tener recursos en minutos, no adivinar la capacidad, dejar de invertir esfuerzo en operar centros de datos y llegar a clientes de todo el mundo.

Dos términos que verás mucho:

- **Gasto de capital (CapEx):** dinero que se invierte por adelantado en bienes físicos, como comprar servidores.
- **Gasto operativo (OpEx) o gasto variable:** dinero que se paga a medida que se consume un servicio, como la factura de la luz.

## Las seis ventajas de la nube según AWS

AWS describe oficialmente seis ventajas. El examen suele usar sus nombres en inglés, así que aquí aparecen ambos.

| Ventaja (nombre oficial) | Qué significa | Ejemplo |
| --- | --- | --- |
| **Trade fixed expense for variable expense** (cambiar gasto fijo por gasto variable) | En vez de invertir mucho en centros de datos antes de saber cuánto los usarás, pagas solo cuando consumes y solo lo que consumes. | La panadería paga más servidores únicamente en diciembre. |
| **Benefit from massive economies of scale** (beneficiarse de economías de escala masivas) | Como AWS agrupa el uso de cientos de miles de clientes, consigue costos más bajos que se traducen en precios de pago por uso más bajos. | Una startup accede a precios que no lograría comprando hardware sola. |
| **Stop guessing capacity** (dejar de adivinar la capacidad) | Ya no tienes que adivinar cuánta infraestructura necesitarás; escalas hacia arriba o hacia abajo con pocos minutos de aviso. | Ni servidores ociosos ni sitio caído por falta de capacidad. |
| **Increase speed and agility** (aumentar la velocidad y la agilidad) | Los nuevos recursos están "a un clic"; el tiempo para tenerlos pasa de semanas a minutos, y experimentar cuesta menos. | Un banco en Bogotá prueba una nueva app en una tarde. |
| **Stop spending money running and maintaining data centers** (dejar de gastar en operar y mantener centros de datos) | Te enfocas en lo que diferencia a tu negocio, no en instalar, cablear y alimentar servidores. | El equipo de TI dedica su tiempo a mejorar la tienda en línea. |
| **Go global in minutes** (volverse global en minutos) | Despliegas tu aplicación en varias Regiones del mundo con pocos clics, con menor latencia para tus clientes y a un costo mínimo. | Una plataforma de streaming chilena llega a usuarios en México y España. |

## Beneficios de la infraestructura global

La infraestructura de AWS se organiza en **Regiones** y **Availability Zones (AZ)**. Una **Región** es una ubicación física del mundo con varias AZ. Una **AZ** está formada por uno o más centros de datos separados, cada uno con energía, red y conectividad redundantes. La cantidad de Regiones y AZ cambia con frecuencia; consúltala en la página oficial de infraestructura global.

Lo que sí debes saber son sus beneficios:

- **Velocidad de despliegue (*speed of deployment*):** puedes lanzar una aplicación en una Región nueva con pocos clics, sin construir ni alquilar un centro de datos en ese país.
- **Alcance global (*global reach*):** colocas la aplicación cerca de tus usuarios para darles **menor latencia** (menos tiempo de respuesta) y una mejor experiencia.
- **Disponibilidad y tolerancia a fallos:** al repartir una aplicación entre varias AZ, logras sistemas más disponibles, tolerantes a fallos y escalables que con un solo centro de datos.

## Alta disponibilidad, elasticidad y agilidad

Estas tres ideas aparecen una y otra vez en el examen:

| Concepto | Definición | Cómo lo logras en AWS |
| --- | --- | --- |
| **Alta disponibilidad** (*high availability*) | Que la aplicación siga funcionando aunque falle una parte de la infraestructura. | Desplegar en varias AZ para no depender de un único punto de falla. |
| **Elasticidad** (*elasticity*) | Aumentar o reducir recursos automáticamente según la demanda, sin sobredimensionar ni quedarse corto. | Agregar y quitar servidores de forma automática al subir o bajar el tráfico. |
| **Agilidad** (*agility*) | Rapidez para obtener recursos, experimentar e innovar a bajo costo. | Recursos disponibles en minutos en lugar de semanas. |

Un concepto cercano es la **escalabilidad**: la capacidad de un sistema para crecer y atender más carga. La elasticidad es la escalabilidad **automática y en ambos sentidos** (crecer y reducirse). En el lenguaje de AWS, "agilidad" no significa que el código sea más rápido, sino que el negocio puede moverse más rápido.

## Trampas típicas del examen

- **Confundir economías de escala con gasto variable.** "Precios más bajos porque AWS agrupa a muchos clientes" es *economies of scale*; "pagar solo por lo que uso" es *trade fixed expense for variable expense*.
- **Pensar que la nube elimina todos los costos.** La nube cambia el tipo de gasto (de CapEx a OpEx variable); no lo hace desaparecer.
- **Asociar "agilidad" con rendimiento técnico.** En AWS, agilidad es reducir el tiempo para obtener recursos y experimentar.
- **Confundir elasticidad con alta disponibilidad.** Elasticidad responde a cambios de **demanda**; alta disponibilidad responde a **fallas**.
- **Elegir "go global in minutes" cuando la pregunta habla de demanda impredecible.** La demanda variable se resuelve con *stop guessing capacity* y la elasticidad.

## Resumen para el examen

- La nube entrega recursos de TI por internet con pago por uso.
- Memoriza las seis ventajas por su nombre en inglés.
- Gasto variable = pagar solo cuando consumes y lo que consumes.
- Economías de escala = precios más bajos gracias al volumen agregado de clientes.
- *Stop guessing capacity* = escalar con minutos de aviso, sin sobredimensionar.
- Infraestructura global = velocidad de despliegue y alcance global con menor latencia.
- Alta disponibilidad = seguir funcionando ante fallas, usando varias AZ.
- Elasticidad = crecer y reducirse automáticamente según la demanda.
- Agilidad = recursos en minutos en lugar de semanas.
