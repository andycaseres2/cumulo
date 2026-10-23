import type { Mission } from '../../../../domain/Mission';

/**
 * Atiende Sur: a customer-service outsourcing company in Santiago de Chile opening a new operation for a telecom client.
 * Practices Amazon Connect, WorkSpaces Pools, Amazon WorkSpaces Secure Browser and Amazon SES.
 */
export const businessAppsDesktopsAndIot1: Mission = {
  id: 'business-apps-desktops-and-iot-1',
  track: 'tech',
  topicSlug: 'business-apps-desktops-and-iot',
  buildingId: 'data-center',
  title: 'A thousand calls an hour',
  client: { name: 'Valentina Rojas', role: 'Director of Operations at Atiende Sur' },
  intro: [
    "So glad you made it! I'm Valentina Rojas, director of operations at Atiende Sur. We have offices here, at Centro de Datos Andino, and we handle customer service on behalf of other companies from Santiago de Chile.",
    'We just won a huge contract: customer service for a phone company. In one month we need to handle calls, chats and SMS from all over the country.',
    "The problem is that our phone system is old, our agents work in shifts from home on their own computers and we don't want to buy them laptops. On top of that, the client wants every person to get an email after being helped.",
    "If we don't launch on time, we lose the contract and the forty agents we already hired. Can you help me set up the operation on AWS?",
  ],
  outro: {
    passed: [
      'We did it! The operation launches on Monday with a cloud contact center, desktops for every shift and emails that go out on their own from our domain.',
      "The external supervisors get into the CRM without taking data back to their machines, and the client already asked if we can add another country. Thank you: here you'll always have an open line.",
    ],
    failed: [
      "Ugh... with these decisions we won't make it to Monday. Some pieces of the operation still don't fit.",
      "Review the theory on business applications and virtual desktops, and come back whenever you like. We'll have the coffee ready for you.",
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'contact-center',
      prompt:
        "Let's start with the heart of it all: we need to serve customers by voice, chat and SMS, have each contact reach the right agent and see metrics in real time. I don't want to buy phone systems or pay up front. What service do we use?",
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'connect',
          label: 'Amazon Connect',
          definition:
            'Omnichannel cloud contact center service with intelligent routing, real-time metrics and pay-as-you-go pricing.',
          explanation:
            "It's exactly what Atiende Sur needs: it connects customers with agents by voice, chat and SMS, routes each contact and requires no infrastructure of your own or up-front payments.",
          correct: true,
        },
        {
          id: 'ses-contact',
          label: 'Amazon SES',
          definition:
            'Platform for sending and receiving email with your own addresses and domains, at scale.',
          explanation:
            "SES handles email. It doesn't receive calls or chats or route them to an agent, which is what the operation needs.",
          correct: false,
        },
        {
          id: 'workspaces-contact',
          label: 'Amazon WorkSpaces',
          definition:
            "Service that provisions cloud virtual desktops running Windows or Linux for an organization's people.",
          explanation:
            "WorkSpaces could give each agent a desktop, but it isn't the platform that receives, routes and measures customer contacts.",
          correct: false,
        },
        {
          id: 'iot-contact',
          label: 'AWS IoT Core',
          definition:
            'Service that connects IoT devices, such as sensors and meters, to other devices and to AWS services.',
          explanation:
            "IoT Core connects devices that send data. It doesn't handle calls or chats from people.",
          correct: false,
        },
      ],
    },
    {
      id: 'shift-desktops',
      prompt:
        "Now the agents. They work rotating shifts from home and there aren't enough laptops for everyone. I want full virtual desktops that are used per shift, not a fixed one for each person. Which option do we choose?",
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-personal',
          label: 'WorkSpaces Personal',
          definition:
            'Amazon WorkSpaces option that delivers persistent virtual desktops, each assigned to one user.',
          explanation:
            'WorkSpaces Personal assigns a persistent desktop to each person, like their own computer. Atiende Sur wants desktops that are shared across shifts.',
          correct: false,
        },
        {
          id: 'secure-browser-desktops',
          label: 'Amazon WorkSpaces Secure Browser',
          definition:
            'Managed remote enterprise browser for secure access to internal websites and SaaS applications.',
          explanation:
            "Secure Browser gives access to websites and SaaS applications from the browser, but it doesn't deliver a full virtual desktop.",
          correct: false,
        },
        {
          id: 'workspaces-pools',
          label: 'WorkSpaces Pools',
          definition:
            'Amazon WorkSpaces option that delivers non-persistent virtual desktops on ephemeral infrastructure.',
          explanation:
            "WorkSpaces Pools' non-persistent desktops fit rotating shifts: each agent picks up a desktop when they log in, and there's no need for a fixed one per person or for buying laptops.",
          correct: true,
        },
        {
          id: 'ses-desktops',
          label: 'Amazon SES',
          definition:
            'Email service for transactional and marketing messages sent from your own domain.',
          explanation:
            "SES sends and receives email. It doesn't provision desktops for the agents.",
          correct: false,
        },
      ],
    },
    {
      id: 'external-supervisors',
      prompt:
        "The phone company will send external supervisors. They only need to get into our internal web CRM and a couple of SaaS applications from the browser on their own machines, without customer data staying on those machines. What do we give them?",
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-supervisors',
          label: 'A full Amazon WorkSpaces desktop for each supervisor',
          definition:
            'Cloud virtual desktops running Windows or Linux, persistent or pooled, that replace a work computer.',
          explanation:
            "A full desktop is more than they need. When access to internal websites and SaaS from the browser is enough, the option is WorkSpaces Secure Browser.",
          correct: false,
        },
        {
          id: 'connect-supervisors',
          label: 'Amazon Connect',
          definition:
            'Cloud contact center that connects customers with agents by voice, chat, SMS and other channels.',
          explanation:
            "Connect manages customer contacts. It doesn't offer secure browsing to an internal web CRM or SaaS applications.",
          correct: false,
        },
        {
          id: 'iot-supervisors',
          label: 'AWS IoT Core',
          definition:
            'Service with a publish/subscribe message broker so IoT devices can exchange messages.',
          explanation:
            'IoT Core connects devices like sensors, not people browsing web applications.',
          correct: false,
        },
        {
          id: 'secure-browser',
          label: 'Amazon WorkSpaces Secure Browser',
          definition:
            'Managed remote enterprise browser: browsing happens in a cloud session, and users use the browser they already have.',
          explanation:
            "The supervisors get into the CRM and SaaS applications from their own browser, the session runs in the cloud and sensitive data never reaches their machines. According to AWS, it stops accepting new customers as of October 29, 2026, but it's still in the exam guide.",
          correct: true,
        },
      ],
    },
    {
      id: 'after-call-email',
      prompt:
        'Last item on the list: after each interaction we want to send a confirmation email with the case number, and once a month a newsletter with updates, all from the Atiende Sur domain and to thousands of people. What service do we use?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sns-email',
          label: 'Amazon SNS',
          definition:
            'Publish/subscribe notification service that sends messages to the subscribers of a topic.',
          explanation:
            "It's a classic trap: SNS is for notifications and pub/sub. For transactional and marketing email at scale from your own domain, the service is SES.",
          correct: false,
        },
        {
          id: 'ses',
          label: 'Amazon SES',
          definition:
            'Platform for sending and receiving email with your own addresses and domains, cost-effectively and at scale.',
          explanation:
            'SES covers both cases: the confirmation with the case number is transactional email and the monthly newsletter is marketing email, both from the Atiende Sur domain.',
          correct: true,
        },
        {
          id: 'connect-email',
          label: 'Amazon Connect',
          definition:
            'Omnichannel cloud contact center with intelligent routing of contacts to agents.',
          explanation:
            'Connect handles and routes customer contacts. To send confirmations and newsletters by email from your own domain, the right service is SES.',
          correct: false,
        },
        {
          id: 'appstream-email',
          label: 'Amazon AppStream 2.0',
          definition:
            'Managed service that streams desktop applications, even to an HTML5-compatible browser.',
          explanation:
            "AppStream 2.0 streams applications to users. It isn't an email platform.",
          correct: false,
        },
      ],
    },
  ],
};
