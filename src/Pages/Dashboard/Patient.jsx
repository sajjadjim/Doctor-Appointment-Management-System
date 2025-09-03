import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, isAfter, parseISO } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hook/useAuth";

const Patient = () => {
  const { user } = useAuth(); 
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(
        `https://serverside-code-manegment-code.vercel.app/appointments/patient?email=${user.email}`
      );
      const data = res.data;

      const today = new Date();
      const upcoming = data.filter(
        (appt) =>
          isAfter(parseISO(appt.appointmentDate), today) ||
          format(parseISO(appt.appointmentDate), "yyyy-MM-dd") ===
            format(today, "yyyy-MM-dd")
      );

      upcoming.sort(
        (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
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

  // Total fees calculation
  const totalFees = appointments.reduce((acc, apt) => acc + (apt.fee || 0), 0);

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

      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        My Upcoming Appointments
      </h1>

      {/* Stats */}
      <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
          <h2 className="text-2xl font-semibold text-indigo-600">{appointments.length}</h2>
          <p className="text-gray-600 mt-2">Upcoming Appointments</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
          <h2 className="text-2xl font-semibold text-green-600">{totalFees}$</h2>
          <p className="text-gray-600 mt-2">Total Fees</p>
        </div>
      </div>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You have no upcoming appointments.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => {
            const aptDate = parseISO(appt.appointmentDate);
            const today = new Date();
            const isUpcoming = isAfter(aptDate, today) || format(aptDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
            const remainingDays = isUpcoming ? Math.max(0, Math.ceil((aptDate - today) / (1000 * 60 * 60 * 24))) : 0;

            return (
              <div
                key={appt._id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-indigo-600">{appt.doctorName}</h2>
                  <span className="text-gray-500 text-sm">{appt.specialization || "General"}</span>
                </div>

                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {format(aptDate, "PPP")}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Time:</span> {appt.appointmentTime}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Doctor Email:</span> {appt.doctorEmail}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Fee:</span>{" "}
                  <span className="text-red-500 font-semibold">{appt.fee}$</span>
                </p>
                {isUpcoming ? (
                  <p className="text-green-600 font-medium mt-2">
                    🟢 Remaining {remainingDays} {remainingDays === 1 ? "day" : "days"}
                  </p>
                ) : (
                  <p className="text-red-600 font-medium mt-2">
                    🔴 Appointment Passed
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Patient;
