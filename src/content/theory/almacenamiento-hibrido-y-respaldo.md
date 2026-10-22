---
title: "FSx, Storage Gateway, AWS Backup y Elastic Disaster Recovery"
summary: "Archivos administrados con Amazon FSx, almacenamiento híbrido con Storage Gateway, respaldos centralizados con AWS Backup y recuperación con Elastic Disaster Recovery."
domain: "technology-services"
order: 14
examTasks: ["3.6"]
services: ["Amazon FSx", "AWS Storage Gateway", "AWS Backup", "AWS Elastic Disaster Recovery"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/fsx/"
  - "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html"
  - "https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html"
  - "https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html"
  - "https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html"
  - "https://aws.amazon.com/storagegateway/"
  - "https://docs.aws.amazon.com/filegateway/latest/filefsxw/what-is-file-fsxw.html"
  - "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"
  - "https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-out-of-scope-services.html"
quiz:
  - prompt: "Una cadena de farmacias de Guadalajara quiere llevar a AWS sus carpetas compartidas de Windows, que usan el protocolo SMB y se integran con Microsoft Active Directory, sin cambiar cómo trabajan los empleados. ¿Qué servicio debe elegir?"
    options:
      - label: "Amazon EFS"
        explanation: "Amazon EFS es un sistema de archivos NFS que no es compatible con instancias EC2 Windows, así que no sirve para carpetas compartidas de Windows con SMB."
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server está construido sobre Windows Server, usa SMB y se integra con Active Directory: es la opción para carpetas compartidas de Windows."
        correct: true
      - label: "Tape Gateway"
        explanation: "Tape Gateway presenta cintas virtuales para el software de respaldo; no ofrece carpetas compartidas de archivos para los empleados."
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery replica servidores para recuperarlos en minutos ante un desastre; no es un servidor de archivos compartidos."
  - prompt: "Una distribuidora de Bogotá respalda sus servidores en cintas físicas y quiere dejar de comprarlas, pero sin cambiar el flujo de su software de respaldo y guardando los datos en Amazon S3 o S3 Glacier. ¿Qué tipo de AWS Storage Gateway debe usar?"
    options:
      - label: "Volume Gateway"
        explanation: "Volume Gateway presenta volúmenes de bloques iSCSI para extender el almacenamiento local; no presenta cintas virtuales al software de respaldo."
      - label: "Amazon FSx for NetApp ONTAP"
        explanation: "FSx for NetApp ONTAP es un sistema de archivos administrado multiprotocolo; no reemplaza cintas físicas en un flujo de respaldo."
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery mantiene servidores replicados listos para arrancar en AWS; no emula cintas para el software de respaldo."
      - label: "Tape Gateway"
        explanation: "Tape Gateway presenta cintas virtuales a tu software de respaldo y guarda los datos en Amazon S3 o S3 Glacier, sin cambiar el flujo de respaldo."
        correct: true
  - prompt: "Una aseguradora de Santiago quiere definir en un solo lugar cuándo respaldar sus recursos de Amazon EC2, Amazon RDS y Amazon DynamoDB, asignar esas políticas mediante etiquetas e impedir que alguien borre los respaldos. ¿Qué servicio cumple este objetivo?"
    options:
      - label: "AWS Backup"
        explanation: "AWS Backup centraliza los respaldos con backup plans asignables por etiquetas, y AWS Backup Vault Lock impide borrar respaldos o cambiar su retención."
        correct: true
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery mantiene servidores completos replicados para recuperarse en minutos; no define políticas centralizadas de respaldo por etiquetas."
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presenta recursos compartidos NFS o SMB respaldados en S3; no gestiona políticas de respaldo para EC2, RDS y DynamoDB."
      - label: "Amazon FSx for OpenZFS"
        explanation: "FSx for OpenZFS es un sistema de archivos administrado sobre OpenZFS; no centraliza ni protege respaldos de otros servicios."
practice:
  - prompt: "Una firma de ingeniería de Monterrey ya usa NetApp en su centro de datos y quiere un sistema de archivos administrado en AWS al que accedan equipos Linux, Windows y macOS por NFS, SMB e iSCSI. ¿Qué servicio debe elegir?"
    options:
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server está construido sobre Windows Server y usa SMB; no es la opción para quien ya usa NetApp y necesita acceso por NFS, SMB e iSCSI."
      - label: "Amazon EFS"
        explanation: "Amazon EFS es un sistema de archivos NFS que no es compatible con instancias EC2 Windows; no cubre el acceso multiprotocolo de una empresa que ya usa NetApp."
      - label: "Amazon FSx for NetApp ONTAP"
        explanation: "FSx for NetApp ONTAP está construido sobre NetApp ONTAP y ofrece acceso por NFS, SMB, iSCSI y NVMe desde Linux, Windows y macOS."
        correct: true
      - label: "Volume Gateway"
        explanation: "Volume Gateway presenta volúmenes iSCSI desde un dispositivo en tu centro de datos para extender el almacenamiento local; no es un sistema de archivos administrado multiprotocolo en AWS."
  - prompt: "Un hospital de Barranquilla quiere replicar continuamente sus servidores on-premises hacia AWS, hacer simulacros sin interrumpir la operación y, si su centro de datos se inunda, levantar los servidores en AWS en minutos y luego regresar a su sitio principal. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery replica continuamente los servidores a un área de preparación, permite simulacros, lanza instancias de recuperación en minutos y admite failback."
        correct: true
      - label: "AWS Backup"
        explanation: "AWS Backup centraliza copias para restaurar datos; no mantiene servidores completos replicados listos para arrancar en minutos con failback."
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presenta recursos compartidos NFS o SMB respaldados en Amazon S3; no replica servidores completos para recuperarlos ante un desastre."
      - label: "Amazon FSx for OpenZFS"
        explanation: "FSx for OpenZFS es un sistema de archivos administrado sobre OpenZFS; no replica ni recupera servidores on-premises ante un desastre."
  - prompt: "Una editorial de Córdoba quiere que sus servidores locales sigan guardando archivos en recursos compartidos NFS, pero que esos archivos queden como objetos en Amazon S3 para alimentar un data lake, con los más usados en una caché local. ¿Qué tipo de AWS Storage Gateway corresponde?"
    options:
      - label: "Volume Gateway"
        explanation: "Volume Gateway presenta volúmenes de bloques iSCSI; no ofrece recursos compartidos NFS cuyos archivos se guarden como objetos en S3."
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presenta recursos compartidos NFS o SMB, guarda los archivos como objetos en Amazon S3 y mantiene en caché local los datos más usados."
        correct: true
      - label: "Tape Gateway"
        explanation: "Tape Gateway presenta cintas virtuales al software de respaldo; no ofrece recursos compartidos de archivos para alimentar un data lake."
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery replica servidores para recuperarlos ante un desastre; no presenta recursos compartidos NFS conectados a S3."
  - prompt: "Una planta manufacturera de Puebla quiere extender el almacenamiento de bloques de sus servidores locales con volúmenes iSCSI respaldados en la nube, para poder recuperarlos desde AWS. ¿Qué tipo de AWS Storage Gateway debe usar?"
    options:
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presenta recursos compartidos de archivos NFS o SMB; no presenta volúmenes de bloques iSCSI a los servidores locales."
      - label: "Tape Gateway"
        explanation: "Tape Gateway presenta cintas virtuales para el software de respaldo; no extiende el almacenamiento de bloques con volúmenes iSCSI."
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server ofrece carpetas compartidas de Windows por SMB; no es un gateway híbrido que presente volúmenes iSCSI a servidores locales."
      - label: "Volume Gateway"
        explanation: "Volume Gateway presenta volúmenes de bloques iSCSI, en arquitectura cached o stored, guarda los datos en Amazon S3 y permite la recuperación en la nube."
        correct: true
  - prompt: "Una universidad de Valparaíso quiere llevar a AWS unos servidores de archivos Linux que ya usan ZFS, con un servicio totalmente administrado que use NFS. ¿Qué opción de Amazon FSx debe elegir?"
    options:
      - label: "Amazon FSx for Lustre"
        explanation: "FSx for Lustre es un sistema de archivos de alto rendimiento para cómputo HPC y está fuera del alcance del CLF-C02; no es la opción para cargas que ya usan ZFS."
      - label: "Amazon FSx for OpenZFS"
        explanation: "FSx for OpenZFS está construido sobre OpenZFS, usa NFS y es la opción para migrar cargas que ya usan ZFS u otros servidores de archivos Linux."
        correct: true
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server está construido sobre Windows Server y usa SMB con Active Directory; no es la opción para servidores Linux con ZFS."
      - label: "Tape Gateway"
        explanation: "Tape Gateway reemplaza cintas físicas con cintas virtuales para respaldos; no es un sistema de archivos administrado para servidores ZFS."
  - prompt: "Una cooperativa financiera de Cuenca debe guardar copias de sus respaldos en otra Región y en otra cuenta de su organización de AWS Organizations, y demostrar ante el regulador que todos sus recursos están respaldados. ¿Qué servicio cumple ambos requisitos?"
    options:
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery mantiene servidores replicados listos para recuperarse en minutos; no es el servicio de respaldos centralizados con auditoría de cumplimiento que pide el regulador."
      - label: "Tape Gateway"
        explanation: "Tape Gateway presenta cintas virtuales al software de respaldo local; no gestiona copias entre Regiones y cuentas ni audita el cumplimiento de los respaldos."
      - label: "AWS Backup"
        explanation: "AWS Backup permite copiar respaldos entre Regiones y entre cuentas de AWS Organizations, y AWS Backup Audit Manager ayuda a demostrar el cumplimiento."
        correct: true
      - label: "Amazon FSx for NetApp ONTAP"
        explanation: "FSx for NetApp ONTAP es un sistema de archivos administrado multiprotocolo; no centraliza respaldos de otros servicios ni demuestra su cumplimiento."
---

## ¿Por qué importa?

Una cadena de farmacias de Guadalajara tiene un servidor de archivos Windows en su oficina central y un sistema de inventario en servidores propios. Quiere tres cosas: llevar sus carpetas compartidas de Windows a la nube sin cambiar cómo trabajan los empleados, seguir usando su centro de datos mientras usa AWS como almacenamiento ilimitado, y poder recuperarse en minutos si su centro de datos sufre una inundación.

Para estos escenarios, el examen espera que reconozcas **Amazon FSx**, **AWS Storage Gateway**, **AWS Backup** y **AWS Elastic Disaster Recovery**.

## Amazon FSx: servidores de archivos administrados

**Amazon FSx** ofrece sistemas de archivos compartidos **totalmente administrados**, construidos sobre tecnologías de archivos populares. AWS se encarga del hardware, los parches, la detección de fallas y los respaldos.

| Opción | Construido sobre | Úsalo cuando… |
| --- | --- | --- |
| Amazon FSx for Windows File Server | Windows Server; protocolo **SMB**; integración con Microsoft Active Directory | Necesitas carpetas compartidas de Windows o mover aplicaciones Windows sin cambios |
| Amazon FSx for NetApp ONTAP | Sistema de archivos NetApp ONTAP; acceso por NFS, SMB, iSCSI y NVMe | Ya usas NetApp en tu centro de datos o necesitas acceso multiprotocolo desde Linux, Windows y macOS |
| Amazon FSx for OpenZFS | Sistema de archivos OpenZFS; protocolo NFS | Quieres migrar cargas que ya usan ZFS u otros servidores de archivos Linux |
| Amazon FSx for Lustre | Sistema de archivos Lustre, de alto rendimiento | Cómputo de alto rendimiento (HPC) |

**Importante para el examen:** Amazon FSx sí está dentro del alcance, pero **Amazon FSx for Lustre aparece en la lista oficial de servicios fuera de alcance** del CLF-C02. Basta con saber que existe.

**FSx vs. EFS:** Amazon EFS es un sistema de archivos NFS elástico y sin servidor que no es compatible con instancias EC2 Windows. Si el escenario dice "Windows", "SMB" o "Active Directory", piensa en **FSx for Windows File Server**.

## AWS Storage Gateway: almacenamiento híbrido con caché local

Un entorno **híbrido** combina tu centro de datos (*on-premises*) con la nube. **AWS Storage Gateway** conecta un dispositivo de software instalado en tu centro de datos (una máquina virtual o un appliance de hardware) con el almacenamiento de AWS. Las aplicaciones locales siguen usando protocolos conocidos, mientras los datos se guardan en la nube y los más usados quedan en una **caché local** para un acceso con baja latencia. Por eso la guía del examen lo menciona como ejemplo de **cached file systems** (sistemas de archivos con caché).

| Tipo de gateway | Qué presenta a tus servidores | Dónde quedan los datos | Uso típico |
| --- | --- | --- | --- |
| Amazon S3 File Gateway | Recursos compartidos de archivos **NFS o SMB** | Objetos en Amazon S3 | Alimentar data lakes, archivar archivos, respaldar bases de datos en S3 |
| Volume Gateway | Volúmenes de bloques **iSCSI** (arquitectura *cached* o *stored*) | Amazon S3, con opción de pasar a Amazon EBS | Extender el almacenamiento de bloques local con recuperación en la nube |
| Tape Gateway | **Cintas virtuales** para tu software de respaldo | Amazon S3 o S3 Glacier | Reemplazar cintas físicas sin cambiar el flujo de respaldo |
| Amazon FSx File Gateway | Acceso local a recursos compartidos de FSx for Windows File Server | Amazon FSx for Windows File Server | Ya **no está disponible para nuevos clientes**; los existentes pueden seguir usándolo |

## AWS Backup: respaldos centralizados

**AWS Backup** es un servicio totalmente administrado para **centralizar y automatizar la protección de datos** en servicios de AWS, en la nube y on-premises. En lugar de configurar respaldos servicio por servicio con scripts propios, defines políticas en un solo lugar.

Conceptos clave:

- **Backup plans** (planes de respaldo): políticas que dicen cuándo respaldar, cuánto tiempo retener y a dónde copiar. Se pueden asignar a recursos mediante **etiquetas** (*tags*).
- **Backup vaults** (bóvedas): contenedores cifrados donde se guardan los respaldos, separados de los recursos de origen. **AWS Backup Vault Lock** impide que alguien, incluido tú, borre respaldos o cambie su retención (modelo *write-once-read-many*).
- **Copias entre Regiones y entre cuentas** de AWS Organizations, útiles para continuidad del negocio y cumplimiento.
- **Lifecycle** de respaldos hacia almacenamiento frío más barato y **AWS Backup Audit Manager** para demostrar cumplimiento.

Servicios compatibles, entre otros: Amazon EC2, Amazon EBS, Amazon S3, Amazon RDS, Amazon Aurora, Amazon DynamoDB, Amazon EFS, Amazon FSx y los volúmenes de Storage Gateway.

Casos de uso: cumplir requisitos de retención normativa, aplicar la misma política de respaldo a toda la organización, proteger respaldos contra borrados accidentales o maliciosos y auditar que todo esté respaldado.

## AWS Elastic Disaster Recovery

**AWS Elastic Disaster Recovery** (AWS DRS) minimiza el tiempo de inactividad y la pérdida de datos con una recuperación rápida y confiable de aplicaciones **on-premises o en la nube** hacia AWS.

Cómo funciona:

- Replica continuamente tus servidores de origen hacia un **área de preparación** (*staging area*) en la Región de AWS que elijas, usando almacenamiento económico y cómputo mínimo para reducir costos.
- Permite hacer **simulacros** sin interrumpir la operación.
- Ante un desastre, lanzas instancias de recuperación en AWS **en minutos**, con el estado más reciente o un punto anterior en el tiempo.
- Cuando el problema se resuelve, puedes hacer **failback** (regresar) a tu sitio principal.

**Backup vs. Disaster Recovery:** AWS Backup guarda copias para restaurar datos; Elastic Disaster Recovery mantiene servidores completos listos para arrancar en AWS con poco tiempo de inactividad.

## Trampas típicas del examen

- **Elegir EFS para carpetas compartidas de Windows.** La respuesta es **Amazon FSx for Windows File Server**.
- **Estudiar FSx for Lustre a fondo.** Está en la lista oficial de servicios fuera de alcance del CLF-C02.
- **Confundir Storage Gateway con una migración única.** Storage Gateway es para un entorno **híbrido continuo** con caché local.
- **Usar Tape Gateway para archivos compartidos.** Tape Gateway reemplaza cintas de respaldo; para archivos usa S3 File Gateway.
- **Confundir AWS Backup con Elastic Disaster Recovery.** Backup = copias centralizadas; DRS = servidores replicados listos para recuperar en minutos.

## Resumen para el examen

- Amazon FSx = servidores de archivos administrados: Windows File Server (SMB, Active Directory), NetApp ONTAP, OpenZFS y Lustre.
- FSx for Lustre está fuera del alcance del examen.
- Storage Gateway = puente híbrido con caché local: S3 File Gateway (NFS/SMB), Volume Gateway (iSCSI) y Tape Gateway (cintas virtuales).
- AWS Backup = respaldos centralizados con planes, bóvedas, copias entre Regiones y cuentas, y Vault Lock.
- AWS Elastic Disaster Recovery = replicación continua y recuperación en minutos, con failback.
- Palabra clave "Windows + carpetas compartidas" → FSx for Windows File Server; "on-premises + nube con caché" → Storage Gateway.
