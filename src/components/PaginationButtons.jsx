const PaginationButtons = ({
  step,
  totalSteps,
  onNext,
  onPrevious,
  onPlotReserve,
  disabled,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrevious}
        disabled={step === 1}
        className={`px-4 py-2 rounded-lg transition-colors ${
          step === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        Previous
      </button>

      <span className="font-semibold text-gray-700">
        Step {step} of {totalSteps}
      </span>

      {step < totalSteps ? (
        <button
          onClick={!disabled ? onNext : undefined}
          disabled={disabled}
          className={`px-4 py-2 rounded-lg transition-colors ${
            disabled
              ? "bg-gray-300 text-gray-200 cursor-not-allowed"
              : "bg-black text-white hover:bg-black"
          }`}
        >
          Next
        </button>
      ) : (
        <button
          onClick={!disabled ? onPlotReserve : undefined}
          disabled={disabled}
          className={`px-4 py-2 rounded-lg transition-colors ${
            disabled
              ? "bg-gray-300 text-gray-200 cursor-not-allowed"
              : "bg-black text-white hover:bg-black"
          }`}
        >
          Plot Reservation
        </button>
      )}
    </div>
  );
};

export default PaginationButtons;
