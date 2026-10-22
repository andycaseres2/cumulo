import type { Mission } from '../../../domain/Mission';

/**
 * Cloud Academy: a training institute in Quito that teaches cloud while its own servers sit in a basement whose lease ends soon.
 * Practices the 7 Rs (retire, rehost, repurchase) and AWS Application Migration Service for automated rehosting.
 */
export const migrationStrategies1: Mission = {
  id: 'migration-strategies-1',
  track: 'downtown',
  buildingId: 'academy',
  topicSlug: 'migration-strategies',
  title: 'El sótano de la academia',
  client: { name: 'Fernanda Quispe', role: 'Coordinadora de sistemas de Cloud Academy' },
  intro: [
    'Hola, pasa. Soy Fernanda Quispe, coordinadora de sistemas de Cloud Academy. Desde Quito damos cursos de tecnología a miles de estudiantes de todo Ecuador, presenciales y en línea.',
    'Te confieso algo vergonzoso: enseñamos nube, pero todos nuestros sistemas corren en cuarenta servidores en el sótano de un edificio que alquilamos.',
    'El contrato de ese sótano vence en cuatro meses y el dueño no lo va a renovar. Tenemos de todo ahí abajo: la plataforma de cursos, el correo, sistemas viejos que ya nadie recuerda...',
    'Si no salimos a tiempo, los estudiantes se quedan sin clases a mitad del semestre. ¿Me ayudas a decidir qué hacemos con cada sistema?',
  ],
  outro: {
    passed: [
      '¡Esto ya parece un plan de migración de verdad! Apagamos lo que nadie usa, movemos rápido el resto y dejamos de mantener un correo propio.',
      'Por fin vamos a practicar lo que enseñamos. Gracias: cuando quieras, tienes un lugar como profesor invitado en Cloud Academy.',
    ],
    failed: [
      'Mmm... con estas decisiones no salimos del sótano en cuatro meses. Me quedan dudas sobre qué estrategia aplicar a cada sistema.',
      'Repasa la teoría de los 7 Rs y los servicios de migración, y vuelve cuando quieras. Te espero aquí arriba, no en el sótano.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'forgotten-system',
      prompt:
        'Empecemos por lo fácil. Encontramos un sistema de inscripciones antiguo que reemplazamos hace dos años. Revisamos los registros y no ha recibido ninguna conexión entrante en los últimos 90 días. ¿Qué estrategia le aplico?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'retain-old',
          label: 'Retain (retener)',
          definition:
            'Estrategia de migración que mantiene la aplicación en el entorno de origen por ahora, por ejemplo por dependencias pendientes o residencia de datos.',
          explanation:
            'Retener tiene sentido cuando la aplicación todavía se necesita y hay un motivo para no moverla. Este sistema ya no aporta valor, y el sótano se cierra.',
          correct: false,
        },
        {
          id: 'rehost-old',
          label: 'Rehost (lift and shift)',
          definition:
            'Estrategia de migración que mueve la aplicación a AWS sin cambios, por ejemplo a instancias de Amazon EC2.',
          explanation:
            'Mover tal cual un sistema que nadie usa solo traslada el problema a la nube y lo sigue pagando. Lo que corresponde es retirarlo.',
          correct: false,
        },
        {
          id: 'retire-old',
          label: 'Retire (retirar)',
          definition:
            'Estrategia de migración que apaga o archiva las aplicaciones que ya no aportan valor al negocio.',
          explanation:
            'Una aplicación sin conexiones entrantes en los últimos 90 días es el ejemplo típico de retire: se archiva lo necesario, se apaga y no se migra.',
          correct: true,
        },
        {
          id: 'repurchase-old',
          label: 'Repurchase (drop and shop)',
          definition:
            'Estrategia de migración que reemplaza la aplicación por otro producto o versión, normalmente un servicio SaaS.',
          explanation:
            'Comprar un reemplazo para un sistema que ya fue reemplazado y que nadie usa sería gastar de más. Este sistema simplemente se retira.',
          correct: false,
        },
      ],
    },
    {
      id: 'move-fast',
      prompt:
        'Ahora lo urgente: la plataforma de cursos y otros treinta servidores tienen que salir del sótano antes de que venza el contrato. No hay tiempo para rediseñar nada; queremos llevarlos a AWS tal como están y mejorarlos después. ¿Qué estrategia usamos?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'rehost-fast',
          label: 'Rehost (lift and shift)',
          definition:
            'Estrategia de migración que mueve la aplicación a AWS sin cambios, por ejemplo a instancias de Amazon EC2.',
          explanation:
            'Con plazo corto y muchos servidores, mover sin cambios es lo indicado. Para migraciones grandes, AWS recomienda hacer rehost, relocate o replatform primero y modernizar después.',
          correct: true,
        },
        {
          id: 'refactor-fast',
          label: 'Refactor / re-architect',
          definition:
            'Estrategia de migración que rediseña la aplicación para aprovechar funciones nativas de la nube, como dividir un monolito en microservicios.',
          explanation:
            'Refactor es la estrategia más compleja y costosa. Con cuatro meses de plazo y sin tiempo para rediseñar, es justo lo que hay que evitar ahora.',
          correct: false,
        },
        {
          id: 'retain-fast',
          label: 'Retain (retener)',
          definition:
            'Estrategia de migración que mantiene la aplicación en el entorno de origen por ahora, por ejemplo por dependencias pendientes o residencia de datos.',
          explanation:
            'Retener deja los sistemas donde están, y el sótano deja de estar disponible en cuatro meses. La academia necesita moverlos.',
          correct: false,
        },
        {
          id: 'repurchase-fast',
          label: 'Repurchase (drop and shop)',
          definition:
            'Estrategia de migración que reemplaza la aplicación por otro producto o versión, normalmente un servicio SaaS.',
          explanation:
            'Cambiar treinta servidores por productos nuevos obliga a elegir, configurar y aprender cada uno. Fernanda quiere llevar sus sistemas tal como están.',
          correct: false,
        },
      ],
    },
    {
      id: 'rehost-tool',
      prompt:
        'Perfecto, hacemos rehost. Pero somos solo tres en sistemas. ¿Qué servicio de AWS replica nuestros servidores a AWS de forma automática y continua, para que el corte final dure minutos y no un fin de semana?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'migration-hub',
          label: 'AWS Migration Hub',
          definition:
            'Lugar único para descubrir servidores, planificar y dar seguimiento al estado de cada migración, sin importar la herramienta usada.',
          explanation:
            'Migration Hub da seguimiento a las migraciones, pero no replica los servidores. Esa ejecución la hace AWS Application Migration Service.',
          correct: false,
        },
        {
          id: 'migration-evaluator',
          label: 'Migration Evaluator',
          definition:
            'Servicio que construye un caso de negocio con datos: inventaría el entorno on-premises, detecta servidores sobredimensionados y compara costos.',
          explanation:
            'Migration Evaluator ayuda a decidir y justificar la migración con números. No mueve ni replica servidores.',
          correct: false,
        },
        {
          id: 'sct',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'Herramienta que convierte el esquema de una base de datos de un motor a otro, por ejemplo de Oracle a Aurora PostgreSQL.',
          explanation:
            'SCT convierte esquemas de bases de datos cuando cambia el motor. No replica servidores completos para hacer rehost.',
          correct: false,
        },
        {
          id: 'application-migration-service',
          label: 'AWS Application Migration Service',
          definition:
            'Servicio que replica servidores físicos, virtuales o de otras nubes a AWS con replicación continua a nivel de bloque; hoy su documentación lo llama AWS Transform MGN.',
          explanation:
            'Es el servicio de rehost automatizado: replica continuamente los servidores del sótano a AWS y permite cortes de minutos, ideal para un equipo pequeño con poco tiempo.',
          correct: true,
        },
      ],
    },
    {
      id: 'email-server',
      prompt:
        'Último sistema: un servidor de correo que instalamos nosotros hace años y que nos da problemas cada semana. Ya no queremos mantenerlo; preferimos cambiarlo por un servicio de correo SaaS y olvidarnos del servidor. ¿Qué estrategia es esa?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'replatform-email',
          label: 'Replatform (lift, tinker and shift)',
          definition:
            'Estrategia de migración que mueve la aplicación con algunas optimizaciones, sin cambiar su arquitectura central.',
          explanation:
            'Es la trampa típica: replatform conserva la misma aplicación con ajustes. Fernanda quiere cambiar de producto, y eso es repurchase.',
          correct: false,
        },
        {
          id: 'repurchase-email',
          label: 'Repurchase (drop and shop)',
          definition:
            'Estrategia de migración que reemplaza la aplicación por otro producto o versión, normalmente un servicio SaaS.',
          explanation:
            'Dejar el servidor de correo propio y pasar a un producto SaaS es exactamente repurchase: se abandona la aplicación actual y se adopta otra.',
          correct: true,
        },
        {
          id: 'relocate-email',
          label: 'Relocate (reubicar)',
          definition:
            'Estrategia de migración que transfiere servidores de una plataforma on-premises a la versión en la nube de esa plataforma, o mueve recursos a otra VPC, Región o cuenta.',
          explanation:
            'Relocate mueve la misma aplicación sin cambiar su arquitectura. La academia quiere dejar de tener su propio servidor de correo.',
          correct: false,
        },
        {
          id: 'refactor-email',
          label: 'Refactor / re-architect',
          definition:
            'Estrategia de migración que rediseña la aplicación para aprovechar funciones nativas de la nube, como dividir un monolito en microservicios.',
          explanation:
            'Rediseñar un servidor de correo propio sería el camino más complejo y costoso, y aun así seguirían manteniéndolo. Lo que buscan es reemplazarlo por SaaS.',
          correct: false,
        },
      ],
    },
  ],
};
