import React from "react";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import {
  FaStethoscope,
  FaUsers,
  FaLaptopMedical,
  FaChevronRight,
} from "react-icons/fa";

const Section2 = () => {
  const handleExploreMore = () => {
    const nextSection = document.getElementById("explore-more-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="hero bg-white max-w-7xl mx-auto md:py-20">
      <div className="hero-content flex flex-col lg:flex-row items-center gap-10 px-6 md:px-16">
        {/* Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop"
            alt="Find doctors and book appointments"
            className="w-full max-w-xl rounded-xl shadow-lg border border-indigo-200"
          />
        </div>

        {/* Copy */}
        <div className="lg:w-1/2 w-full text-left">
          <h1 className="md:text-4xl text-2xl font-extrabold text-gray-800 leading-tight">
            Doctor Appointments:{" "}
            <span className="text-indigo-600 block mt-1">
              <Typewriter
                words={[
                  "Find Specialists",
                  "Book Instantly",
                  "Manage Appointments",
                  "Track Status",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>

          <p className="py-4 text-gray-600 text-base">
            Search by specialization, compare profiles, and book in seconds. Stay
            on top of your healthcare with real-time status updates and a
            patient-friendly dashboard.
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <FaStethoscope className="text-indigo-500" />
              Search doctors by name & specialization
            </li>
            <li className="flex items-center gap-2">
              <FaUsers className="text-indigo-500" />
              Clean profiles with photos and expertise
            </li>
            <li className="flex items-center gap-2">
              <FaLaptopMedical className="text-indigo-500" />
              Instant booking with calendar picker & live status
            </li>
          </ul>

          <div className="mt-6">
            <Link
              to="/patient/dashboard"
              onClick={handleExploreMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-indigo-600 border border-indigo-600 transition-all duration-300"
            >
              Get Started <FaChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
