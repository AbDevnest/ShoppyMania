"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Fill all fields");
      return;
    }

    login(name, email);
    router.push("/");
  };

  return (
    <div className="bg-gray-50 text-[#37311d] flex min-h-screen items-center justify-center px-6 py-16">

      <form
        onSubmit={handleLogin}
        className="border border-gray-200 bg-white shadow-sm w-full max-w-md rounded-2xl p-8"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">
          Login
        </h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 mb-4 w-full rounded-lg p-3"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 bg-white text-[#37311d] outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-amber-200 mb-4 w-full rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-[#37311d] text-white transition hover:bg-[#0f172a] w-full rounded-lg py-3 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
