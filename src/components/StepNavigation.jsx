import React from "react";
import { useNavigate } from "react-router-dom";

const StepNavigation = ({ step, totalSteps }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < totalSteps) navigate(`/user-step-${step + 1}`);
  };

  const handlePrev = () => {
    if (step > 1) navigate(`/user-step-${step - 1}`);
  };

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={handlePrev}
        disabled={step === 1}
        className={`px-5 py-2 rounded-lg ${
          step === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        Previous
      </button>

      <button
        onClick={handleNext}
        disabled={step === totalSteps}
        className={`px-5 py-2 rounded-lg ${
          step === totalSteps
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-500"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default StepNavigation;
