/**
 * Verified Portfolio Data for Mohammed Sab Sagari
 * Sourced strictly from Mohammed_Resume.pdf, existing components, and repository metadata.
 * No fabricated credentials, certifications, or roles.
 */

export interface ProfileData {
  name: string;
  role: string;
  title: string;
  cluster: string;
  namespace: string;
  location: string;
  email: string;
  website: string;
  status: "Running" | "Ready";
  specialization: string[];
  summary: string;
  links: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    email: string;
  };
}

export interface SkillItem {
  name: string;
  category: "DevOps" | "Containers" | "Cloud" | "Systems" | "Monitoring" | "Databases" | "Networking";
  status: "Active";
  level: "Proficient" | "Production";
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  range: string;
  location: string;
  url: string;
  status: "Active" | "Completed";
  descriptions: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  podName: string;
  title: string;
  category: string;
  status: "Running";
  ready: string;
  restarts: number;
  age: string;
  node: string;
  ip: string;
  description: string;
  tech: string[];
  responsibilities: string;
  challenges: string;
  outcomes: string;
  links: {
    github: string;
    external: string;
  };
  logs: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: "Completed";
}

export interface ServiceItem {
  name: string;
  type: "ClusterIP" | "LoadBalancer" | "NodePort";
  clusterIp: string;
  externalIp: string;
  ports: string;
  age: string;
  targetCategory: string;
}

export interface ContactChannel {
  name: string;
  value: string;
  url: string;
  type: "email" | "link";
}

export interface PortfolioData {
  profile: ProfileData;
  skills: SkillItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: string[]; // Strictly verified: none in resume, displays graceful empty state
  services: ServiceItem[];
  contact: ContactChannel[];
  resume: {
    fileName: string;
    format: string;
    size: string;
    path: string;
    updated: string;
  };
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "Mohammed Sab Sagari",
    role: "DevOps Engineer & Linux System Administrator",
    title: "DevOps Engineer",
    cluster: "portfolio-demo",
    namespace: "portfolio",
    location: "Pune, IN",
    email: "mdsab123sagari@gmail.com",
    website: "mohammedssab.github.io",
    status: "Running",
    specialization: [
      "Cloud-Native Infrastructure (Kubernetes, Talos Linux, Cilium eBPF, Gateway API)",
      "GitOps & CI/CD Automation (FluxCD, Argo CD, Helm, Gitea Actions)",
      "Stateful Systems & Databases (PostgreSQL HA, Patroni, PgBouncer, TimescaleDB, Kafka)",
      "Enterprise Observability (Grafana Alloy, Prometheus, Loki, Cilium Hubble)",
      "Zero-Trust Security & Secrets (OpenBao, HashiCorp Vault, Harbor, Sonatype Nexus)",
      "Edge AI & IoT Orchestration (Raspberry Pi 5, Hailo-10H, k3s, RustFS)",
    ],
    summary:
      "DevOps Engineer and Linux Administrator specializing in immutable Kubernetes platforms (Talos Linux, Cilium eBPF, Gateway API), GitOps delivery with FluxCD and Argo CD, high-scale stateful telemetry systems (PostgreSQL HA with Patroni, PgBouncer, TimescaleDB, Kafka), and edge AI orchestration. Proven track record executing live cluster network migrations, enterprise OpenBao cutovers, and full-stack observability with Grafana Alloy. Based in Pune, India.",
    links: {
      github: "https://github.com/mohammedssab",
      linkedin: "https://www.linkedin.com/in/mohammed-sab-sagari",
      twitter: "https://x.com/Mohammedsagari",
      instagram: "https://www.instagram.com/mohammed_sagari/",
      email: "mailto:mdsab123sagari@gmail.com",
    },
  },

  skills: [
    // DevOps
    { name: "FluxCD", category: "DevOps", status: "Active", level: "Production" },
    { name: "Argo CD", category: "DevOps", status: "Active", level: "Production" },
    { name: "Helm", category: "DevOps", status: "Active", level: "Production" },
    { name: "Gitea Actions", category: "DevOps", status: "Active", level: "Production" },
    { name: "GitHub Actions", category: "DevOps", status: "Active", level: "Production" },
    { name: "Ansible", category: "DevOps", status: "Active", level: "Production" },
    { name: "Semaphore UI", category: "DevOps", status: "Active", level: "Production" },
    { name: "Sonatype Nexus", category: "DevOps", status: "Active", level: "Production" },
    { name: "Jenkins", category: "DevOps", status: "Active", level: "Production" },
    { name: "CI/CD Pipelines", category: "DevOps", status: "Active", level: "Production" },

    // Containers
    { name: "Kubernetes", category: "Containers", status: "Active", level: "Production" },
    { name: "k3s", category: "Containers", status: "Active", level: "Production" },
    { name: "Talos Linux", category: "Containers", status: "Active", level: "Production" },
    { name: "Docker", category: "Containers", status: "Active", level: "Production" },
    { name: "Harbor Registry", category: "Containers", status: "Active", level: "Production" },

    // Cloud & Virtualization
    { name: "OpenBao / HashiCorp Vault", category: "Cloud", status: "Active", level: "Production" },
    { name: "AWS (EC2, Route53)", category: "Cloud", status: "Active", level: "Production" },
    { name: "Proxmox", category: "Cloud", status: "Active", level: "Production" },
    { name: "RustFS Object Storage", category: "Cloud", status: "Active", level: "Production" },
    { name: "GCP", category: "Cloud", status: "Active", level: "Proficient" },
    { name: "DigitalOcean", category: "Cloud", status: "Active", level: "Proficient" },

    // Systems & Web Servers
    { name: "Linux Administration", category: "Systems", status: "Active", level: "Production" },
    { name: "Nginx", category: "Systems", status: "Active", level: "Production" },
    { name: "HAProxy", category: "Systems", status: "Active", level: "Production" },
    { name: "Windows Server", category: "Systems", status: "Active", level: "Proficient" },
    { name: "Apache", category: "Systems", status: "Active", level: "Production" },
    { name: "Tomcat", category: "Systems", status: "Active", level: "Proficient" },
    { name: "IIS", category: "Systems", status: "Active", level: "Proficient" },

    // Monitoring
    { name: "Grafana Alloy", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Prometheus", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Grafana", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Loki", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Cilium Hubble", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Uptime Kuma", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Nagios", category: "Monitoring", status: "Active", level: "Proficient" },
    { name: "Zabbix", category: "Monitoring", status: "Active", level: "Proficient" },

    // Databases
    { name: "PostgreSQL HA (Patroni/PgBouncer)", category: "Databases", status: "Active", level: "Production" },
    { name: "TimescaleDB", category: "Databases", status: "Active", level: "Production" },
    { name: "Apache Kafka", category: "Databases", status: "Active", level: "Production" },
    { name: "MySQL", category: "Databases", status: "Active", level: "Production" },
    { name: "MariaDB", category: "Databases", status: "Active", level: "Proficient" },
    { name: "MongoDB", category: "Databases", status: "Active", level: "Proficient" },
    { name: "MSSQL", category: "Databases", status: "Active", level: "Proficient" },

    // Networking
    { name: "Cilium CNI (eBPF)", category: "Networking", status: "Active", level: "Production" },
    { name: "Kubernetes Gateway API", category: "Networking", status: "Active", level: "Production" },
    { name: "Envoy Gateway", category: "Networking", status: "Active", level: "Production" },
    { name: "Reverse Proxy", category: "Networking", status: "Active", level: "Production" },
    { name: "SSL / TLS", category: "Networking", status: "Active", level: "Production" },
    { name: "Firewall Configuration", category: "Networking", status: "Active", level: "Production" },
    { name: "Network Troubleshooting", category: "Networking", status: "Active", level: "Production" },
  ],

  experience: [
    {
      id: "shaurya-technosoft",
      company: "Shaurya Technosoft",
      role: "DevOps Engineer",
      range: "Mar. 2026 – Present",
      location: "Pune, IN",
      url: "https://shauryatechnosoft.com",
      status: "Active",
      technologies: [
        "Kubernetes",
        "Talos Linux",
        "Cilium CNI (eBPF)",
        "FluxCD",
        "Argo CD",
        "Helm",
        "Gitea Actions",
        "Grafana Alloy",
        "Prometheus",
        "Loki",
        "PostgreSQL HA",
        "TimescaleDB",
        "Kafka",
        "OpenBao",
        "Harbor",
        "Ansible",
      ],
      descriptions: [
        "eBPF Networking & Gateway API: Architected zero-downtime cluster migration to Cilium CNI with eBPF data path and Kubernetes Gateway API via Envoy for high-throughput L4/L7 routing.",
        "Immutable Talos Infrastructure: Engineered production Kubernetes platforms on immutable Talos Linux OS, standardizing automated rolling node upgrades via Tuppr operator with zero disruption.",
        "High-Throughput Database HA: Scaled stateful telemetry platform to sustain ~20,000 records/sec by engineering PostgreSQL HA (Patroni/PgBouncer) and TimescaleDB compression policies.",
        "CI/CD Pipeline Acceleration: Re-engineered enterprise runner infrastructure with persistent caching, slashing build durations by 87% (from 55+ min to ~7 min) and eliminating runner OOM crashes.",
        "Declarative GitOps Delivery: Standardized multi-environment delivery lifecycles using FluxCD and Argo CD ApplicationSets, enforcing zero configuration drift and automated rollback capabilities.",
        "Edge Computing & Resiliency: Orchestrated edge telematics on k3s and Raspberry Pi 5 with Hailo-10H AI acceleration; configured Grafana Alloy disk WAL buffering for zero telemetry loss during network drops.",
        "Zero-Trust Secrets & Governance: Executed zero-downtime cutover from HashiCorp Vault to OpenBao; automated enterprise Harbor container security scanning with Trivy and retention policies.",
        "Enterprise Full-Stack Observability: Unified multi-host telemetry by deploying Grafana Alloy for Loki journal log aggregation and Prometheus metrics, establishing proactive alerting and high system availability.",
      ],
    },
    {
      id: "letsreflect",
      company: "LetsReflect",
      role: "System Administrator",
      range: "Nov. 2022 – Feb. 2026",
      location: "Pune, IN",
      url: "#",
      status: "Completed",
      technologies: ["Linux", "Docker", "Kubernetes", "Helm", "Argo CD", "GitHub Actions", "Prometheus", "Grafana", "Loki", "Uptime Kuma", "MySQL", "PostgreSQL", "Nginx", "Ansible", "Proxmox", "HashiCorp Vault"],
      descriptions: [
        "Managed Linux-based production infrastructure, improving system availability and operational stability.",
        "Designed and implemented GitHub Actions CI/CD pipelines, improving release consistency.",
        "Containerized applications using Docker and administered Kubernetes clusters with Helm and Argo CD, improving deployment scalability and reliability.",
        "Implemented centralized monitoring using Prometheus, Grafana, Loki, and Uptime Kuma, reducing incident resolution time.",
        "Administered MySQL and PostgreSQL databases, improving performance and reliability.",
        "Configured secure reverse proxy architectures using Nginx and Let's Encrypt SSL.",
        "Automated infrastructure provisioning using Ansible and Proxmox VM templates.",
        "Implemented HashiCorp Vault and managed developer platforms including Gitea, SonarQube, Nexus, Harbor, and Vaultwarden, strengthening development workflows.",
      ],
    },
    {
      id: "mkcl",
      company: "MKCL",
      role: "Information Technology Fellow",
      range: "Sep. 2018 – Oct. 2022",
      location: "Pune, IN",
      url: "https://mkcl.org",
      status: "Completed",
      technologies: ["Linux", "Windows Server", "Apache", "Nginx", "Tomcat", "IIS", "Active Directory", "MSSQL", "MySQL", "MongoDB", "MariaDB", "Jenkins", "Ansible", "Rundeck"],
      descriptions: [
        "Provided Linux and Windows administration, improving operational continuity.",
        "Managed Apache, Nginx, Tomcat, and IIS web servers for secure and optimized performance.",
        "Administered Active Directory and managed MSSQL, MySQL, MongoDB, and MariaDB databases, improving availability and access management.",
        "Automated deployments using Jenkins, Ansible, and Rundeck, reducing manual intervention.",
        "Installed and configured Windows/Linux servers and essential network services while resolving application performance issues.",
      ],
    },
  ],

  projects: [
    {
      id: "infrastructure-automation",
      podName: "infra-automation-sec-7f98b5",
      title: "Infrastructure Automation & OpenBao Security",
      category: "Automation & Security",
      status: "Running",
      ready: "1/1",
      restarts: 0,
      age: "180d",
      node: "node-worker-01",
      ip: "10.244.1.42",
      description:
        "Automated multi-node infrastructure provisioning and self-hosted CI/CD infrastructure at Shaurya Technosoft. Executed zero-downtime production cutover from HashiCorp Vault to OpenBao, scaled Gitea Actions runners with persistent caching, and deployed Harbor registry with Trivy security scanning.",
      tech: ["OpenBao", "Ansible", "Semaphore UI", "Gitea Actions", "Harbor", "Sonatype Nexus"],
      responsibilities:
        "Engineered Ansible and Semaphore UI automation workflows, executed the HashiCorp Vault to OpenBao cutover without breaking downstream workloads, and configured dedicated cached runners with persistent Gradle and npm caches.",
      challenges:
        "Migrating active KV v2 secrets, policies, and transit engines from Vault to OpenBao while running zero-downtime production pipelines, and eliminating runner OOM hangs during Android builds.",
      outcomes:
        "Reduced Android CI build times from 55+ minutes to ~7 minutes, achieved zero-downtime secrets cutover, and automated daily Harbor image vulnerability scanning.",
      links: {
        github: "https://github.com/mohammedssab",
        external: "#",
      },
      logs: [
        "[infra-sec] init: Loading Semaphore UI automation templates and Ansible playbooks",
        "[infra-sec] openbao: Executed zero-downtime cutover from HashiCorp Vault to OpenBao",
        "[infra-sec] runners: Registered dedicated Gitea Actions cached runner with persistent Gradle/npm volumes",
        "[infra-sec] registry: Configured Harbor registry with Trivy vulnerability scanning and automated retention cleanup",
        "[infra-sec] outcome: Build times reduced from 55m to 7m; zero plaintext secrets across all pipelines",
      ],
    },
    {
      id: "ha-monitoring",
      podName: "ha-monitoring-stack-4d32a1",
      title: "High-Scale Fleet Telemetry & Database HA Platform",
      category: "Observability & Data",
      status: "Running",
      ready: "1/1",
      restarts: 0,
      age: "240d",
      node: "node-worker-02",
      ip: "10.244.2.18",
      description:
        "Engineered stateful data platform and centralized observability for a high-scale vehicle GPS telemetry platform (~20,000 records/sec). Deployed PostgreSQL 3-node HA with Patroni & PgBouncer, TimescaleDB hypertable compression, Kafka HA, and Grafana Alloy telemetry across distributed production hosts.",
      tech: ["Grafana Alloy", "Prometheus", "Loki", "PostgreSQL HA", "Patroni", "PgBouncer", "TimescaleDB", "Kafka"],
      responsibilities:
        "Configured Grafana Alloy across distributed production hosts for journal logging and system metrics, reconfigured PgBouncer to route write traffic to the active Patroni leader, and enforced TimescaleDB compression policies.",
      challenges:
        "Preventing storage exhaustion and replication lag under continuous 20,000 GPS records/second ingestion, and ensuring offline telemetry buffering during rural edge disconnects.",
      outcomes:
        "Stabilized database write performance, resolved connection exhaustion via PgBouncer pooling, eliminated storage bottlenecks with TimescaleDB compression, and achieved unified observability.",
      links: {
        github: "https://github.com/mohammedssab",
        external: "#",
      },
      logs: [
        "[telemetry-ha] init: Initializing Grafana Alloy collectors across distributed production infrastructure hosts",
        "[telemetry-ha] postgres: Reconfigured PgBouncer connection pool routing to active Patroni leader",
        "[telemetry-ha] timescaledb: Enabled hypertable compression and 10-day retention policies on GPS telemetry tables",
        "[telemetry-ha] kafka: Rebalanced topic replication factors and verified broker partition durability",
        "[telemetry-ha] outcome: Stabilized high-throughput ingestion at ~20k records/sec with zero telemetry drop",
      ],
    },
    {
      id: "kubernetes-orchestration",
      podName: "k8s-orchestration-6c91e0",
      title: "Cloud-Native Talos Linux & Cilium eBPF Platform",
      category: "Cloud Native",
      status: "Running",
      ready: "1/1",
      restarts: 0,
      age: "310d",
      node: "node-master-01",
      ip: "10.244.0.15",
      description:
        "Built and administered production Kubernetes clusters running on immutable Talos Linux OS. Executed live cluster migration from Calico and MetalLB to Cilium CNI with eBPF data path, Kubernetes Gateway API with Envoy Gateway, and FluxCD GitOps automation.",
      tech: ["Talos Linux", "Kubernetes", "Cilium CNI (eBPF)", "Gateway API", "Envoy Gateway", "FluxCD", "Argo CD"],
      responsibilities:
        "Automated Talos node lifecycle and rolling updates with Tuppr operator, performed control-plane to worker node migrations, executed live Cilium CNI migration, and standardized GitOps releases using FluxCD and Argo CD.",
      challenges:
        "Performing live CNI replacement from Calico to Cilium eBPF on production workloads without service interruption, and configuring Kubernetes Gateway API with PROXY protocol v2 support.",
      outcomes:
        "Achieved immutable OS security, reduced network latency with eBPF packet routing, enabled deep network observability via Cilium Hubble, and eliminated manual cluster drift.",
      links: {
        github: "https://github.com/mohammedssab",
        external: "#",
      },
      logs: [
        "[talos-cilium] init: Bootstrapped immutable Talos Linux OS with Tuppr automated rolling upgrade operator",
        "[talos-cilium] migration: Executed live CNI migration from Calico + MetalLB to Cilium CNI with eBPF",
        "[talos-cilium] gateway: Configured Kubernetes Gateway API HTTPRoute and TCPRoute with Envoy Gateway",
        "[talos-cilium] gitops: Synchronized declarative FluxCD Kustomizations and Argo CD ApplicationSets",
        "[talos-cilium] outcome: Production cluster modernized to immutable Talos + Cilium eBPF with zero downtime",
      ],
    },
  ],

  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Savitribai Phule Pune University",
      location: "Pune, IN",
      period: "Sep. 2021 – Oct. 2023",
      status: "Completed",
    },
    {
      degree: "Bachelor of Science in Computer System Administration",
      institution: "YCMOU University",
      location: "Pune, IN",
      period: "Aug. 2018 – Jul. 2021",
      status: "Completed",
    },
  ],

  certifications: [], // Strictly verified: none in resume; terminal returns empty state

  services: [
    { name: "github-actions-cicd", type: "ClusterIP", clusterIp: "10.96.0.11", externalIp: "<none>", ports: "443/TCP", age: "320d", targetCategory: "DevOps" },
    { name: "argo-gitops-server", type: "LoadBalancer", clusterIp: "10.96.12.44", externalIp: "192.168.1.100", ports: "80:30080/TCP,443:30443/TCP", age: "300d", targetCategory: "DevOps" },
    { name: "k8s-control-plane", type: "ClusterIP", clusterIp: "10.96.0.1", externalIp: "<none>", ports: "6443/TCP", age: "365d", targetCategory: "Containers" },
    { name: "cilium-cni-hubble", type: "ClusterIP", clusterIp: "10.96.15.55", externalIp: "<none>", ports: "4245/TCP", age: "180d", targetCategory: "Networking" },
    { name: "prometheus-metrics", type: "ClusterIP", clusterIp: "10.96.25.80", externalIp: "<none>", ports: "9090/TCP", age: "240d", targetCategory: "Monitoring" },
    { name: "grafana-alloy-telemetry", type: "ClusterIP", clusterIp: "10.96.28.14", externalIp: "<none>", ports: "12345/TCP", age: "210d", targetCategory: "Monitoring" },
    { name: "grafana-dashboard", type: "LoadBalancer", clusterIp: "10.96.30.95", externalIp: "192.168.1.102", ports: "3000:30300/TCP", age: "240d", targetCategory: "Monitoring" },
    { name: "loki-logging", type: "ClusterIP", clusterIp: "10.96.40.12", externalIp: "<none>", ports: "3100/TCP", age: "240d", targetCategory: "Monitoring" },
    { name: "patroni-postgresql-ha", type: "ClusterIP", clusterIp: "10.96.50.21", externalIp: "<none>", ports: "5432/TCP", age: "280d", targetCategory: "Databases" },
    { name: "envoy-gateway-api", type: "LoadBalancer", clusterIp: "10.96.60.10", externalIp: "192.168.1.105", ports: "80:30080/TCP,443:30443/TCP", age: "200d", targetCategory: "Networking" },
    { name: "openbao-vault-secrets", type: "ClusterIP", clusterIp: "10.96.70.33", externalIp: "<none>", ports: "443/TCP", age: "260d", targetCategory: "Security" },
  ],

  contact: [
    { name: "Email", value: "mdsab123sagari@gmail.com", url: "mailto:mdsab123sagari@gmail.com", type: "email" },
    { name: "LinkedIn", value: "in/mohammed-sab-sagari", url: "https://www.linkedin.com/in/mohammed-sab-sagari", type: "link" },
    { name: "GitHub", value: "mohammedssab", url: "https://github.com/mohammedssab", type: "link" },
    { name: "X (Twitter)", value: "@Mohammedsagari", url: "https://x.com/Mohammedsagari", type: "link" },
    { name: "Instagram", value: "@mohammed_sagari", url: "https://www.instagram.com/mohammed_sagari/", type: "link" },
  ],

  resume: {
    fileName: "Mohammed_Resume.pdf",
    format: "PDF Document",
    size: "146 KB",
    path: "/Mohammed_Resume.pdf",
    updated: "Mar. 2026",
  },
};
