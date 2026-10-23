---
title: "Amazon EC2 and instance types"
summary: "What Amazon EC2 is, what an AMI is, and how to choose the right instance family (general purpose, compute, memory, accelerated, storage, or HPC)."
domain: "technology-services"
order: 3
examTasks: ["3.3"]
services: ["Amazon EC2", "Amazon EBS"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html"
  - "https://aws.amazon.com/ec2/instance-types/"
  - "https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html"
quiz:
  - prompt: "A pharmacy chain in Santiago processes thousands of digitized prescriptions in batches every night, with very heavy CPU use. Which EC2 instance family should it choose?"
    options:
      - label: "General purpose"
        explanation: "The general purpose family balances compute, memory, and networking; you choose it when the scenario does not emphasize one resource, and here the CPU stands out."
      - label: "Compute optimized"
        explanation: "Compute optimized instances use high-performance processors and are typical for CPU-heavy batch processing."
        correct: true
      - label: "Memory optimized"
        explanation: "Memory optimized instances are for large datasets in memory; the scenario calls for CPU-intensive processing."
      - label: "Storage optimized"
        explanation: "Storage optimized instances prioritize fast I/O on local storage; the bottleneck here is the CPU."
  - prompt: "A software company in Monterrey wants to launch 20 identical EC2 instances, all with the same operating system and the same software already installed. Which EC2 component defines that operating system and software?"
    options:
      - label: "The instance type"
        explanation: "The instance type defines the hardware (CPU, memory, storage, and networking); it does not define the operating system or software."
      - label: "The security group"
        explanation: "The security group is a virtual firewall that controls which traffic reaches the instance; it does not contain the operating system."
      - label: "The key pair"
        explanation: "The key pair is the credentials for logging in securely; it does not define the instance's software."
      - label: "The AMI (Amazon Machine Image)"
        explanation: "The AMI is a preconfigured template with the operating system and software; with the same AMI you launch many identical instances."
        correct: true
  - prompt: "An IT team in Cali launches an Amazon EC2 instance for its website. Who is responsible for applying operating system patches on that instance?"
    options:
      - label: "The customer, because EC2 is IaaS and gives full control of the operating system"
        explanation: "In EC2 you configure, update, and secure the operating system; that is why EC2 is an example of infrastructure as a service (IaaS)."
        correct: true
      - label: "AWS, because EC2 is a fully managed service"
        explanation: "EC2 is not a managed service where AWS patches your operating system; that is a classic exam trap."
      - label: "AWS, as long as the instance is a general purpose type"
        explanation: "The instance family only defines the hardware; it does not change who is responsible for patching the operating system."
      - label: "AWS, because the AMI updates itself on each instance"
        explanation: "The AMI is a template for launching instances; once the instance is launched, maintaining the operating system is your responsibility."
practice:
  - prompt: "A food distributor in Barranquilla uses a database that keeps the complete inventory of all its warehouses in memory to answer queries instantly. Which EC2 instance family is the best fit?"
    options:
      - label: "Compute optimized"
        explanation: "Compute optimized instances prioritize high-performance processors for CPU-intensive workloads; the clue here is the in-memory database."
      - label: "Storage optimized"
        explanation: "Storage optimized instances prioritize fast I/O on local storage; the scenario emphasizes data that lives in memory."
      - label: "Memory optimized"
        explanation: "Memory optimized instances deliver fast performance with large datasets in memory, such as in-memory databases."
        correct: true
      - label: "General purpose"
        explanation: "The general purpose family balances compute, memory, and networking; you choose it when no resource stands out, and here memory stands out."
  - prompt: "The data science team at a fintech in São Paulo wants to train a machine learning model using GPUs. Which EC2 instance family should it choose?"
    options:
      - label: "Accelerated computing"
        explanation: "The accelerated computing family uses hardware accelerators such as GPUs and is the right choice for machine learning and graphics processing."
        correct: true
      - label: "Memory optimized"
        explanation: "Memory optimized instances are for large datasets in memory; they do not provide the GPUs the scenario calls for."
      - label: "Storage optimized"
        explanation: "Storage optimized instances offer low-latency I/O on local storage; they are not chosen for their GPUs."
      - label: "General purpose"
        explanation: "The general purpose family balances compute, memory, and networking; the GPU clue points to a family with hardware accelerators."
  - prompt: "A hospital in Rosario stores its clinical application data on an EC2 instance's storage. It needs that data to remain available even if the instance is stopped. Which type of storage should it use?"
    options:
      - label: "Instance store volumes"
        explanation: "Instance store is temporary storage that is erased when the instance is stopped, hibernated, or terminated; it is not suitable for important data."
      - label: "Amazon EBS volumes"
        explanation: "Amazon EBS volumes are persistent storage for the instance's data, so they keep the information when the instance is stopped."
        correct: true
      - label: "The key pair"
        explanation: "The key pair is the credentials for logging in to the instance securely; it does not store application data."
      - label: "The AMI (Amazon Machine Image)"
        explanation: "The AMI is a template with the operating system and software for launching instances; it is not the place to store data that changes every day."
  - prompt: "An online store in Tegucigalpa notices that its only EC2 instance is running short on CPU and memory, and decides to change it to a larger instance type. What is this type of scaling called?"
    options:
      - label: "Horizontal scaling"
        explanation: "Horizontal scaling means adding or removing instances; here the capacity of the same instance is being changed."
      - label: "Changing the AMI"
        explanation: "Changing the AMI modifies the instance's operating system and software; it does not give it more CPU or memory."
      - label: "Expanding the security group"
        explanation: "The security group is a virtual firewall that controls traffic to the instance; it does not change its compute capacity."
      - label: "Vertical scaling"
        explanation: "Changing the instance type to give the same instance more or less capacity is vertical scaling (scale up/down)."
        correct: true
  - prompt: "A telecommunications company in Caracas processes data streams with a very large number of reads and writes on local storage, and needs low-latency, high-throughput I/O. Which EC2 instance family is the best fit?"
    options:
      - label: "Accelerated computing"
        explanation: "Accelerated computing uses GPUs and other accelerators for calculations and graphics; the clue in the scenario is I/O on local storage."
      - label: "Storage optimized"
        explanation: "Storage optimized instances offer low-latency, high-throughput I/O on large local datasets, such as data processing and streaming."
        correct: true
      - label: "Compute optimized"
        explanation: "Compute optimized instances prioritize high-performance processors; the bottleneck here is local reads and writes."
      - label: "General purpose"
        explanation: "General purpose balances compute, memory, and networking; the scenario clearly emphasizes I/O on local storage."
  - prompt: "A climate research center in Mendoza runs complex, large-scale simulations and is looking for the best price performance for high performance computing. Which EC2 instance family should it choose?"
    options:
      - label: "General purpose"
        explanation: "General purpose balances compute, memory, and networking for workloads such as web servers; it is not geared toward high-performance simulations at scale."
      - label: "Storage optimized"
        explanation: "Storage optimized instances focus on I/O on local data; the scenario calls for high performance computing for simulations."
      - label: "Memory optimized"
        explanation: "Memory optimized instances are for large datasets in memory; large-scale simulations point to a different family."
      - label: "HPC optimized"
        explanation: "HPC optimized instances offer the best price performance for running high performance computing at scale, such as complex simulations."
        correct: true
---

## Why does it matter?

A pharmacy chain in Santiago needs several servers: one for its website, another to process thousands of digitized prescriptions every night, a database that keeps the inventory of all its branches in memory, and a data science team that wants to train a machine learning model with GPUs.

Instead of buying four types of physical servers, it can launch **Amazon EC2 instances** in minutes with the right hardware for each task, and turn them off when it no longer needs them. The exam will ask you to recognize which instance type matches each workload.

## What is Amazon EC2?

**Amazon Elastic Compute Cloud (Amazon EC2)** provides **scalable, on-demand compute capacity** in the AWS Cloud. You can launch as many or as few **virtual servers** as you need, configure their security and networking, and manage their storage. If demand goes up, you add capacity; if it goes down, you reduce it.

Basic concepts:

- **Instance:** a virtual server in the AWS Cloud.
- **AMI** (*Amazon Machine Image*): a **preconfigured template** with the components your server needs, including the **operating system** and additional software. You launch instances from an AMI, and you can use the same AMI to launch many identical instances.
- **Instance type:** the combination of CPU, memory, storage, networking capacity, and graphics hardware the instance will have.
- **Amazon EBS volumes:** persistent storage for your data.
- ***Instance store* volumes:** temporary storage that is erased when the instance is stopped, hibernated, or terminated.
- **Key pair:** credentials for logging in securely; AWS stores the public key and you store the private key.
- **Security group:** a virtual firewall that defines which traffic can reach the instance.

With EC2 you have **full control** of the operating system: you configure it, update it, and secure it. That is why it is an example of **IaaS** (infrastructure as a service).

## Instance families

AWS groups instance types into **families** according to the resource they prioritize. The name of a type (for example, `m7g.large`) indicates the family, the generation, and the size.

| Family | What it prioritizes | Typical workloads |
| --- | --- | --- |
| **General purpose** | Balance of compute, memory, and networking | Web servers, code repositories, small and medium databases |
| **Compute optimized** | High-performance processors | Batch processing, media transcoding, dedicated game servers |
| **Memory optimized** | Fast performance with large datasets in memory | In-memory databases, data analytics, enterprise applications |
| **Accelerated computing** | Hardware accelerators or co-processors (for example, GPUs) | Floating-point calculations, graphics processing, data pattern matching, machine learning |
| **Storage optimized** | Low-latency, high-throughput I/O on large local datasets | High-performance databases, data processing and *streaming* |
| **HPC optimized** | The best price performance for high performance computing at scale | Complex simulations, deep learning, visual effects rendering |

How to think about it on the exam:

- If the scenario does not emphasize any particular resource → **general purpose**.
- "Heavy CPU processing" or "video transcoding" → **compute optimized**.
- "Large volumes of data in memory" or "in-memory database" → **memory optimized**.
- "GPU", "graphics", or "machine learning" → **accelerated computing**.
- "Lots of reads and writes on local storage" → **storage optimized**.
- "Large-scale simulations" or "HPC" → **HPC optimized**.

If your needs change, you can change the instance type. This is **vertical scaling** (*scale up/down*): giving the same instance more or less capacity. Horizontal scaling (adding or removing instances) is explained in the elasticity with Auto Scaling topic.

## And how do you pay?

EC2 has several purchase options (On-Demand, Savings Plans, Reserved Instances, Spot Instances, Dedicated Hosts, and others). They are explained in detail in the **EC2 purchase options** topic. Here it is enough to remember that On-Demand Instances are billed per second of use (with a 60-second minimum), with no long-term commitments.

## Common exam traps

- **Confusing the AMI with the instance type.** The AMI defines the **software** (operating system and applications); the instance type defines the **hardware** (CPU, memory, networking).
- **Choosing "compute optimized" when the problem is memory.** Read the clue: "in memory" points to the memory optimized family.
- **Choosing "storage optimized" to keep files long term.** That family is for fast I/O on local storage; to store files, think Amazon S3 or EBS.
- **Storing important data on *instance store*.** That storage is temporary and is lost when the instance is stopped or terminated; for persistence, use EBS.
- **Thinking EC2 is a managed service where AWS patches your operating system.** In EC2, the operating system is your responsibility.

## Exam summary

- EC2 = scalable, on-demand virtual servers (IaaS).
- AMI = template with the operating system and software for launching instances.
- Instance type = combination of CPU, memory, storage, and networking.
- General purpose = balance; compute = CPU-intensive; memory = data in memory.
- Accelerated computing = GPUs and accelerators; storage = fast local I/O; HPC = large-scale simulations.
- Changing the instance type = vertical scaling.
- EBS = persistent storage; instance store = temporary.
- Purchase options are covered in the EC2 purchase options topic.
