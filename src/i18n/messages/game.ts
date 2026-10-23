import { defineMessages } from '../defineMessages';
import type { DistrictId } from '@/modules/games/cumulo-city/world/districts';

/**
 * Cúmulo City's own copy: HUD, dialogs, prompts and what people in the city say. District and building
 * names live in the game's placeNames; mission stories come translated from the missions catalog.
 */
export const gameMessages = defineMessages<{
  page: { title: string; description: string; authReason: string };
  hud: {
    controls: string;
    map: string;
    mapBack: string;
    mapHint: string;
    accept: string;
    activeBadge: string;
    idleTitle: string;
    idleText: string;
    idleBack: string;
  };
  select: { subtitle: string; hint: string; accept: string; man: string; woman: string };
  city: {
    busSign: string;
    busPrompt: string;
    enterPrompt: (building: string) => string;
    talkPrompt: string;
    neighbour: string;
    busLine: string;
    npcLines: Record<DistrictId, string[]>;
  };
  interior: { exitHint: string; talkTo: (name: string) => string };
  missionCard: {
    doneHeading: string;
    doneTitle: (district: string) => string;
    doneDetail: string;
    offerHeading: string;
    offerDetail: (client: string, place: string) => string;
    acceptMission: string;
    activeHeading: string;
    /** `busDistrict` is the district to ride to, or null when the building is in the player's district. */
    activeDetail: (place: string, client: string, busDistrict: string | null) => string;
  };
  busStop: { title: string; question: (district: string) => string; stay: string };
  access: {
    /** `busDistrict` is the target's district when it is not the building's one, else null. */
    notExpected: (building: string, target: string | null, busDistrict: string | null) => string;
    needsAppointment: (building: string) => string;
    noWork: (building: string) => string;
  };
  missionTalk: { replay: (title: string) => string; playAgain: string; start: string; later: string };
  office: { concerns: Record<string, string>; everyday: string[] };
}>({
  es: {
    page: {
      title: 'Cúmulo City',
      description: 'Recorre Cúmulo City como consultor cloud y ayuda a sus negocios con problemas reales de AWS.',
      authReason: 'Necesitas una cuenta gratuita para jugar. Ingresa o créala en un minuto.',
    },
    hud: {
      controls: 'WASD/Flechas: caminar   Shift: correr   E o clic: interactuar   Rueda o +/-: zoom   M: mapa',
      map: 'Mapa',
      mapBack: 'Volver',
      mapHint: 'Vista del mapa: arrastra para recorrerlo · rueda o +/- para el zoom · M o Esc para volver',
      accept: 'Aceptar',
      activeBadge: '¡Tienes una misión activa!',
      idleTitle: '¿Sigues ahí?',
      idleText: 'Notamos que llevas un rato sin moverte. Tu avance está guardado.',
      idleBack: 'Sigo aquí',
    },
    select: {
      subtitle: 'Consultoría cloud · Nivel Practitioner',
      hint: 'Clic o ← → para elegir   ·   ENTER para aceptar',
      accept: 'Aceptar',
      man: 'Consultor',
      woman: 'Consultora',
    },
    city: {
      busSign: 'Bus · otros distritos',
      busPrompt: '[E] Tomar el bus',
      enterPrompt: (building) => `[E] Entrar a ${building}`,
      talkPrompt: '[E] Hablar',
      neighbour: 'Vecino',
      busLine: 'Con el bus de la esquina llegas a los otros distritos. Cada uno tiene clientes con problemas distintos.',
      npcLines: {
        downtown: [
          '¿Viste la Pastelería Dulce Nube? Dicen que su web se cae cada Navidad.',
          'Si recién empiezas, pasa por la Cloud Academy. Ahí te explican todo desde cero.',
          'Rapidito recibe miles de pedidos al mediodía y casi ninguno de madrugada.',
          'En Seguros Horizonte se preguntan si la nube les conviene más que su centro de datos.',
        ],
        financial: [
          'En el Banco Andino andan preocupados por la seguridad de los datos de sus clientes.',
          'Aquí todos hablan de auditorías, cifrado y permisos. Es el barrio más cuidadoso de la ciudad.',
          'La Fintech PagoYa mueve pagos de miles de personas. Un acceso indebido sería un desastre.',
          'Dicen que en la Bolsa de Valores Andina reciben ataques para tumbar su sistema.',
        ],
        tech: [
          'StreamLlama quiere llegar a toda Latinoamérica, pero sus videos cargan lento fuera de Lima.',
          'La Municipalidad tiene que guardar sus documentos por diez años. ¡Diez!',
          'En la Clínica Vida dicen que sus sistemas no pueden caerse nunca.',
          'En el Startup Lab cada mes nace una startup que quiere crecer sin administrar servidores.',
        ],
        market: [
          'Me contaron que en Startup Hub pagan una fortuna por servidores que nadie usa.',
          'En el Estudio Contable Saldo siempre preguntan por qué la factura de AWS subió.',
          'La Florería Primavera vende diez veces más en San Valentín. El resto del año, casi nada.',
          'En el Contact Center Andino atienden las 24 horas. Si algo se cae, ¿a quién llaman?',
        ],
      },
    },
    interior: {
      exitHint: 'Sal por la puerta para volver a la calle',
      talkTo: (name) => `[E] Hablar con ${name}`,
    },
    missionCard: {
      doneHeading: 'Misiones al día',
      doneTitle: (district) => `¡Ayudaste a todos los clientes del ${district}!`,
      doneDetail: 'Toma el bus en la parada para buscar clientes en otros distritos.',
      offerHeading: 'Nueva misión',
      offerDetail: (client, place) => `${client} te espera en ${place}.`,
      acceptMission: 'Aceptar misión',
      activeHeading: 'Misión activa',
      activeDetail: (place, client, busDistrict) =>
        `Objetivo: ${busDistrict ? `toma el bus al ${busDistrict}, entra` : 'entra'} a ${place} y habla con ${client}. Sigue la flecha.`,
    },
    busStop: {
      title: 'Parada de bus',
      question: (district) => `Estás en el ${district}. ¿A qué distrito quieres ir?`,
      stay: 'Quedarme aquí',
    },
    access: {
      notExpected: (building, target, busDistrict) =>
        `${building} no te espera hoy. Tu misión activa es en ${target ?? 'otro edificio'}${
          busDistrict !== null ? `, en el ${busDistrict}: toma el bus en la parada` : ': sigue la flecha'
        }.`,
      needsAppointment: (building) =>
        `${building} solo recibe consultores con una cita. Acepta la misión de la tarjeta para entrar al edificio de tu cliente.`,
      noWork: (building) => `${building} no tiene trabajo para ti por ahora.`,
    },
    missionTalk: {
      replay: (title) => `¡Qué gusto verte otra vez! Gracias a ti, "${title}" quedó en el pasado. ¿Quieres repasar el caso?`,
      playAgain: 'Jugar otra vez',
      start: 'Empecemos',
      later: 'Ahora no',
    },
    office: {
      concerns: {
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
      },
      everyday: [
        'Hoy tenemos reunión de planificación. Ojalá no se alargue como la de la semana pasada.',
        'La impresora otra vez está sin papel. Siempre me toca a mí cambiarlo.',
        'Estoy cerrando el reporte del mes. Los números todavía no me cuadran.',
        'Si buscas a la gerencia, suele estar en la sala de reuniones.',
        'Anoche se reinició el servidor de la oficina y perdí media hora de trabajo.',
        '¿Eres el consultor cloud del que todos hablan? Qué bueno tenerte por aquí.',
        'Me tomo un café y vuelvo al trabajo. Esta tarde va a ser larga.',
        'Nos pidieron trabajar desde casa los viernes, pero el sistema solo funciona aquí.',
      ],
    },
  },
  en: {
    page: {
      title: 'Cúmulo City',
      description: 'Explore Cúmulo City as a cloud consultant and help its businesses solve real AWS problems.',
      authReason: 'You need a free account to play. Sign in or create one in a minute.',
    },
    hud: {
      controls: 'WASD/Arrows: walk   Shift: run   E or click: interact   Wheel or +/-: zoom   M: map',
      map: 'Map',
      mapBack: 'Back',
      mapHint: 'Map view: drag to look around · wheel or +/- to zoom · M or Esc to go back',
      accept: 'OK',
      activeBadge: 'You have an active mission!',
      idleTitle: 'Still there?',
      idleText: "Looks like you haven't moved in a while. Your progress is saved.",
      idleBack: "I'm here",
    },
    select: {
      subtitle: 'Cloud consulting · Practitioner level',
      hint: 'Click or ← → to choose   ·   ENTER to accept',
      accept: 'Accept',
      man: 'Consultant',
      woman: 'Consultant',
    },
    city: {
      busSign: 'Bus · other districts',
      busPrompt: '[E] Take the bus',
      enterPrompt: (building) => `[E] Enter ${building}`,
      talkPrompt: '[E] Talk',
      neighbour: 'Neighbor',
      busLine: 'The bus at the corner takes you to the other districts. Each one has clients with different problems.',
      npcLines: {
        downtown: [
          'Have you seen Dulce Nube Bakery? They say its website crashes every Christmas.',
          "If you're just starting out, stop by the Cloud Academy. They explain everything from scratch.",
          'Rapidito gets thousands of orders at noon and hardly any in the middle of the night.',
          'At Horizonte Insurance they wonder whether the cloud suits them better than their data center.',
        ],
        financial: [
          "At Andino Bank they're worried about the security of their customers' data.",
          "Everyone here talks about audits, encryption and permissions. It's the most careful part of town.",
          'PagoYa Fintech moves payments for thousands of people. Unauthorized access would be a disaster.',
          'They say the Andino Stock Exchange gets attacks trying to take its system down.',
        ],
        tech: [
          'StreamLlama wants to reach all of Latin America, but its videos load slowly outside Lima.',
          'City Hall has to keep its documents for ten years. Ten!',
          'At Vida Clinic they say their systems can never go down.',
          'Every month Startup Lab gives birth to a startup that wants to grow without managing servers.',
        ],
        market: [
          'I heard Startup Hub pays a fortune for servers nobody uses.',
          'At Saldo Accounting they always ask why their AWS bill went up.',
          "Primavera Florist sells ten times more on Valentine's Day. The rest of the year, almost nothing.",
          'Andino Contact Center is open 24 hours a day. If something goes down, who do they call?',
        ],
      },
    },
    interior: {
      exitHint: 'Go out the door to get back to the street',
      talkTo: (name) => `[E] Talk to ${name}`,
    },
    missionCard: {
      doneHeading: 'All caught up',
      doneTitle: (district) => `You helped every client in the ${district}!`,
      doneDetail: 'Take the bus at the stop to find clients in other districts.',
      offerHeading: 'New mission',
      offerDetail: (client, place) => `${client} is waiting for you at ${place}.`,
      acceptMission: 'Accept mission',
      activeHeading: 'Active mission',
      activeDetail: (place, client, busDistrict) =>
        `Goal: ${busDistrict ? `take the bus to the ${busDistrict}, go into` : 'go into'} ${place} and talk to ${client}. Follow the arrow.`,
    },
    busStop: {
      title: 'Bus stop',
      question: (district) => `You're in the ${district}. Which district do you want to go to?`,
      stay: 'Stay here',
    },
    access: {
      notExpected: (building, target, busDistrict) =>
        `${building} isn't expecting you today. Your active mission is at ${target ?? 'another building'}${
          busDistrict !== null ? `, in the ${busDistrict}: take the bus at the stop` : ': follow the arrow'
        }.`,
      needsAppointment: (building) =>
        `${building} only lets in consultants with an appointment. Accept the mission on the card to enter your client's building.`,
      noWork: (building) => `${building} has no work for you right now.`,
    },
    missionTalk: {
      replay: (title) => `So good to see you again! Thanks to you, "${title}" is a thing of the past. Want to go over the case again?`,
      playAgain: 'Play again',
      start: "Let's start",
      later: 'Not now',
    },
    office: {
      concerns: {
        bakery: 'In December orders multiply and our website crashes right when we sell the most. Do you know how to prevent it?',
        bank: "Everything here gets audited, even the coffee. We need to prove who accesses each customer's data.",
        cafe: 'We want to open three more locations and take orders online, but our only server sits under the counter.',
        clinic: 'Patient records must never be lost, no matter what. Not a single minute of downtime.',
        hotel: 'In high season, bookings overload the system. The rest of the year we pay for servers almost nobody uses.',
        academy: 'Welcome to the Cloud Academy. Classes to train cloud consultants like you will start very soon.',
        startup: 'We grew incredibly fast, but our server bill grew even faster. Nobody knows what is running.',
        store: 'Today we sell through Instagram, but we want our own online store for the whole country.',
        school: 'We want online classes for students in every province, even with slow internet.',
        streaming: 'Our videos play perfectly in Lima, but in Mexico City and Bogotá they take forever to load.',
        delivery: 'At noon orders explode and at three in the morning there are none. We pay the same 24 hours a day.',
        cityhall: 'We have to keep documents for ten years, and the boxes no longer fit in the archive.',
        gym: 'We want an app to book classes, but nobody here knows how to code or run servers.',
        // Downtown District
        'travel-agency': 'On holidays everyone books at once and our tour package system cannot keep up.',
        'insurance-office': 'We have had the same data center for thirty years. Management asks whether the cloud is right for us.',
        'central-tower': 'All kinds of companies work in this tower. Every floor has a different problem with its servers.',
        newspaper: "When big news breaks, the paper's website goes down right when most readers arrive.",
        logistics: 'We move trucks across the whole country, and our systems still live in a room without air conditioning.',
        // Financial District
        'exchange-house': 'Every transaction here gets recorded. If something fails, regulators ask us for explanations.',
        'stock-cafe': 'Stockbrokers pay with their phones. Our register cannot go down for a single minute.',
        fintech: 'We move payments for thousands of people. Unauthorized access would be the end of the company.',
        insurer: "We keep our policyholders' medical data, and the law requires us to protect it to the fullest.",
        'stock-exchange': 'Millions are traded every second. We worry about attacks that try to take the system down.',
        'financial-tower': 'Banks, funds and insurers share this tower. Everyone talks about security and compliance.',
        'jewelry-store': 'The display cases have alarms, but I do not know who is watching our online store.',
        notary: 'We sign contracts all day, and the documents must be encrypted and safely stored.',
        'credit-union': 'We are a small credit union without a security team. Where do we start?',
        locksmith: "I know everything about keys and locks, but my employees' passwords are a mess.",
        'audit-firm': 'We audit companies moving to the cloud, and we need to know what evidence to ask them for.',
        'print-shop': 'We print confidential documents for several clients, and each one must see only their own.',
        // Tech District
        'gaming-store': 'When a big video game launches, the store fills up and the website cannot handle it.',
        'hacker-cafe': 'Programmers come here to work. They all argue about which AWS service fits each job.',
        'data-center': 'We run physical servers for other companies, and several clients are asking us to migrate to AWS.',
        university: 'We have labs, research and thousands of students online at the same time during exams.',
        'startup-lab': 'Startups are born here every month. They all want to grow fast without managing servers.',
        'electronics-store': 'We sell sensors and connected devices. Data arrives by the thousands and we do not know where to store it.',
        'game-studio': 'We make online video games, and players across the continent complain about lag.',
        'maker-workshop': 'We design 3D parts with huge files that the team shares across several computers.',
        telecom: 'We connect offices all over the country, and now we have to connect them to the cloud too.',
        'robotics-school': 'We teach robotics to kids and want an online platform with videos and exercises.',
        // Market District
        'central-market': 'Hundreds of stalls sell here, and we want a shared system without paying a fortune.',
        'neighborhood-bakery': 'We are opening a new shop and do not know how much moving our sales to the cloud will cost.',
        'coffee-exporter': 'We export coffee to five countries, and our technology bill grows every month for no clear reason.',
        'accounting-firm': 'We keep the books for many companies. They always ask us why their AWS bill went up.',
        'cloud-consultancy': 'We help companies migrate. We are always looking for AWS partners, courses and resources.',
        'retail-chain': 'We have stores all over the country and each department uses its own account. Nobody understands the bill.',
        'hardware-store': 'I want to sell online, but I am afraid of a surprise bill at the end of the month.',
        'creative-agency': 'We run campaigns for many clients and need to know how much each one spends on the cloud.',
        distributor: 'Our servers run nonstop all year. We must be paying too much.',
        'flower-shop': "On Valentine's Day we sell ten times more. The rest of the year there are hardly any orders.",
        'contact-center': 'We serve customers 24 hours a day. If something goes down, who do we ask for help?',
        bookstore: 'We are a small bookstore and want to know what we can use in the cloud for almost nothing.',
      },
      everyday: [
        "We have a planning meeting today. I hope it does not drag on like last week's.",
        'The printer is out of paper again. I am always the one who refills it.',
        'I am closing the monthly report. The numbers still do not add up.',
        'If you are looking for management, they are usually in the meeting room.',
        'The office server restarted last night and I lost half an hour of work.',
        'Are you the cloud consultant everyone is talking about? Great to have you here.',
        'I will grab a coffee and get back to work. This afternoon is going to be long.',
        'They asked us to work from home on Fridays, but the system only works here.',
      ],
    },
  },
});
