import type { Mission } from '../../../domain/Mission';

/**
 * Joyería Oro Inca: a family jewelry shop in Lima whose online store, served with Amazon CloudFront, is under attack by bots.
 * Practices AWS WAF (SQL injection, rate-based rules, the Count action) and AWS Shield Standard.
 */
export const proteccionDeRedYAplicaciones1: Mission = {
  id: 'proteccion-de-red-y-aplicaciones-1',
  track: 'financiero',
  topicSlug: 'proteccion-de-red-y-aplicaciones',
  buildingId: 'joyeria-oro',
  title: 'Joyas a salvo en la web',
  client: { name: 'Rosa Huamán', role: 'Dueña de la Joyería Oro Inca' },
  intro: [
    'Te damos la bienvenida a la Joyería Oro Inca. Soy Rosa Huamán; mi abuelo abrió este taller en Lima y hoy vendemos nuestras piezas de oro y plata a todo el país desde una tienda en línea.',
    'La tienda corre en AWS: las instancias EC2 están detrás de un Application Load Balancer y servimos el sitio con Amazon CloudFront. Hasta hace un mes todo iba de maravilla.',
    'Ahora unos bots intentan meter código raro en el buscador de joyas y otros golpean la página de inicio de sesión miles de veces por minuto. Mis clientes se quejan de que el sitio va lento.',
    'Se viene la campaña del Día de la Madre, la más importante del año. Si la tienda cae esa semana, perdemos meses de ventas. ¿Me ayudas a blindarla?',
  ],
  outro: {
    passed: [
      'Mira el panel: AWS WAF ya está frenando la inyección SQL y la regla basada en tasa corta a los bots antes de que saturen el inicio de sesión.',
      'Y ahora sé que Shield Standard nos cuida contra los ataques DDoS más comunes sin que yo tenga que activar nada. Gracias: esta campaña va a brillar como nuestras joyas.',
    ],
    failed: [
      'Hmm... no estoy segura de que estas medidas detengan a los bots. Algunas de tus respuestas no me convencen.',
      'Repasa la teoría de WAF y Shield con calma y vuelve antes de la campaña. Aquí te espero con un café.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'sql-injection',
      prompt:
        'Empecemos por lo más grave. En los logs vemos que alguien escribe fragmentos de código SQL en el buscador de joyas, intentando sacar datos de nuestra base. El sitio se sirve con Amazon CloudFront. ¿Qué usamos para filtrar esas solicitudes?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'security-group-sqli',
          label: 'Un security group en las instancias EC2',
          definition:
            'Firewall virtual a nivel de instancia que permite tráfico según direcciones IP, puertos y protocolos, con reglas solo de permitir.',
          explanation:
            'Los security groups trabajan en las capas 3 y 4 con IP y puertos. No inspeccionan el contenido HTTP del buscador, que es donde viaja la inyección SQL.',
          correct: false,
        },
        {
          id: 'waf-sqli',
          label: 'AWS WAF, con una web ACL asociada a CloudFront',
          definition:
            'Firewall de aplicaciones web que monitorea y filtra solicitudes HTTP(S) en la capa 7 mediante web ACLs, reglas y grupos de reglas.',
          explanation:
            'AWS WAF inspecciona el contenido de las solicitudes web y tiene reglas para detectar inyección SQL. Se asocia a CloudFront, así que filtra los ataques antes de que lleguen a la tienda.',
          correct: true,
        },
        {
          id: 'nacl-sqli',
          label: 'Una network ACL en la subred de las instancias',
          definition:
            'Lista de control de acceso a nivel de subred, sin estado, con reglas de permitir y denegar por IP y puertos evaluadas en orden numérico.',
          explanation:
            'Una network ACL filtra por IP y puertos en la subred. No mira dentro de la solicitud HTTP, así que no detecta código SQL escrito en el buscador.',
          correct: false,
        },
        {
          id: 'shield-standard-sqli',
          label: 'AWS Shield Standard',
          definition:
            'Protección contra los ataques DDoS más comunes de las capas 3 y 4, activa automáticamente para todos los clientes de AWS.',
          explanation:
            'Shield Standard protege contra ataques que intentan saturar la red. La inyección SQL es un ataque de capa 7 sobre el contenido de la solicitud, que corresponde a AWS WAF.',
          correct: false,
        },
      ],
    },
    {
      id: 'login-flood',
      prompt:
        'Segundo problema: unas pocas direcciones IP mandan miles de solicitudes por minuto a la página de inicio de sesión. Quiero que cualquier IP que pase de cierto número de solicitudes quede bloqueada sola, sin que yo esté mirando. ¿Qué configuramos?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'shield-standard-rate',
          label: 'AWS Shield Standard',
          definition:
            'Servicio de protección DDoS sin cargo adicional que mitiga los ataques más comunes contra la red y el transporte.',
          explanation:
            'Shield Standard actúa sobre ataques de capas 3 y 4. No cuenta solicitudes HTTP por IP ni aplica un límite a la página de inicio de sesión.',
          correct: false,
        },
        {
          id: 'security-group-rate',
          label: 'Un security group que liste las IP de los bots',
          definition:
            'Conjunto de reglas de entrada y salida asociado a la interfaz de red de una instancia, que solo admite reglas de permitir.',
          explanation:
            'Los security groups solo admiten reglas de permitir, así que no sirven para bloquear IP, y tampoco cuentan solicitudes para reaccionar cuando una IP supera un umbral.',
          correct: false,
        },
        {
          id: 'nacl-rate',
          label: 'Una network ACL con reglas de denegar escritas a mano',
          definition:
            'Reglas numeradas de permitir y denegar que se aplican a todo el tráfico que entra o sale de una subred.',
          explanation:
            'Una network ACL puede denegar IP concretas, pero alguien tendría que escribirlas una por una. No cuenta solicitudes HTTP ni bloquea automáticamente las IP que superan un límite.',
          correct: false,
        },
        {
          id: 'waf-rate-rule',
          label: 'Una regla basada en tasa de AWS WAF',
          definition:
            'Tipo de regla de AWS WAF que cuenta las solicitudes que llegan desde cada dirección IP y aplica una acción a las que superan un número definido.',
          explanation:
            'Las reglas basadas en tasa bloquean o cuentan las IP que superan cierto número de solicitudes, de forma automática. Es justo lo que necesita la página de inicio de sesión de la joyería.',
          correct: true,
        },
      ],
    },
    {
      id: 'test-rule',
      prompt:
        'Mi sobrino, que me ayuda con la tienda, tiene miedo de que la nueva regla bloquee también a clientes reales. Quiere ver primero cuántas solicitudes coincidirían con ella antes de empezar a bloquear. ¿Qué acción le ponemos a la regla?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.2'],
      options: [
        {
          id: 'action-block',
          label: 'Block',
          definition:
            'Acción de AWS WAF que rechaza las solicitudes que coinciden con la regla, con un HTTP 403 o una respuesta personalizada.',
          explanation:
            'Block empezaría a rechazar solicitudes desde el primer minuto. Si la regla está mal ajustada, los clientes reales lo sufrirían antes de poder validarla.',
          correct: false,
        },
        {
          id: 'action-allow',
          label: 'Allow',
          definition: 'Acción de AWS WAF que deja pasar las solicitudes que coinciden con la regla hacia el recurso protegido.',
          explanation:
            'Allow sirve para permitir tráfico de forma explícita. No da la medición que busca el sobrino sobre cuántas solicitudes coincidirían con la regla.',
          correct: false,
        },
        {
          id: 'action-count',
          label: 'Count',
          definition:
            'Acción de AWS WAF que registra cuántas solicitudes coinciden con la regla y deja que la evaluación continúe sin bloquearlas.',
          explanation:
            'Count cuenta las coincidencias sin bloquear a nadie, por eso se usa para probar una regla. Cuando los números muestren que solo atrapa bots, se cambia a Block.',
          correct: true,
        },
        {
          id: 'action-captcha',
          label: 'CAPTCHA',
          definition:
            'Acción de AWS WAF que presenta un desafío a quien hace la solicitud para comprobar que es una persona.',
          explanation:
            'CAPTCHA sí afecta a quien coincide con la regla, porque le pide resolver un desafío. No es la acción pensada para medir una regla sin tocar el tráfico.',
          correct: false,
        },
      ],
    },
    {
      id: 'shield-standard',
      prompt:
        'Última duda. Un proveedor me dijo que para tener la protección básica contra ataques DDoS de AWS Shield Standard tengo que pagar y configurarla en la consola. Mi presupuesto es ajustado. ¿Qué tengo que hacer para tenerla?',
      topicSlug: 'proteccion-de-red-y-aplicaciones',
      examTasks: ['2.4'],
      options: [
        {
          id: 'nothing-automatic',
          label: 'Nada: Shield Standard está activo automáticamente y sin cargo adicional',
          definition:
            'Nivel de AWS Shield que protege a todos los clientes de AWS contra los ataques DDoS más comunes de las capas 3 y 4.',
          explanation:
            'Shield Standard se aplica automáticamente a todos los clientes sin cargo adicional, y tiene un beneficio especial en servicios como CloudFront, que la joyería ya usa.',
          correct: true,
        },
        {
          id: 'subscribe-advanced',
          label: 'Contratar la suscripción de pago y elegir los recursos a proteger',
          definition:
            'Suscripción de AWS Shield Advanced, que añade protección ampliada, métricas, el Shield Response Team y protección de costos para los recursos elegidos.',
          explanation:
            'Esa suscripción describe a Shield Advanced. Es una trampa típica del examen pensar que Shield Standard se paga o se activa: ya lo tiene.',
          correct: false,
        },
        {
          id: 'firewall-manager-standard',
          label: 'Configurarlo desde AWS Firewall Manager',
          definition:
            'Servicio que define políticas de protección una sola vez y las aplica en todas las cuentas de una organización de AWS Organizations.',
          explanation:
            'Firewall Manager centraliza reglas en organizaciones con varias cuentas. No es un paso necesario para tener Shield Standard en la cuenta de la joyería.',
          correct: false,
        },
        {
          id: 'business-support',
          label: 'Contratar un plan de AWS Support de pago',
          definition:
            'Plan de soporte de pago que da acceso a ingenieros de AWS y a más checks de Trusted Advisor, entre otros beneficios.',
          explanation:
            'Un plan de soporte de pago se pide para trabajar con el Shield Response Team de Shield Advanced. Shield Standard no lo requiere.',
          correct: false,
        },
      ],
    },
  ],
};
