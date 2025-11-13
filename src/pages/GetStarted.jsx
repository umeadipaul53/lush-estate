import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startJourney, startJourneyWithName } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [stage, setStage] = useState(1); // 1 = email, 2 = new user info, 3 = done
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(null);
  const [message, setMessage] = useState("");

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await dispatch(startJourney(email)).unwrap();
      const { user } = result;

      if (user?.isNewUser) {
        // Backend says this is a new user → show Stage 2
        setStage(2);
        setMessage("We need your details to continue.");
      } else {
        // Existing user → move to Stage 3
        setStep(user?.step);
        setMessage("Welcome back!");
        setStage(3);
      }
    } catch (err) {
      setMessage(err?.message || "Something went wrong. Try again.");
    }
  };

  // Handle new user registration
  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await dispatch(
        startJourneyWithName({ email, name, phone })
      ).unwrap();

      const { user } = result;
      setStep(user?.step);
      setMessage("Journey started successfully!");
      setStage(3);
    } catch (err) {
      setMessage(err?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (user.isNewUser) return; // skip redirect for brand-new users

    setStage(3);
    setStep(user?.step);

    const { isStep, isReserve, isQuestion, step } = user;

    // Redirect Logic
    if (!isStep && step?.stepNumber) {
      navigate(`/user-step-${step.stepNumber}`);
      return;
    }

    if (isStep && !isReserve && !isQuestion) {
      navigate("/plot-reservation");
      return;
    }

    if (isStep && isReserve && !isQuestion) {
      navigate("/user-questionnaire");
      return;
    }

    if (isStep && isReserve && isQuestion) {
      navigate("/user-dashboard");
      return;
    }

    // fallback
    if (step?.stepNumber) {
      navigate(`/user-step-${step.stepNumber}`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Begin Your Journey
      </h2>
      {message && <p className="text-blue-600 mb-4">{message}</p>}

      {/* Stage 1: Ask for email */}
      {stage === 1 && (
        <form
          onSubmit={handleEmailSubmit}
          className="bg-white shadow-xl rounded-3xl p-16 max-w-2xl mx-auto space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Get Started
          </h2>
          <p className="text-gray-500 text-center">
            Enter your email to continue
          </p>

          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"
            }`}
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </form>
      )}

      {/* Stage 2: Ask for name + phone */}
      {stage === 2 && (
        <form
          onSubmit={handleNewUserSubmit}
          className="bg-white shadow-2xl rounded-3xl p-12 max-w-2xl mx-auto space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Aboard
          </h2>
          <p className="text-gray-500 text-center">
            Enter your details to start your journey
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            }`}
          >
            {loading ? "Creating..." : "Start Journey"}
          </button>
        </form>
      )}

      {/* Stage 3 */}
      {stage === 3 && user && step && (
        <div className="mt-6 border-t pt-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-2">
            Welcome {user.name || "Guest"}!
          </h3>
          <p>
            You’re currently on <strong>Step {step.stepNumber}</strong>:{" "}
            {step.title || "Loading..."}
          </p>
          <p className="text-gray-500 mt-2">Redirecting to your step...</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
      )}
    </div>
  );
};

export default GetStarted;
