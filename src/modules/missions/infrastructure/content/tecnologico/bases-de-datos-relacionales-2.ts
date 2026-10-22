import type { Mission } from '../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a video game store in San José (Costa Rica) whose self-managed MySQL on EC2 struggles at every launch.
 * Practices database on EC2 vs Amazon RDS, read replicas for read-heavy reports, the customer's duty to optimize queries,
 * and Amazon Aurora's MySQL compatibility and benefits.
 */
export const basesDeDatosRelacionales2: Mission = {
  id: 'bases-de-datos-relacionales-2',
  track: 'tecnologico',
  topicSlug: 'bases-de-datos-relacionales',
  buildingId: 'tienda-pixel',
  title: 'Game over para el servidor',
  client: { name: 'Diego Vargas', role: 'Dueño de la Tienda Gamer Pixel' },
  intro: [
    '¡Hey, jugador! Soy Diego Vargas, dueño de la Tienda Gamer Pixel. Desde San José, Costa Rica, vendemos videojuegos, consolas y periféricos a todo Centroamérica.',
    'La tienda en línea guarda pedidos, inventario y clientes en una base de datos MySQL que instalé yo mismo en una instancia de Amazon EC2. Soy el único que le aplica parches y la respalda, casi siempre de madrugada.',
    'Cada vez que sale un juego esperado, el catálogo y los reportes de ventas saturan la base y el checkout se vuelve lentísimo. La última preventa la perdimos a medias.',
    'En tres semanas sale el lanzamiento más grande del año. ¿Me ayudas a que la base de datos no nos haga game over?',
  ],
  outro: {
    passed: [
      '¡Nivel superado! La base pasó a un servicio administrado, los reportes van a réplicas de lectura y ya sé que optimizar mis consultas me toca a mí.',
      'Y con Aurora tenemos un motor compatible con MySQL listo para crecer. Gracias: tu nombre ya está en el tablero de récords de la tienda.',
    ],
    failed: [
      'Uf... con estas decisiones el lanzamiento nos encuentra otra vez con la barra de vida en rojo.',
      'Repasa la teoría de bases de datos relacionales y vuelve cuando quieras. Te guardo una partida.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'pixel-managed-db',
      prompt:
        'Primero, quiero dejar de pasar noches aplicando parches y respaldos. Busco que AWS se encargue de los parches, los respaldos, la detección de fallas y la recuperación, y seguir usando MySQL. ¿Qué hago?',
      topicSlug: 'bases-de-datos-relacionales',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-bigger-ec2',
          label: 'Mover MySQL a una instancia EC2 más grande',
          definition:
            'Base de datos autogestionada: AWS administra el hardware y el cliente instala, parcha, respalda y escala el sistema operativo y el motor.',
          explanation:
            'Una instancia más grande da más capacidad, pero Diego seguiría aplicando parches y respaldos todo él mismo, justo lo que quiere dejar.',
          correct: false,
        },
        {
          id: 'pixel-rds-mysql',
          label: 'Amazon RDS for MySQL',
          definition:
            'Servicio de base de datos relacional administrada que gestiona respaldos, parches, detección automática de fallas y recuperación.',
          explanation:
            'RDS es compatible con MySQL y se encarga de los parches, los respaldos, la detección de fallas y la recuperación. AWS lo recomienda como opción predeterminada para la mayoría de los despliegues relacionales.',
          correct: true,
        },
        {
          id: 'pixel-dynamodb',
          label: 'Amazon DynamoDB',
          definition: 'Base de datos NoSQL de clave-valor, serverless y totalmente administrada.',
          explanation:
            'DynamoDB es NoSQL y no ejecuta el motor MySQL relacional que usa la tienda; habría que rediseñar los datos y la aplicación.',
          correct: false,
        },
        {
          id: 'pixel-redshift',
          label: 'Amazon Redshift',
          definition: 'Data warehouse de AWS, optimizado para analizar grandes volúmenes de datos históricos.',
          explanation:
            'Redshift sirve para análisis de datos históricos; no es la base transaccional donde se registran los pedidos del día a día.',
          correct: false,
        },
      ],
    },
    {
      id: 'pixel-read-heavy',
      prompt:
        'Ya estamos en RDS. Pero en cada lanzamiento, los reportes de ventas y las búsquedas del catálogo, todas de solo lectura, saturan la instancia principal y frenan el checkout. ¿Qué agregamos?',
      topicSlug: 'bases-de-datos-relacionales',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-multi-az',
          label: 'Una instancia de reserva (standby) con Multi-AZ',
          definition:
            'Despliegue que replica de forma síncrona hacia una instancia de reserva en otra Availability Zone, con conmutación por error.',
          explanation:
            'En una instancia Multi-AZ la reserva no atiende lecturas; su objetivo principal es la alta disponibilidad, no aliviar los reportes.',
          correct: false,
        },
        {
          id: 'pixel-snapshots',
          label: 'Snapshots manuales cada hora',
          definition: 'Copias puntuales de la base de datos que se usan para restaurarla.',
          explanation:
            'Los snapshots sirven para restaurar la base de datos; no atienden consultas de los reportes ni del catálogo.',
          correct: false,
        },
        {
          id: 'pixel-read-replicas',
          label: 'Réplicas de lectura (read replicas)',
          definition:
            'Copias de la base de datos que reciben los cambios de forma asíncrona desde la instancia principal y atienden consultas de solo lectura.',
          explanation:
            'Mandar los reportes y las búsquedas del catálogo a réplicas de lectura escala las lecturas y deja la instancia principal libre para el checkout.',
          correct: true,
        },
        {
          id: 'pixel-back-to-ec2',
          label: 'Volver a instalar la base en una instancia EC2',
          definition:
            'Base de datos autogestionada en un servidor virtual, con control total del sistema operativo y del motor.',
          explanation:
            'En EC2 Diego volvería a gestionar el escalado y el resto de tareas él mismo; no es la forma de escalar lecturas en RDS.',
          correct: false,
        },
      ],
    },
    {
      id: 'pixel-slow-queries',
      prompt:
        'Revisando, descubrimos que algunas consultas del catálogo están mal escritas: recorren tablas enteras sin necesidad. Ahora que la base es administrada, ¿a quién le toca optimizarlas?',
      topicSlug: 'bases-de-datos-relacionales',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-customer-optimizes',
          label: 'A la tienda: optimizar la aplicación y las consultas sigue siendo responsabilidad del cliente',
          definition:
            'Reparto de tareas en una base de datos administrada: AWS gestiona parches, respaldos y escalado; el cliente diseña el esquema y optimiza las consultas.',
          explanation:
            'Con RDS, AWS se encarga de tareas como parches y respaldos, pero diseñar el esquema y optimizar las consultas sigue siendo trabajo de la tienda.',
          correct: true,
        },
        {
          id: 'pixel-aws-engine',
          label: 'A AWS, porque RDS administra el motor de base de datos',
          definition: 'Idea de que administrar el motor incluye revisar las consultas de la aplicación del cliente.',
          explanation:
            'Que AWS administre el motor no lo hace responsable de las consultas; creer que AWS las optimiza es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'pixel-aws-patches',
          label: 'A AWS, como parte de los parches automáticos del software',
          definition: 'Los parches de software actualizan el motor de base de datos y el sistema operativo.',
          explanation:
            'Los parches actualizan el software de base de datos; no reescriben ni optimizan las consultas de la tienda.',
          correct: false,
        },
        {
          id: 'pixel-aws-scaling',
          label: 'A AWS, porque en RDS el escalado es responsabilidad de AWS',
          definition: 'En una base de datos administrada como RDS, AWS se encarga de tareas como el escalado.',
          explanation:
            'Que AWS se ocupe del escalado no incluye arreglar consultas mal escritas; eso sigue siendo tarea de la tienda.',
          correct: false,
        },
      ],
    },
    {
      id: 'pixel-aurora',
      prompt:
        'Para el próximo año quiero un motor relacional totalmente administrado, con más rendimiento que MySQL estándar, almacenamiento que crezca solo y copias en varias Availability Zones, sin cambiar el código de la tienda. ¿Cuál elijo?',
      topicSlug: 'bases-de-datos-relacionales',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-redshift-engine',
          label: 'Amazon Redshift',
          definition: 'Data warehouse de AWS para consultas analíticas complejas sobre grandes volúmenes de datos históricos.',
          explanation:
            'Redshift está pensado para análisis, no para las transacciones del día a día de la tienda en línea.',
          correct: false,
        },
        {
          id: 'pixel-dynamodb-engine',
          label: 'Amazon DynamoDB',
          definition: 'Base de datos NoSQL de clave-valor, serverless y totalmente administrada.',
          explanation:
            'DynamoDB es NoSQL y no admite JOIN; obligaría a reescribir la tienda en lugar de mantener su código MySQL.',
          correct: false,
        },
        {
          id: 'pixel-rds-sqlserver',
          label: 'Amazon RDS for SQL Server',
          definition: 'Base de datos relacional administrada de Amazon RDS con el motor Microsoft SQL Server.',
          explanation:
            'Cambiar a SQL Server implica cambiar de motor y adaptar el código, justo lo que Diego quiere evitar.',
          correct: false,
        },
        {
          id: 'pixel-aurora-engine',
          label: 'Amazon Aurora (compatible con MySQL)',
          definition:
            'Motor de base de datos relacional totalmente administrado, parte de Amazon RDS y compatible con MySQL y PostgreSQL.',
          explanation:
            'Aurora usa el mismo código y herramientas de MySQL, ofrece mayor rendimiento que MySQL estándar, guarda copias en tres Availability Zones y su volumen crece automáticamente con los datos.',
          correct: true,
        },
      ],
    },
  ],
};
