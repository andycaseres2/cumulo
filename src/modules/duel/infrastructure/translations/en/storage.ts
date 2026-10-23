import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const storageFamily: ServiceFamily = {
  id: 'storage',
  title: 'Storage: block, file, or object',
  summary:
    'Ask how the data is used: an instance disk (block), a shared folder (file), objects over HTTPS, a bridge to your data center, or centralized backup.',
  services: [
    { name: 'Amazon S3', summary: 'Object storage in buckets that scales with no practical limit and is accessed over HTTPS or an API.' },
    { name: 'Amazon EBS', summary: 'Block volumes for EC2 instances in the same AZ: boot disks and database disks.' },
    { name: 'Amazon EFS', summary: 'Elastic, shared NFS file system for Linux, mountable from many instances and AZs.' },
    { name: 'Amazon FSx', summary: 'Specialized managed file systems: Windows File Server (SMB), Lustre (HPC), ONTAP, OpenZFS.' },
    { name: 'AWS Storage Gateway', summary: 'Hybrid bridge: your on-premises servers use storage in AWS as files, volumes, or tapes.' },
    { name: 'AWS Backup', summary: 'Central backup and retention policies for EBS, EFS, RDS, DynamoDB, FSx, S3, and more.' },
  ],
  cards: [
    {
      id: 'storage-1',
      prompt:
        'A handicrafts shop in Cusco wants to store millions of product photos, serve them over HTTPS to its website, and pay only for what it stores, without reserving capacity. Which service does it use?',
      options: [
        { service: 'Amazon EBS', why: 'EBS is a block disk attached to an instance; it does not serve files over HTTPS on its own, and you pay for what you provision.' },
        { service: 'Amazon S3', why: 'S3 is object storage: it holds any number of files, is accessed over HTTPS or an API, and charges only for what you use.' },
        { service: 'Amazon EFS', why: 'EFS is a file system mounted by Linux servers; to serve photos to a website without servers, an object store is simpler.' },
        { service: 'Amazon FSx', why: 'FSx offers managed file systems for workloads like Windows or HPC; it is not the choice for storing and serving web objects.' },
      ],
      answer: 'Amazon S3',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-2',
      prompt:
        'A clinic in Medellín runs PostgreSQL on a single virtual instance. It needs a low-latency disk for that instance that keeps the data even if the instance is stopped. What does it use?',
      options: [
        { service: 'Amazon EFS', why: 'EFS is a network-shared file system; for the disk of a database on a single instance, a block volume is the right fit.' },
        { service: 'Amazon S3', why: 'S3 stores objects accessed through an API; it is not mounted as the disk where a database engine writes its blocks.' },
        { service: 'Amazon EBS', why: 'EBS provides block volumes used as the instance disk, ideal for databases, and they persist independently of the instance lifetime.' },
      ],
      answer: 'Amazon EBS',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-3',
      prompt:
        'A school in Quito has Linux instances in several Availability Zones that must read and write the same files at once, on a file system that grows automatically. What does it choose?',
      options: [
        { service: 'Amazon EBS', why: 'An EBS volume attaches to instances in its own AZ; it is not a file system shared across zones.' },
        { service: 'Amazon FSx', why: 'FSx for Windows File Server uses SMB for Windows; for Linux with NFS that grows automatically, the general-purpose choice is EFS.' },
        { service: 'Amazon EFS', why: 'EFS is an NFS file system for Linux, shared across many instances and AZs, that grows and shrinks automatically as files change.' },
        { service: 'Amazon S3', why: 'S3 stores objects accessed through an API; mounting it as files requires the separate S3 Files layer. The go-to elastic NFS file system for Linux is EFS.' },
      ],
      answer: 'Amazon EFS',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-4',
      prompt:
        'An accounting firm in Bogotá wants to move its Windows file server to the cloud: SMB shared folders, Active Directory users, and Windows permissions. Which service does it use?',
      options: [
        { service: 'Amazon EFS', why: 'EFS uses NFS and AWS does not support it with Windows instances; it does not offer SMB shares with Active Directory.' },
        { service: 'Amazon FSx', why: 'FSx for Windows File Server provides managed Windows file servers, with SMB, Active Directory integration, and Windows ACLs.' },
        { service: 'Amazon S3', why: 'S3 stores objects with IAM permissions and bucket policies; it is not an SMB share with Windows permissions.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway lets on-premises servers use storage in AWS; here they want the managed file server in the cloud.' },
      ],
      answer: 'Amazon FSx',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-5',
      prompt:
        'A factory in Monterrey keeps its on-premises servers and wants its applications to save files to the cloud over NFS or SMB, with a local cache for what they use most. What does it choose?',
      options: [
        { service: 'Amazon S3', why: 'S3 can be the final destination, but on-premises applications cannot mount it over NFS or SMB without something acting as a bridge.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway connects on premises to AWS: S3 File Gateway presents NFS or SMB shares backed by S3 and caches frequently used data.' },
        { service: 'Amazon EFS', why: 'EFS is a file system inside AWS; it does not install a local appliance with a cache that translates files to the cloud.' },
        { service: 'AWS Backup', why: 'AWS Backup schedules and retains backups; it does not present file shares to on-premises applications.' },
      ],
      answer: 'AWS Storage Gateway',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-6',
      prompt:
        'A credit union in Asunción wants to stop buying physical tapes for its backups, without changing the backup software it already uses. The tapes must live in AWS. What does it use?',
      options: [
        { service: 'AWS Backup', why: 'AWS Backup centralizes backups of AWS resources; it does not emulate a tape library for on-premises backup software.' },
        { service: 'AWS Storage Gateway', why: 'Tape Gateway, part of Storage Gateway, replaces physical tapes with virtual tapes in AWS, and the backup software stays the same.' },
        { service: 'Amazon S3', why: 'S3 stores the data, but the on-premises backup software expects a tape library, and a gateway is what presents one.' },
        { service: 'Amazon EBS', why: 'EBS is a disk for EC2 instances; it has nothing to do with tapes in an on-premises data center.' },
      ],
      answer: 'AWS Storage Gateway',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-7',
      prompt:
        'A pharmacy chain in Lima wants a single policy that backs up its volumes, file systems, and RDS databases every night, keeps them for 35 days, and copies them to another Region. What does it use?',
      options: [
        { service: 'Amazon EBS', why: 'EBS snapshots back up volumes, but they do not cover databases or file systems under one central policy.' },
        { service: 'AWS Backup', why: 'AWS Backup defines backup plans with schedules and retention for many services at once, and can copy backups to another Region.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway connects on-premises servers to AWS; it does not schedule backups of resources already in AWS.' },
        { service: 'Amazon S3', why: 'S3 can store copies, but it does not schedule or retain backups of volumes and databases on its own.' },
      ],
      answer: 'AWS Backup',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-8',
      prompt:
        'A university in Córdoba has many accounts in AWS Organizations and wants to apply the same backup plan across all of them, with reports to audit compliance. Which service does it use?',
      options: [
        { service: 'AWS Backup', why: 'AWS Backup applies backup policies to every account in AWS Organizations, and its Audit Manager reports on compliance.' },
        { service: 'Amazon S3', why: 'S3 stores objects; it does not manage backup plans across accounts or audit whether each resource was backed up.' },
        { service: 'Amazon FSx', why: 'FSx backs up its own file systems, but it does not govern backups for every service and account.' },
      ],
      answer: 'AWS Backup',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-9',
      prompt:
        'A startup in Guadalajara wants to publish its static website (HTML, CSS, and images) without managing any server, paying for what it stores and transfers. Where does it host it?',
      options: [
        { service: 'Amazon S3', why: 'S3 can host a static website directly from a bucket, with no servers to manage.' },
        { service: 'Amazon EBS', why: 'EBS needs an instance to attach to, and that instance is exactly the server the startup does not want to manage.' },
        { service: 'Amazon EFS', why: 'EFS is mounted from servers or containers; it does not publish a website by itself.' },
      ],
      answer: 'Amazon S3',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-10',
      prompt:
        'A delivery app in Santiago has serverless functions and containers that must share the same files with POSIX permissions on a native file system, with no layers on top of a bucket and no capacity to provision. Which storage does it choose?',
      options: [
        { service: 'Amazon EFS', why: 'EFS is serverless, elastic file storage, mountable from EC2, ECS, EKS, Lambda, and Fargate, with POSIX permissions.' },
        { service: 'Amazon EBS', why: 'EBS attaches to EC2 instances in one AZ; serverless functions do not mount EBS volumes.' },
        { service: 'Amazon FSx', why: 'FSx offers specialized file systems (Windows, Lustre, ONTAP, OpenZFS); for sharing files from functions and containers, EFS is the direct fit.' },
        { service: 'Amazon S3', why: 'S3 is object storage; mounting it as files requires the separate S3 Files layer, and a native file system is required here.' },
      ],
      answer: 'Amazon EFS',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-11',
      prompt:
        'A research center in Campinas runs HPC simulations on hundreds of Linux instances and needs a parallel file system with sub-millisecond latency and extremely high throughput. What does it use?',
      options: [
        { service: 'Amazon EFS', why: 'EFS is a general-purpose shared file system; for HPC that calls for a parallel file system, the specialized option is a different one.' },
        { service: 'Amazon FSx', why: 'FSx for Lustre is the high-performance file system for HPC, machine learning, and video, with sub-millisecond latencies.' },
        { service: 'Amazon EBS', why: 'EBS is a volume for one instance, not a parallel file system shared by hundreds of instances.' },
      ],
      answer: 'Amazon FSx',
      topicSlug: 'hybrid-storage-and-backup',
    },
    {
      id: 'storage-12',
      prompt:
        'A distributor in Arequipa needs the operating system and data volume for the single instance running its ERP, and wants to grow it as needed without stopping the instance. What does it use?',
      options: [
        { service: 'Amazon EFS', why: 'EFS is a network-shared folder; it does not work as the boot volume for the instance operating system.' },
        { service: 'Amazon S3', why: 'S3 stores objects through an API; it is not used as the operating system disk of an instance.' },
        { service: 'Amazon EBS', why: 'EBS is the block disk of the instance, works as a boot volume, and with Elastic Volumes can grow without stopping it.' },
        { service: 'Amazon FSx', why: 'FSx provides network-shared file systems; it is not the boot disk of an instance.' },
      ],
      answer: 'Amazon EBS',
      topicSlug: 'ec2-compute',
    },
    {
      id: 'storage-13',
      prompt:
        'A bus company in La Paz stores gigabytes of GPS logs every day to analyze later. It wants eleven nines of durability and capacity it never has to plan. What does it use?',
      options: [
        { service: 'Amazon EBS', why: 'EBS is provisioned at a fixed size for one instance; it is not a repository that grows without capacity planning.' },
        { service: 'Amazon EFS', why: 'EFS is for files shared between servers; for accumulating data to analyze later, an object store is cheaper and simpler.' },
        { service: 'Amazon S3', why: 'S3 is designed for 99.999999999% durability, grows without capacity planning, and is the usual foundation of a data lake.' },
        { service: 'AWS Storage Gateway', why: 'Storage Gateway is a bridge from on-premises servers; the bus data can go straight to a store in the cloud.' },
      ],
      answer: 'Amazon S3',
      topicSlug: 's3-ebs-efs-storage',
    },
    {
      id: 'storage-14',
      prompt:
        'Two Linux web servers behind a load balancer in Cali must see the same images that users upload, mounted as a common folder on both. Which storage do they use?',
      options: [
        { service: 'Amazon EBS', why: 'An EBS volume usually attaches to a single instance; Multi-Attach exists only for some types and is not a shared file system.' },
        { service: 'Amazon EFS', why: 'EFS is an NFS file system that several Linux servers mount at once, so both see the same files.' },
        { service: 'AWS Backup', why: 'AWS Backup backs up and retains data; it does not offer a shared folder for the servers to work in.' },
      ],
      answer: 'Amazon EFS',
      topicSlug: 's3-ebs-efs-storage',
    },
  ],
};
