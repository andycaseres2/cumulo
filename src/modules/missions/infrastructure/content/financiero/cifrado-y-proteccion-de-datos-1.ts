import type { Mission } from '../../../domain/Mission';

/**
 * Inversiones Istmo: a wealth management firm in Panama City, with offices in the Torre Financiera, securing its investor portal.
 * Practices encryption in transit versus at rest, AWS Certificate Manager renewals, Amazon S3 default encryption and AWS KMS key types.
 */
export const cifradoYProteccionDeDatos1: Mission = {
  id: 'cifrado-y-proteccion-de-datos-1',
  track: 'financiero',
  buildingId: 'torre-financiera',
  topicSlug: 'cifrado-y-proteccion-de-datos',
  title: 'El candado del inversionista',
  client: { name: 'Andrés Quintero', role: 'CTO de Inversiones Istmo' },
  intro: [
    'Adelante, te damos la bienvenida al piso 32 de la Torre Financiera. Soy Andrés Quintero, CTO de Inversiones Istmo. Desde Ciudad de Panamá administramos los ahorros e inversiones de miles de familias.',
    'Nuestros clientes entran a un portal en AWS para ver sus carteras y descargar sus estados de cuenta en PDF, que guardamos en Amazon S3.',
    'El mes pasado el certificado del portal venció sin que nadie lo notara y los navegadores mostraron una advertencia de seguridad. Varios clientes llamaron asustados, y ahora el regulador quiere revisar cómo protegemos sus datos.',
    'Si no ponemos el candado correcto en cada lugar, perdemos la confianza de nuestros inversionistas. ¿Me ayudas a revisarlo todo?',
  ],
  outro: {
    passed: [
      'Excelente. Los datos viajan cifrados, el certificado se renueva solo, los estados de cuenta están cifrados en S3 y controlamos nuestras propias claves.',
      'El regulador quedó satisfecho y los inversionistas, tranquilos. Gracias: en Inversiones Istmo siempre tendrás un asesor de confianza.',
    ],
    failed: [
      'Mmm... con estas decisiones todavía quedan datos sin el candado correcto.',
      'Repasa la teoría sobre cifrado y protección de datos, y vuelve cuando quieras. El piso 32 te espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'in-transit',
      prompt:
        'Empecemos por lo que vieron los clientes. Queremos que nadie pueda interceptar los datos mientras viajan entre su navegador y nuestro portal. ¿Qué tipo de protección es esa?',
      topicSlug: 'cifrado-y-proteccion-de-datos',
      examTasks: ['2.2'],
      options: [
        {
          id: 'ebs-at-rest',
          label: 'Cifrado en reposo de los volúmenes de los servidores',
          definition:
            'Cifrado de los datos guardados en discos, bases de datos o buckets, con claves como las de AWS KMS.',
          explanation:
            'El cifrado en reposo protege los datos guardados. No protege la comunicación entre el navegador y el portal.',
          correct: false,
        },
        {
          id: 'tls-in-transit',
          label: 'Cifrado en tránsito con TLS, es decir, HTTPS',
          definition:
            'Protección de los datos mientras viajan por la red mediante Transport Layer Security (TLS).',
          explanation:
            'La amenaza es que alguien intercepte la comunicación, y eso se resuelve con TLS: el portal debe servirse por HTTPS.',
          correct: true,
        },
        {
          id: 'macie-transit',
          label: 'Amazon Macie',
          definition:
            'Servicio que descubre datos sensibles, como PII o datos financieros, en Amazon S3 usando machine learning y coincidencia de patrones.',
          explanation:
            'Macie encuentra datos sensibles en S3, pero no cifra la comunicación entre el navegador y el portal.',
          correct: false,
        },
        {
          id: 'sse-s3-transit',
          label: 'Cifrado del lado del servidor en Amazon S3 (SSE-S3)',
          definition:
            'Cifrado que S3 aplica a los objetos guardados en sus buckets con claves administradas por S3.',
          explanation:
            'SSE-S3 cifra los objetos guardados en el bucket, es decir, en reposo. No protege los datos en el camino.',
          correct: false,
        },
      ],
    },
    {
      id: 'certificate-renewal',
      prompt:
        'Ahora, el certificado que venció. Lo compramos a una autoridad externa y lo importamos en ACM para usarlo en nuestro Application Load Balancer. No quiero que vuelva a vencer. ¿Qué hacemos?',
      topicSlug: 'cifrado-y-proteccion-de-datos',
      examTasks: ['2.2'],
      options: [
        {
          id: 'reimport',
          label: 'Volver a importar el certificado externo en ACM, que desde ahora lo renovará solo',
          definition:
            'Carga en AWS Certificate Manager de un certificado emitido por otra autoridad certificadora.',
          explanation:
            'Los certificados importados no se renuevan automáticamente. Reimportarlo solo pospone el mismo problema.',
          correct: false,
        },
        {
          id: 'kms-cert',
          label: 'Guardar el certificado en AWS KMS para que gestione su vencimiento',
          definition:
            'Servicio administrado para crear y controlar las claves con las que se cifran y firman datos.',
          explanation:
            'KMS administra claves de cifrado, no certificados SSL/TLS ni su renovación.',
          correct: false,
        },
        {
          id: 'cloudhsm-cert',
          label: 'Mover el certificado a un HSM dedicado de AWS CloudHSM',
          definition:
            'Servicio que ofrece módulos de seguridad de hardware dedicados de un solo inquilino, cuyas claves y usuarios controla el cliente.',
          explanation:
            'CloudHSM da control exclusivo sobre claves en hardware dedicado, pero no renueva certificados del portal.',
          correct: false,
        },
        {
          id: 'acm-issued',
          label: 'Pedir un certificado público emitido por ACM, con validación por DNS, y asociarlo al load balancer',
          definition:
            'Certificado SSL/TLS creado por AWS Certificate Manager para usarlo con servicios integrados como Elastic Load Balancing.',
          explanation:
            'ACM renueva automáticamente los certificados que emite con validación por DNS, y los públicos usados con servicios integrados no tienen cargo adicional.',
          correct: true,
        },
      ],
    },
    {
      id: 's3-default-encryption',
      prompt:
        'Los estados de cuenta en PDF están en Amazon S3. Un consultor anterior nos dijo que tenemos que activar el cifrado para que los PDF nuevos no queden expuestos. ¿Es así?',
      topicSlug: 'cifrado-y-proteccion-de-datos',
      examTasks: ['2.2'],
      options: [
        {
          id: 's3-encrypts-new',
          label: 'No hace falta: S3 ya cifra los objetos nuevos con SSE-S3, y pueden elegir claves de AWS KMS si quieren más control',
          definition:
            'Cifrado automático de Amazon S3 para todos los objetos nuevos, con claves administradas por S3 y sin costo adicional.',
          explanation:
            'Desde el 5 de enero de 2023, S3 cifra automáticamente todos los objetos nuevos con SSE-S3. Si la firma quiere controlar las claves, puede elegir claves de KMS.',
          correct: true,
        },
        {
          id: 's3-plain-default',
          label: 'Sí: S3 guarda los objetos sin cifrar hasta que alguien activa el cifrado en cada bucket',
          definition:
            'Suposición de que el almacenamiento de objetos no aplica cifrado a menos que se configure de forma explícita.',
          explanation:
            'Es una trampa típica: S3 ya cifra por defecto todos los objetos nuevos desde 2023.',
          correct: false,
        },
        {
          id: 'acm-objects',
          label: 'Sí, y hay que usar AWS Certificate Manager para cifrar cada PDF',
          definition:
            'Servicio que crea, guarda y renueva certificados SSL/TLS públicos y privados.',
          explanation:
            'ACM sirve para certificados TLS, es decir, para datos en tránsito. No cifra los objetos guardados en S3.',
          correct: false,
        },
        {
          id: 'move-to-tls',
          label: 'Basta con servir el portal por HTTPS: eso cifra también los PDF guardados en el bucket',
          definition:
            'Uso de TLS para proteger las conexiones entre los usuarios y una aplicación web.',
          explanation:
            'TLS protege los datos en tránsito; no cifra los archivos guardados. Son protecciones distintas.',
          correct: false,
        },
      ],
    },
    {
      id: 'key-control',
      prompt:
        'Última pregunta: el regulador quiere que nosotros controlemos quién puede usar la clave que cifra los estados de cuenta y cuándo rota, y que se pueda auditar su uso. Sin operar hardware propio. ¿Qué clave usamos?',
      topicSlug: 'cifrado-y-proteccion-de-datos',
      examTasks: ['2.2'],
      options: [
        {
          id: 'aws-owned-key',
          label: 'Una clave propiedad de AWS (AWS owned)',
          definition:
            'Clave que un servicio usa por ti para cifrar por defecto; no la ves en tu cuenta y no tiene costo para ti.',
          explanation:
            'Las claves propiedad de AWS ni siquiera se ven en la cuenta, así que la firma no podría controlar su política ni su rotación.',
          correct: false,
        },
        {
          id: 'aws-managed-key',
          label: 'Una clave administrada por AWS (AWS managed)',
          definition:
            'Clave que un servicio crea en tu cuenta; puedes verla, pero no administrarla, y rota cada año.',
          explanation:
            'Con una clave administrada por AWS la firma puede verla, pero no definir su política ni su rotación.',
          correct: false,
        },
        {
          id: 'customer-managed-key',
          label: 'Una clave de AWS KMS administrada por el cliente (customer managed)',
          definition:
            'Clave de KMS que el cliente crea y cuya política, rotación y eliminación controla, con cargo mensual y por uso.',
          explanation:
            'La firma define con la política de la clave quién puede usarla y controla su rotación; su uso se audita en AWS CloudTrail, sin operar hardware propio.',
          correct: true,
        },
        {
          id: 'acm-key',
          label: 'Un certificado privado de AWS Certificate Manager',
          definition:
            'Certificado SSL/TLS para identificar recursos internos, emitido con AWS Private CA.',
          explanation:
            'Un certificado privado identifica recursos en conexiones TLS; no es la clave que cifra los estados de cuenta guardados.',
          correct: false,
        },
      ],
    },
  ],
};
