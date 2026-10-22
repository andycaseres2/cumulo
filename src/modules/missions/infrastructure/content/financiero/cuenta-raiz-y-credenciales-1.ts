import type { Mission } from '../../../domain/Mission';

/**
 * Café de la Bolsa: a coffee shop in Guadalajara whose online orders run on AWS and whose root user is poorly protected.
 * Practices phishing-resistant MFA, root-only tasks, access key handling and monitoring root user activity.
 */
export const cuentaRaizYCredenciales1: Mission = {
  id: 'cuenta-raiz-y-credenciales-1',
  track: 'financiero',
  topicSlug: 'cuenta-raiz-y-credenciales',
  buildingId: 'cafe-bolsa',
  title: 'Un café con la cuenta raíz',
  client: { name: 'Mariana Torres', role: 'Dueña del Café de la Bolsa' },
  intro: [
    '¡Hola! ¿Un café? Soy Mariana Torres, dueña del Café de la Bolsa, aquí en Guadalajara. Los corredores de la bolsa piden su café desde nuestra app antes de que abra el mercado.',
    'La app y el programa de puntos corren en AWS. Yo abrí la cuenta con mi correo, y hasta hoy esa es la llave de todo.',
    'La semana pasada me llegó un correo falso que imitaba a AWS y casi escribo mi contraseña. Después, mi encargado de sistemas se quitó por error sus propios permisos de administrador, y nadie puede arreglarlo.',
    'Si alguien se adueña de la cuenta, los pedidos de la mañana se caen y mis clientes se van a la competencia. ¿Me ayudas a blindar esto?',
  ],
  outro: {
    passed: [
      '¡Listo! La cuenta raíz tiene una llave física, solo la uso para lo que de verdad la necesita y me avisan si alguien entra con ella.',
      'Hasta mi encargado de sistemas recuperó sus permisos. El próximo café corre por mi cuenta; bueno, por la cuenta del café, no por la raíz.',
    ],
    failed: [
      'Ay... con estas decisiones la cuenta sigue tan expuesta como un pan dulce en la vitrina.',
      'Repasa la teoría sobre la cuenta raíz y las credenciales, y vuelve. Te guardo una mesa junto a la ventana.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'phishing-mfa',
      prompt:
        'Ese correo falso me asustó. Quiero agregar un segundo factor al usuario raíz, y que sea de los que AWS recomienda por ser resistentes al phishing. ¿Cuál elijo?',
      topicSlug: 'cuenta-raiz-y-credenciales',
      examTasks: ['2.3'],
      options: [
        {
          id: 'fido-key',
          label: 'Una llave de seguridad o passkey (FIDO)',
          definition:
            'Método de MFA basado en criptografía de clave pública, con una llave física o una passkey sincronizada en un gestor de credenciales.',
          explanation:
            'Las passkeys y llaves de seguridad FIDO son resistentes al phishing y son la opción que AWS recomienda. Además, conviene registrar más de un dispositivo.',
          correct: true,
        },
        {
          id: 'sms-code',
          label: 'Un código por SMS a mi celular',
          definition: 'Segundo factor basado en códigos enviados por mensaje de texto al teléfono del usuario.',
          explanation:
            'AWS ya no permite activar MFA por SMS en IAM, así que no es una opción para el usuario raíz.',
          correct: false,
        },
        {
          id: 'longer-password',
          label: 'Una contraseña más larga, sin segundo factor',
          definition:
            'Aumentar la longitud y complejidad de la contraseña, que sigue siendo un solo factor de autenticación.',
          explanation:
            'Una contraseña fuerte es necesaria, pero si Mariana la escribe en una página falsa, el atacante la obtiene igual. No es un segundo factor.',
          correct: false,
        },
        {
          id: 'password-policy-root',
          label: 'Una política de contraseñas con expiración cada 30 días',
          definition:
            'Reglas de la cuenta para las contraseñas, como longitud mínima, tipos de caracteres, expiración y prevención de reutilización.',
          explanation:
            'La política de contraseñas solo se aplica a los usuarios de IAM, no al usuario raíz, y no agrega un segundo factor.',
          correct: false,
        },
      ],
    },
    {
      id: 'restore-admin',
      prompt:
        'Ahora, mi encargado de sistemas. Era el único administrador de IAM y se revocó sus propios permisos por error. Ningún otro usuario puede devolvérselos. ¿Qué hacemos?',
      topicSlug: 'cuenta-raiz-y-credenciales',
      examTasks: ['2.3'],
      options: [
        {
          id: 'self-restore',
          label: 'Que él mismo se adjunte de nuevo la política de administrador',
          definition:
            'Intentar modificar los permisos propios desde una identidad que ya no tiene permisos sobre IAM.',
          explanation:
            'Sin permisos sobre IAM no puede adjuntarse políticas. Justamente por eso quedó bloqueado.',
          correct: false,
        },
        {
          id: 'new-password-policy',
          label: 'Cambiar la política de contraseñas para desbloquearlo',
          definition:
            'Reglas de la cuenta para las contraseñas de los usuarios de IAM, como longitud mínima, expiración y reutilización.',
          explanation:
            'La política de contraseñas regula cómo son las contraseñas, no qué permisos tiene cada usuario. No le devuelve el acceso de administrador.',
          correct: false,
        },
        {
          id: 'root-restore',
          label: 'Entrar con el usuario raíz y restaurar sus permisos',
          definition:
            'El usuario raíz tiene acceso completo a la cuenta y es el único que puede hacer ciertas tareas de la lista oficial de IAM.',
          explanation:
            'Restaurar los permisos del único administrador de IAM es una de las tareas que solo puede hacer el usuario raíz. Es un buen ejemplo de uso puntual y justificado.',
          correct: true,
        },
        {
          id: 'root-keys-script',
          label: 'Crear access keys del usuario raíz para automatizar estos arreglos',
          definition:
            'Credenciales de largo plazo para acceso programático asociadas a la identidad con acceso total a la cuenta.',
          explanation:
            'AWS desaconseja de forma explícita crear access keys para el usuario raíz. Si se filtran, alguien tendría control total del café en AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'lost-secret',
      prompt:
        'Otro detalle: el script que sincroniza los puntos usa las access keys de un usuario de IAM, y el programador perdió la secret access key. ¿Cómo la recuperamos?',
      topicSlug: 'cuenta-raiz-y-credenciales',
      examTasks: ['2.3'],
      options: [
        {
          id: 'view-secret-console',
          label: 'Volver a verla en la consola de IAM',
          definition:
            'Consultar en la consola los datos de una access key existente, como su ID, su estado y su último uso.',
          explanation:
            'La secret access key solo se puede ver al crearla. Después la consola muestra el access key ID, pero no la parte secreta.',
          correct: false,
        },
        {
          id: 'create-new-key',
          label: 'Crear una access key nueva y eliminar la que se perdió',
          definition:
            'Generar otro par de access key ID y secret access key para el mismo usuario; cada usuario puede tener como máximo dos.',
          explanation:
            'Como la clave secreta solo se ve al crearla, hay que crear otra y borrar la perdida. Mejor aún si el script pasa a usar credenciales temporales con un rol.',
          correct: true,
        },
        {
          id: 'root-key-meanwhile',
          label: 'Usar la access key del usuario raíz mientras tanto',
          definition:
            'Credenciales de largo plazo para acceso programático de la identidad que tiene acceso total a la cuenta.',
          explanation:
            'No se deben crear access keys para el usuario raíz. Usarlas en un script le daría control total de la cuenta a cualquiera que las vea.',
          correct: false,
        },
        {
          id: 'reset-password',
          label: 'Restablecer la contraseña de consola del usuario',
          definition:
            'Cambiar la contraseña con la que un usuario de IAM inicia sesión en la consola de AWS.',
          explanation:
            'La contraseña de consola y las access keys son credenciales distintas. Cambiarla no recupera ni reemplaza la clave secreta.',
          correct: false,
        },
      ],
    },
    {
      id: 'root-alerts',
      prompt:
        'Para terminar, quiero enterarme cada vez que alguien use el usuario raíz, aunque sea yo misma. ¿Con qué servicios lo monitoreo?',
      topicSlug: 'cuenta-raiz-y-credenciales',
      examTasks: ['2.3'],
      options: [
        {
          id: 'cost-explorer',
          label: 'AWS Cost Explorer',
          definition:
            'Herramienta para visualizar y analizar los costos y el uso de AWS a lo largo del tiempo.',
          explanation:
            'Cost Explorer muestra en qué se gasta, no quién inicia sesión ni qué identidad hace cada acción.',
          correct: false,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar informes de cumplimiento de AWS y gestionar acuerdos.',
          explanation:
            'Artifact entrega evidencia de cumplimiento de AWS, pero no registra la actividad del usuario raíz en la cuenta del café.',
          correct: false,
        },
        {
          id: 'inspector',
          label: 'Amazon Inspector',
          definition:
            'Servicio que escanea cargas de trabajo, como instancias EC2 e imágenes de contenedores, en busca de vulnerabilidades de software.',
          explanation:
            'Inspector busca vulnerabilidades en las cargas de trabajo. No avisa cuando alguien usa el usuario raíz.',
          correct: false,
        },
        {
          id: 'cloudtrail-eventbridge',
          label: 'AWS CloudTrail junto con Amazon EventBridge',
          definition:
            'CloudTrail registra las acciones hechas en la cuenta como eventos; EventBridge reacciona a eventos con reglas que disparan acciones.',
          explanation:
            'CloudTrail registra la actividad del usuario raíz, como sus inicios de sesión, y EventBridge puede disparar una alerta cuando aparece. Monitorear su uso es parte de protegerlo.',
          correct: true,
        },
      ],
    },
  ],
};
