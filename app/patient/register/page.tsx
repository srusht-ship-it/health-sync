"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const successGIF = "/images/success.gif"; // Correct way to reference public images

export default function PatientRegister() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.target as HTMLFormElement);
  
    try {
      const response = await fetch("/api/patient/register", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  
    setLoading(false);
  };

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setPhoto(selectedFile);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        {!formSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Patient Register</h2>

            {/* Profile Photo Upload */}
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

              {/* Gender Selection */}
              <select name="gender" className="w-full px-3 py-2 border rounded-lg" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Previous Disease Dropdown */}
              <select name="previous_disease" className="w-full px-3 py-2 border rounded-lg" required>
                <option value="">Any Previous Disease?</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Hypertension">Hypertension</option>
                <option value="Asthma">Asthma</option>
                <option value="None">None</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </form>

            <p className="text-center text-sm mt-3">
              Already registered?{" "}
              <Link href="/patient/login">
  <span className="text-blue-500 hover:underline">Login here</span>
</Link>
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Image src={successGIF} alt="Success" width={100} height={100} />
            <h2 className="text-xl font-bold text-green-600 mt-4">Registration Successful!</h2>
            <p className="text-gray-500">You can now log in to your account.</p>
            <Link href="/patient/login" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
