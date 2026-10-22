import type { Mission } from '../../../domain/Mission';

/**
 * Diario La Voz: a newspaper in Córdoba whose oversized servers and always-on test environments eat the budget.
 * Practices rightsizing, AWS Compute Optimizer, automation to stop idle resources and leaving data center heavy lifting to AWS.
 */
export const economiaDeLaNube2: Mission = {
  id: 'economia-de-la-nube-2',
  track: 'centro',
  topicSlug: 'economia-de-la-nube',
  buildingId: 'diario-la-voz',
  title: 'Servidores en la primera plana',
  client: { name: 'Ramiro Acosta', role: 'Jefe de sistemas del Diario La Voz' },
  intro: [
    '¡Che, qué bueno que viniste! Soy Ramiro Acosta, jefe de sistemas del Diario La Voz. Desde Córdoba publicamos noticias en papel y en la web todos los días del año.',
    'Hace un año movimos el sitio a AWS. Como no queríamos que se cayera el día de una gran noticia, elegimos los servidores más grandes que encontramos, por las dudas.',
    'Ahora la gerencia mira la factura y me pide recortar sin que el sitio se vuelva lento. Encima, los entornos de desarrollo y prueba están encendidos día y noche.',
    'Mi equipo pasa la mitad del tiempo apagando incendios en vez de mejorar la web. ¿Me ayudas a ordenar esto?',
  ],
  outro: {
    passed: [
      '¡Esto es noticia de tapa! Servidores del tamaño justo, recomendaciones basadas en datos reales y entornos de prueba que se apagan solos fuera de horario.',
      'Y mi equipo por fin puede dedicarse a la web y no a los fierros. Gracias: tu nombre va a salir en la sección de agradecimientos.',
    ],
    failed: [
      'Mmm... con estas decisiones no creo que la gerencia quede conforme. Algunas no me cierran.',
      'Repasa la teoría de la economía de la nube con calma y vuelve cuando quieras. La redacción no cierra nunca.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'oversized-servers',
      prompt:
        'Mira estos gráficos: los servidores de la web casi nunca pasan del 10 % de uso de CPU, ni siquiera en días de elecciones. ¿Qué práctica nos ayuda a gastar menos sin perder rendimiento?',
      topicSlug: 'economia-de-la-nube',
      examTasks: ['1.4'],
      options: [
        {
          id: 'scale-up',
          label: 'Pasar a servidores todavía más grandes, para estar tranquilos',
          definition:
            'Escalado vertical: reemplazar un servidor por otro con más CPU y memoria.',
          explanation:
            'Agrandar servidores que casi no se usan aumenta el desperdicio. El problema de Ramiro es justamente que le sobra capacidad.',
          correct: false,
        },
        {
          id: 'rightsizing',
          label: 'Rightsizing: ajustar el tipo y el tamaño de los servidores al uso real',
          definition:
            'Práctica de ajustar el tipo y tamaño de los recursos a lo que la carga de trabajo realmente necesita.',
          explanation:
            'Con un uso tan bajo, el rightsizing normalmente significa reducir lo sobredimensionado: menos desperdicio y el mismo rendimiento para los lectores.',
          correct: true,
        },
        {
          id: 'byol',
          label: 'BYOL: traer licencias propias a los servidores',
          definition:
            'Modelo en el que el cliente reutiliza en AWS las licencias de software que ya compró, cumpliendo las reglas del fabricante.',
          explanation:
            'BYOL ayuda a aprovechar licencias ya pagadas, pero no corrige que los servidores sean mucho más grandes de lo necesario.',
          correct: false,
        },
        {
          id: 'same-size-more-servers',
          label: 'Mantener el tamaño y agregar más servidores iguales',
          definition:
            'Escalado horizontal: sumar más instancias del mismo tipo para repartir la carga.',
          explanation:
            'Si los servidores actuales ya están casi ociosos, sumar más del mismo tamaño solo agranda la factura.',
          correct: false,
        },
      ],
    },
    {
      id: 'sizing-advice',
      prompt:
        'No quiero adivinar el tamaño nuevo. ¿Qué servicio de AWS analiza la configuración y las métricas de uso de nuestros servidores para recomendarnos el tamaño adecuado y señalar los recursos ociosos?',
      topicSlug: 'economia-de-la-nube',
      examTasks: ['1.4'],
      options: [
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'Servicio para administrar licencias de fabricantes como Microsoft, SAP, Oracle e IBM entre cuentas y Regiones.',
          explanation:
            'License Manager administra licencias y evita excesos de uso, pero no analiza el tamaño de los servidores.',
          correct: false,
        },
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'Herramienta web para estimar el costo de una arquitectura en AWS antes de desplegarla.',
          explanation:
            'La calculadora estima el costo de una arquitectura que tú describes, pero no analiza las métricas reales de los servidores del diario.',
          correct: false,
        },
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio que monitorea recursos y aplicaciones en tiempo real con métricas, logs, dashboards y alarmas.',
          explanation:
            'CloudWatch muestra las métricas, como el 10 % de CPU que vio Ramiro, pero el servicio que las analiza para recomendar tamaños es otro.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'AWS Compute Optimizer',
          definition:
            'Servicio que analiza la configuración y las métricas de uso de los recursos para recomendar su tamaño e identificar recursos ociosos.',
          explanation:
            'Compute Optimizer da recomendaciones de rightsizing basadas en el uso real y señala recursos ociosos, para reducir costos y mejorar el rendimiento.',
          correct: true,
        },
      ],
    },
    {
      id: 'test-environments',
      prompt:
        'Ahora los entornos de desarrollo y prueba. El equipo los usa unas ocho horas al día, de lunes a viernes, pero están encendidos las 168 horas de la semana. ¿Qué hacemos?',
      topicSlug: 'economia-de-la-nube',
      examTasks: ['1.4'],
      options: [
        {
          id: 'manual-stop',
          label: 'Pedirle al equipo que los apague a mano cuando se acuerde',
          definition:
            'Depender de que cada persona detenga los recursos manualmente al terminar su jornada.',
          explanation:
            'Depender de la memoria de cada persona deja recursos encendidos por error. Automatizar da respuestas consistentes y menos errores humanos.',
          correct: false,
        },
        {
          id: 'automate-stop',
          label: 'Automatizar su apagado fuera del horario laboral',
          definition:
            'Programar la detención y el encendido de los recursos según el horario en que realmente se usan.',
          explanation:
            'Si se usan unas 40 de las 168 horas semanales, detenerlos fuera de ese horario da un ahorro potencial de alrededor del 75 %, sin depender de que alguien se acuerde.',
          correct: true,
        },
        {
          id: 'bigger-test',
          label: 'Darles servidores más grandes para que el equipo termine antes',
          definition:
            'Escalado vertical de los entornos de prueba: más CPU y memoria para cada servidor.',
          explanation:
            'Servidores más grandes cuestan más por hora y siguen encendidos toda la semana. El problema son las horas ociosas.',
          correct: false,
        },
        {
          id: 'leave-on',
          label: 'Dejarlos encendidos, porque en la nube un servidor sin uso no se cobra',
          definition:
            'La idea de que los recursos que no procesan trabajo no generan costo mientras están encendidos.',
          explanation:
            'Una instancia encendida se cobra aunque nadie la use. La ventaja de la nube es que se puede apagar y dejar de pagar sus horas de cómputo.',
          correct: false,
        },
      ],
    },
    {
      id: 'heavy-lifting',
      prompt:
        'Última pregunta, del directorio. Antes, mi equipo pasaba horas cambiando discos, cableando racks y peleando con el aire acondicionado de la sala de servidores. ¿Qué ventaja de la nube describe que ahora puedan dedicarse a mejorar la web?',
      topicSlug: 'economia-de-la-nube',
      examTasks: ['1.4'],
      options: [
        {
          id: 'stop-data-centers',
          label: 'Stop spending money running and maintaining data centers',
          definition:
            'Ventaja por la que la empresa deja de instalar, cablear y alimentar servidores y se enfoca en lo que diferencia a su negocio.',
          explanation:
            'AWS se encarga del trabajo pesado de operar centros de datos, y el equipo de Ramiro se concentra en sus lectores. Es también el principio de dejar de gastar en trabajo pesado indiferenciado.',
          correct: true,
        },
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'Ventaja por la que AWS agrupa el uso de cientos de miles de clientes y consigue costos más bajos que se traducen en precios de pago por uso más bajos.',
          explanation:
            'Las economías de escala explican precios más bajos. El directorio pregunta por el tiempo que el equipo ya no dedica a mantener la sala de servidores.',
          correct: false,
        },
        {
          id: 'go-global',
          label: 'Go global in minutes',
          definition:
            'Ventaja por la que una aplicación se despliega en varias Regiones del mundo con pocos clics, con menor latencia para los usuarios.',
          explanation:
            'Llegar a lectores de otros países no tiene que ver con dejar de cambiar discos y cablear racks.',
          correct: false,
        },
        {
          id: 'variable-expense',
          label: 'Trade fixed expense for variable expense',
          definition:
            'Ventaja por la que se paga solo cuando se consumen recursos y solo por lo que se consume, en vez de invertir por adelantado.',
          explanation:
            'El gasto variable cambia la forma de pagar. La pregunta es sobre el trabajo de mantener el hardware, que ahora hace AWS.',
          correct: false,
        },
      ],
    },
  ],
};
