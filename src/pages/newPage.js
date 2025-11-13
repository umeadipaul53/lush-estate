import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startJourney, startJourneyWithName } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, error, token } = useSelector(
    (state) => state.user
  );

  console.log({ isAuthenticated, token, user, loading });

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

      // If success
      const { user: userData } = result;
      setStep(userData?.step);
      setMessage("Welcome back!");
      setStage(3);
    } catch (err) {
      // If backend says "user not found", move to stage 2
      if (err.includes("User validation") || err.includes("not found")) {
        setStage(2);
        setMessage("We need your details to continue.");
      } else {
        setMessage(err);
      }
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

      const { user: userData } = result;
      setStep(userData?.step);
      setMessage("Journey started successfully!");
      setStage(3);
    } catch (err) {
      setMessage(err || "Something went wrong.");
    }
  };

  // If journey already started or user exists
  useEffect(() => {
    if (isAuthenticated && user) {
      setStage(3);
      setStep(user?.step);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (stage === 3 && user && step?.stepNumber) {
      // Automatically redirect to the correct page
      navigate(`/user-step-${step.stepNumber}`);
    }
  }, [stage, user, step, navigate]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Begin Your Journey</h2>
      {message && <p className="text-blue-600 mb-4">{message}</p>}

      {/* Stage 1: Ask for email */}
      {stage === 1 && (
        <form
          onSubmit={handleEmailSubmit}
          className="bg-white shadow-xl rounded-3xl p-20 max-w-md mx-auto space-y-6"
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
          className="bg-white shadow-2xl rounded-3xl p-8 max-w-md mx-auto space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Aboard
          </h2>
          <p className="text-gray-500 text-center">
            Enter your details to start your journey
          </p>

          {/* Full Name Input */}
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

          {/* Phone Number Input */}
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

          {/* Submit Button */}
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

      {/* Stage 3: Show user's current step */}
      {stage === 3 && user && step && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">
            Welcome {user.name || "Guest"}!
          </h3>
          <p>
            You’re currently on <strong>Step {step.stepNumber}</strong>:{" "}
            {step.title || "Loading..."}
          </p>
          {/* optional: show message while redirecting */}
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
