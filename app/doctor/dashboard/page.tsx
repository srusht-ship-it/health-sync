"use client";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Sample Data (Replace with API Data)
const patientRequests = [
  {
    id: 1,
    patientName: "John Doe",
    patientAge: 28,
    patientCity: "New York",
    profilePic: "/images/profile.png",
    documents: [
      { id: 1, name: "Cardiac Report", file: "/documents/report1.pdf" },
      { id: 2, name: "Neurology Scan", file: "/documents/report2.pdf" },
    ],
  },
];

const patientsUnderConsultancy = [
  { id: 1, name: "Jane Smith", age: 35, city: "San Francisco" },
  { id: 2, name: "Michael Johnson", age: 45, city: "Los Angeles" },
];

const otherDoctors = [
  { id: 1, name: "Dr. Emma Watson", profilePic: "/images/doctor1.jpg" },
  { id: 2, name: "Dr. Alan Turing", profilePic: "/images/doctor2.jpg" },
];

export default function DoctorDashboard() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatDoctor, setChatDoctor] = useState(null);
  const [prescription, setPrescription] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [message, setMessage] = useState(""); // State for chat message

  // Handle Accepting Request
  const handleAcceptRequest = (request) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  // Handle Downloading Document
  const handleDownload = (file) => {
    window.open(file, "_blank");
  };

  // Handle Sharing Document
  const handleShare = (file) => {
    alert(`Document shared: ${file}`);
  };

  // Open Chat Window
  const handleOpenChat = (doctor) => {
    setChatDoctor(doctor);
    setIsChatOpen(true);
  };

  // Close Chat Window
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setChatDoctor(null);
  };

  // Handle Generating Prescription
  const handleGeneratePrescription = () => {
    alert("Prescription generated!");
  };

  // Handle Sending Prescription
  const handleSendPrescription = () => {
    if (selectedPatient) {
      alert(`Prescription sent to ${selectedPatient}`);
    } else {
      alert("Please select a patient to send the prescription.");
    }
  };

  // Handle Sending Chat Message
  const handleSendMessage = () => {
    if (message) {
      alert(`Message sent to Dr. ${chatDoctor.name}: ${message}`);
      setMessage(""); // Clear the message input after sending
    } else {
      alert("Please type a message before sending.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] p-6">
      <h1 className="text-2xl font-bold text-[#333] mb-6">Doctor Dashboard</h1>

      {/* Doctor Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24 border-4 border-blue-300">
            <img src="/images/doctor-profile.jpg" alt="Doctor Profile" className="rounded-full" />
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-[#333]">Dr. John Doe</h2>
            <p className="text-lg text-gray-600">Cardiologist</p>
            <p className="text-sm text-gray-500">Specialized in heart diseases and care</p>
          </div>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Patients Under Consultancy */}
        <Card className="shadow-lg rounded-xl transition transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-xl text-[#00796B] font-semibold">Patients Under Consultancy</CardTitle>
          </CardHeader>
          <CardContent>
            {patientsUnderConsultancy.map((patient) => (
              <div key={patient.id} className="mb-4">
                <p className="font-semibold text-gray-800">{patient.name}</p>
                <p className="text-gray-600">Age: {patient.age}</p>
                <p className="text-gray-600">City: {patient.city}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Patient Request Card */}
        <Card className="shadow-lg rounded-xl transition transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-xl text-[#00796B] font-semibold">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {patientRequests.map((request) => (
              <div key={request.id} className="flex items-center space-x-4 mb-6">
                <Avatar className="w-16 h-16">
                  <img src={request.profilePic} alt={request.patientName} className="rounded-full" />
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-800">{request.patientName}</p>
                  <p className="text-gray-600">Age: {request.patientAge}</p>
                  <p className="text-gray-600">City: {request.patientCity}</p>
                  <Button
                    onClick={() => handleAcceptRequest(request)}
                    className="mt-4 bg-[#00796B] hover:bg-[#004D40] text-white"
                  >
                    Accept Request
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Chat with Doctors & Prescription Generation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chat with Other Doctors Card */}
        <Card className="shadow-lg rounded-xl transition transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-xl text-[#00796B] font-semibold">Other Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            {otherDoctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center space-x-4 mb-6">
                <Avatar className="w-16 h-16">
                  <img src={doctor.profilePic} alt={doctor.name} className="rounded-full" />
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-800">{doctor.name}</p>
                  <Button
                    onClick={() => handleOpenChat(doctor)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Prescription Generation Card */}
        <Card className="shadow-lg rounded-xl transition transform hover:scale-105">
          <CardHeader>
            <CardTitle className="text-xl text-[#00796B] font-semibold">Generate Prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription details..."
              className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            />

            {/* Dropdown to select patient */}
            <select
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              onChange={(e) => setSelectedPatient(e.target.value)}
              value={selectedPatient || ""}
            >
              <option value="">Select Patient</option>
              {patientsUnderConsultancy.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name}
                </option>
              ))}
            </select>

            <div className="flex justify-between">
              <Button
                onClick={handleGeneratePrescription}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Generate Prescription
              </Button>
              <Button
                onClick={handleSendPrescription}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Send Prescription to Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Window */}
      {isChatOpen && chatDoctor && (
        <div className="fixed bottom-0 right-0 bg-white w-96 h-80 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#00796B]">Chat with {chatDoctor.name}</h3>
            <Button onClick={handleCloseChat} className="bg-red-500 hover:bg-red-600 text-white">
              Close
            </Button>
          </div>
          <div className="flex flex-col space-y-4 overflow-y-auto max-h-60">
            <p><strong>Doctor:</strong> Hello, how can I assist you today?</p>
            <p><strong>You:</strong> I have some questions regarding my patients.</p>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mt-4"
            placeholder="Type a message..."
          />
          <Button
            onClick={handleSendMessage}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full"
          >
            Send Message
          </Button>
        </div>
      )}
    </div>
  );
}
