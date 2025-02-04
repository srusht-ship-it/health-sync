// app/patient/dashboard/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Ensure correct import here
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function PatientDashboard() {
  const router = useRouter();

  // Sample Patient Data (Replace with API Data)
  const patient = {
    name: "John Doe",
    age: 28,
    city: "New York",
    profilePic: "/images/profile.png", // Placeholder profile image
  };

  // Sample Visited Doctors Data (Replace with API Data)
  const visitedDoctors = [
    {
      id: 1,
      name: "Dr. Emily Smith",
      profilePic: "/images/doctor1.png",
      lastVisit: "Jan 10, 2025",
      treatment: "Cardiac Checkup",
    },
    {
      id: 2,
      name: "Dr. Robert Williams",
      profilePic: "/images/doctor2.png",
      lastVisit: "Dec 5, 2024",
      treatment: "Neurology Consultation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
        <Avatar className="w-16 h-16">
          <img src={patient.profilePic} alt="Patient Profile" className="rounded-full" />
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-black">{patient.name}</h2>
          <p className="text-gray-600">Age: {patient.age}</p>
          <p className="text-gray-600">City: {patient.city}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Upload Documents Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Upload Medical Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <input type="file" className="w-full border p-2 rounded-lg text-black" />
            <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600">
              Upload
            </Button>
          </CardContent>
        </Card>

        {/* Treatment Timeline Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Treatment Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View your complete treatment history.</p>
            <Button
              onClick={() => router.push("/patient/timeline")}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
            >
              View Timeline
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Visited Doctors Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-black mb-4">Visited Doctors</h2>
        {visitedDoctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center justify-between border-b py-3">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <img src={doctor.profilePic} alt={doctor.name} className="rounded-full" />
              </Avatar>
              <div>
                <h3 className="text-black font-medium">{doctor.name}</h3>
                <p className="text-gray-600 text-sm">Last Visit: {doctor.lastVisit}</p>
              </div>
            </div>
            <Link
              href={`/patient/timeline?treatment=${doctor.treatment}`}
              className="text-blue-500 hover:underline"
            >
              {doctor.treatment}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
