import type { ServiceFamily } from '../../domain/ServiceFamily';

export const migrationFamily: ServiceFamily = {
  id: 'migration',
  title: 'Migración',
  summary:
    'Cada uno cubre un paso: decidir con costos (Migration Evaluator), descubrir servidores y dependencias (Application Discovery Service), mover servidores (Application Migration Service), mover bases (DMS), convertir esquemas (SCT) y seguir el avance (Migration Hub).',
  services: [
    {
      name: 'AWS Application Discovery Service',
      summary: 'Recopila configuración, uso y comportamiento de tus servidores locales para planificar la migración.',
    },
    {
      name: 'Migration Evaluator',
      summary: 'Arma un caso de negocio con datos: costos proyectados en la nube y opciones de licencias antes de decidir.',
    },
    {
      name: 'AWS Application Migration Service',
      summary: 'Rehost (lift-and-shift): convierte servidores físicos, virtuales o de otra nube para correr en AWS sin cambios.',
    },
    {
      name: 'AWS DMS',
      summary: 'Migra y replica bases de datos con mínima interrupción: la base origen sigue operando durante la migración.',
    },
    {
      name: 'AWS SCT',
      summary: 'Convierte el esquema de una base (y el SQL de tu código) de un motor a otro distinto, por ejemplo Oracle a PostgreSQL.',
    },
    {
      name: 'AWS Migration Hub',
      summary: 'Un solo lugar para seguir el avance de tus migraciones, sin importar qué herramientas de AWS o socios uses.',
    },
  ],
  cards: [
    {
      id: 'migration-1',
      prompt:
        'Una aseguradora en Lima tiene 300 servidores en su centro de datos y nadie sabe bien cuáles dependen de cuáles. Antes de planificar, necesita recopilar su configuración, su uso y su comportamiento.',
      options: [
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service recopila configuración, uso y comportamiento de los servidores locales para planificar la migración.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub muestra el avance de las migraciones. Puede ver lo descubierto, pero la recopilación la hace otro servicio.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service mueve servidores a AWS. Aquí todavía no sabes qué mover ni en qué orden.',
        },
      ],
      answer: 'AWS Application Discovery Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-2',
      prompt:
        'El equipo técnico de un hospital en Barranquilla quiere conocer a fondo sus servidores locales: qué corre en cada uno, cuánto se usa y cómo se comunican, para armar las olas de migración.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migra bases de datos. No inventaría servidores ni su uso para planificar las olas.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT convierte esquemas de bases de datos entre motores. No analiza los servidores del centro de datos.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service reúne datos de configuración, uso y comportamiento de los servidores: la base para planificar olas.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service ejecuta el traslado de servidores. Primero hace falta descubrirlos y entenderlos.',
        },
      ],
      answer: 'AWS Application Discovery Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-3',
      prompt:
        'El directorio de una cadena de supermercados en Santa Cruz no aprobará nada sin un caso de negocio con datos: cuánto costaría su infraestructura en la nube y cuánto podría ahorrar.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub sigue el avance de migraciones en curso. No arma el caso de negocio previo a la decisión.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator construye un caso de negocio basado en datos, con costos proyectados en la nube para decidir.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service recopila datos técnicos para planificar. El caso de negocio para el directorio es trabajo de Migration Evaluator.',
        },
      ],
      answer: 'Migration Evaluator',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-4',
      prompt:
        'Una universidad en Trujillo quiere comparar, antes de migrar, si le conviene traer sus propias licencias de Windows Server y SQL Server o usar instancias con la licencia incluida.',
      options: [
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service mueve los servidores cuando ya decidiste. No compara escenarios de licencias.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub da seguimiento al avance de la migración, no evalúa costos de licencias antes de decidir.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator compara escenarios como traer tus licencias (BYOL) o usar licencia incluida, dentro del caso de negocio.',
        },
      ],
      answer: 'Migration Evaluator',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-5',
      prompt:
        'Un estudio contable en Mendoza quiere llevar sus 20 máquinas virtuales a AWS tal como están, sin cambiar las aplicaciones y con la mínima interrupción posible.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migra bases de datos, no servidores completos con su sistema operativo y aplicaciones.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service hace rehost: convierte los servidores para que corran en AWS sin cambios y con mínima interrupción.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT convierte esquemas de bases de datos entre motores. Aquí no cambias nada, solo trasladas los servidores.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub sigue el avance, pero no copia ni convierte los servidores por sí mismo.',
        },
      ],
      answer: 'AWS Application Migration Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-6',
      prompt:
        'Un e-commerce en Guadalajara va a mover sus servidores físicos a AWS sin cambios. Antes del corte quiere lanzar pruebas en AWS que no interrumpan la operación de la tienda.',
      options: [
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service recopila datos para planificar. No replica los servidores ni lanza pruebas en AWS.',
        },
        {
          service: 'AWS DMS',
          why: 'AWS DMS se ocupa de bases de datos. Los servidores completos y sus pruebas previas al corte son otro servicio.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service permite lanzar pruebas que no interrumpen la operación antes de migrar servidores físicos o virtuales.',
        },
      ],
      answer: 'AWS Application Migration Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-7',
      prompt:
        'Una agencia de marketing en Montevideo tiene sus servidores en otro proveedor de nube y quiere llevarlos a Amazon EC2 con el mismo proceso automatizado, sin reescribir sus aplicaciones.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub reúne el estado de las migraciones. El traslado de los servidores lo hace otro servicio.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT convierte esquemas de bases de datos. No traslada servidores entre nubes.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service convierte servidores físicos, virtuales o de otra nube para que corran de forma nativa en AWS.',
        },
      ],
      answer: 'AWS Application Migration Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-8',
      prompt:
        'Una tienda en Quito quiere mover su base MySQL local a Amazon RDS para MySQL, el mismo motor. La tienda debe seguir vendiendo mientras se copian los datos.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migra la base mientras el origen sigue operando, así la tienda no deja de vender.',
        },
        {
          service: 'AWS SCT',
          why: 'Con el mismo motor en origen y destino no hay esquema que convertir: AWS SCT no hace falta aquí.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service traslada servidores completos. Para llegar a una base administrada en RDS se usa AWS DMS.',
        },
      ],
      answer: 'AWS DMS',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-9',
      prompt:
        'Una distribuidora en San Salvador necesita replicar de forma continua su base Oracle local hacia AWS durante semanas, hasta el día del corte, sin detener el sistema de pedidos.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub muestra el avance de las migraciones, pero no copia ni replica datos.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service recopila datos de servidores para planificar. No replica bases de datos.',
        },
        {
          service: 'AWS DMS',
          why: 'AWS DMS ofrece replicación continua de datos mientras la base origen sigue funcionando, hasta que decidas el corte.',
        },
      ],
      answer: 'AWS DMS',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-10',
      prompt:
        'Una cadena de restaurantes en Lima quiere enviar los datos de ventas de sus bases MySQL y SQL Server hacia Amazon Redshift para consolidarlos y analizarlos.',
      options: [
        {
          service: 'AWS SCT',
          why: 'AWS SCT convierte esquemas entre motores, pero no lleva los datos de forma continua hacia el almacén.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator arma casos de negocio con costos. No mueve datos entre bases.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service traslada servidores, no envía datos de varias bases hacia un almacén de datos.',
        },
        {
          service: 'AWS DMS',
          why: 'AWS DMS puede llevar datos a Amazon Redshift desde orígenes como MySQL y SQL Server para consolidarlos y analizarlos.',
        },
      ],
      answer: 'AWS DMS',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-11',
      prompt:
        'Una cooperativa en Cuenca migrará de Oracle a Aurora PostgreSQL. Antes de mover los datos, necesita convertir sus tablas, vistas y código de base de datos al formato del nuevo motor.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS mueve y replica los datos. Convertir el esquema entre motores distintos es el trabajo clásico de AWS SCT.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT convierte el esquema de un motor a otro, como Oracle a Aurora PostgreSQL, y guía lo que no se convierte solo.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub da seguimiento al avance. No convierte esquemas de bases de datos.',
        },
      ],
      answer: 'AWS SCT',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-12',
      prompt:
        'Una fintech en Bogotá pasará de SQL Server a MySQL. Además del esquema, tiene consultas SQL escritas dentro de su código Java que también deben adaptarse al nuevo motor.',
      options: [
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service analiza servidores para planificar. No toca esquemas ni código SQL.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator estima costos y arma el caso de negocio. No convierte bases de datos.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT convierte el esquema entre motores distintos y también el SQL dentro del código de aplicaciones en Java o C#.',
        },
      ],
      answer: 'AWS SCT',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-13',
      prompt:
        'Una empresa logística en Panamá migra servidores con una herramienta, bases de datos con otra y un sistema con la herramienta de un socio. Quiere ver el avance de cada aplicación en un solo lugar.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub reúne en un solo lugar el avance de las migraciones, aunque uses herramientas de AWS y de socios.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service descubre servidores antes de migrar. No sigue el avance de varias herramientas.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator sirve para decidir con costos antes de empezar, no para seguir una migración en curso.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT convierte esquemas de bases de datos. No ofrece una vista del avance de todo el portafolio.',
        },
      ],
      answer: 'AWS Migration Hub',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-14',
      prompt:
        'La persona a cargo de la migración de un ministerio en Santo Domingo necesita un tablero con el estado de todas las aplicaciones del portafolio, sin importar qué herramienta mueve cada una.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migra bases de datos. Es una de las herramientas cuyo avance quieres ver, no el tablero central.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service traslada servidores. Muestra lo suyo, pero no el estado de todo el portafolio.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub da visibilidad del estado de las migraciones de todo el portafolio, uses la herramienta que uses.',
        },
      ],
      answer: 'AWS Migration Hub',
      topicSlug: 'migration-strategies',
    },
  ],
};
