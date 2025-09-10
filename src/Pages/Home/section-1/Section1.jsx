import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope } from "lucide-react";

const Section1 = () => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById("explore-more-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <p className="text-indigo-600 font-semibold text-sm md:text-base mb-3 tracking-wide uppercase">
            Fast • Secure • Reliable
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            Doctor Appointment
            <span className="text-indigo-600"> Management </span>
            System (DAMS)
          </h1>

          <p className="text-base md:text-lg mb-7 text-gray-600 max-w-xl">
            Book appointments with specialists, track visits, and manage
            everything in one place. Designed for both patients and doctors with
            an intuitive, responsive interface.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/auth/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-base font-semibold transition flex items-center gap-2 shadow-md"
            >
              <Stethoscope className="w-5 h-5" /> Create an account
            </Link>

            <Link
              to="/patient/dashboard"
              className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-xl text-base font-semibold transition border border-gray-300 flex items-center gap-2 shadow-sm"
            >
              Explore doctors <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={scrollToHowItWorks}
              className="text-indigo-600 hover:text-indigo-700 px-6 py-3 rounded-xl text-base font-semibold transition flex items-center gap-2"
            >
              ▶ How it works
            </button>
          </div>

          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white mt-10 p-6 rounded-2xl shadow-lg border border-gray-200 max-w-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Happy patient"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-yellow-500 text-lg">★★★★★</span>
            </div>
            <p className="italic text-gray-700">
              “I booked my cardiology visit in under a minute. The reminders and
              real-time updates were a lifesaver.”
            </p>
            <p className="font-semibold mt-3 text-gray-900">
              — Alicia P., Verified Patient
            </p>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Doctor with patient"
            className="rounded-2xl shadow-xl object-cover w-full h-[550px]"
          />
          {/* Decorative circle */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-2xl opacity-70" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-purple-200 rounded-full blur-3xl opacity-60" />
        </motion.div>
      </div>
    </section>
  );
};

export default Section1;