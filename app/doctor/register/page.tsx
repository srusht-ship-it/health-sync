"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorRegister() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission process
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

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Doctor Registration</h2>

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
          <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="number" placeholder="Age" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="tel" placeholder="Phone Number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />

          {/* Gender Selection - Styled like other fields */}
          <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white text-gray-700" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Specialization Dropdown - Styled like other fields */}
          <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white text-gray-700" required>
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Orthopedic">Orthopedic</option>
          </select>

          <input type="number" placeholder="Years of Experience" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="text" placeholder="License Number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />

          {/* Verification Document Upload */}
          <div className="border p-2 rounded-lg">
            <label className="block text-gray-700">Upload Medical License / ID Proof</label>
            <input type="file" accept=".pdf,.jpg,.png" onChange={handleLicenseUpload} className="mt-2" required />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>

        {/* Success Message */}
        {formSubmitted && !loading && (
          <div className="text-center mt-4 text-green-600 font-semibold">
            Registration Successful!
          </div>
        )}

        {/* Login Redirect */}
        <p className="text-center text-sm mt-3">
          Already registered?{" "}
          <Link href="/doctor/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
