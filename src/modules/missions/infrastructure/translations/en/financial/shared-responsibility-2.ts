import type { Mission } from '../../../../domain/Mission';

/**
 * Cerrajería Llave Segura: a locksmith in Asunción with a serverless booking app on AWS Lambda, Amazon DynamoDB and Amazon S3.
 * Practices the shared responsibility model on managed and serverless services, data permissions, compliance and customer-specific controls.
 */
export const sharedResponsibility2: Mission = {
  id: 'shared-responsibility-2',
  track: 'financial',
  topicSlug: 'shared-responsibility',
  buildingId: 'locksmith',
  title: 'Keys in the cloud',
  client: { name: 'Diego Benítez', role: 'Owner of Cerrajería Llave Segura' },
  intro: [
    'Hi, come in. I’m Diego Benítez, owner of Cerrajería Llave Segura, in Asunción. We cut keys, open stuck doors and change locks at people’s homes.',
    'A few months ago we launched an app to book visits. It runs on AWS Lambda functions, stores bookings in Amazon DynamoDB and the photos of customers’ keys in Amazon S3.',
    'A customer wrote to me furious: he found the photo of his key on the internet. With that photo, anyone could copy it. I thought that, with no servers to manage, security was all on AWS.',
    'If this happens again, I lose the trust my family built over thirty years. Help me understand what’s on me and what’s on AWS.',
  ],
  outro: {
    passed: [
      'Now I see it clearly: without servers I have fewer tasks, but my code, my permissions and my customers’ data are still my responsibility.',
      'The photos are no longer in plain sight and I know which rules I have to follow. Thank you: if a door ever gets stuck on you, the first visit is on the house.',
    ],
    failed: [
      'Oops... with these answers my customers’ keys would still be in danger.',
      'Review the theory calmly and come back. I’ll be right here, with the padlock on until we solve this together.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'lambda-responsibility',
      prompt:
        'First things first. Bookings are processed with AWS Lambda functions written by a programmer friend, with several third-party libraries. Which part of those functions is the locksmith’s responsibility?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'lambda-os',
          label: 'Patching the operating system the functions run on',
          definition:
            'Keeping up to date the operating system of the servers that run an application’s code.',
          explanation:
            'With AWS Lambda, AWS manages the infrastructure, the operating system and the platform, including patching. The locksmith doesn’t see or manage those servers.',
          correct: false,
        },
        {
          id: 'lambda-code-deps',
          label: 'Its code, the libraries it includes and each function’s IAM permissions',
          definition:
            'In a serverless service, what the customer deploys: the code, its dependencies, the permissions the function receives and the data it processes.',
          explanation:
            'With Lambda, the locksmith is responsible for its code, the third-party dependencies it includes, the function’s IAM permissions and its data.',
          correct: true,
        },
        {
          id: 'lambda-nothing',
          label: 'Nothing: with serverless all security shifts to AWS',
          definition:
            'The idea that a service with no servers to manage transfers all security tasks to the provider.',
          explanation:
            'This is a classic trap. Serverless reduces operational tasks, but the function’s code, dependencies and permissions still belong to the customer.',
          correct: false,
        },
        {
          id: 'lambda-runtime',
          label: 'Patching the functions’ runtime every time a new version comes out',
          definition:
            'The runtime is the language’s execution environment, such as Node.js or Python, on which a function’s code runs.',
          explanation:
            'In Lambda, AWS patches the runtime. What the locksmith does have to maintain are the third-party libraries it included in its code.',
          correct: false,
        },
      ],
    },
    {
      id: 's3-photos',
      prompt:
        'Now, the photo issue. The images of the keys are in an Amazon S3 bucket and ended up accessible to anyone. Who was supposed to configure who can see them?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-decides-access',
          label: 'AWS, because the photos are stored on its disks',
          definition:
            'The provider’s responsibility for the servers, disks and network that store a storage service’s objects.',
          explanation:
            'AWS manages S3’s infrastructure and platform, but it doesn’t decide who can see the locksmith’s files.',
          correct: false,
        },
        {
          id: 'abstraction-aws',
          label: 'AWS, because S3 is such an abstracted service that it leaves nothing to the customer',
          definition:
            'Services in which the provider manages the infrastructure, operating system and platform, and the customer focuses on its data.',
          explanation:
            'More abstraction reduces operational tasks, but the data, its encryption and its access permissions always remain in the customer’s hands.',
          correct: false,
        },
        {
          id: 'programmer-only',
          label: 'Only the programmer, because the locksmith didn’t write the code',
          definition:
            'An outside person hired to develop an application without owning the account or the data.',
          explanation:
            'In AWS’s eyes, the customer is the locksmith, which owns the account and the data. Who did the work doesn’t change whose responsibility it is.',
          correct: false,
        },
        {
          id: 'shop-permissions',
          label: 'The locksmith, because access permissions to its data belong to the customer',
          definition:
            'In services such as Amazon S3, the customer is in charge of its data: encryption options, classification and access permissions through IAM.',
          explanation:
            'The photos’ permissions are security IN the cloud. The locksmith should have configured the bucket and the policies so that only its app could read the images.',
          correct: true,
        },
      ],
    },
    {
      id: 'data-law',
      prompt:
        'My lawyer says customers’ personal data, like name, address and phone number, comes with rules to comply with. It’s in Amazon DynamoDB. Who is responsible for complying with those rules?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-managed-compliance',
          label: 'AWS, because DynamoDB takes server management off the locksmith’s hands',
          definition:
            'A service in which AWS manages the infrastructure, the operating system and the database platform.',
          explanation:
            'The service being managed reduces operational tasks, but it doesn’t transfer to AWS the rules that apply to the locksmith’s data.',
          correct: false,
        },
        {
          id: 'aws-inherited-compliance',
          label: 'AWS, as a control inherited from its data centers',
          definition:
            'Controls the customer receives entirely from the provider, such as data centers’ physical and environmental controls.',
          explanation:
            'Inherited controls cover the physical and environmental. They don’t include complying with the rules for the customer’s personal data.',
          correct: false,
        },
        {
          id: 'shop-compliance',
          label: 'The locksmith, as the owner of the personal data it stores',
          definition:
            'The principle by which the owner of the data is responsible for complying with the laws and rules that govern it, whatever service it uses.',
          explanation:
            'Even though DynamoDB is highly managed, the locksmith is still responsible for complying with the laws and rules that apply to its customers’ data.',
          correct: true,
        },
        {
          id: 'customers-compliance',
          label: 'The customers themselves, because they agreed to use the app',
          definition:
            'The consent a person gives when signing up for an application and handing over their data.',
          explanation:
            'Agreeing to use the app doesn’t shift to the customers the responsibility for protecting their data. The one that stores and processes it is the locksmith.',
          correct: false,
        },
      ],
    },
    {
      id: 'separate-data',
      prompt:
        'Last one. I want to keep the codes for the safes we install in a separate environment, apart from the rest of the bookings. What kind of control is that decision?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'specific-control',
          label: 'A customer-specific control',
          definition:
            'Controls that depend only on the customer and its application, with no part handled by the provider.',
          explanation:
            'Deciding in which security environment to separate certain data depends only on the locksmith and its application: it’s the example of a customer-specific control.',
          correct: true,
        },
        {
          id: 'inherited-separation',
          label: 'A control inherited from AWS',
          definition:
            'Controls the customer inherits entirely from the provider, such as data centers’ physical and environmental controls.',
          explanation:
            'AWS doesn’t decide how the locksmith organizes its data. Inherited controls are the physical and environmental ones.',
          correct: false,
        },
        {
          id: 'shared-separation',
          label: 'A control shared between AWS and the locksmith',
          definition:
            'Controls that apply to the infrastructure and the customer at the same time, such as patching, configuration and training.',
          explanation:
            'With shared controls both do their part. Separating the safe codes is a decision that depends solely on the locksmith.',
          correct: false,
        },
        {
          id: 'of-the-cloud',
          label: 'Security OF the cloud, handled by AWS',
          definition:
            'Protecting the infrastructure that runs the services: the provider’s hardware, software, networking and facilities.',
          explanation:
            'Security OF the cloud is AWS’s infrastructure. How the locksmith’s data is separated is security IN the cloud.',
          correct: false,
        },
      ],
    },
  ],
};
