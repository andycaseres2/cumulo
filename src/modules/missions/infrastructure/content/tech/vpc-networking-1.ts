import type { Mission } from '../../../domain/Mission';

/**
 * Electrónica Volta: an electronics shop in Santa Cruz de la Sierra opening its online store on AWS after a scare.
 * Practices public and private subnets, the NAT gateway, network ACL deny rules and Amazon Inspector.
 */
export const vpcNetworking1: Mission = {
  id: 'vpc-networking-1',
  track: 'tech',
  topicSlug: 'vpc-networking',
  buildingId: 'electronics-store',
  title: 'Cables bien conectados',
  client: { name: 'Rodrigo Saavedra', role: 'Dueño de Electrónica Volta' },
  intro: [
    '¡Te damos la bienvenida a Electrónica Volta! Soy Rodrigo Saavedra, el dueño. Empecé vendiendo cables y enchufes en un puestito de Santa Cruz de la Sierra, y hoy vendemos celulares, consolas y computadoras a toda Bolivia.',
    'Estamos llevando la tienda en línea a AWS: unos servidores web, un balanceador de carga y una base de datos con los pedidos y los datos de los clientes.',
    'El mes pasado nos dio un susto: alguien encontró nuestro servidor de pruebas abierto a internet y lo usó para mandar spam. Ahora me da miedo que pase lo mismo con la base de datos de clientes.',
    'Tú sabes de redes y yo de circuitos. Quiero que esta vez los cables queden bien conectados desde el principio. ¿Me ayudas a diseñar la red?',
  ],
  outro: {
    passed: [
      'Ahora sí: la web de cara a internet, la base de datos escondida en su subred privada, parches por el NAT gateway y esa IP molesta bloqueada en la network ACL.',
      'Y con Amazon Inspector vigilando, me voy a enterar antes que los atacantes. Gracias: pásate cuando quieras, siempre habrá un cargador de regalo para ti.',
    ],
    failed: [
      'Mmm... con este diseño todavía veo cables sueltos. No quiero otro susto como el del mes pasado.',
      'Repasa la teoría de Amazon VPC con calma y vuelve cuando quieras. Aquí te espero, con el soldador encendido.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'subnet-layout',
      prompt:
        'Primero lo básico: tenemos el balanceador de carga, los servidores web y la base de datos de clientes. Los clientes deben poder entrar a la tienda desde internet, pero la base de datos no debe quedar expuesta. ¿Cómo repartimos todo en la VPC?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'all-public',
          label: 'Todo en subredes públicas, para que nada tenga problemas de conexión',
          definition: 'Subredes cuya tabla de rutas tiene una ruta directa a un internet gateway.',
          explanation:
            'Poner la base de datos en una subred pública es la trampa típica: quedaría con un camino directo desde internet, justo lo que Rodrigo quiere evitar.',
          correct: false,
        },
        {
          id: 'public-web-private-db',
          label: 'Balanceador y servidores web en subredes públicas; base de datos en subredes privadas',
          definition:
            'Diseño que separa los recursos según su ruta: los públicos con ruta a un internet gateway y los internos en subredes sin esa ruta directa.',
          explanation:
            'La tienda queda accesible a través de las subredes públicas, mientras la base de datos vive en subredes privadas sin ruta directa a un internet gateway.',
          correct: true,
        },
        {
          id: 'public-db-password',
          label: 'La base de datos en una subred pública, pero con una contraseña muy larga',
          definition: 'Exponer un recurso con ruta a internet y confiar solo en sus credenciales para protegerlo.',
          explanation:
            'Una buena contraseña ayuda, pero la base de datos seguiría expuesta a internet. Las bases de datos van en subredes privadas.',
          correct: false,
        },
        {
          id: 'separate-vpc-peering',
          label: 'Todo en subredes privadas y los clientes entran por VPC peering',
          definition: 'Conexión entre dos VPC que permite enrutar tráfico entre ellas.',
          explanation:
            'VPC peering conecta dos VPC entre sí, no a los compradores que llegan desde internet. Sin subredes públicas, nadie podría entrar a la tienda.',
          correct: false,
        },
      ],
    },
    {
      id: 'database-patches',
      prompt:
        'Los servidores de base de datos están en la subred privada, perfecto. Pero cada semana tienen que bajar las actualizaciones del sistema operativo, y no quiero abrirles ninguna puerta de entrada desde internet. ¿Qué agrego?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'igw-route',
          label: 'Una ruta directa desde la subred privada hacia el internet gateway',
          definition: 'Entrada en la tabla de rutas que envía el tráfico de la subred directamente a internet a través del internet gateway.',
          explanation:
            'Con una ruta directa al internet gateway, la subred dejaría de ser privada y pasaría a ser pública, con la base de datos más expuesta.',
          correct: false,
        },
        {
          id: 'open-security-group',
          label: 'Un security group que permita la entrada desde cualquier dirección IP',
          definition: 'Firewall virtual de recursos como instancias EC2, con reglas que permiten tráfico de entrada y salida.',
          explanation:
            'Abrir la entrada a cualquier IP es lo contrario de lo que pide Rodrigo, y no le da a una subred privada un camino de salida a internet.',
          correct: false,
        },
        {
          id: 'nat-gateway',
          label: 'Un NAT gateway en una subred pública y una ruta hacia él desde la subred privada',
          definition:
            'Servicio de traducción de direcciones de red que permite a instancias de subredes privadas conectarse a servicios fuera de la VPC.',
          explanation:
            'El NAT gateway deja salir a los servidores privados a descargar parches, y nadie desde afuera puede iniciar una conexión hacia ellos a través de él.',
          correct: true,
        },
        {
          id: 'vpc-peering-patches',
          label: 'Una conexión de VPC peering con otra VPC',
          definition: 'Conexión entre dos VPC para enrutar tráfico entre ellas como si estuvieran en la misma red.',
          explanation:
            'El peering une dos VPC; no le da a la subred privada una salida controlada hacia los servidores de parches en internet.',
          correct: false,
        },
      ],
    },
    {
      id: 'block-ip-range',
      prompt:
        'Hoy vimos miles de intentos de conexión desde un rango de direcciones IP específico. Quiero bloquear ese rango para toda la subred de los servidores web. ¿Dónde lo hago?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'network-acl-deny',
          label: 'Una regla de denegar (deny) en la network ACL de la subred',
          definition:
            'Lista de control de acceso que controla el tráfico de toda una subred, con reglas de permitir y denegar evaluadas en orden numérico.',
          explanation:
            'La network ACL actúa sobre la subred completa y admite reglas de denegar, así que es la herramienta indicada para bloquear un rango de IP específico como capa adicional de defensa.',
          correct: true,
        },
        {
          id: 'security-group-deny',
          label: 'Una regla de denegar (deny) en el security group de los servidores',
          definition: 'Firewall virtual que controla el tráfico de las instancias asociadas y evalúa todas sus reglas antes de decidir.',
          explanation:
            'Es la trampa típica: el security group solo tiene reglas de permitir (allow). Para denegar un rango de IP se usa una network ACL.',
          correct: false,
        },
        {
          id: 'inspector-block',
          label: 'Amazon Inspector',
          definition:
            'Servicio de gestión de vulnerabilidades que escanea de forma continua cargas de trabajo y genera hallazgos con recomendaciones.',
          explanation:
            'Inspector detecta vulnerabilidades y exposición de red, pero no bloquea tráfico. No es un firewall.',
          correct: false,
        },
        {
          id: 'flow-logs-block',
          label: 'VPC Flow Logs',
          definition: 'Función que registra información del tráfico IP que entra y sale de las interfaces de red de la VPC.',
          explanation:
            'Flow Logs sirve para ver de dónde vienen los intentos, pero solo registra el tráfico; no lo bloquea.',
          correct: false,
        },
      ],
    },
    {
      id: 'vulnerability-scan',
      prompt:
        'Último tema, por el susto del mes pasado: quiero que algo revise de forma continua nuestras instancias EC2 y nos avise si tienen software con vulnerabilidades conocidas o puertos abiertos a internet sin necesidad. ¿Qué servicio usamos?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'network-acl-scan',
          label: 'Una network ACL más estricta',
          definition: 'Lista de control de acceso a nivel de subred, con reglas de permitir y denegar que son stateless.',
          explanation:
            'Una network ACL controla el tráfico, pero no revisa el software de las instancias ni avisa de vulnerabilidades.',
          correct: false,
        },
        {
          id: 'route-table-scan',
          label: 'Revisar a mano las tablas de rutas cada mes',
          definition: 'Tablas que definen a dónde se dirige el tráfico que sale de cada subred de la VPC.',
          explanation:
            'Las tablas de rutas no dicen nada sobre vulnerabilidades del software, y una revisión mensual a mano no es un escaneo continuo.',
          correct: false,
        },
        {
          id: 'security-group-scan',
          label: 'Un security group nuevo para cada instancia',
          definition: 'Firewall virtual stateful que controla el tráfico que entra y sale de recursos como instancias EC2.',
          explanation:
            'Los security groups controlan el tráfico, pero no detectan software vulnerable ni avisan de debilidades.',
          correct: false,
        },
        {
          id: 'inspector',
          label: 'Amazon Inspector',
          definition:
            'Servicio de gestión de vulnerabilidades que descubre y escanea de forma continua instancias EC2, imágenes de contenedor en ECR y funciones Lambda.',
          explanation:
            'Inspector escanea de forma continua en busca de vulnerabilidades de software y exposición de red no intencionada, y genera hallazgos con recomendaciones de corrección.',
          correct: true,
        },
      ],
    },
  ],
};
