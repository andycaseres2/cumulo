---
title: "Cost tools: Pricing Calculator, Cost Explorer and Budgets"
summary: "Learn how to estimate costs before you build, analyze what you have already spent, get alerts in time, and where to find pricing and billing support."
domain: "billing-pricing-support"
order: 3
examTasks: ["4.2"]
services: ["AWS Pricing Calculator", "AWS Cost Explorer", "AWS Budgets", "Amazon SNS", "AWS Support"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html"
  - "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html"
  - "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-get-answers.html"
  - "https://aws.amazon.com/pricing/"
quiz:
  - prompt: "A startup in Rosario funds its platform with a fixed monthly budget. It wants to receive an email when the month's forecasted spend is going to exceed 80% of that amount. Which tool should it use?"
    options:
      - label: "AWS Budgets"
        explanation: "AWS Budgets lets you create cost budgets with alerts based on actual or forecasted spend, sent by email or to an Amazon SNS topic."
        correct: true
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer shows forecasts and analyzes spend, but alerts when a threshold is exceeded are sent by AWS Budgets."
      - label: "AWS Pricing Calculator"
        explanation: "Pricing Calculator creates estimates before you build; it does not monitor actual spend or send alerts."
      - label: "AWS Price List API"
        explanation: "AWS Price List API queries prices programmatically; it does not track your spend or send notifications."
  - prompt: "An education nonprofit in Quito does not use AWS yet, and its board wants to know how much the course platform will cost per month before migrating it. Which tool should it use?"
    options:
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer analyzes costs and usage that have already happened; with no history in AWS, it cannot estimate an architecture that does not exist yet."
      - label: "AWS Budgets"
        explanation: "AWS Budgets tracks spend and sends alerts about thresholds; it does not estimate the cost of a solution before you build it."
      - label: "AWS Pricing Calculator"
        explanation: "AWS Pricing Calculator is a free web tool for creating cost estimates and modeling a solution before you build it."
        correct: true
      - label: "AWS Support Center"
        explanation: "AWS Support Center is for opening cases, such as questions about a charge on the bill; it does not generate cost estimates."
  - prompt: "A small business in Asunción with Basic Support finds a charge on its bill that it does not recognize and wants AWS to explain it. What should it do?"
    options:
      - label: "Buy a paid support plan to be able to open a case"
        explanation: "Account and billing support is free for all account holders, even with Basic Support; only personalized technical support requires a paid plan."
      - label: "Create a usage budget in AWS Budgets"
        explanation: "A usage budget sets usage limits and alerts, but it does not explain a charge that has already appeared on the bill."
      - label: "Review the estimate in AWS Pricing Calculator"
        explanation: "Pricing Calculator only considers the data you enter to estimate; it does not show or explain the actual charges on your bill."
      - label: "Open a case in AWS Support Center choosing Account and billing support"
        explanation: "For billing questions or disputes, you open an Account and billing support case in AWS Support Center, which is free even with Basic Support."
        correct: true
practice:
  - prompt: "A coffee shop chain in Medellín sees that its AWS bill went up last month. It wants to filter and group its cost history by service and by account to find what caused the increase. Which tool should it use?"
    options:
      - label: "AWS Pricing Calculator"
        explanation: "Pricing Calculator estimates costs before you build, using the data you enter; it does not analyze last month's bill."
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer lets you view and analyze costs and usage for up to the last 13 months, filtering and grouping by service, account or tag."
        correct: true
      - label: "AWS Budgets"
        explanation: "AWS Budgets tracks spend against a threshold and sends alerts; it is not the tool for filtering and grouping cost history."
      - label: "AWS Price List API"
        explanation: "AWS Price List API queries the published prices of services; it does not show how much your account spent or on what."
  - prompt: "A video game company in Lima wants an IAM policy that prevents creating more resources to be applied automatically when its spend exceeds the defined budget. What should it configure?"
    options:
      - label: "The AWS Cost Explorer forecast"
        explanation: "Cost Explorer shows how much you will probably spend, but it does not apply IAM policies when a budget is exceeded."
      - label: "A shared AWS Pricing Calculator estimate"
        explanation: "A Pricing Calculator estimate plans costs before you build; it does not monitor actual spend or run actions."
      - label: "A Savings Plans recommendation in Cost Explorer"
        explanation: "Cost Explorer purchase recommendations suggest Reserved Instances or Savings Plans; they do not apply restrictions when a budget is exceeded."
      - label: "A budget action in AWS Budgets"
        explanation: "AWS Budgets budget actions apply a configured action, such as an IAM policy that prevents creating more resources."
        correct: true
  - prompt: "A design studio in Montevideo created a cost budget with an email alert in AWS Budgets, without configuring actions, and believes AWS will shut down its resources when the threshold is exceeded. What actually happens?"
    options:
      - label: "AWS Budgets sends the configured notification and the resources keep running"
        explanation: "By default Budgets only notifies; stopping or restricting resources requires actions that you configure."
        correct: true
      - label: "AWS Budgets stops all the instances in the account"
        explanation: "This is the classic exam trap: Budgets does not cut off service on its own; without configured budget actions it only sends alerts."
      - label: "AWS Cost Explorer blocks the creation of new resources"
        explanation: "Cost Explorer analyzes costs and shows forecasts; it does not block the creation of resources."
      - label: "AWS Pricing Calculator adjusts the estimate and limits spend"
        explanation: "Pricing Calculator only creates estimates from the data you enter; it does not control or limit the account's actual spend."
  - prompt: "A developer at an online store in Guayaquil wants to query AWS service prices programmatically from their own system, by product or by downloading JSON or CSV files per service and Region. What should they use?"
    options:
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer analyzes your account's costs and usage; it is not the programmatic source of the AWS price list."
      - label: "AWS Budgets"
        explanation: "AWS Budgets tracks your spend and sends alerts; it does not publish service prices."
      - label: "AWS Price List API"
        explanation: "AWS Price List API offers the Query API by product and the Bulk API with JSON or CSV files per service and Region."
        correct: true
      - label: "AWS Support Center"
        explanation: "AWS Support Center is for opening cases, for example about the bill; it does not provide prices programmatically."
  - prompt: "A consulting firm in Santo Domingo is preparing an estimate in AWS Pricing Calculator for its client. What should it warn the client about that figure?"
    options:
      - label: "It is the exact amount that will appear on the bill, taxes included"
        explanation: "The Pricing Calculator figure is an estimate and does not include taxes, so it can differ from the actual bill."
      - label: "It is an estimate that does not include taxes and only considers the data entered"
        explanation: "Pricing Calculator creates estimates without taxes based only on the data you enter, useful for planning before you build."
        correct: true
      - label: "It requires at least 13 months of AWS usage history"
        explanation: "The 13 months of history belong to Cost Explorer; Pricing Calculator does not require prior experience with AWS."
      - label: "It can only be viewed inside the account that created it"
        explanation: "The estimate can be shared by saving its link, or exported to CSV or PDF to hand over to the client."
  - prompt: "A transportation company in Tegucigalpa has been on AWS for a year and wants to receive Reserved Instances and Savings Plans purchase recommendations based on its usage. Which tool provides them?"
    options:
      - label: "AWS Pricing Calculator"
        explanation: "Pricing Calculator only considers the data you enter to estimate; it does not analyze your actual usage to recommend purchases."
      - label: "AWS Budgets"
        explanation: "AWS Budgets supports RI and Savings Plans utilization and coverage budgets, but purchase recommendations come from Cost Explorer."
      - label: "AWS Support Center"
        explanation: "AWS Support Center is for opening account and billing cases; it does not generate purchase recommendations."
      - label: "AWS Cost Explorer"
        explanation: "Besides analyzing costs and usage, Cost Explorer offers Reserved Instances and Savings Plans purchase recommendations."
        correct: true
---

## Why does it matter?

An education nonprofit in Quito receives a donation to move its course platform to AWS. Before migrating, the board wants to know **how much it will cost** per month. Three months later, the bill goes up and nobody understands **why**. Since the money comes from a fixed-amount donation, they need **an alert before going over** the budget. And when a charge they do not recognize shows up, they want to know **whom to ask**.

Each of those questions has its own tool or resource in AWS: **AWS Pricing Calculator**, **AWS Cost Explorer**, **AWS Budgets** and billing support. The exam usually describes the need and asks you for the right tool.

## AWS Pricing Calculator: estimate before you build

**AWS Pricing Calculator** is a **free** web tool for **creating cost estimates** for AWS services. Use it to:

- Model a solution **before you build it** and plan your spend.
- Explore service prices and see the calculations behind each estimate.
- Group estimates according to your architecture.
- Save the estimate's link to share it, or export it to CSV or PDF.

You do not need prior experience with AWS to use it. It is an **estimate**: it does not include taxes and only considers the data you enter.

In the nonprofit's case, Pricing Calculator answers "how much will it cost?".

## AWS Cost Explorer: analyze what you have already spent

**AWS Cost Explorer** lets you **view and analyze your costs and usage**. You can:

- Review data for **up to the last 13 months** plus the current month.
- Get a **forecast** of how much you will probably spend over the **next 18 months**.
- Filter and group (by service, account, tag, etc.) to identify what drives spend and see trends.
- Receive Reserved Instances and Savings Plans purchase recommendations.
- Ask questions about your costs in natural language with **Amazon Q Developer**.

Using the Cost Explorer interface is free; API access has a per-request charge. After you enable it, the current month's data takes about 24 hours to be ready.

In the nonprofit's case, Cost Explorer answers "why did the bill go up?".

## AWS Budgets: alerts and actions on spend

**AWS Budgets** is for **tracking and acting** on your costs and usage. Budget types:

- **Cost budgets:** spending limits with alerts when you approach or exceed the threshold.
- **Usage budgets:** usage limits for one or more services.
- **Utilization and coverage budgets** for Reserved Instances and Savings Plans.

Alerts can be based on **actual** spend (already incurred) or **forecasted** spend (before it happens) and are sent by **email**, to an **Amazon SNS** topic (a notification service), or both. In addition, **budget actions** let you apply an action, for example an IAM policy that prevents creating more resources.

Watch out: Budgets information is updated up to three times a day, so there may be a delay between the spend and the alert.

In the nonprofit's case, Budgets answers "warn me before I go over".

## Where to find pricing and billing help

**Pricing information:**

- Each service has its **official pricing page** at aws.amazon.com/pricing; if it differs from another source, AWS charges the price on that page.
- **AWS Price List API** lets you query prices programmatically (the Query API by product and the Bulk API with JSON or CSV files per service and Region). Pricing Calculator gets its prices from there.

**Billing support:**

- **All account holders** have **free** access to account and billing support, even with Basic Support. Only **personalized technical support** requires a paid plan.
- For billing questions or disputes, you open a case in the **AWS Support Center** choosing *Account and billing support*. You can ask for a response by web (email) or by phone.
- The **AWS Knowledge Center** (on AWS re:Post) has articles answering frequently asked billing questions.
- The **Bills** page of the Billing and Cost Management console shows the details of your monthly charges.

## Quick comparison

| Tool | Question it answers | When | Example |
| --- | --- | --- | --- |
| **AWS Pricing Calculator** | How much will it cost? | Before using AWS | Estimate the platform migration |
| **AWS Cost Explorer** | What did I spend on, and how much will I spend? | Afterward, with history and forecast | Find out which service drove up the bill |
| **AWS Budgets** | Will you warn me if I go over? | Continuously | Alert when 80% of the budget is reached |
| **AWS Support Center** | Why was I charged for this? | When you have a billing question | *Account and billing support* case |

## Common exam traps

- **Choosing Cost Explorer to estimate an architecture that does not exist yet.** That is what **Pricing Calculator** is for.
- **Choosing Pricing Calculator to analyze last month's bill.** That is **Cost Explorer**.
- **Confusing a forecast with an alert.** Cost Explorer shows forecasts; **Budgets** sends alerts when a threshold is exceeded (or is forecasted to be exceeded).
- **Believing Budgets cuts off service on its own.** It sends alerts and can run **actions that you configure**; by default it only notifies.
- **Thinking you need a paid support plan for billing questions.** Account and billing support is free for everyone.

## Exam summary

- Pricing Calculator: free estimates before you build; no taxes.
- Cost Explorer: up to 13 months of history and an 18-month forecast; recommends RIs and Savings Plans.
- Budgets: cost, usage, RI and Savings Plans budgets; alerts by email or Amazon SNS on actual or forecasted spend.
- Budget actions apply configured actions, such as an IAM policy.
- Official prices: each service's pricing page and AWS Price List API.
- Billing support: free for everyone, through a case in AWS Support Center.
