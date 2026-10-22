import type { Mission } from '../../../domain/Mission';

/**
 * Electrónica Volta: an electronics retail chain in Guayaquil that already runs on AWS and fears a ransomware attack on its backups.
 * Practices Amazon FSx for Windows File Server and AWS Backup (backup plans with tags, Vault Lock, cross-Region and cross-account copies).
 */
export const hybridStorageAndBackup2: Mission = {
  id: 'hybrid-storage-and-backup-2',
  track: 'tech',
  topicSlug: 'hybrid-storage-and-backup',
  buildingId: 'electronics-store',
  title: 'Respaldos a prueba de secuestro',
  client: { name: 'Rosa Villacís', role: 'Gerenta de Operaciones de Electrónica Volta' },
  intro: [
    'Hola, pasa. Soy Rosa Villacís, gerenta de operaciones de Electrónica Volta. Empezamos con una tienda de repuestos en Guayaquil y hoy tenemos doce locales en la costa ecuatoriana.',
    'La tienda en línea ya corre en AWS, con servidores en Amazon EC2, la base de datos en Amazon RDS y el carrito en Amazon DynamoDB. Pero en la oficina seguimos con un viejo servidor de archivos Windows.',
    'El mes pasado, un ransomware secuestró los datos de una cadena competidora, y también borró sus respaldos. Pagaron una fortuna y estuvieron cerrados una semana.',
    'Hoy cada servicio se respalda con un script distinto que escribió alguien que ya no trabaja aquí. No quiero ser la próxima noticia. ¿Me ayudas a ordenar esto?',
  ],
  outro: {
    passed: [
      '¡Qué alivio! Las carpetas de la oficina viven en FSx, todos los respaldos siguen un mismo plan y nadie, ni siquiera yo, puede borrarlos antes de tiempo.',
      'Y si toda una Región tuviera problemas, tenemos copias en otra Región y en otra cuenta. Gracias: en Volta siempre tendrás descuento de amigo.',
    ],
    failed: [
      'Mmm... con este plan, si nos ataca un ransomware, creo que perderíamos los respaldos igual que la competencia. Algunas decisiones me preocupan.',
      'Repasa la teoría de almacenamiento híbrido y respaldo, y vuelve cuando quieras. Te espero con los planos de la red listos.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'office-file-server',
      prompt:
        'Empecemos por la oficina. Tenemos un servidor de archivos Windows con carpetas compartidas por SMB, y los permisos se manejan con Active Directory. Quiero llevarlo por completo a AWS sin que los empleados cambien su forma de trabajar. ¿Qué usamos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'office-efs',
          label: 'Amazon EFS',
          definition:
            'Sistema de archivos NFS elástico y sin servidor que pueden montar muchas instancias a la vez.',
          explanation:
            'Elegir EFS para carpetas compartidas de Windows es una trampa típica: EFS usa NFS y no es compatible con instancias EC2 basadas en Windows.',
          correct: false,
        },
        {
          id: 'office-fsx-lustre',
          label: 'Amazon FSx for Lustre',
          definition:
            'Sistema de archivos administrado de alto rendimiento construido sobre Lustre, pensado para cómputo de alto rendimiento (HPC).',
          explanation:
            'FSx for Lustre está pensado para cómputo de alto rendimiento, no para las carpetas de Windows de una oficina. Además, aparece en la lista de servicios fuera del alcance del examen.',
          correct: false,
        },
        {
          id: 'office-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta cintas virtuales al software de respaldo y guarda los datos en AWS.',
          explanation:
            'Tape Gateway reemplaza cintas de respaldo. No ofrece las carpetas compartidas de Windows que usan los empleados cada día.',
          correct: false,
        },
        {
          id: 'office-fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'Sistema de archivos compartido totalmente administrado, construido sobre Windows Server, con protocolo SMB e integración con Microsoft Active Directory.',
          explanation:
            'Windows, SMB y Active Directory apuntan a FSx for Windows File Server. AWS administra el hardware, los parches y los respaldos, y los empleados siguen viendo sus carpetas de siempre.',
          correct: true,
        },
      ],
    },
    {
      id: 'central-backup-plan',
      prompt:
        'Ahora, los respaldos. EC2, RDS, DynamoDB y los nuevos archivos en FSx tienen cada uno su propio script, y nadie sabe si todos funcionan. Quiero una sola política que diga cuándo respaldar y cuánto tiempo guardar, aplicada a los recursos por etiquetas. ¿Qué usamos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'plan-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio que replica continuamente servidores hacia un área de preparación en AWS para recuperarlos en minutos.',
          explanation:
            'Elastic Disaster Recovery mantiene servidores listos para arrancar ante un desastre. No define políticas centralizadas de respaldo y retención para RDS, DynamoDB y FSx.',
          correct: false,
        },
        {
          id: 'plan-aws-backup',
          label: 'AWS Backup, con backup plans asignados por etiquetas',
          definition:
            'Servicio administrado para centralizar y automatizar la protección de datos en servicios de AWS, en la nube y on-premises, mediante planes de respaldo.',
          explanation:
            'Un backup plan define cuándo respaldar, cuánto retener y a dónde copiar, y se asigna a los recursos por etiquetas. AWS Backup es compatible con EC2, RDS, DynamoDB y FSx, entre otros.',
          correct: true,
        },
        {
          id: 'plan-volume-gateway',
          label: 'Volume Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta volúmenes de bloques por iSCSI a servidores on-premises.',
          explanation:
            'Volume Gateway extiende el almacenamiento de bloques de un centro de datos. No centraliza los respaldos de servicios que ya corren en AWS.',
          correct: false,
        },
        {
          id: 'plan-more-scripts',
          label: 'Un script nuevo por servicio, programado en un servidor aparte',
          definition:
            'Enfoque en el que cada equipo escribe y programa su propio código de respaldo para cada servicio.',
          explanation:
            'Es justo el problema actual: respaldos dispersos que nadie audita. La idea de un servicio centralizado es reemplazar esos scripts por políticas en un solo lugar.',
          correct: false,
        },
      ],
    },
    {
      id: 'ransomware-lock',
      prompt:
        'Lo que más miedo me da: si un atacante roba la contraseña de un administrador, podría borrar los respaldos como le pasó a la competencia. Quiero que nadie, ni siquiera nosotros, pueda borrarlos ni acortar su retención. ¿Qué activamos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'lock-vault-lock',
          label: 'AWS Backup Vault Lock en modo compliance en la bóveda de respaldos',
          definition:
            'Función de AWS Backup que aplica un modelo write-once-read-many a una bóveda, para impedir que se borren los respaldos o se cambie su retención antes de tiempo.',
          explanation:
            'En modo compliance, Vault Lock impide que alguien, incluido el usuario raíz de la cuenta, borre los respaldos o acorte su retención. Aunque roben la contraseña de un administrador, los respaldos siguen ahí.',
          correct: true,
        },
        {
          id: 'lock-cold-lifecycle',
          label: 'Una regla de lifecycle que mueva los respaldos a almacenamiento frío',
          definition:
            'Regla que pasa los respaldos a un almacenamiento más barato después de cierto tiempo.',
          explanation:
            'Mover los respaldos a almacenamiento frío ahorra dinero, pero no impide que un administrador con permisos los borre.',
          correct: false,
        },
        {
          id: 'lock-tags',
          label: 'Etiquetar todos los recursos con "no-borrar"',
          definition:
            'Las etiquetas (tags) son pares clave-valor que se asignan a los recursos para organizarlos o seleccionarlos.',
          explanation:
            'Una etiqueta por sí sola no protege nada: sirve para organizar o para asignar recursos a un plan, pero no impide que alguien borre un respaldo.',
          correct: false,
        },
        {
          id: 'lock-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio de recuperación que replica servidores de forma continua y permite lanzarlos en AWS en minutos.',
          explanation:
            'Elastic Disaster Recovery ayuda a recuperar servidores, pero no es el mecanismo que bloquea el borrado de los respaldos guardados en una bóveda.',
          correct: false,
        },
      ],
    },
    {
      id: 'copies-elsewhere',
      prompt:
        'Último: mi jefe pregunta qué pasa si toda la Región de AWS que usamos tuviera un problema, o si alguien comprometiera nuestra cuenta principal. Quiere respaldos en otro lugar. ¿Qué configuramos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'copies-one-zone',
          label: 'Guardar una segunda copia de los respaldos en S3 One Zone-IA',
          definition:
            'Clase de Amazon S3 para acceso poco frecuente que guarda los datos en una sola Availability Zone.',
          explanation:
            'One Zone-IA guarda los datos en una sola zona de la misma Región. Si toda la Región tuviera un problema, esa copia estaría igual de afectada.',
          correct: false,
        },
        {
          id: 'copies-ebs-volume',
          label: 'Un volumen EBS adicional con los respaldos, en la misma Availability Zone',
          definition:
            'Volumen de almacenamiento en bloques persistente que se adjunta a una instancia de su misma Availability Zone.',
          explanation:
            'Un volumen en la misma zona y en la misma cuenta no protege contra un problema regional ni contra una cuenta comprometida.',
          correct: false,
        },
        {
          id: 'copies-cross-region-account',
          label: 'Copias entre Regiones y entre cuentas de AWS Organizations en el plan de AWS Backup',
          definition:
            'Función de AWS Backup que copia los respaldos a otra Región y a otra cuenta de la organización, para continuidad del negocio y cumplimiento.',
          explanation:
            'Con copias en otra Región, un problema regional no se lleva los respaldos; con copias en otra cuenta de la organización, tampoco se pierden si alguien compromete la cuenta principal.',
          correct: true,
        },
        {
          id: 'copies-fsx-file-gateway',
          label: 'Amazon FSx File Gateway',
          definition:
            'Tipo de AWS Storage Gateway que da acceso local con caché a recursos compartidos de FSx for Windows File Server.',
          explanation:
            'FSx File Gateway ya no está disponible para nuevos clientes, y su función es dar acceso local a carpetas de FSx, no copiar respaldos a otra Región o cuenta.',
          correct: false,
        },
      ],
    },
  ],
};
