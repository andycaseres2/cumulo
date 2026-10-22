import type { Mission } from '../../../domain/Mission';

/**
 * Universidad Tecnológica: the university's IT team in Arequipa keeping its online enrollment platform alive.
 * Practices Amazon CloudWatch alarms, AWS CloudTrail, AWS Systems Manager and AWS Health Dashboard.
 */
export const monitoringAndOperations1: Mission = {
  id: 'monitoring-and-operations-1',
  track: 'tech',
  topicSlug: 'monitoring-and-operations',
  buildingId: 'university',
  title: 'Semana de matrículas',
  client: { name: 'Rosa Apaza', role: 'Jefa de infraestructura de la Universidad Tecnológica' },
  intro: [
    'Te damos la bienvenida a la universidad. Soy Rosa Apaza, jefa de infraestructura. Desde Arequipa manejamos el sistema de matrículas en línea que usan más de veinte mil estudiantes.',
    'La plataforma corre en instancias EC2 y cada semestre pasa lo mismo: en la semana de matrículas se pone lenta, se cae, y nos enteramos por las quejas en redes sociales.',
    'Encima, el fin de semana pasado alguien cambió algo y nadie sabe quién. Y mi equipo pasa noches enteras parchando servidores uno por uno, abriendo el puerto 22 para entrar.',
    'Las matrículas abren en dos semanas. Si vuelve a fallar, el rector me pide la renuncia. ¿Me ayudas a ordenar esta operación?',
  ],
  outro: {
    passed: [
      'Esto es otra cosa. Ahora las alarmas nos avisan antes que los estudiantes, sabemos quién hizo cada cambio y los parches se aplican a todos los servidores de una vez.',
      'Y si la falla es de AWS, lo vemos en el Health Dashboard en lugar de adivinar. Gracias: el rector quiere invitarte a dar una charla en el auditorio.',
    ],
    failed: [
      'Mmm... con estas respuestas la semana de matrículas va a ser igual de caótica que siempre.',
      'Repasa la teoría de monitoreo y operaciones, y vuelve cuando quieras. Aquí la puerta de sistemas siempre está abierta.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'cpu-alarm',
      prompt:
        'Lo primero: no quiero volver a enterarme de una caída por las redes sociales. Necesito ver en un tablero el uso de CPU de los servidores de matrícula y que, si supera el 80 %, nos llegue una alerta y se dispare una acción automática. ¿Qué servicio usamos?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio que monitorea recursos y aplicaciones en tiempo real con métricas, logs, dashboards y alarmas.',
          explanation:
            'CloudWatch recibe métricas como el uso de CPU, las muestra en dashboards y sus alarmas vigilan el umbral del 80 %, avisan al equipo y pueden ejecutar acciones automáticas.',
          correct: true,
        },
        {
          id: 'cloudtrail-alarm',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas en la cuenta.',
          explanation:
            'CloudTrail responde quién hizo qué y cuándo. No vigila métricas de rendimiento como la CPU contra un umbral.',
          correct: false,
        },
        {
          id: 'config-alarm',
          label: 'AWS Config',
          definition:
            'Servicio que registra la configuración de los recursos y sus cambios, y evalúa si cumplen las reglas definidas.',
          explanation:
            'Config muestra cómo está configurado un recurso y si cumple las reglas, pero no mide el uso de CPU en tiempo real.',
          correct: false,
        },
        {
          id: 'license-alarm',
          label: 'AWS License Manager',
          definition:
            'Servicio que administra licencias de software de proveedores como Microsoft, SAP, Oracle e IBM.',
          explanation:
            'License Manager controla el consumo de licencias. No monitorea el rendimiento de los servidores de matrícula.',
          correct: false,
        },
      ],
    },
    {
      id: 'weekend-change',
      prompt:
        'Ahora el misterio del fin de semana: alguien modificó el security group de los servidores de matrícula y dejó la plataforma sin acceso por horas. Necesito saber qué usuario hizo ese cambio y a qué hora. ¿Dónde lo busco?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudwatch-who',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio de monitoreo con métricas de rendimiento, logs, dashboards y alarmas en tiempo real.',
          explanation:
            'Es la trampa típica: CloudWatch responde cómo está funcionando algo. Para saber quién hizo una acción en la API, la fuente es CloudTrail.',
          correct: false,
        },
        {
          id: 'health-who',
          label: 'AWS Health Dashboard',
          definition:
            'Panel que muestra la salud de los servicios de AWS y los eventos que afectan a la cuenta y sus recursos.',
          explanation:
            'Health Dashboard informa sobre eventos de AWS. No identifica qué usuario de la universidad modificó un security group.',
          correct: false,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas desde la consola, la CLI, los SDK y las API.',
          explanation:
            'CloudTrail responde quién hizo qué, sobre qué recurso y cuándo. El Event history muestra los eventos de administración de los últimos 90 días, y con un trail en S3 se guardan de forma continua.',
          correct: true,
        },
        {
          id: 'compute-optimizer-who',
          label: 'AWS Compute Optimizer',
          definition:
            'Servicio que analiza la configuración y las métricas de uso de los recursos para recomendar su tamaño adecuado.',
          explanation:
            'Compute Optimizer da recomendaciones de rightsizing. No registra quién hizo los cambios en la cuenta.',
          correct: false,
        },
      ],
    },
    {
      id: 'patching',
      prompt:
        'Mi equipo pasa noches parchando doscientos servidores uno por uno, y para entrar abren el puerto 22. Quiero aplicar los parches a todos de una vez y conectarnos sin abrir puertos de entrada ni usar SSH. ¿Qué servicio usamos?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-catalog-patch',
          label: 'AWS Service Catalog',
          definition:
            'Servicio para crear catálogos de productos de TI aprobados que los usuarios lanzan por autoservicio.',
          explanation:
            'Service Catalog controla qué productos aprobados pueden lanzar los equipos. No aplica parches a servidores que ya existen.',
          correct: false,
        },
        {
          id: 'cloudwatch-patch',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio que recopila métricas y logs, y dispara alarmas sobre los recursos y las aplicaciones.',
          explanation:
            'CloudWatch puede avisar que un servidor tiene problemas, pero no es la herramienta para parcharlo ni para conectarse a él.',
          correct: false,
        },
        {
          id: 'compute-optimizer-patch',
          label: 'AWS Compute Optimizer',
          definition:
            'Servicio que recomienda el ajuste de tamaño de recursos como instancias EC2 según sus métricas de uso.',
          explanation:
            'Compute Optimizer recomienda tamaños de instancia. No ejecuta parches ni da acceso remoto a los servidores.',
          correct: false,
        },
        {
          id: 'systems-manager',
          label: 'AWS Systems Manager',
          definition:
            'Servicio para ver, administrar y operar nodos a escala, con parches, comandos remotos y conexión segura a los nodos.',
          explanation:
            'Con el SSM Agent en los servidores, Systems Manager aplica parches a todos a la vez y Session Manager permite conectarse sin abrir puertos de entrada, sin bastion hosts ni SSH: un proceso repetible en lugar de trabajo manual.',
          correct: true,
        },
      ],
    },
    {
      id: 'aws-event',
      prompt:
        'Última pregunta. Si el día de matrículas la plataforma falla y el equipo sospecha que no es culpa nuestra, sino un evento de AWS en la Región que afecta a nuestros recursos, ¿dónde lo confirmamos?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-quotas-event',
          label: 'Service Quotas',
          definition:
            'Servicio para ver y administrar desde un solo lugar las cuotas de los servicios de AWS y solicitar aumentos.',
          explanation:
            'Service Quotas muestra los límites de la cuenta y permite pedir aumentos. No informa sobre eventos de AWS que afectan a los recursos.',
          correct: false,
        },
        {
          id: 'health-dashboard',
          label: 'AWS Health Dashboard, en la vista Your account health',
          definition:
            'Panel con la salud de los servicios de AWS: eventos públicos de todas las Regiones y eventos que afectan a una cuenta y a sus recursos.',
          explanation:
            'La vista Your account health muestra los eventos de AWS que afectan a la cuenta de la universidad y a sus recursos, incluidas actividades planificadas.',
          correct: true,
        },
        {
          id: 'cloudtrail-event',
          label: 'AWS CloudTrail',
          definition:
            'Servicio de auditoría que registra las acciones hechas en la cuenta por usuarios, roles y servicios.',
          explanation:
            'CloudTrail registra las acciones dentro de la cuenta, pero no informa sobre el estado de los servicios de AWS en la Región.',
          correct: false,
        },
        {
          id: 'config-event',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene el historial de configuración de los recursos y evalúa su cumplimiento de reglas.',
          explanation:
            'Config muestra cómo cambió la configuración de los recursos, no si un evento de AWS los está afectando.',
          correct: false,
        },
      ],
    },
  ],
};
