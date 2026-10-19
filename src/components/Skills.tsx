import React from "react";
import { portfolioData } from "@/data/portfolioData";

const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const categories = [
    { title: "DevOps & CI/CD", key: "DevOps", accent: "emerald" },
    { title: "Containers & Orchestration", key: "Containers", accent: "cyan" },
    { title: "Cloud & Virtualization", key: "Cloud", accent: "blue" },
    { title: "Systems & Web Servers", key: "Systems", accent: "indigo" },
    { title: "Monitoring & Observability", key: "Monitoring", accent: "emerald" },
    { title: "Database Systems", key: "Databases", accent: "cyan" },
    { title: "Networking & Security", key: "Networking", accent: "blue" },
  ];

  return (
    <section id="skills" className="max-w-5xl mx-auto py-20 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap font-mono flex items-center gap-2">
          <span className="text-emerald-400">02.</span>
          <span>Technical Capabilities</span>
        </h2>
        <div className="h-[1px] w-full max-w-sm bg-slate-800"></div>
      </div>

      <p className="text-slate-400 text-sm font-mono mb-8">
        $ kubectl get skills --all-categories
      </p>

      {/* Grid of skill categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, idx) => {
          const catSkills = skills.filter((s) => s.category === cat.key);

          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800/70 pb-2.5">
                  <h3 className="font-mono text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <span className="text-emerald-400">⎈</span>
                    <span>{cat.title}</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/40">
                    Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
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
