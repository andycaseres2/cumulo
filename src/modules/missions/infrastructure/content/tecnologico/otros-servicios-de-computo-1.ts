import type { Mission } from '../../../domain/Mission';

/**
 * Universidad Tecnológica: a university in Córdoba (Argentina) with an enrollment app that collapses every term
 * and a research lab that must process data on campus.
 * Practices AWS Elastic Beanstalk (PaaS, no additional charge), AWS Outposts vs Local Zones, and who operates an Outpost.
 */
export const otrosServiciosDeComputo1: Mission = {
  id: 'otros-servicios-de-computo-1',
  track: 'tecnologico',
  topicSlug: 'otros-servicios-de-computo',
  buildingId: 'universidad',
  title: 'Del código al campus',
  client: { name: 'Dra. Camila Rojas', role: 'Directora de tecnología de la Universidad Tecnológica' },
  intro: [
    'Te damos la bienvenida a la Universidad Tecnológica. Soy la doctora Camila Rojas, directora de tecnología. Desde Córdoba atendemos a veinte mil estudiantes de ingeniería.',
    'Cada inicio de cuatrimestre, el sistema de inscripciones a materias, una aplicación web en Java, colapsa. Mi equipo es de desarrolladores, no de infraestructura, y pierde días configurando servidores, balanceadores y escalado.',
    'Además, el laboratorio de robótica industrial procesa datos de sus brazos robóticos y necesita respuestas casi instantáneas dentro del campus, pero quiere usar las mismas APIs de AWS que el resto de la universidad.',
    'El rector me pidió una propuesta para el próximo cuatrimestre. ¿Me ayudas a armarla?',
  ],
  outro: {
    passed: [
      '¡Propuesta aprobada! Los desarrolladores suben el código de inscripciones y Elastic Beanstalk se encarga de la capacidad, el balanceo y el escalado, sin un cargo extra por el servicio.',
      'Y el laboratorio tendrá un Outpost en el campus, operado por AWS. Gracias: considérate parte del claustro.',
    ],
    failed: [
      'Mmm... con esta propuesta el rector me va a mandar a rendir de nuevo.',
      'Repasa la teoría de otros servicios de cómputo y vuelve cuando quieras. La universidad sigue abierta para ti.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'uni-enrollment-deploy',
      prompt:
        'Lo urgente: queremos subir el código Java de inscripciones y que AWS aprovisione los servidores, configure el balanceo de carga, monitoree la salud y escale solo. Mis desarrolladores quieren concentrarse en el código. ¿Qué servicio usamos?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-batch',
          label: 'AWS Batch',
          definition:
            'Servicio administrado que ejecuta trabajos de cómputo por lotes que esperan en una cola, sin interacción del usuario.',
          explanation:
            'Batch procesa trabajos en cola, como simulaciones; no despliega ni escala una aplicación web que los estudiantes usan en vivo.',
          correct: false,
        },
        {
          id: 'uni-beanstalk',
          label: 'AWS Elastic Beanstalk',
          definition:
            'Servicio para desplegar aplicaciones web que aprovisiona la capacidad, configura el balanceo de carga, monitorea la salud y escala el entorno.',
          explanation:
            'Elastic Beanstalk admite Java: el equipo sube la aplicación y el servicio se encarga del entorno, como una PaaS. Justo lo que necesitan unos desarrolladores que quieren enfocarse en el código.',
          correct: true,
        },
        {
          id: 'uni-outposts-web',
          label: 'AWS Outposts',
          definition:
            'Servicio que extiende la infraestructura y las APIs de AWS a las instalaciones del cliente, operado por AWS.',
          explanation:
            'Outposts lleva capacidad de AWS a un sitio propio; no automatiza el despliegue ni el escalado de la aplicación de inscripciones.',
          correct: false,
        },
        {
          id: 'uni-local-zones-web',
          label: 'AWS Local Zones',
          definition: 'Ubicaciones de infraestructura de AWS cerca de grandes ciudades, para menor latencia hacia esos usuarios.',
          explanation:
            'Una Local Zone es un lugar donde ejecutar recursos; no despliega ni escala una aplicación a partir de su código.',
          correct: false,
        },
      ],
    },
    {
      id: 'uni-beanstalk-cost',
      prompt:
        'El área de finanzas pregunta cuánto cuesta Elastic Beanstalk en sí. No quieren sorpresas en la factura. ¿Qué les respondo?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-fee-per-env',
          label: 'Una tarifa mensual fija por cada entorno de Elastic Beanstalk',
          definition: 'Modelo de cobro con un cargo recurrente por cada entorno creado en el servicio.',
          explanation:
            'Elastic Beanstalk no cobra por entorno. Creer que tiene costo propio es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'uni-fee-per-deploy',
          label: 'Un cargo por cada despliegue de una versión nueva del código',
          definition: 'Modelo de cobro en el que cada publicación de una versión de la aplicación tiene un precio.',
          explanation:
            'Desplegar versiones nuevas no tiene un cobro aparte; la universidad paga lo que consumen los recursos de su aplicación.',
          correct: false,
        },
        {
          id: 'uni-license-per-student',
          label: 'Una licencia anual según la cantidad de estudiantes',
          definition: 'Modelo de licenciamiento por usuario final, frecuente en software académico tradicional.',
          explanation:
            'Elastic Beanstalk no se licencia por usuarios; se pagan los recursos de AWS que usa la aplicación.',
          correct: false,
        },
        {
          id: 'uni-no-extra-charge',
          label: 'No tiene cargo adicional: pagan solo los recursos de AWS que consume la aplicación',
          definition:
            'Modelo de precios de AWS Elastic Beanstalk, en el que el servicio no se cobra aparte de los recursos subyacentes.',
          explanation:
            'Elastic Beanstalk no tiene cargo adicional; la universidad paga las instancias, balanceadores y demás recursos que crea para la aplicación.',
          correct: true,
        },
      ],
    },
    {
      id: 'uni-robotics-lab',
      prompt:
        'Ahora el laboratorio de robótica: sus brazos robóticos generan datos que hay que procesar dentro del campus, con latencia muy baja, usando las mismas APIs y herramientas de AWS. ¿Qué servicio encaja?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-outposts',
          label: 'AWS Outposts',
          definition:
            'Servicio totalmente administrado que extiende la infraestructura, los servicios, las APIs y las herramientas de AWS a las instalaciones del cliente.',
          explanation:
            'Un Outpost instalado en el campus permite procesar los datos localmente con baja latencia y con las mismas APIs que en una Región: un despliegue híbrido.',
          correct: true,
        },
        {
          id: 'uni-local-zones',
          label: 'AWS Local Zones',
          definition: 'Ubicaciones de infraestructura de AWS cerca de grandes ciudades, para menor latencia hacia esos usuarios.',
          explanation:
            'Confundir Outposts con Local Zones es una trampa típica: las Local Zones están en ubicaciones de AWS, no dentro del campus.',
          correct: false,
        },
        {
          id: 'uni-lightsail-lab',
          label: 'Amazon Lightsail',
          definition:
            'Servicio para lanzar servidores virtuales, sitios y aplicaciones sencillos con un precio mensual bajo y predecible.',
          explanation:
            'Lightsail se ejecuta en la nube de AWS para proyectos sencillos; no instala capacidad dentro del laboratorio.',
          correct: false,
        },
        {
          id: 'uni-batch-lab',
          label: 'AWS Batch',
          definition: 'Servicio administrado para ejecutar cargas de cómputo por lotes de cualquier escala.',
          explanation:
            'Batch gestiona trabajos en cola en la nube; no lleva infraestructura de AWS al campus ni da respuestas casi instantáneas a los robots.',
          correct: false,
        },
      ],
    },
    {
      id: 'uni-outpost-operator',
      prompt:
        'El jefe de soporte está nervioso: cree que su equipo tendrá que operar y reparar ese equipo como si fuera nuestro propio centro de datos. ¿Quién lo opera y administra?',
      topicSlug: 'otros-servicios-de-computo',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-own-it-team',
          label: 'El equipo de soporte de la universidad, como en un centro de datos propio',
          definition: 'Modelo on-premises tradicional, en el que la organización opera y mantiene su propio hardware.',
          explanation:
            'Creer que Outposts es un centro de datos que administras tú es una trampa típica; el equipo de soporte no tiene que operarlo.',
          correct: false,
        },
        {
          id: 'uni-marketplace-vendor',
          label: 'Un proveedor de AWS Marketplace contratado por separado',
          definition: 'AWS Marketplace es un catálogo digital para encontrar, comprar y desplegar software de terceros.',
          explanation:
            'La operación de un Outpost no se contrata en AWS Marketplace; es parte del servicio de AWS.',
          correct: false,
        },
        {
          id: 'uni-aws-operates',
          label: 'AWS, como parte de una Región: lo opera, monitorea y administra',
          definition:
            'Modelo de operación de AWS Outposts: la capacidad está en el sitio del cliente, pero la gestiona AWS.',
          explanation:
            'AWS opera, monitorea y administra el Outpost instalado en el campus como parte de una Región; el equipo de soporte puede quedarse tranquilo.',
          correct: true,
        },
        {
          id: 'uni-storage-only',
          label: 'Nadie, porque un Outpost solo almacena datos y no ejecuta recursos',
          definition: 'Afirmación sobre la capacidad de cómputo y almacenamiento que incluye un Outpost.',
          explanation:
            'Un Outpost tiene capacidad de cómputo y almacenamiento y puede ejecutar recursos como instancias EC2, volúmenes EBS, clústeres de ECS e instancias de RDS.',
          correct: false,
        },
      ],
    },
  ],
};
