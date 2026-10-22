import type { Mission } from '../../domain/Mission';

/**
 * Archivo de la Municipalidad: a city hall that must keep scanned documents for ten years.
 * Practices S3 storage classes, S3 Lifecycle, AWS Storage Gateway, AWS Backup and AWS Artifact.
 */
export const cityhallArchive: Mission = {
  id: 'cityhall-archive',
  track: 'tecnologico',
  topicSlug: 'clases-de-almacenamiento-s3',
  buildingId: 'cityhall',
  title: 'Diez años de papeles',
  client: { name: 'Patricia Huamán', role: 'Jefa de Archivo de la Municipalidad' },
  intro: [
    'Te damos la bienvenida a la Municipalidad. Soy Patricia Huamán, jefa del archivo. Aquí guardamos licencias, partidas, planos y resoluciones de toda la ciudad.',
    'Ya escaneamos casi todo, pero la ley nos obliga a conservar cada documento durante diez años. Después del primer mes, casi nadie vuelve a pedirlos.',
    'Hoy todo vive en un servidor de archivos en el sótano. Se está quedando sin espacio, y si un día se inunda el sótano, perdemos una década de historia de la ciudad.',
    'Y para colmo, cada año vienen los auditores a revisar que todo esté protegido y en regla. Quiero llevar el archivo a la nube sin gastar de más. ¿Me ayudas?',
  ],
  outro: {
    passed: [
      '¡Qué tranquilidad! Los documentos viejos descansan en la clase más barata, se mueven solos con el ciclo de vida y las carpetas del sótano ahora guardan sus datos en la nube.',
      'Y cuando lleguen los auditores, ya sé dónde descargar los informes de AWS. Muchas gracias. Aquí en la Municipalidad siempre tendrás las puertas abiertas.',
    ],
    failed: [
      'Mmm... con este plan no sé si pasaríamos la auditoría, ni si la factura sería razonable. Algunas decisiones no me cierran.',
      'Repasa la teoría con calma y vuelve cuando quieras. Los papeles no se van a ir a ningún lado, ¡te lo aseguro!',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'archive-class',
      prompt:
        'Empecemos por los documentos que ya tienen años. Los consultamos menos de una vez al año y, si alguien los pide, puede esperar hasta el día siguiente. ¿En qué clase de Amazon S3 los guardamos para pagar lo menos posible?',
      topicSlug: 'clases-de-almacenamiento-s3',
      examTasks: ['3.6'],
      options: [
        {
          id: 's3-standard',
          label: 'S3 Standard',
          definition:
            'Clase por defecto de Amazon S3, pensada para datos de acceso frecuente, con recuperación en milisegundos y sin cargo por recuperar.',
          explanation:
            'S3 Standard está pensada para datos que se usan seguido. Para documentos que se leen menos de una vez al año, la Municipalidad pagaría un precio de acceso frecuente que no aprovecha.',
          correct: false,
        },
        {
          id: 'glacier-instant',
          label: 'S3 Glacier Instant Retrieval',
          definition:
            'Clase de archivo con acceso en milisegundos, para datos consultados aproximadamente una vez por trimestre.',
          explanation:
            'Sirve cuando el archivo se consulta de vez en cuando y se necesita al instante. Patricia puede esperar horas, así que puede elegir una clase todavía más barata.',
          correct: false,
        },
        {
          id: 'glacier-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'La clase de almacenamiento de menor costo de AWS, para datos consultados menos de una vez al año; requiere restaurar los objetos y la recuperación toma horas.',
          explanation:
            'Correcto. Es la opción más barata y está pensada para retener datos durante años por cumplimiento normativo. Con la recuperación Standard, el documento suele estar listo dentro de 12 horas.',
          correct: true,
        },
        {
          id: 'one-zone-ia',
          label: 'S3 One Zone-IA',
          definition:
            'Clase para acceso poco frecuente que guarda los datos en una sola Availability Zone, recomendada solo para datos que se pueden recrear.',
          explanation:
            'Los documentos escaneados de la ciudad no se pueden volver a generar si se pierden. Guardar la única copia en una sola zona es justo lo que se debe evitar con datos críticos.',
          correct: false,
        },
      ],
    },
    {
      id: 'lifecycle',
      prompt:
        'Ahora, los documentos nuevos: el primer mes se consultan mucho, después casi nada, y a los diez años se pueden eliminar. No quiero que mi equipo mueva archivos a mano cada mes. ¿Qué usamos?',
      topicSlug: 'clases-de-almacenamiento-s3',
      examTasks: ['3.6'],
      options: [
        {
          id: 's3-lifecycle',
          label: 'Una política de ciclo de vida de S3 (S3 Lifecycle)',
          definition:
            'Conjunto de reglas que S3 aplica automáticamente a un grupo de objetos: transiciones a otras clases después de cierto tiempo y expiración cuando vencen.',
          explanation:
            'Correcto. El patrón de Patricia es predecible: una regla de transición pasa los documentos a clases más frías a medida que envejecen, y una regla de expiración los elimina al terminar los diez años.',
          correct: true,
        },
        {
          id: 'intelligent-tiering',
          label: 'S3 Intelligent-Tiering',
          definition:
            'Clase que mueve cada objeto automáticamente entre niveles de acceso según su uso, con un cargo de monitoreo por objeto.',
          explanation:
            'Intelligent-Tiering brilla cuando el patrón de acceso es desconocido o cambiante. Aquí el patrón ya se conoce, y además esta clase no elimina los documentos al cumplir los diez años.',
          correct: false,
        },
        {
          id: 'manual-moves',
          label: 'Un script que el equipo ejecuta a mano cada mes',
          definition:
            'Proceso manual en el que una persona copia los objetos a otra clase de almacenamiento de forma periódica.',
          explanation:
            'Es justo lo que Patricia quiere evitar: depende de que alguien se acuerde. Si el patrón de acceso es predecible, la respuesta es una política de ciclo de vida.',
          correct: false,
        },
        {
          id: 'deep-archive-from-day-one',
          label: 'Guardar todo en S3 Glacier Deep Archive desde el primer día',
          definition:
            'Colocar cada objeto nuevo directamente en la clase de archivo más barata, que requiere restaurar los objetos para leerlos.',
          explanation:
            'Durante el primer mes los documentos se consultan mucho, y en Deep Archive cada consulta exige una restauración que tarda horas. Conviene empezar en una clase de acceso rápido y archivar después.',
          correct: false,
        },
      ],
    },
    {
      id: 'hybrid-storage',
      prompt:
        'Los empleados están acostumbrados a guardar en las carpetas compartidas del servidor del sótano y no quiero cambiarles la forma de trabajar. ¿Cómo seguimos usándolo, pero con los datos guardados en la nube?',
      topicSlug: 'almacenamiento-hibrido-y-respaldo',
      examTasks: ['3.6'],
      options: [
        {
          id: 'elastic-disaster-recovery',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio que replica continuamente servidores hacia AWS para lanzarlos como instancias de recuperación en minutos ante un desastre.',
          explanation:
            'Protege servidores completos ante un desastre, pero no convierte la nube en el almacenamiento diario de las carpetas compartidas del sótano.',
          correct: false,
        },
        {
          id: 'fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'Sistema de archivos compartido totalmente administrado, construido sobre Windows Server, con protocolo SMB e integración con Active Directory.',
          explanation:
            'FSx es una gran opción para llevar las carpetas compartidas por completo a AWS, pero Patricia quiere conservar el acceso local de siempre, con caché en el sótano y los datos guardados en la nube.',
          correct: false,
        },
        {
          id: 'efs',
          label: 'Amazon EFS',
          definition: 'Sistema de archivos NFS elástico y sin servidor que ofrece AWS.',
          explanation:
            'EFS es un sistema de archivos en AWS, no un puente híbrido: no deja una caché local en el sótano. Para combinar el servidor local con la nube, la respuesta es Storage Gateway.',
          correct: false,
        },
        {
          id: 'storage-gateway',
          label: 'AWS Storage Gateway (Amazon S3 File Gateway)',
          definition:
            'Servicio híbrido que conecta un dispositivo instalado en tu centro de datos con el almacenamiento de AWS y mantiene los datos más usados en una caché local.',
          explanation:
            'Correcto. Con S3 File Gateway los empleados siguen usando recursos compartidos NFS o SMB, los archivos se guardan como objetos en Amazon S3 y los más usados quedan en caché local.',
          correct: true,
        },
      ],
    },
    {
      id: 'central-backup',
      prompt:
        'Además del archivo, tenemos el sistema de trámites en Amazon RDS y varios discos de Amazon EBS. Quiero una sola política de respaldo para todo, automática y protegida contra borrados. ¿Qué servicio uso?',
      topicSlug: 'almacenamiento-hibrido-y-respaldo',
      examTasks: ['3.6'],
      options: [
        {
          id: 'tape-gateway',
          label: 'Tape Gateway',
          definition:
            'Tipo de Storage Gateway que presenta cintas virtuales al software de respaldo y guarda los datos en Amazon S3 o S3 Glacier.',
          explanation:
            'Tape Gateway reemplaza cintas físicas en un flujo de respaldo que ya existe, pero no define una política central para RDS, EBS y el resto de servicios de AWS.',
          correct: false,
        },
        {
          id: 'aws-backup',
          label: 'AWS Backup',
          definition:
            'Servicio totalmente administrado para centralizar y automatizar la protección de datos en servicios de AWS, en la nube y on-premises.',
          explanation:
            'Correcto. Con un backup plan defines cuándo respaldar y cuánto retener, para RDS, EBS, S3 y los volúmenes de Storage Gateway. Y AWS Backup Vault Lock impide que alguien borre los respaldos.',
          correct: true,
        },
        {
          id: 'elastic-disaster-recovery',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'Servicio que replica continuamente servidores hacia AWS para lanzarlos como instancias de recuperación en minutos ante un desastre.',
          explanation:
            'Elastic Disaster Recovery mantiene servidores listos para arrancar con poco tiempo de inactividad. Patricia necesita copias centralizadas para restaurar datos, y eso es AWS Backup.',
          correct: false,
        },
        {
          id: 'aws-config',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de los recursos, su historial de configuración y evalúa si cumplen las reglas definidas.',
          explanation:
            'Config puede decir cómo está configurado cada recurso, pero no crea ni guarda copias de seguridad de los datos.',
          correct: false,
        },
      ],
    },
    {
      id: 'compliance-reports',
      prompt:
        'Última pregunta, y la más urgente: los auditores van a pedir pruebas de que AWS cumple normas como ISO y SOC. ¿Dónde consigo esos informes?',
      topicSlug: 'cumplimiento-y-auditoria',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas desde la consola, la CLI, los SDK y las API.',
          explanation:
            'CloudTrail responde "quién hizo qué y cuándo" dentro de la cuenta de la Municipalidad, pero no contiene los informes de cumplimiento de AWS.',
          correct: false,
        },
        {
          id: 'credential-report',
          label: 'El informe de credenciales de IAM',
          definition:
            'Archivo CSV con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA.',
          explanation:
            'Es útil para mostrar a un auditor cómo se manejan las credenciales de la Municipalidad, pero no prueba que AWS tenga certificaciones ISO o SOC.',
          correct: false,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar bajo demanda y sin costo documentos de seguridad y cumplimiento de AWS, como informes SOC, PCI e ISO.',
          explanation:
            'Correcto. En Artifact Patricia descarga los informes de AWS como evidencia de auditoría. Ojo: por la responsabilidad compartida, demostrar el cumplimiento de su propia carga sigue siendo tarea de la Municipalidad.',
          correct: true,
        },
        {
          id: 'aws-config',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de los recursos, su historial de configuración y evalúa si cumplen las reglas definidas.',
          explanation:
            'Config muestra si los recursos de la Municipalidad cumplen sus propias reglas, pero los informes SOC o ISO de AWS no están ahí: se descargan en AWS Artifact.',
          correct: false,
        },
      ],
    },
  ],
};
