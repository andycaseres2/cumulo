import type { Mission } from '../../../domain/Mission';

/**
 * Fintech PagoYa: a payments startup in Buenos Aires whose employees juggle duplicated IAM users across several AWS accounts.
 * Practices AWS IAM Identity Center, permission sets, cross-account roles and the temporary credentials of federation.
 */
export const federatedIdentityAndCrossAccountAccess1: Mission = {
  id: 'federated-identity-and-cross-account-access-1',
  track: 'financial',
  topicSlug: 'federated-identity-and-cross-account-access',
  buildingId: 'fintech',
  title: 'Un solo login para PagoYa',
  client: { name: 'Valentina Ruiz', role: 'Líder de plataforma de Fintech PagoYa' },
  intro: [
    '¡Hola! Soy Valentina Ruiz, líder de plataforma de PagoYa. Desde esta oficina en Buenos Aires procesamos pagos con QR para miles de comercios.',
    'Crecimos rápido: hoy tenemos cinco cuentas de AWS, entre desarrollo, pruebas, producción y herramientas. Y ochenta personas que ya inician sesión cada mañana en nuestro proveedor de identidad corporativo.',
    'El problema es que creamos usuarios de IAM a mano en cada cuenta. Hay gente con cinco contraseñas, y cuando alguien se va, siempre olvidamos borrar alguna de sus cuentas.',
    'El banco central nos pide demostrar que controlamos el acceso, y así no podemos. ¿Me ayudas a ordenar las identidades de PagoYa?',
  ],
  outro: {
    passed: [
      'Perfecto. Ahora cada persona entra con su identidad corporativa a las cuentas que le corresponden, y cuando alguien se va, lo damos de baja en un solo lugar.',
      'Y el pipeline despliega en producción sin claves guardadas. Gracias: en PagoYa tu próximo pago no lleva comisión.',
    ],
    failed: [
      'Mmm... con estas respuestas seguiríamos repartiendo usuarios y contraseñas por todas las cuentas.',
      'Repasa la teoría de federación y acceso entre cuentas, y vuelve. El equipo te espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'workforce-access',
      prompt:
        'Primero, la gente. Quiero que los ochenta empleados entren a las cinco cuentas de AWS con la identidad corporativa que ya usan, desde un solo portal. ¿Qué servicio usamos?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'cognito-workforce',
          label: 'Amazon Cognito',
          definition:
            'Plataforma de identidad para aplicaciones web y móviles, con directorios de usuarios y credenciales para usuarios finales.',
          explanation:
            'Cognito es para los clientes de una aplicación. Para que los empleados entren a varias cuentas de AWS se usa otro servicio.',
          correct: false,
        },
        {
          id: 'identity-center',
          label: 'AWS IAM Identity Center',
          definition:
            'Servicio para el acceso de la fuerza laboral a varias cuentas de AWS y aplicaciones, con un portal de acceso y credenciales de corto plazo.',
          explanation:
            'IAM Identity Center es la solución recomendada para empleados en varias cuentas. Puede conectar el proveedor de identidad corporativo con SAML 2.0 y cada persona ve sus cuentas en el portal de acceso.',
          correct: true,
        },
        {
          id: 'iam-users-each',
          label: 'Un usuario de IAM por persona en cada cuenta, con contraseñas más fuertes',
          definition:
            'Identidades de IAM creadas por separado en cada cuenta, con credenciales de largo plazo propias de cada una.',
          explanation:
            'Es justo lo que tienen hoy. Crear usuarios duplicados en cada cuenta es la trampa típica que se evita con un acceso centralizado.',
          correct: false,
        },
        {
          id: 'simple-ad',
          label: 'Simple AD de AWS Directory Service',
          definition:
            'Directorio compatible con funciones básicas de Active Directory, pensado para casos pequeños y de bajo costo.',
          explanation:
            'Simple AD ofrece un directorio básico, no un portal de acceso a varias cuentas de AWS con la identidad que ya usan.',
          correct: false,
        },
      ],
    },
    {
      id: 'permission-templates',
      prompt:
        'Ahora los permisos. Quiero dos plantillas, "solo lectura" y "desarrollador", y aplicarlas en varias cuentas a la vez según el equipo. ¿Cómo se llama eso en el servicio que elegimos?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'inline-each',
          label: 'Políticas en línea dentro de cada persona',
          definition:
            'Políticas que viven dentro de una sola identidad, en relación uno a uno, y se borran junto con ella.',
          explanation:
            'Una política en línea no es una plantilla: habría que repetirla en cada identidad y en cada cuenta.',
          correct: false,
        },
        {
          id: 'bucket-policies',
          label: 'Bucket policies de Amazon S3',
          definition:
            'Políticas basadas en recursos que se adjuntan a un bucket de S3 y definen quién puede acceder a él.',
          explanation:
            'Una bucket policy protege un bucket concreto. No sirve como plantilla de permisos para personas en varias cuentas.',
          correct: false,
        },
        {
          id: 'identity-pools',
          label: 'Identity pools de Amazon Cognito',
          definition:
            'Componente de Cognito que intercambia un token de confianza por credenciales temporales de AWS para los usuarios de una app.',
          explanation:
            'Los identity pools dan credenciales a los usuarios de una aplicación, no plantillas de permisos para empleados en varias cuentas.',
          correct: false,
        },
        {
          id: 'permission-sets',
          label: 'Conjuntos de permisos (permission sets)',
          definition:
            'Plantillas de permisos que se aprovisionan en varias cuentas y se asignan a usuarios o grupos, con una instancia de organización.',
          explanation:
            'Los permission sets de IAM Identity Center son esas plantillas. Requieren una instancia de organización de Identity Center y se asignan a los grupos de cada equipo.',
          correct: true,
        },
      ],
    },
    {
      id: 'pipeline-cross-account',
      prompt:
        'El pipeline de despliegue vive en la cuenta de herramientas y debe desplegar en la cuenta de producción. Hoy usa un usuario de IAM de producción con access keys. ¿Cómo lo hacemos bien?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'cross-account-role',
          label: 'Un rol en producción que confíe en la cuenta de herramientas, asumido con sts:AssumeRole',
          definition:
            'Rol cuya política de confianza nombra a otra cuenta como entidad de confianza, para que sus identidades lo asuman y reciban credenciales temporales.',
          explanation:
            'Un rol entre cuentas evita usuarios duplicados y claves de largo plazo. El pipeline asume el rol y, mientras lo usa, solo tiene los permisos de ese rol.',
          correct: true,
        },
        {
          id: 'copy-keys',
          label: 'Copiar las access keys del usuario de producción a la cuenta de herramientas',
          definition:
            'Trasladar credenciales de largo plazo de una cuenta a otra para que un proceso las use.',
          explanation:
            'Siguen siendo claves de largo plazo de un usuario duplicado. Es lo que un rol entre cuentas permite evitar.',
          correct: false,
        },
        {
          id: 'cognito-pipeline',
          label: 'Un user pool de Amazon Cognito para el pipeline',
          definition:
            'Directorio de usuarios para el registro e inicio de sesión en aplicaciones web y móviles.',
          explanation:
            'Cognito sirve para los usuarios finales de una aplicación, no para dar acceso entre cuentas de AWS a un proceso de despliegue.',
          correct: false,
        },
        {
          id: 'nested-group',
          label: 'Meter el grupo de herramientas dentro del grupo de producción',
          definition:
            'Intentar que un grupo de IAM contenga a otro grupo para heredar sus permisos.',
          explanation:
            'Los grupos de IAM no se pueden anidar y además pertenecen a una sola cuenta. No dan acceso a otra cuenta.',
          correct: false,
        },
      ],
    },
    {
      id: 'federation-credentials',
      prompt:
        'Una última duda del auditor del banco central: cuando un empleado entra con la identidad corporativa, ¿qué tipo de credenciales de AWS recibe?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'permanent-keys',
          label: 'Access keys permanentes generadas para cada empleado',
          definition:
            'Credenciales de largo plazo para acceso programático, formadas por un access key ID y una secret access key.',
          explanation:
            'Es una trampa típica: la federación no entrega access keys permanentes.',
          correct: false,
        },
        {
          id: 'iam-user-created',
          label: 'Un usuario de IAM creado automáticamente en cada cuenta',
          definition:
            'Identidad de IAM con credenciales de largo plazo propias dentro de una cuenta de AWS.',
          explanation:
            'La idea de la federación es justamente no crear usuarios de IAM: AWS confía en el proveedor de identidad externo.',
          correct: false,
        },
        {
          id: 'temporary-creds',
          label: 'Credenciales temporales, de corto plazo',
          definition:
            'Credenciales que caducan después de un tiempo y se obtienen al autenticarse o al asumir un rol.',
          explanation:
            'La federación siempre entrega credenciales temporales. La persona se autentica en su proveedor de identidad y AWS le da acceso de corto plazo.',
          correct: true,
        },
        {
          id: 'root-shared',
          label: 'Las credenciales del usuario raíz de cada cuenta',
          definition:
            'El usuario raíz es la identidad creada al abrir la cuenta, con acceso completo a todos los servicios y recursos.',
          explanation:
            'El usuario raíz no se comparte ni se usa en el día a día. La federación da acceso con permisos limitados y temporales.',
          correct: false,
        },
      ],
    },
  ],
};
