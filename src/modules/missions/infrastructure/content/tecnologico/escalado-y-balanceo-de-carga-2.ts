import type { Mission } from '../../../domain/Mission';

/**
 * Taller Maker 3D: a 3D printing shop in Rosario whose online quote platform and network of partner printers keep growing.
 * Practices horizontal vs vertical scaling, the Network Load Balancer (layer 4, static IP), spreading an Auto Scaling group
 * across Availability Zones and AWS Auto Scaling scaling plans for several resources.
 */
export const escaladoYBalanceoDeCarga2: Mission = {
  id: 'escalado-y-balanceo-de-carga-2',
  track: 'tecnologico',
  topicSlug: 'escalado-y-balanceo-de-carga',
  buildingId: 'taller-maker',
  title: 'Impresoras que no se detienen',
  client: { name: 'Martín Acosta', role: 'Dueño del Taller Maker 3D' },
  intro: [
    '¡Te damos la bienvenida al Taller Maker 3D! Soy Martín Acosta. Empecé en Rosario con dos impresoras en un garaje y hoy imprimimos prótesis, repuestos y maquetas para clientes de toda Argentina.',
    'Los clientes suben sus modelos 3D a nuestra plataforma en AWS y reciben una cotización. Además, una red de talleres socios nos envía, por TCP y UDP, el estado de sus impresoras en tiempo real.',
    'El problema es que crecemos a saltos: cuando una universidad lanza un concurso de robótica, las cotizaciones se multiplican por diez y la plataforma se cae. Y los talleres socios se quejan de que nuestra dirección de conexión cambia y tienen que reconfigurar sus firewalls.',
    'No quiero perder clientes justo cuando más nos buscan. ¿Me ayudas a diseñar una plataforma que aguante nuestro crecimiento?',
  ],
  outro: {
    passed: [
      '¡Esto sí es imprimir sin parar! Ahora la plataforma agrega servidores iguales cuando llegan los concursos, está repartida en varias Availability Zones y los talleres socios se conectan siempre a la misma IP.',
      'Y con un solo plan de escalado ajustamos todo lo demás. Gracias: la próxima maqueta que imprimamos lleva tu nombre.',
    ],
    failed: [
      'Uy... con este diseño la plataforma se nos vuelve a caer en el próximo concurso.',
      'Repasa la teoría de escalado y balanceo de carga y vuelve al taller cuando quieras. Las impresoras te esperan.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'maker-scale-direction',
      prompt:
        'Mi técnico quiere comprar una instancia gigante; mi socia prefiere agregar más instancias iguales detrás de un balanceador cuando llegan los concursos y quitarlas después. ¿Cómo se llama lo que propone ella?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-scale-up',
          label: 'Escalado vertical (scale up)',
          definition:
            'Dar más capacidad a una misma instancia, por ejemplo cambiándola a un tipo de instancia más grande.',
          explanation:
            'Eso es lo que propone el técnico. La socia no agranda una instancia: agrega y quita instancias iguales.',
          correct: false,
        },
        {
          id: 'maker-scale-out',
          label: 'Escalado horizontal (scale out / scale in)',
          definition: 'Agregar instancias cuando sube la carga y quitarlas cuando baja.',
          explanation:
            'Sumar instancias iguales detrás del balanceador es scale out y quitarlas después es scale in. Con Auto Scaling, el taller se ajusta a la demanda en ambas direcciones.',
          correct: true,
        },
        {
          id: 'maker-scale-down',
          label: 'Escalado vertical (scale down)',
          definition: 'Reducir la capacidad de una misma instancia cambiándola a un tipo de instancia más pequeño.',
          explanation:
            'Scale down achica una sola instancia; la socia propone cambiar el número de instancias, no su tamaño.',
          correct: false,
        },
        {
          id: 'maker-high-availability',
          label: 'Tolerancia a fallas entre Availability Zones',
          definition:
            'Capacidad de un sistema de seguir funcionando ante fallas, por ejemplo usando varias Availability Zones.',
          explanation:
            'La alta disponibilidad trata de resistir fallas. Agregar instancias porque llegan más cotizaciones es escalar, no resistir una falla.',
          correct: false,
        },
      ],
    },
    {
      id: 'maker-partner-telemetry',
      prompt:
        'Ahora, los talleres socios: envían el estado de sus impresoras por TCP y UDP, son muchísimas conexiones y necesitan una dirección IP estática para abrirla en sus firewalls. ¿Qué balanceador ponemos delante de ese servicio?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-alb',
          label: 'Application Load Balancer (ALB)',
          definition:
            'Balanceador de capa 7 (HTTP/HTTPS) con enrutamiento flexible según la ruta o el contenido de la solicitud.',
          explanation:
            'El ALB brilla con aplicaciones web HTTP/HTTPS. Para conexiones TCP/UDP con rendimiento extremo e IP estática, el caso típico es el NLB.',
          correct: false,
        },
        {
          id: 'maker-gwlb',
          label: 'Gateway Load Balancer (GWLB)',
          definition:
            'Balanceador que combina un gateway de capa 3 con balanceo de capa 4 para desplegar y escalar appliances virtuales de red.',
          explanation:
            'El GWLB sirve para desplegar firewalls o sistemas de inspección de tráfico, no para recibir la telemetría de las impresoras de los socios.',
          correct: false,
        },
        {
          id: 'maker-ec2-auto-scaling',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'Servicio que mantiene el número correcto de instancias EC2 con grupos de capacidad mínima, máxima y deseada.',
          explanation:
            'EC2 Auto Scaling ajusta cuántas instancias hay, pero no es un balanceador ni ofrece una dirección IP estática a los socios.',
          correct: false,
        },
        {
          id: 'maker-nlb',
          label: 'Network Load Balancer (NLB)',
          definition:
            'Balanceador de Elastic Load Balancing que opera en capa 4 (TCP/UDP), pensado para rendimiento extremo o una dirección IP estática.',
          explanation:
            'El NLB reparte conexiones TCP y UDP con rendimiento extremo y puede tener una IP estática, así los socios configuran su firewall una sola vez.',
          correct: true,
        },
      ],
    },
    {
      id: 'maker-multi-az',
      prompt:
        'Leí que una Availability Zone puede tener problemas. Si eso pasa en pleno concurso, no quiero que se caiga toda la plataforma de cotizaciones. ¿Cómo organizamos el grupo de Auto Scaling?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-spread-azs',
          label: 'Repartir las instancias del grupo entre varias Availability Zones, detrás del balanceador',
          definition:
            'Diseño en el que un grupo de Auto Scaling distribuye sus instancias en varias AZ y un balanceador reparte el tráfico entre ellas.',
          explanation:
            'Auto Scaling puede repartir las instancias entre varias AZ y el balanceador solo envía tráfico a las saludables. Si una AZ falla, las demás siguen atendiendo y el grupo recupera la capacidad deseada.',
          correct: true,
        },
        {
          id: 'maker-single-az',
          label: 'Poner todas las instancias en una sola Availability Zone para que estén más cerca entre sí',
          definition: 'Diseño en el que todos los servidores de la aplicación se ejecutan en el mismo grupo de centros de datos.',
          explanation:
            'Si todas las instancias están en una sola AZ y esa AZ falla, la plataforma completa se cae. Es lo contrario de lo que pide Martín.',
          correct: false,
        },
        {
          id: 'maker-raise-max',
          label: 'Subir la capacidad máxima del grupo, sin cambiar dónde están las instancias',
          definition:
            'La capacidad máxima es el límite superior de instancias que puede tener un grupo de Auto Scaling.',
          explanation:
            'Un máximo más alto permite crecer más, pero si todas las instancias siguen en la misma AZ, una falla de esa AZ las afecta a todas.',
          correct: false,
        },
        {
          id: 'maker-bigger-instance',
          label: 'Cambiar a menos instancias, pero mucho más grandes, en la misma Availability Zone',
          definition: 'Escalado vertical: concentrar la capacidad en pocas instancias de un tipo más grande.',
          explanation:
            'Instancias más grandes en la misma AZ no resisten la falla de esa AZ, y además pierden la flexibilidad de agregar y quitar instancias.',
          correct: false,
        },
      ],
    },
    {
      id: 'maker-scaling-plan',
      prompt:
        'Último tema. El motor de cotizaciones corre en tareas de Amazon ECS, los pedidos están en una tabla de DynamoDB y el catálogo usa réplicas de lectura de Aurora. Quiero configurar el escalado de todo eso desde un solo lugar. ¿Qué usamos?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-ec2-only',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'Servicio enfocado en mantener el número correcto de instancias EC2 dentro de grupos de Auto Scaling.',
          explanation:
            'EC2 Auto Scaling se enfoca en instancias EC2; coordinar tareas de ECS, tablas de DynamoDB y réplicas de Aurora corresponde a AWS Auto Scaling.',
          correct: false,
        },
        {
          id: 'maker-elb',
          label: 'Elastic Load Balancing',
          definition:
            'Servicio que distribuye las solicitudes entrantes entre varios destinos y revisa su salud.',
          explanation:
            'ELB reparte el tráfico; no ajusta la capacidad de lectura y escritura de DynamoDB ni el número de réplicas de Aurora.',
          correct: false,
        },
        {
          id: 'maker-aws-auto-scaling',
          label: 'AWS Auto Scaling',
          definition:
            'Servicio que configura el escalado de varios recursos relacionados de una aplicación desde un solo lugar, mediante planes de escalado.',
          explanation:
            'Con un plan de escalado, AWS Auto Scaling ajusta tareas de ECS, la capacidad de tablas de DynamoDB y las réplicas de lectura de Aurora, y ofrece recomendaciones de escalado.',
          correct: true,
        },
        {
          id: 'maker-nlb-again',
          label: 'Un segundo Network Load Balancer',
          definition: 'Balanceador de capa 4 (TCP/UDP) para rendimiento extremo o una dirección IP estática.',
          explanation:
            'Otro balanceador repartiría más tráfico, pero no escala tablas de base de datos ni tareas de contenedores.',
          correct: false,
        },
      ],
    },
  ],
};
