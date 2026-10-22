import type { Mission } from '../../../domain/Mission';

/**
 * Consultora Nube Clara: a consulting firm in Asunción hosting an ERP for farming cooperatives on Amazon EC2.
 * Practices Dedicated Hosts for per-socket licenses, Convertible Reserved Instances, On-Demand Capacity Reservations and regional Reserved Instances.
 */
export const ec2PurchaseOptions2: Mission = {
  id: 'ec2-purchase-options-2',
  track: 'market',
  topicSlug: 'ec2-purchase-options',
  buildingId: 'cloud-consultancy',
  title: 'Licencias, cosechas y reservas',
  client: { name: 'Lucía Benítez', role: 'Directora de operaciones de Consultora Nube Clara' },
  intro: [
    'Te damos la bienvenida a Nube Clara. Soy Lucía Benítez, directora de operaciones. Somos una consultora de Asunción y administramos el sistema de gestión de veinte cooperativas agrícolas del Paraguay.',
    'Ese sistema ahora vive en Amazon EC2. Funciona, pero cada decisión de compra la tomamos a ciegas: un software con licencias complicadas, un compromiso de tres años que nos da miedo y una semana de cierre de cosecha que no puede fallar.',
    'Si elegimos mal, o pagamos de más o nos quedamos sin servidores justo cuando las cooperativas liquidan la soja. Cualquiera de las dos cosas nos cuesta clientes.',
    'Necesito a alguien que conozca bien las opciones de compra de EC2 para revisar estas decisiones conmigo. ¿Te sumas?',
  ],
  outro: {
    passed: [
      'Perfecto. Las licencias quedan cumplidas, el compromiso de tres años ya no nos ata a una configuración y la semana de cosecha tiene su capacidad asegurada.',
      'Les voy a presentar este plan a las cooperativas con total confianza. Gracias por la claridad: le hiciste honor al nombre de la casa.',
    ],
    failed: [
      'Mmm... con estas decisiones veo riesgos: licencias mal resueltas o servidores que podrían faltar en plena cosecha.',
      'Repasa la teoría de los modelos de compra de EC2 y vuelve cuando quieras. Las cooperativas pueden esperar un poco más.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'socket-licenses',
      prompt:
        'Primero lo más delicado: el módulo contable usa un software cuya licencia se cobra por socket y por núcleo físico. El proveedor exige que demostremos cuántos sockets y núcleos tiene el servidor donde corre. ¿Qué opción de EC2 usamos?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'dedicated-instances-license',
          label: 'Dedicated Instances',
          definition:
            'Instancias que se ejecutan en hardware dedicado a una sola cuenta de AWS, facturadas por instancia.',
          explanation:
            'El hardware no se comparte con otros clientes, pero no da visibilidad de sockets y núcleos y solo tiene soporte parcial para licencias propias, así que no resuelve la exigencia del proveedor.',
          correct: false,
        },
        {
          id: 'capacity-reservation-license',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservas de capacidad de EC2 en una Availability Zone específica por el tiempo que se necesite.',
          explanation:
            'Aseguran que haya capacidad disponible, pero no dicen nada sobre el servidor físico ni sus sockets y núcleos.',
          correct: false,
        },
        {
          id: 'convertible-ri-license',
          label: 'Convertible Reserved Instances',
          definition:
            'Descuento de facturación por 1 o 3 años que puede intercambiarse por otra Convertible con distinta familia, sistema operativo o tenencia.',
          explanation:
            'Una Reserved Instance es un descuento de facturación, no un servidor. No da visibilidad del hardware físico para licenciar por socket o núcleo.',
          correct: false,
        },
        {
          id: 'dedicated-hosts',
          label: 'Dedicated Hosts',
          definition:
            'Un servidor físico completo dedicado a un cliente, facturado por host, con visibilidad de sockets y núcleos y control de ubicación.',
          explanation:
            'Con un servidor físico propio, Nube Clara ve los sockets y núcleos y puede usar sus licencias propias (BYOL) por socket o núcleo, que es lo que exige el proveedor.',
          correct: true,
        },
      ],
    },
    {
      id: 'three-year-commitment',
      prompt:
        'Ahora el compromiso. Queremos comprar Reserved Instances por 3 años para el resto del sistema, pero en ese tiempo seguro cambiaremos a otra familia de instancias y quizá a otro sistema operativo. ¿Qué clase de Reserved Instance nos conviene?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'convertible-ri',
          label: 'Convertible Reserved Instances',
          definition:
            'Clase de Reserved Instance que se puede intercambiar por otra Convertible con distinta familia, sistema operativo o tenencia, de igual o mayor valor y en la misma Región.',
          explanation:
            'Nube Clara mantiene el descuento durante los 3 años y puede intercambiar la reserva cuando cambie de familia o de sistema operativo, a cambio de un descuento menor que el de Standard.',
          correct: true,
        },
        {
          id: 'standard-ri',
          label: 'Standard Reserved Instances',
          definition:
            'Clase de Reserved Instance con el mayor descuento, que permite modificar algunos atributos y venderse en el Reserved Instance Marketplace.',
          explanation:
            'Da más descuento, pero solo se pueden modificar algunos atributos y no se puede intercambiar por otra familia o sistema operativo, justo el cambio que planean.',
          correct: false,
        },
        {
          id: 'spot-commitment',
          label: 'Spot Instances',
          definition:
            'Capacidad sobrante de EC2 con gran descuento, sin compromiso, que AWS puede recuperar con un aviso de dos minutos.',
          explanation:
            'Spot no es una clase de Reserved Instance y su capacidad puede interrumpirse, algo que un sistema de gestión en producción no tolera.',
          correct: false,
        },
        {
          id: 'capacity-reservation-commitment',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservas de capacidad de EC2 en una Availability Zone específica, que por sí solas no dan descuento.',
          explanation:
            'No son una clase de Reserved Instance ni dan descuento por sí mismas. No responden a la pregunta de cómo comprometerse por 3 años con flexibilidad.',
          correct: false,
        },
      ],
    },
    {
      id: 'harvest-week',
      prompt:
        'En marzo viene la semana de cierre de cosecha: las cooperativas liquidan la soja y el sistema tiene que contar sí o sí con servidores extra en la Availability Zone donde está la base de datos. Es solo una semana y no queremos comprometernos por 1 o 3 años. ¿Qué usamos?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'regional-ri-harvest',
          label: 'Reserved Instances con alcance regional',
          definition:
            'Descuento de facturación por 1 o 3 años que aplica en cualquier Availability Zone de la Región.',
          explanation:
            'Una RI regional no reserva capacidad y además exige un compromiso de 1 o 3 años, lo contrario de lo que Nube Clara necesita para una sola semana.',
          correct: false,
        },
        {
          id: 'compute-sp-harvest',
          label: 'Compute Savings Plans',
          definition:
            'Compromiso de gasto en USD por hora durante 1 o 3 años que aplica a EC2, AWS Fargate y AWS Lambda.',
          explanation:
            'Da descuento a cambio de un compromiso de 1 o 3 años, pero no garantiza capacidad en ninguna Availability Zone.',
          correct: false,
        },
        {
          id: 'capacity-reservations',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservas de capacidad de EC2 en una Availability Zone específica por el tiempo que se necesite; las de uso inmediato no exigen compromiso de plazo.',
          explanation:
            'Aseguran la capacidad en la Availability Zone de la base de datos durante la semana de cierre, sin compromiso de 1 o 3 años. No dan descuento por sí solas, pero aquí lo que importa es no quedarse sin servidores.',
          correct: true,
        },
        {
          id: 'spot-harvest',
          label: 'Spot Instances',
          definition:
            'Capacidad sobrante de EC2 con gran descuento que AWS puede recuperar cuando la necesita.',
          explanation:
            'Spot es justo lo contrario de capacidad garantizada: AWS puede recuperar las instancias en plena liquidación de la cosecha.',
          correct: false,
        },
      ],
    },
    {
      id: 'ri-scope',
      prompt:
        'Por último, para unos servidores Linux/Unix con tenencia por defecto vamos a comprar Reserved Instances Standard. Queremos que el descuento siga aplicando aunque movamos las instancias de una Availability Zone a otra o cambiemos de tamaño dentro de la misma familia. ¿Qué alcance elegimos?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'zonal-scope',
          label: 'Alcance zonal',
          definition:
            'Alcance de una Reserved Instance que reserva capacidad en la Availability Zone elegida y aplica solo a esa zona y a ese tamaño exacto.',
          explanation:
            'Reservaría capacidad, pero el descuento quedaría atado a una sola Availability Zone y a un tamaño exacto, lo opuesto a la flexibilidad que piden.',
          correct: false,
        },
        {
          id: 'regional-scope',
          label: 'Alcance regional',
          definition:
            'Alcance de una Reserved Instance cuyo descuento aplica en cualquier Availability Zone de la Región, sin reservar capacidad.',
          explanation:
            'El descuento aplica en cualquier Availability Zone de la Región y, en Linux/Unix con tenencia por defecto, a los distintos tamaños de la misma familia. Y el alcance no cambia el precio de la RI.',
          correct: true,
        },
        {
          id: 'dedicated-instances-scope',
          label: 'Comprarlas con tenencia de Dedicated Instances',
          definition:
            'Opción de ejecutar las instancias en hardware dedicado a una sola cuenta de AWS, facturado por instancia.',
          explanation:
            'La tenencia define si el hardware se comparte, no dónde aplica el descuento. Además, la flexibilidad de tamaño de una RI regional es para tenencia por defecto.',
          correct: false,
        },
        {
          id: 'convert-to-sp',
          label: 'Pedir a AWS que convierta las Reserved Instances en Savings Plans',
          definition:
            'La idea de que una Reserved Instance comprada puede transformarse en otro modelo de compra para ganar flexibilidad.',
          explanation:
            'Reserved Instances y Savings Plans son opciones de compra distintas; una no se transforma en la otra. La flexibilidad que buscan la da el alcance de la RI.',
          correct: false,
        },
      ],
    },
  ],
};
