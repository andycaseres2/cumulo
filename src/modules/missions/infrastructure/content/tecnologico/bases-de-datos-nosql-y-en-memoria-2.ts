import type { Mission } from '../../../domain/Mission';

/**
 * StreamLlama's recommendations team in Lima: a growing streaming catalog spread across the wrong databases.
 * Practices Amazon Neptune, Amazon DocumentDB, AWS DMS after a schema conversion, and DynamoDB versus a relational trap.
 */
export const basesDeDatosNosqlYEnMemoria2: Mission = {
  id: 'bases-de-datos-nosql-y-en-memoria-2',
  track: 'tecnologico',
  topicSlug: 'bases-de-datos-nosql-y-en-memoria',
  buildingId: 'streaming',
  title: 'Si te gustó esta serie...',
  client: { name: 'Ximena Cárdenas', role: 'Líder del equipo de recomendaciones de StreamLlama' },
  intro: [
    'Hola, pasa. Soy Ximena Cárdenas y lidero el equipo de recomendaciones de StreamLlama, aquí en Lima. Mientras otros equipos se ocupan de que los videos carguen rápido, a nosotros nos toca que sepas qué ver.',
    'El catálogo crece cada semana: series, películas, documentales, cada uno con datos distintos. Y nuestros espectadores se siguen entre sí, comparten listas y ven lo que ven sus amigos.',
    'El problema es que todo eso está metido a la fuerza en bases de datos que no fueron pensadas para ello. Las recomendaciones tardan, el catálogo es un rompecabezas y el sistema de suscripciones sigue en un servidor viejo.',
    'Si no lo ordenamos, la gente se va a cansar de buscar y se va a ir a otra plataforma. Necesito elegir la base de datos correcta para cada cosa. ¿Te animas?',
  ],
  outro: {
    passed: [
      'Perfecto. Neptune para las relaciones, DocumentDB para el catálogo sin tocar el código, DMS para traer las suscripciones y DynamoDB para el historial.',
      'Cada dato en la base que le corresponde. Ahora sí podemos decir con confianza "si te gustó esta serie, te va a encantar esta otra". ¡Gracias!',
    ],
    failed: [
      'Mmm... con estas elecciones las recomendaciones seguirían tardando. Hay piezas que no terminan de encajar.',
      'Repasa la teoría de bases de datos NoSQL y en memoria y vuelve cuando quieras. Te guardo un lugar en el sofá del equipo.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'recommendation-graph',
      prompt:
        'Empecemos por mi favorito: queremos recomendar títulos según lo que ven las personas que sigues y los amigos de tus amigos. Son millones de espectadores y miles de millones de relaciones entre ellos y con los títulos. ¿Qué base de datos uso?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'elasticache',
          label: 'Amazon ElastiCache',
          definition:
            'Almacén de datos en memoria o caché distribuida administrada, compatible con Valkey, Memcached y Redis OSS.',
          explanation:
            'ElastiCache acelera consultas repetidas guardando datos en memoria, pero no está pensado para recorrer relaciones entre espectadores y títulos.',
          correct: false,
        },
        {
          id: 'rds-joins',
          label: 'Amazon RDS for PostgreSQL con muchas uniones (JOIN) entre tablas',
          definition: 'Base de datos relacional administrada que relaciona tablas de esquema fijo mediante consultas SQL con JOIN.',
          explanation:
            'Recorrer "amigos de amigos" sobre miles de millones de relaciones con cadenas de JOIN se vuelve lento y complejo. Para datos tan conectados existe una base de grafos.',
          correct: false,
        },
        {
          id: 'dynamodb-graph',
          label: 'Amazon DynamoDB',
          definition: 'Base de datos NoSQL serverless de clave-valor y documentos, con milisegundos de un solo dígito a cualquier escala.',
          explanation:
            'DynamoDB es ideal para buscar datos por su clave, pero no admite JOIN ni está optimizada para recorrer relaciones de varios saltos.',
          correct: false,
        },
        {
          id: 'neptune',
          label: 'Amazon Neptune',
          definition:
            'Base de datos de grafos totalmente administrada, optimizada para almacenar relaciones entre entidades y recorrerlas con baja latencia.',
          explanation:
            'Espectadores y títulos son nodos, y "sigue a" o "vio" son relaciones: un grafo. Los motores de recomendación son un caso típico de Neptune, que admite Gremlin, openCypher y SPARQL.',
          correct: true,
        },
      ],
    },
    {
      id: 'catalog-documents',
      prompt:
        'Ahora el catálogo. Cada título es un documento JSON con campos distintos: una serie tiene temporadas, un documental tiene fuentes, una película tiene versiones. Hoy corre en un MongoDB que mantenemos nosotros y queremos uno administrado sin reescribir el código ni cambiar los drivers. ¿Cuál elijo?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'documentdb',
          label: 'Amazon DocumentDB (with MongoDB compatibility)',
          definition:
            'Base de datos de documentos totalmente administrada y compatible con MongoDB, que admite el mismo código, controladores y herramientas.',
          explanation:
            'DocumentDB es compatible con MongoDB: guarda documentos JSON con estructura flexible y el equipo mantiene su código, sus drivers y sus herramientas.',
          correct: true,
        },
        {
          id: 'dynamodb-catalog',
          label: 'Amazon DynamoDB',
          definition: 'Base de datos NoSQL serverless de clave-valor y documentos, con replicación automática en tres Availability Zones.',
          explanation:
            'Confundir DocumentDB con DynamoDB es una trampa típica. DynamoDB tiene su propia API, así que el equipo tendría que reescribir el código que hoy usa los drivers de MongoDB.',
          correct: false,
        },
        {
          id: 'neptune-catalog',
          label: 'Amazon Neptune',
          definition: 'Base de datos de grafos administrada para datos altamente conectados, como redes sociales o grafos de conocimiento.',
          explanation:
            'Neptune ya cubre las relaciones para las recomendaciones. El catálogo son documentos JSON independientes que hoy viven en MongoDB, y Neptune no es compatible con MongoDB.',
          correct: false,
        },
        {
          id: 'aurora',
          label: 'Amazon Aurora',
          definition: 'Base de datos relacional administrada, compatible con MySQL y PostgreSQL, con tablas de esquema fijo.',
          explanation:
            'Aurora es relacional: obligaría a encajar documentos con campos variables en tablas de esquema fijo y a reescribir el código pensado para MongoDB.',
          correct: false,
        },
      ],
    },
    {
      id: 'subscriptions-migration',
      prompt:
        'El sistema de suscripciones corre en un Oracle de nuestro servidor viejo y lo llevamos a Amazon Aurora PostgreSQL. El esquema ya lo convertimos con AWS SCT. Ahora hay que mover los datos y mantener ambas bases sincronizadas mientras los clientes siguen pagando, hasta el día del cambio. ¿Qué uso?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'datasync',
          label: 'AWS DataSync',
          definition: 'Servicio que transfiere archivos y objetos entre almacenamiento on-premises y servicios de almacenamiento de AWS.',
          explanation:
            'DataSync copia archivos y objetos, no replica los cambios en curso de una base de datos Oracle hacia Aurora.',
          correct: false,
        },
        {
          id: 'dms',
          label: 'AWS Database Migration Service (AWS DMS)',
          definition:
            'Servicio que migra bases de datos hacia AWS, en una sola vez o replicando los cambios en curso, entre el mismo motor o motores distintos.',
          explanation:
            'Con el esquema ya convertido, DMS mueve los datos y puede replicar los cambios en curso para mantener Oracle y Aurora sincronizadas hasta el día del cambio.',
          correct: true,
        },
        {
          id: 'global-tables',
          label: 'DynamoDB global tables',
          definition: 'Replicación multi-Región y multi-activa de tablas de Amazon DynamoDB.',
          explanation:
            'Las global tables replican tablas de DynamoDB entre Regiones. No migran datos desde Oracle ni tienen relación con Aurora PostgreSQL.',
          correct: false,
        },
        {
          id: 'elasticache-sync',
          label: 'Amazon ElastiCache entre ambas bases',
          definition: 'Capa de caché en memoria administrada que guarda copias temporales de datos consultados con frecuencia.',
          explanation:
            'Una caché acelera lecturas repetidas, pero no migra datos ni mantiene sincronizadas dos bases de datos.',
          correct: false,
        },
      ],
    },
    {
      id: 'watch-history',
      prompt:
        'Último tema: el "seguir viendo". Cada pocos segundos guardamos en qué minuto va cada espectador, siempre por su ID y el del título. En un estreno son muchísimas escrituras por segundo. Un compañero propone usar RDS porque "es lo que conocemos". ¿Qué le respondo?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'rds-history',
          label: 'Que tiene razón: Amazon RDS con una instancia más grande para los estrenos',
          definition: 'Base de datos relacional administrada que escala principalmente con instancias más grandes y réplicas de lectura.',
          explanation:
            'Es la trampa típica del examen: datos clave-valor con un volumen enorme de solicitudes apuntan a DynamoDB, que está diseñada para escalar horizontalmente.',
          correct: false,
        },
        {
          id: 'elasticache-only',
          label: 'Guardar el historial solo en Amazon ElastiCache, sin base de datos principal',
          definition: 'Almacén en memoria administrado, usado normalmente como caché delante de una base de datos principal.',
          explanation:
            'ElastiCache se usa normalmente como capa de caché, no como reemplazo de la base principal. El historial de cada espectador necesita una base que lo guarde de forma duradera.',
          correct: false,
        },
        {
          id: 'dynamodb',
          label: 'Mejor Amazon DynamoDB, porque es clave-valor y escala sin administrar servidores',
          definition:
            'Base de datos NoSQL serverless y totalmente administrada, con rendimiento de milisegundos de un solo dígito a cualquier escala.',
          explanation:
            'El progreso se guarda y se lee por el ID del espectador y del título, sin uniones. DynamoDB atiende ese volumen en milisegundos, sin servidores ni parches que administrar.',
          correct: true,
        },
        {
          id: 'neptune-history',
          label: 'Mejor Amazon Neptune, que ya vamos a usar para las recomendaciones',
          definition: 'Base de datos de grafos para almacenar y consultar relaciones entre entidades altamente conectadas.',
          explanation:
            'Guardar en qué minuto va cada espectador no es un problema de relaciones. Para escrituras clave-valor masivas, la base indicada es DynamoDB.',
          correct: false,
        },
      ],
    },
  ],
};
