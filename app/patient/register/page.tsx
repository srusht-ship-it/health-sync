"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const successGIF = "/images/success.gif"; // Correct way to reference public images

export default function PatientRegister() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setFormSubmitted(true);
      setLoading(false);
    }, 2000);
  };

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
            <h2 className="text-2xl font-bold text-center mb-4">Patient Register</h2>

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
              <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg" required />
              <input type="number" placeholder="Age" className="w-full px-3 py-2 border rounded-lg" required />
              <input type="tel" placeholder="Phone Number" className="w-full px-3 py-2 border rounded-lg" required />

              {/* Gender Selection */}
              <select className="w-full px-3 py-2 border rounded-lg" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Previous Disease Dropdown */}
              <select className="w-full px-3 py-2 border rounded-lg" required>
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
              <Link href="/patient/login" className="text-blue-500 hover:underline">
                Login here
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
