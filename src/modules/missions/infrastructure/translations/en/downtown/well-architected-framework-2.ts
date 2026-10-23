import type { Mission } from '../../../../domain/Mission';

/**
 * Escuela Digital: an online school in San José preparing a Well-Architected review of its grades platform.
 * Practices the AWS Well-Architected Tool, what a review is (and is not), and the security and performance efficiency pillars.
 */
export const wellArchitectedFramework2: Mission = {
  id: 'well-architected-framework-2',
  track: 'downtown',
  topicSlug: 'well-architected-framework',
  buildingId: 'school',
  title: 'The review before the exam',
  client: { name: 'Andrés Solano', role: 'Technology Coordinator at Escuela Digital' },
  intro: [
    'Pura vida! I’m Andrés Solano, technology coordinator at Escuela Digital. From San José we teach online high school classes to students all over Costa Rica.',
    'We built a new platform on AWS where teachers record grades and students check them. We launch it in two months, right before final exams.',
    'The principal wants to be sure the platform is well built before the launch, and someone recommended a Well-Architected review. She’s afraid it’s an audit that will punish us.',
    'On top of that, in testing the platform is slow, and we’re still not clear on who can see which grade. Will you help me prepare for the review?',
  ],
  outro: {
    passed: [
      'Excellent! The principal now knows the review is a conversation, we have the tool to measure our progress and a plan for the high risks.',
      'Each teacher sees only their own courses, we know who changes every grade and the platform can finally handle exam season. Thank you: you earned a perfect score.',
    ],
    failed: [
      'Hmm... with these answers I don’t feel ready to present the plan to the principal.',
      'Review the Well-Architected Framework theory calmly and come back whenever you like. Class is still in session.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'review-tool',
      prompt:
        'First, the practical part: I want to review the platform with a consistent process, answering questions about it, find the high risks and save snapshots of our progress to compare in a few months. What do I use?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports, such as SOC, PCI and ISO, and manage agreements.',
          explanation:
            'Artifact provides reports on AWS’s compliance. It doesn’t review the grades platform’s architecture or save its progress.',
          correct: false,
        },
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'A web tool to estimate the cost of an architecture on AWS before deploying it.',
          explanation:
            'The calculator estimates how much the platform will cost, but it doesn’t evaluate whether its architecture follows best practices.',
          correct: false,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'A service that records, as events, the actions of users, roles and services taken from the console, the CLI, the SDKs and the APIs.',
          explanation:
            'CloudTrail records who took each action in the account, but it doesn’t compare the architecture against the framework or identify high risks.',
          correct: false,
        },
        {
          id: 'wa-tool',
          label: 'AWS Well-Architected Tool',
          definition:
            'A service in the console that provides a consistent process for reviewing and measuring workloads against the AWS Well-Architected Framework.',
          explanation:
            'With the WA Tool, Andrés answers questions about his workload, identifies high-risk issues (HRIs), gets an improvement plan and saves milestones to measure his progress.',
          correct: true,
        },
      ],
    },
    {
      id: 'calm-the-principal',
      prompt:
        'The principal has two fears: that the review is an audit that will punish us, and that the tool will change the platform on its own. What do I tell her?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'audit-certification',
          label: 'That it’s an official audit and, if we pass, AWS certifies the platform',
          definition:
            'The idea that a Well-Architected review works like a formal exam that ends in a certification.',
          explanation:
            'AWS makes it clear that a Well-Architected review is a constructive conversation, not an audit that passes or fails the platform.',
          correct: false,
        },
        {
          id: 'conversation',
          label: 'That it’s a constructive conversation: the tool evaluates and recommends, and we decide what to change',
          definition:
            'The idea that the Well-Architected review is a dialogue about best practices, in which the team chooses which improvements to implement.',
          explanation:
            'AWS defines the review as a constructive conversation, not an audit. The Well-Architected Tool evaluates and recommends; Andrés’s team decides on and implements the improvements.',
          correct: true,
        },
        {
          id: 'auto-fix',
          label: 'That the tool automatically fixes the risks it finds',
          definition:
            'The idea that the review tool modifies the account’s resources to resolve the issues it detects.',
          explanation:
            'The Well-Architected Tool doesn’t apply changes: it identifies risks and proposes an improvement plan, and the team decides what to implement.',
          correct: false,
        },
        {
          id: 'only-security',
          label: 'That the review only looks at security, so nothing else is touched',
          definition:
            'The idea that the framework evaluates a single aspect of the architecture instead of several pillars.',
          explanation:
            'The framework covers six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability.',
          correct: false,
        },
      ],
    },
    {
      id: 'grades-access',
      prompt:
        'Now the grades issue. Each teacher should see and edit only the grades for their own courses, and we always want to know who changed each grade. Which pillar covers this?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'security',
          label: 'Security',
          definition:
            'The pillar about the ability to protect data, systems and assets, with a strong identity foundation, traceability and encryption.',
          explanation:
            'Implementing a strong identity foundation with least privilege and maintaining traceability are design principles of the security pillar.',
          correct: true,
        },
        {
          id: 'operational-excellence',
          label: 'Operational excellence',
          definition:
            'The pillar about how to organize the team, design, operate at scale and evolve the workload, with observability and safe automation.',
          explanation:
            'Operational excellence looks at how the platform is operated and improved. Controlling who accesses grades and recording who changes them is security.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'The pillar about the ability of a workload to perform its intended function correctly and consistently when it’s expected to.',
          explanation:
            'Reliability is about recovering from failures. The problem here is who can see and change each grade.',
          correct: false,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'The pillar about running systems that deliver business value at the lowest price, with a consumption model and expenditure attribution.',
          explanation:
            'Attributing spending to each owner is a cost topic, not a question of who can see students’ grades.',
          correct: false,
        },
      ],
    },
    {
      id: 'slow-platform',
      prompt:
        'Last topic: in testing, the platform is slow. We want to choose the resource types that best fit how it’s used, try a serverless architecture and experiment more often. Which pillar guides us?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'The pillar about the ability of a workload to perform its intended function correctly and consistently when it’s expected to.',
          explanation:
            'This is a common mix-up: reliability is about recovering from failures. Choosing the best-performing resource belongs to another pillar.',
          correct: false,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'The pillar about the environmental impact of the workload, especially energy consumption and efficiency.',
          explanation:
            'Sustainability seeks to reduce environmental impact. Andrés wants the platform to respond quickly.',
          correct: false,
        },
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency',
          definition:
            'The pillar about using cloud resources efficiently to meet performance requirements as demand and technology change.',
          explanation:
            'Using serverless architectures, experimenting more often and choosing the technology that best fits the usage pattern are principles of performance efficiency.',
          correct: true,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'The pillar about running systems that deliver business value at the lowest price, with a consumption model and expenditure attribution.',
          explanation:
            'Andrés’s goal isn’t to spend less, but for the platform to deliver the performance students need.',
          correct: false,
        },
      ],
    },
  ],
};
