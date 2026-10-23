import type { Mission } from '../../../../domain/Mission';

/**
 * Clínica Vida's infrastructure team in Quito: sending radiology images to AWS and reaching a partner lab privately.
 * Practices AWS Direct Connect, Site-to-Site VPN as a backup and its two tunnels, and AWS PrivateLink.
 */
export const hybridConnectivity2: Mission = {
  id: 'hybrid-connectivity-2',
  track: 'tech',
  topicSlug: 'hybrid-connectivity',
  buildingId: 'clinic',
  title: 'Scans on the Way',
  client: { name: 'Gabriela Mena', role: 'Head of Infrastructure at Clínica Vida' },
  intro: [
    'Hi, thanks for coming. I\'m Gabriela Mena, head of Infrastructure at Clínica Vida, here in Quito. While the doctors take care of the patients, my team makes sure the systems don\'t fail.',
    'We bought a new CT scanner and a new MRI machine. Every study produces huge files, and we want to store and process them on AWS, along with the rest of the clinic\'s systems.',
    'Today we send everything over our usual internet connection, and sometimes a study takes so long to upload that the doctor gets tired of waiting. On top of that, a partner lab wants to share its results with us.',
    'A diagnosis that arrives late is a serious problem. I need your help choosing how to connect the clinic with AWS. Will you join me?',
  ],
  outro: {
    passed: [
      'Perfect: Direct Connect for the heavy studies, a backup Site-to-Site VPN with its two tunnels, and PrivateLink to receive the lab\'s results.',
      'The doctors will get their images on time, and I\'ll have a plan for when something fails. Thank you, truly: Clínica Vida\'s doors will always be open to you.',
    ],
    failed: [
      'Hmm... with this plan the studies would keep arriving late. Some of these decisions don\'t quite convince me.',
      'Take your time reviewing connectivity theory and come back whenever you like. I\'ll be waiting here, among servers and white coats.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'imaging-link',
      prompt:
        'Let\'s start with the images: every day we upload a large volume of studies to AWS, and we need consistent performance without depending on the internet. There\'s no rush: we can wait a few weeks for it to be installed. What do we sign up for?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'site-to-site',
          label: 'AWS Site-to-Site VPN',
          definition: 'A connection that links an on-premises network with VPCs through encrypted IPsec tunnels over the internet.',
          explanation:
            'The VPN travels over the internet, so its performance depends on the internet. Gabriela asked precisely not to depend on it.',
          correct: false,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition: 'A network transit hub that interconnects VPCs and on-premises networks in a hub-and-spoke model.',
          explanation:
            'Transit Gateway organizes how networks interconnect, but it isn\'t the physical link that carries the studies from the clinic to AWS.',
          correct: false,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'A managed VPN that lets individual users connect from their devices to AWS and the on-premises network.',
          explanation:
            'Client VPN connects people from their devices, over the internet. It doesn\'t link the clinic\'s network with AWS with consistent performance.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition:
            'A dedicated physical fiber-optic connection between the internal network and a Direct Connect location, bypassing internet service providers.',
          explanation:
            'Direct Connect is a dedicated connection that doesn\'t go over the internet: it offers more bandwidth and a more consistent network experience. Installation takes time, and the clinic can wait.',
          correct: true,
        },
      ],
    },
    {
      id: 'backup-link',
      prompt:
        'I love it, but in healthcare we can\'t have just one path. If the Direct Connect connection fails, I want a backup that links our network with the VPCs, encrypted and quick to set up. What do we use?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'privatelink',
          label: 'AWS PrivateLink',
          definition: 'Private access from a VPC to specific services through interface VPC endpoints.',
          explanation:
            'PrivateLink connects a VPC with specific services. It doesn\'t link the clinic\'s network with the VPCs as a backup.',
          correct: false,
        },
        {
          id: 'site-to-site',
          label: 'AWS Site-to-Site VPN',
          definition:
            'An encrypted IPsec connection over the internet between an on-premises network and VPCs.',
          explanation:
            'Site-to-Site VPN links the clinic\'s network with the VPCs through encrypted IPsec tunnels over the internet, and serving as a backup for Direct Connect is one of its typical scenarios.',
          correct: true,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'A managed, client-based VPN that uses an OpenVPN-based client on each device.',
          explanation:
            'Client VPN is for people on their devices. The backup has to link the clinic\'s entire network with the VPCs.',
          correct: false,
        },
        {
          id: 'nat-gateway',
          label: 'A NAT gateway',
          definition: 'A network address translation service that lets private subnets reach services outside the VPC.',
          explanation:
            'A NAT gateway gives a VPC\'s private subnets outbound internet access; it doesn\'t connect the clinic\'s on-premises network with AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'vpn-tunnels',
      prompt:
        'The general manager asked me something I couldn\'t answer: if the backup VPN fails too, are we left with nothing? How is a Site-to-Site VPN connection put together?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'one-tunnel-igw',
          label: 'A single tunnel that terminates at the VPC\'s internet gateway',
          definition: 'The internet gateway is the component that connects a VPC to the internet.',
          explanation:
            'On the AWS side, the VPN terminates at a virtual private gateway or a transit gateway, not at the internet gateway, and each connection comes with two tunnels.',
          correct: false,
        },
        {
          id: 'two-tunnels',
          label: 'Each connection includes two tunnels that can be used at the same time for high availability',
          definition:
            'AWS Site-to-Site VPN design: two IPsec tunnels per connection, between a virtual private gateway or transit gateway and the customer gateway device.',
          explanation:
            'Each Site-to-Site VPN connection includes two tunnels that can be used simultaneously: if one goes down, the other keeps going. On the clinic\'s side, it terminates at its customer gateway device.',
          correct: true,
        },
        {
          id: 'one-tunnel-per-user',
          label: 'One tunnel per connected employee, with an OpenVPN client',
          definition: 'Individual connections that each user opens from their device with a VPN client.',
          explanation:
            'That describes AWS Client VPN, which connects people. Site-to-Site links networks and comes with two tunnels per connection.',
          correct: false,
        },
        {
          id: 'fiber-link',
          label: 'A dedicated fiber cable to an AWS location',
          definition: 'A dedicated physical connection between the internal network and a Direct Connect location.',
          explanation:
            'That\'s Direct Connect, which is already the primary link. The backup VPN travels over the internet with IPsec tunnels.',
          correct: false,
        },
      ],
    },
    {
      id: 'partner-lab',
      prompt:
        'Last topic: the partner lab offers its results service from its own AWS account. We want to consume it from our private subnets, as if it were inside our VPC, with no internet gateway, no NAT and no public IPs. What do we use?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'privatelink',
          label: 'AWS PrivateLink',
          definition:
            'A private connection between a VPC and services from AWS, other accounts or partners, as if they were inside the VPC, through interface VPC endpoints.',
          explanation:
            'PrivateLink lets you consume another AWS account\'s service privately, with an interface VPC endpoint, without an internet gateway, NAT or public IPs.',
          correct: true,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition: 'A transit hub that interconnects VPCs and on-premises networks in a hub-and-spoke model.',
          explanation:
            'Transit Gateway interconnects entire networks. To privately access a specific service in another account, the right piece is PrivateLink.',
          correct: false,
        },
        {
          id: 'internet-gateway',
          label: 'An internet gateway and the lab\'s public URL',
          definition: 'A component that connects a VPC to the internet to reach public services.',
          explanation:
            'Gabriela asked precisely not to use an internet gateway or expose the traffic to the internet. With medical results, access must be private.',
          correct: false,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'A managed VPN that lets individual users access AWS and the on-premises network from their devices.',
          explanation:
            'Client VPN connects people, not the clinic\'s systems with the lab\'s service.',
          correct: false,
        },
      ],
    },
  ],
};
