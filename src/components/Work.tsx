"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp, FiCheckCircle } from "react-icons/fi";

const Work: React.FC = () => {
  const { projects } = portfolioData;
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
          Key Projects & Workloads
        </h2>
        <div className="h-1 w-16 bg-emerald-500 rounded-full mb-4"></div>
        <p className="text-slate-300 text-base max-w-2xl font-sans font-normal">
          Production infrastructure implementations across automated provisioning, observability, and container orchestration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((proj) => {
          const isExpanded = !!expanded[proj.id];

          return (
            <div
              key={proj.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Header: Category & GitHub Link */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    {proj.category}
                  </span>

                  <div className="flex items-center gap-3 text-slate-400">
                    {proj.links.github && (
                      <a
                        href={proj.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Repository"
                        aria-label={`GitHub Repository for ${proj.title}`}
                        className="hover:text-emerald-400 transition-colors p-1"
                      >
                        <FiGithub size={18} />
                      </a>
                    )}
                    {proj.links.external && proj.links.external !== "#" && (
                      <a
                        href={proj.links.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="External Link"
                        aria-label={`External Link for ${proj.title}`}
                        className="hover:text-emerald-400 transition-colors p-1"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white font-sans mb-3">
                  {proj.title}
                </h3>

                {/* One-Line Outcome */}
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs sm:text-sm font-sans mb-4 flex items-start gap-2">
                  <FiCheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{proj.outcomes}</span>
                </div>

                {/* Brief Summary */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans font-normal">
                  {proj.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-950/80 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-800/80 space-y-3 text-xs font-sans text-slate-300">
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px] mb-1">
                        Responsibilities:
                      </span>
                      <p className="leading-relaxed">{proj.responsibilities}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px] mb-1">
                        Technical Challenges:
                      </span>
                      <p className="leading-relaxed">{proj.challenges}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* View Details Expand Button */}
              <div className="pt-4 mt-2 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => toggleExpand(proj.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors py-1 cursor-pointer"
                >
                  <span>{isExpanded ? "Hide details" : "View details"}</span>
                  {isExpanded ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
