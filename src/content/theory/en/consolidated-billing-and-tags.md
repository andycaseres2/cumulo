---
title: "Consolidated billing, cost allocation tags, and CUR"
summary: "Use AWS Organizations to get a single bill and share discounts, and use cost allocation tags with the Cost and Usage Report to know who spends what."
domain: "billing-pricing-support"
order: 4
examTasks: ["4.2"]
services: ["AWS Organizations", "AWS Cost and Usage Reports", "AWS Cost Explorer", "Amazon S3", "Amazon Athena"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-effective.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-behavior.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html"
  - "https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"
  - "https://docs.aws.amazon.com/cur/latest/userguide/what-is-data-exports.html"
quiz:
  - prompt: "A pharmacy chain in Guadalajara has five AWS accounts and receives five separate bills every month. It wants a single bill, with the usage of all accounts combined to share volume discounts, without paying more. What should it use?"
    options:
      - label: "AWS Budgets"
        explanation: "AWS Budgets tracks spending and sends alerts; it does not merge the bills of several accounts or combine their usage to share discounts."
      - label: "AWS Organizations consolidated billing"
        explanation: "Consolidated billing provides a single bill paid by the management account, combines the usage of all accounts to share volume discounts, and is free."
        correct: true
      - label: "AWS Cost Explorer"
        explanation: "AWS Cost Explorer is used to visualize and analyze costs in the console; it does not turn several bills into one or combine usage across accounts."
      - label: "Cost allocation tags"
        explanation: "Tags organize costs by project or cost center, but they do not merge bills or combine the accounts' usage."
  - prompt: "The finance team of a company in Santiago tagged its resources with the key Project, but the tag does not appear in AWS Cost Explorer. The company uses AWS Organizations. What should it do?"
    options:
      - label: "Ask each member account to activate the tag in its own console"
        explanation: "In an organization, only the management account has access to the cost allocation tags manager, so member accounts cannot activate it."
      - label: "Rename the key so it uses the aws: prefix"
        explanation: "The aws: prefix belongs to AWS-generated tags; tags you create are user-defined and must be activated anyway."
      - label: "Create a CUR 2.0 export in AWS Data Exports"
        explanation: "The CUR breaks down costs by the tags you activated; creating the export does not activate the tag or make it appear in Cost Explorer."
      - label: "Activate it as a cost allocation tag from the management account"
        explanation: "Tags must be activated in the Billing and Cost Management console before they appear in Cost Explorer, and in an organization the management account does that."
        correct: true
  - prompt: "A retail company in Bogotá needs the most comprehensive set of cost and usage data, broken down by hour and by tags, delivered to an Amazon S3 bucket so it can query it with Amazon Athena. What should it configure?"
    options:
      - label: "An AWS Cost and Usage Report (CUR 2.0) export in AWS Data Exports"
        explanation: "The CUR contains the most comprehensive set of cost and usage data, is delivered to S3, breaks down by hour and by activated tags, and can be queried with Athena; CUR 2.0 in Data Exports is the recommended way."
        correct: true
      - label: "AWS Cost Explorer"
        explanation: "Cost Explorer is used to visualize and analyze costs in the console; the most granular detail as files in S3 is delivered by the CUR."
      - label: "AWS Organizations consolidated billing"
        explanation: "Consolidated billing merges bills and shares discounts, but on its own it does not deliver detailed hourly, tag-level files to S3."
      - label: "The member accounts' bills"
        explanation: "In an organization, member account bills are for informational purposes only; they are not the detailed dataset delivered to S3 for querying with Athena."
practice:
  - prompt: "A retail group in Santiago has its accounts in AWS Organizations. Finance notices that the discount from a Reserved Instance purchased in the logistics account was applied to matching instances in the e-commerce account. Why does this happen?"
    options:
      - label: "The e-commerce account activated a cost allocation tag that moves the discount"
        explanation: "Tags organize costs for reporting; they do not move RI discounts between accounts."
      - label: "AWS Cost Explorer automatically reassigns unused RIs"
        explanation: "Cost Explorer is used to visualize and analyze costs; it does not apply or reassign RI discounts."
      - label: "For billing purposes, the organization is treated as one account and RI discounts are shared"
        explanation: "With consolidated billing, the organization is treated as a single account, so the benefit of an RI can apply to matching instances in another account."
        correct: true
      - label: "It is a billing error, because an RI only benefits the account that purchased it"
        explanation: "In an organization, RI discounts are shared by default; benefiting another account is the expected behavior."
  - prompt: "A holding company in Bogotá that uses AWS Organizations wants each account's Reserved Instance and Savings Plans discounts to stop being shared with the other accounts. What should it do?"
    options:
      - label: "Turn off sharing from the management account, on the Billing and Cost Management Preferences page"
        explanation: "The management account can turn off sharing of RI and Savings Plans discounts on the Preferences page of the Billing and Cost Management console."
        correct: true
      - label: "Ask each member account to turn off consolidated billing"
        explanation: "The sharing setting is controlled by the management account, not by each member account."
      - label: "Remove the user-defined tags from the reserved instances"
        explanation: "Tags are used to organize and report costs; removing them does not change how discounts are shared."
      - label: "Create a CUR 2.0 export in AWS Data Exports"
        explanation: "The CUR delivers detailed cost and usage data to S3; it does not change how discounts are distributed among accounts."
  - prompt: "A startup in Asunción has an account on the Free account plan, and its parent company wants to add it to its AWS Organizations organization. What happens to that account when it joins?"
    options:
      - label: "It can stay on the free plan as long as it is a member account"
        explanation: "An account on the free plan does not keep that plan inside an organization: when it joins, it is automatically moved to the paid plan."
      - label: "It stays on the free plan until it is changed manually"
        explanation: "The change is not manual: when it joins the organization, the account automatically moves to the paid plan."
      - label: "It must pay a monthly fee to use consolidated billing"
        explanation: "Consolidated billing is free; joining the organization does not add a fee for that service."
      - label: "It automatically moves to the paid plan"
        explanation: "If an account on the free plan joins AWS Organizations, it automatically moves to the paid plan; any remaining credits are applied to its future bills."
        correct: true
  - prompt: "The cost team of a construction company in Lima finds the tag aws:createdBy on its resources and wants to group costs by it in AWS Cost Explorer. What type of tag is it, and what should the team do?"
    options:
      - label: "It is user-defined and appears in Cost Explorer without being activated"
        explanation: "The aws: prefix indicates that AWS generated it, and no tag appears in Cost Explorer without being activated first."
      - label: "It is AWS-generated and must be activated as a cost allocation tag"
        explanation: "Tags with the aws: prefix are AWS-generated and, like user-defined tags, must be activated separately in Billing and Cost Management before they appear in Cost Explorer."
        correct: true
      - label: "It is AWS-generated and appears in Cost Explorer without being activated"
        explanation: "Even though AWS creates it, the tag must be activated as a cost allocation tag before it appears in Cost Explorer."
      - label: "It is user-defined and each member account must activate it"
        explanation: "The aws: prefix belongs to AWS-generated tags, and in an organization only the management account manages cost allocation tags."
  - prompt: "A media company in Buenos Aires brought its six accounts together in AWS Organizations, and its Amazon S3 and data transfer costs went down even though total usage stayed the same. What explains this?"
    options:
      - label: "AWS combines the usage of all accounts to decide which volume pricing tier applies"
        explanation: "S3 and data transfer have volume pricing tiers; by combining the usage of all accounts, the organization reaches the lower per-GB prices sooner."
        correct: true
      - label: "Each account gets a fixed discount just for belonging to the organization"
        explanation: "The savings come from combining usage to reach volume pricing tiers, not from a fixed discount per account."
      - label: "Cost allocation tags reduce the per-GB rate"
        explanation: "Tags organize and report costs; they do not change the per-GB price."
      - label: "AWS Cost Explorer applies lower prices when it displays costs"
        explanation: "Cost Explorer is used to visualize and analyze costs; it does not change the prices that are charged."
  - prompt: "The accountant of a coffee shop chain in Medellín asks who pays in an organization with consolidated billing and what the bills each member account sees are worth. Which answer is correct?"
    options:
      - label: "Each member account pays its own bill and the management account only reviews them"
        explanation: "With consolidated billing, the management account pays; member accounts do not pay their own bills."
      - label: "The member account with the highest spending that month pays"
        explanation: "It does not matter which account spends the most: the management account pays the charges of all member accounts."
      - label: "The management account pays, and the member accounts' bills are for informational purposes only"
        explanation: "The management account pays the charges of all member accounts, whose bills are for informational purposes only."
        correct: true
      - label: "The member accounts pay and the management account receives an informational summary"
        explanation: "It is the other way around: the management account is the one that pays, and the member accounts' bills are informational."
---

## Why does it matter?

A retail group in Santiago, Chile, has an AWS account for each area: e-commerce, logistics, and analytics, plus separate accounts for development and production. At the end of the month, finance receives several bills, cannot take advantage of volume discounts, and does not know how much each project really spends.

The solution combines three pieces that the exam tests: **AWS Organizations** **consolidated billing**, **cost allocation tags**, and the **AWS Cost and Usage Report (CUR)**.

## Consolidated billing with AWS Organizations

**AWS Organizations** lets you group several AWS accounts into a centrally managed **organization**. Every organization has a **management account** (the one that pays) that **pays the charges of all member accounts**.

Benefits of **consolidated billing**:

- **One bill** for multiple accounts.
- **Easy tracking:** you can see the charges of all accounts and download the combined cost and usage data.
- **Combined usage:** the usage of all accounts is added together, which lets them share **volume discounts**, **Reserved Instances** discounts, and **Savings Plans**. The result can be a lower charge than with standalone accounts.
- **No additional cost:** consolidated billing is free.

Example: services such as data transfer and Amazon S3 have **volume pricing tiers**. AWS combines the usage of all accounts to decide which tier applies, so the organization reaches the lower per-GB prices sooner, and then AWS distributes the discount among the accounts based on their usage. The Free Tier also applies to the organization's total usage, not to each account. Watch out: if an account on the Free account plan joins AWS Organizations, it automatically moves to the paid plan; any remaining credits are applied to its future bills.

## Cost allocation across accounts

For billing purposes, the organization is treated **as if it were a single account**. That is why the benefit of a Reserved Instance purchased in the logistics account can apply to matching instances in the e-commerce account. The management account can **turn off sharing** of RI and Savings Plans discounts on the *Preferences* page of the Billing and Cost Management console.

How costs are distributed:

- The management account sees a **combined view** of all charges and can get a **cost report for each member account**.
- Member account bills are **for informational purposes only**; the management account can **reallocate** the volume, RI, or Savings Plans discounts that each account receives.
- Separating areas or environments into **different accounts** is already a simple way to allocate costs.

## Cost allocation tags

A **tag** is a **key-value** pair that you or AWS assign to a resource, for example `Project = checkout`. **Cost allocation tags** are tags that you **activate** so that AWS organizes your costs by them.

| Type | Who creates it? | Prefix | Example |
| --- | --- | --- | --- |
| **AWS-generated** | AWS (or an AWS Marketplace ISV seller) | `aws:` | `aws:createdBy`, which shows who created the resource |
| **User-defined** | You | `user:` in reports | `user:CostCenter`, `user:Project` |

Important rules:

- **Both types must be activated separately** in the Billing and Cost Management console before they appear in **AWS Cost Explorer** or in cost reports.
- In an organization, **only the management account** (or a standalone account) has access to the cost allocation tags manager.
- Tags can take **up to 24 hours** to appear in the console.
- Once active, you can **filter and group** by tag in Cost Explorer and get cost allocation reports that include tagged and untagged resources and that add up to the bill total.
- Best practice: do **not** include sensitive information in tags.

## AWS Cost and Usage Report and Data Exports

The **AWS Cost and Usage Report (AWS CUR)** contains the **most comprehensive set of cost and usage data** available. Its characteristics:

- It is delivered to an **Amazon S3 bucket** that you choose.
- It breaks down costs **by hour, day, or month**, by product or resource, and by the cost allocation **tags** you activated.
- It is updated at least once a day during the month and can be queried with **Amazon Athena**, loaded into Amazon Redshift, or visualized with Amazon Quick Sight.

Today, the recommended way to receive this data is **AWS Data Exports**, in the Billing and Cost Management console. From there you create exports such as **Cost and Usage Report 2.0 (CUR 2.0)**, the new and recommended format, as well as other tables (for example, cost optimization recommendations or the FOCUS standard format). The previous CUR is still available as a **legacy export**.

In the Santiago example, finance activates the `Project` tag, creates a CUR 2.0 export to S3, and uses Athena to query how much each project spent in each account.

## Common exam traps

- **Thinking consolidated billing has a cost.** It is free.
- **Believing RI discounts only benefit the account that purchased them.** In an organization, they are shared by default; the management account can turn that off.
- **Expecting to see a tag in Cost Explorer as soon as you create it.** You first have to **activate** it as a cost allocation tag.
- **Confusing CUR with Cost Explorer.** Cost Explorer is for **visualizing and analyzing** in the console; the CUR delivers the **most granular detail** as files in S3.
- **Thinking each member account pays its own bill.** The **management account** pays.

## Exam summary

- AWS Organizations + consolidated billing = one bill, paid by the management account.
- Combined usage shares volume, RI, and Savings Plans discounts; at no extra cost.
- The management account can view costs per account, reallocate discounts, and turn off sharing.
- Cost allocation tags: AWS-generated (`aws:`) and user-defined (`user:`); both are activated separately.
- Only the management account manages cost allocation tags in an organization.
- CUR = the most detailed cost and usage data, delivered to S3, with tags; queryable with Athena.
- AWS Data Exports with CUR 2.0 is the current recommended way; the previous CUR remains as a legacy export.
