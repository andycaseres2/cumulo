import type { Mission } from '../../../domain/Mission';

/**
 * Lente Viajero: a travel-photo app startup in Montevideo whose Amazon S3 bill grows faster than its users.
 * Practices S3 Intelligent-Tiering, S3 One Zone-IA, S3 Glacier Instant Retrieval and the S3 pricing dimensions.
 */
export const clasesDeAlmacenamientoS32: Mission = {
  id: 'clases-de-almacenamiento-s3-2',
  track: 'tecnologico',
  topicSlug: 'clases-de-almacenamiento-s3',
  buildingId: 'startup-lab',
  title: 'Millones de fotos, una sola factura',
  client: { name: 'Valentina Ortiz', role: 'Cofundadora y CTO de Lente Viajero' },
  intro: [
    '¡Hola! Te damos la bienvenida al Startup Lab. Soy Valentina Ortiz, cofundadora de Lente Viajero, una app donde los viajeros guardan y comparten las fotos de sus viajes. Empezamos en Montevideo y ya tenemos usuarios en toda la región.',
    'Todas las fotos viven en Amazon S3, y todas en S3 Standard, porque fue lo primero que configuramos. Ya guardamos millones de imágenes y la factura de almacenamiento crece más rápido que los usuarios.',
    'Nuestros inversionistas quieren ver que podemos crecer sin quemar el dinero en almacenamiento. Si en la próxima reunión no muestro un plan, la siguiente ronda se complica.',
    'Sé que S3 tiene varias clases de almacenamiento, pero no sé cuál conviene para cada tipo de foto. ¿Me ayudas a armar el plan?',
  ],
  outro: {
    passed: [
      '¡Esto es justo lo que necesitaba! Las fotos de acceso impredecible se acomodan solas, las miniaturas recreables están en una sola zona y los recuerdos antiguos se abren al instante sin pagar como si fueran nuevos.',
      'Y ya puedo explicarles a los inversionistas en qué se nos va cada dólar de S3. Gracias: en Lente Viajero siempre tendrás un lugar en el equipo.',
    ],
    failed: [
      'Mmm... con este plan la factura no va a bajar, o los usuarios se van a quejar de fotos que no cargan. Algunas decisiones no me cierran.',
      'Repasa la teoría de las clases de almacenamiento de S3 y vuelve cuando quieras. Los inversionistas pueden esperar un poco más.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'unpredictable-photos',
      prompt:
        'Empecemos por las fotos originales recién subidas. Algunas se vuelven virales y se ven miles de veces; otras nadie las vuelve a abrir. No hay forma de saber cuál será cuál. ¿En qué clase las guardamos?',
      topicSlug: 'clases-de-almacenamiento-s3',
      examTasks: ['3.6'],
      options: [
        {
          id: 'keep-standard',
          label: 'Dejarlas en S3 Standard, como hasta ahora',
          definition:
            'Clase por defecto de Amazon S3, pensada para datos de acceso frecuente, con recuperación en milisegundos y sin cargo por recuperar.',
          explanation:
            'Es lo que hoy infla la factura: Lente Viajero paga precio de acceso frecuente incluso por las fotos que nadie vuelve a abrir.',
          correct: false,
        },
        {
          id: 'originals-one-zone',
          label: 'S3 One Zone-IA',
          definition:
            'Clase para acceso poco frecuente que guarda los datos en una sola Availability Zone, recomendada para datos que se pueden recrear.',
          explanation:
            'Las fotos originales de los viajeros no se pueden volver a generar si se pierden. Guardar la única copia en una sola zona es un riesgo que no corresponde.',
          correct: false,
        },
        {
          id: 'intelligent-tiering',
          label: 'S3 Intelligent-Tiering',
          definition:
            'Clase que mueve cada objeto automáticamente entre niveles de acceso según su uso, con un cargo de monitoreo por objeto y sin cargo por recuperación.',
          explanation:
            'Es la clase para patrones de acceso desconocidos o cambiantes: si una foto no se abre durante 30 días pasa a un nivel más barato, y si se vuelve viral regresa al nivel frecuente, sin cargos por recuperación.',
          correct: true,
        },
        {
          id: 'lifecycle-to-deep-archive',
          label: 'Una regla de ciclo de vida que pase todas las fotos a S3 Glacier Deep Archive a los 30 días',
          definition:
            'Regla de transición que mueve automáticamente los objetos a la clase de archivo de menor costo después de cierto tiempo.',
          explanation:
            'Una regla de ciclo de vida funciona cuando el patrón es predecible, y aquí no lo es. Además, en Deep Archive una foto que se vuelve viral exigiría una restauración de horas.',
          correct: false,
        },
      ],
    },
    {
      id: 'thumbnails',
      prompt:
        'La app genera automáticamente miniaturas a partir de cada foto original. Si una se pierde, la volvemos a generar en segundos. Se consultan más o menos una vez al mes, pero cuando se piden deben cargar al instante. ¿Dónde las guardamos para pagar menos?',
      topicSlug: 'clases-de-almacenamiento-s3',
      examTasks: ['3.6'],
      options: [
        {
          id: 'thumbs-one-zone-ia',
          label: 'S3 One Zone-IA',
          definition:
            'Clase para acceso poco frecuente que guarda los datos en una sola Availability Zone, con recuperación en milisegundos y cargo por GB recuperado.',
          explanation:
            'Las miniaturas se pueden recrear a partir de los originales, justo el tipo de dato para el que AWS recomienda One Zone-IA. Se leen en milisegundos y su almacenamiento cuesta menos que en una clase de varias zonas.',
          correct: true,
        },
        {
          id: 'thumbs-flexible',
          label: 'S3 Glacier Flexible Retrieval',
          definition:
            'Clase de archivo en la que los objetos deben restaurarse antes de leerse, con recuperaciones de minutos a horas.',
          explanation:
            'Las miniaturas deben cargar al instante cuando el usuario abre su álbum. Una clase que exige restaurar cada objeto antes de leerlo no sirve aquí.',
          correct: false,
        },
        {
          id: 'thumbs-express',
          label: 'S3 Express One Zone',
          definition:
            'Clase de una sola Availability Zone, elegida por el cliente, diseñada para aplicaciones muy sensibles a la latencia, con acceso de un solo dígito de milisegundos.',
          explanation:
            'Express One Zone está pensada para cargas que necesitan latencia mínima en cada acceso, no para ahorrar en datos que se consultan una vez al mes.',
          correct: false,
        },
        {
          id: 'thumbs-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'Clase de archivo de menor costo de AWS, para datos consultados menos de una vez al año; requiere restaurar los objetos y la recuperación toma horas.',
          explanation:
            'Una miniatura que tarda horas en restaurarse rompe la app. Además, Deep Archive está pensada para datos que se consultan menos de una vez al año, no una vez al mes.',
          correct: false,
        },
      ],
    },
    {
      id: 'memories-album',
      prompt:
        'Ahora, las fotos de viajes de hace más de un año. Se abren más o menos una vez por trimestre, cuando la app muestra el álbum "Recuerdos", y en ese momento tienen que verse al instante. ¿Qué clase usamos?',
      topicSlug: 'clases-de-almacenamiento-s3',
      examTasks: ['3.6'],
      options: [
        {
          id: 'memories-flexible',
          label: 'S3 Glacier Flexible Retrieval',
          definition:
            'Clase de archivo para datos consultados una o dos veces al año, cuyos objetos deben restaurarse antes de leerse.',
          explanation:
            'Elegir Flexible Retrieval cuando piden acceso inmediato es una trampa típica: cada foto necesitaría una restauración de minutos a horas antes de mostrarse.',
          correct: false,
        },
        {
          id: 'memories-one-zone',
          label: 'S3 One Zone-IA',
          definition:
            'Clase de acceso poco frecuente que guarda los objetos en una sola Availability Zone.',
          explanation:
            'Estas son las fotos originales de los viajeros, que no se pueden recrear. Dejar la única copia en una sola zona no es aceptable.',
          correct: false,
        },
        {
          id: 'memories-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'Clase de archivo de menor costo de AWS, con duración mínima de 180 días y recuperaciones que toman horas.',
          explanation:
            'Es la más barata para guardar, pero cada foto tardaría horas en restaurarse. El álbum "Recuerdos" necesita mostrarlas en el momento.',
          correct: false,
        },
        {
          id: 'memories-instant',
          label: 'S3 Glacier Instant Retrieval',
          definition:
            'Clase de archivo con acceso en milisegundos, pensada para datos consultados aproximadamente una vez por trimestre, con cargo por recuperación.',
          explanation:
            'Es la respuesta para archivo con acceso inmediato: almacenamiento más barato que Standard-IA, lectura en milisegundos y un acceso más caro que se justifica porque se consultan pocas veces al año.',
          correct: true,
        },
      ],
    },
    {
      id: 'bill-dimensions',
      prompt:
        'Para la reunión con los inversionistas: subimos varios terabytes de fotos al mes desde los celulares, y uno de ellos cree que esa subida es lo que más pagamos. ¿Qué cobra realmente Amazon S3?',
      topicSlug: 'clases-de-almacenamiento-s3',
      examTasks: ['4.1'],
      options: [
        {
          id: 'only-gb-stored',
          label: 'Solo los GB guardados, sin importar la clase ni cuántas veces se lean',
          definition:
            'Modelo de cobro en el que el único factor del precio es el volumen de datos almacenados.',
          explanation:
            'El costo de S3 no es solo GB guardados: también cuentan la clase de almacenamiento, las solicitudes, las recuperaciones y la transferencia de salida.',
          correct: false,
        },
        {
          id: 'storage-requests-egress',
          label: 'Almacenamiento según la clase, solicitudes y recuperaciones, y transferencia de datos de salida',
          definition:
            'Dimensiones principales del precio de S3: lo que se guarda y en qué clase, las solicitudes y recuperaciones, y los datos que salen de AWS.',
          explanation:
            'Esas son las dimensiones principales. La entrada de datos desde internet no tiene costo, así que la subida desde los celulares no es lo que pesa en la factura de Lente Viajero.',
          correct: true,
        },
        {
          id: 'upload-per-gb',
          label: 'Sobre todo la subida: cada GB que entra desde internet se cobra',
          definition:
            'Modelo de cobro centrado en los datos que los usuarios envían hacia el almacenamiento desde internet.',
          explanation:
            'Es al revés: la entrada de datos desde internet no tiene costo. Lo que se cobra es la transferencia de salida, junto con el almacenamiento y las solicitudes.',
          correct: false,
        },
        {
          id: 'flat-fee-bucket',
          label: 'Una tarifa fija mensual por cada bucket, con capacidad reservada',
          definition:
            'Modelo de precio por suscripción en el que se paga un monto fijo por contenedor y por una capacidad reservada de antemano.',
          explanation:
            'S3 no funciona con capacidad reservada: se paga por uso, según lo que se guarda, se solicita y se transfiere hacia fuera.',
          correct: false,
        },
      ],
    },
  ],
};
