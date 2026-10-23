import type { ServiceFamily } from '../../domain/ServiceFamily';

export const databasesFamily: ServiceFamily = {
  id: 'databases',
  title: 'Bases de datos',
  summary:
    'Cada una sirve a un modelo de datos: relacional (RDS, Aurora), clave-valor (DynamoDB), en memoria (ElastiCache), almacén de datos para análisis (Redshift), grafos (Neptune) y documentos compatibles con MongoDB (DocumentDB).',
  services: [
    {
      name: 'Amazon RDS',
      summary: 'Base relacional administrada con motores conocidos: MySQL, MariaDB, PostgreSQL, Oracle, SQL Server y Db2.',
    },
    {
      name: 'Amazon Aurora',
      summary: 'Relacional compatible con MySQL y PostgreSQL, más rápida que los estándar, con almacenamiento replicado en tres AZ.',
    },
    {
      name: 'Amazon DynamoDB',
      summary: 'NoSQL clave-valor y documentos, sin servidores, con latencia de milisegundos de un dígito a cualquier escala.',
    },
    {
      name: 'Amazon ElastiCache',
      summary: 'Caché en memoria (Valkey, Redis OSS, Memcached) con latencia de microsegundos delante de tu base.',
    },
    {
      name: 'Amazon Redshift',
      summary: 'Almacén de datos (data warehouse) a escala de petabytes para análisis con SQL y herramientas de BI.',
    },
    {
      name: 'Amazon Neptune',
      summary: 'Base de grafos para datos muy conectados: recomendaciones, detección de fraude, redes sociales.',
    },
    {
      name: 'Amazon DocumentDB',
      summary: 'Base de documentos JSON compatible con MongoDB: usas los mismos drivers y herramientas.',
    },
  ],
  cards: [
    {
      id: 'databases-1',
      prompt:
        'Una clínica en Medellín usa un software de historias clínicas que solo funciona con Microsoft SQL Server. Quiere dejar de administrar el servidor y que AWS se encargue de parches y respaldos.',
      options: [
        {
          service: 'Amazon Aurora',
          why: 'Aurora solo es compatible con MySQL y PostgreSQL. Un software atado a SQL Server no funcionaría sin cambiar de motor.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS ofrece SQL Server como motor administrado y automatiza el aprovisionamiento, los parches y los respaldos.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB guarda documentos JSON compatibles con MongoDB. No ejecuta un motor relacional como SQL Server.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift es un almacén de datos para análisis, no la base transaccional de una aplicación de historias clínicas.',
        },
      ],
      answer: 'Amazon RDS',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-2',
      prompt:
        'Una panadería en Arequipa lleva sus pedidos e inventario en una pequeña base MySQL con tablas relacionadas. Quiere moverla a AWS con pocos clics y olvidarse de instalar parches y sacar respaldos.',
      options: [
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB es NoSQL clave-valor. Para tablas relacionadas en MySQL tendrías que rediseñar tus datos y tu código.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache es una caché en memoria para acelerar lecturas. No reemplaza a la base principal de pedidos.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS te da MySQL administrado en pocos clics y automatiza parches y respaldos: justo lo que necesita un negocio pequeño.',
        },
      ],
      answer: 'Amazon RDS',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-3',
      prompt:
        'Una fintech en Bogotá usa PostgreSQL y crece rápido. Quiere seguir con el mismo motor, pero con más rendimiento, almacenamiento que crece solo y datos replicados en tres zonas de disponibilidad.',
      options: [
        {
          service: 'Amazon RDS',
          why: 'RDS para PostgreSQL también es administrado, pero el almacenamiento compartido con seis copias en tres AZ, que crece solo hasta 128 TiB, es propio de Aurora.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune es una base de grafos. No es compatible con PostgreSQL ni con una aplicación relacional existente.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora es compatible con PostgreSQL, es más rápida que PostgreSQL estándar y su almacenamiento crece solo y se replica en tres AZ.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB es NoSQL. Cambiar a ella obligaría a reescribir una aplicación pensada para PostgreSQL.',
        },
      ],
      answer: 'Amazon Aurora',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-4',
      prompt:
        'Una tienda online en Guadalajara corre sobre MySQL y las consultas ya van lentas en temporada alta. Quiere un motor relacional compatible con su código actual que sea varias veces más rápido que MySQL estándar.',
      options: [
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB es compatible con MongoDB, no con MySQL. Tendrías que cambiar el modelo de datos y el código.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'Una caché puede aliviar lecturas repetidas, pero no cambia el motor ni acelera las consultas que llegan a la base.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora es compatible con MySQL y AWS indica que es hasta cinco veces más rápida que MySQL estándar.',
        },
      ],
      answer: 'Amazon Aurora',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-5',
      prompt:
        'Una app de delivery en Lima guarda el carrito de cada pedido por su identificador. En los picos del almuerzo recibe millones de peticiones y necesita milisegundos de un dígito sin administrar servidores.',
      options: [
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB es clave-valor, no tiene servidores que administrar y da latencia de milisegundos de un dígito a cualquier escala.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS es relacional y corre sobre instancias que eliges y dimensionas. Para accesos simples por clave a escala masiva no es lo ideal.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune sirve para recorrer relaciones en un grafo. Leer un carrito por su identificador no necesita grafos.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift está hecho para consultas analíticas sobre grandes volúmenes, no para miles de lecturas y escrituras pequeñas por segundo.',
        },
      ],
      answer: 'Amazon DynamoDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-6',
      prompt:
        'Un estudio de videojuegos en Santiago guarda el progreso de cada cuenta por su ID. No necesita uniones entre tablas, espera picos enormes en cada lanzamiento y quiere una base NoSQL sin servidores.',
      options: [
        {
          service: 'Amazon Aurora',
          why: 'Aurora es relacional. Sus ventajas (SQL, uniones, compatibilidad con MySQL) no hacen falta para leer y guardar por ID.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache es una caché en memoria para acelerar lecturas. El progreso necesita una base duradera como almacén principal.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB es NoSQL clave-valor sin servidores, pensada para juegos y apps con mucho tráfico que acceden por clave.',
        },
      ],
      answer: 'Amazon DynamoDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-7',
      prompt:
        'Un periódico digital en Caracas tiene una portada que se lee miles de veces por segundo. La base relacional se satura respondiendo siempre las mismas consultas. Quiere una capa en memoria delante de ella.',
      options: [
        {
          service: 'Amazon RDS',
          why: 'RDS ya es la base relacional que se satura. Agregar otra base no resuelve las lecturas repetidas; una caché sí.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift sirve para análisis de datos históricos, no para servir la misma página miles de veces por segundo.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache guarda en memoria los resultados más pedidos y los responde con latencia de microsegundos, quitando carga a la base.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB es una base NoSQL completa. Aquí no quieres mover tus datos, solo poner una caché delante de la base actual.',
        },
      ],
      answer: 'Amazon ElastiCache',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-8',
      prompt:
        'Un concurso de trivia en vivo en Asunción muestra un ranking de puntajes que cambia cada segundo mientras miles de personas responden. Necesita lecturas y escrituras en memoria, ultrarrápidas.',
      options: [
        {
          service: 'Amazon Neptune',
          why: 'Neptune guarda relaciones entre datos en un grafo. Un ranking de puntajes no necesita recorrer conexiones.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'Los rankings de juegos y las sesiones son casos de uso clásicos de ElastiCache: datos en memoria con latencia de microsegundos.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB guarda documentos JSON en disco. No es una capa en memoria para un ranking que cambia cada segundo.',
        },
      ],
      answer: 'Amazon ElastiCache',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-9',
      prompt:
        'Una cadena de farmacias en Guayaquil quiere analizar cinco años de ventas de todas sus sucursales con consultas SQL complejas y conectar su herramienta de inteligencia de negocios.',
      options: [
        {
          service: 'Amazon Aurora',
          why: 'Aurora es una base transaccional (OLTP) para la operación diaria. Las consultas analíticas sobre años de historia van a un almacén de datos.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift es un almacén de datos a escala de petabytes, hecho para análisis con SQL y herramientas de BI.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB brilla en accesos rápidos por clave. No está pensada para consultas SQL analíticas que recorren años de ventas.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'databases-10',
      prompt:
        'Una universidad en Córdoba quiere juntar datos de matrículas, notas y pagos de varios sistemas en un solo lugar para hacer reportes analíticos de toda la institución con SQL.',
      options: [
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache acelera lecturas repetidas en memoria. No es el lugar para consolidar años de datos y analizarlos.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune sirve para datos muy conectados en un grafo, no para reportes analíticos con SQL sobre datos consolidados.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS es ideal para la operación diaria de una aplicación, pero los reportes analíticos de gran volumen van mejor en un almacén de datos.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift es el almacén de datos de AWS: consolida datos de varias fuentes y responde consultas analíticas con SQL.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'databases-11',
      prompt:
        'Una red de emprendedoras en San José, Costa Rica, quiere sugerir contactos del tipo "conoces a alguien que conoce a esta persona", recorriendo millones de conexiones entre perfiles.',
      options: [
        {
          service: 'Amazon Neptune',
          why: 'Neptune es una base de grafos optimizada para relaciones: recorrer contactos de contactos es su caso de uso típico.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB lee rápido por clave, pero recorrer muchos niveles de relaciones obliga a hacer muchas consultas encadenadas.',
        },
        {
          service: 'Amazon RDS',
          why: 'En una base relacional estas consultas necesitan muchas uniones y se vuelven lentas cuando crecen las conexiones.',
        },
      ],
      answer: 'Amazon Neptune',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-12',
      prompt:
        'Una cooperativa de crédito en La Paz quiere detectar fraude descubriendo cuentas que comparten teléfonos, direcciones y dispositivos, aunque la relación esté a varios saltos de distancia.',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift analiza grandes volúmenes con SQL, pero no está optimizado para recorrer cadenas de relaciones entre entidades.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB guarda documentos JSON. Seguir conexiones entre muchos documentos no es su fortaleza.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora es relacional. Encontrar vínculos a varios saltos exige uniones costosas que un grafo resuelve mejor.',
        },
        {
          service: 'Amazon Neptune',
          why: 'La detección de fraude es un caso de uso clásico de Neptune: sigue relaciones entre cuentas, dispositivos y direcciones en un grafo.',
        },
      ],
      answer: 'Amazon Neptune',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-13',
      prompt:
        'Una editorial en Buenos Aires tiene su catálogo en MongoDB, con documentos JSON. Quiere una base administrada en AWS y seguir usando los mismos drivers y herramientas sin reescribir la aplicación.',
      options: [
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB también guarda documentos, pero no es compatible con MongoDB: tendrías que cambiar los drivers y parte del código.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB es compatible con MongoDB, así que la aplicación sigue usando sus drivers y herramientas actuales.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune es una base de grafos. Un catálogo de documentos JSON no necesita recorrer relaciones.',
        },
      ],
      answer: 'Amazon DocumentDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-14',
      prompt:
        'Un museo en Ciudad de México gestiona fichas de obras en JSON, cada una con campos distintos. Su equipo ya trabaja con herramientas de MongoDB y quiere un servicio administrado de documentos.',
      options: [
        {
          service: 'Amazon RDS',
          why: 'RDS es relacional: exige un esquema fijo de tablas y no es compatible con las herramientas de MongoDB.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache es una caché en memoria. No es la base duradera donde vive el catálogo del museo.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora es relacional y compatible con MySQL o PostgreSQL, no con MongoDB.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB es una base de documentos JSON administrada y compatible con MongoDB: encaja con campos variables y con su equipo.',
        },
      ],
      answer: 'Amazon DocumentDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
  ],
};
