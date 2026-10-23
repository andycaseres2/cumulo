---
title: "Networking in AWS: Amazon VPC"
summary: "Components of an Amazon VPC (subnets, gateways, route tables) and its security: security groups vs network ACLs, plus Amazon Inspector."
domain: "technology-services"
order: 9
examTasks: ["3.5"]
services: ["Amazon VPC", "Amazon Inspector", "Amazon EC2"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html"
  - "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"
quiz:
  - prompt: "A clinic in Asunción detects malicious traffic from a specific range of IP addresses and wants to deny it for an entire subnet of its VPC. What should it use?"
    options:
      - label: "A security group"
        explanation: "A security group has only allow rules and works at the instance level; it cannot deny a specific IP range."
      - label: "A network ACL"
        explanation: "A network ACL controls traffic for an entire subnet and supports both allow and deny rules, ideal for blocking an IP range."
        correct: true
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector scans for vulnerabilities and network exposure; it detects weaknesses but does not block traffic."
      - label: "A NAT gateway"
        explanation: "A NAT gateway gives private subnets outbound access to the internet; it cannot deny traffic from specific IP addresses."
  - prompt: "The database of a patient portal is in a private subnet and needs to download patches from the internet, without anyone outside being able to initiate a connection to it. Which component should it use?"
    options:
      - label: "A direct route to an internet gateway"
        explanation: "A direct route to an internet gateway would make the subnet public, and databases should stay in private subnets."
      - label: "VPC peering"
        explanation: "VPC peering connects two VPCs to route traffic between them; it does not provide outbound internet access for downloading patches."
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs capture information about IP traffic on network interfaces; they do not provide internet access."
      - label: "A NAT gateway"
        explanation: "A NAT gateway lets instances in a private subnet connect outside the VPC, for example for patches, without accepting connections initiated from outside."
        correct: true
  - prompt: "The compliance department of a bank in La Paz wants to continuously scan its EC2 instances and Lambda functions for software vulnerabilities and unintended network exposure. Which service should it use?"
    options:
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector discovers workloads and continuously scans them for software vulnerabilities and network exposure, generating findings with recommendations."
        correct: true
      - label: "A security group"
        explanation: "A security group is a virtual firewall that controls instance traffic; it does not scan for software vulnerabilities."
      - label: "A network ACL"
        explanation: "A network ACL allows or denies traffic at the subnet level; it controls traffic but does not detect vulnerabilities."
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs capture IP traffic on network interfaces; they do not analyze software vulnerabilities on EC2 or Lambda."
practice:
  - prompt: "An online store in Lima wants its web servers to remain available even if an Availability Zone fails. How should it design its VPC subnets?"
    options:
      - label: "A single subnet that spans several Availability Zones"
        explanation: "Each subnet lives in a single Availability Zone; a subnet cannot span multiple AZs."
      - label: "Subnets in several Availability Zones"
        explanation: "Because each subnet lives in a single AZ, for high availability you create subnets in several AZs and spread the servers across them."
        correct: true
      - label: "A different default VPC in each Availability Zone"
        explanation: "There is one default VPC per Region, not per AZ; high availability is achieved with subnets in several AZs."
      - label: "A VPC peering connection between two subnets"
        explanation: "VPC peering connects two VPCs to route traffic between them; it does not spread servers across Availability Zones."
  - prompt: "A fintech in Bogotá wants its instances in private subnets to access AWS services privately, without going through an internet gateway or a NAT gateway. Which component should it use?"
    options:
      - label: "An internet gateway"
        explanation: "An internet gateway connects the VPC to the internet, exactly what the fintech wants to avoid."
      - label: "VPC peering"
        explanation: "VPC peering connects two VPCs to each other; it does not privately connect the VPC to AWS services."
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs capture information about IP traffic; they do not create any connection to AWS services."
      - label: "A VPC endpoint"
        explanation: "A VPC endpoint privately connects the VPC to AWS services, without an internet gateway or NAT."
        correct: true
  - prompt: "The network team at a distributor in Guatemala wants to capture information about the IP traffic going to and from the network interfaces in its VPC to analyze a connectivity problem. What should it turn on?"
    options:
      - label: "VPC Flow Logs"
        explanation: "VPC Flow Logs capture information about the IP traffic going to and from the network interfaces in the VPC."
        correct: true
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector scans for software vulnerabilities and network exposure; it does not record IP traffic on interfaces."
      - label: "A route table"
        explanation: "A route table defines where a subnet's traffic is directed; it does not keep records of the traffic."
      - label: "A network ACL"
        explanation: "A network ACL allows or denies traffic at the subnet level; it controls traffic, but it does not record it."
  - prompt: "An insurance company in Caracas has an internal system that must be accessible only from its corporate network through a Site-to-Site VPN connection, and it does not need the internet. What route should its subnet's route table have?"
    options:
      - label: "A direct route to an internet gateway"
        explanation: "A direct route to an internet gateway makes the subnet public, the opposite of what is required."
      - label: "A route to a VPC endpoint"
        explanation: "A VPC endpoint privately connects the VPC to AWS services; it does not connect to the corporate network."
      - label: "A route to the Site-to-Site VPN connection, with no internet gateway"
        explanation: "A VPN-only subnet has a route to a Site-to-Site VPN connection and no internet gateway, for systems accessible only from the corporate network."
        correct: true
      - label: "A route to a VPC peering connection"
        explanation: "VPC peering routes traffic between two VPCs; it does not connect the subnet to the corporate network."
  - prompt: "At a transportation company in Arequipa, a subnet's network ACL has rule 100, which allows HTTPS from any IP, and rule 200, which denies HTTPS from a suspicious IP. What happens to an HTTPS request from that IP?"
    options:
      - label: "It is denied, because deny rules always take priority"
        explanation: "In a network ACL, what wins is not the rule type but the order: rules are evaluated in numerical order until the first match."
      - label: "It is denied, because all rules are evaluated before deciding"
        explanation: "Evaluating all rules before deciding is the behavior of security groups, not network ACLs."
      - label: "It is denied, because network ACLs are stateful"
        explanation: "Network ACLs are stateless; besides, state does not decide which rule is applied first."
      - label: "It is allowed, because rule 100 matches first"
        explanation: "The network ACL evaluates rules in numerical order until it finds a match; rule 100 matches before rule 200."
        correct: true
  - prompt: "An IT team in Tegucigalpa creates a VPC and does not modify its default network ACL. What traffic does that network ACL allow?"
    options:
      - label: "All inbound and outbound traffic"
        explanation: "A VPC's default network ACL allows all inbound and outbound traffic."
        correct: true
      - label: "No traffic until rules are added"
        explanation: "The default network ACL does not block everything; it allows all inbound and outbound traffic."
      - label: "Only outbound traffic"
        explanation: "The default network ACL allows both inbound and outbound traffic, not just outbound."
      - label: "Only response traffic for allowed requests"
        explanation: "Automatically allowing the response is a feature of security groups (stateful); the default network ACL allows everything."
---

## Why does it matter?

A clinic in Asunción is migrating its patient portal to AWS. The website must be accessible from the internet, but the database with medical records must **never** be exposed. In addition, the database servers need to download security patches, and the compliance department wants to know whether any server has known vulnerabilities or unnecessarily open ports.

All of this is designed with **Amazon VPC** and its security controls, a topic that shows up in many exam questions.

## What is Amazon VPC?

**Amazon Virtual Private Cloud (Amazon VPC)** lets you launch AWS resources in a **logically isolated virtual network** that you define. It closely resembles a traditional network in a data center, but with the scalable infrastructure of AWS. Your account includes a **default VPC** in each Region so you can get started quickly, and you can create others. Creating a VPC is free; some components, such as NAT gateways, do have a charge.

## Components of a VPC

- **Subnet**: a range of IP addresses within the VPC. **Each subnet lives in a single Availability Zone**; that is why, for high availability, you create subnets in several AZs.
- **Route table**: defines where traffic leaving a subnet is directed. Each subnet is associated with a route table.
- **Internet gateway:** connects the VPC to the internet.
- **NAT gateway:** a network address translation (NAT) service that lets instances in a **private** subnet connect to services outside the VPC (for example, to download patches), **without anyone outside being able to initiate a connection** to them. A public NAT gateway is created in a public subnet.
- **VPC endpoint:** privately connects the VPC to AWS services, without an internet gateway or NAT.
- **VPC peering:** connects two VPCs to route traffic between them.
- **VPC Flow Logs:** capture information about the IP traffic going to and from the network interfaces in the VPC.

### Public and private subnets

The type of subnet depends on its **route**:

| Subnet type | Route | Typical use |
| --- | --- | --- |
| **Public** | Has a direct route to an **internet gateway** | Web servers, public load balancers |
| **Private** | Has **no** direct route to an internet gateway; uses **NAT** to reach the internet | Databases, application servers |
| **VPN-only** | Has a route to a Site-to-Site VPN connection, with no internet gateway | Systems accessible only from the corporate network |

In the clinic example: the load balancer and web servers go in public subnets; the database goes in private subnets and reaches the internet for patches through a NAT gateway.

## Security in a VPC

### Security groups vs network ACLs

- **Security group:** a **virtual firewall** that controls traffic going in and out of **resources** such as EC2 instances. AWS recommends it as the **primary mechanism** for network access control.
- **Network ACL** (network access control list): controls traffic going in and out of an entire **subnet**. It is useful as an **additional layer of defense**, for example to **deny** a specific range of IP addresses.

| Feature | Security group | Network ACL |
| --- | --- | --- |
| Level | **Instance** (resource) | **Subnet** |
| Scope | Instances associated with the security group | All instances in the associated subnets |
| Rule types | **Allow only** | **Allow and deny** |
| Evaluation | Evaluates all rules before deciding | Evaluates rules in **numerical order** until it finds a match |
| Return traffic | Allowed automatically (**stateful**) | Must be explicitly allowed (**stateless**) |

**Stateful** means that if you allow an inbound request, the response goes out automatically. **Stateless** means the response is evaluated separately and needs its own rule. A VPC's default network ACL allows all inbound and outbound traffic.

### Amazon Inspector

**Amazon Inspector** is a **vulnerability management** service that automatically discovers workloads and **continuously scans** them for **software vulnerabilities** and **unintended network exposure** (for example, open network paths). It analyzes **Amazon EC2 instances, container images in Amazon ECR, and AWS Lambda functions**. When it detects a problem, it generates a **finding** with details and remediation recommendations.

Inspector complements security groups and network ACLs: they **control** traffic; Inspector **detects** weaknesses.

## Common exam traps

- **Thinking a security group can deny traffic.** It has only **allow** rules; to deny a specific IP, use a **network ACL**.
- **Confusing stateful with stateless.** Security group = stateful; network ACL = stateless.
- **Believing a subnet can span several AZs.** Each subnet lives in **a single** AZ.
- **Putting the database in a public subnet.** Databases go in **private** subnets.
- **Using a NAT gateway to receive traffic from the internet.** NAT only allows connections **initiated from inside** the VPC.
- **Confusing Amazon Inspector with a firewall.** Inspector **scans for vulnerabilities**; it does not block traffic.

## Exam summary

- VPC = logically isolated virtual network in AWS.
- Subnet = IP range within a single AZ.
- Public = route to an internet gateway; private = no direct route, goes out through NAT.
- Route tables = where each subnet's traffic goes.
- NAT gateway = outbound internet access for private subnets, with no unsolicited inbound connections.
- Security group = instance, *allow* only, stateful.
- Network ACL = subnet, *allow* and *deny*, stateless, rules in order.
- Amazon Inspector = continuous scanning for vulnerabilities and network exposure on EC2, ECR, and Lambda.
