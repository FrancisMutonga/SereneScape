"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../../../firebase/client";
import {
  FaArrowLeft, 
} from "react-icons/fa";
import { User } from "lucide-react";
import Image from "next/image";

interface Profile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  gender: string;
  role: "admin";
  photoURL?: string;
}

export default function UserProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...(docSnap.data() as Profile) };
          setProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            User Not Found
          </h2>
          <p className="text-red-600 mb-4">
            The requested user profile could not be found.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto  p-6  backdrop-blur-sm">
      <div className=" h-32 rounded-xl relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-0 bg-white/50 hover:bg-bgreen hover:text-white text-bgreen p-2 rounded-lg backdrop-blur-sm"
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full border-2 border-bgreenshadow-md overflow-hidden flex items-center justify-center bg-green-50">
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

    </div>
  );
}
