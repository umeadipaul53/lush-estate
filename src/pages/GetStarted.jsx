import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startJourney, startJourneyWithName } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";

const GetStarted = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const estateId = useSelector((state) => state.estates.estateId);

  const [stage, setStage] = useState(1); // 1 = email, 2 = new user info, 3 = done
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(null);
  const [message, setMessage] = useState("");

  // Stage 1: handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await dispatch(startJourney({ email, estateId })).unwrap();
      const fetchedUser = result.user;

      if (fetchedUser?.isNewUser) {
        setStage(2);
        setMessage("We need your details to continue.");
      } else {
        setStep(fetchedUser?.step || null);
        setMessage("Welcome back!");
        setStage(3);
      }
    } catch (err) {
      setMessage(err?.message || "Something went wrong. Try again.");
    }
  };

  // Stage 2: handle new user registration
  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await dispatch(
        startJourneyWithName({ email, name, phone, estateId })
      ).unwrap();
      const fetchedUser = result.user;

      setStep(fetchedUser?.step || null);
      setMessage("Journey started successfully!");
      setStage(3);
    } catch (err) {
      setMessage(err?.message || "Something went wrong.");
    }
  };

  // Stage 3: redirect if user exists and is not new
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (user.isNewUser) return; // skip redirect for brand-new users

    const { currentProgress, step } = user;

    // Redirect logic
    if (currentProgress?.stepStatus === "pending" && step?.stepNumber) {
      navigate(`/user-step-${step.stepNumber}`, { replace: true });
      return;
    }

    if (
      currentProgress?.stepStatus === "completed" &&
      currentProgress?.status === "pending"
    ) {
      navigate("/plot-reservation", { replace: true });
      return;
    }

    if (
      currentProgress?.stepStatus === "completed" &&
      currentProgress?.status === "active"
    ) {
      navigate("/user-dashboard", { replace: true });
      return;
    }

    // fallback
    if (step?.stepNumber) {
      navigate(`/user-step-${step.stepNumber}`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 sm:px-12 sm:py-16">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Begin Your Journey
      </h2>

      {message && <p className="text-blue-600 mb-4 text-center">{message}</p>}

      {/* Stage 1 */}
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

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-500 hover:to-gray-300"
            }`}
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </form>
      )}

      {/* Stage 2 */}
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

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-500 hover:to-gray-300"
            }`}
          >
            {loading ? "Creating..." : "Start Journey"}
          </button>
        </form>
      )}

      {/* Stage 3 */}
      {stage === 3 && user && step && (
        <div className="mt-6 border-t pt-4 max-w-2xl mx-auto text-center">
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
