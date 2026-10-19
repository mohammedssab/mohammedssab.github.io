import React from "react";
import { portfolioData } from "@/data/portfolioData";

const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const categories = [
    { title: "DevOps & CI/CD", key: "DevOps" },
    { title: "Containers & Orchestration", key: "Containers" },
    { title: "Cloud & Virtualization", key: "Cloud" },
    { title: "Systems & Web Servers", key: "Systems" },
    { title: "Monitoring & Observability", key: "Monitoring" },
    { title: "Database Systems", key: "Databases" },
    { title: "Networking & Security", key: "Networking" },
  ];

  return (
    <section id="skills" className="max-w-6xl mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
          Technical Skills & Capabilities
        </h2>
        <div className="h-1 w-16 bg-emerald-500 rounded-full mb-4"></div>
        <p className="text-slate-300 text-base max-w-2xl font-sans font-normal">
          Verified technologies, container engines, cloud infrastructure, and operational tooling.
        </p>
      </div>

      {/* Grid of Categorized Skill Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const catSkills = skills.filter((s) => s.category === cat.key);

          return (
            <div
              key={idx}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                  <h3 className="font-sans text-base font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-sm">⎈</span>
                    <span>{cat.title}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/40">
                    Production
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs sm:text-sm font-mono text-slate-200 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
