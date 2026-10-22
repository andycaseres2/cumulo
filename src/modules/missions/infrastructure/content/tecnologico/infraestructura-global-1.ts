import type { Mission } from '../../../domain/Mission';

/**
 * StreamLlama: the Lima streaming platform's live-events team, after a data center outage cut a festival broadcast.
 * Practices Availability Zones and high availability, multi-Region continuity and Region isolation of data.
 */
export const infraestructuraGlobal1: Mission = {
  id: 'infraestructura-global-1',
  track: 'tecnologico',
  topicSlug: 'infraestructura-global',
  buildingId: 'streaming',
  title: 'El festival no se corta',
  client: { name: 'Lucía Huamán', role: 'Líder de transmisiones en vivo de StreamLlama' },
  intro: [
    'Hola, soy Lucía Huamán y lidero las transmisiones en vivo de StreamLlama, aquí en Lima. Diego se ocupa de que los videos carguen rápido; yo, de que el en vivo nunca se corte.',
    'El sábado transmitíamos un festival de música para medio millón de personas. Un centro de datos se quedó sin energía y la señal se cayó cuarenta minutos.',
    'Todos nuestros servidores de transmisión estaban en el mismo lugar. Las redes sociales ardieron y dos patrocinadores ya preguntan si pueden confiar en nosotros.',
    'En un mes transmitimos la final del campeonato. Necesito entender cómo está organizada la infraestructura de AWS para que esto no se repita. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      '¡Eso es! Ahora la transmisión vive en varias Availability Zones y, para lo peor, tenemos un plan en otra Región con los datos replicados de verdad.',
      'Los patrocinadores firmaron para la final. Gracias: tendrás pase al palco de producción cuando quieras.',
    ],
    failed: [
      'Mmm... con estas decisiones la final podría cortarse igual que el festival.',
      'Repasa la teoría sobre Regiones y Availability Zones y vuelve pronto. La señal te espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'survive-datacenter',
      prompt:
        'Primero lo del sábado: queremos que la transmisión siga si un centro de datos se queda sin energía otra vez. Hoy todos los servidores están en una sola Availability Zone. ¿Qué hacemos?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'bigger-server',
          label: 'Cambiar a servidores más grandes en la misma Availability Zone',
          definition:
            'Aumentar la capacidad de los servidores existentes sin cambiar la ubicación donde se ejecutan.',
          explanation:
            'Un servidor más grande sigue dependiendo de la misma Availability Zone. Si esta falla, la transmisión se corta igual.',
          correct: false,
        },
        {
          id: 'multi-az',
          label: 'Repartir los servidores en varias Availability Zones de la Región',
          definition:
            'Despliegue de una aplicación en varias zonas aisladas de una misma Región, con el tráfico repartido entre ellas.',
          explanation:
            'Las Availability Zones no comparten puntos únicos de falla. Si una tiene un problema, los servidores de las otras siguen transmitiendo: eso es alta disponibilidad.',
          correct: true,
        },
        {
          id: 'stream-from-edge',
          label: 'Mover toda la aplicación de transmisión a las ubicaciones de borde',
          definition:
            'Puntos de presencia de la red de AWS que usa Amazon CloudFront para entregar contenido en caché cerca de los usuarios.',
          explanation:
            'Las ubicaciones de borde sirven principalmente para entregar contenido en caché con CloudFront, no para ejecutar toda la aplicación.',
          correct: false,
        },
        {
          id: 'second-server-same-az',
          label: 'Agregar un segundo servidor de respaldo en la misma Availability Zone',
          definition:
            'Duplicar un servidor dentro de la misma ubicación para tener una copia lista si el primero falla.',
          explanation:
            'Un respaldo en la misma Availability Zone protege si falla un servidor, pero no si toda esa zona se queda sin energía, que fue lo que pasó.',
          correct: false,
        },
      ],
    },
    {
      id: 'what-is-az',
      prompt:
        'En la reunión, un ingeniero dijo que una Availability Zone es "un edificio en una ciudad" y otro que es "un país". Quiero explicarlo bien a los patrocinadores. ¿Qué es una Availability Zone?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'az-country',
          label: 'Un país donde AWS tiene centros de datos',
          definition:
            'Descripción de una zona de AWS como la división política en la que se encuentran sus instalaciones.',
          explanation:
            'Una Availability Zone no es un país ni una ciudad: es parte de una Región, y una Región tiene varias.',
          correct: false,
        },
        {
          id: 'az-single-building',
          label: 'Siempre un único centro de datos',
          definition:
            'Descripción de una zona de AWS como un solo edificio con servidores.',
          explanation:
            'Es una trampa típica del examen: una Availability Zone puede estar formada por uno o más centros de datos.',
          correct: false,
        },
        {
          id: 'az-pop',
          label: 'Un punto de presencia de CloudFront para contenido en caché',
          definition:
            'Ubicación de la red de AWS, separada de las Regiones, desde la que se entrega contenido en caché.',
          explanation:
            'Eso describe una ubicación de borde, que está separada de las Regiones. Una Availability Zone está dentro de una Región.',
          correct: false,
        },
        {
          id: 'az-definition',
          label: 'Uno o más centros de datos con energía, redes y conectividad redundantes dentro de una Región',
          definition:
            'Componente de la infraestructura global de AWS formado por centros de datos discretos, con su propia energía, refrigeración y seguridad física.',
          explanation:
            'Esa es la definición. Las Availability Zones de una Región están separadas por una distancia significativa y conectadas con redes de baja latencia, por eso sirven para la alta disponibilidad.',
          correct: true,
        },
      ],
    },
    {
      id: 'lose-region',
      prompt:
        'Para la final, el área de riesgo va más allá: quiere que la transmisión siga aunque toda una Región de AWS quede fuera de servicio. ¿Qué enfoque responde a eso?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'multi-region',
          label: 'Desplegar en varias Regiones, por ejemplo con una estrategia activo/activo',
          definition:
            'Ejecutar la carga de trabajo en dos o más Regiones de AWS para que una pueda atender si otra falla.',
          explanation:
            'Las Regiones están aisladas entre sí. Para seguir operando si cae una Región completa se necesita otra Región, por ejemplo con activo/activo.',
          correct: true,
        },
        {
          id: 'more-azs-one-region',
          label: 'Usar todavía más Availability Zones de la misma Región',
          definition:
            'Aumentar el número de zonas aisladas que usa la aplicación dentro de una sola Región.',
          explanation:
            'Varias Availability Zones protegen contra la falla de un centro de datos, pero todas están dentro de la Región que podría caer.',
          correct: false,
        },
        {
          id: 'cloudfront-only',
          label: 'Entregar la señal con Amazon CloudFront',
          definition:
            'Red de entrega de contenido de AWS que dirige cada solicitud a la ubicación de borde con menor latencia.',
          explanation:
            'CloudFront reduce la latencia y la carga sobre el origen, pero no mantiene operando la aplicación si cae toda su Región.',
          correct: false,
        },
        {
          id: 'bigger-instances-region',
          label: 'Usar instancias más grandes en la Región actual',
          definition:
            'Dar más capacidad de cómputo a los servidores que ya corren en la misma Región.',
          explanation:
            'Instancias más grandes siguen dependiendo de la misma Región. Si esta queda fuera de servicio, la transmisión también.',
          correct: false,
        },
      ],
    },
    {
      id: 'replays-other-region',
      prompt:
        'Ya montamos la copia en la segunda Región, pero ahí no aparecen las repeticiones que guardamos en un bucket de Amazon S3 de la primera. El equipo pensaba que estarían. ¿Qué pasa?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'wait-auto-sync',
          label: 'Hay que esperar: los datos aparecen solos en todas las Regiones',
          definition:
            'Supuesto de que AWS sincroniza automáticamente los datos entre todas sus Regiones.',
          explanation:
            'Los recursos y datos creados en una Región no existen en otra: las Regiones están aisladas entre sí.',
          correct: false,
        },
        {
          id: 'edge-permanent',
          label: 'Están guardados de forma permanente en las ubicaciones de borde',
          definition:
            'Supuesto de que la red de borde de AWS almacena de forma definitiva el contenido que entrega.',
          explanation:
            'Las ubicaciones de borde guardan copias temporales en caché para CloudFront; no reemplazan los datos en otra Región.',
          correct: false,
        },
        {
          id: 'explicit-replication',
          label: 'No están ahí a menos que los repliquen o copien explícitamente',
          definition:
            'Supuesto de que los datos permanecen en su Región hasta que el cliente configura una réplica o una copia.',
          explanation:
            'Los datos no salen de una Región sin una acción explícita, como configurar la replicación o copiarlos con una función del servicio. El plan de la final debe incluirlo.',
          correct: true,
        },
        {
          id: 'nearest-region',
          label: 'Se replicaron solos a la Región más cercana a los usuarios',
          definition:
            'Supuesto de que AWS mueve los datos hacia la Región con menor latencia para la audiencia.',
          explanation:
            'Es una trampa típica: los datos no se replican solos entre Regiones a menos que tú lo configures.',
          correct: false,
        },
      ],
    },
  ],
};
