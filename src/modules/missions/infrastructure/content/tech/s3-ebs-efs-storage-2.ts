import type { Mission } from '../../../domain/Mission';

/**
 * Universidad Tecnológica: the IT office of a university in Asunción moving its course site, labs and enrollment system to AWS.
 * Practices S3 static websites, durability versus availability, EBS and its Availability Zone, and the EFS-on-Windows trap.
 */
export const s3EbsEfsStorage2: Mission = {
  id: 's3-ebs-efs-storage-2',
  track: 'tech',
  topicSlug: 's3-ebs-efs-storage',
  buildingId: 'university',
  title: 'Matrícula sin sobresaltos',
  client: { name: 'Lucía Cabrera', role: 'Directora de Tecnología de la Universidad Tecnológica' },
  intro: [
    'Buenas tardes, te damos la bienvenida al campus. Soy Lucía Cabrera, directora de Tecnología de la Universidad. Desde aquí, en Asunción, damos servicio a ocho mil estudiantes.',
    'El rectorado aprobó llevar nuestros sistemas a AWS: la web de los cursos, los laboratorios de informática y el sistema de matrículas. Mi equipo es pequeño y nunca trabajó con almacenamiento en la nube.',
    'Cada semana de matrícula, el servidor de la web se cae y los estudiantes llenan los pasillos reclamando. Y en el consejo universitario me hacen preguntas que todavía no sé responder.',
    'La próxima matrícula empieza en dos meses y quiero llegar con todo listo. ¿Me ayudas a elegir bien el almacenamiento?',
  ],
  outro: {
    passed: [
      '¡Perfecto! La web de los cursos se sirve desde S3, los laboratorios Windows tienen su carpeta compartida y el sistema de matrículas tiene su disco en la zona correcta.',
      'Y cuando el consejo me pregunte por los once nueves, ya sé qué responder. Gracias: aquí tienes una cátedra abierta cuando quieras.',
    ],
    failed: [
      'Mmm... con estas decisiones me temo que la próxima matrícula será igual de caótica. Algunas respuestas no me cierran.',
      'Repasa la teoría de S3, EBS y EFS con calma y vuelve cuando quieras. La universidad siempre tiene las puertas abiertas para quien quiere aprender.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'course-website',
      prompt:
        'Primero, la web de los cursos. Son solo páginas HTML, hojas de estilo e imágenes que no cambian según el usuario. No quiero mantener ningún servidor que se caiga en la matrícula. ¿Dónde la publicamos?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'site-efs',
          label: 'En Amazon EFS, montado por los servidores web',
          definition:
            'Sistema de archivos compartido por NFS que muchas instancias pueden montar a la vez y que crece de forma elástica.',
          explanation:
            'EFS sirve para que varios servidores compartan archivos, pero igual hacen falta servidores web delante. Lucía quiere dejar de mantener servidores.',
          correct: false,
        },
        {
          id: 'site-s3',
          label: 'Como sitio web estático en un bucket de Amazon S3',
          definition:
            'Almacenamiento de objetos en buckets, accesible por internet mediante una API y URLs, que se paga según el uso.',
          explanation:
            'Un sitio web estático de HTML, CSS e imágenes es un caso típico de S3: se sirve directamente desde un bucket, sin servidores que administrar.',
          correct: true,
        },
        {
          id: 'site-ebs',
          label: 'En un volumen de Amazon EBS de una instancia EC2 más grande',
          definition:
            'Volumen de almacenamiento en bloques que funciona como disco de una instancia de EC2 en una Availability Zone.',
          explanation:
            'Seguiría siendo un servidor que la universidad debe mantener y que puede caerse en la matrícula. El disco no es el problema: sobra el servidor.',
          correct: false,
        },
        {
          id: 'site-instance-store',
          label: 'En el instance store del servidor web actual',
          definition:
            'Almacenamiento en bloques temporal en discos del host físico donde corre una instancia de EC2.',
          explanation:
            'Los datos del instance store se pierden al detener o terminar la instancia, y además sigue haciendo falta un servidor. No resuelve nada de lo que pide Lucía.',
          correct: false,
        },
      ],
    },
    {
      id: 'eleven-nines',
      prompt:
        'En el consejo, un decano leyó que S3 Standard está diseñado para 99.999999999 % de durabilidad y concluyó que la web jamás estará fuera de línea. No estoy segura de que sea así. ¿Qué mide ese número?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'durability-not-losing',
          label: 'La durabilidad: qué tan protegidos están los objetos contra la pérdida',
          definition:
            'Distinción entre conservar los datos sin perderlos (durabilidad) y poder acceder a ellos cuando se necesitan (disponibilidad).',
          explanation:
            'Los once nueves hablan de no perder los objetos. La disponibilidad de S3 Standard es otro número, diseñado para 99.99 % en un año. Confundir ambos conceptos es una trampa típica.',
          correct: true,
        },
        {
          id: 'availability-always-online',
          label: 'La disponibilidad: el sitio estará en línea el 99.999999999 % del tiempo',
          definition:
            'Porcentaje del tiempo en que un servicio está en línea y responde a las solicitudes.',
          explanation:
            'Ese número no mide el tiempo en línea. Poder acceder a los objetos es la disponibilidad, y S3 Standard está diseñado para 99.99 % en un año.',
          correct: false,
        },
        {
          id: 'speed',
          label: 'La velocidad con la que S3 entrega cada archivo a los estudiantes',
          definition:
            'Rendimiento de un servicio de almacenamiento, medido como latencia o cantidad de datos entregados por segundo.',
          explanation:
            'La velocidad es una medida de rendimiento, no de durabilidad. Los once nueves no dicen nada sobre qué tan rápido se descarga un archivo.',
          correct: false,
        },
        {
          id: 'backup-other-region',
          label: 'Que S3 copia automáticamente cada objeto a otra Región como respaldo',
          definition:
            'Copia de los objetos de un bucket hacia una Región distinta de la original para tener un respaldo lejano.',
          explanation:
            'S3 Standard guarda los objetos de forma redundante en al menos tres Availability Zones dentro de una Región. Los once nueves no significan que se copien a otra Región.',
          correct: false,
        },
      ],
    },
    {
      id: 'enrollment-volume',
      prompt:
        'El sistema de matrículas corre en una instancia EC2 en una Availability Zone. Mi equipo creó un volumen de Amazon EBS para los datos, pero en otra Availability Zone, y no logra adjuntarlo. ¿Qué pasa?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'permissions-issue',
          label: 'Es un problema de permisos: falta darle acceso al equipo sobre el volumen',
          definition:
            'Situación en la que una identidad no puede realizar una acción porque sus políticas no la autorizan.',
          explanation:
            'Aunque el equipo tuviera todos los permisos, un volumen EBS solo se adjunta a instancias de su misma Availability Zone. El problema es la ubicación del volumen.',
          correct: false,
        },
        {
          id: 'use-multi-attach',
          label: 'Hay que activar Multi-Attach para que el volumen llegue a otra zona',
          definition:
            'Función de algunos tipos de volumen EBS que permite adjuntar un mismo volumen a varias instancias a la vez.',
          explanation:
            'Multi-Attach sirve para conectar un volumen a varias instancias, solo en algunos tipos de volumen e instancia. No cambia la regla de que volumen e instancia deben estar en la misma Availability Zone.',
          correct: false,
        },
        {
          id: 'same-az',
          label: 'El volumen y la instancia deben estar en la misma Availability Zone; hay que crear el volumen en la zona de la instancia',
          definition:
            'Regla de Amazon EBS según la cual un volumen solo se puede adjuntar a instancias ubicadas en su misma Availability Zone.',
          explanation:
            'EBS vive en una sola Availability Zone, y olvidarlo es una trampa típica del examen. El volumen de matrículas debe estar en la zona donde corre su instancia.',
          correct: true,
        },
        {
          id: 'use-instance-store',
          label: 'Hay que cambiarlo por el instance store, que funciona en cualquier zona',
          definition:
            'Almacenamiento en bloques temporal en los discos físicos del host donde corre la instancia.',
          explanation:
            'El instance store no se mueve entre instancias ni zonas, y sus datos se pierden al detener la instancia. Los datos de matrículas necesitan un volumen persistente.',
          correct: false,
        },
      ],
    },
    {
      id: 'windows-labs',
      prompt:
        'Último tema: los laboratorios de informática tienen servidores Windows, y los profesores quieren una carpeta compartida donde todos dejen material para sus clases. Un técnico propuso Amazon EFS. ¿Qué opinas?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'labs-efs',
          label: 'Amazon EFS, como propone el técnico',
          definition:
            'Sistema de archivos NFS elástico y sin servidor que pueden montar muchas instancias a la vez.',
          explanation:
            'Es la trampa típica: Amazon EFS no es compatible con instancias EC2 basadas en Windows. Para los laboratorios Windows hace falta otra opción.',
          correct: false,
        },
        {
          id: 'labs-ebs',
          label: 'Un volumen de Amazon EBS adjunto a un servidor del laboratorio',
          definition:
            'Volumen de almacenamiento en bloques que funciona como el disco duro de una instancia de EC2.',
          explanation:
            'Un volumen EBS es el disco de una instancia, normalmente de una sola. No es una carpeta compartida para todos los servidores del laboratorio.',
          correct: false,
        },
        {
          id: 'labs-s3',
          label: 'Un bucket de Amazon S3 montado como unidad de red',
          definition:
            'Almacenamiento de objetos en buckets, privado por defecto y accesible mediante una API y URLs.',
          explanation:
            'S3 se usa por API y URLs; no se monta como unidad de red de Windows. No es la carpeta compartida que piden los profesores.',
          correct: false,
        },
        {
          id: 'labs-fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'Sistema de archivos compartido totalmente administrado, construido sobre Windows Server, con protocolo SMB e integración con Active Directory.',
          explanation:
            'Si el escenario dice Windows y carpetas compartidas, la respuesta es FSx for Windows File Server: los servidores del laboratorio acceden por SMB, como a cualquier carpeta de Windows.',
          correct: true,
        },
      ],
    },
  ],
};
