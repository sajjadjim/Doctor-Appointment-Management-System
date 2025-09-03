import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseISO, differenceInDays, isAfter, format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useAuth from "../../Hook/useAuth";

const Doctor = () => {
  const { user } = useAuth();
  const doctorEmail = user?.email;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorEmail) {
      toast.error("Doctor email is missing");
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `https://serverside-code-manegment-code.vercel.app/appointments/doctor?email=${doctorEmail}`
        );

        // Sort by nearest date
        const sortedAppointments = res.data.sort(
          (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
        );

        setAppointments(sortedAppointments);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorEmail]);

  const renderDateInfo = (appointmentDate) => {
    const today = new Date();
    const aptDate = parseISO(appointmentDate);

    if (isAfter(aptDate, today)) {
      const remainingDays = differenceInDays(aptDate, today);
      return (
        <p className="text-green-600 font-medium mt-2">
          🟢 Remaining: {remainingDays} {remainingDays === 1 ? "day" : "days"}
        </p>
      );
    } else {
      return (
        <p className="text-red-600 font-medium mt-2">
          🔴 Passed ({format(aptDate, "PPP")})
        </p>
      );
    }
  };

  // Prepare chart data
  const upcomingCount = appointments.filter((apt) =>
    isAfter(parseISO(apt.appointmentDate), new Date())
  ).length;
  const pastCount = appointments.length - upcomingCount;

  const chartData = [
    { name: "Upcoming", count: upcomingCount },
    { name: "Past", count: pastCount },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Appointments
      </h1>

      {/* Stats */}
      <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
          <h2 className="text-2xl font-semibold text-indigo-600">{appointments.length}</h2>
          <p className="text-gray-600 mt-2">Total Appointments</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
          <h2 className="text-2xl font-semibold text-green-600">{upcomingCount}</h2>
          <p className="text-gray-600 mt-2">Upcoming</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
          <h2 className="text-2xl font-semibold text-red-600">{pastCount}</h2>
          <p className="text-gray-600 mt-2">Past</p>
        </div>
      </div>

      {/* Chart */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Summary</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Appointment Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => (
            <div
              key={apt._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-indigo-600">{apt.patientName}</h2>
                <span className="text-sm text-gray-500">{apt.appointmentTime}</span>
              </div>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Email:</span> {apt.patientEmail}
              </p>
              {renderDateInfo(apt.appointmentDate)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctor;
