import type { Mission } from '../../../domain/Mission';

/**
 * Estudio de Juegos Cóndor: an indie game studio in Valparaíso launching its first online game on AWS.
 * Practices choosing between Amazon S3, Amazon EBS, Amazon EFS and the EC2 instance store.
 */
export const s3EbsEfsStorage1: Mission = {
  id: 's3-ebs-efs-storage-1',
  track: 'tech',
  topicSlug: 's3-ebs-efs-storage',
  buildingId: 'game-studio',
  title: 'Cuatro discos para un juego',
  client: { name: 'Matías Rojas', role: 'Director técnico del Estudio de Juegos Cóndor' },
  intro: [
    '¡Hola! Pasa, perdona el desorden de cables. Soy Matías Rojas, director técnico del Estudio de Juegos Cóndor. Somos quince personas en Valparaíso haciendo nuestro primer juego en línea.',
    'Lanzamos en tres meses y vamos a montar todo en AWS: los instaladores del juego, los servidores donde compilamos las versiones y la base de datos de las partidas de los jugadores.',
    'El problema es que cada programador guarda las cosas donde puede. Ayer se detuvo el servidor de la base de datos y perdimos partidas que creíamos seguras. Ya no sé qué va en cada tipo de almacenamiento.',
    'Si el día del lanzamiento algo se pierde o no carga, los jugadores no nos dan una segunda oportunidad. ¿Me ayudas a decidir dónde va cada cosa?',
  ],
  outro: {
    passed: [
      '¡Esto es otra cosa! Los instaladores se descargan desde S3, los servidores de compilación comparten los recursos en EFS, la base de datos tiene su disco EBS y la caché vive en el instance store.',
      'Ahora cada dato está en el almacenamiento que le corresponde. Gracias: cuando salga el juego, tu nombre va en los créditos.',
    ],
    failed: [
      'Mmm... con este plan creo que el día del lanzamiento algo se nos va a perder o no va a cargar. Hay decisiones que no me convencen.',
      'Repasa la teoría de S3, EBS y EFS con calma y vuelve cuando quieras. El estudio te sigue esperando con café y prototipos.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'game-installers',
      prompt:
        'Empecemos por lo que ven los jugadores: el instalador del juego y sus parches pesan varios GB, y miles de personas los van a descargar por internet desde la web. ¿Dónde los guardamos?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'installers-ebs',
          label: 'En un volumen de Amazon EBS adjunto a un servidor web',
          definition:
            'Volumen de almacenamiento en bloques que se adjunta a una instancia de Amazon EC2 y se usa como su disco duro.',
          explanation:
            'Un volumen EBS es el disco de una instancia en una sola Availability Zone. Para archivos que miles de personas descargan por internet, el estudio tendría que operar ese servidor sin necesitarlo.',
          correct: false,
        },
        {
          id: 'installers-efs',
          label: 'En un sistema de archivos de Amazon EFS',
          definition:
            'Almacenamiento de archivos sin servidor que se monta por NFS desde muchas instancias y crece y se reduce automáticamente.',
          explanation:
            'EFS sirve para carpetas compartidas que montan los servidores. Los jugadores no montan un sistema de archivos NFS: descargan archivos por internet.',
          correct: false,
        },
        {
          id: 'installers-instance-store',
          label: 'En el instance store de una instancia de Amazon EC2',
          definition:
            'Almacenamiento en bloques temporal, en discos conectados físicamente al servidor host donde corre la instancia.',
          explanation:
            'Los datos del instance store se pierden si la instancia se detiene o termina. No es el lugar para los instaladores que todos los jugadores necesitan descargar.',
          correct: false,
        },
        {
          id: 'installers-s3',
          label: 'En un bucket de Amazon S3',
          definition:
            'Almacenamiento de objetos: archivos con sus metadatos guardados en buckets y accesibles por una API y URLs.',
          explanation:
            'Los archivos que se descargan por internet son un caso típico de almacenamiento de objetos. S3 se paga por uso, sin reservar capacidad, y está diseñado para once nueves de durabilidad.',
          correct: true,
        },
      ],
    },
    {
      id: 'shared-assets',
      prompt:
        'Ahora, los servidores de compilación. Tenemos ocho instancias EC2 con Linux, y todas necesitan leer y escribir a la vez en la misma carpeta de texturas y modelos. Esa carpeta crece cada semana. ¿Qué usamos?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'assets-efs',
          label: 'Amazon EFS, montado por NFS en las ocho instancias',
          definition:
            'Sistema de archivos sin servidor que se monta por NFS, permite acceso paralelo desde muchas instancias y crece y se reduce automáticamente.',
          explanation:
            'Es el caso de la carpeta compartida: las ocho instancias Linux la montan a la vez, y como EFS crece solo, el estudio no tiene que aprovisionar capacidad cada vez que sube texturas nuevas.',
          correct: true,
        },
        {
          id: 'assets-ebs',
          label: 'Un volumen de Amazon EBS adjunto a las ocho instancias',
          definition:
            'Volumen de almacenamiento en bloques que funciona como disco duro de una instancia de EC2 dentro de una Availability Zone.',
          explanation:
            'Por lo general un volumen EBS se adjunta a una sola instancia, y solo algunos tipos admiten Multi-Attach. Elegir EBS para compartir archivos entre muchas instancias es una trampa típica.',
          correct: false,
        },
        {
          id: 'assets-instance-store',
          label: 'El instance store de cada servidor de compilación',
          definition:
            'Discos temporales conectados físicamente al host de una instancia, incluidos en el precio de la instancia.',
          explanation:
            'El instance store no se comparte entre instancias y se pierde al detenerlas. Cada servidor tendría su propia copia y nadie vería los cambios de los demás.',
          correct: false,
        },
        {
          id: 'assets-s3-mounted',
          label: 'Un bucket de Amazon S3 montado como disco del sistema operativo',
          definition:
            'Almacenamiento de objetos en buckets al que las aplicaciones acceden mediante una API y URLs.',
          explanation:
            'S3 es almacenamiento de objetos accesible por API; no se monta como disco del sistema operativo. Para una carpeta que muchos servidores montan, la respuesta es EFS.',
          correct: false,
        },
      ],
    },
    {
      id: 'database-disk',
      prompt:
        'La base de datos con las partidas de los jugadores corre en una instancia EC2 en una Availability Zone. Ayer perdimos datos cuando un servidor se detuvo. ¿Qué disco le damos para que los datos persistan?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'db-instance-store',
          label: 'El instance store de la instancia, porque es el disco más cercano al host',
          definition:
            'Almacenamiento en bloques temporal en discos del servidor host; los datos sobreviven a un reinicio de la instancia.',
          explanation:
            'Justo eso les pasó ayer: los datos del instance store se pierden cuando la instancia se detiene, hiberna o termina. No sirve para las partidas de los jugadores.',
          correct: false,
        },
        {
          id: 'db-ebs-same-az',
          label: 'Un volumen de Amazon EBS en la misma Availability Zone que la instancia',
          definition:
            'Volumen de almacenamiento en bloques persistente que se adjunta a una instancia de EC2 de su misma Availability Zone.',
          explanation:
            'El disco de una base de datos es el caso típico de EBS: almacenamiento en bloques que persiste aunque la instancia se detenga y que se adjunta a la instancia como un disco duro.',
          correct: true,
        },
        {
          id: 'db-ebs-other-az',
          label: 'Un volumen de Amazon EBS creado en otra Availability Zone, para tenerlo separado',
          definition:
            'Volumen de almacenamiento en bloques que vive en una Availability Zone distinta de la que usa la instancia.',
          explanation:
            'Un volumen EBS solo se adjunta a instancias de su misma Availability Zone. Si lo crean en otra AZ, la base de datos no puede usarlo como disco.',
          correct: false,
        },
        {
          id: 'db-s3',
          label: 'Un bucket de Amazon S3 como disco de la base de datos',
          definition:
            'Servicio de almacenamiento de objetos con buckets privados por defecto y acceso mediante API.',
          explanation:
            'S3 guarda objetos y se accede por API; no se adjunta como disco del sistema operativo. Una base de datos en EC2 necesita almacenamiento en bloques.',
          correct: false,
        },
      ],
    },
    {
      id: 'shader-cache',
      prompt:
        'Última: al compilar, cada servidor genera una caché de shaders. Son datos temporales que se pueden volver a generar en cualquier momento, y no quiero pagar almacenamiento aparte por ellos. ¿Dónde la ponemos?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'cache-efs',
          label: 'En un sistema de archivos de Amazon EFS',
          definition:
            'Almacenamiento de archivos compartido por NFS, elástico y accesible por muchas instancias a la vez.',
          explanation:
            'EFS es para datos que varios servidores comparten. Aquí cada servidor genera su propia caché temporal, y EFS se paga aparte de la instancia.',
          correct: false,
        },
        {
          id: 'cache-s3',
          label: 'En un bucket de Amazon S3',
          definition:
            'Almacenamiento de objetos accesible por API y URLs, que se paga según lo que se guarda y se solicita.',
          explanation:
            'S3 se usa por API y se cobra por almacenamiento y solicitudes. Para una caché temporal que el servidor usa como disco local, no es la opción.',
          correct: false,
        },
        {
          id: 'cache-instance-store',
          label: 'En el instance store de cada servidor de compilación',
          definition:
            'Almacenamiento en bloques temporal en discos conectados físicamente al host, incluido en el precio de la instancia.',
          explanation:
            'Las cachés, los búferes y los datos temporales de trabajo son el uso típico del instance store. Si la caché se pierde al detener la instancia, se vuelve a generar. Ojo: solo algunos tipos de instancia lo incluyen.',
          correct: true,
        },
        {
          id: 'cache-ebs',
          label: 'En un volumen de Amazon EBS adicional para cada servidor',
          definition:
            'Volumen de almacenamiento en bloques persistente que se paga aparte según la capacidad aprovisionada.',
          explanation:
            'EBS da persistencia, que esta caché no necesita, y se paga aparte según lo aprovisionado. Matías pidió no pagar almacenamiento extra por datos que se regeneran.',
          correct: false,
        },
      ],
    },
  ],
};
