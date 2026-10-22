import type { Mission } from '../../../domain/Mission';

/**
 * Seguros Horizonte: an insurance company in Panama City deciding whether to renew its data center or move to AWS.
 * Practices fixed versus variable costs (CapEx and OpEx), on-premises TCO, BYOL versus license included, and AWS License Manager.
 */
export const cloudEconomics1: Mission = {
  id: 'cloud-economics-1',
  track: 'downtown',
  topicSlug: 'cloud-economics',
  buildingId: 'insurance-office',
  title: 'La póliza del centro de datos',
  client: { name: 'Gabriela Moreno', role: 'Directora financiera de Seguros Horizonte' },
  intro: [
    'Buenos días. Soy Gabriela Moreno, directora financiera de Seguros Horizonte. Desde Ciudad de Panamá aseguramos autos, casas y negocios en todo el país.',
    'Nuestros servidores cumplen cinco años y el proveedor nos ofrece renovarlos con un pago enorme por adelantado. El área de sistemas, en cambio, propone mudarnos a AWS.',
    'Yo tengo que llevarle al directorio una comparación seria. Pero el jefe de sistemas solo comparó el precio de los servidores con la factura de AWS, y además ya pagamos licencias de Oracle que no quiero tirar a la basura.',
    'Como aseguradora, odio los riesgos que no están calculados. ¿Me ayudas a armar los números bien?',
  ],
  outro: {
    passed: [
      'Perfecto. Ahora el directorio va a ver el costo total del centro de datos, no solo los servidores, y cómo pasamos de un gasto fijo a uno que sigue nuestro uso real.',
      'Y nuestras licencias de Oracle siguen trabajando para nosotros, bajo control. Gracias: este análisis tiene la mejor cobertura que he visto.',
    ],
    failed: [
      'Mmm... con estos números no me atrevo a presentarme ante el directorio. Hay riesgos sin calcular.',
      'Repasa la teoría de la economía de la nube con calma y vuelve cuando quieras. La oferta de la renovación puede esperar un poco.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'expense-type',
      prompt:
        'Empecemos por la contabilidad. Hoy compramos servidores con un pago grande por adelantado, pensando en el momento de mayor demanda. ¿Cómo cambia ese gasto si nos mudamos a AWS?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'capex-to-opex',
          label: 'Pasa de un gasto de capital fijo (CapEx) a un gasto operativo variable (OpEx)',
          definition:
            'Cambio de invertir por adelantado en equipos físicos a pagar a medida que se consumen los recursos.',
          explanation:
            'En la nube, Seguros Horizonte deja de comprar equipos para el pico de demanda y paga solo cuando consume recursos y solo por lo que consume.',
          correct: true,
        },
        {
          id: 'opex-to-capex',
          label: 'Pasa de un gasto operativo (OpEx) a un gasto de capital (CapEx)',
          definition:
            'Cambio de pagar por consumo a invertir por adelantado en bienes físicos que se usan durante años.',
          explanation:
            'Es al revés: comprar servidores ya es un gasto de capital. La nube lo convierte en un gasto operativo que sigue al consumo.',
          correct: false,
        },
        {
          id: 'no-cost',
          label: 'El gasto desaparece, porque AWS se encarga de la infraestructura',
          definition:
            'La idea de que mudarse a la nube elimina todos los costos de tecnología de la empresa.',
          explanation:
            'La nube no hace desaparecer el gasto: cambia su tipo. La aseguradora seguirá pagando, pero según su uso real.',
          correct: false,
        },
        {
          id: 'same-fixed',
          label: 'Sigue siendo un gasto fijo, solo que pagado a AWS en vez de al proveedor',
          definition:
            'La idea de que la nube cobra una cuota fija por la capacidad máxima, igual que una compra de equipos.',
          explanation:
            'En AWS el costo sube o baja según el consumo; los recursos ociosos se pueden apagar y dejar de pagar sus horas de cómputo.',
          correct: false,
        },
      ],
    },
    {
      id: 'tco',
      prompt:
        'Ahora el error del jefe de sistemas: comparó solo el precio de los servidores con la factura de AWS. Para un análisis de costo total de propiedad (TCO) del centro de datos, ¿qué debemos sumar?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'servers-only',
          label: 'Solo el precio de los servidores nuevos',
          definition:
            'Comparar únicamente el costo de compra del hardware de cómputo con el costo de la nube.',
          explanation:
            'Es la trampa en la que cayó el jefe de sistemas: un centro de datos propio cuesta mucho más que el hardware.',
          correct: false,
        },
        {
          id: 'servers-and-licenses',
          label: 'Los servidores y las licencias de software, nada más',
          definition:
            'Comparar el costo del hardware y del software licenciado, sin incluir los costos de las instalaciones ni del personal.',
          explanation:
            'Faltan la energía, la refrigeración, el espacio físico y el personal que instala, mantiene y repara los equipos.',
          correct: false,
        },
        {
          id: 'full-tco',
          label: 'Hardware, licencias, energía, refrigeración, espacio físico y personal',
          definition:
            'Suma de todo lo que cuesta tener infraestructura propia durante su vida útil, incluido su reemplazo periódico.',
          explanation:
            'Un análisis de TCO honesto incluye todos esos costos. Así la comparación con AWS refleja lo que realmente cuesta el centro de datos de la aseguradora.',
          correct: true,
        },
        {
          id: 'electricity-only',
          label: 'Solo la factura de electricidad, porque el hardware ya está pagado',
          definition:
            'Comparar únicamente el consumo eléctrico del centro de datos con el costo de la nube.',
          explanation:
            'Los servidores actuales cumplen cinco años y hay que reemplazarlos. Además faltan licencias, refrigeración, espacio y personal.',
          correct: false,
        },
      ],
    },
    {
      id: 'oracle-licenses',
      prompt:
        'Tenemos licencias de Oracle pagadas y vigentes. Vamos a usar Amazon RDS for Oracle y no quiero pagar dos veces por lo mismo. ¿Qué modelo de licencia nos conviene?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'license-included',
          label: 'License included: la licencia va dentro del precio del servicio',
          definition:
            'Modelo en el que AWS tiene la licencia del software y su costo va incluido en el precio del servicio.',
          explanation:
            'La licencia incluida conviene cuando no se tienen licencias. Seguros Horizonte ya las pagó, así que estaría pagando dos veces.',
          correct: false,
        },
        {
          id: 'switch-engine',
          label: 'Reescribir las aplicaciones para Amazon DynamoDB y olvidarse de Oracle',
          definition:
            'Amazon DynamoDB es una base de datos NoSQL de clave-valor totalmente administrada.',
          explanation:
            'Cambiar de motor obliga a reescribir las aplicaciones y deja sin uso las licencias que Gabriela quiere aprovechar.',
          correct: false,
        },
        {
          id: 'new-licenses',
          label: 'Comprar un juego nuevo de licencias de Oracle solo para la nube',
          definition:
            'Adquirir al fabricante un segundo conjunto de licencias para usarlo únicamente con los recursos en AWS.',
          explanation:
            'Comprar licencias nuevas es justo lo que Gabriela quiere evitar: ya tiene licencias vigentes que puede reutilizar.',
          correct: false,
        },
        {
          id: 'byol',
          label: 'BYOL (Bring Your Own License): reutilizar las licencias que ya tienen',
          definition:
            'Modelo en el que el cliente reutiliza en AWS las licencias de software que ya compró, cumpliendo las reglas del fabricante.',
          explanation:
            'Con BYOL la aseguradora aprovecha sus licencias vigentes. Debe cumplir las reglas de Oracle: por ejemplo, en un despliegue Multi-AZ necesita licencia para la instancia principal y para la de respaldo.',
          correct: true,
        },
      ],
    },
    {
      id: 'license-control',
      prompt:
        'Último punto: con BYOL, no quiero que alguien use más licencias de las que tenemos y nos multen en una auditoría del fabricante. ¿Qué servicio nos ayuda a administrarlas y a poner límites?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'Herramienta web para estimar el costo de una arquitectura en AWS antes de desplegarla.',
          explanation:
            'La calculadora estima precios, pero no lleva la cuenta de las licencias en uso ni evita que se excedan.',
          correct: false,
        },
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'Servicio para administrar licencias de fabricantes como Microsoft, SAP, Oracle e IBM entre cuentas y Regiones.',
          explanation:
            'License Manager permite definir reglas con límites para evitar excesos de uso y el incumplimiento, y ofrece paneles útiles para las auditorías.',
          correct: true,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar informes de cumplimiento de AWS, como SOC, PCI e ISO, y gestionar acuerdos.',
          explanation:
            'Artifact da informes sobre el cumplimiento de AWS, pero no controla cuántas licencias de Oracle usa la aseguradora.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'AWS Compute Optimizer',
          definition:
            'Servicio que analiza la configuración y las métricas de uso de los recursos para recomendar su tamaño e identificar recursos ociosos.',
          explanation:
            'Compute Optimizer ayuda a dimensionar los recursos, pero no administra licencias ni pone límites a su uso.',
          correct: false,
        },
      ],
    },
  ],
};
