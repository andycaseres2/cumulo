import type { Mission } from '../../../domain/Mission';

/**
 * Distribuidora Norte: a food distributor in Monterrey whose warehouse system becomes critical for the business.
 * Practices the designated TAM in Enterprise Support, Unified Operations for mission-critical workloads,
 * reporting abuse to AWS Trust & Safety and AWS Trusted Advisor.
 */
export const planesDeSoporte2: Mission = {
  id: 'planes-de-soporte-2',
  track: 'mercado',
  topicSlug: 'planes-de-soporte',
  buildingId: 'distribuidora-norte',
  title: 'Bodegas sin apagones',
  client: { name: 'Rodrigo Treviño', role: 'Director de operaciones de Distribuidora Norte' },
  intro: [
    'Qué bueno que llegaste. Soy Rodrigo Treviño, director de operaciones de Distribuidora Norte. Desde Monterrey abastecemos de alimentos a más de dos mil tiendas del norte de México.',
    'Todo pasa por nuestro sistema de bodegas en AWS: qué camión sale, qué carga lleva y a qué tienda va. Hoy tenemos Business Support+ y nos ha funcionado bien.',
    'Pero el sistema creció tanto que, si se detiene una hora, se quedan tiendas sin leche ni pan. El directorio ya no quiere solo apagar incendios: quiere prevenirlos y tener a AWS más cerca.',
    'Tengo que presentarles una propuesta de soporte la próxima semana. ¿Me ayudas a armarla?',
  ],
  outro: {
    passed: [
      'Excelente. Ya tengo claro qué plan nos da un TAM, cuál cubre las bodegas de misión crítica y a quién avisarle cuando alguien abusa desde AWS.',
      'Con Trusted Advisor revisando nuestro entorno, el directorio va a ver que pasamos de apagar incendios a prevenirlos. Gracias: los camiones siguen saliendo a tiempo gracias a ti.',
    ],
    failed: [
      'Mmm... no creo que el directorio apruebe esta propuesta. Hay decisiones que no me terminan de convencer.',
      'Repasa la teoría de los planes de soporte y vuelve. Las bodegas te seguirán esperando.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'designated-tam',
      prompt:
        'Lo primero que pide el directorio: un asesor técnico de AWS designado que conozca nuestra cuenta y lidere revisiones Well-Architected. Entre los planes vigentes, ¿cuál es el primero que lo incluye?',
      topicSlug: 'planes-de-soporte',
      examTasks: ['4.3'],
      options: [
        {
          id: 'business-plus-tam',
          label: 'AWS Business Support+',
          definition:
            'Plan de pago con asistencia con IA, acceso 24/7 a expertos de AWS, todos los checks de Trusted Advisor y la AWS Health API.',
          explanation:
            'Es el plan que ya tienen. Da acceso 24/7 a expertos, pero no incluye un Technical Account Manager (TAM) designado.',
          correct: false,
        },
        {
          id: 'basic-tam',
          label: 'Basic Support',
          definition:
            'Plan incluido en todas las cuentas, con servicio al cliente de cuenta y facturación, documentación y AWS re:Post.',
          explanation:
            'Basic Support no incluye soporte técnico ni ningún contacto designado, así que no da un asesor que conozca la cuenta.',
          correct: false,
        },
        {
          id: 'enterprise-tam',
          label: 'AWS Enterprise Support',
          definition:
            'Plan de pago para cargas críticas para el negocio, con servicios proactivos, talleres, AWS GameDays y acceso 24/7 a AWS Security Incident Response.',
          explanation:
            'El Technical Account Manager (TAM) designado, que conoce la cuenta y lidera revisiones Well-Architected, aparece desde Enterprise Support.',
          correct: true,
        },
        {
          id: 'developer-tam',
          label: 'Developer Support',
          definition:
            'Plan de soporte de pago orientado a quienes experimentan o prueban cargas en AWS.',
          explanation:
            'Developer Support se discontinúa el 1 de enero de 2027 y no forma parte de los planes vigentes; entre ellos, el TAM designado aparece desde Enterprise Support.',
          correct: false,
        },
      ],
    },
    {
      id: 'mission-critical',
      prompt:
        'Ahora el sistema de bodegas pasa a ser de misión crítica. El directorio exige respuesta en menos de 5 minutos ante una caída crítica, Incident Management Engineers y monitoreo 24/7 de seguridad y rendimiento. ¿Qué plan cumple con eso?',
      topicSlug: 'planes-de-soporte',
      examTasks: ['4.3'],
      options: [
        {
          id: 'unified-operations',
          label: 'AWS Unified Operations',
          definition:
            'Plan de pago para operaciones empresariales de misión crítica, con ingenieros especialistas designados que trabajan con un modelo follow-the-sun.',
          explanation:
            'Unified Operations agrega Incident Management Engineers con respuesta en menos de 5 minutos y monitoreo 24/7 de seguridad y rendimiento, justo lo que pide el directorio.',
          correct: true,
        },
        {
          id: 'enterprise-critical',
          label: 'AWS Enterprise Support',
          definition:
            'Plan de pago con TAM designado, servicios proactivos y acceso 24/7 a ingenieros de AWS Security Incident Response.',
          explanation:
            'Enterprise Support tiene como objetivo responder en menos de 15 minutos en caídas críticas y no incluye el monitoreo 24/7 de misión crítica que se exige.',
          correct: false,
        },
        {
          id: 'business-plus-critical',
          label: 'AWS Business Support+',
          definition:
            'Plan de pago con asistencia con IA, acceso 24/7 a expertos de AWS, la AWS Support API y la AWS Health API.',
          explanation:
            'Business Support+ es el mínimo para producción, con un objetivo de respuesta de menos de 30 minutos; queda lejos de lo que exige el directorio.',
          correct: false,
        },
        {
          id: 'onramp-critical',
          label: 'Enterprise On-Ramp',
          definition:
            'Plan de soporte de pago ubicado entre Business y Enterprise en la lista anterior de planes de AWS.',
          explanation:
            'Enterprise On-Ramp se discontinúa el 1 de enero de 2027 y sus clientes se migran a Enterprise Support durante 2026; no forma parte de los planes vigentes.',
          correct: false,
        },
      ],
    },
    {
      id: 'report-abuse',
      prompt:
        'Otro tema raro: nuestro firewall detecta escaneos de puertos que vienen de recursos alojados en AWS que no son nuestros. ¿A quién se lo reportamos?',
      topicSlug: 'planes-de-soporte',
      examTasks: ['4.3'],
      options: [
        {
          id: 'support-case-abuse',
          label: 'A AWS Support, abriendo un caso técnico en AWS Support Center',
          definition:
            'Casos de soporte que se crean y administran desde la consola de AWS Support Center, con una severidad elegida.',
          explanation:
            'AWS Support atiende casos sobre tu propia cuenta, pero no gestiona los reportes de abuso de recursos de AWS.',
          correct: false,
        },
        {
          id: 'trusted-advisor-abuse',
          label: 'A AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona tu entorno y recomienda mejoras según buenas prácticas en seis categorías.',
          explanation:
            'Trusted Advisor revisa tu propio entorno; no sirve para reportar lo que hacen recursos de otras personas.',
          correct: false,
        },
        {
          id: 'health-abuse',
          label: 'Al AWS Health Dashboard',
          definition:
            'Panel que muestra la salud de los servicios de AWS y los eventos que afectan a los recursos de tu cuenta.',
          explanation:
            'El AWS Health Dashboard informa eventos de AWS que te afectan; no recibe reportes de abuso.',
          correct: false,
        },
        {
          id: 'trust-safety',
          label: 'Al equipo de AWS Trust & Safety, con el formulario de reporte de abuso',
          definition:
            'Equipo de AWS que recibe reportes de recursos de AWS usados para spam, escaneo de puertos, ataques DDoS o intentos de intrusión.',
          explanation:
            'El escaneo de puertos desde recursos de AWS se reporta a AWS Trust & Safety con su formulario; ni siquiera hace falta tener una cuenta de AWS para hacerlo.',
          correct: true,
        },
      ],
    },
    {
      id: 'best-practice-checks',
      prompt:
        'Por último, el directorio quiere prevenir: detectar recursos inactivos o subutilizados que generan gasto innecesario y revisar cosas como el MFA del usuario raíz. ¿Qué servicio inspecciona nuestro entorno y nos da esas recomendaciones?',
      topicSlug: 'planes-de-soporte',
      examTasks: ['4.3'],
      options: [
        {
          id: 'repost-checks',
          label: 'AWS re:Post',
          definition:
            'Servicio de conocimiento en la nube con preguntas y respuestas de la comunidad, revisadas por expertos.',
          explanation:
            'En AWS re:Post la comunidad responde preguntas, pero nadie inspecciona los recursos de la distribuidora.',
          correct: false,
        },
        {
          id: 'trusted-advisor',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona tu entorno y recomienda mejoras en Cost optimization, Performance, Security, Fault tolerance, Service limits y Operational Excellence.',
          explanation:
            'Trusted Advisor detecta recursos inactivos o subutilizados y revisa la seguridad, como el MFA del usuario raíz. Con un plan de pago, como el que tendrán, acceden a todos sus checks.',
          correct: true,
        },
        {
          id: 'health-checks',
          label: 'AWS Health Dashboard',
          definition:
            'Panel de AWS Health que muestra incidentes y mantenimientos programados de AWS que afectan a tu cuenta.',
          explanation:
            'El AWS Health Dashboard avisa de eventos de AWS, pero no revisa tu configuración ni recomienda ahorros.',
          correct: false,
        },
        {
          id: 'support-center-checks',
          label: 'AWS Support Center',
          definition:
            'Consola donde se crean y administran casos de soporte y se elige su severidad.',
          explanation:
            'AWS Support Center sirve para abrir y seguir casos; no inspecciona el entorno en busca de mejoras.',
          correct: false,
        },
      ],
    },
  ],
};
