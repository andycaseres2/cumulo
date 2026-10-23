import type { Mission } from '../../../../domain/Mission';

/**
 * Charrúa Games: a video game studio in Montevideo preparing to launch its online game abroad.
 * Practices the six advantages of the cloud by name (agility, go global, economies of scale) and high availability versus elasticity.
 */
export const cloudBenefits2: Mission = {
  id: 'cloud-benefits-2',
  track: 'downtown',
  topicSlug: 'cloud-benefits',
  buildingId: 'central-tower',
  title: 'A game for the whole world',
  client: { name: 'Martín Olivera', role: 'Chief Technology Officer at Charrúa Games' },
  intro: [
    'Hi! I’m Martín Olivera, chief technology officer at Charrúa Games. Our offices are on the twelfth floor of the Central Tower, although the studio was born in a garage in Montevideo.',
    'We make online games for mobile phones. Until now everything ran on two servers we bought years ago and keep in a room at the studio.',
    'Now a publisher wants to launch our new game in Mexico and Spain. My partners are excited, but they don’t understand why I insist on doing it on AWS instead of buying more servers.',
    'Tomorrow I have to present the arguments to them, and on launch day the game can’t fail. Will you help me build the case?',
  ],
  outro: {
    passed: [
      'Now I have arguments! Prototypes in an afternoon, servers close to the players in Mexico and Spain, and prices we could never get on our own.',
      'And with the game spread across several Availability Zones, the launch will hold up even if a data center fails. Thank you: your name is going in the credits.',
    ],
    failed: [
      'Hmm... with these answers my partners are going to ask me lots of questions I won’t be able to answer.',
      'Review the theory on the benefits of the cloud calmly and come back whenever you like. Your game is still saved.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'prototype-fast',
      prompt:
        'First argument. Getting a new server used to take us six weeks between quotes and shipping. We want to try out game prototypes in an afternoon and throw away the ones nobody likes, having spent almost nothing. Which advantage of the cloud is that?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'The advantage by which AWS aggregates the usage of hundreds of thousands of customers and achieves lower costs that translate into lower pay-as-you-go prices.',
          explanation:
            'Economies of scale explain why prices are lower, but Martín is talking about going from weeks to minutes to get resources and experiment.',
          correct: false,
        },
        {
          id: 'speed-agility',
          label: 'Increase speed and agility',
          definition:
            'The advantage by which new resources are a click away: the time to get them drops from weeks to minutes and experimenting costs less.',
          explanation:
            'That’s exactly the studio’s case: getting servers in minutes instead of six weeks lets it try prototypes in an afternoon and cheaply discard the ones that don’t work.',
          correct: true,
        },
        {
          id: 'go-global',
          label: 'Go global in minutes',
          definition:
            'The advantage by which an application is deployed in several Regions around the world in a few clicks, with lower latency for users.',
          explanation:
            'This advantage is about reaching users in other countries. Here the problem is how long it takes the studio to get resources to experiment with.',
          correct: false,
        },
        {
          id: 'stop-data-centers',
          label: 'Stop spending money running and maintaining data centers',
          definition:
            'The advantage by which a company stops racking, stacking and powering servers and focuses on what differentiates its business.',
          explanation:
            'No longer running data centers frees up the team’s time, but Martín’s need is speed in getting resources and experimenting.',
          correct: false,
        },
      ],
    },
    {
      id: 'players-abroad',
      prompt:
        'Second argument. In the test version, players in Mexico and Spain feel the game responds slowly, because our servers are here in Montevideo. We can’t build data centers over there. Which advantage of the cloud helps us?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'stop-guessing',
          label: 'Stop guessing capacity',
          definition:
            'The advantage by which you no longer need to guess how much infrastructure you’ll need, because you scale up or down with only a few minutes’ notice.',
          explanation:
            'Having more or less capacity doesn’t bring the servers closer to the players. The problem here is distance, which causes latency.',
          correct: false,
        },
        {
          id: 'variable-expense',
          label: 'Trade fixed expense for variable expense',
          definition:
            'The advantage by which you pay only when you consume resources and only for what you consume, instead of investing up front.',
          explanation:
            'Paying for usage changes how you pay, but it doesn’t reduce response time for players who are far from Montevideo.',
          correct: false,
        },
        {
          id: 'go-global',
          label: 'Go global in minutes',
          definition:
            'The advantage by which an application is deployed in several Regions around the world in a few clicks, with lower latency for users.',
          explanation:
            'The studio can deploy the game in AWS Regions close to its players, without building or renting data centers in those countries, and so reduce latency.',
          correct: true,
        },
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'The advantage by which AWS aggregates the usage of hundreds of thousands of customers and achieves lower costs that translate into lower pay-as-you-go prices.',
          explanation:
            'Low prices thanks to AWS’s scale don’t fix the slowness: what the players need is to have the servers closer to them.',
          correct: false,
        },
      ],
    },
    {
      id: 'lower-prices',
      prompt:
        'Third argument, for my accountant partner. He worked out that an hour of a server on AWS costs us less than buying and maintaining our own, and he doesn’t understand how AWS achieves those prices. Which advantage explains it?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'variable-expense',
          label: 'Trade fixed expense for variable expense',
          definition:
            'The advantage by which you pay only when you consume resources and only for what you consume, instead of investing up front.',
          explanation:
            'This is a common mix-up: variable expense explains that you pay only for what you use, not why the price of each hour is lower.',
          correct: false,
        },
        {
          id: 'speed-agility',
          label: 'Increase speed and agility',
          definition:
            'The advantage by which new resources are a click away: the time to get them drops from weeks to minutes and experimenting costs less.',
          explanation:
            'Agility has to do with how fast you get resources, not with the hourly price AWS can offer.',
          correct: false,
        },
        {
          id: 'stop-guessing',
          label: 'Stop guessing capacity',
          definition:
            'The advantage by which you no longer need to guess how much infrastructure you’ll need, because you scale up or down with only a few minutes’ notice.',
          explanation:
            'Scaling with only a few minutes’ notice avoids overprovisioning, but it doesn’t explain why a server hour costs less on AWS.',
          correct: false,
        },
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'The advantage by which AWS aggregates the usage of hundreds of thousands of customers and achieves lower costs that translate into lower pay-as-you-go prices.',
          explanation:
            'A small studio buying its own hardware can’t reach AWS’s volume. By aggregating the usage of hundreds of thousands of customers, AWS achieves lower costs and passes them on in its prices.',
          correct: true,
        },
      ],
    },
    {
      id: 'launch-day',
      prompt:
        'Last point, the one that worries me most. On launch day, the game server has to keep running even if one of the AWS data centers fails. Which concept are we looking for, and how do we achieve it?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'high-availability',
          label: 'High availability, deploying the game across several Availability Zones',
          definition:
            'The ability of an application to keep running even if part of the infrastructure fails, by spreading it across several Availability Zones.',
          explanation:
            'Each Availability Zone has redundant power, networking and connectivity. If the game runs in several of them, the failure of one doesn’t leave players without matches.',
          correct: true,
        },
        {
          id: 'elasticity',
          label: 'Elasticity, adding and removing servers based on the number of players',
          definition:
            'The ability to automatically increase or decrease resources based on demand, without overprovisioning or falling short.',
          explanation:
            'Elasticity responds to changes in demand, not to failures. Martín is asking what happens if a data center goes down, not if more players show up.',
          correct: false,
        },
        {
          id: 'agility',
          label: 'Agility, getting new servers in minutes',
          definition:
            'The speed to get resources, experiment and innovate at low cost, with resources available in minutes instead of weeks.',
          explanation:
            'Having servers in minutes is useful, but it doesn’t keep the game from going down if the only data center it runs in fails.',
          correct: false,
        },
        {
          id: 'bigger-server',
          label: 'A single, much bigger server in a single data center',
          definition:
            'Vertical scaling: replacing a server with another one that has more CPU and memory, in the same location.',
          explanation:
            'A bigger server handles more load, but it is still a single point of failure: if that data center fails, the game goes down.',
          correct: false,
        },
      ],
    },
  ],
};
