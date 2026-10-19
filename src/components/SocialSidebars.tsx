"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const SocialSidebars: React.FC = () => {
  const { profile } = portfolioData;

  return (
    <>
      {/* Left Social Sidebar - Only on very wide screens to avoid overlapping content */}
      <div className="hidden xl:block fixed bottom-0 left-8 z-40 text-slate-400">
        <ul className="flex flex-col gap-5 items-center m-0 p-0 list-none after:content-[''] after:block after:w-[1px] after:h-20 after:mx-auto after:bg-slate-700">
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 inline-block hover:text-emerald-400 hover:-translate-y-1 transition-all"
            >
              <FiGithub size={18} />
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 inline-block hover:text-emerald-400 hover:-translate-y-1 transition-all"
            >
              <FiLinkedin size={18} />
            </a>
          </li>
          <li>
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="p-2 inline-block hover:text-emerald-400 hover:-translate-y-1 transition-all"
            >
              <FiInstagram size={18} />
            </a>
          </li>
          <li>
            <a
              href={profile.links.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="X / Twitter Profile"
              className="p-2 inline-block hover:text-emerald-400 hover:-translate-y-1 transition-all"
            >
              <FaXTwitter size={18} />
            </a>
          </li>
        </ul>
      </div>

      {/* Right Email Sidebar - Only on very wide screens */}
      <div className="hidden xl:block fixed bottom-0 right-8 z-40 text-slate-400">
        <div className="flex flex-col gap-6 items-center m-0 p-0 after:content-[''] after:block after:w-[1px] after:h-20 after:mx-auto after:bg-slate-700">
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Send email to ${profile.email}`}
            className="p-2 my-4 text-xs font-mono tracking-widest hover:text-emerald-400 hover:-translate-y-1 transition-all [writing-mode:vertical-rl]"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialSidebars;
