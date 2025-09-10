"use client";
import { useState } from "react";
import { db } from "../../../firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function AddNews() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!name || !image) return alert("Fill all fields");

    setLoading(true);

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `news/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error(error);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(db, "news"), {
            name,
            image: downloadURL,
            createdAt: serverTimestamp(),
          });

          alert("News added successfully!");
          setName("");
          setImage(null);
          window.location.reload();
        }
      );
    } catch (error) {
      console.error("Error adding news:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-4xl mt-32 mx-auto px-6 py-12 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-center text-bgreen font-bold mb-8">
        Add News
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          type="text"
          placeholder="News Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-bgreen text-slate rounded-2xl"
          required
          disabled={loading}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-bgreen text-slate rounded-2xl"
          required
          disabled={loading}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-accent hover:bg-bgreen hover:text-white bg-white text-bgreen shadow-xl px-6 py-3 rounded-3xl"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Add News"}
          </button>
        </div>
      </form>
    </div>
  );
}
