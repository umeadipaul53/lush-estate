const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-black h-3 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
