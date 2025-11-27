// components/StepLayout.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import PaginationButtons from "./PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalSteps, completeSteps } from "../reducers/stepReducer";
import StepLoader from "./StepLoader";

const StepLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // extract current step from URL (e.g. /user-step-3)
  const match = location.pathname.match(/user-step-(\d+)/);
  const currentStepNumber = match ? parseInt(match[1], 10) : 1;

  const estateId = useSelector((state) => state.estates.estateId);
  const selectedEstateId = estateId;

  const { steps, count, watchedSteps, loading } = useSelector(
    (state) => state.steps
  );
  const { isAuthenticated } = useSelector((s) => s.user);

  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [finalStep, setFinalStep] = useState(false);

  // When estate changes (or on mount), fetch estate steps
  useEffect(() => {
    if (isAuthenticated && selectedEstateId) {
      dispatch(fetchTotalSteps(selectedEstateId));
    }
  }, [dispatch, isAuthenticated, selectedEstateId]);

  // update Next button enabled state based on watchedSteps
  useEffect(() => {
    setIsNextEnabled(Boolean(watchedSteps[currentStepNumber]));
  }, [watchedSteps, currentStepNumber]);

  // determine the TOTAL_STEPS from fetched estate
  const TOTAL_STEPS = count || steps.length || 0;

  // helper to find index of current step inside steps array
  const currentIndex = steps.findIndex(
    (s) => s.stepNumber === currentStepNumber
  );
  const currentStep = currentIndex >= 0 ? steps[currentIndex] : null;

  const goToStepNumber = (stepNumber) => {
    navigate(`/user-step-${stepNumber}`);
  };

  const handleNext = async () => {
    if (!isNextEnabled) return;

    if (!selectedEstateId) {
      console.warn("No estate selected");
      return;
    }

    try {
      const result = await dispatch(
        completeSteps({
          estateId: selectedEstateId,
          stepNumber: currentStepNumber,
        })
      ).unwrap();
      // backend may return nextStep/finalStep - handle gracefully
      const nextStep = result?.data?.nextStep ?? null;
      const isFinal = result?.data?.finalStep ?? false;
      setFinalStep(isFinal);

      if (isFinal) {
        navigate("/plot-reservation");
        return;
      }

      if (nextStep) {
        goToStepNumber(nextStep);
      } else {
        // fallback: go to next numerical step that exists
        const nextIndex = currentIndex + 1;
        if (steps[nextIndex]) goToStepNumber(steps[nextIndex].stepNumber);
      }
    } catch (err) {
      console.error("complete step failed", err);
    }
  };

  const handlePrevious = () => {
    if (!steps.length) return;
    // find previous existing
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0 && steps[prevIndex]) {
      goToStepNumber(steps[prevIndex].stepNumber);
    }
  };

  const handlePlotReservation = handleNext; // reuse same flow

  // If steps are loading show placeholder
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading steps…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-24">
      <div className="w-full sm:max-w-2xl md:max-w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-6">
        <ProgressBar currentStep={currentStepNumber} totalSteps={TOTAL_STEPS} />

        {/* Render the dynamic step content */}
        <div className="py-6">
          {currentStep ? (
            <StepLoader
              step={currentStep}
              setIsNextEnabled={setIsNextEnabled}
              isNextEnabled={isNextEnabled}
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold">Step not found</h2>
              <p className="text-gray-500 mt-2">
                The step you requested doesn't exist for this estate.
              </p>
            </div>
          )}
        </div>

        <PaginationButtons
          step={currentStepNumber}
          totalSteps={TOTAL_STEPS}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onPlotReserve={handlePlotReservation}
          disabled={!isNextEnabled}
        />
      </div>
    </div>
  );
};

export default StepLayout;
