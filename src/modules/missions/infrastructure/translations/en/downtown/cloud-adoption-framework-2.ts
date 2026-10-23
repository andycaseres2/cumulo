import type { Mission } from '../../../../domain/Mission';

/**
 * Rapidito: a delivery startup in Asunción planning its cloud adoption before a big retail contract.
 * Practices the AWS CAF Envision phase, the Operations perspective, business versus technical perspectives and the ESG outcome.
 */
export const cloudAdoptionFramework2: Mission = {
  id: 'cloud-adoption-framework-2',
  track: 'downtown',
  buildingId: 'delivery',
  topicSlug: 'cloud-adoption-framework',
  title: 'Deliveries with a roadmap',
  client: { name: 'Joaquín Benítez', role: 'Founder of Rapidito' },
  intro: [
    'Hi! Come on in, everything here runs on motorbikes. I’m Joaquín Benítez, founder of Rapidito. We deliver food, pharmacy orders and packages all over Asunción with more than eighty couriers.',
    'A supermarket chain wants us to handle all of its deliveries across the country. For that we need to move the app and our systems to the cloud, and my partners asked me for a serious plan, not an improvised one.',
    'A friend told me AWS has a framework for this, the AWS Cloud Adoption Framework. The problem is that my partners think it’s only a topic for programmers, and I don’t know where to start.',
    'If I don’t present a clear plan, the chain will sign with another company. Will you help me put together Rapidito’s roadmap?',
  ],
  outro: {
    passed: [
      'Done! We know which phase we start in, who will operate the systems once they’re in the cloud, and my partners understood that the AWS CAF also talks about business and people.',
      'And the sustainability report the chain asked for already has a place in the plan. Thank you: your Rapidito deliveries are on the house.',
    ],
    failed: [
      'Oops... with this plan my partners won’t sign anything. I still confuse phases with perspectives.',
      'Review the AWS CAF theory and come back whenever you like. I’ll be waiting here with my helmet on.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'first-phase',
      prompt:
        'Let’s start at the beginning. Before moving anything, I want to show my partners how the cloud would help us win the contract, choose which opportunities to tackle first and give each one an owner and a metric. Which AWS CAF phase is this?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'envision',
          label: 'Envision',
          definition:
            'The AWS CAF phase that shows how the cloud will accelerate business outcomes and identifies and prioritizes opportunities with owners and metrics.',
          explanation:
            'Showing how the cloud accelerates the business, prioritizing opportunities and linking them to owners and metrics is exactly Envision, the starting point.',
          correct: true,
        },
        {
          id: 'align',
          label: 'Align',
          definition:
            'The AWS CAF phase that identifies capability gaps across the six perspectives, cross-organizational dependencies and stakeholder concerns.',
          explanation:
            'Align comes after choosing the opportunities: it looks for gaps and dependencies to prepare the organization. Joaquín is still defining what to tackle.',
          correct: false,
        },
        {
          id: 'launch',
          label: 'Launch',
          definition:
            'The AWS CAF phase in which pilots are delivered in production, demonstrating incremental business value and leaving lessons learned.',
          explanation:
            'Launch already puts pilots into production. Rapidito hasn’t moved anything yet, nor chosen what to move.',
          correct: false,
        },
        {
          id: 'scale',
          label: 'Scale',
          definition:
            'The AWS CAF phase that expands pilots and business value to the desired scale and makes sure the benefits are sustained.',
          explanation:
            'Scale expands pilots that have already proven their value. Without prioritized opportunities or pilots, there’s nothing to scale yet.',
          correct: false,
        },
      ],
    },
    {
      id: 'who-operates',
      prompt:
        'My fear is the day after: once the app is in the cloud, who checks that it works, handles outages at rush hour and applies the patches? Which AWS CAF perspective covers that?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'platform',
          label: 'Platform',
          definition:
            'The AWS CAF perspective that builds a scalable cloud platform and modernizes or builds cloud-native solutions.',
          explanation:
            'Platform designs and builds the platform and the applications. Watching that they work, handling incidents and patching is Operations’ job.',
          correct: false,
        },
        {
          id: 'security',
          label: 'Security',
          definition:
            'The AWS CAF perspective that seeks the confidentiality, integrity and availability of data and workloads.',
          explanation:
            'Security deals with identities, threat detection and security incident response. Keeping the service at the level the business needs is Operations.',
          correct: false,
        },
        {
          id: 'people',
          label: 'People',
          definition:
            'The AWS CAF perspective that bridges technology and business: culture, organizational structure, leadership and workforce.',
          explanation:
            'People works on the team’s culture and skills. Observability, outages and patches belong to Operations.',
          correct: false,
        },
        {
          id: 'operations',
          label: 'Operations',
          definition:
            'The AWS CAF perspective that ensures cloud services are delivered at the level the business needs.',
          explanation:
            'Operations includes capabilities such as observability, incident and problem management, patch management and continuity: exactly what Rapidito needs at rush hour.',
          correct: true,
        },
      ],
    },
    {
      id: 'not-only-tech',
      prompt:
        'My partners insist that the AWS CAF is something for programmers. I want to show them it also talks about them. Which perspectives are the most business-focused?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'technical-trio',
          label: 'Platform, Security and Operations',
          definition:
            'A group of three AWS CAF perspectives that deals with the cloud platform, data protection and service operations.',
          explanation:
            'These are the three most technical perspectives of the AWS CAF. The business-focused ones are Business, People and Governance.',
          correct: false,
        },
        {
          id: 'business-trio',
          label: 'Business, People and Governance',
          definition:
            'A group of three AWS CAF perspectives that deals with strategy and outcomes, culture and people, and orchestrating the transformation.',
          explanation:
            'Half of the six perspectives look at the business and people: Business, People and Governance. That’s why the AWS CAF is not just a technical topic.',
          correct: true,
        },
        {
          id: 'phases-trio',
          label: 'Envision, Align and Launch',
          definition:
            'Three of the four iterative transformation phases the AWS CAF proposes, together with Scale.',
          explanation:
            'This is the trap of confusing perspectives with phases: Envision, Align and Launch are phases of the journey, not perspectives.',
          correct: false,
        },
        {
          id: 'only-business',
          label: 'Only Business; the other five perspectives are technical',
          definition:
            'The idea that the AWS CAF has a single business perspective and that the rest are about technology.',
          explanation:
            'People and Governance are also business-focused: they deal with the culture, leadership, programs and risks of the transformation.',
          correct: false,
        },
      ],
    },
    {
      id: 'sustainability-report',
      prompt:
        'Last one. The supermarket chain is asking us for a sustainability report: they want clear data on the environmental impact of our deliveries and more transparency as a company. Which AWS CAF business outcome does this connect to?',
      topicSlug: 'cloud-adoption-framework',
      examTasks: ['1.3'],
      options: [
        {
          id: 'operational-efficiency',
          label: 'Increased operational efficiency',
          definition:
            'The AWS CAF outcome that reduces operating costs, increases productivity and improves the employee and customer experience.',
          explanation:
            'Operational efficiency is about costs and productivity. Using insights for sustainability and corporate transparency is the ESG outcome.',
          correct: false,
        },
        {
          id: 'increased-revenue',
          label: 'Increased revenue',
          definition:
            'The AWS CAF outcome of creating new products and services, reaching new customers and entering new market segments.',
          explanation:
            'Increasing revenue aims at new products and customers. The report the chain is asking for is about sustainability and transparency.',
          correct: false,
        },
        {
          id: 'esg-performance',
          label: 'Improved ESG performance',
          definition:
            'The AWS CAF outcome that uses insights to improve sustainability and corporate transparency.',
          explanation:
            'Environmental, social and governance performance is one of the four key outcomes of the AWS CAF, and a report on environmental impact and transparency fits right there.',
          correct: true,
        },
        {
          id: 'reduced-risk',
          label: 'Reduced business risk',
          definition:
            'The AWS CAF outcome that lowers the business’s risk profile with improved reliability, increased performance and enhanced security.',
          explanation:
            'Reducing business risk is about reliability, performance and security. The chain’s request is a sustainability topic.',
          correct: false,
        },
      ],
    },
  ],
};
