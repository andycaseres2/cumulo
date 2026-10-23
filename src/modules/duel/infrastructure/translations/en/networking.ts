import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const networkingFamily: ServiceFamily = {
  id: 'networking',
  title: 'Networking and content delivery',
  summary:
    'Know what each one is for: your isolated network (VPC), connecting your office (Direct Connect or VPN), connecting many networks (Transit Gateway), exposing a service privately (PrivateLink) or getting your users to your app (Route 53, CloudFront, Global Accelerator).',
  services: [
    {
      name: 'Amazon VPC',
      summary: 'Your isolated virtual network in AWS: you choose the IP range, the public and private subnets and the route tables.',
    },
    {
      name: 'AWS Direct Connect',
      summary: 'Dedicated, private network connection between your data center and AWS that bypasses the internet. Not encrypted by default.',
    },
    {
      name: 'AWS Site-to-Site VPN',
      summary: 'IPsec-encrypted tunnels between your on-premises network and AWS, over your regular internet connection.',
    },
    {
      name: 'AWS Client VPN',
      summary: 'VPN for people: each person connects from their own device with an OpenVPN client, from anywhere.',
    },
    {
      name: 'AWS Transit Gateway',
      summary: 'Central hub that connects many VPCs and on-premises networks in a hub-and-spoke model.',
    },
    {
      name: 'Amazon Route 53',
      summary: 'Managed DNS: registers domains, translates names into IP addresses and routes traffic with health checks.',
    },
    {
      name: 'Amazon CloudFront',
      summary: 'CDN: caches your content at edge locations close to your users to deliver it with low latency.',
    },
    {
      name: 'AWS Global Accelerator',
      summary: 'Static anycast IP addresses that carry traffic over the AWS global network to the nearest healthy endpoint.',
    },
    {
      name: 'AWS PrivateLink',
      summary: 'Private connectivity to services across VPCs, accounts and on-premises without exposing traffic to the internet.',
    },
  ],
  cards: [
    {
      id: 'networking-1',
      prompt:
        'A startup in Rosario is launching its first app on AWS. It needs its own isolated network, with its own IP range, a public subnet for the web servers and a private one, with no internet access, for the database.',
      options: [
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway connects many networks to each other. First you need the network itself, and with only one you do not need a hub.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC is the isolated virtual network where you choose the IP range and create public and private subnets.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink exposes services privately between networks. It does not create the network or its subnets.',
        },
      ],
      answer: 'Amazon VPC',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-2',
      prompt:
        'A TV channel in Bogotá sends large volumes of video every day from its data center to AWS. It wants a private, dedicated link with consistent bandwidth that does not go over the internet.',
      options: [
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN encrypts traffic, but it travels over the internet: bandwidth and latency can vary.',
        },
        {
          service: 'AWS Client VPN',
          why: 'Client VPN connects people from their devices, not an entire data center over a dedicated link.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect is a dedicated, private connection to AWS that bypasses the internet and gives a more consistent network experience.',
        },
      ],
      answer: 'AWS Direct Connect',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-3',
      prompt:
        'A hardware store in Cochabamba needs to connect its office network to AWS this week. The budget is tight, it already has internet and the traffic must travel encrypted.',
      options: [
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect needs a dedicated physical link to a Direct Connect location and is not encrypted by default.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink connects services privately within AWS. It is not the tunnel between an office and AWS.',
        },
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway is a hub for many networks. With a single office and one network, it does not provide the encrypted tunnel.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN creates IPsec-encrypted tunnels over the internet connection the office already has.',
        },
      ],
      answer: 'AWS Site-to-Site VPN',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-4',
      prompt:
        'An insurer in Lima already has a dedicated, private link to AWS, but the auditors require all that traffic to travel encrypted with IPsec. What do you add on top of the link?',
      options: [
        {
          service: 'AWS Client VPN',
          why: 'Client VPN is for people connecting from their devices with an OpenVPN client, not for encrypting the office link.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Combining Direct Connect with Site-to-Site VPN gives an IPsec-encrypted private connection, which Direct Connect does not do by default.',
        },
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront delivers content from edge locations to internet users. It does not encrypt the connection between the office and AWS.',
        },
      ],
      answer: 'AWS Site-to-Site VPN',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-5',
      prompt:
        'An NGO in Tegucigalpa works remotely: each member uses their laptop from home or while traveling and needs secure access to the internal applications running on AWS.',
      options: [
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN joins two networks, such as an office and AWS. It is not meant for individual people connecting from anywhere.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect is a dedicated link from a data center. It does not reach laptops that move from place to place.',
        },
        {
          service: 'AWS Client VPN',
          why: 'Client VPN is a managed VPN for people: each device connects with an OpenVPN client, from anywhere.',
        },
      ],
      answer: 'AWS Client VPN',
      topicSlug: 'hybrid-connectivity',
    },
    {
      id: 'networking-6',
      prompt:
        'A school network in Quito has twelve isolated networks on AWS and two campuses connected through tunnels. Connecting each pair separately is already unmanageable. It wants a central point that connects everything.',
      options: [
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway is a hub: each network connects only once to the center and from there reaches all the others.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC is each of those networks. The problem is not creating another one, but connecting many without point-to-point pairs.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink exposes one specific service privately. It does not route all traffic between many networks and sites.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect is a dedicated link to AWS. It does not centralize routing among twelve networks.',
        },
      ],
      answer: 'AWS Transit Gateway',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-7',
      prompt:
        'A hospital in Medellín adds a new network on AWS every month. It wants each new network to connect only once to a hub and become reachable from every other network already connected.',
      options: [
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink gives private access to one specific service; it does not connect entire networks in a hub model.',
        },
        {
          service: 'AWS Transit Gateway',
          why: 'With Transit Gateway, a new network attached to the hub becomes reachable from every other attached network.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN connects an on-premises network to AWS over the internet. It is not the hub that joins many AWS networks.',
        },
      ],
      answer: 'AWS Transit Gateway',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-8',
      prompt:
        'A crafts shop in Cusco wants to buy its domain name and have it translated to the IP address of its server on AWS when someone types it in the browser.',
      options: [
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront speeds up content delivery, but it does not register domains and is not the service that translates names into IP addresses.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator gives static IP addresses and improves the traffic path, but it does not register domains or resolve names.',
        },
        {
          service: 'Amazon Route 53',
          why: 'Route 53 is the AWS DNS service: it registers domains and translates names like www.example.com into IP addresses.',
        },
      ],
      answer: 'Amazon Route 53',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-9',
      prompt:
        'A language school in Asunción wants its domain name to start answering with the address of a backup page if its main server goes down, using health checks.',
      options: [
        {
          service: 'Amazon Route 53',
          why: 'Route 53 has health checks and DNS failover: if the primary fails, it answers with the backup.',
        },
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront caches content at edge locations. Changing which address the domain points to is a job for DNS.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC defines your private network in AWS. It does not decide which address a domain name answers with.',
        },
      ],
      answer: 'Amazon Route 53',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-10',
      prompt:
        'A fashion store in Santiago keeps photos and videos of its products in Amazon S3 and sells across Latin America. It wants cached copies close to each customer so everything loads fast.',
      options: [
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator improves the path over the AWS network, but it does not keep cached copies of the content.',
        },
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect links your data center to AWS. It does not bring photos or videos closer to internet customers.',
        },
        {
          service: 'Amazon Route 53',
          why: 'Route 53 resolves domain names. It does not keep copies of the content close to your customers.',
        },
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront is the AWS CDN: it caches your content at edge locations and delivers it with low latency.',
        },
      ],
      answer: 'Amazon CloudFront',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-11',
      prompt:
        'A digital news outlet in Mexico City gets traffic spikes with every story. It wants to serve its pages and images from locations close to its readers and take load off its origin server.',
      options: [
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront serves cached content from edge locations, so fewer requests reach the origin server.',
        },
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway connects internal networks to each other. It does not deliver content to internet readers.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator does not cache: every request still reaches your application, just over a better path.',
        },
      ],
      answer: 'Amazon CloudFront',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-12',
      prompt:
        'A multiplayer game built in São Paulo uses its own UDP traffic, with nothing to cache. It needs two fixed IP addresses as a single entry point and traffic carried over the AWS network to the nearest healthy Region.',
      options: [
        {
          service: 'Amazon CloudFront',
          why: 'CloudFront shines at caching web content. Here there is nothing to cache and the game UDP traffic is not web traffic.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator gives static anycast IP addresses, supports TCP and UDP and carries traffic over the AWS global network to the healthy endpoint.',
        },
        {
          service: 'Amazon Route 53',
          why: 'Route 53 answers with addresses when resolving names, but it does not give fixed anycast IP addresses or carry traffic over the AWS network.',
        },
      ],
      answer: 'AWS Global Accelerator',
      topicSlug: 'dns-and-content-delivery',
    },
    {
      id: 'networking-13',
      prompt:
        'A software vendor in Guadalajara wants to offer its API to the networks of its customers in other AWS accounts, privately, without the traffic going out to the internet and without joining the entire networks.',
      options: [
        {
          service: 'AWS Transit Gateway',
          why: 'Transit Gateway joins entire networks to route between them. Here you only want to expose an API, not join the networks.',
        },
        {
          service: 'Amazon VPC',
          why: 'Amazon VPC is the network where the API lives. On its own it does not publish it privately to networks in other accounts.',
        },
        {
          service: 'AWS PrivateLink',
          why: 'PrivateLink gives private connectivity to a service across VPCs and accounts, without exposing traffic to the internet.',
        },
        {
          service: 'AWS Client VPN',
          why: 'Client VPN connects people from their devices. It does not publish a service to networks in other accounts.',
        },
      ],
      answer: 'AWS PrivateLink',
      topicSlug: 'vpc-networking',
    },
    {
      id: 'networking-14',
      prompt:
        'A mining company in Antofagasta moves data all day between its data center and AWS. It wants a more consistent network than its internet connection and, in many cases, to pay less for data transfer.',
      options: [
        {
          service: 'AWS Direct Connect',
          why: 'Direct Connect is a dedicated link that gives a more consistent network experience than the internet and, in many cases, lowers network costs.',
        },
        {
          service: 'AWS Global Accelerator',
          why: 'Global Accelerator improves the path from internet users to your app. It does not link your data center to AWS.',
        },
        {
          service: 'AWS Site-to-Site VPN',
          why: 'Site-to-Site VPN travels over the internet, so the network experience still depends on the internet.',
        },
      ],
      answer: 'AWS Direct Connect',
      topicSlug: 'hybrid-connectivity',
    },
  ],
};
