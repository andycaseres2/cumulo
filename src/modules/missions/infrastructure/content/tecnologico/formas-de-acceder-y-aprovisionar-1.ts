import type { Mission } from '../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a gaming shop in Guadalajara whose owner is learning to run its online store on AWS.
 * Practices the ways to access AWS: the Management Console, the AWS CLI, the AWS SDKs and the APIs underneath them.
 */
export const formasDeAccederYAprovisionar1: Mission = {
  id: 'formas-de-acceder-y-aprovisionar-1',
  track: 'tecnologico',
  topicSlug: 'formas-de-acceder-y-aprovisionar',
  buildingId: 'tienda-pixel',
  title: 'Game over a los clics',
  client: { name: 'Mateo Quintero', role: 'Dueño de la Tienda Gamer Pixel' },
  intro: [
    '¡Te damos la bienvenida a Pixel! Soy Mateo Quintero. Empecé vendiendo consolas usadas en un local chiquito de Guadalajara y hoy tengo una tienda en línea que despacha a todo México.',
    'La tienda corre en AWS, pero todo lo hago yo, a mano y a puro clic. Mi sobrino dice que hay otras formas de manejar AWS, pero no sé cuál usar para qué.',
    'El mes pasado olvidé apagar un servidor de pruebas durante tres semanas y la factura me dolió. Y ahora mi programador quiere que la tienda suba sola las fotos de los productos.',
    'Si seguimos así, en el próximo lanzamiento de consolas me va a explotar todo. ¿Me ayudas a escoger la herramienta correcta para cada cosa?',
  ],
  outro: {
    passed: [
      '¡Nivel superado! Ya sé cuándo me basta la consola, cuándo conviene un script y qué usa la tienda desde su propio código.',
      'El servidor de pruebas se apaga solo cada noche y las fotos se suben sin que nadie toque nada. Cuando quieras una partida en el local, la casa invita.',
    ],
    failed: [
      'Uy... creo que con estas respuestas vuelvo a terminar haciendo todo a mano y pagando de más.',
      'Repasa la teoría sobre cómo acceder a AWS y regresa por la revancha. Aquí te guardo el control.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'explore-service',
      prompt:
        'Primero lo fácil: quiero mirar un servicio de AWS que nunca he usado, de forma visual y sin programar, y hacer una sola prueba rápida para entenderlo. ¿Qué uso?',
      topicSlug: 'formas-de-acceder-y-aprovisionar',
      examTasks: ['3.1'],
      options: [
        {
          id: 'explore-cli',
          label: 'AWS CLI',
          definition:
            'Herramienta de código abierto para interactuar con los servicios de AWS mediante comandos escritos en la terminal.',
          explanation:
            'La CLI exige escribir comandos en la terminal. Para explorar algo nuevo de forma visual y sin programar, hay una opción más directa.',
          correct: false,
        },
        {
          id: 'explore-query-api',
          label: 'Llamadas directas a la Query API',
          definition:
            'Acceso de bajo nivel mediante solicitudes HTTPS en el que la aplicación firma las solicitudes y maneja los errores.',
          explanation:
            'La Query API es el acceso más técnico: hay que firmar cada solicitud. No es visual ni sirve para alguien que no quiere programar.',
          correct: false,
        },
        {
          id: 'explore-console',
          label: 'AWS Management Console',
          definition:
            'Interfaz web de AWS que se usa desde el navegador para ver y administrar los servicios de forma visual.',
          explanation:
            'La consola es visual, no requiere programar y es ideal para aprender, explorar servicios y hacer tareas puntuales como esta prueba.',
          correct: true,
        },
        {
          id: 'explore-cloudformation',
          label: 'AWS CloudFormation',
          definition:
            'Servicio de infraestructura como código que crea recursos a partir de plantillas escritas en JSON o YAML.',
          explanation:
            'CloudFormation sirve para procesos repetibles con plantillas. Para una única prueba visual no tiene sentido escribir una plantilla.',
          correct: false,
        },
      ],
    },
    {
      id: 'nightly-stop',
      prompt:
        'Ahora lo que me dolió en la factura: quiero un script de bash que corra cada noche en la computadora de la tienda y, con comandos en la terminal, detenga el servidor de pruebas. ¿Con qué lo escribo?',
      topicSlug: 'formas-de-acceder-y-aprovisionar',
      examTasks: ['3.1'],
      options: [
        {
          id: 'nightly-cli',
          label: 'AWS CLI',
          definition:
            'Herramienta para usar los servicios de AWS con comandos en terminales como bash, zsh o PowerShell, que también se pueden poner en scripts.',
          explanation:
            'La CLI da acceso a las APIs de AWS desde la terminal y permite escribir scripts para automatizar tareas repetitivas, como detener el servidor cada noche.',
          correct: true,
        },
        {
          id: 'nightly-console',
          label: 'AWS Management Console, con una alarma en el celular para acordarse',
          definition:
            'Interfaz web de AWS para administrar recursos a mano desde el navegador.',
          explanation:
            'Seguir haciéndolo a mano en la consola depende de que alguien se acuerde cada noche: fue justo lo que falló. Los clics no se pueden programar como un script.',
          correct: false,
        },
        {
          id: 'nightly-cloudformation',
          label: 'AWS CloudFormation',
          definition:
            'Servicio que aprovisiona un conjunto de recursos descritos en una plantilla y los gestiona como una sola unidad.',
          explanation:
            'CloudFormation aprovisiona infraestructura a partir de plantillas; no es una herramienta de comandos para una tarea administrativa nocturna como detener un servidor.',
          correct: false,
        },
        {
          id: 'nightly-cdk',
          label: 'AWS CDK',
          definition:
            'Kit para definir infraestructura con lenguajes de programación, que luego se aprovisiona a través de AWS CloudFormation.',
          explanation:
            'El CDK sirve para definir infraestructura como código, no para ejecutar comandos administrativos en la terminal cada noche.',
          correct: false,
        },
      ],
    },
    {
      id: 'upload-photos',
      prompt:
        'Mi programador escribió la tienda en JavaScript. Quiere que, desde el código de la propia tienda, las fotos de cada producto nuevo se suban a AWS sin tener que firmar solicitudes ni programar los reintentos a mano. ¿Qué debe usar?',
      topicSlug: 'formas-de-acceder-y-aprovisionar',
      examTasks: ['3.1'],
      options: [
        {
          id: 'photos-cli',
          label: 'AWS CLI',
          definition:
            'Herramienta de línea de comandos para trabajar con los servicios de AWS desde la terminal.',
          explanation:
            'La CLI se usa desde la terminal. Cuando una aplicación debe usar AWS desde su propio código, lo que corresponde es un SDK.',
          correct: false,
        },
        {
          id: 'photos-console',
          label: 'AWS Management Console',
          definition:
            'Interfaz web en el navegador para usar los servicios de AWS a mano.',
          explanation:
            'La consola es para personas que hacen clics; la tienda no puede usarla desde su código para subir fotos de forma automática.',
          correct: false,
        },
        {
          id: 'photos-cloudformation',
          label: 'AWS CloudFormation',
          definition:
            'Servicio que crea y actualiza infraestructura a partir de plantillas JSON o YAML.',
          explanation:
            'CloudFormation aprovisiona infraestructura; no es una librería que una aplicación use para subir archivos cada vez que se crea un producto.',
          correct: false,
        },
        {
          id: 'photos-sdk',
          label: 'El AWS SDK para JavaScript',
          definition:
            'Librería por lenguaje de programación que se usa dentro del código de una aplicación para llamar a los servicios de AWS.',
          explanation:
            'El SDK se usa dentro del código de la tienda y se encarga de firmar las solicitudes, reintentar y manejar errores, justo lo que pide el programador.',
          correct: true,
        },
      ],
    },
    {
      id: 'console-only',
      prompt:
        'Última duda: mi sobrino jura que hay cosas de AWS que solo se pueden hacer desde la consola, y que por eso no vale la pena aprender la CLI. ¿Tiene razón?',
      topicSlug: 'formas-de-acceder-y-aprovisionar',
      examTasks: ['3.1'],
      options: [
        {
          id: 'private-cli-api',
          label: 'Sí: la CLI usa una API privada distinta, con menos funciones que la consola',
          definition:
            'Idea de que cada herramienta de AWS se conecta a una interfaz propia y diferente de la de las demás.',
          explanation:
            'La CLI y los SDK usan las mismas APIs públicas de los servicios; son solo formas distintas de hacer esas mismas llamadas.',
          correct: false,
        },
        {
          id: 'everything-is-api',
          label: 'No: toda acción es una llamada a la API del servicio, que la consola, la CLI y los SDK usan por debajo',
          definition:
            'Idea de que cada acción en AWS se convierte en una llamada HTTPS, firmada con credenciales, a la API pública del servicio.',
          explanation:
            'En AWS todo termina siendo una llamada a la API. AWS indica que las funciones de administración de IaaS de la consola también están disponibles en la API y en la CLI.',
          correct: true,
        },
        {
          id: 'cfn-only-alternative',
          label: 'Casi: fuera de la consola, la única forma de crear recursos es CloudFormation',
          definition:
            'Afirmación de que la infraestructura como código es el único acceso a AWS distinto de la interfaz web.',
          explanation:
            'La CLI, los SDK y la Query API también crean recursos, porque todos usan las APIs de los servicios. CloudFormation es una opción más, no la única.',
          correct: false,
        },
        {
          id: 'console-extra-features',
          label: 'Sí: la consola tiene funciones de administración de IaaS que no existen en la API',
          definition:
            'Idea de que la interfaz web ofrece operaciones de infraestructura que no se pueden invocar de forma programática.',
          explanation:
            'Es una trampa típica: AWS indica que esas funciones de la consola también están en la API y en la CLI, así que la CLI sí vale la pena.',
          correct: false,
        },
      ],
    },
  ],
};
