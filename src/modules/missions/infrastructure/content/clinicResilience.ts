import type { Mission } from '../../domain/Mission';

/**
 * Clínica Vida: a clinic whose appointment and patient-record system cannot go down.
 * Practices RDS Multi-AZ, the Reliability pillar, CloudWatch alarms, Elastic Disaster Recovery and multi-Region DR.
 */
export const clinicResilience: Mission = {
  id: 'clinic-resilience',
  buildingId: 'clinic',
  title: 'Sistemas que no pueden caerse',
  client: { name: 'Dr. Jorge Salazar', role: 'Director médico de Clínica Vida' },
  intro: [
    'Bienvenido, gracias por venir. Soy el doctor Jorge Salazar, director médico de Clínica Vida. Atendemos a cientos de pacientes cada día aquí en Quito.',
    'Todo pasa por nuestro sistema: las citas, las historias clínicas, los resultados de laboratorio. Si el sistema se detiene, los médicos trabajan a ciegas.',
    'El año pasado un corte de energía apagó nuestros servidores durante horas. No podíamos ver las alergias de un paciente ni confirmar una cita. Fueron horas muy angustiantes.',
    'Estamos llevando el sistema a AWS y quiero hacerlo bien: que no se caiga, que nos avise antes de que algo falle y que podamos recuperarnos de un desastre. ¿Me ayuda a diseñarlo?',
  ],
  outro: {
    passed: [
      'Excelente. Con la base de datos en varias zonas, alarmas que nos avisan a tiempo y un plan de recuperación probado, por fin puedo dormir tranquilo.',
      'Mis pacientes nunca sabrán todo lo que hicimos hoy, y eso es justamente lo mejor. Muchas gracias, consultor. Aquí siempre tendrá las puertas abiertas.',
    ],
    failed: [
      'Le agradezco el esfuerzo, pero todavía no me siento seguro. Con la salud de las personas no podemos dejar nada al azar.',
      'Repase la teoría con calma y vuelva cuando esté listo. Lo esperaré con gusto.',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'database-availability',
      prompt:
        'Las historias clínicas viven en una base de datos MySQL que vamos a pasar a Amazon RDS. Si falla la Availability Zone donde está, la base de datos tiene que seguir funcionando. ¿Qué configuramos?',
      topicSlug: 'bases-de-datos-relacionales',
      examTasks: ['3.4'],
      options: [
        {
          id: 'read-replicas',
          label: 'Réplicas de lectura (read replicas)',
          definition:
            'Copias de solo lectura de una base de datos RDS, actualizadas con replicación asíncrona, pensadas para escalar las lecturas.',
          explanation:
            'Las réplicas de lectura sirven para repartir consultas y reportes, no para la conmutación por error automática. El objetivo del doctor es que la base siga disponible, no leer más rápido.',
          correct: false,
        },
        {
          id: 'rds-multi-az',
          label: 'Amazon RDS Multi-AZ',
          definition:
            'Configuración de RDS que replica la base de datos de forma síncrona hacia una instancia de reserva (standby) en otra Availability Zone de la misma Región.',
          explanation:
            'Correcto. Multi-AZ está hecho para la alta disponibilidad: si la zona principal falla, RDS hace failover a la reserva y el sistema de la clínica sigue atendiendo.',
          correct: true,
        },
        {
          id: 'mysql-on-ec2',
          label: 'MySQL instalado en una sola instancia EC2',
          definition:
            'Base de datos autogestionada: AWS administra el hardware, pero el cliente instala, parcha, respalda y configura la alta disponibilidad.',
          explanation:
            'Una sola instancia en una sola zona es un punto único de falla, y además la clínica tendría que encargarse de parches y respaldos. Es justo lo contrario de lo que necesita.',
          correct: false,
        },
        {
          id: 'redshift',
          label: 'Amazon Redshift',
          definition:
            'El data warehouse de AWS, optimizado para analizar grandes volúmenes de datos históricos con consultas complejas.',
          explanation:
            'Redshift es para análisis masivo, no para las transacciones del día a día como registrar una cita o actualizar una historia clínica.',
          correct: false,
        },
      ],
    },
    {
      id: 'well-architected-pillar',
      prompt:
        'Mi junta directiva usa el AWS Well-Architected Framework para revisar proyectos. Nuestra preocupación es que el sistema se recupere solo de las fallas y que probemos la recuperación. ¿A qué pilar pertenece esto?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency (eficiencia del rendimiento)',
          definition:
            'Pilar sobre usar los recursos de la nube de forma eficiente para cumplir los requisitos de rendimiento a medida que cambian la demanda y la tecnología.',
          explanation:
            'Elegir el recurso que rinde mejor es eficiencia del rendimiento. Recuperarse de fallas es otra cosa, y es una confusión típica del examen.',
          correct: false,
        },
        {
          id: 'security',
          label: 'Security (seguridad)',
          definition:
            'Pilar sobre proteger datos, sistemas y activos: identidad sólida, trazabilidad, cifrado y seguridad en todas las capas.',
          explanation:
            'Proteger las historias clínicas es importantísimo, pero la preocupación del doctor aquí es que el sistema no se caiga, no quién accede a los datos.',
          correct: false,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization (optimización de costos)',
          definition:
            'Pilar sobre ejecutar sistemas que entregan valor de negocio al menor precio, con un modelo de consumo y atribución del gasto.',
          explanation:
            'Este pilar se ocupa de gastar menos. La meta de la clínica en esta pregunta es seguir funcionando ante una falla, no reducir la factura.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability (confiabilidad)',
          definition:
            'Pilar sobre la capacidad de una carga de trabajo de cumplir su función de forma correcta y consistente cuando se espera que lo haga.',
          explanation:
            'Exacto. Recuperarse automáticamente de las fallas y probar los procedimientos de recuperación son principios de diseño del pilar de confiabilidad.',
          correct: true,
        },
      ],
    },
    {
      id: 'early-alerts',
      prompt:
        'El corte del año pasado lo descubrimos cuando los médicos ya estaban llamando. Quiero que el equipo de sistemas reciba un aviso apenas la CPU o los errores se disparen. ¿Qué usamos?',
      topicSlug: 'monitoreo-y-operaciones',
      examTasks: ['2.2', '3.1'],
      options: [
        {
          id: 'cloudwatch-alarms',
          label: 'Alarmas de Amazon CloudWatch',
          definition:
            'Función de CloudWatch que vigila una métrica contra un umbral, envía una alerta y puede ejecutar acciones automáticas.',
          explanation:
            'Correcto. CloudWatch recopila métricas como el uso de CPU en tiempo real, y una alarma avisa al equipo en cuanto se supera el umbral, antes de que los pacientes lo noten.',
          correct: true,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'Servicio de auditoría que registra como eventos las acciones de usuarios, roles y servicios en la API de AWS: quién hizo qué y cuándo.',
          explanation:
            'CloudTrail responde quién hizo un cambio, no cómo está el rendimiento ahora. Para avisar cuando sube la CPU, la respuesta es CloudWatch.',
          correct: false,
        },
        {
          id: 'aws-config',
          label: 'AWS Config',
          definition:
            'Servicio que registra la configuración de tus recursos y sus cambios para evaluar si cumplen las reglas definidas.',
          explanation:
            'AWS Config sirve para saber cómo estaba configurado un recurso y si cumple las reglas, no para alertar por picos de CPU o de errores.',
          correct: false,
        },
        {
          id: 'trusted-advisor',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona tu entorno y recomienda mejores prácticas de costos, rendimiento, seguridad y tolerancia a fallos.',
          explanation:
            'Trusted Advisor da recomendaciones generales sobre tu entorno, pero no vigila en tiempo real la CPU del sistema de citas para avisar en el momento.',
          correct: false,
        },
      ],
    },
    {
      id: 'disaster-recovery-service',
      prompt:
        'Ahora pensemos en lo peor: un desastre grande. Quiero tener nuestros servidores completos replicados y listos para arrancarlos en AWS en minutos, no en horas. ¿Qué servicio lo hace?',
      topicSlug: 'almacenamiento-hibrido-y-respaldo',
      examTasks: ['3.6'],
      options: [
        {
          id: 'aws-backup',
          label: 'AWS Backup',
          definition:
            'Servicio totalmente administrado que centraliza y automatiza los respaldos de distintos servicios de AWS con planes y bóvedas.',
          explanation:
            'AWS Backup guarda copias para restaurar datos, y es útil para la clínica, pero no mantiene servidores completos listos para arrancar en minutos.',
          correct: false,
        },
        {
          id: 'storage-gateway',
          label: 'AWS Storage Gateway',
          definition:
            'Puente híbrido que conecta un dispositivo en tu centro de datos con el almacenamiento de AWS y mantiene una caché local.',
          explanation:
            'Storage Gateway sirve para un entorno híbrido continuo con caché local, no para levantar servidores de recuperación después de un desastre.',
          correct: false,
        },
        {
          id: 'elastic-disaster-recovery',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio que replica continuamente servidores de origen hacia un área de preparación en AWS para recuperarlos rápido ante un desastre.',
          explanation:
            'Correcto. Elastic Disaster Recovery lanza instancias de recuperación en minutos, permite hacer simulacros sin interrumpir la operación y luego hacer failback al sitio principal.',
          correct: true,
        },
        {
          id: 'health-dashboard',
          label: 'AWS Health Dashboard',
          definition:
            'Panel que muestra la salud de los servicios de AWS y los eventos que afectan a tu cuenta y a tus recursos.',
          explanation:
            'El Health Dashboard informa si una falla de AWS afecta a la cuenta de la clínica, pero no replica ni recupera ningún servidor.',
          correct: false,
        },
      ],
    },
    {
      id: 'second-region',
      prompt:
        'Mi socio insiste en usar una segunda Región de AWS desde el primer día. Yo creía que con varias Availability Zones bastaba. ¿Cuándo tiene sentido una segunda Región?',
      topicSlug: 'infraestructura-global',
      examTasks: ['3.2'],
      options: [
        {
          id: 'datacenter-failure',
          label: 'Para seguir funcionando si falla un centro de datos',
          definition:
            'Tolerar la falla de un centro de datos dentro de una Región, el escenario típico de alta disponibilidad.',
          explanation:
            'Para eso basta con varias Availability Zones, que no comparten puntos únicos de falla. Elegir varias Regiones aquí es una trampa clásica del examen.',
          correct: false,
        },
        {
          id: 'regional-disaster',
          label: 'Cuando el plan debe resistir la pérdida de una Región completa',
          definition:
            'Recuperación ante desastres y continuidad del negocio a nivel regional, manteniendo una copia o el servicio activo en otra Región.',
          explanation:
            'Correcto. Si la definición de desastre de la clínica incluye perder toda una Región, necesita una copia en otra. Si no, varias AZ ya cubren la falla de un centro de datos.',
          correct: true,
        },
        {
          id: 'automatic-replication',
          label: 'Para que AWS copie los datos solo entre Regiones',
          definition:
            'La idea de que los recursos creados en una Región aparecen automáticamente en las demás Regiones.',
          explanation:
            'Los datos no salen de una Región a menos que tú los repliques o copies explícitamente. Una segunda Región no hace nada por sí sola.',
          correct: false,
        },
        {
          id: 'edge-cache',
          label: 'Para que la página de citas cargue más rápido en Quito',
          definition:
            'Entregar contenido en caché cerca de los usuarios mediante ubicaciones de borde y Amazon CloudFront.',
          explanation:
            'Acercar contenido a los pacientes de una misma ciudad se resuelve con CloudFront y sus ubicaciones de borde, no abriendo una segunda Región.',
          correct: false,
        },
      ],
    },
  ],
};
