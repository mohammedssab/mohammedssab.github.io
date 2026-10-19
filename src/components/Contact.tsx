import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Contact: React.FC = () => {
  const { profile } = portfolioData;

  return (
    <section id="contact" className="max-w-3xl mx-auto py-24 px-4 sm:px-6 text-center">
      {/* Kubernetes Ingress Header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-6">
        <span>06.</span>
        <span>$ kubectl get contact</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mb-6 tracking-tight">
        Get In Touch
      </h2>

      <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
        I&apos;m currently open to new DevOps and infrastructure opportunities. Whether you have an inquiry, a technical discussion, or an open role, my inbox is always open!
      </p>

      {/* Main Mailto CTA */}
      <div className="mb-12">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-mono text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
        >
          <FiMail size={18} />
          <span>Say Hello ({profile.email})</span>
        </a>
      </div>

      {/* Verified Social Channels */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-800/80">
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 font-mono text-xs transition-colors"
        >
          <FiLinkedin size={16} />
          <span>LinkedIn</span>
        </a>

        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 font-mono text-xs transition-colors"
        >
          <FiGithub size={16} />
          <span>GitHub</span>
        </a>

        <a
          href={profile.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 font-mono text-xs transition-colors"
        >
          <FaXTwitter size={16} />
          <span>X / Twitter</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
