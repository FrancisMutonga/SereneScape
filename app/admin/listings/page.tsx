"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "./../../firebase/client";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  subcategory?: string;
}

interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      const categoryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Category, "id">),
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredProducts = categoryFilter
    ? products.filter((product) => product.categoryId === categoryFilter)
    : products;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-2">
      <div className="flex flex-row justify-between items-center gap-12 py-6 px-3">
        <h2 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-bgreen text-center mb-8">
          Products
        </h2>
        <div className=" ">
          <Link
            href={"/admin/listings/new"}
            className="bg-white text-bgreen hover:bg-bgreen hover:text-white px-4 py-2 rounded-full text-lg shadow-md"
          >
            {" "}
            +new
          </Link>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-bgreen rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="bg-white/40 rounded-xl shadow-md overflow-hidden px-6 py-2">
        {filteredProducts.length > 0 ? (
          <ul className="divide-y divide-gray-400">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center px-6 py-4 transition"
              >
                <div>
                  <h3 className="font-medium text-bgreen">{product.name}</h3>
                </div>
                <div>
                  <Link
                    href={`/admin/listings/${product.id}`}
                    className="bg-white text-bgreen hover:bg-bgreen hover:text-white px-4 py-2 rounded-2xl  text-sm transition"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-6">No products found.</p>
        )}
      </div>
    </div>
  );
}
