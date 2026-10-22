import type { Mission } from '../../../domain/Mission';

/**
 * Aseguradora Pacífico: an insurer in Lima preparing evidence for the regulator after moving its policies system to AWS.
 * Practices AWS Artifact, compliance scope by service, AWS Config rules and the IAM credential report.
 */
export const complianceAndAuditing1: Mission = {
  id: 'compliance-and-auditing-1',
  track: 'financial',
  buildingId: 'insurer',
  topicSlug: 'compliance-and-auditing',
  title: 'La carpeta del regulador',
  client: { name: 'Rosa Villanueva', role: 'Jefa de Cumplimiento de Aseguradora Pacífico' },
  intro: [
    'Te damos la bienvenida a Aseguradora Pacífico. Soy Rosa Villanueva, jefa de Cumplimiento. Desde Lima aseguramos autos, casas y vidas de más de doscientas mil familias peruanas.',
    'El año pasado llevamos a AWS nuestro sistema de pólizas y siniestros. Funciona de maravilla, pero ahora el regulador quiere revisar cómo cumplimos sus normas en la nube.',
    'Me pidió una carpeta de evidencia: qué certificaciones tiene AWS, cómo controlamos la configuración de nuestros recursos y quién tiene credenciales activas. Y yo no sé por dónde empezar a buscar.',
    'Si la carpeta llega incompleta, nos pueden poner observaciones y frenar el lanzamiento del nuevo seguro digital. ¿Me ayudas a armarla?',
  ],
  outro: {
    passed: [
      'La carpeta está completa: los informes de AWS, la verificación de alcance de cada servicio, las reglas que vigilan la configuración y el informe de credenciales.',
      'Por primera vez siento que puedo sentarme frente al regulador con tranquilidad. Gracias: en Aseguradora Pacífico te debemos una.',
    ],
    failed: [
      'Mmm... con esto la carpeta sigue teniendo huecos, y el regulador los va a encontrar.',
      'Repasa la teoría de cumplimiento y auditoría con calma, y vuelve cuando quieras. La carpeta te espera en mi escritorio.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'aws-reports',
      prompt:
        'Lo primero que pide el regulador son los informes SOC y las certificaciones ISO de AWS, como evidencia de que la infraestructura donde corren nuestras pólizas está auditada. ¿Dónde los consigo?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudtrail-reports',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra como eventos las acciones de usuarios, roles y servicios hechas desde la consola, la CLI, los SDK y las API.',
          explanation:
            'CloudTrail guarda la actividad de la API dentro de la cuenta de la aseguradora. Los informes SOC e ISO de AWS no están ahí.',
          correct: false,
        },
        {
          id: 'artifact-reports',
          label: 'AWS Artifact',
          definition:
            'Portal de autoservicio para descargar bajo demanda documentos de seguridad y cumplimiento de AWS, como informes y acuerdos.',
          explanation:
            'Artifact entrega sin costo los informes SOC, PCI e ISO de AWS. Sirven como evidencia de auditoría de la parte que le toca a AWS.',
          correct: true,
        },
        {
          id: 'config-reports',
          label: 'AWS Config',
          definition:
            'Servicio que mantiene un inventario de los recursos, su historial de configuración y reglas para evaluar si cumplen lo que defines.',
          explanation:
            'Config evalúa la configuración de los recursos de la aseguradora, pero no publica los informes de cumplimiento de AWS.',
          correct: false,
        },
        {
          id: 'cloudwatch-reports',
          label: 'Amazon CloudWatch',
          definition:
            'Servicio que monitorea recursos y aplicaciones en tiempo real con métricas, logs, dashboards y alarmas.',
          explanation:
            'CloudWatch muestra cómo están funcionando los sistemas de la aseguradora; no contiene informes de auditoría de AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'services-in-scope',
      prompt:
        'Para el nuevo seguro digital queremos sumar varios servicios de AWS que todavía no usamos. Mi equipo dice que, como AWS ya está certificado, cualquier servicio nos sirve. ¿Cómo lo resolvemos?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'all-services-covered',
          label: 'Usar cualquier servicio: si AWS tiene una certificación, todos sus servicios están cubiertos',
          definition:
            'Suposición de que cada programa de cumplimiento de un proveedor alcanza a la totalidad de sus servicios.',
          explanation:
            'No todos los servicios están en el alcance de todos los programas de cumplimiento. Esa suposición puede dejar a la aseguradora con un servicio sin cobertura.',
          correct: false,
        },
        {
          id: 'aws-certifies-app',
          label: 'Dar por hecho que la certificación de AWS también certifica nuestra aplicación',
          definition:
            'Idea de que el cumplimiento del proveedor de nube se transfiere automáticamente a las cargas de trabajo del cliente.',
          explanation:
            'Según el modelo de responsabilidad compartida, la aseguradora sigue siendo responsable de demostrar el cumplimiento de su propia aplicación.',
          correct: false,
        },
        {
          id: 'check-services-in-scope',
          label: 'Revisar en la página AWS Services in Scope by Compliance Program que cada servicio esté cubierto',
          definition:
            'Página oficial que muestra, para cada programa de cumplimiento, qué servicios de AWS están cubiertos por los informes vigentes.',
          explanation:
            'Los requisitos varían por servicio, así que antes de diseñar una solución regulada se verifica que cada servicio elegido esté en el alcance del programa que les exigen.',
          correct: true,
        },
        {
          id: 'region-only',
          label: 'Elegir solo la Región más cercana a Lima, porque el cumplimiento depende únicamente de la ubicación',
          definition:
            'Criterio que considera la geografía como el único factor que define los requisitos de cumplimiento.',
          explanation:
            'La geografía influye, pero los requisitos también varían por industria y por servicio. La Región no dice si un servicio está en el alcance del programa.',
          correct: false,
        },
      ],
    },
    {
      id: 'encrypted-volumes-rule',
      prompt:
        'El regulador exige que todos los volúmenes de nuestros servidores estén cifrados, y quiere ver que lo vigilamos todo el tiempo, no una vez al año. ¿Qué servicio marca los volúmenes que no cumplan?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'config-rules',
          label: 'AWS Config, con una regla que exija volúmenes cifrados',
          definition:
            'Reglas que evalúan de forma continua la configuración de cada recurso y marcan como no conformes los que no cumplen lo definido.',
          explanation:
            'Las reglas de Config evalúan continuamente cada volumen y marcan los no conformes. Además, guardan el historial de configuración como evidencia para el regulador.',
          correct: true,
        },
        {
          id: 'cloudtrail-volumes',
          label: 'AWS CloudTrail',
          definition:
            'Servicio que registra las llamadas a la API de la cuenta, con quién las hizo, cuándo y desde dónde.',
          explanation:
            'CloudTrail dice quién creó o cambió un volumen, pero no evalúa si su configuración cumple la norma de cifrado.',
          correct: false,
        },
        {
          id: 'cloudwatch-volumes',
          label: 'Una alarma de Amazon CloudWatch sobre el uso de disco',
          definition:
            'Alarma que avisa o ejecuta una acción cuando una métrica, como el uso de disco, cruza un umbral.',
          explanation:
            'Una alarma de CloudWatch vigila métricas de rendimiento. El uso de disco no dice si un volumen está cifrado.',
          correct: false,
        },
        {
          id: 'credential-report-volumes',
          label: 'El informe de credenciales de IAM',
          definition:
            'Archivo CSV con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA.',
          explanation:
            'El informe de credenciales trata sobre los usuarios y sus credenciales, no sobre la configuración de los volúmenes.',
          correct: false,
        },
      ],
    },
    {
      id: 'credentials-evidence',
      prompt:
        'Última pieza de la carpeta: el regulador quiere un archivo con todos los usuarios de IAM de la cuenta, si tienen MFA y cuándo se rotó o usó cada access key. ¿Qué le entregamos?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'last-accessed',
          label: 'La información de último acceso de IAM',
          definition:
            'Vista que muestra qué servicios, y en algunos casos qué acciones, usó realmente cada identidad, para retirar permisos sobrantes.',
          explanation:
            'El último acceso sirve para recortar permisos que no se usan, pero no lista el estado de contraseñas, MFA y access keys de cada usuario.',
          correct: false,
        },
        {
          id: 'artifact-agreements',
          label: 'Los acuerdos de AWS Artifact',
          definition:
            'Sección de AWS Artifact para revisar, aceptar y hacer seguimiento de acuerdos con AWS, para una cuenta o una organización.',
          explanation:
            'Los acuerdos de Artifact son contratos con AWS. No describen las credenciales de los usuarios de la aseguradora.',
          correct: false,
        },
        {
          id: 'event-history',
          label: 'El historial de eventos de AWS CloudTrail',
          definition:
            'Vista en la consola de los eventos de administración de los últimos 90 días, por Región.',
          explanation:
            'El historial de eventos muestra acciones, no un resumen del estado de las credenciales de cada usuario listo para entregar.',
          correct: false,
        },
        {
          id: 'credential-report',
          label: 'El informe de credenciales de IAM (credential report)',
          definition:
            'Archivo CSV con todos los usuarios de la cuenta y el estado de sus contraseñas, access keys y dispositivos MFA.',
          explanation:
            'Es justo lo que pide el regulador: un CSV con cada usuario, su MFA y cuándo se rotó o usó por última vez cada clave. Se puede generar y entregar al auditor.',
          correct: true,
        },
      ],
    },
  ],
};
