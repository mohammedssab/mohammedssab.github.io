
"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const SocialSidebars = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden md:block fixed bottom-0 left-10 right-auto z-10 text-light-slate"
      >
        <ul className="flex flex-col gap-6 items-center m-0 p-0 list-none after:content-[''] after:block after:w-[1px] after:h-24 after:mx-auto after:bg-light-slate">
          <li>
            <a
              href="https://github.com/mohammedssab"
              target="_blank"
              rel="noreferrer"
              className="p-2 inline-block hover:text-green hover:-translate-y-1 transition-all"
            >
              <FiGithub size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mohammed-sab-sagari"
              target="_blank"
              rel="noreferrer"
              className="p-2 inline-block hover:text-green hover:-translate-y-1 transition-all"
            >
              <FiLinkedin size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/mohammed_sagari/"
              target="_blank"
              rel="noreferrer"
              className="p-2 inline-block hover:text-green hover:-translate-y-1 transition-all"
            >
              <FiInstagram size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/Mohammedsagari"
              target="_blank"
              rel="noreferrer"
              className="p-2 inline-block hover:text-green hover:-translate-y-1 transition-all"
            >
              <FaXTwitter size={20} />
            </a>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden md:block fixed bottom-0 left-auto right-10 z-10 text-light-slate"
      >
        <div className="flex flex-col gap-6 items-center m-0 p-0 after:content-[''] after:block after:w-[1px] after:h-24 after:mx-auto after:bg-light-slate">
          <a
            href="mailto:mdsab123sagari@gmail.com"
            className="p-2 my-5 text-xs font-mono tracking-widest hover:text-green hover:-translate-y-1 transition-all [writing-mode:vertical-rl]"
          >
            mdsab123sagari@gmail.com
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default SocialSidebars;
