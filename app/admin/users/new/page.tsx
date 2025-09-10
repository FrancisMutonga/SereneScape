"use client";

import { useState } from "react";
import { auth, db } from "./../../../firebase/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        role,
        createdAt: new Date(),
      });

      setMessage("✅ User created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err);
    setMessage("❌ Error: " + err.message);
  } else {
    console.error("Unexpected error:", err);
    setMessage("❌ An unexpected error occurred.");
  }
}


    setLoading(false);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bgreen"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 shadow-md rounded-xl space-y-4 p-6 w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-bgreen font-bold mb-6">
          New User
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-bgreen text-slate rounded-2xl"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-bgreen text-slate rounded-2xl"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-bgreen text-slate rounded-2xl"
          required
        />

        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border border-bgreen text-slate rounded-2xl"
        >
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-accent hover:bg-bgreen hover:text-white bg-white text-bgreen shadow-xl px-6 py-3 rounded-3xl"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </div>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
