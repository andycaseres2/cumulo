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
