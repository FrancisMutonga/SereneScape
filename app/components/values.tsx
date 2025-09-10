"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Leaf, Lightbulb, Star } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Integrity",
    description: "We uphold honesty and transparency in every transaction.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Customer-Centricity",
    description: "Our clients are at the heart of everything we do.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-primary" />,
    title: "Sustainability",
    description: "We are committed to eco-friendly and lasting developments.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Innovation",
    description: "We embrace modern solutions for property ownership.",
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: "Excellence",
    description: "We deliver high-quality services and properties.",
  },
];

const CoreValues = () => {
  return (
    <section className="py-12 px-6 ">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-bgreen">Our Core Values</h2>
        <p className="text-gray-600 mt-4 text-lg">
          The guiding principles that shape everything we do.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-center text-bgreen mb-4">{value.icon}</div>
            <h3 className="text-xl text-center text-bgreen font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600 text-center text-sm">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
