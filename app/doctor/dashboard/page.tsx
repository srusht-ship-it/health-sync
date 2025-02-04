"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function DoctorDashboard() {
  const router = useRouter();

  // Sample Doctor Data (Replace with API Data)
  const doctor = {
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    profilePic: "/images/doctor.png", // Placeholder profile image
  };

  // Sample Patients Data (Replace with API Data)
  const patients = [
    {
      id: 1,
      name: "Alice Smith",
      treatment: "Cardiac Checkup",
      lastVisit: "Jan 10, 2025",
    },
    {
      id: 2,
      name: "Bob Johnson",
      treatment: "Heart Surgery Follow-up",
      lastVisit: "Feb 5, 2025",
    },
  ];

  // Sample Doctors for Chat (Replace with API Data)
  const connectedDoctors = [
    {
      id: 1,
      name: "Dr. Emily Watson",
      profilePic: "/images/doctor1.png",
    },
    {
      id: 2,
      name: "Dr. Robert Brown",
      profilePic: "/images/doctor2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
        <Avatar className="w-16 h-16">
          <img src={doctor.profilePic} alt="Doctor Profile" className="rounded-full" />
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-black">{doctor.name}</h2>
          <p className="text-gray-600">Specialty: {doctor.specialty}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
        {/* Patients Card */}
        <Card className="bg-white shadow-lg w-full">
          <CardHeader>
            <CardTitle className="text-black">Patients Under Care</CardTitle>
          </CardHeader>
          <CardContent>
            {patients.map((patient) => (
              <div key={patient.id} className="border-b py-2">
                <p className="text-black font-medium">{patient.name}</p>
                <p className="text-gray-600 text-sm">Treatment: {patient.treatment}</p>
                <p className="text-gray-600 text-sm">Last Visit: {patient.lastVisit}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Accept Document Requests */}
        <Card className="bg-white shadow-lg w-full">
          <CardHeader>
            <CardTitle className="text-black">Document Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Pending document requests from patients.</p>
            <Button className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600">
              Accept Requests
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat with Other Doctors */}
      <div className="mt-6 w-full">
        <Card className="bg-white shadow-lg w-full">
          <CardHeader>
            <CardTitle className="text-black">Connect with Other Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            {connectedDoctors.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between border-b py-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <img src={doc.profilePic} alt={doc.name} className="rounded-full" />
                  </Avatar>
                  <p className="text-black font-medium">{doc.name}</p>
                </div>
                <Button className="bg-green-500 text-white hover:bg-green-600">Chat</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
