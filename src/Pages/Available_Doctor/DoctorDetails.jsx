import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router"; // react-router v6
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { Calendar, MapPin, Phone, Mail } from "lucide-react";

// Skeleton loader
const Skeleton = () => (
  <div className="p-6 max-w-xl mx-auto animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-64 bg-gray-200 rounded-xl mt-4" />
  </div>
);

const DoctorDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // filtered user info

  useEffect(() => {
    document.title = "Doctor Details";
  }, []);

  // Fetch all users and filter by logged-in email
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axiosSecure.get("/users"); // get all users
        const filteredUser = res.data.find(u => u.email === user.email); // filter login user
        setCurrentUser(filteredUser || null);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    if (user?.email) fetchCurrentUser();
  }, [user?.email, axiosSecure]);

  // Fetch doctor info
  const { data: doctor, isLoading, isError } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${id}`);
      if (res.data.role !== "doctor") throw new Error("User is not a doctor");
      return res.data;
    },
    retry: 1,
  });

  // Appointment submit
  const handleAppointment = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
      setErrorMsg("Please select date and time");
      return;
    }

    if (!currentUser) {
      setErrorMsg("User info not loaded yet. Try again!");
      return;
    }

    try {
      const payload = {
        doctorId: doctor._id,
        doctorName: doctor.name,
        doctorEmail: doctor.email,
        patientId: currentUser._id,
        patientName: currentUser.name,
        patientEmail: currentUser.email,
        specialization: doctor.specialization,
        fee: doctor.fee,
        appointmentDate,
        appointmentTime,
      };

      await axios.post("https://serverside-code-manegment-code.vercel.app/appointments", payload);
      setSuccessMsg("Appointment booked successfully!");
      setErrorMsg("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to book appointment. Try again!");
    }
  };

  if (isLoading) return <Skeleton />;
  if (isError)
    return (
      <div className="text-center py-10">
        <p className="text-red-600">Failed to load doctor details.</p>
        <Link to="/available-doctors" className="text-indigo-600 hover:underline">
          Back to doctors list
        </Link>
      </div>
    );

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <Link
        to="/available-doctors"
        className="text-indigo-600 hover:underline mb-4 inline-block"
      >
        ← Back to doctors list
      </Link>

      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">
        {/* Doctor Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{doctor.name}</h1>
          <div className="flex flex-col space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <Mail size={16} /> {doctor.email}
            </p>
            {doctor.phone && (
              <p className="flex items-center gap-2">
                <Phone size={16} /> {doctor.phone}
              </p>
            )}
            {doctor.specialization && (
              <p className="flex items-center gap-2">
                Specialist: {doctor.specialization}
              </p>
            )}
            {doctor.joinDate && (
              <p className="flex items-center gap-2">
                <Calendar size={16} /> Joined: {new Date(doctor.joinDate).toLocaleDateString()}
              </p>
            )}
            {doctor.fee && (
              <p className="flex items-center gap-2">
                Fee: <span className="font-semibold">${Number(doctor.fee).toLocaleString()}</span>
              </p>
            )}
          </div>

          {doctor.bio && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-700">{doctor.bio}</p>
            </div>
          )}

          {/* Appointment Form */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>

            {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

            <form onSubmit={handleAppointment} className="flex flex-col space-y-4">
              <label>
                Select Date:
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="border rounded px-3 py-2 w-full mt-1"
                  required
                />
              </label>

              <label>
                Select Time Slot:
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="border rounded px-3 py-2 w-full mt-1"
                  required
                >
                  <option value="">--Select Time--</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </label>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>

        {/* Doctor Image Card on Right */}
        <div className="flex-shrink-0 flex flex-col items-center justify-start">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-48 h-48 object-cover rounded-xl shadow-lg mb-4"
          />
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;