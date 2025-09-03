import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router";
import { FaCalendarAlt, FaPhone } from "react-icons/fa";

const Section3 = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users"); // your backend endpoint
        // Filter only doctors
        const doctorList = res.data.filter((user) => user.role === "doctor");
        // Sort by creation date (newest first) and get top 6
        const topDoctors = doctorList
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setDoctors(topDoctors);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="py-10 px-4 2xl:max-w-7xl md:max-w-6xl mx-auto">
      <h2 className="md:text-4xl text-2xl font-bold mb-10 text-center">
        Top 6 Doctors
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-indigo-500 transition duration-300"
          >
            {/* Placeholder avatar */}
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                doc.name
              )}&background=4f46e5&color=fff&size=128`}
              alt={doc.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-3">{doc.name}</h3>
              <p className="text-gray-600 mb-2">
                Specialization: <span className="font-semibold">{doc.specialization}</span>
              </p>
              <div className="flex justify-between items-center text-gray-600">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-500" />
                  Joined: {dayjs(doc.createdAt).format("MMMM D, YYYY")}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-indigo-500" />
                  {doc.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid justify-center mt-5">
        <Link
          to="/availableDoctors"
          className="btn rounded-3xl shadow-2xl mt-5 bg-indigo-400 text-white hover:text-indigo-600 hover:bg-white transition"
        >
          Show All
        </Link>
      </div>
    </section>
  );
};

export default Section3;
