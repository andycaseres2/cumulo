import type { Mission } from '../../../domain/Mission';

/**
 * Municipalidad: the digital innovation office of a city hall in Arequipa that wants faster permits and more accessible notices.
 * Practices Amazon Textract, Amazon Translate, Amazon Polly and Amazon Bedrock.
 */
export const inteligenciaArtificialYMl2: Mission = {
  id: 'inteligencia-artificial-y-ml-2',
  track: 'tecnologico',
  topicSlug: 'inteligencia-artificial-y-ml',
  buildingId: 'cityhall',
  title: 'Trámites con inteligencia',
  client: { name: 'Andrés Cárdenas', role: 'Coordinador de Innovación Digital de la Municipalidad' },
  intro: [
    'Hola, qué bueno verte. Soy Andrés Cárdenas, coordinador de innovación digital de la Municipalidad. Mi oficina está dos pisos arriba del archivo, y mi trabajo es que los trámites de Arequipa sean más simples.',
    'Cada semana llegan cientos de solicitudes de licencia en papel, con formularios y tablas que un equipo transcribe a mano. Un permiso que podría salir en dos días tarda tres semanas.',
    'Además, nuestros avisos solo están en español, escritos y en letra pequeña. Los turistas no los entienden, y los vecinos con discapacidad visual no pueden leerlos.',
    'El alcalde quiere resultados este año, y me dieron acceso a los servicios de IA de AWS. Pero no sé cuál sirve para qué. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      '¡Esto va a cambiar la Municipalidad! Las solicitudes se leen solas, los avisos salen en varios idiomas y los vecinos pueden escucharlos.',
      'Y mi equipo ya sabe con qué construir su propio asistente para los vecinos. Gracias: el alcalde quiere conocerte en la próxima inauguración.',
    ],
    failed: [
      'Mmm... con estas decisiones me temo que los trámites seguirán tardando semanas. Algunas respuestas no me convencen.',
      'Repasa la teoría de inteligencia artificial y machine learning, y vuelve cuando quieras. Aquí en la Municipalidad los trámites siempre esperan.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'license-forms',
      prompt:
        'Empecemos por las solicitudes de licencia. Son formularios escaneados con campos y tablas: nombre, dirección, metros del local. Quiero extraer esos datos automáticamente, no solo el texto suelto. ¿Qué servicio usamos?',
      topicSlug: 'inteligencia-artificial-y-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'forms-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Servicio que analiza imágenes y videos para detectar objetos, personas, texto, escenas y rostros.',
          explanation:
            'Elegir Rekognition para leer documentos es una trampa típica. Rekognition mira imágenes y videos; para extraer formularios y tablas de documentos está Textract.',
          correct: false,
        },
        {
          id: 'forms-textract',
          label: 'Amazon Textract',
          definition:
            'Servicio que extrae texto y datos de documentos escaneados, incluidos formularios y tablas, más allá de un OCR simple.',
          explanation:
            'Textract lee las solicitudes escaneadas y entrega los campos del formulario y las filas de las tablas, justo lo que el equipo hoy transcribe a mano.',
          correct: true,
        },
        {
          id: 'forms-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Servicio que analiza texto para encontrar idioma, frases clave, entidades, sentimiento y temas.',
          explanation:
            'Comprehend analiza el significado de un texto que ya está digitalizado. No extrae los campos y las tablas de un formulario escaneado.',
          correct: false,
        },
        {
          id: 'forms-transcribe',
          label: 'Amazon Transcribe',
          definition: 'Servicio que convierte voz en texto, a partir de audio grabado o en tiempo real.',
          explanation:
            'Transcribe trabaja con audio. Las solicitudes de licencia son papeles escaneados, no grabaciones.',
          correct: false,
        },
      ],
    },
    {
      id: 'tourist-notices',
      prompt:
        'Ahora, los avisos para turistas: horarios de museos, cortes de calles, ferias. Los escribimos en español y quiero publicarlos también en inglés y portugués sin contratar traductores para cada aviso. ¿Qué usamos?',
      topicSlug: 'inteligencia-artificial-y-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'notices-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Servicio que analiza texto para detectar su idioma, frases clave, entidades, sentimiento y temas.',
          explanation:
            'Pensar que Comprehend traduce es una trampa típica: Comprehend puede detectar el idioma de un texto, pero no lo traduce.',
          correct: false,
        },
        {
          id: 'notices-polly',
          label: 'Amazon Polly',
          definition: 'Servicio que convierte texto en voz con sonido natural.',
          explanation:
            'Polly convierte un texto en voz, pero no lo cambia de idioma. Primero hace falta tener el aviso en inglés y portugués.',
          correct: false,
        },
        {
          id: 'notices-lex',
          label: 'Amazon Lex',
          definition:
            'Servicio para crear chatbots e interfaces conversacionales por voz o texto.',
          explanation:
            'Lex sirve para conversar con un usuario. Andrés necesita convertir avisos escritos de un idioma a otro.',
          correct: false,
        },
        {
          id: 'notices-translate',
          label: 'Amazon Translate',
          definition: 'Servicio que traduce texto entre idiomas.',
          explanation:
            'Translate cambia el idioma del texto: cada aviso escrito en español se puede publicar también en inglés y portugués.',
          correct: true,
        },
      ],
    },
    {
      id: 'audio-notices',
      prompt:
        'Para los vecinos con discapacidad visual, quiero que cada aviso tenga una versión en audio, con una voz natural, que puedan escuchar en la web o por teléfono. ¿Qué servicio la genera?',
      topicSlug: 'inteligencia-artificial-y-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'audio-polly',
          label: 'Amazon Polly',
          definition: 'Servicio que convierte texto en voz con sonido natural.',
          explanation:
            'Polly "habla": toma el texto de cada aviso y genera el audio con voz natural que los vecinos pueden escuchar.',
          correct: true,
        },
        {
          id: 'audio-transcribe',
          label: 'Amazon Transcribe',
          definition:
            'Servicio que convierte voz en texto, a partir de archivos de audio o en tiempo real.',
          explanation:
            'Confundir Polly con Transcribe es la trampa más típica. Transcribe "escucha" y produce texto; aquí se necesita lo contrario.',
          correct: false,
        },
        {
          id: 'audio-translate',
          label: 'Amazon Translate',
          definition: 'Servicio que traduce texto de un idioma a otro.',
          explanation:
            'Translate cambia el idioma de un texto, pero el resultado sigue siendo texto escrito. No genera audio.',
          correct: false,
        },
        {
          id: 'audio-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Servicio que analiza imágenes y videos para identificar objetos, escenas, texto y rostros.',
          explanation:
            'Rekognition analiza imágenes y videos. No convierte los avisos escritos en una versión que se pueda escuchar.',
          correct: false,
        },
      ],
    },
    {
      id: 'citizen-assistant',
      prompt:
        'Último: mi equipo de desarrollo quiere construir su propia aplicación de IA generativa, un asistente que explique los trámites a los vecinos. Quieren elegir entre modelos fundacionales de Amazon y de otras empresas a través de una API. ¿Qué servicio usan?',
      topicSlug: 'inteligencia-artificial-y-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'assistant-q-developer',
          label: 'Amazon Q Developer',
          definition:
            'Asistente de IA generativa para desarrolladores: genera y explica código, escanea vulnerabilidades y responde preguntas sobre recursos de AWS.',
          explanation:
            'Q Developer es un asistente listo para usar que ayuda a programar. El equipo de Andrés quiere crear su propia aplicación eligiendo modelos fundacionales por API.',
          correct: false,
        },
        {
          id: 'assistant-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Servicio preentrenado que analiza texto para extraer sentimiento, entidades, frases clave y temas.',
          explanation:
            'Comprehend analiza textos existentes, pero no ofrece modelos fundacionales para generar respuestas nuevas como las de un asistente.',
          correct: false,
        },
        {
          id: 'assistant-bedrock',
          label: 'Amazon Bedrock',
          definition:
            'Servicio administrado que ofrece modelos fundacionales de Amazon y de otras empresas líderes de IA a través de una API.',
          explanation:
            'Para crear una aplicación propia de IA generativa con modelos fundacionales, la respuesta es Bedrock: el equipo elige el modelo y lo usa por API, sin administrar servidores.',
          correct: true,
        },
        {
          id: 'assistant-transcribe',
          label: 'Amazon Transcribe',
          definition: 'Servicio que convierte voz en texto, en archivos de audio o en tiempo real.',
          explanation:
            'Transcribe convierte voz en texto, pero no genera respuestas. No es la base para un asistente de IA generativa.',
          correct: false,
        },
      ],
    },
  ],
};
