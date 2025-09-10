"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/client";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndStats = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.push("/login");
        return;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.role !== "admin") {
          router.push("/unauthorized");
          return;
        }
        setUsername(data.username || "Admin");
      } else {
        router.push("/unauthorized");
      }

      const usersSnap = await getDocs(collection(db, "users"));
    //   const productsSnap = await getDocs(collection(db, "products"));
    //   const categoriesSnap = await getDocs(collection(db, "category"));

    //   setStats({
    //     users: usersSnap.size,
    //     products: productsSnap.size,
    //     categories: categoriesSnap.size,
    //   });

      setLoading(false);
    };

    fetchUserAndStats();
  }, [router]);

   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 ">
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-bgreen mb-6">
        Welcome back, {username} 👋
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/60 shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-600">{stats.users}</h2>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-white/60 shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">
            {stats.products}
          </h2>
          <p className="text-gray-600">Total Products</p>
        </div>
        <div className="bg-white/60 shadow-md rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-purple-600">
            {stats.categories}
          </h2>
          <p className="text-gray-600">Categories</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="font-semibold text-lg mb-2 text-bgreen">
            Recent Activity
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>📦 New product added yesterday</li>
            <li>👤 Admin created a new user</li>
            <li>⚡ System backup completed</li>
          </ul>
        </div>

        <div className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="font-bold text-center text-xl text-bgreen mb-2">
            Quick Actions
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
           
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/admin/listings/new">
                <button className="bg-bgreen text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  + Add User
                </button>
              </Link>

              <Link href="/admin/products/new">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  + Add Product
                </button>
              </Link>

              <Link href="/admin/news/new">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  + Add News
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
