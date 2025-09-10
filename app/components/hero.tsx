"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Replace images with your real estate images
const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-12 gap-8 bg-brand-sand">
      {/* Carousel */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[index]}
              alt={`Property ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-bgreen leading-tight mb-4 flex items-center justify-center md:justify-start gap-2">
          Premium Properties, Seamless Connections
        </h1>
        <p className="text-lg md:text-xl text-black/80 mb-8 max-w-xl">
          Browse premium properties, connect with verified Realtors, and make your next move with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/properties"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-bgreen text-white font-medium hover:bg-brand-leaf transition"
          >
            Browse Properties <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-bgreen text-bgreen font-medium hover:bg-brand-sand hover:text-bgreen transition"
          >
            Connect with Realtors
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
