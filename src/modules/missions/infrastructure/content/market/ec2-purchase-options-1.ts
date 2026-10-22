import type { Mission } from '../../../domain/Mission';

/**
 * Mercado Central: a traditional market in Cusco whose online ordering platform runs on Amazon EC2 and pays everything On-Demand.
 * Practices choosing between Compute Savings Plans, Spot Instances and On-Demand Instances, and what happens when a Reserved Instance expires.
 */
export const ec2PurchaseOptions1: Mission = {
  id: 'ec2-purchase-options-1',
  track: 'market',
  topicSlug: 'ec2-purchase-options',
  buildingId: 'central-market',
  title: 'Cada puesto, su precio',
  client: { name: 'Rosa Condori', role: 'Administradora del Mercado Central' },
  intro: [
    '¡Pasa, pasa! Soy Rosa Condori y administro el Mercado Central de Cusco. Aquí hay más de doscientos puestos: frutas, quesos, flores, ropa de alpaca.',
    'Hace dos años lanzamos una plataforma para que los vecinos y los restaurantes hagan pedidos en línea a los puestos. Todo corre en servidores de Amazon EC2.',
    'El problema es que pagamos todos los servidores igual, a tarifa On-Demand, sin importar si funcionan todo el año, solo de noche o unos pocos días. La asociación de comerciantes dice que la factura se come las ganancias.',
    'Tengo que presentar un plan de ahorro en la próxima asamblea. Si no convence, varios puestos dejarán la plataforma. ¿Me ayudas a elegir bien cómo pagar cada servidor?',
  ],
  outro: {
    passed: [
      '¡Esto sí lo entiendo! Cada servidor tiene ahora la forma de pago que le corresponde: compromiso para lo que funciona siempre, Spot para lo que puede esperar y On-Demand para lo imprevisible.',
      'En la asamblea voy a mostrar cuánto ahorramos sin poner en riesgo los pedidos. Gracias: la próxima vez que vengas, el queso andino corre por cuenta del mercado.',
    ],
    failed: [
      'Mmm... con este plan no sé si ahorramos o si arriesgamos los pedidos de los vecinos. Algunas decisiones no me cierran.',
      'Repasa la teoría de los modelos de compra de EC2 con calma y vuelve cuando quieras. El mercado abre todos los días.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'steady-platform',
      prompt:
        'Empecemos por lo que nunca se apaga: la plataforma de pedidos funciona las 24 horas, todo el año, con un uso bastante parejo. Además, el próximo año queremos cambiar a otra familia de instancias y mover parte del sistema a AWS Lambda. ¿Cómo conseguimos descuento sin atarnos a una configuración?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'ec2-instance-sp',
          label: 'EC2 Instance Savings Plans',
          definition:
            'Compromiso de gasto en USD por hora durante 1 o 3 años, ligado a una familia de instancias en una Región, a cambio de un descuento sobre On-Demand.',
          explanation:
            'Da un buen descuento, pero exige comprometerse con una familia de instancias en una Región y no cubre AWS Lambda, justo lo que el mercado quiere cambiar.',
          correct: false,
        },
        {
          id: 'compute-sp',
          label: 'Compute Savings Plans',
          definition:
            'Compromiso de gasto en USD por hora durante 1 o 3 años que aplica a EC2 sin importar familia, tamaño, sistema operativo, tenencia o Región, y también a AWS Fargate y AWS Lambda.',
          explanation:
            'El uso es constante, así que conviene comprometerse, y este plan sigue aplicando aunque cambien de familia de instancias o pasen parte del sistema a AWS Lambda. AWS recomienda Savings Plans por esa flexibilidad.',
          correct: true,
        },
        {
          id: 'spot-platform',
          label: 'Spot Instances',
          definition:
            'Instancias que usan capacidad sobrante de EC2 con un gran descuento y que AWS puede recuperar con un aviso de dos minutos.',
          explanation:
            'La plataforma de pedidos no puede detenerse de golpe en medio de una compra. Spot es para cargas tolerantes a interrupciones, no para el servicio principal.',
          correct: false,
        },
        {
          id: 'dedicated-instances',
          label: 'Dedicated Instances',
          definition:
            'Instancias que se ejecutan en hardware dedicado a una sola cuenta de AWS, facturadas por instancia.',
          explanation:
            'El hardware dedicado responde a necesidades de aislamiento o cumplimiento que el mercado no tiene, y no es una forma de obtener descuento por uso constante.',
          correct: false,
        },
      ],
    },
    {
      id: 'nightly-reconciliation',
      prompt:
        'Cada noche corre un proceso que cruza los pedidos con el inventario de cada puesto. Si se corta a la mitad, simplemente se vuelve a lanzar y termina antes del amanecer. ¿Cómo pagamos ese servidor para ahorrar lo máximo posible?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'on-demand-nightly',
          label: 'On-Demand Instances',
          definition:
            'Instancias que se pagan por hora o por segundo de uso, sin pago inicial ni compromiso a largo plazo.',
          explanation:
            'On-Demand es el precio base, sin descuento. Funciona, pero desperdicia la ventaja de que este proceso tolera interrupciones.',
          correct: false,
        },
        {
          id: 'capacity-reservation-nightly',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservas de capacidad de EC2 en una Availability Zone específica por el tiempo que se necesite.',
          explanation:
            'Garantizan capacidad, pero por sí solas no dan descuento. El proceso nocturno no necesita capacidad garantizada: puede reintentarse.',
          correct: false,
        },
        {
          id: 'dedicated-host-nightly',
          label: 'Dedicated Hosts',
          definition:
            'Un servidor físico completo dedicado a un cliente, con visibilidad de sockets y núcleos, facturado por host.',
          explanation:
            'Sirven para licencias por socket o núcleo o para cumplimiento. Un proceso de inventario que puede repetirse no necesita un servidor físico propio.',
          correct: false,
        },
        {
          id: 'spot-nightly',
          label: 'Spot Instances',
          definition:
            'Instancias que usan capacidad sobrante de EC2 con descuentos de hasta el 90 % frente a On-Demand y que pueden interrumpirse con un aviso de dos minutos.',
          explanation:
            'El proceso tolera interrupciones: si AWS recupera la instancia, se vuelve a lanzar y termina igual antes del amanecer. Es el caso ideal para el mayor descuento.',
          correct: true,
        },
      ],
    },
    {
      id: 'festival-week',
      prompt:
        'En junio llega la semana del Inti Raymi. Los pedidos se disparan, pero cada año es distinto y nadie puede predecir cuánto. Necesitamos servidores extra solo esos días, que no se corten y sin firmar nada a largo plazo. ¿Cómo los pagamos?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'on-demand-festival',
          label: 'On-Demand Instances',
          definition:
            'Instancias que se pagan por hora o por segundo de uso, sin pago inicial ni compromiso a largo plazo, y que no se interrumpen.',
          explanation:
            'Es la opción para cargas cortas, impredecibles y que no pueden interrumpirse: el mercado paga solo los días del festival y no se compromete a ningún plazo.',
          correct: true,
        },
        {
          id: 'standard-ri-festival',
          label: 'Standard Reserved Instances por 1 año',
          definition:
            'Descuento de facturación por 1 o 3 años aplicado a instancias que coinciden con ciertos atributos; no se puede cancelar.',
          explanation:
            'Obliga a pagar un año completo de compromiso por servidores que solo se usan una semana. El descuento no compensa los meses sin uso.',
          correct: false,
        },
        {
          id: 'spot-festival',
          label: 'Spot Instances',
          definition:
            'Capacidad sobrante de EC2 con gran descuento que AWS puede recuperar con un aviso de dos minutos.',
          explanation:
            'En la semana de más pedidos del año, perder servidores de golpe significaría perder ventas. Esta carga no tolera interrupciones.',
          correct: false,
        },
        {
          id: 'instance-sp-festival',
          label: 'EC2 Instance Savings Plans por 1 año',
          definition:
            'Compromiso de gasto en USD por hora durante 1 o 3 años en una familia de instancias de una Región, a cambio de descuento.',
          explanation:
            'Exige un compromiso de al menos un año para una necesidad de pocos días y de tamaño desconocido. No encaja con la regla de no firmar nada a largo plazo.',
          correct: false,
        },
      ],
    },
    {
      id: 'expired-ri',
      prompt:
        'Una última duda. Hace un año el contador compró una Reserved Instance para el servidor de cobros de los puestos, y vence la próxima semana. Tiene miedo de que el servidor se apague ese día. ¿Qué va a pasar?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'ri-auto-renews',
          label: 'La Reserved Instance se renueva sola por otro año',
          definition:
            'La idea de que un compromiso de Reserved Instance se extiende automáticamente al terminar su plazo.',
          explanation:
            'Una Reserved Instance no se renueva sola. Si el mercado quiere el descuento de nuevo, tiene que comprar otra o pasar a un Savings Plan.',
          correct: false,
        },
        {
          id: 'server-stops',
          label: 'AWS detiene el servidor hasta que compren otra Reserved Instance',
          definition:
            'La idea de que la Reserved Instance es el servidor mismo y que, sin ella, la instancia deja de funcionar.',
          explanation:
            'Una Reserved Instance es un descuento de facturación, no un servidor. Su vencimiento no detiene ninguna instancia.',
          correct: false,
        },
        {
          id: 'runs-on-demand',
          label: 'El servidor sigue funcionando, pero se cobra a tarifa On-Demand',
          definition:
            'Comportamiento de una instancia cuando termina el plazo del descuento de facturación que la cubría.',
          explanation:
            'La Reserved Instance solo era un descuento aplicado a una instancia que coincidía. Al vencer, el servidor sigue igual y se cobra a tarifa On-Demand, así que conviene planear la siguiente compra.',
          correct: true,
        },
        {
          id: 'becomes-spot',
          label: 'El servidor pasa a cobrarse como Spot Instance',
          definition:
            'Opción de compra que usa capacidad sobrante de EC2 con descuento y que puede interrumpirse.',
          explanation:
            'Spot es otra opción de compra que se elige de forma explícita. Una Reserved Instance vencida no convierte la instancia en Spot.',
          correct: false,
        },
      ],
    },
  ],
};
