import React, { useEffect, useState } from "react";
import axios from "axios";

import { format, isAfter, parseISO } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../Hook/useAuth";

const Patient = () => {
  const { user } = useAuth(); 
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/appointments/?email=${user.email}`
      );
      const data = res.data;

      // Filter upcoming appointments (today or future)
      const today = new Date();
      const upcoming = data.filter((appt) =>
        isAfter(parseISO(appt.appointmentDate), today) ||
        format(parseISO(appt.appointmentDate), "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      );

      // Sort by date ascending
      upcoming.sort((a, b) =>
        new Date(a.appointmentDate) - new Date(b.appointmentDate)
      );

      setAppointments(upcoming);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch appointments ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        My Upcoming Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          No upcoming appointments.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Doctor: {appt.doctorName}
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold">Specialty:</span>{" "}
                {appt.specialization || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date:</span>{" "}
                {format(parseISO(appt.appointmentDate), "PPP")}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Time:</span> {appt.appointmentTime}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Doctor Email:</span>{" "}
                {appt.doctorEmail}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Appointment fee:</span>{" "}
                <span className="text-red-500">{appt.fee}$</span>
              </p>  
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patient;
