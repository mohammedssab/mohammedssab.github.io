"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Terminal", url: "/#terminal" },
  { name: "About", url: "/#about" },
  { name: "Skills", url: "/#skills" },
  { name: "Experience", url: "/#experience" },
  { name: "Projects", url: "/#projects" },
  { name: "Contact", url: "/#contact" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-slate-100 hover:text-emerald-400 transition-colors group"
        >
          <span className="text-emerald-400 text-lg group-hover:rotate-12 transition-transform">
            ⎈
          </span>
          <span>mohammed@kubeops</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/40 hidden sm:inline">
            prod
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <ol className="flex items-center gap-6 font-mono text-xs text-slate-300 list-none m-0 p-0">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.url}
                  className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1"
                >
                  <span className="text-emerald-400">0{i + 1}.</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Resume PDF Action Button */}
          <a
            href="/Mohammed_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 rounded border border-emerald-400/80 text-emerald-400 hover:bg-emerald-950/40 transition-colors shadow-sm"
          >
            <FiDownload size={14} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="/Mohammed_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-2.5 py-1 rounded border border-emerald-400/80 text-emerald-400"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded text-slate-300 hover:text-emerald-400 border border-slate-800 bg-slate-900"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070d18]/95 border-b border-slate-800 px-4 py-4 space-y-3 font-mono text-sm">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-emerald-400 py-1.5 border-b border-slate-900"
            >
              <span className="text-emerald-400 mr-2">0{i + 1}.</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
