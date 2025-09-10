"use client";

import { useState, useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import {  useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage, db, auth } from "./../../../firebase/client";
import Image from "next/image";
import {
  FaArrowLeft, 
} from "react-icons/fa";

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  gender: string;
  photoURL?: string;
  role?: string;
}

export default function AdminProfileSetup() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    gender: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load existing profile if it exists
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          phoneNumber: data.phoneNumber || "",
          gender: data.gender || "",
        });
        if (data.photoURL) setPreview(data.photoURL);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
    setShowOptions(false);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    let photoURL = preview || "";

    if (image) {
      const imageRef = ref(storage, `profilepics/${user.uid}`);
      await uploadBytes(imageRef, image);
      photoURL = await getDownloadURL(imageRef);
    }

    const docRef = doc(db, "users", user.uid);
    const updateData: Partial<ProfileData> = {
      ...profile,
      photoURL,
      role: "admin",
    };
    await updateDoc(docRef, updateData);

    alert("Profile saved successfully!");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto  p-6  rounded-xl shadow-sm space-y-4">
      <div className=" h-32 rounded-xl relative">
              <button
                onClick={() => router.back()}
                className="absolute top-4 left-0 bg-white/50 hover:bg-bgreen hover:text-white text-bgreen p-2 rounded-lg backdrop-blur-sm"
              >
                <FaArrowLeft />
              </button>
            </div>
      <div className="flex flex-col items-center">
        <div
          className="w-28 h-28 rounded-full border-2 border-gray-300 relative overflow-hidden flex items-center justify-center cursor-pointer group"
          onClick={() => setShowOptions(true)}
        >
          {preview ? (
            <Image
              src={preview}
              alt="Profile"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="w-12 h-12 text-gray-400" />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Image Options Popup */}
        {showOptions && (
          <div className="mt-2 p-3 bg-white/50 border rounded shadow-md text-sm space-y-2 z-50 relative">
            <label className="flex items-center space-x-2 cursor-pointer text-blue-600">
              <UserIcon className="w-4 h-4" />
              <span>Take Photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <label className="flex items-center space-x-2 cursor-pointer text-blue-600">
              <UserIcon className="w-4 h-4" />
              <span>Gallery</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {preview && (
              <button
                onClick={() => {
                  setPreview(null);
                  setImage(null);
                  setShowOptions(false);
                }}
                className="flex items-center space-x-2 text-red-500"
              >
                <UserIcon className="w-4 h-4" />
                <span>Remove Photo</span>
              </button>
            )}
            <button
              onClick={() => setShowOptions(false)}
              className="text-gray-600 text-xs underline"
            >
              ok
            </button>
          </div>
        )}
      </div>

      {/* Input Fields */}
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={profile.firstName}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-black/20 focus:border-purple-700 focus:outline-none bg-white/50  rounded-md text-black"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={profile.lastName}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-black/20 focus:border-purple-700 focus:outline-none bg-white/50  rounded-md text-black"
      />
      <input
        type="text"
        name="username"
        placeholder="User Name"
        value={profile.username}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-black/20 focus:border-purple-700 focus:outline-none bg-white/50  rounded-md text-black"
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={profile.phoneNumber}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-black/20 focus:border-purple-700 focus:outline-none bg-white/50  rounded-md text-black"
      />
      <select
        name="gender"
        value={profile.gender}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-black/20 focus:border-purple-700 focus:outline-none bg-white/50  rounded-md text-black"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className=" mt-4  text-bgreen text-semibold bg-white/60 hover:bg-bgreen hover:text-white py-2 px-6 rounded-3xl shadow-lg"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
