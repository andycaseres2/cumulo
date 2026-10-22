import type { Mission } from '../../../domain/Mission';

/**
 * Ferreira & Olivera Auditores: an audit firm in Montevideo storing working papers in Amazon S3.
 * Practices IAM roles for workloads, customer managed policies, explicit and implicit deny, and last accessed information.
 */
export const iamFundamentos2: Mission = {
  id: 'iam-fundamentos-2',
  track: 'financiero',
  topicSlug: 'iam-fundamentos',
  buildingId: 'auditores-asociados',
  title: 'Permisos bajo auditoría',
  client: { name: 'Lucía Ferreira', role: 'Socia de tecnología de Ferreira & Olivera Auditores' },
  intro: [
    'Adelante, toma asiento. Soy Lucía Ferreira, socia de tecnología de Ferreira & Olivera Auditores. Desde estas oficinas en Montevideo auditamos a bancos y cooperativas de todo Uruguay.',
    'Guardamos los papeles de trabajo de cada auditoría en Amazon S3, y una aplicación en Amazon EC2 genera los informes finales. Todo funciona, pero los permisos crecieron sin orden.',
    'Lo irónico es que ahora un cliente quiere auditarnos a nosotros. Va a revisar quién puede leer, cambiar o borrar esos papeles, y hoy no sabría justificar la mitad de los permisos.',
    'Una firma de auditoría con permisos desordenados pierde clientes muy rápido. ¿Me ayudas a ponerlos en regla?',
  ],
  outro: {
    passed: [
      'Excelente trabajo. La aplicación usa un rol, los permisos están hechos a la medida y los papeles archivados no se pueden borrar.',
      'Por primera vez puedo explicar cada permiso con un argumento. Si algún día quieres cambiar de rubro, en esta firma siempre hay lugar para alguien tan ordenado.',
    ],
    failed: [
      'Mmm... si el cliente revisa estos permisos, el informe nos va a salir con varias observaciones.',
      'Repasa la teoría de IAM con calma y vuelve. Los papeles de trabajo te esperan.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ec2-app-access',
      prompt:
        'La aplicación de informes en Amazon EC2 lee los papeles de trabajo de S3. Hoy lo hace con unas access keys guardadas en un archivo de configuración del servidor. ¿Qué debería usar?',
      topicSlug: 'iam-fundamentos',
      examTasks: ['2.3'],
      options: [
        {
          id: 'iam-user-keys',
          label: 'Un usuario de IAM exclusivo para la app, con sus propias access keys',
          definition:
            'Identidad de IAM con credenciales de largo plazo, formadas por un access key ID y una secret access key, para acceso programático.',
          explanation:
            'Seguirían siendo credenciales de largo plazo guardadas en el servidor. Es justo lo que se quiere evitar para una aplicación en EC2.',
          correct: false,
        },
        {
          id: 'instance-role',
          label: 'Un rol de IAM asignado a la instancia',
          definition:
            'Identidad con permisos que asume quien la necesita y que entrega credenciales temporales por sesión, sin credenciales de largo plazo.',
          explanation:
            'Con un rol asignado a la instancia, la aplicación obtiene credenciales temporales para leer de S3 sin guardar claves en ningún archivo.',
          correct: true,
        },
        {
          id: 'auditors-group',
          label: 'Un grupo de IAM llamado "aplicaciones" con permisos de lectura',
          definition:
            'Colección de usuarios de IAM que sirve para asignarles permisos a todos a la vez; no tiene credenciales propias.',
          explanation:
            'Un grupo no tiene credenciales que la instancia pueda usar. Solo sirve para dar permisos a usuarios de IAM.',
          correct: false,
        },
        {
          id: 'bucket-policy-group',
          label: 'Una bucket policy que nombre a ese grupo como Principal',
          definition:
            'Política basada en recursos que se adjunta a un bucket de Amazon S3 y define quién puede acceder a él.',
          explanation:
            'Un grupo no puede ser Principal en una política, porque los grupos asignan permisos y no se autentican. Además, la app seguiría sin credenciales.',
          correct: false,
        },
      ],
    },
    {
      id: 'trim-readonly',
      prompt:
        'Los auditores junior tienen la política ReadOnlyAccess, administrada por AWS. Les da lectura en todos los servicios, y solo necesitan leer los papeles de S3. ¿Cómo la ajustamos?',
      topicSlug: 'iam-fundamentos',
      examTasks: ['2.3'],
      options: [
        {
          id: 'edit-aws-managed',
          label: 'Editar ReadOnlyAccess en la consola y quitarle los servicios que sobran',
          definition:
            'Las políticas administradas por AWS son creadas y mantenidas por AWS, y AWS las actualiza, por ejemplo, cuando lanza un servicio nuevo.',
          explanation:
            'Las políticas administradas por AWS no se pueden editar. Hay que crear una política propia para recortar permisos.',
          correct: false,
        },
        {
          id: 'add-power-user',
          label: 'Cambiarla por PowerUserAccess, que limita el acceso a IAM',
          definition:
            'Política de función laboral administrada por AWS que da acceso total a los servicios, pero acceso limitado a IAM y a AWS Organizations.',
          explanation:
            'PowerUserAccess da muchos más permisos que solo lectura. Va en la dirección contraria al mínimo privilegio.',
          correct: false,
        },
        {
          id: 'inline-per-junior',
          label: 'Escribir una política en línea distinta dentro de cada auditor junior',
          definition:
            'Política que vive dentro de una sola identidad, en relación uno a uno, y se borra junto con ella.',
          explanation:
            'Una política en línea no se reutiliza: habría que repetirla en cada auditor y mantener cada copia por separado.',
          correct: false,
        },
        {
          id: 'customer-managed',
          label: 'Copiarla en una política administrada por el cliente y dejar solo la lectura de S3',
          definition:
            'Política personalizada que escribe el cliente para su caso exacto, que puede editar y adjuntar a varias identidades.',
          explanation:
            'La buena práctica es partir de la política de AWS, copiarla en una política administrada por el cliente y recortarla. Se reutiliza en todos los junior y cada cambio les aplica a todos.',
          correct: true,
        },
      ],
    },
    {
      id: 'archive-delete',
      prompt:
        'Los gerentes tienen una política que permite todas las acciones de S3, y agregamos otra que deniega explícitamente borrar objetos del bucket de auditorías cerradas. Si un gerente intenta borrar un papel archivado, ¿qué pasa?',
      topicSlug: 'iam-fundamentos',
      examTasks: ['2.3'],
      options: [
        {
          id: 'deny-wins',
          label: 'Se deniega, porque la denegación explícita gana sobre cualquier Allow',
          definition:
            'Regla de evaluación de políticas de IAM: un Deny explícito prevalece sobre todos los Allow que apliquen a la misma solicitud.',
          explanation:
            'Una denegación explícita siempre gana. Aunque la otra política permita todo S3, el gerente no puede borrar papeles del bucket de auditorías cerradas.',
          correct: true,
        },
        {
          id: 'allow-wins',
          label: 'Se permite, porque la política con más permisos tiene prioridad',
          definition:
            'Idea de que, ante políticas en conflicto, se aplica la que otorga el permiso más amplio.',
          explanation:
            'Es la trampa típica del examen: un Allow no anula un Deny. La denegación explícita es la que decide.',
          correct: false,
        },
        {
          id: 'newest-wins',
          label: 'Se permite o no según cuál política se adjuntó al último',
          definition:
            'Idea de que el orden en que se adjuntan las políticas a una identidad cambia el resultado de la evaluación.',
          explanation:
            'La evaluación no depende del orden en que se adjuntaron las políticas. El Deny explícito decide el resultado.',
          correct: false,
        },
        {
          id: 'mfa-decides',
          label: 'Se permite si el gerente inició sesión con MFA',
          definition:
            'Autenticación multifactor: un segundo factor, además de la contraseña, para iniciar sesión.',
          explanation:
            'MFA protege el inicio de sesión, pero no anula un Deny explícito. El borrado se deniega con MFA o sin ella.',
          correct: false,
        },
      ],
    },
    {
      id: 'unused-permissions',
      prompt:
        'Por último, el rol de la aplicación de informes tiene permisos sobre varios servicios que sospecho que nunca usa. ¿Cómo lo compruebo antes de quitárselos?',
      topicSlug: 'iam-fundamentos',
      examTasks: ['2.3'],
      options: [
        {
          id: 'require-mfa-role',
          label: 'Exigir MFA para usar el rol',
          definition:
            'Condición que obliga a presentar un segundo factor de autenticación antes de usar ciertas credenciales.',
          explanation:
            'MFA refuerza la autenticación, pero no muestra qué servicios usa o no usa el rol.',
          correct: false,
        },
        {
          id: 'move-to-inline',
          label: 'Convertir los permisos del rol en una política en línea',
          definition:
            'Cambio en la forma de adjuntar los permisos: de una política reutilizable a una que vive dentro de una sola identidad.',
          explanation:
            'Una política en línea cambia cómo se adjuntan los permisos, no informa cuáles se usan.',
          correct: false,
        },
        {
          id: 'last-accessed',
          label: 'Revisar la información de último acceso de IAM',
          definition:
            'Datos de IAM que muestran cuándo una identidad usó por última vez los servicios que tiene permitidos y, en muchos de ellos, cada acción.',
          explanation:
            'La información de último acceso muestra qué servicios y acciones no se usan, para quitarlos y aplicar el mínimo privilegio con evidencia.',
          correct: true,
        },
        {
          id: 'admin-access',
          label: 'Adjuntar AdministratorAccess y ver qué falla al quitarla',
          definition:
            'Política de función laboral administrada por AWS que da acceso total, incluido IAM, pensada para administradores.',
          explanation:
            'Dar acceso total "por si acaso" contradice el mínimo privilegio y no dice qué servicios usa realmente el rol.',
          correct: false,
        },
      ],
    },
  ],
};
