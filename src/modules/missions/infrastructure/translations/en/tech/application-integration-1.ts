import type { Mission } from '../../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a video game store in Lima whose online preorders collapse at every console launch.
 * Practices decoupling with Amazon SQS (Standard versus FIFO), fan-out with Amazon SNS and orchestration with AWS Step Functions.
 */
export const applicationIntegration1: Mission = {
  id: 'application-integration-1',
  track: 'tech',
  topicSlug: 'application-integration',
  buildingId: 'gaming-store',
  title: 'The midnight preorder',
  client: { name: 'Renzo Chávez', role: 'Owner of Tienda Gamer Pixel' },
  intro: [
    "Welcome to Pixel! I'm Renzo Chávez. I run this video game store in Lima, and we also sell online all over Peru.",
    'At the last console launch, we opened preorders at midnight. Within five minutes thousands of orders came in, the payment service went down and it took everything with it: cart, inventory, confirmations.',
    "We lost orders, some customers paid twice and others never found out whether their console was reserved. Social media did not forgive us.",
    "Another console comes out in two months and I can't repeat that disaster. People tell me we need to \"decouple\" the application. Can you help me do it right?",
  ],
  outro: {
    passed: [
      "This is next level! Orders wait in their queue without getting lost, reservations respect the order they arrived in and every confirmation reaches everyone who needs it.",
      "And the payment process follows its flow step by step, with retries. Bring on the next midnight: we're ready. Thank you!",
    ],
    failed: [
      'Hmm... with these decisions I think the next preorder would knock us out again.',
      "Review the theory on application integration and come back. I'll save you one of the good consoles.",
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'absorb-peak',
      prompt:
        "First problem: at midnight thousands of orders arrive all at once and the payment service can't keep up. I want the orders to be stored until the payment servers can process them at their own pace, without losing a single one. What service do I use?",
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-peak',
          label: 'Amazon SNS',
          definition:
            'Managed pub/sub messaging service that pushes every message published to a topic to all of its subscribers.',
          explanation:
            'SNS pushes messages to subscribers as soon as they are published. What you need is for orders to wait in storage until payments pulls them at its own pace, and that is a queue.',
          correct: false,
        },
        {
          id: 'sqs-peak',
          label: 'Amazon SQS',
          definition:
            'Fully managed message queuing service: producers send messages to a queue and consumers pull them when they can process them.',
          explanation:
            'SQS decouples the store from the payment service: orders are kept in the queue without getting lost, and the payment servers pull them at their own pace, no matter how big the spike is.',
          correct: true,
        },
        {
          id: 'step-functions-peak',
          label: 'AWS Step Functions',
          definition:
            "Service that coordinates the components of a distributed application through visual workflows with steps, decisions and retries.",
          explanation:
            'Step Functions coordinates steps in order. To absorb a load spike and store orders until something processes them, the right piece is an SQS queue.',
          correct: false,
        },
        {
          id: 'eventbridge-peak',
          label: 'Amazon EventBridge',
          definition:
            'Serverless event bus that receives events from applications, AWS services and SaaS, and routes them to targets with rules.',
          explanation:
            'EventBridge routes events to their targets based on rules. Storing orders so payments can pull them at its own pace is the SQS queue pattern.',
          correct: false,
        },
      ],
    },
    {
      id: 'preorder-order',
      prompt:
        "Now the tricky part: we only have 300 consoles for the preorder. Reservations have to be processed in the exact order they arrived, and each one only once, so nobody pays twice. What type of queue or service do I need?",
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sqs-standard-order',
          label: 'An Amazon SQS Standard queue',
          definition:
            'SQS queue type with maximum throughput, best-effort ordering and at-least-once delivery.',
          explanation:
            "It's the classic trap: a Standard queue orders on a best-effort basis and delivers at least once, so a message could arrive duplicated or out of order.",
          correct: false,
        },
        {
          id: 'sns-topic-order',
          label: 'An Amazon SNS standard topic',
          definition:
            'Pub/sub channel where a publisher sends messages that SNS pushes to all subscribers.',
          explanation:
            "An SNS topic delivers each message to many subscribers, but it doesn't keep reservations in a line to process them one by one in order.",
          correct: false,
        },
        {
          id: 'eventbridge-rule-order',
          label: 'An Amazon EventBridge rule',
          definition:
            'Event bus rule that filters events by a pattern and sends them to one or more targets.',
          explanation:
            'An EventBridge rule filters and routes events, but what you are asking for is a line that respects arrival order and processes each reservation exactly once.',
          correct: false,
        },
        {
          id: 'sqs-fifo-order',
          label: 'An Amazon SQS FIFO queue',
          definition:
            'SQS queue type (first in, first out) that processes messages exactly once and in the exact order they were sent.',
          explanation:
            'A FIFO queue respects the exact arrival order and processes each message exactly once: that way the 300 consoles go to the first people to reserve and nobody pays twice.',
          correct: true,
        },
      ],
    },
    {
      id: 'confirmation-fanout',
      prompt:
        "When a reservation is confirmed, the same notice has to reach the billing queue, the warehouse shipping queue and the customer's phone as an SMS, all at once. Which service distributes that message?",
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-fanout',
          label: 'Amazon SNS',
          definition:
            'Managed pub/sub messaging service that pushes every message from a topic to all of its subscribers, such as SQS queues, Lambda functions, SMS or email.',
          explanation:
            "It's a fan-out: you publish the confirmation to an SNS topic and it pushes it to the billing queue, the shipping queue and the customer as an SMS, all with a single message.",
          correct: true,
        },
        {
          id: 'sqs-single-fanout',
          label: 'A single Amazon SQS queue',
          definition:
            'Message queue where producers drop off messages and a consumer pulls them to process them.',
          explanation:
            'In a queue, each message is pulled by one consumer to be processed. To get the same notice to several destinations and to a person by SMS, you use SNS.',
          correct: false,
        },
        {
          id: 'ses-fanout',
          label: 'Amazon SES',
          definition:
            'Service for sending business email from your own domain, such as purchase confirmations or newsletters.',
          explanation:
            'SES sends business email, but the scenario calls for delivering the same message to two queues and an SMS. That fan-out to many subscribers is the job of SNS.',
          correct: false,
        },
        {
          id: 'scheduled-fanout',
          label: 'An Amazon EventBridge schedule that runs every hour',
          definition:
            'Automated task that EventBridge triggers on a schedule, for example every hour or every day.',
          explanation:
            "A scheduled task runs at set intervals, not at the moment each reservation is confirmed, and it doesn't deliver the notice to the queues or the customer.",
          correct: false,
        },
      ],
    },
    {
      id: 'payment-workflow',
      prompt:
        "Final step, the charge. First the card is charged; if it's approved, the console is reserved and shipping is assigned; if it's declined, the customer is notified. And if the bank doesn't respond, we have to retry. I want to see that process and know which step each order is on. What do I use?",
      topicSlug: 'application-integration',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-workflow',
          label: 'Amazon SNS',
          definition:
            'Pub/sub messaging service that publishes a message to a topic and pushes it to all of its subscribers.',
          explanation:
            "SNS distributes messages, but it doesn't coordinate steps in order or make decisions based on whether the payment was approved or declined.",
          correct: false,
        },
        {
          id: 'sqs-fifo-workflow',
          label: 'An Amazon SQS FIFO queue',
          definition:
            'SQS queue that processes messages exactly once and in the order they were sent.',
          explanation:
            "A FIFO queue orders messages, but it doesn't define a process with decisions, retries and the state of each step. To orchestrate that, you use Step Functions.",
          correct: false,
        },
        {
          id: 'step-functions-workflow',
          label: 'AWS Step Functions',
          definition:
            'Fully managed service that coordinates the components of distributed applications with visual workflows, retries and a record of the state of each step.',
          explanation:
            'Step Functions organizes the charge as a series of steps with decisions (approved or declined), retries when there are errors and records the state of each step so you can see where each order is.',
          correct: true,
        },
        {
          id: 'eventbridge-workflow',
          label: 'Amazon EventBridge',
          definition:
            'Serverless event bus that receives events and sends them to targets based on routing rules.',
          explanation:
            "EventBridge reacts to events with rules, but it doesn't orchestrate a multistep process with decisions and state. That's the role of Step Functions.",
          correct: false,
        },
      ],
    },
  ],
};
