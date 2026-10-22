import type { Mission } from '../../../domain/Mission';

/**
 * Taller Maker 3D: a 3D printing workshop in Montevideo whose web orders vanish whenever the printer controller restarts.
 * Practices loose coupling, Amazon EventBridge with SaaS events, Amazon SNS alerts to people and SQS Standard delivery semantics.
 */
export const applicationIntegration2: Mission = {
  id: 'application-integration-2',
  track: 'tech',
  topicSlug: 'application-integration',
  buildingId: 'maker-workshop',
  title: 'Piezas que se pierden en el camino',
  client: { name: 'Lucía Pereyra', role: 'Cofundadora del Taller Maker 3D' },
  intro: [
    'Hola, perdón el ruido de las impresoras. Soy Lucía Pereyra, cofundadora del Taller Maker 3D, aquí en Montevideo. Imprimimos en 3D repuestos, prototipos y piezas a medida.',
    'Recibimos pedidos de dos lados: un formulario en nuestra web y nuestra tienda en Shopify. Un programa controlador reparte los trabajos entre las doce impresoras.',
    'El problema: cada vez que el controlador se reinicia, los pedidos que llegan en ese momento se pierden. Otras veces una pieza se imprime dos veces, y nadie se entera cuando una impresión falla de madrugada.',
    'Una empresa de dispositivos médicos nos quiere como proveedor fijo, pero solo si somos confiables. ¿Me ayudas a que las piezas no se pierdan en el camino?',
  ],
  outro: {
    passed: [
      '¡Increíble! Ahora la web y el controlador están desacoplados, los pedidos de Shopify llegan solos con sus reglas y el técnico de turno recibe un aviso cuando algo falla.',
      'Y por fin entiendo por qué se duplicaban piezas. Con esto firmamos con la empresa médica. ¡Gracias!',
    ],
    failed: [
      'Mmm... con estas decisiones seguiríamos perdiendo piezas en el camino.',
      'Repasa la teoría de integración de aplicaciones y vuelve. Te imprimo un llavero cuando regreses.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'decouple-controller',
      prompt:
        'Hoy el formulario web llama directamente al controlador de impresoras y espera su respuesta. Si el controlador se reinicia, el pedido se pierde. ¿Qué principio de arquitectura debería aplicar?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'bigger-server',
          label: 'Poner el controlador en un servidor más grande para que se reinicie menos',
          definition:
            'Escalado vertical: aumentar la capacidad de una sola máquina, con más CPU o más memoria.',
          explanation:
            'Un servidor más grande no cambia que la web dependa del controlador: si se reinicia por cualquier motivo, los pedidos de ese momento se siguen perdiendo.',
          correct: false,
        },
        {
          id: 'single-program',
          label: 'Juntar la web y el controlador en un solo programa',
          definition:
            'Arquitectura en la que todas las funciones viven en una misma aplicación y se llaman directamente entre sí.',
          explanation:
            'Juntarlos acopla aún más los componentes: una falla en cualquier parte arrastra a todo el sistema, que es justo lo que quieres evitar.',
          correct: false,
        },
        {
          id: 'loose-coupling',
          label: 'Desacoplar: que la web deje cada pedido como mensaje y el controlador lo procese cuando pueda',
          definition:
            'Arquitectura débilmente acoplada (loosely coupled): los componentes se comunican mediante mensajes en lugar de llamarse directamente.',
          explanation:
            'Al desacoplar, la web deja el pedido como mensaje, por ejemplo en una cola, y el controlador lo procesa cuando vuelve. Si un componente falla, los demás siguen funcionando y cada uno escala por su cuenta.',
          correct: true,
        },
        {
          id: 'wait-longer',
          label: 'Hacer que la web espere más tiempo la respuesta del controlador',
          definition:
            'Ajuste del tiempo máximo que un componente espera la respuesta de otro antes de dar la llamada por fallida.',
          explanation:
            'Esperar más mantiene a la web dependiendo del controlador. Si este está caído, el pedido igual se pierde; el problema es el acoplamiento.',
          correct: false,
        },
      ],
    },
    {
      id: 'shopify-events',
      prompt:
        'Ahora la tienda en Shopify. Cada vez que entra un pedido, queremos que solo los pedidos de impresión en resina vayan a una función de AWS Lambda que prepara el archivo. Necesito recibir esos eventos de Shopify y filtrarlos con reglas. ¿Qué uso?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'eventbridge-shopify',
          label: 'Amazon EventBridge',
          definition:
            'Bus de eventos serverless que recibe eventos de tus aplicaciones, de servicios de AWS y de aplicaciones SaaS integradas, y los enruta con reglas de filtrado.',
          explanation:
            'EventBridge recibe eventos de aplicaciones SaaS integradas como Shopify, y sus reglas filtran solo los pedidos de resina para enviarlos a la función Lambda.',
          correct: true,
        },
        {
          id: 'sqs-shopify',
          label: 'Amazon SQS',
          definition:
            'Servicio administrado de colas donde los mensajes esperan hasta que un consumidor los saca y los procesa.',
          explanation:
            'SQS guarda mensajes para que un consumidor los saque, pero no recibe eventos de una aplicación SaaS ni los filtra con reglas de enrutamiento.',
          correct: false,
        },
        {
          id: 'step-functions-shopify',
          label: 'AWS Step Functions',
          definition:
            'Servicio que coordina varios pasos de una aplicación distribuida mediante flujos de trabajo visuales.',
          explanation:
            'Step Functions orquesta procesos de varios pasos. Recibir eventos de una aplicación SaaS y filtrarlos con reglas es la función principal de EventBridge.',
          correct: false,
        },
        {
          id: 'sns-shopify',
          label: 'Amazon SNS',
          definition:
            'Servicio de mensajería pub/sub que empuja los mensajes publicados en un tema a todos sus suscriptores.',
          explanation:
            'SNS reparte lo que se publica en un tema, pero lo que necesitas es recibir eventos de Shopify y filtrarlos con reglas, el trabajo de EventBridge.',
          correct: false,
        },
      ],
    },
    {
      id: 'alert-technician',
      prompt:
        'Cuando una impresión falla de madrugada, nadie se entera hasta la mañana y perdemos horas. Quiero que el técnico de turno reciba un SMS y un correo en cuanto ocurra. ¿Qué servicio envía esos avisos?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sqs-alert',
          label: 'Amazon SQS',
          definition:
            'Servicio de colas de mensajes donde un consumidor saca los mensajes para procesarlos a su ritmo.',
          explanation:
            'Es la trampa típica: una cola guarda mensajes para otro componente, pero no avisa a una persona. Las notificaciones por SMS y correo son de SNS.',
          correct: false,
        },
        {
          id: 'step-functions-alert',
          label: 'AWS Step Functions',
          definition:
            'Servicio que coordina pasos en orden, con decisiones y reintentos, mediante flujos de trabajo visuales.',
          explanation:
            'Step Functions coordina procesos de varios pasos, pero el aviso a una persona por SMS y correo es un trabajo de SNS.',
          correct: false,
        },
        {
          id: 'kinesis-alert',
          label: 'Amazon Kinesis Data Streams',
          definition:
            'Servicio para capturar flujos de datos en tiempo real, como telemetría o logs de aplicaciones.',
          explanation:
            'Kinesis Data Streams captura datos en streaming para procesarlos. No envía alertas por SMS ni por correo al técnico de turno.',
          correct: false,
        },
        {
          id: 'sns-alert',
          label: 'Amazon SNS',
          definition:
            'Servicio administrado pub/sub que empuja mensajes a sus suscriptores, incluidas personas por SMS, correo electrónico y notificaciones push móviles.',
          explanation:
            'Para alertas y notificaciones a personas, la respuesta es SNS: el técnico se suscribe al tema por SMS y por correo y recibe el aviso en cuanto se publica la falla.',
          correct: true,
        },
      ],
    },
    {
      id: 'duplicate-prints',
      prompt:
        'Última duda. Ya usamos una cola Standard de Amazon SQS para los trabajos, y de vez en cuando una pieza se imprime dos veces. Mi socio dice que SQS está fallado. ¿Qué está pasando?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sqs-broken',
          label: 'SQS está perdiendo y reenviando mensajes por un error; hay que abrir un caso de soporte',
          definition:
            'Hipótesis de que el servicio de colas tiene una falla que provoca reenvíos inesperados.',
          explanation:
            'No es una falla: la cola Standard está diseñada para entregar al menos una vez, así que un mensaje duplicado es un comportamiento esperado.',
          correct: false,
        },
        {
          id: 'at-least-once',
          label: 'Una cola Standard entrega al menos una vez; una cola FIFO procesa cada mensaje exactamente una vez y en orden',
          definition:
            'Diferencia entre los tipos de cola de SQS: Standard prioriza el rendimiento con entrega al menos una vez; FIFO garantiza orden exacto y procesamiento exactamente una vez.',
          explanation:
            'Con una cola Standard un mensaje podría llegar duplicado. Si cada trabajo debe imprimirse una sola vez, la cola FIFO procesa cada mensaje exactamente una vez y en el orden en que se envió.',
          correct: true,
        },
        {
          id: 'standard-exactly-once',
          label: 'La cola Standard garantiza exactamente una vez; el error está en las impresoras',
          definition:
            'Afirmación sobre las garantías de entrega de la cola Standard de SQS.',
          explanation:
            'Es al revés: la cola Standard entrega al menos una vez y con orden de mejor esfuerzo. La garantía de exactamente una vez es de las colas FIFO.',
          correct: false,
        },
        {
          id: 'switch-to-sns',
          label: 'Cambiar la cola por un tema de SNS, que entrega cada trabajo a una sola impresora',
          definition:
            'Uso de un tema pub/sub para distribuir trabajos entre los componentes que lo procesan.',
          explanation:
            'SNS empuja cada mensaje a todos los suscriptores. Con varias impresoras suscritas, el mismo trabajo llegaría a todas, lo contrario de lo que buscas.',
          correct: false,
        },
      ],
    },
  ],
};
