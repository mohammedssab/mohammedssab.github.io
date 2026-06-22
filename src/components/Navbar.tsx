
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", url: "/#about" },
  { name: "Experience", url: "/#jobs" },
  { name: "Work", url: "/#projects" },
  { name: "Contact", url: "/#contact" },
];

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 w-full px-6 py-4 transition-all duration-300 ${
        scrolledToTop ? "h-24 bg-transparent shadow-none" : "h-16 bg-navy/90 shadow-lg backdrop-blur"
      } ${scrollDirection === "down" && !scrolledToTop ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="flex items-center justify-between w-full h-full max-w-7xl mx-auto">
        <Link href="/" className="text-green font-mono text-xl z-50 border-2 border-green rounded p-1 hover:bg-green/10 transition-colors">
          M
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ol className="flex gap-8 list-none m-0 p-0">
            {navLinks.map(({ name, url }, i) => (
              <motion.li
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Link
                  href={url}
                  className="text-lightest-slate hover:text-green font-mono text-sm transition-colors"
                >
                  <span className="text-green mr-1">0{i + 1}.</span>
                  {name}
                </Link>
              </motion.li>
            ))}
          </ol>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
          >
            <Link
              href="/Mohammed_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green border border-green rounded px-4 py-2 font-mono text-sm hover:bg-green/10 transition-colors"
            >
              Resume
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
