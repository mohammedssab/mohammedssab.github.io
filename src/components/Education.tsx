import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";

const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="max-w-6xl mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
          Academic Background
        </h2>
        <div className="h-1 w-16 bg-emerald-500 rounded-full mb-4"></div>
        <p className="text-slate-300 text-base max-w-2xl font-sans font-normal">
          Formal academic qualifications in Computer Science and Systems Administration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-md flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 shrink-0">
              <FiBookOpen size={24} />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                {edu.status}
              </span>
              <h3 className="text-xl font-bold text-white font-sans">
                {edu.degree}
              </h3>
              <p className="text-slate-300 text-base font-medium font-sans">
                {edu.institution}
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400 pt-2 border-t border-slate-800/60 mt-3">
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={13} className="text-slate-400" />
                  <span>{edu.period}</span>
                </span>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin size={13} className="text-slate-400" />
                  <span>{edu.location}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
