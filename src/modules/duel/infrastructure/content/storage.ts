import type { ServiceFamily } from '../../domain/ServiceFamily';

export const storageFamily: ServiceFamily = {
  id: 'storage',
  title: 'Almacenamiento: bloques, archivos u objetos',
  summary:
    'Pregúntate cómo se usan los datos: disco de una instancia (bloques), carpeta compartida (archivos), objetos por HTTPS, puente con tu centro de datos o respaldo central.',
  services: [
    { name: 'Amazon S3', summary: 'Almacenamiento de objetos en buckets, escala sin límite práctico y se accede por HTTPS o API.' },
    { name: 'Amazon EBS', summary: 'Volúmenes en bloque para instancias EC2 de la misma AZ: disco de arranque y de bases de datos.' },
    { name: 'Amazon EFS', summary: 'Sistema de archivos NFS elástico y compartido para Linux, montable desde muchas instancias y AZ.' },
    { name: 'Amazon FSx', summary: 'Sistemas de archivos administrados especializados: Windows File Server (SMB), Lustre (HPC), ONTAP, OpenZFS.' },
    { name: 'AWS Storage Gateway', summary: 'Puente híbrido: tus servidores locales usan almacenamiento en AWS como archivos, volúmenes o cintas.' },
    { name: 'AWS Backup', summary: 'Políticas centrales de respaldo y retención para EBS, EFS, RDS, DynamoDB, FSx, S3 y más.' },
  ],
  cards: [
    {
      id: 'storage-1',
      prompt:
        'Una tienda de artesanías en Cusco quiere guardar millones de fotos de productos, servirlas por HTTPS a su web y pagar solo por lo que almacena, sin reservar capacidad. ¿Qué servicio usa?',
      options: [
        { service: 'Amazon EBS', why: 'EBS es un disco en bloque que se adjunta a una instancia; no sirve archivos por HTTPS por sí solo y se paga por lo aprovisionado.' },
        { service: 'Amazon S3', why: 'S3 es almacenamiento de objetos: guarda cualquier cantidad de archivos, se accede por HTTPS o API y cobra solo por lo que usas.' },
        { service: 'Amazon EFS', why: 'EFS es un sistema de archivos que montan servidores Linux; para servir fotos a una web sin servidores, el almacén de objetos es más simple.' },
        { service: 'Amazon FSx', why: 'FSx ofrece sistemas de archivos administrados para cargas como Windows o HPC; no es la opción para guardar y servir objetos web.' },
      ],
      answer: 'Amazon S3',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-2',
      prompt:
        'Una clínica en Medellín corre PostgreSQL en una sola instancia virtual. Necesita un disco de baja latencia para esa instancia, que conserve los datos aunque la detengan. ¿Qué usa?',
      options: [
        { service: 'Amazon EFS', why: 'EFS es un sistema de archivos compartido por red; para el disco de una base de datos en una sola instancia, lo indicado es un volumen en bloque.' },
        { service: 'Amazon S3', why: 'S3 guarda objetos y se accede por API; no se monta como el disco donde un motor de base de datos escribe sus bloques.' },
        { service: 'Amazon EBS', why: 'EBS da volúmenes en bloque que se usan como disco de la instancia, ideales para bases de datos, y persisten aparte de la vida de la instancia.' },
      ],
      answer: 'Amazon EBS',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-3',
      prompt:
        'Un colegio en Quito tiene instancias Linux en varias zonas de disponibilidad que deben leer y escribir los mismos archivos a la vez, en un sistema de archivos que crezca solo. ¿Qué elige?',
      options: [
        { service: 'Amazon EBS', why: 'Un volumen EBS se adjunta a instancias de su misma AZ; no es un sistema de archivos compartido entre zonas.' },
        { service: 'Amazon FSx', why: 'FSx for Windows File Server usa SMB para Windows; para Linux con NFS que crece solo, la opción general es EFS.' },
        { service: 'Amazon EFS', why: 'EFS es un sistema de archivos NFS para Linux, compartido entre muchas instancias y AZ, que crece y se reduce solo según los archivos.' },
        { service: 'Amazon S3', why: 'S3 guarda objetos accesibles por API; montarlo como archivos requiere la capa aparte S3 Files. El sistema de archivos NFS elástico de referencia para Linux es EFS.' },
      ],
      answer: 'Amazon EFS',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-4',
      prompt:
        'Un estudio contable en Bogotá quiere mover a la nube su servidor de archivos Windows: carpetas compartidas por SMB, usuarios de Active Directory y permisos de Windows. ¿Qué servicio usa?',
      options: [
        { service: 'Amazon EFS', why: 'EFS usa NFS y AWS no lo soporta con instancias Windows; no ofrece recursos compartidos SMB con Active Directory.' },
        { service: 'Amazon FSx', why: 'FSx for Windows File Server da servidores de archivos Windows administrados, con SMB, integración con Active Directory y ACL de Windows.' },
        { service: 'Amazon S3', why: 'S3 guarda objetos con permisos de IAM y políticas de bucket; no es un recurso compartido SMB con permisos de Windows.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway sirve para que servidores locales usen almacenamiento en AWS; aquí quieren el servidor de archivos administrado en la nube.' },
      ],
      answer: 'Amazon FSx',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-5',
      prompt:
        'Una fábrica en Monterrey mantiene sus servidores locales y quiere que sus aplicaciones guarden archivos en la nube por NFS o SMB, con una caché local para lo que más usan. ¿Qué elige?',
      options: [
        { service: 'Amazon S3', why: 'S3 puede ser el destino final, pero las aplicaciones locales no lo montan por NFS o SMB sin algo que haga de puente.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway conecta lo local con AWS: S3 File Gateway presenta recursos NFS o SMB respaldados en S3 y cachea lo usado con frecuencia.' },
        { service: 'Amazon EFS', why: 'EFS es un sistema de archivos dentro de AWS; no instala un dispositivo local con caché que traduzca archivos a la nube.' },
        { service: 'AWS Backup', why: 'AWS Backup programa y retiene respaldos; no presenta recursos compartidos de archivos a aplicaciones locales.' },
      ],
      answer: 'AWS Storage Gateway',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-6',
      prompt:
        'Una cooperativa en Asunción quiere dejar de comprar cintas físicas para sus respaldos, pero sin cambiar el software de respaldo que ya usa. Las cintas deben quedar en AWS. ¿Qué usa?',
      options: [
        { service: 'AWS Backup', why: 'AWS Backup centraliza respaldos de recursos de AWS; no emula una biblioteca de cintas para el software de respaldo local.' },
        { service: 'AWS Storage Gateway', why: 'Tape Gateway, de Storage Gateway, reemplaza las cintas físicas por cintas virtuales en AWS y el software de respaldo sigue igual.' },
        { service: 'Amazon S3', why: 'S3 guarda los datos, pero el software de respaldo local espera una biblioteca de cintas, y eso lo presenta un gateway.' },
        { service: 'Amazon EBS', why: 'EBS es un disco para instancias EC2; no tiene relación con las cintas de un centro de datos local.' },
      ],
      answer: 'AWS Storage Gateway',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-7',
      prompt:
        'Una cadena de farmacias en Lima quiere una sola política que respalde cada noche sus volúmenes, sistemas de archivos y bases de datos RDS, los retenga 35 días y copie a otra Región. ¿Qué usa?',
      options: [
        { service: 'Amazon EBS', why: 'Las instantáneas de EBS respaldan volúmenes, pero no cubren bases de datos ni sistemas de archivos con una sola política central.' },
        { service: 'AWS Backup', why: 'AWS Backup define planes de respaldo con horario y retención para muchos servicios a la vez, y puede copiar respaldos a otra Región.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway conecta servidores locales con AWS; no programa respaldos de recursos que ya están en AWS.' },
        { service: 'Amazon S3', why: 'S3 puede guardar copias, pero no programa ni retiene respaldos de volúmenes y bases de datos por sí solo.' },
      ],
      answer: 'AWS Backup',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-8',
      prompt:
        'Una universidad en Córdoba tiene muchas cuentas en AWS Organizations y quiere aplicar el mismo plan de respaldo en todas, con reportes para auditar el cumplimiento. ¿Qué servicio usa?',
      options: [
        { service: 'AWS Backup', why: 'AWS Backup aplica políticas de respaldo a todas las cuentas de AWS Organizations y su Audit Manager reporta el cumplimiento.' },
        { service: 'Amazon S3', why: 'S3 almacena objetos; no gestiona planes de respaldo entre cuentas ni audita si cada recurso se respaldó.' },
        { service: 'Amazon FSx', why: 'FSx respalda sus propios sistemas de archivos, pero no gobierna los respaldos de todos los servicios y cuentas.' },
      ],
      answer: 'AWS Backup',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-9',
      prompt:
        'Una startup en Guadalajara quiere publicar su sitio web estático (HTML, CSS e imágenes) sin administrar ningún servidor y pagando por lo que guarda y transfiere. ¿Dónde lo aloja?',
      options: [
        { service: 'Amazon S3', why: 'S3 puede alojar un sitio web estático directamente desde un bucket, sin servidores que administrar.' },
        { service: 'Amazon EBS', why: 'EBS necesita una instancia a la que adjuntarse, y esa instancia es justo el servidor que la startup no quiere administrar.' },
        { service: 'Amazon EFS', why: 'EFS se monta desde servidores o contenedores; no publica un sitio web por sí mismo.' },
      ],
      answer: 'Amazon S3',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-10',
      prompt:
        'Una app de delivery en Santiago tiene funciones serverless y contenedores que deben compartir los mismos archivos con permisos POSIX en un sistema de archivos nativo, sin capas sobre un bucket ni capacidad que aprovisionar. ¿Qué almacenamiento elige?',
      options: [
        { service: 'Amazon EFS', why: 'EFS es almacenamiento de archivos serverless y elástico, montable desde EC2, ECS, EKS, Lambda y Fargate, con permisos POSIX.' },
        { service: 'Amazon EBS', why: 'EBS se adjunta a instancias EC2 de una AZ; las funciones serverless no montan volúmenes EBS.' },
        { service: 'Amazon FSx', why: 'FSx ofrece sistemas de archivos especializados (Windows, Lustre, ONTAP, OpenZFS); para compartir archivos desde funciones y contenedores, lo directo es EFS.' },
        { service: 'Amazon S3', why: 'S3 es almacenamiento de objetos; montarlo como archivos requiere la capa aparte S3 Files, y aquí se pide un sistema de archivos nativo.' },
      ],
      answer: 'Amazon EFS',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-11',
      prompt:
        'Un centro de investigación en Campinas corre simulaciones HPC en cientos de instancias Linux y necesita un sistema de archivos paralelo, con latencia submilisegundo y altísimo rendimiento. ¿Qué usa?',
      options: [
        { service: 'Amazon EFS', why: 'EFS es un sistema de archivos compartido de propósito general; para HPC que pide un sistema de archivos paralelo, la opción especializada es otra.' },
        { service: 'Amazon FSx', why: 'FSx for Lustre es el sistema de archivos de alto rendimiento para HPC, machine learning y video, con latencias submilisegundo.' },
        { service: 'Amazon EBS', why: 'EBS es un volumen de una instancia, no un sistema de archivos paralelo compartido por cientos de instancias.' },
      ],
      answer: 'Amazon FSx',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-12',
      prompt:
        'Una distribuidora en Arequipa necesita el volumen del sistema operativo y de datos de la única instancia con su ERP, y poder ampliarlo cuando crezca sin detener la instancia. ¿Qué usa?',
      options: [
        { service: 'Amazon EFS', why: 'EFS es una carpeta compartida por red; no sirve como volumen de arranque del sistema operativo de la instancia.' },
        { service: 'Amazon S3', why: 'S3 guarda objetos por API; no se usa como disco del sistema operativo de una instancia.' },
        { service: 'Amazon EBS', why: 'EBS es el disco en bloque de la instancia, sirve como volumen de arranque y con Elastic Volumes puede crecer sin detenerla.' },
        { service: 'Amazon FSx', why: 'FSx da sistemas de archivos compartidos por red; no es el disco de arranque de una instancia.' },
      ],
      answer: 'Amazon EBS',
      topicSlug: 'ec2-compute',
    },
    {
      id: 'storage-13',
      prompt:
        'Una empresa de buses en La Paz guarda cada día gigas de registros GPS para analizarlos después. Quiere durabilidad de once nueves y capacidad que no tenga que planificar. ¿Qué usa?',
      options: [
        { service: 'Amazon EBS', why: 'EBS se aprovisiona con un tamaño fijo para una instancia; no es un repositorio que crezca sin planificar capacidad.' },
        { service: 'Amazon EFS', why: 'EFS sirve para archivos compartidos entre servidores; para acumular datos que se analizarán luego, el almacén de objetos es más barato y simple.' },
        { service: 'Amazon S3', why: 'S3 está diseñado para 99,999999999 % de durabilidad, crece sin planificar capacidad y es la base habitual de un data lake.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway es un puente desde servidores locales; los datos de los buses pueden ir directo a un almacén en la nube.' },
      ],
      answer: 'Amazon S3',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-14',
      prompt:
        'Dos servidores web Linux detrás de un balanceador en Cali deben ver las mismas imágenes que suben los usuarios, montadas como una carpeta común en ambos. ¿Qué almacenamiento usan?',
      options: [
        { service: 'Amazon EBS', why: 'Un volumen EBS suele adjuntarse a una sola instancia; Multi-Attach existe solo para algunos tipos y no es un sistema de archivos compartido.' },
        { service: 'Amazon EFS', why: 'EFS es un sistema de archivos NFS que varios servidores Linux montan a la vez, así ambos ven los mismos archivos.' },
        { service: 'AWS Backup', why: 'AWS Backup respalda datos y los retiene; no ofrece una carpeta compartida en la que trabajen los servidores.' },
      ],
      answer: 'Amazon EFS',
      topicSlug: 's3-ebs-efs-storage',
    },
  ],
};
