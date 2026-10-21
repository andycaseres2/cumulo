export interface ServiceCategory {
  category: string;
  services: string[];
}

/**
 * In-scope services and features of the live CLF-C02 guide, with canonical names.
 * Source: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-in-scope-services.html
 */
export const IN_SCOPE_SERVICES: readonly ServiceCategory[] = [
  {
    category: 'Analytics',
    services: ['Amazon Athena', 'Amazon EMR', 'AWS Glue', 'Amazon Kinesis', 'Amazon OpenSearch Service', 'Amazon Quick Sight', 'Amazon Redshift'],
  },
  { category: 'Application Integration', services: ['Amazon EventBridge', 'Amazon SNS', 'Amazon SQS', 'AWS Step Functions'] },
  { category: 'Business Applications', services: ['Amazon Connect', 'Amazon SES'] },
  {
    category: 'Cloud Financial Management',
    services: ['AWS Budgets', 'AWS Cost and Usage Reports', 'AWS Cost Explorer', 'AWS Marketplace'],
  },
  { category: 'Compute', services: ['AWS Batch', 'Amazon EC2', 'AWS Elastic Beanstalk', 'Amazon Lightsail', 'AWS Outposts'] },
  { category: 'Containers', services: ['Amazon ECR', 'Amazon ECS', 'Amazon EKS'] },
  { category: 'Customer Enablement', services: ['AWS Support'] },
  {
    category: 'Database',
    services: ['Amazon Aurora', 'Amazon DocumentDB', 'Amazon DynamoDB', 'Amazon ElastiCache', 'Amazon Neptune', 'Amazon RDS'],
  },
  { category: 'Developer Tools', services: ['AWS CLI', 'AWS CodeBuild', 'AWS CodePipeline', 'AWS X-Ray'] },
  { category: 'End User Computing', services: ['Amazon AppStream 2.0', 'Amazon WorkSpaces', 'Amazon WorkSpaces Secure Browser'] },
  { category: 'Frontend Web and Mobile', services: ['AWS Amplify'] },
  { category: 'Internet of Things', services: ['AWS IoT Core'] },
  {
    category: 'Machine Learning',
    services: [
      'Amazon Comprehend',
      'Amazon Lex',
      'Amazon Polly',
      'Amazon Q',
      'Amazon Rekognition',
      'Amazon SageMaker AI',
      'Amazon Textract',
      'Amazon Transcribe',
      'Amazon Translate',
    ],
  },
  {
    category: 'Management and Governance',
    services: [
      'AWS Auto Scaling',
      'AWS CloudFormation',
      'AWS CloudTrail',
      'Amazon CloudWatch',
      'AWS Compute Optimizer',
      'AWS Config',
      'AWS Control Tower',
      'AWS Health Dashboard',
      'AWS License Manager',
      'AWS Management Console',
      'AWS Organizations',
      'AWS Service Catalog',
      'Service Quotas',
      'AWS Systems Manager',
      'AWS Trusted Advisor',
      'AWS Well-Architected Tool',
    ],
  },
  {
    category: 'Migration and Transfer',
    services: [
      'AWS Application Discovery Service',
      'AWS Application Migration Service',
      'AWS DMS',
      'Migration Evaluator',
      'AWS Migration Hub',
      'AWS SCT',
    ],
  },
  {
    category: 'Networking and Content Delivery',
    services: [
      'Amazon API Gateway',
      'Amazon CloudFront',
      'AWS Direct Connect',
      'AWS Global Accelerator',
      'AWS PrivateLink',
      'Amazon Route 53',
      'AWS Transit Gateway',
      'Amazon VPC',
      'AWS Site-to-Site VPN',
      'AWS Client VPN',
    ],
  },
  {
    category: 'Security, Identity, and Compliance',
    services: [
      'AWS Artifact',
      'AWS Certificate Manager',
      'AWS CloudHSM',
      'Amazon Cognito',
      'Amazon Detective',
      'AWS Directory Service',
      'AWS Firewall Manager',
      'Amazon GuardDuty',
      'AWS IAM',
      'AWS IAM Identity Center',
      'Amazon Inspector',
      'AWS KMS',
      'Amazon Macie',
      'AWS RAM',
      'AWS Secrets Manager',
      'AWS Security Hub',
      'AWS Shield',
      'AWS WAF',
    ],
  },
  { category: 'Serverless', services: ['AWS Fargate', 'AWS Lambda'] },
  {
    category: 'Storage',
    services: [
      'AWS Backup',
      'Amazon EBS',
      'Amazon EFS',
      'AWS Elastic Disaster Recovery',
      'Amazon FSx',
      'Amazon S3',
      'Amazon S3 Glacier',
      'AWS Storage Gateway',
    ],
  },
];

export function allInScopeServices(): string[] {
  return IN_SCOPE_SERVICES.flatMap((category) => category.services);
}
