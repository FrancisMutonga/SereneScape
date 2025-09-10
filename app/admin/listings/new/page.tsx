"use client";

import { useState, useEffect } from "react";
import { db, storage } from "./../../../firebase/client";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Product {
  name: string;
  features: string[];
  location: string;
  price: string;
  type: string;
  categoryId: string;
  subcategory?: string;
  available: boolean;
  images: string[];
  videos: string[];
}

interface Category {
  id: string;
  name: string;
  subcategory?: string[];
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    features: [],
    location: "",
    price: "",
    type: "",
    categoryId: "",
    subcategory: "",
    available: false,
    images: [],
    videos: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      setCategories(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, "id">),
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const uploadVideos = async () => {
    const videoUrls: string[] = [];
    for (const video of videos) {
      const videoRef = ref(storage, `products/${Date.now()}-${video.name}`);
      await uploadBytes(videoRef, video);
      const videoUrl = await getDownloadURL(videoRef);
      videoUrls.push(videoUrl);
    }
    return videoUrls;
  };
  const uploadImages = async () => {
    const imageUrls: string[] = [];
    for (const image of images) {
      const imageRef = ref(storage, `products/${Date.now()}-${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }
    return imageUrls;
  };

  const handleChange = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.categoryId ||
      !product.price ||
      !product.type
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const [imageUrls, videoUrls] = await Promise.all([
        uploadImages(),
        uploadVideos(),
      ]);

      await addDoc(collection(db, "products"), {
        ...product,
        images: imageUrls,
        videos: videoUrls,
        createdAt: serverTimestamp(),
      });

      alert("Product added successfully ✅");
      setProduct({
        name: "",
        features: [],
        location: "",
        price: "",
        type: "",
        categoryId: "",
        subcategory: "",
        available: false,
        images: [],
        videos: [],
      });
      setImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product ❌");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8  bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-700 text-center mb-8">
        Add Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <input
          type="text"
          placeholder="Item Name"
          value={product.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-xl"
          required
        />

        {/* Price & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Price "
            value={product.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={product.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-xl"
          />
        </div>

        {/* Type */}
        <input
          type="text"
          placeholder="Type "
          value={product.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-xl"
          required
        />

        {/* Category */}
        <select
          value={product.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-xl"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        {product.categoryId && (
          <select
            value={product.subcategory || ""}
            onChange={(e) => handleChange("subcategory" as any, e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-xl"
            required
          >
            <option value="">Select Subcategory</option>
            {categories
              .find((cat) => cat.id === product.categoryId)
              ?.subcategory?.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        )}

        {/* Features */}
        <textarea
          placeholder="Features (comma separated)"
          value={product.features.join(", ")}
          onChange={(e) =>
            handleChange(
              "features",
              e.target.value.split(",").map((f) => f.trim())
            )
          }
          className="w-full p-3 border border-gray-400 rounded-xl"
        />

        {/* Availability */}
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={product.available}
            onChange={(e) => handleChange("available", e.target.checked)}
          />
          <span>Available for Auction</span>
        </label>

        {/* Images */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="w-full p-3 border border-gray-400 rounded-xl"
          />
        </div>

        {/* Videos */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Upload Videos
          </span>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => setVideos(Array.from(e.target.files || []))}
            className="w-full p-3 border border-gray-400 rounded-xl"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" hover:bg-bgreen hover:text-white  text-bgreen bg-white py-3 px-6 rounded-full font-semibold  transition"
            disabled={loading}
          >
            {loading ? "Adding Item..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
