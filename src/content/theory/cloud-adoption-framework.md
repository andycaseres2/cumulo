---
title: "AWS Cloud Adoption Framework (AWS CAF)"
summary: "Aprende cómo el AWS CAF guía la adopción de la nube: resultados de negocio, dominios de transformación, seis perspectivas con sus capacidades y cuatro fases."
domain: "cloud-concepts"
order: 5
examTasks: ["1.3"]
services: []
readingMinutes: 5
sources:
  - "https://aws.amazon.com/cloud-adoption-framework/"
  - "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/introduction.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/your-cloud-transformation-journey.html"
  - "https://docs.aws.amazon.com/pdfs/whitepapers/latest/overview-aws-cloud-adoption-framework/overview-aws-cloud-adoption-framework.pdf"
quiz:
  - prompt: "Una aseguradora de Ciudad de México descubre que su equipo no tiene las habilidades para trabajar en la nube y que la cultura de la organización se resiste al cambio. ¿Qué perspectiva del AWS CAF atiende estas capacidades?"
    options:
      - label: "People"
        explanation: "La perspectiva People es el puente entre tecnología y negocio: se enfoca en la cultura, la estructura organizacional, el liderazgo y la transformación de la fuerza laboral."
        correct: true
      - label: "Governance"
        explanation: "Governance orquesta las iniciativas y gestiona programas, proyectos y riesgos de la transformación; la cultura y las habilidades corresponden a People."
      - label: "Platform"
        explanation: "Platform se enfoca en construir una plataforma de nube escalable y en modernizar aplicaciones; no atiende la cultura ni las habilidades del equipo."
      - label: "Operations"
        explanation: "Operations busca que los servicios en la nube se entreguen al nivel que el negocio necesita (observabilidad, incidentes, parches); no trata la cultura organizacional."
  - prompt: "Un banco de Lima ya identificó sus oportunidades y sus brechas de capacidades. Ahora entrega pilotos en producción para demostrar valor incremental y aprender de ellos. ¿En qué fase del AWS CAF está?"
    options:
      - label: "Envision"
        explanation: "En Envision se muestra cómo la nube acelerará los resultados de negocio y se priorizan oportunidades; todavía no se entregan pilotos en producción."
      - label: "Align"
        explanation: "En Align se identifican brechas de capacidades, dependencias y preocupaciones de las partes interesadas; los pilotos en producción llegan después."
      - label: "Launch"
        explanation: "En Launch se entregan pilotos en producción que demuestran valor incremental, y se aprende de ellos."
        correct: true
      - label: "Scale"
        explanation: "En Scale se expanden los pilotos y el valor de negocio a la escala deseada; primero hay que haber lanzado esos pilotos."
  - prompt: "Una cadena de retail de Bogotá adopta la nube para crear nuevos productos y servicios, llegar a nuevos clientes y entrar a nuevos segmentos de mercado. ¿Qué resultado de negocio del AWS CAF busca?"
    options:
      - label: "Reduced business risk"
        explanation: "Reducir el riesgo del negocio significa bajar el perfil de riesgo con mejor confiabilidad, rendimiento y seguridad, no crear productos ni llegar a nuevos clientes."
      - label: "Increased revenue"
        explanation: "Aumentar los ingresos es crear nuevos productos y servicios, llegar a nuevos clientes y entrar a nuevos segmentos de mercado."
        correct: true
      - label: "Improved ESG performance"
        explanation: "Mejorar el desempeño ESG consiste en usar información para mejorar la sostenibilidad y la transparencia corporativa, no en abrir nuevos mercados."
      - label: "Increased operational efficiency"
        explanation: "Aumentar la eficiencia operativa es reducir costos de operación y aumentar la productividad; no describe crear productos para nuevos clientes."
practice:
  - prompt: "En una minera de Antofagasta, el director de riesgos (CRO) quiere orquestar las iniciativas de la nube y gestionar los riesgos de los programas y proyectos de la transformación. ¿Qué perspectiva del AWS CAF cubre estas capacidades?"
    options:
      - label: "Security"
        explanation: "Security busca la confidencialidad, integridad y disponibilidad de datos y cargas de trabajo; gestionar riesgos de programas y proyectos de la transformación no es su enfoque."
      - label: "Governance"
        explanation: "Governance orquesta las iniciativas maximizando beneficios y minimizando riesgos, con capacidades como gestión de programas y proyectos y gestión de riesgos."
        correct: true
      - label: "Business"
        explanation: "Business busca que las inversiones en la nube aceleren los resultados de negocio con gestión de la estrategia e innovación; la gestión de riesgos del programa es de otra perspectiva."
      - label: "Platform"
        explanation: "Platform se enfoca en construir la plataforma de nube y modernizar aplicaciones con arquitectos e ingenieros; no gestiona los riesgos de los programas."
  - prompt: "Una cadena de farmacias de Guayaquil recién empieza su transformación: quiere mostrar cómo la nube acelerará sus resultados de negocio, identificar y priorizar oportunidades y asignarles responsables y métricas. ¿En qué fase del AWS CAF está?"
    options:
      - label: "Envision"
        explanation: "En Envision se muestra cómo la nube acelerará los resultados de negocio y se identifican y priorizan oportunidades asociadas a responsables y métricas."
        correct: true
      - label: "Align"
        explanation: "En Align se buscan brechas de capacidades en las seis perspectivas y dependencias entre áreas; ocurre después de priorizar las oportunidades."
      - label: "Launch"
        explanation: "En Launch se entregan pilotos en producción que demuestran valor incremental; la cadena todavía no llegó a ese punto."
      - label: "Scale"
        explanation: "En Scale se expanden los pilotos y el valor de negocio a la escala deseada; primero hace falta haber lanzado pilotos."
  - prompt: "El equipo de arquitectos e ingenieros de una empresa de logística de Monterrey quiere construir una plataforma de nube híbrida y escalable, implementar CI/CD y crear soluciones nativas de la nube. ¿Qué perspectiva del AWS CAF corresponde?"
    options:
      - label: "People"
        explanation: "People atiende la cultura, el liderazgo y la transformación de la fuerza laboral; no se encarga de la arquitectura de la plataforma ni del CI/CD."
      - label: "Governance"
        explanation: "Governance orquesta iniciativas y gestiona programas, riesgos y gobierno de datos; construir la plataforma técnica es de otra perspectiva."
      - label: "Business"
        explanation: "Business se orienta a la estrategia, el portafolio y la monetización de datos con partes interesadas como el CEO y el CFO; no construye la plataforma."
      - label: "Platform"
        explanation: "Platform busca una plataforma de nube híbrida, escalable y de nivel empresarial, con capacidades como arquitectura de plataforma, desarrollo moderno de aplicaciones y CI/CD."
        correct: true
  - prompt: "El CISO de un banco de Asunción pide asegurar la confidencialidad, integridad y disponibilidad de los datos, con capacidades como gestión de identidades y accesos y detección de amenazas. ¿Qué perspectiva del AWS CAF atiende este pedido?"
    options:
      - label: "People"
        explanation: "People se enfoca en la cultura, la estructura organizacional y las habilidades del equipo; no protege datos ni detecta amenazas."
      - label: "Business"
        explanation: "Business busca que las inversiones en la nube aceleren los resultados de negocio; no se encarga de la protección de datos y cargas de trabajo."
      - label: "Security"
        explanation: "Security busca la confidencialidad, integridad y disponibilidad de datos y cargas de trabajo, con capacidades como gestión de identidades y accesos y detección de amenazas."
        correct: true
      - label: "Governance"
        explanation: "Governance gestiona programas, proyectos y riesgos de la transformación; la protección de datos y la detección de amenazas son de otra perspectiva."
  - prompt: "Una embotelladora de San José, Costa Rica, quiere usar la información de sus operaciones en la nube para mejorar su sostenibilidad y la transparencia corporativa ante sus inversionistas. ¿Qué resultado de negocio del AWS CAF persigue?"
    options:
      - label: "Increased revenue"
        explanation: "Aumentar los ingresos es crear nuevos productos y servicios y llegar a nuevos clientes o mercados; no trata la sostenibilidad ni la transparencia."
      - label: "Improved ESG performance"
        explanation: "Mejorar el desempeño ESG (ambiental, social y de gobierno) es usar información para mejorar la sostenibilidad y la transparencia corporativa."
        correct: true
      - label: "Increased operational efficiency"
        explanation: "Aumentar la eficiencia operativa es reducir costos de operación y aumentar la productividad; el objetivo aquí es la sostenibilidad y la transparencia."
      - label: "Reduced business risk"
        explanation: "Reducir el riesgo del negocio es bajar el perfil de riesgo con mejor confiabilidad, rendimiento y seguridad; no describe mejorar la sostenibilidad."
  - prompt: "Según la cadena de valor del AWS CAF, los cuatro dominios de transformación se habilitan uno a otro en orden. ¿Qué dominio es el punto de partida que habilita la transformación de procesos?"
    options:
      - label: "Producto"
        explanation: "La transformación de producto (nuevas propuestas de valor y modelos de ingresos) es el último eslabón de la cadena, no el primero."
      - label: "Organizacional"
        explanation: "La transformación organizacional (repensar el modelo operativo y organizar equipos en torno a productos) es habilitada por la de procesos, no la habilita."
      - label: "Procesos"
        explanation: "La transformación de procesos (digitalizar, automatizar y optimizar operaciones) es la que resulta habilitada; la pregunta busca el dominio que la precede."
      - label: "Tecnológica"
        explanation: "La transformación tecnológica (migrar y modernizar infraestructura, aplicaciones y datos) inicia la cadena y habilita la de procesos."
        correct: true
---

## ¿Por qué importa?

Una aseguradora de Ciudad de México decidió "irse a la nube". El área de TI empezó a mover servidores, pero pronto aparecieron problemas que no eran técnicos: los gerentes no sabían qué beneficios medir, el equipo no tenía las habilidades necesarias, auditoría pedía controles nuevos y nadie había definido cómo operar los sistemas una vez migrados.

Adoptar la nube no es solo un proyecto tecnológico; cambia a toda la organización. El **AWS Cloud Adoption Framework (AWS CAF)** existe para ordenar ese cambio, y el examen pregunta por sus **resultados de negocio**, sus **perspectivas** y sus **fases**.

## ¿Qué es el AWS CAF?

El AWS CAF reúne la experiencia y las buenas prácticas de AWS para ayudar a las organizaciones a **transformarse digitalmente** con la nube y alcanzar sus metas de negocio. Identifica las **capacidades organizacionales** que hay detrás de una transformación exitosa y las agrupa en **seis perspectivas**.

Se usa para:

- Encontrar y **priorizar oportunidades** de transformación.
- Evaluar la **preparación para la nube** (*cloud readiness*): qué tan lista está la organización para aprovecharla.
- Ir ajustando la **hoja de ruta** de transformación con el tiempo.

Una **capacidad** (*capability*) es la habilidad de una organización para usar procesos y recursos (personas, tecnología y otros activos) para lograr un resultado concreto.

## Resultados de negocio que busca el AWS CAF

El examen menciona cuatro resultados clave, tal como AWS los describe:

| Resultado | Qué significa |
| --- | --- |
| **Reduced business risk** (reducir el riesgo del negocio) | Bajar el perfil de riesgo con mejor confiabilidad, mayor rendimiento y seguridad reforzada. |
| **Improved ESG performance** (mejorar el desempeño ambiental, social y de gobierno) | Usar información para mejorar la sostenibilidad y la transparencia corporativa. |
| **Increased revenue** (aumentar los ingresos) | Crear nuevos productos y servicios, llegar a nuevos clientes y entrar a nuevos segmentos de mercado. |
| **Increased operational efficiency** (aumentar la eficiencia operativa) | Reducir costos de operación, aumentar la productividad y mejorar la experiencia de empleados y clientes. |

Estos resultados se logran mediante una **cadena de valor** de cuatro **dominios de transformación**: la transformación **tecnológica** (migrar y modernizar infraestructura, aplicaciones y datos) habilita la de **procesos** (digitalizar, automatizar y optimizar operaciones), que habilita la **organizacional** (repensar el modelo operativo y organizar equipos en torno a productos), que a su vez habilita la de **producto** (nuevas propuestas de valor y modelos de ingresos).

## Las seis perspectivas y sus capacidades

| Perspectiva | Enfoque | Partes interesadas típicas | Ejemplos de capacidades |
| --- | --- | --- | --- |
| **Business** | Que las inversiones en la nube aceleren la transformación digital y los resultados de negocio | CEO, CFO, COO, CIO, CTO | Gestión de la estrategia, gestión del portafolio, innovación, monetización de datos |
| **People** | Puente entre tecnología y negocio: cultura, estructura organizacional, liderazgo y fuerza laboral | CIO, COO, CTO, director de nube | Evolución de la cultura, liderazgo transformacional, transformación de la fuerza laboral, aceleración del cambio |
| **Governance** | Orquestar las iniciativas maximizando beneficios y minimizando riesgos de la transformación | CFO, CIO, CTO, CDO, CRO | Gestión de programas y proyectos, gestión de riesgos, gobierno de datos, gestión del portafolio de aplicaciones |
| **Platform** | Construir una plataforma de nube híbrida, escalable y de nivel empresarial; modernizar y crear soluciones nativas de la nube | CTO, arquitectos, ingenieros | Arquitectura de plataforma, ingeniería de datos, desarrollo moderno de aplicaciones, CI/CD |
| **Security** | Lograr la confidencialidad, integridad y disponibilidad de datos y cargas de trabajo | CISO, CCO, auditoría interna | Gobierno de seguridad, gestión de identidades y accesos, detección de amenazas, respuesta a incidentes |
| **Operations** | Que los servicios en la nube se entreguen al nivel que el negocio necesita | Líderes de infraestructura y operaciones, SRE | Observabilidad, gestión de incidentes y problemas, gestión de parches, gestión de disponibilidad y continuidad |

Truco para recordar: **Business, People y Governance** son perspectivas más orientadas al **negocio**; **Platform, Security y Operations** son más **técnicas**.

## Las cuatro fases de la transformación

El AWS CAF recomienda avanzar de forma **iterativa e incremental**, en lugar de intentar todo de una vez:

1. **Envision (visualizar):** mostrar cómo la nube acelerará los resultados de negocio; identificar y priorizar oportunidades, y asociarlas a responsables y métricas.
2. **Align (alinear):** identificar brechas de capacidades en las seis perspectivas, dependencias entre áreas y preocupaciones de las partes interesadas, para mejorar la preparación.
3. **Launch (lanzar):** entregar **pilotos en producción** que demuestren valor incremental y aprender de ellos.
4. **Scale (escalar):** expandir los pilotos y el valor de negocio a la escala deseada, y asegurar que los beneficios se mantengan.

## Estrategias y apoyo para la adopción

Una estrategia de adopción sana es **incremental**: demostrar valor rápido, aprender y ajustar el plan. AWS y la **AWS Partner Network** ofrecen herramientas y servicios para cada paso, y **AWS Professional Services** brinda ofertas alineadas con el AWS CAF para lograr resultados concretos de transformación. Las estrategias de migración específicas (los "7 Rs") se ven en el tema de migración.

## Trampas típicas del examen

- **Confundir perspectivas con fases.** Business, People, Governance, Platform, Security y Operations son perspectivas; Envision, Align, Launch y Scale son fases.
- **Asignar la cultura y las habilidades a Governance.** Eso es la perspectiva **People**.
- **Asignar la gestión de riesgos del programa a Security.** Gestionar riesgos de la transformación y del portafolio es **Governance**; Security protege datos y cargas de trabajo.
- **Pensar que el CAF es solo técnico.** La mitad de sus perspectivas se enfoca en el negocio y las personas.
- **Olvidar el resultado ESG.** Mejorar el desempeño ambiental, social y de gobierno es uno de los cuatro resultados clave.

## Resumen para el examen

- El AWS CAF guía la transformación digital con la nube y mide la preparación de la organización.
- Resultados clave: menor riesgo del negocio, mejor desempeño ESG, más ingresos y mayor eficiencia operativa.
- Dominios de transformación: tecnología → procesos → organización → producto.
- Seis perspectivas: Business, People, Governance, Platform, Security y Operations.
- Business/People/Governance = negocio; Platform/Security/Operations = técnico.
- Cuatro fases iterativas: Envision, Align, Launch y Scale.
- Launch = pilotos en producción; Scale = expandir y sostener el valor.
