import type { Mission } from '../../../domain/Mission';

/**
 * Electrónica Volta: an electronics retailer from Montevideo expanding its smart-camera service across the region.
 * Practices choosing a Region for data residency, AWS Local Zones, AWS Global Accelerator and disaster recovery strategies.
 */
export const globalInfrastructure2: Mission = {
  id: 'global-infrastructure-2',
  track: 'tech',
  topicSlug: 'global-infrastructure',
  buildingId: 'electronics-store',
  title: 'Voltaje en todo el mapa',
  client: { name: 'Rosario Benítez', role: 'Dueña de Electrónica Volta' },
  intro: [
    '¡Hola! Soy Rosario Benítez, dueña de Electrónica Volta. Abrimos en Montevideo vendiendo repuestos de radio, y hoy vendemos cámaras de seguridad inteligentes en varios países.',
    'Las cámaras envían su video a una aplicación nuestra en AWS, que detecta movimiento y avisa al celular del cliente. Ahora queremos crecer, y cada país nos trae un desafío distinto.',
    'Un país nos exige dónde guardar los datos, los clientes de una gran ciudad dicen que los avisos llegan tarde y los distribuidores de otros continentes se quejan de lentitud.',
    'Y el contador quiere un plan por si perdemos una Región, pero sin gastar de más. Son muchos cables sueltos. ¿Me ayudas a conectarlos?',
  ],
  outro: {
    passed: [
      '¡Todo enchufado! Ya sé dónde poner los datos, cómo acercar el cómputo a la ciudad que lo necesita y cómo hacer que el tráfico lejano entre rápido a AWS.',
      'Y el contador aprobó el plan de recuperación más económico. Gracias: el próximo modelo de cámara lo pruebas tú antes que nadie.',
    ],
    failed: [
      'Mmm... con estas decisiones creo que se nos funde un fusible en algún país.',
      'Repasa la teoría sobre la infraestructura global de AWS y vuelve cuando quieras. El mostrador de Volta sigue abierto.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'data-residency',
      prompt:
        'El primer cable: el gobierno de uno de los países donde vendemos exige que los videos de sus ciudadanos se guarden dentro de sus fronteras. Al elegir la Región para esos clientes, ¿qué factor debe pesar más?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'compliance-residency',
          label: 'El cumplimiento y la residencia de datos',
          definition:
            'Factor de selección de Región basado en dónde exige la ley que se guarden y procesen los datos.',
          explanation:
            'Cuando una regulación dice dónde deben estar los datos, este factor pesa más que los demás: hay que guardar esos datos en una Región dentro de esa jurisdicción.',
          correct: true,
        },
        {
          id: 'region-price',
          label: 'El precio de la Región',
          definition:
            'Factor de selección de Región basado en el costo de los servicios, que puede variar de una Región a otra.',
          explanation:
            'Los precios varían entre Regiones, pero una Región más barata no sirve si incumple la ley sobre dónde guardar los datos.',
          correct: false,
        },
        {
          id: 'region-closeness',
          label: 'La cercanía a la oficina de Volta en Montevideo',
          definition:
            'Factor de selección de Región basado en la distancia física entre la Región y una ubicación de referencia.',
          explanation:
            'La cercanía ayuda con la latencia, pero no garantiza cumplir la exigencia legal sobre la ubicación de los datos.',
          correct: false,
        },
        {
          id: 'region-services',
          label: 'La cantidad de servicios disponibles',
          definition:
            'Factor de selección de Región basado en qué servicios y funciones de AWS ya se ofrecen en ella.',
          explanation:
            'Los servicios disponibles importan, pero ante una regulación de residencia de datos el cumplimiento pesa más.',
          correct: false,
        },
      ],
    },
    {
      id: 'low-latency-city',
      prompt:
        'En una gran ciudad, lejos de la Región que usamos, los avisos de movimiento llegan tarde. Necesitamos correr el análisis con latencia muy baja cerca de esos clientes, con una extensión de una Región de AWS. ¿Qué usamos?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'edge-cache',
          label: 'Las ubicaciones de borde de CloudFront',
          definition:
            'Centros de datos de la red de AWS, separados de las Regiones, que entregan contenido en caché a los usuarios.',
          explanation:
            'Su función principal es entregar contenido en caché, no ejecutar el cómputo de la aplicación que analiza el video.',
          correct: false,
        },
        {
          id: 'extra-azs',
          label: 'Más Availability Zones en la Región actual',
          definition:
            'Zonas aisladas adicionales dentro de una Región, con energía y redes redundantes.',
          explanation:
            'Las Availability Zones aportan alta disponibilidad dentro de la Región, pero siguen igual de lejos de esa ciudad.',
          correct: false,
        },
        {
          id: 'local-zones',
          label: 'AWS Local Zones',
          definition:
            'Extensiones de una Región que colocan cómputo, almacenamiento, bases de datos y otros servicios seleccionados cerca de grandes centros de población.',
          explanation:
            'Las Local Zones acercan el cómputo a grandes ciudades para lograr latencia muy baja, y cada una es una extensión de una Región: justo lo que pide el análisis de video.',
          correct: true,
        },
        {
          id: 'far-region',
          label: 'Una Región en otro continente',
          definition:
            'Área geográfica de AWS con varias Availability Zones, ubicada lejos de los usuarios.',
          explanation:
            'Una Región lejana aumenta la distancia con los clientes, lo contrario de la latencia muy baja que se necesita.',
          correct: false,
        },
      ],
    },
    {
      id: 'distributors-traffic',
      prompt:
        'Los distribuidores de otros continentes usan nuestro portal de pedidos y dicen que va lento. Queremos que su tráfico entre a la red troncal de AWS lo antes posible, usando la red de borde de AWS. ¿Qué servicio es?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'traffic-local-zones',
          label: 'AWS Local Zones',
          definition:
            'Extensiones de una Región ubicadas cerca de grandes ciudades para ejecutar cargas con latencia muy baja.',
          explanation:
            'Las Local Zones acercan cómputo a ciudades concretas; no son el servicio que lleva el tráfico de usuarios de otros continentes a la red troncal.',
          correct: false,
        },
        {
          id: 'traffic-azs',
          label: 'Availability Zones adicionales',
          definition:
            'Centros de datos aislados dentro de una Región que permiten repartir una aplicación.',
          explanation:
            'Las Availability Zones aportan alta disponibilidad dentro de una Región; no aceleran la entrada del tráfico a la red de AWS.',
          correct: false,
        },
        {
          id: 'traffic-s3',
          label: 'Amazon S3 Standard',
          definition:
            'Clase de almacenamiento de objetos que guarda los datos de forma redundante en varias Availability Zones.',
          explanation:
            'S3 Standard sirve para guardar objetos; no dirige el tráfico de los distribuidores hacia la red troncal de AWS.',
          correct: false,
        },
        {
          id: 'global-accelerator',
          label: 'AWS Global Accelerator',
          definition:
            'Servicio de red que usa la red de borde de AWS para dirigir el tráfico de los usuarios hacia las aplicaciones.',
          explanation:
            'Global Accelerator usa la red de borde de AWS para llevar el tráfico a la red troncal de AWS lo antes posible, justo lo que necesitan los distribuidores lejanos.',
          correct: true,
        },
      ],
    },
    {
      id: 'cheapest-dr',
      prompt:
        'Por último, el contador: quiere un plan de recuperación ante desastres en otra Región, pero el de menor costo y complejidad, aunque recuperarnos tome más tiempo. De las estrategias que describe AWS, ¿cuál es?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'warm-standby',
          label: 'Warm standby',
          definition:
            'Estrategia de recuperación ante desastres que mantiene en otra Región una copia reducida y funcionando de la carga de trabajo.',
          explanation:
            'Warm standby cuesta y complica más que backup and restore y que pilot light, porque mantiene una copia funcionando todo el tiempo.',
          correct: false,
        },
        {
          id: 'backup-restore',
          label: 'Backup and restore',
          definition:
            'Estrategia de recuperación ante desastres basada en respaldar los datos y restaurarlos cuando ocurre el desastre.',
          explanation:
            'Es la estrategia de menor costo y complejidad en la escala que describe AWS, a cambio de una recuperación más lenta, lo que el contador acepta.',
          correct: true,
        },
        {
          id: 'pilot-light',
          label: 'Pilot light',
          definition:
            'Estrategia de recuperación ante desastres que mantiene en otra Región solo los elementos esenciales, listos para encender el resto.',
          explanation:
            'Pilot light es más costosa y compleja que backup and restore en la escala que describe AWS.',
          correct: false,
        },
        {
          id: 'multi-site',
          label: 'Multi-site active/active',
          definition:
            'Estrategia de recuperación ante desastres que ejecuta la carga de trabajo completa en varias Regiones al mismo tiempo.',
          explanation:
            'Multi-site active/active está en el extremo de mayor costo y complejidad, lo contrario de lo que pide el contador.',
          correct: false,
        },
      ],
    },
  ],
};
