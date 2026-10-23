import type { Mission } from '../../../../domain/Mission';

/**
 * Taller Maker 3D: a 3D printing workshop in Montevideo whose web orders vanish whenever the printer controller restarts.
 * Practices loose coupling, Amazon EventBridge with SaaS events, Amazon SNS alerts to people and SQS Standard delivery semantics.
 */
export const applicationIntegration2: Mission = {
  id: 'application-integration-2',
  track: 'tech',
  topicSlug: 'application-integration',
  buildingId: 'maker-workshop',
  title: 'Parts lost along the way',
  client: { name: 'Lucía Pereyra', role: 'Cofounder of Taller Maker 3D' },
  intro: [
    "Hi, sorry about the noise from the printers. I'm Lucía Pereyra, cofounder of Taller Maker 3D, right here in Montevideo. We 3D print spare parts, prototypes and custom pieces.",
    'We get orders from two places: a form on our website and our Shopify store. A controller program distributes the jobs across our twelve printers.',
    "The problem: every time the controller restarts, the orders that come in at that moment get lost. Other times a part gets printed twice, and nobody notices when a print fails in the middle of the night.",
    "A medical device company wants us as a regular supplier, but only if we're reliable. Can you help me keep parts from getting lost along the way?",
  ],
  outro: {
    passed: [
      'Amazing! Now the website and the controller are decoupled, Shopify orders arrive on their own with their rules and the on-call technician gets an alert when something fails.',
      "And I finally understand why parts were being duplicated. With this, we're signing with the medical company. Thank you!",
    ],
    failed: [
      "Hmm... with these decisions we'd keep losing parts along the way.",
      "Review the theory on application integration and come back. I'll print you a keychain when you return.",
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'decouple-controller',
      prompt:
        'Right now the web form calls the printer controller directly and waits for its response. If the controller restarts, the order is lost. Which architecture principle should I apply?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'bigger-server',
          label: 'Put the controller on a bigger server so it restarts less often',
          definition:
            'Vertical scaling: increasing the capacity of a single machine, with more CPU or more memory.',
          explanation:
            "A bigger server doesn't change the fact that the website depends on the controller: if it restarts for any reason, the orders from that moment are still lost.",
          correct: false,
        },
        {
          id: 'single-program',
          label: 'Combine the website and the controller into a single program',
          definition:
            'Architecture in which every function lives in the same application and they call each other directly.',
          explanation:
            "Combining them couples the components even more tightly: a failure anywhere drags down the whole system, which is exactly what you want to avoid.",
          correct: false,
        },
        {
          id: 'loose-coupling',
          label: 'Decouple: have the website leave each order as a message and the controller process it when it can',
          definition:
            'Loosely coupled architecture: components communicate through messages instead of calling each other directly.',
          explanation:
            'When you decouple, the website leaves the order as a message, for example in a queue, and the controller processes it when it comes back. If one component fails, the others keep working, and each one scales on its own.',
          correct: true,
        },
        {
          id: 'wait-longer',
          label: 'Make the website wait longer for the controller response',
          definition:
            'Adjusting the maximum time one component waits for another to respond before treating the call as failed.',
          explanation:
            'Waiting longer keeps the website dependent on the controller. If it is down, the order is still lost; the problem is the coupling.',
          correct: false,
        },
      ],
    },
    {
      id: 'shopify-events',
      prompt:
        'Now the Shopify store. Every time an order comes in, we want only the resin printing orders to go to an AWS Lambda function that prepares the file. I need to receive those events from Shopify and filter them with rules. What do I use?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'eventbridge-shopify',
          label: 'Amazon EventBridge',
          definition:
            'Serverless event bus that receives events from your applications, AWS services and integrated SaaS applications, and routes them with filtering rules.',
          explanation:
            'EventBridge receives events from integrated SaaS applications like Shopify, and its rules filter just the resin orders to send them to the Lambda function.',
          correct: true,
        },
        {
          id: 'sqs-shopify',
          label: 'Amazon SQS',
          definition:
            'Managed queuing service where messages wait until a consumer pulls and processes them.',
          explanation:
            "SQS stores messages for a consumer to pull, but it doesn't receive events from a SaaS application or filter them with routing rules.",
          correct: false,
        },
        {
          id: 'step-functions-shopify',
          label: 'AWS Step Functions',
          definition:
            'Service that coordinates multiple steps of a distributed application through visual workflows.',
          explanation:
            "Step Functions orchestrates multistep processes. Receiving events from a SaaS application and filtering them with rules is EventBridge's main job.",
          correct: false,
        },
        {
          id: 'sns-shopify',
          label: 'Amazon SNS',
          definition:
            'Pub/sub messaging service that pushes messages published to a topic to all of its subscribers.',
          explanation:
            'SNS distributes whatever is published to a topic, but what you need is to receive Shopify events and filter them with rules, which is the job of EventBridge.',
          correct: false,
        },
      ],
    },
    {
      id: 'alert-technician',
      prompt:
        'When a print fails in the middle of the night, nobody finds out until morning and we lose hours. I want the on-call technician to get an SMS and an email as soon as it happens. Which service sends those alerts?',
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sqs-alert',
          label: 'Amazon SQS',
          definition:
            'Message queuing service where a consumer pulls messages to process them at its own pace.',
          explanation:
            "It's the classic trap: a queue stores messages for another component, but it doesn't alert a person. SMS and email notifications are the job of SNS.",
          correct: false,
        },
        {
          id: 'step-functions-alert',
          label: 'AWS Step Functions',
          definition:
            'Service that coordinates steps in order, with decisions and retries, through visual workflows.',
          explanation:
            'Step Functions coordinates multistep processes, but alerting a person by SMS and email is a job for SNS.',
          correct: false,
        },
        {
          id: 'kinesis-alert',
          label: 'Amazon Kinesis Data Streams',
          definition:
            'Service for capturing real-time data streams, such as telemetry or application logs.',
          explanation:
            "Kinesis Data Streams captures streaming data for processing. It doesn't send SMS or email alerts to the on-call technician.",
          correct: false,
        },
        {
          id: 'sns-alert',
          label: 'Amazon SNS',
          definition:
            'Managed pub/sub service that pushes messages to its subscribers, including people via SMS, email and mobile push notifications.',
          explanation:
            'For alerts and notifications to people, the answer is SNS: the technician subscribes to the topic by SMS and email and gets the alert as soon as the failure is published.',
          correct: true,
        },
      ],
    },
    {
      id: 'duplicate-prints',
      prompt:
        "One last question. We already use an Amazon SQS Standard queue for the jobs, and every now and then a part gets printed twice. My business partner says SQS is broken. What's going on?",
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sqs-broken',
          label: 'SQS is losing and resending messages because of a bug; we need to open a support case',
          definition:
            'The hypothesis that the queuing service has a fault that causes unexpected resends.',
          explanation:
            "It isn't a fault: the Standard queue is designed for at-least-once delivery, so a duplicate message is expected behavior.",
          correct: false,
        },
        {
          id: 'at-least-once',
          label: 'A Standard queue delivers at least once; a FIFO queue processes each message exactly once and in order',
          definition:
            'The difference between SQS queue types: Standard prioritizes throughput with at-least-once delivery; FIFO guarantees exact ordering and exactly-once processing.',
          explanation:
            'With a Standard queue, a message could arrive duplicated. If each job must be printed only once, a FIFO queue processes each message exactly once and in the order it was sent.',
          correct: true,
        },
        {
          id: 'standard-exactly-once',
          label: 'The Standard queue guarantees exactly once; the problem is in the printers',
          definition:
            'A claim about the delivery guarantees of the SQS Standard queue.',
          explanation:
            "It's the other way around: the Standard queue delivers at least once, with best-effort ordering. The exactly-once guarantee belongs to FIFO queues.",
          correct: false,
        },
        {
          id: 'switch-to-sns',
          label: 'Replace the queue with an SNS topic, which delivers each job to a single printer',
          definition:
            'Using a pub/sub topic to distribute jobs among the components that process them.',
          explanation:
            'SNS pushes every message to all subscribers. With several printers subscribed, the same job would reach all of them, the opposite of what you want.',
          correct: false,
        },
      ],
    },
  ],
};
