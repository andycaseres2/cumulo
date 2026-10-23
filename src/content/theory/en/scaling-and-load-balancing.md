---
title: "Elasticity: Auto Scaling and Elastic Load Balancing"
summary: "How Amazon EC2 Auto Scaling and AWS Auto Scaling provide elasticity, and what the Elastic Load Balancing load balancers (ALB, NLB, and GWLB) are for."
domain: "technology-services"
order: 4
examTasks: ["3.3"]
services: ["AWS Auto Scaling", "Amazon EC2 Auto Scaling", "Elastic Load Balancing", "Amazon EC2"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"
  - "https://docs.aws.amazon.com/autoscaling/plans/userguide/what-is-a-scaling-plan.html"
  - "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html"
  - "https://aws.amazon.com/elasticloadbalancing/features/"
  - "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html"
  - "https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html"
  - "https://wa.aws.amazon.com/wellarchitected/2020-07-02T19-33-23/wat.concept.elasticity.en.html"
quiz:
  - prompt: "An online store in Mexico City gets a flood of visits during Buen Fin and little traffic in the early morning hours. It wants EC2 instances to be launched when demand rises and terminated when it drops, always between a minimum and a maximum. Which service should it use?"
    options:
      - label: "Application Load Balancer"
        explanation: "The Application Load Balancer distributes traffic among instances, but it does not add or remove servers; Auto Scaling does that."
      - label: "Network Load Balancer"
        explanation: "The Network Load Balancer distributes Layer 4 traffic with extreme performance, but it does not launch or terminate instances based on demand."
      - label: "Amazon EC2 Auto Scaling"
        explanation: "EC2 Auto Scaling uses groups with minimum, maximum, and desired capacity, and scaling policies that launch or terminate instances based on demand."
        correct: true
      - label: "Gateway Load Balancer"
        explanation: "The Gateway Load Balancer is for deploying and scaling virtual appliances such as firewalls, not for adjusting the number of instances for a store."
  - prompt: "A web application in Lima needs to send /pagos requests to one group of servers and /catalogo requests to another, based on the URL path. Which type of load balancer should it use?"
    options:
      - label: "Application Load Balancer (ALB)"
        explanation: "The ALB operates at Layer 7 (HTTP/HTTPS) and supports flexible routing based on the path or content of the request."
        correct: true
      - label: "Network Load Balancer (NLB)"
        explanation: "The NLB operates at Layer 4 (TCP/UDP); routing based on the URL path is an ALB feature."
      - label: "Gateway Load Balancer (GWLB)"
        explanation: "The GWLB is used to deploy and scale network appliances, such as firewalls or intrusion detection systems, not to route by HTTP path."
      - label: "AWS Auto Scaling"
        explanation: "AWS Auto Scaling coordinates scaling for several resources through scaling plans; it does not distribute requests by URL path."
  - prompt: "Which statement best describes elasticity in the cloud?"
    options:
      - label: "Continuing to work even if an Availability Zone fails"
        explanation: "That is high availability: continuing to work in the face of failures, for example by using multiple AZs. Elasticity is about adjusting capacity to demand."
      - label: "Changing an instance to a larger instance type"
        explanation: "That is vertical scaling (scale up). Elasticity means adjusting automatically to demand in both directions."
      - label: "Distributing incoming requests among several targets"
        explanation: "That is what a load balancer does. Distributing traffic does not acquire or release resources based on demand."
      - label: "Acquiring resources when you need them and releasing them when you don't, ideally automatically"
        explanation: "That is the definition of elasticity: growing and also shrinking based on demand, which avoids paying for idle capacity."
        correct: true
practice:
  - prompt: "A payments company in São Paulo processes millions of TCP connections per second and needs a load balancer with extreme performance and a static IP address. Which type of load balancer should it use?"
    options:
      - label: "Application Load Balancer (ALB)"
        explanation: "The ALB operates at Layer 7 with flexible routing based on HTTP content; extreme performance with a static IP is the classic NLB use case."
      - label: "Network Load Balancer (NLB)"
        explanation: "The NLB operates at Layer 4 (TCP/UDP) and is chosen when you need extreme performance or a static IP address."
        correct: true
      - label: "Gateway Load Balancer (GWLB)"
        explanation: "The GWLB is for deploying and scaling virtual appliances such as firewalls, not for distributing TCP connections for a payments application."
      - label: "AWS Auto Scaling"
        explanation: "AWS Auto Scaling coordinates scaling for several resources; it is not a load balancer and does not offer a static IP."
  - prompt: "An internet service provider in Bogotá wants to deploy and scale third-party virtual firewalls and intrusion detection and prevention systems to inspect traffic. Which type of load balancer should it use?"
    options:
      - label: "Application Load Balancer (ALB)"
        explanation: "The ALB distributes HTTP/HTTPS traffic for web applications; it is not designed for deploying network inspection appliances."
      - label: "Network Load Balancer (NLB)"
        explanation: "The NLB provides extreme performance at Layer 4, but deploying and scaling virtual firewalls is the GWLB use case."
      - label: "Amazon EC2 Auto Scaling"
        explanation: "EC2 Auto Scaling adjusts the number of instances; it is not a load balancer for inserting appliances into the traffic path."
      - label: "Gateway Load Balancer (GWLB)"
        explanation: "The GWLB combines a Layer 3 gateway with Layer 4 load balancing to deploy and scale firewalls and intrusion detection and prevention systems."
        correct: true
  - prompt: "A delivery app in Santiago wants to configure, from a single place, the scaling of its Amazon ECS tasks, the read and write capacity of its DynamoDB tables, and its Aurora read replicas. Which service should it use?"
    options:
      - label: "AWS Auto Scaling"
        explanation: "AWS Auto Scaling uses scaling plans to adjust several related resources, such as ECS tasks, DynamoDB tables, and Aurora replicas."
        correct: true
      - label: "Amazon EC2 Auto Scaling"
        explanation: "EC2 Auto Scaling focuses on EC2 instances; coordinating ECS, DynamoDB, and Aurora from a single place belongs to AWS Auto Scaling."
      - label: "Elastic Load Balancing"
        explanation: "ELB distributes incoming traffic among targets; it does not adjust the capacity of DynamoDB tables or Aurora replicas."
      - label: "Application Load Balancer (ALB)"
        explanation: "The ALB routes HTTP/HTTPS requests; it does not scale the capacity of databases or container tasks."
  - prompt: "In an Auto Scaling group at an airline in Panama with a desired capacity of 4 instances, one instance fails its health check. What happens?"
    options:
      - label: "The Application Load Balancer launches a new instance to replace it"
        explanation: "The load balancer stops sending traffic to the unhealthy instance, but it does not launch instances; Auto Scaling does that."
      - label: "The group raises its maximum capacity to make up for the failure"
        explanation: "The maximum capacity is a limit you define; Auto Scaling does not change it because of a failure, it only maintains the desired capacity."
      - label: "EC2 Auto Scaling replaces the instance to maintain the desired capacity"
        explanation: "EC2 Auto Scaling monitors health with health checks and automatically replaces instances that fail to maintain the desired capacity."
        correct: true
      - label: "The group stays at 3 instances until an administrator launches another one by hand"
        explanation: "Auto Scaling automatically replaces unhealthy instances; it does not depend on someone launching a new one."
  - prompt: "An education platform in Quito adds more identical EC2 instances behind its load balancer as the number of connected students grows. What type of scaling is it using?"
    options:
      - label: "Vertical scaling (scale up)"
        explanation: "Vertical scaling gives more capacity to the same instance, for example with a larger type, instead of adding instances."
      - label: "Horizontal scaling (scale out)"
        explanation: "Horizontal scaling adds or removes instances; adding identical instances behind the load balancer is scale out."
        correct: true
      - label: "Vertical scaling (scale down)"
        explanation: "Scale down reduces the capacity of the same instance; here new instances are being added."
      - label: "High availability"
        explanation: "High availability is about continuing to work in the face of failures; adding instances because of more demand is a type of scaling."
  - prompt: "The finance department of an online store in Arequipa asks how much it costs to use Amazon EC2 Auto Scaling. Which answer is correct?"
    options:
      - label: "A fixed monthly charge for each Auto Scaling group"
        explanation: "There is no additional charge for EC2 Auto Scaling; groups do not have their own fee."
      - label: "A charge for each scaling policy that runs"
        explanation: "Scaling policies are not billed separately; you pay only for the resources that are launched."
      - label: "A charge for each instance replaced after a health check"
        explanation: "Replacing instances has no extra charge; you pay for the instances that are running, as with any EC2 instance."
      - label: "There is no additional cost; you pay only for the resources it uses, such as instances, volumes, and alarms"
        explanation: "EC2 Auto Scaling has no additional cost: you pay only for the resources you use, such as instances, volumes, and alarms."
        correct: true
---

## Why does it matter?

An online store in Mexico City gets little traffic in the early morning hours, moderate traffic during the day, and a flood of visits during Buen Fin. If it buys servers for the peak, it pays for idle capacity the rest of the year; if it buys for the average, the store goes down exactly when it sells the most.

The cloud solves this with **elasticity**: adding servers when demand rises, removing them when it drops, and distributing traffic among them automatically. The key pieces are **Auto Scaling** and **Elastic Load Balancing**.

## Elasticity vs scalability

- **Elasticity:** the ability to **acquire resources when you need them and release them when you no longer need them**, ideally automatically. It works in two directions: growing and also shrinking.
- **Scalability:** the ability of a system to **grow** to handle more load. It can be:
  - **Horizontal** (*scale out / scale in*): adding or removing instances.
  - **Vertical** (*scale up / scale down*): giving the same instance more or less capacity (for example, switching to a larger instance type).

A scalable system can grow; an **elastic** system also adjusts automatically to demand in both directions, which avoids paying for idle capacity.

## Amazon EC2 Auto Scaling

**Amazon EC2 Auto Scaling** helps you have the **right number of EC2 instances** to handle your application's load. Instances are organized into **Auto Scaling groups**, which are treated as a logical unit:

- **Minimum capacity:** the group never goes below this number of instances.
- **Maximum capacity:** the group never exceeds this number.
- **Desired capacity:** the number of instances the group should maintain at any given time.
- **Scaling policies**: rules that launch or terminate instances as demand rises or falls, always between the minimum and the maximum.

In addition:

- It **monitors the health** of instances through *health checks* and automatically **replaces** those that fail or are terminated, to maintain the desired capacity.
- It **distributes instances across multiple Availability Zones**, which provides high availability.
- It integrates with Elastic Load Balancing: it registers new instances with the load balancer and removes the ones that are terminated.
- It has no additional cost: you pay only for the resources you use (instances, volumes, alarms).

### AWS Auto Scaling

**AWS Auto Scaling** lets you configure scaling for **multiple related resources** of an application from a single place through **scaling plans**. In addition to EC2 Auto Scaling groups, it can adjust the number of Amazon ECS tasks, the read and write capacity of Amazon DynamoDB tables, Amazon Aurora read replicas, and Spot Fleets. It offers discovery of scalable resources and scaling recommendations.

In short: **EC2 Auto Scaling** focuses on EC2 instances; **AWS Auto Scaling** coordinates scaling across several services.

## Elastic Load Balancing

A **load balancer** distributes incoming requests across several compute resources. Its purposes:

- **Distribute traffic** among several targets (EC2 instances, containers, IP addresses) in one or more Availability Zones.
- **Increase availability and fault tolerance**: with *health checks* it detects unhealthy targets and sends traffic only to healthy ones.
- **Let you add or remove servers** without disrupting the flow of requests, which is essential when Auto Scaling changes the number of instances.
- **Offload encryption and decryption** (TLS/HTTPS) so servers can focus on their work.

**Elastic Load Balancing (ELB)** automatically scales the load balancer's capacity based on incoming traffic. Current types:

| Type | Layer | When to use it |
| --- | --- | --- |
| **Application Load Balancer (ALB)** | Layer 7 (application: HTTP/HTTPS) | Web applications that need flexible routing, for example based on the request's path or content |
| **Network Load Balancer (NLB)** | Layer 4 (transport: TCP/UDP) | Extreme performance or the need for a static IP address |
| **Gateway Load Balancer (GWLB)** | Layer 3 gateway + Layer 4 load balancing | Deploying and scaling virtual appliances, such as firewalls, intrusion detection and prevention systems, or deep packet inspection systems |

The **Classic Load Balancer** is the previous generation; AWS recommends migrating to a current-generation load balancer.

## How they work together

A typical high-availability design: an **ALB** receives user traffic and distributes it among EC2 instances in an **Auto Scaling group** that spans **multiple AZs**. If demand rises, Auto Scaling adds instances and the load balancer starts sending them traffic; if an instance fails, the load balancer stops sending it requests and Auto Scaling replaces it.

## Common exam traps

- **Thinking the load balancer adds servers.** ELB **distributes** traffic; the one that adds or removes instances is **Auto Scaling**.
- **Confusing elasticity with high availability.** Elasticity = adjusting capacity to demand; high availability = continuing to work in the face of failures (multiple AZs). Auto Scaling helps with both.
- **Choosing the NLB to route by URL path.** Routing based on HTTP content is an **ALB** feature (Layer 7).
- **Forgetting about scaling down.** Elasticity also means **releasing** resources so you don't pay for idle capacity.
- **Believing Auto Scaling has its own cost.** There is no additional charge for EC2 Auto Scaling; you pay for the resources it launches.

## Exam summary

- Elasticity = acquiring and releasing resources based on demand, automatically.
- Horizontal = more or fewer instances; vertical = larger or smaller instances.
- EC2 Auto Scaling: groups with minimum, maximum, and desired capacity, and scaling policies.
- Auto Scaling replaces unhealthy instances and spreads them across multiple AZs.
- AWS Auto Scaling coordinates scaling for EC2, ECS, DynamoDB, Aurora replicas, and Spot Fleets.
- ELB distributes traffic, checks the health of targets, and improves availability.
- ALB = Layer 7 (HTTP/HTTPS); NLB = Layer 4, extreme performance and static IP; GWLB = network appliances.
- Auto Scaling + ELB across multiple AZs = an elastic, highly available design.
