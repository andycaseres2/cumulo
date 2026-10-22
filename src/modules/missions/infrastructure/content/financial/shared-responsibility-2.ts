import type { Mission } from '../../../domain/Mission';

/**
 * Cerrajería Llave Segura: a locksmith in Asunción with a serverless booking app on AWS Lambda, Amazon DynamoDB and Amazon S3.
 * Practices the shared responsibility model on managed and serverless services, data permissions, compliance and customer-specific controls.
 */
export const sharedResponsibility2: Mission = {
  id: 'shared-responsibility-2',
  track: 'financial',
  topicSlug: 'shared-responsibility',
  buildingId: 'locksmith',
  title: 'Llaves en la nube',
  client: { name: 'Diego Benítez', role: 'Dueño de la Cerrajería Llave Segura' },
  intro: [
    'Hola, pasa. Soy Diego Benítez, dueño de la Cerrajería Llave Segura, en Asunción. Hacemos copias de llaves, abrimos puertas trabadas y cambiamos cerraduras a domicilio.',
    'Hace unos meses lanzamos una app para agendar visitas. Corre con funciones de AWS Lambda, guarda las reservas en Amazon DynamoDB y las fotos de las llaves de los clientes en Amazon S3.',
    'Un cliente me escribió furioso: encontró la foto de su llave en internet. Con esa foto, cualquiera podría copiarla. Yo pensaba que, sin servidores que administrar, la seguridad era toda de AWS.',
    'Si esto se repite, pierdo la confianza que mi familia construyó en treinta años. Ayúdame a entender qué me toca a mí y qué le toca a AWS.',
  ],
  outro: {
    passed: [
      'Ahora lo veo claro: sin servidores tengo menos tareas, pero mi código, mis permisos y los datos de mis clientes siguen siendo mi responsabilidad.',
      'Las fotos ya no están a la vista de nadie y sé qué normas debo cumplir. Gracias: si algún día se te traba una puerta, la primera visita va por la casa.',
    ],
    failed: [
      'Uy... con estas respuestas las llaves de mis clientes seguirían en peligro.',
      'Repasa la teoría con calma y vuelve. Aquí sigo, con el candado puesto hasta que lo resolvamos juntos.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'lambda-responsibility',
      prompt:
        'Primero lo primero. Las reservas se procesan con funciones de AWS Lambda que escribió un programador amigo, con varias librerías de terceros. ¿Qué parte de esas funciones es responsabilidad de la cerrajería?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'lambda-os',
          label: 'Parchar el sistema operativo donde corren las funciones',
          definition:
            'Mantener actualizado el sistema operativo de los servidores que ejecutan el código de una aplicación.',
          explanation:
            'En AWS Lambda, AWS administra la infraestructura, el sistema operativo y la plataforma, incluido el parcheo. La cerrajería no ve ni administra esos servidores.',
          correct: false,
        },
        {
          id: 'lambda-code-deps',
          label: 'Su código, las librerías que incluye y los permisos de IAM de cada función',
          definition:
            'En un servicio serverless, lo que el cliente despliega: el código, sus dependencias, los permisos que recibe la función y los datos que procesa.',
          explanation:
            'Con Lambda, la cerrajería responde por su código, por las dependencias de terceros que incluye, por los permisos de IAM de la función y por sus datos.',
          correct: true,
        },
        {
          id: 'lambda-nothing',
          label: 'Nada: con serverless toda la seguridad pasa a AWS',
          definition:
            'Idea de que un servicio sin servidores que administrar traslada al proveedor todas las tareas de seguridad.',
          explanation:
            'Es una trampa típica. Serverless reduce tareas operativas, pero el código, las dependencias y los permisos de la función siguen siendo del cliente.',
          correct: false,
        },
        {
          id: 'lambda-runtime',
          label: 'Parchar el runtime de las funciones cada vez que sale una versión nueva',
          definition:
            'El runtime es el entorno de ejecución del lenguaje, como Node.js o Python, sobre el que corre el código de una función.',
          explanation:
            'En Lambda el runtime lo parcha AWS. Lo que sí debe mantener la cerrajería son las librerías de terceros que incluyó en su código.',
          correct: false,
        },
      ],
    },
    {
      id: 's3-photos',
      prompt:
        'Ahora, lo de las fotos. Las imágenes de las llaves están en un bucket de Amazon S3 y quedaron accesibles para cualquiera. ¿Quién debía configurar quién puede verlas?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-decides-access',
          label: 'AWS, porque las fotos están guardadas en sus discos',
          definition:
            'Responsabilidad del proveedor sobre los servidores, discos y red que almacenan los objetos de un servicio de almacenamiento.',
          explanation:
            'AWS gestiona la infraestructura y la plataforma de S3, pero no decide quién puede ver los archivos de la cerrajería.',
          correct: false,
        },
        {
          id: 'abstraction-aws',
          label: 'AWS, porque S3 es un servicio tan abstraído que no deja nada al cliente',
          definition:
            'Servicios en los que el proveedor gestiona infraestructura, sistema operativo y plataforma, y el cliente se enfoca en sus datos.',
          explanation:
            'Más abstracción reduce las tareas operativas, pero los datos, su cifrado y los permisos de acceso siempre quedan en manos del cliente.',
          correct: false,
        },
        {
          id: 'programmer-only',
          label: 'Solo el programador, porque la cerrajería no escribió el código',
          definition:
            'Persona externa contratada para desarrollar una aplicación sin ser dueña de la cuenta ni de los datos.',
          explanation:
            'Ante AWS, el cliente es la cerrajería, dueña de la cuenta y de los datos. Quién hizo el trabajo no cambia de quién es la responsabilidad.',
          correct: false,
        },
        {
          id: 'shop-permissions',
          label: 'La cerrajería, porque los permisos de acceso a sus datos son del cliente',
          definition:
            'En servicios como Amazon S3, el cliente se encarga de sus datos: opciones de cifrado, clasificación y permisos de acceso mediante IAM.',
          explanation:
            'Los permisos de las fotos son seguridad EN la nube. La cerrajería debía configurar el bucket y las políticas para que solo su app pudiera leer las imágenes.',
          correct: true,
        },
      ],
    },
    {
      id: 'data-law',
      prompt:
        'Mi abogada dice que los datos personales de los clientes, como nombre, dirección y teléfono, tienen normas que cumplir. Están en Amazon DynamoDB. ¿Quién responde por cumplir esas normas?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-managed-compliance',
          label: 'AWS, porque DynamoDB le quita a la cerrajería la administración de servidores',
          definition:
            'Servicio en el que AWS gestiona la infraestructura, el sistema operativo y la plataforma de base de datos.',
          explanation:
            'Que el servicio sea administrado reduce tareas operativas, pero no traslada a AWS las normas que aplican a los datos de la cerrajería.',
          correct: false,
        },
        {
          id: 'aws-inherited-compliance',
          label: 'AWS, como un control heredado de sus centros de datos',
          definition:
            'Controles que el cliente recibe por completo del proveedor, como los físicos y ambientales de los centros de datos.',
          explanation:
            'Los controles heredados cubren lo físico y ambiental. No incluyen el cumplimiento de las normas sobre los datos personales del cliente.',
          correct: false,
        },
        {
          id: 'shop-compliance',
          label: 'La cerrajería, como dueña de los datos personales que guarda',
          definition:
            'Principio por el cual el dueño de los datos responde por cumplir las leyes y normas que los regulan, use el servicio que use.',
          explanation:
            'Aunque DynamoDB sea muy administrado, la cerrajería sigue siendo responsable de cumplir las leyes y normas que aplican a los datos de sus clientes.',
          correct: true,
        },
        {
          id: 'customers-compliance',
          label: 'Los propios clientes, porque aceptaron usar la app',
          definition:
            'Consentimiento que da una persona al registrarse en una aplicación y entregar sus datos.',
          explanation:
            'Aceptar usar la app no traslada a los clientes la responsabilidad de proteger sus datos. Quien los guarda y procesa es la cerrajería.',
          correct: false,
        },
      ],
    },
    {
      id: 'separate-data',
      prompt:
        'Última. Quiero guardar los códigos de las cajas fuertes que instalamos en un entorno aparte, separado del resto de las reservas. Esa decisión, ¿qué tipo de control es?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'specific-control',
          label: 'Un control específico del cliente',
          definition:
            'Controles que dependen solo del cliente y de su aplicación, sin una parte a cargo del proveedor.',
          explanation:
            'Decidir en qué entorno de seguridad separar ciertos datos depende solo de la cerrajería y de su aplicación: es el ejemplo de control específico del cliente.',
          correct: true,
        },
        {
          id: 'inherited-separation',
          label: 'Un control heredado de AWS',
          definition:
            'Controles que el cliente hereda por completo del proveedor, como los controles físicos y ambientales de los centros de datos.',
          explanation:
            'AWS no decide cómo la cerrajería organiza sus datos. Los controles heredados son los físicos y ambientales.',
          correct: false,
        },
        {
          id: 'shared-separation',
          label: 'Un control compartido entre AWS y la cerrajería',
          definition:
            'Controles que aplican a la infraestructura y al cliente a la vez, como los parches, la configuración y la capacitación.',
          explanation:
            'En los controles compartidos ambos hacen su parte. Separar los códigos de las cajas fuertes es una decisión que depende únicamente de la cerrajería.',
          correct: false,
        },
        {
          id: 'of-the-cloud',
          label: 'Seguridad DE la nube, a cargo de AWS',
          definition:
            'Protección de la infraestructura que ejecuta los servicios: hardware, software, redes e instalaciones del proveedor.',
          explanation:
            'La seguridad DE la nube es la infraestructura de AWS. Cómo se separan los datos de la cerrajería es seguridad EN la nube.',
          correct: false,
        },
      ],
    },
  ],
};
