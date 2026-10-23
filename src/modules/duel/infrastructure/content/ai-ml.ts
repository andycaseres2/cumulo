import type { ServiceFamily } from '../../domain/ServiceFamily';

export const aiMlFamily: ServiceFamily = {
  id: 'ai-ml',
  title: 'Inteligencia artificial y machine learning',
  summary:
    'Fíjate en la entrada y la salida: imágenes o video (Rekognition), documentos escaneados (Textract), texto a insights (Comprehend), voz a texto (Transcribe), texto a voz (Polly), idioma a idioma (Translate), conversación (Lex), modelo propio (SageMaker AI) y asistente generativo (Q).',
  services: [
    {
      name: 'Amazon Rekognition',
      summary: 'Analiza imágenes y video: objetos, rostros, comparación de caras y contenido inapropiado.',
    },
    {
      name: 'Amazon Textract',
      summary: 'Extrae texto, escritura a mano, formularios y tablas de documentos escaneados y PDF.',
    },
    {
      name: 'Amazon Comprehend',
      summary: 'Procesamiento de lenguaje natural: sentimiento, entidades, frases clave, idioma y datos personales en texto.',
    },
    {
      name: 'Amazon Transcribe',
      summary: 'Convierte voz en texto, por lotes o en tiempo real, y puede separar a quienes hablan.',
    },
    {
      name: 'Amazon Polly',
      summary: 'Convierte texto en voz natural, con muchas voces e idiomas.',
    },
    {
      name: 'Amazon Translate',
      summary: 'Traduce texto entre idiomas con machine learning, al momento o por lotes.',
    },
    {
      name: 'Amazon Lex',
      summary: 'Crea chatbots y bots de voz que entienden la intención de quien escribe o habla.',
    },
    {
      name: 'Amazon SageMaker AI',
      summary: 'Plataforma administrada para construir, entrenar y desplegar tus propios modelos de machine learning.',
    },
    {
      name: 'Amazon Q',
      summary: 'Asistente de IA generativa; por ejemplo, ayuda a desarrollar con sugerencias de código y respuestas sobre AWS.',
    },
  ],
  cards: [
    {
      id: 'ai-ml-1',
      prompt:
        'Un gimnasio de Barranquilla quiere que, en la entrada, una cámara compare la cara de cada persona con la foto de su registro para confirmar su identidad. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon Rekognition',
          why: 'Correcto: Rekognition detecta y compara rostros en imágenes y video, un caso típico de verificación de identidad.',
        },
        {
          service: 'Amazon Textract',
          why: 'Textract extrae texto y datos de documentos; no compara rostros.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analiza texto con lenguaje natural; no trabaja con imágenes de personas.',
        },
      ],
      answer: 'Amazon Rekognition',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-2',
      prompt:
        'Un marketplace de Santa Cruz de la Sierra deja que cada vendedor suba fotos de sus productos. Necesita detectar automáticamente imágenes violentas o explícitas antes de publicarlas. ¿Qué servicio eliges?',
      options: [
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend detecta sentimiento y entidades en texto; no revisa el contenido de las fotos.',
        },
        {
          service: 'Amazon SageMaker AI',
          why: 'Con SageMaker AI podrías entrenar tu propio modelo, pero ya existe un servicio listo para moderar imágenes sin saber de ML.',
        },
        {
          service: 'Amazon Rekognition',
          why: 'Correcto: la moderación de contenido de Rekognition detecta contenido explícito, inapropiado o violento en imágenes y video.',
        },
        {
          service: 'Amazon Textract',
          why: 'Textract lee texto y datos de documentos; no juzga si una imagen es inapropiada.',
        },
      ],
      answer: 'Amazon Rekognition',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-3',
      prompt:
        'Una aseguradora de Puebla recibe formularios de siniestro escaneados. Necesita sacar cada campo con su valor (nombre, póliza, fecha) y las tablas de daños, no solo el texto suelto. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon Rekognition',
          why: 'Rekognition puede detectar texto en fotos, como un letrero, pero no entiende la estructura de formularios y tablas de un documento.',
        },
        {
          service: 'Amazon Textract',
          why: 'Correcto: Textract extrae texto, formularios con sus pares de campo y valor, y tablas de documentos escaneados.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analiza texto que ya tienes; no lee documentos escaneados para sacar campos y tablas.',
        },
      ],
      answer: 'Amazon Textract',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-4',
      prompt:
        'Un estudio contable de Tegucigalpa recibe cada mes cientos de facturas y recibos en PDF o fotografiados. Quiere obtener proveedor, fecha y total de cada uno sin digitarlos a mano. ¿Qué servicio eliges?',
      options: [
        {
          service: 'Amazon Translate',
          why: 'Translate traduce texto entre idiomas; no extrae datos de facturas.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend encuentra entidades en texto ya digital, pero el paso de leer facturas escaneadas y sacar sus campos es de otro servicio.',
        },
        {
          service: 'Amazon Textract',
          why: 'Correcto: Textract procesa facturas y recibos con su API de gastos y devuelve datos como proveedor, fecha y total.',
        },
      ],
      answer: 'Amazon Textract',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-5',
      prompt:
        'Un hotel de Cancún recibe miles de reseñas escritas por huéspedes. Quiere saber automáticamente si cada reseña es positiva, negativa o mixta, y de qué temas habla. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon Lex',
          why: 'Lex crea chatbots que conversan; no analiza el sentimiento de miles de reseñas ya escritas.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Correcto: Comprehend usa lenguaje natural para detectar sentimiento, entidades y frases clave, y agrupar textos por temas.',
        },
        {
          service: 'Amazon Translate',
          why: 'Translate cambia el idioma del texto, pero no dice si la reseña es positiva o negativa.',
        },
      ],
      answer: 'Amazon Comprehend',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-6',
      prompt:
        'Un hospital de Arequipa quiere compartir correos y notas de atención, que ya están en texto digital, con un equipo de investigación. Antes debe encontrar datos personales como direcciones o teléfonos para ocultarlos.',
      options: [
        {
          service: 'Amazon Textract',
          why: 'Textract extrae texto de documentos escaneados; aquí el texto ya es digital y lo que falta es encontrar los datos personales.',
        },
        {
          service: 'Amazon Rekognition',
          why: 'Rekognition analiza imágenes y video; no revisa correos ni notas de texto.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Correcto: Comprehend detecta información de identificación personal (PII), como direcciones, teléfonos o cuentas bancarias, en texto.',
        },
      ],
      answer: 'Amazon Comprehend',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-7',
      prompt:
        'Un diario digital de Asunción quiere ofrecer cada noticia también en audio, con una voz natural, para personas con discapacidad visual. ¿Qué servicio convierte los artículos en audio?',
      options: [
        {
          service: 'Amazon Transcribe',
          why: 'Transcribe hace lo contrario: convierte voz en texto.',
        },
        {
          service: 'Amazon Translate',
          why: 'Translate traduce texto a otro idioma, pero no genera audio.',
        },
        {
          service: 'Amazon Polly',
          why: 'Correcto: Polly convierte texto en voz natural, un uso típico para accesibilidad y lectura de noticias.',
        },
      ],
      answer: 'Amazon Polly',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-8',
      prompt:
        'Una clínica de Mérida graba, con permiso, sus consultas médicas. Quiere convertir cada grabación en texto y que se distinga lo que dijo quien atiende de lo que dijo quien consulta. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon Transcribe',
          why: 'Correcto: Transcribe convierte audio en texto, por lotes o en tiempo real, y puede separar el habla de cada persona.',
        },
        {
          service: 'Amazon Polly',
          why: 'Polly convierte texto en voz, justo la dirección contraria a la que necesitas.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analiza texto, pero primero alguien tiene que pasar el audio a texto.',
        },
      ],
      answer: 'Amazon Transcribe',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-9',
      prompt:
        'Una tienda online de Montevideo quiere vender también en Brasil y Estados Unidos, y necesita pasar automáticamente las descripciones de sus productos del español al portugués y al inglés. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend puede detectar el idioma de un texto, pero no lo traduce.',
        },
        {
          service: 'Amazon Polly',
          why: 'Polly lee texto en voz alta; no lo pasa a otro idioma.',
        },
        {
          service: 'Amazon Transcribe',
          why: 'Transcribe convierte audio en texto; aquí ya tienes el texto y lo que necesitas es cambiar su idioma.',
        },
        {
          service: 'Amazon Translate',
          why: 'Correcto: Translate traduce texto entre idiomas con machine learning, ideal para contenido de tu catálogo.',
        },
      ],
      answer: 'Amazon Translate',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-10',
      prompt:
        'Una pizzería de Tijuana quiere un chatbot en su web que tome pedidos conversando: entiende qué quieres pedir, pregunta tamaño y sabor, y confirma la orden. ¿Qué servicio usas para construirlo?',
      options: [
        {
          service: 'Amazon Polly',
          why: 'Polly solo convierte texto en voz; no entiende lo que escribe la persona ni maneja la conversación.',
        },
        {
          service: 'Amazon Lex',
          why: 'Correcto: Lex crea chatbots que reconocen la intención, piden los datos que faltan, como tamaño y sabor, y completan la tarea.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend extrae sentimiento y entidades de textos, pero no mantiene un diálogo para tomar un pedido.',
        },
      ],
      answer: 'Amazon Lex',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-11',
      prompt:
        'Un banco de La Paz quiere que su línea telefónica tenga un bot de voz: la persona dice lo que necesita, el bot entiende la intención, por ejemplo consultar su saldo, y responde. ¿Qué servicio construye ese bot?',
      options: [
        {
          service: 'Amazon Transcribe',
          why: 'Transcribe pasa la voz a texto, pero no entiende la intención ni maneja el diálogo con la persona.',
        },
        {
          service: 'Amazon Polly',
          why: 'Polly genera la voz de las respuestas, pero no entiende lo que pide la persona.',
        },
        {
          service: 'Amazon Lex',
          why: 'Correcto: Lex combina reconocimiento de voz y comprensión del lenguaje para crear bots de voz y texto que entienden intenciones.',
        },
      ],
      answer: 'Amazon Lex',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-12',
      prompt:
        'Una agrotech de Rosario tiene años de datos de clima, suelo y cosechas. Su equipo quiere construir, entrenar y desplegar su propio modelo para predecir el rendimiento de cada lote. ¿Qué servicio usa?',
      options: [
        {
          service: 'Amazon Rekognition',
          why: 'Rekognition ofrece análisis de imágenes ya entrenado; no sirve para entrenar un modelo de predicción con tus propios datos de cosecha.',
        },
        {
          service: 'Amazon SageMaker AI',
          why: 'Correcto: SageMaker AI es el servicio administrado para construir, entrenar y desplegar tus propios modelos de machine learning.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analiza texto con modelos de lenguaje; no predice rendimientos a partir de datos de clima y suelo.',
        },
      ],
      answer: 'Amazon SageMaker AI',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-13',
      prompt:
        'El equipo de ciencia de datos de un banco de Lima creó un modelo de detección de fraude. Ahora necesita entrenarlo con más datos en infraestructura administrada y publicarlo como endpoint para la app de pagos.',
      options: [
        {
          service: 'Amazon Lex',
          why: 'Lex crea chatbots; no entrena ni publica modelos propios de fraude.',
        },
        {
          service: 'Amazon Textract',
          why: 'Textract extrae datos de documentos; no es una plataforma para entrenar y desplegar modelos.',
        },
        {
          service: 'Amazon SageMaker AI',
          why: 'Correcto: SageMaker AI entrena modelos en infraestructura administrada y los despliega en un entorno seguro y escalable para producción.',
        },
      ],
      answer: 'Amazon SageMaker AI',
      topicSlug: 'ai-and-ml',
    },
    {
      id: 'ai-ml-14',
      prompt:
        'Una software factory de Medellín quiere un asistente de IA generativa dentro de su IDE que sugiera código, revise vulnerabilidades y responda preguntas sobre sus recursos de AWS, sin entrenar ningún modelo. ¿Cuál eliges?',
      options: [
        {
          service: 'Amazon SageMaker AI',
          why: 'SageMaker AI sirve para construir y entrenar tus propios modelos; aquí quieres un asistente listo para usar.',
        },
        {
          service: 'Amazon Lex',
          why: 'Lex te deja construir tu propio chatbot con intenciones, pero no es un asistente de programación listo dentro del IDE.',
        },
        {
          service: 'Amazon Comprehend',
          why: 'Comprehend analiza textos para sacar sentimiento y entidades; no genera código ni responde sobre tu cuenta de AWS.',
        },
        {
          service: 'Amazon Q',
          why: 'Correcto: Amazon Q Developer es un asistente de IA generativa que sugiere código, busca vulnerabilidades y responde sobre AWS.',
        },
      ],
      answer: 'Amazon Q',
      topicSlug: 'ai-and-ml',
    },
  ],
};
