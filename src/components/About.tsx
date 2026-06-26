
"use client";

import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";

const About = () => {
  const skills = [
    "Linux / Windows Server",
    "Nginx / Apache / Tomcat / IIS",
    "AWS / GCP / DigitalOcean / Proxmox",
    "Docker / Kubernetes / Helm / Argo CD",
    "GitHub Actions / Jenkins",
    "Ansible",
    "MySQL / PostgreSQL / MSSQL / MongoDB",
    "Prometheus / Grafana / Loki",
  ];

  return (
    <section id="about" className="max-w-4xl mx-auto py-24 px-6 md:px-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-lightest-slate whitespace-nowrap">
            <span className="text-green font-mono text-xl mr-2">01.</span>
            About Me
          </h2>
          <div className="h-[1px] w-full max-w-xs bg-lightest-navy/50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 text-slate text-lg leading-relaxed space-y-4">
            <p>
              Hello! My name is Mohammed Sab Sagari and I enjoy optimizing systems and automating workflows. My interest
              in IT infrastructure started back in 2018 when I began my journey as an Information Technology Fellow at
              MKCL.
            </p>
            <p>
              I hold a Master of Science in Computer Science from <span className="text-green">Savitribai Phule Pune University</span> and
              a Bachelor of Science in Computer System Administration from <span className="text-green">YCMOU University</span>.
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at{" "}
              <span className="text-green">Shaurya Technosoft</span> as a DevOps Engineer. My main focus these days is
              building robust infrastructure, automating CI/CD pipelines, and ensuring system reliability.
            </p>
            <p>Here are a few technologies I’ve been working with recently:</p>
            <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm">
              {[
                "Kubernetes & Docker & Helm",
                "GitHub Actions & Argo CD",
                "Ansible & Infrastructure Automation",
                "Prometheus & Grafana & Loki",
                "AWS / GCP / DigitalOcean",
                "Linux / Windows Server",
                "PostgreSQL / MySQL / MongoDB",
                "Nginx / Apache / Envoy Gateway",
              ].map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green text-xs">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group mx-auto md:mx-0 w-64 h-64 md:w-full md:h-fit max-w-[300px]">
            <div className="absolute inset-0 border-2 border-green rounded translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative z-10 bg-green/20 rounded overflow-hidden aspect-square group-hover:bg-transparent transition-colors">
              <img
                src="/photo.jpg"
                alt="Mohammed Sab Sagari"
                className="w-full h-full object-cover mix-blend-multiply grayscale hover:mix-blend-normal hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
