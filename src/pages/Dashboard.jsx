import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";

const Dashboard = () => {
  const { user, token, loading } = useSelector((state) => state.user);
  const { showToast } = useToast();

  // ✅ Redirect if not fully completed
  if (!user || !token) return <Navigate to="/get-started" replace />;
  if (!(user.isStep && user.isReserve && user.isQuestion)) {
    return <Navigate to={`/user-step-${user.step?.stepNumber || 1}`} replace />;
  }

  const handleNavigate = () => {
    showToast("Not available at the moment", "error");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-25">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600 mt-1">
          You have completed all the steps. Here’s your dashboard.
        </p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Steps Completed</h2>
          <p className="text-gray-600">✅ All steps done</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Plot Reserved</h2>
          <p className="text-gray-600">
            {user.isReserve ? "✅ Reserved" : "❌ Not Reserved"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Questionnaire</h2>
          <p className="text-gray-600">
            {user.isQuestion ? "✅ Completed" : "❌ Pending"}
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <a
            onClick={handleNavigate}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-center hover:bg-blue-700 transition"
          >
            View Plot
          </a>
          <a
            onClick={handleNavigate}
            className="bg-green-600 text-white px-6 py-3 rounded-xl text-center hover:bg-green-700 transition"
          >
            View Questionnaire
          </a>
        </div>
      </div>

      {/* Stats / Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Journey Summary</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>All steps completed ✅</li>
          <li>Plot reserved ✅</li>
          <li>Questionnaire completed ✅</li>
          <li>Email: {user?.email}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
