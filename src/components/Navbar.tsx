"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiDownload, FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { portfolioData } from "@/data/portfolioData";

const navLinks = [
  { name: "About", url: "/#about" },
  { name: "Experience", url: "/#experience" },
  { name: "Projects", url: "/#projects" },
  { name: "Skills", url: "/#skills" },
  { name: "Terminal", url: "/#terminal" },
  { name: "Education", url: "/#education" },
  { name: "Contact", url: "/#contact" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile, resume } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070d18]/90 backdrop-blur-md border-b border-slate-800 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name */}
        <Link
          href="/"
          className="flex items-center gap-2 font-sans text-base sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors group"
        >
          <span className="text-emerald-400 font-mono text-lg font-semibold group-hover:rotate-12 transition-transform">
            ⎈
          </span>
          <span>{profile.name}</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <ol className="flex items-center gap-6 font-sans text-sm text-slate-300 list-none m-0 p-0">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.url}
                  className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1 font-medium"
                >
                  <span className="text-emerald-400 font-mono text-xs">0{i + 1}.</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Resume Action Button */}
          <a
            href={resume.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-lg border border-emerald-400/80 text-emerald-400 hover:bg-emerald-950/40 transition-colors shadow-sm"
          >
            <FiDownload size={14} />
            <span>Resume</span>
          </a>

          {/* Social Icons in Navbar */}
          <div className="flex items-center gap-3 text-slate-400 border-l border-slate-800 pl-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-emerald-400 transition-colors"
            >
              <FiGithub size={17} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-emerald-400 transition-colors"
            >
              <FiLinkedin size={17} />
            </a>
            <a
              href={profile.links.email}
              aria-label="Email Mohammed"
              className="hover:text-emerald-400 transition-colors"
            >
              <FiMail size={17} />
            </a>
          </div>
        </div>

        {/* Mobile Hamburger Toggle & Resume */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href={resume.path}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-400/80 text-emerald-400"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-lg text-slate-300 hover:text-emerald-400 border border-slate-800 bg-slate-900 cursor-pointer"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070d18]/95 border-b border-slate-800 px-4 py-4 space-y-3 font-sans text-sm">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-emerald-400 py-1.5 border-b border-slate-900 font-medium"
            >
              <span className="text-emerald-400 font-mono text-xs mr-2">0{i + 1}.</span>
              <span>{link.name}</span>
            </Link>
          ))}
          <div className="flex items-center gap-5 pt-3 text-slate-400">
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
              href={profile.links.email}
              aria-label="Email Mohammed"
              className="hover:text-emerald-400 transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
