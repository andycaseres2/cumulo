---
title: "Network and application protection: WAF, Shield, and Firewall Manager"
summary: "Protect web applications at layer 7 with AWS WAF, mitigate DDoS attacks with AWS Shield Standard and Advanced, and centralize rules with AWS Firewall Manager."
domain: "security-compliance"
order: 8
examTasks: ["2.2", "2.4"]
services: ["AWS WAF", "AWS Shield", "AWS Firewall Manager", "Amazon CloudFront", "Amazon Route 53", "Amazon VPC", "AWS Organizations"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-standard-summary.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-protected-resources.html"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html"
quiz:
  - prompt: "An electronics store in Buenos Aires detects a bot trying to inject SQL code into the search box of its site, which is served with Amazon CloudFront. Which service should it use to filter those requests?"
    options:
      - label: "A security group"
        explanation: "Security groups work with IPs and ports at layers 3 and 4; they do not inspect the HTTP content where the SQL injection travels."
      - label: "AWS WAF"
        explanation: "AWS WAF filters HTTP(S) requests at layer 7 and has rules to detect SQL injection; it is associated with resources such as CloudFront."
        correct: true
      - label: "AWS Shield Standard"
        explanation: "Shield Standard protects against the most common layer 3 and 4 DDoS attacks; it does not filter the content of web requests."
      - label: "A network ACL"
        explanation: "Network ACLs filter by IP and port at the subnet level; they do not detect SQL injection inside an HTTP request."
  - prompt: "A digital bank in Montevideo wants enhanced DDoS protection for its load balancers, with access to a specialized response team and cost protection against spikes caused by an attack. What should it subscribe to?"
    options:
      - label: "AWS Shield Standard"
        explanation: "Shield Standard is automatic and at no additional charge, but it does not include the Shield Response Team or cost protection."
      - label: "AWS Firewall Manager"
        explanation: "Firewall Manager centralizes policies across multiple accounts; on its own it does not provide the response team or cost protection."
      - label: "A network ACL"
        explanation: "A network ACL allows or denies traffic by IP and port in a subnet; it does not include a response team or cost protection."
      - label: "AWS Shield Advanced"
        explanation: "Shield Advanced is the paid subscription with enhanced protection, access to the Shield Response Team (SRT), and cost protection against spikes caused by an attack."
        correct: true
  - prompt: "A retail company in Guadalajara has 15 accounts in AWS Organizations and wants to define its AWS WAF rules once and apply them in every account, including new ones. Which service should it use?"
    options:
      - label: "AWS Firewall Manager"
        explanation: "Firewall Manager defines protection policies once and automatically applies them to every account and resource in the organization, including new ones."
        correct: true
      - label: "AWS Shield Standard"
        explanation: "Shield Standard automatically protects against layer 3 and 4 DDoS; it does not manage WAF rules across accounts."
      - label: "A security group"
        explanation: "A security group controls traffic at the instance level by IP and port; it does not apply WAF rules across the organization."
      - label: "An AWS WAF web ACL in a single account"
        explanation: "A web ACL is associated with specific resources; choosing plain WAF when the question asks for rules in every account is a classic exam trap."
practice:
  - prompt: "A startup in La Paz has just created its AWS account and asks what it must do to have AWS Shield Standard on its website. What do you tell it?"
    options:
      - label: "Subscribe to the paid plan and choose the resources to protect"
        explanation: "A paid subscription where you choose resources describes Shield Advanced, not Shield Standard."
      - label: "Set it up from AWS Firewall Manager"
        explanation: "Firewall Manager centralizes policies in an AWS Organizations organization; it is not the step to get Shield Standard."
      - label: "Nothing: Shield Standard is automatic and at no additional charge"
        explanation: "Shield Standard is automatically active for all customers and has no additional charge."
        correct: true
      - label: "Sign up for a Business-level AWS Support plan"
        explanation: "A paid AWS Support plan is required to work with the Shield Advanced Shield Response Team, not to have Shield Standard."
  - prompt: "A booking API for a hotel in Cartagena, exposed with Amazon API Gateway, receives bursts of thousands of HTTP requests from a few IPs. You want to automatically block any IP that exceeds a certain number of requests. What do you use?"
    options:
      - label: "A security group"
        explanation: "Security groups only support allow rules by IP and port; they do not count requests or block IPs that exceed a threshold."
      - label: "An AWS WAF rate-based rule"
        explanation: "AWS WAF rate-based rules block or count IPs that exceed a certain number of requests, and WAF is associated with API Gateway."
        correct: true
      - label: "AWS Shield Standard"
        explanation: "Shield Standard protects against the most common layer 3 and 4 DDoS attacks; it does not apply HTTP request limits per IP."
      - label: "A network ACL"
        explanation: "A network ACL filters by IP and port in a subnet in numerical order; it does not count HTTP requests to block IPs automatically."
  - prompt: "A handicrafts store in Cusco only sells within Peru and wants its site, served with Amazon CloudFront, to block web requests coming from other countries. What should it use?"
    options:
      - label: "AWS Shield Standard"
        explanation: "Shield Standard protects against the most common layer 3 and 4 DDoS attacks; it does not filter requests by country of origin."
      - label: "A security group"
        explanation: "Security groups control instance traffic by IP and port with allow rules; they do not filter by country of origin."
      - label: "A network ACL"
        explanation: "Network ACLs filter by IP and port at the subnet level; they have no country-of-origin conditions."
      - label: "An AWS WAF country-of-origin rule"
        explanation: "AWS WAF rules can filter by country of origin, and WAF is associated with Amazon CloudFront."
        correct: true
  - prompt: "An online store in Rosario wants to protect an application running on EC2 instances with AWS WAF. Which of these resources can AWS WAF be associated with?"
    options:
      - label: "The Application Load Balancer in front of the instances"
        explanation: "AWS WAF is associated with resources such as Application Load Balancer, CloudFront, or API Gateway, which receive the HTTP(S) requests."
        correct: true
      - label: "Directly with each EC2 instance"
        explanation: "AWS WAF is not installed directly on an EC2 instance; it is associated with resources such as an ALB or CloudFront."
      - label: "The subnet where the instances live"
        explanation: "Filtering at the subnet level is done by network ACLs; WAF is associated with resources such as ALB, CloudFront, or API Gateway."
      - label: "The instances' Amazon EBS volume"
        explanation: "An EBS volume is block storage; it does not receive HTTP(S) requests, so it is not a resource WAF is associated with."
  - prompt: "The security team at a fintech in São Paulo created a new AWS WAF rule and wants to see how many requests would match it before starting to block them. Which action should it configure on the rule?"
    options:
      - label: "Block"
        explanation: "Block rejects matching requests with HTTP 403 or a custom response; it would affect users before the rule is validated."
      - label: "CAPTCHA"
        explanation: "CAPTCHA presents a challenge to the requester; it is not the action meant for testing a rule without affecting traffic."
      - label: "Count"
        explanation: "The Count action counts matching requests without blocking them, which is why it is used to test a rule."
        correct: true
      - label: "Allow"
        explanation: "Allow lets matching requests through; it is for allowing traffic, not for measuring the effect of a new rule."
  - prompt: "At a logistics company in Medellín, a security group allows inbound HTTPS to a web server. An intern asks whether he should create an additional rule so the responses to those requests can go out. What do you tell him?"
    options:
      - label: "Yes, because security groups are stateless"
        explanation: "Stateless describes network ACLs; security groups are stateful."
      - label: "No, because security groups are stateful and the response is allowed automatically"
        explanation: "Security groups are stateful: if they allow the inbound request, the response is automatically allowed."
        correct: true
      - label: "Yes, he must add a deny rule for all other traffic"
        explanation: "Security groups only support allow rules; deny rules belong to network ACLs."
      - label: "No, because AWS Shield Standard allows the responses"
        explanation: "Shield Standard protects against layer 3 and 4 DDoS; it does not decide which response traffic a security group allows."
---

## Why does it matter?

An electronics store in Buenos Aires is preparing its discount campaign. The week before, it had two problems: a bot tried to **inject SQL code** into the site's search box, and a **DDoS attack** flooded the website with fake traffic until it slowed down. On top of that, the company has 15 AWS accounts and each team configures its firewall rules its own way.

AWS offers three complementary services for these problems: **AWS WAF**, **AWS Shield**, and **AWS Firewall Manager**.

## Network layers in a nutshell

Networks are described in **layers** (the OSI model). For the exam, two ideas are enough:

- **Layers 3 and 4 (network and transport)**: IP addresses, ports, and protocols such as TCP and UDP. This is where attacks that try to **saturate the network** happen.
- **Layer 7 (application)**: the content of **HTTP(S)** web requests, such as URLs, headers, or forms. This is where SQL injection, *cross-site scripting*, and web request floods happen.

## AWS WAF: web application firewall (layer 7)

**AWS WAF** (*web application firewall*) monitors and filters the **HTTP(S) requests** that reach your applications. It is associated with resources such as **Amazon CloudFront**, **Application Load Balancer**, **Amazon API Gateway**, **AWS AppSync**, **Amazon Cognito**, **AWS App Runner**, **AWS Amplify**, and **AWS Verified Access**. It is not installed directly on an EC2 instance.

Key concepts:

- **Web ACL** (*web access control list*), which the current console calls a **protection pack (web ACL)**: the set of rules you associate with your resources, with a **default action** for anything that does not match any rule.
- **Rules**: conditions and an action. They can filter by **IP address**, **country of origin**, string or regular expression matching, size of request parts, and detection of **SQL injection** or **malicious scripting**. **Rate-based rules** block or count IPs that exceed a certain number of requests.
- **Actions**: *Allow*, *Block* (responds with HTTP 403 or a custom response), *Count* (for testing), and challenges such as **CAPTCHA**.
- **Rule groups**: reusable rules, your own, **AWS managed**, or bought from sellers in **AWS Marketplace**.

## AWS Shield: DDoS protection

A **DDoS** (*Distributed Denial of Service*) attack uses many compromised systems to flood a target with traffic and take it out of service.

| | AWS Shield Standard | AWS Shield Advanced |
| --- | --- | --- |
| Activation | **Automatic** for all customers | Paid subscription; you choose which resources to protect |
| Cost | **No additional charge** | Subscription fee (see the pricing page) |
| Protection | Most common **layer 3 and 4** attacks | Enhanced protection at layers 3, 4, and **7**, with automatic layer 7 mitigation alongside AWS WAF |
| Notable resources | Special benefit on Amazon Route 53, Amazon CloudFront, and AWS Global Accelerator | CloudFront, Route 53, Global Accelerator, EC2 Elastic IPs, and load balancers |
| Extras | — | Access to the **Shield Response Team (SRT)**, detailed metrics and reports, **cost protection** against spikes caused by an attack, and standard AWS WAF usage included for protected resources |

To work with the SRT, in addition to Shield Advanced you need a paid AWS Support plan at the Business level or higher; check the Shield documentation for the current plans.

## AWS Firewall Manager: centralized rules

**AWS Firewall Manager** lets you **define protection policies once** and automatically apply them to **every account and resource** in your **AWS Organizations** organization, **including new accounts and resources**. It manages:

- **AWS WAF** rules.
- **AWS Shield Advanced** protections.
- Amazon VPC **security groups** and **network ACLs**.
- **AWS Network Firewall** and **Amazon Route 53 Resolver DNS Firewall**.

It requires AWS Organizations. Its charges come largely from the underlying services, such as AWS WAF and AWS Config.

## Contrast: security groups and network ACLs

WAF and Shield do not replace the VPC network controls:

| | Security group | Network ACL |
| --- | --- | --- |
| Level | Instance (network interface) | Subnet |
| Rules | **Allow** only | **Allow and deny** |
| State | **Stateful**: the response is allowed automatically | **Stateless**: the response must be explicitly allowed |
| Evaluation | All rules before deciding | In numerical order until the first match |
| Layer | 3 and 4 (IP and ports) | 3 and 4 (IP and ports) |

Rule of thumb: **ports and IPs → security groups and network ACLs**; **web content (SQL, XSS, bots) → WAF**; **DDoS → Shield**; **many accounts → Firewall Manager**.

## Common exam traps

- **Using a security group to block SQL injection.** Security groups do not inspect HTTP content; the answer is **AWS WAF**.
- **Thinking you have to pay for or turn on Shield Standard.** It is **automatic and at no additional charge**.
- **Choosing Shield Standard when the question asks for a 24/7 response team or cost protection.** That is **Shield Advanced**.
- **Choosing WAF when the question asks to apply rules across every account in the organization.** That is **Firewall Manager**.
- **Blocking an IP with a security group.** It only supports allow rules; to deny an IP you use a **network ACL** (or WAF, if it is web traffic).

## Exam summary

- WAF = layer 7: filters HTTP(S) requests with web ACLs (protection packs), rules, and rule groups.
- WAF is associated with CloudFront, ALB, API Gateway, AppSync, Cognito, App Runner, Amplify, and Verified Access.
- Shield Standard = layer 3 and 4 DDoS, automatic and at no additional charge.
- Shield Advanced = enhanced protection, SRT, metrics, and cost protection.
- Firewall Manager = centralized policies across the whole organization, including new resources.
- Security groups (instance, stateful, allow only) vs. network ACLs (subnet, stateless, allow and deny).
