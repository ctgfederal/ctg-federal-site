/**
 * services.ts — the six solution practices.
 *
 *   slug        route segment (also the page filename)
 *   navLabel    short label used in the header dropdown
 *   verb        first line of the home-page card lockup ("Transform with")
 *   title       second line of the lockup / the H1 on the service page
 *   eyebrow     small line above the H1 on the service page
 *   tagline     one-sentence summary (also the page meta description source)
 *   expanded    the longer intro paragraph on the service page
 *   image       card + hero image (AI-generated brand photo)
 *   liveImage   original photo from the live site, kept as a fallback
 *   capabilities  the h3 capability list, each with its live-site icon
 *   seoTitle / seoDescription  copied from the live page <title> and meta
 */

export interface Capability {
  title: string;
  icon: string;
}

export interface Service {
  slug: string;
  navLabel: string;
  verb: string;
  title: string;
  eyebrow: string;
  tagline: string;
  expanded: string;
  image: string;
  liveImage: string;
  capabilities: Capability[];
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: 'modern-infrastructure',
    navLabel: 'Modern Infrastructure',
    verb: 'Transform with',
    title: 'Modern Infrastructure',
    eyebrow: 'Transform for the future',
    tagline:
      'Data center solutions for a more centralized, efficient IT environment; improved user experience; and streamlined management and maintenance.',
    expanded:
      'We provide comprehensive data center solutions for a more centralized, efficient IT environment; improved user experience; and streamlined management and maintenance. Our architects and engineers offer the expert guidance and tailored solutions to help plan and deliver server, storage, network, and virtualization solutions for simpler, streamlined data centers.',
    image: '/images/generated/service-modern-infrastructure.jpg',
    liveImage: '/images/site/infrastructure.png',
    capabilities: [
      { title: 'Converged Infrastructure and Hyperconverged (HCI) Solutions', icon: '/images/site/1.HCL_.png' },
      { title: 'Automation & Orchestration', icon: '/images/site/3.orchestration.png' },
      { title: 'Enterprise Storage Solutions', icon: '/images/site/5.storage-1.png' },
      { title: 'Continuity of Operations and Disaster Recovery', icon: '/images/site/7.recovery.png' },
      { title: 'Technology Refresh, Migration and Consolidation', icon: '/images/site/9.consolidation.png' },
      { title: 'Enterprise Architecture', icon: '/images/site/2.architecture-1.png' },
      { title: 'Full Stack Observability', icon: '/images/site/4.observability.png' },
      { title: 'Data Archiving, Tiering, and Management', icon: '/images/site/6.archiving-1.png' },
      { title: 'Virtual Desktop Infrastructure', icon: '/images/site/8.virtual-desktop-.png' },
    ],
    seoTitle: 'Server, Storage, Network & Virtualization | Data Center Solutions',
    seoDescription:
      'Data center solutions for a more centralized, efficient IT environment; improved user experience; and streamlined management and maintenance.',
  },
  {
    slug: 'hpc-ai-ml-genai',
    navLabel: 'HPC & AI/ML + GenAI',
    verb: 'Advance with',
    title: 'HPC & AI/ML + GenAI',
    eyebrow: 'Advance past the competition',
    tagline:
      'Computer networking and infrastructure solutions to leverage the power of artificial intelligence and machine learning while protecting proprietary data and intellectual property.',
    expanded:
      'Mission-grade data platforms, AI/ML model deployment, and analytics for decision support. We support our federal customers’ need to leverage the power of AI and machine learning while protecting their data and IP — providing the computer networking and infrastructure to run internal language models at speed and scale.',
    image: '/images/generated/service-hpc-ai.jpg',
    liveImage: '/images/site/hpc-ai.png',
    capabilities: [
      { title: 'HPC & Supercomputing', icon: '/images/site/1.supercomputing-1.png' },
      { title: 'GPU Acceleration & GPU-accelerated Computing', icon: '/images/site/3.gpu_.png' },
      { title: 'Data Science', icon: '/images/site/5.data-science-1.png' },
      { title: 'Artificial Intelligence & Machine Learning', icon: '/images/site/2.AI_.png' },
      { title: 'Retrieval-Augmented Generation (RAG) and Large Language Models (LLM)', icon: '/images/site/4.LLM_.png' },
    ],
    seoTitle: 'Unlock the Power of AI/ML & GenAI with Secure HPC Infrastructure',
    seoDescription:
      'We support our clients’ need to leverage the power of artificial intelligence and machine learning while also protecting their enterprise proprietary data and intellectual property. We provide the compute, networking and infrastructure to run large language models at speed and scale.',
  },
  {
    slug: 'cybersecurity',
    navLabel: 'Cybersecurity',
    verb: 'Protect with',
    title: 'Cybersecurity',
    eyebrow: 'Protect your data and assets',
    tagline:
      'Cybersecurity architecture and processes that help identify risk, optimize resources, and create integrated solutions that mitigate risk.',
    expanded:
      'We offer cybersecurity architecture and processes that help identify risk, optimize resources, and create integrated solutions that mitigate risk. Partnering with industry-leading cybersecurity technology providers, we balance your unique set of needs, stakeholders, compliance requirements, and workforce capabilities. End-to-end security — zero-trust architecture, identity, endpoint, network, and SOC services for federal environments.',
    image: '/images/generated/service-cybersecurity.jpg',
    liveImage: '/images/site/cybersecurity.png',
    capabilities: [
      { title: 'Enterprise Network & Device Security', icon: '/images/site/1.ENTERPRISE-NETWORK.png' },
      { title: 'Security Operations, Automation, and Orchestration', icon: '/images/site/3.orchestration.png' },
      { title: 'Identity & Access Management (IAM)', icon: '/images/site/4.access.png' },
      { title: 'Data Protection', icon: '/images/site/6.data-protection-1.png' },
      { title: 'Cyber Resilience', icon: '/images/site/9.resilience-1.png' },
      { title: 'Zero-Trust Architecture', icon: '/images/site/2.zero-trust-1.png' },
      { title: 'Governance, Risk Management and Compliance (GRC)', icon: '/images/site/3.compliance.png' },
      { title: 'Hybrid, Cloud, and Multi-cloud Security', icon: '/images/site/5.cloud_.png' },
      { title: 'Cyber Posture Assessment, Visibility and Re-Design', icon: '/images/site/8.cyberposture.png' },
    ],
    seoTitle: 'Comprehensive Cybersecurity Architecture | Partner with Experts',
    seoDescription:
      'We provide customized cybersecurity architecture and processes, balancing your business needs with industry-leading technology to effectively manage risk and optimize resources.',
  },
  {
    slug: 'advanced-networking',
    navLabel: 'Networking',
    verb: 'Scale with',
    title: 'Networking',
    eyebrow: 'Scale your business for growth',
    tagline:
      'Virtualized, resilient, smart, powerful, and secure network solutions for the backbone of your business operations and service-delivery.',
    expanded:
      'Modern federal networking — SD-WAN, secure access, datacenter fabric, tactical edge. We equip customers with modern networks, simplified and automated intelligent solutions, policy-based security automation, data insights, and easy integration of third-party vendor devices, software, and network tools.',
    image: '/images/generated/service-networking.jpg',
    liveImage: '/images/site/advanced-networking.png',
    capabilities: [
      { title: 'Enterprise & Campus Network Re-Design, Refresh and Migration', icon: '/images/site/1.network.png' },
      { title: 'Network Operations, Automation, and Orchestration', icon: '/images/site/3.orchestration.png' },
      { title: 'WiFi & Cellular Networking', icon: '/images/site/5.cellular.png' },
      { title: 'Software Defined – SD-WAN and SD-Networking', icon: '/images/site/2.sd-networking.png' },
      { title: 'Hybrid and Multi-cloud Networking', icon: '/images/site/4.hybrid-cloud.png' },
      { title: 'Collaboration & Workforce Mobility', icon: '/images/site/6.mobility.png' },
    ],
    seoTitle: 'Simplified, Automated, Intelligent Network Solutions | CTG Federal',
    seoDescription:
      'We provide virtualized, resilient, smart, powerful, and secure network solutions for the backbone of your operations and service-delivery.',
  },
  {
    slug: 'hybrid-cloud',
    navLabel: 'Cloud & Infrastructure',
    verb: 'Optimize with',
    title: 'Cloud & Infrastructure',
    eyebrow: 'Optimize your resources',
    tagline:
      'Expertise and solutions to determine the best model to meet your needs, leverage and optimize investments, and avoid cloud deployment blind spots.',
    expanded:
      'Hybrid and multi-cloud architecture with FedRAMP-aligned deployment, migration, and sustainment. Whether moving operations to the cloud en masse or one application at a time, we have the technical expertise to help do it right and securely.',
    image: '/images/generated/service-hybrid-cloud.jpg',
    liveImage: '/images/site/hybrid-cloud.png',
    capabilities: [
      { title: 'Hybrid Cloud & Multi-Cloud Architecture', icon: '/images/site/4.hybrid-cloud.png' },
      { title: 'Workload Alignment & Optimization', icon: '/images/site/3.optimization.png' },
      { title: 'Hybrid Cloud Security', icon: '/images/site/5.cloud_.png' },
      { title: 'Migration, Consolidation, and Management', icon: '/images/site/9.consolidation.png' },
      { title: 'Cost Optimization', icon: '/images/site/4.cost-optimization.png' },
    ],
    seoTitle: 'Optimize Your Hybrid Cloud Strategy with CTG Federal Expertise',
    seoDescription:
      'Maximize your cloud ROI with our hybrid cloud expertise. We help you choose the right model, optimize investments, and avoid costly mistakes. Secure and seamless cloud deployment.',
  },
  {
    slug: 'unified-communications-contact-center',
    navLabel: 'Unified Communications & Contact Center',
    verb: 'Transform with',
    title: 'Unified Communications & Contact Center',
    eyebrow: 'Serve your customers better',
    tagline:
      'Next-generation employee and constituent experiences leveraging collaboration, omni-channel, AI, and the cloud.',
    expanded:
      'We provide next-generation employee and customer experiences leveraging collaboration, omni-channel, AI, and the cloud. By consolidating communication and collaboration solutions, we help improve operational efficiency, productivity, and constituent satisfaction.',
    image: '/images/generated/service-unified-comms.jpg',
    liveImage: '/images/site/comms-contact.png',
    capabilities: [
      { title: 'Cloud Migration (CCaaS / UCaaS)', icon: '/images/site/1.migration.png' },
      { title: 'Omni-Channel Contact Center', icon: '/images/site/4.omni-channel.png' },
      { title: 'Conversational & Generative AI', icon: '/images/site/5.ai_.png' },
      { title: 'Microsoft Teams', icon: '/images/site/7.teams_-1.png' },
      { title: 'Managed Services', icon: '/images/site/10.managed-svcs-1.png' },
      { title: 'Workplace Collaboration', icon: '/images/site/2.collaboration.png' },
      { title: 'Automation & Self-Service', icon: '/images/site/3.self-service.png' },
      { title: 'Workforce Engagement Management', icon: '/images/site/6-workforce-engament-1.png' },
      { title: 'Application Integration', icon: '/images/site/8.integration.png' },
      { title: 'Advisory Services', icon: '/images/site/9.advisory.png' },
    ],
    seoTitle: 'Unified Communications & Contact Center | CTG Federal',
    seoDescription:
      'Next-generation employee and client experiences leveraging collaboration, omni-channel, AI, and the cloud. Operational efficiency and productivity. Improved client satisfaction.',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export default services;
