import type { Mission } from '../../../domain/Mission';

/**
 * Rapidito: a delivery startup in Asunción planning its cloud adoption before a big retail contract.
 * Practices the AWS CAF Envision phase, the Operations perspective, business versus technical perspectives and the ESG outcome.
 */
export const cloudAdoptionFramework2: Mission = {
  id: 'cloud-adoption-framework-2',
  track: 'downtown',
  buildingId: 'delivery',
  topicSlug: 'cloud-adoption-framework',
  title: 'Mandados con hoja de ruta',
  client: { name: 'Joaquín Benítez', role: 'Fundador de Rapidito' },
  intro: [
    '¡Hola! Pasa, que aquí todo va en moto. Soy Joaquín Benítez, fundador de Rapidito. Llevamos comida, farmacia y paquetes por todo Asunción con más de ochenta repartidores.',
    'Una cadena de supermercados quiere que hagamos todas sus entregas del país. Para eso tenemos que llevar la app y los sistemas a la nube, y mis socios me pidieron un plan serio, no improvisado.',
    'Un amigo me dijo que AWS tiene un marco para esto, el AWS Cloud Adoption Framework. El problema es que mis socios creen que es un tema solo de programadores, y yo no sé por dónde empezar.',
    'Si no presento un plan claro, la cadena firma con otra empresa. ¿Me ayudas a armar la hoja de ruta de Rapidito?',
  ],
  outro: {
    passed: [
      '¡Listo! Sabemos en qué fase empezamos, quién va a operar los sistemas cuando estén en la nube y mis socios entendieron que el AWS CAF también habla de negocio y de personas.',
      'Y el informe de sostenibilidad que pidió la cadena ya tiene un lugar en el plan. Gracias: tus mandados en Rapidito van por cuenta de la casa.',
    ],
    failed: [
      'Uy... con este plan mis socios no van a firmar nada. Todavía confundo fases con perspectivas.',
      'Repasa la teoría del AWS CAF y vuelve cuando quieras. Aquí te espero con el casco puesto.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'first-phase',
      prompt:
        'Empecemos por el principio. Antes de mover nada, quiero mostrar a mis socios cómo la nube nos ayudaría a ganar el contrato, elegir qué oportunidades atacar primero y ponerle un responsable y una métrica a cada una. ¿Qué fase del AWS CAF es esta?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'envision',
          label: 'Envision',
          definition:
            'Fase del AWS CAF que muestra cómo la nube acelerará los resultados de negocio e identifica y prioriza oportunidades con responsables y métricas.',
          explanation:
            'Mostrar cómo la nube acelera el negocio, priorizar oportunidades y asociarlas a responsables y métricas es exactamente Envision, el punto de partida.',
          correct: true,
        },
        {
          id: 'align',
          label: 'Align',
          definition:
            'Fase del AWS CAF que identifica brechas de capacidades en las seis perspectivas, dependencias entre áreas y preocupaciones de las partes interesadas.',
          explanation:
            'Align viene después de elegir las oportunidades: busca brechas y dependencias para preparar a la organización. Joaquín todavía está definiendo qué atacar.',
          correct: false,
        },
        {
          id: 'launch',
          label: 'Launch',
          definition:
            'Fase del AWS CAF en la que se entregan pilotos en producción que demuestran valor incremental y dejan aprendizajes.',
          explanation:
            'Launch ya pone pilotos en producción. Rapidito aún no ha movido nada ni ha elegido qué mover.',
          correct: false,
        },
        {
          id: 'scale',
          label: 'Scale',
          definition:
            'Fase del AWS CAF que expande los pilotos y el valor de negocio a la escala deseada y asegura que los beneficios se mantengan.',
          explanation:
            'Scale expande pilotos que ya demostraron valor. Sin oportunidades priorizadas ni pilotos, no hay nada que escalar todavía.',
          correct: false,
        },
      ],
    },
    {
      id: 'who-operates',
      prompt:
        'Mi miedo es el día después: cuando la app esté en la nube, ¿quién mira que funcione, atiende las caídas en hora pico y aplica los parches? ¿Qué perspectiva del AWS CAF cubre eso?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'platform',
          label: 'Platform',
          definition:
            'Perspectiva del AWS CAF que construye una plataforma de nube escalable y moderniza o crea soluciones nativas de la nube.',
          explanation:
            'Platform diseña y construye la plataforma y las aplicaciones. Vigilar que funcionen, atender incidentes y parchar es trabajo de Operations.',
          correct: false,
        },
        {
          id: 'security',
          label: 'Security',
          definition:
            'Perspectiva del AWS CAF que busca la confidencialidad, integridad y disponibilidad de los datos y las cargas de trabajo.',
          explanation:
            'Security se ocupa de identidades, detección de amenazas y respuesta a incidentes de seguridad. Mantener el servicio al nivel que el negocio necesita es Operations.',
          correct: false,
        },
        {
          id: 'people',
          label: 'People',
          definition:
            'Perspectiva del AWS CAF que hace de puente entre tecnología y negocio: cultura, estructura organizacional, liderazgo y fuerza laboral.',
          explanation:
            'People trabaja la cultura y las habilidades del equipo. La observabilidad, las caídas y los parches pertenecen a Operations.',
          correct: false,
        },
        {
          id: 'operations',
          label: 'Operations',
          definition:
            'Perspectiva del AWS CAF que busca que los servicios en la nube se entreguen al nivel que el negocio necesita.',
          explanation:
            'Operations incluye capacidades como observabilidad, gestión de incidentes y problemas, gestión de parches y continuidad: justo lo que necesita Rapidito en hora pico.',
          correct: true,
        },
      ],
    },
    {
      id: 'not-only-tech',
      prompt:
        'Mis socios insisten en que el AWS CAF es cosa de programadores. Quiero mostrarles que también habla de ellos. ¿Cuáles son las perspectivas más orientadas al negocio?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'technical-trio',
          label: 'Platform, Security y Operations',
          definition:
            'Grupo de tres perspectivas del AWS CAF que trata la plataforma de nube, la protección de los datos y la operación de los servicios.',
          explanation:
            'Estas son las tres perspectivas más técnicas del AWS CAF. Las orientadas al negocio son Business, People y Governance.',
          correct: false,
        },
        {
          id: 'business-trio',
          label: 'Business, People y Governance',
          definition:
            'Grupo de tres perspectivas del AWS CAF que trata la estrategia y los resultados, la cultura y las personas, y la orquestación de la transformación.',
          explanation:
            'La mitad de las seis perspectivas mira al negocio y a las personas: Business, People y Governance. Por eso el AWS CAF no es solo un tema técnico.',
          correct: true,
        },
        {
          id: 'phases-trio',
          label: 'Envision, Align y Launch',
          definition:
            'Tres de las cuatro fases iterativas de la transformación que propone el AWS CAF, junto con Scale.',
          explanation:
            'Es la trampa de confundir perspectivas con fases: Envision, Align y Launch son fases del camino, no perspectivas.',
          correct: false,
        },
        {
          id: 'only-business',
          label: 'Solo Business; las otras cinco perspectivas son técnicas',
          definition:
            'Idea de que el AWS CAF tiene una única perspectiva de negocio y que el resto se refiere a tecnología.',
          explanation:
            'People y Governance también están orientadas al negocio: tratan la cultura, el liderazgo, los programas y los riesgos de la transformación.',
          correct: false,
        },
      ],
    },
    {
      id: 'sustainability-report',
      prompt:
        'Última. La cadena de supermercados nos pide un informe de sostenibilidad: quiere datos claros sobre el impacto ambiental de nuestras entregas y más transparencia como empresa. ¿Con qué resultado de negocio del AWS CAF se conecta esto?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'operational-efficiency',
          label: 'Increased operational efficiency',
          definition:
            'Resultado del AWS CAF que reduce los costos de operación, aumenta la productividad y mejora la experiencia de empleados y clientes.',
          explanation:
            'La eficiencia operativa trata de costos y productividad. Usar información para la sostenibilidad y la transparencia corporativa es el resultado ESG.',
          correct: false,
        },
        {
          id: 'increased-revenue',
          label: 'Increased revenue',
          definition:
            'Resultado del AWS CAF que consiste en crear nuevos productos y servicios, llegar a nuevos clientes y entrar a nuevos segmentos de mercado.',
          explanation:
            'Aumentar los ingresos apunta a productos y clientes nuevos. El informe que pide la cadena es sobre sostenibilidad y transparencia.',
          correct: false,
        },
        {
          id: 'esg-performance',
          label: 'Improved ESG performance',
          definition:
            'Resultado del AWS CAF que usa información para mejorar la sostenibilidad y la transparencia corporativa.',
          explanation:
            'El desempeño ambiental, social y de gobierno es uno de los cuatro resultados clave del AWS CAF, y un informe de impacto ambiental y transparencia encaja justo ahí.',
          correct: true,
        },
        {
          id: 'reduced-risk',
          label: 'Reduced business risk',
          definition:
            'Resultado del AWS CAF que baja el perfil de riesgo del negocio con mejor confiabilidad, mayor rendimiento y seguridad reforzada.',
          explanation:
            'Reducir el riesgo del negocio trata de confiabilidad, rendimiento y seguridad. El pedido de la cadena es un tema de sostenibilidad.',
          correct: false,
        },
      ],
    },
  ],
};
