import type { Mission } from '../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a video game store in Lima whose online preorders collapse at every console launch.
 * Practices decoupling with Amazon SQS (Standard versus FIFO), fan-out with Amazon SNS and orchestration with AWS Step Functions.
 */
export const applicationIntegration1: Mission = {
  id: 'application-integration-1',
  track: 'tech',
  topicSlug: 'application-integration',
  buildingId: 'gaming-store',
  title: 'La preventa de medianoche',
  client: { name: 'Renzo Chávez', role: 'Dueño de la Tienda Gamer Pixel' },
  intro: [
    '¡Te damos la bienvenida a Pixel! Soy Renzo Chávez. Tengo esta tienda de videojuegos en Lima y también vendemos en línea a todo el Perú.',
    'En el último lanzamiento de consola abrimos la preventa a medianoche. En cinco minutos entraron miles de pedidos, el servicio de pagos se cayó y con él se cayó todo: carrito, inventario, confirmaciones.',
    'Perdimos pedidos, algunos clientes pagaron dos veces y otros nunca supieron si su consola estaba reservada. Las redes sociales no nos perdonaron.',
    'En dos meses sale otra consola y no puedo repetir el desastre. Me dijeron que hay que "desacoplar" la aplicación. ¿Me ayudas a hacerlo bien?',
  ],
  outro: {
    passed: [
      '¡Esto es otro nivel! Los pedidos esperan en su cola sin perderse, las reservas respetan el orden de llegada y cada confirmación llega a todos los que la necesitan.',
      'Y el proceso de pago sigue su flujo paso a paso, con reintentos. Que venga la próxima medianoche: estamos listos. ¡Gracias!',
    ],
    failed: [
      'Hmm... con estas decisiones creo que la próxima preventa volvería a tumbarnos.',
      'Repasa la teoría de integración de aplicaciones y vuelve. Te guardo una consola de las buenas.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'absorb-peak',
      prompt:
        'Primer problema: a medianoche entran miles de pedidos de golpe y el servicio de pagos no da abasto. Quiero que los pedidos queden guardados hasta que los servidores de pago puedan procesarlos a su ritmo, sin perder ninguno. ¿Qué servicio uso?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-peak',
          label: 'Amazon SNS',
          definition:
            'Servicio administrado de mensajería pub/sub que empuja cada mensaje publicado en un tema a todos sus suscriptores.',
          explanation:
            'SNS empuja los mensajes a los suscriptores en cuanto se publican. Lo que necesitas es que los pedidos esperen guardados hasta que pagos los saque a su ritmo, y eso es una cola.',
          correct: false,
        },
        {
          id: 'sqs-peak',
          label: 'Amazon SQS',
          definition:
            'Servicio totalmente administrado de colas de mensajes: los productores envían mensajes a una cola y los consumidores los sacan cuando pueden procesarlos.',
          explanation:
            'SQS desacopla la tienda del servicio de pagos: los pedidos se guardan en la cola sin perderse y los servidores de pago los sacan a su ritmo, aunque el pico sea enorme.',
          correct: true,
        },
        {
          id: 'step-functions-peak',
          label: 'AWS Step Functions',
          definition:
            'Servicio que coordina los componentes de una aplicación distribuida mediante flujos de trabajo visuales con pasos, decisiones y reintentos.',
          explanation:
            'Step Functions coordina pasos en orden. Para absorber un pico de carga y guardar los pedidos hasta que alguien los procese, la pieza indicada es una cola de SQS.',
          correct: false,
        },
        {
          id: 'eventbridge-peak',
          label: 'Amazon EventBridge',
          definition:
            'Bus de eventos serverless que recibe eventos de aplicaciones, servicios de AWS y SaaS, y los enruta con reglas hacia destinos.',
          explanation:
            'EventBridge enruta eventos según reglas hacia sus destinos. Guardar los pedidos para que pagos los vaya sacando a su ritmo es el patrón de cola de SQS.',
          correct: false,
        },
      ],
    },
    {
      id: 'preorder-order',
      prompt:
        'Ahora lo delicado: tenemos solo 300 consolas para la preventa. Las reservas tienen que procesarse en el orden exacto en que llegaron y cada una una sola vez, para que nadie pague dos veces. ¿Qué tipo de cola o servicio necesito?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sqs-standard-order',
          label: 'Una cola Standard de Amazon SQS',
          definition:
            'Tipo de cola de SQS con máximo rendimiento, orden de mejor esfuerzo y entrega al menos una vez.',
          explanation:
            'Es la trampa típica: una cola Standard ordena con mejor esfuerzo y entrega al menos una vez, así que un mensaje podría llegar duplicado o fuera de orden.',
          correct: false,
        },
        {
          id: 'sns-topic-order',
          label: 'Un tema estándar de Amazon SNS',
          definition:
            'Canal pub/sub donde un publicador envía mensajes que SNS empuja a todos los suscriptores.',
          explanation:
            'Un tema de SNS reparte cada mensaje a muchos suscriptores, pero no guarda las reservas en una fila para procesarlas una a una en orden.',
          correct: false,
        },
        {
          id: 'eventbridge-rule-order',
          label: 'Una regla de Amazon EventBridge',
          definition:
            'Regla del bus de eventos que filtra eventos según un patrón y los envía a uno o más destinos.',
          explanation:
            'Una regla de EventBridge filtra y enruta eventos, pero lo que pides es una fila que respete el orden de llegada y procese cada reserva exactamente una vez.',
          correct: false,
        },
        {
          id: 'sqs-fifo-order',
          label: 'Una cola FIFO de Amazon SQS',
          definition:
            'Tipo de cola de SQS (first in, first out) que procesa los mensajes exactamente una vez y en el orden exacto en que se enviaron.',
          explanation:
            'Una cola FIFO respeta el orden exacto de llegada y procesa cada mensaje exactamente una vez: así las 300 consolas van a los primeros en reservar y nadie paga dos veces.',
          correct: true,
        },
      ],
    },
    {
      id: 'confirmation-fanout',
      prompt:
        'Cuando una reserva se confirma, el mismo aviso tiene que llegar a la vez a la cola de facturación, a la cola de despacho del almacén y al celular del cliente como SMS. ¿Qué servicio reparte ese mensaje?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-fanout',
          label: 'Amazon SNS',
          definition:
            'Servicio administrado de mensajería pub/sub que empuja cada mensaje de un tema a todos sus suscriptores, como colas de SQS, funciones Lambda, SMS o correo.',
          explanation:
            'Es un fan-out: publicas la confirmación en un tema de SNS y este la empuja a la cola de facturación, a la cola de despacho y al cliente como SMS, todo con un solo mensaje.',
          correct: true,
        },
        {
          id: 'sqs-single-fanout',
          label: 'Una sola cola de Amazon SQS',
          definition:
            'Cola de mensajes donde los productores dejan mensajes y un consumidor los saca para procesarlos.',
          explanation:
            'En una cola, cada mensaje lo saca un consumidor para procesarlo. Para que el mismo aviso llegue a varios destinos y a una persona por SMS se usa SNS.',
          correct: false,
        },
        {
          id: 'ses-fanout',
          label: 'Amazon SES',
          definition:
            'Servicio para enviar correos electrónicos de negocio con tu propio dominio, como confirmaciones de compra o boletines.',
          explanation:
            'SES envía correos de negocio, pero el caso pide repartir el mismo mensaje a dos colas y a un SMS. Ese reparto a muchos suscriptores es de SNS.',
          correct: false,
        },
        {
          id: 'scheduled-fanout',
          label: 'Una programación de Amazon EventBridge que se ejecute cada hora',
          definition:
            'Tarea automatizada que EventBridge dispara según un horario, por ejemplo cada hora o cada día.',
          explanation:
            'Una tarea programada corre cada cierto tiempo, no en el momento en que se confirma cada reserva, y no reparte el aviso a las colas ni al cliente.',
          correct: false,
        },
      ],
    },
    {
      id: 'payment-workflow',
      prompt:
        'Último paso, el cobro. Primero se cobra la tarjeta; si se aprueba, se reserva la consola y se asigna el despacho; si se rechaza, se avisa al cliente. Y si el banco no responde, hay que reintentar. Quiero ver ese proceso y saber en qué paso quedó cada pedido. ¿Qué uso?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-workflow',
          label: 'Amazon SNS',
          definition:
            'Servicio de mensajería pub/sub que publica un mensaje en un tema y lo empuja a todos sus suscriptores.',
          explanation:
            'SNS reparte mensajes, pero no coordina pasos en orden ni toma decisiones según si el pago fue aprobado o rechazado.',
          correct: false,
        },
        {
          id: 'sqs-fifo-workflow',
          label: 'Una cola FIFO de Amazon SQS',
          definition:
            'Cola de SQS que procesa los mensajes exactamente una vez y en el orden en que se enviaron.',
          explanation:
            'La cola FIFO ordena mensajes, pero no define un proceso con decisiones, reintentos y el estado de cada paso. Para orquestar eso se usa Step Functions.',
          correct: false,
        },
        {
          id: 'step-functions-workflow',
          label: 'AWS Step Functions',
          definition:
            'Servicio totalmente administrado que coordina componentes de aplicaciones distribuidas con flujos de trabajo visuales, reintentos y registro del estado de cada paso.',
          explanation:
            'Step Functions organiza el cobro como una serie de pasos con decisiones (aprobado o rechazado), reintenta cuando hay errores y registra el estado de cada paso para que veas dónde quedó cada pedido.',
          correct: true,
        },
        {
          id: 'eventbridge-workflow',
          label: 'Amazon EventBridge',
          definition:
            'Bus de eventos serverless que recibe eventos y los envía a destinos según reglas de enrutamiento.',
          explanation:
            'EventBridge reacciona a eventos con reglas, pero no orquesta un proceso de varios pasos con decisiones y estado. Esa es la función de Step Functions.',
          correct: false,
        },
      ],
    },
  ],
};
