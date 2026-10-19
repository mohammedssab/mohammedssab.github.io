import React from "react";
import { FiClock, FiBriefcase, FiLayers, FiAward } from "react-icons/fi";

interface StatItem {
  value: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    value: "7+ Years",
    label: "Professional IT Experience",
    subtext: "Started in 2018 at MKCL; Linux, infrastructure, and DevOps",
    icon: <FiClock size={22} className="text-emerald-400" />,
  },
  {
    value: "3 Roles",
    label: "Industry Organizations",
    subtext: "Shaurya Technosoft, LetsReflect, and MKCL",
    icon: <FiBriefcase size={22} className="text-cyan-400" />,
  },
  {
    value: "30+",
    label: "Production Technologies",
    subtext: "Talos Linux, Cilium eBPF, FluxCD, Argo CD, Patroni, TimescaleDB, OpenBao",
    icon: <FiLayers size={22} className="text-emerald-400" />,
  },
  {
    value: "M.Sc.",
    label: "Computer Science",
    subtext: "Savitribai Phule Pune University (2021–2023)",
    icon: <FiAward size={22} className="text-cyan-400" />,
  },
];

export const ProofStrip: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md hover:border-slate-700 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
                {stat.value}
              </span>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mb-1 font-sans">
              {stat.label}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
