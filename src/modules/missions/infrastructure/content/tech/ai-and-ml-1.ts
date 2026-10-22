import type { Mission } from '../../../domain/Mission';

/**
 * Telecom Andina: a mobile carrier in La Paz whose call center is overwhelmed and whose customers are leaving.
 * Practices Amazon Lex, Amazon Transcribe, Amazon Comprehend and Amazon SageMaker AI.
 */
export const aiAndMl1: Mission = {
  id: 'ai-and-ml-1',
  track: 'tech',
  topicSlug: 'ai-and-ml',
  buildingId: 'telecom',
  title: 'La central que escucha',
  client: { name: 'Diego Mamani', role: 'Jefe de Experiencia del Cliente de Telecom Andina' },
  intro: [
    'Hola, adelante. Soy Diego Mamani, jefe de experiencia del cliente de Telecom Andina. Damos telefonía móvil e internet a medio millón de personas desde La Paz.',
    'Nuestra central telefónica recibe miles de llamadas al día, casi todas para lo mismo: consultar el saldo, pagar una factura o reportar una falla. Los clientes esperan media hora para que alguien los atienda.',
    'Y cada mes perdemos clientes que se van a la competencia sin que sepamos por qué. Grabamos todas las llamadas, pero nadie tiene tiempo de escucharlas.',
    'La gerencia aprobó usar inteligencia artificial en AWS, pero no tenemos científicos de datos para todo. ¿Me ayudas a elegir el servicio correcto para cada problema?',
  ],
  outro: {
    passed: [
      '¡Excelente! El bot de la central atiende las consultas simples, las llamadas grabadas se convierten en texto y por fin sabemos qué clientes cuelgan molestos.',
      'Y con el modelo de cancelaciones podemos llamar a tiempo a quien está por irse. Gracias: en Telecom Andina siempre tendrás buena señal.',
    ],
    failed: [
      'Mmm... con estas decisiones creo que la central seguiría colapsada y los clientes seguirían yéndose. Algunas respuestas no me cierran.',
      'Repasa la teoría de inteligencia artificial y machine learning, y vuelve cuando quieras. La línea queda abierta para ti.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'phone-bot',
      prompt:
        'Primero, la central. Quiero que, al llamar, el cliente diga con sus palabras qué necesita, y que un bot entienda y resuelva las consultas simples, como el saldo o el pago. ¿Qué servicio usamos?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'bot-lex',
          label: 'Amazon Lex',
          definition:
            'Servicio para crear chatbots e interfaces conversacionales por voz o texto, incluidos los sistemas telefónicos de respuesta interactiva (IVR).',
          explanation:
            'Un bot telefónico que entiende lo que dice el cliente y conversa con él es el caso de Lex, que usa reconocimiento de voz y comprensión del lenguaje natural.',
          correct: true,
        },
        {
          id: 'bot-polly',
          label: 'Amazon Polly',
          definition: 'Servicio que convierte texto en voz con sonido natural.',
          explanation:
            'Polly puede darle voz a un mensaje, pero no entiende lo que dice el cliente ni mantiene una conversación. Para eso se usa Lex.',
          correct: false,
        },
        {
          id: 'bot-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Servicio que analiza texto para encontrar idioma, frases clave, entidades, sentimiento y temas.',
          explanation:
            'Comprehend analiza textos ya escritos. No es el servicio para construir un bot que converse con el cliente por teléfono.',
          correct: false,
        },
        {
          id: 'bot-q-business',
          label: 'Amazon Q Business',
          definition:
            'Asistente de IA generativa que responde preguntas a los empleados usando el contenido y los sistemas de la empresa.',
          explanation:
            'Amazon Q Business está pensado para los empleados de la empresa, no para atender por teléfono a los clientes de la central.',
          correct: false,
        },
      ],
    },
    {
      id: 'call-recordings',
      prompt:
        'Ahora, las grabaciones. Tenemos miles de llamadas guardadas en audio y queremos convertirlas en texto para poder leerlas y buscarlas. ¿Qué servicio lo hace?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'recordings-polly',
          label: 'Amazon Polly',
          definition: 'Servicio que convierte texto en voz con sonido natural.',
          explanation:
            'Es la confusión más típica: Polly hace lo contrario, convierte texto en voz. Para pasar las grabaciones a texto se usa Transcribe.',
          correct: false,
        },
        {
          id: 'recordings-textract',
          label: 'Amazon Textract',
          definition:
            'Servicio que extrae texto y datos de documentos escaneados, incluidos formularios y tablas.',
          explanation:
            'Textract lee documentos, no audio. Las grabaciones de la central son voz, no papeles escaneados.',
          correct: false,
        },
        {
          id: 'recordings-transcribe',
          label: 'Amazon Transcribe',
          definition:
            'Servicio que convierte voz en texto, a partir de archivos de audio o en tiempo real.',
          explanation:
            'Transcribe "escucha" las grabaciones y las convierte en texto, que luego se puede leer, buscar y analizar.',
          correct: true,
        },
        {
          id: 'recordings-translate',
          label: 'Amazon Translate',
          definition: 'Servicio que traduce texto de un idioma a otro.',
          explanation:
            'Translate trabaja con texto que ya existe y cambia su idioma. Primero hay que convertir la voz en texto, y eso no lo hace Translate.',
          correct: false,
        },
      ],
    },
    {
      id: 'angry-customers',
      prompt:
        'Con las llamadas ya en texto, quiero saber cuáles terminaron con el cliente molesto y cuáles contento, y de qué temas se quejan más. ¿Qué servicio analiza eso?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'sentiment-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Servicio que analiza imágenes y videos para detectar objetos, personas, texto, escenas y rostros.',
          explanation:
            'Rekognition mira imágenes y videos. Aquí hay que entender el significado de textos de conversaciones.',
          correct: false,
        },
        {
          id: 'sentiment-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Servicio que analiza texto para encontrar idioma, frases clave, personas, lugares, sentimiento positivo o negativo y temas.',
          explanation:
            'Comprehend entiende el significado del texto: detecta si la conversación es positiva o negativa y encuentra los temas que más se repiten en las quejas.',
          correct: true,
        },
        {
          id: 'sentiment-translate',
          label: 'Amazon Translate',
          definition: 'Servicio que traduce texto entre idiomas.',
          explanation:
            'Pensar que Translate o Comprehend hacen lo mismo es una trampa típica: Translate cambia el idioma del texto, pero no dice si el cliente estaba molesto.',
          correct: false,
        },
        {
          id: 'sentiment-lex',
          label: 'Amazon Lex',
          definition:
            'Servicio para construir interfaces conversacionales por voz o texto, como chatbots.',
          explanation:
            'Lex sirve para conversar con el cliente en tiempo real, no para analizar el sentimiento de miles de conversaciones ya transcritas.',
          correct: false,
        },
      ],
    },
    {
      id: 'churn-model',
      prompt:
        'Última, la más ambiciosa: con nuestro historial de consumo, pagos y reclamos, queremos un modelo propio que prediga qué clientes están por cancelar su línea. ¿Qué servicio usamos?',
      topicSlug: 'ai-and-ml',
      examTasks: ['3.7'],
      options: [
        {
          id: 'churn-comprehend',
          label: 'Amazon Comprehend',
          definition:
            'Servicio preentrenado que analiza texto para extraer sentimiento, entidades, frases clave y temas.',
          explanation:
            'Comprehend analiza texto, pero predecir cancelaciones a partir del historial propio de la empresa requiere entrenar un modelo a la medida.',
          correct: false,
        },
        {
          id: 'churn-q-developer',
          label: 'Amazon Q Developer',
          definition:
            'Asistente de IA generativa que ayuda a desarrolladores a entender, construir y operar aplicaciones en AWS.',
          explanation:
            'Q Developer ayuda a programar y operar aplicaciones, pero no es el servicio para construir, entrenar y desplegar un modelo de predicción con los datos de Telecom Andina.',
          correct: false,
        },
        {
          id: 'churn-rekognition',
          label: 'Amazon Rekognition',
          definition:
            'Servicio preentrenado que analiza imágenes y videos, incluidos el análisis y la comparación de rostros.',
          explanation:
            'Rekognition trabaja con imágenes y videos. El historial de consumo y pagos no tiene nada que ver con eso.',
          correct: false,
        },
        {
          id: 'churn-sagemaker-ai',
          label: 'Amazon SageMaker AI',
          definition:
            'Servicio de machine learning totalmente administrado para construir, entrenar y desplegar modelos propios.',
          explanation:
            'Predecir quién cancelará en Telecom Andina requiere un modelo a la medida, entrenado con el historial de sus propios clientes: construirlo, entrenarlo y desplegarlo es el trabajo de SageMaker AI.',
          correct: true,
        },
      ],
    },
  ],
};
