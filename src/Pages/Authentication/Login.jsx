import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { Brain, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Lottie from "lottie-react";
import registerLottie from "../../../src/assets/animation authentication/login.json";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const { signInWithGoogle, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeRole, setActiveRole] = useState("patient"); // 'patient' | 'doctor'

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "patient",
    },
  });

  // Keep form's role in sync with the toggle
  useEffect(() => {
    setValue("role", activeRole);
  }, [activeRole, setValue]);

  const redirectTo = useMemo(
    () => (location.state ? location.state : "/"),
    [location.state]
  );

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      // If backend accepts role, great; if not, it will ignore.
      await signIn(data.email, data.password);
      toast.success("Successfully logged in ✅");
      setTimeout(() => navigate(redirectTo), 900);
    } catch (err) {
      console.error(err);
      toast.error("Login failed ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setSubmitting(true);
      await signInWithGoogle();
      toast.success("Signed in with Google ✅");
      setTimeout(() => navigate(redirectTo), 900);
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Google Sign-in failed ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-violet-100">
      <ToastContainer />
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white/80 backdrop-blur shadow-xl">
        {/* Header / Brand */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent"
              aria-label="Go to home"
            >
              <Brain className="opacity-90" />
              Doctor Appointment <span className="opacity-75">System</span>
            </Link>
          </div>
        </div>

        {/* Lottie */}
        <div className="px-6">
          <Lottie className="w-56 mx-auto -mt-2 -mb-2" animationData={registerLottie} loop />
        </div>

        {/* Role Toggle */}
        <div className="px-6">
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
              aria-pressed={activeRole === "patient"}
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
              aria-pressed={activeRole === "doctor"}
            >
              Doctor
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-500" />
            Select your role to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pt-4 pb-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("email", { required: "Email is required" })}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPass ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Hidden role to keep RHF aware */}
          <input type="hidden" {...register("role")} />

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3 shadow-md hover:opacity-95 active:scale-[.99] transition disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 shadow-sm hover:bg-gray-50 active:scale-[.99] transition flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            <span className="font-semibold">Log in with Google</span>
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-gray-600">
            New here?{" "}
            <Link
              to="/auth/register"
              className="text-indigo-600 border-b border-indigo-400 hover:text-indigo-700"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
