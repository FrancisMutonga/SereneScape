"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect } from "react";
import { db } from "../firebase/client";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

export default function HeroNews() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [news, setNews] = useState<{ id: string; name: string; image: string }[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const querySnapshot = await getDocs(collection(db, "news"));
      const newsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as { id: string; name: string; image: string }[];
      setNews(newsData);
    };

    fetchNews();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!embla) return;
    const autoplay = setInterval(() => embla.scrollNext(), 4000);
    return () => clearInterval(autoplay);
  }, [embla]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0  z-10"></div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {news.map((item) => (
            <div key={item.id} className="flex-none w-full relative">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full max-h-[90vh] object-contain"
                width={1920}
                height={1080}
                priority
              />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
