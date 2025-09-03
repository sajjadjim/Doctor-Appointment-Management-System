import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    specialization: "",
    phone: "",
    image: "",
    address: "",
    fee: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false); // New: track edit mode

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    fetch("https://serverside-code-manegment-code.vercel.app/users")
      .then((res) => res.json())
      .then((users) => {
        const loggedInUser = users.find((u) => u.email === user.email);
        if (loggedInUser) {
          setProfile({
            name: loggedInUser.name || "",
            email: loggedInUser.email || "",
            role: loggedInUser.role || "",
            specialization: loggedInUser.specialization || "",
            phone: loggedInUser.phone || "",
            image: loggedInUser.image || "",
            address: loggedInUser.address || "",
            fee: loggedInUser.fee || "",
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`https://serverside-code-manegment-code.vercel.app/users/${user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully ✅");
        setProfile(data);
        setEditMode(false); // exit edit mode after update
      } else {
        toast.error(data.message || "Failed to update profile ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error! Could not update profile ❌");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              profile.image ||
              "https://cdn-icons-png.freepik.com/512/6858/6858485.png"
            }
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-2 border-indigo-500 object-cover"
          />

          {editMode && (
            <input
              type="text"
              name="image"
              value={profile.image}
              placeholder="Image URL"
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                editMode ? "border-gray-300 focus:ring-indigo-400" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {profile.role === "doctor" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={profile.specialization}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Fee ($)</label>
                <input
                  type="number"
                  name="fee"
                  value={profile.fee}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                    editMode ? "border-gray-300 focus:ring-indigo-400" : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                editMode ? "border-gray-300 focus:ring-indigo-400" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                editMode ? "border-gray-300 focus:ring-indigo-400" : "bg-gray-100 cursor-not-allowed"
              }`}
              placeholder="Add your address"
            />
          </div>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="w-full mt-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              Update Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              disabled={updating}
              className={`w-full mt-4 py-2 rounded-lg text-white font-semibold ${
                updating ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              } transition`}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
