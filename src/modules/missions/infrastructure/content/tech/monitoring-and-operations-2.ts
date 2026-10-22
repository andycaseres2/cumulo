import type { Mission } from '../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a gaming store in Guatemala City getting its online shop ready for its biggest sale of the year.
 * Practices AWS Compute Optimizer, Service Quotas, AWS Trusted Advisor checks by support plan and AWS License Manager.
 */
export const monitoringAndOperations2: Mission = {
  id: 'monitoring-and-operations-2',
  track: 'tech',
  topicSlug: 'monitoring-and-operations',
  buildingId: 'gaming-store',
  title: 'Nivel jefe: la gran oferta',
  client: { name: 'Lucía Batz', role: 'Dueña de la Tienda Gamer Pixel' },
  intro: [
    '¡Hola, jugador! Soy Lucía Batz, dueña de la Tienda Gamer Pixel. Vendemos consolas, juegos y periféricos aquí y en nuestra tienda en línea, que atiende a toda Ciudad de Guatemala.',
    'La tienda en línea corre en AWS desde hace un año. Funciona, pero la factura sube cada mes y sospecho que pagamos servidores más grandes de lo necesario.',
    'Además, en la última oferta quisimos lanzar más instancias y AWS no nos dejó porque llegamos a un límite. Y el programa de inventario usa licencias de Microsoft que nadie controla.',
    'En un mes llega la gran oferta de fin de año, y es la mitad de nuestras ventas. No me puedo dar el lujo de un game over. ¿Juegas en mi equipo?',
  ],
  outro: {
    passed: [
      '¡Nivel superado! Los servidores tienen el tamaño justo, el límite de instancias ya está ajustado y las licencias están bajo control.',
      'Y ahora sé qué verificaciones de Trusted Advisor tengo con mi plan. Gracias: tienes un control de regalo esperándote en el mostrador.',
    ],
    failed: [
      'Uy... con estas decisiones la gran oferta puede terminar en game over.',
      'Repasa la teoría de monitoreo y operaciones, y vuelve cuando quieras. Siempre se puede reintentar el nivel.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'oversized-servers',
      prompt:
        'Empecemos por la factura. Sospecho que las instancias EC2 de la tienda en línea están sobredimensionadas. Quiero recomendaciones de tamaño basadas en cómo las usamos de verdad. ¿Qué servicio activamos?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-quotas-rightsizing',
          label: 'Service Quotas',
          definition:
            'Servicio para ver las cuotas de los servicios de AWS en la cuenta y solicitar aumentos cuando son ajustables.',
          explanation:
            'Service Quotas muestra los límites de la cuenta. No analiza si una instancia es más grande de lo que necesita.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'AWS Compute Optimizer',
          definition:
            'Servicio que analiza la configuración y las métricas de uso de los recursos para recomendar su tamaño y detectar recursos inactivos.',
          explanation:
            'Compute Optimizer usa las métricas de uso real de las instancias EC2 para decir si son óptimas y cómo reducir costos. Hay que activarlo con opt in.',
          correct: true,
        },
        {
          id: 'license-rightsizing',
          label: 'AWS License Manager',
          definition:
            'Servicio que administra licencias de software de proveedores como Microsoft, SAP, Oracle e IBM en AWS y on-premises.',
          explanation:
            'License Manager controla las licencias de software. No evalúa el tamaño de las instancias.',
          correct: false,
        },
        {
          id: 'cloudtrail-rightsizing',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios en la cuenta.',
          explanation:
            'CloudTrail dice quién hizo qué y cuándo. No da recomendaciones de ajuste de tamaño.',
          correct: false,
        },
      ],
    },
    {
      id: 'instance-limit',
      prompt:
        'En la última oferta quisimos lanzar más instancias y la cuenta llegó al máximo permitido para ese recurso. Antes de la gran oferta quiero ver ese límite y pedir que lo aumenten, todo desde un solo lugar. ¿Qué uso?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'systems-manager-limit',
          label: 'AWS Systems Manager',
          definition:
            'Servicio para operar nodos a escala con parches, comandos remotos y conexión segura a los servidores.',
          explanation:
            'Systems Manager sirve para operar los servidores que ya existen. No administra los límites de los servicios de la cuenta.',
          correct: false,
        },
        {
          id: 'health-limit',
          label: 'AWS Health Dashboard',
          definition:
            'Panel que muestra la salud de los servicios de AWS y los eventos que afectan a la cuenta.',
          explanation:
            'Health Dashboard informa sobre eventos y fallas de AWS. No muestra cuotas ni permite pedir aumentos.',
          correct: false,
        },
        {
          id: 'compute-optimizer-limit',
          label: 'AWS Compute Optimizer',
          definition:
            'Servicio que recomienda el tamaño adecuado de recursos como instancias EC2, volúmenes EBS y funciones Lambda.',
          explanation:
            'Compute Optimizer recomienda tamaños según el uso. No permite ver las cuotas ni solicitar que se aumenten.',
          correct: false,
        },
        {
          id: 'service-quotas',
          label: 'Service Quotas',
          definition:
            'Servicio para ver y administrar desde un solo lugar las cuotas, o límites, de los servicios de AWS y solicitar aumentos.',
          explanation:
            'Service Quotas muestra el valor máximo permitido de cada recurso y permite pedir un aumento cuando la cuota es ajustable. Algunas cuotas son por cuenta y otras por Región.',
          correct: true,
        },
      ],
    },
    {
      id: 'trusted-advisor-basic',
      prompt:
        'Un amigo me recomendó AWS Trusted Advisor para revisar costos, seguridad y tolerancia a fallos. Tenemos el plan Basic Support. ¿Qué verificaciones de Trusted Advisor tenemos con ese plan?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'basic-subset',
          label: 'Todas las verificaciones de Service limits y algunas seleccionadas de Security y Fault tolerance',
          definition:
            'Subconjunto de las verificaciones de Trusted Advisor que corresponde a un plan de soporte determinado.',
          explanation:
            'Con Basic Support la tienda tiene todas las verificaciones de Service limits y algunas de Security y Fault tolerance. El conjunto completo y la API requieren AWS Business Support+, AWS Enterprise Support o AWS Unified Operations.',
          correct: true,
        },
        {
          id: 'all-checks',
          label: 'Todas las verificaciones de las seis categorías, incluida la API de Trusted Advisor',
          definition:
            'Acceso al conjunto completo de verificaciones de Trusted Advisor y a su API.',
          explanation:
            'Es una trampa típica: el conjunto completo y la API requieren AWS Business Support+, AWS Enterprise Support o AWS Unified Operations, no el plan Basic.',
          correct: false,
        },
        {
          id: 'cost-only',
          label: 'Solo las verificaciones de Cost optimization',
          definition:
            'Verificaciones de Trusted Advisor que buscan formas de reducir el gasto en la cuenta.',
          explanation:
            'El plan Basic incluye las verificaciones de Service limits y una selección de Security y Fault tolerance; las de Cost optimization forman parte del conjunto completo, que requiere un plan superior.',
          correct: false,
        },
        {
          id: 'operational-only',
          label: 'Solo las verificaciones de Operational Excellence',
          definition:
            'Verificaciones de Trusted Advisor sobre buenas prácticas de operación de los recursos.',
          explanation:
            'Con Basic Support lo incluido es todo Service limits y una selección de Security y Fault tolerance, no la categoría de Operational Excellence.',
          correct: false,
        },
      ],
    },
    {
      id: 'microsoft-licenses',
      prompt:
        'Última pregunta. El programa de inventario corre en servidores con licencias de Microsoft que trajimos nosotros, y nadie sabe cuántas usamos. Quiero fijar límites para no pasarnos y no incumplir el contrato. ¿Qué servicio usamos?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-catalog-licenses',
          label: 'AWS Service Catalog',
          definition:
            'Servicio para crear portafolios de productos de TI aprobados que los usuarios lanzan por autoservicio.',
          explanation:
            'Service Catalog controla qué productos aprobados se pueden lanzar. No lleva la cuenta del consumo de licencias de Microsoft.',
          correct: false,
        },
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'Servicio que administra licencias de software de proveedores como Microsoft, SAP, Oracle e IBM, con reglas de consumo.',
          explanation:
            'Con reglas de consumo, License Manager fija límites para evitar incumplimientos y excesos de licencias, y ayuda a aprovechar el modelo BYOL con las licencias que la tienda ya tiene.',
          correct: true,
        },
        {
          id: 'cloudwatch-licenses',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio de monitoreo con métricas, logs, dashboards y alarmas sobre recursos y aplicaciones.',
          explanation:
            'CloudWatch mide el rendimiento de los servidores. No administra licencias de software ni sus reglas de consumo.',
          correct: false,
        },
        {
          id: 'marketplace-licenses',
          label: 'AWS Marketplace',
          definition:
            'Tienda digital con software de terceros que se puede buscar, comprar y usar en AWS.',
          explanation:
            'Marketplace sirve para comprar software de terceros. No controla el consumo de las licencias de Microsoft que la tienda trajo.',
          correct: false,
        },
      ],
    },
  ],
};
