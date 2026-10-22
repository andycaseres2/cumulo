import type { Mission } from '../../../domain/Mission';

/**
 * Retail Andes: a supermarket chain in La Paz whose Amazon S3 bill grew after picking storage classes and replicas "just in case".
 * Practices Amazon S3 storage classes, data transfer between Availability Zones and Regions, S3 Intelligent-Tiering and minimum storage durations.
 */
export const preciosDeAlmacenamientoYTransferencia2: Mission = {
  id: 'precios-de-almacenamiento-y-transferencia-2',
  track: 'mercado',
  topicSlug: 'precios-de-almacenamiento-y-transferencia',
  buildingId: 'retail-andes',
  title: 'El costo de guardar por si acaso',
  client: { name: 'Gabriela Mamani', role: 'Jefa de infraestructura de Retail Andes' },
  intro: [
    'Gracias por subir hasta nuestra oficina. Soy Gabriela Mamani, jefa de infraestructura de Retail Andes, una cadena de supermercados con cuarenta locales en La Paz y El Alto.',
    'Guardamos casi todo en Amazon S3: las fotos del catálogo, los registros de las cajas, los archivos de las campañas. Cada área eligió la clase de almacenamiento "que le pareció más barata" y replicó cosas a otros lados por si acaso.',
    'El resultado: cargos de recuperación que nadie entiende, cobros por días que no usamos y un renglón de transferencia de datos que crece cada mes.',
    'El directorio me pidió ordenar el almacenamiento antes del cierre del trimestre. Necesito a alguien que sepa cómo cobra AWS. ¿Me das una mano?',
  ],
  outro: {
    passed: [
      '¡Ahora sí! Cada dato está en la clase de S3 que corresponde a cómo se usa, sabemos qué tráfico se paga y ya nadie borra archivos antes de su duración mínima sin saber lo que cuesta.',
      'Le voy a mostrar al directorio un plan claro y sin sorpresas. Gracias: en Retail Andes siempre tendrás un api con buñuelos esperándote.',
    ],
    failed: [
      'Mmm... con estas decisiones creo que la factura de S3 seguiría dándonos sorpresas. Algo no termina de cuadrar.',
      'Repasa la teoría de precios de almacenamiento y transferencia y vuelve cuando quieras. La oficina sigue abierta para ti.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'catalog-images',
      prompt:
        'Empecemos por el catálogo. Las fotos de los productos las consultan todos los días la web, la app y las pantallas de los cuarenta locales. Alguien las movió a una clase más barata y aparecieron cargos de recuperación. ¿Dónde deberían estar?',
      topicSlug: 'precios-de-almacenamiento-y-transferencia',
      examTasks: ['4.1'],
      options: [
        {
          id: 'catalog-standard-ia',
          label: 'S3 Standard-IA',
          definition:
            'Clase de S3 para acceso poco frecuente, con menor costo de almacenamiento, cargo por recuperación y duración mínima de 30 días.',
          explanation:
            'Almacenar cuesta menos, pero cada lectura genera cargo por recuperación. Con fotos que se leen todos los días, eso es justo lo que infla la factura.',
          correct: false,
        },
        {
          id: 'catalog-glacier-instant',
          label: 'S3 Glacier Instant Retrieval',
          definition:
            'Clase de archivo de S3 con acceso inmediato, costo de almacenamiento aún menor, cargo por recuperación y duración mínima de 90 días.',
          explanation:
            'Está pensada para datos de archivo que se consultan poco. El acceso diario del catálogo generaría cargos de recuperación constantes.',
          correct: false,
        },
        {
          id: 'catalog-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'Clase de archivo de S3 con el costo de almacenamiento más bajo, cargos de restauración y duración mínima de 180 días.',
          explanation:
            'Es para datos que casi nunca se leen. Las fotos del catálogo se necesitan al instante y todos los días; aquí habría restauraciones permanentes.',
          correct: false,
        },
        {
          id: 'catalog-standard',
          label: 'S3 Standard',
          definition:
            'Clase de S3 de uso general, con el costo de almacenamiento más alto entre estas opciones y sin cargo por recuperación.',
          explanation:
            'Cuesta más por GB almacenado, pero no cobra por recuperar los datos. Para fotos que se leen todos los días, es la clase que evita los cargos de acceso.',
          correct: true,
        },
      ],
    },
    {
      id: 'free-transfer',
      prompt:
        'Ahora la transferencia. Los servidores de las cajas mandan datos a otras instancias, el área de TI replicó todo a otra Región por si acaso y algunas instancias hablan entre distintas Availability Zones. ¿Cuál de estos movimientos en general NO genera cargo?',
      topicSlug: 'precios-de-almacenamiento-y-transferencia',
      examTasks: ['4.1'],
      options: [
        {
          id: 'same-az',
          label: 'Tráfico entre instancias dentro de la misma Availability Zone, usando direcciones IP privadas',
          definition:
            'Transferencia de datos entre recursos ubicados en la misma Availability Zone de una Región.',
          explanation:
            'El tráfico dentro de la misma Availability Zone por direcciones IP privadas es gratis en general. Los cargos de Retail Andes vienen de los otros movimientos.',
          correct: true,
        },
        {
          id: 'cross-region',
          label: 'La réplica de los buckets a otra Región',
          definition:
            'Transferencia de datos entre Regiones distintas de AWS, por ejemplo al replicar un bucket de S3.',
          explanation:
            'La transferencia entre Regiones típicamente se cobra. La réplica "por si acaso" suma transferencia y, además, el almacenamiento de la copia.',
          correct: false,
        },
        {
          id: 'cross-az',
          label: 'Tráfico entre instancias de distintas Availability Zones de la misma Región',
          definition:
            'Transferencia de datos entre recursos ubicados en Availability Zones diferentes dentro de una misma Región.',
          explanation:
            'La transferencia entre Availability Zones de la misma Región típicamente se cobra; lo que en general es gratis es el tráfico dentro de la misma AZ.',
          correct: false,
        },
        {
          id: 'egress-internet',
          label: 'Las descargas de la web de ofertas hacia los clientes por internet',
          definition:
            'Transferencia de datos de salida desde AWS hacia internet, agregada entre servicios como AWS Data Transfer Out.',
          explanation:
            'La salida de datos hacia internet se cobra por GB, con tarifas según la Región de origen.',
          correct: false,
        },
      ],
    },
    {
      id: 'unknown-access',
      prompt:
        'Los registros de las cajas son un misterio: algunos meses auditoría los revisa mucho y otros nadie los toca. No sabemos predecir el patrón. ¿Hay una clase de S3 que se encargue sola de acomodarlos según el uso?',
      topicSlug: 'precios-de-almacenamiento-y-transferencia',
      examTasks: ['4.1'],
      options: [
        {
          id: 'logs-one-zone-ia',
          label: 'S3 One Zone-IA',
          definition:
            'Clase de S3 para acceso poco frecuente en una sola Availability Zone, con cargo por recuperación y duración mínima de 30 días.',
          explanation:
            'Tiene menor costo de almacenamiento, pero no mueve objetos entre niveles por sí sola: en los meses de mucha auditoría, cada lectura pagaría recuperación.',
          correct: false,
        },
        {
          id: 'intelligent-tiering',
          label: 'S3 Intelligent-Tiering',
          definition:
            'Clase de S3 que mueve los objetos entre niveles de acceso automáticamente, con un cargo de monitoreo por objeto.',
          explanation:
            'Con un patrón de acceso impredecible, S3 acomoda los registros entre niveles según el uso, a cambio de un cargo de monitoreo por objeto. Nadie tiene que adivinar el patrón.',
          correct: true,
        },
        {
          id: 'logs-ebs',
          label: 'Un volumen de Amazon EBS grande para todos los registros',
          definition:
            'Almacenamiento de bloques para instancias EC2 que se cobra por el tamaño aprovisionado en GB-mes.',
          explanation:
            'EBS cobra el tamaño reservado aunque no se use y no es una clase de S3; no acomoda los registros según su acceso.',
          correct: false,
        },
        {
          id: 'logs-standard',
          label: 'S3 Standard para siempre',
          definition:
            'Clase de S3 de uso general, sin cargo por recuperación y con un costo de almacenamiento mayor que el de las clases de acceso poco frecuente y de archivo.',
          explanation:
            'Evita los cargos de recuperación, pero en los meses en que nadie toca los registros seguirían pagando un almacenamiento más caro que el de las clases de acceso poco frecuente. No se adapta sola al uso.',
          correct: false,
        },
      ],
    },
    {
      id: 'early-deletion',
      prompt:
        'Último misterio: marketing guardó los videos de una campaña en S3 Glacier Instant Retrieval para ahorrar, y a los 20 días los borró porque la campaña terminó. Igual nos cobraron más días de almacenamiento. ¿Por qué?',
      topicSlug: 'precios-de-almacenamiento-y-transferencia',
      examTasks: ['4.1'],
      options: [
        {
          id: 'only-twenty-days',
          label: 'Fue un error: solo deberían cobrar los 20 días',
          definition:
            'La idea de que el almacenamiento en S3 siempre se cobra únicamente por los días reales que el objeto estuvo guardado.',
          explanation:
            'Las clases frías de S3 tienen duraciones mínimas. Borrar antes de tiempo no limita el cobro a los días reales.',
          correct: false,
        },
        {
          id: 'up-to-180',
          label: 'Se cobra hasta completar 180 días',
          definition:
            'Duración mínima de almacenamiento de 180 días, propia de la clase de archivo con el costo más bajo de S3.',
          explanation:
            'Los 180 días corresponden a S3 Glacier Deep Archive. Glacier Instant Retrieval tiene un mínimo distinto.',
          correct: false,
        },
        {
          id: 'prorated-to-90',
          label: 'Se cobra el resto hasta la duración mínima de 90 días, de forma prorrateada',
          definition:
            'Regla de S3 por la que borrar o mover un objeto antes de la duración mínima de su clase genera un cobro prorrateado por el tiempo restante.',
          explanation:
            'S3 Glacier Instant Retrieval tiene una duración mínima de 90 días; al borrar a los 20, se cobra el resto prorrateado. Para archivos de vida corta, una clase fría puede salir más cara.',
          correct: true,
        },
        {
          id: 'monitoring-fee',
          label: 'Es el cargo de monitoreo por objeto',
          definition:
            'Cargo por objeto que cobra la clase de S3 que mueve automáticamente los datos entre niveles de acceso.',
          explanation:
            'El cargo de monitoreo por objeto es propio de S3 Intelligent-Tiering, no de Glacier Instant Retrieval.',
          correct: false,
        },
      ],
    },
  ],
};
