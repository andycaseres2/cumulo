import type { Mission } from '../../../domain/Mission';

/**
 * Hoteles Mirador: a hotel chain in Cartagena whose move to the cloud stalls on people, risk and planning, not on servers.
 * Practices the AWS CAF perspectives (People, Governance), the Launch phase and the business outcomes it targets.
 */
export const cloudAdoptionFramework1: Mission = {
  id: 'cloud-adoption-framework-1',
  track: 'downtown',
  buildingId: 'hotel',
  topicSlug: 'cloud-adoption-framework',
  title: 'Check-in a la nube',
  client: { name: 'Valeria Montoya', role: 'Directora de transformación digital de Hoteles Mirador' },
  intro: [
    'Te damos la bienvenida al Mirador. Soy Valeria Montoya, directora de transformación digital de Hoteles Mirador. Tenemos seis hoteles frente al mar en Cartagena y desde estas oficinas manejamos reservas, cocina y eventos.',
    'Hace un año la junta dijo "nos vamos a la nube" y TI empezó a mover servidores. El problema es que nada de lo demás se movió: la gente no sabe trabajar así, nadie controla los riesgos y cada área va por su lado.',
    'Me recomendaron el AWS Cloud Adoption Framework para poner orden, pero lo leí y me perdí entre perspectivas, fases y resultados.',
    'Si en la próxima junta no presento un plan claro, congelan el presupuesto de la transformación. ¿Me ayudas a hacer el check-in de este hotel en la nube?',
  ],
  outro: {
    passed: [
      '¡Ahora sí tengo un plan que se entiende! La cultura del equipo tiene dueño en People, los riesgos del programa los orquesta Governance y sabemos en qué fase estamos.',
      'Y lo mejor: la junta ve la nube como una forma de vender más, no como un gasto de TI. Gracias: en el Mirador siempre tendrás una habitación con vista al mar.',
    ],
    failed: [
      'Mmm... con estas respuestas la junta me va a hacer más preguntas de las que puedo contestar. Todavía mezclo perspectivas, fases y resultados.',
      'Repasa la teoría del AWS CAF con calma y vuelve cuando quieras. La recepción del Mirador queda abierta para ti.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'team-culture',
      prompt:
        'Lo primero que me preocupa es mi gente. Los recepcionistas y el equipo de TI no tienen las habilidades para trabajar en la nube, y los jefes de cada hotel se resisten al cambio. ¿Qué perspectiva del AWS CAF atiende esto?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'governance-culture',
          label: 'Governance',
          definition:
            'Perspectiva del AWS CAF que orquesta las iniciativas de transformación con gestión de programas, proyectos, riesgos y gobierno de datos.',
          explanation:
            'Governance coordina el programa y sus riesgos. La cultura, el liderazgo y las habilidades del equipo pertenecen a la perspectiva People.',
          correct: false,
        },
        {
          id: 'people-culture',
          label: 'People',
          definition:
            'Perspectiva del AWS CAF que hace de puente entre tecnología y negocio: cultura, estructura organizacional, liderazgo y fuerza laboral.',
          explanation:
            'La resistencia al cambio y la falta de habilidades se atienden con capacidades de People, como la evolución de la cultura, la transformación de la fuerza laboral y la aceleración del cambio.',
          correct: true,
        },
        {
          id: 'platform-culture',
          label: 'Platform',
          definition:
            'Perspectiva del AWS CAF que construye una plataforma de nube escalable y moderniza o crea soluciones nativas de la nube.',
          explanation:
            'Platform se ocupa de la arquitectura y del desarrollo de aplicaciones. No trabaja la cultura de los hoteles ni las habilidades de las personas.',
          correct: false,
        },
        {
          id: 'operations-culture',
          label: 'Operations',
          definition:
            'Perspectiva del AWS CAF que busca que los servicios en la nube se entreguen al nivel que el negocio necesita, con observabilidad e incidentes.',
          explanation:
            'Operations cuida que los sistemas funcionen bien una vez en la nube. La resistencia al cambio del equipo es un tema de People.',
          correct: false,
        },
      ],
    },
    {
      id: 'program-risk',
      prompt:
        'Segundo dolor de cabeza: cada área lanzó su propio proyecto de nube, nadie prioriza el portafolio y nadie lleva la cuenta de los riesgos de toda la transformación. ¿Qué perspectiva se encarga de orquestar esto?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'security-risk',
          label: 'Security',
          definition:
            'Perspectiva del AWS CAF que busca la confidencialidad, integridad y disponibilidad de los datos y las cargas de trabajo.',
          explanation:
            'Es una trampa típica: Security protege datos y cargas de trabajo, pero gestionar los riesgos del programa de transformación y priorizar proyectos corresponde a Governance.',
          correct: false,
        },
        {
          id: 'business-risk',
          label: 'Business',
          definition:
            'Perspectiva del AWS CAF que busca que las inversiones en la nube aceleren la transformación digital y los resultados de negocio.',
          explanation:
            'Business define la estrategia y los resultados que se persiguen. Coordinar programas, proyectos y riesgos de la transformación es tarea de Governance.',
          correct: false,
        },
        {
          id: 'operations-risk',
          label: 'Operations',
          definition:
            'Perspectiva del AWS CAF centrada en la observabilidad, la gestión de incidentes y problemas, los parches y la continuidad de los servicios.',
          explanation:
            'Operations gestiona incidentes de los sistemas ya en marcha. No orquesta el portafolio de proyectos ni los riesgos del programa completo.',
          correct: false,
        },
        {
          id: 'governance-risk',
          label: 'Governance',
          definition:
            'Perspectiva del AWS CAF que orquesta las iniciativas de transformación con gestión de programas, proyectos, riesgos y gobierno de datos.',
          explanation:
            'Governance maximiza los beneficios y minimiza los riesgos de la transformación: ordena los proyectos de cada área en un programa, gestiona sus riesgos y el portafolio de aplicaciones.',
          correct: true,
        },
      ],
    },
    {
      id: 'pilot-phase',
      prompt:
        'Ya decidimos empezar por algo concreto: poner en producción el nuevo sistema de reservas en uno solo de los seis hoteles, demostrar que funciona y aprender antes de seguir. ¿En qué fase del AWS CAF estaríamos?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'launch-phase',
          label: 'Launch',
          definition:
            'Fase del AWS CAF en la que se entregan pilotos en producción que demuestran valor incremental y dejan aprendizajes.',
          explanation:
            'Un piloto en producción en un hotel, para demostrar valor y aprender, es exactamente lo que describe Launch. Expandirlo a los seis hoteles vendría después, en Scale.',
          correct: true,
        },
        {
          id: 'envision-phase',
          label: 'Envision',
          definition:
            'Fase del AWS CAF que muestra cómo la nube acelerará los resultados de negocio e identifica y prioriza oportunidades con responsables y métricas.',
          explanation:
            'Envision es el momento de identificar y priorizar oportunidades. Ustedes ya eligieron una y la están poniendo en producción.',
          correct: false,
        },
        {
          id: 'align-phase',
          label: 'Align',
          definition:
            'Fase del AWS CAF que identifica brechas de capacidades en las seis perspectivas, dependencias entre áreas y preocupaciones de las partes interesadas.',
          explanation:
            'Align prepara a la organización encontrando brechas y dependencias. Entregar un piloto funcionando en producción ya corresponde a Launch.',
          correct: false,
        },
        {
          id: 'scale-phase',
          label: 'Scale',
          definition:
            'Fase del AWS CAF que expande los pilotos y el valor de negocio a la escala deseada y asegura que los beneficios se mantengan.',
          explanation:
            'Scale llega cuando el piloto ya demostró valor y se expande a toda la cadena. Ustedes están arrancando con un solo hotel.',
          correct: false,
        },
      ],
    },
    {
      id: 'board-outcome',
      prompt:
        'Para la junta necesito hablar su idioma. Con la nube queremos lanzar paquetes de bodas y eventos corporativos que se reserven en línea y llegar a turistas de otros países que hoy no nos encuentran. ¿Qué resultado de negocio del AWS CAF es este?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'reduced-risk',
          label: 'Reduced business risk',
          definition:
            'Resultado del AWS CAF que baja el perfil de riesgo del negocio con mejor confiabilidad, mayor rendimiento y seguridad reforzada.',
          explanation:
            'Reducir el riesgo trata de confiabilidad y seguridad. Lanzar nuevos paquetes y llegar a nuevos clientes apunta a aumentar los ingresos.',
          correct: false,
        },
        {
          id: 'esg-performance',
          label: 'Improved ESG performance',
          definition:
            'Resultado del AWS CAF que usa información para mejorar la sostenibilidad y la transparencia corporativa.',
          explanation:
            'El desempeño ESG se refiere a sostenibilidad y transparencia. Los paquetes de bodas y los turistas de otros países son una meta de ingresos.',
          correct: false,
        },
        {
          id: 'increased-revenue',
          label: 'Increased revenue',
          definition:
            'Resultado del AWS CAF que consiste en crear nuevos productos y servicios, llegar a nuevos clientes y entrar a nuevos segmentos de mercado.',
          explanation:
            'Nuevos paquetes reservables en línea son nuevos productos, y los turistas de otros países son nuevos clientes y segmentos: es el resultado de aumentar los ingresos.',
          correct: true,
        },
        {
          id: 'operational-efficiency',
          label: 'Increased operational efficiency',
          definition:
            'Resultado del AWS CAF que reduce los costos de operación, aumenta la productividad y mejora la experiencia de empleados y clientes.',
          explanation:
            'La eficiencia operativa busca hacer lo mismo con menos costo y esfuerzo. Aquí la meta es vender productos nuevos a clientes nuevos.',
          correct: false,
        },
      ],
    },
  ],
};
