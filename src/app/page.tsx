import React from "react";
import Hero from "@/components/Hero";
import { Terminal } from "@/components/terminal/Terminal";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070d18] text-slate-200 selection:bg-emerald-500/25 selection:text-emerald-300">
      <main className="flex-1 w-full">
        {/* Hero Screen */}
        <Hero />

        {/* Interactive Kubectl Terminal Section */}
        <section id="terminal" className="w-full py-16 px-4 sm:px-6 bg-slate-950/40 border-y border-slate-800/80">
          <div className="max-w-5xl mx-auto mb-6 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold mb-1">
                <span>⎈</span>
                <span>INTERACTIVE COMMAND CENTER</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">
                Kubernetes CLI Terminal
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              Explore professional profile, workloads, and cluster services via real-time kubectl commands.
            </p>
          </div>

          <Terminal />
        </section>

        {/* Conventional Sections for Recruiters and Standard Browsing */}
        <About />
        <Skills />
        <Experience />
        <Work />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
