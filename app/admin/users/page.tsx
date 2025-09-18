"use client";

import { useEffect, useState } from "react";
import { db, storage } from "../../firebase/client";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import Image from "next/image";

type UserType = {
  id: string;
  username?: string;
  email?: string;
  role: string;
  photoURL?: string | null;
};

export default function ManageUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: UserType[] = [];

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const userData = { id: doc.id, ...doc.data() } as UserType;

          try {
            const url = await getDownloadURL(
              ref(storage, `profilepics/${userData.id}`)
            );
            userData.photoURL = url;
          } catch {
            userData.photoURL = null; // fallback to initials
          }

          usersData.push(userData);
        })
      );

      setUsers(usersData);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchRole =
      filterRole === "all" || user.role.toLowerCase() === filterRole;

    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 mt-10">
      <div className="flex flex-row gap-10 items-center mb-4">
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-bgreen">
          Manage Users
        </h1>
        <Link
          href="/admin/users/new"
          className="text-bgreen bg-white/40 hover:bg-bgreen hover:text-white px-4 py-2 rounded-xl shadow-md transition font-medium"
        >
          + Add User
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by username or email..."
          className="w-full max-w-sm p-2 border border-gray-400 rounded-xl bg-white/50 text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border border-gray-400 rounded-xl bg-white/50 text-gray-800"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link href={`/admin/users/${user.id}`} key={user.id}>
                <div className="cursor-pointer min-w-[160px] flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-green-50 text-bgreen flex items-center justify-center text-2xl font-bold uppercase shadow-inner">
                      {user.username
                        ? user.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        : "NA"}
                    </div>
                  )}

                  <div className="mt-3 text-xl font-semibold text-bgreen text-center">
                    {user.username || "Unknown"}
                  </div>

                  <div className="text-sm text-gray-800 capitalize">
                    {user.role}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-gray-500 text-center w-full py-10">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
