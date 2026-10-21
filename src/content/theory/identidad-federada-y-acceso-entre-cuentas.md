---
title: "IAM Identity Center, federación y acceso entre cuentas"
summary: "Distingue los métodos de autenticación y de gestión de identidades: IAM Identity Center, federación SAML/OIDC, roles entre cuentas, Amazon Cognito y AWS Directory Service."
domain: "security-compliance"
order: 4
examTasks: ["2.3"]
services: ["AWS IAM Identity Center", "Amazon Cognito", "AWS Directory Service", "AWS IAM", "AWS Organizations"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html"
  - "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html"
  - "https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html"
---

## ¿Por qué importa?

Una aseguradora en Lima tiene 300 empleados que ya inician sesión cada mañana con su cuenta corporativa de Microsoft Active Directory. Ahora usa seis cuentas de AWS (desarrollo, pruebas, producción…) y además lanza una app móvil para miles de asegurados. Crear un usuario de IAM por empleado y por cuenta sería inmanejable, y a los clientes de la app nunca se les debería crear un usuario de IAM.

La solución es **separar identidades**: los empleados entran con su identidad corporativa a todas las cuentas desde un solo lugar, y los clientes de la app se registran en un directorio pensado para usuarios finales.

## Conceptos base

- **Proveedor de identidad** (*IdP, identity provider*): sistema que guarda las identidades y verifica quién es cada persona; por ejemplo, Active Directory, Okta o Google.
- **Federación de identidades**: AWS **confía** en un IdP externo. La persona se autentica allí y recibe **credenciales temporales** en AWS, sin crear un usuario de IAM ni repartir claves de largo plazo.
- **SAML 2.0** y **OIDC** (*OpenID Connect*): estándares abiertos que usan los IdP para comunicar a AWS quién es el usuario. SAML es típico de directorios corporativos; OIDC conecta, por ejemplo, aplicaciones que no corren en AWS.
- **Inicio de sesión único** (*SSO, single sign-on*): iniciar sesión una vez y acceder a varias cuentas o aplicaciones.

## Métodos de autenticación que pide el examen

### MFA

La **autenticación multifactor** añade un segundo factor (llave de seguridad, passkey o código de una app) a la contraseña. Se puede exigir en IAM, en IAM Identity Center y en Amazon Cognito.

### AWS IAM Identity Center

**AWS IAM Identity Center** (antes llamado AWS Single Sign-On) es la solución recomendada por AWS para el **acceso de la fuerza laboral** (*workforce*: empleados y contratistas) a **varias cuentas de AWS** y a aplicaciones.

- **Fuente de identidad**: puedes crear usuarios en el propio directorio de Identity Center, conectar Active Directory o conectar un IdP externo compatible con **SAML 2.0**.
- **Portal de acceso de AWS** (*AWS access portal*): una página web donde cada persona ve las cuentas y aplicaciones que tiene asignadas.
- **Conjuntos de permisos** (*permission sets*): plantillas de permisos (por ejemplo, "administrador" o "solo lectura") que se aprovisionan en varias cuentas y se asignan a usuarios o grupos. Esta función requiere una **instancia de organización**, desplegada desde la cuenta de administración de AWS Organizations.
- Los usuarios reciben **credenciales de corto plazo**.

### Roles de IAM entre cuentas

Un **rol entre cuentas** (*cross-account role*) permite que identidades de una cuenta trabajen en otra **sin crear usuarios duplicados**:

1. En la **cuenta destino** se crea un rol cuya **política de confianza** (*trust policy*) nombra a la cuenta de origen como entidad de confianza, y una política de permisos con lo que el rol puede hacer.
2. En la **cuenta origen** se da permiso a ciertas identidades para ejecutar `sts:AssumeRole` sobre ese rol.
3. El usuario **cambia de rol** (*switch role*) en la consola o llama a AWS STS desde la CLI o el SDK, y recibe **credenciales temporales**. Mientras usa el rol, solo tiene los permisos del rol.

## Tipos de gestión de identidades

| Necesidad | Servicio | Quiénes son los usuarios |
| --- | --- | --- |
| Empleados que acceden a muchas cuentas de AWS | **AWS IAM Identity Center** | Fuerza laboral |
| Una sola cuenta, despliegues pequeños o máquinas | **Federación directa con IAM** (SAML 2.0 u OIDC) y roles | Personas a corto plazo, cargas de trabajo |
| Registro e inicio de sesión en una app web o móvil | **Amazon Cognito** | Clientes (usuarios finales) |
| Active Directory de Microsoft en la nube | **AWS Directory Service** | Usuarios y equipos Windows |

### Amazon Cognito: identidades de clientes

**Amazon Cognito** es una plataforma de identidad para **aplicaciones web y móviles**. Tiene dos componentes que pueden usarse por separado o juntos:

- **User pools** (grupos de usuarios): un **directorio de usuarios** para registro e inicio de sesión. Emite tokens para tu app o API. Admite inicio de sesión con proveedores sociales (Google, Apple, Facebook, Amazon) y con IdP empresariales SAML u OIDC. Soporta MFA.
- **Identity pools** (grupos de identidades): intercambian un token de confianza por **credenciales temporales de AWS** para que la app acceda, por ejemplo, a Amazon S3 o DynamoDB en nombre del usuario. También pueden dar acceso limitado a **invitados** sin iniciar sesión.

### AWS Directory Service: Active Directory administrado

**AWS Directory Service** ofrece varias formas de usar **Microsoft Active Directory (AD)** con AWS:

- **AWS Managed Microsoft AD**: un Active Directory real administrado por AWS; puede tener una relación de confianza con tu AD local.
- **AD Connector**: un proxy que redirige las solicitudes de inicio de sesión a tu **AD local existente**, sin sincronizar directorios.
- **Simple AD**: directorio compatible con funciones básicas de AD, para casos pequeños y de bajo costo.

## Trampas típicas del examen

- **Usar Amazon Cognito para que los empleados entren a varias cuentas de AWS.** Eso es **IAM Identity Center**; Cognito es para usuarios de tus aplicaciones.
- **Crear usuarios de IAM duplicados en cada cuenta.** La respuesta es un **rol entre cuentas** o **IAM Identity Center**.
- **Pensar que la federación entrega access keys permanentes.** Siempre entrega **credenciales temporales**.
- **Confundir Directory Service con IAM.** Directory Service ofrece **Active Directory**; IAM controla permisos en AWS.
- **Olvidar el nombre antiguo.** "AWS Single Sign-On" hoy es **IAM Identity Center**.

## Resumen para el examen

- Federación = confiar en un IdP externo (SAML 2.0 u OIDC) y recibir credenciales temporales.
- IAM Identity Center: acceso centralizado de la fuerza laboral a varias cuentas y aplicaciones, con portal de acceso y permission sets.
- Rol entre cuentas: política de confianza + `sts:AssumeRole` = credenciales temporales en otra cuenta.
- Amazon Cognito: identidades de clientes; user pools (inicio de sesión) e identity pools (credenciales de AWS).
- AWS Directory Service: Managed Microsoft AD, AD Connector y Simple AD.
- MFA se puede exigir en IAM, Identity Center y Cognito.
