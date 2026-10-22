import type { Mission } from '../../../domain/Mission';

/**
 * Bolsa de Valores Andina: a stock exchange in Quito responding to a security alert across its AWS accounts.
 * Practices Amazon Detective, AWS Security Hub, how Security Hub relates to GuardDuty and Inspector,
 * and automating responses to GuardDuty findings with Amazon EventBridge.
 */
export const deteccionDeAmenazas2: Mission = {
  id: 'deteccion-de-amenazas-2',
  track: 'financiero',
  topicSlug: 'deteccion-de-amenazas',
  buildingId: 'bolsa-andina',
  title: 'Alerta roja en la bolsa',
  client: { name: 'Diego Salinas', role: 'Director de ciberseguridad de la Bolsa de Valores Andina' },
  intro: [
    'Gracias por llegar tan rápido. Soy Diego Salinas, director de ciberseguridad de la Bolsa de Valores Andina, en Quito. Por nuestras plataformas pasan cada día las órdenes de compra y venta de cientos de inversionistas.',
    'Ya tenemos Amazon GuardDuty, Amazon Inspector y Amazon Macie activos en varias cuentas de AWS. Detectar, detectamos; el problema es lo que viene después.',
    'Anoche GuardDuty generó un hallazgo: unas credenciales de un operador se usaron desde un lugar inusual. Tenemos hallazgos repartidos en tres servicios y cinco cuentas, y nadie sabe por dónde empezar.',
    'El regulador quiere un informe del incidente y un plan para responder más rápido la próxima vez. ¿Me ayudas a ordenar la casa antes de que abra el mercado?',
  ],
  outro: {
    passed: [
      'Ahora sí tenemos un proceso: Detective nos cuenta qué pasó, Security Hub nos da una sola vista con nuestro puntaje frente a PCI DSS y EventBridge reacciona a cada hallazgo de GuardDuty.',
      'Y nadie va a apagar GuardDuty ni Inspector por error. El informe para el regulador queda impecable. Gracias: hoy el mercado abre en verde.',
    ],
    failed: [
      'Mmm... con este plan no me presento ante el regulador. Todavía mezclamos lo que hace cada servicio.',
      'Repasa la teoría de detección de amenazas con calma y vuelve cuando quieras. La bolsa no cierra para ti.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'root-cause',
      prompt:
        'Empecemos por el hallazgo de anoche. Queremos analizar la causa raíz: qué hizo esa identidad, desde dónde y qué recursos tocó, con visualizaciones que podamos mostrarle al regulador. ¿Qué servicio usamos?',
      topicSlug: 'deteccion-de-amenazas',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'security-hub-cspm-investigate',
          label: 'AWS Security Hub CSPM',
          definition:
            'Servicio que ejecuta verificaciones contra estándares de seguridad, calcula puntajes y agrega hallazgos de varios servicios.',
          explanation:
            'Security Hub CSPM agrega hallazgos y verifica estándares, pero no construye un grafo de comportamiento para investigar la causa raíz de un hallazgo.',
          correct: false,
        },
        {
          id: 'detective',
          label: 'Amazon Detective',
          definition:
            'Servicio que usa datos de CloudTrail, VPC Flow Logs y hallazgos de GuardDuty para construir un grafo de comportamiento con visualizaciones.',
          explanation:
            'Detective sirve para investigar la causa raíz de un hallazgo y ver qué recursos se vieron afectados. GuardDuty detectó; Detective investiga lo detectado.',
          correct: true,
        },
        {
          id: 'inspector-investigate',
          label: 'Amazon Inspector',
          definition:
            'Servicio que escanea de forma continua instancias EC2, imágenes en Amazon ECR y funciones Lambda en busca de CVE.',
          explanation:
            'Inspector encuentra vulnerabilidades de software. No reconstruye lo que hizo una identidad a partir de un hallazgo de GuardDuty.',
          correct: false,
        },
        {
          id: 'trusted-advisor-investigate',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio que recomienda mejoras de costo, rendimiento, tolerancia a fallos, límites de servicio y seguridad.',
          explanation:
            'Trusted Advisor ejecuta checks de buenas prácticas. No analiza la actividad relacionada con un incidente de seguridad.',
          correct: false,
        },
      ],
    },
    {
      id: 'single-view',
      prompt:
        'Segundo dolor de cabeza: los hallazgos de GuardDuty, Inspector y Macie están desperdigados en cinco cuentas. El regulador además pide verificar nuestras cuentas contra PCI DSS y mostrarle un puntaje de seguridad. ¿Qué servicio nos da todo eso en un solo lugar?',
      topicSlug: 'deteccion-de-amenazas',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'security-hub-cspm',
          label: 'AWS Security Hub CSPM',
          definition:
            'Servicio de gestión de la postura de seguridad en la nube que verifica buenas prácticas y estándares, y centraliza hallazgos.',
          explanation:
            'Security Hub CSPM ejecuta verificaciones contra estándares como PCI DSS y CIS, calcula puntajes de seguridad y agrega los hallazgos de GuardDuty, Inspector y Macie en un solo lugar.',
          correct: true,
        },
        {
          id: 'detective-view',
          label: 'Amazon Detective',
          definition:
            'Servicio de investigación que analiza actividad sospechosa con machine learning, análisis estadístico y teoría de grafos.',
          explanation:
            'Detective investiga lo ocurrido tras un hallazgo. No verifica las cuentas contra PCI DSS ni calcula un puntaje de seguridad.',
          correct: false,
        },
        {
          id: 'macie-view',
          label: 'Amazon Macie',
          definition:
            'Servicio que descubre datos sensibles en Amazon S3 y genera hallazgos cuando los encuentra.',
          explanation:
            'Macie es una de las fuentes de hallazgos de la bolsa, no la vista central que pide el regulador.',
          correct: false,
        },
        {
          id: 'guardduty-view',
          label: 'Amazon GuardDuty',
          definition:
            'Servicio de detección continua de amenazas que genera hallazgos sobre comportamiento malicioso en la cuenta.',
          explanation:
            'GuardDuty produce sus propios hallazgos de amenazas. No agrega los de Inspector y Macie ni evalúa las cuentas contra PCI DSS.',
          correct: false,
        },
      ],
    },
    {
      id: 'keep-detectors',
      prompt:
        'Ahora el gerente de finanzas propone ahorrar: "si ya activamos Security Hub, apaguemos GuardDuty e Inspector". Suena lógico, pero me da mala espina. ¿Qué afirmación describe bien la relación entre estos servicios?',
      topicSlug: 'deteccion-de-amenazas',
      examTasks: ['2.4'],
      options: [
        {
          id: 'hub-replaces',
          label: 'Security Hub reemplaza a GuardDuty e Inspector, así que pueden apagarse',
          definition:
            'Idea de que una vista central de seguridad genera por sí misma las detecciones de amenazas y de vulnerabilidades.',
          explanation:
            'Security Hub no detecta amenazas ni escanea CVE por sí mismo: depende de los hallazgos que generan GuardDuty e Inspector.',
          correct: false,
        },
        {
          id: 'hub-scans-cve',
          label: 'Security Hub escanea CVE por su cuenta, así que solo sobra Inspector',
          definition:
            'Idea de que la vista central de hallazgos incluye un escáner propio de vulnerabilidades de software.',
          explanation:
            'El escaneo continuo de CVE en EC2, ECR y Lambda lo hace Amazon Inspector, no Security Hub.',
          correct: false,
        },
        {
          id: 'hub-aggregates',
          label: 'Security Hub agrega y correlaciona los hallazgos de GuardDuty e Inspector, sin sustituirlos',
          definition:
            'Relación en la que un servicio central recibe, correlaciona y ayuda a priorizar los hallazgos que generan otros servicios.',
          explanation:
            'Security Hub centraliza y prioriza lo que detectan GuardDuty e Inspector. Si se apagan, la bolsa pierde esas detecciones y Security Hub queda sin esos hallazgos.',
          correct: true,
        },
        {
          id: 'only-detective',
          label: 'GuardDuty e Inspector envían sus hallazgos solo a Amazon Detective',
          definition:
            'Idea de que los hallazgos de los servicios de detección solo pueden centralizarse en el servicio de investigación.',
          explanation:
            'Security Hub CSPM agrega hallazgos de GuardDuty, Inspector y Macie, así que no dependen únicamente de Detective para centralizarse.',
          correct: false,
        },
      ],
    },
    {
      id: 'auto-response',
      prompt:
        'Última decisión. Anoche tardamos tres horas en reaccionar. Queremos que cada hallazgo de GuardDuty dispare automáticamente una respuesta, como aislar la instancia afectada y avisar al equipo de guardia. ¿A qué servicio enviamos los hallazgos?',
      topicSlug: 'deteccion-de-amenazas',
      examTasks: ['2.2'],
      options: [
        {
          id: 'detective-response',
          label: 'Amazon Detective',
          definition:
            'Servicio que permite revisar hasta un año de datos históricos de eventos para investigar actividad sospechosa.',
          explanation:
            'Detective sirve para investigar la causa raíz. No está pensado para disparar respuestas automáticas a cada hallazgo.',
          correct: false,
        },
        {
          id: 'inspector-response',
          label: 'Amazon Inspector',
          definition:
            'Servicio que asigna un puntaje de riesgo a las vulnerabilidades de software encontradas en las cargas de trabajo.',
          explanation:
            'Inspector escanea vulnerabilidades. No recibe los hallazgos de GuardDuty para automatizar respuestas.',
          correct: false,
        },
        {
          id: 'trusted-advisor-response',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio que revisa el entorno con checks de buenas prácticas, como permisos de buckets de S3 o rotación de access keys.',
          explanation:
            'Trusted Advisor recomienda buenas prácticas. No reacciona a los hallazgos de GuardDuty con acciones automáticas.',
          correct: false,
        },
        {
          id: 'eventbridge',
          label: 'Amazon EventBridge',
          definition:
            'Servicio de eventos que recibe eventos de servicios de AWS y los dirige, según reglas, hacia destinos que ejecutan acciones.',
          explanation:
            'GuardDuty puede enviar sus hallazgos a Amazon EventBridge, que permite automatizar la respuesta a cada uno, como aislar la instancia y avisar al equipo de guardia.',
          correct: true,
        },
      ],
    },
  ],
};
