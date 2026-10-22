import type { Mission } from '../../../domain/Mission';

/**
 * Rutas del Sur: a logistics company in Santiago de Chile, with offices at Centro de Datos Andino, whose microservices break in production.
 * Practices what a container is, Amazon ECR as the image registry, Amazon ECS as the AWS-native orchestrator
 * and AWS Fargate as serverless compute for containers.
 */
export const containersAndServerless1: Mission = {
  id: 'containers-and-serverless-1',
  track: 'tech',
  topicSlug: 'containers-and-serverless',
  buildingId: 'data-center',
  title: 'En mi máquina sí funciona',
  client: { name: 'Lucía Fernández', role: 'Líder de plataforma de Rutas del Sur' },
  intro: [
    'Hola, pasa. Soy Lucía Fernández, líder de plataforma de Rutas del Sur. Desde estas oficinas del Centro de Datos Andino coordinamos los camiones que reparten encomiendas entre Santiago y el sur de Chile.',
    'Nuestra app está dividida en pequeños servicios: rutas, despachos y seguimiento de camiones. Los desarrolladores juran que en sus laptops todo funciona, pero en producción fallan las versiones de librerías una y otra vez.',
    'Además, para cada servicio tenemos instancias EC2 que alguien debe elegir, actualizar y escalar a mano. Mi equipo es pequeño y pasa más tiempo cuidando servidores que mejorando la app.',
    'Si no ordenamos esto, la temporada de ofertas nos va a encontrar con camiones esperando y clientes molestos. ¿Me ayudas a modernizar la plataforma?',
  ],
  outro: {
    passed: [
      'Perfecto. Cada servicio viaja en su contenedor con sus dependencias, las imágenes están guardadas y escaneadas en ECR, y ECS se encarga de ejecutarlas y reiniciarlas.',
      'Con Fargate mi equipo dejó de cuidar servidores y por fin puede enfocarse en las rutas. Gracias: esta vez sí funciona en todas las máquinas.',
    ],
    failed: [
      'Mmm... con estas decisiones vamos a seguir escuchando "en mi máquina funciona" en cada despliegue.',
      'Repasa la teoría de contenedores y serverless y vuelve cuando quieras. Rutas del Sur te sigue esperando.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'rutas-package',
      prompt:
        'Empecemos por el dolor de cabeza diario: en producción fallan las versiones de librerías que en las laptops funcionan. ¿Qué concepto empaqueta el código con sus dependencias para que corra igual en cualquier entorno?',
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-orchestrator',
          label: 'Un orquestador',
          definition:
            'Servicio que decide dónde se ejecutan los contenedores, los reinicia si fallan y los escala.',
          explanation:
            'El orquestador administra contenedores que ya existen; no empaqueta el código con sus librerías.',
          correct: false,
        },
        {
          id: 'rutas-control-plane',
          label: 'Un plano de control',
          definition:
            'Parte de un orquestador que gestiona el estado del clúster, como el plano de control de Kubernetes que AWS administra en EKS.',
          explanation:
            'El plano de control gestiona el orquestador; no resuelve las diferencias de librerías entre las laptops y producción.',
          correct: false,
        },
        {
          id: 'rutas-container',
          label: 'Un contenedor, creado a partir de una imagen de contenedor',
          definition:
            'Unidad estándar de software que empaqueta el código y sus dependencias para ejecutarse de forma rápida y confiable de un entorno a otro.',
          explanation:
            'La imagen lleva el código y las versiones exactas de sus librerías, así que cada servicio de Rutas del Sur se ejecuta igual en la laptop y en producción.',
          correct: true,
        },
        {
          id: 'rutas-bigger-ec2',
          label: 'Una instancia Amazon EC2 más grande para cada servicio',
          definition: 'Escalado vertical: dar más CPU y memoria a un servidor cambiándolo a un tipo de instancia más grande.',
          explanation:
            'Más CPU y memoria no corrigen versiones de librerías distintas entre entornos; el problema es de empaquetado, no de capacidad.',
          correct: false,
        },
      ],
    },
    {
      id: 'rutas-registry',
      prompt:
        'Bien, ya empaquetamos los servicios. Ahora necesitamos un lugar administrado y privado donde guardar esas imágenes, compartirlas entre equipos y escanearlas en busca de vulnerabilidades. ¿Qué servicio usamos?',
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-ecr',
          label: 'Amazon Elastic Container Registry (Amazon ECR)',
          definition:
            'Registro administrado de imágenes de contenedor con repositorios privados o públicos, que puede escanear imágenes en busca de vulnerabilidades.',
          explanation:
            'ECR guarda, gestiona y comparte las imágenes de Rutas del Sur en repositorios privados, las escanea y se usan directamente desde ECS o EKS.',
          correct: true,
        },
        {
          id: 'rutas-ecs-registry',
          label: 'Amazon Elastic Container Service (Amazon ECS)',
          definition: 'Servicio de orquestación de contenedores totalmente administrado y propio de AWS.',
          explanation:
            'Confundir ECR con ECS es una trampa típica: ECS ejecuta y orquesta contenedores, pero el registro de imágenes es ECR.',
          correct: false,
        },
        {
          id: 'rutas-fargate-registry',
          label: 'AWS Fargate',
          definition: 'Motor de cómputo serverless y de pago por uso donde se ejecutan contenedores de ECS y EKS.',
          explanation:
            'Fargate aporta la capacidad donde corren los contenedores; no guarda ni comparte imágenes.',
          correct: false,
        },
        {
          id: 'rutas-lambda-registry',
          label: 'AWS Lambda',
          definition: 'Servicio de cómputo serverless que ejecuta funciones cuando ocurre un evento.',
          explanation:
            'Lambda ejecuta código en respuesta a eventos; no es un repositorio para guardar y escanear imágenes de contenedor.',
          correct: false,
        },
      ],
    },
    {
      id: 'rutas-orchestration',
      prompt:
        'Tenemos decenas de contenedores y necesitamos algo que decida dónde corren y los reinicie si fallan. Nadie en el equipo usa Kubernetes y quiero lo más simple e integrado con AWS, sin gestionar un plano de control. ¿Qué elegimos?',
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-eks',
          label: 'Amazon Elastic Kubernetes Service (Amazon EKS)',
          definition:
            'Servicio de Kubernetes administrado en el que AWS gestiona el plano de control de Kubernetes.',
          explanation:
            'EKS conviene a quien ya usa Kubernetes o quiere su ecosistema. Rutas del Sur no usa Kubernetes y busca la opción propia de AWS.',
          correct: false,
        },
        {
          id: 'rutas-fargate-orchestrator',
          label: 'AWS Fargate',
          definition: 'Motor de cómputo serverless para contenedores que funciona con Amazon ECS y Amazon EKS.',
          explanation:
            'Pensar que Fargate es un orquestador es una trampa típica: aporta el cómputo, pero necesita a ECS o EKS para orquestar.',
          correct: false,
        },
        {
          id: 'rutas-ecr-orchestrator',
          label: 'Amazon ECR',
          definition: 'Registro administrado de imágenes de contenedor.',
          explanation:
            'ECR solo guarda imágenes; no decide dónde se ejecutan los contenedores ni los reinicia cuando fallan.',
          correct: false,
        },
        {
          id: 'rutas-ecs',
          label: 'Amazon Elastic Container Service (Amazon ECS)',
          definition:
            'Servicio de orquestación de contenedores totalmente administrado y propio de AWS, integrado con Amazon ECR y Docker.',
          explanation:
            'ECS es el orquestador nativo de AWS: la opción más simple e integrada, sin plano de control que gestionar, ideal para un equipo que no usa Kubernetes.',
          correct: true,
        },
      ],
    },
    {
      id: 'rutas-no-servers',
      prompt:
        'Último paso, el que más quiere mi equipo: dejar de elegir, actualizar y escalar las instancias EC2 donde corren las tareas de ECS. Solo queremos indicar CPU y memoria por tarea y lanzarlas. ¿Qué usamos?',
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-bigger-hosts',
          label: 'Instancias EC2 más grandes para el clúster de ECS',
          definition:
            'Capacidad de cómputo basada en servidores virtuales que el cliente elige, configura y administra.',
          explanation:
            'Con instancias más grandes el equipo sigue eligiéndolas, parchándolas y escalándolas, justo la tarea que quiere dejar.',
          correct: false,
        },
        {
          id: 'rutas-fargate',
          label: 'AWS Fargate',
          definition:
            'Motor de cómputo serverless y de pago por uso para contenedores de Amazon ECS y Amazon EKS.',
          explanation:
            'Con Fargate el equipo indica CPU y memoria por tarea y no aprovisiona, configura ni escala máquinas virtuales. Cada tarea tiene su propio límite de aislamiento.',
          correct: true,
        },
        {
          id: 'rutas-lambda',
          label: 'AWS Lambda',
          definition:
            'Servicio que ejecuta funciones basadas en eventos sin aprovisionar servidores, con pago por solicitud y tiempo de ejecución.',
          explanation:
            'Lambda ejecuta funciones conectadas a disparadores; no es la opción de capacidad sobre la que corren las tareas de Amazon ECS.',
          correct: false,
        },
        {
          id: 'rutas-ecr-capacity',
          label: 'Amazon ECR',
          definition: 'Registro administrado para guardar, gestionar y compartir imágenes de contenedor.',
          explanation:
            'ECR guarda las imágenes, pero no aporta la capacidad de cómputo donde se ejecutan las tareas.',
          correct: false,
        },
      ],
    },
  ],
};
