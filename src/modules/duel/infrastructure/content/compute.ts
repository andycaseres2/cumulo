import type { ServiceFamily } from '../../domain/ServiceFamily';

export const computeFamily: ServiceFamily = {
  id: 'compute',
  title: 'Cómputo: servidores, contenedores o funciones',
  summary:
    'Pregúntate cuánto quieres administrar: servidores virtuales con control total, contenedores orquestados, funciones por eventos, una plataforma que despliega tu código o un paquete simple de precio fijo.',
  services: [
    { name: 'Amazon EC2', summary: 'Servidores virtuales: eliges tipo de instancia, sistema operativo y modelo de compra; tú los administras.' },
    { name: 'AWS Lambda', summary: 'Funciones sin servidores que se ejecutan por eventos; pagas por solicitud y tiempo; hasta 15 minutos por invocación.' },
    { name: 'Amazon ECS', summary: 'Orquestador de contenedores propio de AWS, administrado y sin Kubernetes; corre en EC2 o Fargate.' },
    { name: 'Amazon EKS', summary: 'Kubernetes administrado: AWS opera el plano de control y usas las herramientas de la comunidad.' },
    { name: 'AWS Fargate', summary: 'Motor serverless para contenedores de ECS y EKS: sin instancias que aprovisionar ni escalar.' },
    { name: 'AWS Elastic Beanstalk', summary: 'Subes el código y AWS crea instancias, balanceo, escalado y monitoreo; sin costo extra por el servicio.' },
    { name: 'Amazon Lightsail', summary: 'Servidores virtuales y recursos en paquete con precio mensual bajo y predecible, para proyectos simples.' },
    { name: 'AWS Batch', summary: 'Ejecuta trabajos por lotes a cualquier escala: colas de trabajos y capacidad aprovisionada según la demanda.' },
    { name: 'AWS Outposts', summary: 'Infraestructura de AWS instalada en tu propio centro de datos, con las mismas APIs, administrada por AWS.' },
  ],
  cards: [
    {
      id: 'compute-1',
      prompt:
        'Un estudio de arquitectura en Santiago necesita servidores virtuales con GPU para renderizar. Quiere elegir el tipo exacto de instancia e instalar sus propios drivers en el sistema operativo. ¿Qué usa?',
      options: [
        { service: 'AWS Lambda', why: 'Lambda ejecuta funciones sin que administres servidores; no te deja elegir instancias con GPU ni instalar drivers.' },
        { service: 'Amazon EC2', why: 'EC2 da servidores virtuales en los que eliges el tipo de instancia, incluso con GPU, y controlas el sistema operativo.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk despliega aplicaciones web por ti; no está pensada para elegir hardware de render y administrar el servidor.' },
        { service: 'Amazon Lightsail', why: 'Lightsail ofrece planes de servidor simples a precio fijo; la amplia gama de tipos de instancia está en EC2.' },
      ],
      answer: 'Amazon EC2',
      topicSlug: 'ec2-compute',
    },
    {
      id: 'compute-2',
      prompt:
        'Una empresa de logística en Lima quiere servidores virtuales donde controla el sistema operativo, ajusta CPU y memoria a su carga y puede comprar capacidad Spot o con Savings Plans. ¿Qué servicio usa?',
      options: [
        { service: 'Amazon EC2', why: 'EC2 da instancias con control del sistema operativo y modelos de compra On-Demand, Spot, Savings Plans e instancias reservadas.' },
        { service: 'AWS Fargate', why: 'Fargate corre contenedores sin que veas ni administres los servidores; no te da acceso al sistema operativo.' },
        { service: 'AWS Lambda', why: 'Lambda ejecuta funciones sin servidores; no administras sistema operativo ni eliges instancias.' },
      ],
      answer: 'Amazon EC2',
      topicSlug: 'ec2-compute',
    },
    {
      id: 'compute-3',
      prompt:
        'Una inmobiliaria en Quito quiere crear una miniatura cada vez que sube una foto a su bucket. Cada proceso tarda unos segundos y no quieren administrar servidores ni pagar cuando no hay fotos. ¿Qué usa?',
      options: [
        { service: 'Amazon EC2', why: 'Con EC2 pagas la instancia encendida aunque no lleguen fotos, y tú la administras.' },
        { service: 'AWS Batch', why: 'AWS Batch encola trabajos por lotes grandes; para reaccionar a cada subida en segundos, una función por evento es más simple.' },
        { service: 'AWS Lambda', why: 'Lambda ejecuta código en respuesta a eventos, como una subida al bucket, sin servidores y cobrando por solicitud y tiempo de ejecución.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk mantiene instancias corriendo para una aplicación web; no es un disparador por evento que cobra por uso.' },
      ],
      answer: 'AWS Lambda',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-4',
      prompt:
        'Un hotel en Cartagena debe enviar un correo cada vez que llega un mensaje a su cola de reservas. Cada envío dura dos segundos y el equipo solo quiere escribir el código de la función. ¿Qué usa?',
      options: [
        { service: 'Amazon ECS', why: 'ECS orquesta contenedores; tendrías que empaquetar y operar un servicio, cuando aquí basta una función.' },
        { service: 'AWS Lambda', why: 'Lambda ejecuta una función por cada mensaje de la cola, sin servidores; un trabajo de dos segundos está muy por debajo de los 15 minutos por invocación.' },
        { service: 'Amazon Lightsail', why: 'Lightsail da un servidor a precio fijo que pagas aunque no lleguen mensajes, y tú lo administras.' },
        { service: 'Amazon EC2', why: 'EC2 exige mantener y pagar una instancia esperando mensajes; el equipo quiere solo escribir código.' },
      ],
      answer: 'AWS Lambda',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-5',
      prompt:
        'Un equipo pequeño en Guadalajara empaqueta sus microservicios en contenedores Docker. Busca el orquestador propio de AWS, más simple, sin tener que aprender Kubernetes. ¿Qué elige?',
      options: [
        { service: 'Amazon EKS', why: 'EKS es Kubernetes administrado; justo lo que el equipo no quiere aprender.' },
        { service: 'Amazon ECS', why: 'ECS es el orquestador de contenedores administrado y propio de AWS, con buenas prácticas incluidas y sin Kubernetes.' },
        { service: 'Amazon Lightsail', why: 'Lightsail tiene servicios de contenedores sencillos, pero el orquestador de AWS para microservicios es ECS.' },
        { service: 'AWS Batch', why: 'AWS Batch planifica trabajos por lotes; no es el orquestador para servicios que corren continuamente.' },
      ],
      answer: 'Amazon ECS',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-6',
      prompt:
        'Una fintech en Bogotá ya opera Kubernetes en su centro de datos, con manifiestos y Helm. Quiere llevarlo a AWS sin reescribir nada y que AWS opere el plano de control. ¿Qué servicio usa?',
      options: [
        { service: 'Amazon ECS', why: 'ECS es el orquestador propio de AWS y no usa manifiestos de Kubernetes; habría que rehacer los despliegues.' },
        { service: 'Amazon EKS', why: 'EKS es Kubernetes administrado y certificado como conforme: AWS opera el plano de control y tus manifiestos funcionan sin cambios.' },
        { service: 'AWS Fargate', why: 'Fargate es un motor de cómputo para contenedores, no un orquestador; con Kubernetes se usa junto a EKS.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk despliega aplicaciones web desde código; no reemplaza un clúster de Kubernetes con sus herramientas.' },
      ],
      answer: 'Amazon EKS',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-7',
      prompt:
        'Una aseguradora en Ciudad de Panamá quiere estandarizar sus contenedores en un orquestador de código abierto, usar las herramientas y plugins de su comunidad y que la nube opere el plano de control. ¿Qué usa?',
      options: [
        { service: 'Amazon EKS', why: 'EKS ejecuta Kubernetes, el orquestador de código abierto, con el plano de control administrado y compatible con sus herramientas.' },
        { service: 'Amazon ECS', why: 'ECS es un orquestador propio de AWS, no de código abierto; no usa el ecosistema de plugins de Kubernetes.' },
        { service: 'Amazon EC2', why: 'Con EC2 tendrías que instalar y operar el plano de control tú; la aseguradora quiere que lo opere AWS.' },
      ],
      answer: 'Amazon EKS',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-8',
      prompt:
        'Una tienda online en Montevideo ya usa el orquestador de contenedores propio de AWS, pero no quiere seguir parchando ni escalando las instancias del clúster. Quiere pagar por CPU y memoria de cada tarea. ¿Qué usa?',
      options: [
        { service: 'Amazon EC2', why: 'Correr las tareas en instancias EC2 es justo lo que hacen hoy: eligen, parchan y escalan esos servidores.' },
        { service: 'AWS Fargate', why: 'Fargate corre las tareas de ECS sin servidores ni clústeres de EC2 que administrar; defines CPU y memoria por tarea.' },
        { service: 'Amazon EKS', why: 'EKS es Kubernetes; cambiar de orquestador no resuelve el problema, que es dejar de administrar las instancias.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk crea y gestiona su propio entorno de aplicación; no es la capacidad sin servidores para sus tareas actuales.' },
      ],
      answer: 'AWS Fargate',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-9',
      prompt:
        'Un equipo en Santiago usa Kubernetes administrado en AWS y quiere que algunos pods corran sin aprovisionar nodos ni elegir tipos de instancia. ¿Qué opción de cómputo usa para esos pods?',
      options: [
        { service: 'AWS Fargate', why: 'Fargate es cómputo serverless para contenedores que funciona con ECS y EKS: los pods corren sin nodos que administrar.' },
        { service: 'Amazon EC2', why: 'Con EC2 los pods corren en nodos que eliges y administras, justo lo que el equipo quiere evitar.' },
        { service: 'AWS Batch', why: 'AWS Batch planifica trabajos por lotes; no es la capacidad donde corren los pods de un servicio en Kubernetes.' },
        { service: 'Amazon ECS', why: 'ECS es otro orquestador; el equipo ya usa Kubernetes y solo busca dónde correr pods sin servidores.' },
      ],
      answer: 'AWS Fargate',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-10',
      prompt:
        'Un equipo en Asunción tiene una app web en Java. Quiere subir el código y que AWS cree las instancias, el balanceador, el escalado y el monitoreo de salud, sin pagar extra por la herramienta. ¿Qué usa?',
      options: [
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk despliega tu código y configura instancias, balanceo, escalado y salud; solo pagas los recursos que crea.' },
        { service: 'Amazon EC2', why: 'Con EC2 tendrían que armar a mano las instancias, el balanceador y el escalado.' },
        { service: 'Amazon Lightsail', why: 'Lightsail da servidores a precio fijo, pero no despliega tu código ni configura el escalado automático por ti.' },
        { service: 'AWS Lambda', why: 'Lambda ejecuta funciones; una app web Java tradicional tendría que rediseñarse para correr como funciones.' },
      ],
      answer: 'AWS Elastic Beanstalk',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-11',
      prompt:
        'Los desarrolladores PHP de una ONG en Tegucigalpa no saben de infraestructura. Quieren desplegar subiendo un paquete de código y aun así poder ver los recursos de AWS que se crean. ¿Qué usan?',
      options: [
        { service: 'Amazon EC2', why: 'EC2 obliga a configurar servidores, red y escalado, justo lo que el equipo no sabe hacer.' },
        { service: 'Amazon ECS', why: 'ECS exige empaquetar contenedores y definir tareas y servicios; es más de lo que el equipo quiere gestionar.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk crea el entorno a partir del código subido, y los recursos quedan en tu cuenta donde puedes verlos.' },
      ],
      answer: 'AWS Elastic Beanstalk',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-12',
      prompt:
        'Una floristería en Cuenca quiere su blog en WordPress con un servidor virtual, IP estática y DNS, todo en un plan mensual bajo y predecible que pueda lanzar en minutos. ¿Qué servicio usa?',
      options: [
        { service: 'Amazon EC2', why: 'EC2 funciona, pero cobra por separado instancia, almacenamiento y transferencia; no es un plan mensual fijo.' },
        { service: 'Amazon Lightsail', why: 'Lightsail incluye servidor, imagen de WordPress, IP estática y DNS por un precio mensual bajo y predecible.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk despliega código propio con escalado; para un blog con precio fijo es más de lo necesario.' },
        { service: 'AWS Lambda', why: 'Lambda ejecuta funciones por evento; WordPress necesita un servidor web con PHP y base de datos.' },
      ],
      answer: 'Amazon Lightsail',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-13',
      prompt:
        'Un centro de investigación en Bogotá lanza cada noche miles de simulaciones; cada una dura de 2 a 6 horas. Quiere encolarlas y que AWS aprovisione la capacidad según cada trabajo. ¿Qué usa?',
      options: [
        { service: 'AWS Lambda', why: 'Una invocación estándar de Lambda dura como máximo 15 minutos; simulaciones de varias horas no caben.' },
        { service: 'AWS Batch', why: 'AWS Batch planifica trabajos por lotes en colas y aprovisiona capacidad según lo que pide cada trabajo, sin software extra.' },
        { service: 'Amazon EC2', why: 'Con EC2 tendrías que construir tus propias colas y escalar las instancias tú.' },
        { service: 'Amazon ECS', why: 'ECS orquesta contenedores, pero la cola de trabajos y su planificación las tendrías que construir tú.' },
      ],
      answer: 'AWS Batch',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-14',
      prompt:
        'Un hospital en Ciudad de México debe procesar datos de sus equipos dentro del edificio, con latencia muy baja, pero quiere las mismas APIs y herramientas de AWS, con hardware que AWS opera. ¿Qué usa?',
      options: [
        { service: 'AWS Outposts', why: 'Outposts instala capacidad de AWS en tu sitio, operada por AWS, con las mismas APIs para baja latencia y procesamiento local.' },
        { service: 'Amazon EC2', why: 'Las instancias EC2 de una Región corren en centros de datos de AWS, no dentro del hospital.' },
        { service: 'Amazon Lightsail', why: 'Lightsail corre en Regiones de AWS; no lleva hardware al edificio del cliente.' },
      ],
      answer: 'AWS Outposts',
      topicSlug: 'other-compute-services',
    },
  ],
};
