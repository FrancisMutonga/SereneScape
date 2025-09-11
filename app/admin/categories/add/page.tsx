"use client";

import { useState } from "react";
import { db, storage } from "@/app/firebase/client";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [subInput, setSubInput] = useState("");
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddSub = () => {
    if (subInput.trim() && !subcategory.includes(subInput.trim())) {
      setSubcategory([...subcategory, subInput.trim()]);
      setSubInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !icon) return alert("Category name and icon are required");

    setLoading(true);

    try {
      const iconRef = ref(storage, `icons/${Date.now()}-${icon.name}`);
      await uploadBytes(iconRef, icon);
      const iconUrl = await getDownloadURL(iconRef);

      await addDoc(collection(db, "category"), {
        name,
        icon: iconUrl,
        subcategory,
        createdAt: serverTimestamp(),
      });

      alert("Category added successfully!");
      setName("");
      setIcon(null);
      setSubcategory([]);
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white shadow-md rounded-xl ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-bgreen mb-6">
         New Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-xl"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setIcon(e.target.files?.[0] || null)}
          className="w-full p-3 border rounded-xl"
          required
        />

        <div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Subcategory"
              value={subInput}
              onChange={(e) => setSubInput(e.target.value)}
              className="flex-1 p-2 border rounded-xl"
            />
            <button
              type="button"
              onClick={handleAddSub}
              className="bg-bgreen text-white px-4 py-3 px-6 rounded-full ml-3"
            >
              Add
            </button>
          </div>

          {subcategory.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {subcategory.map((sub, index) => (
                <li key={index}>{sub}</li>
              ))}
            </ul>
          )}
        </div>

       <div className="flex justify-center">
         <button
          type="submit"
          disabled={loading}
          className=" bg-white text-bgreen hover:bg-bgreen hover:text-white  font-semibold py-3 px-6 rounded-full mt-4"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
       </div>
      </form>
    </div>
  );
}
