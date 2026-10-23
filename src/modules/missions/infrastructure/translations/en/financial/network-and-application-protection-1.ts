import type { Mission } from '../../../../domain/Mission';

/**
 * Joyería Oro Inca: a family jewelry shop in Lima whose online store, served with Amazon CloudFront, is under attack by bots.
 * Practices AWS WAF (SQL injection, rate-based rules, the Count action) and AWS Shield Standard.
 */
export const networkAndApplicationProtection1: Mission = {
  id: 'network-and-application-protection-1',
  track: 'financial',
  topicSlug: 'network-and-application-protection',
  buildingId: 'jewelry-store',
  title: 'Jewels kept safe online',
  client: { name: 'Rosa Huamán', role: 'Owner of Joyería Oro Inca' },
  intro: [
    'Welcome to Joyería Oro Inca. I’m Rosa Huamán; my grandfather opened this workshop in Lima, and today we sell our gold and silver pieces all over the country from an online store.',
    'The store runs on AWS: the EC2 instances sit behind an Application Load Balancer and we serve the site with Amazon CloudFront. Until a month ago everything was going wonderfully.',
    'Now some bots are trying to inject strange code into the jewelry search box and others hammer the sign-in page thousands of times per minute. My customers complain that the site is slow.',
    'The Mother’s Day campaign is coming, the most important one of the year. If the store goes down that week, we lose months of sales. Will you help me armor it?',
  ],
  outro: {
    passed: [
      'Look at the dashboard: AWS WAF is already stopping the SQL injection and the rate-based rule cuts off the bots before they overwhelm the sign-in page.',
      'And now I know that Shield Standard protects us against the most common DDoS attacks without me having to turn anything on. Thank you: this campaign is going to shine like our jewelry.',
    ],
    failed: [
      'Hmm... I’m not sure these measures will stop the bots. Some of your answers don’t convince me.',
      'Review the theory on WAF and Shield calmly and come back before the campaign. I’ll be waiting with a coffee.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'sql-injection',
      prompt:
        'Let’s start with the most serious problem. In the logs we see someone typing fragments of SQL code into the jewelry search box, trying to pull data out of our database. The site is served with Amazon CloudFront. What do we use to filter those requests?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'security-group-sqli',
          label: 'A security group on the EC2 instances',
          definition:
            'An instance-level virtual firewall that allows traffic based on IP addresses, ports and protocols, with allow-only rules.',
          explanation:
            'Security groups work at layers 3 and 4 with IPs and ports. They don’t inspect the HTTP content of the search box, which is where the SQL injection travels.',
          correct: false,
        },
        {
          id: 'waf-sqli',
          label: 'AWS WAF, with a web ACL associated with CloudFront',
          definition:
            'A web application firewall that monitors and filters HTTP(S) requests at layer 7 using web ACLs, rules and rule groups.',
          explanation:
            'AWS WAF inspects the content of web requests and has rules to detect SQL injection. It’s associated with CloudFront, so it filters attacks before they reach the store.',
          correct: true,
        },
        {
          id: 'nacl-sqli',
          label: 'A network ACL on the instances’ subnet',
          definition:
            'A stateless, subnet-level access control list with allow and deny rules by IP and port, evaluated in numerical order.',
          explanation:
            'A network ACL filters by IP and port at the subnet. It doesn’t look inside the HTTP request, so it doesn’t detect SQL code typed into the search box.',
          correct: false,
        },
        {
          id: 'shield-standard-sqli',
          label: 'AWS Shield Standard',
          definition:
            'Protection against the most common layer 3 and 4 DDoS attacks, automatically active for all AWS customers.',
          explanation:
            'Shield Standard protects against attacks that try to overwhelm the network. SQL injection is a layer 7 attack on the request’s content, which is AWS WAF’s job.',
          correct: false,
        },
      ],
    },
    {
      id: 'login-flood',
      prompt:
        'Second problem: a handful of IP addresses send thousands of requests per minute to the sign-in page. I want any IP that goes over a certain number of requests to be blocked automatically, without me watching. What do we configure?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'shield-standard-rate',
          label: 'AWS Shield Standard',
          definition:
            'A DDoS protection service at no additional charge that mitigates the most common attacks against the network and transport layers.',
          explanation:
            'Shield Standard acts on layer 3 and 4 attacks. It doesn’t count HTTP requests per IP or apply a limit to the sign-in page.',
          correct: false,
        },
        {
          id: 'security-group-rate',
          label: 'A security group that lists the bots’ IPs',
          definition:
            'A set of inbound and outbound rules associated with an instance’s network interface, which only supports allow rules.',
          explanation:
            'Security groups only support allow rules, so they can’t be used to block IPs, and they don’t count requests to react when an IP exceeds a threshold.',
          correct: false,
        },
        {
          id: 'nacl-rate',
          label: 'A network ACL with deny rules written by hand',
          definition:
            'Numbered allow and deny rules applied to all traffic entering or leaving a subnet.',
          explanation:
            'A network ACL can deny specific IPs, but someone would have to write them one by one. It doesn’t count HTTP requests or automatically block IPs that exceed a limit.',
          correct: false,
        },
        {
          id: 'waf-rate-rule',
          label: 'An AWS WAF rate-based rule',
          definition:
            'A type of AWS WAF rule that counts the requests arriving from each IP address and applies an action to those that exceed a defined number.',
          explanation:
            'Rate-based rules automatically block or count IPs that exceed a certain number of requests. It’s exactly what the jewelry shop’s sign-in page needs.',
          correct: true,
        },
      ],
    },
    {
      id: 'test-rule',
      prompt:
        'My nephew, who helps me with the store, is afraid the new rule will also block real customers. He wants to see first how many requests would match it before we start blocking. Which action do we give the rule?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'action-block',
          label: 'Block',
          definition:
            'An AWS WAF action that rejects the requests matching the rule, with an HTTP 403 or a custom response.',
          explanation:
            'Block would start rejecting requests from the very first minute. If the rule is poorly tuned, real customers would suffer before you could validate it.',
          correct: false,
        },
        {
          id: 'action-allow',
          label: 'Allow',
          definition: 'An AWS WAF action that lets the requests matching the rule through to the protected resource.',
          explanation:
            'Allow is for explicitly permitting traffic. It doesn’t give the nephew the measurement he wants of how many requests would match the rule.',
          correct: false,
        },
        {
          id: 'action-count',
          label: 'Count',
          definition:
            'An AWS WAF action that records how many requests match the rule and lets evaluation continue without blocking them.',
          explanation:
            'Count tallies the matches without blocking anyone, which is why it’s used to test a rule. Once the numbers show it only catches bots, you switch it to Block.',
          correct: true,
        },
        {
          id: 'action-captcha',
          label: 'CAPTCHA',
          definition:
            'An AWS WAF action that presents a challenge to the requester to check that they are a person.',
          explanation:
            'CAPTCHA does affect whoever matches the rule, because it asks them to solve a challenge. It isn’t the action meant for measuring a rule without touching the traffic.',
          correct: false,
        },
      ],
    },
    {
      id: 'shield-standard',
      prompt:
        'One last question. A vendor told me that to get AWS Shield Standard’s basic DDoS protection I have to pay for it and configure it in the console. My budget is tight. What do I need to do to have it?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.4'],
      options: [
        {
          id: 'nothing-automatic',
          label: 'Nothing: Shield Standard is active automatically and at no additional charge',
          definition:
            'The AWS Shield tier that protects all AWS customers against the most common layer 3 and 4 DDoS attacks.',
          explanation:
            'Shield Standard applies automatically to all customers at no additional charge, and it gives special benefit to services such as CloudFront, which the jewelry shop already uses.',
          correct: true,
        },
        {
          id: 'subscribe-advanced',
          label: 'Sign up for the paid subscription and choose the resources to protect',
          definition:
            'The AWS Shield Advanced subscription, which adds expanded protection, metrics, the Shield Response Team and cost protection for the chosen resources.',
          explanation:
            'That subscription describes Shield Advanced. Thinking that Shield Standard must be paid for or turned on is a classic exam trap: she already has it.',
          correct: false,
        },
        {
          id: 'firewall-manager-standard',
          label: 'Configure it from AWS Firewall Manager',
          definition:
            'A service that defines protection policies once and applies them across all the accounts of an AWS Organizations organization.',
          explanation:
            'Firewall Manager centralizes rules in organizations with several accounts. It isn’t a necessary step to have Shield Standard in the jewelry shop’s account.',
          correct: false,
        },
        {
          id: 'business-support',
          label: 'Sign up for a paid AWS Support plan',
          definition:
            'A paid support plan that gives access to AWS engineers and more Trusted Advisor checks, among other benefits.',
          explanation:
            'A paid support plan is required to work with the Shield Advanced Shield Response Team. Shield Standard doesn’t require one.',
          correct: false,
        },
      ],
    },
  ],
};
