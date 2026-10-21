import type { Mission } from '../../domain/Mission';

/**
 * Pastelería Dulce Nube: a bakery whose website crashes every December.
 * Practices elasticity, EC2 Auto Scaling, Elastic Load Balancing, Availability Zones and variable expense.
 */
export const bakeryElasticity: Mission = {
  id: 'bakery-elasticity',
  buildingId: 'bakery',
  title: 'La Navidad que tumbó la web',
  client: { name: 'Rosa Quispe', role: 'Dueña de la Pastelería Dulce Nube' },
  intro: [
    '¡Por fin llegas! Soy Rosa Quispe, dueña de la Pastelería Dulce Nube. Hace quince años que horneo panetones y tortas aquí en Lima.',
    'Hace dos años empezamos a vender por nuestra página web. Durante el año entran unas cien personas por día y todo funciona bien.',
    'Pero en diciembre... ¡en diciembre entran miles de personas por hora! Nuestro único servidor se satura y la página se cae justo cuando más vendemos.',
    'El año pasado perdimos casi la mitad de los pedidos de Navidad. Y no puedo comprar diez servidores para usarlos solo un mes. ¿Me ayudas a resolverlo?',
  ],
  outro: {
    passed: [
      '¡Lo logramos! Con Auto Scaling, el balanceador de carga y varias Zonas de Disponibilidad, la página va a aguantar toda la Navidad.',
      'Y en enero la factura bajará sola. Muchas gracias, consultor. ¡Pasa cuando quieras, siempre habrá un panetón para ti!',
    ],
    failed: [
      'Mmm... no estoy segura de que esto aguante diciembre. Algunas decisiones no me convencen.',
      'Repasa la teoría con calma y vuelve cuando quieras. ¡Aquí te espero!',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'concept',
      prompt:
        'Primero quiero entender qué necesitamos. Algo que agregue capacidad cuando llegan muchos clientes y que la quite cuando se van, sin que yo tenga que hacer nada. ¿Cómo se llama eso en la nube?',
      topicSlug: 'beneficios-de-la-nube',
      examTasks: ['1.1'],
      options: [
        {
          id: 'high-availability',
          label: 'Alta disponibilidad',
          definition: 'Capacidad de un sistema para seguir funcionando aunque falle alguno de sus componentes.',
          explanation:
            'La alta disponibilidad responde a fallas, no a cambios de demanda. Es importante, pero el problema de Rosa es que la cantidad de clientes se multiplica en diciembre.',
          correct: false,
        },
        {
          id: 'agility',
          label: 'Agilidad',
          definition: 'Capacidad del negocio para probar y lanzar ideas nuevas más rápido, porque los recursos están disponibles en minutos.',
          explanation:
            'La agilidad habla de la velocidad para experimentar e innovar, no de ajustar la capacidad automáticamente según la cantidad de clientes.',
          correct: false,
        },
        {
          id: 'elasticity',
          label: 'Elasticidad',
          definition: 'Capacidad de adquirir recursos cuando se necesitan y liberarlos cuando ya no hacen falta, idealmente de forma automática.',
          explanation:
            'Exacto. La elasticidad ajusta la capacidad a la demanda en los dos sentidos: crece en diciembre y se reduce en enero, para no pagar servidores que nadie usa.',
          correct: true,
        },
        {
          id: 'economies-of-scale',
          label: 'Economías de escala',
          definition: 'Ahorro que AWS obtiene al operar con enormes volúmenes y que traslada a sus clientes con precios más bajos.',
          explanation:
            'Las economías de escala explican por qué AWS puede bajar sus precios, pero no hacen que la tienda crezca y se reduzca con la demanda.',
          correct: false,
        },
      ],
    },
    {
      id: 'scaling-service',
      prompt:
        'Perfecto: elasticidad. Nuestra página corre en servidores virtuales de Amazon EC2. ¿Qué servicio agrega servidores automáticamente cuando suben las visitas y los quita cuando bajan?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'ec2-auto-scaling',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'Servicio que agrega o quita instancias EC2 automáticamente según reglas y métricas, y reemplaza las instancias que fallan.',
          explanation:
            'Correcto. Con un grupo de Auto Scaling defines un mínimo y un máximo de servidores: en diciembre se agregan más y en enero se quitan solos.',
          correct: true,
        },
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition: 'Servicio de monitoreo que recopila métricas y registros de tus recursos y puede disparar alarmas.',
          explanation:
            'CloudWatch mide la carga y puede avisar cuando sube, pero no agrega servidores por sí solo. De hecho, Auto Scaling puede usar métricas de CloudWatch para decidir cuándo escalar.',
          correct: false,
        },
        {
          id: 'elb',
          label: 'Elastic Load Balancing',
          definition: 'Servicio que reparte el tráfico entrante entre varios destinos, como instancias EC2.',
          explanation:
            'El balanceador reparte el tráfico entre los servidores que ya existen, pero no crea ni elimina servidores. Para eso hace falta Auto Scaling.',
          correct: false,
        },
        {
          id: 'ebs',
          label: 'Amazon EBS',
          definition: 'Almacenamiento en bloques que funciona como el disco duro de una instancia EC2.',
          explanation:
            'EBS es el disco de un servidor. Hacerlo más grande no agrega capacidad para atender a más clientes al mismo tiempo.',
          correct: false,
        },
      ],
    },
    {
      id: 'load-balancing',
      prompt:
        'Ahora vamos a tener varios servidores a la vez. ¿Cómo repartimos a los clientes entre ellos, sin mandar a nadie a un servidor que se colgó?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'ec2-auto-scaling',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'Servicio que agrega o quita instancias EC2 automáticamente según reglas y métricas, y reemplaza las instancias que fallan.',
          explanation:
            'Auto Scaling decide cuántos servidores hay, pero no reparte las visitas entre ellos. Trabaja en equipo con el balanceador: uno agrega servidores y el otro les envía tráfico.',
          correct: false,
        },
        {
          id: 's3',
          label: 'Amazon S3',
          definition: 'Almacenamiento de objetos para guardar archivos como imágenes, videos y copias de seguridad.',
          explanation: 'S3 sirve para guardar las fotos de las tortas, pero no reparte el tráfico entre servidores.',
          correct: false,
        },
        {
          id: 'backup',
          label: 'AWS Backup',
          definition: 'Servicio que centraliza y automatiza las copias de seguridad de distintos servicios de AWS.',
          explanation: 'Los respaldos protegen los datos, pero no ayudan a atender a miles de clientes al mismo tiempo.',
          correct: false,
        },
        {
          id: 'elb',
          label: 'Elastic Load Balancing',
          definition: 'Servicio que reparte el tráfico entrante entre varios destinos, como instancias EC2.',
          explanation:
            'Exacto. El balanceador reparte las visitas entre los servidores y, gracias a sus health checks, solo envía tráfico a los que están saludables.',
          correct: true,
        },
      ],
    },
    {
      id: 'availability-zones',
      prompt:
        'Me da miedo que se caiga todo el centro de datos justo en Nochebuena. ¿Dónde conviene poner los servidores para que la tienda siga funcionando?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'bigger-server',
          label: 'En un solo servidor mucho más grande',
          definition: 'Escalado vertical: reemplazar un servidor por otro con más CPU y memoria.',
          explanation:
            'Un servidor más grande soporta más carga, pero sigue siendo un único punto de falla: si se cae, se cae todo. Y en enero pagarías esa capacidad sin usarla.',
          correct: false,
        },
        {
          id: 'multi-az',
          label: 'En varias Availability Zones de una misma Región',
          definition:
            'Una Availability Zone (Zona de Disponibilidad) es uno o más centros de datos con energía, red y conectividad redundantes, aislada de las demás zonas de su Región.',
          explanation:
            'Correcto. Las Zonas de Disponibilidad no comparten puntos únicos de falla: si una se cae, los servidores de las otras siguen atendiendo. Auto Scaling y el balanceador pueden trabajar con varias zonas.',
          correct: true,
        },
        {
          id: 'single-az',
          label: 'Todos juntos en una sola Availability Zone',
          definition: 'Colocar todos los recursos en el mismo grupo de centros de datos.',
          explanation: 'Si esa zona falla, la tienda se cae entera. Para lograr alta disponibilidad se usan al menos dos zonas.',
          correct: false,
        },
        {
          id: 'edge-locations',
          label: 'En ubicaciones de borde (edge locations)',
          definition:
            'Puntos de presencia de la red de AWS cercanos a los usuarios, que usan servicios como Amazon CloudFront para entregar contenido con baja latencia.',
          explanation:
            'Las ubicaciones de borde acercan contenido a los usuarios mediante servicios como CloudFront, pero los servidores EC2 de la tienda no se ejecutan ahí.',
          correct: false,
        },
      ],
    },
    {
      id: 'variable-expense',
      prompt:
        'Última duda, y es la que más le preocupa a mi contador: ¿vamos a pagar todo el año los servidores que necesitamos en diciembre?',
      topicSlug: 'economia-de-la-nube',
      examTasks: ['1.4'],
      options: [
        {
          id: 'fixed-peak',
          label: 'Sí, pagan una cuota fija por la capacidad del pico',
          definition: 'Comprar y pagar por adelantado la capacidad pensada para el momento de mayor demanda.',
          explanation:
            'Eso es lo que ocurre con servidores propios: compras para el pico y pagas aunque no los uses. La nube evita tener que adivinar cuánta capacidad necesitarás.',
          correct: false,
        },
        {
          id: 'reserved-all-year',
          label: 'Deben comprar Reserved Instances para todo el año',
          definition: 'Descuento en instancias EC2 a cambio de un compromiso de uso de uno o tres años.',
          explanation:
            'Las Reserved Instances convienen para la carga estable de todo el año, no para un pico de un mes. Para el pico, la capacidad bajo demanda que maneja Auto Scaling es la opción natural.',
          correct: false,
        },
        {
          id: 'pay-as-you-go',
          label: 'No: pagan solo por lo que usan (gasto variable)',
          definition: 'Modelo de pago por uso: el costo sube y baja según los recursos consumidos, sin comprar equipos por adelantado.',
          explanation:
            'Correcto. La nube cambia gasto fijo por gasto variable: en diciembre pagas más servidores y en enero, cuando Auto Scaling los quita, la factura baja.',
          correct: true,
        },
        {
          id: 'free-scaling',
          label: 'No pagan nada por los servidores que agrega Auto Scaling',
          definition: 'La idea de que la capacidad que se agrega automáticamente no tiene costo.',
          explanation:
            'Auto Scaling en sí no tiene costo adicional, pero sí pagas las instancias EC2 que lanza mientras están encendidas.',
          correct: false,
        },
      ],
    },
  ],
};
