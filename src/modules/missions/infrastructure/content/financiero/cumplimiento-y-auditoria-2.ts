import type { Mission } from '../../../domain/Mission';

/**
 * Banco Andino: the bank's security operations team in Bogotá organizing the logs of its new card payments platform.
 * Practices Amazon CloudWatch, VPC Flow Logs, organization trails of AWS CloudTrail and IAM last accessed information.
 */
export const cumplimientoYAuditoria2: Mission = {
  id: 'cumplimiento-y-auditoria-2',
  track: 'financiero',
  buildingId: 'bank',
  topicSlug: 'cumplimiento-y-auditoria',
  title: 'Los registros de la bóveda',
  client: { name: 'Valentina Arango', role: 'Líder del Centro de Operaciones de Seguridad del Banco Andino' },
  intro: [
    'Hola, pasa. Soy Valentina Arango y lidero el Centro de Operaciones de Seguridad del Banco Andino, aquí en Bogotá. Mi equipo vigila día y noche todo lo que pasa en nuestros sistemas.',
    'Acabamos de lanzar en AWS la nueva plataforma de pagos con tarjeta, repartida en varias cuentas de la organización. El problema es que cada equipo guarda sus registros como quiere, y algunos no guardan nada.',
    'Necesito saber cuándo algo funciona mal, qué tráfico entra a nuestra red, conservar la evidencia que pide la Superintendencia y recortar permisos que sobran.',
    'Si ocurre un incidente y no tenemos los registros correctos, no podremos explicar qué pasó. ¿Me ayudas a ordenar los registros de la bóveda?',
  ],
  outro: {
    passed: [
      'Perfecto. Ahora tenemos alarmas cuando los pagos fallan, registros del tráfico de la red, evidencia de la API guardada años y permisos recortados a lo que de verdad se usa.',
      'Mi equipo por fin puede dormir un poco mejor. Gracias: el Centro de Operaciones te queda abierto cuando quieras.',
    ],
    failed: [
      'Mmm... con estas decisiones todavía tendríamos puntos ciegos en un incidente.',
      'Repasa la teoría sobre registros y auditoría, y vuelve cuando quieras. Seguiremos vigilando mientras tanto.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'payments-alarm',
      prompt:
        'Anoche el servicio de pagos se puso lento y nadie se dio cuenta hasta que llamaron los clientes. Quiero que nos avise solo cuando la CPU de esos servidores supere un umbral. ¿Qué usamos?',
      topicSlug: 'cumplimiento-y-auditoria',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudtrail-alarm',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas desde la consola, la CLI, los SDK y las API.',
          explanation:
            'CloudTrail responde quién hizo cada llamada a la API. No mide la CPU de los servidores ni avisa cuando cruza un umbral.',
          correct: false,
        },
        {
          id: 'config-alarm',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de los recursos, su historial de configuración y reglas para evaluar si cumplen lo que defines.',
          explanation:
            'Config vigila cómo están configurados los recursos, no su rendimiento en tiempo real.',
          correct: false,
        },
        {
          id: 'cloudwatch-alarm',
          label: 'Amazon CloudWatch, con una alarma sobre la métrica de CPU',
          definition:
            'Servicio que monitorea recursos y aplicaciones en tiempo real con métricas, logs, dashboards y alarmas.',
          explanation:
            'CloudWatch recoge la métrica de CPU de los servidores de pagos y la alarma avisa o ejecuta una acción cuando cruza el umbral. Responde "¿cómo está funcionando?".',
          correct: true,
        },
        {
          id: 'artifact-alarm',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar bajo demanda informes de cumplimiento de AWS, como SOC, PCI e ISO, y gestionar acuerdos.',
          explanation:
            'Artifact entrega documentos de cumplimiento de AWS; no monitorea el rendimiento de los servidores del banco.',
          correct: false,
        },
      ],
    },
    {
      id: 'network-traffic',
      prompt:
        'Mi equipo vio conexiones extrañas hacia la red de la plataforma de pagos. Necesitamos un registro del tráfico IP que entra y sale de las interfaces de red de esa VPC. ¿Qué activamos?',
      topicSlug: 'cumplimiento-y-auditoria',
      examTasks: ['2.2'],
      options: [
        {
          id: 'flow-logs',
          label: 'VPC Flow Logs',
          definition:
            'Registros del tráfico IP que entra y sale de las interfaces de red de una VPC, enviados a CloudWatch Logs, Amazon S3 o Amazon Data Firehose.',
          explanation:
            'Flow Logs capturan justamente el tráfico IP de las interfaces de red de la VPC, para analizar las conexiones sospechosas.',
          correct: true,
        },
        {
          id: 'cloudtrail-traffic',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra las llamadas a la API de la cuenta, con quién las hizo, cuándo y desde dónde.',
          explanation:
            'CloudTrail registra la actividad de la API de AWS, no el tráfico de red que llega a los servidores de la plataforma.',
          correct: false,
        },
        {
          id: 'config-traffic',
          label: 'AWS Config',
          definition:
            'Servicio que guarda el inventario, el historial de configuración y las relaciones de los recursos.',
          explanation:
            'Config dice cómo está configurada la VPC y cómo cambió, pero no registra el tráfico que pasa por ella.',
          correct: false,
        },
        {
          id: 'credential-report-traffic',
          label: 'El informe de credenciales de IAM',
          definition:
            'Archivo CSV con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA.',
          explanation:
            'El informe de credenciales describe a los usuarios y sus credenciales; no contiene nada sobre el tráfico de la red.',
          correct: false,
        },
      ],
    },
    {
      id: 'long-retention',
      prompt:
        'La Superintendencia nos exige conservar por cinco años la evidencia de la actividad de la API de todas las cuentas del banco, y que ninguna cuenta pueda apagar ese registro. ¿Cómo lo armamos?',
      topicSlug: 'cumplimiento-y-auditoria',
      examTasks: ['2.2'],
      options: [
        {
          id: 'event-history-only',
          label: 'Consultar el historial de eventos de CloudTrail en cada cuenta cuando la Superintendencia lo pida',
          definition:
            'Vista en la consola de los eventos de administración recientes de una cuenta, por Región, disponible sin configurar nada.',
          explanation:
            'El historial de eventos solo muestra los últimos 90 días. No alcanza para conservar cinco años de evidencia.',
          correct: false,
        },
        {
          id: 'flow-logs-retention',
          label: 'Activar VPC Flow Logs en todas las cuentas',
          definition:
            'Registros del tráfico IP que entra y sale de las interfaces de red de las VPC.',
          explanation:
            'Flow Logs registran tráfico de red, no quién hizo cada llamada a la API. No cubren la evidencia que pide la Superintendencia.',
          correct: false,
        },
        {
          id: 'yearly-artifact',
          label: 'Descargar cada año los informes SOC de AWS desde AWS Artifact',
          definition:
            'Portal de autoservicio con informes de cumplimiento de AWS, como SOC, PCI e ISO.',
          explanation:
            'Los informes de Artifact son evidencia de la parte de AWS. No registran la actividad de las personas dentro de las cuentas del banco.',
          correct: false,
        },
        {
          id: 'organization-trail',
          label: 'Un trail de CloudTrail para toda la organización que entregue los eventos a un bucket de Amazon S3',
          definition:
            'Trail creado desde AWS Organizations que registra los eventos de todas las cuentas y los entrega a un bucket de Amazon S3.',
          explanation:
            'Un trail hacia S3 permite conservar los eventos más allá de 90 días, y uno de organización cubre todas las cuentas sin que las cuentas miembro puedan desactivarlo ni modificarlo.',
          correct: true,
        },
      ],
    },
    {
      id: 'unused-permissions',
      prompt:
        'Para terminar: el rol de IAM que usa el equipo de analítica tiene permisos sobre decenas de servicios, y sospecho que usa muy pocos. ¿Cómo sabemos cuáles usa de verdad para recortar el resto?',
      topicSlug: 'cumplimiento-y-auditoria',
      examTasks: ['2.2'],
      options: [
        {
          id: 'credential-report-role',
          label: 'El informe de credenciales de IAM',
          definition:
            'Archivo CSV con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA.',
          explanation:
            'El informe de credenciales lista usuarios y el estado de sus credenciales. No muestra qué servicios usó realmente un rol.',
          correct: false,
        },
        {
          id: 'last-accessed-role',
          label: 'La información de último acceso de IAM del rol',
          definition:
            'Vista que muestra qué servicios, y en algunos casos qué acciones, usó realmente cada identidad.',
          explanation:
            'Muestra qué servicios usó el rol de analítica, así el banco retira los permisos sobrantes y aplica el mínimo privilegio.',
          correct: true,
        },
        {
          id: 'cloudwatch-dashboard-role',
          label: 'Un dashboard de Amazon CloudWatch',
          definition:
            'Panel que muestra en un solo lugar métricas y logs de recursos y aplicaciones.',
          explanation:
            'Un dashboard de CloudWatch muestra el rendimiento de los sistemas, no qué permisos de IAM usa cada rol.',
          correct: false,
        },
        {
          id: 'config-role',
          label: 'Una regla de AWS Config',
          definition:
            'Regla que evalúa de forma continua si la configuración de cada recurso cumple lo que defines.',
          explanation:
            'Una regla de Config evalúa cómo está configurado un recurso, pero no dice qué servicios usó realmente el rol de analítica.',
          correct: false,
        },
      ],
    },
  ],
};
