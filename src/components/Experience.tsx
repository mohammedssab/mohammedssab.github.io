"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";

const Experience: React.FC = () => {
  const { experience } = portfolioData;
  const [activeTab, setActiveTab] = useState(0);
  const current = experience[activeTab];

  return (
    <section id="experience" className="max-w-5xl mx-auto py-20 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap font-mono flex items-center gap-2">
          <span className="text-emerald-400">03.</span>
          <span>Where I&apos;ve Worked</span>
        </h2>
        <div className="h-[1px] w-full max-w-sm bg-slate-800"></div>
      </div>

      <p className="text-slate-400 text-sm font-mono mb-6">
        $ kubectl describe experience {current.company.replace(/\s+/g, "-")}
      </p>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 rounded-xl bg-slate-900/40 border border-slate-800 p-4 sm:p-6">
        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Work experience companies"
          className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-slate-800 font-mono text-xs sm:text-sm min-w-fit"
        >
          {experience.map((job, i) => (
            <button
              key={job.id}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${job.id}`}
              id={`tab-${job.id}`}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-left whitespace-nowrap transition-all duration-200 border-b-2 md:border-b-0 md:border-l-2 cursor-pointer ${
                activeTab === i
                  ? "border-emerald-400 text-emerald-400 bg-slate-850 md:bg-emerald-950/20 font-semibold"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
              style={{ marginBottom: -2, marginLeft: -2 }}
            >
              <span>{job.company}</span>
            </button>
          ))}
        </div>

        {/* Tab Panel / Job Details */}
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="flex-1 space-y-4"
        >
          <div className="border-b border-slate-800/80 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              {current.role}{" "}
              <span className="text-emerald-400">@ {current.company}</span>
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-slate-400 mt-1.5">
              <span>{current.range}</span>
              <span className="text-slate-600">•</span>
              <span>{current.location}</span>
              <span className="text-slate-600">•</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  current.status === "Active"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {current.status}
              </span>
            </div>
          </div>

          {/* Technologies badge row */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {current.technologies.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/60 text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bulleted responsibilities */}
          <ul className="space-y-2.5 pt-2">
            {current.descriptions.map((desc, i) => (
              <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                <span className="text-emerald-400 mt-1 text-xs shrink-0">▹</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
