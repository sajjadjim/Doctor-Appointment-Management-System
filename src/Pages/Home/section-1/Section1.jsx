import React from "react";
import { Link } from "react-router";

const Section1 = () => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById("explore-more-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Healthcare background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-start h-full px-6 md:px-12 max-w-6xl mx-auto">
        <p className="text-indigo-300 font-semibold text-sm md:text-base mb-2 tracking-wide">
          fast • secure • reliable
        </p>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-snug md:leading-tight">
          Doctor Appointment Management System
          <br className="hidden md:block" />
          <span className="text-indigo-300/90">(DAMS)</span>
        </h1>

        <p className="text-base md:text-lg mb-6 max-w-2xl text-white/90">
          Find the right specialist, book in seconds, and manage your visits in one
          place. Real-time status updates, role-based dashboards for patients and
          doctors, and a clean, responsive UI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/auth/register"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-base font-semibold transition shadow"
          >
            Create an account
          </Link>

          <Link
            to="/patient/dashboard"
            className="bg-white/90 hover:bg-white text-gray-900 px-6 py-3 rounded-full text-base font-semibold transition shadow border border-white/60"
          >
            Explore doctors
          </Link>

          <button
            onClick={scrollToHowItWorks}
            className="bg-transparent hover:bg-white/10 text-white px-6 py-3 rounded-full text-base font-semibold transition border border-white/40"
          >
            ▶ How it works
          </button>
        </div>

        {/* Testimonial */}
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm max-w-md w-full text-sm border border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Happy patient"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-yellow-300 text-lg" aria-hidden>
              ★★★★★
            </span>
          </div>
          <p className="italic text-white/95">
            “Booking my cardiology visit took under a minute. I loved the reminders
            and clear status updates.”
          </p>
          <p className="font-semibold mt-2 text-white">
            Alicia P., Verified Patient
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section1;
