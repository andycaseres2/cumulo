---
title: "Business applications, virtual desktops, and IoT"
summary: "Amazon Connect for contact centers, SES for email, WorkSpaces, AppStream 2.0, and Secure Browser for desktops and apps, and AWS IoT Core for devices."
domain: "technology-services"
order: 19
examTasks: ["3.8"]
services: ["Amazon Connect", "Amazon SES", "Amazon WorkSpaces", "Amazon AppStream 2.0", "Amazon WorkSpaces Secure Browser", "AWS IoT Core"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/business-applications.html"
  - "https://docs.aws.amazon.com/ses/latest/dg/Welcome.html"
  - "https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html"
  - "https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/end-user-computing.html"
  - "https://aws.amazon.com/workspaces/secure-browser/"
  - "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html"
quiz:
  - prompt: "An insurance company in Quito wants to send payment confirmations, reminders, and marketing newsletters at scale from its own email domain. Which service should it use?"
    options:
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 streams desktop applications; it is not an email platform."
      - label: "Amazon SES"
        explanation: "Amazon SES lets you send and receive email using your own addresses and domains, both transactional and marketing, at scale."
        correct: true
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces provisions virtual desktops in the cloud; it does not send bulk email from your domain."
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core connects IoT devices to AWS services; it is not used for email campaigns."
  - prompt: "A university in Córdoba wants its students to use a GPU-intensive design program from an HTML5 browser, without installing it and without giving them a full desktop. Which service should it use?"
    options:
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces delivers a full virtual desktop; the scenario asks for just the application, without a full desktop."
      - label: "Amazon Connect"
        explanation: "Amazon Connect is a cloud contact center for serving customers by voice, chat, or SMS; it does not deliver desktop applications."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser provides secure access to internal websites and SaaS applications; the design program is a desktop application."
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 streams individual desktop applications, even to an HTML5 browser, and is useful for GPU-intensive software and classroom programs."
        correct: true
  - prompt: "A transportation company in Rosario will install sensors in its trucks that publish data over MQTT, and it wants to send that data to other AWS services using rules. Which service should it use?"
    options:
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core connects IoT devices to AWS services, supports MQTT with a publish/subscribe message broker, and routes data with rules."
        correct: true
      - label: "Amazon Connect"
        explanation: "Amazon Connect connects customers with contact center agents; it does not receive sensor data."
      - label: "Amazon SES"
        explanation: "Amazon SES sends and receives email; it is not a service for connecting devices over MQTT."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser is a remote enterprise browser for people; it does not connect sensors or IoT devices."
practice:
  - prompt: "An insurance company in Guayaquil needs a cloud contact center to handle claims by voice, chat, and SMS, with intelligent routing, no upfront payments, and no infrastructure to manage. Which service should it use?"
    options:
      - label: "Amazon SES"
        explanation: "Amazon SES is an email platform; it does not connect customers with agents by voice, chat, or SMS."
      - label: "Amazon Connect"
        explanation: "Amazon Connect is an omnichannel cloud contact center with intelligent routing and real-time metrics, and you pay as you go."
        correct: true
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces provisions virtual desktops; it could give an agent a desktop, but it is not the platform that handles and routes contacts."
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core connects IoT devices to AWS services; it does not handle customer calls or chats."
  - prompt: "An accounting firm in Asunción wants to give each remote employee a full Windows desktop that is persistent and assigned only to them, without buying corporate laptops. Which service should it use?"
    options:
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 focuses on streaming applications from non-persistent fleets; it does not assign each employee their own persistent desktop."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser provides access to internal websites and SaaS applications from the browser, not a full Windows desktop."
      - label: "Amazon Connect"
        explanation: "Amazon Connect is a cloud contact center; it does not provision desktops for employees."
      - label: "Amazon WorkSpaces"
        explanation: "Amazon WorkSpaces provisions virtual desktops in the cloud with Windows or Linux, and WorkSpaces Personal makes them persistent and assigned to one user."
        correct: true
  - prompt: "A consulting firm in Cartagena wants its contractors to access only its internal websites and SaaS applications from the browser they already have, without sensitive data reaching their device. Which service should it choose?"
    options:
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "Amazon WorkSpaces Secure Browser is a remote enterprise browser: browsing happens in the cloud and sensitive data does not reach the user's device."
        correct: true
      - label: "Amazon SES"
        explanation: "Amazon SES sends and receives email; it does not provide protected access to internal websites."
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core connects devices such as sensors and meters, not people browsing internal sites."
      - label: "Amazon Connect"
        explanation: "Amazon Connect connects customers with contact center agents; it does not offer secure browsing to SaaS applications."
  - prompt: "An online store in Mendoza wants to receive the emails that arrive at its support address to automatically create tickets, using its own domain. Which AWS service fits?"
    options:
      - label: "Amazon SNS"
        explanation: "Amazon SNS is for notifications and pub/sub; to send and receive email with your own domain, the answer is a different service."
      - label: "Amazon AppStream 2.0"
        explanation: "Amazon AppStream 2.0 streams desktop applications; it does not receive email."
      - label: "Amazon SES"
        explanation: "Amazon SES sends and receives email with your own addresses and domains, and receiving is useful, for example, to create support tickets."
        correct: true
      - label: "AWS IoT Core"
        explanation: "AWS IoT Core receives messages from IoT devices over protocols such as MQTT, not email from customers."
  - prompt: "A power company in Barranquilla connects meters over LoRaWAN to AWS IoT Core, and a manager assumes IoT Core will analyze consumption on its own. Which statement is correct?"
    options:
      - label: "IoT Core analyzes the data and generates consumption reports automatically"
        explanation: "IoT Core does not analyze the data on its own; it connects devices and routes their messages."
      - label: "IoT Core connects devices and routes the data with rules; analysis is done with other AWS services"
        explanation: "IoT Core connects the devices, its message broker handles publish and subscribe, and its rules send the data to other services where it is analyzed."
        correct: true
      - label: "IoT Core only accepts MQTT, so the LoRaWAN meters cannot connect"
        explanation: "IoT Core supports MQTT, MQTT over secure WebSockets, HTTPS, and LoRaWAN, so the meters can connect."
      - label: "IoT Core requires installing Amazon WorkSpaces on each meter"
        explanation: "Devices are integrated using the AWS IoT Device SDKs; WorkSpaces is a virtual desktop service for people."
  - prompt: "A call center in Lima has rotating shifts and wants non-persistent virtual desktops on ephemeral infrastructure, instead of a fixed desktop for each agent. Which option should it use?"
    options:
      - label: "WorkSpaces Personal"
        explanation: "WorkSpaces Personal delivers persistent desktops assigned to one user, the opposite of what the call center needs."
      - label: "Amazon WorkSpaces Secure Browser"
        explanation: "WorkSpaces Secure Browser provides access to websites and SaaS from the browser, not virtual desktops."
      - label: "Amazon AppStream 2.0"
        explanation: "AppStream 2.0 is geared toward application streaming; for non-persistent full virtual desktops, the WorkSpaces option is Pools."
      - label: "WorkSpaces Pools"
        explanation: "WorkSpaces Pools offers non-persistent desktops on ephemeral infrastructure, suitable for rotating shifts."
        correct: true
---

## Why does it matter?

An insurance company in Quito needs a call center to handle claims, to email policies and payment reminders, to give its remote agents a secure work desktop without handing out corporate laptops, and, in a new project, to receive data from sensors installed in insured vehicles.

These are four very different needs, and AWS has a managed service for each one. The exam will ask you to choose the right service for **business application needs**, for **delivering desktops or applications to end users' devices**, and for **managing IoT devices**.

## Business applications

**Amazon Connect** is an omnichannel, self-service **cloud contact center** service: it connects customers with agents by voice, chat, SMS, and other channels, with intelligent routing and real-time metrics. Its graphical interface lets non-technical users design contact flows and manage agents. There are no upfront payments and no infrastructure to manage: you pay for what you use.

Current fact: AWS now calls the contact center product that used to be called Amazon Connect **Amazon Connect Customer**; "Amazon Connect" has become a family of agentic AI solutions. The exam guide uses the name **Amazon Connect**.

**Amazon Simple Email Service (Amazon SES)** is an **email** platform for **sending and receiving email** using your own addresses and domains, cost-effectively and at scale. Typical use cases:

- **Transactional** email: purchase confirmations, password resets.
- **Marketing** email: special offers and newsletters.
- Receiving email to create, for example, support tickets or automatic replies.

You pay based on the volume of email sent and received.

## Desktops and applications on the user's device

With these services, the desktop or application runs in AWS and the user only sees the **output** on their device. Data is not stored on the user's device, which improves security.

**Amazon WorkSpaces** lets you provision **virtual desktops in the cloud** (called *WorkSpaces*) with Microsoft Windows or Linux distributions such as Ubuntu, Rocky Linux, or Red Hat Enterprise Linux. It eliminates hardware purchases. Options:

- **WorkSpaces Personal**: **persistent** desktops assigned to one user, like their own computer.
- **WorkSpaces Pools**: **non-persistent** desktops on ephemeral infrastructure.

You can pay monthly or hourly.

**Amazon AppStream 2.0** is a fully managed **application streaming** service: instead of a full desktop, it delivers individual **desktop applications** to any device, even from an HTML5-compatible browser. You maintain a single version of each application. It is useful for GPU-intensive software, for students using classroom programs, or for vendors offering demos with no installation. Current fact: AWS now calls it **Amazon WorkSpaces Applications**; the exam guide uses the name **Amazon AppStream 2.0**.

**Amazon WorkSpaces Secure Browser** offers a fully managed **remote enterprise browser** for protected access to **internal websites and SaaS applications** from the browser the user already has. Browsing happens in a cloud session and sensitive data does not reach the user's device. Current fact: according to the official page, it will no longer be open to new customers starting October 29, 2026; it is still listed in the exam guide.

| I need to deliver… | Service |
| --- | --- |
| A **full desktop** with Windows or Linux for each employee | **Amazon WorkSpaces** |
| Specific **desktop applications** by streaming, without a full desktop | **Amazon AppStream 2.0** |
| Secure access to **internal websites and SaaS** from the browser | **Amazon WorkSpaces Secure Browser** |

## AWS IoT Core: connecting devices

The **Internet of Things (IoT)** refers to physical devices (sensors, meters, vehicles, appliances) that send and receive data over the internet.

**AWS IoT Core** provides the cloud services that **connect your IoT devices** to other devices and to AWS services. Key points:

- It supports the **MQTT** protocol, MQTT over secure WebSockets, **HTTPS**, and **LoRaWAN** (long-range, low-power wireless networks).
- Its **message broker** lets devices **publish and subscribe** to messages.
- With **rules** you can send device data to other AWS services.
- Devices are integrated using the **AWS IoT Device SDKs** and are managed from the console, the API, or the AWS CLI.

Other IoT services, such as AWS IoT Greengrass and AWS IoT Device Defender, are on the official list of services out of scope for CLF-C02.

## Common exam traps

- **Confusing Amazon Connect with Amazon SES.** Connect is a contact center (calls, chat); SES is email.
- **Choosing SNS for email campaigns from your domain.** For transactional and marketing email at scale, the answer is **SES**; SNS is for notifications and pub/sub.
- **Confusing WorkSpaces with AppStream 2.0.** WorkSpaces delivers a **full desktop**; AppStream 2.0 streams **applications**.
- **Choosing WorkSpaces just to access web applications.** If the browser is enough, the answer is **WorkSpaces Secure Browser**.
- **Thinking IoT Core analyzes data on its own.** IoT Core connects and routes; analysis is done with other services.

## Exam summary

- Amazon Connect = omnichannel cloud contact center, pay as you go.
- Amazon SES = send and receive email with your domain: transactional and marketing.
- WorkSpaces = Windows or Linux virtual desktops (persistent or in pools).
- AppStream 2.0 = desktop application streaming; it is now called WorkSpaces Applications.
- WorkSpaces Secure Browser = secure access to internal sites and SaaS from the browser.
- AWS IoT Core = connect and manage communication for IoT devices with MQTT, HTTPS, and LoRaWAN.
