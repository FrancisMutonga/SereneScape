"use client";
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { value: 120, label: "Plots Sold" },
  { value: 15, label: "Years of Experience", suffix: "+" },
  { value: 99, label: "Client Satisfaction", suffix: "%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Stats: React.FC = () => {
  return (
    <section className=" py-6">
      <motion.div
        className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="transform transition duration-500 hover:scale-105"
          >
            <h3 className="text-5xl font-bold text-bgreen">
              <CountUp
                end={stat.value}
                duration={2}
                suffix={stat.suffix || "+"}
                enableScrollSpy
                scrollSpyDelay={500}
              />
            </h3>
            <p className="text-lg text-bblack mt-3">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
