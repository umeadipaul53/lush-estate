import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markStepWatched } from "../reducers/stepReducer";

const projects = [
  {
    id: 1,
    before: "/images/project1_before.jpg",
    after: "/images/project1_after.jpg",
    name: "Lush Residences Phase 1",
  },
  {
    id: 2,
    before: "/images/project2_before.jpg",
    after: "/images/project2_after.jpg",
    name: "Lush Residences Phase 2",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    text: "Buying a plot at Lush Estate was the best decision! Excellent customer service and a secure environment.",
    video: "/videos/IMG_7307.mp4",
  },
  {
    id: 2,
    name: "John Smith",
    text: "The development quality and amenities exceeded my expectations. Highly recommended!",
    video: "/videos/IMG_7307.mp4",
  },
];

const awards = [
  "/images/award1.png",
  "/images/award2.png",
  "/images/award3.png",
];

const Step6 = ({ setIsNextEnabled }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const currentStep = 6; // Or pass as prop if dynamic

  // Get watchedSteps from Redux
  const watchedSteps = useSelector((state) => state.steps.watchedSteps);

  // Automatically enable next if step already watched
  useEffect(() => {
    if (watchedSteps[currentStep]) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [watchedSteps, currentStep, setIsNextEnabled]);

  // Mark step as watched on load
  useEffect(() => {
    if (!watchedSteps[currentStep]) {
      setIsNextEnabled(true);
      dispatch(markStepWatched(currentStep));
    }
  }, [dispatch, currentStep, watchedSteps, setIsNextEnabled]);

  const handleVideoEnd = () => {
    setIsNextEnabled(true);
    dispatch(markStepWatched(currentStep)); // Persist in Redux
  };

  return (
    <div className="">
      {/* Step Indicator */}

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-6">
        Trust & <span className="text-blue-600">Credibility</span>
      </h1>

      {/* Developer Info */}
      <div className="w-full flex flex-col items-center text-center mb-12">
        <h2 className="text-2xl font-bold mb-2">Developer: Tehlex Worldwide</h2>
        <p className="text-gray-600 text-lg max-w-2xl">
          We are a registered and certified developer with years of experience
          delivering high-quality residential projects.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <img
            src="/images/cac_badge.png"
            alt="CAC Registered"
            className="w-24 h-24"
          />
          <img
            src="/images/certification_badge.png"
            alt="Certified"
            className="w-24 h-24"
          />
        </div>
      </div>

      {/* Past Projects */}
      <div className="w-full space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">Past Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col items-center bg-white rounded-3xl shadow-lg p-4 hover:scale-[1.02] transition-transform duration-300"
            >
              <h3 className="font-semibold mb-2">{proj.name}</h3>
              <div className="flex gap-2 w-full">
                <img
                  src={proj.before}
                  alt="Before"
                  className="w-1/2 rounded-xl"
                />
                <img
                  src={proj.after}
                  alt="After"
                  className="w-1/2 rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="w-full space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          Client Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col items-center bg-white rounded-3xl shadow-lg p-4 hover:scale-[1.02] transition-transform duration-300"
            >
              <video controls className="w-full rounded-xl mb-2">
                <source src={t.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="font-semibold text-lg mb-1">{t.name}</h3>
              <p className="text-gray-500 text-sm text-center">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Media Mentions / Awards */}
      <div className="w-full flex flex-col items-center text-center space-y-6 mb-12">
        <h2 className="text-2xl font-bold">Media Mentions & Awards</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {awards.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Award ${idx + 1}`}
              className="w-24 h-24"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step6;
