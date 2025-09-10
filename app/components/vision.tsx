"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const Vision = () => {
  return (
    <section className="py-16 px-6 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold text-bgreen mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To become{" "}
            <span className="font-semibold text-bgreen">
              Africa&apos;s leading real estate partner
            </span>
            , recognized for delivering quality investments and modern living
            solutions. We envision communities thriving in sustainable spaces
            built on trust, innovation, and excellence.
          </p>
        </motion.div>

        {/* Icon / Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Eye className="w-32 h-32 text-bgreen" />
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
