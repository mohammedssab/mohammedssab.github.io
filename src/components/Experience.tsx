
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
      "eBPF Networking & Gateway API: Architected Kubernetes ingress and Envoy Gateway solutions, executing zero-downtime cluster migration to Cilium CNI with eBPF data path for secure, high-throughput L4/L7 routing.",
      "Immutable Talos Infrastructure: Engineered and administered production Kubernetes platforms on immutable Talos Linux OS, standardizing automated rolling node upgrades via Tuppr operator with zero disruption.",
      "High-Throughput Database HA: Administered PostgreSQL databases and scaled stateful telemetry platform (~20,000 records/sec) by engineering Patroni HA, PgBouncer write-routing, TimescaleDB compression, and Ansible automation.",
      "CI/CD Pipeline Acceleration: Re-engineered GitHub Actions and Gitea CI/CD pipelines with persistent runner caching strategies, slashing build durations from 55+ min to ~7 min while improving release consistency.",
      "Declarative GitOps Delivery: Automated Kubernetes application deployments using Helm, FluxCD, and Argo CD ApplicationSets, standardizing multi-environment releases and eliminating configuration drift.",
      "Edge Computing & Resiliency: Orchestrated edge telematics workloads on k3s and Raspberry Pi 5 with Hailo-10H AI acceleration; configured Grafana Alloy disk WAL buffering for zero telemetry loss during network drops.",
      "Zero-Trust Secrets & Security: Strengthened supply-chain and secrets security by executing zero-downtime cutover from HashiCorp Vault to OpenBao, automating Harbor container image vulnerability scanning with Trivy.",
      "Enterprise Full-Stack Observability: Implemented centralized monitoring and proactive alerting with Prometheus, Grafana, and Grafana Alloy for multi-host Loki journal log aggregation, accelerating incident detection.",
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
