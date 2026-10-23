import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const monitoringFamily: ServiceFamily = {
  id: 'monitoring',
  title: 'Monitoring, auditing and operations',
  summary:
    'Metrics and alarms, who called which API, how a resource was configured, where a request travels, best-practice recommendations, AWS events that affect you and server operations.',
  services: [
    { name: 'Amazon CloudWatch', summary: 'Metrics, alarms, logs and dashboards for your resources and applications.' },
    { name: 'AWS CloudTrail', summary: 'Records API calls: who did what, when and from where.' },
    { name: 'AWS Config', summary: 'Configuration history of every resource, plus rules that flag what is noncompliant.' },
    { name: 'AWS X-Ray', summary: 'Traces requests across microservices and shows a map with latencies and errors.' },
    { name: 'AWS Trusted Advisor', summary: 'Recommendations on cost, performance, security, fault tolerance, operational excellence and service limits.' },
    { name: 'AWS Health Dashboard', summary: 'AWS events that affect your account: incidents, maintenance and planned changes.' },
    { name: 'AWS Systems Manager', summary: 'Operates servers at scale: patches, remote commands and sessions without SSH or a bastion host.' },
  ],
  cards: [
    {
      id: 'monitoring-1',
      prompt:
        'A school in Quito wants to get an email when the CPU usage of its enrollment server stays above 80% for ten minutes straight. Which service does it set up?',
      options: [
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail records API calls; it does not measure CPU usage or trigger threshold alarms.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'A CloudWatch alarm watches the CPU metric against a threshold and notifies you, for example through an SNS topic.',
        },
        {
          service: 'AWS Config',
          why: 'Config records resource configuration changes; it does not watch performance metrics.',
        },
      ],
      answer: 'Amazon CloudWatch',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-2',
      prompt:
        'Yesterday someone deleted a bucket at a travel agency in Cusco. The manager wants to know which user did it, at what time and from which IP. Where do you look?',
      options: [
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch holds application metrics and logs; recording every API call with its caller is another service.',
        },
        {
          service: 'AWS Config',
          why: 'Config shows how the resource configuration changed; to know who called the API and from which IP you use another service.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail stores every action by users, roles and services with who, when and from where; the event history covers 90 days.',
        },
      ],
      answer: 'AWS CloudTrail',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-3',
      prompt:
        'A bank in Tegucigalpa must show its regulator which rules a security group had three months ago and how it has changed since then. Which service keeps that history?',
      options: [
        {
          service: 'AWS Config',
          why: 'Config keeps the configuration history of every resource, so you can see which ports the group opened on a given date.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail records the calls that changed the group, but it does not present the full state of the resource at each point in time.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor checks the current state against best practices; it does not keep configuration history.',
        },
      ],
      answer: 'AWS Config',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-4',
      prompt:
        'The ordering app of a restaurant chain in Lima has eight microservices and sometimes takes five seconds. You want to follow a request end to end and see which one slows it down. What do you use?',
      options: [
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail audits AWS API calls; it does not follow the path of your app request across services.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch shows metrics for each service, but the trace map of a request comes from another service.',
        },
        {
          service: 'AWS X-Ray',
          why: 'X-Ray traces each request through the services it calls, and its map shows bottlenecks and latency spikes.',
        },
      ],
      answer: 'AWS X-Ray',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-5',
      prompt:
        'A logistics company in Rosario wants an automatic review of its account that tells it where to save, which security gaps to close and whether it is close to service limits. Which service does it use?',
      options: [
        {
          service: 'AWS Config',
          why: 'Config evaluates resources against rules you define; it does not give savings or service limit recommendations.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor inspects your environment and recommends on cost, performance, security, fault tolerance and service limits.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch measures and alerts on metrics, but it does not compare your account with best practices to suggest changes.',
        },
      ],
      answer: 'AWS Trusted Advisor',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-6',
      prompt:
        'A fintech in Santiago wants to know if AWS has an incident in its Region or scheduled maintenance that will affect its instances, with the list of its affected resources. Where does it see that?',
      options: [
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch measures your resources; AWS incidents and maintenance affecting your account are published in another service.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor recommends best practices; it does not alert you to AWS incidents or maintenance.',
        },
        {
          service: 'AWS Health Dashboard',
          why: 'Health Dashboard shows the AWS events that affect your account and your resources, even on the free plan.',
        },
      ],
      answer: 'AWS Health Dashboard',
      topicSlug: 'support-plans',
    },
    {
      id: 'monitoring-7',
      prompt:
        'An insurer in San José has 200 servers, some on EC2 and some in its own data center. It wants to apply security patches to all of them and run commands without logging in one by one. What does it use?',
      options: [
        {
          service: 'AWS Config',
          why: 'Config can tell you which servers are noncompliant, but it does not install patches or run commands.',
        },
        {
          service: 'AWS Systems Manager',
          why: 'Systems Manager applies patches and runs remote commands on AWS and on-premises nodes that have the SSM Agent.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch collects metrics and logs from the servers; it does not patch them.',
        },
      ],
      answer: 'AWS Systems Manager',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-8',
      prompt:
        'A booking app in Cartagena writes its own error logs. The team wants to centralize them, query them and raise an alert when more than 50 errors per minute show up.',
      options: [
        {
          service: 'AWS X-Ray',
          why: 'X-Ray traces requests across services; it is not where you store and query the app logs.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail stores AWS API calls, not the logs your own application writes.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch Logs centralizes and queries logs, and a metric filter with an alarm notifies you when errors rise.',
        },
      ],
      answer: 'Amazon CloudWatch',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-9',
      prompt:
        'A credit union in Cochabamba must keep a record of every action taken in its accounts for more than 90 days, in its own bucket, to review it with Athena. Which service does it set up?',
      options: [
        {
          service: 'AWS Systems Manager',
          why: 'Systems Manager operates servers; it does not record the actions taken in the account.',
        },
        {
          service: 'AWS Config',
          why: 'Config stores resource configuration, not the record of every action by users and roles.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'A CloudTrail trail delivers events from one or more accounts to S3, where you keep them and query them with Athena.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch can receive those events, but another service records them and delivers them to the bucket.',
        },
      ],
      answer: 'AWS CloudTrail',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-10',
      prompt:
        'A clinic in Medellín requires all its EBS volumes to be encrypted. It wants every new volume to be evaluated automatically, flagged if noncompliant and fixed automatically. What does it use?',
      options: [
        {
          service: 'AWS Trusted Advisor',
          why: 'Trusted Advisor comes with predefined checks; it does not evaluate your own rules on every new resource or remediate it.',
        },
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail records the creation of the volume, but it does not evaluate whether it complies with a rule.',
        },
        {
          service: 'AWS Config',
          why: 'Config rules evaluate each resource when it is created or changed, flag it as noncompliant and allow remediation.',
        },
      ],
      answer: 'AWS Config',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'monitoring-11',
      prompt:
        'The security team of a bank in Asunción forbids opening port 22 and using bastion hosts. Even so, the team needs to get into the instances to troubleshoot. Which service makes that possible?',
      options: [
        {
          service: 'AWS Systems Manager',
          why: 'Session Manager, part of Systems Manager, connects to instances without opening inbound ports, without a bastion host and without SSH.',
        },
        {
          service: 'Amazon CloudWatch',
          why: 'CloudWatch shows metrics and logs, but it does not open a session on the instance.',
        },
        {
          service: 'AWS X-Ray',
          why: 'X-Ray traces app requests; it does not give access to the instance shell.',
        },
      ],
      answer: 'AWS Systems Manager',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-12',
      prompt:
        'A serverless app at a hospital in Guayaquil uses API Gateway, Lambda and DynamoDB. You want a map that shows how each request flows and in which segment errors appear. What do you turn on?',
      options: [
        {
          service: 'AWS CloudTrail',
          why: 'CloudTrail records who called which AWS API; it does not draw the path of your app requests.',
        },
        {
          service: 'AWS X-Ray',
          why: 'X-Ray receives traces from Lambda and other integrated services and builds a map of the client, the frontend and the services it calls.',
        },
        {
          service: 'AWS Systems Manager',
          why: 'Systems Manager operates nodes and servers; it does not trace requests in a serverless app.',
        },
      ],
      answer: 'AWS X-Ray',
      topicSlug: 'monitoring-and-operations',
    },
    {
      id: 'monitoring-13',
      prompt:
        'A startup in Montevideo on the free support plan sees only some security checks and all the service limit checks. It wants the full set of checks. Which service is it, and what does it need?',
      options: [
        {
          service: 'AWS Health Dashboard',
          why: 'Health Dashboard is already free for everyone and shows AWS events; it has no best-practice checks.',
        },
        {
          service: 'AWS Config',
          why: 'Config evaluates rules you define and is billed by usage; its scope does not depend on the support plan.',
        },
        {
          service: 'AWS Trusted Advisor',
          why: 'With Basic, Trusted Advisor gives the service limit checks and some security checks; the full set requires Business Support+ or higher.',
        },
      ],
      answer: 'AWS Trusted Advisor',
      topicSlug: 'support-plans',
    },
  ],
};
