import type { Mission } from '../../../domain/Mission';

/**
 * Fintech PagoYa: a payments startup in Guadalajara that must meet a card network contract and find customer data in its buckets.
 * Practices AWS CloudHSM versus AWS KMS, Amazon Macie, encryption at rest and in transit on Amazon RDS, and auditing key usage.
 */
export const encryptionAndDataProtection2: Mission = {
  id: 'encryption-and-data-protection-2',
  track: 'financial',
  buildingId: 'fintech',
  topicSlug: 'encryption-and-data-protection',
  title: 'Llaves de hardware',
  client: { name: 'Fernanda Ruiz', role: 'Jefa de Seguridad de Fintech PagoYa' },
  intro: [
    '¡Qué bueno que llegaste! Soy Fernanda Ruiz, jefa de Seguridad de Fintech PagoYa. Desde Guadalajara procesamos los pagos con tarjeta de miles de pequeños comercios de México.',
    'Todo corre en AWS: la base de transacciones en Amazon RDS y millones de archivos de comercios en Amazon S3. Crecimos tan rápido que nadie sabe bien qué datos hay en cada bucket.',
    'Ahora queremos firmar con una red de tarjetas importante, y su contrato trae exigencias de cifrado muy específicas. Además, un fondo de inversión nos va a auditar antes de invertir.',
    'Si no cumplimos, perdemos el contrato y la inversión de golpe. ¿Me ayudas a poner las llaves en orden?',
  ],
  outro: {
    passed: [
      'Lo logramos. Tenemos HSM dedicados para la red de tarjetas, sabemos dónde están los datos personales, la base de transacciones está cifrada en reposo y en tránsito, y podemos demostrar quién usa cada clave.',
      'El contrato está firmado y el fondo quedó impresionado. Gracias: en PagoYa siempre te pagamos a tiempo.',
    ],
    failed: [
      'Uy... con estas decisiones la red de tarjetas no nos firma el contrato.',
      'Repasa la teoría sobre cifrado y protección de datos, y vuelve cuando quieras. Aquí te esperamos con las llaves.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'dedicated-hsm',
      prompt:
        'El contrato de la red de tarjetas exige que nuestras claves estén en un módulo de hardware dedicado solo a nosotros, y que nosotros controlemos por completo las claves y los usuarios del HSM. ¿Qué servicio cumple eso?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'kms-shared',
          label: 'AWS Key Management Service (AWS KMS)',
          definition:
            'Servicio administrado y multiinquilino para crear y controlar claves de cifrado, integrado con muchos servicios de AWS.',
          explanation:
            'KMS es multiinquilino: AWS opera el servicio y PagoYa define políticas. No cumple la exigencia de un HSM dedicado solo a ellos.',
          correct: false,
        },
        {
          id: 'acm-hsm',
          label: 'AWS Certificate Manager (ACM)',
          definition:
            'Servicio que crea, guarda y renueva certificados SSL/TLS públicos y privados.',
          explanation:
            'ACM gestiona certificados TLS; no ofrece un HSM dedicado para guardar las claves de la fintech.',
          correct: false,
        },
        {
          id: 'cloudhsm',
          label: 'AWS CloudHSM',
          definition:
            'Servicio que ofrece módulos de seguridad de hardware dedicados de un solo inquilino en la nube.',
          explanation:
            'CloudHSM da HSM dedicados a un solo cliente: AWS gestiona el hardware, pero PagoYa controla por completo las claves y los usuarios del HSM, fuera de IAM.',
          correct: true,
        },
        {
          id: 'macie-hsm',
          label: 'Amazon Macie',
          definition:
            'Servicio de seguridad de datos que descubre datos sensibles en Amazon S3 usando machine learning y coincidencia de patrones.',
          explanation:
            'Macie descubre datos sensibles en S3; no guarda ni administra claves de cifrado.',
          correct: false,
        },
      ],
    },
    {
      id: 'find-pii',
      prompt:
        'Tenemos miles de archivos que los comercios suben a Amazon S3, y no sabemos cuáles contienen datos personales o números de tarjeta. El fondo quiere saberlo. ¿Qué usamos para encontrarlos?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'guardduty-pii',
          label: 'Amazon GuardDuty',
          definition:
            'Servicio de seguridad orientado a detectar amenazas en la cuenta de AWS.',
          explanation:
            'GuardDuty detecta amenazas, no busca datos personales dentro de los archivos. Es una confusión típica con Macie.',
          correct: false,
        },
        {
          id: 'inspector-pii',
          label: 'Amazon Inspector',
          definition:
            'Servicio que analiza cargas de trabajo en busca de vulnerabilidades de software.',
          explanation:
            'Inspector busca vulnerabilidades, no datos personales en los archivos de S3.',
          correct: false,
        },
        {
          id: 'config-pii',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de los recursos, su historial de configuración y reglas para evaluar si cumplen lo que defines.',
          explanation:
            'Config evalúa la configuración de los buckets, pero no revisa el contenido de los archivos para encontrar datos personales.',
          correct: false,
        },
        {
          id: 'macie-pii',
          label: 'Amazon Macie',
          definition:
            'Servicio de seguridad de datos que descubre datos sensibles en Amazon S3 usando machine learning y coincidencia de patrones.',
          explanation:
            'Macie descubre en S3 información de identificación personal (PII), datos financieros o credenciales, y mantiene un inventario de los buckets.',
          correct: true,
        },
      ],
    },
    {
      id: 'rds-encryption',
      prompt:
        'La base de transacciones está en Amazon RDS. La red de tarjetas pide que los datos estén cifrados tanto guardados en la base como mientras viajan entre la app y la base. ¿Cómo lo resolvemos?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'rds-both',
          label: 'Cifrar la instancia de RDS en reposo con una clave de AWS KMS y usar conexiones SSL/TLS',
          definition:
            'Combinación de cifrado del almacenamiento de la base de datos y cifrado de las conexiones que llegan a ella.',
          explanation:
            'Amazon RDS cifra en reposo instancias y snapshots con claves de KMS (se activa al crear la instancia; una base existente se pasa a una copia cifrada de su snapshot) y acepta conexiones SSL/TLS, así quedan cubiertas las dos exigencias.',
          correct: true,
        },
        {
          id: 'tls-covers-disk',
          label: 'Solo usar conexiones SSL/TLS: con eso los datos del disco también quedan cifrados',
          definition:
            'Uso de TLS para cifrar las comunicaciones entre la aplicación y la base de datos.',
          explanation:
            'TLS protege los datos en tránsito, no los guardados en disco. Faltaría el cifrado en reposo.',
          correct: false,
        },
        {
          id: 'rest-only',
          label: 'Solo cifrar en reposo: con la base cifrada, las conexiones quedan protegidas',
          definition:
            'Cifrado del almacenamiento de la base de datos y sus snapshots.',
          explanation:
            'El cifrado en reposo protege los datos guardados, pero no lo que viaja por la red. La red de tarjetas pide ambas protecciones.',
          correct: false,
        },
        {
          id: 'macie-rds',
          label: 'Activar Amazon Macie sobre la base de datos para que la cifre',
          definition:
            'Servicio de seguridad de datos que descubre datos sensibles en Amazon S3.',
          explanation:
            'Macie descubre datos sensibles en S3; no cifra bases de datos ni conexiones.',
          correct: false,
        },
      ],
    },
    {
      id: 'key-audit',
      prompt:
        'Para el resto de nuestros datos usamos AWS KMS. El fondo pregunta dos cosas: cómo decidimos quién puede usar cada clave y cómo demostramos quién la usó. ¿Qué le respondemos?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'export-keys',
          label: 'Exportamos las claves en texto claro a un archivo con acceso restringido y anotamos quién lo abre',
          definition:
            'Práctica de sacar el material de las claves del servicio que las protege para guardarlo y controlarlo a mano.',
          explanation:
            'Las claves de KMS nunca salen del servicio sin cifrar. Además, un archivo manual no es evidencia confiable del uso de cada clave.',
          correct: false,
        },
        {
          id: 'key-policy-cloudtrail',
          label: 'Las políticas de claves de KMS definen quién puede usarlas, y AWS CloudTrail registra cada uso',
          definition:
            'Mecanismos de KMS para controlar el acceso a cada clave y para auditar las operaciones hechas con ella.',
          explanation:
            'Las políticas de claves controlan quién usa cada clave, y su uso puede auditarse en CloudTrail, que es la evidencia que pide el fondo.',
          correct: true,
        },
        {
          id: 'acm-audit',
          label: 'AWS Certificate Manager define quién usa las claves y guarda el registro de uso',
          definition:
            'Servicio que crea, guarda y renueva certificados SSL/TLS públicos y privados.',
          explanation:
            'ACM gestiona certificados TLS; no controla el acceso a las claves de KMS ni registra su uso.',
          correct: false,
        },
        {
          id: 'macie-audit',
          label: 'Amazon Macie controla el acceso a las claves y registra cada uso',
          definition:
            'Servicio de seguridad de datos que descubre datos sensibles en Amazon S3.',
          explanation:
            'Macie encuentra datos sensibles en S3, pero no administra el acceso a las claves de KMS ni audita su uso.',
          correct: false,
        },
      ],
    },
  ],
};
