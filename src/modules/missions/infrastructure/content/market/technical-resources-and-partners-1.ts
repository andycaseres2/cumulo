import type { Mission } from '../../../domain/Mission';

/**
 * Estudio Contable Saldo: an accounting firm in Asunción migrating its accounting platform to AWS.
 * Practices the AWS Knowledge Center, AWS Prescriptive Guidance, AWS solutions architects
 * and AWS Professional Services versus AWS Support.
 */
export const technicalResourcesAndPartners1: Mission = {
  id: 'technical-resources-and-partners-1',
  track: 'market',
  topicSlug: 'technical-resources-and-partners',
  buildingId: 'accounting-firm',
  title: 'Cuentas claras, ayuda a mano',
  client: { name: 'Lucía Giménez', role: 'Socia directora de Estudio Contable Saldo' },
  intro: [
    'Hola, pasa. Soy Lucía Giménez, socia directora de Estudio Contable Saldo. Desde Asunción llevamos la contabilidad y los impuestos de unas dos mil empresas paraguayas.',
    'Nuestra plataforma contable vive en servidores viejos en el sótano, y este año decidimos llevarla a AWS. Tenemos un equipo de TI chico, de cuatro personas, que nunca hizo una migración así.',
    'Cada vez que tienen una duda pierden días buscando en internet, y si nos equivocamos en plena época de declaraciones juradas, dos mil clientes se quedan sin presentar sus impuestos.',
    'Antes de gastar en lo que no hace falta, quiero saber qué ayuda nos ofrece AWS y dónde buscar cada cosa. ¿Me das una mano?',
  ],
  outro: {
    passed: [
      'Excelente. Ahora el equipo sabe dónde buscar respuestas rápidas y con qué guías planear la migración.',
      'Y ya sé a quién pedirle una revisión de la arquitectura y quién puede ejecutar el proyecto con nosotros. Gracias: estas cuentas, por fin, cierran.',
    ],
    failed: [
      'Mmm... con estas respuestas seguiríamos dando vueltas, y la época de declaraciones se nos viene encima.',
      'Repasa la teoría de recursos técnicos y partners y vuelve cuando quieras. Aquí te esperamos con el mate listo.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'frequent-questions',
      prompt:
        'Empecemos por lo diario. Mi equipo choca siempre con problemas comunes, como dudas de facturación o de configuración, y quiere respuestas oficiales de AWS a esas preguntas frecuentes. ¿Dónde las buscan?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'whitepapers-faq',
          label: 'AWS Whitepapers & Guides',
          definition:
            'Colección de whitepapers técnicos, guías de decisión y diagramas de arquitectura de referencia, escritos por AWS y la comunidad.',
          explanation:
            'Los whitepapers sirven para buenas prácticas y arquitectura; para respuestas rápidas a problemas comunes y concretos, el recurso indicado es el Knowledge Center.',
          correct: false,
        },
        {
          id: 'knowledge-center',
          label: 'AWS Knowledge Center',
          definition:
            'Artículos producidos por un equipo de AWS, con insignia AWS Official, que hoy se encuentran dentro de AWS re:Post.',
          explanation:
            'El Knowledge Center da respuestas autorizadas a las preguntas más frecuentes, por ejemplo de facturación o configuración, justo lo que necesita el equipo del estudio.',
          correct: true,
        },
        {
          id: 'marketplace-faq',
          label: 'AWS Marketplace',
          definition:
            'Catálogo digital curado para encontrar, comprar e implementar software, datos y servicios de terceros.',
          explanation:
            'AWS Marketplace sirve para comprar productos de terceros; no publica respuestas a preguntas frecuentes.',
          correct: false,
        },
        {
          id: 'license-manager-faq',
          label: 'AWS License Manager',
          definition:
            'Servicio para distribuir, activar y rastrear licencias de software, incluso entre cuentas de una organización.',
          explanation:
            'AWS License Manager administra licencias; no ofrece artículos con respuestas a problemas comunes.',
          correct: false,
        },
      ],
    },
    {
      id: 'migration-guides',
      prompt:
        'Ahora la migración. Queremos planearla con recursos de expertos de AWS: guías de planificación e implementación, y patrones con pasos, arquitecturas y código. ¿Qué recurso usamos?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'repost-guides',
          label: 'AWS re:Post',
          definition:
            'Servicio de conocimiento en la nube con preguntas y respuestas de la comunidad y de expertos.',
          explanation:
            'AWS re:Post es útil para dudas puntuales, pero no es un conjunto de guías y patrones para planear una migración.',
          correct: false,
        },
        {
          id: 'marketplace-guides',
          label: 'AWS Marketplace',
          definition:
            'Catálogo de software, datos y servicios de terceros, con cargos que aparecen en la factura de AWS.',
          explanation:
            'AWS Marketplace vende productos de terceros; no publica guías ni patrones de migración.',
          correct: false,
        },
        {
          id: 'knowledge-center-guides',
          label: 'AWS Knowledge Center',
          definition:
            'Artículos oficiales de AWS con respuestas a las preguntas más frecuentes sobre problemas comunes.',
          explanation:
            'El Knowledge Center resuelve problemas concretos y frecuentes; no ofrece patrones con pasos, arquitecturas y código para migrar.',
          correct: false,
        },
        {
          id: 'prescriptive-guidance',
          label: 'AWS Prescriptive Guidance',
          definition:
            'Recursos de expertos de AWS para acelerar la adopción y la modernización en la nube, organizados en guías y patrones.',
          explanation:
            'AWS Prescriptive Guidance reúne guías de planificación e implementación y patrones con pasos, arquitecturas y código para migraciones y modernizaciones.',
          correct: true,
        },
      ],
    },
    {
      id: 'architecture-review',
      prompt:
        'Antes de mover nada, quiero que un asesor técnico de AWS revise el diseño de nuestra arquitectura con una revisión AWS Well-Architected. ¿Quién cumple ese rol?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'solutions-architect',
          label: 'Un AWS solutions architect',
          definition:
            'Asesor técnico de AWS que trabaja con clientes y partners en sesiones de diseño de arquitecturas.',
          explanation:
            'Los solutions architects ayudan a diseñar arquitecturas, por ejemplo con revisiones AWS Well-Architected, y si hace falta implementación pueden conectar al estudio con Professional Services o con la APN.',
          correct: true,
        },
        {
          id: 'isv-review',
          label: 'Un Independent Software Vendor (ISV)',
          definition:
            'Empresa que crea software que funciona en AWS o se integra con AWS, y que puede venderlo en AWS Marketplace.',
          explanation:
            'Un ISV se dedica a crear y vender su propio software; no es el asesor técnico de AWS que revisa tu arquitectura.',
          correct: false,
        },
        {
          id: 'license-manager-review',
          label: 'AWS License Manager',
          definition:
            'Servicio que gestiona licencias de software y sus derechos de uso dentro de una organización.',
          explanation:
            'AWS License Manager administra licencias; no participa en el diseño ni en la revisión de arquitecturas.',
          correct: false,
        },
        {
          id: 'blogs-review',
          label: 'Los AWS Blogs',
          definition:
            'Publicaciones de AWS con anuncios, casos de uso y tutoriales organizados por tema.',
          explanation:
            'Los blogs sirven para novedades y ejemplos prácticos, pero no son una persona que revise el diseño del estudio.',
          correct: false,
        },
      ],
    },
    {
      id: 'migration-project',
      prompt:
        'Última decisión. La migración es grande y queremos que un equipo de AWS la ejecute con nosotros y nos ayude a modernizar la plataforma. Mi gerente dice que basta con abrir casos en AWS Support. ¿Qué contratamos?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'support-cases-project',
          label: 'AWS Support, abriendo casos técnicos con un plan de pago',
          definition:
            'Soporte técnico de AWS que atiende casos según el plan contratado, desde Basic hasta Unified Operations.',
          explanation:
            'AWS Support atiende casos según el plan; no ejecuta proyectos de migración ni de modernización junto con el cliente.',
          correct: false,
        },
        {
          id: 'whitepapers-project',
          label: 'AWS Whitepapers & Guides',
          definition:
            'Material escrito con buenas prácticas, guías de decisión y arquitecturas de referencia.',
          explanation:
            'Los whitepapers ofrecen buenas prácticas por escrito, pero no son un equipo que ejecute la migración del estudio.',
          correct: false,
        },
        {
          id: 'professional-services',
          label: 'AWS Professional Services',
          definition:
            'Equipo de AWS que trabaja junto con los AWS Partners en proyectos de migración, modernización, datos e IA y seguridad.',
          explanation:
            'AWS Professional Services ayuda a diseñar, construir, migrar y administrar cargas, incluidas migraciones a gran escala y modernización: ejecuta proyectos, mientras que Support atiende casos.',
          correct: true,
        },
        {
          id: 'repost-project',
          label: 'AWS re:Post',
          definition:
            'Servicio de preguntas y respuestas de la comunidad, con respuestas revisadas por expertos.',
          explanation:
            'En AWS re:Post la comunidad responde dudas, pero nadie ejecuta el proyecto de migración del estudio.',
          correct: false,
        },
      ],
    },
  ],
};
