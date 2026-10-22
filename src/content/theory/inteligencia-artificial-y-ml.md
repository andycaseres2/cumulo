---
title: "Inteligencia artificial y machine learning"
summary: "Qué tarea resuelve cada servicio de IA de AWS: SageMaker AI para modelos propios, servicios preentrenados como Lex o Textract, y Amazon Q como asistente generativo."
domain: "technology-services"
order: 15
examTasks: ["3.7"]
services: ["Amazon SageMaker AI", "Amazon Lex", "Amazon Comprehend", "Amazon Polly", "Amazon Rekognition", "Amazon Textract", "Amazon Transcribe", "Amazon Translate", "Amazon Q", "Amazon Bedrock"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/machine-learning.html"
  - "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
  - "https://aws.amazon.com/q/"
  - "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html"
quiz:
  - prompt: "Una financiera de Santiago de Chile recibe miles de solicitudes de crédito escaneadas y quiere extraer automáticamente el texto, los campos de los formularios y las tablas, sin experiencia en ML. ¿Qué servicio debe usar?"
    options:
      - label: "Amazon Polly"
        explanation: "Amazon Polly convierte texto en voz con sonido natural; no lee documentos escaneados."
      - label: "Amazon Textract"
        explanation: "Amazon Textract extrae texto y datos de documentos escaneados, incluidos formularios y tablas, más allá de un OCR simple."
        correct: true
      - label: "Amazon Comprehend"
        explanation: "Amazon Comprehend analiza el significado de un texto que ya tienes, como su sentimiento o frases clave; no extrae datos de documentos escaneados."
      - label: "Amazon Translate"
        explanation: "Amazon Translate traduce texto entre idiomas; el escenario pide extraer campos y tablas de documentos, no cambiar su idioma."
  - prompt: "Un e-commerce de Lima quiere saber si las reseñas escritas por sus clientes son positivas o negativas y qué frases clave se repiten. ¿Qué servicio de IA preentrenado debe usar?"
    options:
      - label: "Amazon Translate"
        explanation: "Amazon Translate cambia el idioma del texto; no determina si una reseña es positiva o negativa."
      - label: "Amazon Lex"
        explanation: "Amazon Lex sirve para crear chatbots e interfaces conversacionales; no está pensado para analizar el sentimiento de reseñas."
      - label: "Amazon Transcribe"
        explanation: "Amazon Transcribe convierte voz en texto; las reseñas ya están escritas y lo que se necesita es analizar su significado."
      - label: "Amazon Comprehend"
        explanation: "Amazon Comprehend analiza texto: detecta idioma, frases clave, entidades y sentimiento positivo o negativo."
        correct: true
  - prompt: "Un banco digital necesita un modelo a la medida, entrenado con su propio historial de clientes, que prediga quién podría dejar de pagar su tarjeta. ¿Qué servicio de AWS debe usar?"
    options:
      - label: "Amazon SageMaker AI"
        explanation: "Amazon SageMaker AI es un servicio de ML totalmente administrado para construir, entrenar y desplegar modelos propios, como uno que prediga impagos."
        correct: true
      - label: "Amazon Rekognition"
        explanation: "Amazon Rekognition es un servicio preentrenado para analizar imágenes y videos; no entrena un modelo de impagos con tus datos."
      - label: "Amazon Polly"
        explanation: "Amazon Polly es un servicio preentrenado que convierte texto en voz; no predice comportamiento de clientes."
      - label: "Amazon Q Developer"
        explanation: "Amazon Q Developer es un asistente de IA generativa que ayuda a desarrolladores a escribir y entender código; no es el servicio para entrenar un modelo propio de predicción."
---

## ¿Por qué importa?

Un banco digital en Santiago de Chile quiere automatizar su atención: un chatbot que responda consultas, lectura automática de los documentos de identidad que suben los clientes, análisis de si los comentarios en redes son positivos o negativos, y un modelo propio que prediga qué clientes podrían dejar de pagar su tarjeta.

No necesita un equipo de científicos de datos para todo. AWS ofrece **servicios de IA preentrenados** que se usan con una llamada a una API, y **Amazon SageMaker AI** para cuando hace falta un modelo propio. El examen te pedirá relacionar cada tarea con su servicio.

## Conceptos básicos

- **Inteligencia artificial (IA)**: sistemas que realizan tareas que normalmente requieren inteligencia humana, como entender lenguaje o reconocer imágenes.
- **Machine learning (ML)**, o aprendizaje automático: la técnica de entrenar **modelos** con datos para que aprendan patrones y hagan predicciones.
- **Modelo preentrenado**: un modelo que AWS ya entrenó; tú solo envías tus datos y recibes el resultado, sin experiencia en ML.
- **IA generativa**: modelos que **crean** contenido nuevo (texto, código, imágenes) a partir de una instrucción.

## Amazon SageMaker AI: construir tus propios modelos

**Amazon SageMaker AI** es un servicio de ML **totalmente administrado** para que científicos de datos y desarrolladores **construyan, entrenen y desplieguen** (*build, train, deploy*) modelos de ML en un entorno listo para producción, sin administrar servidores.

Dato de actualidad: el 3 de diciembre de 2024, Amazon SageMaker pasó a llamarse **Amazon SageMaker AI**. Ese mismo día AWS lanzó la nueva generación de **Amazon SageMaker**, una plataforma unificada de datos, analítica e IA que incluye a SageMaker AI como una de sus capacidades. Para el examen, la guía usa el nombre **Amazon SageMaker AI**.

**¿SageMaker AI o un servicio preentrenado?** Si la tarea es común (traducir, transcribir, detectar rostros), usa el servicio preentrenado. Si necesitas un modelo a la medida con tus propios datos, como predecir impagos de tu cartera, usa SageMaker AI.

## Servicios de IA preentrenados

| Necesito… | Servicio |
| --- | --- |
| Crear un **chatbot** o una interfaz conversacional por voz o texto (incluido un IVR telefónico) | **Amazon Lex** |
| Analizar **texto**: idioma, frases clave, personas, lugares, **sentimiento** positivo o negativo, temas | **Amazon Comprehend** |
| Convertir **texto en voz** con sonido natural | **Amazon Polly** |
| Convertir **voz en texto** (transcribir audio, en archivos o en tiempo real) | **Amazon Transcribe** |
| **Traducir** texto entre idiomas | **Amazon Translate** |
| Analizar **imágenes y videos**: objetos, personas, texto, escenas, contenido inapropiado, análisis y comparación de **rostros** | **Amazon Rekognition** |
| **Extraer texto y datos** de documentos escaneados, incluidos **formularios y tablas** (más que un OCR simple) | **Amazon Textract** |
| Construir, entrenar y desplegar **modelos propios** de ML | **Amazon SageMaker AI** |
| Un **asistente de IA generativa** para el trabajo y el desarrollo de software | **Amazon Q** |

Para recordar los pares que más se confunden:

- **Polly** habla (texto → voz); **Transcribe** escucha (voz → texto).
- **Comprehend** entiende el significado del texto; **Translate** cambia su idioma.
- **Textract** lee documentos; **Rekognition** mira imágenes y videos.
- **Lex** conversa; usa por dentro reconocimiento de voz y comprensión del lenguaje natural, las mismas tecnologías de aprendizaje profundo que impulsan a Amazon Alexa.

## Amazon Q: asistente de IA generativa

**Amazon Q** es un asistente impulsado por IA generativa para acelerar el desarrollo de software y aprovechar los datos internos de una organización. Sus ofertas principales:

- **Amazon Q Developer**: ayuda a desarrolladores y profesionales de TI a entender, construir, extender y operar aplicaciones en AWS. En el IDE genera y explica código, escanea vulnerabilidades y sugiere mejoras; también responde preguntas sobre tus recursos de AWS en la consola. Antes se llamaba Amazon CodeWhisperer.
- **Amazon Q Business**: hace que la IA generativa sea accesible de forma segura para los empleados, usando el contenido y los sistemas de la empresa.

Amazon Q Developer está construido sobre **Amazon Bedrock**, el servicio administrado que ofrece **modelos fundacionales** (*foundation models*) de Amazon y de otras empresas líderes de IA a través de una API. Si un escenario pide "crear tu propia aplicación de IA generativa con modelos fundacionales", la respuesta suele ser Bedrock; si pide "un asistente listo para usar", es Amazon Q.

## Trampas típicas del examen

- **Confundir Polly con Transcribe.** Polly genera voz; Transcribe genera texto a partir de voz.
- **Elegir Rekognition para leer facturas.** Para extraer texto, formularios y tablas de documentos, la respuesta es **Textract**.
- **Elegir SageMaker AI para tareas comunes.** Si existe un servicio preentrenado que resuelve la tarea, es la opción más simple.
- **Pensar que Comprehend traduce.** Comprehend analiza el texto; **Translate** traduce.
- **Usar nombres antiguos.** La guía actual dice **Amazon SageMaker AI**, no solo "SageMaker".

## Resumen para el examen

- SageMaker AI = construir, entrenar y desplegar modelos propios de ML, totalmente administrado.
- Lex = chatbots; Comprehend = análisis de texto y sentimiento; Polly = texto a voz; Transcribe = voz a texto.
- Translate = traducción; Rekognition = imágenes y video; Textract = texto, formularios y tablas de documentos.
- Los servicios preentrenados no requieren experiencia en ML.
- Amazon Q = asistente de IA generativa (Q Developer para software, Q Business para empleados).
- Amazon Bedrock = modelos fundacionales vía API para crear aplicaciones de IA generativa.
