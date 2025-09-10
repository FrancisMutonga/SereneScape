"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <motion.section
      className="w-full py-10 px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 bg-brand-sand"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Left Side - Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-bgreen">
          Who We Are
        </h2>
        <p className="mt-4 text-brand-black/80">
          We are dedicated to connecting buyers with premium properties and verified Realtors. Our mission is to make property searches safe, transparent, and effortless, ensuring clients find their dream homes with confidence.
        </p>
        <div className="flex justify-center">
            <Link href="/about">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-bgreen text-white py-3 px-6 rounded-xl shadow-lg hover:bg-brand-leaf transition"
          >
            Learn More
          </motion.button>
        </Link>
        </div>
      </div>

      {/* Right Side - Animated Image */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src="/images/about.jpg" 
          alt="About Us"
          width={500}
          height={400}
          className="rounded-2xl shadow-xl object-cover"
        />
      </motion.div>
    </motion.section>
  );
};

export default AboutUs;
