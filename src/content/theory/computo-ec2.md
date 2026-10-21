---
title: "Amazon EC2 y tipos de instancia"
summary: "Qué es Amazon EC2, qué es una AMI y cómo elegir la familia de instancia correcta (uso general, cómputo, memoria, acelerada, almacenamiento o HPC)."
domain: "technology-services"
order: 3
examTasks: ["3.3"]
services: ["Amazon EC2", "Amazon EBS"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html"
  - "https://aws.amazon.com/ec2/instance-types/"
  - "https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html"
---

## ¿Por qué importa?

Una cadena de farmacias en Santiago necesita varios servidores: uno para su sitio web, otro para procesar cada noche miles de recetas digitalizadas, una base de datos que mantiene en memoria el inventario de todas sus sucursales y un equipo de ciencia de datos que quiere entrenar un modelo de aprendizaje automático con GPU.

En lugar de comprar cuatro tipos de servidores físicos, puede lanzar en minutos **instancias de Amazon EC2** con el hardware adecuado para cada tarea, y apagarlas cuando ya no las necesite. El examen te pedirá reconocer qué tipo de instancia corresponde a cada carga de trabajo.

## ¿Qué es Amazon EC2?

**Amazon Elastic Compute Cloud (Amazon EC2)** ofrece **capacidad de cómputo escalable y bajo demanda** en la nube de AWS. Puedes lanzar tantos o tan pocos **servidores virtuales** como necesites, configurar su seguridad y red, y administrar su almacenamiento. Si la demanda sube, agregas capacidad; si baja, la reduces.

Conceptos básicos:

- **Instancia:** un servidor virtual en la nube de AWS.
- **AMI** (*Amazon Machine Image*): una **plantilla preconfigurada** con los componentes que necesita tu servidor, incluido el **sistema operativo** y el software adicional. Lanzas instancias a partir de una AMI, y puedes usar la misma AMI para lanzar muchas instancias idénticas.
- **Tipo de instancia:** la combinación de CPU, memoria, almacenamiento, capacidad de red y hardware gráfico que tendrá la instancia.
- **Volúmenes de Amazon EBS:** almacenamiento persistente para tus datos.
- **Volúmenes de *instance store*:** almacenamiento temporal que se borra al detener, hibernar o terminar la instancia.
- **Par de claves** (*key pair*): credenciales para iniciar sesión de forma segura; AWS guarda la clave pública y tú guardas la privada.
- **Security group:** un firewall virtual que define qué tráfico puede llegar a la instancia.

Con EC2 tienes **control total** del sistema operativo: tú lo configuras, lo actualizas y lo aseguras. Por eso es un ejemplo de **IaaS** (infraestructura como servicio).

## Familias de instancias

AWS agrupa los tipos de instancia en **familias** según el recurso que priorizan. El nombre de un tipo (por ejemplo, `m7g.large`) indica la familia, la generación y el tamaño.

| Familia | Qué prioriza | Cargas de trabajo típicas |
| --- | --- | --- |
| **Uso general** (*general purpose*) | Equilibrio entre cómputo, memoria y red | Servidores web, repositorios de código, bases de datos pequeñas y medianas |
| **Optimizadas para cómputo** (*compute optimized*) | Procesadores de alto rendimiento | Procesamiento por lotes, transcodificación de medios, servidores de videojuegos dedicados |
| **Optimizadas para memoria** (*memory optimized*) | Rendimiento rápido con grandes conjuntos de datos en memoria | Bases de datos en memoria, análisis de datos, aplicaciones empresariales |
| **Cómputo acelerado** (*accelerated computing*) | Aceleradores de hardware o coprocesadores (por ejemplo, GPU) | Cálculos de punto flotante, procesamiento gráfico, búsqueda de patrones en datos, aprendizaje automático |
| **Optimizadas para almacenamiento** (*storage optimized*) | E/S de baja latencia y alto rendimiento sobre grandes conjuntos de datos locales | Bases de datos de alto rendimiento, procesamiento y *streaming* de datos |
| **Optimizadas para HPC** (*HPC optimized*) | La mejor relación precio-rendimiento para computación de alto rendimiento a escala | Simulaciones complejas, aprendizaje profundo, renderizado de efectos visuales |

Cómo pensar en el examen:

- Si el escenario no destaca ningún recurso en particular → **uso general**.
- "Mucho procesamiento de CPU" o "transcodificar video" → **optimizada para cómputo**.
- "Grandes volúmenes de datos en memoria" o "base de datos en memoria" → **optimizada para memoria**.
- "GPU", "gráficos" o "aprendizaje automático" → **cómputo acelerado**.
- "Muchas lecturas y escrituras sobre almacenamiento local" → **optimizada para almacenamiento**.
- "Simulaciones a gran escala" o "HPC" → **optimizada para HPC**.

Si tus necesidades cambian, puedes cambiar el tipo de instancia. Esto es **escalado vertical** (*scale up/down*): darle más o menos capacidad a una misma instancia. El escalado horizontal (agregar o quitar instancias) se explica en el tema de elasticidad con Auto Scaling.

## ¿Y cómo se paga?

EC2 tiene varias opciones de compra (On-Demand, Savings Plans, Reserved Instances, Spot Instances, Dedicated Hosts y otras). Se explican en detalle en el tema de **modelos de compra de EC2**. Aquí basta con recordar que las instancias On-Demand se pagan por segundo de uso (con un mínimo de 60 segundos), sin compromisos a largo plazo.

## Trampas típicas del examen

- **Confundir AMI con tipo de instancia.** La AMI define el **software** (sistema operativo y aplicaciones); el tipo de instancia define el **hardware** (CPU, memoria, red).
- **Elegir "optimizada para cómputo" cuando el problema es memoria.** Lee la pista: "en memoria" apunta a la familia optimizada para memoria.
- **Elegir "optimizada para almacenamiento" para guardar archivos a largo plazo.** Esa familia es para E/S rápida sobre almacenamiento local; para guardar archivos, piensa en Amazon S3 o EBS.
- **Guardar datos importantes en *instance store*.** Ese almacenamiento es temporal y se pierde al detener o terminar la instancia; para persistencia, usa EBS.
- **Pensar que EC2 es un servicio administrado donde AWS parcha tu sistema operativo.** En EC2, el sistema operativo es tu responsabilidad.

## Resumen para el examen

- EC2 = servidores virtuales bajo demanda y escalables (IaaS).
- AMI = plantilla con sistema operativo y software para lanzar instancias.
- Tipo de instancia = combinación de CPU, memoria, almacenamiento y red.
- Uso general = equilibrio; cómputo = CPU intensiva; memoria = datos en memoria.
- Cómputo acelerado = GPU y aceleradores; almacenamiento = E/S local rápida; HPC = simulaciones a gran escala.
- Cambiar de tipo de instancia = escalado vertical.
- EBS = almacenamiento persistente; instance store = temporal.
- Las opciones de compra se estudian en el tema de modelos de compra de EC2.
