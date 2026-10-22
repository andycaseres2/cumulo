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
quiz:
  - prompt: "Una tienda en línea de Medellín necesita guardar la contraseña de su base de datos fuera del código y que se rote automáticamente. ¿Qué servicio debe usar?"
    options:
      - label: "Parameter Store con un parámetro SecureString"
        explanation: "Parameter Store puede cifrar valores con SecureString, pero no ofrece rotación automática; está pensado para configuración y valores simples."
      - label: "AWS Secrets Manager"
        explanation: "AWS Secrets Manager guarda secretos siempre cifrados con AWS KMS y ofrece rotación automática con integraciones nativas para bases de datos."
        correct: true
      - label: "La política de contraseñas de IAM"
        explanation: "La política de contraseñas define reglas para las contraseñas de los usuarios de IAM; no guarda ni rota la contraseña de una base de datos."
      - label: "Access keys de un usuario de IAM"
        explanation: "Las access keys son credenciales de largo plazo para acceso programático a AWS; no son un lugar para almacenar la contraseña de la base de datos."
  - prompt: "Tu empresa creó un usuario administrativo para el trabajo diario y solo usa el usuario raíz cuando es obligatorio. ¿Cuál de estas tareas exige iniciar sesión como usuario raíz?"
    options:
      - label: "Crear un nuevo usuario de IAM"
        explanation: "Crear usuarios de IAM no está en la lista de tareas exclusivas del raíz; lo hace una identidad administrativa con los permisos adecuados."
      - label: "Lanzar una instancia de Amazon EC2"
        explanation: "Lanzar instancias es trabajo diario que se hace con identidades de menor privilegio; no es una tarea exclusiva del usuario raíz."
      - label: "Crear un rol de IAM para una aplicación"
        explanation: "Crear roles de IAM no figura entre las tareas que solo puede hacer el usuario raíz; lo hace un administrador de IAM."
      - label: "Configurar MFA Delete en un bucket de Amazon S3"
        explanation: "Configurar MFA Delete en un bucket de S3 está en la lista oficial de tareas que solo puede hacer el usuario raíz."
        correct: true
  - prompt: "El equipo de seguridad de una aseguradora de Panamá quiere activar MFA en sus identidades con la opción resistente al phishing que AWS recomienda. ¿Qué tipo de MFA debe elegir?"
    options:
      - label: "Passkeys y llaves de seguridad FIDO"
        explanation: "Las passkeys y llaves de seguridad FIDO usan criptografía de clave pública, son resistentes al phishing y son la opción que AWS recomienda."
        correct: true
      - label: "Aplicación autenticadora virtual con códigos TOTP"
        explanation: "La aplicación autenticadora virtual es una buena opción provisional, pero no es la opción resistente al phishing que AWS recomienda."
      - label: "Token TOTP de hardware"
        explanation: "El token TOTP de hardware muestra un código de seis dígitos; es un tipo válido, pero no es la opción resistente al phishing recomendada."
      - label: "MFA por mensaje SMS"
        explanation: "AWS ya no permite activar MFA por SMS en IAM, así que no es una opción disponible para estas identidades."
practice:
  - prompt: "Un equipo de desarrollo de Mérida quiere centralizar valores de configuración no sensibles, como URLs de servicios e IDs de AMI, sin costo adicional y sin necesidad de rotación. ¿Dónde conviene guardarlos?"
    options:
      - label: "En la política de contraseñas de IAM"
        explanation: "La política de contraseñas define reglas para las contraseñas de los usuarios de IAM; no almacena valores de configuración."
      - label: "En access keys de un usuario de IAM"
        explanation: "Las access keys son credenciales de largo plazo para acceso programático; no sirven para guardar URLs ni IDs de AMI."
      - label: "En Parameter Store de AWS Systems Manager"
        explanation: "Parameter Store está pensado para configuración como URLs, IDs de AMI y variables de entorno, y su nivel estándar no tiene costo adicional."
        correct: true
      - label: "En el usuario raíz de la cuenta"
        explanation: "El usuario raíz es la identidad con acceso total a la cuenta; no es un almacén de configuración y debe usarse solo para tareas que lo exigen."
  - prompt: "Una empresa de Quito configuró una política de contraseñas en su cuenta de AWS con longitud mínima, expiración y prevención de reutilización. ¿A qué identidades se aplica esta política?"
    options:
      - label: "Solo a los usuarios de IAM"
        explanation: "La política de contraseñas de la cuenta define reglas para las contraseñas de los usuarios de IAM únicamente."
        correct: true
      - label: "Al usuario raíz y a los usuarios de IAM"
        explanation: "La política de contraseñas no se aplica al usuario raíz; pensar que lo protege es una trampa típica del examen."
      - label: "A las access keys de todos los usuarios"
        explanation: "La política de contraseñas no se aplica a las access keys; estas se gestionan con buenas prácticas como rotarlas y eliminar las que no se usan."
      - label: "Solo al usuario raíz"
        explanation: "El usuario raíz queda fuera de la política de contraseñas; para protegerlo se usa una contraseña fuerte y MFA."
  - prompt: "Un desarrollador de Santo Domingo creó access keys para usar la AWS CLI, pero no copió la secret access key y ahora la necesita. ¿Qué debe hacer?"
    options:
      - label: "Consultarla en la consola de IAM, donde siempre está visible"
        explanation: "La secret access key solo se puede ver al momento de crearla; después no vuelve a mostrarse en la consola."
      - label: "Pedirle a AWS Support que se la envíe por correo"
        explanation: "La clave secreta solo se muestra al crearla; si se pierde, la solución es crear una nueva, no recuperarla."
      - label: "Usar solo el access key ID, que basta para autenticarse"
        explanation: "Las access keys tienen dos partes, el access key ID y la secret access key; el ID solo no es suficiente."
      - label: "Crear una nueva access key, porque la secreta solo se ve al crearla"
        explanation: "La secret access key solo se puede ver al crearla; si se pierde, hay que crear otra access key."
        correct: true
  - prompt: "Durante una auditoría en una cooperativa de Cochabamba descubres que el usuario raíz tiene access keys activas que nadie recuerda haber creado. ¿Qué debes hacer según las buenas prácticas de AWS?"
    options:
      - label: "Compartirlas solo con el equipo de TI para que las use en scripts"
        explanation: "Las credenciales del usuario raíz no se comparten, y las access keys nunca deben ponerse en scripts ni en el código."
      - label: "Eliminarlas"
        explanation: "AWS recomienda no crear access keys para el usuario raíz y, si existen, eliminarlas."
        correct: true
      - label: "Guardarlas en Parameter Store como SecureString"
        explanation: "Cifrarlas en Parameter Store no elimina el riesgo; AWS desaconseja de forma explícita tener access keys en el usuario raíz."
      - label: "Usarlas para el trabajo diario en lugar de un usuario administrativo"
        explanation: "El usuario raíz no debe usarse para el trabajo diario; para eso se crea un usuario administrativo con menor privilegio."
  - prompt: "Una agencia de publicidad de Guadalajara tiene una cuenta de AWS independiente, que no pertenece a AWS Organizations, y quiere cerrarla definitivamente. ¿Qué identidad debe realizar esta tarea?"
    options:
      - label: "Un usuario de IAM con la política AdministratorAccess"
        explanation: "Cerrar una cuenta independiente está en la lista de tareas que solo puede hacer el usuario raíz; un usuario de IAM no puede reemplazarlo."
      - label: "Un rol de IAM asumido por el equipo de finanzas"
        explanation: "Los roles de IAM dan credenciales temporales para el trabajo diario; cerrar una cuenta independiente es una tarea exclusiva del raíz."
      - label: "El usuario raíz"
        explanation: "Cerrar una cuenta independiente es una de las tareas que solo puede hacer el usuario raíz, según la lista oficial de IAM."
        correct: true
      - label: "Un usuario administrativo de AWS IAM Identity Center"
        explanation: "El usuario administrativo de IAM Identity Center sirve para el trabajo diario, pero cerrar una cuenta independiente exige el usuario raíz."
  - prompt: "El equipo de seguridad de una minera de Antofagasta quiere monitorear el uso del usuario raíz y recibir alertas cada vez que alguien inicia sesión con él. ¿Qué servicios menciona AWS como ejemplo para lograrlo?"
    options:
      - label: "AWS CloudTrail y Amazon EventBridge"
        explanation: "AWS recomienda monitorear el uso del usuario raíz con alertas, por ejemplo con AWS CloudTrail y Amazon EventBridge."
        correct: true
      - label: "AWS Secrets Manager y AWS KMS"
        explanation: "Secrets Manager guarda secretos cifrados con AWS KMS; no se usa para alertar sobre el uso del usuario raíz."
      - label: "La política de contraseñas de IAM"
        explanation: "La política de contraseñas define reglas para los usuarios de IAM; no monitorea ni alerta sobre el uso del raíz."
      - label: "Parameter Store de AWS Systems Manager"
        explanation: "Parameter Store guarda configuración y valores simples; no genera alertas sobre inicios de sesión."
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
