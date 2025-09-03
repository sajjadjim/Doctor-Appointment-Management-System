import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import registerLottie from "../../../src/assets/animation authentication/register.json";
import useAuth from "../../Hook/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import { toast, ToastContainer } from "react-toastify";
import { Brain, Stethoscope } from "lucide-react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const DOCTOR_SPECIALTIES = [
  "Cardiologist",
  "Dentist",
  "Neurologist",
  "Dermatologist",
  "General Physician",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist",
  "Ophthalmologist",
  "Psychiatrist",
];

const Register = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      specialization: "",
    },
  });

  const axiosSecure = useAxiosSecure();
  const [activeRole, setActiveRole] = useState("patient");
  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { updateUserProfile, createUser, user, signInWithGoogle } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = useMemo(
    () => (location.state ? location.state : "/auth/login"),
    [location.state]
  );

  const password = watch("password");

  const handleImageUpload = async (e) => {
    const image = e.target.files?.[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    try {
      const res = await axios.post(url, formData);
      const urlOut = res?.data?.data?.url;
      if (urlOut) setProfilePic(urlOut);
      else toast.error("Image upload failed");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    setErrorMessage("");
    if (data.password !== data.confirmPassword) {
      setErrorMessage("❌ Passwords do not match");
      return;
    }
    if (activeRole === "doctor" && !data.specialization) {
      setErrorMessage("❌ Please select a specialization");
      return;
    }

    setSubmitting(true);
    try {
      const cred = await createUser(data.email, data.password);
      const fbUser = cred?.user;

      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      const userInfo = {
        email: data.email,
        image:
          profilePic ||
          "https://cdn-icons-png.freepik.com/512/6858/6858485.png",
        name: data.name,
        role: activeRole,
        ...(activeRole === "doctor" ? { specialization: data.specialization } : {}),
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userResponse = await axiosSecure.post("/users", userInfo);
      const insertedId =
        userResponse?.data?.insertedId ||
        userResponse?.data?.data?.insertedId;

      if (insertedId) {
        const Swal = (await import("sweetalert2")).default;
        await Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "User registered successfully!",
        });
        reset();
        setProfilePic("");
        setActiveRole("patient");
        navigate(redirectTo);
      } else {
        throw new Error("DB insert failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("❌ Registration failed. Please try again.");
      const Swal = (await import("sweetalert2")).default;
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ====== UPDATED GOOGLE SIGN-UP FUNCTION ======
  const handleGoogleSignUp = async () => {
    setSubmitting(true);
    try {
      const cred = await signInWithGoogle(); // Get credentials
      const googleUser = cred?.user;

      if (!googleUser?.email) {
        throw new Error("Google account does not have an email");
      }

      // Prepare user info
      const userInfo = {
        email: googleUser.email,
        name: googleUser.displayName || "No Name",
        image:
          googleUser.photoURL ||
          "https://cdn-icons-png.freepik.com/512/6858/6858485.png",
        role: activeRole,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Check if user already exists in DB
      const existingUsers = await axiosSecure.get("/users");
      const userExists = existingUsers.data?.find(
        (u) => u.email === googleUser.email
      );

      if (!userExists) {
        await axiosSecure.post("/users", userInfo);
        toast.success("Signed up with Google ✅");
      } else {
        // Update last login timestamp if user already exists
        await axiosSecure.put(`/users/${userExists._id}`, {
          last_log_in: new Date().toISOString(),
        });
        toast.success("Welcome back! Logged in with Google ✅");
      }

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Google sign-up error:", err);
      toast.error("Google Sign-in failed ❌");
    } finally {
      setSubmitting(false);
    }
  };
  // ============================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-black/5 p-6">
        {/* Brand */}
        <h2 className="text-2xl font-extrabold text-center text-gray-900 flex items-center justify-center gap-2">
          <Link to="/">
            <Brain className="text-indigo-600" />
          </Link>
          Register
        </h2>

        {/* Lottie */}
        <div className="text-center grid justify-center">
          <Lottie className="w-56" animationData={registerLottie} loop />
        </div>

        {/* Role Toggle */}
        <div className="px-1 my-2">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-gray-100">
            <button
              type="button"
              onClick={() => setActiveRole("patient")}
              className={[
                "rounded-lg py-2 text-sm font-semibold transition",
                activeRole === "patient"
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-600 hover:text-indigo-600",
              ].join(" ")}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => setActiveRole("doctor")}
              className={[
                "rounded-lg py-2 text-sm font-semibold transition",
                activeRole === "doctor"
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-600 hover:text-indigo-600",
              ].join(" ")}
            >
              Doctor
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-600 flex items-center gap-1">
            <Stethoscope size={14} className="text-emerald-600" />
            {activeRole === "doctor"
              ? "Registering as Doctor — please select a specialization."
              : "Registering as Patient."}
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-3 rounded">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.name && (
                <span className="text-red-600 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.email && (
                <span className="text-red-600 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-600 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-600 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Specialization for Doctor */}
          {activeRole === "doctor" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <select
                {...register("specialization", {
                  required: "Please select a specialization",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Specialization</option>
                {DOCTOR_SPECIALTIES.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialization && (
                <span className="text-red-600 text-xs">
                  {errors.specialization.message}
                </span>
              )}
            </div>
          )}

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            {submitting ? "Submitting..." : "Register"}
          </button>

          {/* Google Sign Up */}
          <div className="flex items-center justify-center mt-4 gap-2">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-2 w-full hover:bg-gray-100 transition"
            >
              <FcGoogle size={20} />
              Sign Up with Google
            </button>
          </div>

          {/* Login Link */}
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
