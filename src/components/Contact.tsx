
"use client";

import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="max-w-xl mx-auto py-24 px-6 md:px-12 text-center mb-24">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-green font-mono text-base mb-4">04. What’s Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6">Get In Touch</h2>
        <p className="text-slate text-lg mb-12">
          I’m currently looking for new opportunities, my inbox is always open. Whether you have a question or just want
          to say hi, I’ll try my best to get back to you!
        </p>
        <a
          href="mailto:mdsab123sagari@gmail.com"
          className="text-green border border-green rounded px-8 py-4 font-mono text-sm hover:bg-green/10 transition-colors inline-block"
        >
          Say Hello
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;
