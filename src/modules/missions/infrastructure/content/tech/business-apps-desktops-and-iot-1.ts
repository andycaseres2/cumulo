import type { Mission } from '../../../domain/Mission';

/**
 * Atiende Sur: a customer-service outsourcing company in Santiago de Chile opening a new operation for a telecom client.
 * Practices Amazon Connect, WorkSpaces Pools, Amazon WorkSpaces Secure Browser and Amazon SES.
 */
export const businessAppsDesktopsAndIot1: Mission = {
  id: 'business-apps-desktops-and-iot-1',
  track: 'tech',
  topicSlug: 'business-apps-desktops-and-iot',
  buildingId: 'data-center',
  title: 'Mil llamadas por hora',
  client: { name: 'Valentina Rojas', role: 'Directora de operaciones de Atiende Sur' },
  intro: [
    '¡Qué bueno que llegaste! Soy Valentina Rojas, directora de operaciones de Atiende Sur. Tenemos oficinas aquí, en el Centro de Datos Andino, y atendemos clientes por encargo de otras empresas desde Santiago de Chile.',
    'Acabamos de ganar un contrato enorme: la atención al cliente de una compañía de telefonía. En un mes tenemos que atender llamadas, chats y SMS de todo el país.',
    'El problema es que nuestra central telefónica es vieja, los agentes trabajan por turnos desde sus casas con sus propias computadoras y no queremos comprarles laptops. Además, el cliente quiere que cada persona reciba un correo después de ser atendida.',
    'Si no arrancamos a tiempo, perdemos el contrato y a los cuarenta agentes que ya contratamos. ¿Me ayudas a armar la operación en AWS?',
  ],
  outro: {
    passed: [
      '¡Lo logramos! La operación arranca el lunes con un centro de contacto en la nube, escritorios para cada turno y correos que salen solos desde nuestro dominio.',
      'Los supervisores externos entran al CRM sin llevarse datos a sus equipos, y el cliente ya preguntó si podemos sumar otro país. Gracias: aquí siempre tendrás una línea abierta.',
    ],
    failed: [
      'Uf... con estas decisiones no llegamos al lunes. Hay piezas de la operación que todavía no encajan.',
      'Repasa la teoría de aplicaciones de negocio y escritorios virtuales, y vuelve cuando quieras. Te esperamos con el café listo.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'contact-center',
      prompt:
        'Empecemos por el corazón de todo: necesitamos atender a los clientes por voz, chat y SMS, que cada contacto llegue al agente adecuado y ver métricas en tiempo real. No quiero comprar centrales ni pagar por adelantado. ¿Qué servicio usamos?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'connect',
          label: 'Amazon Connect',
          definition:
            'Servicio de centro de contacto en la nube y omnicanal, con enrutamiento inteligente, métricas en tiempo real y pago por uso.',
          explanation:
            'Es justo lo que pide Atiende Sur: conecta a los clientes con los agentes por voz, chat y SMS, enruta cada contacto y no exige infraestructura propia ni pagos por adelantado.',
          correct: true,
        },
        {
          id: 'ses-contact',
          label: 'Amazon SES',
          definition:
            'Plataforma para enviar y recibir correo electrónico con direcciones y dominios propios, a escala.',
          explanation:
            'SES maneja correo electrónico. No recibe llamadas ni chats ni los enruta a un agente, que es lo que necesita la operación.',
          correct: false,
        },
        {
          id: 'workspaces-contact',
          label: 'Amazon WorkSpaces',
          definition:
            'Servicio que aprovisiona escritorios virtuales en la nube con Windows o Linux para las personas de una organización.',
          explanation:
            'WorkSpaces podría darle un escritorio a cada agente, pero no es la plataforma que recibe, enruta y mide los contactos de los clientes.',
          correct: false,
        },
        {
          id: 'iot-contact',
          label: 'AWS IoT Core',
          definition:
            'Servicio que conecta dispositivos IoT, como sensores y medidores, con otros dispositivos y con los servicios de AWS.',
          explanation:
            'IoT Core conecta dispositivos que envían datos. No atiende llamadas ni chats de personas.',
          correct: false,
        },
      ],
    },
    {
      id: 'shift-desktops',
      prompt:
        'Ahora los agentes. Trabajan en turnos rotativos desde sus casas y no hay laptops para todos. Quiero escritorios virtuales completos que se usen por turno, no uno fijo para cada persona. ¿Qué opción elegimos?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-personal',
          label: 'WorkSpaces Personal',
          definition:
            'Opción de Amazon WorkSpaces que entrega escritorios virtuales persistentes, asignados cada uno a un usuario.',
          explanation:
            'WorkSpaces Personal asigna un escritorio persistente a cada persona, como su propia computadora. Atiende Sur quiere escritorios que se compartan por turno.',
          correct: false,
        },
        {
          id: 'secure-browser-desktops',
          label: 'Amazon WorkSpaces Secure Browser',
          definition:
            'Navegador empresarial remoto y administrado para acceder de forma protegida a sitios web internos y aplicaciones SaaS.',
          explanation:
            'Secure Browser da acceso a sitios web y aplicaciones SaaS desde el navegador, pero no entrega un escritorio virtual completo.',
          correct: false,
        },
        {
          id: 'workspaces-pools',
          label: 'WorkSpaces Pools',
          definition:
            'Opción de Amazon WorkSpaces que entrega escritorios virtuales no persistentes sobre infraestructura efímera.',
          explanation:
            'Los escritorios no persistentes de WorkSpaces Pools encajan con turnos rotativos: cada agente toma un escritorio al entrar y no hace falta uno fijo por persona ni comprar laptops.',
          correct: true,
        },
        {
          id: 'ses-desktops',
          label: 'Amazon SES',
          definition:
            'Servicio de correo electrónico para mensajes transaccionales y de marketing enviados desde un dominio propio.',
          explanation:
            'SES envía y recibe correos. No aprovisiona escritorios para los agentes.',
          correct: false,
        },
      ],
    },
    {
      id: 'external-supervisors',
      prompt:
        'El cliente de telefonía mandará supervisores externos. Solo necesitan entrar a nuestro CRM web interno y a un par de aplicaciones SaaS desde el navegador de sus propios equipos, sin que los datos de los clientes queden en esos equipos. ¿Qué les damos?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-supervisors',
          label: 'Un escritorio completo de Amazon WorkSpaces para cada supervisor',
          definition:
            'Escritorios virtuales en la nube con Windows o Linux, persistentes o en pools, que reemplazan una computadora de trabajo.',
          explanation:
            'Un escritorio completo es más de lo que necesitan. Cuando basta con acceder a sitios web internos y SaaS desde el navegador, la opción es WorkSpaces Secure Browser.',
          correct: false,
        },
        {
          id: 'connect-supervisors',
          label: 'Amazon Connect',
          definition:
            'Centro de contacto en la nube que conecta a los clientes con agentes por voz, chat, SMS y otros canales.',
          explanation:
            'Connect gestiona los contactos de los clientes. No ofrece navegación protegida a un CRM web interno ni a aplicaciones SaaS.',
          correct: false,
        },
        {
          id: 'iot-supervisors',
          label: 'AWS IoT Core',
          definition:
            'Servicio con un message broker de publicación y suscripción para que dispositivos IoT intercambien mensajes.',
          explanation:
            'IoT Core conecta dispositivos como sensores, no a personas que navegan aplicaciones web.',
          correct: false,
        },
        {
          id: 'secure-browser',
          label: 'Amazon WorkSpaces Secure Browser',
          definition:
            'Navegador empresarial remoto y administrado: la navegación ocurre en una sesión en la nube y el usuario usa el navegador que ya tiene.',
          explanation:
            'Los supervisores entran al CRM y a las aplicaciones SaaS desde su propio navegador, la sesión corre en la nube y los datos sensibles no llegan a sus equipos. Según AWS, deja de aceptar nuevos clientes desde el 29 de octubre de 2026, pero sigue en la guía del examen.',
          correct: true,
        },
      ],
    },
    {
      id: 'after-call-email',
      prompt:
        'Último pendiente: después de cada atención queremos enviar un correo de confirmación con el número de caso, y una vez al mes un boletín con novedades, todo desde el dominio de Atiende Sur y para miles de personas. ¿Qué servicio usamos?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-email',
          label: 'Amazon SNS',
          definition:
            'Servicio de notificaciones basado en publicación y suscripción, que envía mensajes a los suscriptores de un tema.',
          explanation:
            'Es una trampa típica: SNS sirve para notificaciones y pub/sub. Para correos transaccionales y de marketing a escala con el dominio propio, el servicio es SES.',
          correct: false,
        },
        {
          id: 'ses',
          label: 'Amazon SES',
          definition:
            'Plataforma para enviar y recibir correo electrónico con direcciones y dominios propios, de forma económica y a escala.',
          explanation:
            'SES cubre los dos casos: la confirmación con el número de caso es un correo transaccional y el boletín mensual es correo de marketing, ambos desde el dominio de Atiende Sur.',
          correct: true,
        },
        {
          id: 'connect-email',
          label: 'Amazon Connect',
          definition:
            'Centro de contacto omnicanal en la nube con enrutamiento inteligente de contactos hacia los agentes.',
          explanation:
            'Connect atiende y enruta los contactos de los clientes. Para enviar confirmaciones y boletines por correo desde el dominio propio, el servicio adecuado es SES.',
          correct: false,
        },
        {
          id: 'appstream-email',
          label: 'Amazon AppStream 2.0',
          definition:
            'Servicio administrado que entrega aplicaciones de escritorio por streaming, incluso a un navegador compatible con HTML5.',
          explanation:
            'AppStream 2.0 entrega aplicaciones por streaming a los usuarios. No es una plataforma de correo electrónico.',
          correct: false,
        },
      ],
    },
  ],
};
