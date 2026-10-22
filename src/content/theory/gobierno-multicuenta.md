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
quiz:
  - prompt: "Una cadena de farmacias de Bogotá usa AWS Organizations y quiere que nadie en las cuentas de la OU Producción, ni siquiera un administrador con AdministratorAccess, pueda lanzar recursos fuera de las Regiones aprobadas. ¿Qué debe usar?"
    options:
      - label: "AWS RAM"
        explanation: "AWS RAM comparte recursos entre cuentas; no limita los permisos máximos de las identidades de una OU."
      - label: "La factura consolidada de Organizations"
        explanation: "La factura consolidada agrupa los costos de las cuentas; no restringe qué Regiones pueden usar."
      - label: "Una política de control de servicios (SCP) en la OU"
        explanation: "Una SCP adjunta a la OU fija el máximo de permisos de sus cuentas miembro, así que ni un administrador con AdministratorAccess podrá usar Regiones no aprobadas."
        correct: true
      - label: "Account Factory de AWS Control Tower"
        explanation: "Account Factory sirve para crear cuentas nuevas ya configuradas; no es el mecanismo que limita las Regiones en una OU existente."
  - prompt: "Una aseguradora de Quito quiere montar en poco tiempo un entorno multicuenta con buenas prácticas de seguridad: una landing zone predefinida, controles preventivos y detectivos preempaquetados y un dashboard. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Control Tower"
        explanation: "AWS Control Tower configura una landing zone predefinida con controles preventivos, detectivos y proactivos, Account Factory y un dashboard."
        correct: true
      - label: "AWS Organizations por sí solo"
        explanation: "AWS Organizations es el servicio base para agrupar cuentas, pero la estructura la diseñas tú; no trae una landing zone lista."
      - label: "AWS RAM"
        explanation: "AWS RAM comparte recursos entre cuentas; no crea ni gobierna un entorno multicuenta."
      - label: "Una política de control de servicios (SCP)"
        explanation: "Una SCP limita permisos máximos que tú escribes; por sí sola no crea una landing zone ni un dashboard de gobierno."
  - prompt: "Una minera de Lima tiene una cuenta de red central con una Amazon VPC y quiere que sus otras cuentas de la organización usen esas subredes sin duplicarlas en cada cuenta. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Control Tower"
        explanation: "AWS Control Tower configura y gobierna la landing zone; no es el servicio para compartir subredes entre cuentas."
      - label: "Una política de control de servicios (SCP)"
        explanation: "Una SCP solo limita permisos máximos y no otorga acceso, así que no permite que otras cuentas usen las subredes."
      - label: "La factura consolidada de Organizations"
        explanation: "La factura consolidada agrupa los pagos de las cuentas; no comparte recursos de red entre ellas."
      - label: "AWS Resource Access Manager (AWS RAM)"
        explanation: "AWS RAM comparte recursos entre cuentas, como subredes de Amazon VPC desde una cuenta de red central, sin duplicarlos y sin cargo adicional."
        correct: true
practice:
  - prompt: "Una distribuidora de Guadalajara adjuntó a la OU Desarrollo una SCP que permite todas las acciones de Amazon S3. Un usuario de IAM de una cuenta miembro de esa OU no tiene ninguna política de IAM adjunta. ¿Puede usar Amazon S3?"
    options:
      - label: "No, porque la SCP no otorga permisos; también necesita una política de IAM que lo permita"
        explanation: "Una SCP solo fija el máximo de permisos; el permiso efectivo es la intersección entre la SCP y la política de IAM, y este usuario no tiene ninguna."
        correct: true
      - label: "Sí, porque la SCP le otorga acceso a Amazon S3"
        explanation: "Es la trampa típica del examen: una SCP solo limita el máximo de permisos; los permisos los da IAM, y este usuario no tiene ninguna política."
      - label: "Sí, siempre que la organización tenga la factura consolidada"
        explanation: "La factura consolidada agrupa los costos de las cuentas; no otorga permisos ni cambia cómo se combinan la SCP y la política de IAM."
      - label: "Sí, si la cuenta de administración le comparte permisos con AWS RAM"
        explanation: "AWS RAM comparte recursos entre cuentas, no permisos; el usuario sigue necesitando una política de IAM que le permita usar Amazon S3."
  - prompt: "Una empresa de logística de Monterrey adjuntó a la raíz de su organización una SCP que deniega un servicio. Luego nota que un administrador de la cuenta de administración todavía puede usar ese servicio. ¿Por qué?"
    options:
      - label: "Porque una SCP adjunta a la raíz solo aplica a las OUs anidadas"
        explanation: "Una SCP en la raíz se hereda hacia abajo y limita a las cuentas miembro de toda la jerarquía; el motivo aquí es otro."
      - label: "Porque el administrador tiene la política AdministratorAccess"
        explanation: "En una cuenta miembro, una SCP limita incluso a quien tiene AdministratorAccess; lo que cambia aquí es que se trata de la cuenta de administración."
      - label: "Porque las SCP no afectan a la cuenta de administración"
        explanation: "Las SCP solo afectan a las identidades de las cuentas miembro; la cuenta de administración queda fuera de su alcance."
        correct: true
      - label: "Porque falta activar la factura consolidada"
        explanation: "Las SCP requieren tener todas las funciones (all features) de Organizations activadas, y aun así no afectan a la cuenta de administración."
  - prompt: "Una universidad de Córdoba usa AWS Control Tower y quiere identificar los recursos que ya existen en sus cuentas y no cumplen sus políticas, sin bloquear ninguna acción. ¿Qué tipo de control necesita?"
    options:
      - label: "Un control preventivo"
        explanation: "Los controles preventivos impiden acciones; el escenario pide encontrar incumplimientos sin bloquear nada."
      - label: "Un control detectivo"
        explanation: "Los controles detectivos de Control Tower detectan incumplimientos, como recursos existentes que no cumplen las políticas."
        correct: true
      - label: "Un control proactivo"
        explanation: "Los controles proactivos revisan los recursos antes de crearlos; el escenario habla de recursos que ya existen."
      - label: "Account Factory"
        explanation: "Account Factory es una plantilla para crear cuentas nuevas ya configuradas; no es un control que detecte incumplimientos."
  - prompt: "Un grupo hotelero de Cancún crea una cuenta de AWS cada vez que abre un hotel y quiere que cada cuenta nazca ya configurada y aprobada según sus estándares, dentro de su landing zone de AWS Control Tower. ¿Qué función debe usar?"
    options:
      - label: "AWS RAM"
        explanation: "AWS RAM comparte recursos entre cuentas que ya existen; no crea cuentas nuevas configuradas."
      - label: "Una SCP adjunta a la raíz"
        explanation: "Una SCP limita el máximo de permisos de las cuentas miembro; no crea cuentas ni las configura."
      - label: "El dashboard de Control Tower"
        explanation: "El dashboard muestra cuentas, controles activos y recursos no conformes; no es la plantilla para crear cuentas."
      - label: "Account Factory"
        explanation: "Account Factory es la plantilla de Control Tower para crear cuentas nuevas ya configuradas y aprobadas."
        correct: true
  - prompt: "Una cadena de supermercados de Santiago tiene desarrollo, pruebas y producción en una sola cuenta de AWS. ¿Qué beneficio obtiene al separar esos entornos en varias cuentas?"
    options:
      - label: "Limitar el impacto de un incidente o de un error a una sola cuenta"
        explanation: "Una cuenta es un límite natural de seguridad y cargas de trabajo, así que un error en pruebas queda aislado de producción."
        correct: true
      - label: "Dejar de necesitar políticas de IAM para dar permisos"
        explanation: "Separar en varias cuentas no cambia de dónde vienen los permisos: siguen viniendo de las políticas de IAM de cada cuenta."
      - label: "Que los datos se compartan automáticamente entre todas las cuentas"
        explanation: "Separar cuentas sirve para aislar y restringir el acceso a datos sensibles; para compartir recursos se usa AWS RAM."
      - label: "Que las SCP pasen a aplicarse también a la cuenta de administración"
        explanation: "Las SCP afectan solo a las cuentas miembro; tener más cuentas no cambia que la cuenta de administración queda fuera."
  - prompt: "Una aseguradora de La Paz tiene la OU Producción y, dentro de ella, la OU anidada Pagos. Adjunta a Producción una SCP que deniega usar Regiones no aprobadas. ¿Qué pasa con las cuentas de la OU Pagos?"
    options:
      - label: "No se ven afectadas, porque la SCP solo aplica a las cuentas directas de Producción"
        explanation: "Las políticas aplicadas a una OU se heredan hacia abajo, así que también alcanzan a las OUs anidadas y sus cuentas."
      - label: "Quedan restringidas solo si el usuario raíz de cada cuenta acepta la SCP"
        explanation: "Las SCP afectan a todas las identidades de las cuentas miembro, incluido su usuario raíz, sin que nadie tenga que aceptarlas."
      - label: "También quedan restringidas, porque las políticas de una OU se heredan hacia las OUs anidadas"
        explanation: "Una cuenta solo tiene lo que permite cada nivel superior; la SCP de Producción alcanza a las cuentas de Pagos."
        correct: true
      - label: "Quedan restringidas solo si la SCP se comparte con AWS RAM"
        explanation: "AWS RAM comparte recursos entre cuentas; las SCP se heredan por la jerarquía de la organización sin usar RAM."
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
