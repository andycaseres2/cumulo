import type { Mission } from '../../../domain/Mission';

/**
 * Café Byte: a café in Asunción whose ordering app breaks every Friday and runs a test server around the clock.
 * Practices telling apart the Well-Architected pillars: operational excellence, reliability, cost optimization and sustainability.
 */
export const wellArchitectedFramework1: Mission = {
  id: 'well-architected-framework-1',
  track: 'downtown',
  topicSlug: 'well-architected-framework',
  buildingId: 'cafe',
  title: 'Cuatro pilares y un cortado',
  client: { name: 'Camila Benítez', role: 'Dueña del Café Byte' },
  intro: [
    '¡Hola! Soy Camila Benítez, dueña del Café Byte. Aquí en Asunción somos el café de los programadores: buen wifi, enchufes en cada mesa y chipa recién horneada.',
    'Hace un año lanzamos una app para pedir desde la mesa o para llevar, y la tenemos en AWS. Los clientes la aman... cuando funciona.',
    'Cada viernes subimos un cambio enorme y algo se rompe, el servidor de pruebas queda encendido día y noche, y nuestros clientes más fieles nos preguntan cuánto contamina nuestra app.',
    'Una amiga me habló del AWS Well-Architected Framework, pero me perdí entre tantos pilares. ¿Me ayudas a saber qué pilar mirar para cada problema?',
  ],
  outro: {
    passed: [
      '¡Ahora tengo un mapa! Cambios pequeños y reversibles, recuperación probada, un servidor de pruebas que duerme de noche y una app que aprovecha mejor sus recursos.',
      'Cada problema tiene su pilar y ya sé por dónde empezar. Gracias: el cortado de hoy corre por cuenta de la casa.',
    ],
    failed: [
      'Mmm... creo que todavía mezclo los pilares. Algunas respuestas no me cierran.',
      'Repasa la teoría del Well-Architected Framework con calma y vuelve cuando quieras. Te guardo una mesa con enchufe.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'friday-deploys',
      prompt:
        'El primer problema: cada viernes subimos un cambio enorme a la app y algo se rompe. Queremos hacer cambios frecuentes, pequeños y reversibles, y tener runbooks para cuando algo salga mal. ¿Qué pilar nos guía?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'security',
          label: 'Security',
          definition:
            'Pilar sobre la capacidad de proteger datos, sistemas y activos, con identidad sólida, trazabilidad y cifrado.',
          explanation:
            'Es una confusión frecuente: los cambios pequeños, frecuentes y reversibles no son un principio de seguridad. Camila habla de cómo opera y despliega su app.',
          correct: false,
        },
        {
          id: 'operational-excellence',
          label: 'Operational excellence',
          definition:
            'Pilar sobre cómo organizar el equipo, diseñar, operar a escala y evolucionar la carga de trabajo, con observabilidad y automatización segura.',
          explanation:
            'Hacer cambios frecuentes, pequeños y reversibles, y refinar los procedimientos como los runbooks, son principios de diseño de la excelencia operativa.',
          correct: true,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'Pilar sobre ejecutar sistemas que entregan valor de negocio al menor precio, con un modelo de consumo y atribución del gasto.',
          explanation:
            'Los despliegues de los viernes no son un problema de dinero, sino de cómo el equipo opera y cambia la app.',
          correct: false,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'Pilar sobre el impacto ambiental de la carga de trabajo, en especial el consumo y la eficiencia energética.',
          explanation:
            'La sostenibilidad busca reducir el impacto ambiental. No dice cómo desplegar cambios sin romper la app.',
          correct: false,
        },
      ],
    },
    {
      id: 'zone-failure',
      prompt:
        'Segundo problema: si falla una Availability Zone, la app de pedidos debe recuperarse sola, y queremos probar cada cierto tiempo que de verdad podemos recuperarnos. ¿Qué pilar es ese?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency',
          definition:
            'Pilar sobre usar los recursos de la nube de forma eficiente para cumplir los requisitos de rendimiento a medida que cambian la demanda y la tecnología.',
          explanation:
            'Elegir el recurso que rinde mejor es eficiencia del rendimiento. Recuperarse de fallas y probar la recuperación pertenece a otro pilar.',
          correct: false,
        },
        {
          id: 'security',
          label: 'Security',
          definition:
            'Pilar sobre la capacidad de proteger datos, sistemas y activos, con identidad sólida, trazabilidad y cifrado.',
          explanation:
            'La seguridad protege datos y sistemas frente a accesos indebidos. La falla de una Availability Zone es un problema de funcionar de forma consistente.',
          correct: false,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'Pilar sobre ejecutar sistemas que entregan valor de negocio al menor precio, con un modelo de consumo y atribución del gasto.',
          explanation:
            'La meta de Camila no es gastar menos, sino que la app no se caiga cuando algo falla.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'Pilar sobre la capacidad de una carga de trabajo de cumplir su función de forma correcta y consistente cuando se espera que lo haga.',
          explanation:
            'Recuperarse automáticamente de las fallas y probar los procedimientos de recuperación son principios de diseño de la confiabilidad.',
          correct: true,
        },
      ],
    },
    {
      id: 'test-server',
      prompt:
        'Tercer problema, el que más le duele a mi contador: el servidor de pruebas está encendido las 24 horas, pero solo lo usamos ocho horas de lunes a viernes. Queremos pagar solo por lo que necesitamos. ¿Qué pilar nos guía?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'Pilar sobre ejecutar sistemas que entregan valor de negocio al menor precio, con un modelo de consumo y atribución del gasto.',
          explanation:
            'Adoptar un modelo de consumo, como apagar los entornos de prueba fuera del horario laboral, es un principio de la optimización de costos. La meta aquí es gastar menos.',
          correct: true,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'Pilar sobre el impacto ambiental de la carga de trabajo, en especial el consumo y la eficiencia energética.',
          explanation:
            'Apagar el servidor también reduce el consumo de energía, pero el objetivo del contador es pagar menos. Cuando la meta es el dinero, el pilar es optimización de costos.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'Pilar sobre la capacidad de una carga de trabajo de cumplir su función de forma correcta y consistente cuando se espera que lo haga.',
          explanation:
            'El servidor de pruebas no falla: simplemente está encendido cuando nadie lo usa. Eso no es un problema de confiabilidad.',
          correct: false,
        },
        {
          id: 'operational-excellence',
          label: 'Operational excellence',
          definition:
            'Pilar sobre cómo organizar el equipo, diseñar, operar a escala y evolucionar la carga de trabajo, con observabilidad y automatización segura.',
          explanation:
            'La excelencia operativa trata de cómo se opera y mejora la app. El problema del contador es pagar por horas que nadie usa.',
          correct: false,
        },
      ],
    },
    {
      id: 'green-app',
      prompt:
        'Último problema: nuestros clientes más fieles se preocupan por el planeta. Queremos reducir la huella ambiental de la app, aprovechar al máximo cada recurso y no tener nada ocioso. ¿Qué pilar es ese?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'cost-optimization',
          label: 'Cost optimization, porque la sostenibilidad es parte de ese pilar',
          definition:
            'Pilar sobre ejecutar sistemas que entregan valor de negocio al menor precio, con un modelo de consumo y atribución del gasto.',
          explanation:
            'La sostenibilidad no es una parte de optimización de costos: es un pilar oficial propio. Y la meta de Camila es contaminar menos, no gastar menos.',
          correct: false,
        },
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency',
          definition:
            'Pilar sobre usar los recursos de la nube de forma eficiente para cumplir los requisitos de rendimiento a medida que cambian la demanda y la tecnología.',
          explanation:
            'La eficiencia del rendimiento busca cumplir los requisitos de rendimiento. Camila pregunta por el impacto ambiental de su app.',
          correct: false,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'Pilar sobre el impacto ambiental de la carga de trabajo, en especial el consumo y la eficiencia energética.',
          explanation:
            'Entender el impacto, maximizar la utilización y evitar recursos ociosos son principios de diseño de la sostenibilidad, el sexto pilar del framework.',
          correct: true,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'Pilar sobre la capacidad de una carga de trabajo de cumplir su función de forma correcta y consistente cuando se espera que lo haga.',
          explanation:
            'La confiabilidad trata de recuperarse de fallas. No ayuda a medir ni a reducir la huella ambiental de la app.',
          correct: false,
        },
      ],
    },
  ],
};
