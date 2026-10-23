import type { Mission } from '../../../../domain/Mission';

/**
 * Universidad Tecnológica: the university's IT team in Arequipa keeping its online enrollment platform alive.
 * Practices Amazon CloudWatch alarms, AWS CloudTrail, AWS Systems Manager and AWS Health Dashboard.
 */
export const monitoringAndOperations1: Mission = {
  id: 'monitoring-and-operations-1',
  track: 'tech',
  topicSlug: 'monitoring-and-operations',
  buildingId: 'university',
  title: 'Enrollment Week',
  client: { name: 'Rosa Apaza', role: 'Head of Infrastructure at Universidad Tecnológica' },
  intro: [
    'Welcome to the university. I\'m Rosa Apaza, head of infrastructure. From Arequipa, we run the online enrollment system used by more than twenty thousand students.',
    'The platform runs on EC2 instances, and every semester the same thing happens: during enrollment week it slows down, it crashes, and we find out from complaints on social media.',
    'On top of that, last weekend someone changed something and nobody knows who. And my team spends entire nights patching servers one by one, opening port 22 to get in.',
    'Enrollment opens in two weeks. If it fails again, the president will ask for my resignation. Will you help me get these operations in order?',
  ],
  outro: {
    passed: [
      'Now we\'re talking. The alarms warn us before the students do, we know who made each change, and patches are applied to all the servers at once.',
      'And if the failure is on AWS\'s side, we see it in the Health Dashboard instead of guessing. Thank you: the president wants to invite you to give a talk in the auditorium.',
    ],
    failed: [
      'Hmm... with these answers, enrollment week is going to be as chaotic as ever.',
      'Review monitoring and operations theory and come back whenever you like. The IT office door is always open.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'cpu-alarm',
      prompt:
        'First things first: I never want to learn about an outage from social media again. I need to see the CPU usage of the enrollment servers on a dashboard, and if it goes above 80%, we should get an alert and an automatic action should kick in. Which service do we use?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'A service that monitors resources and applications in real time with metrics, logs, dashboards and alarms.',
          explanation:
            'CloudWatch receives metrics such as CPU usage and displays them on dashboards, and its alarms watch the 80% threshold, notify the team and can run automatic actions.',
          correct: true,
        },
        {
          id: 'cloudtrail-alarm',
          label: 'AWS CloudTrail',
          definition:
            'A service that records actions taken in the account by users, roles and services as events.',
          explanation:
            'CloudTrail answers who did what and when. It doesn\'t watch performance metrics such as CPU against a threshold.',
          correct: false,
        },
        {
          id: 'config-alarm',
          label: 'AWS Config',
          definition:
            'A service that records the configuration of resources and their changes, and evaluates whether they comply with defined rules.',
          explanation:
            'Config shows how a resource is configured and whether it complies with the rules, but it doesn\'t measure CPU usage in real time.',
          correct: false,
        },
        {
          id: 'license-alarm',
          label: 'AWS License Manager',
          definition:
            'A service that manages software licenses from vendors such as Microsoft, SAP, Oracle and IBM.',
          explanation:
            'License Manager tracks license consumption. It doesn\'t monitor the performance of the enrollment servers.',
          correct: false,
        },
      ],
    },
    {
      id: 'weekend-change',
      prompt:
        'Now for the weekend mystery: someone modified the security group of the enrollment servers and left the platform inaccessible for hours. I need to know which user made that change and at what time. Where do I look?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudwatch-who',
          label: 'Amazon CloudWatch',
          definition:
            'A monitoring service with real-time performance metrics, logs, dashboards and alarms.',
          explanation:
            'This is the classic trap: CloudWatch answers how something is performing. To find out who performed an API action, the source is CloudTrail.',
          correct: false,
        },
        {
          id: 'health-who',
          label: 'AWS Health Dashboard',
          definition:
            'A dashboard that shows the health of AWS services and the events affecting the account and its resources.',
          explanation:
            'Health Dashboard reports on AWS events. It doesn\'t identify which university user modified a security group.',
          correct: false,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'A service that records, as events, the actions taken by users, roles and services from the console, the CLI, the SDKs and the APIs.',
          explanation:
            'CloudTrail answers who did what, on which resource and when. Event history shows the management events from the last 90 days, and a trail to S3 stores them continuously.',
          correct: true,
        },
        {
          id: 'compute-optimizer-who',
          label: 'AWS Compute Optimizer',
          definition:
            'A service that analyzes the configuration and usage metrics of resources to recommend the right size for them.',
          explanation:
            'Compute Optimizer provides rightsizing recommendations. It doesn\'t record who made changes in the account.',
          correct: false,
        },
      ],
    },
    {
      id: 'patching',
      prompt:
        'My team spends nights patching two hundred servers one by one, and they open port 22 to get in. I want to apply patches to all of them at once and connect without opening inbound ports or using SSH. Which service do we use?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-catalog-patch',
          label: 'AWS Service Catalog',
          definition:
            'A service for creating catalogs of approved IT products that users launch through self-service.',
          explanation:
            'Service Catalog controls which approved products teams can launch. It doesn\'t patch servers that already exist.',
          correct: false,
        },
        {
          id: 'cloudwatch-patch',
          label: 'Amazon CloudWatch',
          definition:
            'A service that collects metrics and logs, and triggers alarms about resources and applications.',
          explanation:
            'CloudWatch can warn you that a server has problems, but it isn\'t the tool to patch it or to connect to it.',
          correct: false,
        },
        {
          id: 'compute-optimizer-patch',
          label: 'AWS Compute Optimizer',
          definition:
            'A service that recommends rightsizing for resources such as EC2 instances based on their usage metrics.',
          explanation:
            'Compute Optimizer recommends instance sizes. It doesn\'t run patches or provide remote access to the servers.',
          correct: false,
        },
        {
          id: 'systems-manager',
          label: 'AWS Systems Manager',
          definition:
            'A service to view, manage and operate nodes at scale, with patching, remote commands and secure connections to the nodes.',
          explanation:
            'With the SSM Agent on the servers, Systems Manager patches all of them at once, and Session Manager lets you connect without opening inbound ports, without bastion hosts or SSH: a repeatable process instead of manual work.',
          correct: true,
        },
      ],
    },
    {
      id: 'aws-event',
      prompt:
        'Last question. If the platform fails on enrollment day and the team suspects it isn\'t our fault, but rather an AWS event in the Region affecting our resources, where do we confirm it?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-quotas-event',
          label: 'Service Quotas',
          definition:
            'A service to view and manage AWS service quotas from one place and request increases.',
          explanation:
            'Service Quotas shows the account\'s limits and lets you request increases. It doesn\'t report on AWS events affecting resources.',
          correct: false,
        },
        {
          id: 'health-dashboard',
          label: 'AWS Health Dashboard, in the Your account health view',
          definition:
            'A dashboard with the health of AWS services: public events across all Regions and events affecting an account and its resources.',
          explanation:
            'The Your account health view shows the AWS events affecting the university\'s account and its resources, including scheduled activities.',
          correct: true,
        },
        {
          id: 'cloudtrail-event',
          label: 'AWS CloudTrail',
          definition:
            'An auditing service that records the actions taken in the account by users, roles and services.',
          explanation:
            'CloudTrail records actions within the account, but it doesn\'t report on the status of AWS services in the Region.',
          correct: false,
        },
        {
          id: 'config-event',
          label: 'AWS Config',
          definition:
            'A service that keeps the configuration history of resources and evaluates their compliance with rules.',
          explanation:
            'Config shows how the configuration of resources changed, not whether an AWS event is affecting them.',
          correct: false,
        },
      ],
    },
  ],
};
