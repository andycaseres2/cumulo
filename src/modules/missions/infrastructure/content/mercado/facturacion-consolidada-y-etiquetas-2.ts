import type { Mission } from '../../../domain/Mission';

/**
 * Agencia Creativa Llama: an advertising agency in Medellín that must bill each of its clients for the AWS resources of their campaigns.
 * Practices cost allocation tag activation, AWS-generated tags, tag best practices and the AWS Cost and Usage Report through AWS Data Exports.
 */
export const facturacionConsolidadaYEtiquetas2: Mission = {
  id: 'facturacion-consolidada-y-etiquetas-2',
  track: 'mercado',
  topicSlug: 'facturacion-consolidada-y-etiquetas',
  buildingId: 'agencia-llama',
  title: 'Cada campaña con su etiqueta',
  client: { name: 'Camila Restrepo', role: 'Directora financiera de Agencia Creativa Llama' },
  intro: [
    '¡Hola! ¡Te damos la bienvenida a Llama! Soy Camila Restrepo, directora financiera de la agencia. Somos un equipo de Medellín que hace campañas digitales para marcas de toda Colombia.',
    'Cada campaña necesita su propia infraestructura en AWS: sitios, concursos, videos. Todo vive en una organización de AWS Organizations, y la factura consolidada llega completa a la cuenta de administración.',
    'El problema es que a fin de mes tengo que cobrarle a cada cliente lo que gastó su campaña, y no sé separar los costos. Etiquetamos los recursos, pero las etiquetas no aparecen por ningún lado.',
    'Si cobro de menos, la agencia pierde plata; si cobro de más, pierdo al cliente. ¿Me ayudas a que cada peso quede asignado a su campaña?',
  ],
  outro: {
    passed: [
      '¡Por fin! Las etiquetas aparecen en los reportes, sé quién creó cada recurso y tengo el detalle por hora de cada campaña listo para consultar.',
      'Este mes cada cliente recibe una cuenta de cobro clara y justa. Gracias: si algún día lanzas tu propia campaña, la agencia te la diseña.',
    ],
    failed: [
      'Mmm... con estas decisiones sigo sin poder decirle a cada cliente cuánto gastó. Así no puedo cerrar el mes.',
      'Repasa la teoría de facturación consolidada y etiquetas y vuelve cuando quieras. Aquí te espero con un tinto.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'activate-tags',
      prompt:
        'Hace una semana pusimos a cada recurso la etiqueta "Cliente" con el nombre de la marca, y los equipos lo hicieron desde sus propias cuentas. Pero en Cost Explorer no podemos agrupar por esa etiqueta. ¿Qué falta?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'activate-in-members',
          label: 'Que cada cuenta miembro active la etiqueta desde su propia consola',
          definition:
            'Idea de que cada cuenta de una organización administra por su cuenta las etiquetas de asignación de costos.',
          explanation:
            'En una organización, solo la cuenta de administración accede al administrador de etiquetas de asignación de costos; las cuentas miembro no pueden activarlas.',
          correct: false,
        },
        {
          id: 'just-wait',
          label: 'Nada: las etiquetas aparecen solas en Cost Explorer con el tiempo',
          definition:
            'Idea de que cualquier etiqueta puesta en un recurso se incluye automáticamente en los reportes de costos.',
          explanation:
            'Una etiqueta no aparece en Cost Explorer solo por existir: primero hay que activarla como etiqueta de asignación de costos.',
          correct: false,
        },
        {
          id: 'activate-in-management',
          label: 'Activar "Cliente" como etiqueta de asignación de costos desde la cuenta de administración',
          definition:
            'Activación de una etiqueta user-defined en la consola de Billing and Cost Management para que AWS organice los costos según ella.',
          explanation:
            'Las etiquetas deben activarse como etiquetas de asignación de costos, y en una organización eso lo hace la cuenta de administración. Pueden tardar hasta 24 horas en aparecer; después se puede filtrar y agrupar por "Cliente".',
          correct: true,
        },
        {
          id: 'separate-bills',
          label: 'Sacar las cuentas de la organización para que cada una tenga su propia factura',
          definition:
            'Estrategia de dejar de usar la facturación consolidada para que cada cuenta pague por separado.',
          explanation:
            'Se perderían la factura única y los descuentos compartidos, y las etiquetas seguirían sin activarse. El problema se resuelve activando la etiqueta.',
          correct: false,
        },
      ],
    },
    {
      id: 'who-created',
      prompt:
        'Otra cosa: aparecen recursos que nadie reconoce. De ahora en adelante quiero saber quién crea cada recurso, sin depender de que cada persona se acuerde de etiquetarlos a mano. ¿Qué etiqueta nos ayuda?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'aws-created-by',
          label: 'La etiqueta AWS-generated aws:createdBy, activada como etiqueta de asignación de costos',
          definition:
            'Etiqueta que AWS asigna a los recursos con el prefijo aws: e indica quién creó el recurso.',
          explanation:
            'La asigna AWS, no las personas, e indica quién creó cada recurso. Como cualquier etiqueta de asignación de costos, hay que activarla por separado para verla en los reportes, y solo se aplica a los recursos creados después de activarla.',
          correct: true,
        },
        {
          id: 'user-creator-tag',
          label: 'Una etiqueta user-defined "Creador" que cada diseñador escribe al crear un recurso',
          definition:
            'Etiqueta clave-valor que crean los propios usuarios y que en los reportes aparece con el prefijo user:.',
          explanation:
            'Depende de que cada persona se acuerde de ponerla, justo lo que Camila quiere evitar. Los recursos sin etiquetar seguirían siendo un misterio.',
          correct: false,
        },
        {
          id: 'consolidated-creator',
          label: 'La facturación consolidada, que ya muestra quién creó cada recurso',
          definition:
            'Función de AWS Organizations que une los cargos de todas las cuentas en una sola factura.',
          explanation:
            'La facturación consolidada muestra los cargos por cuenta, no quién creó cada recurso dentro de ellas.',
          correct: false,
        },
        {
          id: 'calculator-creator',
          label: 'Una estimación por persona en AWS Pricing Calculator',
          definition:
            'Herramienta para estimar el costo de servicios de AWS antes de usarlos, a partir de los datos que se ingresan.',
          explanation:
            'Una estimación planifica costos futuros; no dice quién creó los recursos que ya existen.',
          correct: false,
        },
      ],
    },
    {
      id: 'tag-values',
      prompt:
        'Un diseñador propone ponerle a cada recurso etiquetas con el correo y el teléfono del contacto de cada marca, "para tener todo a mano". ¿Qué le respondo?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'more-tags-better',
          label: 'Que sí: cuantos más datos tengan las etiquetas, mejores serán los reportes',
          definition:
            'Idea de que conviene guardar en las etiquetas toda la información disponible sobre el cliente.',
          explanation:
            'Los reportes solo necesitan un valor para agrupar costos. Y es una buena práctica no incluir información sensible en las etiquetas.',
          correct: false,
        },
        {
          id: 'no-sensitive-data',
          label: 'Que no: las etiquetas no deben llevar información sensible; basta con un código de cliente',
          definition:
            'Buena práctica de etiquetado: usar valores que identifiquen el proyecto o el cliente sin incluir datos personales ni confidenciales.',
          explanation:
            'Una buena práctica es no incluir información sensible en las etiquetas. Un código como "Cliente = marca-042" basta para asignar costos sin exponer datos de contacto.',
          correct: true,
        },
        {
          id: 'aws-prefix',
          label: 'Que sí, pero con el prefijo aws: para que queden protegidas',
          definition:
            'Prefijo que identifica a las etiquetas generadas por AWS o por vendedores ISV de AWS Marketplace.',
          explanation:
            'El prefijo aws: corresponde a etiquetas que genera AWS, no a las que crea la agencia, y no convierte una etiqueta en un lugar adecuado para datos sensibles.',
          correct: false,
        },
        {
          id: 'only-management',
          label: 'Que sí, siempre que solo la cuenta de administración pueda verlas',
          definition:
            'Idea de que restringir quién administra las etiquetas de asignación de costos las vuelve aptas para cualquier dato.',
          explanation:
            'Que la cuenta de administración gestione las etiquetas de asignación de costos no cambia la buena práctica: no se debe incluir información sensible en ellas.',
          correct: false,
        },
      ],
    },
    {
      id: 'hourly-detail',
      prompt:
        'Última pregunta: un cliente grande exige el detalle de su campaña por hora y por recurso, con las etiquetas, y quiero consultarlo con SQL en Amazon Athena. ¿De dónde saco esos datos?',
      topicSlug: 'facturacion-consolidada-y-etiquetas',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-hourly',
          label: 'Una captura de pantalla de AWS Cost Explorer',
          definition:
            'Herramienta de la consola para visualizar y analizar costos y uso con filtros y agrupaciones.',
          explanation:
            'Cost Explorer sirve para visualizar y analizar en la consola; el detalle más granular, como archivos para consultar con Athena, lo entrega el CUR.',
          correct: false,
        },
        {
          id: 'budgets-hourly',
          label: 'Un presupuesto de AWS Budgets por cliente',
          definition:
            'Presupuestos de costo o uso con alertas al acercarse o superar un umbral.',
          explanation:
            'Un presupuesto vigila el gasto y avisa, pero no entrega el detalle por hora y por recurso de lo gastado.',
          correct: false,
        },
        {
          id: 'member-invoices',
          label: 'Las facturas informativas de cada cuenta miembro',
          definition:
            'Facturas que muestran los cargos de cada cuenta miembro dentro de una organización, sin que esa cuenta las pague.',
          explanation:
            'Muestran cargos por cuenta, no el detalle por hora y por recurso con etiquetas que se pueda consultar con Athena.',
          correct: false,
        },
        {
          id: 'cur-data-exports',
          label: 'Una exportación CUR 2.0 de AWS Data Exports hacia Amazon S3',
          definition:
            'El AWS Cost and Usage Report contiene el conjunto más completo de datos de costo y uso; AWS Data Exports permite crearlo en su formato CUR 2.0.',
          explanation:
            'El CUR desglosa los costos por hora, día o mes, por recurso y por las etiquetas activadas, y se entrega en un bucket de S3 que se puede consultar con Athena. CUR 2.0 en Data Exports es la forma recomendada hoy.',
          correct: true,
        },
      ],
    },
  ],
};
