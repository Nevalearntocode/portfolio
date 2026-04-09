export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  userAnswerIndex: number;
  explanation: string;
};

export type LearningSession = {
  day: number;
  date: string;
  title: string;
  summary: string;
  topics: string[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
  videoTimestamp?: string;
};

export const awsJourney = {
  course: {
    title: "AWS Cloud Practitioner",
    source: "YouTube (14h)",
    url: "https://www.youtube.com/watch?v=NhDYbskXRgc",
    startedAt: "2026-04-08",
  },
  sessions: [
    {
      day: 1,
      date: "2026-04-08",
      title: "Cloud Computing Foundations",
      summary: "An introduction to cloud computing covering the evolution of hosting models, CSP concepts, compute types, and cloud deployment architectures.",
      topics: [
        "What is cloud computing vs on-premise",
        "Evolution of hosting: Dedicated, VPS, Shared, Cloud",
        "What makes a CSP vs a Cloud Platform (Twilio, HashiCorp, Databricks)",
        "The 4 core IaaS services: Compute, Storage, Database, Networking",
        "AWS has 200+ services across 20+ categories",
        "Evolution of computing: Dedicated, VMs (Hypervisor), Containers (Docker Daemon), Functions (Serverless)",
        "Types of cloud: SaaS (customers), PaaS (developers), IaaS (IT/DevOps)",
        "Deployment models: Public, Private, Hybrid (VPN-connected), Cross-Cloud/Multi-Cloud",
      ],
      keyTakeaways: [
        "'Private cloud' means who owns the servers, not whether the app is publicly accessible",
        "Hybrid VPN is infrastructure-to-infrastructure - end users never touch it",
        "Serverless/Functions = only pay when code runs, trade-off is cold starts",
        "IaaS always has the 4 core services; 'Cloud Computing' covers all categories, not just compute",
      ],
      videoTimestamp: "1-18/329",
      quiz: [
        {
          id: "d1-q1",
          question: "What is the key difference between a Cloud Service Provider (CSP) and a Cloud Platform like Twilio or HashiCorp?",
          options: [
            "CSPs are cheaper than Cloud Platforms",
            "CSPs offer a Single Unified API and IaaS; Cloud Platforms don't meet all those requirements",
            "Cloud Platforms have more services than CSPs",
            "CSPs only provide compute and storage services",
          ],
          correctIndex: 1,
          userAnswerIndex: 1,
          explanation: "A CSP must offer a Single Unified API, metered billing, IaaS, and automation via IaC. Cloud Platforms like Twilio offer multiple services under a single UI but don't meet all these requirements.",
        },
        {
          id: "d1-q2",
          question: "Which hosting model shares one physical machine among hundreds of businesses, relying on tenants under-utilizing resources?",
          options: [
            "Dedicated Server",
            "Virtual Private Server (VPS)",
            "Shared Hosting",
            "Cloud Hosting",
          ],
          correctIndex: 2,
          userAnswerIndex: 2,
          explanation: "Shared Hosting puts hundreds of businesses on one physical machine and is very cheap, but offers limited functionality and poor isolation because it depends on tenants not fully using their allocation.",
        },
        {
          id: "d1-q3",
          question: "In the evolution of computing, what software layer enables multiple Virtual Machines to run on a single physical server?",
          options: [
            "Docker Daemon",
            "Guest OS",
            "Hypervisor",
            "Serverless Runtime",
          ],
          correctIndex: 2,
          userAnswerIndex: 0,
          explanation: "The Hypervisor is the software layer that sits between the Host OS and the VMs, allowing multiple virtual machines to share one physical server. Docker Daemon is similar but operates one level up - it runs containers inside VMs.",
        },
        {
          id: "d1-q4",
          question: "You deploy your web app on AWS (public cloud) but keep your legacy database on-premise. The two sides are connected via VPN. How do end users access your web app?",
          options: [
            "Through the VPN tunnel",
            "Normally via the internet - the VPN is only for backend infrastructure communication",
            "They need special credentials to access a hybrid app",
            "Through the on-premise datacenter directly",
          ],
          correctIndex: 1,
          userAnswerIndex: 1,
          explanation: "The VPN in a hybrid setup is a private tunnel between infrastructure environments, not a user-facing gateway. End users access the public-facing parts of the app via the regular internet, unaware of the VPN.",
        },
        {
          id: "d1-q5",
          question: "Which type of cloud computing service is best described as: 'You upload code, choose memory and duration, and only pay while the code is running'?",
          options: [
            "Containers",
            "Virtual Machines",
            "Functions (Serverless)",
            "Dedicated Servers",
          ],
          correctIndex: 2,
          userAnswerIndex: 2,
          explanation: "Functions (Serverless) are managed VMs running managed containers where you only upload code. VMs spin up only when code needs to execute, so you pay only for that runtime - though this causes cold starts when the VM isn't already warm.",
        },
      ],
    },
    {
      day: 2,
      date: "2026-04-09",
      title: "Cloud Benefits & AWS Global Infrastructure",
      summary: "Covered the business case for cloud adoption, the three cloud advantage frameworks, and how AWS structures its global infrastructure across regions, availability zones, fault domains, and edge locations.",
      topics: [
        "Innovation Waves (Kondratiev Waves) - Cloud Technology as the latest wave",
        "Burning Platform - abandoning old tech for new driven by survival pressure",
        "Evolution of Computing Power: General (EC2), GPU/Inferentia (50x), Quantum/Bracket (100M x)",
        "9 Benefits of Cloud vs 6 Advantages vs 7 Advantages - three distinct frameworks",
        "Fault Tolerance and Disaster Recovery belong to Cloud Architecture, not Benefits",
        "AWS Global Infrastructure: 25 Regions, 81 AZs, 275+ PoPs, 11 Local Zones",
        "Regions: physically isolated, 4 factors for selection (compliance, cost, services, latency)",
        "Regional vs Global services - S3, CloudFront, Route53, IAM are global",
        "Availability Zones: generally 3 per region, <10ms latency, 100km apart, encrypted inter-AZ traffic",
        "Fault Domains (AZ) vs Fault Levels (Region) - failures don't cascade outside a domain",
        "AWS Global Network - Backbone of AWS, Edge Locations as on/off ramps",
        "Points of Presence: Edge Locations + Regional Edge Caches, CloudFront, S3 Transfer Acceleration, Global Accelerator",
        "AWS Direct Connect: private/dedicated connection, 50Mbps-500Mbps or 1Gbps/10Gbps",
        "Local Zones: single-digit ms latency near dense populations, opt-in required",
      ],
      keyTakeaways: [
        "Scalable vs Elastic: Scalable means you CAN adjust resources; Elastic means it's AUTOMATED",
        "Fault Domain (AZ) contains failures - they don't cascade to other AZs or the Region (Fault Level)",
        "Direct Connect = physical private line; Global Accelerator = smarter routing over AWS backbone - not the same thing",
        "Benefits of Cloud ≠ Six Advantages ≠ Seven Advantages - the exam treats these as three separate lists",
      ],
      videoTimestamp: "19-49/329",
      quiz: [
        {
          id: "d2-q1",
          question: "A company is abandoning its legacy on-premise ERP system and migrating everything to cloud - despite uncertainty about success - because leadership believes staying on old tech will kill the business. What concept describes this situation?",
          options: [
            "Innovation Wave",
            "Burning Platform",
            "Digital Transformation Roadmap",
            "Kondratiev Cycle",
          ],
          correctIndex: 1,
          userAnswerIndex: 1,
          explanation: "Burning Platform describes when a company abandons old technology for new technology under fear and uncertainty, because the organization's survival depends on digital transformation.",
        },
        {
          id: "d2-q2",
          question: "Which AWS service is designed for quantum computing workloads?",
          options: [
            "AWS Inferentia (Inf1)",
            "Amazon EC2",
            "AWS Bracket",
            "AWS Lambda",
          ],
          correctIndex: 2,
          userAnswerIndex: 2,
          explanation: "AWS Bracket (via CalTech) is AWS's quantum computing service. EC2 handles general CPU computing and Inferentia handles GPU/ML workloads.",
        },
        {
          id: "d2-q3",
          question: "The 'Benefits of Cloud' is described as a reworking of the Six Advantages. Which two concepts are NOT in the Benefits list but belong to Cloud Architecture instead?",
          options: [
            "Scalability and Elasticity",
            "Fault Tolerance and Disaster Recovery",
            "High Availability and Global Reach",
            "Reliability and Security",
          ],
          correctIndex: 1,
          userAnswerIndex: 1,
          explanation: "Fault Tolerance and Disaster Recovery are Cloud Architecture concepts, not Benefits of Cloud. The nine Benefits include Agility, Pay-as-you-go, Economy of Scale, Global Reach, Security, Reliability, High Availability, Scalability, and Elasticity.",
        },
        {
          id: "d2-q4",
          question: "Which of the Six Advantages of Cloud addresses the problem of over-provisioning servers 'just in case'?",
          options: [
            "Trade capital expense for variable expense",
            "Benefit from massive economies of scale",
            "Stop guessing capacity",
            "Go global in minutes",
          ],
          correctIndex: 2,
          userAnswerIndex: 2,
          explanation: "Stop guessing capacity means you scale up or down to meet current need instead of paying for idle or underutilized servers you provisioned speculatively.",
        },
        {
          id: "d2-q5",
          question: "Among the Seven Advantages to Cloud, which advantage specifically refers to automated scaling during traffic spikes?",
          options: [
            "Scalable",
            "Reliable",
            "Current",
            "Elastic",
          ],
          correctIndex: 3,
          userAnswerIndex: 0,
          explanation: "Elastic means scaling is automated during spikes and drops in demand. Scalable means you have the ability to increase or decrease resources - but it doesn't imply automation. The distinction matters on the exam.",
        },
        {
          id: "d2-q6",
          question: "AWS currently has 25 launched regions. How many Availability Zones do they have?",
          options: [
            "25",
            "54",
            "81",
            "108",
          ],
          correctIndex: 2,
          userAnswerIndex: 2,
          explanation: "AWS has 81 Availability Zones across its 25 launched regions. 108 refers to Direct Connection Locations, a different infrastructure concept.",
        },
        {
          id: "d2-q7",
          question: "You are launching an EC2 instance. During setup you are asked to choose a Subnet, not an Availability Zone. Why?",
          options: [
            "EC2 instances don't need an Availability Zone",
            "Subnets are associated with AZs - choosing the Subnet implicitly determines the AZ",
            "Availability Zones are selected at the Region level, not instance level",
            "AWS automatically picks the best AZ regardless of your subnet choice",
          ],
          correctIndex: 1,
          userAnswerIndex: 1,
          explanation: "Every subnet belongs to exactly one Availability Zone. When you pick a subnet, you are indirectly selecting which AZ your resource will run in.",
        },
        {
          id: "d2-q8",
          question: "An AWS Region is considered a Fault Level, and an Availability Zone is considered a Fault Domain. What is the key property of a Fault Domain?",
          options: [
            "It replicates data to other domains automatically",
            "If a failure occurs, it will not cascade outside that domain",
            "It spans multiple regions for redundancy",
            "It is managed by a separate AWS team",
          ],
          correctIndex: 1,
          userAnswerIndex: 0,
          explanation: "A Fault Domain contains failures - if something fails inside it, that failure won't cascade to other domains. This is the core purpose of the concept. Data replication is a separate concern.",
        },
        {
          id: "d2-q9",
          question: "Which of the following AWS services uses Points of Presence to generate a special URL, allowing end users to upload files to a nearby Edge Location for faster transfer to S3?",
          options: [
            "AWS Global Accelerator",
            "Amazon CloudFront",
            "AWS Direct Connect",
            "S3 Transfer Acceleration",
          ],
          correctIndex: 3,
          userAnswerIndex: 3,
          explanation: "S3 Transfer Acceleration generates a special URL so end users upload to a nearby Edge Location. Once the file hits the Edge Location, it travels the fast AWS backbone network to reach S3 instead of traversing the public internet the whole way.",
        },
        {
          id: "d2-q10",
          question: "You need a private, dedicated network connection between your on-premise datacenter and AWS with consistent performance for high-traffic workloads. Which service should you use, and what are the available bandwidth options?",
          options: [
            "AWS VPN - 50Mbps to 500Mbps",
            "AWS Direct Connect - 50Mbps-500Mbps or 1Gbps/10Gbps",
            "AWS Global Accelerator - 1Gbps or 10Gbps only",
            "VPC Endpoints - up to 100Gbps",
          ],
          correctIndex: 1,
          userAnswerIndex: 2,
          explanation: "AWS Direct Connect is the private/dedicated physical connection between your datacenter and AWS. It offers two bandwidth tiers: lower (50Mbps-500Mbps) and higher (1Gbps or 10Gbps). Global Accelerator still uses the public internet for the first hop to an Edge Location - it is not a dedicated connection.",
        },
      ],
    },
  ] as LearningSession[],
};
