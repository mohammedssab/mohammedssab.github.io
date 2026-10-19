import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  const { profile } = portfolioData;

  const footerLinks = [
    { name: "About", url: "/#about" },
    { name: "Experience", url: "/#experience" },
    { name: "Projects", url: "/#projects" },
    { name: "Skills", url: "/#skills" },
    { name: "Terminal", url: "/#terminal" },
    { name: "Education", url: "/#education" },
    { name: "Contact", url: "/#contact" },
  ];

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/70 py-12 px-4 sm:px-6 lg:px-8 text-center text-xs font-sans text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
          {footerLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className="hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Links on all screens */}
        <div className="flex items-center gap-5 text-slate-400">
          <a
            href={profile.links.email}
            aria-label="Email Mohammed"
            className="hover:text-emerald-400 transition-colors p-1"
          >
            <FiMail size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-emerald-400 transition-colors p-1"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-emerald-400 transition-colors p-1"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={profile.links.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter Profile"
            className="hover:text-emerald-400 transition-colors p-1"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href={profile.links.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
            className="hover:text-emerald-400 transition-colors p-1"
          >
            <FiInstagram size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 pt-2 border-t border-slate-900 w-full max-w-sm">
          Designed and built by <span className="text-slate-300">{profile.name}</span>. Built with Next.js, TypeScript, &amp; Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
