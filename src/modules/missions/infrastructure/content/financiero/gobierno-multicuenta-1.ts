import type { Mission } from '../../../domain/Mission';

/**
 * Bolsa de Valores Andina: a stock exchange in Santiago de Chile whose trading platform, tests and analytics share one AWS account.
 * Practices why to use several accounts, AWS Organizations with OUs, how SCPs limit permissions and sharing subnets with AWS RAM.
 */
export const gobiernoMulticuenta1: Mission = {
  id: 'gobierno-multicuenta-1',
  track: 'financiero',
  buildingId: 'bolsa-andina',
  topicSlug: 'gobierno-multicuenta',
  title: 'Separar para gobernar',
  client: { name: 'Daniela Fuentes', role: 'Directora de Arquitectura Cloud de la Bolsa de Valores Andina' },
  intro: [
    'Te damos la bienvenida a la Bolsa de Valores Andina. Soy Daniela Fuentes, directora de Arquitectura Cloud. Desde Santiago operamos la plataforma donde se negocian acciones de cientos de empresas.',
    'Todo empezó en una sola cuenta de AWS: la plataforma de negociación, los entornos de prueba de los desarrolladores y la analítica de datos de mercado. Era cómodo, hasta que dejó de serlo.',
    'La semana pasada, una prueba borró por error una configuración que usaba producción y la negociación se detuvo varios minutos. El directorio está furioso y la regulación no perdona esos sustos.',
    'Necesito separar y gobernar nuestras cuentas sin perder el control. ¿Me ayudas a ordenar la casa?',
  ],
  outro: {
    passed: [
      'Excelente. Producción vive en su propia cuenta, las cuentas están agrupadas en OUs con guardrails que nadie se salta, y la red se comparte sin duplicarla.',
      'El directorio ya respira tranquilo. Gracias: en la Bolsa sabemos reconocer una buena inversión.',
    ],
    failed: [
      'Mmm... con estas decisiones creo que el próximo susto en producción es cuestión de tiempo.',
      'Repasa la teoría sobre gobierno multicuenta y vuelve cuando quieras. La campana de apertura te seguirá esperando.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'why-accounts',
      prompt:
        'Primero, la pregunta del directorio: ¿cómo evitamos que un error en las pruebas vuelva a tumbar la plataforma de negociación?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'more-iam-users',
          label: 'Crear más usuarios de IAM dentro de la misma cuenta, uno por desarrollador',
          definition:
            'Identidades individuales dentro de una sola cuenta de AWS, que comparten sus recursos, cuotas y facturación.',
          explanation:
            'Identificar a cada persona es bueno, pero todo seguiría en la misma cuenta: un error en pruebas puede seguir alcanzando recursos de producción.',
          correct: false,
        },
        {
          id: 'separate-accounts',
          label: 'Separar producción, desarrollo y analítica en cuentas de AWS distintas',
          definition:
            'Uso de varias cuentas como límites de permisos, seguridad, costos y cargas de trabajo.',
          explanation:
            'La cuenta es un límite natural: separar entornos permite controles más estrictos en producción y limita el impacto de un error a una sola cuenta.',
          correct: true,
        },
        {
          id: 'tags-only',
          label: 'Ponerles etiquetas a los recursos de producción para distinguirlos',
          definition:
            'Pares clave-valor que se asignan a los recursos para identificarlos y organizarlos.',
          explanation:
            'Las etiquetas ayudan a identificar recursos, pero por sí solas no aíslan producción de las pruebas dentro de la misma cuenta.',
          correct: false,
        },
        {
          id: 'one-bigger-account',
          label: 'Mantener una sola cuenta y pedir a los desarrolladores más cuidado',
          definition:
            'Estrategia de seguir con todas las cargas de trabajo juntas, confiando en la disciplina del equipo.',
          explanation:
            'Es lo que ya falló. Sin separación, cualquier error en pruebas sigue teniendo el potencial de afectar producción.',
          correct: false,
        },
      ],
    },
    {
      id: 'central-governance',
      prompt:
        'Ya tenemos cinco cuentas nuevas, y van a venir más. Quiero agruparlas en "Producción", "Desarrollo" y "Analítica", y aplicar políticas a cada grupo desde un solo lugar. ¿Qué servicio usamos?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'ram-groups',
          label: 'AWS Resource Access Manager (AWS RAM)',
          definition:
            'Servicio para compartir recursos de forma segura entre cuentas, con una organización, con OUs o con cuentas específicas.',
          explanation:
            'RAM sirve para compartir recursos entre cuentas, no para agruparlas ni aplicarles políticas de forma central.',
          correct: false,
        },
        {
          id: 'iam-groups',
          label: 'Grupos de IAM',
          definition:
            'Colecciones de usuarios de IAM dentro de una cuenta que reciben juntos los mismos permisos.',
          explanation:
            'Los grupos de IAM viven dentro de una sola cuenta y agrupan usuarios, no cuentas.',
          correct: false,
        },
        {
          id: 'config-groups',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de los recursos, su historial de configuración y reglas para evaluar si cumplen lo que defines.',
          explanation:
            'Config evalúa la configuración de los recursos, pero no agrupa cuentas en una jerarquía ni administra políticas de la organización.',
          correct: false,
        },
        {
          id: 'organizations-ous',
          label: 'AWS Organizations, con unidades organizativas (OU)',
          definition:
            'Servicio para administrar y gobernar centralmente varias cuentas, agrupadas en OUs dentro de una jerarquía.',
          explanation:
            'Organizations agrupa las cuentas en OUs como "Producción" o "Desarrollo", y las políticas aplicadas a una OU se heredan hacia abajo.',
          correct: true,
        },
      ],
    },
    {
      id: 'scp-region',
      prompt:
        'Aplicamos una SCP en la OU "Producción" que deniega usar Regiones fuera de las aprobadas. Un administrador de una cuenta de producción, con AdministratorAccess, quiere lanzar servidores en otra Región. ¿Qué pasa?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'admin-wins',
          label: 'Puede hacerlo, porque AdministratorAccess está por encima de cualquier SCP',
          definition:
            'Idea de que una política de IAM con permisos totales prevalece sobre las políticas de la organización.',
          explanation:
            'La SCP fija el máximo de permisos de la cuenta miembro. Aunque IAM diga AdministratorAccess, lo que la SCP deniega queda fuera.',
          correct: false,
        },
        {
          id: 'scp-intersection',
          label: 'No puede: el permiso efectivo es la intersección de la SCP y su política de IAM',
          definition:
            'Las SCP son guardrails que fijan el máximo de permisos para los usuarios y roles de las cuentas miembro.',
          explanation:
            'Su política de IAM permite todo, pero la SCP deniega esas Regiones. Lo efectivo es lo que permiten ambas, así que no puede lanzar servidores allí.',
          correct: true,
        },
        {
          id: 'scp-grants',
          label: 'Puede, y además la SCP le da permisos en las Regiones aprobadas aunque no tenga políticas de IAM',
          definition:
            'Idea de que una política de la organización otorga permisos directamente a las identidades.',
          explanation:
            'Una SCP no otorga permisos: solo limita. Los permisos siguen viniendo de las políticas de IAM.',
          correct: false,
        },
        {
          id: 'only-root-bypasses',
          label: 'Solo el usuario raíz de esa cuenta de producción podría saltarse la SCP',
          definition:
            'Suposición de que el usuario raíz de una cuenta miembro queda fuera de las políticas de la organización.',
          explanation:
            'Las SCP afectan a todas las identidades de las cuentas miembro, incluido su usuario raíz.',
          correct: false,
        },
      ],
    },
    {
      id: 'share-subnets',
      prompt:
        'Último tema: el equipo de redes creó las subredes de Amazon VPC en una cuenta central. Las cuentas de negociación y de analítica necesitan usarlas sin que copiemos la red en cada una. ¿Cómo lo hacemos?',
      topicSlug: 'gobierno-multicuenta',
      examTasks: ['2.2'],
      options: [
        {
          id: 'copy-subnets',
          label: 'Crear subredes iguales en cada cuenta',
          definition:
            'Estrategia de duplicar los mismos recursos de red en todas las cuentas que los necesitan.',
          explanation:
            'Duplicar la red en cada cuenta es justo lo que quieren evitar: más trabajo y más configuraciones que mantener alineadas.',
          correct: false,
        },
        {
          id: 'scp-share',
          label: 'Una SCP que permita a las demás cuentas usar las subredes',
          definition:
            'Política de control de servicios que fija el máximo de permisos disponibles en las cuentas miembro.',
          explanation:
            'Una SCP solo limita permisos; no comparte recursos entre cuentas.',
          correct: false,
        },
        {
          id: 'ram-subnets',
          label: 'Compartir las subredes con AWS Resource Access Manager (AWS RAM)',
          definition:
            'Servicio para compartir recursos de forma segura entre cuentas, con una organización, con OUs o con cuentas específicas.',
          explanation:
            'Con RAM la cuenta de redes crea las subredes una vez y las comparte; las demás cuentas las usan, y la cuenta central conserva la propiedad.',
          correct: true,
        },
        {
          id: 'identity-center-share',
          label: 'AWS IAM Identity Center',
          definition:
            'Servicio para dar a las personas acceso a varias cuentas y aplicaciones con un solo inicio de sesión.',
          explanation:
            'Identity Center gestiona el acceso de las personas a las cuentas, no comparte recursos de red entre cuentas.',
          correct: false,
        },
      ],
    },
  ],
};
