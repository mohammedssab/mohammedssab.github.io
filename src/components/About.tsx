import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiServer, FiLayers, FiShield } from "react-icons/fi";

const About: React.FC = () => {
  const { profile } = portfolioData;

  const coreFocusAreas = [
    {
      title: "Cloud-Native eBPF & GitOps",
      description: "Automating zero-drift container deployments using FluxCD and Argo CD; engineering high-performance eBPF routing with Cilium CNI and Gateway API.",
      icon: <FiLayers size={20} className="text-emerald-400" />,
    },
    {
      title: "Immutable Clusters & Edge AI",
      description: "Administering production Kubernetes on immutable Talos Linux OS with Tuppr rolling upgrades, alongside Raspberry Pi 5 edge nodes with Hailo AI accelerators.",
      icon: <FiServer size={20} className="text-cyan-400" />,
    },
    {
      title: "Stateful Reliability & Observability",
      description: "Engineering PostgreSQL HA (Patroni/PgBouncer) and TimescaleDB under 20k records/sec GPS telemetry, monitored via Grafana Alloy, Prometheus, and Loki.",
      icon: <FiShield size={20} className="text-emerald-400" />,
    },
  ];

  return (
    <section id="about" className="max-w-6xl mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
          About Me
        </h2>
        <div className="h-1 w-16 bg-emerald-500 rounded-full mb-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary Text */}
        <div className="lg:col-span-6 space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          <p>
            I&apos;m <span className="text-white font-semibold">{profile.name}</span>, a DevOps Engineer and Linux System Administrator based in {profile.location}.
          </p>
          <p>
            {profile.summary}
          </p>
          <p className="text-slate-400 text-sm sm:text-base">
            Throughout my career across enterprise and production environments, my focus has remained on infrastructure automation, reducing deployment friction, and ensuring systems are resilient, observable, and secure.
          </p>
        </div>

        {/* Right Column: Core Engineering Focus Areas */}
        <div className="lg:col-span-6 space-y-4">
          {coreFocusAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 shadow-sm hover:border-slate-700 transition-all duration-200 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 shrink-0">
                {area.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white font-sans mb-1">
                  {area.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
