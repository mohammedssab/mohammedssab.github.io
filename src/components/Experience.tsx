"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiCalendar, FiMapPin, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Experience: React.FC = () => {
  const { experience } = portfolioData;
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="max-w-6xl mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
          Work Experience
        </h2>
        <div className="h-1 w-16 bg-emerald-500 rounded-full mb-4"></div>
        <p className="text-slate-300 text-base max-w-2xl font-sans font-normal">
          Chronological employment history across enterprise environments and engineering organizations.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-slate-800 ml-3 sm:ml-4 space-y-10">
        {experience.map((job) => {
          const isCurrent = job.status === "Active";
          const isExpanded = !!expanded[job.id];
          const displayedDescriptions = isExpanded
            ? job.descriptions
            : job.descriptions.slice(0, 4);

          return (
            <div key={job.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 ${
                  isCurrent ? "border-emerald-400 ring-4 ring-emerald-500/20" : "border-slate-600"
                } flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCurrent ? "bg-emerald-400 animate-pulse" : "bg-slate-400"
                  }`}
                />
              </div>

              {/* Content Card */}
              <div
                className={`p-6 sm:p-7 rounded-xl bg-slate-900/60 border ${
                  isCurrent ? "border-emerald-500/40 shadow-emerald-950/20" : "border-slate-800"
                } hover:border-slate-700 transition-all duration-200 shadow-md`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                        {job.role}
                      </h3>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current Role
                        </span>
                      )}
                    </div>
                    <div className="text-base font-semibold text-emerald-400 mt-1 font-sans">
                      {job.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar size={13} className="text-slate-400" />
                      <span>{job.range}</span>
                    </span>
                    <span className="text-slate-700">•</span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin size={13} className="text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                  </div>
                </div>

                {/* Impact Bullets */}
                <ul className="space-y-2.5 my-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {displayedDescriptions.map((desc, dIdx) => {
                    const colonIndex = desc.indexOf(":");
                    const hasPrefix = colonIndex > 0 && colonIndex < 45;

                    return (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 mt-1 shrink-0 text-xs">▹</span>
                        <div className="flex-1">
                          {hasPrefix ? (
                            <>
                              <strong className="text-white font-semibold">
                                {desc.substring(0, colonIndex)}:
                              </strong>
                              <span>{desc.substring(colonIndex + 1)}</span>
                            </>
                          ) : (
                            <span>{desc}</span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Expand / Collapse toggle for roles with > 4 bullets */}
                {job.descriptions.length > 4 && (
                  <div className="mt-2 mb-3">
                    <button
                      type="button"
                      onClick={() => toggleExpand(job.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer py-1"
                    >
                      <span>
                        {isExpanded
                          ? "Show fewer"
                          : `+ ${job.descriptions.length - 4} more achievements`}
                      </span>
                      {isExpanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                    </button>
                  </div>
                )}

                {/* Technologies Used */}
                <div className="pt-4 border-t border-slate-800/60">
                  <span className="text-xs font-mono text-slate-400 block mb-2 font-medium">
                    Technologies & Infrastructure:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
