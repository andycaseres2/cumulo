import type { Mission } from '../../../domain/Mission';

/**
 * Escuela Digital: an online school in San José preparing a Well-Architected review of its grades platform.
 * Practices the AWS Well-Architected Tool, what a review is (and is not), and the security and performance efficiency pillars.
 */
export const wellArchitectedFramework2: Mission = {
  id: 'well-architected-framework-2',
  track: 'centro',
  topicSlug: 'well-architected-framework',
  buildingId: 'school',
  title: 'La revisión antes del examen',
  client: { name: 'Andrés Solano', role: 'Coordinador de tecnología de Escuela Digital' },
  intro: [
    '¡Pura vida! Soy Andrés Solano, coordinador de tecnología de Escuela Digital. Desde San José damos clases en línea de secundaria a estudiantes de todo Costa Rica.',
    'Construimos en AWS una plataforma nueva donde los profesores registran las notas y los estudiantes las consultan. La lanzamos en dos meses, justo antes de los exámenes finales.',
    'La rectora quiere estar segura de que la plataforma está bien hecha antes del lanzamiento, y alguien le recomendó una revisión Well-Architected. Ella tiene miedo de que sea una auditoría que nos castigue.',
    'Además, en las pruebas la plataforma va lenta y aún no tenemos claro quién puede ver qué nota. ¿Me ayudas a preparar la revisión?',
  ],
  outro: {
    passed: [
      '¡Excelente! La rectora ya sabe que la revisión es una conversación, tenemos la herramienta para medir nuestros avances y un plan para los riesgos altos.',
      'Cada profesor ve solo sus cursos, sabemos quién cambia cada nota y la plataforma por fin aguanta la época de exámenes. Gracias: te ganaste un diez.',
    ],
    failed: [
      'Mmm... con estas respuestas no me animo a presentarle el plan a la rectora.',
      'Repasa la teoría del Well-Architected Framework con calma y vuelve cuando quieras. La clase sigue abierta.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'review-tool',
      prompt:
        'Primero lo práctico: quiero revisar la plataforma con un proceso consistente, respondiendo preguntas sobre ella, encontrar los riesgos altos y guardar fotos del avance para comparar en unos meses. ¿Qué uso?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar informes de cumplimiento de AWS, como SOC, PCI e ISO, y gestionar acuerdos.',
          explanation:
            'Artifact entrega informes sobre el cumplimiento de AWS. No revisa la arquitectura de la plataforma de notas ni guarda su avance.',
          correct: false,
        },
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'Herramienta web para estimar el costo de una arquitectura en AWS antes de desplegarla.',
          explanation:
            'La calculadora estima cuánto costará la plataforma, pero no evalúa si su arquitectura sigue las buenas prácticas.',
          correct: false,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas desde la consola, la CLI, los SDK y las API.',
          explanation:
            'CloudTrail registra quién hizo cada acción en la cuenta, pero no compara la arquitectura con el framework ni identifica riesgos altos.',
          correct: false,
        },
        {
          id: 'wa-tool',
          label: 'AWS Well-Architected Tool',
          definition:
            'Servicio en la consola que da un proceso consistente para revisar y medir cargas de trabajo con el AWS Well-Architected Framework.',
          explanation:
            'Con el WA Tool, Andrés responde preguntas sobre su workload, identifica los problemas de alto riesgo (HRI), recibe un plan de mejora y guarda milestones para medir su progreso.',
          correct: true,
        },
      ],
    },
    {
      id: 'calm-the-principal',
      prompt:
        'La rectora tiene dos miedos: que la revisión sea una auditoría que nos castigue, y que la herramienta cambie la plataforma por su cuenta. ¿Qué le explico?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'audit-certification',
          label: 'Que es una auditoría oficial y que, si la aprobamos, AWS certifica la plataforma',
          definition:
            'La idea de que una revisión Well-Architected funciona como un examen formal que termina en una certificación.',
          explanation:
            'AWS aclara que una revisión Well-Architected es una conversación constructiva, no una auditoría que apruebe o repruebe la plataforma.',
          correct: false,
        },
        {
          id: 'conversation',
          label: 'Que es una conversación constructiva: la herramienta evalúa y recomienda, y nosotros decidimos qué cambiar',
          definition:
            'La idea de que la revisión Well-Architected es un diálogo sobre buenas prácticas, en el que el equipo elige qué mejoras implementar.',
          explanation:
            'AWS define la revisión como una conversación constructiva, no una auditoría. El Well-Architected Tool evalúa y recomienda; el equipo de Andrés decide e implementa las mejoras.',
          correct: true,
        },
        {
          id: 'auto-fix',
          label: 'Que la herramienta corrige automáticamente los riesgos que encuentra',
          definition:
            'La idea de que la herramienta de revisión modifica los recursos de la cuenta para resolver los problemas detectados.',
          explanation:
            'El Well-Architected Tool no aplica cambios: identifica riesgos y propone un plan de mejora, y el equipo decide qué implementar.',
          correct: false,
        },
        {
          id: 'only-security',
          label: 'Que la revisión solo mira la seguridad, así que lo demás no se toca',
          definition:
            'La idea de que el framework evalúa un único aspecto de la arquitectura en lugar de varios pilares.',
          explanation:
            'El framework cubre seis pilares: excelencia operativa, seguridad, confiabilidad, eficiencia del rendimiento, optimización de costos y sostenibilidad.',
          correct: false,
        },
      ],
    },
    {
      id: 'grades-access',
      prompt:
        'Ahora el tema de las notas. Cada profesor debe ver y editar solo las notas de sus cursos, y queremos saber siempre quién cambió cada nota. ¿Qué pilar trata esto?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'security',
          label: 'Security',
          definition:
            'Pilar sobre la capacidad de proteger datos, sistemas y activos, con identidad sólida, trazabilidad y cifrado.',
          explanation:
            'Implementar una base sólida de identidad con mínimo privilegio y mantener la trazabilidad son principios de diseño del pilar de seguridad.',
          correct: true,
        },
        {
          id: 'operational-excellence',
          label: 'Operational excellence',
          definition:
            'Pilar sobre cómo organizar el equipo, diseñar, operar a escala y evolucionar la carga de trabajo, con observabilidad y automatización segura.',
          explanation:
            'La excelencia operativa mira cómo se opera y se mejora la plataforma. Controlar quién accede a las notas y registrar quién las cambia es seguridad.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'Pilar sobre la capacidad de una carga de trabajo de cumplir su función de forma correcta y consistente cuando se espera que lo haga.',
          explanation:
            'La confiabilidad trata de recuperarse de fallas. El problema aquí es quién puede ver y cambiar cada nota.',
          correct: false,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'Pilar sobre ejecutar sistemas que entregan valor de negocio al menor precio, con un modelo de consumo y atribución del gasto.',
          explanation:
            'Atribuir el gasto a cada dueño es un tema de costos, no de quién puede ver las notas de los estudiantes.',
          correct: false,
        },
      ],
    },
    {
      id: 'slow-platform',
      prompt:
        'Último tema: en las pruebas, la plataforma va lenta. Queremos elegir los tipos de recursos que mejor encajan con cómo se usa, probar una arquitectura serverless y experimentar más seguido. ¿Qué pilar nos guía?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'Pilar sobre la capacidad de una carga de trabajo de cumplir su función de forma correcta y consistente cuando se espera que lo haga.',
          explanation:
            'Es una confusión frecuente: la confiabilidad trata de recuperarse de fallas. Elegir el recurso que rinde mejor pertenece a otro pilar.',
          correct: false,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'Pilar sobre el impacto ambiental de la carga de trabajo, en especial el consumo y la eficiencia energética.',
          explanation:
            'La sostenibilidad busca reducir el impacto ambiental. Andrés quiere que la plataforma responda rápido.',
          correct: false,
        },
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency',
          definition:
            'Pilar sobre usar los recursos de la nube de forma eficiente para cumplir los requisitos de rendimiento a medida que cambian la demanda y la tecnología.',
          explanation:
            'Usar arquitecturas serverless, experimentar más seguido y elegir la tecnología que mejor encaja con el patrón de uso son principios de la eficiencia del rendimiento.',
          correct: true,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'Pilar sobre ejecutar sistemas que entregan valor de negocio al menor precio, con un modelo de consumo y atribución del gasto.',
          explanation:
            'La meta de Andrés no es gastar menos, sino que la plataforma cumpla con el rendimiento que necesitan los estudiantes.',
          correct: false,
        },
      ],
    },
  ],
};
