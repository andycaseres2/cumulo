import type { Mission } from '../../../domain/Mission';

/**
 * Notaría Central: a notary office in San José, Costa Rica, that suspects one of its servers was compromised.
 * Practices Amazon GuardDuty, Amazon Macie, Amazon Inspector and the security checks of AWS Trusted Advisor.
 */
export const threatDetection1: Mission = {
  id: 'threat-detection-1',
  track: 'financial',
  topicSlug: 'threat-detection',
  buildingId: 'notary',
  title: 'La notaría bajo la lupa',
  client: { name: 'Lucía Araya', role: 'Notaria y socia directora de la Notaría Central' },
  intro: [
    'Buenas tardes. Soy Lucía Araya, socia directora de la Notaría Central, aquí en San José. Damos fe de compraventas, poderes y testamentos de miles de familias costarricenses.',
    'Hace un año digitalizamos todo: las escrituras escaneadas viven en Amazon S3 y nuestro sistema de citas corre en instancias EC2. Somos notarios, no expertos en seguridad.',
    'La semana pasada la factura de AWS subió sin explicación y un técnico nos dijo que uno de los servidores "hablaba con sitios raros". Desde entonces no duermo.',
    'Si se filtran los documentos de nuestros clientes, la notaría pierde lo único que vende: la confianza. ¿Me ayudas a saber qué está pasando y a prevenir lo que viene?',
  ],
  outro: {
    passed: [
      'Ya veo el panorama: GuardDuty vigila la cuenta, Inspector nos avisa del software sin parchar y Macie nos dijo qué buckets guardan datos personales.',
      'Y con los checks de Trusted Advisor cerramos los descuidos más básicos. Gracias: hoy puedo dar fe de que nuestra notaría está mejor cuidada.',
    ],
    failed: [
      'Mmm... con estas respuestas sigo sin saber bien qué vigila cada servicio. No me quedo tranquila.',
      'Repasa la teoría de detección de amenazas y vuelve cuando quieras. Las escrituras seguirán aquí, esperándote.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'suspicious-server',
      prompt:
        'Lo urgente primero. Queremos que AWS nos avise de forma continua si alguna instancia EC2 se comunica con direcciones IP asociadas a minería de criptomonedas o si alguien usa credenciales robadas, y sin instalar agentes en los servidores. ¿Qué activamos?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'guardduty',
          label: 'Amazon GuardDuty',
          definition:
            'Servicio de detección de amenazas que monitorea de forma continua la actividad de la cuenta con inteligencia de amenazas y machine learning.',
          explanation:
            'GuardDuty analiza CloudTrail, VPC Flow Logs y logs de DNS sin instalar agentes, y detecta minería de criptomonedas y credenciales comprometidas: justo la sospecha de la notaría.',
          correct: true,
        },
        {
          id: 'inspector-threat',
          label: 'Amazon Inspector',
          definition:
            'Servicio que descubre cargas de trabajo y las escanea de forma continua en busca de vulnerabilidades de software y exposición de red.',
          explanation:
            'Inspector encuentra software vulnerable, pero no detecta comportamiento malicioso como un servidor que se comunica con IP de minería de criptomonedas.',
          correct: false,
        },
        {
          id: 'macie-threat',
          label: 'Amazon Macie',
          definition:
            'Servicio de seguridad de datos que descubre datos sensibles, como información personal, en buckets de Amazon S3.',
          explanation:
            'Macie analiza el contenido de los buckets de S3. No vigila la actividad de red de las instancias EC2 de la notaría.',
          correct: false,
        },
        {
          id: 'trusted-advisor-threat',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona el entorno y recomienda mejoras en costo, rendimiento, tolerancia a fallos, límites de servicio y seguridad.',
          explanation:
            'Trusted Advisor recomienda buenas prácticas de configuración. No detecta amenazas activas como un servidor comprometido.',
          correct: false,
        },
      ],
    },
    {
      id: 'sensitive-deeds',
      prompt:
        'Ahora los documentos. Tenemos miles de escrituras escaneadas repartidas en varios buckets de Amazon S3, con números de cédula y datos de nuestros clientes. Necesito saber qué buckets contienen datos personales sensibles. ¿Qué servicio usamos?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'inspector-pii',
          label: 'Amazon Inspector',
          definition:
            'Servicio de gestión de vulnerabilidades que escanea instancias EC2, imágenes de contenedores en Amazon ECR y funciones Lambda.',
          explanation:
            'Inspector busca vulnerabilidades de software. Elegir Inspector para encontrar datos sensibles es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'config-pii',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de recursos, su historial de configuración y reglas para evaluar si cumplen lo que defines.',
          explanation:
            'Config indica si la configuración de un bucket cumple una regla. No analiza el contenido de las escrituras para encontrar datos personales.',
          correct: false,
        },
        {
          id: 'macie-pii',
          label: 'Amazon Macie',
          definition:
            'Servicio que usa machine learning y coincidencia de patrones para descubrir datos sensibles, como PII o datos financieros, en Amazon S3.',
          explanation:
            'Macie descubre datos sensibles como PII en Amazon S3, así que muestra qué buckets guardan las cédulas y los datos de los clientes de la notaría.',
          correct: true,
        },
        {
          id: 'detective-pii',
          label: 'Amazon Detective',
          definition:
            'Servicio que ayuda a investigar la causa raíz de hallazgos de seguridad con un grafo de comportamiento.',
          explanation:
            'Detective investiga lo ocurrido a partir de hallazgos y actividad sospechosa. No clasifica el contenido de los buckets.',
          correct: false,
        },
      ],
    },
    {
      id: 'unpatched-software',
      prompt:
        'El técnico sospecha que entraron por un paquete viejo del sistema de citas. Queremos que algo revise de forma continua las instancias EC2 en busca de vulnerabilidades conocidas (CVE) y vuelva a revisar cuando se publique una nueva. ¿Qué usamos?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'guardduty-cve',
          label: 'Amazon GuardDuty',
          definition:
            'Servicio que detecta comportamiento sospechoso en la cuenta a partir de CloudTrail, VPC Flow Logs y logs de DNS.',
          explanation:
            'GuardDuty detecta amenazas activas por comportamiento. Confundirlo con el escaneo de vulnerabilidades del software es una trampa típica del examen.',
          correct: false,
        },
        {
          id: 'detective-cve',
          label: 'Amazon Detective',
          definition:
            'Servicio que reúne datos de CloudTrail, VPC Flow Logs y hallazgos de GuardDuty para analizar actividad sospechosa.',
          explanation:
            'Detective sirve para investigar qué pasó después de un hallazgo. No escanea paquetes de software en busca de CVE.',
          correct: false,
        },
        {
          id: 'trusted-advisor-cve',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio con checks de buenas prácticas, como MFA en la cuenta raíz o puertos abiertos a todo internet.',
          explanation:
            'Trusted Advisor revisa la configuración de la cuenta con checks de buenas prácticas. No escanea el software instalado en las instancias.',
          correct: false,
        },
        {
          id: 'inspector-cve',
          label: 'Amazon Inspector',
          definition:
            'Servicio que descubre automáticamente cargas de trabajo y las escanea de forma continua en busca de vulnerabilidades de software conocidas.',
          explanation:
            'Inspector escanea las instancias EC2 en busca de CVE y vuelve a escanear cuando cambia algo, por ejemplo al publicarse una nueva CVE. Así la notaría sabe qué parchar primero.',
          correct: true,
        },
      ],
    },
    {
      id: 'basic-hygiene',
      prompt:
        'Por último, quiero cerrar los descuidos básicos. Me gustaría una lista de recomendaciones que me avise si la cuenta raíz no tiene MFA o si algún security group deja puertos abiertos a todo internet. ¿Qué servicio consulto?',
      topicSlug: 'threat-detection',
      examTasks: ['2.4'],
      options: [
        {
          id: 'macie-checks',
          label: 'Amazon Macie',
          definition:
            'Servicio que encuentra datos sensibles en Amazon S3 mediante machine learning y coincidencia de patrones.',
          explanation:
            'Macie se enfoca en los datos sensibles guardados en S3. No revisa la configuración de la cuenta raíz ni de los security groups.',
          correct: false,
        },
        {
          id: 'trusted-advisor-checks',
          label: 'AWS Trusted Advisor',
          definition:
            'Servicio que inspecciona el entorno de AWS y recomienda mejoras, con checks de seguridad sobre la configuración de la cuenta.',
          explanation:
            'Trusted Advisor incluye checks de seguridad como MFA on root account y Security Groups – Specific Ports Unrestricted. Con Basic Support hay checks seleccionados; el conjunto completo requiere un plan de soporte superior.',
          correct: true,
        },
        {
          id: 'guardduty-checks',
          label: 'Amazon GuardDuty',
          definition:
            'Servicio de detección continua de amenazas que genera hallazgos sobre actividad maliciosa en la cuenta.',
          explanation:
            'GuardDuty detecta amenazas activas, como credenciales comprometidas. No es una lista de recomendaciones de buenas prácticas de configuración.',
          correct: false,
        },
        {
          id: 'detective-checks',
          label: 'Amazon Detective',
          definition:
            'Servicio que construye un grafo de comportamiento para analizar la causa raíz de hallazgos de seguridad.',
          explanation:
            'Detective investiga hallazgos que ya existen. No recomienda activar MFA ni cerrar puertos abiertos.',
          correct: false,
        },
      ],
    },
  ],
};
