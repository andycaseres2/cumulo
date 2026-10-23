import type { Mission } from '../../../../domain/Mission';

/**
 * Robótica Kids: a robotics shop and academy for children in Montevideo connecting its robot kits to the cloud.
 * Practices AWS IoT Core (protocols, message broker and rules), Amazon AppStream 2.0 and WorkSpaces Personal.
 */
export const businessAppsDesktopsAndIot2: Mission = {
  id: 'business-apps-desktops-and-iot-2',
  track: 'tech',
  topicSlug: 'business-apps-desktops-and-iot',
  buildingId: 'robotics-school',
  title: 'Robots that talk to the cloud',
  client: { name: 'Matías Ferreira', role: 'Owner of Robótica Kids' },
  intro: [
    "Hi! Come on in, watch out for the robot running loose on the floor. I'm Matías Ferreira, owner of Robótica Kids. We sell robotics kits and teach classes to kids all over Montevideo.",
    "This year we want to take a big leap: have the robots in the kits send their sensor data to the cloud, so the kids can see in an app how much light or temperature they measured.",
    "We're also launching online classes for schools in the Uruguayan countryside, but the program used to code the robots is heavy and a lot of families can't install it. And my two designers work remotely on computers that are on their last legs.",
    "If this goes well, we'll be in a hundred schools next year. If it goes badly, I'm stuck with a warehouse full of silent robots. Can you give me a hand?",
  ],
  outro: {
    passed: [
      'The robots are talking! The sensors send their data to the cloud, the rules route it to where we analyze it and the kids in the countryside code right from the browser.',
      "And my designers finally have a desktop of their own that doesn't freeze. Thank you: the first robot in our next collection is going to be named after you.",
    ],
    failed: [
      "Hmm... with these decisions the robots stay silent and the online classes don't get off the ground.",
      'Review the theory on virtual desktops and IoT, and come back whenever you like. The robots will be waiting for you, charging their batteries.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'connect-robots',
      prompt:
        'Most important thing first: the robots have sensors and can publish messages over MQTT. We want them to connect to the cloud and have the kids\' app subscribe to those messages. What service do we use?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'ses-robots',
          label: 'Amazon SES',
          definition:
            'Email platform for sending and receiving messages with your own addresses and domains.',
          explanation:
            "SES sends and receives email. It doesn't connect devices or receive MQTT messages from sensors.",
          correct: false,
        },
        {
          id: 'iot-core',
          label: 'AWS IoT Core',
          definition:
            'Service that connects IoT devices to other devices and to AWS services, with a publish/subscribe message broker.',
          explanation:
            'IoT Core supports MQTT, and its message broker lets the robots publish their readings and the app subscribe to them. The robots integrate using the AWS IoT Device SDKs.',
          correct: true,
        },
        {
          id: 'connect-robots-option',
          label: 'Amazon Connect',
          definition:
            'Cloud contact center that connects customers with agents by voice, chat and SMS.',
          explanation:
            'Connect is for serving people who call or message a contact center, not for receiving sensor data.',
          correct: false,
        },
        {
          id: 'appstream-robots',
          label: 'Amazon AppStream 2.0',
          definition:
            "Managed service for streaming desktop applications to users' devices.",
          explanation:
            "AppStream 2.0 delivers applications to people. It isn't the service that connects devices to the cloud.",
          correct: false,
        },
      ],
    },
    {
      id: 'rural-schools',
      prompt:
        "For rural schools we built robots that use LoRaWAN, because coverage is poor. My business partner says that once IoT Core is connected, it'll analyze the data all by itself and give us the reports. What's correct?",
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'iot-analyzes',
          label: 'IoT Core analyzes the readings and builds the reports on its own',
          definition:
            'The assumption that the service that connects the devices also takes care of analyzing their data.',
          explanation:
            "It's a classic exam trap. IoT Core connects the devices and routes their messages; the analysis happens in other AWS services.",
          correct: false,
        },
        {
          id: 'mqtt-only',
          label: "IoT Core only accepts MQTT, so the LoRaWAN robots can't connect",
          definition:
            'The assumption that the service supports a single communication protocol for devices.',
          explanation:
            'IoT Core supports MQTT, MQTT over secure WebSockets, HTTPS and LoRaWAN, so the robots at the rural schools can indeed connect.',
          correct: false,
        },
        {
          id: 'workspaces-robot',
          label: 'You have to install Amazon WorkSpaces on each robot so it can send data',
          definition:
            'The assumption that a virtual desktop service works as connection software inside a device.',
          explanation:
            'WorkSpaces delivers virtual desktops to people. Devices integrate with IoT Core using the AWS IoT Device SDKs.',
          correct: false,
        },
        {
          id: 'rules-route',
          label: 'IoT Core connects the robots, even over LoRaWAN, and uses rules to send the data to other services that do the analysis',
          definition:
            'A division of work in which the IoT service connects and routes the messages, and other services process and analyze the data.',
          explanation:
            'IoT Core supports LoRaWAN, and its rules send the readings to other AWS services, which are the ones that analyze the data and generate the reports.',
          correct: true,
        },
      ],
    },
    {
      id: 'online-classes',
      prompt:
        'Now the online classes. Kids in the countryside need to use our desktop program for coding robots, which needs a fair amount of GPU, from the browser at home, without installing anything and without giving them a whole desktop. What do we use?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-classes',
          label: 'Amazon WorkSpaces',
          definition:
            'Service that provisions full cloud virtual desktops running Windows or Linux.',
          explanation:
            'WorkSpaces delivers a full desktop, and Matías asked for just the application, without a whole desktop for each kid.',
          correct: false,
        },
        {
          id: 'appstream',
          label: 'Amazon AppStream 2.0',
          definition:
            'Managed service that streams individual desktop applications, even to an HTML5-compatible browser.',
          explanation:
            'AppStream 2.0 streams the application to the browser without installing it, works for GPU-intensive software and for class programs, and the academy maintains a single version of the program. AWS now calls it Amazon WorkSpaces Applications.',
          correct: true,
        },
        {
          id: 'secure-browser-classes',
          label: 'Amazon WorkSpaces Secure Browser',
          definition:
            'Remote enterprise browser for secure access to internal websites and SaaS applications.',
          explanation:
            "Secure Browser is for websites and SaaS applications. The robot program is a desktop application.",
          correct: false,
        },
        {
          id: 'iot-classes',
          label: 'AWS IoT Core',
          definition:
            'Service that connects IoT devices and routes their messages to other AWS services using rules.',
          explanation:
            "IoT Core connects the robots to the cloud, but it doesn't deliver desktop applications to students.",
          correct: false,
        },
      ],
    },
    {
      id: 'designers-desktops',
      prompt:
        'Finally, my two designers work remotely on old computers. I want each of them to have her own full Windows desktop, persistent and just for her, without buying them new equipment. Which option do we choose?',
      topicSlug: 'business-apps-desktops-and-iot',
      examTasks: ['3.8'],
      options: [
        {
          id: 'workspaces-pools-designers',
          label: 'WorkSpaces Pools',
          definition:
            'Amazon WorkSpaces option that delivers non-persistent virtual desktops on ephemeral infrastructure.',
          explanation:
            "WorkSpaces Pools desktops aren't persistent and aren't assigned to one person, and the designers need a desktop of their own that's kept.",
          correct: false,
        },
        {
          id: 'appstream-designers',
          label: 'Amazon AppStream 2.0',
          definition:
            'Managed service for streaming individual desktop applications to any device.',
          explanation:
            'AppStream 2.0 is geared toward streaming applications; for a full, persistent desktop assigned to each designer, the option is WorkSpaces Personal.',
          correct: false,
        },
        {
          id: 'workspaces-personal-designers',
          label: 'WorkSpaces Personal',
          definition:
            'Amazon WorkSpaces option that delivers persistent virtual desktops, each assigned to one user.',
          explanation:
            'Each designer would have her own persistent Windows desktop, like her computer, without buying hardware. You can pay monthly or hourly.',
          correct: true,
        },
        {
          id: 'connect-designers',
          label: 'Amazon Connect',
          definition:
            'Omnichannel cloud contact center with real-time metrics and pay-as-you-go pricing.',
          explanation:
            "Connect handles customer contacts. It doesn't provision desktops for the shop's team.",
          correct: false,
        },
      ],
    },
  ],
};
