import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const Work: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="max-w-5xl mx-auto py-20 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap font-mono flex items-center gap-2">
          <span className="text-emerald-400">04.</span>
          <span>Featured Workloads & Projects</span>
        </h2>
        <div className="h-[1px] w-full max-w-sm bg-slate-800"></div>
      </div>

      <p className="text-slate-400 text-sm font-mono mb-8">
        $ kubectl get pods -l tier=production-workload
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="flex flex-col justify-between p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 shadow-xl"
          >
            <div>
              {/* Top pod status header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-400 truncate max-w-[170px]">
                    {proj.podName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <a
                    href={proj.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View GitHub Repository"
                    aria-label={`GitHub Repository for ${proj.title}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    <FiGithub size={18} />
                  </a>
                  {proj.links.external !== "#" && (
                    <a
                      href={proj.links.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="External Link"
                      aria-label={`External Link for ${proj.title}`}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Category */}
              <div className="mb-3">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                  {proj.category}
                </span>
                <h3 className="text-lg font-bold text-slate-100 hover:text-emerald-400 transition-colors mt-0.5">
                  {proj.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {proj.description}
              </p>

              {/* Responsibilities & Challenges */}
              <div className="space-y-2 mb-4 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/70 text-slate-300">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Outcomes:</span>
                  <span>{proj.outcomes}</span>
                </div>
              </div>
            </div>

            {/* Tech stack badges */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-400">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
