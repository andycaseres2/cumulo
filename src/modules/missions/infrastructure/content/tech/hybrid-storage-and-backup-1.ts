import type { Mission } from '../../../domain/Mission';

/**
 * Taller Maker 3D: a 3D printing workshop in Córdoba (Argentina) whose local servers are full and whose backups live on tapes.
 * Practices the AWS Storage Gateway types (S3 File Gateway, Tape Gateway, Volume Gateway) and AWS Elastic Disaster Recovery.
 */
export const hybridStorageAndBackup1: Mission = {
  id: 'hybrid-storage-and-backup-1',
  track: 'tech',
  topicSlug: 'hybrid-storage-and-backup',
  buildingId: 'maker-workshop',
  title: 'El taller que no cabe en el sótano',
  client: { name: 'Joaquín Ferreyra', role: 'Dueño del Taller Maker 3D' },
  intro: [
    '¡Te damos la bienvenida al taller! Cuidado con esa impresora, está a mitad de una pieza. Soy Joaquín Ferreyra, dueño del Taller Maker 3D. Empecé en un garaje de Córdoba y hoy imprimimos repuestos y prototipos para fábricas de toda la provincia.',
    'Los diseños de los clientes son archivos enormes, y nuestros servidores locales ya no dan más. No quiero tirar lo que tenemos ni cambiarle la forma de trabajar a mi equipo.',
    'Además, los respaldos los hacemos en cintas que me llevo a casa cada viernes, y el servidor de pedidos está en el mismo cuarto que las impresoras. Si hay un incendio, se acaba el negocio.',
    'Quiero usar AWS como extensión del taller, sin dejar de trabajar aquí. ¿Me ayudas a decidir qué usar en cada caso?',
  ],
  outro: {
    passed: [
      '¡Genial! Los diseños se guardan en S3 sin que el equipo note la diferencia, las cintas ahora son virtuales y el arreglo de discos del render tiene espacio de sobra en la nube.',
      'Y si el cuarto de servidores sufre un desastre, el sistema de pedidos arranca en AWS en minutos. Gracias: tu primera pieza impresa corre por cuenta de la casa.',
    ],
    failed: [
      'Mmm... con este plan creo que seguiríamos sin espacio, o peor, sin respaldo el día que más lo necesitemos. Algunas decisiones no me convencen.',
      'Repasa la teoría de almacenamiento híbrido y respaldo, y vuelve cuando quieras. Las impresoras no paran, así que aquí estaremos.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'design-shares',
      prompt:
        'Primero, los diseños. Mi equipo los guarda en carpetas compartidas por NFS del servidor del taller. Quiero que sigan trabajando igual, que los archivos queden guardados en Amazon S3 y que los más usados respondan rápido aquí. ¿Qué usamos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'shares-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta cintas virtuales al software de respaldo y guarda los datos en Amazon S3 o S3 Glacier.',
          explanation:
            'Tape Gateway reemplaza cintas de respaldo; no presenta carpetas compartidas. Para archivos de trabajo diario se usa S3 File Gateway.',
          correct: false,
        },
        {
          id: 'shares-s3-file-gateway',
          label: 'Amazon S3 File Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta recursos compartidos de archivos NFS o SMB y guarda los archivos como objetos en Amazon S3.',
          explanation:
            'El equipo sigue usando sus carpetas NFS de siempre, los archivos se guardan como objetos en S3 y los más usados quedan en la caché local del taller para acceder con baja latencia.',
          correct: true,
        },
        {
          id: 'shares-volume-gateway',
          label: 'Volume Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta volúmenes de almacenamiento en bloques por iSCSI a los servidores locales.',
          explanation:
            'Volume Gateway entrega volúmenes de bloques por iSCSI, no carpetas compartidas por NFS. El equipo de Joaquín trabaja con archivos.',
          correct: false,
        },
        {
          id: 'shares-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio que replica continuamente servidores de origen hacia AWS para lanzarlos como instancias de recuperación en minutos.',
          explanation:
            'Elastic Disaster Recovery prepara la recuperación de servidores completos ante un desastre. No convierte a S3 en el almacenamiento diario de las carpetas del taller.',
          correct: false,
        },
      ],
    },
    {
      id: 'backup-tapes',
      prompt:
        'Ahora, los respaldos. Nuestro software de respaldo solo sabe escribir en cintas, y no quiero cambiarlo, pero estoy cansado de cargar cintas físicas a mi casa cada viernes. ¿Qué hacemos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'tapes-s3-file-gateway',
          label: 'Amazon S3 File Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta recursos compartidos de archivos NFS o SMB respaldados por Amazon S3.',
          explanation:
            'S3 File Gateway presenta carpetas de archivos, no cintas. El software de respaldo de Joaquín solo sabe escribir en cintas y no lo quiere cambiar.',
          correct: false,
        },
        {
          id: 'tapes-fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'Sistema de archivos compartido totalmente administrado, construido sobre Windows Server, con protocolo SMB.',
          explanation:
            'FSx for Windows File Server ofrece carpetas compartidas de Windows en AWS. No reemplaza las cintas que usa el software de respaldo del taller.',
          correct: false,
        },
        {
          id: 'tapes-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta cintas virtuales al software de respaldo existente y guarda los datos en Amazon S3 o S3 Glacier.',
          explanation:
            'El software de respaldo sigue escribiendo en cintas, solo que ahora son virtuales y sus datos quedan en AWS. Joaquín deja de cargar cintas físicas sin cambiar su flujo de respaldo.',
          correct: true,
        },
        {
          id: 'tapes-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio que mantiene servidores replicados en un área de preparación en AWS, listos para lanzarse ante un desastre.',
          explanation:
            'Elastic Disaster Recovery replica servidores para recuperarlos en minutos, pero no reemplaza las cintas que usa el software de respaldo.',
          correct: false,
        },
      ],
    },
    {
      id: 'orders-server',
      prompt:
        'El servidor de pedidos es lo que más me preocupa. Si hay un incendio en el taller, necesito tenerlo funcionando en AWS en minutos y con los datos más recientes, y después volver aquí cuando reparemos todo. ¿Qué usamos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'orders-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio que replica continuamente servidores on-premises o en la nube hacia un área de preparación en AWS, con simulacros, recuperación en minutos y failback.',
          explanation:
            'Mantiene el servidor de pedidos replicado de forma continua. Ante un incendio, Joaquín lanza la instancia de recuperación en minutos con el estado más reciente, y luego hace failback al taller.',
          correct: true,
        },
        {
          id: 'orders-aws-backup',
          label: 'AWS Backup',
          definition:
            'Servicio administrado para centralizar y automatizar respaldos con planes, bóvedas y políticas de retención.',
          explanation:
            'AWS Backup guarda copias para restaurar datos. Joaquín necesita algo distinto: el servidor completo listo para arrancar en AWS en minutos, con poco tiempo de inactividad.',
          correct: false,
        },
        {
          id: 'orders-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'Tipo de AWS Storage Gateway que reemplaza las cintas físicas de respaldo por cintas virtuales guardadas en AWS.',
          explanation:
            'Tener los respaldos en cintas virtuales no deja al servidor de pedidos funcionando en AWS en minutos. Es una herramienta de respaldo, no de recuperación de servidores.',
          correct: false,
        },
        {
          id: 'orders-fsx-openzfs',
          label: 'Amazon FSx for OpenZFS',
          definition:
            'Sistema de archivos administrado construido sobre OpenZFS, al que se accede por NFS, pensado para migrar cargas que ya usan ZFS.',
          explanation:
            'FSx for OpenZFS es un servidor de archivos administrado. No replica el servidor de pedidos ni lo pone en marcha en AWS ante un desastre.',
          correct: false,
        },
      ],
    },
    {
      id: 'render-blocks',
      prompt:
        'Último: el servidor que prepara los modelos para imprimir usa un arreglo de discos conectado por iSCSI, como almacenamiento en bloques, y ya está lleno. Quiero extenderlo con la nube, manteniendo los datos más usados aquí. ¿Qué tipo de gateway usamos?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'render-s3-file-gateway',
          label: 'Amazon S3 File Gateway',
          definition:
            'Tipo de AWS Storage Gateway que expone recursos compartidos NFS o SMB y guarda los archivos en Amazon S3.',
          explanation:
            'S3 File Gateway presenta archivos por NFS o SMB. El servidor del taller necesita volúmenes de bloques por iSCSI, que no es lo que ofrece este tipo de gateway.',
          correct: false,
        },
        {
          id: 'render-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta cintas virtuales para el software de respaldo.',
          explanation:
            'Tape Gateway sirve para respaldos en cintas virtuales. El servidor de modelos necesita discos de bloques para trabajar a diario, no cintas.',
          correct: false,
        },
        {
          id: 'render-fsx-file-gateway',
          label: 'Amazon FSx File Gateway',
          definition:
            'Tipo de AWS Storage Gateway que da acceso local con caché a recursos compartidos de FSx for Windows File Server.',
          explanation:
            'FSx File Gateway ya no está disponible para nuevos clientes, y además trabaja con carpetas compartidas de Windows, no con volúmenes de bloques por iSCSI.',
          correct: false,
        },
        {
          id: 'render-volume-gateway',
          label: 'Volume Gateway',
          definition:
            'Tipo de AWS Storage Gateway que presenta volúmenes de bloques por iSCSI a los servidores locales, en arquitectura cached o stored, con los datos guardados en Amazon S3.',
          explanation:
            'Es el gateway para extender el almacenamiento de bloques local: el servidor sigue viendo volúmenes iSCSI, los datos se guardan en AWS y los más usados quedan en caché en el taller.',
          correct: true,
        },
      ],
    },
  ],
};
