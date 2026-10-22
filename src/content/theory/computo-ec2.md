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
quiz:
  - prompt: "Una cadena de farmacias de Santiago procesa cada noche, por lotes, miles de recetas digitalizadas con un uso muy intensivo de CPU. ¿Qué familia de instancias EC2 debe elegir?"
    options:
      - label: "Uso general"
        explanation: "La familia de uso general equilibra cómputo, memoria y red; se elige cuando el escenario no destaca un recurso, y aquí destaca la CPU."
      - label: "Optimizadas para cómputo"
        explanation: "Las instancias optimizadas para cómputo usan procesadores de alto rendimiento y son típicas para procesamiento por lotes con mucha CPU."
        correct: true
      - label: "Optimizadas para memoria"
        explanation: "Las instancias optimizadas para memoria son para grandes conjuntos de datos en memoria; el escenario pide procesamiento intensivo de CPU."
      - label: "Optimizadas para almacenamiento"
        explanation: "Las instancias optimizadas para almacenamiento priorizan la E/S rápida en el almacenamiento local; el cuello de botella aquí es la CPU."
  - prompt: "Una empresa de software de Monterrey quiere lanzar 20 instancias EC2 idénticas, todas con el mismo sistema operativo y el mismo software ya instalado. ¿Qué componente de EC2 define ese sistema operativo y software?"
    options:
      - label: "El tipo de instancia"
        explanation: "El tipo de instancia define el hardware (CPU, memoria, almacenamiento y red); no define el sistema operativo ni el software."
      - label: "El security group"
        explanation: "El security group es un firewall virtual que controla qué tráfico llega a la instancia; no contiene el sistema operativo."
      - label: "El par de claves (key pair)"
        explanation: "El par de claves son credenciales para iniciar sesión de forma segura; no definen el software de la instancia."
      - label: "La AMI (Amazon Machine Image)"
        explanation: "La AMI es una plantilla preconfigurada con el sistema operativo y el software; con la misma AMI lanzas muchas instancias idénticas."
        correct: true
  - prompt: "Un equipo de TI de Cali lanza una instancia de Amazon EC2 para su sitio web. ¿Quién es responsable de aplicar los parches del sistema operativo de esa instancia?"
    options:
      - label: "El cliente, porque EC2 es IaaS y le da control total del sistema operativo"
        explanation: "En EC2 tú configuras, actualizas y aseguras el sistema operativo; por eso EC2 es un ejemplo de infraestructura como servicio (IaaS)."
        correct: true
      - label: "AWS, porque EC2 es un servicio totalmente administrado"
        explanation: "EC2 no es un servicio administrado donde AWS parcha tu sistema operativo; esa es una trampa típica del examen."
      - label: "AWS, siempre que la instancia sea del tipo de uso general"
        explanation: "La familia de instancia solo define el hardware; no cambia quién es responsable de parchar el sistema operativo."
      - label: "AWS, porque la AMI se actualiza sola en cada instancia"
        explanation: "La AMI es una plantilla para lanzar instancias; una vez lanzada la instancia, mantener el sistema operativo es tu responsabilidad."
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
