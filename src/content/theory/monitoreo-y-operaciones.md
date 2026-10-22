---
title: "Monitoreo y operaciones: CloudWatch, Systems Manager y más"
summary: "Monitorear con CloudWatch, auditar con CloudTrail, operar con Systems Manager y optimizar con Health Dashboard, Service Quotas, Compute Optimizer y Trusted Advisor."
domain: "technology-services"
order: 20
examTasks: ["2.2", "3.1"]
services: ["Amazon CloudWatch", "AWS Systems Manager", "AWS Health Dashboard", "Service Quotas", "AWS Compute Optimizer", "AWS License Manager", "AWS Service Catalog", "AWS Trusted Advisor", "AWS CloudTrail", "AWS Config"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
  - "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
  - "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
  - "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html"
  - "https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html"
  - "https://docs.aws.amazon.com/health/latest/ug/aws-health-dashboard-status.html"
  - "https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"
  - "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"
  - "https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html"
  - "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html"
quiz:
  - prompt: "Una empresa de logística en Panamá descubre que alguien borró un bucket de S3 durante el fin de semana. Necesita saber qué usuario lo hizo y cuándo. ¿Qué servicio debe consultar?"
    options:
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitorea rendimiento con métricas, logs y alarmas; la pregunta de quién hizo qué acción corresponde a la auditoría."
      - label: "AWS Systems Manager"
        explanation: "AWS Systems Manager sirve para operar nodos a escala, con parches y comandos remotos; no registra quién borró un recurso."
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail registra como eventos las acciones de usuarios, roles y servicios, y responde quién hizo qué, sobre qué recurso y cuándo."
        correct: true
      - label: "AWS Health Dashboard"
        explanation: "AWS Health Dashboard muestra la salud de los servicios de AWS y los eventos que afectan a tu cuenta; no identifica qué usuario borró un bucket."
  - prompt: "El equipo de TI de una cadena de farmacias en Guayaquil pierde horas aplicando parches servidor por servidor en cientos de instancias EC2 y quiere conectarse a ellas sin abrir el puerto 22. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Systems Manager"
        explanation: "AWS Systems Manager aplica parches a muchos servidores a la vez y, con Session Manager, permite conectarse sin abrir puertos de entrada ni usar SSH."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch recopila métricas y logs y dispara alarmas, pero no es la herramienta para parchar servidores ni conectarse a ellos."
      - label: "AWS Service Catalog"
        explanation: "AWS Service Catalog permite que los usuarios lancen solo productos de TI aprobados; no aplica parches a instancias existentes."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer da recomendaciones de ajuste de tamaño según el uso; no ejecuta parches ni da acceso remoto a los nodos."
  - prompt: "Una startup de Medellín sospecha que sus instancias EC2 están sobredimensionadas y quiere recomendaciones de rightsizing basadas en las métricas de uso real. ¿Qué servicio debe activar?"
    options:
      - label: "Service Quotas"
        explanation: "Service Quotas sirve para ver las cuotas de los servicios y pedir aumentos; no analiza si una instancia está sobredimensionada."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer analiza la configuración y las métricas de uso para recomendar el ajuste de tamaño e identificar recursos inactivos."
        correct: true
      - label: "AWS License Manager"
        explanation: "AWS License Manager administra licencias de software de proveedores como Microsoft u Oracle; no evalúa el tamaño de las instancias."
      - label: "AWS Health Dashboard"
        explanation: "AWS Health Dashboard informa sobre eventos y fallas de los servicios de AWS; no da recomendaciones de rightsizing."
practice:
  - prompt: "Un portal de ventas de Santo Domingo quiere recibir una alerta, y ejecutar una acción automática, cuando el uso de CPU de sus instancias EC2 supere el 80 %. ¿Qué servicio debe usar?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail registra quién hizo cada acción en la API; no vigila métricas de rendimiento contra un umbral."
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch recopila métricas como el uso de CPU, y sus alarmas vigilan un umbral, alertan y pueden ejecutar acciones automáticas."
        correct: true
      - label: "AWS Config"
        explanation: "AWS Config registra la configuración de los recursos y sus cambios; no mide el uso de CPU en tiempo real."
      - label: "AWS Service Catalog"
        explanation: "AWS Service Catalog define qué productos aprobados pueden lanzar los equipos; no monitorea el rendimiento."
  - prompt: "Un auditor de una aseguradora de San José pide ver cómo estaba configurado un recurso de AWS el mes pasado, qué cambios tuvo y si cumple las reglas internas definidas. ¿Qué servicio responde esa pregunta?"
    options:
      - label: "AWS Config"
        explanation: "AWS Config registra la configuración de tus recursos y sus cambios para evaluar si cumplen las reglas definidas."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitorea métricas, logs y alarmas de rendimiento; no evalúa el cumplimiento de reglas de configuración."
      - label: "AWS Health Dashboard"
        explanation: "AWS Health Dashboard muestra la salud de los servicios de AWS y eventos que afectan a la cuenta, no el historial de configuración de un recurso."
      - label: "AWS License Manager"
        explanation: "AWS License Manager controla licencias de software de proveedores; no registra la configuración de los recursos."
  - prompt: "Una aplicación de pagos de Tegucigalpa empieza a fallar, y el equipo quiere saber si un evento de AWS está afectando a los recursos de su cuenta, incluidas actividades planificadas. ¿Qué herramienta debe revisar?"
    options:
      - label: "Service Quotas"
        explanation: "Service Quotas muestra los límites de los servicios y permite pedir aumentos; no informa sobre eventos de AWS que afectan a la cuenta."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer recomienda el tamaño adecuado de los recursos según su uso; no reporta eventos de AWS."
      - label: "AWS Health Dashboard"
        explanation: "La vista Your account health de AWS Health Dashboard muestra los eventos que afectan a tu cuenta y tus recursos, incluidas actividades planificadas."
        correct: true
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail registra las acciones de usuarios, roles y servicios en tu cuenta; no informa sobre el estado de los servicios de AWS."
  - prompt: "Una empresa de videojuegos de Ciudad de México llegó al valor máximo de un recurso permitido en su cuenta y necesita ver ese límite y solicitar un aumento desde un solo lugar. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Systems Manager"
        explanation: "AWS Systems Manager opera nodos a escala con parches y comandos remotos; no administra los límites de los servicios."
      - label: "AWS License Manager"
        explanation: "AWS License Manager fija límites de consumo de licencias de software, no las cuotas de los servicios de AWS."
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail audita quién hizo cada acción; no muestra cuotas ni permite solicitar aumentos."
      - label: "Service Quotas"
        explanation: "Service Quotas permite ver y administrar desde un solo lugar las cuotas de los servicios de AWS y solicitar aumentos cuando son ajustables."
        correct: true
  - prompt: "Una universidad de Concepción quiere que sus facultades lancen por autoservicio solo productos de TI aprobados por el área central, organizados en portafolios con restricciones. ¿Qué servicio debe usar?"
    options:
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace es una tienda de software de terceros; no es un catálogo de productos aprobados internamente."
      - label: "AWS Service Catalog"
        explanation: "AWS Service Catalog permite crear catálogos de servicios de TI aprobados en portafolios con restricciones, que los usuarios lanzan por autoservicio."
        correct: true
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer da recomendaciones de rightsizing; no controla qué productos pueden lanzar los usuarios."
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitorea métricas, logs y alarmas; no define qué productos están aprobados para lanzar."
  - prompt: "Una agroexportadora de Trujillo tiene el plan Basic Support y quiere acceder al conjunto completo de verificaciones de AWS Trusted Advisor y a su API. ¿Qué necesita?"
    options:
      - label: "Nada; el plan Basic Support ya incluye todas las verificaciones"
        explanation: "Basic Support solo incluye todas las verificaciones de Service limits y algunas de Security y Fault tolerance, no el conjunto completo."
      - label: "Activar AWS Compute Optimizer con opt in"
        explanation: "Activar Compute Optimizer da recomendaciones de rightsizing, pero no desbloquea las verificaciones completas de Trusted Advisor."
      - label: "Crear un trail en AWS CloudTrail"
        explanation: "Un trail guarda eventos de la API en S3 de forma continua; no da acceso a más verificaciones de Trusted Advisor."
      - label: "Contratar AWS Business Support+, AWS Enterprise Support o AWS Unified Operations"
        explanation: "El conjunto completo de verificaciones de Trusted Advisor y su API requieren AWS Business Support+, AWS Enterprise Support o AWS Unified Operations."
        correct: true
---

## ¿Por qué importa?

Una empresa de logística en Panamá tiene cientos de instancias EC2. Un lunes, la aplicación de rastreo se vuelve lenta y nadie sabe si es por la CPU, por un cambio de configuración que alguien hizo el fin de semana o por una falla de AWS en la Región. Además, el equipo pierde horas aplicando parches servidor por servidor y la factura crece por instancias sobredimensionadas.

AWS tiene herramientas para **ver** qué pasa (monitoreo), **saber quién hizo qué** (auditoría), **operar a escala** y **optimizar**. El examen te pedirá elegir la correcta.

## Monitorear con CloudWatch vs. auditar con CloudTrail

**Amazon CloudWatch** monitorea tus recursos de AWS y tus aplicaciones **en tiempo real**:

- **Métricas** (*metrics*): datos de rendimiento como uso de CPU. Muchos servicios de AWS las envían automáticamente, y puedes publicar métricas propias.
- **Logs**: CloudWatch Logs recopila, almacena y consulta registros de servicios de AWS y de tus aplicaciones.
- **Alarmas** (*alarms*): vigilan una métrica contra un umbral; te alertan y pueden **ejecutar acciones automáticas**.
- **Dashboards**: tableros con métricas y logs en un solo lugar.

**AWS CloudTrail** apoya la **auditoría, la gobernanza y el cumplimiento**: registra como **eventos** las acciones que hace un usuario, un rol o un servicio de AWS, ya sea desde la consola, la AWS CLI, los SDKs o las APIs. Responde **quién hizo qué, sobre qué recurso y cuándo**. El **Event history** muestra gratis los eventos de administración de los **últimos 90 días** en una Región; con un **trail** guardas los eventos de forma continua en un bucket de S3.

**AWS Config**, que la guía también menciona para auditoría, registra la **configuración** de tus recursos y sus cambios para evaluar si cumplen las reglas definidas.

| Pregunta | Servicio |
| --- | --- |
| ¿Cómo está el **rendimiento** ahora? ¿Quiero una alarma si la CPU supera el 80 %? | CloudWatch |
| ¿**Quién** borró este bucket y **cuándo**? | CloudTrail |
| ¿Cómo estaba **configurado** este recurso y cumple las reglas? | AWS Config |

## Operar a escala con AWS Systems Manager

**AWS Systems Manager** permite **ver, administrar y operar nodos a escala** de forma centralizada en AWS, on-premises y entornos multinube. Un **nodo administrado** es una máquina con el **SSM Agent** instalado. Capacidades típicas:

- **Aplicar parches** a muchos servidores a la vez.
- **Ejecutar comandos de forma remota** (Run Command).
- **Conectarse de forma segura** a los nodos **sin abrir puertos de entrada**, sin bastion hosts ni SSH (Session Manager).
- **Guardar datos de configuración** que usan las aplicaciones (Parameter Store).
- **Automatizar tareas** comunes de administración (Automation).

Encaja con la tarea 3.1 de la guía: elegir **procesos repetibles** en lugar de operaciones manuales únicas.

## Herramientas de visibilidad y optimización

**AWS Health Dashboard**: muestra la salud de los servicios de AWS. La vista **Service health** muestra los eventos **públicos** de todos los servicios y Regiones, sin iniciar sesión. La vista **Your account health** muestra los eventos que **afectan a tu cuenta** y a tus recursos, incluidas actividades planificadas. Está disponible para todos los clientes sin costo adicional.

**Service Quotas**: permite **ver y administrar desde un solo lugar las cuotas** (también llamadas límites) de los servicios de AWS, es decir, los valores máximos de recursos u operaciones en tu cuenta, y **solicitar aumentos** cuando una cuota es ajustable. Algunas cuotas son por cuenta y otras por Región.

**AWS Compute Optimizer**: analiza la configuración y las **métricas de uso** de tus recursos para dar **recomendaciones de ajuste de tamaño** (*rightsizing*) e identificar recursos inactivos. Indica si un recurso es óptimo y cómo reducir costos o mejorar el rendimiento. Cubre, entre otros, instancias EC2, grupos de Auto Scaling, volúmenes EBS, funciones Lambda y bases de datos RDS. Hay que activarlo (*opt in*).

**AWS License Manager**: administra las **licencias de software** de proveedores como Microsoft, SAP, Oracle e IBM en AWS y on-premises. Con reglas de consumo puedes fijar límites para **evitar incumplimientos** y excesos de licencias, y aprovechar el modelo **BYOL** (*bring your own license*).

**AWS Service Catalog**: permite a las organizaciones **crear y administrar catálogos de servicios de TI aprobados** para usar en AWS. Los administradores arman **portafolios** de productos con restricciones; los usuarios finales lanzan por **autoservicio** solo lo aprobado. Resultado: gobernanza y estandarización.

**AWS Trusted Advisor**: inspecciona tu entorno y **recomienda mejores prácticas** para ahorrar dinero, mejorar la disponibilidad y el rendimiento, y cerrar brechas de seguridad. Sus categorías de verificación son:

1. **Cost optimization** (optimización de costos)
2. **Performance** (rendimiento)
3. **Security** (seguridad)
4. **Fault tolerance** (tolerancia a fallos)
5. **Service limits** (límites de servicio)
6. **Operational Excellence** (excelencia operativa)

Con el plan **Basic Support** tienes todas las verificaciones de Service limits y algunas seleccionadas de Security y Fault tolerance. El conjunto completo, y la API de Trusted Advisor, requieren **AWS Business Support+**, **AWS Enterprise Support** o **AWS Unified Operations**.

## ¿Qué servicio uso?

| Necesito… | Servicio |
| --- | --- |
| Métricas, logs, dashboards y alarmas | Amazon CloudWatch |
| Registro de quién hizo cada llamada a la API | AWS CloudTrail |
| Parchar y administrar muchos servidores sin SSH | AWS Systems Manager |
| Saber si una falla de AWS afecta a mi cuenta | AWS Health Dashboard |
| Ver o aumentar los límites de un servicio | Service Quotas |
| Saber si mis instancias están sobredimensionadas | AWS Compute Optimizer |
| Controlar licencias de Oracle o Microsoft | AWS License Manager |
| Que los equipos lancen solo productos aprobados | AWS Service Catalog |
| Recomendaciones de costo, seguridad, rendimiento y tolerancia a fallos | AWS Trusted Advisor |

## Trampas típicas del examen

- **Confundir CloudWatch con CloudTrail.** CloudWatch = rendimiento y alarmas; CloudTrail = auditoría de acciones en la API.
- **Elegir Trusted Advisor para ajustar el tamaño de una instancia según su uso real.** Trusted Advisor da recomendaciones generales; el análisis de uso para *rightsizing* es de **Compute Optimizer**.
- **Pensar que todos tienen todas las verificaciones de Trusted Advisor.** El plan Basic solo incluye una parte.
- **Abrir el puerto 22 para administrar servidores.** Systems Manager Session Manager conecta sin abrir puertos de entrada.
- **Confundir Service Catalog con AWS Marketplace.** Service Catalog contiene productos **aprobados internamente**; Marketplace es una tienda de software de terceros.

## Resumen para el examen

- CloudWatch = métricas, logs, alarmas y dashboards en tiempo real.
- CloudTrail = quién hizo qué y cuándo; Event history de 90 días.
- AWS Config = historial de configuración y cumplimiento de reglas.
- Systems Manager = parches, comandos remotos y acceso seguro a nodos a escala.
- Health Dashboard = estado de los servicios de AWS y eventos que afectan a tu cuenta.
- Service Quotas = ver cuotas y pedir aumentos; Compute Optimizer = rightsizing con métricas de uso.
- License Manager = licencias; Service Catalog = catálogo de productos aprobados.
- Trusted Advisor = seis categorías; el conjunto completo requiere Business Support+, Enterprise o Unified Operations.
