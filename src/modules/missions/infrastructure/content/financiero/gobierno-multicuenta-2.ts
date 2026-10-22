import type { Mission } from '../../../domain/Mission';

/**
 * Café de la Bolsa: a coffee chain from Montevideo whose ordering app grows into a new AWS account per country.
 * Practices AWS Control Tower (landing zone, Account Factory, control types) and SCPs versus the management account.
 */
export const gobiernoMulticuenta2: Mission = {
  id: 'gobierno-multicuenta-2',
  track: 'financiero',
  buildingId: 'cafe-bolsa',
  topicSlug: 'gobierno-multicuenta',
  title: 'Un café, muchas cuentas',
  client: { name: 'Lucía Paredes', role: 'Dueña de Café de la Bolsa' },
  intro: [
    '¡Hola! ¿Un cafecito? Soy Lucía Paredes, dueña de Café de la Bolsa. Empezamos con un local frente a la bolsa de Montevideo y hoy tenemos cafeterías en Uruguay, Paraguay y Argentina.',
    'Nuestra app de pedidos y fidelización corre en AWS. Mi equipo digital quiere una cuenta de AWS por país y otras para desarrollo, y en el próximo año abrimos más países.',
    'El problema es que somos pocos y nadie es experto en armar entornos multicuenta. Tengo miedo de que cada cuenta termine configurada a su manera, con buckets abiertos y sin control.',
    'Si me equivoco, los datos de nuestros clientes frecuentes quedan expuestos. ¿Me ayudas a montarlo bien desde el principio?',
  ],
  outro: {
    passed: [
      'Qué alivio. Tenemos una landing zone lista, cada país nuevo recibe su cuenta ya configurada y los controles nos avisan si algo se sale de la norma.',
      'Y ahora entiendo por qué la cuenta de administración se cuida aparte. Gracias: el café corre por cuenta de la casa, para siempre.',
    ],
    failed: [
      'Mmm... con estas decisiones creo que cada cuenta va a terminar siendo un mundo distinto.',
      'Repasa la teoría sobre gobierno multicuenta con un buen café y vuelve cuando quieras. Te guardo la mesa de la ventana.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'landing-zone',
      prompt:
        'Necesitamos un entorno multicuenta con buenas prácticas de seguridad listo en poco tiempo, sin diseñarlo nosotros desde cero. ¿Qué servicio usamos?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'control-tower',
          label: 'AWS Control Tower',
          definition:
            'Servicio para configurar y gobernar un entorno multicuenta con buenas prácticas, que orquesta AWS Organizations, AWS Service Catalog y AWS IAM Identity Center.',
          explanation:
            'Control Tower crea una landing zone predefinida con OUs, cuentas y controles listos, justo lo que necesita un equipo pequeño sin expertos.',
          correct: true,
        },
        {
          id: 'organizations-diy',
          label: 'AWS Organizations, diseñando nosotros las OUs y escribiendo cada SCP',
          definition:
            'Servicio base para agrupar cuentas y aplicar políticas, cuya estructura y políticas diseña el cliente.',
          explanation:
            'Organizations es la base, pero el diseño queda en manos del equipo. Cuando se pide una landing zone con buenas prácticas lista para usar, la respuesta es Control Tower.',
          correct: false,
        },
        {
          id: 'ram-landing',
          label: 'AWS Resource Access Manager (AWS RAM)',
          definition:
            'Servicio para compartir recursos de forma segura entre cuentas, como subredes de Amazon VPC.',
          explanation:
            'RAM comparte recursos entre cuentas, pero no arma un entorno multicuenta con controles de gobierno.',
          correct: false,
        },
        {
          id: 'artifact-landing',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar informes de cumplimiento de AWS y gestionar acuerdos.',
          explanation:
            'Artifact entrega documentos de cumplimiento de AWS; no crea ni gobierna cuentas.',
          correct: false,
        },
      ],
    },
    {
      id: 'new-country-account',
      prompt:
        'Cada vez que abramos un país nuevo quiero que su cuenta nazca ya configurada y aprobada, igual que las demás. ¿Qué parte de Control Tower se encarga de eso?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'dashboard-account',
          label: 'El dashboard de Control Tower',
          definition:
            'Panel que muestra las cuentas, los controles activos y los recursos no conformes del entorno.',
          explanation:
            'El dashboard muestra el estado del entorno, pero no crea cuentas nuevas.',
          correct: false,
        },
        {
          id: 'iam-user-per-country',
          label: 'Un usuario de IAM nuevo en la cuenta de administración por cada país',
          definition:
            'Identidad individual de IAM dentro de una sola cuenta, con sus propias credenciales y permisos.',
          explanation:
            'Un usuario de IAM no es una cuenta: el país quedaría dentro de la cuenta de administración, sin aislamiento.',
          correct: false,
        },
        {
          id: 'ram-account',
          label: 'Compartir la cuenta de Uruguay con AWS RAM',
          definition:
            'Servicio para compartir recursos de forma segura entre cuentas sin duplicarlos.',
          explanation:
            'RAM comparte recursos entre cuentas existentes; no crea cuentas nuevas ya configuradas.',
          correct: false,
        },
        {
          id: 'account-factory',
          label: 'Account Factory',
          definition:
            'Plantilla de Control Tower para crear cuentas nuevas ya configuradas y aprobadas.',
          explanation:
            'Account Factory crea cada cuenta nueva con la configuración aprobada, así todos los países arrancan iguales.',
          correct: true,
        },
      ],
    },
    {
      id: 'detective-control',
      prompt:
        'Mi equipo pregunta qué tipo de control de Control Tower nos avisa si en alguna cuenta ya existe un recurso que incumple nuestras reglas, como un bucket público creado antes. ¿Cuál es?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'preventive',
          label: 'Un control preventivo',
          definition:
            'Control que impide que se realicen ciertas acciones en las cuentas.',
          explanation:
            'Un control preventivo bloquea acciones, pero no busca recursos que ya incumplen.',
          correct: false,
        },
        {
          id: 'proactive',
          label: 'Un control proactivo',
          definition:
            'Control que revisa los recursos antes de que se creen.',
          explanation:
            'El proactivo actúa antes de crear el recurso. El bucket público ya existe, así que no lo detectaría.',
          correct: false,
        },
        {
          id: 'detective',
          label: 'Un control detectivo',
          definition:
            'Control que detecta incumplimientos en los recursos de las cuentas.',
          explanation:
            'Los controles detectivos encuentran recursos que no cumplen, como un bucket público ya creado, y el dashboard los muestra como no conformes.',
          correct: true,
        },
        {
          id: 'artifact-report-control',
          label: 'Un informe descargado de AWS Artifact',
          definition:
            'Documento de cumplimiento de AWS, como un informe SOC o ISO, descargado bajo demanda.',
          explanation:
            'Los informes de Artifact hablan de la parte de AWS; no revisan los recursos de las cuentas del café.',
          correct: false,
        },
      ],
    },
    {
      id: 'management-account',
      prompt:
        'Pusimos una SCP en la raíz de la organización que deniega borrar los registros de auditoría. Mi socio dice que con eso también queda protegida la cuenta de administración. ¿Tiene razón?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'inherits-from-root',
          label: 'Sí: la SCP está en la raíz y todo lo que hay en la organización la hereda',
          definition:
            'Idea de que una política adjunta a la raíz de la organización se aplica a todas las cuentas sin excepción.',
          explanation:
            'Las SCP se heredan hacia las cuentas miembro, pero no afectan a la cuenta de administración.',
          correct: false,
        },
        {
          id: 'scp-not-management',
          label: 'No: las SCP no restringen a la cuenta de administración, solo a las cuentas miembro',
          definition:
            'Las SCP fijan el máximo de permisos de las identidades de las cuentas miembro de una organización.',
          explanation:
            'La cuenta de administración queda fuera de las SCP, así que hay que proteger por otros medios quién entra en ella y qué puede hacer.',
          correct: true,
        },
        {
          id: 'root-user-confusion',
          label: 'Sí, porque "raíz de la organización" y "usuario raíz" son lo mismo y la SCP lo controla',
          definition:
            'Suposición de que el contenedor principal de la organización y la identidad con acceso total de una cuenta son el mismo concepto.',
          explanation:
            'Son conceptos distintos: la raíz es el contenedor principal de la jerarquía de la organización. Y la SCP sigue sin afectar a la cuenta de administración.',
          correct: false,
        },
        {
          id: 'only-root-users',
          label: 'No, porque las SCP solo se aplican a los usuarios raíz de las cuentas miembro',
          definition:
            'Idea de que las políticas de la organización afectan únicamente a la identidad con acceso total de cada cuenta.',
          explanation:
            'Las SCP afectan a todas las identidades de las cuentas miembro, incluido su usuario raíz, no solo a este.',
          correct: false,
        },
      ],
    },
  ],
};
