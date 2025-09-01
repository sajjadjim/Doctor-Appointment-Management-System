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

  const handleGoogleSignUp = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
      const userInfo = {
        email: user?.email,
        name: user?.displayName || "No Name",
        image:
          user?.photoURL ||
          "https://cdn-icons-png.freepik.com/512/6858/6858485.png",
        role: activeRole,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axiosSecure.post("/users", userInfo);
      toast.success("Signed up with Google ✅");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Google sign-up error:", err);
      toast.error("Google Sign-in failed ❌");
    } finally {
      setSubmitting(false);
    }
  };

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
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo Upload
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {profilePic && (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="mt-2 w-14 h-14 rounded-full object-cover border"
                />
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {activeRole === "doctor" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <select
                  {...register("specialization", {
                    required:
                      activeRole === "doctor"
                        ? "Specialization is required"
                        : false,
                  })}
                  className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a specialization
                  </option>
                  {DOCTOR_SPECIALTIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.specialization && (
                  <p className="text-red-500 text-sm">
                    {errors.specialization.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Row 3 (Passwords) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (v) =>
                    v === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-md hover:opacity-95 active:scale-[.99] transition disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Google Sign-up */}
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500">Or</p>
          <button
            onClick={handleGoogleSignUp}
            disabled={submitting}
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-2.5 shadow-sm hover:bg-gray-50 active:scale-[.99] transition"
          >
            <FcGoogle className="text-xl" />
            <span className="font-semibold">
              Sign up with Google ({activeRole})
            </span>
          </button>
        </div>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="border-b border-blue-500 text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
