import type { ServiceFamily } from '../../domain/ServiceFamily';

export const s3ClassesFamily: ServiceFamily = {
  id: 's3-classes',
  title: 'Clases de S3: cuánto accedes y cuánto esperas',
  summary:
    'Decide por frecuencia de acceso, por si toleras perder una AZ y por cuánto puedes esperar al recuperar: milisegundos, minutos u horas. Las más baratas cobran recuperación y duración mínima.',
  services: [
    { name: 'S3 Standard', summary: 'Acceso frecuente en milisegundos, varias AZ, sin duración mínima ni cargo por recuperación.' },
    { name: 'S3 Intelligent-Tiering', summary: 'Patrón desconocido o cambiante: mueve cada objeto entre niveles solo, sin cargo por recuperación.' },
    { name: 'S3 Standard-IA', summary: 'Acceso poco frecuente (cerca de una vez al mes) en milisegundos, varias AZ, mínimo 30 días.' },
    { name: 'S3 One Zone-IA', summary: 'Como Standard-IA pero en una sola AZ: más barata, para datos que puedes recrear. Mínimo 30 días.' },
    { name: 'S3 Glacier Instant Retrieval', summary: 'Archivo consultado cerca de una vez por trimestre, con acceso en milisegundos. Mínimo 90 días.' },
    { name: 'S3 Glacier Flexible Retrieval', summary: 'Archivo de 1 o 2 accesos al año: restaura en minutos u horas, recuperación masiva gratis. Mínimo 90 días.' },
    { name: 'S3 Glacier Deep Archive', summary: 'Lo más barato de AWS: acceso menor a una vez al año, restaura en 12 a 48 horas. Mínimo 180 días.' },
  ],
  cards: [
    {
      id: 's3-classes-1',
      prompt:
        'Una panadería en Arequipa guarda en S3 las fotos de su app de pedidos. Cada foto se abre cientos de veces al día y debe cargar en milisegundos, sin cargos por recuperar datos. ¿Qué clase usa?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA cobra por cada GB recuperado; con cientos de lecturas diarias ese cargo supera el ahorro en almacenamiento.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval está pensada para un acceso por trimestre; con lecturas constantes sus costos de acceso se disparan.' },
        { service: 'S3 Standard', why: 'S3 Standard es para datos de acceso frecuente en milisegundos, sin cargo por recuperación ni duración mínima.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA es para acceso poco frecuente, cobra recuperación y guarda todo en una sola AZ.' },
      ],
      answer: 'S3 Standard',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-2',
      prompt:
        'Una agencia de diseño en Rosario sube a S3 archivos de trabajo que se consultan muchas veces al día y se borran a los 10 días. Quiere evitar cobros por guardarlos más tiempo del real. ¿Qué clase usa?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA tiene una duración mínima de 30 días: borrar a los 10 días igual cobra los 30, y además cobra recuperación.' },
        { service: 'S3 Standard', why: 'S3 Standard no tiene duración mínima ni cargo por recuperación, ideal para datos de vida corta y uso frecuente.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archiva los objetos, exige restaurarlos antes de leerlos y cobra un mínimo de 90 días.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA también cobra un mínimo de 30 días y recuperación por GB; no conviene para archivos de 10 días.' },
      ],
      answer: 'S3 Standard',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-3',
      prompt:
        'Un medio digital en Mendoza sube miles de notas e imágenes al mes y no sabe cuáles se volverán populares ni por cuánto tiempo. Quiere ahorrar sin crear reglas a mano. ¿Qué clase usa?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA es para acceso poco frecuente conocido; si una nota se vuelve viral, cada lectura paga recuperación.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering es para patrones desconocidos o cambiantes: mueve cada objeto entre niveles según su uso, sin cargo por recuperación.' },
        { service: 'S3 Standard', why: 'S3 Standard sirve, pero no baja el costo de los objetos que dejan de consultarse; no aprovecha el ahorro buscado.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive tarda horas en restaurar; no sirve para contenido que puede volverse popular en cualquier momento.' },
      ],
      answer: 'S3 Intelligent-Tiering',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-4',
      prompt:
        'Un sello musical en Medellín guarda canciones que de pronto se escuchan mucho y luego nadie las pide por meses. Quiere que cada archivo baje de costo solo cuando deja de usarse. ¿Qué clase usa?',
      options: [
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval cobra más por acceso y un mínimo de 90 días; una canción que vuelve a sonar mucho saldría cara.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering pasa a niveles más baratos los objetos sin acceso por 30 o 90 días y los regresa al nivel frecuente al usarlos.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA no mueve objetos según su uso, cobra recuperación y guarda los datos en una sola AZ.' },
      ],
      answer: 'S3 Intelligent-Tiering',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-5',
      prompt:
        'Un laboratorio clínico en Trujillo guarda en S3 la única copia de sus respaldos. Los consulta cerca de una vez al mes, deben abrir en milisegundos y resistir la caída de una zona entera. ¿Qué clase usa?',
      options: [
        { service: 'S3 One Zone-IA', why: 'One Zone-IA guarda los datos en una sola AZ y no resiste su pérdida; AWS la recomienda solo para datos que puedes recrear.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA es para acceso cerca de una vez al mes, con milisegundos y en varias AZ; AWS la recomienda para la única copia.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archiva los objetos y tarda de minutos a horas en restaurarlos; no da milisegundos.' },
        { service: 'S3 Standard', why: 'S3 Standard cumple, pero para acceso mensual cuesta más almacenar ahí que en una clase de acceso poco frecuente.' },
      ],
      answer: 'S3 Standard-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-6',
      prompt:
        'Una cooperativa en Cuenca guarda estados de cuenta antiguos. Los socios los piden más o menos una vez al mes, deben abrirse al instante y no hay otra copia. ¿Qué clase conviene?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA está diseñada para acceso mensual en milisegundos y guarda en varias AZ, adecuada para una copia única.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval está pensada para un acceso por trimestre; cuesta menos almacenar, pero más acceder que Standard-IA.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA vive en una sola AZ; para datos que no se pueden recrear, AWS recomienda una clase de varias AZ.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive tarda hasta 12 horas o más en restaurar; un socio no puede esperar eso para ver su estado de cuenta.' },
      ],
      answer: 'S3 Standard-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-7',
      prompt:
        'Una tienda online en Barranquilla genera miniaturas de sus fotos, que puede regenerar desde los originales. Se ven poco, pero deben cargar en milisegundos al precio más bajo posible. ¿Qué clase usa?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA guarda en varias AZ y cuesta más; pagar esa resiliencia no hace falta para datos que puedes recrear.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA cuesta menos que Standard-IA porque usa una sola AZ, con milisegundos; ideal para datos poco usados que puedes recrear.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering sirve para patrones desconocidos y guarda en varias AZ; aquí el acceso es conocido y los datos son recreables.' },
      ],
      answer: 'S3 One Zone-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-8',
      prompt:
        'Una aseguradora en San José ya guarda sus documentos en una Región y replica una copia secundaria a otra Región. Esa réplica casi no se lee y quiere el menor costo con milisegundos. ¿Qué clase usa?',
      options: [
        { service: 'S3 Standard', why: 'S3 Standard es para acceso frecuente y cuesta más; una réplica que casi no se lee no lo necesita.' },
        { service: 'S3 One Zone-IA', why: 'AWS recomienda One Zone-IA para réplicas de Cross-Region Replication: el original sigue en otra Región y la copia cuesta menos.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archiva los objetos y no da acceso en milisegundos, que es parte del requisito.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA funciona, pero cuesta más que One Zone-IA y su resiliencia multi-AZ sobra para una réplica secundaria.' },
      ],
      answer: 'S3 One Zone-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-9',
      prompt:
        'Un registro civil en Tegucigalpa guarda por años imágenes de actas que se piden más o menos una vez por trimestre. Cuando alguien las pide, deben abrir en milisegundos. ¿Qué clase usa?',
      options: [
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval exige restaurar el objeto y tarda de minutos a horas; no cumple los milisegundos.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval es para archivo de larga vida consultado cerca de una vez por trimestre, con acceso en milisegundos.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive es la más barata, pero restaura en horas; no sirve si las actas deben abrir al instante.' },
        { service: 'S3 Standard', why: 'S3 Standard da milisegundos, pero cuesta más almacenar ahí datos que se leen solo cuatro veces al año.' },
      ],
      answer: 'S3 Glacier Instant Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-10',
      prompt:
        'Una agencia de eventos en Panamá guarda fotos de años pasados que se abren unas pocas veces al año. Si un cliente entra a la galería deben verse al instante, con el menor costo de almacenamiento. ¿Qué clase usa?',
      options: [
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval da milisegundos con menor costo de almacenamiento que Standard-IA, para datos que se leen pocas veces al año.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA también da milisegundos, pero almacenar cuesta más; está pensada para acceso cerca de una vez al mes.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archiva las fotos; habría que restaurarlas antes de mostrarlas, y eso tarda minutos u horas.' },
      ],
      answer: 'S3 Glacier Instant Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-11',
      prompt:
        'Una constructora en Valparaíso archiva planos para recuperación ante desastres. Los consulta una o dos veces al año y puede esperar horas, pero a veces necesita un plano urgente en pocos minutos. ¿Qué clase usa?',
      options: [
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive solo ofrece recuperación estándar (hasta 12 horas) o masiva (hasta 48 horas); no tiene opción de minutos.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval es para 1 o 2 accesos al año y su recuperación acelerada suele tardar de 1 a 5 minutos.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval da milisegundos, pero cuesta más almacenar; aquí pueden esperar casi siempre.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA guarda en una sola AZ; un archivo para recuperación ante desastres no debería depender de una zona.' },
      ],
      answer: 'S3 Glacier Flexible Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-12',
      prompt:
        'Una productora en Guadalajara archiva video crudo. Lo restaura una o dos veces al año en lotes grandes, puede esperar de 5 a 12 horas y quiere que esas recuperaciones masivas no le cuesten. ¿Qué clase usa?',
      options: [
        { service: 'S3 Glacier Flexible Retrieval', why: 'En Glacier Flexible Retrieval la recuperación masiva (bulk) tarda de 5 a 12 horas y es gratuita.' },
        { service: 'S3 Glacier Deep Archive', why: 'En Deep Archive la recuperación masiva tarda hasta 48 horas y cuesta poco, pero no es gratuita.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering sirve para patrones desconocidos; aquí el patrón es conocido: archivo con restauraciones planificadas.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA cobra por GB recuperado y almacenar ahí cuesta más; no está hecha para archivo anual.' },
      ],
      answer: 'S3 Glacier Flexible Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-13',
      prompt:
        'Una notaría en Sucre debe conservar 10 años escrituras digitalizadas que casi nunca se piden, menos de una vez al año. Puede esperar hasta dos días para recuperarlas y busca el costo mínimo. ¿Qué clase usa?',
      options: [
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval es para 1 o 2 accesos al año; sirve, pero cuesta más que la opción de archivo más barata.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA da milisegundos que no se necesitan y cuesta mucho más guardar ahí datos por una década.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive es el almacenamiento más barato de AWS, para retención de años y acceso menor a una vez al año.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval da milisegundos para acceso trimestral; esa velocidad sobra y cuesta más.' },
      ],
      answer: 'S3 Glacier Deep Archive',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-14',
      prompt:
        'Un hospital en Montevideo debe guardar 7 años historias clínicas cerradas que casi nadie consulta. Si una auditoría las pide, puede esperar al día siguiente. Quiere pagar lo mínimo. ¿Qué clase usa?',
      options: [
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive es lo más barato y su recuperación estándar suele terminar en 12 horas, a tiempo para el día siguiente.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval da milisegundos que nadie necesita aquí y cuesta más almacenar.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA guarda en una sola AZ y AWS la recomienda para datos recreables; las historias clínicas no lo son.' },
      ],
      answer: 'S3 Glacier Deep Archive',
      topicSlug: 's3-storage-classes',
    },
  ],
};
