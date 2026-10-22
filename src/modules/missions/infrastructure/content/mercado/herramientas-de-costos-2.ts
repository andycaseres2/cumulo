import type { Mission } from '../../../domain/Mission';

/**
 * Ferretería El Tornillo: a family hardware store in Arequipa about to open its online shop on AWS with a fixed budget.
 * Practices AWS Pricing Calculator, the AWS Price List API, AWS Budgets actions and free account and billing support.
 */
export const herramientasDeCostos2: Mission = {
  id: 'herramientas-de-costos-2',
  track: 'mercado',
  topicSlug: 'herramientas-de-costos',
  buildingId: 'ferreteria',
  title: 'La caja de herramientas del gasto',
  client: { name: 'Ernesto Paredes', role: 'Dueño de la Ferretería El Tornillo' },
  intro: [
    'Buenas, buenas. Soy Ernesto Paredes, dueño de la Ferretería El Tornillo. Mi abuelo la abrió hace cincuenta años aquí en Arequipa y ahora mi hija quiere que vendamos en línea.',
    'Ella va a montar la tienda virtual en AWS, pero yo soy el que firma los cheques. Y de la nube no sé nada: no sé cuánto va a costar, ni cómo evitar que se nos vaya de las manos.',
    'Tenemos un presupuesto fijo para este año. Si lo pasamos, no hay tienda en línea, y la competencia de la otra cuadra ya vende por internet.',
    'Me dijeron que AWS tiene sus propias herramientas para los costos, igual que yo tengo una para cada tornillo. ¿Me ayudas a elegir la correcta para cada trabajo?',
  ],
  outro: {
    passed: [
      '¡Eso es tener la herramienta justa para cada trabajo! Ya tengo el estimado para el banco, los precios al día, un freno si nos pasamos y sé a quién preguntar por la factura.',
      'Mi abuelo estaría orgulloso: la ferretería entra al internet con las cuentas claras. Gracias: cuando necesites un tornillo, aquí tienes descuento de por vida.',
    ],
    failed: [
      'Mmm... siento que estamos usando un martillo para apretar tuercas. Con estas decisiones no me animo a firmar.',
      'Repasa la teoría de las herramientas de costos y vuelve cuando quieras. La ferretería abre de lunes a sábado.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'estimate-before',
      prompt:
        'Lo primero: el banco me pide un estimado de cuánto costará la tienda en línea cada mes, y todavía no hemos creado nada en AWS. Necesito armarlo y mandárselo en PDF a mi contador. ¿Qué usamos?',
      topicSlug: 'herramientas-de-costos',
      examTasks: ['4.2'],
      options: [
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'Herramienta web gratuita para crear estimaciones de costos de servicios de AWS, que se pueden compartir por enlace o exportar en CSV o PDF.',
          explanation:
            'Sirve para modelar la solución antes de construirla, no requiere experiencia previa con AWS y permite exportar el estimado en PDF. Es una estimación: no incluye impuestos y solo considera los datos que ingresan.',
          correct: true,
        },
        {
          id: 'cost-explorer-estimate',
          label: 'AWS Cost Explorer',
          definition:
            'Herramienta para ver y analizar los costos y el uso de una cuenta, con historial de hasta 13 meses y pronóstico de los próximos 18 meses.',
          explanation:
            'Cost Explorer analiza y pronostica a partir del gasto que ya existe. La ferretería todavía no ha creado nada, así que no hay datos que analizar.',
          correct: false,
        },
        {
          id: 'budgets-estimate',
          label: 'AWS Budgets',
          definition:
            'Servicio para dar seguimiento al costo y al uso con presupuestos, alertas y acciones al acercarse o superar un umbral.',
          explanation:
            'Budgets vigila el gasto una vez que existe y avisa al acercarse al límite, pero no arma el estimado de una arquitectura que aún no existe.',
          correct: false,
        },
        {
          id: 'support-center-estimate',
          label: 'Un caso en AWS Support Center',
          definition:
            'Canal para abrir casos de soporte con AWS, entre ellos los de cuenta y facturación.',
          explanation:
            'El soporte de facturación responde dudas sobre la cuenta y la factura; el estimado de una arquitectura nueva se arma con la herramienta de estimación.',
          correct: false,
        },
      ],
    },
    {
      id: 'programmatic-prices',
      prompt:
        'Mi hija quiere que el sistema de inventario de la tienda consulte de forma automática los precios publicados de los servicios de AWS, por servicio y por Región, para actualizar sus cálculos. ¿De dónde los saca?',
      topicSlug: 'herramientas-de-costos',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-api',
          label: 'La API de AWS Cost Explorer',
          definition:
            'Acceso programático a los datos de costo y uso de la propia cuenta, con un cargo por cada solicitud.',
          explanation:
            'Devuelve lo que la cuenta ya gastó, no los precios publicados de cada servicio por Región, y cada solicitud tiene costo.',
          correct: false,
        },
        {
          id: 'budgets-prices',
          label: 'Las alertas de AWS Budgets',
          definition:
            'Notificaciones por correo o Amazon SNS cuando el gasto real o pronosticado se acerca o supera un umbral.',
          explanation:
            'Las alertas avisan sobre el gasto de la cuenta frente a un presupuesto; no entregan listas de precios de los servicios.',
          correct: false,
        },
        {
          id: 'price-list-api',
          label: 'AWS Price List API',
          definition:
            'API para consultar los precios de AWS de forma programática, con una Query API por producto y una Bulk API con archivos JSON o CSV por servicio y Región.',
          explanation:
            'Es la fuente programática de precios: el sistema puede consultar por producto o descargar los archivos por servicio y Región. De ahí obtiene sus precios la propia Pricing Calculator.',
          correct: true,
        },
        {
          id: 'knowledge-center-prices',
          label: 'Los artículos de AWS Knowledge Center',
          definition:
            'Colección de artículos en AWS re:Post con respuestas a preguntas frecuentes, incluidas las de facturación.',
          explanation:
            'Ayuda a resolver dudas frecuentes, pero no es una fuente de precios que un sistema pueda consultar de forma automática por servicio y Región.',
          correct: false,
        },
      ],
    },
    {
      id: 'budget-brake',
      prompt:
        'Ahora mi mayor miedo. El presupuesto del año es fijo. Quiero que me avisen por correo cuando el gasto pronosticado vaya a pasarse y, si llegamos al límite, que se aplique una regla que impida crear más servidores. ¿Qué herramienta hace eso?',
      topicSlug: 'herramientas-de-costos',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-forecast',
          label: 'El pronóstico de AWS Cost Explorer',
          definition:
            'Estimación de cuánto probablemente se gastará en los próximos 18 meses, basada en el uso de la cuenta.',
          explanation:
            'El pronóstico muestra hacia dónde va el gasto, pero no envía alertas ni aplica ninguna regla cuando se supera un umbral.',
          correct: false,
        },
        {
          id: 'calculator-brake',
          label: 'Una estimación en AWS Pricing Calculator con el monto del presupuesto',
          definition:
            'Estimación de costos de una arquitectura, armada con los datos que se ingresan y que se puede guardar y compartir.',
          explanation:
            'La estimación sirve para planificar antes de construir; no vigila el gasto real ni actúa cuando se alcanza un límite.',
          correct: false,
        },
        {
          id: 'billing-page-brake',
          label: 'Revisar a mano la página Bills de la consola cada fin de mes',
          definition:
            'Página de la consola de Billing and Cost Management que muestra el detalle de los cargos mensuales.',
          explanation:
            'Mostraría los cargos cuando ya ocurrieron, sin alertas por gasto pronosticado ni ninguna regla automática que frene la creación de servidores.',
          correct: false,
        },
        {
          id: 'budgets-actions',
          label: 'AWS Budgets con alertas por gasto pronosticado y una budget action',
          definition:
            'Presupuestos de costo con alertas sobre gasto real o pronosticado por correo o Amazon SNS, y acciones configurables como aplicar una política de IAM.',
          explanation:
            'Budgets avisa antes de que el gasto ocurra si la alerta es por pronóstico, y la budget action puede aplicar una política de IAM que impida crear más recursos. Por defecto solo notifica: la acción la configuran ustedes.',
          correct: true,
        },
      ],
    },
    {
      id: 'billing-question',
      prompt:
        'Una última cosa: en la primera factura aparece un cargo que no reconozco. Solo tenemos el plan Basic Support y el contador dice que para hablar con AWS hay que pagar un plan de soporte. ¿Qué hacemos?',
      topicSlug: 'herramientas-de-costos',
      examTasks: ['4.2'],
      options: [
        {
          id: 'buy-paid-support',
          label: 'Contratar primero un plan de soporte pagado y luego preguntar',
          definition:
            'Planes de soporte de AWS que se pagan aparte e incluyen soporte técnico personalizado.',
          explanation:
            'El soporte de cuenta y facturación es gratuito para todos los titulares de cuentas, incluso con Basic Support. Solo el soporte técnico personalizado requiere un plan pagado.',
          correct: false,
        },
        {
          id: 'billing-case',
          label: 'Abrir un caso en AWS Support Center como Account and billing support',
          definition:
            'Canal de soporte de cuenta y facturación disponible para todos los titulares de cuentas, con respuesta por web o por teléfono.',
          explanation:
            'Las dudas de facturación tienen soporte gratuito aun con Basic Support: se abre un caso de Account and billing support en AWS Support Center y se pide respuesta por web o por teléfono.',
          correct: true,
        },
        {
          id: 'new-estimate',
          label: 'Crear una nueva estimación en AWS Pricing Calculator para que AWS corrija la factura',
          definition:
            'Herramienta web para estimar el costo de servicios de AWS a partir de los datos que se ingresan.',
          explanation:
            'Una estimación no modifica ni cuestiona la factura real. Para preguntar por un cargo concreto hay que contactar al soporte de facturación.',
          correct: false,
        },
        {
          id: 'wait-for-budgets',
          label: 'Esperar a que AWS Budgets detecte el cargo y lo anule',
          definition:
            'Servicio de presupuestos que envía alertas y ejecuta acciones configuradas cuando el costo o el uso alcanzan un umbral.',
          explanation:
            'Budgets alerta y ejecuta las acciones que uno configura, pero no revisa ni anula cargos de la factura.',
          correct: false,
        },
      ],
    },
  ],
};
