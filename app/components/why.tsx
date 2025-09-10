"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Users, Headphones } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-bgreen" />,
    title: "Verified Realtors",
    desc: "All agents and listings are verified for safety and trust.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-bgreen" />,
    title: "Smart Matching",
    desc: "We recommend the best-fit properties based on your preferences.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-bgreen" />,
    title: "Dedicated Support",
    desc: "Our friendly team is ready to assist you at every step.",
  },
  {
    icon: <Users className="w-8 h-8 text-bgreen" />,
    title: "Flexible Options",
    desc: "Choose from premium plots, commercial land, or residential properties.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 px-6 md:px-16 bg-brand-sand text-brand-black">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-bgreen mb-4"
        >
          Why Clients Trust Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg mb-12 text-brand-black/80"
        >
          We help you find the perfect property with confidence, safety, and personalized service.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className="bg-white/80 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 text-center border-t-4 border-bgreen"
            >
              <div className="bg-green-50 p-4 rounded-full inline-block mb-4 mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-bgreen mb-2">{item.title}</h3>
              <p className="text-bblack/80 text-md">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
