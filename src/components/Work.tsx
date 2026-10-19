
"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";

const projects = [
  {
    title: "Zero-Trust Infrastructure & Secrets",
    description:
      "Executed zero-downtime secrets cutover from HashiCorp Vault to OpenBao with AppRole authentication. Accelerated CI/CD runner pipelines with persistent caching, slashing build times by 87% (from 55+ min to ~7 min).",
    tech: ["OpenBao", "Gitea Actions", "Harbor", "Trivy"],
    links: { github: "#", external: "#" },
  },
  {
    title: "High-Scale Telemetry & Database HA",
    description:
      "Scaled stateful infrastructure sustaining ~20,000 records/sec by engineering PostgreSQL HA with Patroni and PgBouncer write-routing, Kafka tuning, and automated TimescaleDB compression policies.",
    tech: ["PostgreSQL HA", "Patroni", "TimescaleDB", "Grafana Alloy"],
    links: { github: "#", external: "#" },
  },
  {
    title: "Immutable Kubernetes & eBPF Networking",
    description:
      "Administered production Kubernetes clusters on immutable Talos Linux OS with automated rolling upgrades via Tuppr operator. Executed zero-downtime migration to Cilium CNI with eBPF data path and Envoy Gateway.",
    tech: ["Kubernetes", "Talos Linux", "Cilium eBPF", "Envoy Gateway"],
    links: { github: "#", external: "#" },
  },
];

const Work = () => {
  return (
    <section id="projects" className="max-w-5xl mx-auto py-24 px-6 md:px-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-lightest-slate whitespace-nowrap">
            <span className="text-green font-mono text-xl mr-2">03.</span>
            Some Things I’ve Built
          </h2>
          <div className="h-[1px] w-full max-w-xs bg-lightest-navy/50"></div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <li key={i} className="bg-light-navy hover:-translate-y-2 transition-transform duration-300 rounded shadow-xl">
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-green text-4xl">
                      <FiFolder />
                    </div>
                    <div className="flex gap-4 text-light-slate">
                      <a href={project.links.github} className="hover:text-green">
                        <FiGithub size={20} />
                      </a>
                      <a href={project.links.external} className="hover:text-green">
                        <FiExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-lightest-slate mb-2 hover:text-green transition-colors">
                    <a href={project.links.external}>{project.title}</a>
                  </h3>
                  <p className="text-slate mb-6 text-sm">{project.description}</p>
                </div>
                <ul className="flex flex-wrap gap-3 font-mono text-xs text-slate opacity-70">
                  {project.tech.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Work;
