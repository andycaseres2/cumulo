import type { Mission } from '../../../domain/Mission';

/**
 * Café Hacker: a coffee shop for programmers in Quito that wants its own ordering web app and loyalty program.
 * Practices AWS Amplify Hosting, the AWS CLI, the AWS SDKs and AWS CodeBuild.
 */
export const developerAndFrontendTools1: Mission = {
  id: 'developer-and-frontend-tools-1',
  track: 'tech',
  topicSlug: 'developer-and-frontend-tools',
  buildingId: 'hacker-cafe',
  title: 'Un café, un commit',
  client: { name: 'Daniela Andrade', role: 'Dueña y desarrolladora del Café Hacker' },
  intro: [
    '¡Hola! ¿Un espresso? Soy Daniela Andrade, dueña del Café Hacker, aquí en Quito. Es un café para programadores: buen wifi, enchufes en cada mesa y café de altura.',
    'Antes de abrir el café era desarrolladora, así que armé yo misma una web en React para pedir desde la mesa y un backend en Python para el programa de puntos de fidelidad.',
    'Pero todo lo hago a mano: publico la web copiando archivos, pruebo el código en mi laptop y cada mañana actualizo el menú del día con clics en la consola de AWS. Ya se me pasó subir un error a producción en plena hora pico.',
    'Quiero dedicarme al café, no a apagar incendios. ¿Me ayudas a elegir las herramientas de AWS para trabajar como un equipo profesional?',
  ],
  outro: {
    passed: [
      '¡Me encanta! La web se publica sola en cada cambio, el menú se actualiza con un script y el backend se compila y se prueba sin mi laptop.',
      'Ahora sí puedo servir café tranquila. Tu próximo espresso lo invito yo.',
    ],
    failed: [
      'Mmm... con estas decisiones seguiría haciendo todo a mano y apagando incendios.',
      'Repasa la teoría de herramientas de desarrollo y frontend y vuelve. La cafetera siempre está encendida.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'host-web-app',
      prompt:
        'Empecemos por la web de pedidos en React. El código está en GitHub y quiero que cada cambio que suba se publique solo, con mi dominio propio, sin administrar servidores. ¿Qué servicio uso?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'ec2-web',
          label: 'Una instancia de Amazon EC2 con un servidor web propio',
          definition:
            'Servidor virtual en la nube donde el cliente instala, configura y mantiene el sistema operativo y el software.',
          explanation:
            'Es la trampa típica: con EC2 tendrías que administrar el servidor y armar tú misma la publicación. Para una app web con despliegue continuo desde Git, la respuesta es Amplify.',
          correct: false,
        },
        {
          id: 'amplify-web',
          label: 'AWS Amplify (Amplify Hosting)',
          definition:
            'Servicio para crear y desplegar aplicaciones web y móviles; Amplify Hosting publica apps conectadas a un repositorio Git con despliegue continuo en la CDN global de AWS.',
          explanation:
            'Amplify Hosting se conecta a tu repositorio de GitHub y publica cada cambio automáticamente en la CDN global de AWS, es compatible con React y admite dominios personalizados.',
          correct: true,
        },
        {
          id: 'xray-web',
          label: 'AWS X-Ray',
          definition:
            'Servicio de rastreo distribuido que recopila datos sobre las solicitudes de una aplicación y muestra un mapa de trazas.',
          explanation:
            'X-Ray ayuda a diagnosticar solicitudes y latencia, pero no aloja ni publica tu web de pedidos.',
          correct: false,
        },
        {
          id: 'cloudtrail-web',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones hechas en la cuenta desde la consola, la CLI, los SDK y las API.',
          explanation:
            'CloudTrail audita quién hizo qué en la cuenta. No publica aplicaciones web desde un repositorio.',
          correct: false,
        },
      ],
    },
    {
      id: 'daily-menu-script',
      prompt:
        'Cada mañana subo el menú del día a un bucket de Amazon S3 haciendo clics en la consola. Quiero automatizarlo con un script que corra desde la terminal de mi Mac. ¿Qué herramienta uso?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'console-menu',
          label: 'AWS Management Console',
          definition:
            'Interfaz web para administrar los servicios de AWS con clics desde el navegador.',
          explanation:
            'La consola es justo lo que usas hoy: es manual y no se automatiza con un script en la terminal.',
          correct: false,
        },
        {
          id: 'xray-menu',
          label: 'AWS X-Ray',
          definition:
            'Servicio que rastrea las solicitudes de una aplicación a través de sus servicios para encontrar cuellos de botella.',
          explanation:
            'X-Ray sirve para diagnosticar el rendimiento de una aplicación. No ejecuta comandos para subir archivos a S3.',
          correct: false,
        },
        {
          id: 'cli-menu',
          label: 'AWS CLI',
          definition:
            'Herramienta de código abierto para interactuar con los servicios de AWS mediante comandos en la terminal de Linux, macOS o Windows.',
          explanation:
            'Con la AWS CLI haces desde la terminal lo mismo que en la consola, como subir el menú a S3, y puedes ponerlo en un script para automatizarlo cada mañana.',
          correct: true,
        },
        {
          id: 'amplify-menu',
          label: 'AWS Amplify',
          definition:
            'Servicio para crear y desplegar aplicaciones web y móviles con despliegue continuo desde Git.',
          explanation:
            'Amplify publica aplicaciones web y móviles. Para automatizar con un script una tarea en S3 desde la terminal, la herramienta es la AWS CLI.',
          correct: false,
        },
      ],
    },
    {
      id: 'loyalty-sdk',
      prompt:
        'El backend de puntos está escrito en Python. Cuando un cliente paga, el propio código del backend tiene que guardar sus puntos en una base de datos de AWS. ¿Con qué llamo a los servicios de AWS desde ese código?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sdk-loyalty',
          label: 'El AWS SDK para Python',
          definition:
            'Bibliotecas para lenguajes como Java, Python, Ruby o .NET que permiten llamar a los servicios de AWS desde el código de una aplicación.',
          explanation:
            'Los SDKs dan acceso programático a las APIs de AWS desde el código. Con el SDK para Python, el backend guarda los puntos cada vez que un cliente paga.',
          correct: true,
        },
        {
          id: 'console-loyalty',
          label: 'AWS Management Console',
          definition:
            'Interfaz web para administrar los servicios de AWS de forma manual desde el navegador.',
          explanation:
            'La consola es para trabajar a mano. El backend necesita llamar a AWS por sí solo, desde su propio código, cada vez que alguien paga.',
          correct: false,
        },
        {
          id: 'cloudtrail-loyalty',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra las llamadas a la API hechas en la cuenta para auditoría.',
          explanation:
            'CloudTrail registra las llamadas que ya se hicieron, para auditarlas. No es la forma de hacer esas llamadas desde el código.',
          correct: false,
        },
        {
          id: 'codepipeline-loyalty',
          label: 'AWS CodePipeline',
          definition:
            'Servicio de entrega continua que automatiza las fases de compilación, prueba y despliegue de una aplicación.',
          explanation:
            'CodePipeline automatiza cómo se publica el software, pero no es lo que usa el código del backend para guardar datos en AWS mientras funciona.',
          correct: false,
        },
      ],
    },
    {
      id: 'build-and-test',
      prompt:
        'Lo que más me duele: pruebo el backend en mi laptop, y si me olvido, el error llega a producción. Quiero un servicio administrado que compile el código, ejecute las pruebas y produzca el paquete listo para desplegar, sin mantener un servidor de compilación. ¿Cuál es?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'xray-build',
          label: 'AWS X-Ray',
          definition:
            'Servicio de rastreo distribuido que muestra el recorrido de cada solicitud por los servicios de una aplicación.',
          explanation:
            'X-Ray encuentra cuellos de botella y errores en solicitudes, pero no compila el código ni ejecuta las pruebas antes de publicar.',
          correct: false,
        },
        {
          id: 'codepipeline-build',
          label: 'AWS CodePipeline',
          definition:
            'Servicio de entrega continua que orquesta las fases de fuente, compilación, prueba y despliegue de un pipeline.',
          explanation:
            'Es la confusión típica: CodePipeline orquesta el flujo completo de entrega, pero la etapa que compila y prueba el código es CodeBuild.',
          correct: false,
        },
        {
          id: 'codebuild-build',
          label: 'AWS CodeBuild',
          definition:
            'Servicio de compilación totalmente administrado que compila el código fuente, ejecuta pruebas y produce paquetes listos para desplegar.',
          explanation:
            'CodeBuild compila y prueba el backend sin que aprovisiones servidores de compilación, y escala para procesar varias compilaciones a la vez. Así las pruebas ya no dependen de tu laptop.',
          correct: true,
        },
        {
          id: 'cloudformation-build',
          label: 'AWS CloudFormation',
          definition:
            'Servicio de infraestructura como código que crea y administra recursos de AWS a partir de plantillas.',
          explanation:
            'CloudFormation crea recursos de AWS desde plantillas, pero no compila tu código Python ni ejecuta sus pruebas.',
          correct: false,
        },
      ],
    },
  ],
};
