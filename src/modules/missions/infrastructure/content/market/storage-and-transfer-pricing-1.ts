import type { Mission } from '../../../domain/Mission';

/**
 * FotoRuta: a travel-photo startup from Córdoba, Argentina, with an office at Startup Hub, testing its app on the Free account plan.
 * Practices the current AWS Free Tier plans, data transfer charges, Amazon EBS provisioned storage and tiered pricing.
 */
export const storageAndTransferPricing1: Mission = {
  id: 'storage-and-transfer-pricing-1',
  track: 'market',
  topicSlug: 'storage-and-transfer-pricing',
  buildingId: 'startup',
  title: 'Fotos que pesan en la factura',
  client: { name: 'Joaquín Herrera', role: 'Cofundador de FotoRuta' },
  intro: [
    '¡Hola! Soy Joaquín Herrera, cofundador de FotoRuta. Somos tres personas de Córdoba, Argentina, con una oficina chiquita aquí en el Startup Hub.',
    'Hicimos una app donde los viajeros suben sus fotos de cada ruta y otros las descargan para planear su viaje. Las fotos van a Amazon S3 y el backend corre en Amazon EC2.',
    'Empezamos una prueba de concepto en AWS, pero no entiendo bien qué nos van a cobrar: ni cuándo se termina lo gratuito, ni qué movimientos de datos cuestan, ni por qué el disco del servidor sale tan caro.',
    'La semana que viene les presento números a unos inversores y no quiero que una factura sorpresa nos hunda. ¿Me ayudas a entender cómo cobra AWS?',
  ],
  outro: {
    passed: [
      '¡Genial! Ya sé cuándo termina el plan gratuito, qué tráfico se paga, por qué el disco cobra lo que reservamos y por qué el precio por GB baja cuando crecemos.',
      'Con estos números los inversores van a ver que tenemos los costos bajo control. Gracias: cuando FotoRuta sea grande, tu foto va en la portada.',
    ],
    failed: [
      'Mmm... todavía tengo dudas sobre qué nos van a cobrar. Así no me animo a presentar los números.',
      'Repasa la teoría de precios de almacenamiento y transferencia y vuelve cuando quieras. Aquí te espero con un mate.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'free-plan-end',
      prompt:
        'Creamos la cuenta con el Free account plan para la prueba de concepto. Un amigo me dijo que lo gratuito dura un año, otro que dura para siempre. ¿Cuándo termina en realidad nuestro plan?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'twelve-months',
          label: 'A los 12 meses de crear la cuenta',
          definition:
            'Duración que se asociaba a la capa gratuita en la descripción anterior de AWS Free Tier.',
          explanation:
            'Eso corresponde al modelo antiguo de la capa gratuita. El Free account plan actual dura hasta seis meses.',
          correct: false,
        },
        {
          id: 'never-ends',
          label: 'Nunca, mientras usen solo las ofertas Always Free',
          definition:
            'Las ofertas Always Free son asignaciones mensuales permanentes en algunos servicios de AWS.',
          explanation:
            'Las ofertas Always Free existen, pero no extienden el Free account plan: el plan termina por tiempo o por créditos, y para seguir hay que pasar al plan pagado.',
          correct: false,
        },
        {
          id: 'six-months-or-credits',
          label: 'A los seis meses o cuando se agoten los créditos, lo que ocurra primero',
          definition:
            'Regla de término del Free account plan, el plan de AWS para experimentar y hacer pruebas de concepto con créditos de AWS.',
          explanation:
            'El plan gratuito dura hasta seis meses y también termina si FotoRuta agota sus créditos antes. Para seguir después, deben pasar al Paid account plan, donde los créditos que queden aplican primero.',
          correct: true,
        },
        {
          id: 'first-trial',
          label: 'Cuando usen por primera vez un servicio con prueba de corto plazo',
          definition:
            'Las pruebas de corto plazo son ofertas de prueba de servicios seleccionados dentro de la capa gratuita.',
          explanation:
            'Las pruebas de corto plazo aplican a cuentas con el plan pagado; usarlas no es lo que hace terminar el Free account plan.',
          correct: false,
        },
      ],
    },
    {
      id: 'photo-transfer',
      prompt:
        'Ahora el tráfico. Los viajeros suben fotos desde el celular, las fotos se procesan en EC2 en la misma Región y luego otros usuarios las descargan directo desde S3 por internet. ¿Cuál de esos movimientos nos genera un cargo por transferencia de datos?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'upload-from-internet',
          label: 'Los viajeros suben las fotos desde internet a Amazon S3',
          definition:
            'Transferencia de datos de entrada: bytes que llegan desde internet hacia un servicio de AWS.',
          explanation:
            'La entrada de datos desde internet hacia AWS en general no se cobra, y en S3 la entrada desde internet es gratis.',
          correct: false,
        },
        {
          id: 'download-to-internet',
          label: 'Los usuarios descargan las fotos desde S3 por internet',
          definition:
            'Transferencia de datos de salida: bytes que salen de AWS hacia internet, que aparecen en la factura como AWS Data Transfer Out.',
          explanation:
            'La salida de datos hacia internet se cobra por GB, con tarifas según la Región de origen. Es uno de los tres impulsores fundamentales del costo, junto con el cómputo y el almacenamiento.',
          correct: true,
        },
        {
          id: 's3-to-ec2-same-region',
          label: 'EC2 lee las fotos desde S3 en la misma Región para procesarlas',
          definition:
            'Transferencia de datos entre servicios de AWS ubicados en la misma Región.',
          explanation:
            'En S3, la transferencia hacia otros servicios de AWS en la misma Región es gratis, así que procesar las fotos en EC2 no suma cargo de transferencia.',
          correct: false,
        },
        {
          id: 'no-transfer-charges',
          label: 'Ninguno, porque en AWS solo se paga el cómputo y el almacenamiento',
          definition:
            'La idea de que mover datos hacia, desde o dentro de AWS no forma parte de lo que se paga.',
          explanation:
            'La transferencia sí tiene precio en varios casos: la salida a internet, entre Regiones y entre Availability Zones suelen cobrarse.',
          correct: false,
        },
      ],
    },
    {
      id: 'ebs-volume',
      prompt:
        'Algo que no entiendo: al servidor le pusimos un volumen de Amazon EBS de 1 TB "por si acaso", pero solo tiene 80 GB de datos. Y la factura del disco es alta. ¿Cómo nos cobra EBS?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'ebs-provisioned',
          label: 'Por el 1 TB aprovisionado, en GB-mes, hasta que liberen el volumen',
          definition:
            'Dimensión de precio de Amazon EBS basada en el almacenamiento aprovisionado, medido en GB-mes.',
          explanation:
            'EBS cobra el tamaño que reservas, no lo que escribes, hasta que liberas el volumen. El "por si acaso" de 1 TB es justo lo que encarece la factura; conviene aprovisionar lo que necesitan.',
          correct: true,
        },
        {
          id: 'ebs-written',
          label: 'Solo por los 80 GB que tienen datos',
          definition:
            'Modelo de cobro en el que se paga únicamente el espacio que ocupan los datos escritos.',
          explanation:
            'EBS no cobra solo lo escrito: cobra el almacenamiento aprovisionado. Por eso pagan el tamaño completo del volumen.',
          correct: false,
        },
        {
          id: 'ebs-requests',
          label: 'Solo por las solicitudes PUT y GET que hace el servidor',
          definition:
            'Cobro por tipo de solicitud, como PUT, GET o LIST, sobre los objetos almacenados.',
          explanation:
            'El cobro por tipo de solicitud es una dimensión de precio de Amazon S3. En EBS se paga el almacenamiento aprovisionado, más IOPS y rendimiento aprovisionados en ciertos tipos de volumen.',
          correct: false,
        },
        {
          id: 'ebs-snapshots-only',
          label: 'Solo por los snapshots que se creen del volumen',
          definition:
            'Copias incrementales de un volumen EBS que se cobran por el espacio que ocupan los datos.',
          explanation:
            'Los snapshots se cobran aparte. El volumen en sí se cobra por su tamaño aprovisionado, tengan o no snapshots.',
          correct: false,
        },
      ],
    },
    {
      id: 'tiered-pricing',
      prompt:
        'Última pregunta para los inversores. Proyectamos pasar de 2 a 200 TB de fotos en S3. Mi socio dice que el precio por GB va a bajar a medida que crezcamos. ¿Tiene razón? ¿Qué principio de precios de AWS lo explica?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'pay-as-you-go',
          label: 'Pago por uso (pay-as-you-go)',
          definition:
            'Principio por el que, en la gran mayoría de servicios, se paga solo lo que se consume, sin contratos a largo plazo.',
          explanation:
            'El pago por uso explica que paguen según lo que almacenan, pero no por qué el precio de cada GB baja al crecer.',
          correct: false,
        },
        {
          id: 'save-when-commit',
          label: 'Ahorra cuando te comprometes',
          definition:
            'Principio por el que modelos como Savings Plans o Reserved Instances bajan el precio a cambio de un compromiso de 1 o 3 años.',
          explanation:
            'FotoRuta no firma ningún compromiso para su almacenamiento en S3; la baja del precio por GB viene del volumen, no de un plazo.',
          correct: false,
        },
        {
          id: 'always-free',
          label: 'Ofertas Always Free',
          definition:
            'Asignaciones mensuales permanentes que algunos servicios de AWS incluyen sin costo.',
          explanation:
            'Las ofertas Always Free son cantidades mensuales fijas en algunos servicios; no explican una baja del precio por GB a medida que crece el volumen.',
          correct: false,
        },
        {
          id: 'pay-less-using-more',
          label: 'Paga menos por unidad al usar más (precios escalonados)',
          definition:
            'Principio por el que algunos servicios tienen niveles de precio por volumen (tiered pricing): cuanto más se usa, menos se paga por unidad.',
          explanation:
            'Su socio tiene razón: Amazon S3 tiene precios escalonados, así que, cuando FotoRuta supere ciertos niveles de volumen, cada GB adicional le costará menos.',
          correct: true,
        },
      ],
    },
  ],
};
