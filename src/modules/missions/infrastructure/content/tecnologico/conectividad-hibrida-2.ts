import type { Mission } from '../../../domain/Mission';

/**
 * Clínica Vida's infrastructure team in Quito: sending radiology images to AWS and reaching a partner lab privately.
 * Practices AWS Direct Connect, Site-to-Site VPN as a backup and its two tunnels, and AWS PrivateLink.
 */
export const conectividadHibrida2: Mission = {
  id: 'conectividad-hibrida-2',
  track: 'tecnologico',
  topicSlug: 'conectividad-hibrida',
  buildingId: 'clinic',
  title: 'Radiografías en camino',
  client: { name: 'Gabriela Mena', role: 'Jefa de Infraestructura de Clínica Vida' },
  intro: [
    'Hola, gracias por venir. Soy Gabriela Mena, jefa de Infraestructura de Clínica Vida, aquí en Quito. Mientras los médicos cuidan a los pacientes, mi equipo cuida que los sistemas no fallen.',
    'Compramos un tomógrafo y un equipo de resonancia nuevos. Cada estudio genera archivos enormes, y queremos guardarlos y procesarlos en AWS, junto con el resto de los sistemas de la clínica.',
    'Hoy mandamos todo por la conexión a internet de siempre, y a veces un estudio tarda tanto en subir que el médico se cansa de esperar. Encima, un laboratorio aliado quiere compartir con nosotros sus resultados.',
    'Un diagnóstico que llega tarde es un problema serio. Necesito que me ayudes a elegir cómo conectamos la clínica con AWS. ¿Me acompañas?',
  ],
  outro: {
    passed: [
      'Perfecto: Direct Connect para los estudios pesados, una Site-to-Site VPN de respaldo con sus dos túneles y PrivateLink para recibir los resultados del laboratorio.',
      'Los médicos van a tener sus imágenes a tiempo y yo voy a tener un plan para cuando algo falle. Gracias, de verdad: en Clínica Vida siempre tendrás las puertas abiertas.',
    ],
    failed: [
      'Mmm... con este plan los estudios seguirían llegando tarde. Hay decisiones que no me terminan de convencer.',
      'Repasa la teoría de conectividad con calma y vuelve cuando quieras. Aquí te espero, entre servidores y batas blancas.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'imaging-link',
      prompt:
        'Empecemos por las imágenes: todos los días subimos un gran volumen de estudios a AWS y necesitamos un rendimiento constante, sin depender de internet. No hay apuro: podemos esperar unas semanas a que lo instalen. ¿Qué contratamos?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'site-to-site',
          label: 'AWS Site-to-Site VPN',
          definition: 'Conexión que une una red on-premises con las VPC mediante túneles IPsec cifrados sobre internet.',
          explanation:
            'La VPN viaja por internet, así que su rendimiento depende de internet. Gabriela pidió justamente no depender de él.',
          correct: false,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition: 'Hub de tránsito de red que interconecta VPC y redes on-premises en un modelo hub-and-spoke.',
          explanation:
            'Transit Gateway organiza cómo se interconectan las redes, pero no es el enlace físico que lleva los estudios desde la clínica hasta AWS.',
          correct: false,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'VPN administrada para que usuarios individuales se conecten desde sus dispositivos a AWS y a la red on-premises.',
          explanation:
            'Client VPN conecta personas desde sus dispositivos, por internet. No une la red de la clínica con AWS con un rendimiento constante.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition:
            'Conexión física dedicada mediante fibra óptica entre la red interna y una ubicación de Direct Connect, sin pasar por proveedores de internet.',
          explanation:
            'Direct Connect es una conexión dedicada que no pasa por internet: ofrece más ancho de banda y una experiencia de red más consistente. Su instalación toma tiempo, y la clínica puede esperar.',
          correct: true,
        },
      ],
    },
    {
      id: 'backup-link',
      prompt:
        'Me encanta, pero en salud no podemos tener un solo camino. Si la conexión de Direct Connect falla, quiero un respaldo que una nuestra red con las VPC, cifrado y rápido de configurar. ¿Qué usamos?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'privatelink',
          label: 'AWS PrivateLink',
          definition: 'Acceso privado desde una VPC a servicios específicos mediante VPC endpoints de tipo interfaz.',
          explanation:
            'PrivateLink conecta una VPC con servicios concretos. No une la red de la clínica con las VPC como respaldo.',
          correct: false,
        },
        {
          id: 'site-to-site',
          label: 'AWS Site-to-Site VPN',
          definition:
            'Conexión IPsec cifrada sobre internet entre una red on-premises y las VPC.',
          explanation:
            'Site-to-Site VPN une la red de la clínica con las VPC mediante túneles IPsec cifrados por internet, y servir de respaldo de Direct Connect es uno de sus escenarios típicos.',
          correct: true,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'VPN administrada y basada en cliente que usa un cliente basado en OpenVPN en cada dispositivo.',
          explanation:
            'Client VPN es para personas con sus dispositivos. El respaldo tiene que unir la red completa de la clínica con las VPC.',
          correct: false,
        },
        {
          id: 'nat-gateway',
          label: 'Un NAT gateway',
          definition: 'Servicio de traducción de direcciones de red para que subredes privadas salgan a servicios fuera de la VPC.',
          explanation:
            'El NAT gateway da salida a internet a subredes privadas de una VPC; no conecta la red on-premises de la clínica con AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'vpn-tunnels',
      prompt:
        'El gerente general me preguntó algo que no supe responder: si la VPN de respaldo también falla, ¿nos quedamos sin nada? ¿Cómo está armada una conexión de Site-to-Site VPN?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'one-tunnel-igw',
          label: 'Un solo túnel que termina en el internet gateway de la VPC',
          definition: 'El internet gateway es el componente que conecta una VPC con internet.',
          explanation:
            'Del lado de AWS la VPN termina en un virtual private gateway o en un transit gateway, no en el internet gateway, y cada conexión trae dos túneles.',
          correct: false,
        },
        {
          id: 'two-tunnels',
          label: 'Cada conexión incluye dos túneles que se pueden usar a la vez para alta disponibilidad',
          definition:
            'Diseño de AWS Site-to-Site VPN: dos túneles IPsec por conexión, entre un virtual private gateway o transit gateway y el customer gateway device.',
          explanation:
            'Cada conexión de Site-to-Site VPN incluye dos túneles que pueden usarse simultáneamente: si uno cae, el otro sigue. Del lado de la clínica termina en su customer gateway device.',
          correct: true,
        },
        {
          id: 'one-tunnel-per-user',
          label: 'Un túnel por cada empleado conectado, con un cliente OpenVPN',
          definition: 'Conexiones individuales que cada usuario abre desde su dispositivo con un cliente VPN.',
          explanation:
            'Eso describe a AWS Client VPN, que conecta personas. Site-to-Site une redes y trae dos túneles por conexión.',
          correct: false,
        },
        {
          id: 'fiber-link',
          label: 'Un cable de fibra dedicado hasta una ubicación de AWS',
          definition: 'Conexión física dedicada entre la red interna y una ubicación de Direct Connect.',
          explanation:
            'Eso es Direct Connect, que ya es el enlace principal. La VPN de respaldo viaja por internet con túneles IPsec.',
          correct: false,
        },
      ],
    },
    {
      id: 'partner-lab',
      prompt:
        'Último tema: el laboratorio aliado ofrece su servicio de resultados desde su propia cuenta de AWS. Queremos consumirlo desde nuestras subredes privadas, como si estuviera dentro de nuestra VPC, sin internet gateway, sin NAT y sin IP públicas. ¿Qué usamos?',
      topicSlug: 'conectividad-hibrida',
      examTasks: ['3.5'],
      options: [
        {
          id: 'privatelink',
          label: 'AWS PrivateLink',
          definition:
            'Conexión privada entre una VPC y servicios de AWS, de otras cuentas o de socios, como si estuvieran dentro de la VPC, mediante VPC endpoints de tipo interfaz.',
          explanation:
            'PrivateLink permite consumir el servicio de otra cuenta de AWS de forma privada, con un VPC endpoint de tipo interfaz, sin internet gateway, NAT ni IP públicas.',
          correct: true,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition: 'Hub de tránsito que interconecta VPC y redes on-premises en un modelo hub-and-spoke.',
          explanation:
            'Transit Gateway interconecta redes completas. Para acceder de forma privada a un servicio específico de otra cuenta, la pieza indicada es PrivateLink.',
          correct: false,
        },
        {
          id: 'internet-gateway',
          label: 'Un internet gateway y la URL pública del laboratorio',
          definition: 'Componente que conecta una VPC con internet para alcanzar servicios públicos.',
          explanation:
            'Gabriela pidió justamente no usar internet gateway ni exponer el tráfico a internet. Con resultados médicos, el acceso debe ser privado.',
          correct: false,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'VPN administrada para que usuarios individuales accedan desde sus dispositivos a AWS y a la red on-premises.',
          explanation:
            'Client VPN conecta personas, no los sistemas de la clínica con el servicio del laboratorio.',
          correct: false,
        },
      ],
    },
  ],
};
