import type { Mission } from '../../../domain/Mission';

/**
 * Robótica Kids: a robotics school for children in Guatemala City that needs a simple website and runs queued robot simulations.
 * Practices Amazon Lightsail (simple, low predictable monthly price, bundled databases), AWS Batch vs AWS Lambda,
 * and connecting a growing Lightsail project to other AWS services with VPC peering.
 */
export const otrosServiciosDeComputo2: Mission = {
  id: 'otros-servicios-de-computo-2',
  track: 'tecnologico',
  topicSlug: 'otros-servicios-de-computo',
  buildingId: 'robotica-kids',
  title: 'Robots que aprenden en la nube',
  client: { name: 'Sofía Herrera', role: 'Fundadora de Robótica Kids' },
  intro: [
    '¡Hola, hola! Soy Sofía Herrera, fundadora de Robótica Kids. En Ciudad de Guatemala enseñamos a niños de 8 a 14 años a armar y programar robots.',
    'Necesitamos un sitio web para mostrar los cursos y recibir inscripciones. Somos una escuela pequeña: no tenemos a nadie de sistemas y necesito saber cuánto voy a pagar cada mes.',
    'Además, para el torneo nacional, los niños envían cientos de simulaciones de sus robots que pueden esperar en cola toda la noche. Hoy las corremos en una sola computadora vieja y no llegamos.',
    'El torneo es en dos meses y las familias ya preguntan por las inscripciones. ¿Me ayudas a llevar Robótica Kids a la nube?',
  ],
  outro: {
    passed: [
      '¡Lo logramos! El sitio corre en Lightsail con un precio mensual que puedo prever, las inscripciones van a su base de datos y las simulaciones del torneo se procesan en cola con AWS Batch.',
      'Y cuando crezcamos, sé cómo conectar todo con otros servicios de AWS. Gracias: los niños ya te nombraron mentor honorario.',
    ],
    failed: [
      'Ay... con estas decisiones no sé si llegamos al torneo.',
      'Repasa la teoría de otros servicios de cómputo y vuelve cuando quieras. Los robots te esperan.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'kids-website',
      prompt:
        'Primero, el sitio web. Quiero publicar un WordPress con los cursos de la forma más sencilla posible y con un precio mensual bajo y predecible. Un amigo me recomendó Elastic Beanstalk. ¿Qué elijo?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-beanstalk',
          label: 'AWS Elastic Beanstalk',
          definition:
            'Servicio para desplegar aplicaciones web que aprovisiona capacidad, balanceo de carga, monitoreo de salud y escalado.',
          explanation:
            'Elastic Beanstalk despliega aplicaciones sin gestionar infraestructura, pero se pagan los recursos que crea. Para un sitio simple con precio mensual bajo y predecible, encaja mejor Lightsail.',
          correct: false,
        },
        {
          id: 'kids-outposts',
          label: 'AWS Outposts',
          definition:
            'Servicio que instala infraestructura de AWS, operada por AWS, en las instalaciones del cliente.',
          explanation:
            'Outposts sirve para procesar datos localmente con baja latencia; es excesivo para el sitio web de una escuela pequeña.',
          correct: false,
        },
        {
          id: 'kids-lightsail',
          label: 'Amazon Lightsail',
          definition:
            'Servicio que, según AWS, es la forma más fácil de empezar, con servidores privados virtuales con imágenes listas y precio mensual bajo y predecible.',
          explanation:
            'Lightsail ofrece imágenes listas como WordPress y un precio mensual bajo y predecible, pensado para pequeños proyectos sin un equipo de sistemas.',
          correct: true,
        },
        {
          id: 'kids-batch-site',
          label: 'AWS Batch',
          definition: 'Servicio administrado para ejecutar trabajos de cómputo por lotes que esperan en una cola.',
          explanation:
            'Batch procesa trabajos en cola sin interacción del usuario; un sitio web que las familias visitan no es un trabajo por lotes.',
          correct: false,
        },
      ],
    },
    {
      id: 'kids-signup-database',
      prompt:
        'Para las inscripciones necesito una base de datos MySQL administrada, pero sin salir de lo simple y lo predecible que ya elegimos para el sitio. ¿Qué uso?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-lightsail-db',
          label: 'Una base de datos administrada de Lightsail con MySQL',
          definition:
            'Lightsail incluye, además de instancias, bases de datos administradas MySQL o PostgreSQL, balanceadores, almacenamiento, CDN, IP estáticas y DNS.',
          explanation:
            'Lightsail incluye bases de datos administradas MySQL, así que Sofía mantiene todo en el mismo servicio sencillo y con precio predecible.',
          correct: true,
        },
        {
          id: 'kids-outpost-db',
          label: 'Un Outpost en la escuela con la base de datos local',
          definition: 'Capacidad de cómputo y almacenamiento de AWS instalada en el sitio del cliente y operada por AWS.',
          explanation:
            'Un Outpost lleva infraestructura de AWS al sitio para casos de baja latencia o procesamiento local; no es lo simple y predecible que busca una escuela pequeña.',
          correct: false,
        },
        {
          id: 'kids-batch-db',
          label: 'Un entorno de AWS Batch que guarde las inscripciones',
          definition: 'Entorno de cómputo que aprovisiona recursos para procesar trabajos por lotes enviados a una cola.',
          explanation:
            'Batch ejecuta trabajos por lotes; no es una base de datos donde guardar las inscripciones de las familias.',
          correct: false,
        },
        {
          id: 'kids-local-zone-db',
          label: 'Una Local Zone con MySQL instalado a mano',
          definition: 'Ubicaciones de infraestructura de AWS cerca de grandes ciudades, para menor latencia hacia esos usuarios.',
          explanation:
            'Una Local Zone es un lugar donde ejecutar recursos, no una base administrada; instalar MySQL a mano es justo la complejidad que Sofía quiere evitar.',
          correct: false,
        },
      ],
    },
    {
      id: 'kids-tournament-sims',
      prompt:
        'Ahora el torneo: cientos de simulaciones de robots, algunas de más de una hora, que pueden esperar en cola toda la noche. Quiero ahorrar con instancias Spot. Un papá ingeniero sugiere AWS Lambda. ¿Qué servicio encaja mejor?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-lambda',
          label: 'AWS Lambda',
          definition: 'Servicio que ejecuta funciones cortas basadas en eventos, sin aprovisionar servidores.',
          explanation:
            'Confundir Batch con Lambda es una trampa típica: Lambda ejecuta funciones cortas basadas en eventos, y una invocación no alcanza para simulaciones de más de una hora.',
          correct: false,
        },
        {
          id: 'kids-batch',
          label: 'AWS Batch',
          definition:
            'Servicio totalmente administrado que ejecuta cargas de cómputo por lotes de cualquier escala y aprovisiona los recursos según los trabajos enviados.',
          explanation:
            'Batch gestiona la cola de simulaciones, aprovisiona el cómputo automáticamente y puede usar instancias EC2 Spot, sin instalar software de procesamiento por lotes.',
          correct: true,
        },
        {
          id: 'kids-lightsail-sims',
          label: 'Una instancia de Amazon Lightsail más grande',
          definition: 'Servidor privado virtual de Lightsail con precio mensual predecible según su tamaño.',
          explanation:
            'Una sola instancia más grande repite el problema de la computadora vieja: no administra una cola de cientos de trabajos ni aprovisiona capacidad según la carga.',
          correct: false,
        },
        {
          id: 'kids-beanstalk-sims',
          label: 'AWS Elastic Beanstalk',
          definition: 'Servicio para desplegar y escalar aplicaciones web a partir de su código.',
          explanation:
            'Elastic Beanstalk despliega aplicaciones web; no procesa cientos de trabajos que esperan en una cola.',
          correct: false,
        },
      ],
    },
    {
      id: 'kids-grow',
      prompt:
        'Si todo sale bien, el próximo año abrimos sedes en otras ciudades y quiero conectar el proyecto de Lightsail con otros servicios de AWS. ¿Cómo lo hago?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-outpost-office',
          label: 'Instalando un Outpost en cada sede',
          definition: 'Capacidad de AWS instalada en las instalaciones del cliente, en formato de racks o de servidores.',
          explanation:
            'Outposts lleva infraestructura de AWS a un sitio propio; no es el mecanismo para conectar Lightsail con otros servicios.',
          correct: false,
        },
        {
          id: 'kids-batch-job',
          label: 'Convirtiendo el sitio en un trabajo de AWS Batch',
          definition: 'Un trabajo por lotes es una tarea que se envía a una cola y se procesa sin interacción del usuario.',
          explanation:
            'Un sitio web que las familias visitan no es un trabajo por lotes; Batch no conecta Lightsail con otros servicios.',
          correct: false,
        },
        {
          id: 'kids-local-zones-grow',
          label: 'Mudando el sitio a una Local Zone',
          definition: 'Ubicaciones de infraestructura de AWS cerca de grandes ciudades, para menor latencia hacia esos usuarios.',
          explanation:
            'Una Local Zone acerca recursos a una ciudad, pero no es la forma de conectar un proyecto de Lightsail con otros servicios de AWS.',
          correct: false,
        },
        {
          id: 'kids-vpc-peering',
          label: 'Mediante VPC peering',
          definition: 'Conexión de red privada entre dos redes virtuales para que sus recursos se comuniquen.',
          explanation:
            'Con VPC peering, el proyecto de Lightsail de Robótica Kids se comunica en forma privada con recursos de otros servicios de AWS a medida que crece.',
          correct: true,
        },
      ],
    },
  ],
};
