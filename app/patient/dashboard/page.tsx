"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Sample Doctor Data (Replace with API Data)
const doctorsList = [
  { id: 1, name: "Dr. Emily Smith", profilePic: "/images/doctor1.png" },
  { id: 2, name: "Dr. Robert Williams", profilePic: "/images/doctor2.png" },
  { id: 3, name: "Dr. William Brown", profilePic: "/images/doctor3.png" },
  { id: 4, name: "Dr. Sarah Johnson", profilePic: "/images/doctor4.png" },
];

// Sample Prescription Data (Replace with API Data)
const prescriptions = [
  { id: 1, doctorName: "Dr. Emily Smith", prescriptionFile: "/prescriptions/prescription1.pdf" },
  { id: 2, doctorName: "Dr. Robert Williams", prescriptionFile: "/prescriptions/prescription2.pdf" },
];

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

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [documentSelected, setDocumentSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedPrescription, setSelectedPrescription] = useState(null); // For displaying selected prescription

  // Handle file upload and toggle document selection
  const handleDocumentSelect = (e) => {
    if (e.target.files.length > 0) {
      setDocumentSelected(true);
    }
  };

  // Handle request submission to doctor's dashboard
  const sendRequestToDoctor = () => {
    if (selectedDoctor) {
      // Handle the document sending logic here
      alert(`Document sent to ${selectedDoctor.name}.`);
      setSelectedDoctor(null); // Reset the doctor selection
      setDocumentSelected(false); // Reset document selection
    }
  };

  // Handle showing prescription modal
  const handleCheckPrescription = (prescription) => {
    setSelectedPrescription(prescription);
  };

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
            <input
              type="file"
              className="w-full border p-2 rounded-lg text-black"
              onChange={handleDocumentSelect}
            />
            <Button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
              disabled={!documentSelected}
            >
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

      {/* Cards for Visited Doctors and Prescriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Visited Doctors Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Visited Doctors</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Prescription Received Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Prescriptions Received</CardTitle>
          </CardHeader>
          <CardContent>
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <img src={doctorsList.find(doctor => doctor.name === prescription.doctorName).profilePic} alt={prescription.doctorName} className="rounded-full" />
                  </Avatar>
                  <p className="text-black font-medium">{prescription.doctorName}</p>
                </div>
                <Button
                  onClick={() => handleCheckPrescription(prescription)}
                  className="bg-blue-500 text-white hover:bg-green-600"
                >
                  Check Prescription
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Prescription Modal */}
      {selectedPrescription && (
        <Dialog open={true} onClose={() => setSelectedPrescription(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Prescription from {selectedPrescription.doctorName}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <a href={selectedPrescription.prescriptionFile} target="_blank" className="text-blue-500">
                Click here to download the prescription PDF
              </a>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
