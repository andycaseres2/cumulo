import type { Mission } from '../../../domain/Mission';

/**
 * Telecom Andina: a telecom company in La Paz whose self-service portal is slow at peak hours and released by hand.
 * Practices CI/CD concepts, AWS CodePipeline, AWS X-Ray versus CloudWatch and CloudTrail, and AWS Amplify for a mobile frontend.
 */
export const developerAndFrontendTools2: Mission = {
  id: 'developer-and-frontend-tools-2',
  track: 'tech',
  topicSlug: 'developer-and-frontend-tools',
  buildingId: 'telecom',
  title: 'El portal que se arrastra',
  client: { name: 'Gabriel Mamani', role: 'Jefe de plataformas digitales de Telecom Andina' },
  intro: [
    'Buenas, adelante. Soy Gabriel Mamani, jefe de plataformas digitales de Telecom Andina. Desde La Paz damos internet y telefonía móvil a medio millón de clientes en Bolivia.',
    'Nuestro portal de autoservicio permite pagar facturas, recargar saldo y cambiar de plan. Por dentro son seis microservicios, y cada versión la publicamos a mano un viernes por la noche.',
    'A fin de mes, cuando todos pagan, el portal se arrastra y nadie sabe en qué microservicio se pierde el tiempo. Y las publicaciones manuales terminan mal más seguido de lo que me gustaría admitir.',
    'La gerencia quiere además una nueva app web para celulares antes de fin de año. Si no ordenamos cómo construimos y entregamos software, no llegamos. ¿Me das una mano?',
  ],
  outro: {
    passed: [
      'Esto cambia todo. Cada cambio pasa solo por compilación, pruebas y despliegue, y ya sabemos exactamente qué microservicio frena el portal.',
      'Y el equipo móvil publica sin pelear con servidores. Este fin de mes lo vamos a pasar tranquilos. ¡Gracias!',
    ],
    failed: [
      'Hmm... con estas decisiones creo que seguiríamos publicando a mano y adivinando dónde está la lentitud.',
      'Repasa la teoría de herramientas de desarrollo y frontend y vuelve. Aquí te esperamos con un api morado bien caliente.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ci-concept',
      prompt:
        'Primero quiero alinear al equipo con el vocabulario. La práctica de que cada vez que alguien sube código al repositorio se compile y se pruebe automáticamente, para detectar errores pronto, ¿cómo se llama?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'continuous-delivery',
          label: 'Entrega o despliegue continuo (CD)',
          definition:
            'Práctica en la que los cambios que pasan las pruebas avanzan automáticamente hacia los entornos de prueba y producción.',
          explanation:
            'La entrega continua se ocupa de llevar a los entornos lo que ya pasó las pruebas. Compilar y probar cada cambio al subirlo es la integración continua.',
          correct: false,
        },
        {
          id: 'distributed-tracing',
          label: 'Rastreo distribuido',
          definition:
            'Técnica que sigue el recorrido de una solicitud a través de los servicios de una aplicación para encontrar errores y latencia.',
          explanation:
            'El rastreo distribuido diagnostica solicitudes en funcionamiento, no compila ni prueba el código cuando alguien lo sube al repositorio.',
          correct: false,
        },
        {
          id: 'manual-release',
          label: 'Publicación manual programada',
          definition:
            'Proceso en el que una persona compila, prueba y sube los cambios en una fecha fija.',
          explanation:
            'Es justo lo que hacen hoy los viernes por la noche. Lo que describes ocurre de forma automática con cada cambio.',
          correct: false,
        },
        {
          id: 'continuous-integration',
          label: 'Integración continua (CI)',
          definition:
            'Práctica en la que cada cambio subido al repositorio se compila y se prueba automáticamente.',
          explanation:
            'Eso es la integración continua: compilar y probar automáticamente cada cambio para detectar los errores pronto, antes de que lleguen a los clientes.',
          correct: true,
        },
      ],
    },
    {
      id: 'release-pipeline',
      prompt:
        'Ahora quiero eliminar los viernes por la noche. Cada vez que hay un cambio en GitHub, debe pasar automáticamente por compilación, pruebas y despliegue a producción, según las etapas que definamos. ¿Qué servicio orquesta ese flujo?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'codebuild-pipeline',
          label: 'AWS CodeBuild',
          definition:
            'Servicio de compilación administrado que compila el código fuente, ejecuta pruebas y produce paquetes listos para desplegar.',
          explanation:
            'CodeBuild compila y prueba, pero es una etapa dentro del flujo. Para orquestar fuente, compilación, pruebas y despliegue, el servicio es CodePipeline.',
          correct: false,
        },
        {
          id: 'codepipeline-pipeline',
          label: 'AWS CodePipeline',
          definition:
            'Servicio de entrega continua totalmente administrado que automatiza las fases de compilación, prueba y despliegue cada vez que cambia el código.',
          explanation:
            'CodePipeline automatiza el pipeline de publicación completo según el modelo que definan, se integra con GitHub y usa CodeBuild como la etapa que compila y prueba.',
          correct: true,
        },
        {
          id: 'cli-pipeline',
          label: 'AWS CLI',
          definition:
            'Herramienta para interactuar con los servicios de AWS mediante comandos en la terminal.',
          explanation:
            'La CLI sirve para ejecutar comandos y scripts, pero no es un servicio de entrega continua que reaccione a cada cambio en GitHub con etapas definidas.',
          correct: false,
        },
        {
          id: 'cloudwatch-pipeline',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio que monitorea recursos y aplicaciones con métricas, logs, dashboards y alarmas.',
          explanation:
            'CloudWatch monitorea lo que ya está en producción. No compila, prueba ni despliega los cambios del repositorio.',
          correct: false,
        },
      ],
    },
    {
      id: 'find-bottleneck',
      prompt:
        'El dolor de fin de mes: una solicitud de pago pasa por seis microservicios y la base de datos, y tarda ocho segundos. Necesito seguir el recorrido de cada solicitud y ver un mapa que me diga qué servicio la está frenando. ¿Qué uso?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'xray-bottleneck',
          label: 'AWS X-Ray',
          definition:
            'Servicio que recopila datos de las solicitudes que atiende una aplicación y genera un mapa de trazas con sus llamadas a otros servicios.',
          explanation:
            'X-Ray hace rastreo distribuido: sigue cada solicitud por los microservicios y la base de datos, y su mapa de trazas muestra dónde están los cuellos de botella y los picos de latencia.',
          correct: true,
        },
        {
          id: 'cloudtrail-bottleneck',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra las llamadas a la API de AWS hechas por usuarios, roles y servicios para auditoría.',
          explanation:
            'Es una trampa típica: CloudTrail responde quién hizo qué llamada a la API, no por qué una solicitud de tus clientes tarda ocho segundos.',
          correct: false,
        },
        {
          id: 'cloudwatch-bottleneck',
          label: 'Una alarma de Amazon CloudWatch sobre la latencia del portal',
          definition:
            'Alarma que avisa o ejecuta una acción cuando una métrica, como la latencia, cruza un umbral.',
          explanation:
            'Una alarma avisa que el portal está lento, pero no sigue cada solicitud entre los microservicios ni muestra el mapa de trazas que indica cuál la frena.',
          correct: false,
        },
        {
          id: 'codebuild-bottleneck',
          label: 'AWS CodeBuild',
          definition:
            'Servicio de compilación administrado que compila el código y ejecuta pruebas.',
          explanation:
            'CodeBuild trabaja antes del despliegue, compilando y probando. No observa las solicitudes reales de los clientes en producción.',
          correct: false,
        },
      ],
    },
    {
      id: 'mobile-frontend',
      prompt:
        'Por último, la app nueva. El equipo frontend quiere publicarla rápido sin administrar infraestructura, con una rama para producción y otra para pruebas, y una vista previa de cada pull request para que marketing la revise. ¿Qué servicio les recomiendo?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'cli-frontend',
          label: 'AWS CLI',
          definition:
            'Herramienta de código abierto para ejecutar comandos de AWS desde la terminal y automatizarlos con scripts.',
          explanation:
            'Con la CLI el equipo tendría que armar a mano todo el proceso de publicación. No ofrece ramas por entorno ni vistas previas de pull requests.',
          correct: false,
        },
        {
          id: 'codebuild-frontend',
          label: 'AWS CodeBuild',
          definition:
            'Servicio administrado que compila código fuente, ejecuta pruebas y produce paquetes listos para desplegar.',
          explanation:
            'CodeBuild compila y prueba, pero no aloja la aplicación ni ofrece vistas previas para que marketing revise cada pull request.',
          correct: false,
        },
        {
          id: 'amplify-frontend',
          label: 'AWS Amplify',
          definition:
            'Servicio para crear y desplegar aplicaciones web y móviles, con hosting basado en Git, ramas por entorno, dominios personalizados y vistas previas de pull requests.',
          explanation:
            'Amplify está pensado para que un equipo frontend publique apps web y móviles sin administrar infraestructura, con ramas por entorno y vistas previas de cada pull request.',
          correct: true,
        },
        {
          id: 'cloudtrail-frontend',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones hechas en la cuenta de AWS.',
          explanation:
            'CloudTrail sirve para auditar acciones en la cuenta. No publica aplicaciones ni crea entornos por rama.',
          correct: false,
        },
      ],
    },
  ],
};
