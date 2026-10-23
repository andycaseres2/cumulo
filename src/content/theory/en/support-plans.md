---
title: "AWS Support plans"
summary: "Compare Basic Support, AWS Business Support+, AWS Enterprise Support and AWS Unified Operations, and get to know Trusted Advisor, AWS Health and the Trust & Safety team."
domain: "billing-pricing-support"
order: 5
examTasks: ["4.3"]
services: ["AWS Support", "AWS Trusted Advisor", "AWS Health Dashboard", "Amazon EventBridge"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/premiumsupport/plans/"
  - "https://aws.amazon.com/premiumsupport/plans/business-plus/"
  - "https://aws.amazon.com/premiumsupport/plans/enterprise/"
  - "https://aws.amazon.com/premiumsupport/plans/unified-operations/"
  - "https://docs.aws.amazon.com/awssupport/latest/user/support-plans-eos.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html"
  - "https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-get-answers.html"
  - "https://aws.amazon.com/about-aws/whats-new/2024/10/aws-trust-safety-center-re-post/"
quiz:
  - prompt: "A fintech in Mexico City is moving its payments app to production. It needs the minimum plan recommended for production, with 24/7 technical support and a response in under 30 minutes when there is a business-critical outage. Which plan should it get?"
    options:
      - label: "Basic Support"
        explanation: "Basic Support is included for everyone, but it only covers account and billing; it does not include technical support cases."
      - label: "AWS Enterprise Support"
        explanation: "Enterprise Support targets business-critical workloads with a designated TAM; it meets the need, but it is not the minimum plan recommended for production."
      - label: "AWS Business Support+"
        explanation: "Business Support+ is the minimum recommended for production, with 24/7 technical support and a response in under 30 minutes for business-critical outages."
        correct: true
      - label: "AWS Unified Operations"
        explanation: "Unified Operations is designed for mission-critical workloads with a response in under 5 minutes; it goes beyond the minimum requested."
  - prompt: "The board of an airline in Santiago wants, for its critical workloads, a designated AWS technical advisor who knows its account and leads Well-Architected reviews. Among the plans in the current exam guide, which is the first one that includes this?"
    options:
      - label: "AWS Enterprise Support"
        explanation: "The designated Technical Account Manager (TAM), who knows your account and leads Well-Architected reviews, is available starting with Enterprise Support."
        correct: true
      - label: "AWS Business Support+"
        explanation: "Business Support+ offers AI-powered assistance and 24/7 access to experts, but it does not include a designated TAM."
      - label: "Basic Support"
        explanation: "Basic Support includes no technical support or designated contact; it gives access to customer service, documentation and AWS re:Post."
      - label: "Developer Support"
        explanation: "Developer Support is being discontinued on January 1, 2027, and is not one of the four plans in the current exam guide."
  - prompt: "A company in Montevideo detects port scans coming from AWS-hosted resources that are not its own. Whom should it report this to?"
    options:
      - label: "To AWS Support, by opening a technical case in AWS Support Center"
        explanation: "AWS Support Center handles support cases for your account, but AWS Support does not handle abuse reports."
      - label: "To the AWS Health Dashboard"
        explanation: "The AWS Health Dashboard reports on events affecting your resources and AWS services; it does not receive abuse reports."
      - label: "To AWS Trusted Advisor"
        explanation: "Trusted Advisor inspects your own environment and recommends improvements; it is not used to report abusive activity from other people's resources."
      - label: "To the AWS Trust & Safety team, through the abuse report form"
        explanation: "Abuse of AWS resources, such as port scanning, is reported to AWS Trust & Safety using its form, even without having an AWS account."
        correct: true
practice:
  - prompt: "A bank in Bogotá runs mission-critical workloads and needs a response in under 5 minutes for a business-critical outage, with Incident Management Engineers and 24/7 security and performance monitoring. Which plan should it get?"
    options:
      - label: "AWS Enterprise Support"
        explanation: "Enterprise Support responds in under 15 minutes for critical outages and does not include the mission-critical 24/7 monitoring that is required."
      - label: "AWS Business Support+"
        explanation: "Business Support+ is the minimum for production, with a response in under 30 minutes; it does not reach what the bank requires."
      - label: "AWS Unified Operations"
        explanation: "Unified Operations is designed for mission-critical workloads: Incident Management Engineers responding in under 5 minutes and 24/7 security and performance monitoring."
        correct: true
      - label: "Basic Support"
        explanation: "Basic Support does not include technical support cases; it only covers account and billing."
  - prompt: "A startup in Guatemala is on the Basic Support plan and wants to see the health of AWS services and the events affecting its account. What does it need in order to use the AWS Health Dashboard?"
    options:
      - label: "Nothing extra; the AWS Health Dashboard is free and requires no setup for all customers"
        explanation: "The AWS Health Dashboard is free and requires no setup for all customers, including those on Basic Support."
        correct: true
      - label: "Get AWS Business Support+"
        explanation: "Business Support+ is required for the AWS Health API, not for the AWS Health Dashboard."
      - label: "Get AWS Enterprise Support"
        explanation: "Enterprise Support adds a TAM and proactive services, but it is not needed to view the AWS Health Dashboard."
      - label: "Open a case in AWS Support Center to activate it"
        explanation: "The AWS Health Dashboard requires no setup or activation; there is no need to open a case."
  - prompt: "A clothing store in Rosario on the Basic Support plan has a question about a charge on its AWS bill. What option does it have?"
    options:
      - label: "Get AWS Business Support+, because Basic does not allow billing inquiries"
        explanation: "Basic includes 24/7 access to account and billing customer service, so it does not need to change plans."
      - label: "Report it to the AWS Trust & Safety team"
        explanation: "AWS Trust & Safety handles reports of abuse of AWS resources, not questions about the bill."
      - label: "Review it with the AWS Trusted Advisor checks"
        explanation: "Trusted Advisor recommends best practices for your environment; it does not answer questions about a specific charge on the bill."
      - label: "Contact account and billing customer service, which is free on all plans"
        explanation: "Account and billing support is free on all plans, including Basic Support."
        correct: true
  - prompt: "The on-call engineer at an education platform in Lima needs to create a support case, choose its severity and follow up on it. Where do they do this?"
    options:
      - label: "In AWS re:Post"
        explanation: "AWS re:Post is the community question-and-answer service; support cases with a severity are not created there."
      - label: "In AWS Support Center"
        explanation: "AWS Support Center is the console where you create and manage support cases and choose their severity."
        correct: true
      - label: "In the AWS Health Dashboard"
        explanation: "The AWS Health Dashboard shows events affecting your resources and AWS services; it does not manage support cases."
      - label: "In the AWS Trust & Safety Center"
        explanation: "The AWS Trust & Safety Center explains how to report abuse and respond to its notices; it is not where support cases are opened."
  - prompt: "A student in Caracas finds in an old study guide that the recommended plan for their scenario is Enterprise On-Ramp. According to AWS, what is happening to that plan?"
    options:
      - label: "It is the minimum plan recommended for production in the current guide"
        explanation: "The minimum recommended for production in the current guide is AWS Business Support+, not Enterprise On-Ramp."
      - label: "It is one of the four current plans on the exam"
        explanation: "The four current plans are Basic, Business Support+, Enterprise Support and Unified Operations; Enterprise On-Ramp is not among them."
      - label: "It is being discontinued on January 1, 2027, and its customers are automatically migrated to AWS Enterprise Support during 2026"
        explanation: "AWS is discontinuing Enterprise On-Ramp on January 1, 2027, and its customers are automatically migrated to Enterprise Support during 2026."
        correct: true
      - label: "It is being replaced by Basic Support"
        explanation: "Enterprise On-Ramp customers move to Enterprise Support, not to Basic Support."
  - prompt: "A hotel chain in Cancún already has all the Trusted Advisor checks, but now also wants Trusted Advisor Priority. Among the current plans, which is the first one that includes it?"
    options:
      - label: "Basic Support"
        explanation: "Basic Support only gives the basic Trusted Advisor checks, without Trusted Advisor Priority."
      - label: "AWS Business Support+"
        explanation: "Business Support+ includes all Trusted Advisor checks, but not Trusted Advisor Priority."
      - label: "Developer Support"
        explanation: "Developer Support is being discontinued on January 1, 2027, and is not one of the current plans on the exam."
      - label: "AWS Enterprise Support"
        explanation: "Enterprise Support includes all Trusted Advisor checks plus Trusted Advisor Priority, and it is the first plan that offers it."
        correct: true
---

## Why does it matter?

A fintech in Mexico City launches its payments app on AWS. While it is in testing, documentation and forums are enough. But once it goes to production, a database outage on a Saturday night can cost it customers: it needs to talk to an AWS engineer **in minutes**, not days. And its board wants someone at AWS who knows its architecture and helps it prevent problems.

**AWS Support** offers different **support plans** based on how critical your workloads are. The exam will ask you to choose the right plan for the scenario.

## The current plans

The current exam guide names four plans: **Basic Support**, **AWS Business Support+**, **AWS Enterprise Support** and **AWS Unified Operations**.

| | **Basic** | **Business Support+** | **Enterprise Support** | **Unified Operations** |
| --- | --- | --- | --- | --- |
| Cost | Included for everyone | Monthly fee | Monthly fee | Monthly fee |
| Purpose | Learning and experimenting | Minimum recommended for **production** | **Business-critical** workloads | **Mission-critical** workloads |
| Technical support | No (account and billing only) | 24/7 by phone, web, chat and email | 24/7 by phone, web, chat and email | 24/7 by phone, web, chat and email |
| Response for a business-critical outage | — | Under 30 minutes | Under 15 minutes | Under 5 minutes (Incident Management Engineer) |
| Trusted Advisor | Basic checks | All checks | All + Trusted Advisor Priority | All + Trusted Advisor Priority |
| Designated contact | No | No | Designated **Technical Account Manager (TAM)** | Designated TAM and specialist engineers |

Details of each plan:

- **Basic Support:** included in every account. It gives 24/7 access to **customer service** (account and billing), documentation, whitepapers and **AWS re:Post**, plus the AWS Health Dashboard and the basic Trusted Advisor checks. It does not include technical support cases.
- **AWS Business Support+:** adds **AI-powered assistance** that understands the context of your environment, 24/7 access to AWS experts, all Trusted Advisor checks, the **AWS Support API** and the **AWS Health API**.
- **AWS Enterprise Support:** adds a **designated TAM** (a technical advisor who knows your account and leads Well-Architected reviews), 24/7 access to **AWS Security Incident Response** engineers, proactive services, workshops and AWS GameDays.
- **AWS Unified Operations:** designed for mission-critical enterprise operations. It adds **Incident Management Engineers** who respond in minutes, designated **specialist engineers** with a *follow-the-sun* model, and **24/7 monitoring** of security and performance.

Response times are **targets**: AWS states that it will make every reasonable effort to meet them. Check current prices on the official plans page.

### What about Developer, Business and Enterprise On-Ramp?

Older study material mentions **Developer Support**, **Business Support** and **Enterprise On-Ramp**. According to AWS, all three are **being discontinued on January 1, 2027**: Developer and Business customers can move to **Business Support+**, and Enterprise On-Ramp customers are automatically migrated to **Enterprise Support** during 2026. They remain available in the AWS GovCloud (US) Region. For the exam, study the four current plans.

## AWS Support Center and other channels

- **AWS Support Center:** the console where you **create and manage support cases**, choose the case **severity** and can use AI-assisted troubleshooting. To open a case, you must be the root user or have IAM permissions.
- **Customer service:** **account and billing** support is free on all plans.
- **Communities:** **AWS re:Post** is the community question-and-answer service, with answers reviewed by experts.

## Trusted Advisor and AWS Health for monitoring your environment

**AWS Trusted Advisor** inspects your environment and recommends improvements based on best practices in six categories: **Cost optimization**, **Performance**, **Security**, **Fault tolerance**, **Service limits** and **Operational Excellence**. For example, it detects idle or underutilized resources that generate unnecessary spend.

- With **Basic Support**, you get all the **Service limits** checks and some **Security** and **Fault tolerance** checks (for example, MFA on the root user or S3 bucket permissions).
- With Business Support+, Enterprise Support or Unified Operations, you get **all checks** and the Trusted Advisor API.

**AWS Health** reports on events that affect your resources and AWS services, such as incidents or scheduled maintenance:

- **AWS Health Dashboard:** free and requires no setup for **all** customers; it shows the health of services and the events affecting **your account**.
- **AWS Health API:** lets you integrate those events with your own or third-party systems; it requires Business Support+, Enterprise Support or Unified Operations.
- All customers can receive AWS Health events through **Amazon EventBridge** at no additional cost.

## AWS Trust & Safety: reporting abuse

If you suspect that **AWS resources are being used for abusive activities** (spam, objectionable content, port scanning, DDoS attacks, intrusion attempts), report it to the **AWS Trust & Safety** team through the abuse report form. The **AWS Trust & Safety Center**, on AWS re:Post, explains how to report and how to respond to the notices this team sends. **You do not need an AWS account** to report. AWS Support does not handle these reports.

## Common exam traps

- **Choosing Basic Support for an urgent technical case.** Basic does not include technical support; the minimum for production is **Business Support+**.
- **Looking for a designated TAM in Business Support+.** A designated TAM is available starting with **Enterprise Support**.
- **Choosing Enterprise Support when the question asks for a 5-minute response and mission-critical 24/7 monitoring.** That describes **Unified Operations**.
- **Thinking the AWS Health Dashboard is paid.** It is free; the **AWS Health API** does require a paid plan.
- **Reporting abuse to AWS Support.** It is reported to **AWS Trust & Safety**.
- **Answering with Developer Support or Enterprise On-Ramp.** They are being retired and are not part of the current guide.

## Exam summary

- Current plans: Basic, AWS Business Support+, AWS Enterprise Support and AWS Unified Operations.
- Basic: free; customer service, documentation, re:Post, Health Dashboard and basic Trusted Advisor checks.
- Business Support+: minimum for production; AI-powered assistance; response in under 30 minutes for critical outages.
- Enterprise Support: designated TAM; response in under 15 minutes; Security Incident Response.
- Unified Operations: mission-critical; response in under 5 minutes; 24/7 monitoring.
- AWS Support Center: create and manage cases; billing support is free.
- Trusted Advisor: six categories; all checks starting with Business Support+.
- AWS Health Dashboard is free; AWS Health API starting with Business Support+.
- Abuse of AWS resources: the AWS Trust & Safety team.
