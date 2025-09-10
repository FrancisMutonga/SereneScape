"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const reasons = [
  "Transparent land acquisition process",
  "Flexible and affordable payment plans",
  "Prime property locations near growing towns and cities",
  "Full package ; land, homes, and interior solutions",
  "Trusted by hundreds of satisfied investors and families",
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 px-6 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-bgreen mb-6">
            Why Choose Us
          </h2>
          <ul className="space-y-4">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-gray-700 text-lg">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Image/Visual Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src="/images/why2.jpg" 
            alt="Why Choose SereneScope Properties"
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
            width={600}
            height={400}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
