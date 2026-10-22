import type { Mission } from '../../../domain/Mission';

/**
 * Imprenta Rápida: a print shop in San José, Costa Rica, whose online order system leaks credentials.
 * Practices AWS Secrets Manager vs. Parameter Store, the IAM password policy and responding to leaked access keys.
 */
export const rootUserAndCredentials2: Mission = {
  id: 'root-user-and-credentials-2',
  track: 'financial',
  topicSlug: 'root-user-and-credentials',
  buildingId: 'print-shop',
  title: 'Secretos de imprenta',
  client: { name: 'Andrés Brenes', role: 'Dueño de Imprenta Rápida' },
  intro: [
    'Pura vida, qué bueno que viniste. Soy Andrés Brenes, dueño de Imprenta Rápida, en San José. Imprimimos tarjetas, volantes y menús para medio país.',
    'Los clientes suben sus diseños a nuestra web, que corre en AWS. Mi sobrino la programó con mucho entusiasmo... y con la contraseña de la base de datos escrita directamente en el código.',
    'Ayer un amigo me avisó que una access key nuestra apareció en un repositorio público. Y los cinco diseñadores siguen con la misma contraseña desde hace tres años.',
    'Si alguien usa esas claves, la factura de AWS podría ser más grande que todo lo que facturamos en el año. ¿Me ayudas a guardar bien estos secretos?',
  ],
  outro: {
    passed: [
      'Ahora la contraseña de la base de datos rota sola, la configuración está en su lugar y la clave filtrada ya no sirve para nada.',
      'Mis diseñadores hasta se quejaron de la nueva política de contraseñas, buena señal. Cuando necesites tarjetas de presentación, las primeras mil van por la casa.',
    ],
    failed: [
      'Mmm... con estas respuestas los secretos de la imprenta siguen a la vista de cualquiera.',
      'Repasa la teoría sobre credenciales y secretos, y vuelve. La prensa no se detiene, pero te espero.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'leaked-key',
      prompt:
        'Lo urgente primero: la access key que apareció en el repositorio público es de un usuario de IAM que usa el script de la cola de impresión. ¿Qué hacemos ya?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'change-console-password',
          label: 'Cambiar la contraseña de consola de ese usuario',
          definition:
            'Reemplazar la contraseña con la que un usuario de IAM inicia sesión en la consola de AWS.',
          explanation:
            'La contraseña de consola y las access keys son credenciales distintas. La clave filtrada seguiría funcionando.',
          correct: false,
        },
        {
          id: 'private-repo',
          label: 'Hacer privado el repositorio y dejar la clave como está',
          definition:
            'Restringir quién puede ver el contenido de un repositorio de código que antes era público.',
          explanation:
            'La clave ya estuvo expuesta y alguien pudo copiarla. Ocultar el repositorio no la invalida.',
          correct: false,
        },
        {
          id: 'remove-key-use-role',
          label: 'Desactivar y eliminar esa access key, y pasar el script a credenciales temporales con un rol',
          definition:
            'Invalidar una credencial de largo plazo expuesta y reemplazarla por un mecanismo que entrega credenciales temporales.',
          explanation:
            'Una clave filtrada debe dejar de funcionar cuanto antes. La buena práctica es preferir credenciales temporales con roles y no guardar claves en el código.',
          correct: true,
        },
        {
          id: 'third-key',
          label: 'Crear una tercera access key para el usuario y seguir usando las otras dos',
          definition:
            'Agregar más pares de access key ID y secret access key a un mismo usuario de IAM.',
          explanation:
            'Cada usuario puede tener como máximo dos access keys. Y mientras la filtrada siga activa, el riesgo no desaparece.',
          correct: false,
        },
      ],
    },
    {
      id: 'db-password',
      prompt:
        'Ahora, la contraseña de la base de datos que está escrita en el código. Quiero sacarla de ahí, que esté cifrada y que cambie automáticamente cada cierto tiempo. ¿Dónde la guardo?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'env-in-code',
          label: 'En una constante dentro de un archivo de configuración del código',
          definition:
            'Dejar un valor sensible escrito directamente en el código o en archivos que viajan con él, también llamado hardcoded.',
          explanation:
            'Es lo mismo que hoy, con otro nombre. Los secretos no deben quedar quemados en el código ni en los repositorios.',
          correct: false,
        },
        {
          id: 'parameter-store-db',
          label: 'En Parameter Store, como parámetro SecureString',
          definition:
            'Capacidad de AWS Systems Manager para guardar configuración, con cifrado opcional mediante parámetros SecureString y AWS KMS.',
          explanation:
            'Parameter Store puede cifrar el valor, pero no ofrece rotación automática. Cuando la pregunta pide rotar credenciales, la respuesta es otra.',
          correct: false,
        },
        {
          id: 'kms-store',
          label: 'En AWS KMS, como si fuera una clave de cifrado',
          definition:
            'Servicio administrado para crear y controlar las claves con las que se cifran y firman datos.',
          explanation:
            'KMS administra claves de cifrado; no está pensado para guardar ni rotar la contraseña de una base de datos.',
          correct: false,
        },
        {
          id: 'secrets-manager',
          label: 'En AWS Secrets Manager',
          definition:
            'Servicio para guardar secretos como credenciales de bases de datos, API keys y tokens, siempre cifrados con AWS KMS.',
          explanation:
            'Secrets Manager cifra los secretos y ofrece rotación automática, con integraciones nativas para bases de datos. Es lo que AWS recomienda para credenciales.',
          correct: true,
        },
      ],
    },
    {
      id: 'app-config',
      prompt:
        'También tenemos valores de configuración que no son secretos: la URL del servicio de envíos y el ID de la AMI de los servidores. No necesitan rotar y quiero evitar costos extra. ¿Dónde los guardo?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'parameter-store-config',
          label: 'En Parameter Store, de AWS Systems Manager',
          definition:
            'Almacén de configuración de AWS Systems Manager para valores como URLs, IDs de AMI y variables de entorno.',
          explanation:
            'Parameter Store está pensado para configuración, y su nivel estándar no tiene costo adicional. Si algún valor fuera sensible, podría guardarse como SecureString.',
          correct: true,
        },
        {
          id: 'hardcode-config',
          label: 'Escritos directamente en el código de la web',
          definition:
            'Dejar valores de configuración fijos dentro del código fuente de la aplicación.',
          explanation:
            'Cada cambio de URL o de AMI obligaría a modificar y desplegar el código. Un almacén de configuración separa esos valores del código.',
          correct: false,
        },
        {
          id: 'cloudtrail-config',
          label: 'En AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas en la cuenta.',
          explanation:
            'CloudTrail registra quién hizo qué y cuándo. No es un lugar para guardar valores de configuración.',
          correct: false,
        },
        {
          id: 'kms-config',
          label: 'En AWS KMS',
          definition:
            'Servicio administrado para crear y controlar claves de cifrado, protegidas por módulos de seguridad de hardware.',
          explanation:
            'KMS administra claves para cifrar datos, no guarda valores de configuración como URLs o IDs de AMI.',
          correct: false,
        },
      ],
    },
    {
      id: 'designers-passwords',
      prompt:
        'Último tema: los cinco diseñadores entran a la consola como usuarios de IAM, con contraseñas de hace tres años. Quiero exigir contraseñas largas, que expiren y que no se reutilicen. ¿Qué configuro?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'secrets-rotation-people',
          label: 'Rotación automática de sus contraseñas con AWS Secrets Manager',
          definition:
            'Función de Secrets Manager que cambia periódicamente secretos de aplicaciones, como credenciales de bases de datos.',
          explanation:
            'Secrets Manager gestiona secretos de aplicaciones. Las reglas para las contraseñas de consola de los usuarios de IAM se definen en otro lugar.',
          correct: false,
        },
        {
          id: 'iam-password-policy',
          label: 'La política de contraseñas de la cuenta',
          definition:
            'Reglas para las contraseñas de los usuarios de IAM: longitud mínima, tipos de caracteres, expiración y prevención de reutilización.',
          explanation:
            'La política de contraseñas cubre justo lo que Andrés pide para sus usuarios de IAM. AWS recomienda combinarla con MFA.',
          correct: true,
        },
        {
          id: 'cognito-pool',
          label: 'Un user pool de Amazon Cognito para los diseñadores',
          definition:
            'Directorio de usuarios para el registro e inicio de sesión en aplicaciones web y móviles.',
          explanation:
            'Cognito sirve para los usuarios de una aplicación, no para las contraseñas de consola de los usuarios de IAM.',
          correct: false,
        },
        {
          id: 'rotate-access-keys',
          label: 'Rotar las access keys de cada diseñador',
          definition:
            'Reemplazar periódicamente las credenciales de largo plazo para acceso programático de un usuario.',
          explanation:
            'Las access keys son para la CLI, el SDK o la API. Rotarlas no cambia las reglas de las contraseñas de consola.',
          correct: false,
        },
      ],
    },
  ],
};
