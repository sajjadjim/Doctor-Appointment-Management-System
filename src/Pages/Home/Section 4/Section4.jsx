import React from "react";
import {
  Stethoscope,
  CalendarCheck2,
  LayoutDashboard,
  ShieldPlus,
} from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    title: "Find Doctors Easily",
    description: "Search and filter by specialization to find the right doctor quickly.",
    icon: <Stethoscope className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Instant Booking",
    description: "Book your appointment in seconds with a clean date picker.",
    icon: <CalendarCheck2 className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Smart Dashboards",
    description:
      "Patients can track bookings; doctors can manage schedules in real time.",
    icon: <LayoutDashboard className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Secure & Reliable",
    description:
      "Role-based authentication ensures safe access for both patients and doctors.",
    icon: <ShieldPlus className="w-6 h-6 text-indigo-600" />,
  },
];

const Section4 = () => {
  return (
    <section className="bg-white 2xl:max-w-7xl md:max-w-6xl mx-auto py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">
          Why Choose Our System?
        </h2>
        <p className="text-gray-600 mb-10 text-lg max-w-3xl mx-auto">
          The Doctor Appointment Management System makes healthcare simple.
          Discover doctors, book appointments, and manage everything from one
          platform — secure, fast, and easy to use.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <Link to="/doctors">
          <button className="px-6 py-3 cursor-pointer bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition">
            Explore Doctors
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Section4;
