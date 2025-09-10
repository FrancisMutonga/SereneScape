"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form onSubmit={handleLogin} className="bg-white p-8  rounded-2xl shadow-lg space-y-4">
        <h1 className="text-2xl sm:text-2xl  md:text-3xl lg:text-4xl text-bgreen text-center font-bold">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-green-700  rounded-xl"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-green-700  rounded-xl"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <div className="flex justify-center">
            <button className="hover:bg-bgreen bg-white text-bgreen hover:text-white text-center border border-green-700 shadow-md p-4 px-4 py-2 rounded-full" type="submit">
          Sign In
        </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

