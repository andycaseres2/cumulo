import type { ServiceFamily } from '../../domain/ServiceFamily';

export const integrationFamily: ServiceFamily = {
  id: 'integration',
  title: 'Integración de aplicaciones',
  summary:
    'Cola que se consume a su ritmo (SQS), mensaje empujado a muchos suscriptores (SNS), bus que enruta eventos con reglas (EventBridge), flujo de pasos con estado (Step Functions); y para hablar con clientes, correo (SES) o centro de contacto (Connect).',
  services: [
    {
      name: 'Amazon SQS',
      summary: 'Cola de mensajes: desacopla componentes y los consumidores sacan mensajes a su ritmo (pull).',
    },
    {
      name: 'Amazon SNS',
      summary: 'Publicar y suscribir: un mensaje en un tema se empuja a muchos suscriptores a la vez (fan-out).',
    },
    {
      name: 'Amazon EventBridge',
      summary: 'Bus de eventos sin servidores: recibe eventos de AWS, SaaS o tus apps y los enruta con reglas; también programa tareas.',
    },
    {
      name: 'AWS Step Functions',
      summary: 'Orquesta flujos de trabajo de varios pasos con estado, decisiones, reintentos y esperas de aprobación.',
    },
    {
      name: 'Amazon SES',
      summary: 'Envía y recibe correo electrónico transaccional y de marketing desde tu propio dominio.',
    },
    {
      name: 'Amazon Connect',
      summary: 'Centro de contacto en la nube: números, menús de voz, chat y enrutamiento a agentes, pagando por uso.',
    },
  ],
  cards: [
    {
      id: 'integration-1',
      prompt:
        'Una panadería de Arequipa recibe pedidos web y, en las horas pico, el sistema de cocina se satura. Quieres que cada pedido espere en fila hasta que la cocina pueda tomarlo, sin perder ninguno. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon SNS',
          why: 'SNS empuja cada mensaje a sus suscriptores al instante; no guarda los pedidos para que la cocina los saque a su propio ritmo.',
        },
        {
          service: 'Amazon SQS',
          why: 'Correcto: una cola guarda cada pedido hasta que la app de cocina lo pide (pull). Así desacoplas la web de la cocina y absorbes los picos.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Step Functions orquesta flujos de varios pasos con estado; aquí no hay pasos que coordinar, solo pedidos que deben esperar en fila.',
        },
      ],
      answer: 'Amazon SQS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-2',
      prompt:
        'Una clínica de Medellín publica un resultado de laboratorio y, en ese mismo momento, debe avisar al paciente por SMS, al médico por correo y a la app de facturación. ¿Qué servicio entrega un mismo mensaje a todos a la vez?',
      options: [
        {
          service: 'Amazon SQS',
          why: 'Una cola entrega cada mensaje a un solo consumidor que lo pide; no reparte el aviso a varios destinos ni envía SMS.',
        },
        {
          service: 'Amazon SES',
          why: 'SES solo trabaja con correo electrónico; no manda SMS ni notifica a otra aplicación al mismo tiempo.',
        },
        {
          service: 'Amazon SNS',
          why: 'Correcto: publicas una vez en un tema y SNS lo empuja a todos los suscriptores, como SMS, correo o un endpoint HTTP (fan-out).',
        },
      ],
      answer: 'Amazon SNS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-3',
      prompt:
        'Una startup de Guadalajara usa una app SaaS de tickets de soporte. Quiere que los eventos de esa app lleguen a AWS y que, según su contenido (urgente o normal), vayan a funciones distintas, sin escribir código de integración.',
      options: [
        {
          service: 'Amazon EventBridge',
          why: 'Correcto: EventBridge recibe eventos de socios SaaS, de servicios de AWS y de tus apps, y con reglas los filtra por contenido y los envía al destino correcto.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS reparte lo que tu app publica en un tema; no recibe de forma nativa los eventos de apps SaaS ni los enruta con reglas como un bus de eventos.',
        },
        {
          service: 'Amazon SQS',
          why: 'Una cola solo guarda mensajes hasta que alguien los consume; no recibe eventos de terceros ni decide a qué destino va cada uno.',
        },
      ],
      answer: 'Amazon EventBridge',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-4',
      prompt:
        'Un colegio de Quito necesita que una función genere el reporte de asistencia todas las noches a las 2:00, sin mantener un servidor encendido solo para lanzar esa tarea programada. ¿Qué servicio la dispara?',
      options: [
        {
          service: 'AWS Step Functions',
          why: 'Step Functions coordina los pasos de un flujo una vez iniciado, pero no es el programador por horario; alguien tiene que lanzarlo.',
        },
        {
          service: 'Amazon SQS',
          why: 'Una cola guarda mensajes para consumirlos después; no ejecuta nada a una hora fija.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'Correcto: EventBridge Scheduler crea tareas con expresiones cron o de frecuencia y llama a tu función a la hora indicada, sin servidores.',
        },
      ],
      answer: 'Amazon EventBridge',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-5',
      prompt:
        'Una aseguradora de Santiago procesa solicitudes: valida documentos, revisa el historial y, si el monto es alto, espera la aprobación de una persona antes de emitir la póliza. Quiere reintentos y ver en qué paso va cada solicitud.',
      options: [
        {
          service: 'Amazon SQS',
          why: 'Una cola mueve mensajes entre componentes, pero no recuerda en qué paso va cada solicitud ni toma decisiones.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS envía notificaciones a suscriptores; no coordina pasos en orden ni espera una aprobación para continuar.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'EventBridge enruta eventos según reglas, pero no mantiene el estado de un proceso de varios pasos con decisiones y esperas.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Correcto: Step Functions orquesta pasos con estado, decisiones, reintentos y esperas de aprobación humana, y muestra cada ejecución de forma visual.',
        },
      ],
      answer: 'AWS Step Functions',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-6',
      prompt:
        'Una empresa de logística de Lima tiene cuatro funciones: reservar stock, cobrar, asignar transporte y emitir guía. Deben correr en orden, algunas en paralelo, y si el cobro falla hay que deshacer la reserva. ¿Qué usas para coordinarlas?',
      options: [
        {
          service: 'AWS Step Functions',
          why: 'Correcto: defines el flujo como máquina de estados, con pasos en paralelo y captura de errores que ejecuta pasos alternativos, como deshacer la reserva.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'EventBridge reacciona a eventos y los enruta, pero no lleva el orden de los pasos ni ejecuta una compensación cuando uno falla.',
        },
        {
          service: 'Amazon SQS',
          why: 'Con colas podrías pasar mensajes entre funciones, pero tendrías que programar tú el orden, el paralelismo y el manejo de errores.',
        },
      ],
      answer: 'AWS Step Functions',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-7',
      prompt:
        'Una tienda online de Bogotá quiere enviar confirmaciones de compra y un boletín mensual desde su propio dominio, y además recibir las respuestas de sus clientes por correo. ¿Qué servicio eliges?',
      options: [
        {
          service: 'Amazon Connect',
          why: 'Connect es un centro de contacto para llamadas y chat con agentes; no es una plataforma para enviar boletines por correo.',
        },
        {
          service: 'Amazon SES',
          why: 'Correcto: SES envía correo transaccional y de marketing desde tu dominio, y también puede recibir correos para procesarlos.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS puede mandar avisos por correo a suscriptores confirmados de un tema, pero no es una plataforma de correo transaccional y de marketing.',
        },
      ],
      answer: 'Amazon SES',
      topicSlug: 'business-apps-desktops-and-iot',
    },
    {
      id: 'integration-8',
      prompt:
        'Un centro médico de Córdoba quiere una central telefónica en la nube: un número, un menú de voz para elegir especialidad y que cada llamada llegue a la recepcionista disponible, pagando solo por uso. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon SNS',
          why: 'SNS envía notificaciones, incluso SMS, pero no atiende llamadas entrantes ni las enruta a personas.',
        },
        {
          service: 'Amazon SES',
          why: 'SES envía y recibe correo electrónico; no gestiona llamadas telefónicas ni menús de voz.',
        },
        {
          service: 'Amazon Connect',
          why: 'Correcto: Connect es un centro de contacto en la nube con números, flujos de voz y enrutamiento a agentes, y pagas por lo que usas.',
        },
      ],
      answer: 'Amazon Connect',
      topicSlug: 'business-apps-desktops-and-iot',
    },
    {
      id: 'integration-9',
      prompt:
        'Una cooperativa de ahorro de Cochabamba registra movimientos de cuentas. Un proceso debe tomarlos uno por uno, en el orden exacto en que llegaron y sin procesar ninguno dos veces. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon SQS',
          why: 'Correcto: una cola FIFO conserva el orden de llegada y ofrece procesamiento exactamente una vez, y el proceso saca los movimientos a su ritmo.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS empuja mensajes a suscriptores; no deja que un proceso saque los movimientos uno por uno a su ritmo. Lo que buscas es una cola.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'EventBridge enruta eventos a destinos según reglas; no es la cola de la que un proceso consume en orden estricto.',
        },
      ],
      answer: 'Amazon SQS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-10',
      prompt:
        'Una cadena de gimnasios de Monterrey quiere avisar con una notificación push en el celular a quienes usan su app cuando se cancela una clase. ¿Qué servicio envía ese aviso?',
      options: [
        {
          service: 'Amazon SES',
          why: 'SES envía correo electrónico; no entrega notificaciones push a una aplicación móvil.',
        },
        {
          service: 'Amazon SNS',
          why: 'Correcto: SNS envía notificaciones push móviles, SMS y correo a muchos suscriptores a la vez.',
        },
        {
          service: 'Amazon SQS',
          why: 'Una cola guarda mensajes para que otro componente los consuma; no los empuja al celular de las personas.',
        },
      ],
      answer: 'Amazon SNS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-11',
      prompt:
        'Un estudio de fotos de Valparaíso recibe miles de imágenes para retocar. Varios servidores las procesan y, si uno falla a mitad del trabajo, la tarea debe volver a estar disponible para otro. ¿Qué servicio reparte el trabajo?',
      options: [
        {
          service: 'AWS Step Functions',
          why: 'Step Functions coordina flujos de pasos, pero repartir tareas sueltas entre muchos servidores que las piden es trabajo de una cola.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS empuja cada mensaje a todos los suscriptores; aquí cada imagen debe procesarla un solo servidor.',
        },
        {
          service: 'Amazon SQS',
          why: 'Correcto: cada servidor saca un mensaje de la cola; si no lo borra antes de que venza el tiempo de visibilidad, el mensaje vuelve a estar disponible.',
        },
      ],
      answer: 'Amazon SQS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-12',
      prompt:
        'Una universidad de Montevideo quiere que, cada vez que alguien detenga una instancia EC2 de sus laboratorios, se ejecute automáticamente una función que registre el cambio. ¿Qué servicio detecta ese cambio y lanza la función?',
      options: [
        {
          service: 'Amazon SQS',
          why: 'Una cola no detecta cambios en tus recursos; solo guarda los mensajes que alguien le envía.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'Correcto: los servicios de AWS emiten eventos, como el cambio de estado de una instancia, y una regla de EventBridge los envía a tu función.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS entrega lo que alguien publica en un tema; no recibe por sí mismo los eventos de cambio de estado de tus recursos.',
        },
      ],
      answer: 'Amazon EventBridge',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-13',
      prompt:
        'Una tienda de Asunción publica un mensaje cuando se paga un pedido. Inventario, facturación y envíos deben recibir cada uno su copia en su propia cola para procesarla a su ritmo. ¿Qué servicio hace la copia a las tres colas?',
      options: [
        {
          service: 'Amazon SNS',
          why: 'Correcto: es el patrón fan-out. Publicas una vez en un tema y SNS envía una copia a cada cola suscrita.',
        },
        {
          service: 'Amazon SQS',
          why: 'Cada cola guarda los mensajes de un consumidor; la cola por sí sola no duplica el pedido hacia otras colas.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Step Functions coordina pasos de un flujo; para que un mensaje llegue a varias colas a la vez basta un tema de publicar y suscribir.',
        },
      ],
      answer: 'Amazon SNS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-14',
      prompt:
        'Una editorial de San José, Costa Rica, contrata personal con un proceso de días: crear la cuenta, esperar la firma del contrato, asignar equipo y avisar al área. Necesita que el proceso recuerde en qué paso está mientras espera.',
      options: [
        {
          service: 'Amazon SES',
          why: 'SES puede enviar el correo de bienvenida, pero no coordina los pasos ni recuerda dónde va el proceso.',
        },
        {
          service: 'Amazon SQS',
          why: 'Una cola guarda mensajes por un tiempo limitado; no lleva el estado de un proceso con pasos, esperas y decisiones.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Correcto: un flujo Standard de Step Functions puede durar hasta un año, guarda el estado de cada paso y puede esperar una respuesta externa.',
        },
      ],
      answer: 'AWS Step Functions',
      topicSlug: 'application-integration',
    },
  ],
};
