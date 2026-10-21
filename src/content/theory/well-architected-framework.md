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
