import type { Mission } from '../../../domain/Mission';

/**
 * Florería Primavera: a flower shop in Arequipa with three branches and an online store on AWS.
 * Practices AWS Marketplace, the ISV partner type in the AWS Partner Network,
 * Private Marketplace and license entitlements with AWS License Manager.
 */
export const technicalResourcesAndPartners2: Mission = {
  id: 'technical-resources-and-partners-2',
  track: 'market',
  topicSlug: 'technical-resources-and-partners',
  buildingId: 'flower-shop',
  title: 'Un mercado de flores y software',
  client: { name: 'Rosa Ccama', role: 'Dueña de Florería Primavera' },
  intro: [
    'Hola, adelante, cuidado con las rosas. Soy Rosa Ccama, dueña de Florería Primavera. Empezamos con un puesto en un mercado de Arequipa y hoy tenemos tres sucursales y una tienda en línea.',
    'La tienda en línea corre en AWS, y cada sucursal tiene su propia cuenta de AWS dentro de nuestra organización. Para el Día de la Madre recibimos más pedidos que en todo un trimestre.',
    'Ahora necesitamos software que no queremos programar nosotros: seguridad para la tienda y un sistema de inventario. Pero mis encargados compran por su cuenta y ya pagamos dos veces por lo mismo.',
    'Quiero comprar bien, pagar una sola vez y saber quién usa qué. ¿Me ayudas a poner orden antes del Día de la Madre?',
  ],
  outro: {
    passed: [
      'Qué alivio. Ahora compramos el software en un solo lugar, con los cargos en nuestra factura de AWS, y mis encargados solo pueden elegir lo que yo aprobé.',
      'Y cada sucursal usa las licencias que le tocan, sin pagar dos veces. Gracias: este Día de la Madre, las únicas que se desbordan son las flores.',
    ],
    failed: [
      'Ay... con estas decisiones seguiríamos comprando a ciegas y pagando de más.',
      'Repasa la teoría de recursos técnicos, partners y Marketplace, y vuelve. Te guardo un ramo para cuando regreses.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'buy-software',
      prompt:
        'Primero, el software de seguridad para la tienda. Queremos uno ya listo, de un proveedor especializado, y que el cobro llegue en la misma factura de AWS. ¿Dónde lo buscamos?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'prescriptive-buy',
          label: 'AWS Prescriptive Guidance',
          definition:
            'Recursos de expertos de AWS con guías de planificación e implementación y patrones con pasos, arquitecturas y código.',
          explanation:
            'Prescriptive Guidance ayuda a planear migraciones y modernizaciones, pero no vende software de terceros.',
          correct: false,
        },
        {
          id: 'professional-services-buy',
          label: 'AWS Professional Services',
          definition:
            'Equipo de AWS que ayuda a diseñar, construir, migrar y administrar cargas en AWS junto con los AWS Partners.',
          explanation:
            'Professional Services ejecuta proyectos como migraciones o modernización; no es un catálogo para comprar software listo.',
          correct: false,
        },
        {
          id: 'marketplace',
          label: 'AWS Marketplace',
          definition:
            'Catálogo digital curado con miles de productos de software, datos y servicios, en formatos como AMI y SaaS.',
          explanation:
            'AWS Marketplace vende software de terceros, como productos de seguridad, y sus cargos aparecen en la factura de AWS junto al resto del gasto.',
          correct: true,
        },
        {
          id: 'knowledge-center-buy',
          label: 'AWS Knowledge Center',
          definition:
            'Artículos oficiales de AWS, dentro de AWS re:Post, con respuestas a las preguntas más frecuentes.',
          explanation:
            'El Knowledge Center responde problemas comunes; no ofrece productos de software para comprar.',
          correct: false,
        },
      ],
    },
    {
      id: 'vendor-type',
      prompt:
        'El sistema de inventario que nos gustó lo hace una empresa de Lima: crea software que se integra con AWS y lo vende en AWS Marketplace. Dentro de la AWS Partner Network, ¿qué tipo de socio es?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'isv',
          label: 'Independent Software Vendor (ISV)',
          definition:
            'Tipo de socio de la AWS Partner Network que crea software que funciona en AWS o se integra con AWS.',
          explanation:
            'La empresa de Lima crea su propio software integrado con AWS y lo vende en Marketplace: eso define a un ISV.',
          correct: true,
        },
        {
          id: 'system-integrator',
          label: 'System integrator (SI)',
          definition:
            'Tipo de socio de la AWS Partner Network que diseña, migra, implementa o administra soluciones en AWS para sus clientes.',
          explanation:
            'Un system integrator implementa y administra soluciones para el cliente; la empresa de Lima se define por crear y vender su propio software.',
          correct: false,
        },
        {
          id: 'solutions-architect-vendor',
          label: 'AWS solutions architect',
          definition:
            'Asesor técnico de AWS que ayuda a clientes y partners a diseñar arquitecturas, por ejemplo con revisiones Well-Architected.',
          explanation:
            'Los solutions architects son asesores de AWS, no una empresa socia que vende software.',
          correct: false,
        },
        {
          id: 'private-marketplace-vendor',
          label: 'Private Marketplace',
          definition:
            'Función de gobernanza de AWS Marketplace que crea un catálogo personalizado de productos aprobados.',
          explanation:
            'Private Marketplace es una función para limitar el catálogo de compras; no es un tipo de socio de la APN.',
          correct: false,
        },
      ],
    },
    {
      id: 'approved-catalog',
      prompt:
        'Ahora mi dolor de cabeza: los encargados de las sucursales compran en AWS Marketplace lo que les parece. Quiero que solo puedan comprar los productos que yo apruebe. ¿Qué uso?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'private-offers-catalog',
          label: 'Ofertas privadas de AWS Marketplace',
          definition:
            'Opción de AWS Marketplace para acordar con un vendedor precios y términos personalizados.',
          explanation:
            'Las ofertas privadas sirven para negociar precios y términos con un vendedor; no limitan qué productos pueden comprar los encargados.',
          correct: false,
        },
        {
          id: 'license-manager-catalog',
          label: 'AWS License Manager',
          definition:
            'Servicio que distribuye, activa y rastrea licencias de software compradas, incluso entre cuentas de una organización.',
          explanation:
            'AWS License Manager gestiona las licencias que ya se compraron; no define qué productos se pueden comprar.',
          correct: false,
        },
        {
          id: 'prescriptive-catalog',
          label: 'AWS Prescriptive Guidance',
          definition:
            'Guías y patrones de expertos de AWS para planear e implementar migraciones y modernizaciones.',
          explanation:
            'Prescriptive Guidance ofrece guías técnicas; no controla las compras de la organización.',
          correct: false,
        },
        {
          id: 'private-marketplace',
          label: 'Private Marketplace',
          definition:
            'Función de gobernanza de AWS Marketplace que crea un catálogo personalizado para los usuarios de una organización.',
          explanation:
            'Private Marketplace limita el catálogo a los productos que Rosa aprueba, así que los encargados solo pueden comprar lo autorizado.',
          correct: true,
        },
      ],
    },
    {
      id: 'share-licenses',
      prompt:
        'Por último, compramos en Marketplace las licencias del sistema de inventario para todas las sucursales. ¿Cómo las distribuimos, activamos y rastreamos entre las cuentas de AWS de cada sucursal?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'private-marketplace-licenses',
          label: 'Con Private Marketplace',
          definition:
            'Catálogo personalizado de productos aprobados dentro de AWS Marketplace para los usuarios de una organización.',
          explanation:
            'Private Marketplace define qué productos se pueden comprar; no distribuye ni rastrea las licencias ya compradas.',
          correct: false,
        },
        {
          id: 'license-manager',
          label: 'Con AWS License Manager',
          definition:
            'Servicio para gestionar licencias de software y sus derechos de uso (entitlements) dentro de una organización.',
          explanation:
            'AWS Marketplace gestiona los entitlements con AWS License Manager, que distribuye, activa y rastrea las licencias compradas entre las cuentas de la organización.',
          correct: true,
        },
        {
          id: 'byol-licenses',
          label: 'Con la opción trae tu propia licencia (BYOL)',
          definition:
            'Modelo de precio de AWS Marketplace para usar una licencia de software que ya tienes.',
          explanation:
            'BYOL es una forma de pago para usar licencias propias; no reparte ni rastrea licencias entre las cuentas de las sucursales.',
          correct: false,
        },
        {
          id: 'repost-licenses',
          label: 'Con AWS re:Post',
          definition:
            'Servicio de conocimiento en la nube con preguntas y respuestas de la comunidad y de expertos.',
          explanation:
            'En AWS re:Post puedes preguntar cómo hacerlo, pero no administra las licencias de la florería.',
          correct: false,
        },
      ],
    },
  ],
};
