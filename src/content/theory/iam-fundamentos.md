---
title: "IAM: usuarios, grupos, roles y políticas"
summary: "Comprende cómo AWS IAM controla quién puede hacer qué: usuario raíz, usuarios, grupos, roles, políticas y el principio de mínimo privilegio."
domain: "security-compliance"
order: 2
services: ["AWS IAM", "AWS IAM Identity Center", "Amazon EC2", "Amazon S3"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
---

## ¿Por qué importa?

Una agencia de viajes en Ciudad de Panamá abre su cuenta de AWS y, para ir rápido, comparte con todo el equipo el correo y la contraseña con los que creó la cuenta. Un practicante borra por error la base de datos de reservas, y nadie puede saber quién fue. El problema no es AWS: es que **todos usaban la identidad con acceso total y nadie tenía permisos a su medida**.

**AWS Identity and Access Management (IAM)** es el servicio que resuelve esto. Permite controlar de forma segura **quién se autentica** (inicia sesión) y **qué está autorizado** a hacer con cada recurso.

## El usuario raíz

Al crear una cuenta de AWS se crea una única identidad con **acceso completo a todos los servicios y recursos**: el **usuario raíz** (*root user*). Sus credenciales son el correo y la contraseña usados al registrarse.

AWS recomienda enfáticamente **no usar el usuario raíz para tareas diarias**, proteger sus credenciales y usarlo solo para las tareas que lo requieren. Algunas de esas tareas son:

- Cambiar la configuración de la cuenta, como el correo o la contraseña del usuario raíz (en cuentas independientes).
- Cerrar la cuenta de AWS.
- Restaurar los permisos del único administrador de IAM si se los quitó por error.
- Registrarse como vendedor en el Reserved Instance Marketplace.

Además, AWS recomienda usar **MFA** (*multi-factor authentication*, autenticación multifactor): un segundo factor, como un dispositivo o una llave de seguridad, que se pide además de la contraseña.

## Identidades: usuarios, grupos y roles

| Identidad | Qué es | Credenciales | Uso típico |
| --- | --- | --- | --- |
| **Usuario de IAM** | Identidad asociada a una persona o aplicación | De largo plazo (contraseña y/o access keys) | Casos que no admiten federación ni roles |
| **Grupo de usuarios** | Colección de usuarios de IAM | No tiene credenciales propias | Asignar permisos a varios usuarios a la vez |
| **Rol de IAM** | Identidad con permisos que **asume** quien la necesite | **Temporales**, por sesión | Servicios como EC2, acceso entre cuentas, federación |

Detalles que el examen aprovecha:

- **Grupos:** un usuario puede pertenecer a varios grupos, pero los grupos **no se pueden anidar** (solo contienen usuarios, no otros grupos). No existe un grupo predeterminado que incluya a todos los usuarios. Un grupo **no puede ser un `Principal`** en una política, porque los grupos tienen que ver con permisos, no con autenticación.
- **Roles:** a diferencia de un usuario, un rol **no tiene credenciales de largo plazo** como contraseña o access keys. Al asumirlo, se obtienen credenciales temporales. Por ejemplo, una aplicación que corre en una instancia de Amazon EC2 usa un rol para leer de Amazon S3 sin guardar claves en el código.
- **Federación:** confiar en un proveedor de identidad externo (como el directorio corporativo) para que las personas accedan a AWS mediante roles. Para gestionar el acceso de personas de forma centralizada, AWS recomienda **AWS IAM Identity Center**.

## Políticas: el lenguaje de los permisos

Una **política** es un objeto que, asociado a una identidad o a un recurso, define permisos. La mayoría se guardan como **documentos JSON** con elementos como `Effect` (`Allow` o `Deny`), `Action` (qué acciones) y `Resource` (sobre qué recursos).

- **Políticas basadas en identidad:** se adjuntan a usuarios, grupos o roles. Pueden ser **administradas por AWS** (*AWS managed*), **administradas por el cliente** (*customer managed*) o **en línea** (*inline*, ligadas a una sola identidad).
- **Políticas basadas en recursos:** se adjuntan a un recurso. El ejemplo más común es la **bucket policy** de Amazon S3.

Reglas de evaluación clave:

- Por defecto, **todo está denegado** de forma implícita hasta que una política lo permita.
- Una **denegación explícita** (`Deny`) **siempre gana** sobre cualquier `Allow`.

## Mínimo privilegio y buenas prácticas

El **principio de mínimo privilegio** (*least privilege*) consiste en otorgar **solo los permisos necesarios** para realizar una tarea. Otras recomendaciones oficiales de AWS:

- Que las personas usen federación y **credenciales temporales**.
- Que las cargas de trabajo usen **roles de IAM**.
- Exigir **MFA**.
- Revisar y eliminar usuarios, roles, permisos y credenciales que ya no se usan.

## Trampas típicas del examen

- **"Uso el usuario raíz para administrar todo el día."** Incorrecto: se reserva para tareas que lo requieren y debe tener MFA.
- **Poner access keys en una instancia EC2.** La respuesta correcta es asignar un **rol de IAM** a la instancia.
- **Creer que los grupos se pueden anidar** o que un grupo puede ser `Principal` en una bucket policy. Ninguna de las dos cosas es posible.
- **Pensar que un `Allow` anula un `Deny`.** La denegación explícita siempre prevalece.
- **Confundir autenticación con autorización.** Autenticación = quién eres; autorización = qué puedes hacer.

## Resumen para el examen

- IAM controla autenticación y autorización en AWS.
- Usuario raíz: acceso total; solo para tareas que lo exigen, protegido con MFA.
- Usuarios: credenciales de largo plazo. Roles: credenciales temporales.
- Grupos: agrupan usuarios; no se anidan; no son `Principal`.
- Políticas en JSON; basadas en identidad o en recursos.
- Denegación implícita por defecto; el `Deny` explícito siempre gana.
- Aplica siempre el mínimo privilegio.
