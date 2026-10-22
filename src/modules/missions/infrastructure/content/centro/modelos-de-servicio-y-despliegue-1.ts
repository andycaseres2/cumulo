import type { Mission } from '../../../domain/Mission';

/**
 * Agencia de Viajes Rumbo: a travel agency in Cartagena moving its booking website, email and accounting system to AWS.
 * Practices the service models (IaaS, PaaS with AWS Elastic Beanstalk, SaaS) and the cloud deployment model.
 */
export const modelosDeServicioYDespliegue1: Mission = {
  id: 'modelos-de-servicio-y-despliegue-1',
  track: 'centro',
  topicSlug: 'modelos-de-servicio-y-despliegue',
  buildingId: 'agencia-rumbo',
  title: 'Tres sistemas, tres caminos',
  client: { name: 'Lucía Restrepo', role: 'Gerente de operaciones de la Agencia de Viajes Rumbo' },
  intro: [
    '¡Te damos la bienvenida a Rumbo! Soy Lucía Restrepo, gerente de operaciones. Somos una agencia de viajes de Cartagena: vendemos paquetes a las islas del Rosario, a la Ciudad Amurallada y a medio Caribe.',
    'Toda nuestra tecnología vive en un servidor viejo, en el cuarto de atrás de la oficina: la web de reservas que programó Julián, el correo de los veinte agentes y un sistema contable antiguo.',
    'Ese servidor ya se apagó dos veces en temporada alta, y cada vez perdimos reservas. Decidimos pasarnos a la nube, pero en las reuniones todos hablan de IaaS, PaaS y SaaS y yo no sé qué elegir para cada cosa.',
    'Necesito decidir esta semana qué camino toma cada sistema. ¿Me ayudas a ordenarlo?',
  ],
  outro: {
    passed: [
      '¡Ahora lo entiendo! Julián sube su código sin preocuparse por los servidores, los agentes solo usan su correo y el sistema contable tiene el control que necesita.',
      'Y con todo en la nube, el cuarto de atrás por fin va a ser una sala de reuniones. Gracias: el próximo viaje a las islas corre por cuenta de la agencia.',
    ],
    failed: [
      'Mmm... no estoy segura de que estas decisiones sean las correctas para cada sistema.',
      'Repasa la teoría de los modelos de servicio y despliegue y vuelve cuando quieras. Aquí te espero con un jugo de corozo.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'booking-website',
      prompt:
        'Empecemos por la web de reservas. Julián la programó él mismo y quiere seguir mejorándola, pero no quiere parchar sistemas operativos ni configurar balanceadores: solo subir su código. ¿Qué modelo le conviene?',
      topicSlug: 'modelos-de-servicio-y-despliegue',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'iaas-ec2',
          label: 'IaaS, rentando servidores en Amazon EC2 que Julián administra',
          definition:
            'Modelo de servicio que entrega los bloques básicos de la TI (cómputo, red y almacenamiento), donde el cliente instala y actualiza el sistema operativo.',
          explanation:
            'Con IaaS, Julián seguiría parchando el sistema operativo y configurando todo, justo lo que quiere evitar. Le daría más control del que necesita.',
          correct: false,
        },
        {
          id: 'saas-booking',
          label: 'SaaS, contratando un software de reservas terminado',
          definition:
            'Modelo de servicio en el que el proveedor entrega una aplicación completa que él mismo ejecuta y administra, y el cliente solo la usa.',
          explanation:
            'Con SaaS la agencia usaría la aplicación de otro y dejaría atrás la web que Julián programó. Lucía quiere conservar y mejorar su propio código.',
          correct: false,
        },
        {
          id: 'paas-beanstalk',
          label: 'PaaS, subiendo el código a AWS Elastic Beanstalk',
          definition:
            'Modelo de servicio en el que el proveedor administra la infraestructura y el sistema operativo, y el cliente despliega y administra su aplicación.',
          explanation:
            'Julián sube su aplicación y Elastic Beanstalk aprovisiona las instancias EC2, el balanceo de carga, el monitoreo de salud y el escalado. Él se concentra en el código.',
          correct: true,
        },
        {
          id: 'on-premises',
          label: 'Dejar la web en un servidor nuevo dentro de la oficina',
          definition:
            'Desplegar recursos en las instalaciones propias de la empresa, en un centro de datos o sala de servidores que ella misma opera.',
          explanation:
            'Un servidor nuevo en la oficina obliga a Julián a seguir administrando hardware y sistema operativo, y no aprovecha los beneficios de la nube.',
          correct: false,
        },
      ],
    },
    {
      id: 'team-email',
      prompt:
        'Ahora el correo. Los veinte agentes solo necesitan enviar y recibir mensajes desde el navegador. No queremos instalar, configurar ni actualizar nada. ¿Qué modelo es ese?',
      topicSlug: 'modelos-de-servicio-y-despliegue',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'saas-email',
          label: 'SaaS: un servicio de correo web listo para usar',
          definition:
            'Modelo de servicio en el que el proveedor entrega una aplicación completa que él mismo ejecuta y administra, y el cliente solo la usa.',
          explanation:
            'Los agentes solo usan el producto: no hay código propio que desplegar ni servidores que cuidar. El correo basado en web es un ejemplo común de SaaS.',
          correct: true,
        },
        {
          id: 'paas-email',
          label: 'PaaS: programar un sistema de correo y subirlo a una plataforma',
          definition:
            'Modelo de servicio en el que el proveedor administra la infraestructura y el sistema operativo, y el cliente despliega y administra su aplicación.',
          explanation:
            'PaaS sirve cuando hay una aplicación propia que desplegar. Programar un correo desde cero sería mucho trabajo para algo que la agencia solo necesita usar.',
          correct: false,
        },
        {
          id: 'iaas-email',
          label: 'IaaS: instalar un servidor de correo en una instancia de Amazon EC2',
          definition:
            'Modelo de servicio que entrega los bloques básicos de la TI (cómputo, red y almacenamiento), donde el cliente instala y actualiza el sistema operativo.',
          explanation:
            'Con IaaS la agencia tendría que instalar, parchar y mantener el servidor de correo, lo contrario de lo que pide Lucía.',
          correct: false,
        },
        {
          id: 'hybrid-email',
          label: 'Un despliegue híbrido del correo',
          definition:
            'Modelo de despliegue que conecta recursos en la nube con infraestructura que no está en la nube, normalmente on-premises.',
          explanation:
            'Híbrido describe dónde viven los sistemas, no cuánto administra la agencia. La pregunta de Lucía es qué modelo de servicio le evita administrar el correo.',
          correct: false,
        },
      ],
    },
    {
      id: 'accounting-system',
      prompt:
        'El sistema contable es otra historia. Es antiguo, necesita una versión específica del sistema operativo y que nuestro técnico configure el servidor a mano. Necesitamos el mayor control posible. ¿Qué modelo elegimos?',
      topicSlug: 'modelos-de-servicio-y-despliegue',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'saas-accounting',
          label: 'SaaS, porque el proveedor se encarga de todo',
          definition:
            'Modelo de servicio en el que el proveedor entrega una aplicación completa que él mismo ejecuta y administra, y el cliente solo la usa.',
          explanation:
            'SaaS da el mínimo control: el proveedor decide cómo se ejecuta la aplicación. El sistema contable necesita lo contrario.',
          correct: false,
        },
        {
          id: 'paas-accounting',
          label: 'PaaS, porque da más control que IaaS',
          definition:
            'Modelo de servicio en el que el proveedor administra la infraestructura y el sistema operativo, y el cliente despliega y administra su aplicación.',
          explanation:
            'Es una confusión frecuente: PaaS da un control medio, porque el proveedor administra el sistema operativo. El técnico no podría configurarlo a su manera.',
          correct: false,
        },
        {
          id: 'private-cloud-service',
          label: 'Contratar el servicio de "nube privada" de AWS',
          definition:
            'Expresión con la que a veces se describe un despliegue on-premises que usa virtualización y herramientas de gestión en las instalaciones propias.',
          explanation:
            'La nube privada no es un modelo de servicio de AWS: es otra forma de llamar al despliegue on-premises. No responde cuánto control da el servicio.',
          correct: false,
        },
        {
          id: 'iaas-accounting',
          label: 'IaaS, con instancias de Amazon EC2 donde el técnico administra el sistema operativo',
          definition:
            'Modelo de servicio que entrega los bloques básicos de la TI (cómputo, red y almacenamiento), donde el cliente instala y actualiza el sistema operativo.',
          explanation:
            'IaaS ofrece la mayor flexibilidad y control: en Amazon EC2 el técnico elige y configura el sistema operativo que el sistema contable necesita.',
          correct: true,
        },
      ],
    },
    {
      id: 'deployment-model',
      prompt:
        'Última pregunta. Si la web, el correo y el sistema contable se ejecutan completamente en la nube y apagamos para siempre el servidor del cuarto de atrás, ¿qué modelo de despliegue tendremos?',
      topicSlug: 'modelos-de-servicio-y-despliegue',
      examTasks: ['3.1'],
      options: [
        {
          id: 'hybrid',
          label: 'Híbrido, porque usamos varios servicios distintos',
          definition:
            'Modelo de despliegue que conecta recursos en la nube con infraestructura que no está en la nube, normalmente on-premises.',
          explanation:
            'Híbrido no significa usar varios servicios o modelos de servicio. Significa conectar la nube con recursos fuera de ella, y la agencia ya no tendrá ninguno.',
          correct: false,
        },
        {
          id: 'cloud',
          label: 'Nube (cloud)',
          definition:
            'Modelo de despliegue en el que la aplicación está completamente desplegada en la nube y todas sus partes se ejecutan ahí.',
          explanation:
            'Todos los sistemas de la agencia se ejecutarán en la nube y no quedará infraestructura propia. Que mezclen IaaS, PaaS y SaaS no cambia el modelo de despliegue.',
          correct: true,
        },
        {
          id: 'on-premises',
          label: 'On-premises',
          definition:
            'Modelo de despliegue en el que los recursos están en las instalaciones propias de la empresa, usando virtualización y herramientas de gestión.',
          explanation:
            'On-premises sería mantener todo en el cuarto de atrás. Lucía describe justo lo contrario: apagar ese servidor para siempre.',
          correct: false,
        },
        {
          id: 'private-cloud',
          label: 'Nube privada',
          definition:
            'Expresión con la que a veces se describe un despliegue on-premises que usa virtualización y herramientas de gestión en las instalaciones propias.',
          explanation:
            'La nube privada es otro nombre del despliegue on-premises, con recursos en las instalaciones propias. La agencia no tendrá ninguno.',
          correct: false,
        },
      ],
    },
  ],
};
