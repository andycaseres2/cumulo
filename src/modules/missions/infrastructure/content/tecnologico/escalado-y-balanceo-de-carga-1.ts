import type { Mission } from '../../../domain/Mission';

/**
 * TeleVida: the telemedicine service of Clínica Vida in Barranquilla, swamped by video consultations every flu-season morning.
 * Practices EC2 Auto Scaling groups (minimum, maximum, desired), Application Load Balancer path routing,
 * health-check replacement and scaling in to stop paying for idle capacity.
 */
export const escaladoYBalanceoDeCarga1: Mission = {
  id: 'escalado-y-balanceo-de-carga-1',
  track: 'tecnologico',
  topicSlug: 'escalado-y-balanceo-de-carga',
  buildingId: 'clinic',
  title: 'La sala de espera virtual',
  client: { name: 'Valeria Ortiz', role: 'Coordinadora de TI de TeleVida, la telemedicina de Clínica Vida' },
  intro: [
    'Hola, qué bueno que llegaste. Soy Valeria Ortiz y coordino la tecnología de TeleVida, el servicio de telemedicina de Clínica Vida en Barranquilla.',
    'Nuestros pacientes agendan citas y hacen videoconsultas desde el celular. De madrugada casi nadie entra, pero en temporada de gripe, entre las siete y las diez de la mañana, se conectan miles de personas a la vez.',
    'Hoy todo corre en tres servidores fijos en Amazon EC2. En las mañanas la app se pone lentísima y los pacientes abandonan la sala de espera virtual; en las noches, esos servidores quedan prendidos sin hacer nada.',
    'Gerencia me pidió una solución antes del próximo pico de gripe. ¿Me ayudas a que TeleVida crezca cuando la necesitan y se achique cuando no?',
  ],
  outro: {
    passed: [
      '¡Lo logramos! Ahora el grupo de Auto Scaling agrega servidores cuando la sala de espera se llena, el balanceador manda cada solicitud a donde corresponde y las instancias que fallan se reemplazan solas.',
      'Y en las noches la plataforma se achica sola, así que dejamos de pagar servidores ociosos. Gracias: los pacientes de TeleVida ya no tienen que esperar.',
    ],
    failed: [
      'Mmm... con este plan la sala de espera se nos vuelve a llenar en la próxima temporada de gripe.',
      'Repasa la teoría de Auto Scaling y Elastic Load Balancing y vuelve cuando quieras. Aquí te espero.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'televida-asg-limits',
      prompt:
        'Primero lo primero: quiero que nunca tengamos menos de 2 servidores, que nunca pasemos de 12 para no disparar el presupuesto, y que se agreguen o quiten según la demanda. ¿Qué configuramos?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-alb-twelve-targets',
          label: 'Un Application Load Balancer con 12 instancias registradas desde el inicio',
          definition:
            'Balanceador de capa 7 que reparte solicitudes HTTP/HTTPS entre los destinos que tiene registrados.',
          explanation:
            'El balanceador reparte el tráfico, pero no agrega ni quita servidores. Con 12 instancias fijas TeleVida pagaría el pico todas las noches.',
          correct: false,
        },
        {
          id: 'televida-asg-min-max',
          label: 'Un grupo de Amazon EC2 Auto Scaling con capacidad mínima 2, máxima 12 y políticas de escalado',
          definition:
            'Conjunto de instancias EC2 tratado como unidad lógica, con capacidad mínima, máxima y deseada, y reglas que lanzan o terminan instancias.',
          explanation:
            'Las políticas de escalado lanzan instancias cuando sube la demanda y las terminan cuando baja, siempre entre el mínimo de 2 y el máximo de 12 que definió TeleVida.',
          correct: true,
        },
        {
          id: 'televida-scale-up',
          label: 'Cambiar los tres servidores por un tipo de instancia mucho más grande',
          definition:
            'Escalado vertical (scale up): dar más capacidad a una misma instancia cambiándola a un tipo más grande.',
          explanation:
            'Una instancia más grande sigue siendo capacidad fija: no se achica en la madrugada ni crece por encima de su tamaño en el pico de gripe.',
          correct: false,
        },
        {
          id: 'televida-gwlb',
          label: 'Un Gateway Load Balancer delante de los servidores',
          definition:
            'Balanceador que combina un gateway de capa 3 con balanceo de capa 4 para desplegar y escalar appliances virtuales de red.',
          explanation:
            'El GWLB sirve para insertar firewalls o sistemas de detección de intrusos en el camino del tráfico; no ajusta el número de servidores de la app.',
          correct: false,
        },
      ],
    },
    {
      id: 'televida-path-routing',
      prompt:
        'La app tiene dos partes: las solicitudes a /citas son livianas y las de /videoconsulta son pesadas. Quiero mandar cada ruta a su propio grupo de servidores. ¿Qué balanceador usamos?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-alb',
          label: 'Application Load Balancer (ALB)',
          definition:
            'Balanceador de Elastic Load Balancing que opera en capa 7 (HTTP/HTTPS) y permite enrutar según la ruta o el contenido de la solicitud.',
          explanation:
            'El ALB lee la ruta de la URL, así que puede mandar /citas a un grupo de servidores y /videoconsulta a otro.',
          correct: true,
        },
        {
          id: 'televida-nlb',
          label: 'Network Load Balancer (NLB)',
          definition:
            'Balanceador que opera en capa 4 (TCP/UDP), pensado para rendimiento extremo o para tener una dirección IP estática.',
          explanation:
            'El NLB trabaja con conexiones TCP/UDP y no enruta según la ruta HTTP; el enrutamiento por ruta de URL es propio del ALB.',
          correct: false,
        },
        {
          id: 'televida-classic',
          label: 'Classic Load Balancer',
          definition: 'Balanceador de la generación anterior de Elastic Load Balancing.',
          explanation:
            'Es la generación anterior y AWS recomienda migrar a un balanceador actual. Para enrutar por ruta de URL, el indicado es el ALB.',
          correct: false,
        },
        {
          id: 'televida-aws-auto-scaling',
          label: 'AWS Auto Scaling',
          definition:
            'Servicio que configura desde un solo lugar el escalado de varios recursos relacionados mediante planes de escalado.',
          explanation:
            'AWS Auto Scaling ajusta la capacidad de los recursos, pero no reparte solicitudes ni enruta según la ruta de la URL.',
          correct: false,
        },
      ],
    },
    {
      id: 'televida-unhealthy-instance',
      prompt:
        'Anoche, a las tres de la mañana, uno de los servidores de videoconsulta dejó de responder a los health checks. El grupo tiene capacidad deseada de 4. ¿Qué debería pasar sin que nadie se levante de la cama?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-alb-launches',
          label: 'El balanceador lanza una instancia nueva para reemplazar la que falló',
          definition:
            'Idea de que el balanceador de carga crea servidores nuevos cuando detecta un destino no saludable.',
          explanation:
            'El balanceador deja de enviar tráfico al destino no saludable, pero no lanza instancias. Pensar que el balanceador agrega servidores es una trampa típica.',
          correct: false,
        },
        {
          id: 'televida-raise-max',
          label: 'Auto Scaling sube el máximo de 12 para cubrir el servidor caído',
          definition:
            'La capacidad máxima es el límite superior de instancias que el grupo de Auto Scaling nunca supera.',
          explanation:
            'La capacidad máxima la define TeleVida y no cambia por una falla; lo que Auto Scaling mantiene es la capacidad deseada.',
          correct: false,
        },
        {
          id: 'televida-replace-instance',
          label: 'El balanceador deja de enviarle tráfico y EC2 Auto Scaling la reemplaza para volver a 4 instancias',
          definition:
            'Trabajo conjunto de Elastic Load Balancing y EC2 Auto Scaling: health checks, tráfico solo a destinos saludables y reemplazo automático de instancias.',
          explanation:
            'El balanceador solo envía solicitudes a los destinos saludables y Auto Scaling reemplaza automáticamente la instancia que falla para mantener la capacidad deseada de 4.',
          correct: true,
        },
        {
          id: 'televida-wait-admin',
          label: 'Valeria recibe una alarma y lanza otra instancia a mano para volver a 4',
          definition:
            'Recuperación manual en la que una persona lanza un servidor nuevo después de detectar la falla.',
          explanation:
            'EC2 Auto Scaling reemplaza automáticamente las instancias no saludables; TeleVida no depende de que alguien se despierte de madrugada.',
          correct: false,
        },
      ],
    },
    {
      id: 'televida-night-costs',
      prompt:
        'El director financiero me hizo dos preguntas: ¿qué pasa con los servidores extra cuando termina el pico de la mañana? ¿Y cuánto nos cobra AWS por usar Auto Scaling?',
      topicSlug: 'escalado-y-balanceo-de-carga',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-keep-running',
          label: 'Quedan encendidos para el pico de mañana, y Auto Scaling cobra una tarifa fija por grupo',
          definition:
            'Escenario en el que la capacidad solo crece y cada grupo de Auto Scaling tiene un cargo mensual propio.',
          explanation:
            'La elasticidad también implica reducirse: dejar los servidores extra encendidos es pagar capacidad ociosa. Además, EC2 Auto Scaling no tiene un cargo propio por grupo.',
          correct: false,
        },
        {
          id: 'televida-per-policy',
          label: 'Se apagan solo si alguien lo ordena, y se paga un cargo por cada política de escalado ejecutada',
          definition:
            'Escenario en el que reducir la capacidad es una tarea manual y cada ejecución de una política de escalado se cobra aparte.',
          explanation:
            'Las políticas de escalado también terminan instancias cuando baja la demanda, sin intervención manual, y no se cobran aparte.',
          correct: false,
        },
        {
          id: 'televida-high-availability',
          label: 'Se mueven a otra Availability Zone, porque reducirse es parte de la alta disponibilidad',
          definition:
            'La alta disponibilidad es la capacidad de seguir funcionando ante fallas, por ejemplo usando varias Availability Zones.',
          explanation:
            'Confundir elasticidad con alta disponibilidad es una trampa típica. Ajustar la capacidad a la demanda es elasticidad, no mover servidores entre AZ.',
          correct: false,
        },
        {
          id: 'televida-scale-in',
          label: 'Auto Scaling los termina cuando baja la demanda, y solo pagan los recursos que usan',
          definition:
            'Elasticidad: adquirir recursos cuando se necesitan y liberarlos cuando ya no, con EC2 Auto Scaling sin costo adicional sobre los recursos que lanza.',
          explanation:
            'Cuando termina el pico, las políticas de escalado terminan instancias (scale in) sin bajar del mínimo. EC2 Auto Scaling no tiene costo adicional: TeleVida paga instancias, volúmenes y alarmas que use.',
          correct: true,
        },
      ],
    },
  ],
};
