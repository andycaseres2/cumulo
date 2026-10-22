import type { Mission } from '../../../domain/Mission';

/**
 * Tienda Andes: an outdoor gear shop in La Paz whose new online store must work with an inventory server that stays in the back room.
 * Practices the hybrid and on-premises deployment models, AWS Outposts, "private cloud" and how service and deployment models combine.
 */
export const serviceAndDeploymentModels2: Mission = {
  id: 'service-and-deployment-models-2',
  track: 'downtown',
  topicSlug: 'service-and-deployment-models',
  buildingId: 'store',
  title: 'Con un pie en la trastienda',
  client: { name: 'Mariela Choque', role: 'Dueña de la Tienda Andes' },
  intro: [
    '¡Pasa, pasa! Soy Mariela Choque, dueña de la Tienda Andes. Desde La Paz vendemos ropa y equipo de montaña a quienes suben al Huayna Potosí y al Illimani.',
    'Queremos abrir nuestra tienda en línea en AWS. El problema es el sistema de inventario: corre en un servidor de la trastienda y el proveedor que lo mantiene nos pidió un año más antes de moverlo.',
    'Además, las cajas de la tienda necesitan respuestas inmediatas, y aquí la conexión a internet a veces va lenta. Cada uno me da un consejo distinto: mi primo dice que armemos una "nube privada" en la trastienda.',
    'No quiero equivocarme con una decisión que nos va a durar años. ¿Me ayudas a ver dónde debe vivir cada cosa?',
  ],
  outro: {
    passed: [
      '¡Qué claridad! La tienda en línea en AWS, el inventario conectado desde la trastienda mientras tanto, y las cajas con respuestas rápidas aquí mismo.',
      'Y ya le puedo explicar a mi primo qué es eso de la nube privada. Gracias: cuando subas a la montaña, tu chamarra corre por cuenta de la casa.',
    ],
    failed: [
      'Mmm... todavía no me queda claro dónde debe vivir cada sistema. Algunas respuestas no me convencen.',
      'Repasa la teoría de los modelos de despliegue con calma y vuelve cuando quieras. La tienda te espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'inventory-stays',
      prompt:
        'Lo primero: la tienda en línea va a correr en AWS, pero el inventario seguirá un año más en el servidor de la trastienda, y la tienda en línea necesita consultarlo para saber qué hay en stock. ¿Qué modelo de despliegue tendremos?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['3.1'],
      options: [
        {
          id: 'cloud',
          label: 'Nube (cloud)',
          definition:
            'Modelo de despliegue en el que la aplicación está completamente desplegada en la nube y todas sus partes se ejecutan ahí.',
          explanation:
            'No todo estará en la nube: el inventario sigue en la trastienda y la tienda en línea depende de él durante un año más.',
          correct: false,
        },
        {
          id: 'many-services',
          label: 'Multiservicio: usar varios servicios de AWS a la vez',
          definition:
            'Combinar distintos servicios de AWS, como cómputo, almacenamiento y bases de datos, dentro de una misma solución.',
          explanation:
            'Usar varios servicios de AWS no define un modelo de despliegue. Lo que importa aquí es que una parte vive en la nube y otra en la trastienda.',
          correct: false,
        },
        {
          id: 'on-premises',
          label: 'On-premises',
          definition:
            'Modelo de despliegue en el que los recursos están en las instalaciones propias de la empresa, usando virtualización y herramientas de gestión.',
          explanation:
            'On-premises sería tener todo en la trastienda. La tienda en línea, en cambio, se va a ejecutar en AWS.',
          correct: false,
        },
        {
          id: 'hybrid',
          label: 'Híbrido (hybrid)',
          definition:
            'Modelo de despliegue que conecta recursos en la nube con infraestructura que no está en la nube, normalmente on-premises.',
          explanation:
            'La tienda en línea en AWS se conecta con el inventario que sigue en la trastienda. Unir la nube con infraestructura on-premises existente es el caso más común de despliegue híbrido.',
          correct: true,
        },
      ],
    },
    {
      id: 'checkout-latency',
      prompt:
        'Las cajas de la tienda necesitan respuestas en milisegundos y procesar los datos aquí mismo, sin que cada consulta tenga que viajar por internet. Pero quiero usar las mismas APIs y herramientas de AWS que en la tienda en línea. ¿Qué servicio lo permite?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['3.1'],
      options: [
        {
          id: 'ec2-region',
          label: 'Instancias de Amazon EC2 en una Región de AWS',
          definition:
            'Servidores virtuales que se ejecutan en los centros de datos de una Región de AWS y se rentan por el tiempo que se usan.',
          explanation:
            'Las instancias en una Región están fuera de la tienda: cada respuesta a las cajas tendría que viajar por internet, que es justo lo que Mariela quiere evitar.',
          correct: false,
        },
        {
          id: 'outposts',
          label: 'AWS Outposts',
          definition:
            'Servicio totalmente administrado que lleva infraestructura, servicios, APIs y herramientas de AWS a las instalaciones del cliente.',
          explanation:
            'Outposts pone capacidad de AWS dentro de las instalaciones para baja latencia y procesamiento local de datos, con las mismas APIs que en la nube. Es una pieza típica de un escenario híbrido, aunque necesita una conexión estable con su Región.',
          correct: true,
        },
        {
          id: 'beanstalk',
          label: 'AWS Elastic Beanstalk',
          definition:
            'Servicio en el que el cliente sube su aplicación y AWS aprovisiona las instancias EC2, el balanceo de carga, el monitoreo de salud y el escalado.',
          explanation:
            'Elastic Beanstalk facilita desplegar aplicaciones en AWS, pero no lleva infraestructura de AWS a la tienda para procesar los datos de las cajas en el local.',
          correct: false,
        },
        {
          id: 'route53',
          label: 'Amazon Route 53',
          definition:
            'Servicio de DNS que traduce nombres de dominio a direcciones IP y dirige a los usuarios hacia las aplicaciones.',
          explanation:
            'Route 53 ayuda a que los clientes encuentren la tienda en línea, pero no procesa datos dentro del local ni reduce la latencia de las cajas.',
          correct: false,
        },
      ],
    },
    {
      id: 'private-cloud',
      prompt:
        'Mi primo insiste: "compren servidores, virtualícenlos en la trastienda y tendrán su propia nube privada". ¿Qué sería exactamente eso?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['3.1'],
      options: [
        {
          id: 'on-premises-private',
          label: 'Un despliegue on-premises: recursos dedicados, pero sin muchos de los beneficios de la nube',
          definition:
            'Desplegar recursos en las instalaciones propias usando virtualización y herramientas de gestión; a veces se le llama nube privada.',
          explanation:
            'AWS describe así a la nube privada: da recursos dedicados en las instalaciones propias, pero no ofrece muchos de los beneficios de la nube, como el pago por uso o el alcance global.',
          correct: true,
        },
        {
          id: 'aws-private-service',
          label: 'Un servicio de AWS llamado "nube privada" que AWS opera en la trastienda',
          definition:
            'La idea de que "nube privada" es un producto de AWS que se contrata como cualquier otro servicio.',
          explanation:
            'La nube privada no es un servicio de AWS. Lo que describe el primo son servidores propios virtualizados, operados por la tienda.',
          correct: false,
        },
        {
          id: 'hybrid',
          label: 'Un despliegue híbrido',
          definition:
            'Modelo de despliegue que conecta recursos en la nube con infraestructura que no está en la nube, normalmente on-premises.',
          explanation:
            'En la propuesta del primo no hay ninguna parte en la nube: todo quedaría en la trastienda, así que no es híbrido.',
          correct: false,
        },
        {
          id: 'cloud',
          label: 'Un despliegue en la nube con todos sus beneficios',
          definition:
            'Modelo de despliegue en el que la aplicación está completamente desplegada en la nube y todas sus partes se ejecutan ahí.',
          explanation:
            'Virtualizar servidores propios no los convierte en la nube de AWS: la tienda seguiría comprando y manteniendo su hardware.',
          correct: false,
        },
      ],
    },
    {
      id: 'full-picture',
      prompt:
        'Para cerrar, quiero describir todo en una frase para el banco que nos presta. Nuestro programador sube el código de la tienda en línea a AWS Elastic Beanstalk, sin tocar servidores, y el inventario sigue conectado desde la trastienda. ¿Cómo lo describo?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'iaas-hybrid',
          label: 'IaaS con despliegue híbrido',
          definition:
            'Combinación de un modelo de servicio donde el cliente administra el sistema operativo con un despliegue que une la nube y las instalaciones propias.',
          explanation:
            'El despliegue sí es híbrido, pero el programador no administra servidores ni sistema operativo: solo sube su código, y eso no es IaaS.',
          correct: false,
        },
        {
          id: 'paas-cloud',
          label: 'PaaS con despliegue en la nube',
          definition:
            'Combinación de un modelo de servicio donde el cliente solo administra su aplicación con un despliegue donde todo se ejecuta en la nube.',
          explanation:
            'El modelo de servicio es PaaS, pero el inventario sigue en la trastienda, así que no todo se ejecuta en la nube.',
          correct: false,
        },
        {
          id: 'paas-hybrid',
          label: 'PaaS con despliegue híbrido',
          definition:
            'Combinación de un modelo de servicio donde el cliente solo administra su aplicación con un despliegue que une la nube y las instalaciones propias.',
          explanation:
            'Subir el código a Elastic Beanstalk es un enfoque PaaS, y conectar la nube con el inventario de la trastienda es un despliegue híbrido. Son ejes distintos que se combinan.',
          correct: true,
        },
        {
          id: 'saas-on-premises',
          label: 'SaaS con despliegue on-premises',
          definition:
            'Combinación de un modelo de servicio donde el cliente solo usa una aplicación terminada con un despliegue donde todo está en las instalaciones propias.',
          explanation:
            'La tienda despliega su propio código, así que no es SaaS, y la tienda en línea corre en AWS, así que no todo está on-premises.',
          correct: false,
        },
      ],
    },
  ],
};
