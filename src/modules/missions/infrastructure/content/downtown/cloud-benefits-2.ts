import type { Mission } from '../../../domain/Mission';

/**
 * Charrúa Games: a video game studio in Montevideo preparing to launch its online game abroad.
 * Practices the six advantages of the cloud by name (agility, go global, economies of scale) and high availability versus elasticity.
 */
export const cloudBenefits2: Mission = {
  id: 'cloud-benefits-2',
  track: 'downtown',
  topicSlug: 'cloud-benefits',
  buildingId: 'central-tower',
  title: 'Un juego para todo el mundo',
  client: { name: 'Martín Olivera', role: 'Director de tecnología de Charrúa Games' },
  intro: [
    '¡Hola! Soy Martín Olivera, director de tecnología de Charrúa Games. Tenemos nuestras oficinas en el piso doce de la Torre Central, aunque el estudio nació en un garaje de Montevideo.',
    'Hacemos juegos en línea para celulares. Hasta ahora todo corría en dos servidores que compramos hace años y que tenemos en una sala del estudio.',
    'Ahora un publicador quiere lanzar nuestro nuevo juego en México y en España. Mis socios están entusiasmados, pero no entienden por qué insisto en hacerlo en AWS y no comprando más servidores.',
    'Mañana tengo que presentarles los argumentos, y el día del lanzamiento el juego no puede fallar. ¿Me ayudas a armar el caso?',
  ],
  outro: {
    passed: [
      '¡Ahora sí tengo argumentos! Prototipos en una tarde, servidores cerca de los jugadores de México y España, y precios que solos nunca conseguiríamos.',
      'Y con el juego repartido en varias Availability Zones, el lanzamiento va a aguantar aunque falle un centro de datos. Gracias: tu nombre va a aparecer en los créditos.',
    ],
    failed: [
      'Mmm... con estas respuestas mis socios me van a hacer muchas preguntas que no sabré contestar.',
      'Repasa la teoría de los beneficios de la nube con calma y vuelve cuando quieras. La partida sigue guardada.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'prototype-fast',
      prompt:
        'Primer argumento. Antes, conseguir un servidor nuevo nos tomaba seis semanas entre cotizaciones y envíos. Queremos probar prototipos de juegos en una tarde y descartar los que no gustan sin haber gastado casi nada. ¿Qué ventaja de la nube es esa?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'Ventaja por la que AWS agrupa el uso de cientos de miles de clientes y consigue costos más bajos que se traducen en precios de pago por uso más bajos.',
          explanation:
            'Las economías de escala explican por qué los precios son más bajos, pero Martín habla de pasar de semanas a minutos para tener recursos y experimentar.',
          correct: false,
        },
        {
          id: 'speed-agility',
          label: 'Increase speed and agility',
          definition:
            'Ventaja por la que los nuevos recursos están a un clic: el tiempo para tenerlos pasa de semanas a minutos y experimentar cuesta menos.',
          explanation:
            'Es justo el caso del estudio: obtener servidores en minutos en lugar de seis semanas le permite probar prototipos en una tarde y descartar los que no funcionan a bajo costo.',
          correct: true,
        },
        {
          id: 'go-global',
          label: 'Go global in minutes',
          definition:
            'Ventaja por la que una aplicación se despliega en varias Regiones del mundo con pocos clics, con menor latencia para los usuarios.',
          explanation:
            'Esta ventaja trata de llegar a usuarios de otros países. Aquí el problema es cuánto tarda el estudio en tener recursos para experimentar.',
          correct: false,
        },
        {
          id: 'stop-data-centers',
          label: 'Stop spending money running and maintaining data centers',
          definition:
            'Ventaja por la que la empresa deja de instalar, cablear y alimentar servidores y se enfoca en lo que diferencia a su negocio.',
          explanation:
            'Dejar de operar centros de datos libera tiempo del equipo, pero la necesidad de Martín es la rapidez para obtener recursos y experimentar.',
          correct: false,
        },
      ],
    },
    {
      id: 'players-abroad',
      prompt:
        'Segundo argumento. En la versión de prueba, los jugadores de México y España sienten que el juego responde lento, porque nuestros servidores están aquí en Montevideo. No podemos construir centros de datos allá. ¿Qué ventaja de la nube nos ayuda?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'stop-guessing',
          label: 'Stop guessing capacity',
          definition:
            'Ventaja por la que ya no hace falta adivinar cuánta infraestructura se necesitará, porque se escala hacia arriba o hacia abajo con pocos minutos de aviso.',
          explanation:
            'Tener más o menos capacidad no acerca los servidores a los jugadores. El problema aquí es la distancia, que produce latencia.',
          correct: false,
        },
        {
          id: 'variable-expense',
          label: 'Trade fixed expense for variable expense',
          definition:
            'Ventaja por la que se paga solo cuando se consumen recursos y solo por lo que se consume, en vez de invertir por adelantado.',
          explanation:
            'Pagar por uso cambia la forma de pagar, pero no reduce el tiempo de respuesta para los jugadores que están lejos de Montevideo.',
          correct: false,
        },
        {
          id: 'go-global',
          label: 'Go global in minutes',
          definition:
            'Ventaja por la que una aplicación se despliega en varias Regiones del mundo con pocos clics, con menor latencia para los usuarios.',
          explanation:
            'El estudio puede desplegar el juego en Regiones de AWS cercanas a sus jugadores, sin construir ni alquilar centros de datos en esos países, y así reducir la latencia.',
          correct: true,
        },
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'Ventaja por la que AWS agrupa el uso de cientos de miles de clientes y consigue costos más bajos que se traducen en precios de pago por uso más bajos.',
          explanation:
            'Los precios bajos por la escala de AWS no resuelven la lentitud: lo que necesitan los jugadores es tener los servidores más cerca.',
          correct: false,
        },
      ],
    },
    {
      id: 'lower-prices',
      prompt:
        'Tercer argumento, para mi socio contador. Él calculó que la hora de un servidor en AWS nos sale más barata que comprar y mantener uno propio, y no entiende cómo AWS logra esos precios. ¿Qué ventaja lo explica?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'variable-expense',
          label: 'Trade fixed expense for variable expense',
          definition:
            'Ventaja por la que se paga solo cuando se consumen recursos y solo por lo que se consume, en vez de invertir por adelantado.',
          explanation:
            'Es una confusión frecuente: el gasto variable explica que se paga solo lo que se usa, no por qué el precio de cada hora es más bajo.',
          correct: false,
        },
        {
          id: 'speed-agility',
          label: 'Increase speed and agility',
          definition:
            'Ventaja por la que los nuevos recursos están a un clic: el tiempo para tenerlos pasa de semanas a minutos y experimentar cuesta menos.',
          explanation:
            'La agilidad tiene que ver con la rapidez para obtener recursos, no con el precio por hora que AWS puede ofrecer.',
          correct: false,
        },
        {
          id: 'stop-guessing',
          label: 'Stop guessing capacity',
          definition:
            'Ventaja por la que ya no hace falta adivinar cuánta infraestructura se necesitará, porque se escala hacia arriba o hacia abajo con pocos minutos de aviso.',
          explanation:
            'Escalar con pocos minutos de aviso evita sobredimensionar, pero no explica por qué la hora de servidor cuesta menos en AWS.',
          correct: false,
        },
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'Ventaja por la que AWS agrupa el uso de cientos de miles de clientes y consigue costos más bajos que se traducen en precios de pago por uso más bajos.',
          explanation:
            'Un estudio pequeño, comprando su propio hardware, no alcanza el volumen de AWS. Al agrupar el uso de cientos de miles de clientes, AWS logra costos más bajos y los traslada a sus precios.',
          correct: true,
        },
      ],
    },
    {
      id: 'launch-day',
      prompt:
        'Último punto, el que más me preocupa. El día del lanzamiento, el servidor de partidas tiene que seguir funcionando aunque falle uno de los centros de datos de AWS. ¿Qué concepto buscamos y cómo lo logramos?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'high-availability',
          label: 'Alta disponibilidad, desplegando el juego en varias Availability Zones',
          definition:
            'Capacidad de una aplicación para seguir funcionando aunque falle una parte de la infraestructura, repartiéndola entre varias Availability Zones.',
          explanation:
            'Cada Availability Zone tiene energía, red y conectividad redundantes. Si el juego corre en varias, la falla de una no deja a los jugadores sin partidas.',
          correct: true,
        },
        {
          id: 'elasticity',
          label: 'Elasticidad, agregando y quitando servidores según la cantidad de jugadores',
          definition:
            'Capacidad de aumentar o reducir recursos automáticamente según la demanda, sin sobredimensionar ni quedarse corto.',
          explanation:
            'La elasticidad responde a cambios de demanda, no a fallas. Martín pregunta qué pasa si se cae un centro de datos, no si llegan más jugadores.',
          correct: false,
        },
        {
          id: 'agility',
          label: 'Agilidad, obteniendo servidores nuevos en minutos',
          definition:
            'Rapidez para obtener recursos, experimentar e innovar a bajo costo, con recursos disponibles en minutos en lugar de semanas.',
          explanation:
            'Tener servidores en minutos es útil, pero no evita que el juego se caiga si falla el único centro de datos donde corre.',
          correct: false,
        },
        {
          id: 'bigger-server',
          label: 'Un único servidor mucho más grande en un solo centro de datos',
          definition:
            'Escalado vertical: reemplazar un servidor por otro con más CPU y memoria, en la misma ubicación.',
          explanation:
            'Un servidor más grande soporta más carga, pero sigue siendo un único punto de falla: si ese centro de datos falla, el juego se cae.',
          correct: false,
        },
      ],
    },
  ],
};
