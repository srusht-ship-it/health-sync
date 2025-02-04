"use client";
import React from "react";
import { Avatar } from "@/components/ui/avatar";  // Assuming Avatar is in your UI components

// Sample data for the patient's visits
const timelineData = [
  {
    visitMonth: "Jan 2025",
    doctorName: "Dr. Emily Smith",
    treatment: "Cardiac Checkup",
    symptoms: "Chest pain and shortness of breath",
    doctorPic: "/images/doctor1.png",
    border: "border-blue-500",
  },
  {
    visitMonth: "Dec 2024",
    doctorName: "Dr. Robert Williams",
    treatment: "Neurology Consultation",
    symptoms: "Severe headaches and dizziness",
    doctorPic: "/images/doctor2.png",
    border: "border-blue-500",
  },
  {
    visitMonth: "Nov 2024",
    doctorName: "Dr. Lisa White",
    treatment: "Dermatology Consultation",
    symptoms: "Skin rash and irritation",
    doctorPic: "/images/doctor3.png",
    border: "border-blue-500",
  },
  // Add more visits as needed
];

const PatientTimeline = () => {
  return (
    <div className="flex flex-col items-center bg-white py-10">
      <h2 className="text-3xl font-bold mb-8 text-black">Your Treatment Timeline</h2>
      <div className="relative w-full max-w-4xl">
        {/* Timeline vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>

        {/* Timeline data mapping */}
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`mb-10 relative flex ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Circle on the line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 bg-white flex items-center justify-center font-semibold text-black ${item.border}`}
            >
              {item.visitMonth}
            </div>

            {/* Content Box */}
            <div
              className={`bg-white p-6 shadow-md rounded-lg w-full max-w-96 ${
                index % 2 === 0 ? "bg-blue-100 ml-12" : "bg-white mr-12"
              }`}
            >
              <div className="flex items-center space-x-6 mb-6">
                {/* Doctor's Avatar */}
                <Avatar className="w-16 h-16">
                  <img
                    src={item.doctorPic}
                    alt={item.doctorName}
                    className="rounded-full w-full h-full object-cover"
                  />
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-black">{item.doctorName}</h3>
                  <p className="text-gray-600 text-sm">{item.treatment}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm">{item.symptoms}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientTimeline;
