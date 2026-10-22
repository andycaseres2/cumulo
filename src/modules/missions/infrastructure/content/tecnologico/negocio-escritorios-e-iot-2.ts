import type { Mission } from '../../../domain/Mission';

/**
 * Robótica Kids: a robotics shop and academy for children in Montevideo connecting its robot kits to the cloud.
 * Practices AWS IoT Core (protocols, message broker and rules), Amazon AppStream 2.0 and WorkSpaces Personal.
 */
export const negocioEscritoriosEIot2: Mission = {
  id: 'negocio-escritorios-e-iot-2',
  track: 'tecnologico',
  topicSlug: 'negocio-escritorios-e-iot',
  buildingId: 'robotica-kids',
  title: 'Robots que hablan con la nube',
  client: { name: 'Matías Ferreira', role: 'Dueño de Robótica Kids' },
  intro: [
    '¡Hola! Pasa, cuidado con el robot que anda suelto por el piso. Soy Matías Ferreira, dueño de Robótica Kids. Vendemos kits de robótica y damos clases a chicos de todo Montevideo.',
    'Este año queremos dar un salto: que los robots de los kits manden los datos de sus sensores a la nube, para que los chicos vean en una app cuánta luz o temperatura midieron.',
    'También abrimos clases en línea para escuelas del interior del Uruguay, pero el programa con el que se programan los robots es pesado y muchas familias no pueden instalarlo. Y mis dos diseñadoras trabajan a distancia con computadoras que ya no dan más.',
    'Si esto sale bien, entramos a cien escuelas el año que viene. Si sale mal, me quedo con un depósito lleno de robots mudos. ¿Me das una mano?',
  ],
  outro: {
    passed: [
      '¡Los robots hablan! Los sensores mandan sus datos a la nube, las reglas los llevan a donde los analizamos y los chicos del interior programan desde el navegador.',
      'Y mis diseñadoras por fin tienen un escritorio propio que no se cuelga. Gracias: el primer robot de la próxima colección va a llevar tu nombre.',
    ],
    failed: [
      'Mmm... con estas decisiones los robots siguen mudos y las clases en línea no arrancan.',
      'Repasa la teoría de escritorios virtuales e IoT, y vuelve cuando quieras. Los robots te van a esperar cargando la batería.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'connect-robots',
      prompt:
        'Primero lo más importante: los robots tienen sensores y pueden publicar mensajes por MQTT. Queremos que se conecten a la nube y que la app de los chicos se suscriba a esos mensajes. ¿Qué servicio usamos?',
      topicSlug: 'negocio-escritorios-e-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'ses-robots',
          label: 'Amazon SES',
          definition:
            'Plataforma de correo electrónico para enviar y recibir mensajes con direcciones y dominios propios.',
          explanation:
            'SES envía y recibe correos. No conecta dispositivos ni recibe mensajes MQTT de sensores.',
          correct: false,
        },
        {
          id: 'iot-core',
          label: 'AWS IoT Core',
          definition:
            'Servicio que conecta dispositivos IoT con otros dispositivos y con los servicios de AWS, con un message broker de publicación y suscripción.',
          explanation:
            'IoT Core soporta MQTT y su message broker permite que los robots publiquen sus mediciones y que la app se suscriba a ellas. Los robots se integran con los AWS IoT Device SDKs.',
          correct: true,
        },
        {
          id: 'connect-robots-option',
          label: 'Amazon Connect',
          definition:
            'Centro de contacto en la nube que conecta a los clientes con agentes por voz, chat y SMS.',
          explanation:
            'Connect sirve para atender a personas que llaman o escriben a un centro de contacto, no para recibir datos de sensores.',
          correct: false,
        },
        {
          id: 'appstream-robots',
          label: 'Amazon AppStream 2.0',
          definition:
            'Servicio administrado de streaming de aplicaciones de escritorio hacia los equipos de los usuarios.',
          explanation:
            'AppStream 2.0 entrega aplicaciones a personas. No es el servicio que conecta dispositivos con la nube.',
          correct: false,
        },
      ],
    },
    {
      id: 'rural-schools',
      prompt:
        'Para las escuelas rurales armamos robots que usan LoRaWAN, porque hay poca cobertura. Mi socio dice que IoT Core, una vez conectado, va a analizar los datos solito y nos va a dar los reportes. ¿Qué es lo correcto?',
      topicSlug: 'negocio-escritorios-e-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'iot-analyzes',
          label: 'IoT Core analiza las mediciones y arma los reportes por sí solo',
          definition:
            'Supuesto de que el servicio que conecta los dispositivos también se encarga del análisis de sus datos.',
          explanation:
            'Es una trampa típica del examen. IoT Core conecta los dispositivos y enruta sus mensajes; el análisis se hace en otros servicios de AWS.',
          correct: false,
        },
        {
          id: 'mqtt-only',
          label: 'IoT Core solo acepta MQTT, así que los robots con LoRaWAN no se pueden conectar',
          definition:
            'Supuesto de que el servicio admite un único protocolo de comunicación para los dispositivos.',
          explanation:
            'IoT Core soporta MQTT, MQTT sobre WebSockets seguros, HTTPS y LoRaWAN, así que los robots de las escuelas rurales sí se conectan.',
          correct: false,
        },
        {
          id: 'workspaces-robot',
          label: 'Hay que instalar Amazon WorkSpaces en cada robot para que envíe datos',
          definition:
            'Supuesto de que un servicio de escritorios virtuales funciona como software de conexión dentro de un dispositivo.',
          explanation:
            'WorkSpaces entrega escritorios virtuales a personas. Los dispositivos se integran con IoT Core mediante los AWS IoT Device SDKs.',
          correct: false,
        },
        {
          id: 'rules-route',
          label: 'IoT Core conecta los robots, incluso por LoRaWAN, y con reglas envía los datos a otros servicios que hacen el análisis',
          definition:
            'Reparto de tareas en el que el servicio de IoT conecta y enruta los mensajes, y otros servicios procesan y analizan los datos.',
          explanation:
            'IoT Core soporta LoRaWAN, y sus reglas envían las mediciones a otros servicios de AWS, que son los que analizan los datos y generan los reportes.',
          correct: true,
        },
      ],
    },
    {
      id: 'online-classes',
      prompt:
        'Ahora las clases en línea. Los chicos del interior necesitan usar nuestro programa de escritorio para programar robots, que pide bastante GPU, desde el navegador de su casa, sin instalar nada y sin darles un escritorio entero. ¿Qué usamos?',
      topicSlug: 'negocio-escritorios-e-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-classes',
          label: 'Amazon WorkSpaces',
          definition:
            'Servicio que aprovisiona escritorios virtuales completos en la nube con Windows o Linux.',
          explanation:
            'WorkSpaces entrega un escritorio completo, y Matías pidió solo la aplicación, sin un escritorio entero para cada chico.',
          correct: false,
        },
        {
          id: 'appstream',
          label: 'Amazon AppStream 2.0',
          definition:
            'Servicio administrado que entrega aplicaciones de escritorio individuales por streaming, incluso a un navegador compatible con HTML5.',
          explanation:
            'AppStream 2.0 hace streaming de la aplicación al navegador sin instalarla, sirve para software exigente en GPU y para programas de clase, y la academia mantiene una sola versión del programa. Hoy AWS lo llama Amazon WorkSpaces Applications.',
          correct: true,
        },
        {
          id: 'secure-browser-classes',
          label: 'Amazon WorkSpaces Secure Browser',
          definition:
            'Navegador empresarial remoto para acceder de forma protegida a sitios web internos y aplicaciones SaaS.',
          explanation:
            'Secure Browser sirve para sitios web y aplicaciones SaaS. El programa de los robots es una aplicación de escritorio.',
          correct: false,
        },
        {
          id: 'iot-classes',
          label: 'AWS IoT Core',
          definition:
            'Servicio que conecta dispositivos IoT y enruta sus mensajes hacia otros servicios de AWS mediante reglas.',
          explanation:
            'IoT Core conecta los robots con la nube, pero no entrega aplicaciones de escritorio a los estudiantes.',
          correct: false,
        },
      ],
    },
    {
      id: 'designers-desktops',
      prompt:
        'Por último, mis dos diseñadoras trabajan a distancia con computadoras viejas. Quiero que cada una tenga su propio escritorio de Windows completo, persistente y solo para ella, sin comprarles equipos nuevos. ¿Qué opción elegimos?',
      topicSlug: 'negocio-escritorios-e-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-pools-designers',
          label: 'WorkSpaces Pools',
          definition:
            'Opción de Amazon WorkSpaces que entrega escritorios virtuales no persistentes sobre infraestructura efímera.',
          explanation:
            'Los escritorios de WorkSpaces Pools no son persistentes ni quedan asignados a una persona, y las diseñadoras necesitan un escritorio propio que se conserve.',
          correct: false,
        },
        {
          id: 'appstream-designers',
          label: 'Amazon AppStream 2.0',
          definition:
            'Servicio administrado de streaming de aplicaciones de escritorio individuales hacia cualquier equipo.',
          explanation:
            'AppStream 2.0 está orientado a entregar aplicaciones por streaming; para un escritorio completo y persistente asignado a cada diseñadora, la opción es WorkSpaces Personal.',
          correct: false,
        },
        {
          id: 'workspaces-personal-designers',
          label: 'WorkSpaces Personal',
          definition:
            'Opción de Amazon WorkSpaces que entrega escritorios virtuales persistentes, asignados cada uno a un usuario.',
          explanation:
            'Cada diseñadora tendría un escritorio de Windows persistente y propio, como su computadora, sin comprar hardware. Se puede pagar por mes o por hora.',
          correct: true,
        },
        {
          id: 'connect-designers',
          label: 'Amazon Connect',
          definition:
            'Centro de contacto omnicanal en la nube con métricas en tiempo real y pago por uso.',
          explanation:
            'Connect atiende contactos de clientes. No aprovisiona escritorios para el equipo de la tienda.',
          correct: false,
        },
      ],
    },
  ],
};
