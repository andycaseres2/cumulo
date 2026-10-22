import type { Mission } from '../../domain/Mission';

/**
 * Startup Hub: a fast-growing startup whose AWS bill tripled and nobody knows why.
 * Practices AWS Cost Explorer, AWS Budgets, cost allocation tags, rightsizing and Spot Instances.
 */
export const startupCosts: Mission = {
  id: 'startup-costs',
  buildingId: 'startup',
  title: 'La factura que nadie entiende',
  client: { name: 'Valeria Ríos', role: 'CEO de Startup Hub' },
  intro: [
    '¡Qué bueno que viniste! Soy Valeria Ríos, CEO de Startup Hub. Somos una startup de Santiago y este año pasamos de ocho a cuarenta personas.',
    'Crecimos tan rápido que cada equipo empezó a lanzar sus propios servidores en AWS. Algunos los encienden para una prueba y se olvidan de apagarlos.',
    'Este mes la factura de AWS se triplicó. Nadie nos avisó antes de que pasara y, cuando pregunté en la reunión, ningún equipo supo decir cuánto gasta.',
    'Nuestros inversionistas quieren ver que controlamos los costos. No quiero frenar a los equipos, pero necesito entender y ordenar este gasto. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      '¡Increíble! Ahora sé en qué se va el dinero, recibo alertas antes de pasarme y cada equipo ve su propio gasto gracias a las etiquetas.',
      'Con servidores del tamaño correcto y Spot para los procesos nocturnos, la próxima reunión con los inversionistas va a ser muy distinta. ¡Gracias, consultor!',
    ],
    failed: [
      'Mmm... todavía no tengo claro cómo vamos a controlar la factura. Algunas de estas decisiones no me convencen.',
      'Repasa la teoría de costos con calma y vuelve cuando quieras. ¡Aquí te espero con un café!',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'analyze-spend',
      prompt:
        'Lo primero: quiero ver en qué servicios se nos va el dinero y cómo cambió el gasto mes a mes, para entender por qué se triplicó. ¿Qué herramienta uso?',
      topicSlug: 'herramientas-de-costos',
      examTasks: ['4.2'],
      options: [
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition: 'Herramienta web gratuita para crear estimaciones de costos de servicios de AWS antes de construir una solución.',
          explanation:
            'Pricing Calculator estima cuánto costará algo que todavía no existe. Valeria necesita analizar lo que ya gastó, no estimar una arquitectura nueva.',
          correct: false,
        },
        {
          id: 'cost-explorer',
          label: 'AWS Cost Explorer',
          definition:
            'Herramienta para ver y analizar costos y uso, con hasta 13 meses de historial, pronósticos y filtros por servicio, cuenta o etiqueta.',
          explanation:
            'Correcto. Cost Explorer muestra el gasto agrupado por servicio y su evolución en el tiempo, justo lo que hace falta para descubrir qué hizo subir la factura.',
          correct: true,
        },
        {
          id: 'budgets',
          label: 'AWS Budgets',
          definition: 'Servicio para definir presupuestos de costo o uso y recibir alertas cuando el gasto se acerca o supera un umbral.',
          explanation:
            'Budgets sirve para avisar antes de pasarse, pero no está pensado para analizar el historial y encontrar qué servicio disparó el gasto.',
          correct: false,
        },
        {
          id: 'trusted-advisor',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona tu entorno y recomienda mejores prácticas en categorías como optimización de costos, seguridad y rendimiento.',
          explanation:
            'Trusted Advisor da recomendaciones generales sobre tu entorno, pero no muestra el gasto por servicio a lo largo de los meses como lo hace Cost Explorer.',
          correct: false,
        },
      ],
    },
    {
      id: 'budget-alerts',
      prompt:
        'Ya entiendo qué pasó. Ahora quiero que nunca más me sorprenda la factura: necesito un aviso por correo antes de pasarme del presupuesto mensual. ¿Qué uso?',
      topicSlug: 'herramientas-de-costos',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer',
          label: 'AWS Cost Explorer',
          definition:
            'Herramienta para ver y analizar costos y uso, con hasta 13 meses de historial, pronósticos y filtros por servicio, cuenta o etiqueta.',
          explanation:
            'Cost Explorer muestra pronósticos, pero no envía alertas cuando te acercas a un umbral. Confundir pronóstico con alerta es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition: 'Herramienta web gratuita para crear estimaciones de costos de servicios de AWS antes de construir una solución.',
          explanation:
            'Pricing Calculator ayuda a planificar un gasto estimado, pero no vigila el gasto real de la cuenta ni avisa cuando se acerca al límite.',
          correct: false,
        },
        {
          id: 'cur',
          label: 'AWS Cost and Usage Report',
          definition:
            'Conjunto más completo de datos de costo y uso, entregado como archivos en un bucket de Amazon S3 para analizarlos en detalle.',
          explanation:
            'El CUR entrega datos muy detallados para análisis, pero no envía avisos. Valeria necesita una alerta automática, no más archivos que revisar.',
          correct: false,
        },
        {
          id: 'budgets',
          label: 'AWS Budgets',
          definition: 'Servicio para definir presupuestos de costo o uso y recibir alertas cuando el gasto se acerca o supera un umbral.',
          explanation:
            'Exacto. Un cost budget puede alertar sobre el gasto real o pronosticado, por correo electrónico o por Amazon SNS, antes de que la factura se dispare.',
          correct: true,
        },
      ],
    },
    {
      id: 'cost-per-team',
      prompt:
        'En la reunión nadie supo cuánto gasta su equipo. Todos los recursos están en la misma cuenta. ¿Cómo hago para ver en Cost Explorer el gasto de cada equipo?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-allocation-tags',
          label: 'Etiquetar los recursos y activar esas etiquetas como etiquetas de asignación de costos',
          definition:
            'Las etiquetas de asignación de costos son pares clave-valor, como Equipo = pagos, que se activan en Billing and Cost Management para organizar los costos.',
          explanation:
            'Correcto. Con una etiqueta como Equipo activada en la consola de facturación, Cost Explorer puede filtrar y agrupar el gasto por equipo.',
          correct: true,
        },
        {
          id: 'tags-not-activated',
          label: 'Etiquetar los recursos y esperar que aparezcan solas en Cost Explorer',
          definition: 'Asignar etiquetas a los recursos sin activarlas como etiquetas de asignación de costos en la consola de facturación.',
          explanation:
            'Etiquetar es el primer paso, pero las etiquetas deben activarse en Billing and Cost Management antes de aparecer en Cost Explorer o en los reportes.',
          correct: false,
        },
        {
          id: 'consolidated-billing',
          label: 'Activar la facturación consolidada de AWS Organizations',
          definition:
            'Función de AWS Organizations que agrupa varias cuentas en una sola factura pagada por la cuenta de administración.',
          explanation:
            'La facturación consolidada une las facturas de varias cuentas, pero Startup Hub tiene todo en una sola cuenta: por sí sola no separa el gasto por equipo.',
          correct: false,
        },
        {
          id: 'pricing-estimates',
          label: 'Crear una estimación por equipo en AWS Pricing Calculator',
          definition: 'Herramienta web gratuita para crear estimaciones de costos y agruparlas según tu arquitectura.',
          explanation:
            'Las estimaciones muestran lo que podría costar algo, no lo que cada equipo gastó realmente. Valeria necesita datos reales de la factura.',
          correct: false,
        },
      ],
    },
    {
      id: 'rightsizing',
      prompt:
        'Ahora veo que muchos servidores grandes pasan el día casi sin uso. Los equipos eligieron el tamaño "por si acaso". ¿Cómo ajustamos eso sin adivinar?',
      topicSlug: 'economia-de-la-nube',
      examTasks: ['1.4'],
      options: [
        {
          id: 'bigger-instances',
          label: 'Cambiar a instancias todavía más grandes para estar seguros',
          definition: 'Escalado vertical: reemplazar un servidor por otro con más CPU y memoria.',
          explanation:
            'Si los servidores ya están casi sin uso, agrandarlos solo aumenta el desperdicio. El problema de Valeria es el sobredimensionamiento.',
          correct: false,
        },
        {
          id: 'reserved-oversized',
          label: 'Comprar Reserved Instances para esos mismos servidores',
          definition: 'Descuento de facturación en instancias EC2 a cambio de un compromiso de uno o tres años con una configuración.',
          explanation:
            'Comprometerse por años con servidores sobredimensionados asegura un descuento sobre capacidad que nadie usa. Primero hay que ajustar el tamaño.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'Hacer rightsizing con las recomendaciones de AWS Compute Optimizer',
          definition:
            'Rightsizing es ajustar el tipo y tamaño de los recursos al uso real; Compute Optimizer analiza métricas de uso y recomienda el tamaño adecuado.',
          explanation:
            'Exacto. Compute Optimizer revisa las métricas de uso de las instancias EC2, señala las sobredimensionadas o inactivas y recomienda cómo reducir costos.',
          correct: true,
        },
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'Servicio para administrar licencias de software de proveedores como Microsoft, SAP, Oracle e IBM y evitar incumplimientos.',
          explanation:
            'License Manager gestiona licencias, no analiza el uso de los servidores ni recomienda tamaños. No resuelve el desperdicio de Startup Hub.',
          correct: false,
        },
      ],
    },
    {
      id: 'nightly-batch',
      prompt:
        'Última pregunta. Cada noche corremos procesos que generan reportes; si uno se interrumpe, simplemente lo repetimos. ¿Qué opción de compra de EC2 es la más barata para eso?',
      topicSlug: 'modelos-de-compra-ec2',
      examTasks: ['4.1'],
      options: [
        {
          id: 'on-demand',
          label: 'On-Demand Instances',
          definition: 'Pago por hora o por segundo de uso, sin pago inicial ni compromiso a largo plazo.',
          explanation:
            'On-Demand funciona, pero es el precio de referencia, sin descuento. Para un proceso que tolera interrupciones existe una opción mucho más barata.',
          correct: false,
        },
        {
          id: 'spot',
          label: 'Spot Instances',
          definition:
            'Capacidad sobrante de EC2 con hasta un 90 % de descuento frente a On-Demand, que AWS puede recuperar con un aviso de dos minutos.',
          explanation:
            'Correcto. Los procesos nocturnos de Valeria toleran interrupciones porque se pueden repetir, así que Spot da el mayor ahorro sin poner en riesgo el negocio.',
          correct: true,
        },
        {
          id: 'savings-plans',
          label: 'Savings Plans',
          definition: 'Compromiso de un monto constante de uso, en USD por hora, durante 1 o 3 años, a cambio de un descuento.',
          explanation:
            'Los Savings Plans convienen para cargas estables que corren todo el día, como un servidor web 24/7, no para procesos interrumpibles de unas horas por noche.',
          correct: false,
        },
        {
          id: 'dedicated-hosts',
          label: 'Dedicated Hosts',
          definition: 'Un servidor físico completo dedicado a ti, con visibilidad de sockets y núcleos, facturado por host.',
          explanation:
            'Los Dedicated Hosts sirven para licencias por socket o núcleo o requisitos de cumplimiento. Para estos reportes solo sumarían costo.',
          correct: false,
        },
      ],
    },
  ],
};
