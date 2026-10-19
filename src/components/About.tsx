import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";

const About: React.FC = () => {
  const { profile, education } = portfolioData;

  return (
    <section id="about" className="max-w-5xl mx-auto py-20 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 whitespace-nowrap font-mono flex items-center gap-2">
          <span className="text-emerald-400">01.</span>
          <span>About Me</span>
        </h2>
        <div className="h-[1px] w-full max-w-sm bg-slate-800"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left Column: Text & Specs */}
        <div className="md:col-span-2 space-y-5 text-slate-300 text-base leading-relaxed">
          <p>
            Hello! I&apos;m <span className="text-slate-100 font-semibold">{profile.name}</span>, a{" "}
            <span className="text-emerald-400 font-medium">DevOps Engineer & Linux System Administrator</span> based in{" "}
            <span className="text-slate-100">{profile.location}</span>. My journey into infrastructure engineering started in 2018 when I began as an Information Technology Fellow at MKCL.
          </p>

          <p>
            Today, I work at <span className="text-emerald-400 font-medium">Shaurya Technosoft</span>, engineering reliable delivery pipelines with GitHub Actions, automating Kubernetes workloads using Helm and Argo CD, hardening server security, and building centralized observability systems with Prometheus, Grafana, and Loki.
          </p>

          <p>
            I hold a{" "}
            <span className="text-slate-100 font-medium">{education[0].degree}</span> from{" "}
            <span className="text-emerald-400">{education[0].institution}</span> and a{" "}
            <span className="text-slate-100 font-medium">{education[1].degree}</span> from{" "}
            <span className="text-emerald-400">{education[1].institution}</span>.
          </p>

          {/* Quick Node Specs HUD */}
          <div className="pt-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
              <span className="text-cyan-400">⎈</span>
              <span>Node Environment & Telemetry</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">OS / KERNEL</span>
                <span className="text-slate-200 font-medium">Linux (Production)</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">CLUSTER ROLE</span>
                <span className="text-emerald-400 font-medium">DevOps Engineer</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">LOCATION</span>
                <span className="text-slate-200 font-medium">{profile.location}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">ORCHESTRATION</span>
                <span className="text-cyan-400 font-medium">Kubernetes & Helm</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">GITOPS</span>
                <span className="text-slate-200 font-medium">Argo CD</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">STATUS</span>
                <span className="text-emerald-400 font-medium">● Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Photo with Terminal Frame */}
        <div className="flex flex-col items-center">
          <div className="relative group max-w-[260px] w-full">
            {/* Terminal Window Header for Photo */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-t-lg">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-[10px] text-slate-400">photo.jpg</span>
            </div>

            {/* Photo Image Container */}
            <div className="relative border-x border-b border-slate-700/80 rounded-b-lg overflow-hidden bg-slate-950 aspect-square">
              <Image
                src="/photo.jpg"
                alt="Mohammed Sab Sagari"
                width={300}
                height={300}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-multiply group-hover:opacity-0 transition-opacity pointer-events-none" />
            </div>

            {/* Sub-label */}
            <p className="font-mono text-center text-xs text-slate-400 mt-3">
              Mohammed Sab Sagari
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
