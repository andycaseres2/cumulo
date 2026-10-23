import type { Mission } from '../../../../domain/Mission';

/**
 * StreamLlama: the Lima streaming platform's live-events team, after a data center outage cut a festival broadcast.
 * Practices Availability Zones and high availability, multi-Region continuity and Region isolation of data.
 */
export const globalInfrastructure1: Mission = {
  id: 'global-infrastructure-1',
  track: 'tech',
  topicSlug: 'global-infrastructure',
  buildingId: 'streaming',
  title: 'The festival doesn\'t go dark',
  client: { name: 'Lucía Huamán', role: 'Live broadcast lead at StreamLlama' },
  intro: [
    'Hi, I\'m Lucía Huamán and I lead live broadcasts at StreamLlama, here in Lima. Diego makes sure videos load fast; I make sure the live stream never cuts out.',
    'On Saturday we were streaming a music festival to half a million people. A data center lost power and the signal went down for forty minutes.',
    'All our streaming servers were in the same place. Social media blew up and two sponsors are already asking whether they can trust us.',
    'In a month we\'re streaming the championship final. I need to understand how the AWS infrastructure is organized so this doesn\'t happen again. Can you help me?',
  ],
  outro: {
    passed: [
      'That\'s it! Now the stream lives across several Availability Zones and, for the worst case, we have a plan in another Region with the data truly replicated.',
      'The sponsors signed on for the final. Thank you: you\'ve got a pass to the production booth whenever you want.',
    ],
    failed: [
      'Hmm... with these decisions the final could cut out just like the festival did.',
      'Review the theory on Regions and Availability Zones and come back soon. The signal is waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'survive-datacenter',
      prompt:
        'First, Saturday\'s problem: we want the stream to keep going if a data center loses power again. Right now all the servers are in a single Availability Zone. What do we do?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'bigger-server',
          label: 'Switch to larger servers in the same Availability Zone',
          definition:
            'Increasing the capacity of existing servers without changing the location where they run.',
          explanation:
            'A larger server still depends on the same Availability Zone. If that zone fails, the stream cuts out just the same.',
          correct: false,
        },
        {
          id: 'multi-az',
          label: 'Spread the servers across multiple Availability Zones in the Region',
          definition:
            'Deploying an application across several isolated zones in the same Region, with traffic distributed among them.',
          explanation:
            'Availability Zones don\'t share single points of failure. If one has a problem, the servers in the others keep streaming: that\'s high availability.',
          correct: true,
        },
        {
          id: 'stream-from-edge',
          label: 'Move the entire streaming application to edge locations',
          definition:
            'AWS network points of presence that Amazon CloudFront uses to deliver cached content close to users.',
          explanation:
            'Edge locations are mainly for delivering cached content with CloudFront, not for running the entire application.',
          correct: false,
        },
        {
          id: 'second-server-same-az',
          label: 'Add a second backup server in the same Availability Zone',
          definition:
            'Duplicating a server within the same location to have a copy ready if the first one fails.',
          explanation:
            'A backup in the same Availability Zone protects you if one server fails, but not if the whole zone loses power, which is what happened.',
          correct: false,
        },
      ],
    },
    {
      id: 'what-is-az',
      prompt:
        'In the meeting, one engineer said an Availability Zone is "a building in a city" and another said it\'s "a country." I want to explain it properly to the sponsors. What is an Availability Zone?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'az-country',
          label: 'A country where AWS has data centers',
          definition:
            'Description of an AWS zone as the political division where its facilities are located.',
          explanation:
            'An Availability Zone isn\'t a country or a city: it\'s part of a Region, and a Region has several.',
          correct: false,
        },
        {
          id: 'az-single-building',
          label: 'Always a single data center',
          definition:
            'Description of an AWS zone as a single building with servers.',
          explanation:
            'This is a classic exam trap: an Availability Zone can be made up of one or more data centers.',
          correct: false,
        },
        {
          id: 'az-pop',
          label: 'A CloudFront point of presence for cached content',
          definition:
            'Location in the AWS network, separate from the Regions, from which cached content is delivered.',
          explanation:
            'That describes an edge location, which is separate from the Regions. An Availability Zone is inside a Region.',
          correct: false,
        },
        {
          id: 'az-definition',
          label: 'One or more data centers with redundant power, networking and connectivity within a Region',
          definition:
            'Component of the AWS global infrastructure made up of discrete data centers, each with its own power, cooling and physical security.',
          explanation:
            'That\'s the definition. The Availability Zones in a Region are separated by a meaningful distance and connected with low-latency networks, which is why they enable high availability.',
          correct: true,
        },
      ],
    },
    {
      id: 'lose-region',
      prompt:
        'For the final, the risk team is going further: they want the stream to keep going even if an entire AWS Region goes down. Which approach addresses that?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'multi-region',
          label: 'Deploy across multiple Regions, for example with an active/active strategy',
          definition:
            'Running the workload in two or more AWS Regions so one can take over if another fails.',
          explanation:
            'Regions are isolated from one another. To keep operating if an entire Region goes down, you need another Region, for example with active/active.',
          correct: true,
        },
        {
          id: 'more-azs-one-region',
          label: 'Use even more Availability Zones in the same Region',
          definition:
            'Increasing the number of isolated zones the application uses within a single Region.',
          explanation:
            'Multiple Availability Zones protect against a data center failure, but they\'re all inside the Region that could go down.',
          correct: false,
        },
        {
          id: 'cloudfront-only',
          label: 'Deliver the signal with Amazon CloudFront',
          definition:
            'AWS content delivery network that routes each request to the edge location with the lowest latency.',
          explanation:
            'CloudFront reduces latency and the load on the origin, but it doesn\'t keep the application running if its entire Region goes down.',
          correct: false,
        },
        {
          id: 'bigger-instances-region',
          label: 'Use larger instances in the current Region',
          definition:
            'Giving more compute capacity to the servers already running in the same Region.',
          explanation:
            'Larger instances still depend on the same Region. If it goes down, so does the stream.',
          correct: false,
        },
      ],
    },
    {
      id: 'replays-other-region',
      prompt:
        'We already set up the copy in the second Region, but the replays we store in an Amazon S3 bucket in the first one don\'t show up there. The team thought they would. What\'s going on?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'wait-auto-sync',
          label: 'You just have to wait: data shows up on its own in every Region',
          definition:
            'Assumption that AWS automatically syncs data across all its Regions.',
          explanation:
            'Resources and data created in one Region don\'t exist in another: Regions are isolated from one another.',
          correct: false,
        },
        {
          id: 'edge-permanent',
          label: 'They\'re stored permanently in the edge locations',
          definition:
            'Assumption that the AWS edge network permanently stores the content it delivers.',
          explanation:
            'Edge locations keep temporary cached copies for CloudFront; they don\'t replace the data in another Region.',
          correct: false,
        },
        {
          id: 'explicit-replication',
          label: 'They\'re not there unless you explicitly replicate or copy them',
          definition:
            'Assumption that data stays in its Region until the customer sets up a replica or a copy.',
          explanation:
            'Data doesn\'t leave a Region without an explicit action, such as setting up replication or copying it with a service feature. The plan for the final has to include it.',
          correct: true,
        },
        {
          id: 'nearest-region',
          label: 'They replicated on their own to the Region closest to the users',
          definition:
            'Assumption that AWS moves data toward the Region with the lowest latency for the audience.',
          explanation:
            'This is a classic trap: data doesn\'t replicate on its own between Regions unless you set it up.',
          correct: false,
        },
      ],
    },
  ],
};
