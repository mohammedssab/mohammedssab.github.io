import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiMail, FiLinkedin, FiDownload, FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Contact: React.FC = () => {
  const { profile, resume } = portfolioData;

  return (
    <section id="contact" className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="mb-4">
        <span className="text-emerald-400 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase">
          Get In Touch
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
        Let&apos;s Connect
      </h2>

      <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans font-normal">
        I am open to DevOps, Site Reliability, and Linux Infrastructure roles. Whether you have an open position or want to discuss technical architectures, feel free to reach out.
      </p>

      {/* Clear Action Buttons: Email, LinkedIn, Resume */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-sans text-sm sm:text-base font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <FiMail size={18} />
          <span>Email Me ({profile.email})</span>
        </a>

        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-sans text-sm sm:text-base font-medium border border-slate-700 bg-slate-900/80 text-white hover:border-slate-500 hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
        >
          <FiLinkedin size={18} />
          <span>LinkedIn</span>
        </a>

        <a
          href={resume.path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-sans text-sm sm:text-base font-medium border border-slate-700 bg-slate-900/80 text-white hover:border-slate-500 hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
        >
          <FiDownload size={18} />
          <span>Download Resume</span>
        </a>
      </div>

      {/* Additional Verified Channels */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-800/80 text-slate-400 text-sm font-sans">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
        >
          <FiGithub size={16} />
          <span>GitHub</span>
        </a>

        <a
          href={profile.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
        >
          <FaXTwitter size={16} />
          <span>X (Twitter)</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
