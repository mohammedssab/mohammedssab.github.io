"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { FiDownload, FiMail, FiTerminal } from "react-icons/fi";

const Hero: React.FC = () => {
  const { profile, resume } = portfolioData;

  const scrollToTerminal = () => {
    const el = document.getElementById("terminal");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const inputEl = document.getElementById("terminal-command-input") as HTMLInputElement | null;
    if (inputEl) {
      setTimeout(() => inputEl.focus(), 600);
    }
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Subtle radial gradient glow behind the hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none -z-10 blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Who I Am & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
          {/* Eyebrow with role */}
          <p className="text-emerald-400 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase">
            {profile.role}
          </p>

          {/* Large Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-sans">
            {profile.name}
          </h1>

          {/* ONE value sentence */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
            DevOps Engineer specializing in immutable Kubernetes platforms, Cilium eBPF networking, GitOps delivery with FluxCD and Argo CD, and high-scale stateful telemetry reliability.
          </p>

          {/* Two buttons (Download Resume, Contact me) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href={resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 font-sans cursor-pointer"
            >
              <FiDownload size={18} />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-medium border border-slate-700 bg-slate-900/80 text-white hover:border-slate-500 hover:bg-slate-800 active:scale-95 transition-all shadow-sm font-sans"
            >
              <FiMail size={18} />
              <span>Contact me</span>
            </a>
          </div>

          {/* Subtle secondary link */}
          <div className="pt-2">
            <button
              type="button"
              onClick={scrollToTerminal}
              className="text-slate-400 hover:text-emerald-400 text-sm font-mono inline-flex items-center gap-2 transition-colors cursor-pointer group"
            >
              <FiTerminal className="text-cyan-400 group-hover:text-emerald-400 transition-colors" size={16} />
              <span>Try the interactive terminal</span>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Right Column: Framed profile photo with soft glow or gradient border */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group">
            {/* Soft ambient glow */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            {/* Gradient border container */}
            <div className="relative p-1 rounded-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden">
              <Image
                src="/photo.jpg"
                alt={profile.name}
                width={360}
                height={400}
                priority
                className="w-64 h-72 sm:w-80 sm:h-96 object-cover object-top rounded-xl filter grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
