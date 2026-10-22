---
title: "AWS Well-Architected Framework: los seis pilares"
summary: "Conoce el AWS Well-Architected Framework, sus seis pilares con sus principios de diseño y cómo distinguir cada pilar en un escenario del examen."
domain: "cloud-concepts"
order: 3
examTasks: ["1.2"]
services: ["AWS Well-Architected Tool"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-design.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-design-principles.html"
  - "https://aws.amazon.com/well-architected-tool/"
quiz:
  - prompt: "Una fintech de Santiago decide desplegar cambios frecuentes, pequeños y reversibles, y gestionar su operación como código. ¿A qué pilar del AWS Well-Architected Framework corresponde esta práctica?"
    options:
      - label: "Operational excellence"
        explanation: "Hacer cambios frecuentes, pequeños y reversibles y automatizar las operaciones (por ejemplo, como código) son principios de diseño de excelencia operativa."
        correct: true
      - label: "Security"
        explanation: "Seguridad se centra en identidad, trazabilidad y protección de datos; los cambios pequeños y reversibles no son un principio de este pilar."
      - label: "Reliability"
        explanation: "Confiabilidad se centra en recuperarse de fallas y probar la recuperación; el escenario describe cómo operar y desplegar cambios."
      - label: "Performance efficiency"
        explanation: "Eficiencia del rendimiento trata de elegir los recursos adecuados y usarlos de forma eficiente, no de cómo se despliegan los cambios."
  - prompt: "Una empresa de logística de Lima quiere reducir el consumo de energía y la huella ambiental de su carga de trabajo, maximizando la utilización y evitando recursos ociosos. ¿Qué pilar guía este objetivo?"
    options:
      - label: "Cost optimization"
        explanation: "Optimización de costos busca entregar valor al menor precio; la meta del escenario es reducir el consumo de energía y el impacto ambiental, no el gasto."
      - label: "Performance efficiency"
        explanation: "Eficiencia del rendimiento busca cumplir los requisitos de rendimiento con los recursos adecuados, no reducir el impacto ambiental."
      - label: "Sustainability"
        explanation: "Sostenibilidad se enfoca en el impacto ambiental, en especial el consumo energético, y uno de sus principios es maximizar la utilización."
        correct: true
      - label: "Reliability"
        explanation: "Confiabilidad trata de cumplir la función de forma correcta y consistente y recuperarse de fallas, no de reducir la huella ambiental."
  - prompt: "El equipo de una tienda en línea de Buenos Aires quiere revisar su carga de trabajo con el framework. ¿Qué hace el AWS Well-Architected Tool?"
    options:
      - label: "Aplica automáticamente los cambios necesarios para corregir los riesgos de la arquitectura"
        explanation: "El AWS Well-Architected Tool evalúa y recomienda; tú decides e implementas los cambios, no los aplica de forma automática."
      - label: "Revisa y mide la carga de trabajo, identifica problemas de alto riesgo (HRI) y guarda milestones del progreso"
        explanation: "El AWS WA Tool da un proceso consistente para revisar y medir workloads, identificar HRI, recibir un plan de mejora y guardar milestones."
        correct: true
      - label: "Realiza una auditoría formal de cumplimiento sobre la cuenta de AWS"
        explanation: "AWS aclara que una revisión Well-Architected es una conversación constructiva, no una auditoría."
      - label: "Escala automáticamente los recursos de la carga de trabajo según la demanda"
        explanation: "Escalar recursos según la demanda no es una función del AWS Well-Architected Tool; la herramienta sirve para revisar la arquitectura, no para escalarla."
practice:
  - prompt: "Un banco de Asunción aplica mínimo privilegio y separación de funciones a sus usuarios, y cifra los datos de sus clientes en tránsito y en reposo. ¿Qué pilar del AWS Well-Architected Framework sigue?"
    options:
      - label: "Operational excellence"
        explanation: "Excelencia operativa trata de organizar equipos, observar, automatizar y hacer cambios pequeños y reversibles, no de identidad y cifrado."
      - label: "Security"
        explanation: "Seguridad incluye implementar una base sólida de identidad con mínimo privilegio y separación de funciones, y proteger los datos en tránsito y en reposo."
        correct: true
      - label: "Reliability"
        explanation: "Confiabilidad se centra en recuperarse de fallas y probar la recuperación, no en controlar accesos ni cifrar datos."
      - label: "Cost optimization"
        explanation: "Optimización de costos busca entregar valor al menor precio; el escenario trata de proteger datos y accesos."
  - prompt: "Un portal de trámites de Ciudad de México simula fallas de forma periódica para comprobar que su carga de trabajo se recupera automáticamente, y reparte el tráfico en varios recursos pequeños en lugar de uno grande. ¿Qué pilar aplica?"
    options:
      - label: "Performance efficiency"
        explanation: "Eficiencia del rendimiento trata de elegir y usar los recursos adecuados; recuperarse de fallas corresponde a confiabilidad."
      - label: "Security"
        explanation: "Seguridad se enfoca en identidad, trazabilidad y protección de datos, no en probar la recuperación ante fallas."
      - label: "Sustainability"
        explanation: "Sostenibilidad busca reducir el impacto ambiental y el consumo de energía; el objetivo del escenario es no caerse."
      - label: "Reliability"
        explanation: "Recuperarse automáticamente de fallas, probar los procedimientos de recuperación y escalar horizontalmente son principios de confiabilidad."
        correct: true
  - prompt: "Una app de música de Bogotá quiere atender a usuarios de otros continentes con menor latencia: decide volverse global en minutos, usar arquitecturas serverless y experimentar más seguido. ¿Qué pilar del framework guía estas decisiones?"
    options:
      - label: "Performance efficiency"
        explanation: "Volverse global en minutos, usar arquitecturas serverless y experimentar más seguido son principios de eficiencia del rendimiento."
        correct: true
      - label: "Reliability"
        explanation: "Confiabilidad trata de cumplir la función de forma consistente y recuperarse de fallas; el escenario busca menor latencia y recursos eficientes."
      - label: "Operational excellence"
        explanation: "Excelencia operativa se centra en cómo operar y evolucionar la carga, con observabilidad y cambios reversibles, no en latencia."
      - label: "Sustainability"
        explanation: "Sostenibilidad apunta a reducir el impacto ambiental; la meta del escenario es el rendimiento para usuarios lejanos."
  - prompt: "Para reducir su factura de AWS, una universidad de Córdoba apaga sus entornos de desarrollo fuera del horario laboral y atribuye el gasto de la nube a cada dueño de workload. ¿Qué pilar aplica?"
    options:
      - label: "Sustainability"
        explanation: "Sostenibilidad busca reducir el impacto ambiental; aquí la meta declarada es gastar menos, lo que corresponde a costos."
      - label: "Performance efficiency"
        explanation: "Eficiencia del rendimiento trata de cumplir los requisitos de rendimiento con los recursos adecuados, no de atribuir el gasto."
      - label: "Cost optimization"
        explanation: "Adoptar un modelo de consumo, como apagar entornos de desarrollo fuera de horario, y analizar y atribuir el gasto son principios de optimización de costos."
        correct: true
      - label: "Reliability"
        explanation: "Confiabilidad se centra en recuperarse de fallas; apagar entornos y atribuir gastos no busca evitar caídas."
  - prompt: "En un curso de preparación de Lima, el instructor pregunta cuál de estos es uno de los seis pilares oficiales del AWS Well-Architected Framework. ¿Qué respondes?"
    options:
      - label: "Scalability"
        explanation: "Scalability no es un pilar; escalar horizontalmente aparece como principio de diseño dentro del pilar de confiabilidad."
      - label: "Sustainability"
        explanation: "Sustainability es el sexto pilar oficial, junto a operational excellence, security, reliability, performance efficiency y cost optimization."
        correct: true
      - label: "Compliance"
        explanation: "Compliance no es uno de los seis pilares; los pilares son operational excellence, security, reliability, performance efficiency, cost optimization y sustainability."
      - label: "Automation"
        explanation: "Automation no es un pilar; automatizar aparece como principio de diseño en varios pilares, como excelencia operativa y seguridad."
  - prompt: "Una aseguradora de Valparaíso revisó su carga de trabajo con el AWS Well-Architected Tool y quiere guardar una foto del estado actual de la revisión para comparar su progreso más adelante. ¿Qué función de la herramienta usa?"
    options:
      - label: "Un high-risk issue (HRI)"
        explanation: "Un HRI es un problema de alto riesgo que la herramienta identifica en la carga de trabajo, no una foto del estado de la revisión."
      - label: "Una custom lens"
        explanation: "Las custom lenses son lentes personalizadas para revisar la carga con preguntas propias; no guardan el estado para medir el progreso."
      - label: "Un principio de diseño"
        explanation: "Los principios de diseño son reglas generales de cada pilar para tomar buenas decisiones; no son una función para guardar el estado."
      - label: "Un milestone"
        explanation: "Los milestones son fotos de un momento dado que guarda el AWS WA Tool para medir tu progreso a lo largo del tiempo."
        correct: true
---

## ¿Por qué importa?

Una fintech de Santiago lanzó su app de pagos en AWS en pocas semanas. Funcionó, pero pronto aparecieron dudas: ¿qué pasa si falla una Availability Zone?, ¿quién tiene acceso a los datos de los clientes?, ¿por qué la factura creció tanto?, ¿podemos desplegar cambios sin miedo? Cada pregunta toca un aspecto distinto de una buena arquitectura.

El **AWS Well-Architected Framework** organiza esas preguntas en seis **pilares**. El examen te pedirá reconocer cada pilar y diferenciarlo de los demás a partir de un escenario corto.

## ¿Qué es el AWS Well-Architected Framework?

Es un conjunto de **buenas prácticas** de arquitectura que AWS documenta a partir de su experiencia revisando miles de arquitecturas de clientes. Te ayuda a entender los pros y contras de las decisiones que tomas al construir sistemas en AWS, y a diseñar y operar cargas de trabajo (*workloads*) seguras, confiables, eficientes, rentables y sostenibles.

Ideas clave:

- Se basa en un conjunto de **preguntas fundamentales** para evaluar si una arquitectura sigue las buenas prácticas de la nube.
- AWS aclara que una revisión es **una conversación constructiva, no una auditoría**.
- Cada pilar tiene **principios de diseño** (*design principles*): reglas generales para tomar buenas decisiones.

El **AWS Well-Architected Tool (AWS WA Tool)** es un servicio en la consola que da un proceso consistente para **revisar y medir** tus cargas de trabajo con el framework. AWS indica que la revisión se ofrece **sin costo**. Con él respondes preguntas sobre tu workload, identificas **problemas de alto riesgo** (*high-risk issues*, HRI), recibes un plan de acción para mejorar y guardas **milestones** (fotos de un momento dado) para medir tu progreso. También admite lentes personalizadas (*custom lenses*).

## Los seis pilares y sus principios de diseño

### 1. Operational excellence (excelencia operativa)

AWS la define como el compromiso de construir software correctamente mientras se entrega de forma constante una gran experiencia al cliente. Reúne prácticas para **organizar el equipo, diseñar, operar a escala y evolucionar** la carga de trabajo. Principios de diseño: organizar equipos en torno a resultados de negocio, implementar observabilidad para obtener información accionable, automatizar de forma segura donde sea posible (incluida la operación como código), hacer **cambios frecuentes, pequeños y reversibles**, refinar los procedimientos con frecuencia, anticipar las fallas, aprender de todos los eventos operativos y usar servicios administrados.

### 2. Security (seguridad)

Abarca la capacidad de **proteger datos, sistemas y activos**, aprovechando la nube para mejorar la seguridad. Principios: implementar una **base sólida de identidad** (mínimo privilegio, separación de funciones), mantener la **trazabilidad**, aplicar seguridad **en todas las capas**, automatizar las buenas prácticas de seguridad, proteger los datos **en tránsito y en reposo**, mantener a las personas lejos de los datos y prepararse para eventos de seguridad.

### 3. Reliability (confiabilidad)

Abarca la capacidad de una carga de trabajo de **cumplir su función de forma correcta y consistente** cuando se espera que lo haga, incluida la capacidad de operarla y probarla durante todo su ciclo de vida. Principios: recuperarse automáticamente de las fallas, **probar los procedimientos de recuperación**, escalar horizontalmente para aumentar la disponibilidad (varios recursos pequeños en lugar de uno grande), dejar de adivinar la capacidad y gestionar los cambios mediante automatización.

### 4. Performance efficiency (eficiencia del rendimiento)

Incluye la capacidad de usar los recursos de la nube de forma **eficiente** para cumplir los requisitos de rendimiento, y mantener esa eficiencia a medida que cambian la demanda y la tecnología. Principios: democratizar las tecnologías avanzadas (consumirlas como servicio), volverse global en minutos, usar **arquitecturas serverless**, experimentar más seguido y considerar la "simpatía mecánica" (elegir la tecnología que mejor encaja con el patrón de uso).

### 5. Cost optimization (optimización de costos)

Incluye la capacidad de ejecutar sistemas que **entregan valor de negocio al menor precio**. Principios: implementar la gestión financiera de la nube (*Cloud Financial Management*), adoptar un **modelo de consumo** (pagar solo lo que necesitas; por ejemplo, apagar entornos de desarrollo fuera del horario laboral), medir la eficiencia general, dejar de gastar en trabajo pesado que no diferencia al negocio y **analizar y atribuir el gasto** a cada dueño de workload.

### 6. Sustainability (sostenibilidad)

Se enfoca en el **impacto ambiental**, en especial el consumo y la eficiencia energética, para reducir el uso de recursos. Principios: entender tu impacto, establecer metas de sostenibilidad, **maximizar la utilización** (dimensionar bien y evitar recursos ociosos), adoptar hardware y software nuevos y más eficientes, usar servicios administrados y reducir el impacto *downstream* (en los dispositivos de tus clientes).

## Cómo distinguir los pilares en un escenario

| Palabras clave en la pregunta | Pilar |
| --- | --- |
| Runbooks, observabilidad, cambios pequeños y reversibles, operación como código | Operational excellence |
| Mínimo privilegio, cifrado, trazabilidad, respuesta a incidentes | Security |
| Recuperarse de fallas, probar la recuperación, escalar horizontalmente | Reliability |
| Elegir el tipo de recurso correcto, serverless, menor latencia, experimentar | Performance efficiency |
| Pagar solo lo necesario, eliminar recursos ociosos por costo, atribuir gastos | Cost optimization |
| Reducir energía y huella ambiental, maximizar la utilización | Sustainability |

Algunos principios aparecen en más de un pilar. "Usar servicios administrados" está en excelencia operativa y en sostenibilidad; "dejar de adivinar la capacidad" está en confiabilidad. Fíjate en el **objetivo** del escenario: si la meta es gastar menos, es costos; si es contaminar menos, es sostenibilidad; si es no caerse, es confiabilidad.

## Trampas típicas del examen

- **Confundir reliability con performance efficiency.** Recuperarse de fallas es confiabilidad; elegir el recurso que rinde mejor es eficiencia del rendimiento.
- **Olvidar el sexto pilar.** Sustainability es un pilar oficial, no una parte de cost optimization.
- **Pensar que una revisión Well-Architected es una auditoría.** AWS la define como una conversación constructiva.
- **Creer que el AWS Well-Architected Tool aplica cambios automáticamente.** Evalúa y recomienda; tú decides e implementas.
- **Asignar "cambios pequeños, frecuentes y reversibles" a seguridad.** Es un principio de excelencia operativa.

## Resumen para el examen

- El framework reúne buenas prácticas para workloads seguras, confiables, eficientes, rentables y sostenibles.
- Seis pilares: operational excellence, security, reliability, performance efficiency, cost optimization y sustainability.
- Excelencia operativa = operar, observar y mejorar; cambios pequeños y reversibles.
- Seguridad = identidad sólida, trazabilidad, cifrado, seguridad en todas las capas.
- Confiabilidad = recuperarse de fallas y probar la recuperación.
- Eficiencia del rendimiento = usar los recursos adecuados, serverless, ir global.
- Optimización de costos = modelo de consumo y atribución del gasto.
- Sostenibilidad = minimizar el impacto ambiental y maximizar la utilización.
- AWS Well-Architected Tool = revisar workloads, detectar riesgos altos y guardar milestones.
