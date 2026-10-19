import React from "react";
import Hero from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import { Terminal } from "@/components/terminal/Terminal";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070d18] text-slate-200 selection:bg-emerald-500/25 selection:text-emerald-300">
      <main className="flex-1 w-full">
        {/* 1. Hero: Two columns with photo, value proposition, and resume download */}
        <Hero />

        {/* 2. Proof Strip: 4 verified fact stat cards */}
        <ProofStrip />

        {/* 3. About: Concise personal summary and core focus */}
        <About />

        {/* 4. Experience: Vertical timeline across Shaurya, LetsReflect, and MKCL */}
        <Experience />

        {/* 5. Projects: Featured workloads with one-line outcomes and expandable details */}
        <Work />

        {/* 6. Skills: Grouped by category with chip styling */}
        <Skills />

        {/* 7. Signature Terminal Section */}
        <section id="terminal" className="w-full max-w-6xl mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold mb-2">
              <span>⎈</span>
              <span>INTERACTIVE CLI SIMULATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 font-sans">
              Explore my profile like a DevOps engineer
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Run real-time simulated kubectl commands to inspect workloads, infrastructure services, and operational logs.
            </p>
          </div>

          <Terminal />
        </section>

        {/* 8. Education: Academic degrees */}
        <Education />

        {/* 9. Contact: Clear email, LinkedIn, and Resume download */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
