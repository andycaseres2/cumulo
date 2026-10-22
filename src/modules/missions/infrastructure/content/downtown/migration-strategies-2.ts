import type { Mission } from '../../../domain/Mission';

/**
 * Logística Pacífico: a port logistics company in Valparaíso that must justify its migration and move its databases without stopping the port.
 * Practices Migration Evaluator, AWS SCT, AWS DMS continuous replication and the replatform strategy.
 */
export const migrationStrategies2: Mission = {
  id: 'migration-strategies-2',
  track: 'downtown',
  buildingId: 'logistics',
  topicSlug: 'migration-strategies',
  title: 'Mudanza sin parar el puerto',
  client: { name: 'Camila Fuentes', role: 'Gerenta de tecnología de Logística Pacífico' },
  intro: [
    'Qué bueno que llegaste. Soy Camila Fuentes, gerenta de tecnología de Logística Pacífico. Coordinamos la carga y descarga de contenedores en el puerto de Valparaíso, las veinticuatro horas.',
    'Nuestro centro de datos ya está viejo y el directorio está dividido: unos quieren migrar a AWS y otros dicen que saldrá más caro. Nadie tiene números, solo opiniones.',
    'Además, el corazón de la operación es una base de datos Oracle con el registro de cada contenedor. Si se detiene, los camiones se quedan en fila en la entrada del puerto.',
    'Necesito convencer al directorio y planificar la mudanza de los datos sin parar el puerto ni un minuto. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      '¡Excelente! El directorio aprobó la migración con números en la mano, y ya sé cómo convertir el esquema de Oracle y mantener los datos sincronizados hasta el corte.',
      'El sistema de seguimiento también tiene su camino claro. Gracias: cuando pases por Valparaíso, te muestro el puerto desde la grúa más alta.',
    ],
    failed: [
      'Uf... con estas respuestas no convenzo al directorio y arriesgo dejar los camiones en fila. Hay decisiones que me preocupan.',
      'Repasa la teoría de migración, sobre todo los servicios para bases de datos, y vuelve cuando quieras. El puerto sigue funcionando y te espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'business-case',
      prompt:
        'Primero, el directorio. Necesito un caso de negocio con datos reales: un inventario de nuestros servidores, cuáles están sobredimensionados y cuánto costaría en AWS, comparando también si reutilizamos nuestras licencias. ¿Qué uso?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'migration-hub-case',
          label: 'AWS Migration Hub',
          definition:
            'Lugar único para descubrir servidores, planificar y dar seguimiento al estado de cada migración, sin importar la herramienta usada.',
          explanation:
            'Migration Hub sirve para seguir el avance de las migraciones. El caso de negocio con costos y licencias lo construye Migration Evaluator.',
          correct: false,
        },
        {
          id: 'migration-evaluator-case',
          label: 'Migration Evaluator',
          definition:
            'Servicio que construye un caso de negocio con datos: inventaría el entorno on-premises, detecta servidores sobredimensionados y compara costos.',
          explanation:
            'Es justo lo que pide el directorio: inventario, servidores sobredimensionados y una comparación de costos que incluye reutilizar licencias frente a licencias incluidas.',
          correct: true,
        },
        {
          id: 'mgn-case',
          label: 'AWS Application Migration Service',
          definition:
            'Servicio que replica servidores físicos, virtuales o de otras nubes a AWS con replicación continua a nivel de bloque.',
          explanation:
            'Application Migration Service ejecuta el rehost de servidores. Sirve cuando ya se decidió migrar, no para justificar la decisión ante el directorio.',
          correct: false,
        },
        {
          id: 'dms-case',
          label: 'AWS Database Migration Service (AWS DMS)',
          definition:
            'Servicio que migra bases de datos y otros almacenes de datos, con migraciones únicas o replicación continua de cambios.',
          explanation:
            'DMS mueve los datos durante la migración. No inventaría servidores ni arma un caso de negocio con costos.',
          correct: false,
        },
      ],
    },
    {
      id: 'schema-conversion',
      prompt:
        '¡Aprobado! Decidimos dejar Oracle y pasar el registro de contenedores a Amazon Aurora PostgreSQL. Las tablas, vistas y procedimientos están escritos para Oracle. ¿Qué herramienta convierte ese esquema al nuevo motor?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3', '3.4'],
      options: [
        {
          id: 'migration-evaluator-schema',
          label: 'Migration Evaluator',
          definition:
            'Servicio que construye un caso de negocio con datos: inventaría el entorno on-premises, detecta servidores sobredimensionados y compara costos.',
          explanation:
            'Migration Evaluator ya hizo su trabajo con el caso de negocio. No convierte esquemas de bases de datos.',
          correct: false,
        },
        {
          id: 'mgn-schema',
          label: 'AWS Application Migration Service',
          definition:
            'Servicio que replica servidores físicos, virtuales o de otras nubes a AWS con replicación continua a nivel de bloque.',
          explanation:
            'Application Migration Service copia servidores tal como están. Al cambiar de Oracle a PostgreSQL, el esquema tiene que convertirse.',
          correct: false,
        },
        {
          id: 'migration-hub-schema',
          label: 'AWS Migration Hub',
          definition:
            'Lugar único para descubrir servidores, planificar y dar seguimiento al estado de cada migración, sin importar la herramienta usada.',
          explanation:
            'Migration Hub da seguimiento al avance, pero no convierte tablas, vistas ni procedimientos de un motor a otro.',
          correct: false,
        },
        {
          id: 'sct-schema',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'Herramienta que convierte el esquema de una base de datos de un motor a otro, por ejemplo de Oracle a Aurora PostgreSQL.',
          explanation:
            'Es una migración heterogénea: cambia el motor. SCT convierte tablas, vistas y código de base de datos, y da guía para lo que no pueda convertir automáticamente.',
          correct: true,
        },
      ],
    },
    {
      id: 'continuous-sync',
      prompt:
        'Con el esquema listo, falta lo más delicado: mover los datos. El puerto no puede detenerse, así que la base Oracle tiene que seguir recibiendo registros mientras copiamos todo, y el destino debe quedar sincronizado hasta el corte. ¿Qué servicio usamos?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3', '3.4'],
      options: [
        {
          id: 'dms-sync',
          label: 'AWS Database Migration Service (AWS DMS)',
          definition:
            'Servicio que migra bases de datos y otros almacenes de datos, con migraciones únicas o replicación continua de cambios.',
          explanation:
            'DMS replica los cambios continuos para mantener sincronizados el origen Oracle y el destino Aurora PostgreSQL hasta el corte, mientras el puerto sigue operando.',
          correct: true,
        },
        {
          id: 'sct-sync',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'Herramienta que convierte el esquema de una base de datos de un motor a otro, por ejemplo de Oracle a Aurora PostgreSQL.',
          explanation:
            'Es la trampa de confundir SCT con DMS: SCT convierte el esquema, pero mover y replicar los datos es trabajo de DMS.',
          correct: false,
        },
        {
          id: 'migration-hub-sync',
          label: 'AWS Migration Hub',
          definition:
            'Lugar único para descubrir servidores, planificar y dar seguimiento al estado de cada migración, sin importar la herramienta usada.',
          explanation:
            'Migration Hub muestra el estado de las migraciones, pero no copia ni sincroniza los datos de la base.',
          correct: false,
        },
        {
          id: 'migration-evaluator-sync',
          label: 'Migration Evaluator',
          definition:
            'Servicio que construye un caso de negocio con datos: inventaría el entorno on-premises, detecta servidores sobredimensionados y compara costos.',
          explanation:
            'Migration Evaluator sirve para decidir y justificar la migración. No mueve datos entre bases.',
          correct: false,
        },
      ],
    },
    {
      id: 'tracking-database',
      prompt:
        'Queda el sistema de seguimiento de camiones, que usa Microsoft SQL Server en un servidor propio. No queremos rediseñar la aplicación, pero sí dejar de parchar y respaldar la base nosotros, pasándola a Amazon RDS for SQL Server. ¿Qué estrategia es esa?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'rehost-tracking',
          label: 'Rehost (lift and shift)',
          definition:
            'Estrategia de migración que mueve la aplicación a AWS sin cambios, por ejemplo a instancias de Amazon EC2.',
          explanation:
            'Con rehost el servidor con SQL Server se movería tal cual a EC2, y el equipo seguiría administrando la base. Pasar a Amazon RDS es una optimización en el camino.',
          correct: false,
        },
        {
          id: 'refactor-tracking',
          label: 'Refactor / re-architect',
          definition:
            'Estrategia de migración que rediseña la aplicación para aprovechar funciones nativas de la nube, como dividir un monolito en microservicios.',
          explanation:
            'Refactor implica rediseñar la aplicación, y Camila dijo que no quiere cambiar su arquitectura. Además es la estrategia más compleja y costosa.',
          correct: false,
        },
        {
          id: 'replatform-tracking',
          label: 'Replatform (lift, tinker and shift)',
          definition:
            'Estrategia de migración que mueve la aplicación con algunas optimizaciones, sin cambiar su arquitectura central.',
          explanation:
            'Pasar una base Microsoft SQL Server a Amazon RDS for SQL Server es el ejemplo típico de replatform: misma aplicación, con la ventaja de una base de datos administrada.',
          correct: true,
        },
        {
          id: 'repurchase-tracking',
          label: 'Repurchase (drop and shop)',
          definition:
            'Estrategia de migración que reemplaza la aplicación por otro producto o versión, normalmente un servicio SaaS.',
          explanation:
            'Repurchase cambia el sistema por otro producto. Logística Pacífico quiere conservar su aplicación de seguimiento.',
          correct: false,
        },
      ],
    },
  ],
};
