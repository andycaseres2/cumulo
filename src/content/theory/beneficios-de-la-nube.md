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
quiz:
  - prompt: "Una startup de Montevideo obtiene en AWS precios de pago por uso más bajos de los que lograría comprando su propio hardware, porque AWS agrupa el uso de cientos de miles de clientes. ¿Qué ventaja de la nube describe esta situación?"
    options:
      - label: "Trade fixed expense for variable expense"
        explanation: "Esta ventaja trata de pagar solo cuando consumes y solo lo que consumes, no de precios más bajos por el volumen agregado de clientes."
      - label: "Benefit from massive economies of scale"
        explanation: "Al agrupar el uso de cientos de miles de clientes, AWS consigue costos más bajos que se traducen en precios de pago por uso más bajos."
        correct: true
      - label: "Stop guessing capacity"
        explanation: "Esta ventaja se refiere a escalar hacia arriba o hacia abajo con pocos minutos de aviso, no al precio obtenido por la escala de AWS."
      - label: "Go global in minutes"
        explanation: "Esta ventaja trata de desplegar en varias Regiones del mundo con pocos clics; el escenario habla de precios, no de alcance geográfico."
  - prompt: "Una tienda en línea de Quito necesita que su aplicación siga funcionando aunque falle una parte de la infraestructura. ¿Qué concepto busca y cómo lo logra en AWS?"
    options:
      - label: "Elasticidad, agregando y quitando servidores automáticamente según el tráfico"
        explanation: "La elasticidad responde a cambios de demanda, no a fallas; el escenario pide seguir funcionando cuando algo falla."
      - label: "Agilidad, obteniendo recursos en minutos en lugar de semanas"
        explanation: "La agilidad es la rapidez para obtener recursos y experimentar; no protege a la aplicación ante una falla de infraestructura."
      - label: "Go global in minutes, desplegando en una Región cercana a sus usuarios"
        explanation: "Acercar la aplicación a los usuarios reduce la latencia, pero el escenario pide tolerar fallas, no mejorar el tiempo de respuesta."
      - label: "Alta disponibilidad, desplegando la aplicación en varias Availability Zones"
        explanation: "Alta disponibilidad es seguir funcionando aunque falle una parte de la infraestructura, y se logra desplegando en varias AZ para no depender de un único punto de falla."
        correct: true
  - prompt: "Un banco de Bogotá antes esperaba semanas para obtener servidores nuevos; en AWS los tiene en minutos y puede probar una nueva app en una tarde a bajo costo. ¿Qué ventaja de la nube aprovecha?"
    options:
      - label: "Increase speed and agility"
        explanation: "Con esta ventaja los nuevos recursos están a un clic: el tiempo para tenerlos pasa de semanas a minutos y experimentar cuesta menos."
        correct: true
      - label: "Benefit from massive economies of scale"
        explanation: "Las economías de escala explican precios más bajos por el volumen de clientes de AWS, no la rapidez para obtener recursos y experimentar."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "Esta ventaja trata de dejar de instalar, cablear y alimentar servidores; el escenario destaca la velocidad para probar ideas."
      - label: "Go global in minutes"
        explanation: "Esta ventaja trata de llegar a usuarios en varias Regiones del mundo; el banco busca rapidez para experimentar, no alcance global."
practice:
  - prompt: "Una tienda de artesanías de Oaxaca vende casi todo en temporada alta. Antes compraba servidores con un gran pago inicial; en AWS su factura sube en temporada alta y baja el resto del año, según lo que usa. ¿Qué ventaja de la nube describe este cambio?"
    options:
      - label: "Benefit from massive economies of scale"
        explanation: "Las economías de escala explican precios más bajos porque AWS agrupa a muchos clientes; el escenario habla de pagar solo por lo que se consume."
      - label: "Go global in minutes"
        explanation: "Esta ventaja trata de desplegar en varias Regiones del mundo con pocos clics; no describe el cambio en la forma de pagar."
      - label: "Trade fixed expense for variable expense"
        explanation: "Esta ventaja significa dejar de invertir por adelantado y pagar solo cuando consumes y solo lo que consumes."
        correct: true
      - label: "Increase speed and agility"
        explanation: "Esta ventaja trata de obtener recursos en minutos en lugar de semanas; el escenario se centra en el modelo de pago."
  - prompt: "Una empresa de venta de boletos de Bogotá nunca sabe cuánta demanda tendrá: antes compraba servidores de más o se quedaba corta. En AWS escala hacia arriba o hacia abajo con pocos minutos de aviso. ¿Qué ventaja aprovecha?"
    options:
      - label: "Stop guessing capacity"
        explanation: "Con esta ventaja ya no adivinas cuánta infraestructura necesitas: escalas hacia arriba o hacia abajo con pocos minutos de aviso."
        correct: true
      - label: "Go global in minutes"
        explanation: "Go global in minutes trata de llegar a usuarios en varias Regiones; la demanda impredecible se resuelve con stop guessing capacity."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "Esta ventaja trata de dejar de instalar, cablear y alimentar servidores; no describe escalar según una demanda incierta."
      - label: "Benefit from massive economies of scale"
        explanation: "Las economías de escala explican precios más bajos por el volumen de clientes de AWS, no la capacidad de escalar con minutos de aviso."
  - prompt: "Una cooperativa de Arequipa cerró su cuarto de servidores al migrar a AWS: ya no reemplaza discos dañados ni mantiene la refrigeración, y su equipo dedica ese tiempo a lo que diferencia a su negocio. ¿Qué ventaja de la nube describe este caso?"
    options:
      - label: "Increase speed and agility"
        explanation: "Esta ventaja trata de obtener recursos en minutos y experimentar a bajo costo; el escenario destaca dejar de operar servidores."
      - label: "Trade fixed expense for variable expense"
        explanation: "Esta ventaja trata de pagar solo lo que consumes; el escenario habla de liberar al equipo del trabajo físico con servidores."
      - label: "Stop guessing capacity"
        explanation: "Esta ventaja trata de escalar con minutos de aviso sin adivinar la capacidad; no describe dejar de instalar y cablear servidores."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "Con esta ventaja te enfocas en lo que diferencia a tu negocio en lugar de instalar, cablear y alimentar servidores."
        correct: true
  - prompt: "Una plataforma de cursos en línea de Santiago quiere llegar a estudiantes de México y España con menor latencia, desplegando su aplicación en varias Regiones con pocos clics y a un costo mínimo. ¿Qué ventaja de la nube aprovecha?"
    options:
      - label: "Stop guessing capacity"
        explanation: "Esta ventaja trata de escalar según la demanda con minutos de aviso; el escenario busca acercarse a usuarios de otros países."
      - label: "Go global in minutes"
        explanation: "Esta ventaja permite desplegar en varias Regiones del mundo con pocos clics, con menor latencia para los clientes y a un costo mínimo."
        correct: true
      - label: "Trade fixed expense for variable expense"
        explanation: "Esta ventaja trata de pagar solo lo que consumes; no describe desplegar en otras Regiones para reducir la latencia."
      - label: "Benefit from massive economies of scale"
        explanation: "Las economías de escala explican precios más bajos por el volumen de clientes de AWS; no tratan del alcance geográfico."
  - prompt: "Un sitio de noticias de Buenos Aires recibe picos de tráfico impredecibles y quiere agregar y quitar servidores automáticamente según la demanda, sin sobredimensionar ni quedarse corto. ¿Qué concepto describe esta necesidad?"
    options:
      - label: "Alta disponibilidad"
        explanation: "La alta disponibilidad responde a fallas de infraestructura; el escenario habla de cambios en la demanda."
      - label: "Agilidad"
        explanation: "La agilidad es la rapidez para obtener recursos y experimentar; no describe el ajuste automático según el tráfico."
      - label: "Elasticidad"
        explanation: "La elasticidad es aumentar o reducir recursos automáticamente según la demanda, agregando y quitando servidores al subir o bajar el tráfico."
        correct: true
      - label: "Alcance global"
        explanation: "El alcance global consiste en colocar la aplicación cerca de los usuarios para reducir la latencia, no en ajustarse a los picos de tráfico."
  - prompt: "El gerente financiero de una distribuidora de Asunción cree que al migrar a AWS desaparecerán todos los costos de tecnología de la empresa. ¿Qué afirmación es correcta?"
    options:
      - label: "La nube elimina todos los costos de tecnología"
        explanation: "La nube cambia el tipo de gasto, pero no lo hace desaparecer; la empresa sigue pagando por lo que consume."
      - label: "La nube cambia el gasto de capital (CapEx) por gasto operativo variable (OpEx), pero no lo hace desaparecer"
        explanation: "Con la nube dejas de invertir por adelantado en bienes físicos y pagas a medida que consumes; el gasto cambia de tipo, pero sigue existiendo."
        correct: true
      - label: "La nube convierte el gasto operativo variable en gasto de capital"
        explanation: "Ocurre al revés: la nube cambia el gasto de capital por adelantado por gasto variable que se paga según el consumo."
      - label: "La nube obliga a pagar por adelantado la capacidad de todo el año"
        explanation: "La nube funciona con pago por uso: pagas a medida que consumes, en lugar de invertir por adelantado en capacidad."
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
