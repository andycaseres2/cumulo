import type { ServiceFamily } from '../../domain/ServiceFamily';

export const identityFamily: ServiceFamily = {
  id: 'identity',
  title: 'Identidad, claves y cumplimiento',
  summary:
    'Quién entra (personal o clientes de tu app), qué cuentas gobiernas, con qué claves cifras, dónde guardas secretos y certificados, y de dónde sacas los informes de cumplimiento de AWS.',
  services: [
    { name: 'AWS IAM', summary: 'Usuarios, grupos, roles y políticas que controlan quién puede hacer qué dentro de una cuenta.' },
    { name: 'AWS IAM Identity Center', summary: 'Inicio de sesión único del personal en varias cuentas de AWS y aplicaciones, con tu directorio.' },
    { name: 'Amazon Cognito', summary: 'Registro e inicio de sesión de los usuarios finales de tus apps web y móviles, incluso con Google.' },
    { name: 'AWS Organizations', summary: 'Agrupa cuentas, aplica SCP a toda la empresa y entrega una sola factura consolidada.' },
    { name: 'AWS KMS', summary: 'Crea y controla las claves de cifrado que usan tus datos y los servicios de AWS.' },
    { name: 'AWS Secrets Manager', summary: 'Guarda contraseñas, tokens y claves de API, y las rota automáticamente.' },
    { name: 'AWS Certificate Manager', summary: 'Emite, guarda y renueva certificados SSL/TLS para HTTPS en servicios integrados.' },
    { name: 'AWS Artifact', summary: 'Descarga gratuita de informes de cumplimiento de AWS (SOC, ISO, PCI) y gestión de acuerdos.' },
  ],
  cards: [
    {
      id: 'identity-1',
      prompt:
        'Una clínica de Medellín lanza una app móvil para que sus pacientes se registren, inicien sesión con su cuenta de Google y vean sus citas. ¿Qué servicio gestiona a esos usuarios?',
      options: [
        {
          service: 'Amazon Cognito',
          why: 'Cognito es la plataforma de identidad para usuarios de apps web y móviles: registro, inicio de sesión y federación con Google o Facebook.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center da acceso al personal de la empresa a cuentas de AWS y aplicaciones; no está pensado para pacientes que usan una app.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM controla quién administra recursos dentro de la cuenta de AWS; no es un directorio de miles de clientes que se registran solos.',
        },
      ],
      answer: 'Amazon Cognito',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-2',
      prompt:
        'Un banco de La Paz tiene 40 empleados que trabajan en seis cuentas de AWS. Quiere que entren una sola vez con su usuario del directorio corporativo y elijan la cuenta desde un portal. ¿Qué servicio usas?',
      options: [
        {
          service: 'AWS Organizations',
          why: 'Organizations agrupa las cuentas y aplica políticas, pero no ofrece el portal de inicio de sesión único para el personal.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center conecta tu directorio y da al personal un portal de acceso con inicio de sesión único a varias cuentas de AWS.',
        },
        {
          service: 'Amazon Cognito',
          why: 'Cognito autentica a los usuarios de tus propias apps; no reparte acceso del personal a las cuentas de AWS de la empresa.',
        },
        {
          service: 'AWS IAM',
          why: 'Con IAM tendrías que crear usuarios o roles en cada una de las seis cuentas; no da un portal central de acceso único.',
        },
      ],
      answer: 'AWS IAM Identity Center',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-3',
      prompt:
        'Un colegio de Quito tiene una app en una instancia EC2 que debe leer archivos de un bucket. No quiere guardar claves de acceso en el código ni en el servidor. ¿Qué servicio resuelve el permiso?',
      options: [
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager guarda secretos, pero AWS recomienda no guardar credenciales de AWS ahí: para eso existen los roles de IAM.',
        },
        {
          service: 'AWS KMS',
          why: 'KMS gestiona claves de cifrado; no da a la instancia permiso para leer el bucket.',
        },
        {
          service: 'AWS IAM',
          why: 'Un rol de IAM asociado a la instancia le entrega credenciales temporales con permiso de lectura, sin claves guardadas.',
        },
      ],
      answer: 'AWS IAM',
      topicSlug: 'iam-fundamentals',
    },
    {
      id: 'identity-4',
      prompt:
        'Una fintech de Santiago tiene doce cuentas y quiere impedir que sus cuentas de trabajo, incluso sus administradores, creen recursos fuera de las regiones aprobadas. ¿Qué servicio aplica ese límite a todas?',
      options: [
        {
          service: 'AWS IAM',
          why: 'Una política de IAM vale dentro de una cuenta y un administrador de esa cuenta podría cambiarla; no limita a todas a la vez.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center asigna acceso del personal a las cuentas; no pone un techo de permisos a la cuenta completa.',
        },
        {
          service: 'AWS Organizations',
          why: 'Las SCP de Organizations fijan el máximo de permisos de cuentas y OU completas, por ejemplo qué regiones se pueden usar.',
        },
      ],
      answer: 'AWS Organizations',
      topicSlug: 'multi-account-governance',
    },
    {
      id: 'identity-5',
      prompt:
        'Una cadena de farmacias de Lima debe cifrar sus volúmenes y buckets con claves que ella controla: decidir quién puede usarlas y ver cada uso en la auditoría. ¿Qué servicio usas?',
      options: [
        {
          service: 'AWS KMS',
          why: 'KMS crea y controla claves de cifrado integradas con los servicios; las políticas de clave definen quién las usa y CloudTrail registra cada uso.',
        },
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager guarda contraseñas y tokens; para claves de cifrado AWS recomienda KMS.',
        },
        {
          service: 'AWS Certificate Manager',
          why: 'Certificate Manager maneja certificados SSL/TLS para tráfico HTTPS; no cifra volúmenes ni buckets en reposo.',
        },
      ],
      answer: 'AWS KMS',
      topicSlug: 'encryption-and-data-protection',
    },
    {
      id: 'identity-6',
      prompt:
        'Una app de delivery de Guadalajara tiene la contraseña de su base de datos escrita en el código. Quieres sacarla de ahí, pedirla en tiempo de ejecución y cambiarla automáticamente cada 30 días. ¿Qué servicio eliges?',
      options: [
        {
          service: 'AWS KMS',
          why: 'KMS cifra datos y protege claves, pero no guarda la contraseña de la base de datos ni la rota por ti.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM gestiona identidades y permisos de AWS; no almacena la contraseña del motor de base de datos.',
        },
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager guarda credenciales, la app las pide con una llamada en vez de tenerlas en el código, y las rota con un calendario.',
        },
      ],
      answer: 'AWS Secrets Manager',
      topicSlug: 'encryption-and-data-protection',
    },
    {
      id: 'identity-7',
      prompt:
        'Una tienda online de Bogotá necesita HTTPS para su dominio detrás de un Application Load Balancer y no quiere acordarse de renovar el certificado cada año. ¿Qué servicio usas?',
      options: [
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager rota contraseñas y tokens; para certificados y sus claves privadas AWS recomienda Certificate Manager.',
        },
        {
          service: 'AWS Certificate Manager',
          why: 'Certificate Manager emite certificados SSL/TLS para servicios integrados como el balanceador y los renueva sin costo adicional.',
        },
        {
          service: 'AWS KMS',
          why: 'KMS gestiona claves de cifrado de datos; no emite ni renueva certificados para un dominio web.',
        },
      ],
      answer: 'AWS Certificate Manager',
      topicSlug: 'encryption-and-data-protection',
    },
    {
      id: 'identity-8',
      prompt:
        'El auditor de una aseguradora de Montevideo pide el informe SOC 2 y la certificación ISO 27001 de la infraestructura de AWS que usa la empresa. ¿Dónde los descargas?',
      options: [
        {
          service: 'AWS KMS',
          why: 'KMS gestiona claves de cifrado; no publica documentos de cumplimiento de AWS.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM controla permisos dentro de la cuenta; no entrega informes de auditoría de AWS.',
        },
        {
          service: 'AWS Artifact',
          why: 'Artifact ofrece descargas a demanda y gratuitas de los informes SOC, ISO y PCI de AWS para entregar a auditores.',
        },
      ],
      answer: 'AWS Artifact',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'identity-9',
      prompt:
        'Una cooperativa de Cochabamba quiere crear una cuenta de AWS por cada sucursal y pagar todo con una sola factura que sume el uso para los descuentos por volumen. ¿Qué servicio usa?',
      options: [
        {
          service: 'AWS Organizations',
          why: 'Organizations crea cuentas, las agrupa y da facturación consolidada con un solo método de pago para todas.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center da inicio de sesión único al personal; no crea cuentas ni consolida la factura.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM trabaja dentro de una cuenta; no crea cuentas nuevas ni junta la facturación de varias.',
        },
      ],
      answer: 'AWS Organizations',
      topicSlug: 'consolidated-billing-and-tags',
    },
    {
      id: 'identity-10',
      prompt:
        'Una universidad de Arequipa construyó su propio portal web de notas. Sus 8000 estudiantes deben crear su cuenta, iniciar sesión con MFA y recuperar su contraseña solos. ¿Qué servicio gestiona esas cuentas?',
      options: [
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center es para el personal que entra a cuentas de AWS y apps administradas; no para el registro de usuarios de tu portal.',
        },
        {
          service: 'Amazon Cognito',
          why: 'Cognito es un directorio de usuarios para tus apps, con registro, inicio de sesión, MFA y recuperación de contraseña.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM no sirve para miles de usuarios finales de una app: es para identidades que administran recursos de AWS.',
        },
      ],
      answer: 'Amazon Cognito',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-11',
      prompt:
        'Una consultora de Asunción quiere definir una vez un conjunto de permisos de "solo lectura", asignarlo a sus analistas en tres cuentas y quitar todo el acceso de una persona en un solo lugar cuando se va.',
      options: [
        {
          service: 'Amazon Cognito',
          why: 'Cognito gestiona usuarios de tus apps; no asigna acceso del personal a cuentas de AWS.',
        },
        {
          service: 'AWS Organizations',
          why: 'Organizations pone límites a cuentas completas con SCP, pero no asigna permisos a personas concretas.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Con conjuntos de permisos de Identity Center defines el acceso una vez, lo asignas en varias cuentas y lo revocas desde un solo lugar.',
        },
      ],
      answer: 'AWS IAM Identity Center',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-12',
      prompt:
        'Un hospital de Guayaquil usa una sola cuenta de AWS, sin organización. Cinco analistas deben leer un único bucket con MFA y nada más, siguiendo el menor privilegio. ¿Con qué servicio lo configuras?',
      options: [
        {
          service: 'AWS IAM',
          why: 'Un grupo de IAM con una política que solo permite leer ese bucket, más MFA, aplica el menor privilegio dentro de la cuenta.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'El acceso a cuentas con Identity Center requiere una instancia de organización; con una cuenta suelta y cinco personas, basta IAM.',
        },
        {
          service: 'AWS Organizations',
          why: 'Organizations gobierna varias cuentas; aquí no hay organización y no da permisos a personas.',
        },
        {
          service: 'Amazon Cognito',
          why: 'Cognito es para usuarios de apps web y móviles, no para el personal que entra a la consola de AWS.',
        },
      ],
      answer: 'AWS IAM',
      topicSlug: 'iam-fundamentals',
    },
    {
      id: 'identity-13',
      prompt:
        'Una pasarela de pagos de Ciudad de México exige que sus claves de cifrado vivan en módulos de hardware validados FIPS 140-3 y que su material se renueve automáticamente cada año. ¿Qué servicio cumple?',
      options: [
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager rota contraseñas y tokens; no es el servicio que crea y protege claves de cifrado en HSM.',
        },
        {
          service: 'AWS Certificate Manager',
          why: 'Certificate Manager maneja certificados SSL/TLS; no gestiona claves para cifrar datos.',
        },
        {
          service: 'AWS Artifact',
          why: 'Artifact entrega informes de cumplimiento; no guarda ni rota ninguna clave.',
        },
        {
          service: 'AWS KMS',
          why: 'Las claves de KMS están protegidas por HSM validados FIPS 140-3 y la rotación automática anual se activa con un clic.',
        },
      ],
      answer: 'AWS KMS',
      topicSlug: 'encryption-and-data-protection',
    },
  ],
};
