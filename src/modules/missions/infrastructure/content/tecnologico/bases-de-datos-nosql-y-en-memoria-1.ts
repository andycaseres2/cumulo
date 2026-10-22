import type { Mission } from '../../../domain/Mission';

/**
 * Pedalea: a bike-sharing startup in Montevideo whose relational database cannot keep up with weekend peaks.
 * Practices Amazon DynamoDB, its on-demand capacity mode and global tables, and Amazon ElastiCache as a cache.
 */
export const basesDeDatosNosqlYEnMemoria1: Mission = {
  id: 'bases-de-datos-nosql-y-en-memoria-1',
  track: 'tecnologico',
  topicSlug: 'bases-de-datos-nosql-y-en-memoria',
  buildingId: 'startup-lab',
  title: 'Bicis que no esperan',
  client: { name: 'Martina Olivera', role: 'Cofundadora y CTO de Pedalea' },
  intro: [
    '¡Hola! Soy Martina Olivera, cofundadora y CTO de Pedalea. Tenemos nuestra oficina aquí en el Startup Lab, pero nuestras bicis ruedan por toda Montevideo.',
    'Con la app desbloqueas una bici, pedaleas y la dejas en cualquier estación. Cada viaje genera decenas de lecturas y escrituras: dónde está la bici, quién la usa, cuánto lleva recorrido.',
    'El problema es que todo vive en una sola base de datos relacional. Los sábados a la mañana, cuando media ciudad sale a pasear por la rambla, la app se pone lentísima y hay gente que se queda parada frente a una bici que no se desbloquea.',
    'Los inversores quieren que el año que viene lleguemos a Santiago y a São Paulo, y así no llegamos ni a la esquina. Necesito elegir bien las bases de datos. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      '¡Eso es! DynamoDB para los viajes, pagando solo lo que usamos, una caché en memoria para el ranking y las sesiones, y global tables para cuando crucemos la frontera.',
      'El próximo sábado voy a pasear por la rambla solo para ver la app volar. Gracias, de verdad: en Pedalea siempre tendrás una bici esperándote.',
    ],
    failed: [
      'Mmm... no estoy segura de que con este plan aguantemos el próximo sábado. Hay decisiones que me siguen haciendo ruido.',
      'Repasa la teoría de bases de datos NoSQL y en memoria y vuelve cuando quieras. Las bicis te esperan en la estación.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'trip-store',
      prompt:
        'Empecemos por el corazón de la app: el estado de cada viaje. Siempre lo buscamos por el ID del viaje, no necesitamos cruzar tablas y en los picos llegan muchísimas solicitudes por segundo. Quiero respuestas en milisegundos y no administrar servidores ni parches. ¿Qué base de datos uso?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'rds-mysql',
          label: 'Amazon RDS for MySQL',
          definition:
            'Base de datos relacional administrada con tablas de esquema fijo, consultas SQL y uniones entre tablas.',
          explanation:
            'Elegir una base relacional para un volumen enorme de solicitudes clave-valor es la trampa típica. RDS escala con instancias más grandes y réplicas de lectura, y tiene ventanas de mantenimiento.',
          correct: false,
        },
        {
          id: 'dynamodb',
          label: 'Amazon DynamoDB',
          definition:
            'Base de datos NoSQL serverless y totalmente administrada, de clave-valor y documentos, con rendimiento de milisegundos de un solo dígito a cualquier escala.',
          explanation:
            'Cada viaje se busca por su clave, sin uniones, y DynamoDB responde en milisegundos de un solo dígito a cualquier escala. Al ser serverless, Pedalea no aprovisiona servidores ni aplica parches.',
          correct: true,
        },
        {
          id: 'neptune',
          label: 'Amazon Neptune',
          definition:
            'Base de datos de grafos totalmente administrada, optimizada para almacenar y consultar relaciones entre entidades.',
          explanation:
            'Neptune brilla cuando lo importante son las relaciones entre datos, como en redes sociales o detección de fraude. Para leer y escribir el estado de un viaje por su ID, el modelo clave-valor encaja mejor.',
          correct: false,
        },
        {
          id: 'redshift',
          label: 'Amazon Redshift',
          definition:
            'Data warehouse administrado para analizar grandes volúmenes de datos históricos con consultas SQL complejas.',
          explanation:
            'Redshift sirve para análisis y reportes sobre muchos datos, no para atender en milisegundos cada desbloqueo de bici de la app.',
          correct: false,
        },
      ],
    },
    {
      id: 'capacity-mode',
      prompt:
        'Nuestro tráfico es una montaña rusa: los sábados se multiplica, de madrugada casi nadie pedalea y cuando hay un evento en la ciudad no sabemos qué va a pasar. No quiero adivinar capacidad. ¿Cómo configuro la tabla de DynamoDB?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'bigger-instance',
          label: 'Elegir una instancia más grande para la tabla',
          definition:
            'Escalado vertical: reemplazar el servidor de base de datos por otro con más CPU y memoria.',
          explanation:
            'DynamoDB es serverless: no hay instancias que elegir para la tabla. Pensar en servidores más grandes corresponde a bases como RDS.',
          correct: false,
        },
        {
          id: 'fixed-peak',
          label: 'Fijar a mano una capacidad igual a la del peor sábado, todo el día',
          definition:
            'Reservar una cantidad fija de lecturas y escrituras por segundo calculada para el momento de mayor demanda.',
          explanation:
            'Pedalea pagaría la capacidad del pico incluso de madrugada, y si un evento supera ese número, la app volvería a sufrir. Es justo la adivinanza que Martina quiere evitar.',
          correct: false,
        },
        {
          id: 'elasticache-instead',
          label: 'Reemplazar la tabla por Amazon ElastiCache para absorber los picos',
          definition:
            'Almacén de datos en memoria o caché distribuida administrada, compatible con Valkey, Memcached y Redis OSS.',
          explanation:
            'ElastiCache se usa normalmente como capa de caché delante de la base principal, no como su reemplazo. El problema de capacidad de la tabla de viajes se resuelve en la propia DynamoDB.',
          correct: false,
        },
        {
          id: 'on-demand',
          label: 'Usar el modo bajo demanda (on-demand) de DynamoDB',
          definition:
            'Modo de capacidad de DynamoDB en el que se paga por las lecturas y escrituras realizadas y la tabla escala automáticamente.',
          explanation:
            'Con el modo bajo demanda, la tabla escala sola con los picos del sábado, incluso hasta cero de madrugada, y Pedalea paga solo por las lecturas y escrituras que hace.',
          correct: true,
        },
      ],
    },
    {
      id: 'leaderboard-cache',
      prompt:
        'Ahora lo divertido: un ranking semanal de kilómetros que todos miran a la vez, y las sesiones de los usuarios, que hoy consultamos una y otra vez en la base principal. Mi equipo ya trabaja con Redis OSS. ¿Qué servicio pongo delante para responder desde la memoria?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'elasticache',
          label: 'Amazon ElastiCache',
          definition:
            'Servicio administrado de almacén de datos en memoria o caché distribuida, con motores Valkey, Memcached y Redis OSS, en modo serverless o con nodos.',
          explanation:
            'Las sesiones de usuario y las tablas de posiciones son casos típicos de ElastiCache. Guarda los datos en memoria RAM para responder rapidísimo, funciona con Redis OSS y AWS se encarga de los nodos y los parches.',
          correct: true,
        },
        {
          id: 'documentdb',
          label: 'Amazon DocumentDB (with MongoDB compatibility)',
          definition:
            'Base de datos de documentos totalmente administrada y compatible con MongoDB, para registros con estructura flexible en formato JSON.',
          explanation:
            'DocumentDB es una base de documentos para quienes usan MongoDB. Lo que Pedalea busca es una capa de caché en memoria, y su equipo trabaja con Redis OSS.',
          correct: false,
        },
        {
          id: 'neptune-ranking',
          label: 'Amazon Neptune',
          definition:
            'Base de datos de grafos para datos altamente conectados, con lenguajes como Gremlin, openCypher y SPARQL.',
          explanation:
            'Un ranking de kilómetros y unas sesiones no son relaciones complejas entre entidades. Neptune no es una caché en memoria delante de la base principal.',
          correct: false,
        },
        {
          id: 'sct',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'Herramienta descargable que convierte el esquema de una base de datos de origen al formato de un motor distinto.',
          explanation:
            'SCT sirve para migrar entre motores distintos convirtiendo esquemas. No guarda datos en memoria ni acelera consultas repetidas.',
          correct: false,
        },
      ],
    },
    {
      id: 'multi-region',
      prompt:
        'Último tema, el que más me piden los inversores: cuando abramos en Santiago y São Paulo, queremos que la app de cada país lea y escriba en una Región de AWS cercana, y que los datos de los viajes estén replicados entre todas. ¿Qué usamos?',
      topicSlug: 'bases-de-datos-nosql-y-en-memoria',
      examTasks: ['3.4'],
      options: [
        {
          id: 'dax',
          label: 'DynamoDB Accelerator (DAX)',
          definition: 'Caché en memoria administrada y específica para Amazon DynamoDB, que acelera las lecturas de una tabla.',
          explanation:
            'DAX acelera lecturas con una caché, pero no replica la tabla entre Regiones ni permite escribir en varias de ellas.',
          correct: false,
        },
        {
          id: 'separate-tables',
          label: 'Una tabla independiente en cada Región, sin conexión entre ellas',
          definition: 'Crear tablas aisladas en distintas Regiones, cada una con sus propios datos y sin sincronización.',
          explanation:
            'Cada país quedaría con datos distintos: un usuario de Montevideo que viaje a Santiago no encontraría su historial. Martina pidió datos replicados entre todas las Regiones.',
          correct: false,
        },
        {
          id: 'global-tables',
          label: 'DynamoDB global tables',
          definition: 'Función de DynamoDB que replica una tabla en varias Regiones, con todas ellas activas para leer y escribir.',
          explanation:
            'Las global tables dan replicación multi-Región y multi-activa: la app de cada país lee y escribe en su Región cercana y los viajes se replican entre todas.',
          correct: true,
        },
        {
          id: 'three-azs',
          label: 'Nada extra: DynamoDB ya replica los datos en tres Availability Zones',
          definition: 'Replicación automática de DynamoDB entre tres Availability Zones dentro de una misma Región.',
          explanation:
            'Esa replicación protege contra la falla de una AZ, pero ocurre dentro de una sola Región. Para leer y escribir en Santiago y São Paulo se necesitan global tables.',
          correct: false,
        },
      ],
    },
  ],
};
