import type { Mission } from '../../../domain/Mission';

/**
 * Robótica Kids: a store in Guadalajara that sells robotics kits and runs weekend workshops for children.
 * Practices choosing analytics services: Amazon Athena, Amazon Kinesis, AWS Glue and Amazon Quick Sight.
 */
export const dataAnalytics1: Mission = {
  id: 'data-analytics-1',
  track: 'tech',
  topicSlug: 'data-analytics',
  buildingId: 'robotics-school',
  title: 'Robots que hablan en datos',
  client: { name: 'Mariana Villaseñor', role: 'Dueña de Robótica Kids' },
  intro: [
    '¡Hola! ¡Te damos la bienvenida a Robótica Kids! Soy Mariana Villaseñor. Desde Guadalajara vendemos kits de robótica para niños y cada fin de semana damos talleres donde arman y programan sus propios robots.',
    'El negocio creció rápido: ya tenemos tienda en línea y tres franquicias en Jalisco. Todas las ventas terminan como archivos en Amazon S3, y los robots de los talleres envían lecturas de sus sensores sin parar.',
    'El problema es que tengo montañas de datos y ninguna respuesta. No sé qué kits se venden más, ni qué robots fallan en los talleres, y las franquicias me piden números cada semana.',
    'Quiero decidir con datos antes de la temporada de regreso a clases, que es cuando más vendemos. ¿Me ayudas a elegir las herramientas de analítica correctas?',
  ],
  outro: {
    passed: [
      '¡Lo logramos! Ya consulto las ventas con SQL, veo en tiempo real qué robots fallan y los datos quedan limpios y catalogados.',
      'Y las franquicias por fin tienen sus tableros en el celular. Este regreso a clases lo vamos a planear con datos. ¡Gracias!',
    ],
    failed: [
      'Mmm... creo que con estas decisiones seguiría ahogada en archivos sin respuestas.',
      'Repasa la teoría de analítica de datos y vuelve cuando quieras. Los robots y yo te esperamos.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'query-sales-files',
      prompt:
        'Empecemos por las ventas. Tengo tres años de archivos de ventas en Amazon S3. Quiero preguntarles cosas con SQL, como qué kit se vende más por mes, sin montar servidores y pagando solo cuando hago una consulta. ¿Qué uso?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'athena-sales',
          label: 'Amazon Athena',
          definition:
            'Servicio serverless de consultas interactivas que analiza datos guardados en Amazon S3 con SQL estándar y cobra por las consultas ejecutadas.',
          explanation:
            'Encaja con lo que pides: Athena consulta los archivos directamente en S3 con SQL estándar, no hay servidores que administrar y pagas solo por las consultas que ejecutas.',
          correct: true,
        },
        {
          id: 'kinesis-sales',
          label: 'Amazon Kinesis',
          definition:
            'Familia de servicios para recopilar, procesar y analizar datos en streaming en tiempo real, como clics o telemetría.',
          explanation:
            'Kinesis trabaja con datos que llegan de forma continua. Tus ventas son archivos históricos ya guardados en S3, y lo que necesitas es consultarlos con SQL.',
          correct: false,
        },
        {
          id: 'quicksight-sales',
          label: 'Amazon Quick Sight',
          definition:
            'Servicio de inteligencia de negocio para crear tableros interactivos y visualizaciones que se ven en el navegador o el móvil.',
          explanation:
            'Quick Sight muestra tableros con los resultados, pero no es el servicio que ejecuta consultas SQL directamente sobre los archivos guardados en S3.',
          correct: false,
        },
        {
          id: 'opensearch-sales',
          label: 'Amazon OpenSearch Service',
          definition:
            'Servicio administrado para desplegar y escalar OpenSearch, orientado a búsqueda de texto completo y análisis de logs casi en tiempo real.',
          explanation:
            'OpenSearch Service brilla buscando texto y analizando logs. Para consultar con SQL archivos de ventas en S3 sin servidores, la opción es Athena.',
          correct: false,
        },
      ],
    },
    {
      id: 'robot-telemetry',
      prompt:
        'Ahora los talleres. Cada robot envía varias lecturas por segundo: batería, motores, sensores. Quiero capturar y procesar ese flujo mientras el taller está en marcha para avisar al instructor si un robot se está por quedar sin batería. ¿Qué servicio va aquí?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'redshift-telemetry',
          label: 'Amazon Redshift',
          definition:
            'Data warehouse en la nube con almacenamiento columnar para consultas analíticas complejas con SQL sobre grandes volúmenes de datos.',
          explanation:
            'Redshift sirve para análisis complejos y recurrentes sobre datos ya almacenados. Lo que pides es capturar un flujo continuo y reaccionar mientras el taller ocurre.',
          correct: false,
        },
        {
          id: 'athena-telemetry',
          label: 'Amazon Athena',
          definition:
            'Servicio serverless para consultar con SQL estándar datos guardados en Amazon S3.',
          explanation:
            'Athena consulta datos que ya están guardados en S3. Para capturar y procesar lecturas a medida que llegan, en tiempo real, se usa Kinesis.',
          correct: false,
        },
        {
          id: 'kinesis-telemetry',
          label: 'Amazon Kinesis',
          definition:
            'Familia de servicios para recopilar, procesar y analizar datos en streaming en tiempo real, como telemetría de IoT, logs o clics.',
          explanation:
            'Es el caso típico de streaming: Kinesis Data Streams captura las lecturas de los robots a medida que llegan, y así puedes procesarlas mientras el taller sigue en marcha.',
          correct: true,
        },
        {
          id: 'quicksight-telemetry',
          label: 'Amazon Quick Sight',
          definition:
            'Servicio de inteligencia de negocio para crear tableros interactivos y reportes para la toma de decisiones.',
          explanation:
            'Quick Sight muestra tableros, pero no captura ni procesa el flujo de datos que envían los robots. Esa tarea de streaming es de Kinesis.',
          correct: false,
        },
      ],
    },
    {
      id: 'clean-and-catalog',
      prompt:
        'Me encontré con otro lío: la tienda en línea guarda las ventas en JSON, las franquicias en CSV y cada una nombra las columnas a su manera. Necesito limpiar y unir esos datos, y tener un catálogo con el esquema de cada tabla para que las consultas sepan cómo leerlos. ¿Qué uso?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'quicksight-catalog',
          label: 'Amazon Quick Sight',
          definition:
            'Servicio de inteligencia de negocio para crear tableros y visualizaciones interactivas que se pueden insertar en aplicaciones.',
          explanation:
            'Es una trampa típica: los tableros son de Quick Sight, pero preparar los datos con ETL y catalogar sus esquemas es trabajo de AWS Glue.',
          correct: false,
        },
        {
          id: 'redshift-catalog',
          label: 'Amazon Redshift',
          definition:
            'Data warehouse en la nube para analizar grandes volúmenes de datos estructurados y semiestructurados con SQL estándar.',
          explanation:
            'Redshift es el destino donde se analizan datos ya preparados. Lo que necesitas ahora es transformar los archivos y guardar sus metadatos en un catálogo, y eso lo hace Glue.',
          correct: false,
        },
        {
          id: 'kinesis-video-catalog',
          label: 'Amazon Kinesis Video Streams',
          definition:
            'Servicio de Kinesis para capturar y procesar video que envían dispositivos conectados.',
          explanation:
            'Kinesis Video Streams trabaja con video desde dispositivos. Tu problema son archivos de ventas en formatos distintos que hay que limpiar y catalogar.',
          correct: false,
        },
        {
          id: 'glue-catalog',
          label: 'AWS Glue',
          definition:
            'Servicio ETL totalmente administrado que descubre datos, los prepara y guarda sus metadatos en el AWS Glue Data Catalog.',
          explanation:
            'Glue extrae, transforma y carga los datos para unificarlos, y su Glue Data Catalog guarda la definición de las tablas y el esquema, que Athena usa para saber cómo leerlos.',
          correct: true,
        },
      ],
    },
    {
      id: 'franchise-dashboards',
      prompt:
        'Último paso. Los dueños de las franquicias no saben SQL: quieren abrir el celular y ver un tablero con las ventas de su tienda, con gráficos que puedan filtrar. ¿Qué servicio les doy?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'emr-dashboards',
          label: 'Amazon EMR',
          definition:
            'Plataforma de big data para procesar grandes volúmenes de datos con frameworks de código abierto como Apache Spark, Hive o HBase.',
          explanation:
            'EMR procesa grandes volúmenes con frameworks como Spark, pero no ofrece a los franquiciados tableros de negocio para ver en el celular.',
          correct: false,
        },
        {
          id: 'quicksight-dashboards',
          label: 'Amazon Quick Sight',
          definition:
            'Servicio de inteligencia de negocio para crear tableros interactivos y visualizaciones que se ven desde el navegador o el móvil.',
          explanation:
            'Quick Sight es la capacidad de BI de AWS: crea tableros interactivos que los franquiciados ven en el navegador o en el celular, sin escribir SQL.',
          correct: true,
        },
        {
          id: 'glue-dashboards',
          label: 'AWS Glue',
          definition:
            'Servicio ETL administrado que prepara y carga datos para analítica y mantiene un catálogo de metadatos.',
          explanation:
            'Glue prepara y cataloga los datos que alimentan los tableros, pero no crea las visualizaciones. Los tableros de BI son de Quick Sight.',
          correct: false,
        },
        {
          id: 'firehose-dashboards',
          label: 'Amazon Data Firehose',
          definition:
            'Servicio que carga datos en streaming en destinos como Amazon S3, Amazon Redshift u Amazon OpenSearch Service.',
          explanation:
            'Firehose entrega datos en streaming a un destino de almacenamiento o análisis. No ofrece tableros para que los franquiciados vean sus ventas.',
          correct: false,
        },
      ],
    },
  ],
};
