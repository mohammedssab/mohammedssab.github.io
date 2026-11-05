
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const jobs = [
  {
    company: "Shaurya Technosoft",
    role: "DevOps Engineer",
    range: "Mar 2026 - Present",
    url: "#",
    descriptions: [
      "Design and maintain CI/CD pipelines across GitHub Actions and Gitea Actions for 15+ microservices, cutting build durations by 65% with dedicated runners and persistent layer caching.",
      "Manage 8 Kubernetes clusters (production and staging) across AWS EKS, data center bare-metal (CRI-O), Proxmox VE, and immutable Talos Linux (37 nodes) with declarative GitOps via Flux CD, Argo CD, and Kustomize.",
      "Configure Kubernetes Gateway API with Layer 7 ingress routing, TCP listeners for IoT telemetry traffic, PROXY protocol handling, and cert-manager automated TLS lifecycle management.",
      "Harden container security by migrating API and client workloads to Chainguard Wolfi base images running as non-root, shrinking image sizes by 37% and reducing critical CVEs.",
      "Migrated on-premise Kubernetes cluster (k8s2) from Calico CNI + MetalLB to Cilium eBPF, deploying L2 announcements and enabling deep packet observability with Hubble.",
      "Deploy and operate centralized observability across 20+ servers using Prometheus, Grafana, native Grafana Alloy agents, and Loki, routing tuned alert notifications to Microsoft Teams.",
      "Automate host provisioning, runner deployments, and rolling cluster node upgrades using Ansible playbooks orchestrated via self-service Semaphore UI templates.",
      "Administer production PostgreSQL and MySQL databases: user permissions, PgBouncer connection pooling, routine backups, replication checks, and storage volume expansion.",
      "Maintain developer platforms and security workflows using Gitea, Harbor (Trivy scanning), SonarQube, and OpenBao / Vault, automating dependency updates via Renovate Bot.",
    ],
  },
  {
    company: "LetsReflect",
    role: "System Administrator",
    range: "Nov 2022 - Feb 2026",
    url: "#",
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
    company: "MKCL",
    role: "Information Technology Fellow",
    range: "Sep 2018 - Oct 2022",
    url: "#",
    descriptions: [
      "Provided Linux and Windows administration, improving operational continuity.",
      "Managed Apache, Nginx, Tomcat, and IIS web servers for secure and optimized performance.",
      "Administered Active Directory and managed MSSQL, MySQL, MongoDB, and MariaDB databases, improving availability and access management.",
      "Automated deployments using Jenkins, Ansible, and Rundeck, reducing manual intervention.",
      "Installed and configured Windows/Linux servers and essential network services while resolving application performance issues.",
    ],
  },
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="jobs" className="max-w-3xl mx-auto py-24 px-6 md:px-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-lightest-slate whitespace-nowrap">
            <span className="text-green font-mono text-xl mr-2">02.</span>
            Where I’ve Worked
          </h2>
          <div className="h-[1px] w-full max-w-xs bg-lightest-navy/50"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Tab List */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible relative border-b md:border-b-0 md:border-l border-lightest-navy font-mono text-sm shrink-0 md:w-48">
            {jobs.map((job, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-3 md:py-2.5 md:px-5 border-b-2 md:border-b-0 md:border-l-2 text-left whitespace-nowrap transition-all hover:bg-light-navy/30 hover:text-green ${
                  activeTab === i
                    ? "border-green text-green bg-light-navy/10"
                    : "border-transparent text-slate"
                }`}
                style={{ marginBottom: -2, marginLeft: -2 }}
              >
                {job.company}
              </button>
            ))}
          </div>

          {/* Job Details */}
          <div className="py-2 w-full">
            <h3 className="text-xl font-bold text-lightest-slate">
              {jobs[activeTab].role}{" "}
              <span className="text-green">@ {jobs[activeTab].company}</span>
            </h3>
            <p className="font-mono text-sm text-slate mb-4 mt-1">
              {jobs[activeTab].range}
            </p>
            <ul className="space-y-2">
              {jobs[activeTab].descriptions.map((desc, i) => (
                <li key={i} className="flex items-start gap-2 text-slate text-base">
                  <span className="text-green mt-1.5 text-xs">▹</span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
