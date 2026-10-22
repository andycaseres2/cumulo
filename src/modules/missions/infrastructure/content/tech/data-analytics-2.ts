import type { Mission } from '../../../domain/Mission';

/**
 * Estudio de Juegos Cóndor: a mobile game studio in Santiago de Chile drowning in player events and server logs.
 * Practices Amazon Data Firehose, Amazon EMR, Amazon Redshift versus Amazon Athena, and Amazon OpenSearch Service.
 */
export const dataAnalytics2: Mission = {
  id: 'data-analytics-2',
  track: 'tech',
  topicSlug: 'data-analytics',
  buildingId: 'game-studio',
  title: 'Millones de partidas por analizar',
  client: { name: 'Tomás Riquelme', role: 'Líder de datos del Estudio de Juegos Cóndor' },
  intro: [
    'Hola, pasa. Soy Tomás Riquelme, líder de datos del Estudio de Juegos Cóndor. Desde Santiago de Chile hacemos juegos para celulares que juegan personas en toda Latinoamérica.',
    'Nuestro último juego, una carrera de llamas por los Andes, explotó: millones de partidas al día. Cada partida genera eventos, y nuestros servidores escriben gigas de logs.',
    'Hoy esos datos se pierden o quedan tirados en discos que nadie revisa. Diseño quiere saber dónde abandonan los jugadores, finanzas quiere reportes de compras y soporte no encuentra los errores.',
    'Si no entendemos a los jugadores, la próxima temporada del juego va a ciegas. Necesito armar nuestra plataforma de analítica en AWS. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      'Esto ya es otra cosa. Los eventos llegan solos a S3, el equipo de ciencia de datos corre Spark sin pelear con servidores y finanzas tiene su data warehouse.',
      'Y soporte encuentra cualquier error en los logs en segundos. La próxima temporada la diseñamos con datos. ¡Gracias!',
    ],
    failed: [
      'Uf... con estas decisiones seguiríamos jugando a ciegas. Algunas piezas no encajan con lo que necesitamos.',
      'Repasa la teoría de analítica de datos y vuelve. El estudio te guarda un lugar en el equipo.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'events-to-s3',
      prompt:
        'Lo primero: cada partida envía eventos en streaming, como "empezó", "compró una skin" o "abandonó". Quiero que esos eventos se carguen de forma continua en nuestro data lake en Amazon S3, sin escribir ni mantener un programa que los reciba. ¿Qué uso?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'athena-ingest',
          label: 'Amazon Athena',
          definition:
            'Servicio serverless de consultas interactivas con SQL estándar sobre datos guardados en Amazon S3.',
          explanation:
            'Athena consulta datos que ya están en S3, pero no recibe un flujo de eventos ni lo carga en el data lake.',
          correct: false,
        },
        {
          id: 'quicksight-ingest',
          label: 'Amazon Quick Sight',
          definition:
            'Servicio de inteligencia de negocio para crear tableros interactivos y visualizaciones.',
          explanation:
            'Quick Sight muestra tableros con datos ya disponibles. No captura los eventos de las partidas ni los entrega en S3.',
          correct: false,
        },
        {
          id: 'firehose-ingest',
          label: 'Amazon Data Firehose',
          definition:
            'Servicio de la familia Kinesis que carga datos en streaming en destinos como Amazon S3, Amazon Redshift u Amazon OpenSearch Service.',
          explanation:
            'Firehose recibe el flujo de eventos y lo entrega de forma continua en S3, el destino que necesitas, sin que mantengas un programa propio que los reciba.',
          correct: true,
        },
        {
          id: 'redshift-ingest',
          label: 'Amazon Redshift',
          definition:
            'Data warehouse en la nube para consultas analíticas complejas con SQL sobre grandes volúmenes de datos.',
          explanation:
            'Redshift es un data warehouse para analizar datos, no un servicio para cargar un flujo de eventos en un data lake en S3.',
          correct: false,
        },
      ],
    },
    {
      id: 'spark-jobs',
      prompt:
        'El equipo de ciencia de datos ya tiene sus trabajos escritos en Apache Spark para calcular en qué nivel abandonan los jugadores. Quieren ejecutarlos sobre terabytes de partidas sin tener que aprovisionar ni ajustar clústeres a mano. ¿Qué servicio les recomiendo?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'emr-spark',
          label: 'Amazon EMR',
          definition:
            'Plataforma de big data para procesar grandes volúmenes de datos con frameworks de código abierto como Apache Spark, Hive, HBase, Flink, Hudi y Presto.',
          explanation:
            'EMR es la opción para ejecutar frameworks de big data como Spark sobre grandes volúmenes, y automatiza tareas como aprovisionar capacidad y ajustar los clústeres.',
          correct: true,
        },
        {
          id: 'quicksight-spark',
          label: 'Amazon Quick Sight',
          definition:
            'Servicio de inteligencia de negocio para crear tableros y reportes que se ven en el navegador o el móvil.',
          explanation:
            'Quick Sight sirve para visualizar resultados en tableros. No ejecuta los trabajos de Spark del equipo de ciencia de datos.',
          correct: false,
        },
        {
          id: 'kinesis-streams-spark',
          label: 'Amazon Kinesis Data Streams',
          definition:
            'Servicio para capturar flujos de datos en tiempo real desde aplicaciones, dispositivos y sitios web.',
          explanation:
            'Kinesis Data Streams captura datos a medida que llegan. Procesar terabytes de partidas históricas con Spark es un trabajo de big data por lotes, propio de EMR.',
          correct: false,
        },
        {
          id: 'opensearch-spark',
          label: 'Amazon OpenSearch Service',
          definition:
            'Servicio administrado para buscar, analizar y visualizar datos casi en tiempo real, como logs o texto completo.',
          explanation:
            'OpenSearch Service se enfoca en búsqueda y análisis de logs. No es la plataforma para correr los trabajos de Apache Spark que ya tiene el equipo.',
          correct: false,
        },
      ],
    },
    {
      id: 'finance-warehouse',
      prompt:
        'Finanzas es otro mundo. Cada mañana corren los mismos reportes complejos que cruzan años de compras, jugadores y campañas, todo con datos estructurados, y quieren cargarlos en un data warehouse que puedan consultar con SQL desde su herramienta de BI. ¿Qué elijo?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'kinesis-warehouse',
          label: 'Amazon Kinesis Data Streams',
          definition:
            'Servicio para capturar y procesar flujos de datos en tiempo real, como clics o eventos de aplicaciones.',
          explanation:
            'Kinesis Data Streams captura datos en streaming. Finanzas necesita un almacén para análisis complejos y recurrentes sobre datos históricos.',
          correct: false,
        },
        {
          id: 'athena-warehouse',
          label: 'Amazon Athena',
          definition:
            'Servicio serverless que consulta con SQL estándar los archivos directamente en Amazon S3, sin cargar los datos en otro sistema.',
          explanation:
            'Es la confusión clásica del examen: Athena consulta los archivos directamente donde están, en S3. Finanzas pide un data warehouse para análisis complejos y recurrentes a gran escala, y ese es Redshift.',
          correct: false,
        },
        {
          id: 'opensearch-warehouse',
          label: 'Amazon OpenSearch Service',
          definition:
            'Servicio administrado de OpenSearch para búsqueda de texto completo, análisis de logs y monitoreo de aplicaciones.',
          explanation:
            'OpenSearch Service está pensado para buscar y analizar logs, no para ser el data warehouse de los reportes financieros.',
          correct: false,
        },
        {
          id: 'redshift-warehouse',
          label: 'Amazon Redshift',
          definition:
            'Data warehouse en la nube con almacenamiento columnar y ejecución masivamente paralela para analizar grandes volúmenes de datos con SQL estándar.',
          explanation:
            'Redshift es el data warehouse de AWS: carga los datos estructurados, ejecuta consultas analíticas complejas con SQL y se conecta con las herramientas de BI que finanzas ya usa.',
          correct: true,
        },
      ],
    },
    {
      id: 'search-logs',
      prompt:
        'Por último, soporte. Cuando un jugador reporta que el juego se cerró, quieren buscar el texto del error en los logs de los servidores y ver gráficos de errores casi en tiempo real. ¿Qué servicio les doy?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'glue-logs',
          label: 'AWS Glue',
          definition:
            'Servicio ETL totalmente administrado para preparar y cargar datos para analítica, con un catálogo de metadatos.',
          explanation:
            'Glue prepara y cataloga datos para analizarlos después. Soporte necesita buscar texto en los logs y verlos casi en tiempo real.',
          correct: false,
        },
        {
          id: 'opensearch-logs',
          label: 'Amazon OpenSearch Service',
          definition:
            'Servicio administrado para desplegar, operar y escalar OpenSearch, con el que se buscan, analizan y visualizan datos casi en tiempo real.',
          explanation:
            'Análisis de logs y búsqueda de texto completo son los casos típicos de OpenSearch Service, y OpenSearch Dashboards le da a soporte los gráficos de errores.',
          correct: true,
        },
        {
          id: 'redshift-logs',
          label: 'Amazon Redshift',
          definition:
            'Data warehouse para consultas analíticas complejas con SQL sobre datos estructurados y semiestructurados.',
          explanation:
            'Redshift es fuerte en reportes analíticos con SQL, como los de finanzas. Buscar texto de errores en logs casi en tiempo real es el terreno de OpenSearch Service.',
          correct: false,
        },
        {
          id: 'kinesis-video-logs',
          label: 'Amazon Kinesis Video Streams',
          definition:
            'Servicio para capturar y procesar video que envían dispositivos conectados.',
          explanation:
            'Kinesis Video Streams trabaja con video desde dispositivos. No sirve para buscar texto en los logs de los servidores del juego.',
          correct: false,
        },
      ],
    },
  ],
};
