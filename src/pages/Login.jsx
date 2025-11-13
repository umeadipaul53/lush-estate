import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import HeroSection from "../components/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, clearError } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const { showToast } = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated && !loading && !error) {
      const route = user?.role === "admin" ? "/admin" : "/get-started";
      showToast("Login successful! Redirecting...", "success");
      const timeout = setTimeout(() => navigate(route), 800);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, loading, error, user, navigate]);

  useEffect(() => {
    console.log("Login state:", { loading, error, isAuthenticated, user });
  }, [loading, error, isAuthenticated, user]);

  // ✅ Show backend errors
  useEffect(() => {
    if (error) {
      showToast(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch, showToast]);

  // ✅ Validate input
  const validateForm = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit safely (no auto-refresh)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚫 stop form refresh
    e.stopPropagation(); // 🚫 stop bubbling

    if (!validateForm()) return;

    try {
      console.log("🔹 Sending login request...");
      const result = await dispatch(loginAdmin(form)).unwrap();
      showToast("Login successful! Redirecting...", "success");
    } catch (err) {
      console.error("Login error caught:", err);
      // err may be a string, not an object, so handle both
      showToast(
        typeof err === "string" ? err : err?.message || "Login failed",
        "error"
      );
    }
  };

  return (
    <div>
      <HeroSection
        title="Access Account"
        sub_title="Secure Login"
        highlight=" to Your Account"
        quote="Admin Login, your trust and security come first. Log in to safely access your dashboard and manage your platform with ease."
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo-new-removebg-preview.png"
              alt="Tehlex Limited Logo"
              className="h-10"
            />
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome back!
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Log in to your account
          </p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-yellow-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-yellow-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

export default Login;
