import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  const { profile } = portfolioData;

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-10 px-4 text-center text-xs font-mono text-slate-400">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        {/* Mobile Social Links */}
        <div className="flex md:hidden gap-5 text-slate-400 mb-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-emerald-400 transition-colors"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-emerald-400 transition-colors"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={profile.links.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter Profile"
            className="hover:text-emerald-400 transition-colors"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href={profile.links.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
            className="hover:text-emerald-400 transition-colors"
          >
            <FiInstagram size={18} />
          </a>
        </div>

        {/* Cluster Telemetry Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cluster: {profile.cluster}</span>
          </span>
          <span className="text-slate-700">•</span>
          <span>Namespace: {profile.namespace}</span>
          <span className="text-slate-700">•</span>
          <span>GitOps: Argo CD Synced</span>
          <span className="text-slate-700">•</span>
          <span>GitHub Pages (Static Export)</span>
        </div>

        {/* Copyright & Info */}
        <div className="space-y-1 text-slate-400 pt-2 border-t border-slate-900 w-full max-w-md">
          <p className="text-slate-300">
            Designed & Engineered by <span className="text-emerald-400 font-semibold">{profile.name}</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Kubernetes CLI Theme • Next.js 16 • React 19 • TypeScript 5
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
