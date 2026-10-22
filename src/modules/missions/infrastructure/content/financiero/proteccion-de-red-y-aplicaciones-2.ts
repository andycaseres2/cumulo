import type { Mission } from '../../../domain/Mission';

/**
 * Aseguradora Pacífico: an insurer in Guayaquil with many AWS accounts and a quote portal targeted by DDoS attacks.
 * Practices AWS Shield Advanced, AWS Firewall Manager, and network ACLs versus security groups.
 */
export const proteccionDeRedYAplicaciones2: Mission = {
  id: 'proteccion-de-red-y-aplicaciones-2',
  track: 'financiero',
  topicSlug: 'proteccion-de-red-y-aplicaciones',
  buildingId: 'aseguradora-pacifico',
  title: 'Escudo para la aseguradora',
  client: { name: 'Andrés Villalobos', role: 'Jefe de infraestructura de Aseguradora Pacífico' },
  intro: [
    'Pasa, pasa. Soy Andrés Villalobos, jefe de infraestructura de Aseguradora Pacífico. Desde Guayaquil vendemos seguros de auto, salud y hogar en todo Ecuador.',
    'Nuestro portal de cotizaciones corre en AWS, detrás de Application Load Balancers y Amazon CloudFront. Cada área tiene su propia cuenta y ya sumamos veinte cuentas en AWS Organizations.',
    'El mes pasado sufrimos un ataque DDoS enorme justo en el cierre de ventas, y cada equipo tiene sus reglas de firewall a su manera. Nadie sabe bien qué está protegido y qué no.',
    'El directorio quiere un plan serio antes de la próxima campaña. Necesito a alguien que me ayude a levantar un buen escudo. ¿Te animas?',
  ],
  outro: {
    passed: [
      'Esto ya es otra cosa. Shield Advanced cubre el portal con su equipo de respuesta y Firewall Manager aplica las mismas reglas en las veinte cuentas, incluso en las que creemos mañana.',
      'Y con las network ACLs bien entendidas, el equipo de redes por fin habla el mismo idioma. Gracias: el directorio va a dormir tranquilo.',
    ],
    failed: [
      'Mmm... con este plan no me atrevo a presentarme ante el directorio. Hay decisiones que nos dejarían expuestos.',
      'Repasa la teoría de Shield, Firewall Manager y los controles de red de la VPC, y vuelve cuando quieras. La aseguradora te espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ddos-response',
      prompt:
        'Lo primero es el portal de cotizaciones. Queremos protección DDoS ampliada para los balanceadores y CloudFront, poder llamar a un equipo especializado de AWS durante un ataque y que un pico de costos causado por el ataque no nos arruine el mes. ¿Qué contratamos?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'shield-standard-ddos',
          label: 'AWS Shield Standard',
          definition:
            'Protección automática y sin cargo adicional contra los ataques DDoS más comunes de las capas 3 y 4.',
          explanation:
            'La aseguradora ya tiene Shield Standard, pero no incluye el Shield Response Team ni la protección de costos que pide el directorio.',
          correct: false,
        },
        {
          id: 'waf-only-ddos',
          label: 'Solo AWS WAF con una web ACL en el portal',
          definition:
            'Firewall de aplicaciones web que filtra solicitudes HTTP(S) con reglas asociadas a recursos como CloudFront o un Application Load Balancer.',
          explanation:
            'AWS WAF filtra solicitudes web en la capa 7, pero por sí solo no da acceso a un equipo de respuesta DDoS ni protección de costos ante un ataque.',
          correct: false,
        },
        {
          id: 'shield-advanced',
          label: 'AWS Shield Advanced',
          definition:
            'Suscripción de pago de AWS Shield con protección DDoS ampliada para los recursos elegidos, métricas e informes detallados.',
          explanation:
            'Shield Advanced da protección ampliada a balanceadores y CloudFront, acceso al Shield Response Team y protección de costos ante picos causados por un ataque. Para trabajar con el SRT, AWS exige además un plan de AWS Support de pago.',
          correct: true,
        },
        {
          id: 'nacl-ddos',
          label: 'Una network ACL en cada subred del portal',
          definition:
            'Reglas de permitir y denegar por IP y puertos que se aplican al tráfico de una subred, evaluadas en orden numérico.',
          explanation:
            'Una network ACL controla tráfico por IP y puertos en una subred. No incluye equipo de respuesta ni protección de costos frente a un ataque DDoS.',
          correct: false,
        },
      ],
    },
    {
      id: 'central-rules',
      prompt:
        'Ahora el desorden de reglas. Queremos definir nuestras reglas de AWS WAF una sola vez y que se apliquen solas en las veinte cuentas de la organización, también en las cuentas nuevas que se creen. ¿Qué servicio usamos?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'firewall-manager',
          label: 'AWS Firewall Manager',
          definition:
            'Servicio que define políticas de protección una sola vez y las aplica en las cuentas y recursos de una organización de AWS Organizations.',
          explanation:
            'Firewall Manager aplica automáticamente las reglas de AWS WAF en todas las cuentas y recursos de la organización, incluso en los nuevos. Requiere AWS Organizations, que la aseguradora ya usa.',
          correct: true,
        },
        {
          id: 'single-web-acl',
          label: 'Una web ACL de AWS WAF en la cuenta principal',
          definition:
            'Conjunto de reglas de AWS WAF con una acción predeterminada que se asocia a recursos concretos que reciben solicitudes HTTP(S).',
          explanation:
            'Una web ACL protege los recursos a los que se asocia. Elegir solo WAF cuando se piden reglas en todas las cuentas de la organización es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'shield-standard-central',
          label: 'AWS Shield Standard',
          definition:
            'Nivel de AWS Shield activo para todos los clientes que mitiga ataques DDoS comunes en la red y el transporte.',
          explanation:
            'Shield Standard protege contra DDoS de capas 3 y 4. No administra reglas de WAF entre cuentas.',
          correct: false,
        },
        {
          id: 'security-group-central',
          label: 'Un security group copiado en cada cuenta',
          definition:
            'Firewall virtual a nivel de instancia, con estado, que controla el tráfico por IP, puertos y protocolos.',
          explanation:
            'Un security group trabaja con IP y puertos en cada instancia. No aplica reglas de WAF ni se propaga solo a las cuentas nuevas.',
          correct: false,
        },
      ],
    },
    {
      id: 'block-ip',
      prompt:
        'Los corredores de seguros suben archivos a un servidor SFTP en una instancia EC2. Detectamos una IP que intenta entrar por fuerza bruta y queremos denegarla para toda la subred del servidor. Esto no es tráfico web. ¿Qué usamos?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.2'],
      options: [
        {
          id: 'sg-deny',
          label: 'Una regla de denegar en el security group del servidor',
          definition:
            'Conjunto de reglas asociado a la interfaz de red de una instancia que evalúa todas sus reglas antes de decidir.',
          explanation:
            'Los security groups solo admiten reglas de permitir. Bloquear una IP con un security group es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'waf-sftp',
          label: 'Una regla de AWS WAF que bloquee esa IP',
          definition:
            'Regla de un firewall de aplicaciones web que filtra solicitudes HTTP(S) por condiciones como la dirección IP o el país de origen.',
          explanation:
            'AWS WAF filtra solicitudes HTTP(S) y se asocia a recursos como ALB, CloudFront o API Gateway. El tráfico SFTP hacia una instancia EC2 no pasa por WAF.',
          correct: false,
        },
        {
          id: 'shield-sftp',
          label: 'AWS Shield Standard',
          definition:
            'Protección DDoS automática que mitiga ataques comunes de saturación en las capas de red y transporte.',
          explanation:
            'Shield Standard protege contra ataques DDoS comunes. No sirve para denegar una IP concreta que intenta adivinar contraseñas.',
          correct: false,
        },
        {
          id: 'nacl-deny',
          label: 'Una regla de denegar en la network ACL de la subred',
          definition:
            'Lista de control de acceso a nivel de subred que admite reglas de permitir y denegar por IP y puertos.',
          explanation:
            'Las network ACLs admiten reglas de denegar y se aplican a toda la subred, así que bloquean esa IP para cualquier protocolo, incluido SFTP.',
          correct: true,
        },
      ],
    },
    {
      id: 'stateless-nacl',
      prompt:
        'Al agregar esa regla, alguien del equipo preguntó algo que nos dividió: si la network ACL permite el tráfico SFTP que entra a la subred, ¿hace falta además una regla para que salgan las respuestas? ¿Qué le respondo?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.2'],
      options: [
        {
          id: 'nacl-stateful',
          label: 'No: las network ACLs son con estado y la respuesta se permite sola',
          definition:
            'Un filtro con estado recuerda las conexiones permitidas y deja pasar automáticamente el tráfico de respuesta.',
          explanation:
            'Con estado (stateful) describe a los security groups. Las network ACLs son sin estado y no recuerdan la solicitud que dejaron entrar.',
          correct: false,
        },
        {
          id: 'nacl-stateless',
          label: 'Sí: las network ACLs son sin estado y la respuesta debe permitirse explícitamente',
          definition:
            'Un filtro sin estado evalúa cada paquete por separado, sin tener en cuenta las conexiones que ya permitió.',
          explanation:
            'Las network ACLs son sin estado (stateless): el tráfico de respuesta necesita su propia regla de salida. En cambio, en un security group la respuesta se permite sola.',
          correct: true,
        },
        {
          id: 'shield-responses',
          label: 'No: AWS Shield Standard permite las respuestas automáticamente',
          definition:
            'Servicio de protección DDoS que mitiga ataques comunes contra la red de los recursos de AWS.',
          explanation:
            'Shield Standard protege contra DDoS. No decide qué tráfico de respuesta deja pasar una network ACL.',
          correct: false,
        },
        {
          id: 'waf-outbound',
          label: 'Sí, pero la regla de salida se crea en AWS WAF',
          definition:
            'Firewall de capa 7 que evalúa solicitudes HTTP(S) con reglas agrupadas en una web ACL.',
          explanation:
            'AWS WAF filtra solicitudes web hacia recursos como CloudFront o un ALB. Las reglas de salida de una subred se definen en la propia network ACL.',
          correct: false,
        },
      ],
    },
  ],
};
