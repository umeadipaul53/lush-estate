import React, { useState } from "react";
import StepBuilder from "./StepBuilder";
import { useDispatch, useSelector } from "react-redux";
import { createEstate } from "../reducers/estateReducer";
import { useNavigate } from "react-router-dom";
import { useToast } from "../toastContext/useToast";

const CreateEstate = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [estateName, setEstateName] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!estateName.trim()) return;

    setLoading(true);

    try {
      const result = await dispatch(
        createEstate({ estateName, steps })
      ).unwrap();
      showToast(result.message, "success");

      setTimeout(() => {
        navigate("/admin/manage-estate");
      }, 1500);
    } catch (err) {
      // If err is a string (from rejectWithValue)
      if (typeof err === "string") {
        showToast(err, "error");
      }
      // If err is an object with details (Joi validation)
      else if (err?.details?.length) {
        showToast(err.details.map((d) => d.message).join(", "), "error");
      } else {
        showToast(err?.message || "Creating estate failed", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Estate
        </h1>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">
            Estate Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter estate name..."
            value={estateName}
            onChange={(e) => setEstateName(e.target.value)}
          />
        </div>

        {/* Step Builder */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Estate Steps
          </h2>

          <div className="overflow-y-auto max-h-[60vh] p-2 border rounded-md bg-gray-50">
            <StepBuilder steps={steps} setSteps={setSteps} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating Estate..." : "Create Estate"}
        </button>
      </div>
    </div>
  );
};

export default CreateEstate;
