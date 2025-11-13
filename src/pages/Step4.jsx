import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

const Step4 = ({ setIsNextEnabled }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const currentStep = 4; // Or pass as prop if dynamic

  // Get watchedSteps from Redux
  const watchedSteps = useSelector((state) => state.steps.watchedSteps);

  useEffect(() => {
    // Enable Next if already watched
    if (watchedSteps[currentStep]) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [watchedSteps, currentStep, setIsNextEnabled]);

  const handleVideoEnd = () => {
    setIsNextEnabled(true);
    dispatch(markStepWatched(currentStep)); // Persist in Redux
  };

  return (
    <div className="">
      {/* Step Indicator */}

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-6">
        Virtual <span className="text-blue-600">Inspection</span>
      </h1>

      {/* Subtitle / Copy */}
      <p className="text-gray-600 text-lg sm:text-xl text-center mb-10 leading-relaxed">
        Experience Lush Estate like never before! Take a guided virtual tour and
        explore our homes, streets, and amenities from the comfort of your
        device.
      </p>

      {/* Video Section */}
      <div className="w-full sm:w-11/12 lg:w-full relative">
        <video
          ref={videoRef}
          width="100%"
          controls
          onEnded={handleVideoEnd}
          className="rounded-xl shadow-lg mb-6"
        >
          <source src="/videos/IMG_7307.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Play Overlay for Premium Look */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/20 rounded-full p-4 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-6.586-3.79A1 1 0 007 8.237v7.526a1 1 0 001.166.971l6.586-3.79a1 1 0 000-1.74z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
