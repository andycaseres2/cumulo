import type { Mission } from '../../../domain/Mission';

/**
 * Torre Financiera: a payments fintech in Panama City with offices in the tower, facing abuse, a possible AWS vulnerability and new hires.
 * Practices reporting abuse to AWS Trust & Safety, the vulnerability disclosure program, the AWS Security Blog
 * and the per-service chapters of the AWS Security Documentation.
 */
export const recursosDeSeguridad2: Mission = {
  id: 'recursos-de-seguridad-2',
  track: 'financiero',
  topicSlug: 'recursos-de-seguridad',
  buildingId: 'torre-financiera',
  title: 'Cada aviso a su ventanilla',
  client: { name: 'Ernesto Batista', role: 'CTO de PagoIstmo, fintech de pagos de la Torre Financiera' },
  intro: [
    'Adelante, estamos en el piso doce. Soy Ernesto Batista, CTO de PagoIstmo, una fintech de pagos con oficinas en esta torre de Ciudad de Panamá. Procesamos pagos de comercios de todo el país.',
    'Esta semana fue de locos. Una IP de AWS nos ataca, nuestra pentester cree haber encontrado una falla en un servicio de AWS y entraron cinco desarrolladores nuevos que necesitan aprender rápido.',
    'Todos me preguntan a quién avisar o dónde leer, y cada uno abrió un caso de soporte distinto. Así no llegamos a ningún lado.',
    'Necesito que cada aviso vaya a la ventanilla correcta y que el equipo sepa dónde aprender. ¿Me ayudas a poner orden?',
  ],
  outro: {
    passed: [
      'Perfecto: el abuso va a Trust & Safety, la posible falla al programa de divulgación de vulnerabilidades y los nuevos ya siguen el Security Blog y la documentación de seguridad de cada servicio.',
      'Por fin cada aviso tiene su ventanilla. Gracias: en PagoIstmo siempre habrá un café para ti en el piso doce.',
    ],
    failed: [
      'Hmm... con estas respuestas seguiríamos tocando la puerta equivocada. Varios avisos se perderían en el camino.',
      'Repasa la teoría de recursos de seguridad y vuelve cuando quieras. La torre no se mueve de aquí.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'report-abuse',
      prompt:
        'Lo primero: una instancia EC2 con una IP pública de AWS, que no es nuestra, lleva dos días enviando tráfico malicioso a nuestra pasarela de pagos. ¿A quién se lo reportamos?',
      topicSlug: 'recursos-de-seguridad',
      examTasks: ['2.4'],
      options: [
        {
          id: 'trust-safety',
          label: 'A AWS Trust & Safety, con el formulario de abuso de AWS',
          definition:
            'Equipo de AWS que recibe reportes cuando un recurso de AWS se usa con fines abusivos, mediante el formulario de abuso o su correo oficial.',
          explanation:
            'Cuando un recurso de AWS se usa con fines abusivos, como una instancia EC2 que envía tráfico malicioso, el canal es AWS Trust & Safety mediante el formulario de abuso.',
          correct: true,
        },
        {
          id: 'support-case',
          label: 'Abriendo un caso de soporte técnico en AWS Support',
          definition:
            'Canal para pedir ayuda a AWS con problemas técnicos o de facturación de la propia cuenta.',
          explanation:
            'AWS Support gestiona los problemas de tu propia cuenta. Abrir un caso técnico para reportar abuso desde una IP de AWS es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'vdp-abuse',
          label: 'Al programa de divulgación de vulnerabilidades de AWS',
          definition:
            'Canal de AWS para que investigadores reporten posibles vulnerabilidades de seguridad en los servicios de AWS.',
          explanation:
            'Ese programa es para fallas en los servicios de AWS, no para el uso abusivo de un recurso de AWS por parte de otra persona.',
          correct: false,
        },
        {
          id: 'artifact-abuse',
          label: 'Descargando un informe en AWS Artifact',
          definition:
            'Portal para descargar informes de cumplimiento de AWS, como SOC, ISO o PCI.',
          explanation:
            'AWS Artifact entrega informes de cumplimiento. No sirve para reportar actividad abusiva.',
          correct: false,
        },
      ],
    },
    {
      id: 'report-vulnerability',
      prompt:
        'Segundo aviso: nuestra pentester cree haber encontrado una posible vulnerabilidad en un servicio de AWS, no en nuestra aplicación. Quiere reportarla de forma responsable. ¿Por qué canal lo hace?',
      topicSlug: 'recursos-de-seguridad',
      examTasks: ['2.4'],
      options: [
        {
          id: 'abuse-form-vuln',
          label: 'Por el formulario de abuso de AWS Trust & Safety',
          definition:
            'Formulario para avisar a AWS que un recurso de AWS se está usando con fines abusivos, como enviar spam o tráfico malicioso.',
          explanation:
            'Trust & Safety recibe reportes de recursos de AWS usados con fines abusivos, no de vulnerabilidades en los servicios.',
          correct: false,
        },
        {
          id: 'marketplace-vuln',
          label: 'Comprando un producto de seguridad en AWS Marketplace',
          definition:
            'Compra y despliegue de software de seguridad de terceros a través del catálogo curado de AWS.',
          explanation:
            'Comprar un producto de terceros no le avisa a AWS de la falla que encontró la pentester.',
          correct: false,
        },
        {
          id: 'knowledge-center-vuln',
          label: 'Publicándola en el AWS Knowledge Center',
          definition:
            'Colección de artículos en AWS re:Post con soluciones paso a paso a las preguntas frecuentes de los clientes.',
          explanation:
            'El Knowledge Center ofrece soluciones a problemas frecuentes. No es un canal para reportar vulnerabilidades de los servicios de AWS.',
          correct: false,
        },
        {
          id: 'vdp',
          label: 'Por el programa de divulgación de vulnerabilidades de AWS',
          definition:
            'Canal de AWS para reportar de forma responsable posibles vulnerabilidades de seguridad en sus servicios.',
          explanation:
            'Las vulnerabilidades en servicios de AWS se reportan mediante el programa de divulgación de vulnerabilidades, que es el canal correcto para la pentester.',
          correct: true,
        },
      ],
    },
    {
      id: 'learn-news',
      prompt:
        'Ahora los cinco desarrolladores nuevos. Quiero que se mantengan al día con novedades y lean ejemplos prácticos escritos por especialistas de AWS sobre gestión de identidades, detección de amenazas y criptografía. ¿Qué recurso les recomiendo seguir?',
      topicSlug: 'recursos-de-seguridad',
      examTasks: ['2.4'],
      options: [
        {
          id: 'artifact-news',
          label: 'AWS Artifact',
          definition:
            'Servicio de autoservicio que da acceso a informes de cumplimiento de AWS y a acuerdos.',
          explanation:
            'Artifact sirve para descargar informes de cumplimiento. No publica novedades ni ejemplos prácticos.',
          correct: false,
        },
        {
          id: 'security-blog',
          label: 'AWS Security Blog',
          definition:
            'Blog de AWS que publica guías técnicas, novedades y buenas prácticas de seguridad escritas por especialistas.',
          explanation:
            'El Security Blog publica novedades, guías técnicas y ejemplos prácticos sobre identidades, detección de amenazas y criptografía: justo lo que necesitan los nuevos.',
          correct: true,
        },
        {
          id: 'marketplace-news',
          label: 'AWS Marketplace',
          definition:
            'Catálogo de software y servicios de terceros con modelos de precio como por hora, anual o BYOL.',
          explanation:
            'AWS Marketplace vende productos de terceros. No es una fuente de artículos de especialistas de AWS.',
          correct: false,
        },
        {
          id: 'trust-safety-news',
          label: 'AWS Trust & Safety Center',
          definition:
            'Centro en AWS re:Post sobre cómo reportar abusos, los usos prohibidos y cómo responder a un aviso de abuso.',
          explanation:
            'El Trust & Safety Center trata el abuso de recursos de AWS. No es un recurso de aprendizaje sobre criptografía o detección de amenazas.',
          correct: false,
        },
      ],
    },
    {
      id: 'configure-service',
      prompt:
        'Última duda. Uno de los nuevos va a guardar los comprobantes de pago en Amazon S3 y necesita saber cómo configurar de forma segura el cifrado, el control de acceso y el registro de ese servicio. ¿Dónde lo lee?',
      topicSlug: 'recursos-de-seguridad',
      examTasks: ['2.4'],
      options: [
        {
          id: 'trust-safety-config',
          label: 'En el AWS Trust & Safety Center',
          definition:
            'Centro de AWS que explica cómo reportar un recurso de AWS usado con fines abusivos.',
          explanation:
            'El Trust & Safety Center trata reportes de abuso y usos prohibidos. No documenta cómo configurar la seguridad de S3.',
          correct: false,
        },
        {
          id: 'artifact-config',
          label: 'En AWS Artifact',
          definition:
            'Portal para descargar informes de cumplimiento de AWS y gestionar acuerdos con AWS.',
          explanation:
            'Artifact entrega evidencia de cumplimiento de AWS. No explica cómo configurar el cifrado ni el control de acceso de un servicio.',
          correct: false,
        },
        {
          id: 's3-security-chapter',
          label: 'En el capítulo de seguridad de Amazon S3 de la AWS Security Documentation',
          definition:
            'Documentación de seguridad de AWS que incluye un capítulo de seguridad para cada servicio, organizado por categoría.',
          explanation:
            'Cuando la pregunta es cómo configurar de forma segura un servicio concreto, la respuesta es su sección de seguridad. El capítulo de S3 explica cifrado, control de acceso y registro.',
          correct: true,
        },
        {
          id: 'marketplace-config',
          label: 'En AWS Marketplace',
          definition:
            'Catálogo donde se compran y despliegan productos de terceros, como AMI o software como servicio.',
          explanation:
            'AWS Marketplace sirve para comprar productos de terceros. No es la guía de configuración segura de Amazon S3.',
          correct: false,
        },
      ],
    },
  ],
};
