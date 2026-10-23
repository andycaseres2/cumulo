import type { Mission } from '../../../domain/Mission';

/**
 * Clínica Vida: a clinic whose appointment and patient-record system cannot go down.
 * Practices RDS Multi-AZ, the Reliability pillar, CloudWatch alarms, Elastic Disaster Recovery and multi-Region DR.
 */
export const clinicResilience: Mission = {
  id: 'clinic-resilience',
  track: 'tech',
  topicSlug: 'relational-databases',
  buildingId: 'clinic',
  title: 'Systems that can’t go down',
  client: { name: 'Dr. Jorge Salazar', role: 'Medical Director of Clínica Vida' },
  intro: [
    'Thank you for coming. I’m Dr. Jorge Salazar, medical director of Clínica Vida. We see hundreds of patients every day here in Quito.',
    'Everything goes through our system: appointments, medical records, lab results. If the system stops, the doctors are working blind.',
    'Last year a power outage shut down our servers for hours. We couldn’t see a patient’s allergies or confirm an appointment. Those were very distressing hours.',
    'We’re moving the system to AWS and I want to do it right: it must not go down, it must warn us before something fails, and we must be able to recover from a disaster. Will you help me design it?',
  ],
  outro: {
    passed: [
      'Excellent. With the database in several zones, alarms that warn us in time and a tested recovery plan, I can finally sleep soundly.',
      'My patients will never know everything we did today, and that’s exactly the best part. Thank you very much. Our doors will always be open to you.',
    ],
    failed: [
      'I appreciate the effort, but I still don’t feel safe. With people’s health we can’t leave anything to chance.',
      'Review the theory calmly and come back when you’re ready. I’ll be glad to see you.',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'database-availability',
      prompt:
        'The medical records live in a MySQL database that we’re moving to Amazon RDS. If the Availability Zone it’s in fails, the database has to keep working. What do we configure?',
      topicSlug: 'relational-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'read-replicas',
          label: 'Read replicas',
          definition:
            'Read-only copies of an RDS database, kept up to date with asynchronous replication, designed to scale reads.',
          explanation:
            'Read replicas are for spreading out queries and reports, not for automatic failover. The doctor’s goal is to keep the database available, not to read faster.',
          correct: false,
        },
        {
          id: 'rds-multi-az',
          label: 'Amazon RDS Multi-AZ',
          definition:
            'An RDS configuration that synchronously replicates the database to a standby instance in another Availability Zone of the same Region.',
          explanation:
            'Correct. Multi-AZ is built for high availability: if the primary zone fails, RDS fails over to the standby and the clinic’s system keeps serving.',
          correct: true,
        },
        {
          id: 'mysql-on-ec2',
          label: 'MySQL installed on a single EC2 instance',
          definition:
            'A self-managed database: AWS manages the hardware, but the customer installs, patches, backs up and configures high availability.',
          explanation:
            'A single instance in a single zone is a single point of failure, and the clinic would also have to handle patches and backups. It’s exactly the opposite of what it needs.',
          correct: false,
        },
        {
          id: 'redshift',
          label: 'Amazon Redshift',
          definition:
            'The AWS data warehouse, optimized for analyzing large volumes of historical data with complex queries.',
          explanation:
            'Redshift is for large-scale analytics, not for day-to-day transactions like booking an appointment or updating a medical record.',
          correct: false,
        },
      ],
    },
    {
      id: 'well-architected-pillar',
      prompt:
        'My board of directors uses the AWS Well-Architected Framework to review projects. Our concern is that the system recovers from failures on its own and that we test the recovery. Which pillar does this belong to?',
      topicSlug: 'well-architected-framework',
      examTasks: ['1.2'],
      options: [
        {
          id: 'performance-efficiency',
          label: 'Performance efficiency',
          definition:
            'The pillar about using cloud resources efficiently to meet performance requirements as demand and technology change.',
          explanation:
            'Choosing the best-performing resource is performance efficiency. Recovering from failures is something else, and mixing them up is a classic exam trap.',
          correct: false,
        },
        {
          id: 'security',
          label: 'Security',
          definition:
            'The pillar about protecting data, systems and assets: a strong identity foundation, traceability, encryption and security at every layer.',
          explanation:
            'Protecting medical records is extremely important, but the doctor’s concern here is that the system doesn’t go down, not who accesses the data.',
          correct: false,
        },
        {
          id: 'cost-optimization',
          label: 'Cost optimization',
          definition:
            'The pillar about running systems that deliver business value at the lowest price, with a consumption model and expenditure attribution.',
          explanation:
            'This pillar is about spending less. The clinic’s goal in this question is to keep working through a failure, not to reduce the bill.',
          correct: false,
        },
        {
          id: 'reliability',
          label: 'Reliability',
          definition:
            'The pillar about the ability of a workload to perform its intended function correctly and consistently when it’s expected to.',
          explanation:
            'Exactly. Automatically recovering from failure and testing recovery procedures are design principles of the reliability pillar.',
          correct: true,
        },
      ],
    },
    {
      id: 'early-alerts',
      prompt:
        'We found out about last year’s outage when the doctors were already calling. I want the IT team to get an alert as soon as CPU or errors spike. What do we use?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['2.2', '3.1'],
      options: [
        {
          id: 'cloudwatch-alarms',
          label: 'Amazon CloudWatch alarms',
          definition:
            'A CloudWatch feature that watches a metric against a threshold, sends an alert and can run automatic actions.',
          explanation:
            'Correct. CloudWatch collects metrics such as CPU usage in real time, and an alarm notifies the team as soon as the threshold is crossed, before patients notice.',
          correct: true,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'An auditing service that records, as events, the actions of users, roles and services on the AWS API: who did what, and when.',
          explanation:
            'CloudTrail tells you who made a change, not how performance looks right now. To get an alert when CPU rises, the answer is CloudWatch.',
          correct: false,
        },
        {
          id: 'aws-config',
          label: 'AWS Config',
          definition:
            'A service that records the configuration of your resources and its changes to evaluate whether they comply with the rules you define.',
          explanation:
            'AWS Config tells you how a resource was configured and whether it follows the rules, not alerts for CPU or error spikes.',
          correct: false,
        },
        {
          id: 'trusted-advisor',
          label: 'AWS Trusted Advisor',
          definition:
            'A service that inspects your environment and recommends best practices for cost, performance, security and fault tolerance.',
          explanation:
            'Trusted Advisor gives general recommendations about your environment, but it doesn’t watch the appointment system’s CPU in real time to alert you on the spot.',
          correct: false,
        },
      ],
    },
    {
      id: 'disaster-recovery-service',
      prompt:
        'Now let’s think about the worst case: a major disaster. While we finish the migration, I want the clinic’s servers continuously replicated and ready to start on AWS in minutes, not hours. Which service does that?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'aws-backup',
          label: 'AWS Backup',
          definition:
            'A fully managed service that centralizes and automates backups across different AWS services with plans and vaults.',
          explanation:
            'AWS Backup keeps copies for restoring data, and it’s useful for the clinic, but it doesn’t keep entire servers ready to start within minutes.',
          correct: false,
        },
        {
          id: 'storage-gateway',
          label: 'AWS Storage Gateway',
          definition:
            'A hybrid bridge that connects an appliance in your data center to AWS storage and keeps a local cache.',
          explanation:
            'Storage Gateway is for an ongoing hybrid setup with a local cache, not for bringing up recovery servers after a disaster.',
          correct: false,
        },
        {
          id: 'elastic-disaster-recovery',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A service that continuously replicates source servers to a staging area in AWS so they can be recovered quickly after a disaster.',
          explanation:
            'Correct. Elastic Disaster Recovery launches recovery instances in minutes, lets you run drills without disrupting operations, and then fail back to the primary site.',
          correct: true,
        },
        {
          id: 'health-dashboard',
          label: 'AWS Health Dashboard',
          definition:
            'A dashboard that shows the health of AWS services and the events affecting your account and your resources.',
          explanation:
            'The Health Dashboard tells you whether an AWS issue affects the clinic’s account, but it doesn’t replicate or recover any server.',
          correct: false,
        },
      ],
    },
    {
      id: 'second-region',
      prompt:
        'My partner insists on using a second AWS Region from day one. I thought several Availability Zones were enough. When does a second Region make sense?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'datacenter-failure',
          label: 'To keep working if a data center fails',
          definition:
            'Tolerating the failure of a data center within a Region, the typical high availability scenario.',
          explanation:
            'Several Availability Zones are enough for that, since they don’t share single points of failure. Choosing several Regions here is a classic exam trap.',
          correct: false,
        },
        {
          id: 'regional-disaster',
          label: 'When the plan must withstand the loss of an entire Region',
          definition:
            'Disaster recovery and business continuity at the regional level, keeping a copy or the active service in another Region.',
          explanation:
            'Correct. If the clinic’s definition of disaster includes losing an entire Region, it needs a copy in another one. If not, several AZs already cover the failure of a data center.',
          correct: true,
        },
        {
          id: 'automatic-replication',
          label: 'So that AWS copies the data between Regions on its own',
          definition:
            'The idea that resources created in one Region automatically appear in the other Regions.',
          explanation:
            'Data doesn’t leave a Region unless you explicitly replicate or copy it. A second Region doesn’t do anything by itself.',
          correct: false,
        },
        {
          id: 'edge-cache',
          label: 'So the appointments page loads faster in Quito',
          definition:
            'Delivering cached content close to users through edge locations and Amazon CloudFront.',
          explanation:
            'Bringing content closer to patients in the same city is solved with CloudFront and its edge locations, not by opening a second Region.',
          correct: false,
        },
      ],
    },
  ],
};
