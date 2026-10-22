import type { Mission } from '../../../domain/Mission';

/**
 * Estudio de Juegos Cóndor: a game studio from Quito choosing EC2 hardware for a multiplayer launch.
 * Practices matching workloads to EC2 instance families (compute, accelerated, memory) and vertical scaling.
 */
export const ec2Compute2: Mission = {
  id: 'ec2-compute-2',
  track: 'tech',
  topicSlug: 'ec2-compute',
  buildingId: 'game-studio',
  title: 'Hardware para volar alto',
  client: { name: 'Sofía Paucar', role: 'Directora técnica del Estudio de Juegos Cóndor' },
  intro: [
    'Hola, qué gusto. Soy Sofía Paucar, directora técnica del Estudio de Juegos Cóndor. Somos de Quito y hacemos juegos inspirados en leyendas andinas.',
    'En tres meses lanzamos nuestro primer juego multijugador en línea. Vamos a usar Amazon EC2, pero hay decenas de tipos de instancia y el equipo los elige al azar.',
    'En la beta, los servidores de partidas se trabaron, el entrenamiento de nuestros personajes con IA tardó semanas y la tabla de puntajes respondía lento.',
    'Si el lanzamiento falla, los jugadores no vuelven. ¿Me ayudas a escoger el hardware correcto para cada carga?',
  ],
  outro: {
    passed: [
      '¡Volamos! Cada carga tiene ahora la familia de instancias que le corresponde, y sabemos crecer una instancia cuando se queda corta.',
      'El lanzamiento salió sin trabas y los jugadores ya piden la segunda temporada. Tu nombre va en los créditos del juego.',
    ],
    failed: [
      'Mmm... con estas elecciones creo que la beta se repetiría el día del lanzamiento.',
      'Repasa la teoría sobre las familias de instancias EC2 y vuelve cuando quieras. El cóndor espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'match-servers',
      prompt:
        'Primero, los servidores dedicados de partidas: calculan la física y las posiciones de cientos de jugadores a la vez, y en la beta la CPU se quedaba al cien por ciento. ¿Qué familia de instancias elegimos?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'match-memory',
          label: 'Optimizadas para memoria',
          definition:
            'Familia de instancias que ofrece rendimiento rápido con grandes conjuntos de datos en memoria.',
          explanation:
            'Se eligen cuando el problema es la memoria; aquí la pista es una CPU saturada.',
          correct: false,
        },
        {
          id: 'compute-optimized',
          label: 'Optimizadas para cómputo',
          definition:
            'Familia de instancias con procesadores de alto rendimiento para cargas que usan mucha CPU.',
          explanation:
            'Los servidores de videojuegos dedicados son una carga típica de esta familia: priorizan procesadores de alto rendimiento, justo lo que faltó en la beta.',
          correct: true,
        },
        {
          id: 'match-storage',
          label: 'Optimizadas para almacenamiento',
          definition:
            'Familia de instancias con E/S de baja latencia y alto rendimiento sobre grandes conjuntos de datos locales.',
          explanation:
            'Esta familia es para muchas lecturas y escrituras sobre almacenamiento local; el cuello de botella de las partidas es la CPU.',
          correct: false,
        },
        {
          id: 'match-general',
          label: 'Uso general',
          definition:
            'Familia de instancias que equilibra cómputo, memoria y red sin priorizar ninguno.',
          explanation:
            'Uso general se elige cuando no destaca ningún recurso; aquí destaca claramente la CPU.',
          correct: false,
        },
      ],
    },
    {
      id: 'train-npcs',
      prompt:
        'Ahora la IA: queremos entrenar un modelo de aprendizaje automático que controle a los personajes del juego, y el equipo de datos dice que necesita GPU. ¿Qué familia de instancias usamos?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'accelerated',
          label: 'Cómputo acelerado',
          definition:
            'Familia de instancias que usa aceleradores de hardware o coprocesadores, como GPU.',
          explanation:
            'Las GPU y otros aceleradores son la pista: esta familia es la indicada para aprendizaje automático y procesamiento gráfico.',
          correct: true,
        },
        {
          id: 'train-memory',
          label: 'Optimizadas para memoria',
          definition:
            'Familia de instancias pensada para trabajar con grandes volúmenes de datos en memoria.',
          explanation:
            'Aportan mucha memoria, pero no las GPU que pide el equipo de datos para entrenar el modelo.',
          correct: false,
        },
        {
          id: 'train-storage',
          label: 'Optimizadas para almacenamiento',
          definition:
            'Familia de instancias centrada en E/S rápida sobre almacenamiento local.',
          explanation:
            'Se eligen por la velocidad de lectura y escritura local, no por tener GPU para entrenar modelos.',
          correct: false,
        },
        {
          id: 'train-general',
          label: 'Uso general',
          definition:
            'Familia de instancias equilibrada para cargas como servidores web o repositorios de código.',
          explanation:
            'La pista de las GPU apunta a una familia con aceleradores de hardware, no a una equilibrada.',
          correct: false,
        },
      ],
    },
    {
      id: 'leaderboard',
      prompt:
        'La tabla de puntajes usa una base de datos que mantiene en memoria el progreso de todos los jugadores para responder al instante, y en la beta se quedaba sin memoria. ¿Qué familia conviene?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'leaderboard-compute',
          label: 'Optimizadas para cómputo',
          definition:
            'Familia de instancias con procesadores de alto rendimiento, típica para procesamiento por lotes y transcodificación.',
          explanation:
            'Es la trampa típica: elegir cómputo cuando el problema es la memoria. La pista aquí es la base de datos en memoria.',
          correct: false,
        },
        {
          id: 'leaderboard-accelerated',
          label: 'Cómputo acelerado',
          definition:
            'Familia de instancias con GPU u otros aceleradores para cálculos especializados.',
          explanation:
            'Los aceleradores sirven para gráficos y aprendizaje automático, no para mantener una base de datos en memoria.',
          correct: false,
        },
        {
          id: 'leaderboard-storage',
          label: 'Optimizadas para almacenamiento',
          definition:
            'Familia de instancias que prioriza la E/S de baja latencia sobre datos guardados en discos locales.',
          explanation:
            'Esta familia se centra en el disco local; la tabla de puntajes trabaja con los datos en memoria.',
          correct: false,
        },
        {
          id: 'memory-optimized',
          label: 'Optimizadas para memoria',
          definition:
            'Familia de instancias que ofrece rendimiento rápido con grandes conjuntos de datos en memoria.',
          explanation:
            'Las bases de datos en memoria son una carga típica de esta familia: darán a la tabla de puntajes la memoria que le faltó en la beta.',
          correct: true,
        },
      ],
    },
    {
      id: 'build-server',
      prompt:
        'Último detalle: nuestro único servidor que compila el juego se queda corto de CPU y memoria. Decidimos cambiarlo a un tipo de instancia más grande. ¿Cómo se llama ese tipo de escalado?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'horizontal',
          label: 'Escalado horizontal',
          definition:
            'Aumentar o reducir la capacidad agregando o quitando instancias.',
          explanation:
            'Aquí no se agregan instancias: se cambia la capacidad de la misma instancia.',
          correct: false,
        },
        {
          id: 'change-ami',
          label: 'Cambio de AMI',
          definition:
            'Lanzar la instancia desde otra plantilla con un sistema operativo o software distinto.',
          explanation:
            'La AMI define el software; cambiarla no le da más CPU ni memoria al servidor.',
          correct: false,
        },
        {
          id: 'vertical',
          label: 'Escalado vertical',
          definition:
            'Dar más o menos capacidad a una misma instancia cambiando su tipo (scale up/down).',
          explanation:
            'Cambiar el tipo de instancia para darle más capacidad a una misma instancia es escalado vertical, justo lo que decidieron con el servidor de compilación.',
          correct: true,
        },
        {
          id: 'bigger-security-group',
          label: 'Ampliar el security group',
          definition:
            'Modificar las reglas del firewall virtual que controla el tráfico hacia una instancia.',
          explanation:
            'El security group controla el tráfico de red; no cambia la capacidad de cómputo del servidor.',
          correct: false,
        },
      ],
    },
  ],
};
