import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import PaginationButtons from "./PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalSteps, completeSteps } from "../reducers/stepReducer";

const StepLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const match = location.pathname.match(/user-step-(\d+)/);
  const currentStep = match ? parseInt(match[1], 10) : 1;

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { count } = useSelector((state) => state.steps);
  const TOTAL_STEPS = count || 6;
  const { watchedSteps } = useSelector((state) => state.steps);
  const [isNextEnabled, setIsNextEnabled] = useState(() => {
    return watchedSteps[currentStep] || false;
  });

  // Local state to track finalStep
  const [finalStep, setFinalStep] = useState(user?.stepStatus === "completed");

  const handleNext = async () => {
    if (!isNextEnabled) {
      console.warn("Next button clicked but video not finished yet");
      return;
    }

    try {
      const payload = { estateId: "690cba0a8973df822b3b781e" };

      // Dispatch the step completion
      const result = await dispatch(
        completeSteps({ stepNumber: currentStep, ...payload })
      ).unwrap();

      const nextStep = result?.data?.nextStep;
      const finalStep = result?.data?.finalStep;

      // Update finalStep state for UI
      setFinalStep(finalStep);

      if (finalStep) {
        navigate("/plot-reservation");
        return;
      }

      if (nextStep) {
        navigate(`/user-step-${nextStep}`);
      } else {
        console.warn("Next step not returned from backend.");
      }
    } catch (error) {
      console.error("Failed to complete step:", error);
    }
  };

  const handlePrevious = async () => {
    if (currentStep > 1) navigate(`/user-step-${currentStep - 1}`);
  };

  const handlePlotReservation = async () => {
    try {
      const payload = { estateId: "690cba0a8973df822b3b781e" };

      // Dispatch the step completion
      const result = await dispatch(
        completeSteps({ stepNumber: currentStep, ...payload })
      ).unwrap();

      const nextStep = result?.data?.nextStep;
      const finalStep = result?.data?.finalStep;

      // Update finalStep state for UI
      setFinalStep(finalStep);

      if (finalStep) {
        navigate("/plot-reservation");
        return;
      }

      if (nextStep) {
        navigate(`/user-step-${nextStep}`);
      } else {
        console.warn("Next step not returned from backend.");
      }
    } catch (error) {
      console.error("Failed to complete step:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTotalSteps());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-25">
      <div className="w-full sm:max-w-2xl md:max-w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-6">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* 👇 Provide control props to children */}
        <div className="py-6">
          {React.cloneElement(children, { setIsNextEnabled, isNextEnabled })}
        </div>

        <PaginationButtons
          step={currentStep}
          totalSteps={TOTAL_STEPS}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onPlotReserve={handlePlotReservation}
          disabled={!isNextEnabled} // 👈 disable next
        />
      </div>
    </div>
  );
};

export default StepLayout;
