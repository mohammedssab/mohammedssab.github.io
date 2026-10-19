import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiBookOpen } from "react-icons/fi";

const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="max-w-5xl mx-auto py-20 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap font-mono flex items-center gap-2">
          <span className="text-emerald-400">05.</span>
          <span>Academic Background</span>
        </h2>
        <div className="h-[1px] w-full max-w-sm bg-slate-800"></div>
      </div>

      <p className="text-slate-400 text-sm font-mono mb-8">
        $ kubectl get education
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
              <FiBookOpen size={24} />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                {edu.status}
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                {edu.degree}
              </h3>
              <p className="text-slate-300 text-sm font-medium">
                {edu.institution}
              </p>
              <div className="flex items-center gap-3 font-mono text-xs text-slate-400 pt-1">
                <span>{edu.period}</span>
                <span className="text-slate-600">•</span>
                <span>{edu.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
