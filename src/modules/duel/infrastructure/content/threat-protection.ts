import type { ServiceFamily } from '../../domain/ServiceFamily';

export const threatProtectionFamily: ServiceFamily = {
  id: 'threat-protection',
  title: 'Detección y protección de amenazas',
  summary:
    'Unos detectan amenazas en registros, otros buscan vulnerabilidades o datos sensibles, otros frenan DDoS o filtran peticiones web, y otros juntan hallazgos, investigan o aplican reglas en todas las cuentas.',
  services: [
    { name: 'Amazon GuardDuty', summary: 'Detecta amenazas analizando CloudTrail, VPC Flow Logs y DNS; la detección básica no requiere instalar agentes.' },
    { name: 'Amazon Inspector', summary: 'Escanea EC2, imágenes de ECR y Lambda en busca de vulnerabilidades (CVE) y exposición de red.' },
    { name: 'Amazon Macie', summary: 'Descubre datos sensibles como datos personales en S3 y evalúa la seguridad de los buckets.' },
    { name: 'AWS Shield', summary: 'Protección contra DDoS: Standard es automático y gratis; Advanced es de pago y con equipo de respuesta.' },
    { name: 'AWS WAF', summary: 'Firewall web de capa 7: filtra peticiones HTTP(S) por IP, país, inyección SQL o tasa.' },
    { name: 'AWS Security Hub', summary: 'Junta hallazgos de varios servicios y revisa tu entorno contra estándares como CIS.' },
    { name: 'Amazon Detective', summary: 'Investiga la causa raíz de un hallazgo con un grafo de comportamiento sobre tus registros.' },
    { name: 'AWS Firewall Manager', summary: 'Aplica reglas de WAF, Shield Advanced y grupos de seguridad en todas las cuentas de la organización.' },
  ],
  cards: [
    {
      id: 'threat-protection-1',
      prompt:
        'Un e-commerce de Bogotá quiere saber si alguna instancia empieza a minar criptomonedas o si alguien usa sus credenciales desde una IP maliciosa, sin instalar agentes. ¿Qué servicio activa?',
      options: [
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty analiza CloudTrail, VPC Flow Logs y DNS con inteligencia de amenazas y detecta minería no autorizada y credenciales comprometidas.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector busca software vulnerable y exposición de red; no vigila actividad maliciosa en curso.',
        },
        {
          service: 'Amazon Macie',
          why: 'Macie busca datos sensibles en S3; no detecta minería ni uso de credenciales robadas.',
        },
      ],
      answer: 'Amazon GuardDuty',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-2',
      prompt:
        'Una fintech de Santiago quiere revisar sus imágenes de contenedor en ECR y sus funciones Lambda para encontrar paquetes con CVE conocidos antes de pasar a producción. ¿Qué servicio usa?',
      options: [
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detecta comportamiento malicioso en tus registros; no hace inventario de paquetes vulnerables.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector escanea imágenes de ECR, funciones Lambda e instancias EC2 en busca de vulnerabilidades de software.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub recibe y junta los hallazgos de Inspector, pero no es quien escanea las imágenes.',
        },
      ],
      answer: 'Amazon Inspector',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-3',
      prompt:
        'Una clínica de Medellín guarda miles de archivos en S3 y no sabe cuáles contienen números de documento, historias clínicas o tarjetas de crédito. ¿Qué servicio los encuentra?',
      options: [
        {
          service: 'Amazon Inspector',
          why: 'Inspector busca vulnerabilidades en cómputo; no lee el contenido de los objetos de S3.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty puede detectar amenazas sobre S3, pero no clasifica qué archivos tienen datos personales.',
        },
        {
          service: 'Amazon Macie',
          why: 'Macie usa aprendizaje automático y patrones para descubrir datos sensibles, como datos personales y financieros, en S3.',
        },
        {
          service: 'Amazon Detective',
          why: 'Detective investiga la causa raíz de hallazgos de seguridad; no inspecciona el contenido de los archivos.',
        },
      ],
      answer: 'Amazon Macie',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-4',
      prompt:
        'Un diario digital de Lima recién llega a AWS con CloudFront y Route 53. Quiere protección contra los ataques DDoS más comunes de red y transporte sin pagar extra ni configurar nada. ¿Qué la da?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF filtra peticiones web en capa 7 con reglas que tú defines y se cobra por uso; no es la protección automática y gratuita.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield Standard protege a todos los clientes de AWS, automáticamente y sin costo adicional, contra DDoS comunes de capas 3 y 4.',
        },
        {
          service: 'AWS Firewall Manager',
          why: 'Firewall Manager administra reglas en muchas cuentas; no es la defensa básica contra DDoS.',
        },
      ],
      answer: 'AWS Shield',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-5',
      prompt:
        'Una boletera de Buenos Aires quiere bloquear intentos de inyección SQL y limitar cuántas peticiones por IP llegan a su Application Load Balancer cuando abre una preventa. ¿Qué servicio usa?',
      options: [
        {
          service: 'AWS Shield',
          why: 'Shield Standard mitiga DDoS de red y transporte; las reglas de inyección SQL y límite por IP son de un firewall web.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detecta amenazas y avisa, pero no bloquea peticiones HTTP en el balanceador.',
        },
        {
          service: 'AWS WAF',
          why: 'WAF inspecciona peticiones HTTP(S) en el balanceador y las bloquea con reglas de inyección SQL y reglas basadas en tasa.',
        },
      ],
      answer: 'AWS WAF',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-6',
      prompt:
        'Un banco de La Paz usa varios servicios de seguridad y quiere una sola vista que junte sus hallazgos y le diga cuánto cumple el estándar CIS y las mejores prácticas de AWS. ¿Qué servicio activa?',
      options: [
        {
          service: 'Amazon Detective',
          why: 'Detective profundiza en un hallazgo concreto para hallar su causa; no mide el cumplimiento de estándares.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub junta hallazgos de GuardDuty, Inspector, Macie y otros, y revisa tu entorno contra CIS y AWS FSBP.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty genera sus propios hallazgos de amenazas, pero no consolida los de otros servicios ni evalúa estándares.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector aporta hallazgos de vulnerabilidades; no es la vista central de toda tu postura de seguridad.',
        },
      ],
      answer: 'AWS Security Hub',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-7',
      prompt:
        'Una alerta indica que un rol de una aseguradora de Montevideo hizo llamadas a la API inusuales. El equipo quiere ver, en un grafo, qué más hizo ese rol las últimas semanas y hallar la causa raíz.',
      options: [
        {
          service: 'Amazon Macie',
          why: 'Macie descubre datos sensibles en S3; no reconstruye la actividad de un rol en el tiempo.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub junta y prioriza hallazgos, pero la investigación de causa raíz con grafo es de otro servicio.',
        },
        {
          service: 'Amazon Detective',
          why: 'Detective arma un grafo de comportamiento con CloudTrail, VPC Flow Logs y hallazgos para investigar la causa raíz.',
        },
      ],
      answer: 'Amazon Detective',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-8',
      prompt:
        'Un grupo de retail de Ciudad de Panamá tiene 20 cuentas en su organización. Quiere aplicar las mismas reglas de firewall web y grupos de seguridad en todas, también en las cuentas nuevas. ¿Qué servicio usa?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF define las reglas, pero configurarlo cuenta por cuenta no las aplica solo a las cuentas que se agreguen.',
        },
        {
          service: 'AWS Firewall Manager',
          why: 'Firewall Manager aplica políticas de WAF, Shield Advanced y grupos de seguridad en toda la organización, incluidas las cuentas nuevas.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield protege contra DDoS; no reparte reglas de firewall web ni grupos de seguridad entre cuentas.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub junta hallazgos y revisa estándares; no despliega reglas de firewall.',
        },
      ],
      answer: 'AWS Firewall Manager',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-9',
      prompt:
        'Una plataforma de streaming de Ciudad de México sufrió un DDoS grande y quiere acceso 24/7 a un equipo de respuesta de AWS y protección de costos por el escalado que cause un ataque. ¿Qué contrata?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF filtra peticiones web, pero por sí solo no incluye equipo de respuesta ante DDoS ni protección de costos.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detecta amenazas en tus registros; no mitiga DDoS ni devuelve costos de escalado.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield Advanced, de pago, suma acceso 24/7 al Shield Response Team y protección de costos ante picos causados por DDoS.',
        },
      ],
      answer: 'AWS Shield',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-10',
      prompt:
        'Un hospital de Guayaquil tiene 60 instancias EC2. Quiere saber cuáles tienen paquetes vulnerables o puertos expuestos sin querer, y que se reevalúen solas cuando se publique un CVE nuevo.',
      options: [
        {
          service: 'Amazon Macie',
          why: 'Macie analiza datos en S3; no revisa paquetes instalados en instancias.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector escanea EC2 de forma continua por vulnerabilidades y exposición de red, y reevalúa cuando sale un CVE nuevo.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detecta actividad sospechosa, no el software vulnerable que tienes instalado.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub mostraría esos hallazgos, pero quien escanea las instancias es otro servicio.',
        },
      ],
      answer: 'Amazon Inspector',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-11',
      prompt:
        'Una aseguradora de Asunción quiere un inventario de sus buckets y que le avisen si alguno se vuelve público o tiene datos personales de clientes. ¿Qué servicio cubre ambas cosas?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF filtra peticiones web; no revisa la configuración de acceso de los buckets ni su contenido.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detecta intentos de exfiltración, pero no clasifica qué buckets guardan datos personales.',
        },
        {
          service: 'Amazon Macie',
          why: 'Macie mantiene el inventario de buckets, avisa si uno se vuelve público y descubre datos sensibles en sus objetos.',
        },
      ],
      answer: 'Amazon Macie',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-12',
      prompt:
        'Una startup de Quito quiere enterarse pronto si una clave de acceso filtrada se usa desde un lugar raro o si hay malware en sus instancias. No busca investigar a fondo, solo detectar. ¿Qué activa?',
      options: [
        {
          service: 'Amazon Detective',
          why: 'Detective sirve para investigar después de un hallazgo; no es el servicio que genera la detección.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector encuentra vulnerabilidades de software; no detecta uso anómalo de credenciales.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty vigila de forma continua y genera hallazgos por credenciales comprometidas y malware en EC2.',
        },
      ],
      answer: 'Amazon GuardDuty',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-13',
      prompt:
        'Una tienda online de Guadalajara solo vende en México y recibe tráfico sospechoso de otros países. Quiere bloquear en su distribución de CloudFront las peticiones según el país de origen.',
      options: [
        {
          service: 'AWS WAF',
          why: 'Una regla geográfica de WAF permite o bloquea peticiones según el país de origen de la IP.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield mitiga DDoS; no bloquea peticiones legítimas por país con reglas tuyas.',
        },
        {
          service: 'AWS Firewall Manager',
          why: 'Firewall Manager reparte reglas entre muchas cuentas; con una sola tienda, la regla se define directo en el firewall web.',
        },
      ],
      answer: 'AWS WAF',
      topicSlug: 'network-and-application-protection',
    },
  ],
};
