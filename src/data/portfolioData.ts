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
    cluster: "kubeops-prod-01",
    namespace: "portfolio",
    location: "Pune, IN",
    email: "mdsab123sagari@gmail.com",
    website: "mohammedssab.github.io",
    status: "Running",
    specialization: [
      "CI/CD Automation (GitHub Actions, Jenkins)",
      "Container Orchestration (Kubernetes, Helm, Argo CD)",
      "Infrastructure as Code (Ansible, Proxmox)",
      "Monitoring & Observability (Prometheus, Grafana, Loki)",
      "Linux Administration & Web Servers (Nginx, Envoy)",
      "Database Administration (PostgreSQL, MySQL)",
    ],
    summary:
      "Linux System Administrator & DevOps Engineer with proven experience automating deployments, engineering GitOps workflows with Helm and Argo CD, hardening multi-tenant Kubernetes clusters, and deploying high-availability monitoring stacks with Prometheus and Grafana. Open-Source Advocate based in Pune, India.",
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
    { name: "GitHub Actions", category: "DevOps", status: "Active", level: "Production" },
    { name: "Argo CD", category: "DevOps", status: "Active", level: "Production" },
    { name: "Helm", category: "DevOps", status: "Active", level: "Production" },
    { name: "Ansible", category: "DevOps", status: "Active", level: "Production" },
    { name: "Jenkins", category: "DevOps", status: "Active", level: "Production" },
    { name: "CI/CD Pipelines", category: "DevOps", status: "Active", level: "Production" },

    // Containers
    { name: "Kubernetes", category: "Containers", status: "Active", level: "Production" },
    { name: "Docker", category: "Containers", status: "Active", level: "Production" },

    // Cloud & Virtualization
    { name: "AWS (EC2, Route53)", category: "Cloud", status: "Active", level: "Production" },
    { name: "GCP", category: "Cloud", status: "Active", level: "Proficient" },
    { name: "DigitalOcean", category: "Cloud", status: "Active", level: "Proficient" },
    { name: "Proxmox", category: "Cloud", status: "Active", level: "Production" },

    // Systems & Web Servers
    { name: "Linux Administration", category: "Systems", status: "Active", level: "Production" },
    { name: "Windows Server", category: "Systems", status: "Active", level: "Proficient" },
    { name: "Nginx", category: "Systems", status: "Active", level: "Production" },
    { name: "Apache", category: "Systems", status: "Active", level: "Production" },
    { name: "Tomcat", category: "Systems", status: "Active", level: "Proficient" },
    { name: "IIS", category: "Systems", status: "Active", level: "Proficient" },

    // Monitoring
    { name: "Prometheus", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Grafana", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Loki", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Uptime Kuma", category: "Monitoring", status: "Active", level: "Production" },
    { name: "Nagios", category: "Monitoring", status: "Active", level: "Proficient" },
    { name: "Zabbix", category: "Monitoring", status: "Active", level: "Proficient" },

    // Databases
    { name: "PostgreSQL", category: "Databases", status: "Active", level: "Production" },
    { name: "MySQL", category: "Databases", status: "Active", level: "Production" },
    { name: "MSSQL", category: "Databases", status: "Active", level: "Proficient" },
    { name: "MongoDB", category: "Databases", status: "Active", level: "Proficient" },
    { name: "MariaDB", category: "Databases", status: "Active", level: "Proficient" },

    // Networking
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
      technologies: ["Kubernetes", "Helm", "Argo CD", "GitHub Actions", "Docker", "Envoy Gateway", "Grafana", "Prometheus", "Ansible", "PostgreSQL"],
      descriptions: [
        "Designed and implemented GitHub Actions CI/CD pipelines, improving deployment reliability and release consistency across multiple applications.",
        "Automated Kubernetes application deployments using Helm and Argo CD, streamlining GitOps workflows for staging and production environments.",
        "Optimized Docker build pipelines and caching strategies, accelerating multi-architecture image builds and reducing CI execution time.",
        "Engineered Kubernetes ingress and Envoy Gateway solutions, enhancing secure service exposure and traffic management.",
        "Enhanced CI/CD security by integrating vulnerability scanning and secure secrets management, strengthening application supply chain protection.",
        "Implemented centralized monitoring and alerting with Grafana and Prometheus, improving incident detection and troubleshooting efficiency.",
        "Administered PostgreSQL databases and automated infrastructure provisioning using Ansible, improving platform reliability and operational efficiency.",
        "Upgraded Kubernetes and Argo CD platforms while developing operational documentation, ensuring platform stability and standardized DevOps practices.",
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
      title: "Infrastructure Automation & Security",
      category: "Automation & Security",
      status: "Running",
      ready: "1/1",
      restarts: 0,
      age: "180d",
      node: "node-worker-01",
      ip: "10.244.1.42",
      description:
        "Automated infrastructure provisioning using Ansible and Proxmox VM templates. Implemented HashiCorp Vault for centralized secrets management integrated with CI/CD pipelines, improving security of application deployments.",
      tech: ["Ansible", "Proxmox", "HashiCorp Vault", "Linux", "CI/CD"],
      responsibilities:
        "Authored idempotent Ansible playbooks for server lifecycle automation, created Proxmox VM golden images, and integrated HashiCorp Vault secrets engine with pipeline runners.",
      challenges:
        "Enforcing strict zero-trust secret rotation across staging and production runners without disrupting live deployments.",
      outcomes:
        "Reduced manual VM provisioning time from hours to minutes and eliminated plaintext secrets across pipeline configurations.",
      links: {
        github: "https://github.com/mohammedssab",
        external: "#",
      },
      logs: [
        "2026-03-01T08:00:12Z [INFO] Initializing Proxmox VM template orchestrator...",
        "2026-03-01T08:00:15Z [INFO] Loading Ansible playbooks for OS hardening and networking...",
        "2026-03-01T08:00:19Z [INFO] Connecting to HashiCorp Vault cluster (kv-v2 engine)...",
        "2026-03-01T08:00:22Z [INFO] Injecting dynamic credentials and TLS certificates into CI/CD runners...",
        "2026-03-01T08:00:25Z [INFO] Verification completed: 0 errors, 100% automated.",
      ],
    },
    {
      id: "ha-monitoring",
      podName: "ha-monitoring-stack-4d32a1",
      title: "High Availability Monitoring",
      category: "Observability",
      status: "Running",
      ready: "1/1",
      restarts: 0,
      age: "240d",
      node: "node-worker-02",
      ip: "10.244.2.18",
      description:
        "Implemented centralized monitoring using Prometheus, Grafana, Loki, and Uptime Kuma. Configured proactive alerting for critical system resources across multiple servers to ensure high uptime and reduce troubleshooting time.",
      tech: ["Prometheus", "Grafana", "Loki", "Uptime Kuma", "Alertmanager"],
      responsibilities:
        "Designed Prometheus scrape targets across distributed nodes, built custom Grafana dashboards for cluster metrics, and configured Loki log aggregation.",
      challenges:
        "Tuning high-frequency metric ingestion and log retention policies to prevent disk pressure on monitoring nodes.",
      outcomes:
        "Reduced mean time to detect (MTTD) incidents and provided unified visibility into compute, network, and storage telemetry.",
      links: {
        github: "https://github.com/mohammedssab",
        external: "#",
      },
      logs: [
        "2026-03-05T09:15:00Z [INFO] Prometheus server scraping targets across cluster nodes...",
        "2026-03-05T09:15:02Z [INFO] PromQL alerting rules verified: node_exporter, postgres_exporter active.",
        "2026-03-05T09:15:04Z [INFO] Loki log ingestion pipeline streaming application and system logs...",
        "2026-03-05T09:15:06Z [INFO] Uptime Kuma monitoring probes healthy; Grafana dashboards online.",
        "2026-03-05T09:15:08Z [INFO] Observability stack status: HEALTHY (99.9% target achieved).",
      ],
    },
    {
      id: "kubernetes-orchestration",
      podName: "k8s-orchestration-6c91e0",
      title: "Kubernetes Orchestration",
      category: "Cloud Native",
      status: "Running",
      ready: "1/1",
      restarts: 0,
      age: "310d",
      node: "node-master-01",
      ip: "10.244.0.15",
      description:
        "Built and administered Kubernetes clusters using kubeadm, Helm, and Argo CD. Enabled automated deployments and improved scalability of microservices-based applications across development and production.",
      tech: ["Kubernetes", "Helm", "Argo CD", "Docker", "Envoy Gateway"],
      responsibilities:
        "Configured declarative GitOps deployment manifests with Argo CD, authored Helm charts for application versioning, and secured ingress traffic via Envoy Gateway.",
      challenges:
        "Handling zero-downtime rolling upgrades and maintaining platform stability during major version migrations.",
      outcomes:
        "Standardized release lifecycles across teams, eliminated manual configuration drifts, and enabled automated rollback on healthcheck failure.",
      links: {
        github: "https://github.com/mohammedssab",
        external: "#",
      },
      logs: [
        "2026-03-10T11:20:00Z [INFO] Kube-apiserver synchronized with GitOps repository via Argo CD...",
        "2026-03-10T11:20:03Z [INFO] Helm chart release manifests rendered and validated against k8s schemas...",
        "2026-03-10T11:20:06Z [INFO] Ingress routes and Envoy Gateway configured for TLS termination...",
        "2026-03-10T11:20:09Z [INFO] Workloads synced successfully: Staging and Production in sync.",
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
    { name: "prometheus-metrics", type: "ClusterIP", clusterIp: "10.96.25.80", externalIp: "<none>", ports: "9090/TCP", age: "240d", targetCategory: "Monitoring" },
    { name: "grafana-dashboard", type: "LoadBalancer", clusterIp: "10.96.30.95", externalIp: "192.168.1.102", ports: "3000:30300/TCP", age: "240d", targetCategory: "Monitoring" },
    { name: "loki-logging", type: "ClusterIP", clusterIp: "10.96.40.12", externalIp: "<none>", ports: "3100/TCP", age: "240d", targetCategory: "Monitoring" },
    { name: "postgresql-primary", type: "ClusterIP", clusterIp: "10.96.50.21", externalIp: "<none>", ports: "5432/TCP", age: "280d", targetCategory: "Databases" },
    { name: "envoy-ingress-gateway", type: "LoadBalancer", clusterIp: "10.96.60.10", externalIp: "192.168.1.105", ports: "80:30080/TCP,443:30443/TCP", age: "200d", targetCategory: "Networking" },
    { name: "hashicorp-vault", type: "ClusterIP", clusterIp: "10.96.70.33", externalIp: "<none>", ports: "8200/TCP", age: "260d", targetCategory: "Security" },
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
