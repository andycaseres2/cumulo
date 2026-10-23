import type { ServiceFamily } from '../../domain/ServiceFamily';

export const networkingFamily: ServiceFamily = {
  id: 'networking',
  title: 'Redes y entrega de contenido',
  summary:
    'Distingue para qué es cada una: tu red aislada (VPC), conectar tu oficina (Direct Connect o VPN), conectar muchas redes (Transit Gateway), exponer un servicio en privado (PrivateLink) o llevar a tus usuarios a tu app (Route 53, CloudFront, Global Accelerator).',
  services: [
    {
      name: 'Amazon VPC',
      summary: 'Tu red virtual aislada en AWS: eliges el rango de IP, las subredes públicas y privadas y las tablas de rutas.',
    },
    {
      name: 'AWS Direct Connect',
      summary: 'Conexión de red dedicada y privada entre tu centro de datos y AWS, sin pasar por internet. No cifra por defecto.',
    },
    {
      name: 'AWS Site-to-Site VPN',
      summary: 'Túneles cifrados con IPsec entre tu red local y AWS, sobre tu conexión a internet de siempre.',
    },
    {
      name: 'AWS Client VPN',
      summary: 'VPN para personas: cada quien se conecta desde su equipo con un cliente OpenVPN, desde cualquier lugar.',
    },
    {
      name: 'AWS Transit Gateway',
      summary: 'Hub central que conecta muchas VPC y redes locales en un modelo de concentrador y radios.',
    },
    {
      name: 'Amazon Route 53',
      summary: 'DNS administrado: registra dominios, traduce nombres a IP y enruta con verificaciones de estado.',
    },
    {
      name: 'Amazon CloudFront',
      summary: 'CDN: guarda en caché tu contenido en edge locations cerca de tus usuarios para entregarlo con baja latencia.',
    },
    {
      name: 'AWS Global Accelerator',
      summary: 'IP estáticas anycast que llevan el tráfico por la red global de AWS hasta el endpoint sano más cercano.',
    },
    {
      name: 'AWS PrivateLink',
      summary: 'Conectividad privada a servicios entre VPC, cuentas y on-premises sin exponer el tráfico a internet.',
    },
  ],
  cards: [
    {
      id: 'networking-1',
      prompt:
        'Una startup en Rosario lanza su primera app en AWS. Necesita su propia red aislada, con su rango de IP, una subred pública para los servidores web y otra privada, sin acceso a internet, para la base de datos.',
      options: [
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway conecta muchas redes entre sí. Primero necesitas la red misma, y con una sola no hace falta un hub.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC es la red virtual aislada donde eliges el rango de IP y creas subredes públicas y privadas.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink expone servicios en privado entre redes. No crea la red ni sus subredes.',
        },
      ],
      answer: 'Amazon VPC',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-2',
      prompt:
        'Un canal de televisión en Bogotá envía cada día grandes volúmenes de video desde su centro de datos a AWS. Quiere un enlace privado y dedicado, con ancho de banda constante y sin pasar por internet.',
      options: [
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN cifra el tráfico, pero viaja por internet: el ancho de banda y la latencia pueden variar.',
        },
        {
          service: 'AWS Client VPN',
          why: 'Client VPN conecta a personas desde sus equipos, no un centro de datos completo con un enlace dedicado.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect es una conexión dedicada y privada a AWS que no pasa por internet y da una experiencia de red más constante.',
        },
      ],
      answer: 'AWS Direct Connect',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-3',
      prompt:
        'Una ferretería en Cochabamba necesita conectar esta semana la red de su oficina con AWS. El presupuesto es corto, ya tiene internet y el tráfico debe viajar cifrado.',
      options: [
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect necesita un enlace físico dedicado hasta una ubicación de Direct Connect y no cifra por defecto.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink conecta servicios de forma privada dentro de AWS. No es el túnel entre una oficina y AWS.',
        },
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway es un hub para muchas redes. Con una sola oficina y una red, no resuelve el túnel cifrado.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN crea túneles cifrados con IPsec sobre la conexión a internet que la oficina ya tiene.',
        },
      ],
      answer: 'AWS Site-to-Site VPN',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-4',
      prompt:
        'Una aseguradora en Lima ya tiene un enlace dedicado y privado hasta AWS, pero auditoría exige que todo ese tráfico viaje cifrado con IPsec. ¿Qué agregas sobre el enlace?',
      options: [
        {
          service: 'AWS Client VPN',
          why: 'Client VPN es para personas que se conectan desde sus equipos con un cliente OpenVPN, no para cifrar el enlace de la oficina.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Combinar Direct Connect con Site-to-Site VPN da una conexión privada cifrada con IPsec, algo que Direct Connect no hace por defecto.',
        },
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront entrega contenido desde edge locations a usuarios de internet. No cifra la conexión entre la oficina y AWS.',
        },
      ],
      answer: 'AWS Site-to-Site VPN',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-5',
      prompt:
        'Una ONG en Tegucigalpa trabaja en remoto: cada integrante usa su laptop desde casa o en viajes y necesita entrar de forma segura a las aplicaciones internas que corren en AWS.',
      options: [
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN une dos redes, como una oficina y AWS. No sirve para personas sueltas conectándose desde cualquier lugar.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect es un enlace dedicado desde un centro de datos. No llega a laptops que se mueven de un lugar a otro.',
        },
        {
          service: 'AWS Client VPN',
          why: 'Client VPN es una VPN administrada para personas: cada equipo se conecta con un cliente OpenVPN, desde cualquier lugar.',
        },
      ],
      answer: 'AWS Client VPN',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-6',
      prompt:
        'Una red de colegios en Quito tiene doce redes aisladas en AWS y dos sedes conectadas por túneles. Conectar cada par por separado ya es inmanejable. Quiere un punto central que lo conecte todo.',
      options: [
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway es un hub: cada red se conecta una sola vez al centro y desde ahí llega a todas las demás.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC es cada una de esas redes. El problema no es crear otra, sino conectar muchas sin pares punto a punto.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink expone un servicio concreto en privado. No enruta todo el tráfico entre muchas redes y sedes.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect es un enlace dedicado hacia AWS. No centraliza el enrutamiento entre doce redes.',
        },
      ],
      answer: 'AWS Transit Gateway',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-7',
      prompt:
        'Un hospital en Medellín suma cada mes una red nueva en AWS. Quiere que cada red nueva se conecte una sola vez a un concentrador y quede disponible para todas las demás redes ya conectadas.',
      options: [
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink da acceso privado a un servicio puntual, no conecta redes completas en un modelo de concentrador.',
        },
        {
          service: 'AWS Transit Gateway',
          why: 'Con Transit Gateway, una red nueva conectada al hub queda disponible para todas las demás redes conectadas.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN conecta una red local con AWS por internet. No es el hub que une muchas redes de AWS.',
        },
      ],
      answer: 'AWS Transit Gateway',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-8',
      prompt:
        'Una tienda de artesanías en Cusco quiere comprar su nombre de dominio y que, al escribirlo en el navegador, se traduzca a la dirección IP de su servidor en AWS.',
      options: [
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront acelera la entrega del contenido, pero no registra dominios ni es el servicio que traduce nombres a IP.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator da IP estáticas y mejora la ruta del tráfico, pero no registra dominios ni resuelve nombres.',
        },
        {
          service: 'Amazon Route 53',
          why: 'Route 53 es el DNS de AWS: registra dominios y traduce nombres como www.ejemplo.com a direcciones IP.',
        },
      ],
      answer: 'Amazon Route 53',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-9',
      prompt:
        'Una academia de idiomas en Asunción quiere que, si su servidor principal cae, su nombre de dominio empiece a responder con la dirección de una página de respaldo, usando verificaciones de estado.',
      options: [
        {
          service: 'Amazon Route 53',
          why: 'Route 53 tiene verificaciones de estado y conmutación por error de DNS: si el principal falla, responde con el respaldo.',
        },
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront guarda contenido en caché en edge locations. Cambiar a qué dirección apunta el dominio es trabajo del DNS.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC define tu red privada en AWS. No decide a qué dirección responde un nombre de dominio.',
        },
      ],
      answer: 'Amazon Route 53',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-10',
      prompt:
        'Una tienda de moda en Santiago guarda fotos y videos de sus productos en Amazon S3 y vende en toda Latinoamérica. Quiere copias en caché cerca de cada cliente para que todo cargue rápido.',
      options: [
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator mejora la ruta por la red de AWS, pero no guarda copias en caché del contenido.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect une tu centro de datos con AWS. No acerca fotos ni videos a clientes de internet.',
        },
        {
          service: 'Amazon Route 53',
          why: 'Route 53 resuelve nombres de dominio. No guarda copias del contenido cerca de tus clientes.',
        },
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront es la CDN de AWS: guarda en caché tu contenido en edge locations y lo entrega con baja latencia.',
        },
      ],
      answer: 'Amazon CloudFront',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-11',
      prompt:
        'Un medio digital en Ciudad de México recibe picos de visitas con cada noticia. Quiere servir sus páginas e imágenes desde ubicaciones cercanas a sus lectores y quitar carga a su servidor de origen.',
      options: [
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront entrega desde edge locations lo que tiene en caché, así menos peticiones llegan al servidor de origen.',
        },
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway conecta redes internas entre sí. No entrega contenido a lectores de internet.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator no guarda caché: cada petición sigue llegando a tu aplicación, solo que por una ruta mejor.',
        },
      ],
      answer: 'Amazon CloudFront',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-12',
      prompt:
        'Un juego multijugador hecho en São Paulo usa su propio tráfico UDP, sin nada que guardar en caché. Necesita dos IP fijas como entrada única y que el tráfico vaya por la red de AWS a la Región sana más cercana.',
      options: [
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront brilla cacheando contenido web. Aquí no hay nada que guardar en caché y el tráfico UDP del juego no es web.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator da IP estáticas anycast, soporta TCP y UDP y lleva el tráfico por la red global de AWS al endpoint sano.',
        },
        {
          service: 'Amazon Route 53',
          why: 'Route 53 responde con direcciones al resolver nombres, pero no da IP anycast fijas ni lleva el tráfico por la red de AWS.',
        },
      ],
      answer: 'AWS Global Accelerator',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-13',
      prompt:
        'Un proveedor de software en Guadalajara quiere ofrecer su API a las redes de sus clientes en otras cuentas de AWS, en privado y sin que el tráfico salga a internet ni tener que unir las redes completas.',
      options: [
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway une redes completas para enrutar entre ellas. Aquí solo quieres exponer una API, no unir las redes.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC es la red donde vive la API. Por sí sola no la publica en privado hacia redes de otras cuentas.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink da conectividad privada a un servicio entre VPC y cuentas, sin exponer el tráfico a internet.',
        },
        {
          service: 'AWS Client VPN',
          why: 'Client VPN conecta a personas desde sus equipos. No publica un servicio hacia las redes de otras cuentas.',
        },
      ],
      answer: 'AWS PrivateLink',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-14',
      prompt:
        'Una minera en Antofagasta mueve datos todo el día entre su centro de datos y AWS. Quiere una red más constante que su internet y, en muchos casos, pagar menos por la transferencia.',
      options: [
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect es un enlace dedicado que da una experiencia de red más constante que internet y, en muchos casos, reduce costos de red.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator mejora el camino de usuarios de internet hacia tu app. No une tu centro de datos con AWS.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN viaja por internet, así que la experiencia de red sigue dependiendo de internet.',
        },
      ],
      answer: 'AWS Direct Connect',
      topicSlug: 'hybrid-connectivity',
    },
  ],
};
