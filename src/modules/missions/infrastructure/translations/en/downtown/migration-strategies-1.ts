import type { Mission } from '../../../../domain/Mission';

/**
 * Cloud Academy: a training institute in Quito that teaches cloud while its own servers sit in a basement whose lease ends soon.
 * Practices the 7 Rs (retire, rehost, repurchase) and AWS Application Migration Service for automated rehosting.
 */
export const migrationStrategies1: Mission = {
  id: 'migration-strategies-1',
  track: 'downtown',
  buildingId: 'academy',
  topicSlug: 'migration-strategies',
  title: 'The academy’s basement',
  client: { name: 'Fernanda Quispe', role: 'IT Coordinator at Cloud Academy' },
  intro: [
    'Hi, come in. I’m Fernanda Quispe, IT coordinator at Cloud Academy. From Quito we teach technology courses to thousands of students from all over Ecuador, in person and online.',
    'I have an embarrassing confession: we teach cloud, but all our systems run on forty servers in the basement of a building we rent.',
    'The lease on that basement ends in four months and the owner won’t renew it. We have everything down there: the course platform, email, old systems nobody remembers anymore...',
    'If we don’t get out in time, students will be left without classes in the middle of the semester. Will you help me decide what to do with each system?',
  ],
  outro: {
    passed: [
      'Now this looks like a real migration plan! We shut down what nobody uses, move the rest quickly and stop maintaining our own email.',
      'We’re finally going to practice what we teach. Thank you: whenever you like, you have a spot as a guest instructor at Cloud Academy.',
    ],
    failed: [
      'Hmm... with these decisions we won’t get out of the basement in four months. I still have doubts about which strategy to apply to each system.',
      'Review the theory on the 7 Rs and the migration services, and come back whenever you like. I’ll be waiting for you up here, not in the basement.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'forgotten-system',
      prompt:
        'Let’s start with the easy part. We found an old enrollment system that we replaced two years ago. We checked the logs and it hasn’t received a single inbound connection in the last 90 days. Which strategy do I apply to it?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'retain-old',
          label: 'Retain',
          definition:
            'A migration strategy that keeps the application in the source environment for now, for example because of pending dependencies or data residency.',
          explanation:
            'Retaining makes sense when the application is still needed and there’s a reason not to move it. This system no longer adds value, and the basement is closing.',
          correct: false,
        },
        {
          id: 'rehost-old',
          label: 'Rehost (lift and shift)',
          definition:
            'A migration strategy that moves the application to AWS without changes, for example to Amazon EC2 instances.',
          explanation:
            'Moving a system nobody uses as is only carries the problem to the cloud, where you keep paying for it. The right move is to retire it.',
          correct: false,
        },
        {
          id: 'retire-old',
          label: 'Retire',
          definition:
            'A migration strategy that decommissions or archives applications that no longer add value to the business.',
          explanation:
            'An application with no inbound connections in the last 90 days is the textbook example of retire: you archive what’s needed, shut it down and don’t migrate it.',
          correct: true,
        },
        {
          id: 'repurchase-old',
          label: 'Repurchase (drop and shop)',
          definition:
            'A migration strategy that replaces the application with a different product or version, usually a SaaS offering.',
          explanation:
            'Buying a replacement for a system that was already replaced and that nobody uses would be overspending. This system is simply retired.',
          correct: false,
        },
      ],
    },
    {
      id: 'move-fast',
      prompt:
        'Now the urgent part: the course platform and thirty other servers have to leave the basement before the lease ends. There’s no time to redesign anything; we want to take them to AWS as they are and improve them later. Which strategy do we use?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'rehost-fast',
          label: 'Rehost (lift and shift)',
          definition:
            'A migration strategy that moves the application to AWS without changes, for example to Amazon EC2 instances.',
          explanation:
            'With a short deadline and many servers, moving without changes is the way to go. For large migrations, AWS recommends rehosting, relocating or replatforming first and modernizing afterward.',
          correct: true,
        },
        {
          id: 'refactor-fast',
          label: 'Refactor / re-architect',
          definition:
            'A migration strategy that redesigns the application to take advantage of cloud-native features, such as splitting a monolith into microservices.',
          explanation:
            'Refactor is the most complex and expensive strategy. With a four-month deadline and no time to redesign, it’s exactly what to avoid right now.',
          correct: false,
        },
        {
          id: 'retain-fast',
          label: 'Retain',
          definition:
            'A migration strategy that keeps the application in the source environment for now, for example because of pending dependencies or data residency.',
          explanation:
            'Retaining leaves the systems where they are, and the basement won’t be available in four months. The academy needs to move them.',
          correct: false,
        },
        {
          id: 'repurchase-fast',
          label: 'Repurchase (drop and shop)',
          definition:
            'A migration strategy that replaces the application with a different product or version, usually a SaaS offering.',
          explanation:
            'Swapping thirty servers for new products forces you to choose, configure and learn each one. Fernanda wants to move her systems as they are.',
          correct: false,
        },
      ],
    },
    {
      id: 'rehost-tool',
      prompt:
        'Perfect, we’ll rehost. But there are only three of us in IT. Which AWS service replicates our servers to AWS automatically and continuously, so the final cutover takes minutes and not a whole weekend?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'migration-hub',
          label: 'AWS Migration Hub',
          definition:
            'A single place to discover servers, plan and track the status of each migration, regardless of the tool used.',
          explanation:
            'Migration Hub tracks migrations, but it doesn’t replicate servers. That execution is done by AWS Application Migration Service.',
          correct: false,
        },
        {
          id: 'migration-evaluator',
          label: 'Migration Evaluator',
          definition:
            'A service that builds a data-driven business case: it inventories the on-premises environment, detects oversized servers and compares costs.',
          explanation:
            'Migration Evaluator helps you decide on and justify the migration with numbers. It doesn’t move or replicate servers.',
          correct: false,
        },
        {
          id: 'sct',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'A tool that converts a database schema from one engine to another, for example from Oracle to Aurora PostgreSQL.',
          explanation:
            'SCT converts database schemas when the engine changes. It doesn’t replicate entire servers for rehosting.',
          correct: false,
        },
        {
          id: 'application-migration-service',
          label: 'AWS Application Migration Service',
          definition:
            'A service that replicates physical, virtual or other-cloud servers to AWS with continuous block-level replication; its documentation now calls it AWS Transform MGN.',
          explanation:
            'It’s the automated rehost service: it continuously replicates the basement servers to AWS and allows cutovers of minutes, ideal for a small team short on time.',
          correct: true,
        },
      ],
    },
    {
      id: 'email-server',
      prompt:
        'Last system: an email server we installed ourselves years ago that gives us trouble every week. We don’t want to maintain it anymore; we’d rather replace it with a SaaS email service and forget about the server. Which strategy is that?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'replatform-email',
          label: 'Replatform (lift, tinker and shift)',
          definition:
            'A migration strategy that moves the application with some optimizations, without changing its core architecture.',
          explanation:
            'This is the classic trap: replatform keeps the same application with tweaks. Fernanda wants to switch products, and that’s repurchase.',
          correct: false,
        },
        {
          id: 'repurchase-email',
          label: 'Repurchase (drop and shop)',
          definition:
            'A migration strategy that replaces the application with a different product or version, usually a SaaS offering.',
          explanation:
            'Dropping your own email server and moving to a SaaS product is exactly repurchase: you abandon the current application and adopt another one.',
          correct: true,
        },
        {
          id: 'relocate-email',
          label: 'Relocate',
          definition:
            'A migration strategy that transfers servers from an on-premises platform to the cloud version of that platform, or moves resources to another VPC, Region or account.',
          explanation:
            'Relocate moves the same application without changing its architecture. The academy wants to stop having its own email server.',
          correct: false,
        },
        {
          id: 'refactor-email',
          label: 'Refactor / re-architect',
          definition:
            'A migration strategy that redesigns the application to take advantage of cloud-native features, such as splitting a monolith into microservices.',
          explanation:
            'Redesigning your own email server would be the most complex and expensive path, and you’d still be maintaining it. What they want is to replace it with SaaS.',
          correct: false,
        },
      ],
    },
  ],
};
