import type { Mission } from '../../../domain/Mission';

/**
 * Café Hacker: a coffee shop in Medellín that hosts hackathons and runs its booking site and coding platform on Amazon EC2.
 * Practices the EC2 basics: general purpose instances, AMIs, EBS versus instance store and who patches the operating system.
 */
export const computoEc21: Mission = {
  id: 'computo-ec2-1',
  track: 'tecnologico',
  topicSlug: 'computo-ec2',
  buildingId: 'cafe-hacker',
  title: 'Servidores con café',
  client: { name: 'Samuel Ospina', role: 'Dueño del Café Hacker' },
  intro: [
    '¡Te damos la bienvenida al Café Hacker! Soy Samuel Ospina. En Medellín servimos el mejor tinto para programadores, y cada mes organizamos una hackathon que llena el local.',
    'Tenemos una página para reservar mesas y una plataforma donde los equipos suben sus retos. Todo corre en servidores de Amazon EC2 que monté leyendo tutoriales.',
    'En la última hackathon se perdieron los proyectos de tres equipos, armar los servidores nos tomó toda la noche y nadie sabía quién debía actualizar el sistema operativo.',
    'La próxima hackathon viene con patrocinadores grandes y no puedo quedar mal. ¿Me ayudas a entender bien EC2?',
  ],
  outro: {
    passed: [
      '¡Brutal! Los servidores salen idénticos en minutos, los proyectos quedan guardados aunque se detenga la instancia y ya sé que los parches me tocan a mí.',
      'La hackathon fue un éxito y los patrocinadores vuelven el próximo año. Tu café queda invitado de por vida.',
    ],
    failed: [
      'Uf... con estas decisiones creo que volveríamos a perder proyectos.',
      'Repasa la teoría sobre Amazon EC2 con un buen tinto y vuelve cuando quieras. La barra te espera.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'booking-site',
      prompt:
        'Empecemos por la página de reservas: un sitio web sencillo con tráfico parejo, que no usa demasiado CPU, ni memoria, ni disco. ¿Qué familia de instancias EC2 le conviene?',
      topicSlug: 'computo-ec2',
      examTasks: ['3.3'],
      options: [
        {
          id: 'general-purpose',
          label: 'Uso general',
          definition:
            'Familia de instancias que equilibra los recursos de cómputo, memoria y red.',
          explanation:
            'Cuando el escenario no destaca ningún recurso, la respuesta es uso general, típica para servidores web como esta página de reservas.',
          correct: true,
        },
        {
          id: 'booking-compute',
          label: 'Optimizadas para cómputo',
          definition:
            'Familia de instancias con procesadores de alto rendimiento para cargas intensivas de CPU.',
          explanation:
            'Se eligen cuando la CPU es el cuello de botella, como en el procesamiento por lotes; la página de reservas no destaca la CPU.',
          correct: false,
        },
        {
          id: 'booking-memory',
          label: 'Optimizadas para memoria',
          definition:
            'Familia de instancias que ofrece rendimiento rápido con grandes conjuntos de datos en memoria.',
          explanation:
            'Son para cosas como bases de datos en memoria; un sitio de reservas sencillo no tiene esa necesidad.',
          correct: false,
        },
        {
          id: 'booking-accelerated',
          label: 'Cómputo acelerado',
          definition:
            'Familia de instancias que usa aceleradores de hardware, como GPU, para cálculos y procesamiento gráfico.',
          explanation:
            'Las GPU son para aprendizaje automático o gráficos; una página de reservas no las necesita.',
          correct: false,
        },
      ],
    },
    {
      id: 'identical-servers',
      prompt:
        'Para la hackathon necesito lanzar quince instancias idénticas, todas con el mismo sistema operativo y las mismas herramientas ya instaladas, sin configurarlas una por una. ¿Qué componente de EC2 define eso?',
      topicSlug: 'computo-ec2',
      examTasks: ['3.3'],
      options: [
        {
          id: 'instance-type',
          label: 'El tipo de instancia',
          definition:
            'La combinación de CPU, memoria, almacenamiento, capacidad de red y hardware gráfico de una instancia.',
          explanation:
            'El tipo de instancia define el hardware, no el sistema operativo ni las herramientas instaladas.',
          correct: false,
        },
        {
          id: 'security-group',
          label: 'El security group',
          definition:
            'Firewall virtual que define qué tráfico de red puede llegar a una instancia.',
          explanation:
            'El security group controla el tráfico hacia las instancias; no contiene el sistema operativo ni el software.',
          correct: false,
        },
        {
          id: 'key-pair',
          label: 'El par de claves (key pair)',
          definition:
            'Credenciales para iniciar sesión de forma segura en una instancia: AWS guarda la clave pública y el usuario la privada.',
          explanation:
            'El par de claves sirve para entrar a la instancia, no define qué software trae instalado.',
          correct: false,
        },
        {
          id: 'ami',
          label: 'La AMI (Amazon Machine Image)',
          definition:
            'Plantilla preconfigurada con los componentes que necesita un servidor, incluidos el sistema operativo y el software adicional.',
          explanation:
            'Con una misma AMI se lanzan muchas instancias idénticas. Preparan una AMI con las herramientas de la hackathon y lanzan las quince desde ella.',
          correct: true,
        },
      ],
    },
    {
      id: 'lost-projects',
      prompt:
        'Lo que más me dolió: los equipos guardaron sus proyectos en el almacenamiento de la instancia, la detuvimos al cerrar el local y al día siguiente ya no estaban. ¿Dónde deben guardarse para que sobrevivan a una detención?',
      topicSlug: 'computo-ec2',
      examTasks: ['3.3'],
      options: [
        {
          id: 'instance-store',
          label: 'En volúmenes de instance store',
          definition:
            'Almacenamiento temporal de una instancia, que se borra al detenerla, hibernarla o terminarla.',
          explanation:
            'Eso es justo lo que les pasó: el instance store es temporal y se pierde al detener la instancia. No sirve para datos importantes.',
          correct: false,
        },
        {
          id: 'ebs',
          label: 'En volúmenes de Amazon EBS',
          definition:
            'Almacenamiento persistente en bloques que se usa con las instancias de Amazon EC2.',
          explanation:
            'Los volúmenes de EBS son almacenamiento persistente: los proyectos se conservan aunque la instancia se detenga por la noche.',
          correct: true,
        },
        {
          id: 'projects-in-ami',
          label: 'Dentro de la AMI con la que se lanzó la instancia',
          definition:
            'La plantilla con el sistema operativo y el software desde la que se crean las instancias.',
          explanation:
            'La AMI es una plantilla para lanzar instancias, no el lugar donde guardar el trabajo que cambia durante la hackathon.',
          correct: false,
        },
        {
          id: 'projects-in-key',
          label: 'En el par de claves de cada equipo',
          definition:
            'Credenciales asimétricas que permiten iniciar sesión de forma segura en una instancia.',
          explanation:
            'El par de claves son credenciales de acceso; no almacena archivos ni proyectos.',
          correct: false,
        },
      ],
    },
    {
      id: 'os-patches',
      prompt:
        'Última pregunta, la que causó la pelea: en estas instancias de EC2, ¿quién es responsable de aplicar los parches del sistema operativo?',
      topicSlug: 'computo-ec2',
      examTasks: ['3.3'],
      options: [
        {
          id: 'aws-managed',
          label: 'AWS, porque EC2 es un servicio totalmente administrado',
          definition:
            'Idea de que en Amazon EC2 el proveedor mantiene el sistema operativo de las instancias del cliente.',
          explanation:
            'Es una trampa típica: EC2 no es un servicio administrado en el que AWS parche tu sistema operativo.',
          correct: false,
        },
        {
          id: 'aws-general-purpose',
          label: 'AWS, siempre que las instancias sean de uso general',
          definition:
            'Idea de que la familia de instancia elegida cambia quién mantiene el software del servidor.',
          explanation:
            'La familia de instancia solo define el hardware; no cambia quién parcha el sistema operativo.',
          correct: false,
        },
        {
          id: 'customer-iaas',
          label: 'El Café Hacker, porque EC2 es IaaS y da control total del sistema operativo',
          definition:
            'Idea de que en la infraestructura como servicio el cliente configura, actualiza y asegura el sistema operativo de sus servidores virtuales.',
          explanation:
            'Con EC2 tienen control total del sistema operativo: ustedes lo configuran, lo actualizan y lo aseguran. Por eso EC2 es un ejemplo de IaaS.',
          correct: true,
        },
        {
          id: 'ami-self-update',
          label: 'Nadie: la AMI actualiza sola cada instancia lanzada',
          definition:
            'Idea de que la plantilla de lanzamiento mantiene al día el software de las instancias que ya están corriendo.',
          explanation:
            'La AMI solo sirve para lanzar instancias; una vez lanzadas, mantener el sistema operativo es responsabilidad del cliente.',
          correct: false,
        },
      ],
    },
  ],
};
