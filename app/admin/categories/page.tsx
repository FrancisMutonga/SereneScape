"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase/client";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategory: string[];
}

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subInputs, setSubInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "category"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Category, "id">),
    }));
    setCategories(data);
  };

  const handleAddSub = async (categoryId: string) => {
    const sub = subInputs[categoryId]?.trim();
    if (!sub) return;

    const category = categories.find((cat) => cat.id === categoryId);
    if (!category || category.subcategory.includes(sub)) return;

    const updatedSubcategory = [...category.subcategory, sub];
    await updateDoc(doc(db, "category", categoryId), {
      subcategory: updatedSubcategory,
    });

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, subcategory: updatedSubcategory }
          : cat
      )
    );
    setSubInputs((prev) => ({ ...prev, [categoryId]: "" }));
  };

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6  bg-white shadow-md rounded-lg text-black">
      <div className="flex flex-row  p-4 w-full justify-center gap-8 mx-auto">
        <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-bgreen text-center">
           Categories
        </h2>
        <div className=" flex justify-center ">
          <Link
            href="/admin/categories/add"
            className="px-4 py-2 bg-white/40 text-bgreen font-semibold rounded-3xl hover:bg-bgreen hover:text-white transition-colors shadow-xl"
          >
            + New
          </Link>
        </div>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="mb-6 border p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-2">
            <Image
              src={category.icon}
              alt={category.name}
              width={50}
              height={50}
              className="object-cover rounded"
              unoptimized
            />
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>

          <div className="mb-2">
            <p className="text-sm font-medium text-gray-700">Subcategories:</p>
            {category.subcategory.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-800 mt-1">
                {category.subcategory.map((sub, index) => (
                  <li key={index}>{sub}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">None yet</p>
            )}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Add subcategory"
              value={subInputs[category.id] || ""}
              onChange={(e) =>
                setSubInputs((prev) => ({
                  ...prev,
                  [category.id]: e.target.value,
                }))
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => handleAddSub(category.id)}
              className="bg-bgreen text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
