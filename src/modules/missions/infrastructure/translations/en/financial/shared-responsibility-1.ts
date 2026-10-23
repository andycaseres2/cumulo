import type { Mission } from '../../../../domain/Mission';

/**
 * Casa de Cambio Inca: a currency exchange shop in Cusco whose rate calculator runs on Amazon EC2.
 * Practices the shared responsibility model on IaaS: guest OS patching, inherited and shared controls, and security groups.
 */
export const sharedResponsibility1: Mission = {
  id: 'shared-responsibility-1',
  track: 'financial',
  topicSlug: 'shared-responsibility',
  buildingId: 'exchange-house',
  title: 'The exchange rate of security',
  client: { name: 'Rosa Ccori', role: 'Owner of Casa de Cambio Inca' },
  intro: [
    'Welcome! I’m Rosa Ccori, owner of Casa de Cambio Inca, here in Cusco. We exchange dollars, euros and soles for tourists who arrive from all over the world.',
    'Last year my nephew set up our exchange rate calculator on Amazon EC2 servers. It works well, but he went off to study in Arequipa and now nobody here in Cusco knows what needs maintaining.',
    'To renew our license, the regulator is asking me for a list of security controls: what AWS does and what we do. I thought that, being in the cloud, AWS took care of everything.',
    'If I hand in the wrong list, they could flag my license right in the middle of high season. Will you help me separate what belongs to AWS from what belongs to me?',
  ],
  outro: {
    passed: [
      'What a relief! Now I understand that AWS protects the cloud and I protect what I put inside it, starting with those EC2 servers.',
      'My list of controls is clear and organized. Drop by the exchange shop anytime: there will always be a good exchange rate for you.',
    ],
    failed: [
      'Hmm... with these answers the list for the regulator still has mistakes, and I can’t risk the license.',
      'Review the theory on the shared responsibility model and come back. I’ll be waiting here, with the calculator on.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ec2-guest-os',
      prompt:
        'Let’s start with the servers. The calculator runs on Amazon EC2 instances with Linux. We got a notice about a serious vulnerability in that operating system. Who should apply the patch?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-patches-guest',
          label: 'AWS, because it owns the physical servers',
          definition:
            'The idea that the cloud provider maintains all the software running on its servers, including each instance’s operating system.',
          explanation:
            'AWS patches the host operating system and the virtualization layer, but on Amazon EC2 the instance’s guest operating system is maintained by the customer.',
          correct: false,
        },
        {
          id: 'maintenance-window',
          label: 'AWS, during the maintenance window the exchange shop chooses',
          definition:
            'A weekly period the customer defines for AWS to apply maintenance to a managed service, such as a database.',
          explanation:
            'That arrangement belongs to Amazon RDS, where AWS patches the operating system and the engine. On an EC2 instance nobody does it for you: the guest operating system is yours.',
          correct: false,
        },
        {
          id: 'shop-patches-guest',
          label: 'The exchange shop, because the EC2 guest operating system is its responsibility',
          definition:
            'In infrastructure as a service, the customer installs, configures and patches the operating system running inside its virtual server.',
          explanation:
            'Amazon EC2 is IaaS: the exchange shop patches the guest operating system, the software it installed and its network rules. It’s the model where the customer has the most to do.',
          correct: true,
        },
        {
          id: 'nobody-patches',
          label: 'Nobody, because instances in the cloud don’t need patches',
          definition:
            'The belief that a virtual server in the cloud is protected just by being hosted in the provider’s data center.',
          explanation:
            'An EC2 instance has an operating system like any server, with its vulnerabilities. If the exchange shop doesn’t patch it, it’s exposed.',
          correct: false,
        },
      ],
    },
    {
      id: 'physical-controls',
      prompt:
        'The regulator asks about physical and environmental controls: cameras, guards, power and temperature in the data center where my servers run. How do I classify them on my list?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'inherited-control',
          label: 'Inherited control: the exchange shop inherits them entirely from AWS',
          definition:
            'Controls the customer receives entirely from the cloud provider, without having to operate them or share their execution.',
          explanation:
            'Data centers’ physical and environmental controls are the classic example of an inherited control: AWS operates them and the exchange shop inherits them as is.',
          correct: true,
        },
        {
          id: 'shared-physical',
          label: 'Shared control: AWS looks after the building and the exchange shop provides its own guards',
          definition:
            'Controls that apply both to the provider’s infrastructure and to what the customer does, each in its own context.',
          explanation:
            'Shared controls are patching, configuration and training. The exchange shop has no access to or guards in AWS data centers.',
          correct: false,
        },
        {
          id: 'customer-specific-physical',
          label: 'Customer-specific control, because the servers belong to the exchange shop',
          definition:
            'Controls that depend only on the customer and its application, such as deciding in which security environments certain data is separated.',
          explanation:
            'The exchange shop uses virtual instances; it doesn’t own the hardware or the building. Physical security is security OF the cloud, handled by AWS.',
          correct: false,
        },
        {
          id: 'not-applicable',
          label: 'Not applicable: there are no physical controls in the cloud',
          definition:
            'The idea that, without owning servers, physical and environmental risks disappear from the security analysis.',
          explanation:
            'The data centers exist and have physical and environmental controls. It’s just that AWS operates them, which is why they’re classified as inherited.',
          correct: false,
        },
      ],
    },
    {
      id: 'security-group-open',
      prompt:
        'While reviewing, I found that the calculator’s security group lets in administration connections from any address on the internet. Whose job is it to fix that rule?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'aws-firewall',
          label: 'AWS’s, because the security group is part of its global network',
          definition:
            'The idea that instances’ firewall rules are part of the network infrastructure the provider protects.',
          explanation:
            'AWS protects its global network infrastructure, but the rules of each security group are defined by the customer. It’s security IN the cloud.',
          correct: false,
        },
        {
          id: 'shop-rules',
          label: 'The exchange shop’s, because security group rules belong to the customer',
          definition:
            'A security group acts as an instance’s virtual firewall; its inbound and outbound rules are configured by whoever deploys it.',
          explanation:
            'Security group rules are the customer’s responsibility on EC2. The exchange shop must limit administration access to the addresses that need it.',
          correct: true,
        },
        {
          id: 'aws-support-fix',
          label: 'AWS’s, which should detect it and close it in the next maintenance window',
          definition:
            'A process in which the provider applies changes to a managed service within a period agreed with the customer.',
          explanation:
            'Maintenance windows exist for managed services like RDS, and they aren’t used to change the customer’s network rules. The exchange shop defined this rule.',
          correct: false,
        },
        {
          id: 'regulator-fix',
          label: 'The regulator’s, because it’s the one requiring the controls',
          definition:
            'An external entity that defines security and compliance requirements that supervised companies must demonstrate.',
          explanation:
            'The regulator asks for evidence, but it doesn’t manage the exchange shop’s AWS account. Configuring access to its instances is the customer’s job.',
          correct: false,
        },
      ],
    },
    {
      id: 'staff-training',
      prompt:
        'The last item on the list says "security training." My cashiers get fake emails all the time. How is that control split between AWS and us?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'training-inherited',
          label: 'It’s inherited: AWS trains all of its customers’ staff',
          definition:
            'Classifying a control as received entirely from the provider, with no task for the customer.',
          explanation:
            'AWS trains its own employees, not the exchange shop’s cashiers. The example of an inherited control is physical and environmental controls.',
          correct: false,
        },
        {
          id: 'training-aws-only',
          label: 'It’s security OF the cloud, so it’s only AWS’s job',
          definition:
            'The provider’s area of responsibility: the hardware, software, networking and facilities that run its services.',
          explanation:
            'Security OF the cloud covers AWS’s infrastructure. Training the exchange shop’s employees isn’t part of that infrastructure.',
          correct: false,
        },
        {
          id: 'training-specific',
          label: 'It’s customer-specific: it depends only on the exchange shop and its application',
          definition:
            'Controls that depend solely on the customer, such as deciding in which security environments certain data is routed or separated.',
          explanation:
            'Training doesn’t depend only on the customer: AWS also trains its staff. That’s why it isn’t a customer-specific control.',
          correct: false,
        },
        {
          id: 'training-shared',
          label: 'It’s shared: AWS trains its employees and the exchange shop trains its own',
          definition:
            'Controls that apply to the infrastructure and the customer at the same time, each in its own context, like patch management and configuration management.',
          explanation:
            'Awareness and training is a shared control. AWS trains its people, and the exchange shop must train its cashiers to recognize fake emails.',
          correct: true,
        },
      ],
    },
  ],
};
