import React, { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router"; // keep as-is; switch to react-router-dom if needed
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import {
  LayoutGrid,
  Table as TableIcon,
  Search,
  X,
  Calendar,
  MapPin,
  Banknote,
  Filter,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

// Fee display (optional if doctors have fees or some numeric field)
const Fee = ({ value }) => (
  <span className="font-semibold">{`৳${Number(value || 0).toLocaleString()}`}</span>
);

// Status chip (for example, online/offline or active/inactive)
const StatusChip = ({ expired }) => {
  return expired ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border border-rose-200 bg-rose-50 text-rose-700">
      <AlertCircle size={14} /> Inactive
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border border-emerald-200 bg-emerald-50 text-emerald-700">
      <BadgeCheck size={14} /> Active
    </span>
  );
};

// Skeleton loader
const Skeleton = () => (
  <div className="space-y-4">
    <div className="h-10 w-60 bg-gray-200 rounded animate-pulse" />
    <div className="h-12 bg-gray-100 rounded animate-pulse" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  </div>
);

// Empty state
const EmptyState = ({ label = "No doctors match your filters." }) => (
  <div className="bg-white/90 backdrop-blur rounded-xl border border-indigo-50 shadow p-10 text-center">
    <div className="mx-auto w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-2xl mb-3">📭</div>
    <p className="text-gray-600">{label}</p>
  </div>
);

const AvailableDoctors = () => {
  useEffect(() => {
    document.title = "Available Doctors";
  }, []);

  const axiosSecure = useAxiosSecure();

  // UI state
  const [viewMode, setViewMode] = useState("table"); // "table" | "card"
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("nameAsc"); // dateAsc | dateDesc | feeAsc | feeDesc | nameAsc | nameDesc
  const rowsPerPage = 7;
  const inputRef = useRef(null);

  // Fetch users and filter role = doctor
  const { data: allUsers = [], isLoading, isSuccess } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return (res.data || []).filter((u) => u.role === "doctor"); // only doctors
    },
  });

  // Search + filter + sort
  const filteredDoctors = useMemo(() => {
    let arr = [...allUsers];

    // search by name
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      arr = arr.filter((c) => (c.name || "").toLowerCase().includes(s));
    }

    // sort
    const cmp = {
      nameAsc: (a, b) => (a.name || "").localeCompare(b.name || ""),
      nameDesc: (a, b) => (b.name || "").localeCompare(a.name || ""),
      feeAsc: (a, b) => Number(a.fee || 0) - Number(b.fee || 0),
      feeDesc: (a, b) => Number(b.fee || 0) - Number(a.fee || 0),
    }[sortBy];

    if (cmp) arr.sort(cmp);
    return arr;
  }, [allUsers, searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / rowsPerPage));
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredDoctors.slice(start, start + rowsPerPage);
  }, [filteredDoctors, currentPage]);

  // click outside to close suggestions
  useEffect(() => {
    const handle = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="py-20 px-4 2xl:max-w-7xl md:max-w-6xl mx-auto relative">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 -left-10 h-64 w-64 bg-indigo-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-purple-200/40 blur-3xl rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="2xl:text-4xl text-2xl font-bold tracking-tight">Available Doctors</h2>

        {/* search with suggestions */}
        <div className="relative w-full md:w-auto" ref={inputRef}>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by doctor name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="pl-9 pr-10 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full md:w-72 bg-white/90"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {showSuggestions && searchTerm && filteredDoctors.length > 0 && (
            <ul className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-xl">
              {filteredDoctors.slice(0, 8).map((doctor) => (
                <li
                  key={doctor._id}
                  className="cursor-pointer px-4 py-2 hover:bg-indigo-600 hover:text-white"
                  onClick={() => {
                    setSearchTerm(doctor.name || "");
                    setShowSuggestions(false);
                  }}
                >
                  {doctor.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* sort + view mode */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2 rounded-2xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              title="Sort"
            >
              <option value="nameAsc">Name A–Z</option>
              <option value="nameDesc">Name Z–A</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-xl ${viewMode === "table" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
            >
              <TableIcon size={16} />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-xl ${viewMode === "card" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {isLoading && <Skeleton />}

      {isSuccess && filteredDoctors.length === 0 && <EmptyState label="No doctors found." />}

      {isSuccess && filteredDoctors.length > 0 && (
        <>
          {viewMode === "table" ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Specialization</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((doctor, index) => (
                    <tr key={doctor._id} className="border-t">
                      <td className="px-4 py-3">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-4 py-3">{doctor.name}</td>
                      <td className="px-4 py-3">{doctor.email}</td>
                      <td className="px-4 py-3">{doctor.phone || "-"}</td>
                      <td className="px-4 py-3">
                        {doctor.specialization || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/doctor/${doctor._id}`}
                          className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.map((doctor, index) => (
                <div key={doctor._id} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold mb-2">{doctor.name}</h3>
                  <p className="text-gray-600 mb-1">{doctor.email}</p>
                  <p className="text-gray-600 mb-2">{doctor.phone || "-"}</p>
                  <StatusChip expired={doctor.expired} />
                  <div className="mt-4">
                    <Link
                      to={`/doctor/${doctor._id}`}
                      className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-sm"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 rounded-lg border bg-white hover:bg-indigo-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 rounded-lg border bg-white hover:bg-indigo-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AvailableDoctors;
