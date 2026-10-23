import type { Mission } from '../../../../domain/Mission';

/**
 * Café Byte: a café in Asunción whose ordering app breaks every Friday and runs a test server around the clock.
 * Practices telling apart the Well-Architected pillars: operational excellence, reliability, cost optimization and sustainability.
 */
export const wellArchitectedFramework1: Mission = {
  id: 'well-architected-framework-1',
  track: 'downtown',
  topicSlug: 'well-architected-framework',
  buildingId: 'cafe',
  title: 'Four pillars and a cortado',
  client: { name: 'Camila Benítez', role: 'Owner of Café Byte' },
  intro: [
    'Hi! I’m Camila Benítez, owner of Café Byte. Here in Asunción we’re the programmers’ café: good Wi-Fi, outlets at every table and freshly baked chipa.',
    'A year ago we launched an app for ordering from your table or to go, and we run it on AWS. Customers love it... when it works.',
    'Every Friday we push a huge change and something breaks, the test server stays on day and night, and our most loyal customers ask us how much our app pollutes.',
    'A friend told me about the AWS Well-Architected Framework, but I got lost among so many pillars. Will you help me figure out which pillar to look at for each problem?',
  ],
  outro: {
    passed: [
      'Now I have a map! Small, reversible changes, tested recovery, a test server that sleeps at night and an app that makes better use of its resources.',
      'Every problem has its pillar and I know where to start. Thank you: today’s cortado is on the house.',
    ],
    failed: [
      'Hmm... I think I still mix up the pillars. Some answers just don’t add up for me.',
      'Review the Well-Architected Framework theory calmly and come back whenever you like. I’ll save you a table with an outlet.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'friday-deploys',
      prompt:
        'The first problem: every Friday we push a huge change to the app and something breaks. We want to make frequent, small, reversible changes and have runbooks for when something goes wrong. Which pillar guides us?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'security',
          label: 'Security',
          definition:
            'The pillar about the ability to protect data, systems and assets, with a strong identity foundation, traceability and encryption.',
          explanation:
            'This is a common mix-up: small, frequent, reversible changes aren’t a security principle. Camila is talking about how she operates and deploys her app.',
          correct: false,
        },
        {
          id: 'operational-excellence',
          label: 'Operational excellence',
          definition:
            'The pillar about how to organize the team, design, operate at scale and evolve the workload, with observability and safe automation.',
          explanation:
            'Making frequent, small, reversible changes and refining procedures such as runbooks are design principles of operational excellence.',
          correct: true,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'The pillar about running systems that deliver business value at the lowest price, with a consumption model and expenditure attribution.',
          explanation:
            'The Friday deployments aren’t a money problem, but a problem of how the team operates and changes the app.',
          correct: false,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'The pillar about the environmental impact of the workload, especially energy consumption and efficiency.',
          explanation:
            'Sustainability seeks to reduce environmental impact. It doesn’t tell you how to deploy changes without breaking the app.',
          correct: false,
        },
      ],
    },
    {
      id: 'zone-failure',
      prompt:
        'Second problem: if an Availability Zone fails, the ordering app must recover on its own, and we want to test every so often that we really can recover. Which pillar is that?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency',
          definition:
            'The pillar about using cloud resources efficiently to meet performance requirements as demand and technology change.',
          explanation:
            'Choosing the best-performing resource is performance efficiency. Recovering from failures and testing recovery belongs to another pillar.',
          correct: false,
        },
        {
          id: 'security',
          label: 'Security',
          definition:
            'The pillar about the ability to protect data, systems and assets, with a strong identity foundation, traceability and encryption.',
          explanation:
            'Security protects data and systems against improper access. The failure of an Availability Zone is a problem of working consistently.',
          correct: false,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'The pillar about running systems that deliver business value at the lowest price, with a consumption model and expenditure attribution.',
          explanation:
            'Camila’s goal isn’t to spend less, but to keep the app from going down when something fails.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'The pillar about the ability of a workload to perform its intended function correctly and consistently when it’s expected to.',
          explanation:
            'Automatically recovering from failure and testing recovery procedures are design principles of reliability.',
          correct: true,
        },
      ],
    },
    {
      id: 'test-server',
      prompt:
        'Third problem, the one that hurts my accountant the most: the test server is on 24 hours a day, but we only use it eight hours, Monday to Friday. We want to pay only for what we need. Which pillar guides us?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'The pillar about running systems that deliver business value at the lowest price, with a consumption model and expenditure attribution.',
          explanation:
            'Adopting a consumption model, like turning off test environments outside working hours, is a cost optimization principle. The goal here is to spend less.',
          correct: true,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'The pillar about the environmental impact of the workload, especially energy consumption and efficiency.',
          explanation:
            'Turning off the server also reduces energy use, but the accountant’s goal is to pay less. When the goal is money, the pillar is cost optimization.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'The pillar about the ability of a workload to perform its intended function correctly and consistently when it’s expected to.',
          explanation:
            'The test server doesn’t fail: it’s simply on when nobody is using it. That isn’t a reliability problem.',
          correct: false,
        },
        {
          id: 'operational-excellence',
          label: 'Operational excellence',
          definition:
            'The pillar about how to organize the team, design, operate at scale and evolve the workload, with observability and safe automation.',
          explanation:
            'Operational excellence is about how the app is operated and improved. The accountant’s problem is paying for hours nobody uses.',
          correct: false,
        },
      ],
    },
    {
      id: 'green-app',
      prompt:
        'Last problem: our most loyal customers care about the planet. We want to reduce the app’s environmental footprint, get the most out of every resource and have nothing sitting idle. Which pillar is that?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'cost-optimization',
          label: 'Cost optimization, because sustainability is part of that pillar',
          definition:
            'The pillar about running systems that deliver business value at the lowest price, with a consumption model and expenditure attribution.',
          explanation:
            'Sustainability isn’t part of cost optimization: it’s an official pillar of its own. And Camila’s goal is to pollute less, not to spend less.',
          correct: false,
        },
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency',
          definition:
            'The pillar about using cloud resources efficiently to meet performance requirements as demand and technology change.',
          explanation:
            'Performance efficiency seeks to meet performance requirements. Camila is asking about her app’s environmental impact.',
          correct: false,
        },
        {
          id: 'sustainability',
          label: 'Sustainability',
          definition:
            'The pillar about the environmental impact of the workload, especially energy consumption and efficiency.',
          explanation:
            'Understanding your impact, maximizing utilization and avoiding idle resources are design principles of sustainability, the framework’s sixth pillar.',
          correct: true,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'The pillar about the ability of a workload to perform its intended function correctly and consistently when it’s expected to.',
          explanation:
            'Reliability is about recovering from failures. It doesn’t help measure or reduce the app’s environmental footprint.',
          correct: false,
        },
      ],
    },
  ],
};
