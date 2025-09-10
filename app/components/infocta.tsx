"use client";
import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function InfoCTA() {
  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-4 py-2 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Info className="w-5 h-5 mr-2" />
          <span className="font-medium text-bgreen">More Information</span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-bgreen mb-4">
          Want to know more about SereneScope Properties?
        </h2>

        {/* Description */}
        <p className="text-gray-700 max-w-2xl mx-auto mb-6 text-base md:text-lg leading-relaxed">
          Whether you&apos;re looking for prime land, modern homes, or investment opportunities, 
          we&apos;re here to guide you every step of the way. 
          Get in touch with our team and discover how SereneScope can help you 
          secure the perfect property for your future.
        </p>

        {/* Button */}
        <motion.a
          href="/contact"
          className="inline-block bg-white text-bgreen hover:bg-bgreen hover:text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Contact Us Today
        </motion.a>
      </div>
    </section>
  );
}
