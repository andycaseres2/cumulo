---
title: "DNS and content delivery: Route 53, CloudFront, Global Accelerator, and API Gateway"
summary: "How Route 53 resolves names and routes traffic, how CloudFront and Global Accelerator use edge locations, and why API Gateway is the front door to your APIs."
domain: "technology-services"
order: 11
examTasks: ["3.5", "3.2"]
services: ["Amazon Route 53", "Amazon CloudFront", "AWS Global Accelerator", "Amazon API Gateway", "AWS Lambda", "AWS Shield"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"
  - "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html"
  - "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
  - "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"
  - "https://aws.amazon.com/global-accelerator/faqs/"
  - "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
quiz:
  - prompt: "A video game studio in Bogotá is launching an online game that uses UDP connections and needs static IP addresses as a fixed entry point, with low latency for players in several countries. Which service should it use?"
    options:
      - label: "Amazon CloudFront"
        explanation: "CloudFront is a CDN that caches HTTP/HTTPS content; it does not accelerate an online game's UDP traffic over the AWS global network."
      - label: "Amazon API Gateway"
        explanation: "API Gateway manages REST, HTTP, and WebSocket APIs; it does not accelerate UDP traffic or provide static anycast IP addresses."
      - label: "Amazon Route 53"
        explanation: "Route 53 resolves domain names and routes through DNS, but it does not forward the game's packets over the AWS global network from static IPs."
      - label: "AWS Global Accelerator"
        explanation: "Global Accelerator provides static anycast IP addresses and accelerates TCP/UDP traffic over the AWS global network, ideal for games."
        correct: true
  - prompt: "An online store in Bogotá sells in Colombia, Mexico, and Chile and wants Amazon Route 53 to show each user the version of the site for their country, based on where they connect from. Which routing policy should it use?"
    options:
      - label: "Latency"
        explanation: "Latency sends the user to the Region with the lowest latency; it does not decide based on the user's country."
      - label: "Geolocation"
        explanation: "Geolocation routes based on the user's location, which lets you serve different content per country."
        correct: true
      - label: "Weighted"
        explanation: "Weighted splits traffic in proportions, for example 90% / 10%, without taking the user's country into account."
      - label: "Failover"
        explanation: "Failover sets up an active-passive scheme that sends traffic to the backup if the primary fails; it does not choose by country."
  - prompt: "The images and videos of an e-commerce company in Santiago are in an Amazon S3 bucket in a single Region, and they load slowly for customers in other countries. It wants to cache copies close to users and reduce the load on the origin. Which service should it use?"
    options:
      - label: "Amazon CloudFront"
        explanation: "CloudFront is the AWS CDN: it caches content in edge locations close to the user and fetches it from the origin, such as an S3 bucket, only when it is not cached."
        correct: true
      - label: "AWS Global Accelerator"
        explanation: "Global Accelerator accelerates TCP/UDP traffic from the edge, but it does not cache content, which is what the scenario asks for."
      - label: "Amazon API Gateway"
        explanation: "API Gateway is the front door for APIs to backends such as Lambda; it is not a CDN for caching images and videos."
      - label: "Amazon Route 53"
        explanation: "Route 53 translates domain names and routes traffic, but it does not keep copies of content close to users."
practice:
  - prompt: "A digital bank in Mexico City launched a new version of its site and wants Amazon Route 53 to send only 10% of traffic to the new version and 90% to the current one to test it. Which routing policy should it use?"
    options:
      - label: "Latency"
        explanation: "Latency sends each user to the Region with the lowest latency; it does not let you set a 90% / 10% split between versions."
      - label: "Weighted"
        explanation: "Weighted splits traffic in defined proportions, such as 90% / 10%, ideal for testing a new version."
        correct: true
      - label: "Geolocation"
        explanation: "Geolocation decides based on the user's location, not on a percentage of traffic between two versions."
      - label: "Simple"
        explanation: "Simple is used when a single resource serves the domain; it does not split traffic in proportions."
  - prompt: "A streaming platform in Santiago deploys its application in several AWS Regions and wants Route 53 to send each user to the Region that responds to them fastest. Which routing policy should it use?"
    options:
      - label: "Geolocation"
        explanation: "Geolocation decides by the user's country or location, not by which Region responds fastest."
      - label: "Multivalue answer"
        explanation: "Multivalue answer responds with several healthy records chosen at random, without considering latency to each Region."
      - label: "Failover"
        explanation: "Failover sets up an active-passive scheme for when the primary resource fails; it does not choose the fastest Region for each user."
      - label: "Latency"
        explanation: "Latency sends the user to the Region with the lowest latency when you have resources in multiple Regions."
        correct: true
  - prompt: "A marketing agency in Guayaquil wants to buy its new client's domain, connect that domain to the client's website, and be alerted if the web server stops responding. Which service covers all three needs?"
    options:
      - label: "Amazon Route 53"
        explanation: "Route 53 combines domain registration, DNS routing, and health checks that verify whether a resource responds and can alert you when it fails."
        correct: true
      - label: "Amazon CloudFront"
        explanation: "CloudFront is a CDN that caches content in edge locations; it does not register domain names."
      - label: "AWS Global Accelerator"
        explanation: "Global Accelerator provides static IPs and accelerates TCP/UDP traffic; it does not buy or manage domain names."
      - label: "Amazon API Gateway"
        explanation: "API Gateway manages REST, HTTP, and WebSocket APIs; it does not register domains or connect a name to a website through DNS."
  - prompt: "An insurance company in Asunción wants to expose a REST API for its mobile app, with AWS Lambda functions as the backend, access control with Amazon Cognito, and request traffic management. Which service should it put in place as the front door?"
    options:
      - label: "Amazon CloudFront"
        explanation: "CloudFront is a CDN for caching content close to the user; it is not the managed service for creating, publishing, and authorizing APIs."
      - label: "AWS Global Accelerator"
        explanation: "Global Accelerator accelerates TCP/UDP traffic with static IPs; it does not handle authorization or versioning for an API."
      - label: "Amazon API Gateway"
        explanation: "API Gateway is the managed front door for REST, HTTP, and WebSocket APIs: it handles traffic, authorization with IAM or Cognito, and versions, and it integrates with Lambda."
        correct: true
      - label: "Amazon Route 53"
        explanation: "Route 53 resolves the domain name, but it does not authorize or control the calls the API receives."
  - prompt: "A handicrafts store in Oaxaca has a primary site and a backup site. It wants Route 53 to send all traffic to the primary and only send it to the backup if the primary fails. Which routing policy should it use?"
    options:
      - label: "Weighted"
        explanation: "Weighted splits traffic in fixed proportions between resources; it does not wait for the primary to fail before using the backup."
      - label: "Failover"
        explanation: "Failover sets up an active-passive scheme: traffic goes to the primary and, if it fails, moves to the backup."
        correct: true
      - label: "Latency"
        explanation: "Latency chooses the Region with the lowest latency for each user; it does not define a primary resource and a backup."
      - label: "Multivalue answer"
        explanation: "Multivalue answer returns several healthy records at random, instead of reserving one just for when the primary fails."
  - prompt: "A user in Rosario requests an image from an Amazon CloudFront distribution, and that image is not yet cached at the nearest edge location. What does CloudFront do?"
    options:
      - label: "It fetches it from the origin, delivers it to the user, and caches it"
        explanation: "When the file is not cached, CloudFront fetches it from the origin, such as an S3 bucket, delivers it, and caches it for subsequent requests."
        correct: true
      - label: "It returns an error until the administrator copies the image to the edge location"
        explanation: "CloudFront fetches content from the origin defined in the distribution; there is no need to copy files by hand to each edge location."
      - label: "It sends the request to AWS Global Accelerator so it can cache the image"
        explanation: "Global Accelerator does not cache content; caching in edge locations is a CloudFront feature."
      - label: "It uses Route 53 to redirect the user directly to another Region"
        explanation: "Route 53 routes through DNS, but a request for a file in a distribution is handled by CloudFront, which fetches it from the origin."
---

## Why does it matter?

An online store in Bogotá sells in Colombia, Mexico, and Chile. Its customers type `tienda.com.co` into the browser and expect the page to load quickly, even though the images are stored in a single AWS Region. In addition, the mobile app checks prices through an API, and a promotional video game needs low-latency UDP connections.

Four needs, four services: **Amazon Route 53** translates the domain name and decides where to send the user, **Amazon CloudFront** brings the content closer, **AWS Global Accelerator** speeds up network traffic over the AWS global network, and **Amazon API Gateway** receives and protects calls to the API.

## Amazon Route 53: the AWS DNS

**DNS** (*Domain Name System*) is the "phone book" of the internet: it turns a name like `example.com` into the server's IP address. **Amazon Route 53** is a highly available and scalable DNS service that performs three functions, which you can use in any combination:

1. **Domain registration**: you buy and manage domain names.
2. **DNS routing**: when someone types your domain, Route 53 connects their browser to your website or application.
3. **Health checks**: it sends automated requests to a resource, such as a web server, to verify that it responds. It can notify you when it fails and **route traffic away** from unhealthy resources.

When you create a record you choose a **routing policy**, which defines how Route 53 responds:

| Policy | Use it when… |
| --- | --- |
| Simple | A single resource serves the domain |
| Failover | You want an active-passive setup: if the primary fails, traffic goes to the backup |
| Geolocation | You want to route based on the **user's** location (for example, content per country) |
| Geoproximity | You want to route based on the location of your **resources** and shift traffic between them |
| Latency | You have resources in several Regions and want to send the user to the one with the lowest latency |
| IP-based | You know the source IP ranges of your users |
| Multivalue answer | You want to respond with several healthy records chosen at random |
| Weighted | You want to split traffic in proportions (for example, 90% / 10% to test a new version) |

## Amazon CloudFront: the AWS CDN

A **CDN** (*Content Delivery Network*) keeps copies of content close to users. **Amazon CloudFront** speeds up the distribution of static and dynamic content (HTML, CSS, JavaScript, images, video) through a worldwide network of data centers called **edge locations**, also called *points of presence*.

How it works:

- You define an **origin**, which stores the definitive version of the content: an Amazon S3 bucket, an HTTP server, or an EC2 instance, for example.
- You create a **distribution** that specifies which origin to fetch the files from.
- When a user requests a file, the request goes to the edge location with the **lowest latency**. If the file is already **cached** there, it is delivered immediately; if not, CloudFront fetches it from the origin and caches it.
- Requests travel over the AWS *backbone* network, which reduces the number of hops across the internet.

Benefits of edge locations: lower latency, higher transfer speeds, and more availability, because there are copies in many places around the world. The number of edge locations changes frequently; check the official global infrastructure page.

## AWS Global Accelerator vs. CloudFront

**AWS Global Accelerator** improves the performance and availability of applications for global users. It gives you **static IP addresses** (anycast) that act as a fixed entry point; traffic enters the AWS network at the nearest edge location and travels over the AWS global network to the most suitable healthy endpoint (Application Load Balancer, Network Load Balancer, EC2 instances, or Elastic IP) in one or more Regions.

Both services use the AWS global network and edge locations, and both integrate with AWS Shield for DDoS protection, but they solve different problems:

| | Amazon CloudFront | AWS Global Accelerator |
| --- | --- | --- |
| Main idea | CDN: **caches** content close to the user | Accelerates TCP/UDP traffic by forwarding packets from the edge |
| Typical traffic | HTTP/HTTPS: websites, images, video, APIs | Gaming (UDP), IoT (MQTT), voice over IP, or HTTP that needs fixed IPs |
| Entry point | The distribution's domain name | Static IP addresses |
| Key advantage | Cached content, less load on the origin | Fast, deterministic regional failover |

## Amazon API Gateway: the front door to your APIs

An **API** (*Application Programming Interface*) lets one application request data or actions from another. **Amazon API Gateway** is a managed service for creating, publishing, maintaining, monitoring, and securing **REST, HTTP, and WebSocket APIs** at any scale. AWS describes it as the **"front door"** for applications to access data and logic in your backends, such as **AWS Lambda** functions or workloads on EC2.

API Gateway handles traffic management, authorization and access control (for example, with IAM or Amazon Cognito), monitoring with CloudWatch, and API versioning. Together with Lambda, it forms the visible part of *serverless* applications.

## Common exam traps

- **Thinking Route 53 is only DNS.** It also registers domains and runs health checks to route traffic away.
- **Confusing Geolocation with Latency.** Geolocation decides by the user's location; Latency, by the Region with the best response time.
- **Choosing CloudFront for a UDP game or when static IPs are required.** The answer is **Global Accelerator**.
- **Believing Global Accelerator caches content.** It does not; caching belongs to CloudFront.
- **Confusing API Gateway with a load balancer.** API Gateway manages APIs (authorization, traffic control, versions); a load balancer distributes traffic across instances.

## Exam summary

- Route 53 = DNS + domain registration + health checks.
- Routing policies decide the response: simple, failover, geolocation, geoproximity, latency, IP-based, multivalue, and weighted.
- CloudFront = CDN that caches content in edge locations; the origin can be S3 or an HTTP server.
- Edge locations reduce latency for end users.
- Global Accelerator = static anycast IPs + the AWS global network for TCP/UDP, no caching.
- Keywords: "cache" or "static content" → CloudFront; "static IPs" or "UDP" → Global Accelerator.
- API Gateway = managed front door for REST, HTTP, and WebSocket APIs, widely used with Lambda.
