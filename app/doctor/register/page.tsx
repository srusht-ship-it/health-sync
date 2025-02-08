"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DoctorRegister() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch("/api/doctor/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormSubmitted(true);
        router.push("/doctor/success");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        {!formSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Doctor Register</h2>
            <div className="flex flex-col items-center">
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {photo ? (
                    <img src={URL.createObjectURL(photo)} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-gray-500">Upload</span>
                  )}
                </div>
              </label>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input type="text" name="full_name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg" required />
              <input type="email" name="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg" required />
              <input type="password" name="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg" required />
              <input type="number" name="age" placeholder="Age" className="w-full px-3 py-2 border rounded-lg" required />
              <input type="tel" name="phone" placeholder="Phone Number" className="w-full px-3 py-2 border rounded-lg" required />
              <select name="specialization" className="w-full px-3 py-2 border rounded-lg" required>
                <option value="">Select Specialization</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Orthopedic">Orthopedic</option>
              </select>
              <button type="submit" className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
                {loading ? "Submitting..." : "Register"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-green-600 mt-4">Registration Successful!</h2>
            <p className="text-gray-500">You can now log in to your account.</p>
            <Link href="/doctor/login" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
