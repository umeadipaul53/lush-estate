import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";
import { ShieldCheck, Map, TreePine, Users } from "lucide-react";

const Step3 = ({ setIsNextEnabled }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const currentStep = 3; // Or pass as prop if dynamic

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
        Features & <span className="text-blue-600">Amenities</span>
      </h1>

      {/* Subtitle / Copy */}
      <p className="text-gray-600 text-lg sm:text-xl text-center mb-10 leading-relaxed">
        Experience modern infrastructure, state-of-the-art security, and a
        variety of amenities within Lush Estate. From well-planned roads to
        recreational facilities, we provide a safe, comfortable, and luxurious
        environment for residents.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full sm:w-11/12 mb-10">
        <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-16 h-16 mb-4 text-emerald-400" />
            <h3 className="text-xl font-bold mb-2">24/7 Security</h3>
          </div>

          <p className="text-gray-500 text-sm">
            Peace of mind with modern surveillance and round-the-clock security
            personnel.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300">
          <div className="flex flex-col items-center">
            <Map className="w-16 h-16 mb-4 text-emerald-400" />
            <h3 className="text-xl font-bold mb-2">Excellent Infrastructure</h3>
          </div>
          <p className="text-gray-500 text-sm">
            Wide roads, proper drainage, and reliable utilities for a
            comfortable lifestyle.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300">
          <div className="flex flex-col items-center">
            <TreePine className="w-16 h-16 mb-4 text-emerald-400" />
            <h3 className="text-xl font-bold mb-2">Recreational Amenities</h3>
          </div>

          <p className="text-gray-500 text-sm">
            Parks, sports courts, and leisure areas for family and community
            enjoyment.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300">
          <div className="flex flex-col items-center">
            <Users className="w-16 h-16 mb-4 text-emerald-400" />
            <h3 className="text-xl font-bold mb-2">Community & Surroundings</h3>
          </div>
          <p className="text-gray-500 text-sm">
            A serene and well-planned community, close to key amenities and
            landmarks.
          </p>
        </div>
      </div>

      {/* Features / Drone Video */}
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

export default Step3;
