"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/client";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type UserProfile = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber?: string;
  gender?: string;
  role?: string;
  photoURL?: string;
};

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }


  if (!profile) {
    return <div className="text-center mt-10 text-gray-500">No profile data found.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6  backdrop-blur-sm">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full border-2 border-bgreen shadow-md overflow-hidden flex items-center justify-center bg-green-50">
          {profile.photoURL ? (
            <Image
              src={profile.photoURL}
              alt="Profile"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-bgreen" />
          )}
        </div>
        <h2 className="mt-4 text-xl font-bold text-bgreen">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-gray-500 text-sm">@{profile.username}</p>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Profile Details */}
      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-bgreen">Phone</span>
          <span>{profile.phoneNumber || "N/A"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-bgreen">Gender</span>
          <span>{profile.gender || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-bgreen">Role</span>
          <span className="capitalize">{profile.role || "admin"}</span>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/admin/profile/edit"
          className="px-5 py-2 bg-white/40 text-bgreen rounded-3xl hover:bg-bgreen hover:text-white transition-colors shadow-xl"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
