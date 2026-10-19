"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiDownload, FiTerminal, FiMail } from "react-icons/fi";

const Hero: React.FC = () => {
  const { profile } = portfolioData;

  const scrollToTerminal = () => {
    const el = document.getElementById("terminal");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto pt-24 pb-12 px-4 sm:px-6 flex flex-col justify-center min-h-[85vh]">
      {/* Kubernetes Cluster Header Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 font-mono text-xs mb-6 w-fit shadow-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-emerald-400 font-medium">Cluster:</span>
        <span className="text-slate-200">{profile.cluster}</span>
        <span className="text-slate-600">|</span>
        <span className="text-cyan-400 font-medium">Status:</span>
        <span className="text-slate-200">{profile.status}</span>
      </div>

      {/* Main Title & Role */}
      <div className="space-y-3 mb-6">
        <p className="font-mono text-emerald-400 text-sm sm:text-base font-medium tracking-wide">
          $ whoami
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-100 tracking-tight">
          {profile.name}
        </h1>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-400 leading-tight">
          {profile.role}
        </h2>
      </div>

      {/* Profile Summary */}
      <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
        {profile.summary}
      </p>

      {/* Specialization Tags */}
      <div className="flex flex-wrap gap-2 mb-10 max-w-3xl">
        {profile.specialization.map((spec, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded bg-slate-900/60 border border-slate-800/80 text-slate-300 font-mono text-xs hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
          >
            <span className="text-emerald-400 mr-1.5">▹</span>
            {spec}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={scrollToTerminal}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-mono text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <FiTerminal size={18} />
          <span>Launch Kubectl Terminal</span>
        </button>

        <a
          href="/Mohammed_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-mono text-sm font-semibold border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-emerald-400 hover:text-emerald-300 active:scale-95 transition-all shadow-sm"
        >
          <FiDownload size={18} />
          <span>View Resume (PDF)</span>
        </a>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-mono text-sm font-medium border border-transparent text-slate-400 hover:text-slate-100 transition-colors"
        >
          <FiMail size={18} />
          <span>Contact Me</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
