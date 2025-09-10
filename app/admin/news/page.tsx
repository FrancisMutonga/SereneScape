"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/firebase/client";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

export default function AdminNews() {
  const [news, setNews] = useState<{ id: string; name: string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const newsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as { id: string; name: string; image: string }[];
      setNews(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  const deleteNews = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this news?")) return;

    setDeleting(id);
    try {
      await deleteDoc(doc(db, "news", id));
      if (imageUrl) {
        const storage = getStorage();
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      setNews((prevNews) => prevNews.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news. Please try again.");
    }
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-5xl font-bold text-bgreen">
          Manage News
        </h2>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 hover:bg-bgreen bg-white hover:text-white text-bgreen  px-5 py-2 rounded-full shadow-md hover:bg-primary/90 transition"
        >
          <Plus size={18} /> Add 
        </Link>
      </div>

     

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition relative"
          >
            {/* Image */}
            <div className="relative w-full h-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.name}
              </h3>
              <button
                onClick={() => deleteNews(item.id, item.image)}
                disabled={deleting === item.id}
                className={`flex items-center gap-1 text-sm px-3 py-2 rounded-md transition ${
                  deleting === item.id
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                <Trash2 size={16} />
                {deleting === item.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
