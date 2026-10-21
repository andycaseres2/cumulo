---
title: "Elasticidad: Auto Scaling y Elastic Load Balancing"
summary: "Cómo Amazon EC2 Auto Scaling y AWS Auto Scaling aportan elasticidad y para qué sirven los balanceadores de Elastic Load Balancing (ALB, NLB y GWLB)."
domain: "technology-services"
order: 4
examTasks: ["3.3"]
services: ["AWS Auto Scaling", "Amazon EC2 Auto Scaling", "Elastic Load Balancing", "Amazon EC2"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"
  - "https://docs.aws.amazon.com/autoscaling/plans/userguide/what-is-a-scaling-plan.html"
  - "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html"
  - "https://aws.amazon.com/elasticloadbalancing/features/"
  - "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html"
  - "https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html"
  - "https://wa.aws.amazon.com/wellarchitected/2020-07-02T19-33-23/wat.concept.elasticity.en.html"
---

## ¿Por qué importa?

Una tienda en línea de Ciudad de México recibe poco tráfico de madrugada, tráfico moderado durante el día y una avalancha de visitas en el Buen Fin. Si compra servidores para el pico, paga capacidad ociosa el resto del año; si compra para el promedio, la tienda se cae justo cuando más vende.

La nube resuelve esto con **elasticidad**: agregar servidores cuando la demanda sube, quitarlos cuando baja, y repartir el tráfico entre ellos de forma automática. Las piezas clave son **Auto Scaling** y **Elastic Load Balancing**.

## Elasticidad vs escalabilidad

- **Elasticidad:** la capacidad de **adquirir recursos cuando los necesitas y liberarlos cuando ya no los necesitas**, idealmente de forma automática. Tiene dos direcciones: crecer y también reducirse.
- **Escalabilidad:** la capacidad de un sistema de **crecer** para atender más carga. Puede ser:
  - **Horizontal** (*scale out / scale in*): agregar o quitar instancias.
  - **Vertical** (*scale up / scale down*): darle más o menos capacidad a una misma instancia (por ejemplo, cambiar a un tipo de instancia más grande).

Un sistema escalable puede crecer; un sistema **elástico** además se ajusta automáticamente a la demanda en ambas direcciones, y eso evita pagar por capacidad ociosa.

## Amazon EC2 Auto Scaling

**Amazon EC2 Auto Scaling** ayuda a tener el **número correcto de instancias EC2** para atender la carga de tu aplicación. Las instancias se organizan en **grupos de Auto Scaling** (*Auto Scaling groups*) que se tratan como una unidad lógica:

- **Capacidad mínima:** el grupo nunca baja de este número de instancias.
- **Capacidad máxima:** el grupo nunca supera este número.
- **Capacidad deseada:** el número de instancias que el grupo debe mantener en cada momento.
- **Políticas de escalado** (*scaling policies*): reglas que lanzan o terminan instancias a medida que la demanda sube o baja, siempre entre el mínimo y el máximo.

Además:

- **Monitorea la salud** de las instancias mediante *health checks* y **reemplaza** automáticamente las que fallan o se terminan, para mantener la capacidad deseada.
- **Reparte las instancias entre varias Availability Zones**, lo que aporta alta disponibilidad.
- Se integra con Elastic Load Balancing: registra en el balanceador las instancias nuevas y retira las que se terminan.
- No tiene costo adicional: solo pagas los recursos que usas (instancias, volúmenes, alarmas).

### AWS Auto Scaling

**AWS Auto Scaling** permite configurar el escalado de **varios recursos relacionados** de una aplicación desde un solo lugar mediante **planes de escalado** (*scaling plans*). Además de grupos de EC2 Auto Scaling, puede ajustar la cantidad de tareas de Amazon ECS, la capacidad de lectura y escritura de tablas de Amazon DynamoDB, las réplicas de lectura de Amazon Aurora y las Spot Fleets. Ofrece descubrimiento de recursos escalables y recomendaciones de escalado.

Resumen: **EC2 Auto Scaling** se enfoca en instancias EC2; **AWS Auto Scaling** coordina el escalado de varios servicios.

## Elastic Load Balancing

Un **balanceador de carga** (*load balancer*) distribuye las solicitudes entrantes entre varios recursos de cómputo. Sus propósitos:

- **Repartir el tráfico** entre varios destinos (instancias EC2, contenedores, direcciones IP) en una o más Availability Zones.
- **Aumentar la disponibilidad y la tolerancia a fallas**: con *health checks* detecta destinos no saludables y solo envía tráfico a los saludables.
- **Permitir agregar o quitar servidores** sin interrumpir el flujo de solicitudes, algo esencial cuando Auto Scaling cambia el número de instancias.
- **Descargar el cifrado y descifrado** (TLS/HTTPS) para que los servidores se concentren en su trabajo.

**Elastic Load Balancing (ELB)** escala automáticamente la capacidad del balanceador según el tráfico entrante. Tipos actuales:

| Tipo | Capa | Cuándo usarlo |
| --- | --- | --- |
| **Application Load Balancer (ALB)** | Capa 7 (aplicación: HTTP/HTTPS) | Aplicaciones web que necesitan enrutamiento flexible, por ejemplo según la ruta o el contenido de la solicitud |
| **Network Load Balancer (NLB)** | Capa 4 (transporte: TCP/UDP) | Rendimiento extremo o necesidad de una dirección IP estática |
| **Gateway Load Balancer (GWLB)** | Gateway de capa 3 + balanceo de capa 4 | Desplegar y escalar appliances virtuales, como firewalls, sistemas de detección y prevención de intrusos o de inspección profunda de paquetes |

El **Classic Load Balancer** es la generación anterior; AWS recomienda migrar a un balanceador de la generación actual.

## Cómo trabajan juntos

Un diseño típico de alta disponibilidad: un **ALB** recibe el tráfico de los usuarios y lo reparte entre instancias EC2 de un **grupo de Auto Scaling** que abarca **varias AZ**. Si la demanda sube, Auto Scaling agrega instancias y el balanceador empieza a enviarles tráfico; si una instancia falla, el balanceador deja de enviarle solicitudes y Auto Scaling la reemplaza.

## Trampas típicas del examen

- **Pensar que el balanceador agrega servidores.** ELB **reparte** el tráfico; quien agrega o quita instancias es **Auto Scaling**.
- **Confundir elasticidad con alta disponibilidad.** Elasticidad = ajustar capacidad a la demanda; alta disponibilidad = seguir funcionando ante fallas (varias AZ). Auto Scaling ayuda con ambas.
- **Elegir NLB para enrutar por ruta de URL.** El enrutamiento basado en contenido HTTP es propio del **ALB** (capa 7).
- **Olvidar el escalado hacia abajo.** La elasticidad también implica **liberar** recursos para no pagar capacidad ociosa.
- **Creer que Auto Scaling tiene costo propio.** No hay cargo adicional por EC2 Auto Scaling; pagas los recursos que lanza.

## Resumen para el examen

- Elasticidad = adquirir y liberar recursos según la demanda, automáticamente.
- Horizontal = más o menos instancias; vertical = instancias más grandes o más pequeñas.
- EC2 Auto Scaling: grupos con capacidad mínima, máxima y deseada, y políticas de escalado.
- Auto Scaling reemplaza instancias no saludables y las reparte entre varias AZ.
- AWS Auto Scaling coordina el escalado de EC2, ECS, DynamoDB, réplicas de Aurora y Spot Fleets.
- ELB reparte el tráfico, revisa la salud de los destinos y mejora la disponibilidad.
- ALB = capa 7 (HTTP/HTTPS); NLB = capa 4, rendimiento extremo e IP estática; GWLB = appliances de red.
- Auto Scaling + ELB en varias AZ = diseño elástico y altamente disponible.
