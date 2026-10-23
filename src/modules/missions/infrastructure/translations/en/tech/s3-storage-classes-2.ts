import type { Mission } from '../../../../domain/Mission';

/**
 * Lente Viajero: a travel-photo app startup in Montevideo whose Amazon S3 bill grows faster than its users.
 * Practices S3 Intelligent-Tiering, S3 One Zone-IA, S3 Glacier Instant Retrieval and the S3 pricing dimensions.
 */
export const s3StorageClasses2: Mission = {
  id: 's3-storage-classes-2',
  track: 'tech',
  topicSlug: 's3-storage-classes',
  buildingId: 'startup-lab',
  title: 'Millions of photos, one bill',
  client: { name: 'Valentina Ortiz', role: 'Co-founder and CTO of Lente Viajero' },
  intro: [
    'Hi! Welcome to the Startup Lab. I\'m Valentina Ortiz, co-founder of Lente Viajero, an app where travelers store and share their trip photos. We started in Montevideo and we already have users across the region.',
    'All the photos live in Amazon S3, and all of them in S3 Standard, because that\'s the first thing we set up. We already store millions of images and the storage bill is growing faster than our user base.',
    'Our investors want to see that we can grow without burning money on storage. If I don\'t show a plan at the next meeting, the next funding round gets complicated.',
    'I know S3 has several storage classes, but I don\'t know which one fits each type of photo. Will you help me put the plan together?',
  ],
  outro: {
    passed: [
      'This is exactly what I needed! Photos with unpredictable access sort themselves out, the re-creatable thumbnails live in a single zone, and old memories open instantly without paying as if they were new.',
      'And now I can explain to the investors where every S3 dollar goes. Thank you: you\'ll always have a spot on the Lente Viajero team.',
    ],
    failed: [
      'Hmm... with this plan the bill won\'t go down, or users will complain about photos that won\'t load. Some of these decisions don\'t add up for me.',
      'Review the theory on S3 storage classes and come back whenever you like. The investors can wait a little longer.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'unpredictable-photos',
      prompt:
        'Let\'s start with newly uploaded original photos. Some go viral and get viewed thousands of times; others nobody ever opens again. There\'s no way to know which will be which. Which class do we store them in?',
      topicSlug: 's3-storage-classes',
      examTasks: ['3.6'],
      options: [
        {
          id: 'keep-standard',
          label: 'Leave them in S3 Standard, as they are now',
          definition:
            'Default Amazon S3 class, designed for frequently accessed data, with millisecond retrieval and no retrieval fee.',
          explanation:
            'That\'s what\'s inflating the bill today: Lente Viajero pays frequent-access prices even for photos nobody opens again.',
          correct: false,
        },
        {
          id: 'originals-one-zone',
          label: 'S3 One Zone-IA',
          definition:
            'Infrequent-access class that stores data in a single Availability Zone, recommended for data that can be re-created.',
          explanation:
            'Travelers\' original photos can\'t be regenerated if they are lost. Keeping the only copy in a single zone is a risk that doesn\'t fit here.',
          correct: false,
        },
        {
          id: 'intelligent-tiering',
          label: 'S3 Intelligent-Tiering',
          definition:
            'Class that automatically moves each object between access tiers based on its usage, with a per-object monitoring fee and no retrieval fee.',
          explanation:
            'This is the class for unknown or changing access patterns: if a photo isn\'t opened for 30 days it moves to a cheaper tier, and if it goes viral it moves back to the frequent tier, with no retrieval fees.',
          correct: true,
        },
        {
          id: 'lifecycle-to-deep-archive',
          label: 'A lifecycle rule that moves all photos to S3 Glacier Deep Archive after 30 days',
          definition:
            'Transition rule that automatically moves objects to the lowest-cost archive class after a certain time.',
          explanation:
            'A lifecycle rule works when the pattern is predictable, and here it isn\'t. Also, in Deep Archive a photo that goes viral would need a restore that takes hours.',
          correct: false,
        },
      ],
    },
    {
      id: 'thumbnails',
      prompt:
        'The app automatically generates thumbnails from each original photo. If one is lost, we regenerate it in seconds. They\'re accessed roughly once a month, but when requested they must load instantly. Where do we store them to pay less?',
      topicSlug: 's3-storage-classes',
      examTasks: ['3.6'],
      options: [
        {
          id: 'thumbs-one-zone-ia',
          label: 'S3 One Zone-IA',
          definition:
            'Infrequent-access class that stores data in a single Availability Zone, with millisecond retrieval and a per-GB retrieval fee.',
          explanation:
            'Thumbnails can be re-created from the originals, which is exactly the kind of data AWS recommends One Zone-IA for. They are read in milliseconds and storing them costs less than in a multi-zone class.',
          correct: true,
        },
        {
          id: 'thumbs-flexible',
          label: 'S3 Glacier Flexible Retrieval',
          definition:
            'Archive class in which objects must be restored before they can be read, with retrievals taking minutes to hours.',
          explanation:
            'Thumbnails must load instantly when the user opens their album. A class that requires restoring every object before reading it won\'t work here.',
          correct: false,
        },
        {
          id: 'thumbs-express',
          label: 'S3 Express One Zone',
          definition:
            'Single Availability Zone class, chosen by the customer, designed for highly latency-sensitive applications, with single-digit millisecond access.',
          explanation:
            'Express One Zone is designed for workloads that need minimal latency on every access, not for saving money on data accessed once a month.',
          correct: false,
        },
        {
          id: 'thumbs-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'AWS\'s lowest-cost archive class, for data accessed less than once a year; objects must be restored and retrieval takes hours.',
          explanation:
            'A thumbnail that takes hours to restore breaks the app. Also, Deep Archive is designed for data accessed less than once a year, not once a month.',
          correct: false,
        },
      ],
    },
    {
      id: 'memories-album',
      prompt:
        'Now, trip photos from more than a year ago. They\'re opened roughly once a quarter, when the app shows the "Memories" album, and at that moment they have to appear instantly. Which class do we use?',
      topicSlug: 's3-storage-classes',
      examTasks: ['3.6'],
      options: [
        {
          id: 'memories-flexible',
          label: 'S3 Glacier Flexible Retrieval',
          definition:
            'Archive class for data accessed once or twice a year, whose objects must be restored before they can be read.',
          explanation:
            'Choosing Flexible Retrieval when immediate access is required is a classic trap: each photo would need a restore of minutes to hours before it could be shown.',
          correct: false,
        },
        {
          id: 'memories-one-zone',
          label: 'S3 One Zone-IA',
          definition:
            'Infrequent-access class that stores objects in a single Availability Zone.',
          explanation:
            'These are travelers\' original photos, which can\'t be re-created. Keeping the only copy in a single zone is not acceptable.',
          correct: false,
        },
        {
          id: 'memories-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'AWS\'s lowest-cost archive class, with a 180-day minimum storage duration and retrievals that take hours.',
          explanation:
            'It\'s the cheapest for storage, but each photo would take hours to restore. The "Memories" album needs to show them right away.',
          correct: false,
        },
        {
          id: 'memories-instant',
          label: 'S3 Glacier Instant Retrieval',
          definition:
            'Archive class with millisecond access, designed for data accessed roughly once a quarter, with a retrieval fee.',
          explanation:
            'This is the answer for archives with immediate access: cheaper storage than Standard-IA, millisecond reads, and more expensive access that pays off because the photos are opened only a few times a year.',
          correct: true,
        },
      ],
    },
    {
      id: 'bill-dimensions',
      prompt:
        'For the investor meeting: we upload several terabytes of photos a month from phones, and one of the investors thinks that upload is what we pay the most for. What does Amazon S3 actually charge for?',
      topicSlug: 's3-storage-classes',
      examTasks: ['4.1'],
      options: [
        {
          id: 'only-gb-stored',
          label: 'Only the GB stored, regardless of class or how many times they are read',
          definition:
            'Pricing model in which the only price factor is the volume of data stored.',
          explanation:
            'S3 cost isn\'t just GB stored: the storage class, requests, retrievals and data transfer out also count.',
          correct: false,
        },
        {
          id: 'storage-requests-egress',
          label: 'Storage by class, requests and retrievals, and data transfer out',
          definition:
            'The main S3 pricing dimensions: what is stored and in which class, requests and retrievals, and data leaving AWS.',
          explanation:
            'Those are the main dimensions. Data transfer in from the internet is free, so uploads from phones are not what weighs on Lente Viajero\'s bill.',
          correct: true,
        },
        {
          id: 'upload-per-gb',
          label: 'Mostly the upload: every GB coming in from the internet is charged',
          definition:
            'Pricing model focused on the data users send into storage from the internet.',
          explanation:
            'It\'s the other way around: data transfer in from the internet is free. What gets charged is data transfer out, along with storage and requests.',
          correct: false,
        },
        {
          id: 'flat-fee-bucket',
          label: 'A flat monthly fee per bucket, with reserved capacity',
          definition:
            'Subscription pricing model in which you pay a fixed amount per container and for capacity reserved in advance.',
          explanation:
            'S3 doesn\'t work with reserved capacity: it\'s pay-as-you-go, based on what is stored, requested and transferred out.',
          correct: false,
        },
      ],
    },
  ],
};
