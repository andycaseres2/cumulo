import type { Mission } from '../../../domain/Mission';

/**
 * StreamLlama: a Peruvian streaming startup whose videos load slowly outside Lima.
 * Practices Amazon CloudFront, edge locations, Amazon S3, S3 storage classes with S3 Lifecycle and Region selection.
 */
export const streamingGlobal: Mission = {
  id: 'streaming-global',
  track: 'tech',
  topicSlug: 'dns-and-content-delivery',
  buildingId: 'streaming',
  title: 'Slow videos outside Lima',
  client: { name: 'Diego Paredes', role: 'CTO of StreamLlama' },
  intro: [
    'Hi, great to see you! I’m Diego Paredes, CTO of StreamLlama. We’re a Peruvian streaming startup: short series, documentaries and concerts by Latin American artists.',
    'All our servers and all our videos are in a single place, here in Lima. While almost our entire audience was Peruvian, it worked pretty well.',
    'But now we have more and more users in Mexico City and Bogotá, and they complain that videos take forever to start. Some close the app before watching the first minute.',
    'We want to grow across Latin America, and our video library grows every week. I need video to reach everywhere fast, and storing it can’t cost us a fortune. Will you help me?',
  ],
  outro: {
    passed: [
      'Excellent work! With CloudFront at the edge locations, the videos in S3 and a lifecycle policy, we finally have a plan for all of Latin America.',
      'Our users in Mexico and Bogotá will notice the difference from the very first click. Thank you so much. I owe you a lifetime subscription!',
    ],
    failed: [
      'Hmm... I’m not sure that with this plan the videos will reach Mexico and Bogotá quickly. Some decisions still don’t add up for me.',
      'Review the theory calmly and come back whenever you like. I’ll be waiting right here, popcorn ready.',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'content-delivery',
      prompt:
        'Let’s get to the main problem. Our viewers in Mexico City and Bogotá are far from Lima. Which service keeps copies of the videos close to them so they start playing with low latency?',
      topicSlug: 'dns-and-content-delivery',
      examTasks: ['3.5', '3.2'],
      options: [
        {
          id: 'route-53',
          label: 'Amazon Route 53',
          definition:
            'The AWS DNS service that registers domains, translates names into IP addresses, routes traffic based on policies and runs health checks.',
          explanation:
            'Route 53 decides where to send users when they type the domain, but it doesn’t keep copies of the videos. If the video is still in Lima, the viewer in Bogotá keeps waiting.',
          correct: false,
        },
        {
          id: 'cloudfront',
          label: 'Amazon CloudFront',
          definition:
            'The AWS content delivery network (CDN) that caches static and dynamic content, such as images and video, in edge locations around the world.',
          explanation:
            'Correct. Each viewer’s request goes to the edge location with the lowest latency; if the video is already cached there, it is delivered right away. It also reduces the load on the origin.',
          correct: true,
        },
        {
          id: 'global-accelerator',
          label: 'AWS Global Accelerator',
          definition:
            'A service that provides static anycast IP addresses and carries TCP/UDP traffic over the AWS global network to the most suitable healthy endpoint.',
          explanation:
            'Global Accelerator also uses edge locations, but it doesn’t cache content. It’s ideal for UDP games or when static IPs are required; for serving cached videos, the answer is CloudFront.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition:
            'A dedicated physical connection between a company’s internal network and AWS, without going through internet providers along the network path.',
          explanation:
            'Direct Connect links StreamLlama’s office or data center to AWS, not the viewers to the videos. It also requires a physical installation and doesn’t bring content closer to anyone.',
          correct: false,
        },
      ],
    },
    {
      id: 'edge-locations',
      prompt:
        'You mentioned edge locations, but at the board meeting they’re going to ask me what they are. Are they the same as a Region or an Availability Zone?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'availability-zones',
          label: 'They are the Availability Zones of a Region',
          definition:
            'An Availability Zone is one or more data centers with redundant power, networking and connectivity within a Region.',
          explanation:
            'Availability Zones are for achieving high availability within a Region. Edge locations are something else: points of presence separate from the Regions for delivering content.',
          correct: false,
        },
        {
          id: 'small-regions',
          label: 'They are small Regions where the whole application runs',
          definition: 'The idea that an edge location runs the application’s complete servers and databases.',
          explanation:
            'This is a classic exam trap. The main job of edge locations is to deliver cached content with CloudFront, not to run StreamLlama’s entire application.',
          correct: false,
        },
        {
          id: 'local-zones',
          label: 'They are Local Zones: extensions of a Region',
          definition:
            'AWS Local Zones place compute, storage, databases and other select services close to large population centers, as an extension of a Region.',
          explanation:
            'Local Zones exist, but they are a different component: they serve applications that need very low latency. The edge locations CloudFront uses are not extensions of a Region.',
          correct: false,
        },
        {
          id: 'edge-network',
          label: 'They are data centers separate from the Regions, close to users',
          definition:
            'Edge locations are data centers spread around the world, separate from the Regions, that form the network of points of presence used by Amazon CloudFront.',
          explanation:
            'Exactly. They are neither Regions nor Availability Zones: they are points of presence where CloudFront keeps cached copies. That way viewers get the video with lower latency and the origin gets less load.',
          correct: true,
        },
      ],
    },
    {
      id: 'video-storage',
      prompt:
        'CloudFront needs an origin with the definitive version of each video. We have thousands of files and we upload more every week. Where do we store them on AWS?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 's3',
          label: 'Amazon S3',
          definition:
            'An object storage service: it stores files with their metadata in buckets, and you access them through an API and a URL.',
          explanation:
            'Correct. S3 is ideal for media files downloaded over the internet, you pay only for what you use without reserving capacity, and it can be the origin of a CloudFront distribution.',
          correct: true,
        },
        {
          id: 'ebs',
          label: 'Amazon EBS',
          definition:
            'Block storage volumes that attach to an EC2 instance and work as its hard drive.',
          explanation:
            'EBS is a server’s disk and lives in a single Availability Zone. Also, you set the volume size yourself: it isn’t the natural choice for a video library that keeps growing.',
          correct: false,
        },
        {
          id: 'efs',
          label: 'Amazon EFS',
          definition:
            'Elastic NFS file storage that many instances can mount and share at the same time.',
          explanation:
            'EFS shines when several servers share a folder, like a configuration folder. For videos the public downloads over the internet, the key word is "objects": S3.',
          correct: false,
        },
        {
          id: 'instance-store',
          label: 'Instance store',
          definition:
            'Temporary block storage on disks physically attached to the host server where the EC2 instance runs.',
          explanation:
            'Instance store data is lost if the instance stops or terminates. Keeping StreamLlama’s entire library there would put the videos at risk.',
          correct: false,
        },
      ],
    },
    {
      id: 'old-videos',
      prompt:
        'New releases get watched a ton in the first month; after that, each video is watched roughly once a month. But when someone hits play, it has to start instantly. It’s our only copy. How do we lower the cost without moving files by hand?',
      topicSlug: 's3-storage-classes',
      examTasks: ['3.6'],
      options: [
        {
          id: 'one-zone-ia',
          label: 'Move them to S3 One Zone-IA',
          definition:
            'An S3 class for infrequent access that stores data in a single Availability Zone, with a 30-day minimum storage duration.',
          explanation:
            'One Zone-IA doesn’t survive the physical loss of its only AZ, and AWS recommends it only for data that can be re-created. It’s not a good fit for the only copy of the videos.',
          correct: false,
        },
        {
          id: 'deep-archive',
          label: 'Move them to S3 Glacier Deep Archive',
          definition:
            'The lowest-cost storage option in AWS, designed for data accessed less than once a year and retrieved within hours.',
          explanation:
            'It’s the cheapest, but objects must be restored and that takes hours. A viewer isn’t going to wait until tomorrow to watch a video they requested today.',
          correct: false,
        },
        {
          id: 'lifecycle-standard-ia',
          label: 'An S3 Lifecycle policy that moves them to S3 Standard-IA after 30 days',
          definition:
            'An S3 Lifecycle rule with a transition action that automatically moves objects to S3 Standard-IA, the class for infrequent access across several AZs.',
          explanation:
            'Correct. The pattern is predictable, so a lifecycle policy moves the videos on its own. Standard-IA is cheaper to store, retrieves in milliseconds and keeps data in three or more AZs; in exchange it charges per GB retrieved.',
          correct: true,
        },
        {
          id: 'manual-move',
          label: 'Check every month which videos nobody watches and move them by hand',
          definition:
            'A manual process in which a person changes the storage class of objects one by one.',
          explanation:
            'It works, but it’s slow and error-prone. When the access pattern is predictable, the exam answer is a lifecycle policy that does it automatically.',
          correct: false,
        },
      ],
    },
    {
      id: 'new-region',
      prompt:
        'Last topic: we’re going to launch a new service aimed mostly at audiences in Mexico. Our lawyer confirmed that no law requires us to store the data in a specific country. How do we choose the AWS Region?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'cheapest',
          label: 'The cheapest Region, no matter where it is',
          definition: 'Choosing the Region based only on price, because AWS prices can vary between Regions.',
          explanation:
            'Price is one of the factors, but not the only one. A cheap, faraway Region could give users in Mexico the same wait they have today.',
          correct: false,
        },
        {
          id: 'closest-region',
          label: 'A Region close to its users, with the services they need, at a good price',
          definition:
            'Criteria for choosing a Region: compliance and data residency, proximity to users, available services and price.',
          explanation:
            'Correct. Without a regulation that outweighs it, proximity usually means lower latency. You also need to confirm that the required services are available in that Region and compare prices.',
          correct: true,
        },
        {
          id: 'any-region',
          label: 'Any Region: the data is copied to all of them automatically',
          definition: 'The idea that AWS automatically replicates the resources and data of one Region to all the others.',
          explanation:
            'Resources and data created in one Region don’t exist in another unless you explicitly replicate or copy them. The choice does matter.',
          correct: false,
        },
        {
          id: 'edge-location-launch',
          label: 'Don’t use a Region: deploy the service in an edge location',
          definition: 'Running the entire service directly in the points of presence used by Amazon CloudFront.',
          explanation:
            'This is a classic exam trap: edge locations are for delivering cached content with CloudFront, not for running the whole application. CloudFront complements the choice of Region, it doesn’t replace it.',
          correct: false,
        },
      ],
    },
  ],
};
