import type { Mission } from '../../../domain/Mission';

/**
 * Casa de Cambio Inca: the digital channels team in La Paz launches a customer app and connects its Windows cashiers to AWS.
 * Practices Amazon Cognito user pools and identity pools, MFA for customers and AWS Directory Service AD Connector.
 */
export const identidadFederadaYAccesoEntreCuentas2: Mission = {
  id: 'identidad-federada-y-acceso-entre-cuentas-2',
  track: 'financiero',
  topicSlug: 'identidad-federada-y-acceso-entre-cuentas',
  buildingId: 'casa-cambio',
  title: 'Clientes y cajeros con identidad',
  client: { name: 'Javier Quispe', role: 'Jefe de canales digitales de la Casa de Cambio Inca' },
  intro: [
    'Hola, gracias por venir. Soy Javier Quispe, jefe de canales digitales de la Casa de Cambio Inca. Trabajo desde nuestra sucursal de La Paz, en Bolivia.',
    'Vamos a lanzar una app para que los clientes reserven divisas antes de venir a la ventanilla. Tienen que registrarse, iniciar sesión y subir una foto de su documento de identidad.',
    'Además, nuestros cajeros usan computadoras Windows con el Active Directory que tenemos aquí en la oficina, y la nueva herramienta de caja en AWS debe reconocerlos.',
    'Un practicante propuso crear un usuario de IAM para cada cliente de la app. Algo me dice que no es buena idea. ¿Me ayudas a elegir bien?',
  ],
  outro: {
    passed: [
      'Excelente. Los clientes se registran con Cognito, suben su documento con credenciales temporales y los cajeros entran con la cuenta de Windows de siempre.',
      'Y nadie tuvo que crear miles de usuarios de IAM. Cuando vengas a La Paz, te cambio tus dólares al mejor precio de la ciudad.',
    ],
    failed: [
      'Mmm... con estas respuestas la app no estaría lista para el lanzamiento.',
      'Repasa la teoría de identidades y vuelve. La ventanilla sigue abierta para ti.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'customer-signup',
      prompt:
        'Primero, los clientes. Necesitan registrarse e iniciar sesión en la app, y muchos quieren entrar con su cuenta de Google. ¿Qué usamos?',
      topicSlug: 'identidad-federada-y-acceso-entre-cuentas',
      examTasks: ['2.3'],
      options: [
        {
          id: 'user-pool',
          label: 'Un user pool de Amazon Cognito',
          definition:
            'Directorio de usuarios para registro e inicio de sesión en apps web y móviles, que emite tokens y admite proveedores sociales.',
          explanation:
            'Los user pools de Cognito son el directorio para los clientes de una app: permiten registrarse, iniciar sesión y entrar con proveedores sociales como Google.',
          correct: true,
        },
        {
          id: 'iam-user-per-customer',
          label: 'Un usuario de IAM por cada cliente de la app',
          definition:
            'Identidad de IAM con credenciales de largo plazo dentro de la cuenta de AWS de la empresa.',
          explanation:
            'A los clientes de una app no se les crean usuarios de IAM. IAM controla el acceso a la cuenta de AWS, no el inicio de sesión de usuarios finales.',
          correct: false,
        },
        {
          id: 'identity-center-customers',
          label: 'AWS IAM Identity Center',
          definition:
            'Servicio de acceso de la fuerza laboral a varias cuentas de AWS y aplicaciones, con un portal de acceso.',
          explanation:
            'IAM Identity Center es para empleados y contratistas. Para los clientes de una app se usa un directorio de usuarios finales.',
          correct: false,
        },
        {
          id: 'cross-account-customers',
          label: 'Un rol de IAM entre cuentas para cada cliente',
          definition:
            'Rol con una política de confianza que permite que identidades de otra cuenta de AWS lo asuman.',
          explanation:
            'Los roles entre cuentas conectan cuentas de AWS entre sí. Los clientes de la app no tienen cuentas de AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'upload-document',
      prompt:
        'Al reservar, el cliente sube la foto de su documento a Amazon S3 desde la app. La app necesita credenciales de AWS en nombre de ese cliente, sin guardar claves en el celular. ¿Qué componente lo resuelve?',
      topicSlug: 'identidad-federada-y-acceso-entre-cuentas',
      examTasks: ['2.3'],
      options: [
        {
          id: 'keys-in-app',
          label: 'Access keys de un usuario de IAM incluidas dentro de la app',
          definition:
            'Credenciales de largo plazo para acceso programático, formadas por un access key ID y una secret access key.',
          explanation:
            'Cualquiera que descargue la app podría extraer esas claves. Las credenciales no deben quedar guardadas en el código.',
          correct: false,
        },
        {
          id: 'directory-upload',
          label: 'AWS Managed Microsoft AD',
          definition:
            'Active Directory real administrado por AWS, que puede tener una relación de confianza con un AD local.',
          explanation:
            'Managed Microsoft AD sirve para usuarios y equipos Windows, no para dar credenciales de AWS a los clientes de una app móvil.',
          correct: false,
        },
        {
          id: 'identity-pool',
          label: 'Un identity pool de Amazon Cognito',
          definition:
            'Componente de Cognito que intercambia un token de confianza por credenciales temporales de AWS para acceder a servicios en nombre del usuario.',
          explanation:
            'Los identity pools entregan credenciales temporales de AWS para que la app acceda, por ejemplo, a S3 en nombre del cliente que inició sesión.',
          correct: true,
        },
        {
          id: 'permission-set-customer',
          label: 'Un permission set de IAM Identity Center',
          definition:
            'Plantilla de permisos que se aprovisiona en varias cuentas de AWS y se asigna a usuarios o grupos de la fuerza laboral.',
          explanation:
            'Los permission sets son para empleados en varias cuentas, no para los clientes de una app móvil.',
          correct: false,
        },
      ],
    },
    {
      id: 'cashiers-ad',
      prompt:
        'Ahora los cajeros. La herramienta de caja en AWS debe validar sus usuarios contra el Active Directory que ya tenemos en la oficina, sin sincronizar directorios ni crear uno nuevo. ¿Qué opción de AWS Directory Service elegimos?',
      topicSlug: 'identidad-federada-y-acceso-entre-cuentas',
      examTasks: ['2.3'],
      options: [
        {
          id: 'managed-ad',
          label: 'AWS Managed Microsoft AD',
          definition:
            'Active Directory real administrado por AWS, que puede tener una relación de confianza con un AD local.',
          explanation:
            'Managed Microsoft AD crea un directorio nuevo en AWS. Javier no quiere otro directorio, solo usar el que ya tiene.',
          correct: false,
        },
        {
          id: 'simple-ad-cashiers',
          label: 'Simple AD',
          definition:
            'Directorio compatible con funciones básicas de Active Directory, para casos pequeños y de bajo costo.',
          explanation:
            'Simple AD también es un directorio nuevo, independiente del AD de la oficina. Los cajeros tendrían que tener otras cuentas.',
          correct: false,
        },
        {
          id: 'cognito-cashiers',
          label: 'Un user pool de Amazon Cognito para los cajeros',
          definition:
            'Directorio de usuarios para registro e inicio de sesión en aplicaciones web y móviles.',
          explanation:
            'Un user pool es otro directorio de usuarios, y está pensado para los clientes de una app. No usa el Active Directory existente.',
          correct: false,
        },
        {
          id: 'ad-connector',
          label: 'AD Connector',
          definition:
            'Proxy que redirige las solicitudes de inicio de sesión a un Active Directory local existente, sin sincronizar directorios.',
          explanation:
            'AD Connector redirige los inicios de sesión al AD de la oficina, así que los cajeros usan sus cuentas de Windows de siempre sin un directorio nuevo.',
          correct: true,
        },
      ],
    },
    {
      id: 'customer-mfa',
      prompt:
        'Por último, por seguridad quiero pedir un segundo factor a los clientes de la app al iniciar sesión. ¿Dónde lo exigimos?',
      topicSlug: 'identidad-federada-y-acceso-entre-cuentas',
      examTasks: ['2.3'],
      options: [
        {
          id: 'iam-password-policy-customers',
          label: 'En la política de contraseñas de IAM',
          definition:
            'Reglas de la cuenta para las contraseñas de los usuarios de IAM, como longitud mínima, expiración y reutilización.',
          explanation:
            'La política de contraseñas aplica a los usuarios de IAM, y los clientes de la app no lo son. Además, no agrega un segundo factor.',
          correct: false,
        },
        {
          id: 'cognito-mfa',
          label: 'En el user pool de Amazon Cognito de la app',
          definition:
            'Configuración de autenticación multifactor dentro del directorio de usuarios de una aplicación web o móvil.',
          explanation:
            'Los user pools de Cognito soportan MFA, así que el segundo factor se exige justo donde los clientes inician sesión.',
          correct: true,
        },
        {
          id: 'root-mfa-customers',
          label: 'Activando MFA en el usuario raíz de la cuenta',
          definition:
            'Proteger con un segundo factor la identidad creada al abrir la cuenta de AWS, que tiene acceso total.',
          explanation:
            'Proteger el usuario raíz es importante, pero no afecta cómo inician sesión los clientes de la app.',
          correct: false,
        },
        {
          id: 'identity-center-mfa',
          label: 'En AWS IAM Identity Center',
          definition:
            'Servicio de acceso de la fuerza laboral a varias cuentas de AWS, que también permite exigir MFA a sus usuarios.',
          explanation:
            'Identity Center exige MFA a los empleados que usan su portal de acceso, no a los clientes que entran a la app.',
          correct: false,
        },
      ],
    },
  ],
};
