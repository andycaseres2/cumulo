import type { Mission } from '../../domain/Mission';

/**
 * Banco Andino: a bank in Bogotá moving its customer app to AWS while auditors ask who touches customer data.
 * Practices the shared responsibility model, IAM least privilege, root user protection, AWS KMS and AWS CloudTrail.
 */
export const bankAccess: Mission = {
  id: 'bank-access',
  track: 'financiero',
  topicSlug: 'iam-fundamentos',
  buildingId: 'bank',
  title: 'Las llaves del banco',
  client: { name: 'Carlos Mendoza', role: 'Gerente de TI del Banco Andino' },
  intro: [
    'Gracias por venir. Soy Carlos Mendoza, gerente de TI del Banco Andino. Desde aquí, en Bogotá, atendemos a miles de clientes que usan nuestra app para pagar y transferir.',
    'Estamos llevando esa app a AWS, con la base de datos de clientes en Amazon RDS. La migración técnica avanza bien, pero los auditores nos frenaron en seco.',
    'Quieren saber quién accede a los datos de los clientes, y no sé qué responder: los doce desarrolladores entran a la cuenta con el mismo usuario administrador. Y nadie tiene claro quién parcha qué.',
    'Si no ordenamos esto antes de la próxima auditoría, no nos dejan salir a producción. Necesito a alguien que me ayude a poner en orden las llaves del banco. ¿Me acompañas?',
  ],
  outro: {
    passed: [
      'Excelente. Ahora sé qué parcha AWS y qué nos toca a nosotros, cada desarrollador tiene su propia identidad con los permisos justos y la cuenta raíz está bajo llave.',
      'Con los datos cifrados con AWS KMS y CloudTrail registrando cada acción, por fin puedo mirar a los auditores a los ojos. Gracias, consultor: en este banco siempre tendrás las puertas abiertas.',
    ],
    failed: [
      'Mmm... con estas respuestas no creo que pasemos la auditoría. Hay decisiones que todavía me preocupan.',
      'Repasa la teoría con calma y vuelve cuando quieras. Las llaves del banco te seguirán esperando.',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'rds-responsibility',
      prompt:
        'Empecemos por lo básico. Nuestra base de datos de clientes va a correr en Amazon RDS. ¿Quién parcha el sistema operativo y el motor de base de datos, y quién se encarga de los datos y de quién puede entrar?',
      topicSlug: 'responsabilidad-compartida',
      examTasks: ['2.1'],
      options: [
        {
          id: 'bank-patches-all',
          label: 'El banco parcha el sistema operativo y el motor; AWS solo cuida el edificio',
          definition:
            'Modelo en el que el cliente instala y parcha todo el software del servidor, como ocurre con el sistema operativo invitado en Amazon EC2.',
          explanation:
            'Eso aplicaría a Amazon EC2, no a RDS. En Amazon RDS, AWS parcha el sistema operativo y el motor de base de datos durante una ventana de mantenimiento.',
          correct: false,
        },
        {
          id: 'shared-rds',
          label: 'AWS parcha el sistema operativo y el motor; el banco gestiona datos, usuarios, cifrado y permisos',
          definition:
            'Reparto de responsabilidades en una base de datos administrada: AWS opera el hardware, el sistema operativo y el motor; el cliente controla el acceso y los datos.',
          explanation:
            'Correcto. En RDS, AWS aplica los parches en la ventana de mantenimiento que ustedes eligen, pero los datos, los usuarios de la base, el cifrado, los security groups y los permisos de IAM siempre son del banco.',
          correct: true,
        },
        {
          id: 'aws-does-everything',
          label: 'AWS se encarga de todo, incluidos los datos y quién puede verlos',
          definition:
            'La idea de que un servicio administrado traslada a AWS toda la responsabilidad de seguridad, incluidos los permisos de acceso.',
          explanation:
            'Es una trampa típica. Cuanto más administrado es el servicio, menos tareas operativas tienen, pero los datos, el cifrado y los permisos de acceso siempre son del banco.',
          correct: false,
        },
        {
          id: 'bank-os-aws-engine',
          label: 'El banco parcha el sistema operativo y AWS parcha el motor de base de datos',
          definition:
            'Reparto en el que el cliente mantiene el sistema operativo del servidor de base de datos y el proveedor mantiene solo el software del motor.',
          explanation:
            'En Amazon RDS el banco no administra el sistema operativo: AWS lo parcha junto con el motor. Al banco le toca elegir la ventana de mantenimiento.',
          correct: false,
        },
      ],
    },
    {
      id: 'developer-access',
      prompt:
        'Ahora, el problema que más molesta a los auditores: doce desarrolladores entran con el mismo usuario administrador. ¿Cómo les damos acceso a la cuenta de forma correcta?',
      topicSlug: 'iam-fundamentos',
      examTasks: ['2.3'],
      options: [
        {
          id: 'shared-admin',
          label: 'Seguir compartiendo el usuario administrador, pero con una contraseña más larga',
          definition:
            'Una sola identidad con permisos totales cuyas credenciales usan varias personas a la vez.',
          explanation:
            'Una contraseña más larga no resuelve nada: si todos usan la misma identidad, nadie puede saber quién hizo qué, y todos tienen más permisos de los que necesitan.',
          correct: false,
        },
        {
          id: 'root-for-devs',
          label: 'Darles las credenciales del usuario raíz para que no les falte ningún permiso',
          definition:
            'El usuario raíz es la identidad que se crea al abrir la cuenta, con acceso completo a todos los servicios y recursos, incluida la facturación.',
          explanation:
            'Es lo opuesto a lo que se busca. AWS recomienda no usar el usuario raíz en el día a día y crear identidades con permisos limitados para el trabajo diario.',
          correct: false,
        },
        {
          id: 'group-least-privilege',
          label: 'Una identidad por desarrollador, con permisos asignados a través de un grupo y políticas de mínimo privilegio',
          definition:
            'Identidades individuales de IAM agrupadas para recibir juntas los permisos, mediante políticas que otorgan solo lo necesario para cada tarea.',
          explanation:
            'Correcto. Cada persona queda identificada por separado y el grupo permite asignar los mismos permisos a los doce de una vez. Con políticas personalizadas aplican el mínimo privilegio; idealmente, las personas acceden con federación y credenciales temporales mediante AWS IAM Identity Center.',
          correct: true,
        },
        {
          id: 'keys-in-code',
          label: 'Crear unas access keys de administrador y guardarlas en el código de la app',
          definition:
            'Las access keys son credenciales de largo plazo para acceso programático, formadas por un access key ID y una secret access key.',
          explanation:
            'Nunca se deben poner access keys en el código ni en repositorios: si se filtran, cualquiera puede usarlas. Además, siguen siendo credenciales compartidas que no identifican a cada persona.',
          correct: false,
        },
      ],
    },
    {
      id: 'root-user',
      prompt:
        'Me acabo de enterar de que el correo y la contraseña con los que abrimos la cuenta los conocen varios gerentes, y alguien los usa a diario. ¿Qué hacemos con ese usuario raíz?',
      topicSlug: 'cuenta-raiz-y-credenciales',
      examTasks: ['2.3'],
      options: [
        {
          id: 'protect-root',
          label: 'Cambiar la contraseña, activar MFA, no crearle access keys y usarlo solo para las tareas que lo exigen',
          definition:
            'Buenas prácticas para el usuario raíz: contraseña fuerte y única, autenticación multifactor, sin access keys y sin compartir sus credenciales.',
          explanation:
            'Correcto. El usuario raíz puede hacer absolutamente todo, así que se protege con MFA, no se comparte y se reserva para tareas exclusivas. Lo diario se hace con identidades de menor privilegio.',
          correct: true,
        },
        {
          id: 'password-policy',
          label: 'Configurar una política de contraseñas con expiración cada 90 días',
          definition:
            'La política de contraseñas de la cuenta define reglas como longitud mínima, tipos de caracteres, expiración y prevención de reutilización.',
          explanation:
            'La política de contraseñas solo se aplica a los usuarios de IAM, no al usuario raíz. No resuelve que varios gerentes compartan y usen el raíz a diario.',
          correct: false,
        },
        {
          id: 'root-access-keys',
          label: 'Crear access keys para el usuario raíz y automatizar con ellas las tareas diarias',
          definition:
            'Credenciales de largo plazo para acceso programático asociadas a la identidad con acceso total a la cuenta.',
          explanation:
            'AWS desaconseja de forma explícita crear access keys para el usuario raíz; si existen, hay que eliminarlas. Si se filtran, alguien tendría control total del banco en AWS.',
          correct: false,
        },
        {
          id: 'sms-mfa',
          label: 'Seguir compartiéndolo, pero con MFA por SMS al celular de un gerente',
          definition:
            'Segundo factor de autenticación basado en códigos enviados por mensaje de texto al teléfono.',
          explanation:
            'IAM ya no permite activar MFA por SMS, y el problema de fondo seguiría ahí: el usuario raíz no debe compartirse ni usarse para el trabajo diario.',
          correct: false,
        },
      ],
    },
    {
      id: 'encryption-at-rest',
      prompt:
        'Los auditores también exigen que los datos de los clientes estén cifrados mientras están guardados en la base de datos, y preguntan quién controla las claves. ¿Qué servicio usamos?',
      topicSlug: 'cifrado-y-proteccion-de-datos',
      examTasks: ['2.2'],
      options: [
        {
          id: 'acm',
          label: 'AWS Certificate Manager (ACM)',
          definition:
            'Servicio que crea, guarda y renueva certificados SSL/TLS públicos y privados, que permiten el HTTPS.',
          explanation:
            'ACM protege los datos en tránsito con TLS, por ejemplo entre la app y los clientes. No cifra los datos guardados en la base de datos.',
          correct: false,
        },
        {
          id: 'macie',
          label: 'Amazon Macie',
          definition:
            'Servicio de seguridad de datos que descubre datos sensibles, como PII o datos financieros, en Amazon S3 usando machine learning y coincidencia de patrones.',
          explanation:
            'Macie ayuda a encontrar dónde hay datos sensibles en S3, pero no cifra la base de datos ni administra claves.',
          correct: false,
        },
        {
          id: 'guardduty',
          label: 'Amazon GuardDuty',
          definition: 'Servicio de seguridad orientado a detectar amenazas en la cuenta de AWS.',
          explanation:
            'GuardDuty sirve para detectar amenazas, no para cifrar datos en reposo ni para controlar las claves de cifrado.',
          correct: false,
        },
        {
          id: 'kms',
          label: 'AWS Key Management Service (AWS KMS)',
          definition:
            'Servicio administrado para crear y controlar las claves con las que se cifran y firman datos, protegidas por módulos de seguridad de hardware (HSM).',
          explanation:
            'Correcto. KMS se integra con Amazon RDS para cifrar la base de datos en reposo, las políticas de claves definen quién puede usarlas y su uso puede auditarse en CloudTrail. Con claves administradas por el cliente, el banco controla su política y su rotación.',
          correct: true,
        },
      ],
    },
    {
      id: 'audit-trail',
      prompt:
        'Última pregunta, la que más me quita el sueño: si un auditor pregunta quién cambió la configuración de la instancia de Amazon RDS de la base de clientes el martes pasado, ¿qué servicio nos permite demostrarlo?',
      topicSlug: 'cumplimiento-y-auditoria',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio que monitorea recursos y aplicaciones en tiempo real con métricas, logs, dashboards y alarmas.',
          explanation:
            'CloudWatch responde "¿cómo está funcionando?", con métricas de rendimiento y alarmas. Para saber quién hizo cada llamada a la API se usa CloudTrail.',
          correct: false,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas desde la consola, la CLI, los SDK y las API.',
          explanation:
            'Correcto. CloudTrail responde "¿quién hizo qué y cuándo?". El historial de eventos guarda 90 días, y con un trail hacia Amazon S3 el banco puede conservar la evidencia por más tiempo para los auditores.',
          correct: true,
        },
        {
          id: 'config',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de los recursos, su historial de configuración y reglas para evaluar si cumplen lo que defines.',
          explanation:
            'Config dice cómo quedó configurado un recurso y si cumple las reglas. Para responder quién hizo la llamada a la API, la fuente es CloudTrail.',
          correct: false,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar sin costo informes de cumplimiento de AWS, como SOC, PCI e ISO, y gestionar acuerdos.',
          explanation:
            'Artifact entrega evidencia de cumplimiento de la parte de AWS, pero no registra lo que hacen las personas dentro de la cuenta del banco.',
          correct: false,
        },
      ],
    },
  ],
};
