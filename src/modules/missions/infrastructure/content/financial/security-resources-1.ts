import type { Mission } from '../../../domain/Mission';

/**
 * Cooperativa San Martín: a savings cooperative in Mendoza with a small IT team and no security specialist.
 * Practices AWS Marketplace (third-party security products, BYOL), the AWS Knowledge Center and AWS Artifact.
 */
export const securityResources1: Mission = {
  id: 'security-resources-1',
  track: 'financial',
  topicSlug: 'security-resources',
  buildingId: 'credit-union',
  title: 'Dónde buscar ayuda',
  client: { name: 'Valeria Godoy', role: 'Jefa de sistemas de la Cooperativa San Martín' },
  intro: [
    'Hola, qué bueno que viniste. Soy Valeria Godoy, jefa de sistemas de la Cooperativa San Martín, en Mendoza. Guardamos los ahorros de miles de productores de la zona.',
    'Acabamos de migrar a AWS. Somos tres personas en sistemas y ninguna es especialista en seguridad, así que cada duda nos hace perder días.',
    'Ahora tengo cuatro pendientes: el firewall que usamos en el centro de datos, una licencia que ya pagamos, un bucket que dejó de funcionar y un auditor que pide papeles de AWS.',
    'La asamblea de socios es en dos semanas y quiero llegar con todo resuelto. No te pido que lo hagas por mí, sino que me digas dónde buscar cada cosa. ¿Me das una mano?',
  ],
  outro: {
    passed: [
      'Esto me cambia la vida: el firewall de siempre desde AWS Marketplace con nuestra propia licencia, el Knowledge Center para los problemas frecuentes y AWS Artifact para el auditor.',
      'Ya no siento que estamos solos con la seguridad. Gracias: en la asamblea voy a poder mirar a los socios a los ojos.',
    ],
    failed: [
      'Mmm... con estas respuestas seguiría buscando en el lugar equivocado. Todavía me pierdo entre tantos recursos.',
      'Repasa la teoría de recursos de seguridad y vuelve cuando quieras. Te espero con un mate.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'vendor-firewall',
      prompt:
        'En el centro de datos usamos un firewall de próxima generación de un fabricante conocido, y el equipo ya sabe administrarlo. Queremos desplegar el mismo producto en AWS y que el cargo aparezca en nuestra factura de AWS. ¿Dónde lo buscamos?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'artifact-firewall',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar informes de cumplimiento de AWS, como SOC, ISO o PCI, y gestionar acuerdos.',
          explanation:
            'Artifact entrega informes de cumplimiento de AWS. No vende ni despliega software de terceros.',
          correct: false,
        },
        {
          id: 'knowledge-center-firewall',
          label: 'AWS Knowledge Center',
          definition:
            'Colección de artículos en AWS re:Post con las preguntas más frecuentes de los clientes y sus soluciones paso a paso.',
          explanation:
            'El Knowledge Center ayuda a resolver problemas concretos. No permite comprar ni desplegar el firewall del fabricante.',
          correct: false,
        },
        {
          id: 'marketplace',
          label: 'AWS Marketplace',
          definition:
            'Catálogo digital curado donde se encuentran, compran, despliegan y administran software, datos y servicios de terceros.',
          explanation:
            'AWS Marketplace incluye productos de seguridad de fabricantes conocidos, y sus cargos aparecen en la factura de AWS. Es el escenario típico de "quiero en AWS el mismo firewall que ya uso".',
          correct: true,
        },
        {
          id: 'security-blog-firewall',
          label: 'AWS Security Blog',
          definition:
            'Blog de AWS con guías técnicas, novedades y buenas prácticas sobre identidades, detección de amenazas y criptografía.',
          explanation:
            'El Security Blog sirve para aprender y enterarse de novedades. No es un lugar para comprar ni desplegar un producto de un fabricante.',
          correct: false,
        },
      ],
    },
    {
      id: 'own-license',
      prompt:
        'Buenas noticias: el año pasado ya pagamos la licencia de ese firewall por tres años. Queremos usar esa misma licencia con el producto desplegado en AWS desde Marketplace. ¿Qué modelo de precio nos corresponde?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'hourly',
          label: 'Por hora',
          definition:
            'Modelo de precio de AWS Marketplace que cobra el software según las horas que se usa.',
          explanation:
            'Con el modelo por hora la cooperativa volvería a pagar por el software, en lugar de aprovechar la licencia que ya tiene.',
          correct: false,
        },
        {
          id: 'free-trial',
          label: 'Prueba gratuita',
          definition:
            'Modelo de AWS Marketplace que permite evaluar un producto durante un período antes de pagar por él.',
          explanation:
            'La prueba sirve para evaluar un producto por un tiempo. No consiste en reutilizar una licencia que ya se pagó.',
          correct: false,
        },
        {
          id: 'annual',
          label: 'Anual',
          definition:
            'Modelo de precio de AWS Marketplace que contrata el producto mediante una suscripción por un año.',
          explanation:
            'Una suscripción anual sería una compra nueva. La cooperativa ya tiene una licencia vigente que quiere aprovechar.',
          correct: false,
        },
        {
          id: 'byol',
          label: 'Trae tu propia licencia (BYOL)',
          definition:
            'Modelo de AWS Marketplace en el que el cliente usa una licencia que ya tiene con el producto desplegado en AWS.',
          explanation:
            'BYOL permite usar la licencia que la cooperativa ya pagó con el firewall desplegado desde AWS Marketplace.',
          correct: true,
        },
      ],
    },
    {
      id: 'blocked-bucket',
      prompt:
        'Ahora lo que nos tiene trabados: uno de los chicos escribió una bucket policy de Amazon S3 y ahora nadie puede acceder al bucket, ni siquiera nosotros. Seguro que a otros les pasó. ¿Dónde encontramos una solución paso a paso?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'knowledge-center',
          label: 'AWS Knowledge Center (en AWS re:Post)',
          definition:
            'Sección de AWS re:Post que reúne artículos con las preguntas frecuentes de los clientes y sus soluciones paso a paso.',
          explanation:
            'El Knowledge Center reúne problemas frecuentes con su solución, por ejemplo cómo corregir una bucket policy de S3 que bloquea todo el acceso.',
          correct: true,
        },
        {
          id: 'marketplace-bucket',
          label: 'AWS Marketplace',
          definition:
            'Catálogo de software, datos y servicios de terceros que se pueden comprar y desplegar en AWS.',
          explanation:
            'AWS Marketplace vende productos de terceros. No ofrece artículos con soluciones a problemas frecuentes como una bucket policy mal escrita.',
          correct: false,
        },
        {
          id: 'artifact-bucket',
          label: 'AWS Artifact',
          definition:
            'Servicio que da acceso a informes de cumplimiento de AWS y a acuerdos con AWS.',
          explanation:
            'Artifact entrega informes como SOC o ISO. No explica cómo corregir una bucket policy.',
          correct: false,
        },
        {
          id: 'trust-safety-bucket',
          label: 'AWS Trust & Safety Center',
          definition:
            'Centro en AWS re:Post que explica cómo reportar abusos con recursos de AWS y cuáles son los usos prohibidos.',
          explanation:
            'El Trust & Safety Center trata reportes de abuso. No ayuda a configurar ni corregir una bucket policy.',
          correct: false,
        },
      ],
    },
    {
      id: 'auditor-report',
      prompt:
        'Último pendiente. El auditor del organismo que regula las cooperativas pide el informe SOC de AWS para revisar los controles de nuestro proveedor de nube. ¿Dónde lo descargamos?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'security-blog-soc',
          label: 'En el AWS Security Blog',
          definition:
            'Publicación de AWS con artículos, novedades y ejemplos prácticos de especialistas en seguridad.',
          explanation:
            'El Security Blog publica guías y novedades. Buscar ahí los informes SOC es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'artifact-soc',
          label: 'En AWS Artifact',
          definition:
            'Portal de autoservicio para descargar informes de cumplimiento de AWS, como SOC, ISO o PCI.',
          explanation:
            'AWS Artifact da acceso a los informes de cumplimiento de AWS, como el SOC que pide el auditor.',
          correct: true,
        },
        {
          id: 'knowledge-center-soc',
          label: 'En el AWS Knowledge Center',
          definition:
            'Artículos de AWS re:Post que responden preguntas frecuentes de los clientes con soluciones paso a paso.',
          explanation:
            'El Knowledge Center resuelve problemas técnicos frecuentes. Los informes SOC de AWS se descargan en AWS Artifact.',
          correct: false,
        },
        {
          id: 'marketplace-soc',
          label: 'En AWS Marketplace',
          definition:
            'Catálogo curado de productos de terceros cuyos cargos aparecen en la factura de AWS.',
          explanation:
            'AWS Marketplace vende software de terceros. No es donde AWS publica sus propios informes de cumplimiento.',
          correct: false,
        },
      ],
    },
  ],
};
