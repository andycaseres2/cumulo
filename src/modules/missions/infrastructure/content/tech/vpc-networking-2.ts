import type { Mission } from '../../../domain/Mission';

/**
 * Café Hacker: a coworking café in Guadalajara whose booking app on AWS must survive an Availability Zone outage.
 * Practices subnets per Availability Zone, security groups, stateful versus stateless rules and VPC Flow Logs.
 */
export const vpcNetworking2: Mission = {
  id: 'vpc-networking-2',
  track: 'tech',
  topicSlug: 'vpc-networking',
  buildingId: 'hacker-cafe',
  title: 'Firewall con café',
  client: { name: 'Valentina Gallardo', role: 'Dueña del Café Hacker' },
  intro: [
    '¡Hola! Pide lo que quieras, invita la casa. Soy Valentina Gallardo, dueña del Café Hacker. Abrí el primero en Guadalajara: café de especialidad, buen wifi y mesas para programar.',
    'Hoy tenemos tres locales y una app donde la comunidad reserva mesas, salas y lugares para nuestras hackatones. La app corre en unas instancias EC2 dentro de una VPC que armé yo misma, viendo tutoriales.',
    'La semana pasada la app se cayó en plena hackatón y nadie pudo registrarse. Además, un cliente me preguntó si la red estaba bien protegida, y no supe qué contestarle.',
    'En un café lleno de hackers, no puedo tener la red con agujeros. ¿Me ayudas a revisarla? El café corre por mi cuenta.',
  ],
  outro: {
    passed: [
      'Ya entendí: una subred por AZ, security groups como firewall principal que recuerdan las respuestas, y Flow Logs para saber quién toca la puerta.',
      'La próxima hackatón ya no se cae. Y si alguno de mis clientes hackers intenta algo, voy a tener cómo verlo. ¡Tienes café gratis de por vida!',
    ],
    failed: [
      'Mmm... con estas respuestas creo que mi red seguiría con agujeros. Y aquí los clientes se dan cuenta rápido.',
      'Repasa la teoría de Amazon VPC con un buen café y vuelve cuando quieras. Te guardo la mesa junto a la ventana.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'subnets-per-az',
      prompt:
        'Lo que más me dolió fue la caída en plena hackatón. Todo estaba en una sola Availability Zone. Leí que debo repartir las instancias en dos AZ. ¿Cómo armo las subredes?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'one-subnet-two-azs',
          label: 'Una sola subred grande que abarque las dos AZ',
          definition: 'Un rango de direcciones IP dentro de la VPC que se extiende sobre varias Availability Zones.',
          explanation:
            'Es una trampa típica: cada subred vive en una sola Availability Zone, así que no existe una subred que abarque dos.',
          correct: false,
        },
        {
          id: 'two-subnets-same-az',
          label: 'Dos subredes en la misma AZ, con instancias en cada una',
          definition: 'Dividir el rango de IP de la VPC en varias subredes ubicadas en una misma Availability Zone.',
          explanation:
            'Si esa AZ falla, las dos subredes caen juntas. Para alta disponibilidad, las subredes tienen que estar en AZ distintas.',
          correct: false,
        },
        {
          id: 'subnet-per-az',
          label: 'Una subred en cada AZ, con instancias repartidas entre ambas',
          definition: 'Crear subredes en distintas Availability Zones, cada una con su propio rango de direcciones IP.',
          explanation:
            'Cada subred vive en una sola AZ, por eso para alta disponibilidad se crea una subred en cada AZ. Si una AZ falla, las instancias de la otra siguen atendiendo.',
          correct: true,
        },
        {
          id: 'bigger-instance',
          label: 'Una sola instancia más grande en la subred actual',
          definition: 'Escalado vertical: reemplazar una instancia por otra con más CPU y memoria.',
          explanation:
            'Una instancia más grande aguanta más carga, pero sigue en una sola AZ. Si esa AZ falla, la app se cae igual.',
          correct: false,
        },
      ],
    },
    {
      id: 'instance-firewall',
      prompt:
        'Ahora la protección. Quiero que a cada instancia de la app solo le llegue tráfico HTTPS desde el balanceador de carga. ¿Qué uso como control principal a nivel de instancia, el que AWS recomienda?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'security-group',
          label: 'Un security group',
          definition:
            'Firewall virtual que controla el tráfico que entra y sale de recursos como instancias EC2, con reglas de permitir.',
          explanation:
            'AWS recomienda el security group como mecanismo principal de control de acceso de red. Actúa a nivel de instancia y permite abrir solo HTTPS desde el balanceador.',
          correct: true,
        },
        {
          id: 'network-acl',
          label: 'Una network ACL',
          definition: 'Lista de control de acceso que filtra el tráfico de una subred completa con reglas de permitir y denegar.',
          explanation:
            'La network ACL actúa a nivel de subred y es útil como capa adicional de defensa, pero no es el control principal a nivel de cada instancia.',
          correct: false,
        },
        {
          id: 'inspector',
          label: 'Amazon Inspector',
          definition: 'Servicio que escanea de forma continua cargas de trabajo en busca de vulnerabilidades y exposición de red.',
          explanation:
            'Inspector detecta debilidades, pero no controla qué tráfico llega a cada instancia. No es un firewall.',
          correct: false,
        },
        {
          id: 'internet-gateway',
          label: 'Un internet gateway',
          definition: 'Componente que conecta una VPC con internet.',
          explanation:
            'El internet gateway da acceso a internet, pero no filtra qué tráfico puede llegar a cada instancia.',
          correct: false,
        },
      ],
    },
    {
      id: 'return-traffic',
      prompt:
        'Ya permití la entrada HTTPS en el security group. Un amigo me dice que también tengo que crear una regla para que salgan las respuestas, porque si no los usuarios no reciben nada. ¿Tiene razón?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'yes-stateless',
          label: 'Sí: todo firewall de AWS es stateless y necesita una regla para la respuesta',
          definition: 'Un control stateless evalúa la respuesta por separado, así que necesita su propia regla.',
          explanation:
            'Eso describe a la network ACL. El security group es stateful: si permites la entrada, la respuesta sale sola.',
          correct: false,
        },
        {
          id: 'yes-route-table',
          label: 'Sí, y además hay que permitir la respuesta en la tabla de rutas',
          definition: 'La tabla de rutas define a dónde se dirige el tráfico que sale de una subred.',
          explanation:
            'Las tablas de rutas indican a dónde va el tráfico, no permiten ni bloquean respuestas. Y en el security group la respuesta ya está permitida.',
          correct: false,
        },
        {
          id: 'no-numeric-order',
          label: 'No, porque las reglas se evalúan en orden numérico y la primera ya lo permite',
          definition: 'Evaluación de reglas una por una, según su número, hasta encontrar la primera que coincide.',
          explanation:
            'El orden numérico es como evalúa sus reglas la network ACL. El security group evalúa todas sus reglas, y la razón por la que la respuesta sale es que es stateful.',
          correct: false,
        },
        {
          id: 'no-stateful',
          label: 'No: el security group es stateful y permite la respuesta automáticamente',
          definition: 'Un control stateful recuerda las conexiones permitidas y deja pasar su tráfico de respuesta.',
          explanation:
            'Si el security group permite una solicitud de entrada, la respuesta sale automáticamente. Una regla para la respuesta sí haría falta en una network ACL, que es stateless.',
          correct: true,
        },
      ],
    },
    {
      id: 'traffic-records',
      prompt:
        'Último tema: después de la caída, quiero tener registrado qué direcciones IP se conectan a las interfaces de red de mis instancias y qué tráfico se acepta o se rechaza, para investigar si vuelve a pasar algo raro. ¿Qué activo?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition: 'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas mediante las API de AWS.',
          explanation:
            'CloudTrail responde quién hizo qué llamada a la API, como crear una instancia. No registra el tráfico IP que llega a las interfaces de red.',
          correct: false,
        },
        {
          id: 'inspector-records',
          label: 'Amazon Inspector',
          definition: 'Servicio de gestión de vulnerabilidades que genera hallazgos sobre software vulnerable y exposición de red.',
          explanation:
            'Inspector encuentra debilidades, pero no guarda un registro de cada conexión que llega a las instancias.',
          correct: false,
        },
        {
          id: 'flow-logs',
          label: 'VPC Flow Logs',
          definition: 'Función que registra información del tráfico IP que entra y sale de las interfaces de red de la VPC.',
          explanation:
            'Flow Logs registra el tráfico IP de las interfaces de red, con datos como el origen y si se aceptó o se rechazó. Es la base para investigar conexiones sospechosas.',
          correct: true,
        },
        {
          id: 'nat-gateway',
          label: 'Un NAT gateway',
          definition: 'Servicio de traducción de direcciones de red que da salida a internet a instancias de subredes privadas.',
          explanation:
            'El NAT gateway da salida a internet a las subredes privadas; no es una herramienta para registrar el tráfico que llega a las instancias.',
          correct: false,
        },
      ],
    },
  ],
};
