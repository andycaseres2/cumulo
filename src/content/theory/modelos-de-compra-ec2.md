---
title: "Modelos de compra de EC2"
summary: "Elige entre On-Demand, Savings Plans, Reserved Instances, Spot, opciones dedicadas y Capacity Reservations según la carga y el compromiso que puedes asumir."
domain: "billing-pricing-support"
order: 1
examTasks: ["4.1"]
services: ["Amazon EC2", "AWS Lambda", "AWS Fargate", "AWS Organizations"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/ec2/pricing/"
  - "https://aws.amazon.com/ec2/spot/"
  - "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html"
  - "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-convertible-exchange.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-behavior.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html"
quiz:
  - prompt: "Una empresa de Bogotá tiene uso constante de Amazon EC2 en varias familias y Regiones, además de AWS Fargate y AWS Lambda. Quiere un descuento a cambio de un compromiso de 1 o 3 años que cubra todo ese uso. ¿Qué opción debe elegir?"
    options:
      - label: "Compute Savings Plans"
        explanation: "Compute Savings Plans aplican a EC2 sin importar familia, tamaño, sistema operativo, tenencia o Región, y también a AWS Fargate y AWS Lambda."
        correct: true
      - label: "EC2 Instance Savings Plans"
        explanation: "EC2 Instance Savings Plans exigen comprometerte con una familia de instancias en una Región, así que no dan la flexibilidad entre familias y Regiones que se pide."
      - label: "Standard Reserved Instances zonales"
        explanation: "Una RI zonal solo aplica a una AZ y a un tamaño exacto; no cubre varias familias y Regiones ni el uso de Fargate y Lambda."
      - label: "Spot Instances"
        explanation: "Spot no implica compromiso de 1 o 3 años y sus instancias pueden interrumpirse; no es un descuento por compromiso sobre todo el uso."
  - prompt: "Una tienda en línea de Medellín corre cada noche un proceso de reportes que puede repetirse sin problema si se interrumpe. Quiere el mayor ahorro posible frente a On-Demand. ¿Qué opción de compra debe usar?"
    options:
      - label: "On-Demand Instances"
        explanation: "On-Demand es el precio base, sin descuento; conviene para cargas que no pueden interrumpirse, no para maximizar el ahorro de un proceso tolerante a interrupciones."
      - label: "Spot Instances"
        explanation: "Spot usa capacidad sobrante de EC2 con descuentos de hasta el 90 % y puede interrumpirse con aviso de dos minutos, algo aceptable para un proceso que puede repetirse."
        correct: true
      - label: "On-Demand Capacity Reservations"
        explanation: "Las Capacity Reservations garantizan capacidad en una AZ, pero por sí solas no dan descuento."
      - label: "Dedicated Hosts"
        explanation: "Dedicated Hosts dan un servidor físico completo, útil para licencias por socket o núcleo; no son la opción de mayor ahorro para un proceso interrumpible."
  - prompt: "Una aseguradora de Lima quiere llevar a EC2 un software cuya licencia propia se cobra por socket y por núcleo físico, así que necesita visibilidad de los sockets y núcleos del servidor. ¿Qué opción debe elegir?"
    options:
      - label: "Dedicated Instances"
        explanation: "Dedicated Instances usan hardware dedicado a una sola cuenta, pero no dan visibilidad de sockets y núcleos y solo tienen soporte parcial de BYOL."
      - label: "Convertible Reserved Instances"
        explanation: "Una Reserved Instance es un descuento de facturación, no un servidor; no da visibilidad del servidor físico para licenciar por socket o núcleo."
      - label: "Spot Instances"
        explanation: "Spot da descuento sobre capacidad sobrante que puede interrumpirse; no ofrece visibilidad de sockets y núcleos para licencias propias."
      - label: "Dedicated Hosts"
        explanation: "Dedicated Hosts dan un servidor físico completo con visibilidad de sockets y núcleos, y permiten usar licencias propias (BYOL) por socket o núcleo."
        correct: true
practice:
  - prompt: "Una startup de Asunción lanza una app nueva y durante unas semanas de prueba no sabe cuánta demanda tendrá. El servidor no puede interrumpirse y no quiere comprometerse a ningún plazo. ¿Qué opción de compra de EC2 le conviene?"
    options:
      - label: "Spot Instances"
        explanation: "Spot puede interrumpirse con un aviso de dos minutos, algo inaceptable para un servidor que no puede detenerse."
      - label: "Standard Reserved Instances por 3 años"
        explanation: "Una RI exige un compromiso de 1 o 3 años y no se puede cancelar; la startup no quiere comprometerse a ningún plazo."
      - label: "On-Demand Instances"
        explanation: "On-Demand cobra por hora o por segundo, sin pago inicial ni compromiso, y no se interrumpe: encaja con cargas cortas, nuevas e impredecibles."
        correct: true
      - label: "Dedicated Hosts"
        explanation: "Dedicated Hosts dan un servidor físico completo para licencias por socket o núcleo o cumplimiento, necesidades que este escenario no menciona."
  - prompt: "Una distribuidora de Santa Cruz ya decidió comprar Reserved Instances por 3 años, pero prevé que durante ese tiempo querrá cambiar a otra familia de instancias y otro sistema operativo. ¿Qué clase de RI debe comprar?"
    options:
      - label: "Convertible Reserved Instances"
        explanation: "Las Convertible se pueden intercambiar por otra Convertible con distinta familia, sistema operativo o tenencia, de igual o mayor valor y en la misma Región."
        correct: true
      - label: "Standard Reserved Instances"
        explanation: "Las Standard dan el mayor descuento, pero solo permiten modificar algunos atributos y no se pueden intercambiar por otra familia o sistema operativo."
      - label: "Spot Instances"
        explanation: "Spot no es una clase de Reserved Instance; es capacidad sobrante sin compromiso que puede interrumpirse."
      - label: "On-Demand Capacity Reservations"
        explanation: "Las Capacity Reservations garantizan capacidad en una AZ y no dan descuento por sí mismas; no son una clase de RI."
  - prompt: "Un hospital de Montevideo necesita garantizar capacidad de EC2 en una Availability Zone específica durante una semana de migración crítica, sin comprometerse a un plazo de 1 o 3 años. ¿Qué opción debe usar?"
    options:
      - label: "Reserved Instances regionales"
        explanation: "Una RI regional no reserva capacidad y además exige un compromiso de 1 o 3 años."
      - label: "Compute Savings Plans"
        explanation: "Compute Savings Plans dan un descuento a cambio de un compromiso de 1 o 3 años, pero no reservan capacidad en una AZ."
      - label: "Spot Instances"
        explanation: "Spot usa capacidad sobrante que AWS puede recuperar, justo lo contrario de capacidad garantizada."
      - label: "On-Demand Capacity Reservations"
        explanation: "Reservan capacidad de EC2 en una AZ específica por el tiempo que quieras, y las de uso inmediato no exigen compromiso de plazo."
        correct: true
  - prompt: "Una cooperativa de Cochabamba compró una Reserved Instance por 1 año para su servidor de contabilidad. ¿Qué pasa con la instancia cuando la RI vence?"
    options:
      - label: "La RI se renueva automáticamente por otro año"
        explanation: "Una RI no se renueva sola; si la cooperativa quiere el descuento de nuevo, debe comprar otra."
      - label: "La instancia sigue funcionando, pero a tarifa On-Demand"
        explanation: "Al vencer la RI, la instancia sigue funcionando y se cobra a tarifa On-Demand, porque la RI solo era un descuento de facturación."
        correct: true
      - label: "AWS detiene la instancia hasta que compres otra RI"
        explanation: "Una RI es un descuento de facturación, no el servidor; su vencimiento no detiene la instancia."
      - label: "La instancia pasa a cobrarse como Spot Instance"
        explanation: "Spot es otra opción de compra con capacidad interrumpible; una RI vencida no convierte la instancia en Spot."
  - prompt: "En una organización de AWS Organizations con facturación consolidada, la cuenta de finanzas compró Reserved Instances, y la cuenta de ventas ejecuta instancias que coinciden con sus atributos. Por defecto, ¿qué ocurre?"
    options:
      - label: "El descuento solo aplica a la cuenta de finanzas, que fue la que pagó"
        explanation: "Con facturación consolidada todas las cuentas se tratan como una sola para la facturación, así que el descuento no queda limitado a la cuenta compradora."
      - label: "La cuenta de ventas debe comprar sus propias RI para recibir descuento"
        explanation: "No hace falta duplicar la compra: el descuento de una RI se comparte por defecto entre las cuentas de la organización."
      - label: "El descuento de las RI puede aplicarse al uso de la cuenta de ventas"
        explanation: "La facturación consolidada trata a la organización como una sola cuenta, por eso el descuento puede aplicarse a instancias que coinciden en otra cuenta; la cuenta de administración puede desactivarlo."
        correct: true
      - label: "Las RI se convierten en Savings Plans para cubrir ambas cuentas"
        explanation: "Las RI y los Savings Plans son opciones de compra distintas; compartir descuentos no transforma una en la otra."
  - prompt: "Un equipo de Caracas compra una Reserved Instance con alcance regional para instancias Linux/Unix con tenencia por defecto. ¿Qué afirmación es correcta?"
    options:
      - label: "Reserva capacidad en todas las AZ de la Región"
        explanation: "Una RI regional no reserva capacidad; solo la RI zonal reserva capacidad, y únicamente en la AZ elegida."
      - label: "Cuesta más que la misma RI con alcance zonal"
        explanation: "El alcance no cambia el precio de la RI; regional y zonal cuestan lo mismo."
      - label: "Solo aplica al tamaño exacto de instancia que se compró"
        explanation: "Aplicar solo al tamaño exacto es propio de la RI zonal; la regional en Linux/Unix con tenencia por defecto cubre cualquier tamaño de la familia."
      - label: "El descuento aplica en cualquier AZ de la Región y a los distintos tamaños de la misma familia"
        explanation: "Una RI regional aplica su descuento en cualquier AZ de la Región y, en Linux/Unix con tenencia por defecto, a los distintos tamaños de la misma familia."
        correct: true
---

## ¿Por qué importa?

Una tienda en línea de Medellín usa servidores de **Amazon EC2** (servidores virtuales en la nube). Tiene un servidor web que funciona las 24 horas todo el año, un proceso nocturno que genera reportes y que puede repetirse si se interrumpe, y una campaña de Black Friday de tres días cuya demanda nadie puede predecir. Si paga todo con la misma modalidad, probablemente gasta de más.

AWS ofrece varias **opciones de compra** de EC2, y elegir bien según la carga es una habilidad clave del examen.

## On-Demand: flexibilidad total

Con **On-Demand Instances** pagas por hora o por segundo de uso, **sin pago inicial ni compromiso a largo plazo**. Es el precio de referencia para comparar descuentos.

Ideal para: cargas cortas, impredecibles o que no pueden interrumpirse, como la campaña de Black Friday.

## Savings Plans y Reserved Instances: descuento por compromiso

**Savings Plans:** te comprometes a un **monto constante de uso, medido en USD por hora**, durante **1 o 3 años**. AWS indica que puedes ahorrar **hasta un 72 %** frente a On-Demand. Hay cuatro tipos:

- **Compute Savings Plans:** los más flexibles (hasta 66 %). Aplican a EC2 sin importar familia, tamaño, sistema operativo, tenencia o Región, y también a **AWS Fargate** y **AWS Lambda**.
- **EC2 Instance Savings Plans:** hasta 72 %, a cambio de comprometerte con una familia de instancias en una Región.
- **Database Savings Plans** y **SageMaker AI Savings Plans:** para servicios de bases de datos y para Amazon SageMaker AI.

**Reserved Instances (RI):** no son instancias físicas, sino un **descuento de facturación** que se aplica a instancias que coinciden con ciertos atributos (tipo de instancia, Región, tenencia y plataforma). Se compran por **1 o 3 años**; el plazo de 3 años da más descuento, y en general pagar más por adelantado (*All Upfront*, *Partial Upfront* o *No Upfront*) ahorra más. Una RI **no se puede cancelar** y **no se renueva sola**: al vencer, la instancia sigue funcionando a tarifa On-Demand.

AWS **recomienda Savings Plans sobre Reserved Instances** porque ofrecen descuentos similares con más flexibilidad: con RI te comprometes a una configuración específica; con Savings Plans, a un monto de uso.

Ideal para: cargas estables y predecibles, como el servidor web que funciona todo el año.

## Flexibilidad de las Reserved Instances

El examen pregunta qué tan "flexible" es una RI. Hay dos ejes: la **clase de oferta** y el **alcance** (*scope*).

| Clase | Descuento | ¿Qué puedes cambiar? |
| --- | --- | --- |
| **Standard** | El mayor | Solo **modificar** algunos atributos; no se puede intercambiar. Puede venderse en el Reserved Instance Marketplace. |
| **Convertible** | Menor | Se puede **intercambiar** por otra Convertible con distinta familia, sistema operativo o tenencia, siempre de igual o mayor valor y en la misma Región. |

| Alcance | ¿Reserva capacidad? | Flexibilidad |
| --- | --- | --- |
| **Regional** | No | El descuento aplica en **cualquier AZ** de la Región y, en Linux/Unix con tenencia por defecto, a **cualquier tamaño** de la misma familia. |
| **Zonal** | **Sí**, en la AZ elegida | Solo aplica a esa AZ y a ese tamaño exacto. |

El alcance no cambia el precio de la RI.

## RI y Savings Plans en AWS Organizations

Con la **facturación consolidada** de **AWS Organizations**, todas las cuentas de la organización se tratan como **una sola cuenta para la facturación**. Por eso, el descuento de una RI o un Savings Plan comprado por una cuenta puede **aplicarse al uso de otra cuenta** de la organización que tenga instancias que coincidan. La cuenta de administración puede **desactivar el uso compartido** de descuentos desde la página *Preferences* de la consola de Billing and Cost Management.

## Spot Instances: capacidad sobrante con gran descuento

Las **Spot Instances** usan **capacidad sobrante de EC2** con un descuento de **hasta el 90 %** frente a On-Demand. A cambio, AWS puede **recuperar la instancia** cuando necesita esa capacidad, con un **aviso de interrupción dos minutos antes**.

Ideal para: cargas **tolerantes a interrupciones** o flexibles, como el proceso nocturno de reportes, CI/CD o pruebas.

## Opciones dedicadas y de capacidad

Ambas ejecutan tus instancias en **servidores físicos que no compartes con otros clientes**, sin diferencias de rendimiento ni de seguridad física.

| | **Dedicated Hosts** | **Dedicated Instances** |
| --- | --- | --- |
| Qué obtienes | Un servidor físico completo dedicado a ti | Hardware dedicado a una sola cuenta |
| Facturación | Por host | Por instancia |
| Visibilidad de sockets y núcleos | Sí | No |
| Control de ubicación y afinidad | Sí | No |
| Licencias propias (BYOL) por socket o núcleo | Sí | Soporte parcial |

**On-Demand Capacity Reservations** reservan capacidad de EC2 en una **Availability Zone específica** por el tiempo que quieras; las de uso inmediato no exigen compromiso de plazo. **No dan descuento** por sí mismas, pero puedes combinarlas con Savings Plans o RI regionales para obtenerlo.

## Comparación rápida

| Opción | Compromiso | Ahorro frente a On-Demand | ¿Puede interrumpirse? | Carga ideal |
| --- | --- | --- | --- | --- |
| **On-Demand** | Ninguno | Precio base | No | Corta, impredecible, nueva |
| **Savings Plans** | USD por hora, 1 o 3 años | Hasta 72 % | No | Uso constante con flexibilidad |
| **Reserved Instances** | Configuración, 1 o 3 años | Significativo | No | Uso estable de una configuración conocida |
| **Spot** | Ninguno | Hasta 90 % | Sí, aviso de 2 minutos | Tolerante a fallos, flexible |
| **Dedicated Hosts** | Opcional | — | No | Licencias por socket o núcleo, cumplimiento |
| **Capacity Reservations** | Opcional | Ninguno por sí solas | No | Capacidad garantizada para eventos críticos |

## Trampas típicas del examen

- **Elegir Spot para una carga crítica que no puede detenerse.** Spot puede interrumpirse; usa On-Demand, Savings Plans o RI.
- **Pensar que una Reserved Instance es un servidor.** Es un descuento de facturación aplicado a instancias que coinciden.
- **Confundir Dedicated Hosts con Dedicated Instances.** La pista de "licencias por socket o núcleo" o "visibilidad del servidor físico" apunta a **Dedicated Hosts**.
- **Creer que una RI regional reserva capacidad.** Solo la **zonal** reserva capacidad; para garantizar capacidad sin plazo, usa Capacity Reservations.
- **Pensar que el descuento de una RI solo sirve a la cuenta que la compró.** En una organización con facturación consolidada se comparte por defecto.
- **Confundir Standard con Convertible.** Convertible = intercambiable; Standard = mayor descuento, solo modificable.

## Resumen para el examen

- On-Demand: sin compromiso; corto plazo o impredecible.
- Savings Plans: compromiso en USD/hora por 1 o 3 años; hasta 72 %; recomendado por AWS; Compute Savings Plans cubren EC2, Fargate y Lambda.
- Reserved Instances: descuento de facturación por 1 o 3 años; no se cancelan ni se renuevan solas.
- Standard = más descuento, solo se modifica; Convertible = se intercambia.
- RI regional: flexible en AZ y tamaño, sin reserva de capacidad; RI zonal: reserva capacidad en una AZ.
- En AWS Organizations, los descuentos de RI y Savings Plans se comparten entre cuentas (se puede desactivar).
- Spot: hasta 90 %; interrumpible con aviso de 2 minutos.
- Dedicated Hosts: servidor físico propio, BYOL por socket o núcleo; Dedicated Instances: hardware dedicado sin esa visibilidad.
- Capacity Reservations: garantizan capacidad en una AZ, no descuento.
