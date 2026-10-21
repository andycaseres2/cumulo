---
title: "Beneficios de la nube de AWS"
summary: "Entiende las seis ventajas de la computación en la nube que AWS define y cómo reconocerlas en las preguntas del examen."
domain: "cloud-concepts"
order: 1
services: []
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
---

## ¿Por qué importa?

Imagina una panadería en Lima que vende panetones por internet. Durante once meses del año su tienda en línea recibe pocas visitas, pero en diciembre las visitas se multiplican y el sitio se cae justo cuando más clientes quieren comprar. Para evitarlo, la dueña tendría dos caminos tradicionales: comprar servidores grandes que pasarán casi todo el año sin usarse, o arriesgarse a perder ventas en Navidad.

La computación en la nube ofrece un tercer camino: usar recursos de tecnología **cuando se necesitan y pagar solo por lo que se usa**. Ese cambio de mentalidad es la base de todo el examen AWS Certified Cloud Practitioner, y AWS lo resume en seis ventajas que conviene conocer por su nombre.

## ¿Qué es la computación en la nube?

La **computación en la nube** (*cloud computing*) es la entrega de recursos de tecnología, como servidores, almacenamiento, bases de datos y redes, a través de internet y con un modelo de **pago por uso** (*pay-as-you-go*). En lugar de comprar y mantener un centro de datos propio, una empresa "alquila" esos recursos a un proveedor como AWS y los activa o apaga en minutos.

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

## Conceptos relacionados que el examen mezcla

Además de las seis ventajas, hay ideas cercanas que conviene distinguir:

- **Elasticidad:** capacidad de aumentar o reducir recursos automáticamente según la demanda. Está ligada a *stop guessing capacity*.
- **Escalabilidad:** capacidad de un sistema para crecer y atender más carga.
- **Alta disponibilidad:** que una aplicación siga funcionando aunque falle una parte de la infraestructura.
- **Agilidad:** rapidez para obtener recursos y experimentar. En el lenguaje de AWS, "agilidad" no significa que el código sea más rápido, sino que el negocio puede moverse más rápido.

Una forma útil de estudiar es leer cada escenario del examen y preguntarte: ¿el problema es de **costo**, de **capacidad**, de **velocidad** o de **alcance geográfico**? Casi siempre la respuesta apunta a una de las seis ventajas.

## Trampas típicas del examen

- **Confundir economías de escala con gasto variable.** "Precios más bajos porque AWS agrupa a muchos clientes" es *economies of scale*; "pagar solo por lo que uso" es *trade fixed expense for variable expense*.
- **Pensar que la nube elimina todos los costos.** La nube cambia el tipo de gasto (de CapEx a OpEx variable); no lo hace desaparecer.
- **Asociar "agilidad" con rendimiento técnico.** En AWS, agilidad es reducir el tiempo para obtener recursos y experimentar.
- **Elegir "go global in minutes" cuando la pregunta habla de demanda impredecible.** La demanda variable se resuelve con *stop guessing capacity* y la elasticidad.

## Resumen para el examen

- La nube entrega recursos de TI por internet con pago por uso.
- Memoriza las seis ventajas por su nombre en inglés.
- Gasto variable = pagar solo cuando consumes y lo que consumes.
- Economías de escala = precios más bajos gracias al volumen agregado de clientes.
- *Stop guessing capacity* = escalar con minutos de aviso, sin sobredimensionar.
- Agilidad = recursos en minutos en lugar de semanas.
- *Go global in minutes* = desplegar en varias Regiones con menor latencia.
