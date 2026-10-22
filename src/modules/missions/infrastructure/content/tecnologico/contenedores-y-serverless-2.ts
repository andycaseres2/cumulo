import type { Mission } from '../../../domain/Mission';

/**
 * Telecom Andina: a mobile operator in La Paz activating SIM cards online and moving its Kubernetes workloads to AWS.
 * Practices event-driven AWS Lambda, Amazon EKS for existing Kubernetes, the 15-minute Lambda invocation limit
 * and what serverless really means.
 */
export const contenedoresYServerless2: Mission = {
  id: 'contenedores-y-serverless-2',
  track: 'tecnologico',
  topicSlug: 'contenedores-y-serverless',
  buildingId: 'telecom-andina',
  title: 'Señal sin servidores',
  client: { name: 'Ernesto Mamani', role: 'Jefe de sistemas de Telecom Andina' },
  intro: [
    'Buenas, adelante. Soy Ernesto Mamani, jefe de sistemas de Telecom Andina. Desde La Paz damos telefonía móvil e internet a medio millón de clientes en Bolivia.',
    'Lanzamos la activación de chips por internet: el cliente sube la foto de su carnet y en minutos tiene línea. Pero esas fotos llegan a ratos, a veces diez por hora y a veces cientos, y hoy tenemos un servidor encendido todo el día esperándolas.',
    'Además, el área de red tiene sus aplicaciones en Kubernetes en nuestro propio centro de datos y quiere llevarlas a AWS. Y cada mes corremos un proceso de facturación enorme que alguien quiere pasar a serverless.',
    'El directorio quiere bajar costos sin perder clientes. ¿Me ayudas a decidir qué va en contenedores y qué va en serverless?',
  ],
  outro: {
    passed: [
      '¡Excelente! Las activaciones corren en Lambda solo cuando llega una foto, las aplicaciones de red se mudan a EKS sin reescribirse y la facturación larga queda donde corresponde.',
      'Y ahora el directorio entiende qué significa de verdad serverless. Gracias: en Telecom Andina siempre tendrás señal.',
    ],
    failed: [
      'Mmm... con estas decisiones nos va a fallar la señal en más de un proceso.',
      'Repasa la teoría de contenedores y serverless y vuelve cuando quieras. Te dejo la línea abierta.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'telecom-sim-activation',
      prompt:
        'Primero, las activaciones: cada vez que un cliente sube la foto de su carnet a Amazon S3, hay que validarla y achicarla. Quiero pagar solo cuando llegan fotos y no administrar ningún servidor. ¿Qué usamos?',
      topicSlug: 'contenedores-y-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-ec2-waiting',
          label: 'Una instancia Amazon EC2 encendida todo el día esperando las fotos',
          definition:
            'Servidor virtual con control total del sistema operativo, que el cliente administra y paga mientras está encendido.',
          explanation:
            'Es lo que tienen hoy: Telecom Andina administra el servidor y lo paga aunque pasen horas sin fotos.',
          correct: false,
        },
        {
          id: 'telecom-lambda',
          label: 'AWS Lambda, con la subida a Amazon S3 como disparador',
          definition:
            'Servicio de cómputo serverless que ejecuta funciones cuando ocurre un evento, con pago por solicitud y tiempo de ejecución.',
          explanation:
            'Cada subida a S3 dispara la función, Lambda escala solo según la cantidad de fotos y Telecom Andina paga por solicitud y tiempo de ejecución, sin administrar servidores.',
          correct: true,
        },
        {
          id: 'telecom-ecr',
          label: 'Amazon ECR',
          definition: 'Registro administrado para guardar, gestionar y compartir imágenes de contenedor.',
          explanation:
            'ECR guarda imágenes de contenedor; no ejecuta código cuando un cliente sube una foto.',
          correct: false,
        },
        {
          id: 'telecom-ecs-ec2',
          label: 'Un clúster de Amazon ECS sobre instancias EC2 propias',
          definition:
            'Orquestación de contenedores con el servicio propio de AWS, usando servidores que el cliente elige y administra.',
          explanation:
            'ECS orquesta contenedores, y sobre instancias EC2 el equipo seguiría administrando servidores. Para código corto disparado por eventos, la opción es Lambda.',
          correct: false,
        },
      ],
    },
    {
      id: 'telecom-kubernetes',
      prompt:
        'Ahora el área de red. Sus aplicaciones ya corren en Kubernetes en nuestro centro de datos, usan herramientas de la comunidad y no quieren reescribir nada. Quieren que AWS administre el plano de control. ¿Qué servicio eligen?',
      topicSlug: 'contenedores-y-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-ecs',
          label: 'Amazon ECS',
          definition: 'Servicio de orquestación de contenedores totalmente administrado, con el orquestador propio de AWS.',
          explanation:
            'ECS usa el orquestador de AWS, no Kubernetes. Cuando el escenario menciona Kubernetes, la respuesta apunta a EKS.',
          correct: false,
        },
        {
          id: 'telecom-fargate-k8s',
          label: 'AWS Fargate como reemplazo de Kubernetes',
          definition: 'Motor de cómputo serverless donde corren contenedores de Amazon ECS y Amazon EKS.',
          explanation:
            'Fargate no es un orquestador: puede aportar el cómputo para los Pods, pero el orquestador de Kubernetes sigue siendo EKS.',
          correct: false,
        },
        {
          id: 'telecom-eks',
          label: 'Amazon EKS',
          definition:
            'Servicio de Kubernetes administrado, certificado como compatible con Kubernetes, en el que AWS gestiona el plano de control.',
          explanation:
            'Al ser compatible con Kubernetes, el área de red lleva sus aplicaciones y herramientas de la comunidad sin reescribirlas, y AWS administra el plano de control.',
          correct: true,
        },
        {
          id: 'telecom-ecr-k8s',
          label: 'Amazon ECR',
          definition: 'Registro administrado de imágenes de contenedor, con repositorios privados o públicos.',
          explanation:
            'ECR puede guardar sus imágenes, pero no orquesta ni ejecuta las aplicaciones de Kubernetes.',
          correct: false,
        },
      ],
    },
    {
      id: 'telecom-billing-run',
      prompt:
        'Un analista quiere pasar a Lambda el proceso de facturación mensual, que tarda unas cuatro horas en cada corrida. Algo me dice que no encaja. ¿Por qué?',
      topicSlug: 'contenedores-y-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-no-scaling',
          label: 'Porque Lambda no escala automáticamente según la carga',
          definition:
            'Afirmación sobre la capacidad de AWS Lambda para crear y destruir entornos de ejecución según el tráfico.',
          explanation:
            'Lambda sí escala automáticamente, creando y destruyendo entornos de ejecución según el tráfico; ese no es el problema de la facturación.',
          correct: false,
        },
        {
          id: 'telecom-patch-servers',
          label: 'Porque con Lambda hay que aprovisionar y aplicar parches a los servidores',
          definition: 'Afirmación sobre quién administra los servidores donde se ejecutan las funciones de AWS Lambda.',
          explanation:
            'Lambda ejecuta código sin aprovisionar ni administrar servidores; AWS se encarga del aprovisionamiento y los parches.',
          correct: false,
        },
        {
          id: 'telecom-s3-only',
          label: 'Porque Lambda solo se puede disparar con subidas a Amazon S3',
          definition: 'Afirmación sobre los disparadores (triggers) que pueden invocar una función de AWS Lambda.',
          explanation:
            'Lambda acepta varios disparadores, como Amazon SQS, Amazon EventBridge o Amazon API Gateway, además de Amazon S3.',
          correct: false,
        },
        {
          id: 'telecom-15-minutes',
          label: 'Porque una invocación de una función de eventos de Lambda dura como máximo 15 minutos',
          definition:
            'Límite de duración de una invocación de una función de eventos de AWS Lambda, de 900 segundos.',
          explanation:
            'Cuatro horas superan con creces el máximo de 15 minutos por invocación. Para procesos tan largos conviene usar contenedores o AWS Batch.',
          correct: true,
        },
      ],
    },
    {
      id: 'telecom-serverless-meaning',
      prompt:
        'Para cerrar: en el directorio alguien dijo que con serverless "ya no hay servidores en ningún lado" y otro que "AWS nos cobra una tarifa fija". Necesito explicarles qué significa de verdad. ¿Qué les digo?',
      topicSlug: 'contenedores-y-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-servers-managed',
          label: 'Los servidores existen, pero AWS los aprovisiona, escala, parcha y mantiene, y pagamos por lo que usamos',
          definition:
            'Modelo serverless: el proveedor administra los servidores y el cliente se enfoca en el código y paga según el uso.',
          explanation:
            'Serverless no elimina los servidores: AWS se encarga de administrarlos y Telecom Andina paga por uso, por ejemplo por solicitud y tiempo de ejecución en Lambda.',
          correct: true,
        },
        {
          id: 'telecom-no-physical',
          label: 'La aplicación corre sin servidores físicos en ninguna parte',
          definition: 'Interpretación literal de la palabra "serverless" como ausencia total de hardware.',
          explanation:
            'Creer que serverless significa "sin servidores físicos" es una trampa típica: los servidores existen, pero Telecom Andina no los administra.',
          correct: false,
        },
        {
          id: 'telecom-we-manage-os',
          label: 'Nosotros administramos el sistema operativo y AWS solo pone el hardware',
          definition: 'Modelo de cómputo en el que el cliente instala y parcha el sistema operativo del servidor.',
          explanation:
            'Administrar el sistema operativo corresponde a un modelo como Amazon EC2; en serverless el equipo no gestiona los servidores.',
          correct: false,
        },
        {
          id: 'telecom-flat-fee',
          label: 'Pagamos una tarifa fija mensual, sin importar cuánto se use',
          definition: 'Modelo de cobro con un monto mensual constante, independiente del consumo.',
          explanation:
            'En serverless se paga por uso, sin compromisos por adelantado; en Lambda, por solicitud y tiempo de ejecución.',
          correct: false,
        },
      ],
    },
  ],
};
