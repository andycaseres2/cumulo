import type { Mission } from '../../domain/Mission';

/**
 * StreamLlama: a Peruvian streaming startup whose videos load slowly outside Lima.
 * Practices Amazon CloudFront, edge locations, Amazon S3, S3 storage classes with S3 Lifecycle and Region selection.
 */
export const streamingGlobal: Mission = {
  id: 'streaming-global',
  track: 'tecnologico',
  topicSlug: 'dns-y-entrega-de-contenido',
  buildingId: 'streaming',
  title: 'Videos lentos fuera de Lima',
  client: { name: 'Diego Paredes', role: 'CTO de StreamLlama' },
  intro: [
    '¡Hola, qué bueno verte! Soy Diego Paredes, CTO de StreamLlama. Somos una startup peruana de streaming: series cortas, documentales y conciertos de artistas latinoamericanos.',
    'Todos nuestros servidores y todos nuestros videos están en un solo lugar, aquí en Lima. Mientras casi todo el público era peruano, funcionaba bastante bien.',
    'Pero ahora tenemos cada vez más usuarios en Ciudad de México y en Bogotá, y se quejan de que los videos tardan muchísimo en empezar. Algunos cierran la app antes de ver el primer minuto.',
    'Queremos crecer en toda Latinoamérica, y nuestra biblioteca de videos crece cada semana. Necesito que el video llegue rápido a todos lados y que guardarlo no nos cueste una fortuna. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      '¡Excelente trabajo! Con CloudFront en las ubicaciones de borde, los videos en S3 y una política de ciclo de vida, por fin tenemos un plan para toda Latinoamérica.',
      'Nuestros usuarios en México y Bogotá van a notar la diferencia desde el primer clic. Muchas gracias. ¡Te debo una suscripción de por vida!',
    ],
    failed: [
      'Mmm... no estoy seguro de que con este plan los videos lleguen rápido a México y Bogotá. Hay decisiones que todavía no me cierran.',
      'Repasa la teoría con calma y vuelve cuando quieras. Aquí te espero, con palomitas listas.',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'content-delivery',
      prompt:
        'Vamos al problema principal. Nuestros espectadores en Ciudad de México y Bogotá están lejos de Lima. ¿Qué servicio guarda copias de los videos cerca de ellos para que empiecen a reproducirse con baja latencia?',
      topicSlug: 'dns-y-entrega-de-contenido',
      examTasks: ['3.5', '3.2'],
      options: [
        {
          id: 'route-53',
          label: 'Amazon Route 53',
          definition:
            'Servicio DNS de AWS que registra dominios, convierte nombres en direcciones IP, enruta el tráfico según políticas y hace health checks.',
          explanation:
            'Route 53 decide a dónde enviar al usuario cuando escribe el dominio, pero no guarda copias de los videos. Si el video sigue en Lima, el espectador de Bogotá sigue esperando.',
          correct: false,
        },
        {
          id: 'cloudfront',
          label: 'Amazon CloudFront',
          definition:
            'Red de entrega de contenido (CDN) de AWS que guarda en caché contenido estático y dinámico, como imágenes y video, en edge locations de todo el mundo.',
          explanation:
            'Correcto. La solicitud de cada espectador va a la edge location con menor latencia; si el video ya está en caché ahí, se entrega de inmediato. Además se reduce la carga sobre el origen.',
          correct: true,
        },
        {
          id: 'global-accelerator',
          label: 'AWS Global Accelerator',
          definition:
            'Servicio que entrega direcciones IP estáticas anycast y lleva el tráfico TCP/UDP por la red global de AWS hasta el endpoint saludable más adecuado.',
          explanation:
            'Global Accelerator también usa las edge locations, pero no cachea contenido. Es ideal para juegos UDP o cuando piden IP estáticas; para servir videos en caché, la respuesta es CloudFront.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition:
            'Conexión física dedicada entre la red interna de una empresa y AWS, sin pasar por proveedores de internet en la ruta de red.',
          explanation:
            'Direct Connect conecta la oficina o el centro de datos de StreamLlama con AWS, no a los espectadores con los videos. Además, requiere instalación física y no acerca el contenido a nadie.',
          correct: false,
        },
      ],
    },
    {
      id: 'edge-locations',
      prompt:
        'Me hablaste de edge locations, pero en la reunión de directorio me van a preguntar qué son. ¿Son lo mismo que una Región o una Zona de Disponibilidad?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'availability-zones',
          label: 'Son las Availability Zones de una Región',
          definition:
            'Una Availability Zone es uno o más centros de datos con energía, redes y conectividad redundantes dentro de una Región.',
          explanation:
            'Las Availability Zones sirven para lograr alta disponibilidad dentro de una Región. Las edge locations son otra cosa: puntos de presencia separados de las Regiones para entregar contenido.',
          correct: false,
        },
        {
          id: 'small-regions',
          label: 'Son Regiones pequeñas donde corre toda la aplicación',
          definition: 'La idea de que en una edge location se ejecutan los servidores y las bases de datos completas de la aplicación.',
          explanation:
            'Es una trampa típica del examen. La función principal de las edge locations es entregar contenido en caché con CloudFront, no ejecutar toda la aplicación de StreamLlama.',
          correct: false,
        },
        {
          id: 'local-zones',
          label: 'Son Local Zones: extensiones de una Región',
          definition:
            'AWS Local Zones colocan cómputo, almacenamiento, bases de datos y otros servicios seleccionados cerca de grandes centros de población, como extensión de una Región.',
          explanation:
            'Las Local Zones existen, pero son otro componente: sirven para aplicaciones que necesitan latencia muy baja. Las edge locations que usa CloudFront no son extensiones de una Región.',
          correct: false,
        },
        {
          id: 'edge-network',
          label: 'Son centros de datos separados de las Regiones, cerca de los usuarios',
          definition:
            'Las edge locations son centros de datos distribuidos por el mundo, separados de las Regiones, que forman la red de puntos de presencia que usa Amazon CloudFront.',
          explanation:
            'Exacto. No son Regiones ni Zonas de Disponibilidad: son puntos de presencia donde CloudFront guarda copias en caché. Así el espectador recibe el video con menor latencia y el origen recibe menos carga.',
          correct: true,
        },
      ],
    },
    {
      id: 'video-storage',
      prompt:
        'CloudFront necesita un origen con la versión definitiva de cada video. Tenemos miles de archivos y cada semana subimos más. ¿Dónde los guardamos en AWS?',
      topicSlug: 'almacenamiento-s3-ebs-efs',
      examTasks: ['3.6'],
      options: [
        {
          id: 's3',
          label: 'Amazon S3',
          definition:
            'Servicio de almacenamiento de objetos: guarda archivos con sus metadatos en buckets y se accede a ellos por API y URL.',
          explanation:
            'Correcto. S3 es ideal para archivos multimedia que se descargan por internet, se paga solo por lo que se usa sin reservar capacidad y puede ser el origen de una distribución de CloudFront.',
          correct: true,
        },
        {
          id: 'ebs',
          label: 'Amazon EBS',
          definition:
            'Volúmenes de almacenamiento en bloques que se adjuntan a una instancia EC2 y funcionan como su disco duro.',
          explanation:
            'EBS es el disco de un servidor y vive en una sola Availability Zone. Además, tú defines el tamaño del volumen: no es la opción natural para una biblioteca de videos que crece sin parar.',
          correct: false,
        },
        {
          id: 'efs',
          label: 'Amazon EFS',
          definition:
            'Almacenamiento de archivos elástico por NFS que muchas instancias pueden montar y compartir al mismo tiempo.',
          explanation:
            'EFS brilla cuando varios servidores comparten una carpeta, como la de configuraciones. Para videos que el público descarga por internet, la palabra clave es "objetos": S3.',
          correct: false,
        },
        {
          id: 'instance-store',
          label: 'Instance store',
          definition:
            'Almacenamiento en bloques temporal, en discos conectados físicamente al servidor host donde corre la instancia EC2.',
          explanation:
            'Los datos del instance store se pierden si la instancia se detiene o termina. Guardar ahí toda la biblioteca de StreamLlama sería arriesgar los videos.',
          correct: false,
        },
      ],
    },
    {
      id: 'old-videos',
      prompt:
        'Los estrenos se ven muchísimo el primer mes; después, cada video se ve más o menos una vez al mes. Pero cuando alguien le da play, tiene que empezar al instante. Es nuestra única copia. ¿Cómo bajamos el costo sin mover archivos a mano?',
      topicSlug: 'clases-de-almacenamiento-s3',
      examTasks: ['3.6'],
      options: [
        {
          id: 'one-zone-ia',
          label: 'Moverlos a S3 One Zone-IA',
          definition:
            'Clase de S3 para acceso poco frecuente que guarda los datos en una sola Availability Zone, con duración mínima de 30 días.',
          explanation:
            'One Zone-IA no resiste la pérdida física de su única AZ, y AWS la recomienda solo para datos que se pueden recrear. Para la única copia de los videos, no conviene.',
          correct: false,
        },
        {
          id: 'deep-archive',
          label: 'Moverlos a S3 Glacier Deep Archive',
          definition:
            'La opción de almacenamiento de menor costo de AWS, pensada para datos que se consultan menos de una vez al año y se recuperan en horas.',
          explanation:
            'Es la más barata, pero hay que restaurar los objetos y eso tarda horas. Un espectador no va a esperar hasta mañana para ver un video que pidió hoy.',
          correct: false,
        },
        {
          id: 'lifecycle-standard-ia',
          label: 'Una política de S3 Lifecycle que los pase a S3 Standard-IA a los 30 días',
          definition:
            'Regla de S3 Lifecycle con una transition action que mueve automáticamente los objetos a S3 Standard-IA, la clase para acceso poco frecuente en varias AZ.',
          explanation:
            'Correcto. El patrón es predecible, así que una política de ciclo de vida mueve los videos sola. Standard-IA es más barata para guardar, recupera en milisegundos y guarda los datos en tres o más AZ; a cambio cobra por GB recuperado.',
          correct: true,
        },
        {
          id: 'manual-move',
          label: 'Revisar cada mes qué videos nadie ve y moverlos a mano',
          definition:
            'Proceso manual en el que una persona cambia la clase de almacenamiento de los objetos uno por uno.',
          explanation:
            'Funciona, pero es lento y propenso a errores. Cuando el patrón de acceso es predecible, la respuesta del examen es una política de ciclo de vida que lo haga automáticamente.',
          correct: false,
        },
      ],
    },
    {
      id: 'new-region',
      prompt:
        'Último tema: vamos a lanzar un servicio nuevo pensado sobre todo para el público de México. Nuestra abogada confirmó que ninguna ley nos obliga a guardar los datos en un país específico. ¿Cómo elegimos la Región de AWS?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'cheapest',
          label: 'La Región más barata, sin importar dónde esté',
          definition: 'Elegir la Región solo por el precio, porque los precios de AWS pueden variar entre Regiones.',
          explanation:
            'El precio es uno de los factores, pero no el único. Una Región barata y lejana puede darles a los usuarios de México la misma espera que tienen hoy.',
          correct: false,
        },
        {
          id: 'closest-region',
          label: 'Una Región cercana a sus usuarios, que tenga los servicios que necesitan y a buen precio',
          definition:
            'Criterios para elegir Región: cumplimiento y residencia de datos, cercanía a los usuarios, servicios disponibles y precio.',
          explanation:
            'Correcto. Sin una regulación que pese más, la cercanía suele dar menor latencia. Además, hay que confirmar que los servicios necesarios estén disponibles en esa Región y comparar precios.',
          correct: true,
        },
        {
          id: 'any-region',
          label: 'Cualquier Región: los datos se copian solos a todas',
          definition: 'La idea de que AWS replica automáticamente los recursos y datos de una Región en todas las demás.',
          explanation:
            'Los recursos y datos creados en una Región no existen en otra a menos que tú los repliques o copies explícitamente. La elección sí importa.',
          correct: false,
        },
        {
          id: 'edge-location-launch',
          label: 'No usar una Región: desplegar el servicio en una edge location',
          definition: 'Ejecutar el servicio completo directamente en los puntos de presencia que usa Amazon CloudFront.',
          explanation:
            'Es una trampa típica del examen: las edge locations sirven para entregar contenido en caché con CloudFront, no para ejecutar toda la aplicación. CloudFront complementa la elección de Región, no la reemplaza.',
          correct: false,
        },
      ],
    },
  ],
};
