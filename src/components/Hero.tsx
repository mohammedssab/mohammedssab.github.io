
"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center min-h-screen max-w-5xl mx-auto px-6 sm:px-12 md:px-24">
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-green font-mono text-base mb-5"
      >
        Hi, my name is
      </motion.p>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate mb-4"
      >
        Mohammed Sab Sagari.
      </motion.h1>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate mb-6 leading-tight"
      >
        Linux System Administrator & <br className="block md:hidden" />
        DevOps Engineer.
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="text-slate max-w-xl text-lg mb-12"
      >
        I specialize in DevOps & Infrastructure Automation, Docker, Ansible, and CI/CD. I am an Open-Source Advocate.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      >
        <a
          href="/Mohammed_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green border border-green rounded px-6 py-4 font-mono text-sm hover:bg-green/10 transition-colors inline-block"
        >
          Check out my resume!
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
