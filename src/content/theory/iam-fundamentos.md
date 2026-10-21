---
title: "IAM: usuarios, grupos, roles y políticas"
summary: "Comprende cómo AWS IAM controla quién puede hacer qué: usuarios, grupos, roles, políticas administradas, en línea y personalizadas, y el mínimo privilegio."
domain: "security-compliance"
order: 2
examTasks: ["2.3"]
services: ["AWS IAM", "AWS IAM Identity Center", "Amazon EC2", "Amazon S3"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_last-accessed.html"
---

## ¿Por qué importa?

Una agencia de viajes en Ciudad de Panamá abre su cuenta de AWS y, para ir rápido, comparte con todo el equipo el correo y la contraseña con los que creó la cuenta. Un practicante borra por error la base de datos de reservas, y nadie puede saber quién fue. El problema no es AWS: es que **todos usaban la identidad con acceso total y nadie tenía permisos a su medida**.

**AWS Identity and Access Management (IAM)** es el servicio que resuelve esto. Permite controlar de forma segura **quién se autentica** (inicia sesión) y **qué está autorizado** a hacer con cada recurso. La **autenticación** responde "¿quién eres?"; la **autorización**, "¿qué puedes hacer?".

## Punto de partida: el usuario raíz

Al crear una cuenta de AWS se crea una identidad con acceso completo a todo: el **usuario raíz** (*root user*). AWS recomienda no usarlo en el día a día, protegerlo con **MFA** (autenticación multifactor) y crear identidades con permisos limitados para el trabajo diario. Los detalles de cómo protegerlo se ven en el tema "Cuenta raíz, MFA y gestión de credenciales".

## Identidades: usuarios, grupos y roles

| Identidad | Qué es | Credenciales | Uso típico |
| --- | --- | --- | --- |
| **Usuario de IAM** | Identidad asociada a una persona o aplicación | De largo plazo (contraseña y/o access keys) | Casos que no admiten federación ni roles |
| **Grupo de usuarios** | Colección de usuarios de IAM | No tiene credenciales propias | Asignar permisos a varios usuarios a la vez |
| **Rol de IAM** | Identidad con permisos que **asume** quien la necesite | **Temporales**, por sesión | Servicios como EC2, acceso entre cuentas, federación |

Detalles que el examen aprovecha:

- **Grupos:** un usuario puede pertenecer a varios grupos, pero los grupos **no se pueden anidar** (solo contienen usuarios). No existe un grupo predeterminado con todos los usuarios. Un grupo **no puede ser un `Principal`** en una política, porque los grupos sirven para asignar permisos, no para autenticarse.
- **Roles:** un rol **no tiene credenciales de largo plazo**. Al asumirlo se obtienen credenciales temporales. Por ejemplo, una aplicación en una instancia de **Amazon EC2** usa un rol para leer de **Amazon S3** sin guardar claves en el código.
- **Personas:** AWS recomienda que las personas accedan mediante **federación** con credenciales temporales, idealmente a través de **AWS IAM Identity Center**, en lugar de crear muchos usuarios de IAM.

## Políticas: el lenguaje de los permisos

Una **política** es un objeto que, asociado a una identidad o a un recurso, define permisos. La mayoría son **documentos JSON** con elementos como `Effect` (`Allow` o `Deny`), `Action` (qué acciones), `Resource` (sobre qué recursos) y, opcionalmente, `Condition` (bajo qué condiciones).

- **Políticas basadas en identidad:** se adjuntan a usuarios, grupos o roles.
- **Políticas basadas en recursos:** se adjuntan a un recurso. El ejemplo más común es la **bucket policy** de Amazon S3.

### Administradas por AWS, administradas por el cliente y en línea

Las políticas basadas en identidad pueden ser de tres tipos:

| Tipo | Quién la crea y mantiene | ¿Puedes editarla? | ¿A cuántas identidades se adjunta? |
| --- | --- | --- | --- |
| **AWS managed** (administrada por AWS) | AWS | No | Muchas |
| **Customer managed** (administrada por el cliente) | Tú | Sí | Muchas |
| **Inline** (en línea) | Tú | Sí | Solo una (relación uno a uno) |

- Las **administradas por AWS** son rápidas de usar y AWS las actualiza, por ejemplo, cuando lanza un servicio nuevo. Un ejemplo es `ReadOnlyAccess` (lectura en todos los servicios). También hay políticas para **funciones laborales** (*job function*), como `AdministratorAccess` (acceso total, solo para administradores) y `PowerUserAccess` (acceso total a los servicios, pero acceso limitado a IAM y a AWS Organizations). Como son genéricas, a menudo dan **más permisos de los necesarios**.
- Las **administradas por el cliente** son **políticas personalizadas** (*custom policies*): las escribes para tu caso exacto y las reutilizas en varias identidades. Una buena práctica es partir de una política de AWS, copiarla y recortarla. Al editarla, el cambio aplica a todas las identidades que la tienen.
- Las **en línea** viven dentro de una sola identidad y se **borran junto con ella**. Úsalas solo cuando quieras una relación estricta uno a uno; si la política podría servir a más de una identidad, conviene una administrada.

### Cómo se evalúan

- Por defecto, **todo está denegado** de forma implícita hasta que una política lo permita.
- Una **denegación explícita** (`Deny`) **siempre gana** sobre cualquier `Allow`.

## Mínimo privilegio y buenas prácticas

El **principio de mínimo privilegio** (*least privilege*) consiste en otorgar **solo los permisos necesarios** para una tarea, y nada más. En la práctica:

- Empieza con políticas administradas por AWS si necesitas avanzar, y reemplázalas por **políticas personalizadas** más acotadas.
- Usa la **información de último acceso** (*last accessed information*) de IAM para ver qué servicios y acciones nunca se usan y quitarlos.
- Las cargas de trabajo usan **roles**; las personas, **federación y credenciales temporales**.
- Exige **MFA** y elimina usuarios, roles, permisos y credenciales que ya no se usan.

## Trampas típicas del examen

- **Poner access keys en una instancia EC2.** La respuesta correcta es asignar un **rol de IAM** a la instancia.
- **Creer que puedes editar una política administrada por AWS.** No se puede: copia su contenido en una política administrada por el cliente.
- **Creer que los grupos se pueden anidar** o que un grupo puede ser `Principal` en una bucket policy. Ninguna de las dos cosas es posible.
- **Pensar que un `Allow` anula un `Deny`.** La denegación explícita siempre prevalece.
- **Asignar `AdministratorAccess` "por si acaso".** Contradice el mínimo privilegio.

## Resumen para el examen

- IAM controla autenticación (quién eres) y autorización (qué puedes hacer).
- Usuarios: credenciales de largo plazo. Roles: credenciales temporales.
- Grupos: agrupan usuarios; no se anidan; no son `Principal`.
- Políticas en JSON; basadas en identidad o en recursos.
- AWS managed (no editable, reutilizable), customer managed (personalizada, reutilizable), inline (una sola identidad).
- Denegación implícita por defecto; el `Deny` explícito siempre gana.
- Mínimo privilegio: solo los permisos necesarios; revisa el último acceso para recortar.
