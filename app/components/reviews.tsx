"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

interface Review {
  name: string;
  title: string;
  profilePic: string;
  testimony: string;
  date: string;
}

const Reviews: React.FC = () => {
  // Place the data here
  const reviews: Review[] = [
    {
      name: "Grace",
      title: "Land owner - Nairobi",
      profilePic: "/images/review3.jpg",
      testimony:
        "We found the perfect plot within a week — so professional!",
      date: "July 22, 2025",
    },
    {
      name: "Mercy",
      title: "Realtor Nairobi",
      profilePic: "/images/review4.jpg",
      testimony:
        "Finally, a platform that cares about customers and staff.",
      date: "June 15, 2025",
    },
    {
      name: "John Kiragu",
      title: "Homeowner - Kitengela",
      profilePic: "/images/review1.jpg",
      testimony:
        "The process was smooth and easy. Highly recommended!",
      date: "May 30, 2025",
    },
    {
      name: "Joan",
      title: "Home owner",
      profilePic: "/images/reviewv.jpg",
      testimony:
        "I Retired in a safe, respectful home. Thank you!",
      date: "April 18, 2025",
    },
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  return (
    <section className="py-6 py-10 overflow-hidden w-full ">
      <div className="max-w-6xl mx-auto p-4 ">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-bgreen"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="overflow-hidden w-full py-6 px-4" ref={emblaRef}>
          <div className="flex w-full gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.3333%] px-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className=" bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Image
                      src={review.profilePic}
                      alt={`${review.name}'s profile`}
                      width={80}
                      height={80}
                      className="rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-bgreen">
                        {review.name}
                      </h3>
                      <h6 className="text-sm text-brand-black">
                        {review.title}
                      </h6>
                    </div>
                  </div>
                  <p className="text-brand-black italic mb-4">{`"${review.testimony}"`}</p>
                  <p className="text-sm text-brand-gold text-right">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
