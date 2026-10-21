---
title: "Gobierno multicuenta: Organizations, Control Tower y RAM"
summary: "Por qué usar varias cuentas de AWS y cómo gobernarlas con AWS Organizations, OUs, SCPs, la landing zone de AWS Control Tower y el uso compartido con AWS RAM."
domain: "security-compliance"
order: 6
examTasks: ["2.2"]
services: ["AWS Organizations", "AWS Control Tower", "AWS RAM", "AWS IAM Identity Center", "Amazon VPC"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html"
  - "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html"
  - "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/benefits-of-using-multiple-aws-accounts.html"
  - "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html"
  - "https://docs.aws.amazon.com/ram/latest/userguide/what-is.html"
---

## ¿Por qué importa?

Una cadena de farmacias en Bogotá empezó con una sola cuenta de AWS. Hoy, en esa cuenta conviven el entorno de pruebas de los desarrolladores, la base de datos de recetas médicas y el sitio web de ventas. Un error de configuración en pruebas casi expone datos de pacientes, y nadie sabe cuánto gasta cada área.

La recomendación de AWS es usar **varias cuentas** y gobernarlas de forma centralizada. Este tema explica cómo.

## ¿Por qué varias cuentas?

Una **cuenta de AWS** es un límite natural de **permisos, seguridad, costos y cargas de trabajo**. Separar en varias cuentas permite, según la guía oficial de AWS:

- **Agrupar cargas de trabajo** por propósito de negocio y por equipo responsable.
- Aplicar **controles de seguridad distintos por entorno** (por ejemplo, producción más estricta que desarrollo).
- **Restringir el acceso a datos sensibles**, aislándolos en cuentas dedicadas.
- **Limitar el impacto** de un incidente o de un error a una sola cuenta.
- Dar libertad para **innovar** en cuentas de sandbox sin riesgo para producción.
- **Gestionar costos** por cuenta y repartir las **cuotas de servicio** (límites) entre cuentas.

## AWS Organizations: la base

**AWS Organizations** permite **administrar y gobernar centralmente** varias cuentas:

- **Organización**: el conjunto de cuentas que administras juntas.
- **Cuenta de administración** (*management account*): la que crea la organización. Las demás son **cuentas miembro**.
- **Raíz** (*root*): el contenedor principal de la jerarquía (no confundir con el usuario raíz de una cuenta).
- **Unidades organizativas** (**OU**, *organizational units*): grupos de cuentas, por ejemplo "Producción", "Desarrollo" o "Seguridad". Pueden anidarse, y las políticas aplicadas a una OU se heredan hacia abajo.

Además de las políticas, Organizations permite crear cuentas de forma programática, delegar la administración de servicios de seguridad, activar un registro de AWS CloudTrail para toda la organización y obtener una **factura consolidada** (ver el tema de facturación).

### Políticas de control de servicios (SCP)

Las **SCP** (*service control policies*) son **barreras de protección** (*guardrails*) que fijan el **máximo de permisos** disponibles para los usuarios y roles de las cuentas miembro.

- Una SCP **no otorga permisos**: solo limita. Los permisos siguen viniendo de las políticas de IAM. El permiso efectivo es la **intersección** de lo que permiten la SCP y la política de IAM.
- Se adjuntan a la **raíz**, a una **OU** o a una **cuenta**, y una cuenta solo tiene lo que permite **cada nivel superior**.
- Afectan a todas las identidades de las cuentas miembro, **incluido su usuario raíz**.
- **No afectan a la cuenta de administración** ni a los roles vinculados a servicios (*service-linked roles*).
- Requieren tener **todas las funciones** (*all features*) de Organizations activadas.

Ejemplo: una SCP en la OU "Producción" que deniegue usar Regiones fuera de las aprobadas. Aunque un administrador tenga `AdministratorAccess`, no podrá lanzar recursos en otra Región.

## AWS Control Tower: la landing zone lista

**AWS Control Tower** es la forma más sencilla de **configurar y gobernar** un entorno multicuenta siguiendo buenas prácticas. **Orquesta** otros servicios, como AWS Organizations, AWS Service Catalog y AWS IAM Identity Center.

- **Landing zone** (zona de aterrizaje): un entorno multicuenta bien diseñado, basado en buenas prácticas de seguridad y cumplimiento, que contiene tus OUs, cuentas y usuarios.
- **Controles** (también llamados *guardrails*): reglas de alto nivel, expresadas en lenguaje claro, para el gobierno continuo. Son de tres tipos: **preventivos** (impiden acciones), **detectivos** (detectan incumplimientos) y **proactivos** (revisan recursos antes de crearlos). Se clasifican como obligatorios, fuertemente recomendados u opcionales.
- **Account Factory**: plantilla para crear cuentas nuevas ya configuradas y aprobadas.
- **Dashboard**: muestra cuentas, controles activos y recursos no conformes.

| | AWS Organizations | AWS Control Tower |
| --- | --- | --- |
| Qué es | Servicio base para agrupar cuentas y aplicar políticas | Capa que automatiza un entorno multicuenta con buenas prácticas |
| Configuración | La diseñas tú | Landing zone predefinida, lista en poco tiempo |
| Controles | SCP y otras políticas que escribes | Controles preempaquetados preventivos, detectivos y proactivos |

## AWS RAM: compartir sin duplicar

**AWS Resource Access Manager (AWS RAM)** permite **compartir recursos** de forma segura entre cuentas: con toda la organización, con OUs concretas o con cuentas específicas. Creas el recurso **una vez** y otras cuentas lo usan como si fuera propio.

- Ejemplo típico: compartir **subredes de Amazon VPC** desde una cuenta de red central.
- La cuenta propietaria **conserva la propiedad**; las políticas de IAM y las SCP de la cuenta que consume siguen aplicando.
- Compartir con cuentas fuera de la organización requiere aceptar una invitación.
- **No tiene cargo adicional**; solo pagas el uso del recurso compartido.

## Trampas típicas del examen

- **"Una SCP le da permisos a un usuario."** Falso: solo limita el máximo; los permisos los da IAM.
- **"Las SCP restringen la cuenta de administración."** Falso: solo afectan a cuentas miembro.
- **Elegir Organizations cuando la pregunta pide "landing zone" o "buenas prácticas listas para usar".** Eso es **Control Tower**.
- **Copiar el mismo recurso en cada cuenta.** Para compartirlo, la respuesta es **AWS RAM**.
- **Confundir la raíz de la organización con el usuario raíz.** Son conceptos distintos.

## Resumen para el examen

- Varias cuentas = aislamiento de seguridad, datos, costos e incidentes.
- Organizations: cuenta de administración, cuentas miembro, raíz y OUs.
- SCP = guardrail de permisos máximos; no otorga permisos; no afecta a la cuenta de administración.
- Control Tower = landing zone + controles + Account Factory + dashboard, construido sobre Organizations.
- AWS RAM = compartir recursos (por ejemplo, subredes) entre cuentas sin duplicarlos.
