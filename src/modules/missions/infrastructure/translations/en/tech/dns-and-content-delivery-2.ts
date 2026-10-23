import type { Mission } from '../../../../domain/Mission';

/**
 * Cóndor Arena: an online game studio in Santiago de Chile launching a real-time multiplayer game across the Americas.
 * Practices Amazon Route 53 (domains, health checks and latency routing), AWS Global Accelerator and Amazon API Gateway.
 */
export const dnsAndContentDelivery2: Mission = {
  id: 'dns-and-content-delivery-2',
  track: 'tech',
  topicSlug: 'dns-and-content-delivery',
  buildingId: 'data-center',
  title: 'Lag-free matches',
  client: { name: 'Renata Paz', role: 'Technical director of Cóndor Arena' },
  intro: [
    'Hi! I\'m Renata Paz, technical director of Cóndor Arena, a video game studio from Santiago de Chile. Our operations team works right here, in the Andean Data Center.',
    'In three months we\'re launching "Cóndores," a real-time multiplayer game. We already have game servers in two AWS Regions: one in South America and another in North America.',
    'And this is where my questions start: how players find our site, which Region each one connects to, how we keep matches lag-free and how we expose the companion app\'s API.',
    'If players feel lag on launch day, they\'ll tear us apart in the reviews. Can you help me make sure everything reaches every player fast?',
  ],
  outro: {
    passed: [
      'That\'s it! Route 53 with health checks and latency routing, Global Accelerator for the UDP matches and API Gateway as the app\'s front door.',
      'Now I can watch the launch countdown without biting my nails. Thank you: your name is going in the game\'s credits.',
    ],
    failed: [
      'Hmm... with this plan I think players are going to feel lag. And in this business, that\'s unforgivable.',
      'Review the DNS and content delivery theory and come back whenever you like. I\'ll be here waiting for the rematch.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'domain-and-health',
      prompt:
        'First, what the player sees: we want to buy the game\'s domain, have it lead to our servers when someone types it in, and if a server stops responding, have that detected automatically and the traffic rerouted to a healthy one. Which service covers all of that?',
      topicSlug: 'dns-and-content-delivery',
      examTasks: ['3.5'],
      options: [
        {
          id: 'cloudfront',
          label: 'Amazon CloudFront',
          definition: 'Content delivery network (CDN) that caches static and dynamic content at edge locations.',
          explanation:
            'CloudFront brings cached content closer to users, but it doesn\'t register domains and it isn\'t the DNS service that decides where to send each player.',
          correct: false,
        },
        {
          id: 'route53',
          label: 'Amazon Route 53',
          definition:
            'Highly available and scalable DNS service that registers domains, routes users and performs health checks.',
          explanation:
            'Route 53 covers all three needs: domain registration, DNS routing and health checks that detect unhealthy resources and route traffic away from them.',
          correct: true,
        },
        {
          id: 'api-gateway',
          label: 'Amazon API Gateway',
          definition: 'Managed service to create, publish, monitor and secure REST, HTTP and WebSocket APIs.',
          explanation:
            'API Gateway manages APIs; it doesn\'t register domains or resolve names to bring players to the servers.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition: 'Dedicated physical connection between an internal network and a Direct Connect location.',
          explanation:
            'Direct Connect links a company\'s network to AWS. It has nothing to do with domains or with how players arrive from the internet.',
          correct: false,
        },
      ],
    },
    {
      id: 'routing-policy',
      prompt:
        'Now, with servers in two Regions: I want each player to go to the Region that responds fastest for them. A player in Lima might get a better response time from one Region than another, even if it\'s farther away on the map. Which Route 53 routing policy should I choose?',
      topicSlug: 'dns-and-content-delivery',
      examTasks: ['3.5', '3.2'],
      options: [
        {
          id: 'geolocation',
          label: 'Geolocation',
          definition: 'Route 53 policy that responds based on the geographic location the user is querying from.',
          explanation:
            'Mixing up Geolocation and Latency is a classic trap. Geolocation decides based on the user\'s location, for example to show content by country, not on response time.',
          correct: false,
        },
        {
          id: 'weighted',
          label: 'Weighted',
          definition: 'Route 53 policy that splits traffic among resources according to defined proportions.',
          explanation:
            'Weighted splits traffic by percentages, for example to test a new version. It doesn\'t send each player to the Region with the best response time.',
          correct: false,
        },
        {
          id: 'latency',
          label: 'Latency',
          definition: 'Route 53 policy for resources in multiple Regions that sends the user to the one with the lowest latency.',
          explanation:
            'With resources in multiple Regions, the Latency policy sends each player to the Region with the lowest latency for them, no matter which one is closer on the map.',
          correct: true,
        },
        {
          id: 'simple',
          label: 'Simple',
          definition: 'Route 53 policy for when a single resource serves the domain.',
          explanation:
            'Simple is for when there\'s only one resource. Cóndor Arena has servers in two Regions and wants to choose between them.',
          correct: false,
        },
      ],
    },
    {
      id: 'realtime-traffic',
      prompt:
        'The trickiest part: matches use UDP and every millisecond counts. I want traffic to enter the AWS network as close to the player as possible, travel over the AWS global network and, if a Region fails, switch quickly to the other one. Which service do we use?',
      topicSlug: 'dns-and-content-delivery',
      examTasks: ['3.5', '3.2'],
      options: [
        {
          id: 'global-accelerator',
          label: 'AWS Global Accelerator',
          definition:
            'Service that brings TCP or UDP traffic into the AWS network through the nearest edge location and carries it over the AWS global network to the most suitable healthy endpoint.',
          explanation:
            'UDP games are a classic Global Accelerator use case: traffic travels over the AWS global network from the edge, and if a Region fails, it sends it to a healthy endpoint in another one.',
          correct: true,
        },
        {
          id: 'cloudfront-game',
          label: 'Amazon CloudFront',
          definition: 'CDN that caches copies of HTTP and HTTPS content at edge locations to deliver it with low latency.',
          explanation:
            'Choosing CloudFront for a UDP game is a classic trap. CloudFront shines with cached HTTP content; real-time matches can\'t be cached.',
          correct: false,
        },
        {
          id: 'route53-weighted',
          label: 'An Amazon Route 53 Weighted policy',
          definition: 'DNS routing policy that splits traffic among resources according to defined proportions.',
          explanation:
            'A DNS policy decides which resource to point to, but it doesn\'t carry the match packets over the AWS global network from the edge.',
          correct: false,
        },
        {
          id: 'api-gateway-game',
          label: 'Amazon API Gateway with WebSocket',
          definition: 'Managed service to create and secure REST, HTTP and WebSocket APIs, widely used with AWS Lambda.',
          explanation:
            'API Gateway is the front door for APIs. It doesn\'t accelerate the matches\' UDP traffic over the AWS global network.',
          correct: false,
        },
      ],
    },
    {
      id: 'companion-api',
      prompt:
        'Last topic: the game\'s companion app looks up stats and leaderboards by calling AWS Lambda functions. We need a front door for that API that controls traffic, verifies who\'s calling and lets us publish new versions. Which service do we use?',
      topicSlug: 'dns-and-content-delivery',
      examTasks: ['3.5'],
      options: [
        {
          id: 'global-accelerator-api',
          label: 'AWS Global Accelerator',
          definition: 'Service that accelerates TCP and UDP traffic with static anycast IP addresses and the AWS global network.',
          explanation:
            'Global Accelerator speeds up network traffic to endpoints like load balancers or instances, but it doesn\'t manage an API\'s authorization or versions.',
          correct: false,
        },
        {
          id: 'route53-api',
          label: 'Amazon Route 53',
          definition: 'DNS service that registers domains, routes users and performs health checks.',
          explanation:
            'Route 53 translates domain names, but it doesn\'t control API traffic, verify who\'s calling or version the API.',
          correct: false,
        },
        {
          id: 's3-api',
          label: 'Amazon S3',
          definition: 'Object storage service to store files of any type in buckets.',
          explanation:
            'S3 stores files and can serve static content, but it isn\'t the front door that invokes Lambda functions with authorization and versions.',
          correct: false,
        },
        {
          id: 'api-gateway',
          label: 'Amazon API Gateway',
          definition:
            'Managed service to create, publish, maintain, monitor and secure REST, HTTP and WebSocket APIs at any scale.',
          explanation:
            'API Gateway is the front door for applications to access backends like Lambda: it handles traffic management, authorization with IAM or Amazon Cognito, monitoring and versioning.',
          correct: true,
        },
      ],
    },
  ],
};
