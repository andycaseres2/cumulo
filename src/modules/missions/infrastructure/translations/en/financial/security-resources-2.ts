import type { Mission } from '../../../../domain/Mission';

/**
 * Torre Financiera: a payments fintech in Panama City with offices in the tower, facing abuse, a possible AWS vulnerability and new hires.
 * Practices reporting abuse to AWS Trust & Safety, the vulnerability disclosure program, the AWS Security Blog
 * and the per-service chapters of the AWS Security Documentation.
 */
export const securityResources2: Mission = {
  id: 'security-resources-2',
  track: 'financial',
  topicSlug: 'security-resources',
  buildingId: 'financial-tower',
  title: 'Every report to the right desk',
  client: { name: 'Ernesto Batista', role: 'CTO of PagoIstmo, a payments fintech in the Torre Financiera' },
  intro: [
    'Come in, we’re on the twelfth floor. I’m Ernesto Batista, CTO of PagoIstmo, a payments fintech with offices in this tower in Panama City. We process payments for merchants all over the country.',
    'This week was crazy. An AWS IP is attacking us, our pentester thinks she found a flaw in an AWS service and five new developers joined who need to learn fast.',
    'Everyone is asking me whom to notify or where to read up, and each of them opened a different support case. We’re getting nowhere like this.',
    'I need every report to go to the right desk and the team to know where to learn. Will you help me bring some order?',
  ],
  outro: {
    passed: [
      'Perfect: the abuse goes to Trust & Safety, the possible flaw to the vulnerability disclosure program, and the new hires now follow the Security Blog and each service’s security documentation.',
      'At last every report has its desk. Thank you: at PagoIstmo there will always be a coffee for you on the twelfth floor.',
    ],
    failed: [
      'Hmm... with these answers we’d keep knocking on the wrong door. Several reports would get lost along the way.',
      'Review the theory on security resources and come back whenever you like. The tower isn’t going anywhere.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'report-abuse',
      prompt:
        'First things first: an EC2 instance with a public AWS IP, which isn’t ours, has been sending malicious traffic to our payment gateway for two days. Whom do we report it to?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'trust-safety',
          label: 'To AWS Trust & Safety, using the AWS abuse form',
          definition:
            'The AWS team that receives reports when an AWS resource is used for abusive purposes, through the abuse form or its official email.',
          explanation:
            'When an AWS resource is used for abusive purposes, like an EC2 instance sending malicious traffic, the channel is AWS Trust & Safety through the abuse form.',
          correct: true,
        },
        {
          id: 'support-case',
          label: 'By opening a technical support case with AWS Support',
          definition:
            'The channel for asking AWS for help with technical or billing problems in your own account.',
          explanation:
            'AWS Support handles problems in your own account. Opening a technical case to report abuse from an AWS IP is a classic exam trap.',
          correct: false,
        },
        {
          id: 'vdp-abuse',
          label: 'To the AWS vulnerability disclosure program',
          definition:
            'The AWS channel for researchers to report possible security vulnerabilities in AWS services.',
          explanation:
            'That program is for flaws in AWS services, not for someone else’s abusive use of an AWS resource.',
          correct: false,
        },
        {
          id: 'artifact-abuse',
          label: 'By downloading a report from AWS Artifact',
          definition:
            'A portal to download AWS compliance reports, such as SOC, ISO or PCI.',
          explanation:
            'AWS Artifact provides compliance reports. It isn’t used to report abusive activity.',
          correct: false,
        },
      ],
    },
    {
      id: 'report-vulnerability',
      prompt:
        'Second report: our pentester thinks she found a possible vulnerability in an AWS service, not in our application. She wants to report it responsibly. Through which channel does she do it?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'abuse-form-vuln',
          label: 'Through the AWS Trust & Safety abuse form',
          definition:
            'A form to let AWS know that an AWS resource is being used for abusive purposes, such as sending spam or malicious traffic.',
          explanation:
            'Trust & Safety receives reports about AWS resources used for abusive purposes, not about vulnerabilities in the services.',
          correct: false,
        },
        {
          id: 'marketplace-vuln',
          label: 'By buying a security product in AWS Marketplace',
          definition:
            'Buying and deploying third-party security software through AWS’s curated catalog.',
          explanation:
            'Buying a third-party product doesn’t notify AWS about the flaw the pentester found.',
          correct: false,
        },
        {
          id: 'knowledge-center-vuln',
          label: 'By posting it in the AWS Knowledge Center',
          definition:
            'A collection of articles on AWS re:Post with step-by-step solutions to customers’ frequent questions.',
          explanation:
            'The Knowledge Center offers solutions to frequent problems. It isn’t a channel for reporting vulnerabilities in AWS services.',
          correct: false,
        },
        {
          id: 'vdp',
          label: 'Through the AWS vulnerability disclosure program',
          definition:
            'The AWS channel for responsibly reporting possible security vulnerabilities in its services.',
          explanation:
            'Vulnerabilities in AWS services are reported through the vulnerability disclosure program, which is the right channel for the pentester.',
          correct: true,
        },
      ],
    },
    {
      id: 'learn-news',
      prompt:
        'Now the five new developers. I want them to keep up with news and read hands-on examples written by AWS specialists on identity management, threat detection and cryptography. Which resource do I recommend they follow?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'artifact-news',
          label: 'AWS Artifact',
          definition:
            'A self-service offering that provides access to AWS compliance reports and agreements.',
          explanation:
            'Artifact is for downloading compliance reports. It doesn’t publish news or hands-on examples.',
          correct: false,
        },
        {
          id: 'security-blog',
          label: 'AWS Security Blog',
          definition:
            'An AWS blog that publishes technical guides, news and security best practices written by specialists.',
          explanation:
            'The Security Blog publishes news, technical guides and hands-on examples on identity, threat detection and cryptography: exactly what the new hires need.',
          correct: true,
        },
        {
          id: 'marketplace-news',
          label: 'AWS Marketplace',
          definition:
            'A catalog of third-party software and services with pricing models such as hourly, annual or BYOL.',
          explanation:
            'AWS Marketplace sells third-party products. It isn’t a source of articles by AWS specialists.',
          correct: false,
        },
        {
          id: 'trust-safety-news',
          label: 'AWS Trust & Safety Center',
          definition:
            'A center on AWS re:Post about how to report abuse, prohibited uses and how to respond to an abuse notice.',
          explanation:
            'The Trust & Safety Center deals with abuse of AWS resources. It isn’t a learning resource on cryptography or threat detection.',
          correct: false,
        },
      ],
    },
    {
      id: 'configure-service',
      prompt:
        'One last question. One of the new hires is going to store payment receipts in Amazon S3 and needs to know how to securely configure that service’s encryption, access control and logging. Where does he read about it?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'trust-safety-config',
          label: 'In the AWS Trust & Safety Center',
          definition:
            'An AWS center that explains how to report an AWS resource being used for abusive purposes.',
          explanation:
            'The Trust & Safety Center deals with abuse reports and prohibited uses. It doesn’t document how to configure S3 security.',
          correct: false,
        },
        {
          id: 'artifact-config',
          label: 'In AWS Artifact',
          definition:
            'A portal to download AWS compliance reports and manage agreements with AWS.',
          explanation:
            'Artifact provides AWS compliance evidence. It doesn’t explain how to configure a service’s encryption or access control.',
          correct: false,
        },
        {
          id: 's3-security-chapter',
          label: 'In the Amazon S3 security chapter of the AWS Security Documentation',
          definition:
            'AWS security documentation that includes a security chapter for each service, organized by category.',
          explanation:
            'When the question is how to securely configure a specific service, the answer is its security section. The S3 chapter explains encryption, access control and logging.',
          correct: true,
        },
        {
          id: 'marketplace-config',
          label: 'In AWS Marketplace',
          definition:
            'A catalog where you buy and deploy third-party products, such as AMIs or software as a service.',
          explanation:
            'AWS Marketplace is for buying third-party products. It isn’t the guide to securely configuring Amazon S3.',
          correct: false,
        },
      ],
    },
  ],
};
