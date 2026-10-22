import type { Mission } from '../../../domain/Mission';

/**
 * Cóndor Arena: an online game studio in Santiago de Chile launching a real-time multiplayer game across the Americas.
 * Practices Amazon Route 53 (domains, health checks and latency routing), AWS Global Accelerator and Amazon API Gateway.
 */
export const dnsYEntregaDeContenido2: Mission = {
  id: 'dns-y-entrega-de-contenido-2',
  track: 'tecnologico',
  topicSlug: 'dns-y-entrega-de-contenido',
  buildingId: 'centro-datos',
  title: 'Partidas sin lag',
  client: { name: 'Renata Paz', role: 'Directora técnica de Cóndor Arena' },
  intro: [
    '¡Hola! Soy Renata Paz, directora técnica de Cóndor Arena, un estudio de videojuegos de Santiago de Chile. Nuestro equipo de operaciones trabaja aquí, en el Centro de Datos Andino.',
    'En tres meses lanzamos "Cóndores", un juego multijugador en tiempo real. Ya tenemos servidores de juego en dos Regiones de AWS: una en América del Sur y otra en América del Norte.',
    'Y aquí empiezan mis dudas: cómo encuentran los jugadores nuestro sitio, a qué Región se conecta cada uno, cómo hacemos que las partidas no tengan lag y cómo exponemos la API de la app compañera.',
    'Si el día del lanzamiento los jugadores sienten lag, nos destrozan en las reseñas. ¿Me ayudas a que todo llegue rápido a cada jugador?',
  ],
  outro: {
    passed: [
      '¡Eso es! Route 53 con health checks y routing por latencia, Global Accelerator para las partidas en UDP y API Gateway como puerta de entrada de la app.',
      'Ahora sí puedo mirar el contador del lanzamiento sin morderme las uñas. Gracias: tu nombre va a salir en los créditos del juego.',
    ],
    failed: [
      'Mmm... con este plan creo que los jugadores van a sentir lag. Y en este negocio eso no se perdona.',
      'Repasa la teoría de DNS y entrega de contenido y vuelve cuando quieras. Aquí te espero para la revancha.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'domain-and-health',
      prompt:
        'Primero, lo que ve el jugador: queremos comprar el dominio del juego, que al escribirlo lleve a nuestros servidores y que, si un servidor deja de responder, se detecte solo y el tráfico se desvíe a uno sano. ¿Qué servicio cubre todo eso?',
      topicSlug: 'dns-y-entrega-de-contenido',
      examTasks: ['3.5'],
      options: [
        {
          id: 'cloudfront',
          label: 'Amazon CloudFront',
          definition: 'Red de entrega de contenido (CDN) que guarda en caché contenido estático y dinámico en edge locations.',
          explanation:
            'CloudFront acerca contenido en caché a los usuarios, pero no registra dominios ni es el servicio DNS que decide a dónde enviar a cada jugador.',
          correct: false,
        },
        {
          id: 'route53',
          label: 'Amazon Route 53',
          definition:
            'Servicio DNS altamente disponible y escalable que registra dominios, enruta a los usuarios y hace health checks.',
          explanation:
            'Route 53 cubre las tres necesidades: registro de dominios, enrutamiento DNS y health checks que detectan recursos no saludables y desvían el tráfico lejos de ellos.',
          correct: true,
        },
        {
          id: 'api-gateway',
          label: 'Amazon API Gateway',
          definition: 'Servicio administrado para crear, publicar, monitorear y proteger APIs REST, HTTP y WebSocket.',
          explanation:
            'API Gateway administra APIs, no registra dominios ni resuelve nombres para llevar a los jugadores a los servidores.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition: 'Conexión física dedicada entre una red interna y una ubicación de Direct Connect.',
          explanation:
            'Direct Connect une la red de una empresa con AWS. No tiene que ver con dominios ni con cómo llegan los jugadores desde internet.',
          correct: false,
        },
      ],
    },
    {
      id: 'routing-policy',
      prompt:
        'Ahora, con servidores en dos Regiones: quiero que cada jugador vaya a la Región que le responda más rápido. Un jugador de Lima puede tener mejor tiempo de respuesta hacia una Región que hacia otra, aunque quede más lejos en el mapa. ¿Qué routing policy de Route 53 elijo?',
      topicSlug: 'dns-y-entrega-de-contenido',
      examTasks: ['3.5', '3.2'],
      options: [
        {
          id: 'geolocation',
          label: 'Geolocation',
          definition: 'Política de Route 53 que responde según la ubicación geográfica desde donde consulta el usuario.',
          explanation:
            'Confundir Geolocation con Latency es una trampa típica. Geolocation decide por la ubicación del usuario, por ejemplo para mostrar contenido por país, no por el tiempo de respuesta.',
          correct: false,
        },
        {
          id: 'weighted',
          label: 'Weighted',
          definition: 'Política de Route 53 que reparte el tráfico entre recursos según proporciones definidas.',
          explanation:
            'Weighted reparte por porcentajes, por ejemplo para probar una versión nueva. No envía a cada jugador a la Región con mejor tiempo de respuesta.',
          correct: false,
        },
        {
          id: 'latency',
          label: 'Latency',
          definition: 'Política de Route 53 para recursos en varias Regiones que envía al usuario a la de menor latencia.',
          explanation:
            'Con recursos en varias Regiones, la política Latency envía a cada jugador a la Región con menor latencia para él, sin importar cuál queda más cerca en el mapa.',
          correct: true,
        },
        {
          id: 'simple',
          label: 'Simple',
          definition: 'Política de Route 53 para cuando hay un solo recurso que atiende el dominio.',
          explanation:
            'Simple sirve cuando hay un solo recurso. Cóndor Arena tiene servidores en dos Regiones y quiere elegir entre ellas.',
          correct: false,
        },
      ],
    },
    {
      id: 'realtime-traffic',
      prompt:
        'Lo más delicado: las partidas usan UDP y cada milisegundo cuenta. Quiero que el tráfico entre a la red de AWS lo más cerca posible del jugador, viaje por la red global de AWS y, si una Región falla, pase rápido a la otra. ¿Qué servicio usamos?',
      topicSlug: 'dns-y-entrega-de-contenido',
      examTasks: ['3.5', '3.2'],
      options: [
        {
          id: 'global-accelerator',
          label: 'AWS Global Accelerator',
          definition:
            'Servicio que hace entrar el tráfico TCP o UDP a la red de AWS por la edge location más cercana y lo lleva por la red global de AWS hasta el endpoint saludable más adecuado.',
          explanation:
            'Los juegos con UDP son un caso típico de Global Accelerator: el tráfico viaja por la red global de AWS desde el borde, y si una Región falla, lo envía a un endpoint saludable de otra.',
          correct: true,
        },
        {
          id: 'cloudfront-game',
          label: 'Amazon CloudFront',
          definition: 'CDN que guarda copias de contenido HTTP y HTTPS en edge locations para entregarlo con baja latencia.',
          explanation:
            'Elegir CloudFront para un juego UDP es una trampa típica. CloudFront brilla con contenido HTTP en caché; las partidas en tiempo real no se cachean.',
          correct: false,
        },
        {
          id: 'route53-weighted',
          label: 'Una política Weighted de Amazon Route 53',
          definition: 'Política de enrutamiento DNS que reparte el tráfico entre recursos según proporciones definidas.',
          explanation:
            'Una política de DNS decide a qué recurso apuntar, pero no lleva los paquetes de la partida por la red global de AWS desde el borde.',
          correct: false,
        },
        {
          id: 'api-gateway-game',
          label: 'Amazon API Gateway con WebSocket',
          definition: 'Servicio administrado para crear y proteger APIs REST, HTTP y WebSocket, muy usado con AWS Lambda.',
          explanation:
            'API Gateway es la puerta de entrada de APIs. No acelera el tráfico UDP de las partidas por la red global de AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'companion-api',
      prompt:
        'Último tema: la app compañera del juego consulta estadísticas y rankings llamando a funciones de AWS Lambda. Necesitamos una puerta de entrada para esa API que controle el tráfico, verifique quién llama y nos deje publicar versiones nuevas. ¿Qué servicio usamos?',
      topicSlug: 'dns-y-entrega-de-contenido',
      examTasks: ['3.5'],
      options: [
        {
          id: 'global-accelerator-api',
          label: 'AWS Global Accelerator',
          definition: 'Servicio que acelera tráfico TCP y UDP con direcciones IP estáticas anycast y la red global de AWS.',
          explanation:
            'Global Accelerator acelera el tráfico de red hacia endpoints como balanceadores o instancias, pero no administra la autorización ni las versiones de una API.',
          correct: false,
        },
        {
          id: 'route53-api',
          label: 'Amazon Route 53',
          definition: 'Servicio DNS que registra dominios, enruta usuarios y hace health checks.',
          explanation:
            'Route 53 traduce nombres de dominio, pero no controla el tráfico de la API, no verifica quién llama ni versiona la API.',
          correct: false,
        },
        {
          id: 's3-api',
          label: 'Amazon S3',
          definition: 'Servicio de almacenamiento de objetos para guardar archivos de cualquier tipo en buckets.',
          explanation:
            'S3 guarda archivos y puede servir contenido estático, pero no es la puerta de entrada que invoca funciones Lambda con autorización y versiones.',
          correct: false,
        },
        {
          id: 'api-gateway',
          label: 'Amazon API Gateway',
          definition:
            'Servicio administrado para crear, publicar, mantener, monitorear y proteger APIs REST, HTTP y WebSocket a cualquier escala.',
          explanation:
            'API Gateway es la puerta de entrada para que las aplicaciones accedan a backends como Lambda: gestiona el tráfico, la autorización con IAM o Amazon Cognito, el monitoreo y el versionado.',
          correct: true,
        },
      ],
    },
  ],
};
