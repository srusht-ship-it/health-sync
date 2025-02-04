"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PatientLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For showing success GIF after login

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Logging in with:", email, password);

    // Simulate an API call or authentication logic
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true); // Set the login success state
      // Redirect after a short delay (to show the GIF)
      setTimeout(() => {
        router.push("/patient/dashboard"); // Redirect to dashboard
      }, 2000); // Wait for the GIF animation to finish
    }, 2000); // Simulate network delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Patient Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Success GIF Section */}
        {isLoggedIn && (
          <div className="mt-6 flex justify-center">
            <img
              src="/images/success.gif" // Path to your success GIF
              alt="Success"
              className="w-32 h-32"
            />
          </div>
        )}

        {/* Sign Up Link */}
        {!isLoggedIn && (
          <p className="text-center text-gray-600 mt-4">
            New User?{" "}
            <Link href="/patient/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
