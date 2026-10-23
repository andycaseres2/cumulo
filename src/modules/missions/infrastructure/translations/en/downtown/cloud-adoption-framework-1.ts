import type { Mission } from '../../../../domain/Mission';

/**
 * Hoteles Mirador: a hotel chain in Cartagena whose move to the cloud stalls on people, risk and planning, not on servers.
 * Practices the AWS CAF perspectives (People, Governance), the Launch phase and the business outcomes it targets.
 */
export const cloudAdoptionFramework1: Mission = {
  id: 'cloud-adoption-framework-1',
  track: 'downtown',
  buildingId: 'hotel',
  topicSlug: 'cloud-adoption-framework',
  title: 'Checking in to the cloud',
  client: { name: 'Valeria Montoya', role: 'Director of Digital Transformation at Hoteles Mirador' },
  intro: [
    'Welcome to the Mirador. I’m Valeria Montoya, director of digital transformation at Hoteles Mirador. We have six beachfront hotels in Cartagena, and from these offices we run bookings, kitchens and events.',
    'A year ago the board said "we’re moving to the cloud" and IT started moving servers. The problem is that nothing else moved: people don’t know how to work this way, nobody is managing the risks and every department is going its own way.',
    'Someone recommended the AWS Cloud Adoption Framework to bring some order, but I read it and got lost among perspectives, phases and outcomes.',
    'If I don’t present a clear plan at the next board meeting, they’ll freeze the transformation budget. Will you help me check this hotel in to the cloud?',
  ],
  outro: {
    passed: [
      'Now I have a plan people can understand! The team’s culture has an owner in People, the program’s risks are orchestrated by Governance, and we know which phase we’re in.',
      'And best of all: the board sees the cloud as a way to sell more, not as an IT expense. Thank you: at the Mirador you’ll always have a room with an ocean view.',
    ],
    failed: [
      'Hmm... with these answers the board is going to ask me more questions than I can answer. I still mix up perspectives, phases and outcomes.',
      'Review the AWS CAF theory calmly and come back whenever you like. The Mirador’s front desk is always open for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'team-culture',
      prompt:
        'The first thing that worries me is my people. The receptionists and the IT team don’t have the skills to work in the cloud, and the managers of each hotel are resisting the change. Which AWS CAF perspective addresses this?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'governance-culture',
          label: 'Governance',
          definition:
            'The AWS CAF perspective that orchestrates transformation initiatives with program and project management, risk management and data governance.',
          explanation:
            'Governance coordinates the program and its risks. Culture, leadership and the team’s skills belong to the People perspective.',
          correct: false,
        },
        {
          id: 'people-culture',
          label: 'People',
          definition:
            'The AWS CAF perspective that bridges technology and business: culture, organizational structure, leadership and workforce.',
          explanation:
            'Resistance to change and skill gaps are addressed with People capabilities, such as culture evolution, workforce transformation and change acceleration.',
          correct: true,
        },
        {
          id: 'platform-culture',
          label: 'Platform',
          definition:
            'The AWS CAF perspective that builds a scalable cloud platform and modernizes or builds cloud-native solutions.',
          explanation:
            'Platform deals with architecture and application development. It doesn’t work on the hotels’ culture or people’s skills.',
          correct: false,
        },
        {
          id: 'operations-culture',
          label: 'Operations',
          definition:
            'The AWS CAF perspective that ensures cloud services are delivered at the level the business needs, with observability and incident management.',
          explanation:
            'Operations makes sure systems run well once they’re in the cloud. The team’s resistance to change is a People topic.',
          correct: false,
        },
      ],
    },
    {
      id: 'program-risk',
      prompt:
        'Second headache: every department launched its own cloud project, nobody prioritizes the portfolio and nobody keeps track of the risks of the whole transformation. Which perspective is in charge of orchestrating this?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'security-risk',
          label: 'Security',
          definition:
            'The AWS CAF perspective that seeks the confidentiality, integrity and availability of data and workloads.',
          explanation:
            'This is a classic trap: Security protects data and workloads, but managing the risks of the transformation program and prioritizing projects belongs to Governance.',
          correct: false,
        },
        {
          id: 'business-risk',
          label: 'Business',
          definition:
            'The AWS CAF perspective that ensures cloud investments accelerate digital transformation and business outcomes.',
          explanation:
            'Business defines the strategy and the outcomes being pursued. Coordinating the transformation’s programs, projects and risks is Governance’s job.',
          correct: false,
        },
        {
          id: 'operations-risk',
          label: 'Operations',
          definition:
            'The AWS CAF perspective focused on observability, incident and problem management, patching and service continuity.',
          explanation:
            'Operations handles incidents in systems that are already running. It doesn’t orchestrate the project portfolio or the risks of the entire program.',
          correct: false,
        },
        {
          id: 'governance-risk',
          label: 'Governance',
          definition:
            'The AWS CAF perspective that orchestrates transformation initiatives with program and project management, risk management and data governance.',
          explanation:
            'Governance maximizes the benefits and minimizes the risks of the transformation: it organizes each department’s projects into a program and manages its risks and the application portfolio.',
          correct: true,
        },
      ],
    },
    {
      id: 'pilot-phase',
      prompt:
        'We’ve decided to start with something concrete: put the new booking system into production at just one of the six hotels, prove that it works and learn before going further. Which AWS CAF phase would we be in?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'launch-phase',
          label: 'Launch',
          definition:
            'The AWS CAF phase in which pilots are delivered in production, demonstrating incremental business value and leaving lessons learned.',
          explanation:
            'A production pilot at one hotel, to demonstrate value and learn, is exactly what Launch describes. Expanding it to all six hotels would come later, in Scale.',
          correct: true,
        },
        {
          id: 'envision-phase',
          label: 'Envision',
          definition:
            'The AWS CAF phase that shows how the cloud will accelerate business outcomes and identifies and prioritizes opportunities with owners and metrics.',
          explanation:
            'Envision is when you identify and prioritize opportunities. You have already chosen one and are putting it into production.',
          correct: false,
        },
        {
          id: 'align-phase',
          label: 'Align',
          definition:
            'The AWS CAF phase that identifies capability gaps across the six perspectives, cross-organizational dependencies and stakeholder concerns.',
          explanation:
            'Align prepares the organization by finding gaps and dependencies. Delivering a working pilot in production already belongs to Launch.',
          correct: false,
        },
        {
          id: 'scale-phase',
          label: 'Scale',
          definition:
            'The AWS CAF phase that expands pilots and business value to the desired scale and makes sure the benefits are sustained.',
          explanation:
            'Scale comes when the pilot has already proven its value and expands to the whole chain. You’re just starting with a single hotel.',
          correct: false,
        },
      ],
    },
    {
      id: 'board-outcome',
      prompt:
        'With the board I need to speak their language. With the cloud we want to launch wedding and corporate event packages that can be booked online, and reach tourists from other countries who can’t find us today. Which AWS CAF business outcome is this?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'reduced-risk',
          label: 'Reduced business risk',
          definition:
            'The AWS CAF outcome that lowers the business’s risk profile with improved reliability, increased performance and enhanced security.',
          explanation:
            'Reducing risk is about reliability and security. Launching new packages and reaching new customers aims at increasing revenue.',
          correct: false,
        },
        {
          id: 'esg-performance',
          label: 'Improved ESG performance',
          definition:
            'The AWS CAF outcome that uses insights to improve sustainability and corporate transparency.',
          explanation:
            'ESG performance refers to sustainability and transparency. Wedding packages and tourists from other countries are a revenue goal.',
          correct: false,
        },
        {
          id: 'increased-revenue',
          label: 'Increased revenue',
          definition:
            'The AWS CAF outcome of creating new products and services, reaching new customers and entering new market segments.',
          explanation:
            'New packages bookable online are new products, and tourists from other countries are new customers and segments: that’s the increased revenue outcome.',
          correct: true,
        },
        {
          id: 'operational-efficiency',
          label: 'Increased operational efficiency',
          definition:
            'The AWS CAF outcome that reduces operating costs, increases productivity and improves the employee and customer experience.',
          explanation:
            'Operational efficiency aims to do the same with less cost and effort. Here the goal is to sell new products to new customers.',
          correct: false,
        },
      ],
    },
  ],
};
