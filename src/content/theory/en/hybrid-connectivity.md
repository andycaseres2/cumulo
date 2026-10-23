---
title: "Connectivity: VPN, Direct Connect, Transit Gateway, and PrivateLink"
summary: "Choose between AWS Site-to-Site VPN, AWS Client VPN, and AWS Direct Connect to connect to AWS, and understand Transit Gateway as a hub and PrivateLink for private access."
domain: "technology-services"
order: 10
examTasks: ["3.5"]
services: ["AWS Site-to-Site VPN", "AWS Client VPN", "AWS Direct Connect", "AWS Transit Gateway", "AWS PrivateLink", "Amazon VPC"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"
  - "https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html"
  - "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect.html"
  - "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html"
  - "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html"
quiz:
  - prompt: "A supermarket group in Lima needs to connect its data center to its VPCs today, with encrypted traffic over the internet, while it evaluates other options for the medium term. Which service should it use?"
    options:
      - label: "AWS Direct Connect"
        explanation: "Direct Connect requires physical work at a Direct Connect location or with a partner, so it takes longer to set up and cannot connect you today."
      - label: "AWS Site-to-Site VPN"
        explanation: "Site-to-Site VPN joins the on-premises network with the VPCs through encrypted IPsec tunnels over the internet and is quick to configure."
        correct: true
      - label: "AWS Client VPN"
        explanation: "Client VPN connects individual users from their devices; it does not join a data center's entire network with the VPCs."
      - label: "AWS PrivateLink"
        explanation: "PrivateLink provides private access from your VPC to specific services through VPC endpoints; it does not connect your data center to AWS."
  - prompt: "An insurance company in Santiago wants to move large volumes of data between its data center and AWS with consistent performance and without going through internet service providers. It can wait for the physical installation. Which service should it choose?"
    options:
      - label: "AWS Site-to-Site VPN"
        explanation: "Site-to-Site VPN travels over the public internet, so its performance depends on the internet and it does not meet the requirement of avoiding internet service providers."
      - label: "AWS Client VPN"
        explanation: "Client VPN is designed for individual users to connect from anywhere over the internet, not for transferring large volumes between networks."
      - label: "AWS PrivateLink"
        explanation: "PrivateLink connects your VPC to services as if they were inside it; it is not a link between your data center and AWS."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect links your internal network to AWS through a dedicated physical connection, bypassing internet service providers, with more bandwidth and a more consistent network experience."
        correct: true
  - prompt: "A retail company in Guadalajara has dozens of VPCs and several on-premises networks, and connecting them one by one has become unmanageable. It wants each network to connect only once to a central point. Which service does this?"
    options:
      - label: "AWS Transit Gateway"
        explanation: "Transit Gateway is a network transit hub that interconnects VPCs and on-premises networks in a hub-and-spoke model, where each network connects only once."
        correct: true
      - label: "AWS PrivateLink"
        explanation: "PrivateLink provides private access to specific services through VPC endpoints; it does not interconnect entire networks like a central hub."
      - label: "AWS Client VPN"
        explanation: "Client VPN gives access to individual remote users; it does not work as a central point for interconnecting many VPCs and networks."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect offers a dedicated physical connection between your network and AWS, but on its own it is not a hub that interconnects many VPCs with each other."
practice:
  - prompt: "An accounting firm in Córdoba has hundreds of employees who work from home and need secure access, from their laptops, to internal systems in AWS and on the on-premises network. Which service fits?"
    options:
      - label: "AWS Site-to-Site VPN"
        explanation: "Site-to-Site VPN joins entire networks, such as a data center or office, with the VPCs; it does not connect individual laptops from anywhere."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect is a dedicated physical connection between an internal network and AWS; it is not meant for each employee to connect from home."
      - label: "AWS Client VPN"
        explanation: "Client VPN is a managed, client-based VPN that lets individual users securely access AWS and the on-premises network from anywhere."
        correct: true
      - label: "AWS Transit Gateway"
        explanation: "Transit Gateway is a hub for interconnecting VPCs and networks; it is not the service people use to connect from their devices."
  - prompt: "An insurance company in Panama has applications in private subnets of its VPC that must consume a product from an AWS Marketplace partner, without using an internet gateway, NAT, or public IPs. Which service should it use?"
    options:
      - label: "AWS PrivateLink"
        explanation: "PrivateLink privately connects your VPC to services from AWS, other accounts, or AWS Marketplace partners through VPC endpoints, without an internet gateway, NAT, or public IP."
        correct: true
      - label: "AWS Transit Gateway"
        explanation: "Transit Gateway interconnects VPCs and on-premises networks as a hub; it does not provide private access to a partner's specific service."
      - label: "AWS Direct Connect"
        explanation: "Direct Connect links an internal network to AWS through a physical connection; it does not solve private access from the VPC to a partner's service."
      - label: "AWS Client VPN"
        explanation: "Client VPN connects individual users from their devices; it does not connect applications in private subnets to a service."
  - prompt: "A bank in Bogotá already uses AWS Direct Connect, and its compliance department requires traffic between its data center and AWS to be encrypted. What should it do?"
    options:
      - label: "Nothing, because Direct Connect encrypts traffic by default"
        explanation: "Direct Connect is not encrypted by default; assuming it is, is a classic exam trap."
      - label: "Create VPN tunnels over the Direct Connect connection"
        explanation: "To encrypt Direct Connect traffic you can create VPN tunnels over the connection, or use MACsec on certain dedicated connections."
        correct: true
      - label: "Replace Direct Connect with AWS Transit Gateway"
        explanation: "Transit Gateway is a hub that interconnects networks; it is not a way to encrypt Direct Connect traffic."
      - label: "Add an AWS PrivateLink VPC endpoint"
        explanation: "PrivateLink provides private access to specific services from the VPC; it does not encrypt the link between the data center and AWS."
  - prompt: "A mining company in Arequipa sets up AWS Site-to-Site VPN between its office and a VPC. What is the component called where the connection terminates on the office side?"
    options:
      - label: "Virtual private gateway"
        explanation: "The virtual private gateway is the endpoint on the AWS side, associated with a VPC; it is not in the company's office."
      - label: "Interface VPC endpoint"
        explanation: "An interface VPC endpoint is how you use AWS PrivateLink to access services; it is not part of a Site-to-Site VPN connection."
      - label: "Direct Connect location"
        explanation: "A Direct Connect location is where the internal network physically connects to use Direct Connect; it plays no part in Site-to-Site VPN."
      - label: "Customer gateway device"
        explanation: "On the on-premises side, the Site-to-Site VPN connection terminates on a customer gateway device, which can be a physical device or a software application."
        correct: true
  - prompt: "A hotel chain in Cancún uses AWS Transit Gateway in two different Regions and wants to connect both transit gateways using the AWS global infrastructure. Which feature should it use?"
    options:
      - label: "Transit Gateway inter-Region peering"
        explanation: "With inter-Region peering you connect transit gateways in different Regions using the AWS global infrastructure."
        correct: true
      - label: "AWS PrivateLink"
        explanation: "PrivateLink provides private access to specific services through VPC endpoints; it does not connect transit gateways to each other."
      - label: "AWS Client VPN"
        explanation: "Client VPN connects individual users from their devices; it does not join transit gateways in different Regions."
      - label: "A Direct Connect public virtual interface"
        explanation: "A Direct Connect public virtual interface gives access to public AWS services such as Amazon S3; it does not connect transit gateways across Regions."
  - prompt: "An agricultural cooperative in Uruguay wants AWS Direct Connect, but it does not need its own physical port and prefers to have the connection provided by an AWS Direct Connect Partner. Which type of connection should it request?"
    options:
      - label: "A dedicated connection"
        explanation: "A dedicated connection is a physical port for a single customer; the cooperative specifically does not want its own port."
      - label: "An AWS Client VPN connection"
        explanation: "Client VPN is for individual users who connect over the internet; it is not a type of Direct Connect connection."
      - label: "A hosted connection"
        explanation: "Direct Connect hosted connections are provided by an AWS Direct Connect Partner, without the customer having its own physical port."
        correct: true
      - label: "An interface VPC endpoint"
        explanation: "An interface VPC endpoint is used with PrivateLink to access services from the VPC; it is not a way to get Direct Connect."
---

## Why does it matter?

A supermarket group in Lima has its main data center, forty stores, and hundreds of employees who work from home. It already uses several VPCs in AWS and wants three things: to quickly connect the data center to AWS while it evaluates options, to give remote employees secure access to internal systems, and, in the medium term, to move large volumes of data with consistent performance and without depending on the internet.

Each need has a different service. The exam will ask you to choose the right **connectivity option**.

## AWS VPN: encrypted connections over the internet

A **VPN** (*Virtual Private Network*) creates an **encrypted tunnel** over a public network such as the internet. AWS offers two variants:

- **AWS Site-to-Site VPN:** connects **your on-premises network** (data center or office) with your VPCs using **IPsec** connections. Each connection includes **two tunnels** that can be used at the same time for high availability. On the AWS side it terminates on a **virtual private gateway** (associated with a VPC) or a **transit gateway**; on your side, on a **customer gateway device** (a physical device or a software application).
- **AWS Client VPN:** a **managed, client-based** VPN service that lets **individual users** securely access resources in AWS and on the on-premises network **from anywhere**, using an OpenVPN-based VPN client. It scales with the number of connected users.

Quick rule: **Site-to-Site** joins **networks**; **Client VPN** connects **people** (individual devices).

## AWS Direct Connect: a dedicated private connection

**AWS Direct Connect** links your internal network to a **Direct Connect location** over a standard Ethernet fiber-optic cable, **bypassing internet service providers** in the network path.

- It can **reduce network costs**, **increase bandwidth**, and provide a **more consistent network experience** than internet-based connections.
- There are **dedicated connections** (a physical port for a single customer) and **hosted connections** (provided by an AWS Direct Connect Partner).
- With **virtual interfaces** you access your VPCs (private), public AWS services such as Amazon S3 (public), or transit gateways (transit).
- **It is not encrypted by default.** To encrypt, you can use MACsec on certain dedicated connections or create VPN tunnels over Direct Connect.
- Setting it up is not instantaneous: it requires physical work at a Direct Connect location or with a partner.

| | **AWS Site-to-Site VPN** | **AWS Client VPN** | **AWS Direct Connect** |
| --- | --- | --- | --- |
| Connects | On-premises network ↔ VPC | Individual users ↔ AWS and on-premises | On-premises network ↔ AWS |
| Medium | Public internet | Public internet | Dedicated physical connection, no internet |
| Encryption | Yes (IPsec) | Yes (TLS) | Not by default; MACsec or VPN on top |
| Performance | Depends on the internet | Depends on the internet | More consistent, higher bandwidth |
| Setup | Fast | Fast | Slower (requires physical installation) |
| Typical scenario | Quick connection or backup for Direct Connect | Remote work | Large data volumes, consistent latency, stable hybrid setup |

## AWS Transit Gateway: a central hub

When you have many VPCs and several on-premises networks, connecting all of them to each other one by one becomes unmanageable. **AWS Transit Gateway** is a **network transit hub** that **interconnects VPCs and on-premises networks** in a **hub-and-spoke** model: each network connects only once to the hub.

- You can attach VPCs, VPN connections, Direct Connect gateways, Client VPN endpoints, and other transit gateways.
- With **inter-Region peering**, you connect transit gateways in different Regions using the AWS global infrastructure.

## AWS PrivateLink: private access to services

**AWS PrivateLink** **privately** connects your VPC to services and resources **as if they were inside your VPC**. You don't need an internet gateway, NAT, public IP, Direct Connect, or VPN for your private subnets to communicate with the service.

- It is used through interface **VPC endpoints**.
- It lets you access **AWS services**, services in **other AWS accounts**, and products from **AWS Marketplace partners**.
- You can create your own endpoint service and offer it to other AWS customers.

## Common exam traps

- **Choosing Direct Connect for something urgent.** Direct Connect requires physical installation; to connect **quickly**, the answer is **Site-to-Site VPN**.
- **Believing Direct Connect is encrypted by default.** It is not; it is encrypted with MACsec or a VPN on top.
- **Confusing Site-to-Site VPN with Client VPN.** Entire networks → Site-to-Site; remote users → Client VPN.
- **Choosing VPN when consistent performance without the internet is required.** "Dedicated", "private", or "bypassing the internet" point to **Direct Connect**.
- **Confusing Transit Gateway with PrivateLink.** Transit Gateway **interconnects networks**; PrivateLink provides **private access to specific services**.

## Exam summary

- Site-to-Site VPN = on-premises network ↔ VPC over the internet, encrypted with IPsec, two tunnels.
- Client VPN = remote users with an OpenVPN client, from anywhere.
- Direct Connect = dedicated physical connection, no internet, consistent performance.
- Direct Connect is not encrypted by default.
- VPN = quick to set up over the internet; Direct Connect = more stable, takes longer to install.
- Transit Gateway = central hub for interconnecting many VPCs and on-premises networks.
- PrivateLink = private access to services through VPC endpoints, without exposing traffic to the internet.
