import type { ServiceFamily } from '../../domain/ServiceFamily';

export const monitoringFamily: ServiceFamily = {
  id: 'monitoring',
  title: 'Monitoreo, auditoría y operación',
  summary:
    'Métricas y alarmas, quién llamó a qué API, cómo estaba configurado un recurso, por dónde pasa una petición, recomendaciones de mejores prácticas, eventos de AWS que te afectan y operación de servidores.',
  services: [
    { name: 'Amazon CloudWatch', summary: 'Métricas, alarmas, registros y dashboards de tus recursos y aplicaciones.' },
    { name: 'AWS CloudTrail', summary: 'Registra las llamadas a la API: quién hizo qué, cuándo y desde dónde.' },
    { name: 'AWS Config', summary: 'Historial de la configuración de cada recurso y reglas que marcan lo que no cumple.' },
    { name: 'AWS X-Ray', summary: 'Traza peticiones entre microservicios y muestra un mapa con latencias y errores.' },
    { name: 'AWS Trusted Advisor', summary: 'Recomendaciones de costo, rendimiento, seguridad, tolerancia a fallos, excelencia operativa y límites de servicio.' },
    { name: 'AWS Health Dashboard', summary: 'Eventos de AWS que afectan a tu cuenta: incidentes, mantenimientos y cambios planificados.' },
    { name: 'AWS Systems Manager', summary: 'Opera servidores a escala: parches, comandos remotos y sesiones sin SSH ni bastión.' },
  ],
  cards: [
    {
      id: 'monitoring-1',
      prompt:
        'Un colegio de Quito quiere recibir un correo cuando el uso de CPU de su servidor de matrículas pase del 80 % durante diez minutos seguidos. ¿Qué servicio configura?',
      options: [
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail registra llamadas a la API; no mide el uso de CPU ni dispara alarmas por umbral.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'Una alarma de CloudWatch vigila la métrica de CPU contra un umbral y avisa, por ejemplo con un tema de SNS.',
        },
        {
          service: 'AWS Config',
          why: 'Config registra cambios de configuración de los recursos; no vigila métricas de rendimiento.',
        },
      ],
      answer: 'Amazon CloudWatch',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-2',
      prompt:
        'Ayer alguien borró un bucket de una agencia de viajes de Cusco. El gerente quiere saber qué usuario fue, a qué hora y desde qué IP. ¿Dónde lo buscas?',
      options: [
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch tiene métricas y registros de aplicaciones; quien registra cada llamada a la API con su autor es otro servicio.',
        },
        {
          service: 'AWS Config',
          why: 'Config muestra cómo cambió la configuración del recurso; para saber quién llamó a la API y desde qué IP se usa otro servicio.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail guarda cada acción de usuarios, roles y servicios con quién, cuándo y desde dónde; el historial cubre 90 días.',
        },
      ],
      answer: 'AWS CloudTrail',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-3',
      prompt:
        'Un banco de Tegucigalpa necesita mostrarle a su regulador qué reglas tenía un grupo de seguridad hace tres meses y cómo fue cambiando desde entonces. ¿Qué servicio guarda ese historial?',
      options: [
        {
          service: 'AWS Config',
          why: 'Config guarda el historial de configuración de cada recurso, así que puedes ver qué puertos abría el grupo en una fecha.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail registra las llamadas que cambiaron el grupo, pero no presenta el estado completo del recurso en cada momento.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor revisa el estado actual contra mejores prácticas; no guarda el historial de configuración.',
        },
      ],
      answer: 'AWS Config',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-4',
      prompt:
        'La app de pedidos de una cadena de restaurantes de Lima tiene ocho microservicios y a veces tarda cinco segundos. Quieres seguir una petición de punta a punta y ver cuál la frena. ¿Qué usas?',
      options: [
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail audita llamadas a la API de AWS; no sigue el recorrido de una petición de tu app entre servicios.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch te muestra métricas de cada servicio, pero el mapa de trazas de una petición es de otro servicio.',
        },
        {
          service: 'AWS X-Ray',
          why: 'X-Ray traza cada petición por los servicios que llama y su mapa muestra cuellos de botella y picos de latencia.',
        },
      ],
      answer: 'AWS X-Ray',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-5',
      prompt:
        'Una empresa de logística de Rosario quiere una revisión automática de su cuenta que le diga dónde ahorrar, qué huecos de seguridad cerrar y si está cerca de los límites de servicio. ¿Qué servicio usa?',
      options: [
        {
          service: 'AWS Config',
          why: 'Config evalúa recursos contra reglas que tú defines; no da recomendaciones de ahorro ni de límites de servicio.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor inspecciona tu entorno y recomienda en costo, rendimiento, seguridad, tolerancia a fallos y límites de servicio.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch mide y alerta sobre métricas, pero no compara tu cuenta con mejores prácticas para sugerir cambios.',
        },
      ],
      answer: 'AWS Trusted Advisor',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-6',
      prompt:
        'Una fintech de Santiago quiere enterarse si AWS tiene un incidente en su región o un mantenimiento programado que afectará a sus instancias, con la lista de sus recursos afectados. ¿Dónde lo ve?',
      options: [
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch mide tus recursos; los incidentes y mantenimientos de AWS que afectan tu cuenta se publican en otro servicio.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor recomienda mejores prácticas; no avisa de incidentes ni mantenimientos de AWS.',
        },
        {
          service: 'AWS Health Dashboard',
          why: 'Health Dashboard muestra los eventos de AWS que afectan a tu cuenta y tus recursos, incluso con el plan gratuito.',
        },
      ],
      answer: 'AWS Health Dashboard',
      topicSlug: 'support-plans',
    },
    {
      id: 'monitoring-7',
      prompt:
        'Una aseguradora de San José tiene 200 servidores, entre EC2 y equipos en su propio centro de datos. Quiere aplicar parches de seguridad a todos y correr comandos sin entrar uno por uno. ¿Qué usa?',
      options: [
        {
          service: 'AWS Config',
          why: 'Config puede decirte qué servidores no cumplen, pero no instala parches ni ejecuta comandos.',
        },
        {
          service: 'AWS Systems Manager',
          why: 'Systems Manager aplica parches y ejecuta comandos remotos en nodos de AWS y locales que tengan el agente SSM.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch recoge métricas y registros de los servidores; no los parcha.',
        },
      ],
      answer: 'AWS Systems Manager',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-8',
      prompt:
        'Una app de reservas de Cartagena escribe sus propios registros de errores. El equipo quiere centralizarlos, consultarlos y generar una alerta cuando aparezcan más de 50 errores por minuto.',
      options: [
        {
          service: 'AWS X-Ray',
          why: 'X-Ray traza peticiones entre servicios; no es donde guardas y consultas los registros de la app.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail guarda llamadas a la API de AWS, no los registros que escribe tu propia aplicación.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch Logs centraliza y consulta registros, y un filtro de métrica con una alarma avisa cuando suben los errores.',
        },
      ],
      answer: 'Amazon CloudWatch',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-9',
      prompt:
        'Una cooperativa de Cochabamba debe guardar más de 90 días el registro de todas las acciones hechas en sus cuentas, en un bucket propio, para revisarlo con Athena. ¿Qué servicio configura?',
      options: [
        {
          service: 'AWS Systems Manager',
          why: 'Systems Manager opera servidores; no registra las acciones hechas en la cuenta.',
        },
        {
          service: 'AWS Config',
          why: 'Config guarda la configuración de los recursos, no el registro de todas las acciones de usuarios y roles.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'Un trail de CloudTrail entrega los eventos de una o varias cuentas a S3, donde los guardas y consultas con Athena.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch puede recibir esos eventos, pero quien los registra y los entrega al bucket es otro servicio.',
        },
      ],
      answer: 'AWS CloudTrail',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-10',
      prompt:
        'Una clínica de Medellín exige que todos sus volúmenes EBS estén cifrados. Quiere que cada volumen nuevo se evalúe solo, se marque si no cumple y se corrija de forma automática. ¿Qué usa?',
      options: [
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor trae chequeos prediseñados; no evalúa reglas propias en cada recurso nuevo ni lo remedia.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail registra la creación del volumen, pero no evalúa si cumple una regla.',
        },
        {
          service: 'AWS Config',
          why: 'Las reglas de Config evalúan cada recurso cuando se crea o cambia, lo marcan como no conforme y permiten remediar.',
        },
      ],
      answer: 'AWS Config',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-11',
      prompt:
        'El área de seguridad de un banco de Asunción prohíbe abrir el puerto 22 y usar servidores bastión. Aun así, el equipo necesita entrar a las instancias para revisar problemas. ¿Qué servicio lo permite?',
      options: [
        {
          service: 'AWS Systems Manager',
          why: 'Session Manager, de Systems Manager, conecta con las instancias sin abrir puertos de entrada, sin bastión y sin SSH.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch muestra métricas y registros, pero no abre una sesión en la instancia.',
        },
        {
          service: 'AWS X-Ray',
          why: 'X-Ray traza peticiones de la app; no da acceso a la consola de la instancia.',
        },
      ],
      answer: 'AWS Systems Manager',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-12',
      prompt:
        'Una app serverless de un hospital de Guayaquil usa API Gateway, Lambda y DynamoDB. Quieres un mapa que muestre cómo fluye cada petición y en qué tramo aparecen los errores. ¿Qué activas?',
      options: [
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail registra quién llamó a qué API de AWS; no dibuja el recorrido de las peticiones de tu app.',
        },
        {
          service: 'AWS X-Ray',
          why: 'X-Ray recibe trazas de Lambda y otros servicios integrados y arma un mapa del cliente, el frontend y los servicios que llama.',
        },
        {
          service: 'AWS Systems Manager',
          why: 'Systems Manager opera nodos y servidores; no traza peticiones de una app serverless.',
        },
      ],
      answer: 'AWS X-Ray',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-13',
      prompt:
        'Una startup de Montevideo con el plan de soporte gratuito ve solo algunos chequeos de seguridad y todos los de límites de servicio. Quiere el conjunto completo de chequeos. ¿Qué servicio es y qué necesita?',
      options: [
        {
          service: 'AWS Health Dashboard',
          why: 'Health Dashboard ya está disponible gratis para todos y muestra eventos de AWS; no tiene chequeos de mejores prácticas.',
        },
        {
          service: 'AWS Config',
          why: 'Config evalúa reglas que tú defines y se cobra por uso; su alcance no depende del plan de soporte.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor da con Basic los chequeos de límites y algunos de seguridad; el conjunto completo pide Business Support+ o superior.',
        },
      ],
      answer: 'AWS Trusted Advisor',
      topicSlug: 'support-plans',
    },
  ],
};
