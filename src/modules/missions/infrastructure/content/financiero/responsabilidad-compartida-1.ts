import type { Mission } from '../../../domain/Mission';

/**
 * Casa de Cambio Inca: a currency exchange shop in Cusco whose rate calculator runs on Amazon EC2.
 * Practices the shared responsibility model on IaaS: guest OS patching, inherited and shared controls, and security groups.
 */
export const responsabilidadCompartida1: Mission = {
  id: 'responsabilidad-compartida-1',
  track: 'financiero',
  topicSlug: 'responsabilidad-compartida',
  buildingId: 'casa-cambio',
  title: 'El tipo de cambio de la seguridad',
  client: { name: 'Rosa Ccori', role: 'Dueña de la Casa de Cambio Inca' },
  intro: [
    '¡Te doy la bienvenida! Soy Rosa Ccori, dueña de la Casa de Cambio Inca, aquí en Cusco. Cambiamos dólares, euros y soles a turistas que llegan de todo el mundo.',
    'El año pasado mi sobrino montó nuestra calculadora de tipo de cambio en servidores de Amazon EC2. Funciona bien, pero él se fue a estudiar a Arequipa y ahora nadie aquí en Cusco sabe qué hay que mantener.',
    'Para renovar nuestra licencia, el regulador me pide una lista de controles de seguridad: qué hace AWS y qué hacemos nosotros. Yo creía que, al estar en la nube, AWS se encargaba de todo.',
    'Si entrego una lista equivocada, me pueden observar la licencia en plena temporada alta. ¿Me ayudas a separar lo que es de AWS y lo que es mío?',
  ],
  outro: {
    passed: [
      '¡Qué alivio! Ahora entiendo que AWS protege la nube y que yo protejo lo que pongo dentro de ella, empezando por esos servidores EC2.',
      'Mi lista de controles quedó clara y ordenada. Pasa cuando quieras por la casa de cambio: para ti siempre habrá un buen tipo de cambio.',
    ],
    failed: [
      'Mmm... con estas respuestas la lista para el regulador todavía tiene errores, y no puedo arriesgar la licencia.',
      'Repasa la teoría del modelo de responsabilidad compartida y vuelve. Aquí te espero, con la calculadora encendida.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ec2-guest-os',
      prompt:
        'Empecemos por los servidores. La calculadora corre en instancias de Amazon EC2 con Linux. Llegó un aviso de una vulnerabilidad grave en ese sistema operativo. ¿Quién debe aplicar el parche?',
      topicSlug: 'responsabilidad-compartida',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-patches-guest',
          label: 'AWS, porque es el dueño de los servidores físicos',
          definition:
            'Idea de que el proveedor de nube mantiene todo el software que corre en sus servidores, incluido el sistema operativo de cada instancia.',
          explanation:
            'AWS parcha el sistema operativo del host y la capa de virtualización, pero en Amazon EC2 el sistema operativo invitado de la instancia lo mantiene el cliente.',
          correct: false,
        },
        {
          id: 'maintenance-window',
          label: 'AWS, durante la ventana de mantenimiento que elige la casa de cambio',
          definition:
            'Periodo semanal que el cliente define para que AWS aplique el mantenimiento de un servicio administrado, como el de una base de datos.',
          explanation:
            'Ese esquema es el de Amazon RDS, donde AWS parcha el sistema operativo y el motor. En una instancia EC2 nadie lo hace por ti: el sistema operativo invitado es tuyo.',
          correct: false,
        },
        {
          id: 'shop-patches-guest',
          label: 'La casa de cambio, porque el sistema operativo invitado de EC2 es su responsabilidad',
          definition:
            'En infraestructura como servicio, el cliente instala, configura y parcha el sistema operativo que corre dentro de su servidor virtual.',
          explanation:
            'Amazon EC2 es IaaS: la casa de cambio parcha el sistema operativo invitado, el software que instaló y sus reglas de red. Es el modelo donde más le toca al cliente.',
          correct: true,
        },
        {
          id: 'nobody-patches',
          label: 'Nadie, porque las instancias en la nube no necesitan parches',
          definition:
            'Creencia de que un servidor virtual en la nube queda protegido por el solo hecho de estar alojado en un centro de datos del proveedor.',
          explanation:
            'Una instancia EC2 tiene un sistema operativo como cualquier servidor, con sus vulnerabilidades. Si la casa de cambio no lo parcha, queda expuesta.',
          correct: false,
        },
      ],
    },
    {
      id: 'physical-controls',
      prompt:
        'El regulador pregunta por los controles físicos y ambientales: cámaras, guardias, energía y temperatura del centro de datos donde corren mis servidores. ¿Cómo los clasifico en mi lista?',
      topicSlug: 'responsabilidad-compartida',
      examTasks: ['2.1'],
      options: [
        {
          id: 'inherited-control',
          label: 'Control heredado: la casa de cambio los hereda por completo de AWS',
          definition:
            'Controles que el cliente recibe íntegramente del proveedor de nube, sin tener que operarlos ni compartir su ejecución.',
          explanation:
            'Los controles físicos y ambientales de los centros de datos son el ejemplo clásico de control heredado: los opera AWS y la casa de cambio los hereda tal cual.',
          correct: true,
        },
        {
          id: 'shared-physical',
          label: 'Control compartido: AWS cuida el edificio y la casa de cambio pone sus propios guardias',
          definition:
            'Controles que aplican tanto a la infraestructura del proveedor como a lo que hace el cliente, cada uno en su propio contexto.',
          explanation:
            'Los controles compartidos son los parches, la configuración y la capacitación. La casa de cambio no tiene acceso ni guardias en los centros de datos de AWS.',
          correct: false,
        },
        {
          id: 'customer-specific-physical',
          label: 'Control específico del cliente, porque los servidores son de la casa de cambio',
          definition:
            'Controles que dependen solo del cliente y de su aplicación, como decidir en qué entornos de seguridad se separan ciertos datos.',
          explanation:
            'La casa de cambio usa instancias virtuales, no es dueña del hardware ni del edificio. La seguridad física es seguridad DE la nube, a cargo de AWS.',
          correct: false,
        },
        {
          id: 'not-applicable',
          label: 'No aplica: en la nube no existen controles físicos',
          definition:
            'Idea de que, al no tener servidores propios, los riesgos físicos y ambientales desaparecen del análisis de seguridad.',
          explanation:
            'Los centros de datos existen y tienen controles físicos y ambientales. Solo que los opera AWS, y por eso se clasifican como heredados.',
          correct: false,
        },
      ],
    },
    {
      id: 'security-group-open',
      prompt:
        'Revisando, encontré que el security group de la calculadora deja entrar conexiones de administración desde cualquier dirección de internet. ¿A quién le toca corregir esa regla?',
      topicSlug: 'responsabilidad-compartida',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-firewall',
          label: 'A AWS, porque el security group es parte de su red global',
          definition:
            'Idea de que las reglas de firewall de las instancias forman parte de la infraestructura de red que protege el proveedor.',
          explanation:
            'AWS protege su infraestructura de red global, pero las reglas de cada security group las define el cliente. Es seguridad EN la nube.',
          correct: false,
        },
        {
          id: 'shop-rules',
          label: 'A la casa de cambio, porque las reglas de los security groups son del cliente',
          definition:
            'Un security group actúa como firewall virtual de una instancia; sus reglas de entrada y salida las configura quien la despliega.',
          explanation:
            'Las reglas de los security groups son responsabilidad del cliente en EC2. La casa de cambio debe limitar el acceso de administración a las direcciones que lo necesitan.',
          correct: true,
        },
        {
          id: 'aws-support-fix',
          label: 'A AWS, que debe detectarla y cerrarla en la próxima ventana de mantenimiento',
          definition:
            'Proceso en el que el proveedor aplica cambios a un servicio administrado dentro de un periodo acordado con el cliente.',
          explanation:
            'Las ventanas de mantenimiento existen en servicios administrados como RDS, y no sirven para cambiar las reglas de red del cliente. Esta regla la definió la casa de cambio.',
          correct: false,
        },
        {
          id: 'regulator-fix',
          label: 'Al regulador, porque es quien exige los controles',
          definition:
            'Entidad externa que define requisitos de seguridad y cumplimiento que las empresas supervisadas deben demostrar.',
          explanation:
            'El regulador pide evidencia, pero no administra la cuenta de AWS de la casa de cambio. Configurar el acceso a sus instancias es tarea del cliente.',
          correct: false,
        },
      ],
    },
    {
      id: 'staff-training',
      prompt:
        'El último punto de la lista dice "capacitación en seguridad". Mis cajeros reciben correos falsos todo el tiempo. ¿Cómo se reparte ese control entre AWS y nosotros?',
      topicSlug: 'responsabilidad-compartida',
      examTasks: ['2.1'],
      options: [
        {
          id: 'training-inherited',
          label: 'Es heredado: AWS capacita a todo el personal de sus clientes',
          definition:
            'Clasificación de un control como recibido por completo del proveedor, sin ninguna tarea para el cliente.',
          explanation:
            'AWS capacita a sus propios empleados, no a los cajeros de la casa de cambio. El ejemplo de control heredado son los controles físicos y ambientales.',
          correct: false,
        },
        {
          id: 'training-aws-only',
          label: 'Es seguridad DE la nube, así que solo le toca a AWS',
          definition:
            'Ámbito de responsabilidad del proveedor: hardware, software, redes e instalaciones que ejecutan sus servicios.',
          explanation:
            'La seguridad DE la nube cubre la infraestructura de AWS. La formación de los empleados de la casa de cambio no forma parte de esa infraestructura.',
          correct: false,
        },
        {
          id: 'training-specific',
          label: 'Es específico del cliente: solo depende de la casa de cambio y su aplicación',
          definition:
            'Controles que dependen únicamente del cliente, como decidir en qué entornos de seguridad se enrutan o separan ciertos datos.',
          explanation:
            'La capacitación no depende solo del cliente: AWS también capacita a su personal. Por eso no es un control específico del cliente.',
          correct: false,
        },
        {
          id: 'training-shared',
          label: 'Es compartido: AWS capacita a sus empleados y la casa de cambio a los suyos',
          definition:
            'Controles que aplican a la infraestructura y al cliente a la vez, cada uno en su propio contexto, como la gestión de parches y la de configuración.',
          explanation:
            'La concientización y capacitación es un control compartido. AWS forma a su gente, y la casa de cambio debe entrenar a sus cajeros para reconocer correos falsos.',
          correct: true,
        },
      ],
    },
  ],
};
