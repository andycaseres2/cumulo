import type { Mission } from '../../../domain/Mission';

/**
 * Panadería La Espiga: a bakery franchise in Rosario that receives one AWS bill per account and wants to bring them together.
 * Practices AWS Organizations consolidated billing, the management account, Free account plans joining an organization and shared Reserved Instance discounts.
 */
export const facturacionConsolidadaYEtiquetas1: Mission = {
  id: 'facturacion-consolidada-y-etiquetas-1',
  track: 'mercado',
  topicSlug: 'facturacion-consolidada-y-etiquetas',
  buildingId: 'panaderia-espiga',
  title: 'Una sola factura para toda la masa',
  client: { name: 'Héctor Villalba', role: 'Dueño de la franquicia Panadería La Espiga' },
  intro: [
    '¡Adelante, recién salen las medialunas! Soy Héctor Villalba, dueño de La Espiga, una franquicia de panaderías con dieciocho locales en Rosario y alrededores.',
    'Con los años fuimos abriendo cuentas de AWS sueltas: una para la tienda en línea, otra para la app de delivery, otra para el sistema de los locales y una más para que los desarrolladores prueben cosas.',
    'Ahora cada mes me llegan cuatro facturas distintas, el contador las suma a mano y siento que estamos pagando de más, como si fuéramos cuatro clientes chicos en vez de uno mediano.',
    'Quiero ordenar esto antes de abrir los locales de Santa Fe. Me dijeron que tú sabes de facturación en AWS. ¿Me ayudas a amasar todo en una sola factura, sin perder la separación entre las cuatro cuentas?',
  ],
  outro: {
    passed: [
      '¡Qué alivio! Ahora llega una sola factura, el uso de las cuatro cuentas se suma para los descuentos y nadie pierde los créditos ni el ahorro de las reservas.',
      'El contador ya no tiene que sumar a mano y yo puedo pensar en Santa Fe tranquilo. Gracias: en La Espiga siempre habrá una docena de medialunas a tu nombre.',
    ],
    failed: [
      'Mmm... con estas decisiones me parece que seguiríamos con las cuentas desparramadas y pagando de más.',
      'Repasa la teoría de facturación consolidada y vuelve cuando quieras. El horno de La Espiga te espera encendido.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'one-bill',
      prompt:
        'Empecemos por lo que más me molesta: cuatro cuentas, cuatro facturas. Quiero una sola factura y que el uso de todas las cuentas se sume para llegar antes a los precios más bajos por volumen, pero sin juntar todo en una cuenta: cada área debe seguir separada. ¿Qué usamos?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-bill',
          label: 'AWS Cost Explorer',
          definition:
            'Herramienta para ver y analizar costos y uso, con filtros por servicio, cuenta o etiqueta y pronósticos.',
          explanation:
            'Cost Explorer ayuda a analizar el gasto, pero no une las facturas ni combina el uso de cuentas independientes para los descuentos por volumen.',
          correct: false,
        },
        {
          id: 'organizations-consolidated',
          label: 'AWS Organizations con facturación consolidada',
          definition:
            'Servicio que agrupa varias cuentas de AWS en una organización administrada de forma central, con una sola factura para todas.',
          explanation:
            'Con la facturación consolidada, La Espiga recibe una sola factura y el uso de las cuatro cuentas se suma, lo que permite compartir descuentos por volumen, de Reserved Instances y de Savings Plans.',
          correct: true,
        },
        {
          id: 'tags-bill',
          label: 'Etiquetas de asignación de costos en todos los recursos',
          definition:
            'Pares clave-valor activados en la consola de facturación para organizar los costos según ellos.',
          explanation:
            'Las etiquetas sirven para saber quién gasta qué, pero no unen las facturas de cuentas separadas ni suman su uso para los descuentos.',
          correct: false,
        },
        {
          id: 'one-account',
          label: 'Mover todo a una sola cuenta y cerrar las otras tres',
          definition:
            'Estrategia de concentrar todas las cargas de trabajo en una única cuenta de AWS.',
          explanation:
            'Se perdería la separación entre áreas y ambientes, que además es una forma simple de asignar costos. La facturación consolidada da una sola factura sin juntar todo en una cuenta.',
          correct: false,
        },
      ],
    },
    {
      id: 'who-pays',
      prompt:
        'El contador pregunta dos cosas antes de firmar: con la organización armada, ¿quién paga la factura? ¿Y cuánto nos cobra AWS por consolidar?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'each-member-pays',
          label: 'Cada cuenta miembro sigue pagando su propia factura',
          definition:
            'Modelo en el que cada cuenta de AWS paga por separado los cargos de su propio uso.',
          explanation:
            'En una organización paga la cuenta de administración. Las facturas de las cuentas miembro son solo informativas.',
          correct: false,
        },
        {
          id: 'fee-per-account',
          label: 'La cuenta de administración paga todo, más una tarifa mensual por cada cuenta miembro',
          definition:
            'Idea de que agrupar cuentas en una organización tiene un costo adicional por cuenta.',
          explanation:
            'Quién paga es correcto, pero la facturación consolidada es gratuita: no tiene un cargo por cuenta miembro.',
          correct: false,
        },
        {
          id: 'split-equally',
          label: 'AWS reparte la factura en partes iguales entre las cuatro cuentas',
          definition:
            'Idea de que el costo total de una organización se divide en montos iguales entre sus cuentas.',
          explanation:
            'AWS no divide la factura en partes iguales: la cuenta de administración paga y puede ver un reporte de costos por cada cuenta miembro según su uso.',
          correct: false,
        },
        {
          id: 'management-pays-free',
          label: 'La cuenta de administración paga los cargos de todas las cuentas, sin costo extra por consolidar',
          definition:
            'Funcionamiento de la facturación consolidada: la cuenta que paga en la organización cubre los cargos de las cuentas miembro.',
          explanation:
            'La cuenta de administración paga los cargos de todas las cuentas miembro y ve una vista combinada con el detalle por cuenta. La facturación consolidada no tiene costo adicional.',
          correct: true,
        },
      ],
    },
    {
      id: 'free-plan-joins',
      prompt:
        'Detalle importante: la cuenta de pruebas de los desarrolladores la abrimos hace dos meses con el Free account plan y todavía tiene créditos. Si la sumamos a la organización, ¿qué le pasa?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'moves-to-paid',
          label: 'Pasa automáticamente al plan pagado y los créditos que le queden se aplican a sus facturas futuras',
          definition:
            'Comportamiento de una cuenta con el Free account plan cuando se une a una organización de AWS Organizations.',
          explanation:
            'Al unirse a AWS Organizations, la cuenta pasa automáticamente al plan pagado, pero no pierde lo que le queda: los créditos restantes se aplican a sus facturas futuras.',
          correct: true,
        },
        {
          id: 'keeps-free-plan',
          label: 'Sigue con el Free account plan hasta cumplir los seis meses',
          definition:
            'Idea de que una cuenta conserva su plan gratuito aunque pase a formar parte de una organización.',
          explanation:
            'Una cuenta con el plan gratuito que se une a AWS Organizations pasa automáticamente al plan pagado; no conserva el plan gratuito dentro de la organización.',
          correct: false,
        },
        {
          id: 'loses-credits',
          label: 'Pasa al plan pagado y pierde todos los créditos que le quedaban',
          definition:
            'Idea de que el cambio de plan de una cuenta borra los créditos de AWS que no se usaron.',
          explanation:
            'La cuenta sí pasa al plan pagado, pero los créditos que le queden no se pierden: se aplican a sus facturas futuras.',
          correct: false,
        },
        {
          id: 'cannot-join',
          label: 'No puede unirse a la organización hasta que termine su plan gratuito',
          definition:
            'Idea de que una cuenta con el Free account plan tiene prohibido unirse a una organización.',
          explanation:
            'La cuenta sí puede unirse; lo que ocurre es que pasa automáticamente al plan pagado y conserva sus créditos para facturas futuras.',
          correct: false,
        },
      ],
    },
    {
      id: 'shared-ri',
      prompt:
        'Por último: la cuenta de la tienda en línea compró Reserved Instances el año pasado, y la app de delivery corre instancias con los mismos atributos en otra cuenta. Una vez dentro de la organización, ¿qué pasa con ese descuento?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'only-buyer',
          label: 'Solo lo aprovecha la cuenta de la tienda, porque fue la que pagó',
          definition:
            'Idea de que el descuento de una Reserved Instance queda limitado a la cuenta que la compró.',
          explanation:
            'Para la facturación, la organización se trata como una sola cuenta, así que el descuento no queda limitado a la cuenta compradora.',
          correct: false,
        },
        {
          id: 'buy-again',
          label: 'La cuenta de delivery tiene que comprar sus propias Reserved Instances',
          definition:
            'Estrategia de que cada cuenta compre por separado los descuentos que necesita.',
          explanation:
            'No hace falta duplicar la compra: dentro de la organización el descuento se comparte por defecto entre cuentas con instancias que coinciden.',
          correct: false,
        },
        {
          id: 'shared-by-default',
          label: 'Puede aplicarse a las instancias de delivery que coinciden; la cuenta de administración puede desactivarlo',
          definition:
            'Uso compartido de descuentos de Reserved Instances y Savings Plans entre las cuentas de una organización con facturación consolidada.',
          explanation:
            'La organización se trata como una sola cuenta para la facturación, por eso el beneficio de la RI puede aplicarse a instancias que coinciden en otra cuenta. La cuenta de administración puede desactivarlo en la página Preferences de Billing and Cost Management.',
          correct: true,
        },
        {
          id: 'becomes-sp',
          label: 'Las Reserved Instances se convierten en Savings Plans para cubrir ambas cuentas',
          definition:
            'Idea de que unirse a una organización transforma un modelo de compra en otro.',
          explanation:
            'Reserved Instances y Savings Plans son opciones de compra distintas; compartir descuentos en la organización no transforma una en la otra.',
          correct: false,
        },
      ],
    },
  ],
};
