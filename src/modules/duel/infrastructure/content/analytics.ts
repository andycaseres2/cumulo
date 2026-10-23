import type { ServiceFamily } from '../../domain/ServiceFamily';

export const analyticsFamily: ServiceFamily = {
  id: 'analytics',
  title: 'Analítica de datos',
  summary:
    'SQL directo sobre S3 (Athena), ETL y catálogo (Glue), datos en tiempo real (Kinesis), Spark y Hadoop en clúster (EMR), data warehouse (Redshift), tableros de BI (Quick Sight) y búsqueda o análisis de logs (OpenSearch Service).',
  services: [
    {
      name: 'Amazon Athena',
      summary: 'Consultas SQL interactivas directo sobre datos en S3, sin servidores; pagas por las consultas que ejecutas.',
    },
    {
      name: 'AWS Glue',
      summary: 'Integración de datos sin servidores: ETL para preparar datos y Data Catalog con crawlers que descubren esquemas.',
    },
    {
      name: 'Amazon Kinesis',
      summary: 'Recopila y procesa flujos de datos en tiempo real, como clics, logs o señales de sensores.',
    },
    {
      name: 'Amazon EMR',
      summary: 'Clústeres administrados para frameworks de big data como Apache Spark, Hadoop y Hive.',
    },
    {
      name: 'Amazon Redshift',
      summary: 'Data warehouse administrado a escala de petabytes para análisis con SQL y herramientas de BI.',
    },
    {
      name: 'Amazon Quick Sight',
      summary: 'Business intelligence: tableros interactivos y visualizaciones que puedes compartir o incrustar en apps.',
    },
    {
      name: 'Amazon OpenSearch Service',
      summary: 'Motor administrado de búsqueda y analítica: búsqueda de texto, análisis de logs y monitoreo en tiempo casi real.',
    },
  ],
  cards: [
    {
      id: 'analytics-1',
      prompt:
        'Una cooperativa cafetalera de Cusco guarda años de ventas en archivos CSV dentro de S3. Quiere hacer consultas SQL de vez en cuando, sin cargar los datos en una base ni administrar servidores, y pagar solo por lo que consulte.',
      options: [
        {
          service: 'Amazon Athena',
          why: 'Correcto: Athena es serverless, consulta con SQL estándar los archivos que ya están en S3 y pagas por las consultas que ejecutas.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift es un data warehouse donde normalmente cargas los datos; para consultas ocasionales sobre archivos en S3 es más de lo que necesitas.',
        },
        {
          service: 'Amazon EMR',
          why: 'EMR levanta clústeres de Spark o Hadoop para big data; aquí basta con SQL puntual sin administrar nada.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight muestra tableros de BI; no es el servicio que ejecuta las consultas SQL sobre los archivos en S3.',
        },
      ],
      answer: 'Amazon Athena',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-2',
      prompt:
        'Un hotel de Cartagena guarda en S3 los logs de acceso de su balanceador. Una vez al mes alguien de seguridad quiere revisarlos con SQL para buscar patrones, sin dejar ninguna infraestructura encendida entre revisiones.',
      options: [
        {
          service: 'Amazon OpenSearch Service',
          why: 'OpenSearch Service sirve para analizar logs, pero tendrías que indexarlos en un dominio; para SQL ocasional sobre S3 hay algo más simple.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Un data warehouse está pensado para análisis frecuentes con datos cargados; no hace falta para revisar logs una vez al mes.',
        },
        {
          service: 'Amazon Athena',
          why: 'Correcto: apuntas Athena a los logs en S3, consultas con SQL y no hay nada que mantener encendido entre una revisión y otra.',
        },
      ],
      answer: 'Amazon Athena',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-3',
      prompt:
        'Una cadena de ferreterías de Lima tiene datos de ventas en una base relacional y archivos de proveedores en S3. Antes de analizarlos necesita limpiarlos, unirlos y transformarlos, sin administrar servidores.',
      options: [
        {
          service: 'Amazon Kinesis',
          why: 'Kinesis captura datos en streaming en tiempo real; no es la herramienta para limpiar y transformar datos que ya están guardados.',
        },
        {
          service: 'AWS Glue',
          why: 'Correcto: Glue es integración de datos serverless; creas trabajos ETL, incluso con un editor visual, para limpiar, unir y cargar los datos.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena consulta datos con SQL, pero el servicio pensado para extraer, transformar y cargar datos de varias fuentes es otro.',
        },
      ],
      answer: 'AWS Glue',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-4',
      prompt:
        'Una fintech de Bogotá tiene un data lake en S3 que crece cada día. Quiere descubrir automáticamente el esquema de los archivos nuevos y mantener un catálogo central de tablas que usen sus herramientas de consulta.',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift guarda y consulta datos en su propio warehouse; no recorre el data lake para descubrir esquemas y catalogarlos.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight crea tableros de BI; no hace ETL ni mantiene un catálogo de metadatos.',
        },
        {
          service: 'AWS Glue',
          why: 'Correcto: los crawlers de Glue infieren el esquema y lo guardan en el Glue Data Catalog, que pueden usar Athena, EMR y Redshift Spectrum.',
        },
      ],
      answer: 'AWS Glue',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-5',
      prompt:
        'Una app de delivery de Ciudad de México recibe cada segundo la ubicación GPS de miles de repartidores. Necesita procesar esas posiciones apenas llegan para calcular el tiempo estimado de entrega. ¿Qué servicio captura ese flujo?',
      options: [
        {
          service: 'Amazon Kinesis',
          why: 'Correcto: Kinesis Data Streams recoge flujos continuos de datos y tus apps pueden leerlos casi al instante, típicamente en menos de un segundo.',
        },
        {
          service: 'AWS Glue',
          why: 'Glue prepara y cataloga datos con ETL; no es el servicio central para capturar miles de eventos por segundo en tiempo real.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift es un data warehouse para análisis con SQL; no es la puerta de entrada de datos en streaming.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena consulta archivos ya guardados en S3; no procesa las posiciones a medida que llegan.',
        },
      ],
      answer: 'Amazon Kinesis',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-6',
      prompt:
        'Una tienda online de Rosario quiere capturar cada clic de su sitio en tiempo real. Una app debe calcular totales al momento y otra, al mismo tiempo, archivar los mismos datos en S3. ¿Qué servicio usas como entrada?',
      options: [
        {
          service: 'Amazon EMR',
          why: 'EMR ejecuta Spark o Hadoop en clústeres; puede leer un flujo, pero no es el servicio que captura los clics en tiempo real.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight muestra tableros de BI; no recopila ni procesa los clics a medida que llegan.',
        },
        {
          service: 'Amazon Kinesis',
          why: 'Correcto: varias aplicaciones pueden leer el mismo flujo de Kinesis de forma independiente, una para agregar y otra para archivar.',
        },
      ],
      answer: 'Amazon Kinesis',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-7',
      prompt:
        'Un instituto de investigación de Concepción ya tiene trabajos en Apache Spark y Hadoop para analizar terabytes de datos genómicos. Quiere moverlos a AWS en un clúster administrado, eligiendo frameworks y tamaño de máquinas.',
      options: [
        {
          service: 'AWS Glue',
          why: 'Glue también usa Spark, pero como ETL serverless; no te da un clúster con Hadoop y el resto de frameworks bajo tu control.',
        },
        {
          service: 'Amazon EMR',
          why: 'Correcto: EMR es una plataforma de clústeres administrados para ejecutar Spark, Hadoop y otros frameworks de big data.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena hace consultas SQL sin servidores sobre S3; no ejecuta tus trabajos existentes de Hadoop en un clúster.',
        },
      ],
      answer: 'Amazon EMR',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-8',
      prompt:
        'Una operadora de telecomunicaciones de Guayaquil tiene en su centro de datos un clúster con Hadoop y Hive que procesa registros de llamadas cada noche. Quiere llevarlo a AWS con los mínimos cambios posibles.',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift es un data warehouse con SQL; migrar ahí obliga a rehacer los trabajos de Hadoop y Hive.',
        },
        {
          service: 'Amazon Kinesis',
          why: 'Kinesis procesa datos en streaming en tiempo real; no ejecuta trabajos por lotes de Hadoop.',
        },
        {
          service: 'Amazon EMR',
          why: 'Correcto: EMR ejecuta Hadoop, Hive y Spark en clústeres administrados, así que tus trabajos actuales cambian poco.',
        },
      ],
      answer: 'Amazon EMR',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-9',
      prompt:
        'Una cadena de supermercados de Santiago quiere un almacén central con las ventas de todas sus tiendas para consultas SQL complejas y frecuentes desde sus herramientas de BI, a escala de petabytes. ¿Qué servicio eliges?',
      options: [
        {
          service: 'Amazon Athena',
          why: 'Athena es ideal para consultas puntuales sobre archivos en S3; para un almacén central con consultas complejas y frecuentes, el examen espera un data warehouse.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'OpenSearch Service sirve para búsqueda y análisis de logs; no es un data warehouse para reportes de ventas.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Correcto: Redshift es el data warehouse administrado de AWS, a escala de petabytes y con SQL para herramientas de BI.',
        },
        {
          service: 'Amazon EMR',
          why: 'EMR ejecuta frameworks de big data como Spark; no es el almacén de datos que consultan tus herramientas de BI.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-10',
      prompt:
        'Una aseguradora de Panamá quiere reemplazar su data warehouse local por uno administrado en la nube. Prefiere una opción en la que no tenga que configurar capacidad y no pague mientras nadie consulta.',
      options: [
        {
          service: 'AWS Glue',
          why: 'Glue mueve y transforma datos hacia el warehouse, pero no es el warehouse donde se guardan y consultan.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Correcto: Redshift es el data warehouse de AWS y Redshift Serverless ajusta la capacidad solo y no cobra cuando está inactivo.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight visualiza datos en tableros; no reemplaza al almacén donde viven los datos.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-11',
      prompt:
        'La gerencia de una cadena de restaurantes de Mendoza quiere ver ventas por local en tableros interactivos desde el navegador o el celular, y compartirlos con cada encargado. ¿Qué servicio usas?',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift guarda y consulta los datos, pero no crea los tableros que mira la gerencia.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena ejecuta consultas SQL; devuelve resultados, no tableros interactivos para compartir.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Correcto: Quick Sight es el servicio de BI de AWS para crear y compartir tableros interactivos y visualizaciones.',
        },
      ],
      answer: 'Amazon Quick Sight',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-12',
      prompt:
        'Una ONG de Tegucigalpa quiere mostrar en su propio portal web gráficos interactivos con los avances de sus proyectos, para que donantes los exploren sin entrar a AWS. ¿Qué servicio te permite incrustar esos tableros?',
      options: [
        {
          service: 'Amazon Quick Sight',
          why: 'Correcto: Quick Sight crea tableros de BI y permite incrustar esa analítica dentro de tus aplicaciones y portales.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'OpenSearch Service trae OpenSearch Dashboards para explorar búsquedas y logs, pero el servicio de BI para tableros de negocio es otro.',
        },
        {
          service: 'AWS Glue',
          why: 'Glue prepara y cataloga datos con ETL; no crea ni muestra gráficos.',
        },
      ],
      answer: 'Amazon Quick Sight',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-13',
      prompt:
        'Una librería online de Quito quiere que su buscador encuentre libros por título, autor o fragmentos de la sinopsis, ordenando por relevancia en milisegundos. ¿Qué servicio administrado usas como motor de búsqueda?',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift está hecho para consultas analíticas con SQL sobre grandes volúmenes; no es un motor de búsqueda de texto para tu sitio.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'Correcto: OpenSearch Service administra clústeres de OpenSearch, un motor de búsqueda y analítica para búsqueda de texto completo.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena consulta archivos en S3 con SQL; no está pensado para responder búsquedas de texto de tus visitantes en milisegundos.',
        },
      ],
      answer: 'Amazon OpenSearch Service',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-14',
      prompt:
        'Una startup de Lima quiere centralizar los logs de sus aplicaciones, buscar errores en tiempo casi real y ver tableros de monitoreo, sin mantener el motor de búsqueda por su cuenta. ¿Qué servicio eliges?',
      options: [
        {
          service: 'Amazon Kinesis',
          why: 'Kinesis puede transportar los logs en tiempo real, pero no los indexa para buscarlos ni ofrece tableros de monitoreo.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena consulta logs guardados en S3 con SQL bajo demanda, pero no indexa los datos para búsqueda y monitoreo en tiempo casi real.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'Correcto: OpenSearch Service se usa para análisis de logs y monitoreo de aplicaciones, con OpenSearch Dashboards para visualizar.',
        },
      ],
      answer: 'Amazon OpenSearch Service',
      topicSlug: 'data-analytics',
    },
  ],
};
