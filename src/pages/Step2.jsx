import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

const Step2 = ({ setIsNextEnabled }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const currentStep = 2; // Or pass as prop if dynamic

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
        Location <span className="text-blue-600">Advantage</span>
      </h1>

      {/* Subtitle / Copy */}
      <p className="text-gray-600 text-lg sm:text-xl text-center mb-10 leading-relaxed">
        Explore Lush Estate’s prime location, its proximity to schools, shopping
        centers, hospitals, and more. See why our estate offers convenience,
        accessibility, and a serene environment for modern living.
      </p>

      {/* Map Section */}
      <div className="w-full sm:w-11/12 lg:w-full mb-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        {/* Replace iframe src with your real map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.004325257994!2d3.3792113!3d6.5887195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8f5a0fa0d47f%3A0x79f86f0c3c64b0a0!2sVictoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
          width="100%"
          height="400"
          className="border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Drone / Location Video */}
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
  );
};

export default Step2;
