/** What each company worries about: a hint of the cloud problem the player will solve there one day. */
export const BUILDING_CONCERNS: Record<string, string> = {
  bakery:
    'En diciembre los pedidos se multiplican y la página web se cae justo cuando más vendemos. ¿Sabes cómo evitarlo?',
  bank: 'Aquí todo pasa por auditoría, hasta el café. Necesitamos demostrar quién accede a los datos de cada cliente.',
  cafe: 'Queremos abrir tres locales más y recibir pedidos en línea, pero nuestro único servidor está debajo del mostrador.',
  clinic: 'Los historiales de los pacientes no se pueden perder por nada del mundo. Ni un minuto fuera de servicio.',
  hotel: 'En temporada alta las reservas saturan el sistema. El resto del año pagamos servidores que casi nadie usa.',
  academy: 'Bienvenido a la Cloud Academy. Muy pronto empezarán las clases para formar consultores cloud como tú.',
  startup: 'Crecimos rapidísimo, pero la factura de servidores creció todavía más rápido. Nadie sabe qué está encendido.',
  store: 'Hoy vendemos por Instagram, pero queremos nuestra propia tienda en línea para todo el país.',
  school: 'Queremos clases en línea para alumnos de todas las provincias, aunque tengan internet lento.',
  streaming: 'Nuestros videos se ven perfecto en Lima, pero en Ciudad de México y Bogotá tardan muchísimo en cargar.',
  delivery: 'Al mediodía explotan los pedidos y a las tres de la mañana no hay ninguno. Pagamos lo mismo las 24 horas.',
  cityhall: 'Tenemos que guardar documentos durante diez años, y las cajas ya no entran en el archivo.',
  gym: 'Queremos una app para reservar clases, pero nadie aquí sabe programar ni administrar servidores.',
  // Distrito Centro
  'travel-agency': 'En vacaciones todos reservan a la vez y nuestro sistema de paquetes turísticos no da abasto.',
  'insurance-office': 'Llevamos treinta años con el mismo centro de datos. La gerencia pregunta si la nube nos conviene.',
  'central-tower': 'En esta torre trabajan empresas de todo tipo. Cada piso tiene un problema distinto con sus servidores.',
  'newspaper': 'Cuando hay noticias grandes, la web del diario se cae justo cuando más lectores llegan.',
  'logistics': 'Movemos camiones por todo el país y nuestros sistemas siguen en un cuarto sin aire acondicionado.',
  // Distrito Financiero
  'exchange-house': 'Aquí cada operación queda registrada. Si algo falla, los reguladores nos piden explicaciones.',
  'stock-cafe': 'Los corredores de bolsa pagan con el celular. Nuestra caja no puede caerse ni un minuto.',
  'fintech': 'Movemos pagos de miles de personas. Un acceso indebido sería el fin de la empresa.',
  'insurer': 'Guardamos datos médicos de nuestros asegurados y la ley nos exige protegerlos al máximo.',
  'stock-exchange': 'Cada segundo se negocian millones. Nos preocupan los ataques que intentan tumbar el sistema.',
  'financial-tower': 'Bancos, fondos y aseguradoras comparten esta torre. Todos hablan de seguridad y cumplimiento.',
  'jewelry-store': 'Las vitrinas tienen alarma, pero no sé quién vigila nuestra tienda en línea.',
  'notary': 'Firmamos contratos todo el día y los documentos tienen que estar cifrados y bien guardados.',
  'credit-union': 'Somos una cooperativa pequeña y no tenemos un equipo de seguridad. ¿Por dónde empezamos?',
  locksmith: 'Sé todo sobre llaves y candados, pero las contraseñas de mis empleados son un desastre.',
  'audit-firm': 'Auditamos empresas que migran a la nube y necesitamos saber qué evidencia pedirles.',
  'print-shop': 'Imprimimos documentos confidenciales de varios clientes y cada uno debe ver solo lo suyo.',
  // Distrito Tecnológico
  'gaming-store': 'En los lanzamientos de videojuegos la tienda se llena y la web no aguanta.',
  'hacker-cafe': 'Aquí vienen programadores a trabajar. Todos discuten qué servicio de AWS conviene para cada cosa.',
  'data-center': 'Administramos servidores físicos para otras empresas y varios clientes nos piden migrar a AWS.',
  university: 'Tenemos laboratorios, investigación y miles de alumnos conectados al mismo tiempo en exámenes.',
  'startup-lab': 'Aquí nacen startups cada mes. Todas quieren crecer rápido sin administrar servidores.',
  'electronics-store': 'Vendemos sensores y dispositivos conectados. Los datos llegan por miles y no sabemos guardarlos.',
  'game-studio': 'Hacemos videojuegos en línea y los jugadores de todo el continente se quejan de lentitud.',
  'maker-workshop': 'Diseñamos piezas 3D con archivos enormes que el equipo comparte entre varias computadoras.',
  'telecom': 'Conectamos oficinas de todo el país y ahora también tenemos que conectarlas con la nube.',
  'robotics-school': 'Enseñamos robótica a niños y queremos una plataforma en línea con videos y ejercicios.',
  // Distrito Mercado
  'central-market': 'Cientos de puestos venden aquí y queremos un sistema común sin pagar una fortuna.',
  'neighborhood-bakery': 'Abrimos un local nuevo y no sabemos cuánto nos costará llevar las ventas a la nube.',
  'coffee-exporter': 'Exportamos café a cinco países y la factura de tecnología crece cada mes sin explicación.',
  'accounting-firm': 'Llevamos la contabilidad de muchas empresas. Siempre nos preguntan por qué su factura de AWS subió.',
  'cloud-consultancy': 'Ayudamos a empresas a migrar. Siempre buscamos partners, cursos y recursos de AWS.',
  'retail-chain': 'Tenemos tiendas en todo el país y cada área usa su propia cuenta. Nadie entiende la factura.',
  'hardware-store': 'Quiero vender en línea, pero me da miedo una factura sorpresa a fin de mes.',
  'creative-agency': 'Hacemos campañas para muchos clientes y necesitamos saber cuánto gasta cada uno en la nube.',
  'distributor': 'Nuestros servidores trabajan sin parar todo el año. Seguro estamos pagando de más.',
  'flower-shop': 'En San Valentín vendemos diez veces más. El resto del año casi no hay pedidos.',
  'contact-center': 'Atendemos clientes las 24 horas. Si algo se cae, ¿a quién le pedimos ayuda?',
  bookstore: 'Somos una librería pequeña y queremos saber qué podemos usar en la nube sin pagar casi nada.',
};

const EVERYDAY_LINES = [
  'Hoy tenemos reunión de planificación. Ojalá no se alargue como la de la semana pasada.',
  'La impresora otra vez está sin papel. Siempre me toca a mí cambiarlo.',
  'Estoy cerrando el reporte del mes. Los números todavía no me cuadran.',
  'Si buscas a la gerencia, suele estar en la sala de reuniones.',
  'Anoche se reinició el servidor de la oficina y perdí media hora de trabajo.',
  '¿Eres el consultor cloud del que todos hablan? Qué bueno tenerte por aquí.',
  'Me tomo un café y vuelvo al trabajo. Esta tarde va a ser larga.',
  'Nos pidieron trabajar desde casa los viernes, pero el sistema solo funciona aquí.',
];

const NAMES = ['Lucía', 'Mateo', 'Valentina', 'Diego', 'Camila', 'Santiago', 'Mariana', 'Andrés', 'Sofía', 'Javier'];

function offset(buildingId: string): number {
  let sum = 0;
  for (const char of buildingId) sum += char.charCodeAt(0);
  return sum;
}

/** The first worker of each office shares the company's concern; the rest make everyday office talk. */
export function workerLine(buildingId: string, index: number): string {
  if (index === 0) return BUILDING_CONCERNS[buildingId] ?? EVERYDAY_LINES[0];
  return EVERYDAY_LINES[(offset(buildingId) + index) % EVERYDAY_LINES.length];
}

export function workerName(buildingId: string, index: number): string {
  return NAMES[(offset(buildingId) + index * 3) % NAMES.length];
}
