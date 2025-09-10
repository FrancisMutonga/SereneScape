"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const History = () => {
  return (
    <section className="py-12 px-6 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/logo.png" 
            alt="About SereneScope Properties"
            width={600}
            height={400}
            className="rounded-xl object-cover shadow-lg"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-bgreen mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
            At <span className="font-semibold text-primary">SereneScape Properties</span>, 
            we are redefining real estate with trust, transparency, and innovation. 
            Our mission is to provide prime land, modern homes, and quality finishes 
            that empower families, investors, and communities to thrive.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            With a commitment to excellence, we bring together years of expertise 
            in property development, land acquisition, and interior solutions. 
            We pride ourselves in creating sustainable investments and 
            dream spaces that stand the test of time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default History;
