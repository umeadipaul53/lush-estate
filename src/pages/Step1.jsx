import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

const Step1 = ({ setIsNextEnabled }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const currentStep = 1; // Or pass as prop if dynamic

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
    <>
      <div className="">
        {/* Step Indicator */}

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-6">
          Why <span className="text-blue-600">Lush Estate?</span>
        </h1>

        {/* Subtitle / Copy */}
        <p className="text-gray-600 text-lg sm:text-xl mb-10 leading-relaxed">
          Discover our vision for a sustainable, secure, and luxurious living
          environment. Lush Estate combines modern infrastructure, serene
          landscapes, and a community-focused plan — the perfect place to build
          your future.
        </p>

        {/* Video Section */}
        <div className="w-full sm:w-11/12 lg:w-full">
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
        </div>
      </div>
    </>
  );
};

export default Step1;
