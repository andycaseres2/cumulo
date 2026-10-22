import type { Mission } from '../../../domain/Mission';

/**
 * Municipal IT department in Cochabamba: connecting the city data center, field inspectors and many department VPCs to AWS.
 * Practices AWS Site-to-Site VPN, AWS Client VPN, AWS Direct Connect encryption and AWS Transit Gateway.
 */
export const conectividadHibrida1: Mission = {
  id: 'conectividad-hibrida-1',
  track: 'tecnologico',
  topicSlug: 'conectividad-hibrida',
  buildingId: 'cityhall',
  title: 'Puentes para la ciudad',
  client: { name: 'Andrés Villca', role: 'Jefe de Sistemas de la Municipalidad' },
  intro: [
    'Adelante, por favor. Soy Andrés Villca, jefe de Sistemas de la Municipalidad. Desde este piso, en Cochabamba, mantenemos los sistemas de catastro, tránsito, salud y trámites ciudadanos.',
    'El alcalde aprobó llevar los nuevos sistemas a AWS, pero el centro de datos municipal se queda: ahí está el registro de propiedades, que no podemos mover todavía.',
    'Así que tengo que tender puentes: entre el centro de datos y AWS, entre los inspectores que trabajan en la calle y nuestros sistemas, y entre las VPC de cada departamento.',
    'El primer trámite en línea sale el próximo mes y no puedo fallarle a la ciudad. ¿Me ayudas a elegir cada conexión?',
  ],
  outro: {
    passed: [
      'Listo: una Site-to-Site VPN para empezar ya, Client VPN para los inspectores, Direct Connect con su cifrado bien resuelto y un Transit Gateway como plaza central.',
      'La ciudad queda bien conectada, y yo voy a poder dormir tranquilo la noche del lanzamiento. Gracias: la Municipalidad te debe una.',
    ],
    failed: [
      'Mmm... con estos puentes no me animo a lanzar el trámite en línea. Hay conexiones que me siguen preocupando.',
      'Repasa la teoría de conectividad con calma y vuelve cuando quieras. Aquí seguiré, entre expedientes y cables.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'urgent-link',
      prompt:
        'Lo más urgente: los sistemas nuevos en AWS tienen que hablar con el centro de datos municipal esta misma semana, y el tráfico debe ir cifrado. Más adelante evaluaremos algo más robusto. ¿Qué uso?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition: 'Conexión física dedicada entre la red interna y una ubicación de Direct Connect, sin pasar por proveedores de internet.',
          explanation:
            'Direct Connect requiere trabajo físico en una ubicación de Direct Connect o con un socio, así que no sirve para conectar esta misma semana. Además, no está cifrado por defecto.',
          correct: false,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'Servicio de VPN administrado y basado en cliente para que usuarios individuales accedan a recursos desde cualquier lugar.',
          explanation:
            'Client VPN conecta personas desde sus dispositivos. Aquí hay que unir la red completa del centro de datos con las VPC.',
          correct: false,
        },
        {
          id: 'site-to-site',
          label: 'AWS Site-to-Site VPN',
          definition:
            'Conexión que une una red on-premises con las VPC mediante túneles IPsec cifrados sobre internet.',
          explanation:
            'Site-to-Site VPN une el centro de datos con las VPC usando túneles IPsec cifrados por internet, y se configura rápido. Es la opción típica para conectar ya mientras se evalúan otras.',
          correct: true,
        },
        {
          id: 'privatelink',
          label: 'AWS PrivateLink',
          definition: 'Conexión privada entre una VPC y servicios específicos mediante VPC endpoints de tipo interfaz.',
          explanation:
            'PrivateLink da acceso privado a servicios desde una VPC. No une la red del centro de datos municipal con AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'field-inspectors',
      prompt:
        'Ahora los inspectores de obras. Pasan el día en la calle o en sus casas, con sus laptops, y necesitan entrar de forma segura a los sistemas internos, tanto en AWS como en el centro de datos. ¿Qué les damos?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition:
            'Servicio de VPN administrado que permite a usuarios individuales conectarse de forma segura a AWS y a la red on-premises con un cliente basado en OpenVPN.',
          explanation:
            'Client VPN conecta personas, no redes: cada inspector se conecta desde su laptop, desde cualquier lugar, a los recursos de AWS y del centro de datos. Escala según los usuarios conectados.',
          correct: true,
        },
        {
          id: 'site-to-site',
          label: 'Una AWS Site-to-Site VPN por cada inspector',
          definition: 'Conexión IPsec que une una red on-premises con las VPC, terminada en un customer gateway device.',
          explanation:
            'Confundir Site-to-Site con Client VPN es una trampa típica. Site-to-Site une redes completas, no laptops que se mueven por la ciudad.',
          correct: false,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition: 'Hub de tránsito de red que interconecta VPC y redes on-premises en un modelo hub-and-spoke.',
          explanation:
            'Transit Gateway interconecta redes; por sí solo no les da a los inspectores una forma de conectarse desde sus laptops.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition: 'Conexión física dedicada con fibra óptica entre una red interna y una ubicación de Direct Connect.',
          explanation:
            'Direct Connect une una red fija con AWS mediante un cable dedicado. No sirve para personas que trabajan desde la calle o su casa.',
          correct: false,
        },
      ],
    },
    {
      id: 'direct-connect-encryption',
      prompt:
        'Para el año que viene contratamos AWS Direct Connect, porque el registro de propiedades mueve mucha información y queremos un rendimiento constante. Un concejal pregunta si esos datos viajan cifrados por defecto. ¿Qué le respondo?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'yes-ipsec',
          label: 'Sí: Direct Connect siempre cifra con IPsec, como una VPN',
          definition: 'IPsec es el protocolo de túneles cifrados que usa AWS Site-to-Site VPN.',
          explanation:
            'IPsec es propio de la VPN. Creer que Direct Connect está cifrado por defecto es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'yes-internet-tls',
          label: 'Sí, porque viaja por internet cifrado con TLS',
          definition: 'TLS es el protocolo que cifra conexiones como HTTPS o las de AWS Client VPN.',
          explanation:
            'Direct Connect no pasa por proveedores de internet en la ruta de red, y no está cifrado por defecto.',
          correct: false,
        },
        {
          id: 'not-by-default',
          label: 'No por defecto: se puede cifrar con MACsec en ciertas conexiones dedicadas o con una VPN sobre Direct Connect',
          definition: 'Opciones para cifrar el tráfico de una conexión física dedicada que no viaja cifrada de forma predeterminada.',
          explanation:
            'Direct Connect no está cifrado por defecto. Para cifrar, la Municipalidad puede usar MACsec en ciertas conexiones dedicadas o crear túneles VPN sobre Direct Connect.',
          correct: true,
        },
        {
          id: 'no-need',
          label: 'No, y ningún servicio de AWS permite cifrarlo',
          definition: 'Afirmación de que el tráfico de una conexión dedicada a AWS no admite ninguna forma de cifrado.',
          explanation:
            'Es cierto que no viaja cifrado por defecto, pero sí se puede cifrar: con MACsec en ciertas conexiones dedicadas o con una VPN sobre Direct Connect.',
          correct: false,
        },
      ],
    },
    {
      id: 'central-hub',
      prompt:
        'Último tema: cada departamento tendrá su propia VPC: catastro, tránsito, salud y trámites. Todas tienen que hablar entre sí y con el centro de datos, y conectarlas una por una se volvería un enredo. ¿Qué ponemos en el medio?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'privatelink-hub',
          label: 'AWS PrivateLink',
          definition: 'Acceso privado desde una VPC a servicios específicos, como si estuvieran dentro de ella, mediante VPC endpoints.',
          explanation:
            'Confundir PrivateLink con Transit Gateway es una trampa típica. PrivateLink da acceso privado a servicios concretos; no interconecta redes completas.',
          correct: false,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition:
            'Hub de tránsito de red que interconecta VPC y redes on-premises en un modelo hub-and-spoke.',
          explanation:
            'Con Transit Gateway cada VPC y la conexión con el centro de datos se conectan una sola vez al hub, en lugar de unir cada red con todas las demás.',
          correct: true,
        },
        {
          id: 'client-vpn-hub',
          label: 'AWS Client VPN',
          definition: 'VPN administrada para que usuarios individuales accedan a AWS y a la red on-premises desde cualquier lugar.',
          explanation:
            'Client VPN conecta personas desde sus dispositivos. No es un punto central para interconectar las VPC de los departamentos.',
          correct: false,
        },
        {
          id: 'nat-gateway-hub',
          label: 'Un NAT gateway',
          definition: 'Servicio de traducción de direcciones de red que permite a subredes privadas salir a servicios fuera de la VPC.',
          explanation:
            'El NAT gateway da salida a internet a subredes privadas; no interconecta varias VPC ni redes on-premises.',
          correct: false,
        },
      ],
    },
  ],
};
