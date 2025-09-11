"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase/client";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

import Link from "next/link";
import HeroNews from "@/app/components/news";

interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  images: string[];
  subcategory?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategory?: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const subcategory =
    categories.find((cat) => cat.id === selectedCategory)?.subcategory || [];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Category, "id">),
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory
      ? product.categoryId === selectedCategory
      : true;

    const matchSubcategory = selectedSubcategory
      ? product.subcategory === selectedSubcategory
      : true;

    return matchCategory && matchSubcategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-6  shadow-lg rounded-lg mt-20 flex flex-col gap-4">
      <HeroNews />
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-center text-bgreen mb-6">
        Our Products
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6 text-gold">
        <button
          onClick={() => setSelectedCategory("")}
          className={`flex flex-col items-center p-3 shadow-md rounded-full text-gray-700 hover:bg-gray-200 ${
            selectedCategory === "" ? "bg-grey" : ""
          }`}
        >
          <span className="mt-2 text-sm font-semibold">All</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex flex-col items-center p-3 shadow-md hover:bg-gray-200 rounded-full ${
              selectedCategory === category.id ? "bg-grey" : ""
            }`}
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={100}
              height={100}
              className="rounded-xl"
            />
            <span className="mt-2 text-lg text-gray-700 font-semibold">
              {category.name}
            </span>
          </button>
        ))}
      </div>
      {/* Subcategory Filter */}
      {subcategory.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {subcategory.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-xl border shadow-md ${
                selectedSubcategory === sub
                  ? "bg-bgreen text-white"
                  : "bg-white text-bgreen"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} href={`/properties/${product.id}`}>
              <div className="  p-2 rounded-lg shadow-2xl cursor-pointer transition-transform transform hover:scale-105 flex flex-col items-center text-center w-full h-[380px]">
                {/* Product Image */}
                <div className="w-full h-[320px] flex justify-center items-center">
                  {product?.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={300}
                      height={280}
                      className="rounded-lg object-contain w-full h-full"
                    />
                  ) : (
                    <p className="text-gray-500 text-center">
                      No Image Available
                    </p>
                  )}
                </div>

                <h3 className="mt-2 text-2xl font-bold text-bgreen">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available
          </p>
        )}
      </div>
    </div>
  );
}
