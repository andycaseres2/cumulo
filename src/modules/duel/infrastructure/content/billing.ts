import type { ServiceFamily } from '../../domain/ServiceFamily';

export const billingFamily: ServiceFamily = {
  id: 'billing',
  title: 'Costos, compras y soporte',
  summary:
    'Analizar y pronosticar el gasto, alertar al cruzar un umbral, bajar el detalle fino a S3, ajustar el tamaño de recursos, comprar software de terceros y elegir cuánta ayuda de AWS necesitas.',
  services: [
    { name: 'AWS Cost Explorer', summary: 'Gráficos de costos de hasta 13 meses atrás y pronóstico de los próximos 18 meses.' },
    { name: 'AWS Budgets', summary: 'Alertas cuando el costo, el uso o la cobertura de Savings Plans cruzan un umbral, real o pronosticado.' },
    { name: 'AWS Cost and Usage Reports', summary: 'El detalle más completo de costos y uso, por hora o recurso, entregado a tu bucket de S3.' },
    { name: 'AWS Compute Optimizer', summary: 'Recomienda el tamaño correcto de EC2, EBS, Lambda y más según su uso real, y señala recursos ociosos.' },
    { name: 'AWS Marketplace', summary: 'Catálogo curado de software, datos y servicios de terceros que se cobran en tu factura de AWS.' },
    { name: 'AWS Support', summary: 'Planes de soporte: Basic gratis, Business Support+, Enterprise con TAM y Unified Operations.' },
  ],
  cards: [
    {
      id: 'billing-1',
      prompt:
        'Una ONG de Quito tiene un tope de USD 500 al mes en AWS. Quiere un correo cuando el gasto del mes vaya camino a superar ese monto, antes de que ocurra. ¿Qué servicio configura?',
      options: [
        {
          service: 'AWS Budgets',
          why: 'Budgets crea un presupuesto de costo y avisa por correo o SNS cuando el gasto real o pronosticado supera el umbral.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer muestra y pronostica el gasto en gráficos, pero las alertas por umbral se configuran en otro servicio.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports entrega archivos detallados a S3; no envía alertas cuando se acerca un tope.',
        },
      ],
      answer: 'AWS Budgets',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-2',
      prompt:
        'El gerente de una distribuidora de Barranquilla quiere ver en gráficos cuánto gastó por servicio los últimos seis meses y cuánto gastará probablemente el próximo trimestre. ¿Qué usa?',
      options: [
        {
          service: 'AWS Budgets',
          why: 'Budgets vigila un umbral y alerta; no es la herramienta para explorar el gasto pasado por servicio.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer muestra hasta 13 meses de historia filtrada por servicio y pronostica el gasto de los próximos 18 meses.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports da archivos crudos para procesar tú; no trae gráficos ni pronóstico listos.',
        },
      ],
      answer: 'AWS Cost Explorer',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-3',
      prompt:
        'El área de finanzas de un banco de La Paz quiere cada línea de cobro, por hora y por recurso, entregada en su propio bucket para consultarla con Athena. ¿Qué servicio la entrega?',
      options: [
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer ofrece vistas y descargas en CSV, pero el detalle más completo entregado a tu bucket es de otro servicio.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets sigue montos y alerta; no exporta cada línea de cobro a S3.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports publica el conjunto de datos de costo más completo, por hora o recurso, en tu bucket y se integra con Athena.',
        },
      ],
      answer: 'AWS Cost and Usage Reports',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-4',
      prompt:
        'Una agencia de marketing de Córdoba sospecha que sus funciones Lambda tienen demasiada memoria y sus volúmenes EBS están sobredimensionados. Quiere recomendaciones según el uso real. ¿Qué usa?',
      options: [
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer analiza métricas de uso y recomienda el tamaño correcto de Lambda, EBS, EC2 y otros recursos.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer muestra cuánto gastas, pero las recomendaciones de memoria de Lambda y tamaño de EBS son de otro servicio.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets alerta cuando el gasto cruza un umbral; no dice qué recurso achicar.',
        },
      ],
      answer: 'AWS Compute Optimizer',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-5',
      prompt:
        'Una cadena de hoteles de Punta Cana quiere comprar un firewall de un fabricante conocido, desplegarlo con unos clics como AMI y pagarlo en la misma factura de AWS. ¿Dónde lo consigue?',
      options: [
        {
          service: 'AWS Support',
          why: 'AWS Support da ayuda técnica y de facturación; no vende software de otros fabricantes.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer recomienda tamaños de recursos; no es un catálogo de software.',
        },
        {
          service: 'AWS Marketplace',
          why: 'Marketplace es un catálogo curado de software de terceros, en AMI o SaaS, cuyo cobro aparece en tu factura de AWS.',
        },
      ],
      answer: 'AWS Marketplace',
      topicSlug: 'technical-resources-and-partners',
    },
    {
      id: 'billing-6',
      prompt:
        'Una fintech de Lima pasa su app a producción. Quiere hablar con ingenieros de AWS a cualquier hora por teléfono o chat, y respuesta en menos de una hora si producción se cae. ¿Qué contrata?',
      options: [
        {
          service: 'AWS Marketplace',
          why: 'En Marketplace hay servicios de terceros, pero el acceso 24/7 a ingenieros de AWS viene de otro lado.',
        },
        {
          service: 'AWS Support',
          why: 'Business Support+, el mínimo recomendado para producción, da acceso 24/7 y respuesta en menos de una hora si producción cae.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets controla el gasto con alertas; no ofrece ayuda técnica.',
        },
      ],
      answer: 'AWS Support',
      topicSlug: 'support-plans',
    },
    {
      id: 'billing-7',
      prompt:
        'Un instituto de Bogotá deja que sus estudiantes practiquen en una cuenta de AWS. Al llegar al 90 % del monto mensual, quiere aplicar sola una política que impida crear más recursos. ¿Qué usa?',
      options: [
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer analiza el gasto; no ejecuta acciones cuando se llega a un porcentaje.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer recomienda tamaños; no reacciona al gasto con acciones automáticas.',
        },
        {
          service: 'AWS Budgets',
          why: 'Las acciones de Budgets aplican, por ejemplo, una política de IAM que niega crear recursos al cruzar el umbral.',
        },
      ],
      answer: 'AWS Budgets',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-8',
      prompt:
        'Una empresa de software de Monterrey compró Savings Plans. Quiere que le avisen el día en que su utilización baje del 80 %, para no pagar compromiso que no usa. ¿Qué servicio lo hace?',
      options: [
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports trae columnas de Savings Plans, pero no avisa cuando baja la utilización.',
        },
        {
          service: 'AWS Budgets',
          why: 'Un presupuesto de utilización de Savings Plans en Budgets notifica cuando el uso baja del porcentaje que fijes.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer muestra reportes de utilización, pero la notificación por umbral se configura en otro servicio.',
        },
      ],
      answer: 'AWS Budgets',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-9',
      prompt:
        'Una constructora de Santa Cruz etiqueta sus recursos con "proyecto". Quiere ver en la consola, sin programar nada, qué proyecto gastó más el trimestre pasado. ¿Qué herramienta abre?',
      options: [
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer agrupa y filtra el gasto por etiqueta de asignación de costos y lo muestra en gráficos listos.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports también tiene las etiquetas, pero en archivos que tendrías que procesar con otras herramientas.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets puede seguir el gasto de una etiqueta contra un monto, pero no es para comparar proyectos en el pasado.',
        },
      ],
      answer: 'AWS Cost Explorer',
      topicSlug: 'consolidated-billing-and-tags',
    },
    {
      id: 'billing-10',
      prompt:
        'El equipo de datos de una aerolínea regional de Panamá quiere armar su propio tablero de costos en Amazon Quick Sight con el detalle más fino de su facturación. ¿De qué servicio saca los datos?',
      options: [
        {
          service: 'AWS Marketplace',
          why: 'Marketplace vende software y datos de terceros; no exporta tu propia facturación.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer ya trae sus propios gráficos, pero el conjunto completo y granular para tus tableros es otro servicio.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports entrega el detalle más completo a S3 y se puede preparar para Quick, Athena o Redshift.',
        },
      ],
      answer: 'AWS Cost and Usage Reports',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-11',
      prompt:
        'Una plataforma educativa de Caracas corre servicios de ECS en Fargate y grupos de Auto Scaling. Quiere saber si su CPU y memoria están bien dimensionadas según los últimos 14 días de uso.',
      options: [
        {
          service: 'AWS Budgets',
          why: 'Budgets avisa sobre montos y uso contra un umbral; no analiza si un recurso está bien dimensionado.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer analiza 14 días de métricas por defecto y recomienda tamaños para Fargate, Auto Scaling, EC2 y más.',
        },
        {
          service: 'AWS Marketplace',
          why: 'Marketplace es un catálogo de software de terceros; no revisa tus recursos.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer muestra cuánto cuestan esos recursos, pero el análisis de dimensionamiento por uso es de otro servicio.',
        },
      ],
      answer: 'AWS Compute Optimizer',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-12',
      prompt:
        'Una cadena de supermercados de Asunción negoció con un proveedor de BI una oferta privada con precio especial. Quiere aceptarla en AWS y que el cobro llegue en la factura de AWS. ¿Dónde lo hace?',
      options: [
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports mostraría ese cobro después, pero no es donde se compra ni se acepta la oferta.',
        },
        {
          service: 'AWS Marketplace',
          why: 'Marketplace permite aceptar ofertas privadas con precio y contrato propios, y AWS cobra en tu factura y paga al vendedor.',
        },
        {
          service: 'AWS Support',
          why: 'AWS Support no vende licencias de terceros; da ayuda técnica y de cuenta.',
        },
      ],
      answer: 'AWS Marketplace',
      topicSlug: 'technical-resources-and-partners',
    },
    {
      id: 'billing-13',
      prompt:
        'Un banco de San Salvador corre cargas críticas y quiere un Technical Account Manager designado que conozca su cuenta y respuesta en menos de 15 minutos si un sistema crítico cae. ¿Qué contrata?',
      options: [
        {
          service: 'AWS Marketplace',
          why: 'Marketplace ofrece software y servicios de terceros; no asigna un TAM de AWS.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer da recomendaciones automáticas de tamaño; no es atención de personas.',
        },
        {
          service: 'AWS Support',
          why: 'El plan Enterprise de AWS Support incluye TAM designado y respuesta en menos de 15 minutos en caídas críticas.',
        },
      ],
      answer: 'AWS Support',
      topicSlug: 'support-plans',
    },
  ],
};
