import type { Mission } from '../../../domain/Mission';

/**
 * Exportadora Café Andino: a coffee exporter in Manizales taking its orders platform to production on AWS.
 * Practices free account and billing support in Basic, the minimum production plan (Business Support+),
 * the discontinued legacy plans, AWS Support Center cases and the AWS Health Dashboard.
 */
export const supportPlans1: Mission = {
  id: 'support-plans-1',
  track: 'market',
  topicSlug: 'support-plans',
  buildingId: 'coffee-exporter',
  title: 'Café con soporte',
  client: { name: 'Valentina Ospina', role: 'Jefa de tecnología de Exportadora Café Andino' },
  intro: [
    'Hola, qué bueno verte. Soy Valentina Ospina, jefa de tecnología de Exportadora Café Andino. Desde Manizales compramos café a cientos de fincas del Eje Cafetero y lo enviamos a tostadores de Europa y Asia.',
    'Construimos en AWS una plataforma de pedidos donde nuestros compradores reservan lotes y siguen sus envíos. Hasta ahora era un piloto y nos bastaba con la documentación y los foros.',
    'Pero en un mes la plataforma pasa a producción, justo antes de la cosecha. Si se cae en plena temporada de pedidos, perdemos contratos que tardamos años en conseguir, y hoy no sé ni a quién llamaríamos.',
    'Necesito entender qué soporte de AWS tenemos, cuál nos conviene y cómo usarlo. ¿Me ayudas a prepararnos antes de la cosecha?',
  ],
  outro: {
    passed: [
      'Perfecto. Ya sé qué incluye el plan que tenemos, cuál contratar para producción y dónde abrir un caso si algo falla.',
      'Y con el AWS Health Dashboard sabremos cuándo un evento de AWS nos afecta antes de que nos llamen los compradores. Gracias: esta cosecha la vamos a recibir tranquilos. Te debo un buen café.',
    ],
    failed: [
      'Hmm... con estas respuestas no me animo a salir a producción. Todavía no tengo claro qué soporte necesitamos.',
      'Repasa la teoría de los planes de soporte y vuelve cuando quieras. La cosecha no espera, pero yo te espero.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'billing-question',
      prompt:
        'Empecemos por algo que me tiene confundida: hoy tenemos el plan Basic Support y en la factura de AWS apareció un cargo que no entiendo. ¿Qué hago para que me lo expliquen?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'upgrade-for-billing',
          label: 'Contratar AWS Business Support+, porque Basic no incluye consultas de facturación',
          definition:
            'Plan de pago con asistencia con IA, acceso 24/7 a expertos de AWS y soporte técnico por teléfono, web, chat y correo.',
          explanation:
            'No hace falta cambiar de plan para una duda de facturación: Basic Support ya incluye acceso 24/7 al servicio al cliente de cuenta y facturación.',
          correct: false,
        },
        {
          id: 'customer-service',
          label: 'Contactar al servicio al cliente de cuenta y facturación de AWS',
          definition:
            'Canal de AWS que atiende consultas sobre la cuenta y la factura, disponible en todos los planes de soporte.',
          explanation:
            'El soporte de cuenta y facturación es gratuito para todos los planes, incluido Basic Support, así que puedes pedir que te expliquen el cargo sin pagar nada adicional.',
          correct: true,
        },
        {
          id: 'trust-safety-billing',
          label: 'Reportarlo al equipo de AWS Trust & Safety',
          definition:
            'Equipo de AWS que recibe reportes de recursos de AWS usados para actividades abusivas, como spam o escaneo de puertos.',
          explanation:
            'AWS Trust & Safety atiende reportes de abuso, no dudas sobre un cargo de la factura de la exportadora.',
          correct: false,
        },
        {
          id: 'trusted-advisor-billing',
          label: 'Revisarlo con los checks de AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona tu entorno y recomienda mejoras según buenas prácticas en categorías como costos, seguridad y límites de servicio.',
          explanation:
            'Trusted Advisor recomienda mejoras para tu entorno, pero no responde por qué apareció un cargo concreto en tu factura.',
          correct: false,
        },
      ],
    },
    {
      id: 'production-plan',
      prompt:
        'Ahora lo importante. Cuando la plataforma esté en producción quiero soporte técnico 24/7 y que nos respondan en menos de 30 minutos si se cae en plena cosecha. ¿Cuál es el plan mínimo que AWS recomienda para producción?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'basic-production',
          label: 'Basic Support',
          definition:
            'Plan incluido en todas las cuentas, con servicio al cliente, documentación, AWS re:Post y los checks básicos de Trusted Advisor.',
          explanation:
            'Basic Support no incluye casos de soporte técnico, así que no cubre una caída de la plataforma en producción.',
          correct: false,
        },
        {
          id: 'developer-production',
          label: 'Developer Support',
          definition:
            'Plan de soporte de pago orientado a quienes experimentan o prueban cargas en AWS.',
          explanation:
            'Developer Support se discontinúa el 1 de enero de 2027 y no forma parte de los planes vigentes; sus clientes pueden pasar a Business Support+.',
          correct: false,
        },
        {
          id: 'onramp-production',
          label: 'Enterprise On-Ramp',
          definition:
            'Plan de soporte de pago ubicado entre Business y Enterprise en la lista anterior de planes de AWS.',
          explanation:
            'Enterprise On-Ramp se discontinúa el 1 de enero de 2027 y sus clientes se migran a Enterprise Support durante 2026; no forma parte de los planes vigentes.',
          correct: false,
        },
        {
          id: 'business-plus',
          label: 'AWS Business Support+',
          definition:
            'Plan de pago con asistencia con IA, acceso 24/7 a expertos de AWS, todos los checks de Trusted Advisor, la AWS Support API y la AWS Health API.',
          explanation:
            'Business Support+ es el mínimo recomendado para producción: da soporte técnico 24/7 y su objetivo de respuesta en una caída crítica del negocio es de menos de 30 minutos.',
          correct: true,
        },
      ],
    },
    {
      id: 'open-case',
      prompt:
        'Ya contratamos Business Support+. Si algo falla un sábado en la noche, el ingeniero de guardia tiene que abrir un caso, marcar qué tan grave es y seguirlo. ¿Dónde lo hace?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'support-center',
          label: 'En AWS Support Center',
          definition:
            'Consola de AWS donde se crean y administran casos de soporte, con resolución de problemas asistida por IA.',
          explanation:
            'En AWS Support Center el ingeniero crea el caso, elige su severidad y le da seguimiento. Necesita ser el usuario raíz o tener permisos de IAM para abrirlo.',
          correct: true,
        },
        {
          id: 'repost-case',
          label: 'En AWS re:Post',
          definition:
            'Servicio de preguntas y respuestas de la comunidad, con respuestas revisadas por expertos.',
          explanation:
            'En AWS re:Post se hacen preguntas a la comunidad; ahí no se abren casos de soporte con severidad para la cuenta de la exportadora.',
          correct: false,
        },
        {
          id: 'health-case',
          label: 'En el AWS Health Dashboard',
          definition:
            'Panel que muestra la salud de los servicios de AWS y los eventos que afectan a los recursos de tu cuenta.',
          explanation:
            'El AWS Health Dashboard informa eventos de AWS, pero no sirve para crear ni seguir casos de soporte.',
          correct: false,
        },
        {
          id: 'trust-safety-center-case',
          label: 'En el AWS Trust & Safety Center',
          definition:
            'Espacio en AWS re:Post que explica cómo reportar abuso de recursos de AWS y cómo responder a los avisos de ese equipo.',
          explanation:
            'El AWS Trust & Safety Center trata reportes de abuso; una caída de la plataforma se atiende con un caso de soporte.',
          correct: false,
        },
      ],
    },
    {
      id: 'aws-events',
      prompt:
        'Última cosa. El año pasado AWS hizo un mantenimiento programado y nos enteramos tarde. ¿Dónde podemos ver la salud de los servicios de AWS y los eventos que afectan a nuestra cuenta?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'trusted-advisor-events',
          label: 'En AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona tu entorno y recomienda mejoras en seis categorías, como optimización de costos y tolerancia a fallos.',
          explanation:
            'Trusted Advisor revisa tu configuración contra buenas prácticas; no informa incidentes ni mantenimientos programados de AWS.',
          correct: false,
        },
        {
          id: 'support-center-events',
          label: 'En AWS Support Center',
          definition:
            'Consola donde se crean y administran casos de soporte técnico y de cuenta y facturación.',
          explanation:
            'AWS Support Center gestiona tus casos de soporte; para ver los eventos de AWS que afectan a tu cuenta se usa AWS Health.',
          correct: false,
        },
        {
          id: 'health-dashboard',
          label: 'En el AWS Health Dashboard',
          definition:
            'Panel de AWS Health que muestra la salud de los servicios y los eventos, como incidentes o mantenimientos programados, que afectan a tu cuenta.',
          explanation:
            'El AWS Health Dashboard es gratuito y sin configuración para todos los clientes y muestra los eventos que afectan a tus recursos, como los mantenimientos programados.',
          correct: true,
        },
        {
          id: 'repost-events',
          label: 'En AWS re:Post',
          definition:
            'Servicio de conocimiento en la nube con preguntas y respuestas de la comunidad y expertos.',
          explanation:
            'En AWS re:Post puedes preguntar a la comunidad, pero no muestra los eventos de AWS que afectan específicamente a tu cuenta.',
          correct: false,
        },
      ],
    },
  ],
};
