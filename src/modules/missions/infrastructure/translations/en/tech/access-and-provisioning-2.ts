import type { Mission } from '../../../../domain/Mission';

/**
 * AgroSensa: an agtech startup from Mendoza, based at the Startup Lab, whose hand-built environments keep drifting apart.
 * Practices infrastructure as code: AWS CloudFormation templates and stacks, the AWS CDK and rebuilding in another Region.
 */
export const accessAndProvisioning2: Mission = {
  id: 'access-and-provisioning-2',
  track: 'tech',
  topicSlug: 'access-and-provisioning',
  buildingId: 'startup-lab',
  title: 'Twin environments',
  client: { name: 'Jimena Ferreyra', role: 'CTO of AgroSensa' },
  intro: [
    "Hi, come on in. I'm Jimena Ferreyra, CTO of AgroSensa. We're a startup from Mendoza: we put sensors in vineyards and tell growers when and how much to irrigate.",
    "We have three environments on AWS: development, testing and production. Each one was built by a different person, by hand in the console, and they don't look anything alike anymore.",
    'Last week something worked perfectly in testing and broke in production, right in the middle of irrigation season. And a fund that wants to invest in us is asking for a plan to rebuild everything if we lose a Region.',
    "I need our infrastructure to stop depending on everyone's memory. Can you help me put it into code?",
  ],
  outro: {
    passed: [
      'We did it: all three environments come from the same template, and the team writes the infrastructure in Python, which is what they know best.',
      "And if we lose a Region, we bring it up in another one with the same templates. The fund is happy. Thank you: at the next grape harvest, the first toast is yours.",
    ],
    failed: [
      "Hmm... with these decisions we'd still have mismatched environments and no plan for the fund.",
      'Review the theory on infrastructure as code and come back whenever you like. We\'ll be waiting for you here at the Startup Lab.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'identical-environments',
      prompt:
        'The urgent part: I need development, testing and production to be identical. I want to describe every resource in files that live in our repository, know who changed what and create them repeatably. What do we use?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'console-checklist',
          label: 'Keep using the console, following a detailed checklist of clicks',
          definition:
            'Manual creation of resources in the AWS web interface, guided by a document with the steps to follow.',
          explanation:
            "Clicks can't be repeated exactly or versioned, and they depend on nobody making a mistake. That's what pulled the environments apart in the first place.",
          correct: false,
        },
        {
          id: 'sdk-in-app',
          label: 'Use the AWS SDK inside the sensor application code',
          definition:
            'Language-specific libraries that let an application call AWS services from its own code.',
          explanation:
            "The SDKs let an application use AWS from its code; they aren't the tool for describing entire environments in versioned templates.",
          correct: false,
        },
        {
          id: 'cloudformation-templates',
          label: 'AWS CloudFormation, with JSON or YAML templates in the repository',
          definition:
            'Infrastructure as code service that creates the resources described in a text template, consistently and repeatably.',
          explanation:
            'With a single template, CloudFormation creates all three environments identically. Since it is text, it goes into version control so you know what changed, who changed it and when, and can roll back if something fails.',
          correct: true,
        },
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'Service that monitors resources and applications with metrics, logs, dashboards and alarms.',
          explanation:
            "CloudWatch shows how resources are performing, but it doesn't create them. Confusing monitoring with provisioning is a classic trap.",
          correct: false,
        },
      ],
    },
    {
      id: 'stack-unit',
      prompt:
        'For client demos we spin up an extra environment, and afterward nobody remembers to delete all its pieces. When CloudFormation uses the template, what does it create, and how do we delete that whole environment?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'delete-template-file',
          label: 'It creates standalone resources; they are deleted by deleting the template file',
          definition:
            'The idea that the JSON or YAML file is connected to the resources and that removing it from the repository deletes them.',
          explanation:
            "The template only describes the resources. Deleting the file doesn't touch what was already created in the account.",
          correct: false,
        },
        {
          id: 'one-by-one',
          label: 'It creates independent resources that then have to be deleted one by one in the console',
          definition:
            'Manual deletion of every resource in an environment, going service by service.',
          explanation:
            "That's exactly today's problem: someone forgets a piece and it keeps costing money. CloudFormation groups resources so you don't have to do it that way.",
          correct: false,
        },
        {
          id: 'demo-ami',
          label: 'It creates an AMI with the whole environment; it is deleted by deregistering that image',
          definition:
            'An Amazon Machine Image is a template with the operating system and software for launching Amazon EC2 instances.',
          explanation:
            "An AMI describes an instance's software, not a full environment with a database and a load balancer. It isn't what CloudFormation creates.",
          correct: false,
        },
        {
          id: 'stack',
          label: 'It creates a stack that is managed as a single unit; deleting the stack deletes its resources',
          definition:
            'A stack is the set of resources created from a template, which are created, updated and deleted together.',
          explanation:
            'Each demo can be its own stack: CloudFormation creates everything in the right order and, when you delete the stack, its resources are deleted, except those with a policy to retain them.',
          correct: true,
        },
      ],
    },
    {
      id: 'python-infrastructure',
      prompt:
        "The team doesn't like writing YAML: everyone codes in Python. They want to define the infrastructure in Python and still have it provisioned through CloudFormation. Which tool is that?",
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'python-cli',
          label: 'AWS CLI',
          definition:
            'Tool for running AWS commands from the terminal and automating them in scripts.',
          explanation:
            "The CLI runs commands in the terminal; it doesn't turn an infrastructure definition in Python into CloudFormation stacks.",
          correct: false,
        },
        {
          id: 'cdk',
          label: 'AWS CDK',
          definition:
            'Development kit for defining cloud infrastructure with familiar programming languages.',
          explanation:
            'The AWS CDK lets you write infrastructure in languages like Python and provisions it through CloudFormation, so the team keeps its stacks.',
          correct: true,
        },
        {
          id: 'python-query-api',
          label: 'Direct calls to the Query API',
          definition:
            'Low-level HTTPS requests to AWS services, where the program has to sign every call.',
          explanation:
            "The Query API is the lowest-level access: it doesn't generate CloudFormation templates or stacks from Python code.",
          correct: false,
        },
        {
          id: 'python-console',
          label: 'AWS Management Console',
          definition:
            'Web interface for managing AWS services by clicking in the browser.',
          explanation:
            "The console is for manual tasks; it doesn't let you define infrastructure as code in Python.",
          correct: false,
        },
      ],
    },
    {
      id: 'rebuild-region',
      prompt:
        "What the fund is asking for: if the entire Region we run in goes down, we need to be able to rebuild the infrastructure quickly in another Region. What approach does AWS recommend?",
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'iac-other-region',
          label: 'Deploy with infrastructure as code and reuse the templates in the other Region',
          definition:
            'Provisioning from text files that can be used again and again across different Regions and accounts.',
          explanation:
            'AWS recommends deploying with IaC so you can quickly rebuild a workload in a disaster recovery Region: the same templates create the same resources there.',
          correct: true,
        },
        {
          id: 'manual-runbook',
          label: 'Write a manual with the steps to recreate everything by hand in the console',
          definition:
            'A document with instructions for a person to repeat the configuration in the web interface.',
          explanation:
            'Recreating everything by hand is slow, error-prone and hard to audit, right when you are in the biggest hurry.',
          correct: false,
        },
        {
          id: 'auto-copy-regions',
          label: 'Do nothing: AWS copies the resources to another Region on its own',
          definition:
            'The assumption that resources in one Region show up in the others without any action from the customer.',
          explanation:
            "Resources and data in one Region don't exist in another unless you replicate or copy them. You have to prepare for it.",
          correct: false,
        },
        {
          id: 'sdk-rebuild',
          label: 'Use the AWS SDKs inside the sensor application',
          definition:
            "Language-specific libraries that an application's code uses to call AWS services.",
          explanation:
            "The SDKs let the application use services from its code; they aren't the IaC approach AWS recommends for rebuilding everything repeatably.",
          correct: false,
        },
      ],
    },
  ],
};
