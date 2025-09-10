"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Icon / Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Target className="w-32 h-32 text-bgreen" />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold text-bgreen mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To make land and property ownership{" "}
            <span className="font-semibold text-primary">
              accessible, secure, and rewarding
            </span>{" "}
            through innovation, professionalism, and transparency. We aim to
            empower families, investors, and communities to build lasting
            legacies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
