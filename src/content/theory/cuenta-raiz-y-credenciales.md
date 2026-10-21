---
title: "Cuenta raíz, MFA y gestión de credenciales"
summary: "Protege el usuario raíz, conoce sus tareas exclusivas, los tipos de MFA, las access keys, las políticas de contraseñas y cuándo usar Secrets Manager o Parameter Store."
domain: "security-compliance"
order: 3
examTasks: ["2.3"]
services: ["AWS Secrets Manager", "AWS Systems Manager", "AWS IAM", "AWS KMS"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html"
  - "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
  - "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"
---

## ¿Por qué importa?

Una tienda en línea de Medellín sube por error a un repositorio público un archivo con las **access keys** de su cuenta de AWS y la contraseña de su base de datos. En pocas horas alguien usa esas claves para lanzar servidores ajenos y la factura se dispara. Peor aún: las claves pertenecían al **usuario raíz**, que puede hacer absolutamente todo.

Este tema cubre cómo evitarlo: proteger la identidad más poderosa de la cuenta, exigir un segundo factor de autenticación, manejar bien las claves y guardar los secretos de las aplicaciones en un lugar seguro.

## El usuario raíz: poder total, uso mínimo

El **usuario raíz** (*root user*) es la identidad que se crea al abrir la cuenta, con el correo y la contraseña del registro. Tiene **acceso completo a todos los servicios y recursos, incluida la facturación**. Por eso AWS recomienda usarlo **solo para las tareas que lo exigen** y crear un usuario administrativo (idealmente en AWS IAM Identity Center) para el trabajo diario.

### Tareas que solo puede hacer el usuario raíz

Según la lista oficial de IAM, entre otras:

- Cambiar la configuración de la cuenta: el **correo, la contraseña y las access keys del usuario raíz** (en cuentas independientes que no pertenecen a AWS Organizations).
- **Cerrar la cuenta** (en cuentas independientes) y **reabrirla** durante el periodo posterior al cierre.
- **Restaurar los permisos** del único administrador de IAM si los revocó por error.
- **Activar el acceso de IAM a la consola de Billing and Cost Management** y algunas otras tareas de facturación.
- Registrarse como **vendedor en el Reserved Instance Marketplace** de Amazon EC2.
- Configurar **MFA Delete** en un bucket de Amazon S3.
- Editar o eliminar una **bucket policy de S3** o una política de una cola de **Amazon SQS** que deniega el acceso a todos los principales.
- Registrarse en **AWS GovCloud (US)**.

En organizaciones con AWS Organizations, varias de estas tareas pueden hacerse de forma centralizada desde la cuenta de administración, e incluso se pueden **eliminar las credenciales raíz** de las cuentas miembro.

### Cómo proteger el usuario raíz

- Usa una **contraseña fuerte y única**.
- Activa **MFA** (AWS lo exige para el usuario raíz) y registra más de un dispositivo.
- **No crees access keys para el usuario raíz**; si existen, elimínalas.
- Usa un **correo grupal** de la empresa y protege los mecanismos de recuperación (correo y teléfono).
- **No compartas** sus credenciales y **monitorea** su uso con alertas (por ejemplo, con AWS CloudTrail y Amazon EventBridge).

## MFA: el segundo factor

La **MFA** (*multi-factor authentication*) pide algo que tienes además de algo que sabes (la contraseña). IAM admite estos tipos:

| Tipo | Cómo funciona | Nota |
| --- | --- | --- |
| **Passkeys y llaves de seguridad** (FIDO) | Criptografía de clave pública; llave física (por ejemplo, YubiKey) o passkey sincronizada en un gestor de credenciales | **Resistentes al phishing**; la opción que AWS recomienda |
| **Aplicación autenticadora virtual** | App en el teléfono que genera códigos TOTP (contraseña de un solo uso basada en tiempo) | Buena opción provisional |
| **Token TOTP de hardware** | Dispositivo físico que muestra un código de seis dígitos | Debe comprarse a proveedores compatibles con AWS |

El usuario raíz y cada usuario de IAM pueden registrar **hasta ocho dispositivos MFA**. AWS ya **no permite activar MFA por SMS**.

## Access keys y políticas de contraseñas

Las **access keys** son credenciales de **largo plazo** para acceso programático (AWS CLI, SDK o API). Tienen dos partes: el **access key ID** y la **secret access key**. La clave secreta solo se puede ver **al crearla**; si se pierde, hay que crear otra. Cada usuario puede tener **como máximo dos**, lo que facilita rotarlas. Buenas prácticas: preferir **credenciales temporales** (roles), nunca ponerlas en el código ni en repositorios, rotarlas y eliminar las que no se usan.

La **política de contraseñas** de la cuenta define reglas para las contraseñas de los **usuarios de IAM**: longitud mínima, tipos de caracteres obligatorios, **expiración** y **prevención de reutilización**. No se aplica al usuario raíz ni a las access keys, y no permite crear bloqueos por intentos fallidos; por eso AWS recomienda combinarla con MFA.

## Dónde guardar secretos: Secrets Manager vs. Parameter Store

Un **secreto** es cualquier dato sensible que una aplicación necesita, como la contraseña de una base de datos o una API key. Nunca debe quedar "quemado" (*hardcoded*) en el código.

| | **AWS Secrets Manager** | **Parameter Store** (de AWS Systems Manager) |
| --- | --- | --- |
| Propósito | Secretos: credenciales de bases de datos, API keys, tokens OAuth | Configuración: URLs, IDs de AMI, variables de entorno |
| Cifrado | Siempre, con AWS KMS | Opcional, con parámetros `SecureString` y AWS KMS |
| Rotación automática | **Sí**, con integraciones nativas para bases de datos | No |
| Costo | Se paga por secreto al mes y por llamadas a la API | Nivel estándar sin costo adicional; el avanzado tiene cargo |

Regla práctica: **credenciales que deben rotar → Secrets Manager**; **configuración y valores simples (aunque estén cifrados) → Parameter Store**. AWS recomienda Secrets Manager para credenciales y otros secretos.

## Trampas típicas del examen

- **Usar el usuario raíz para el trabajo diario.** Solo para tareas exclusivas; lo diario se hace con identidades de menor privilegio.
- **Crear access keys para el usuario raíz.** AWS lo desaconseja de forma explícita.
- **Pensar que la política de contraseñas protege al usuario raíz.** Solo aplica a usuarios de IAM.
- **Elegir Parameter Store cuando la pregunta pide "rotación automática" de credenciales.** La respuesta es **Secrets Manager**.
- **Creer que SMS es un tipo de MFA vigente en IAM.** Ya no se puede activar.

## Resumen para el examen

- Usuario raíz: acceso total; protégelo con contraseña fuerte, MFA y sin access keys.
- Solo el raíz: cambiar correo/contraseña raíz, cerrar la cuenta, restaurar permisos del único admin, vendedor en RI Marketplace, MFA Delete en S3, entre otras.
- MFA: passkeys/llaves de seguridad (recomendadas), app virtual y token TOTP de hardware; hasta ocho por identidad.
- Access keys: ID + secreta; máximo dos por usuario; preferir credenciales temporales.
- Política de contraseñas: solo usuarios de IAM.
- Secrets Manager = secretos con rotación automática; Parameter Store = configuración, `SecureString` opcional.
