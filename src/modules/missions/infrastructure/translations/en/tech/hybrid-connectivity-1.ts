import type { Mission } from '../../../../domain/Mission';

/**
 * Municipal IT department in Cochabamba: connecting the city data center, field inspectors and many department VPCs to AWS.
 * Practices AWS Site-to-Site VPN, AWS Client VPN, AWS Direct Connect encryption and AWS Transit Gateway.
 */
export const hybridConnectivity1: Mission = {
  id: 'hybrid-connectivity-1',
  track: 'tech',
  topicSlug: 'hybrid-connectivity',
  buildingId: 'cityhall',
  title: 'Bridges for the City',
  client: { name: 'Andrés Villca', role: 'Head of IT at City Hall' },
  intro: [
    'Come in, please. I\'m Andrés Villca, head of IT at City Hall. From this floor, here in Cochabamba, we keep the property registry, traffic, health and citizen services systems running.',
    'The mayor approved moving the new systems to AWS, but the city data center stays: it holds the property registry, which we can\'t move yet.',
    'So I have to build bridges: between the data center and AWS, between the inspectors who work out in the streets and our systems, and between each department\'s VPCs.',
    'Our first online service launches next month, and I can\'t let the city down. Will you help me choose each connection?',
  ],
  outro: {
    passed: [
      'Done: a Site-to-Site VPN to get started right away, Client VPN for the inspectors, Direct Connect with its encryption properly sorted out, and a Transit Gateway as our central plaza.',
      'The city is well connected, and I\'ll get to sleep soundly on launch night. Thank you: City Hall owes you one.',
    ],
    failed: [
      'Hmm... with these bridges I don\'t dare launch the online service. Some of these connections still worry me.',
      'Take your time reviewing connectivity theory and come back whenever you like. I\'ll be right here, between case files and cables.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'urgent-link',
      prompt:
        'Most urgent first: the new systems on AWS need to talk to the city data center this very week, and the traffic must be encrypted. Later on we\'ll evaluate something more robust. What do I use?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition: 'A dedicated physical connection between the internal network and a Direct Connect location, bypassing internet service providers.',
          explanation:
            'Direct Connect requires physical work at a Direct Connect location or with a partner, so it can\'t connect things this very week. Also, it is not encrypted by default.',
          correct: false,
        },
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition: 'A managed, client-based VPN service that lets individual users access resources from anywhere.',
          explanation:
            'Client VPN connects people from their devices. Here you need to link the entire data center network with the VPCs.',
          correct: false,
        },
        {
          id: 'site-to-site',
          label: 'AWS Site-to-Site VPN',
          definition:
            'A connection that links an on-premises network with VPCs through encrypted IPsec tunnels over the internet.',
          explanation:
            'Site-to-Site VPN links the data center with the VPCs using encrypted IPsec tunnels over the internet, and it is quick to set up. It\'s the typical choice to connect right away while other options are evaluated.',
          correct: true,
        },
        {
          id: 'privatelink',
          label: 'AWS PrivateLink',
          definition: 'A private connection between a VPC and specific services through interface VPC endpoints.',
          explanation:
            'PrivateLink provides private access to services from a VPC. It doesn\'t link the city data center network with AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'field-inspectors',
      prompt:
        'Now the building inspectors. They spend the day out in the streets or at home with their laptops, and they need secure access to the internal systems, both on AWS and in the data center. What do we give them?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'client-vpn',
          label: 'AWS Client VPN',
          definition:
            'A managed VPN service that lets individual users connect securely to AWS and to the on-premises network with an OpenVPN-based client.',
          explanation:
            'Client VPN connects people, not networks: each inspector connects from their laptop, from anywhere, to resources on AWS and in the data center. It scales with the number of connected users.',
          correct: true,
        },
        {
          id: 'site-to-site',
          label: 'One AWS Site-to-Site VPN per inspector',
          definition: 'An IPsec connection that links an on-premises network with VPCs, terminating at a customer gateway device.',
          explanation:
            'Mixing up Site-to-Site and Client VPN is a classic trap. Site-to-Site links entire networks, not laptops moving around the city.',
          correct: false,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition: 'A network transit hub that interconnects VPCs and on-premises networks in a hub-and-spoke model.',
          explanation:
            'Transit Gateway interconnects networks; on its own, it doesn\'t give the inspectors a way to connect from their laptops.',
          correct: false,
        },
        {
          id: 'direct-connect',
          label: 'AWS Direct Connect',
          definition: 'A dedicated physical fiber-optic connection between an internal network and a Direct Connect location.',
          explanation:
            'Direct Connect links a fixed network with AWS through a dedicated cable. It doesn\'t work for people working from the street or from home.',
          correct: false,
        },
      ],
    },
    {
      id: 'direct-connect-encryption',
      prompt:
        'Next year we\'re signing up for AWS Direct Connect, because the property registry moves a lot of data and we want consistent performance. A city council member asks whether that data travels encrypted by default. What do I tell them?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'yes-ipsec',
          label: 'Yes: Direct Connect always encrypts with IPsec, like a VPN',
          definition: 'IPsec is the encrypted tunneling protocol used by AWS Site-to-Site VPN.',
          explanation:
            'IPsec belongs to the VPN. Believing that Direct Connect is encrypted by default is a classic exam trap.',
          correct: false,
        },
        {
          id: 'yes-internet-tls',
          label: 'Yes, because it travels over the internet encrypted with TLS',
          definition: 'TLS is the protocol that encrypts connections such as HTTPS or those of AWS Client VPN.',
          explanation:
            'Direct Connect doesn\'t go through internet service providers along its network path, and it is not encrypted by default.',
          correct: false,
        },
        {
          id: 'not-by-default',
          label: 'Not by default: it can be encrypted with MACsec on certain dedicated connections or with a VPN over Direct Connect',
          definition: 'Options to encrypt the traffic of a dedicated physical connection that is not encrypted by default.',
          explanation:
            'Direct Connect is not encrypted by default. To encrypt it, City Hall can use MACsec on certain dedicated connections or create VPN tunnels over Direct Connect.',
          correct: true,
        },
        {
          id: 'no-need',
          label: 'No, and no AWS service lets you encrypt it',
          definition: 'A claim that the traffic of a dedicated connection to AWS supports no form of encryption.',
          explanation:
            'It\'s true that it isn\'t encrypted by default, but it can be encrypted: with MACsec on certain dedicated connections or with a VPN over Direct Connect.',
          correct: false,
        },
      ],
    },
    {
      id: 'central-hub',
      prompt:
        'Last topic: each department will have its own VPC: property registry, traffic, health and citizen services. They all need to talk to each other and to the data center, and connecting them one by one would turn into a tangle. What do we put in the middle?',
      topicSlug: 'hybrid-connectivity',
      examTasks: ['3.5'],
      options: [
        {
          id: 'privatelink-hub',
          label: 'AWS PrivateLink',
          definition: 'Private access from a VPC to specific services, as if they were inside it, through VPC endpoints.',
          explanation:
            'Mixing up PrivateLink and Transit Gateway is a classic trap. PrivateLink provides private access to specific services; it doesn\'t interconnect entire networks.',
          correct: false,
        },
        {
          id: 'transit-gateway',
          label: 'AWS Transit Gateway',
          definition:
            'A network transit hub that interconnects VPCs and on-premises networks in a hub-and-spoke model.',
          explanation:
            'With Transit Gateway, each VPC and the data center connection attach to the hub just once, instead of linking every network with all the others.',
          correct: true,
        },
        {
          id: 'client-vpn-hub',
          label: 'AWS Client VPN',
          definition: 'A managed VPN that lets individual users access AWS and the on-premises network from anywhere.',
          explanation:
            'Client VPN connects people from their devices. It isn\'t a central point for interconnecting the departments\' VPCs.',
          correct: false,
        },
        {
          id: 'nat-gateway-hub',
          label: 'A NAT gateway',
          definition: 'A network address translation service that lets private subnets reach services outside the VPC.',
          explanation:
            'A NAT gateway gives private subnets outbound internet access; it doesn\'t interconnect multiple VPCs or on-premises networks.',
          correct: false,
        },
      ],
    },
  ],
};
