
"use client";

import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-center py-6 pb-8 md:pb-8 flex flex-col items-center gap-4">
      {/* Social links for mobile */}
      <div className="flex md:hidden gap-6 text-light-slate mb-2">
        <a
          href="https://github.com/mohammedssab"
          target="_blank"
          rel="noreferrer"
          className="hover:text-green transition-colors"
        >
          <FiGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/mohammed-sab-sagari"
          target="_blank"
          rel="noreferrer"
          className="hover:text-green transition-colors"
        >
          <FiLinkedin size={20} />
        </a>
        <a
          href="https://www.instagram.com/mohammed_sagari/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-green transition-colors"
        >
          <FiInstagram size={20} />
        </a>
        <a
          href="https://x.com/Mohammedsagari"
          target="_blank"
          rel="noreferrer"
          className="hover:text-green transition-colors"
        >
          <FaXTwitter size={20} />
        </a>
      </div>

      <div className="text-slate font-mono text-xs hover:text-green transition-colors">
        <a
            href="https://github.com/bchiang7/v4"
            target="_blank"
            rel="noreferrer"
            className="block mb-1"
        >
            Built by Mohammed Sab Sagari
        </a>
        <p>Inspired by Brittany Chiang</p>
      </div>
    </footer>
  );
};

export default Footer;
