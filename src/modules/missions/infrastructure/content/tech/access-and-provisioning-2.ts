import type { Mission } from '../../../domain/Mission';

/**
 * AgroSensa: an agtech startup from Mendoza, based at the Startup Lab, whose hand-built environments keep drifting apart.
 * Practices infrastructure as code: AWS CloudFormation templates and stacks, the AWS CDK and rebuilding in another Region.
 */
export const accessAndProvisioning2: Mission = {
  id: 'access-and-provisioning-2',
  track: 'tech',
  topicSlug: 'access-and-provisioning',
  buildingId: 'startup-lab',
  title: 'Ambientes gemelos',
  client: { name: 'Jimena Ferreyra', role: 'CTO de AgroSensa' },
  intro: [
    'Hola, pasa. Soy Jimena Ferreyra, CTO de AgroSensa. Somos una startup de Mendoza: ponemos sensores en los viñedos y avisamos a los productores cuándo y cuánto regar.',
    'Tenemos tres ambientes en AWS: desarrollo, pruebas y producción. Cada uno lo armó una persona distinta, a mano en la consola, y ya no se parecen en nada.',
    'La semana pasada algo funcionó perfecto en pruebas y se cayó en producción, en plena temporada de riego. Y un fondo que quiere invertir nos pide un plan para reconstruir todo si perdemos una Región.',
    'Necesito que nuestra infraestructura deje de depender de la memoria de cada uno. ¿Me ayudas a ponerla en código?',
  ],
  outro: {
    passed: [
      'Lo logramos: los tres ambientes salen de la misma plantilla y el equipo escribe la infraestructura en Python, que es lo que mejor conoce.',
      'Y si perdemos una Región, la levantamos en otra con las mismas plantillas. El fondo quedó conforme. Gracias: en la próxima vendimia, el primer brindis es tuyo.',
    ],
    failed: [
      'Mmm... con estas decisiones seguiríamos con ambientes distintos y sin plan para el fondo.',
      'Repasa la teoría sobre infraestructura como código y vuelve cuando quieras. Aquí en el Startup Lab te esperamos.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'identical-environments',
      prompt:
        'Lo urgente: necesito que desarrollo, pruebas y producción sean idénticos. Quiero describir todos los recursos en archivos que vivan en nuestro repositorio, saber quién cambió qué y crearlos de forma repetible. ¿Qué usamos?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'console-checklist',
          label: 'Seguir con la consola, siguiendo una lista detallada de clics',
          definition:
            'Creación manual de recursos en la interfaz web de AWS, guiada por un documento con los pasos a seguir.',
          explanation:
            'Los clics no se pueden repetir de forma exacta ni versionar, y dependen de que nadie se equivoque. Es lo que ya los separó.',
          correct: false,
        },
        {
          id: 'sdk-in-app',
          label: 'Usar el AWS SDK dentro del código de la aplicación de sensores',
          definition:
            'Librerías por lenguaje que permiten a una aplicación llamar a los servicios de AWS desde su propio código.',
          explanation:
            'Los SDK sirven para que una aplicación use AWS desde su código; no son la herramienta para describir ambientes completos en plantillas versionadas.',
          correct: false,
        },
        {
          id: 'cloudformation-templates',
          label: 'AWS CloudFormation, con plantillas JSON o YAML en el repositorio',
          definition:
            'Servicio de infraestructura como código que crea los recursos descritos en una plantilla de texto, de forma consistente y repetible.',
          explanation:
            'Con una misma plantilla CloudFormation crea los tres ambientes iguales. Al ser texto, se guarda en control de versiones para saber qué cambió, quién y cuándo, y volver atrás si algo falla.',
          correct: true,
        },
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio que monitorea recursos y aplicaciones con métricas, logs, dashboards y alarmas.',
          explanation:
            'CloudWatch muestra cómo están funcionando los recursos, pero no los crea. Confundir el monitoreo con el aprovisionamiento es una trampa típica.',
          correct: false,
        },
      ],
    },
    {
      id: 'stack-unit',
      prompt:
        'Para las demos a clientes levantamos un ambiente extra y después nadie se acuerda de borrar todas sus piezas. Cuando CloudFormation usa la plantilla, ¿qué crea y cómo eliminamos ese ambiente completo?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'delete-template-file',
          label: 'Crea recursos sueltos; se eliminan borrando el archivo de la plantilla',
          definition:
            'Idea de que el archivo JSON o YAML está conectado a los recursos y que quitarlo del repositorio los elimina.',
          explanation:
            'La plantilla solo describe los recursos. Borrar el archivo no toca lo que ya se creó en la cuenta.',
          correct: false,
        },
        {
          id: 'one-by-one',
          label: 'Crea recursos independientes que luego hay que borrar uno por uno en la consola',
          definition:
            'Eliminación manual de cada recurso de un ambiente, revisando servicio por servicio.',
          explanation:
            'Es justo el problema de hoy: alguien olvida una pieza y sigue cobrando. CloudFormation agrupa los recursos para no tener que hacerlo así.',
          correct: false,
        },
        {
          id: 'demo-ami',
          label: 'Crea una AMI con todo el ambiente; se elimina dando de baja esa imagen',
          definition:
            'Una Amazon Machine Image es una plantilla con el sistema operativo y el software para lanzar instancias de Amazon EC2.',
          explanation:
            'Una AMI describe el software de una instancia, no un ambiente completo con base de datos y balanceador. No es lo que crea CloudFormation.',
          correct: false,
        },
        {
          id: 'stack',
          label: 'Crea un stack que se gestiona como una sola unidad; al eliminar el stack se eliminan sus recursos',
          definition:
            'Un stack es el conjunto de recursos creado a partir de una plantilla, que se crea, actualiza y elimina en conjunto.',
          explanation:
            'Cada demo puede ser su propio stack: CloudFormation crea todo en el orden correcto y, al eliminar el stack, se eliminan sus recursos, salvo los que tengan una política para conservarlos.',
          correct: true,
        },
      ],
    },
    {
      id: 'python-infrastructure',
      prompt:
        'Al equipo no le gusta escribir YAML: todos programan en Python. Quieren definir la infraestructura en Python y que igual se aprovisione mediante CloudFormation. ¿Qué herramienta es esa?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'python-cli',
          label: 'AWS CLI',
          definition:
            'Herramienta para ejecutar comandos de AWS desde la terminal y automatizarlos en scripts.',
          explanation:
            'La CLI ejecuta comandos en la terminal; no convierte una definición de infraestructura en Python en stacks de CloudFormation.',
          correct: false,
        },
        {
          id: 'cdk',
          label: 'AWS CDK',
          definition:
            'Kit de desarrollo para definir infraestructura en la nube con lenguajes de programación conocidos.',
          explanation:
            'El AWS CDK permite escribir la infraestructura en lenguajes como Python y la aprovisiona a través de CloudFormation, así que mantienen los stacks.',
          correct: true,
        },
        {
          id: 'python-query-api',
          label: 'Llamadas directas a la Query API',
          definition:
            'Solicitudes HTTPS de bajo nivel a los servicios de AWS, en las que el programa debe firmar cada llamada.',
          explanation:
            'La Query API es el acceso más bajo nivel: no genera plantillas ni stacks de CloudFormation a partir de código Python.',
          correct: false,
        },
        {
          id: 'python-console',
          label: 'AWS Management Console',
          definition:
            'Interfaz web para administrar los servicios de AWS haciendo clics en el navegador.',
          explanation:
            'La consola es para tareas manuales; no permite definir la infraestructura como código en Python.',
          correct: false,
        },
      ],
    },
    {
      id: 'rebuild-region',
      prompt:
        'Lo que pide el fondo: si toda la Región donde corremos queda fuera de servicio, debemos poder reconstruir la infraestructura rápido en otra Región. ¿Qué enfoque recomienda AWS?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'iac-other-region',
          label: 'Desplegar con infraestructura como código y reutilizar las plantillas en la otra Región',
          definition:
            'Aprovisionamiento a partir de archivos de texto que pueden usarse una y otra vez en distintas Regiones y cuentas.',
          explanation:
            'AWS recomienda desplegar con IaC para reconstruir rápido una carga de trabajo en una Región de recuperación ante desastres: las mismas plantillas crean los mismos recursos allí.',
          correct: true,
        },
        {
          id: 'manual-runbook',
          label: 'Escribir un manual con los pasos para recrear todo a mano en la consola',
          definition:
            'Documento con instrucciones para que una persona repita la configuración en la interfaz web.',
          explanation:
            'Recrear todo a mano es lento, propenso a errores y difícil de auditar, justo cuando más prisa hay.',
          correct: false,
        },
        {
          id: 'auto-copy-regions',
          label: 'No hacer nada: AWS copia solos los recursos a otra Región',
          definition:
            'Supuesto de que los recursos de una Región aparecen en las demás sin ninguna acción del cliente.',
          explanation:
            'Los recursos y datos de una Región no existen en otra a menos que tú los repliques o copies. Hay que prepararlo.',
          correct: false,
        },
        {
          id: 'sdk-rebuild',
          label: 'Usar los AWS SDK dentro de la aplicación de sensores',
          definition:
            'Librerías por lenguaje con las que el código de una aplicación llama a los servicios de AWS.',
          explanation:
            'Los SDK sirven para que la aplicación use servicios desde su código; no son el enfoque de IaC que AWS recomienda para reconstruir todo de forma repetible.',
          correct: false,
        },
      ],
    },
  ],
};
