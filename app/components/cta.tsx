"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTASection: React.FC = () => {
  return (
    <section className=" rounded-xl py-12 px-4 w-screen overflow-hidden">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl text-bgreen font-bold leading-tight"
        >
          Start Your Property Journey Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-brand-black max-w-2xl mx-auto"
        >
          Browse premium plots, connect with verified Realtors, and make your next property move with confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link
            href="/properties"
            className="inline-block bg-bgreen text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-brand-leaf transition duration-300"
          >
            Browse Properties
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white text-bgreen border border-bgreen px-6 py-3 rounded-full font-semibold shadow-md hover:bg-brand-sand transition duration-300"
          >
            Connect with Realtors
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
